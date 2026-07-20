-- events.slug
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug) WHERE slug IS NOT NULL;

-- Email templates
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_templates TO authenticated;
GRANT ALL ON public.email_templates TO service_role;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage email templates" ON public.email_templates FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Email logs
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  sender_email TEXT,
  subject TEXT NOT NULL,
  template_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  provider TEXT,
  provider_message_id TEXT,
  metadata JSONB DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_logs TO authenticated;
GRANT ALL ON public.email_logs TO service_role;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage email logs" ON public.email_logs FOR ALL USING (public.get_current_user_role() = 'admin');

-- Event check-ins
CREATE TABLE public.event_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  bib_number TEXT,
  checkin_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  checkin_method TEXT NOT NULL DEFAULT 'manual',
  checked_in_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_checkins TO authenticated;
GRANT ALL ON public.event_checkins TO service_role;
ALTER TABLE public.event_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Organizers manage checkins for their events" ON public.event_checkins FOR ALL USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = event_checkins.event_id AND events.organizer_id = auth.uid())
);
CREATE POLICY "Admins manage all checkins" ON public.event_checkins FOR ALL USING (public.get_current_user_role() = 'admin');

-- Event QR codes
CREATE TABLE public.event_qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_id UUID REFERENCES public.registrations(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  qr_type TEXT NOT NULL DEFAULT 'checkin',
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_qr_codes TO authenticated;
GRANT ALL ON public.event_qr_codes TO service_role;
ALTER TABLE public.event_qr_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Organizers manage QR codes for their events" ON public.event_qr_codes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = event_qr_codes.event_id AND events.organizer_id = auth.uid())
);
CREATE POLICY "Admins manage all QR codes" ON public.event_qr_codes FOR ALL USING (public.get_current_user_role() = 'admin');

-- Event commissions
CREATE TABLE public.event_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  commission_type TEXT NOT NULL DEFAULT 'percentage',
  commission_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  fixed_fee DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_commissions TO authenticated;
GRANT ALL ON public.event_commissions TO service_role;
ALTER TABLE public.event_commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Organizers view their event commissions" ON public.event_commissions FOR SELECT USING (auth.uid() = organizer_id);
CREATE POLICY "Admins manage all commissions" ON public.event_commissions FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE TRIGGER update_event_commissions_updated_at BEFORE UPDATE ON public.event_commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  captain_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  description TEXT,
  logo_url TEXT,
  max_members INTEGER DEFAULT 10,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.teams TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teams TO authenticated;
GRANT ALL ON public.teams TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are viewable by everyone" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Captains manage their teams" ON public.teams FOR ALL USING (auth.uid() = captain_id);
CREATE POLICY "Admins manage all teams" ON public.teams FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  member_email TEXT,
  role TEXT NOT NULL DEFAULT 'member',
  status TEXT NOT NULL DEFAULT 'active',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members view their teams" ON public.team_members FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.teams WHERE teams.id = team_members.team_id AND teams.captain_id = auth.uid())
);
CREATE POLICY "Captains manage members" ON public.team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.teams WHERE teams.id = team_members.team_id AND teams.captain_id = auth.uid())
);
CREATE POLICY "Admins manage all team members" ON public.team_members FOR ALL USING (public.get_current_user_role() = 'admin');

-- User feedback
CREATE TABLE public.user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'new',
  page_url TEXT,
  browser_info JSONB,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_feedback TO authenticated;
GRANT ALL ON public.user_feedback TO service_role;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own feedback" ON public.user_feedback FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all feedback" ON public.user_feedback FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE TRIGGER update_user_feedback_updated_at BEFORE UPDATE ON public.user_feedback FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  categories TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscriptions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscriptions TO authenticated;
GRANT ALL ON public.newsletter_subscriptions TO service_role;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage newsletter" ON public.newsletter_subscriptions FOR ALL USING (public.get_current_user_role() = 'admin');

-- Age groups
CREATE TABLE public.age_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  min_age INTEGER,
  max_age INTEGER,
  gender TEXT,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.age_groups TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.age_groups TO authenticated;
GRANT ALL ON public.age_groups TO service_role;
ALTER TABLE public.age_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Age groups viewable by all" ON public.age_groups FOR SELECT USING (true);
CREATE POLICY "Organizers manage age groups for their events" ON public.age_groups FOR ALL USING (
  event_id IS NULL OR EXISTS (SELECT 1 FROM public.events WHERE events.id = age_groups.event_id AND events.organizer_id = auth.uid())
);
CREATE POLICY "Admins manage all age groups" ON public.age_groups FOR ALL USING (public.get_current_user_role() = 'admin');

-- Security events
CREATE TABLE public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  ip_address TEXT,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.security_events TO anon, authenticated;
GRANT SELECT ON public.security_events TO authenticated;
GRANT ALL ON public.security_events TO service_role;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log security events" ON public.security_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view security events" ON public.security_events FOR SELECT USING (public.get_current_user_role() = 'admin');