# Aetherion v1.1 (Supabase integrated - no encryption)

This package adds Supabase integration (no encryption) on top of the previous Aetherion core UI.

**Important:** Using the anon key in serverless routes is convenient but less secure.
For production, consider using a Service Role key on server-side only (not exposed to the browser).

## Steps to deploy

1. Create a Supabase project (you already did).
2. Run the SQL in `supabase_schema.sql` (Supabase SQL editor) to create tables.
3. In Vercel project settings add env vars (Project > Settings > Environment Variables):
   - NEXT_PUBLIC_SUPABASE_URL = <your supabase url>
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon/public API key>
4. Push to GitHub, import to Vercel and deploy.
5. Seed core memory (run once):
   curl -X POST https://<your-vercel-domain>/api/core/init
6. After successful seed, consider removing or protecting `/api/core/init` endpoint.

