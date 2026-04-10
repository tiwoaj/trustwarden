# TrustWarden

Cybersecurity company marketing site — penetration testing, managed security, and compliance services.

## Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Supabase** (contact + lead form submissions)
- **react-router-dom** (routing)

## Pages

- `/` — Home (hero, services, process, pricing, testimonials, FAQ)
- `/services` — Full service breakdown
- `/about` — Mission, story, values
- `/contact` — Contact form → Supabase Edge Function

## Getting started

```bash
npm install
npm run dev
```

## Environment variables

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```
