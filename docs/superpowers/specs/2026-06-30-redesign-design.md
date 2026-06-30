# Redesign tomasbruckner.dev — Design Spec

**Datum:** 2026-06-30
**Stav:** schváleno k implementaci

## Cíl

Kompletní přepsání osobního webu Tomáše Brucknera. Současný stav (Next.js 10 + Material-UI v4 + vlastní rozbité i18n + statický export na Firebase) se nahradí moderním, rychlým, dvojjazyčným a SEO/AI-search optimalizovaným webem. Kompletní výměna, bez fázování.

### Motivace (proč)
- Zastaralý stack (Next 10, MUI v4, React 17, custom Express dev server).
- Pomalý load — mj. 12 YouTube `<iframe>` přehrávačů načítaných najednou, externí Google Font.
- Rozbité i18n: `language` je mutable modulová proměnná natvrdo na `cs`, `changeLanguage()` není nikde napojené → web je fakticky jen česky.
- Mrtvá analytika: Universal Analytics (`UA-…`), vypnuté Googlem od 2023.
- Zastaralý vizuál.

## Rozsah

### V rozsahu
- Hero / O mně, Přednášky (YouTube videa), Kontakt (odkazy), patička, navigace.
- Dvojjazyčnost cs + en s reálným routováním a přepínačem.
- Minimalistický redesign (směr Vercel/Linear), light + dark.
- SEO + AI-search (GEO) optimalizace.
- Deploy na Cloudflare Pages.

### Mimo rozsah (YAGNI, lze přidat později)
- Blog, portfolio/projekty, sekce reference/skills jako samostatné moduly.
- Kontaktní formulář (jen odkazy).
- Stažitelné CV/PDF (zváženo, vynecháno).
- CMS.

## Stack a architektura

- **Astro 5** + **Tailwind CSS 4**. Výstup: čisté statické HTML (`astro build`).
- **Zero-JS jako default.** Interaktivita jen ve čtyřech malých islands (vanilla / lehký inline JS, žádný React runtime):
  1. Přepínač jazyka (cs ↔ en, drží aktuální sekci).
  2. Přepínač light/dark (volba v `localStorage`, bootstrap skript v `<head>` proti bliknutí).
  3. Mobilní menu (hamburger).
  4. Tlačítko „zkopírovat e-mail" (Clipboard API + krátké potvrzení).
- **TypeScript** napříč; `astro check` pro typovou kontrolu.

### Struktura projektu
```
src/
  pages/        index.astro (cs, na "/"), en/index.astro (en, na "/en/"),
                404.astro (cs), en/404.astro (en)
  layouts/      Base.astro  (head, meta, OG, hreflang, JSON-LD, theme bootstrap)
  components/   Hero, About, Lectures, VideoCard, Faq, Contact, CopyEmail,
                Nav, Footer, ThemeToggle, LangSwitch, social ikony
  i18n/         cs.ts, en.ts, util.ts (typovaný slovník + helper; vč. faq)
  data/         lectures.ts (jeden zdroj videí: youtubeId + title cs/en)
  styles/       global.css (Tailwind direktivy + theme tokeny)
public/         kompletní sada favicon, site.webmanifest (PWA), OG obrázek 1200×630,
                profilová fotka (převzato ze stávajícího), robots.txt, llms.txt
.github/        workflows/ci.yml (astro check + build + Playwright na PR)
astro.config.mjs
```

Migrace je destruktivní: smažou se `pages/`, `src/` (stávající), `server.js`, `next.config.js`, `firebase.json`, `jest.*`, `.babelrc`, MUI/Next/Express/Jest závislosti. `package.json` se přepíše na Astro toolchain. Profilová fotka a favicony z `public/` se zachovají.

## Obsah a sekce (jedna stránka, vycentrovaný sloupec)

Pořadí: sticky horní lišta → Hero/O mně → Přednášky → FAQ → Kontakt → patička.

- **Horní lišta** — jméno vlevo; vpravo odkazy na sekce (O mně, Přednášky, Kontakt) + přepínač jazyka + přepínač light/dark. Na mobilu hamburger.
- **Hero/O mně** — velké jméno (`<h1>`), tagline, specializace (React · Node.js · MongoDB · AWS), CTA „Napiš mi". Text formulovaný fakticky (viz AI-search).
- **Přednášky** — mřížka videí (responsivní, 1–2 sloupce). **Lite-embed:** zobrazí se náhledový obrázek z YouTube + tlačítko ▶; skutečný `<iframe>` se vloží až po kliknutí uživatele. Eliminuje načítání 12 přehrávačů při startu.
- **FAQ** — pár otázek a odpovědí o spolupráci (např. „S čím pomáhám", „Pro jaké klienty pracuji", „Jak probíhá spolupráce"). Cs/en v i18n. Podkládá `FAQPage` JSON-LD (silná AI-search páka).
- **Kontakt** — pouze odkazy: e-mail, LinkedIn, GitHub, StackOverflow, Medium (jako dnes) + tlačítko „zkopírovat e-mail" s potvrzením. Žádný formulář.
- **Patička** — copyright, případně drobné odkazy.

### Zdroj dat o videích
`src/data/lectures.ts` — pole položek `{ youtubeId, titleKey }`, kde titulek je v i18n slovníku pro cs i en. Komponenta `Lectures` mapuje data → `VideoCard`. (Dnešní seznam 12 videí se převezme.)

## Dvojjazyčnost cs / en

- Astro i18n: `defaultLocale: 'cs'` bez prefixu (`/`), `en` s prefixem (`/en/`).
- Texty v typovaných slovnících `src/i18n/cs.ts` a `en.ts` se shodným tvarem (TypeScript hlídá chybějící klíče). Helper `t(locale, key)`.
- Přepínač jazyka odkazuje na ekvivalentní stránku v druhém jazyce.
- Žádná runtime mutable proměnná — jazyk plyne z routy.

## Vzhled

- Minimalismus: velkorysý whitespace, výrazná typografie, **jedna akcentní barva**.
- Theme přes CSS proměnné / Tailwind tokeny. **Výchozí motiv dle systému (`prefers-color-scheme`)**; uživatelská volba přepínačem se uloží do `localStorage` a má přednost. Inline bootstrap skript v `<head>` nastaví třídu před prvním paintem (bez bliknutí). Animace respektují `prefers-reduced-motion`.
- **Self-hostovaný font** (Inter přes `@fontsource`) místo externího Google Fonts requestu.

## Přístupnost (a11y)

- Sémantické HTML, korektní hierarchie nadpisů, „skip to content" odkaz.
- Viditelné focus stavy, klávesová ovladatelnost všech islands, `aria-label` u přepínačů a hamburgeru.
- Dostatečný kontrast v light i dark, `aria-expanded` u mobilního menu, alt texty u obrázků.

## SEO & AI-search (GEO)

### Klasické SEO
- `@astrojs/sitemap` → `sitemap.xml`; `robots.txt` v `public/`.
- Per-locale metadata: unikátní `title` a `description` pro cs i en, `canonical`, `hreflang` propojení cs↔en (+ `x-default`).
- Kompletní OpenGraph + Twitter cards, vlastní **OG obrázek 1200×630** (nahrazuje dnešní profilovku jako náhled).
- `site.webmanifest` (PWA) + kompletní sada favicon.
- **Lokalizovaná custom 404** (cs/en) místo dnešního SPA rewrite na index.
- Sémantické HTML, právě jedna `<h1>` na stránku, korektní hierarchie nadpisů.
- Výkon jako ranking faktor — řešeno stackem (Astro), lite-embed videí, self-hosted fontem.

### AI-search / GEO
- **Schema.org JSON-LD** v `Base.astro`:
  - `Person` (jméno, role, `knowsAbout`: React, Node.js, MongoDB, AWS, odkazy na profily přes `sameAs`).
  - `ProfessionalService` / nabídka konzultací.
  - `VideoObject` pro každou přednášku (název, thumbnail, embedUrl).
  - `FAQPage` z obsahu FAQ sekce (Q&A formát, ze kterého AI enginy přímo citují).
- **Faktické formulace** v obsahu — jasná tvrzení o entitě (kdo je, co dělá, co nabízí), ze kterých AI enginy a Google tahají fakta a citace.
- **`llms.txt`** v kořeni (`public/llms.txt`) — stručný markdown souhrn webu pro LLM/AI crawlery.
- **`robots.txt` povolí AI crawlery** — `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` mají přístup (cíl: viditelnost a citace v AI vyhledávačích).

## Nasazení a analytika

- **Cloudflare Pages**, build `astro build`, output adresář `dist`, deploy z Git (push → build → deploy). Přidá se konfigurace + krátký návod do README.
- **Analytika:** zahodit Universal Analytics; nahradit **Cloudflare Web Analytics** (zdarma, bez cookies, bez cookie banneru).

## Testy

- `astro check` — typová kontrola.
- Jeden **Playwright smoke test**: obě jazykové mutace (`/` a `/en/`) se vykreslí s `<h1>`, přepínač dark přepne motiv, lite-embed po kliknutí vloží iframe, „zkopírovat e-mail" funguje.
- **GitHub Actions CI** (`.github/workflows/ci.yml`): na každý PR `astro check` + `astro build` + Playwright smoke test. Pojistka proti rozbitému deployi (Cloudflare buildí nezávisle).
- Žádné snapshot testy (na rozdíl od dnešního Jest/Enzyme).

## Aktualizace dokumentace

- `CLAUDE.md` se po implementaci přepíše na nový stack (Astro/Tailwind/i18n/Cloudflare).
- README dostane sekci build/dev/deploy.

## Otevřené body k doladění při implementaci
- Konkrétní akcentní barva.
- Přesné znění hero textu a meta description cs/en.
- Volba ne/použití profilové fotky v heru.
