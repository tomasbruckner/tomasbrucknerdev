# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site for Tomáš Bruckner. Astro 5 + Tailwind 4, TypeScript, bilingual (cs default at `/`, en at `/en/`), static output, deployed to Cloudflare Pages. Single-page layout: Hero/About → Lectures → Contact.

## Commands

    npm run dev         # dev server (http://localhost:4321)
    npm run build       # static build -> dist/
    npm run preview     # serve built output
    npm run check       # astro type check
    npm run test:unit   # vitest (pure logic: i18n, data integrity)
    npm run test:e2e    # playwright smoke (auto build+preview)

Run a single unit test: `npx vitest run tests/unit/i18n.test.ts`
Run a single e2e test: `npx playwright test -g "theme toggle"`

## Architecture

- **Zero-JS default.** Only four interactive islands, each a small `<script>` in its `.astro` component: `ThemeToggle`, `LangSwitch` (just a link), mobile menu (in `Nav`), and the hover-reveal copy-email button (in `Contact`). No UI-framework runtime.
- **i18n is type-driven.** `src/i18n/cs.ts` is the source of truth; `src/i18n/en.ts` is typed `typeof cs`, so a missing/renamed key fails `astro check`. `useTranslations(lang)` returns the dictionary; access keys as typed properties (`t.nav.about`), not string paths. Locale comes from the route, never a mutable global.
- **Content is data.** Videos in `src/data/lectures.ts` (id + i18n key), FAQ in `src/data/faq.ts`; titles/answers live in the dictionaries. Site constants (email, socials, URL, analytics token) in `src/consts.ts`.
- **SEO/AI-search.** `Base.astro` emits per-locale title/description, canonical, hreflang (cs/en/x-default), OpenGraph/Twitter, and JSON-LD (Person, ProfessionalService). `Lectures` emits one `VideoObject` per talk. `public/robots.txt` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended); `public/llms.txt` summarizes the site; sitemap via `@astrojs/sitemap`.
- **Theme.** Class-based dark mode (`.dark` on `<html>`). Inline `<head>` bootstrap in `Base.astro` applies the stored/`prefers-color-scheme` choice before paint; `ThemeToggle` persists to `localStorage.theme`.
- **Video performance.** `VideoCard` is a lite-embed: thumbnail + play button; the real `youtube-nocookie` iframe is injected only on click.

## Conventions

- Add/edit copy only in `src/i18n/{cs,en}.ts` (keep shapes identical).
- New section = new `.astro` in `src/components/`, take a `lang: Lang` prop, wire into both `src/pages/index.astro` and `src/pages/en/index.astro`.
- Dark styles via Tailwind `dark:` variant; accent color is `--color-accent` (defined in `src/styles/global.css`).

## Deploy

Cloudflare Pages via **Wrangler direct upload** — run `./deploy.ps1` (builds, then `wrangler pages deploy dist`). NOT git-connected: pushing to `master` does **not** auto-deploy; the live site only updates when you run the deploy script. Live at https://tomasbruckner.dev (`www` 301-redirects to the apex via a Cloudflare Redirect Rule). CI (`.github/workflows/ci.yml`) runs check + unit + build + playwright on PRs. Analytics: Cloudflare Web Analytics via automatic injection (site is proxied), so `CF_ANALYTICS_TOKEN` in `src/consts.ts` stays empty — setting it too would double-count.
