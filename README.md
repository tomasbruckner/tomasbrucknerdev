# tomasbruckner.dev

Personal site — Astro 5 + Tailwind 4, bilingual (cs/en), static, deployed to Cloudflare Pages.

## Develop

    npm install
    npm run dev        # http://localhost:4321

## Quality

    npm run check      # astro type check
    npm run test:unit  # vitest (pure logic)
    npm run test:e2e   # playwright smoke (builds + previews automatically)

## Build

    npm run build      # static output -> dist/
    npm run preview    # serve the built output

## Deploy (Cloudflare Pages)

Deployed with Wrangler (direct upload). Project config is in `wrangler.toml`
(`name`, `pages_build_output_dir = "dist"`). `public/_headers` ships to the
deploy root.

First time on a machine, log in to Cloudflare in an interactive terminal:

    npx wrangler login        # or set CLOUDFLARE_API_TOKEN

Then deploy (builds, then uploads `dist/` to the production branch):

    ./deploy.ps1              # npm run build && wrangler pages deploy dist --branch main

Local Cloudflare Pages preview:

    ./preview.ps1             # npm run build && wrangler pages dev dist

Alternatively, connect the GitHub repo in the Cloudflare dashboard (Pages →
Connect to Git, Astro preset, build `npm run build`, output `dist`) for
push-to-deploy.

## Analytics

Cloudflare Web Analytics: enable it in the dashboard (Web Analytics → add site), copy the
token, and set `CF_ANALYTICS_TOKEN` in `src/consts.ts`. Empty string disables the beacon.

## Content

- Copy/translations: `src/i18n/cs.ts`, `src/i18n/en.ts`
- Lectures: `src/data/lectures.ts`
- Site constants (email, socials, URL, analytics token): `src/consts.ts`
