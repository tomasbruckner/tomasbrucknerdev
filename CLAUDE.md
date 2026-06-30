# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio / landing page for Tomáš Bruckner. Next.js 10 + React 17 + Material-UI v4 + TypeScript, statically exported and deployed to Firebase Hosting. Single-page site (`pages/index.tsx`) composed of section components.

## Commands

```bash
npm run dev            # dev server via custom Express (server.js) on http://localhost:3000
npm run build          # next build
npm run export         # next build && next export -> outputs static site to out/
npm run lint           # eslint src pages --max-warnings 0  (zero-warning policy)
npm test               # jest (snapshot tests)
npm run test:update    # jest --update-snapshot (run after intentional markup/style changes)
npm run firebase:deploy # npm run export && firebase deploy  (deploys out/)
```

Run a single test by name or path: `npx jest navigation` or `npx jest src/components/__tests__/navigation.test.tsx`.

Note: `npm start` uses `NODE_ENV=production node server.js`, whose env-var prefix is not valid PowerShell/cmd syntax on Windows — set `NODE_ENV` separately or use Git Bash if you need it.

## Architecture

- **Rendering/deploy**: `next export` produces a fully static site in `out/`, which Firebase Hosting serves (`firebase.json` → `public: "out"`, SPA rewrite to `/index.html`). `next.config.js` sets `outDir: 'dist'` but export still emits to `out/`; the deploy flow uses `out/`. The Express `server.js` is for local dev/SSR only and is not part of the deployed artifact.
- **Material-UI v4 SSR**: `pages/_document.tsx` collects JSS styles with `ServerStyleSheets` so server-rendered markup matches the client. Styling is JSS via `makeStyles` — each component declares a local `useStyles`; cross-component styles live in `src/styles/commonStyles.tsx`. There is no MUI v5 / Emotion here.
- **i18n** (`src/utils/i18n.tsx`): custom, dependency-light. A frozen `translations` object keyed by language (`cs` default, `en`) and namespace; `t('a.b.c')` resolves dot-paths via `lodash/get` and falls back to the key string if missing. `language` is a module-level mutable variable — `changeLanguage()` exists but is not wired to any UI, so the site renders Czech only. Add new copy by adding keys under **both** `cs` and `en`.
- **Page composition**: `pages/index.tsx` assembles the section components (`AboutMe`, `Contact`, `Lectures`, `Footer`, `Navigation`) from `src/components/`. `Navigation` switches between full links and a hamburger menu via `useMediaQuery(theme.breakpoints.up('lg'))`. `src/components/icons/` holds inline SVG social icons.

## Testing

Jest + snapshot tests under `src/components/__tests__/`, one per component, rendered with `react-test-renderer` (`.toMatchSnapshot()`). `babel-jest` transforms TSX using the `next/babel` preset. `jest.setup.js` configures an Enzyme adapter, but current tests use `react-test-renderer`. When you change a component's output, regenerate snapshots with `npm run test:update` and review the diff.

## Conventions

- ESLint = airbnb + @typescript-eslint + prettier; lint runs with `--max-warnings 0`, so warnings fail. Prettier: single quotes, trailing commas, `printWidth: 100`, LF line endings.
- Husky `pre-commit` runs `lint-staged`, which prettifies staged `.tsx` files.
- TypeScript is non-strict (`strict: false`) but `strictNullChecks: true`; target ES5.
- Components are `FC` arrow functions with a default export.
