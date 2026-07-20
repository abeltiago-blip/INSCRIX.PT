
REVOKE ALL ON FUNCTION public.prevent_role_self_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_profile_role() FROM PUBLIC, anon, authenticated;
