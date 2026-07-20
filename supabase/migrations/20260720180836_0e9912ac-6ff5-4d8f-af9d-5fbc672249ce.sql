-- email_templates: match code (template_key, subject_template, html_template, description)
ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS template_key TEXT;
ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS subject_template TEXT;
ALTER TABLE public.email_templates ADD COLUMN IF NOT EXISTS html_template TEXT;
UPDATE public.email_templates SET template_key = COALESCE(template_key, name), subject_template = COALESCE(subject_template, subject), html_template = COALESCE(html_template, html_content) WHERE template_key IS NULL OR subject_template IS NULL OR html_template IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_email_templates_template_key ON public.email_templates(template_key) WHERE template_key IS NOT NULL;

-- email_logs: add template_key & failed_at
ALTER TABLE public.email_logs ADD COLUMN IF NOT EXISTS template_key TEXT;
ALTER TABLE public.email_logs ADD COLUMN IF NOT EXISTS failed_at TIMESTAMPTZ;

-- newsletter_subscriptions: add user_id, preferences, confirmed_at
ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';
ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;