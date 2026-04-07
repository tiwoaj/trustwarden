
-- Lock down submission_rate_limits: deny all public access
CREATE POLICY "No public select on submission_rate_limits"
ON public.submission_rate_limits FOR SELECT USING (false);

CREATE POLICY "No public insert on submission_rate_limits"
ON public.submission_rate_limits FOR INSERT WITH CHECK (false);

CREATE POLICY "No public update on submission_rate_limits"
ON public.submission_rate_limits FOR UPDATE USING (false);

CREATE POLICY "No public delete on submission_rate_limits"
ON public.submission_rate_limits FOR DELETE USING (false);

-- Explicit deny-all INSERT on form tables (edge function uses service role)
CREATE POLICY "No public insert on contact_submissions"
ON public.contact_submissions FOR INSERT WITH CHECK (false);

CREATE POLICY "No public insert on lead_submissions"
ON public.lead_submissions FOR INSERT WITH CHECK (false);
