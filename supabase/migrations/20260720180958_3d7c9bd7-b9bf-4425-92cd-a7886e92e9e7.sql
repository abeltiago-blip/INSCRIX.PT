ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS event_regulation TEXT,
  ADD COLUMN IF NOT EXISTS terms_and_conditions TEXT;

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS user_id UUID,
  ADD COLUMN IF NOT EXISTS participant_nif TEXT,
  ADD COLUMN IF NOT EXISTS ticket_type_name TEXT;

ALTER TABLE public.event_commissions ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.event_qr_codes ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);