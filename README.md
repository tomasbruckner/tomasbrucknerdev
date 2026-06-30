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

Connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git):

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

Every push to `master` triggers a production deploy; PRs get preview deploys.

## Analytics

Cloudflare Web Analytics: enable it in the dashboard (Web Analytics → add site), copy the
token, and set `CF_ANALYTICS_TOKEN` in `src/consts.ts`. Empty string disables the beacon.

## Content

- Copy/translations: `src/i18n/cs.ts`, `src/i18n/en.ts`
- Lectures: `src/data/lectures.ts`
- FAQ: `src/data/faq.ts`
- Site constants (email, socials, URL): `src/consts.ts`
