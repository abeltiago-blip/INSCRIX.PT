ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS image_rights_clause TEXT,
  ADD COLUMN IF NOT EXISTS liability_waiver TEXT,
  ADD COLUMN IF NOT EXISTS regulation_document_url TEXT;

ALTER TABLE public.event_commissions
  ADD COLUMN IF NOT EXISTS applies_to_ticket_types UUID[] DEFAULT '{}';

ALTER TABLE public.event_qr_codes
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;