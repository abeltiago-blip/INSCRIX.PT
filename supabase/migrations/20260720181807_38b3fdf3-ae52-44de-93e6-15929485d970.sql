
-- =========================================================
-- FASE 1: Segurança & BD — user_roles, RLS hardening, storage
-- =========================================================

-- 1) Enum de roles (canonical)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','organizer','participant','team');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Tabela user_roles (source of truth)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view their own roles" ON public.user_roles;
CREATE POLICY "Users view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage all roles" ON public.user_roles;
CREATE POLICY "Admins manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- 3) Função has_role (canonical, security definer, no recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 4) Migrar roles existentes de profiles -> user_roles (se houver dados)
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, p.role::text::public.app_role
FROM public.profiles p
WHERE p.role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 5) Substituir get_current_user_role para ler de user_roles (mantém compat com policies existentes)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.user_roles WHERE user_id = auth.uid()
  ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'organizer' THEN 2 WHEN 'team' THEN 3 ELSE 4 END
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_current_user_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_current_user_role() TO authenticated, service_role;

-- 6) handle_new_user: seed também em user_roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.user_role;
BEGIN
  v_role := COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'participant');

  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    v_role
  ) ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, v_role::text::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- Só o Postgres/service_role precisa (é um trigger em auth.users)

-- 7) Garantir trigger on_auth_user_created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8) Impedir privilege escalation: user não pode alterar profiles.role diretamente
CREATE OR REPLACE FUNCTION public.prevent_role_self_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Só admin pode mudar; caso contrário, força para o valor antigo
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_role_self_change ON public.profiles;
CREATE TRIGGER prevent_role_self_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_change();

-- 9) Sincronizar user_roles -> profiles.role (mirror para UI)
CREATE OR REPLACE FUNCTION public.sync_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_top_role public.app_role;
BEGIN
  SELECT role INTO v_top_role
  FROM public.user_roles
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
  ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'organizer' THEN 2 WHEN 'team' THEN 3 ELSE 4 END
  LIMIT 1;

  IF v_top_role IS NOT NULL THEN
    UPDATE public.profiles
    SET role = v_top_role::text::public.user_role
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS sync_profile_role_ins ON public.user_roles;
CREATE TRIGGER sync_profile_role_ins
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_role();

-- 10) Endurecer log_security_event + set_event_commission_organizer
REVOKE ALL ON FUNCTION public.log_security_event(text, uuid, text, jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_security_event(text, uuid, text, jsonb, integer) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.set_event_commission_organizer() FROM PUBLIC, anon, authenticated;

-- 11) Tighten security_events INSERT (só o próprio user ou anónimo com user_id nulo)
DROP POLICY IF EXISTS "Anyone can log security events" ON public.security_events;
CREATE POLICY "Users can log their own security events"
  ON public.security_events FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Anon can log anonymous security events"
  ON public.security_events FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- 12) Tighten newsletter_subscriptions INSERT (validar formato email básico)
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe with valid email"
  ON public.newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- 13) Storage policies para event-images (público leitura, organizers/admins escrevem)
DROP POLICY IF EXISTS "event-images public read" ON storage.objects;
CREATE POLICY "event-images public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'event-images');

DROP POLICY IF EXISTS "event-images auth upload" ON storage.objects;
CREATE POLICY "event-images auth upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images' AND owner = auth.uid());

DROP POLICY IF EXISTS "event-images owner update" ON storage.objects;
CREATE POLICY "event-images owner update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-images' AND owner = auth.uid());

DROP POLICY IF EXISTS "event-images owner delete" ON storage.objects;
CREATE POLICY "event-images owner delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images' AND (owner = auth.uid() OR public.has_role(auth.uid(),'admin')));

-- 14) Storage policies para event-documents (mesmo esquema)
DROP POLICY IF EXISTS "event-documents public read" ON storage.objects;
CREATE POLICY "event-documents public read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'event-documents');

DROP POLICY IF EXISTS "event-documents auth upload" ON storage.objects;
CREATE POLICY "event-documents auth upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-documents' AND owner = auth.uid());

DROP POLICY IF EXISTS "event-documents owner update" ON storage.objects;
CREATE POLICY "event-documents owner update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-documents' AND owner = auth.uid());

DROP POLICY IF EXISTS "event-documents owner delete" ON storage.objects;
CREATE POLICY "event-documents owner delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-documents' AND (owner = auth.uid() OR public.has_role(auth.uid(),'admin')));
