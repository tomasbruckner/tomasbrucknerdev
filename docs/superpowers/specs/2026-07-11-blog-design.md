# Blog Support — Design

**Date:** 2026-07-11
**Status:** Approved by Tomáš (design review in session)

## Goal

Add a fully bilingual (cs/en) blog to tomasbruckner.dev, import the two existing
Medium posts, and make publishing future posts as easy as dropping in two
markdown files.

## Decisions Made

- **Languages:** fully bilingual — every post exists in both cs and en.
  The two imported Medium posts (English originals) get Czech translations.
- **Medium originals:** stay published; Tomáš manually adds an
  "Originally published at tomasbruckner.dev" note with a link at the top of
  each Medium post. Our site sets its own canonical.
- **Scope:** listing + post pages, nav item, RSS feed, homepage section with
  latest posts, tags with tag pages, build-time reading time.
- **Content architecture:** markdown + Astro 5 content collections; images in
  `src/assets/blog/<slug>/`, shared by both language versions, optimized by
  `astro:assets`.

## Content Model

- Collection `blog` defined in `src/content.config.ts` (Content Layer, glob
  loader) over `src/content/blog/{cs,en}/<slug>.md`.
- Frontmatter (zod schema): `title` (string), `description` (string),
  `pubDate` (date), `tags` (string[] — English, identical across the cs/en
  pair), optional `updatedDate` (date), optional `draft` (boolean; drafts are
  excluded from builds, listings, RSS, and sitemap).
- Slug = filename; identical for both language versions of a post.
- cs↔en pairing (equal slug sets, identical tags per pair) is enforced by a
  vitest data-integrity test, mirroring how `en.ts: typeof cs` guards the
  dictionaries.
- Reading time computed at build time by a remark plugin, per language.

## Routing

| Route | Purpose |
|---|---|
| `/blog/`, `/en/blog/` | listing, newest first |
| `/blog/<slug>/`, `/en/blog/<slug>/` | post detail |
| `/blog/tag/<tag>/`, `/en/blog/tag/<tag>/` | listing filtered by tag |
| `/rss.xml`, `/en/rss.xml` | RSS feed per locale |

## i18n Mechanics

- `getAltLangUrl(lang)` in `src/i18n/util.ts` gains a `pathname` parameter;
  because slugs are identical across languages, the alternate URL is a pure
  `/en` prefix add/remove. `LangSwitch` and the hreflang links in `Base.astro`
  both use it, so the language switch on a post lands on the same post in the
  other language.
- Nav anchor links change from `#about` to `/#about` (cs) / `/en/#about` (en)
  so they work from blog pages; behavior on the homepage is unchanged.
- Nav gains a **Blog** item linking to `/blog/` (resp. `/en/blog/`) — the only
  nav item that is a real page, not an anchor.
- All new UI copy goes to `src/i18n/{cs,en}.ts` with identical shapes.

## Components & UI

Everything matches the existing visual style (Tailwind, `dark:` variants,
accent color) and the zero-JS default — no new interactive islands.

- **`BlogCard.astro`** — title, description, localized date, reading time
  ("5 min čtení" / "5 min read"), tag chips linking to tag pages.
- **Listing pages** — heading + vertical list of cards. Tag page is the same
  with a filter and a "Tag: docker" heading.
- **Post page** — `Base` + `Nav` + `<article>` with prose typography
  (`@tailwindcss/typography`, `prose dark:prose-invert`). Code highlighted by
  built-in Shiki with a dual light/dark theme. Images via `astro:assets`
  (optimization + lazy-load). Under the title: date, reading time, tags. At
  the end: link back to the listing.
- **`BlogSection.astro`** — homepage section between Lectures and Contact:
  "Blog" heading, 3 newest posts as cards, "All posts →" link. Wired into
  both `src/pages/index.astro` and `src/pages/en/index.astro`.

## SEO

- `Base.astro` gains optional props `title`, `description`, `ogType` so blog
  pages emit their own meta instead of the global ones.
- Post pages emit JSON-LD `BlogPosting` (headline, description,
  datePublished, dateModified when present, author, inLanguage).
- Canonical points to our site (resolves the Medium duplicate-content
  question together with the manual Medium note).
- Sitemap picks up new routes automatically (`@astrojs/sitemap`).
- `public/llms.txt` gets a blog mention.
- OG image: site-wide default (no per-post covers for now).
- `<link rel="alternate" type="application/rss+xml">` in `Base.astro` head.

## RSS

`@astrojs/rss`: `/rss.xml` serves Czech versions, `/en/rss.xml` English
versions. Drafts excluded.

## Import of the Two Medium Posts

| Medium post | Slug | Tags | pubDate |
|---|---|---|---|
| Modern Web API Testing with Snapshots in .NET Core 3 | `snapshot-testing-dotnet-core` | `dotnet`, `testing` | 2020-04-06 |
| IntelliJ Xdebug with WSL 2 Docker | `intellij-xdebug-wsl2-docker` | `php`, `docker`, `wsl2` | 2020-07-19 |

- English version = original content converted to markdown, cleaned of Medium
  artifacts.
- All images downloaded from Medium CDN to `src/assets/blog/<slug>/`.
- Czech version = translation produced during import, reviewed by Tomáš
  before publishing.
- Original publication dates preserved.
- Manual follow-up for Tomáš (outside the repo): add the "Originally
  published at" note to both Medium posts.

## Testing

- **Unit (vitest):** cs/en slug sets equal; tags identical within each pair;
  valid dates; unique slugs.
- **E2E (playwright):** listing renders in both languages; post page renders
  a code block and images; language switch on a post navigates to the same
  post in the other language; tag page filters; RSS endpoints return XML;
  nav anchors work from blog pages.
- `astro check` guards types (frontmatter schema, i18n shapes). CI unchanged.

## Out of Scope

Comments, search, per-post OG images, newsletter. Deploy stays manual via
`deploy.ps1`.
