ALTER TABLE public.event_checkins
  ADD COLUMN IF NOT EXISTS participant_id UUID,
  ADD COLUMN IF NOT EXISTS scanner_user_id UUID REFERENCES auth.users(id);

ALTER TABLE public.event_qr_codes ALTER COLUMN code DROP NOT NULL;
ALTER TABLE public.event_qr_codes ALTER COLUMN code SET DEFAULT gen_random_uuid()::text;
CREATE UNIQUE INDEX IF NOT EXISTS uq_event_qr_codes_event_type ON public.event_qr_codes(event_id, qr_type);

ALTER TABLE public.event_commissions ALTER COLUMN organizer_id DROP NOT NULL;
CREATE OR REPLACE FUNCTION public.set_event_commission_organizer()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.organizer_id IS NULL THEN
    SELECT organizer_id INTO NEW.organizer_id FROM public.events WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_set_event_commission_organizer ON public.event_commissions;
CREATE TRIGGER trg_set_event_commission_organizer BEFORE INSERT ON public.event_commissions FOR EACH ROW EXECUTE FUNCTION public.set_event_commission_organizer();