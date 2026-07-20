-- profiles: additional user profile fields used by the app
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS street TEXT,
  ADD COLUMN IF NOT EXISTS street_number TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS postal_code TEXT,
  ADD COLUMN IF NOT EXISTS birth_date DATE,
  ADD COLUMN IF NOT EXISTS gender TEXT,
  ADD COLUMN IF NOT EXISTS document_number TEXT,
  ADD COLUMN IF NOT EXISTS nationality TEXT,
  ADD COLUMN IF NOT EXISTS nif TEXT,
  ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
  ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_nif TEXT,
  ADD COLUMN IF NOT EXISTS company_address TEXT,
  ADD COLUMN IF NOT EXISTS company_city TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS support_email TEXT,
  ADD COLUMN IF NOT EXISTS cae TEXT,
  ADD COLUMN IF NOT EXISTS team_description TEXT,
  ADD COLUMN IF NOT EXISTS affiliation_code TEXT,
  ADD COLUMN IF NOT EXISTS tshirt_size TEXT,
  ADD COLUMN IF NOT EXISTS medical_conditions TEXT;

-- teams
ALTER TABLE public.teams
  ADD COLUMN IF NOT EXISTS captain_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS sport_category TEXT;
UPDATE public.teams SET captain_user_id = captain_id WHERE captain_user_id IS NULL;

-- team_members
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS participant_name TEXT,
  ADD COLUMN IF NOT EXISTS participant_email TEXT,
  ADD COLUMN IF NOT EXISTS participant_cc TEXT;

-- age_groups
ALTER TABLE public.age_groups
  ADD COLUMN IF NOT EXISTS category_id TEXT,
  ADD COLUMN IF NOT EXISTS subcategory TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT;

-- event_qr_codes
ALTER TABLE public.event_qr_codes
  ADD COLUMN IF NOT EXISTS qr_code_data TEXT;

-- security_events
ALTER TABLE public.security_events
  ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0;

-- log_security_event RPC
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_user_id UUID DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}',
  p_risk_score INTEGER DEFAULT 0
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_id UUID;
BEGIN
  INSERT INTO public.security_events (user_id, event_type, severity, user_agent, details, risk_score)
  VALUES (
    p_user_id, p_event_type,
    CASE WHEN p_risk_score >= 75 THEN 'high' WHEN p_risk_score >= 40 THEN 'medium' ELSE 'info' END,
    p_user_agent, COALESCE(p_details, '{}'::jsonb), COALESCE(p_risk_score, 0)
  ) RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;
REVOKE ALL ON FUNCTION public.log_security_event(TEXT, UUID, TEXT, JSONB, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_security_event(TEXT, UUID, TEXT, JSONB, INTEGER) TO anon, authenticated, service_role;