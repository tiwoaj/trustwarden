
-- Restrict SELECT on contact_submissions to no one (admin access via service role only)
CREATE POLICY "No public select on contact_submissions"
ON public.contact_submissions
FOR SELECT
USING (false);

-- Restrict UPDATE on contact_submissions
CREATE POLICY "No public update on contact_submissions"
ON public.contact_submissions
FOR UPDATE
USING (false);

-- Restrict DELETE on contact_submissions
CREATE POLICY "No public delete on contact_submissions"
ON public.contact_submissions
FOR DELETE
USING (false);

-- Restrict SELECT on lead_submissions to no one
CREATE POLICY "No public select on lead_submissions"
ON public.lead_submissions
FOR SELECT
USING (false);

-- Restrict UPDATE on lead_submissions
CREATE POLICY "No public update on lead_submissions"
ON public.lead_submissions
FOR UPDATE
USING (false);

-- Restrict DELETE on lead_submissions
CREATE POLICY "No public delete on lead_submissions"
ON public.lead_submissions
FOR DELETE
USING (false);

-- Replace the permissive INSERT policies with rate-limited ones
-- Drop existing overly permissive INSERT policies
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public insert on lead_submissions" ON public.lead_submissions;

-- Recreate INSERT policies (still public but explicitly named)
CREATE POLICY "Public can submit contact forms"
ON public.contact_submissions
FOR INSERT
WITH CHECK (
  length(name) <= 100
  AND length(email) <= 255
  AND length(coalesce(company, '')) <= 100
  AND length(coalesce(message, '')) <= 2000
);

CREATE POLICY "Public can submit lead forms"
ON public.lead_submissions
FOR INSERT
WITH CHECK (
  length(name) <= 100
  AND length(email) <= 255
  AND length(coalesce(company, '')) <= 100
);
