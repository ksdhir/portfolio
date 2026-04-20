# Portfolio — Project Overview

Personal portfolio site for Karan Singh Dhir (Senior Software Engineer, Vancouver BC). Static, content-driven, i18n-enabled pages rendered by Next.js.

Live sections: About (`/`), Work (`/work`), Resume (`/resume`), Beyond Code (`/beyond-code`).
Locales: English (`/en/*`) and French (`/fr/*`). Accept-Language header auto-detects and redirects.

## Stack

- **Next.js 16.2.4** (App Router) — note: AGENTS.md warns this version has breaking changes; consult `node_modules/next/dist/docs/` before writing Next-specific code.
- **React 19.2.4** / **React DOM 19.2.4**
- **TypeScript 5** (strict), path alias `@/*` → project root.
- **Tailwind CSS 4** via `@tailwindcss/postcss`. Theme tokens in `app/globals.css` (accent color `#3D5A73`, Geist + Playfair Display fonts from `next/font/google`).
- **next-intl 4.x** — i18n library for translations, locale routing, and locale-aware navigation.
- **ESLint 9** with `eslint-config-next`.
- **pnpm** (workspace file present, lockfile `pnpm-lock.yaml`). Scripts: `dev`, `build`, `start`, `lint`.
- **docx 9.6.1** — used only by the resume generator script (devDep).

## Layout

```
app/
  layout.tsx            Minimal root pass-through (html/body live in [locale]/layout.tsx)
  [locale]/
    layout.tsx          Full layout: html, body, fonts, Nav, NextIntlClientProvider
                        Exports generateStaticParams() → ['en', 'fr']
    page.tsx            About page
    opengraph-image.tsx Dynamic OG card
    work/
      page.tsx          Groups projects by company
      opengraph-image.tsx
    resume/
      page.tsx          Renders resume from messages/{locale}.json
      CopyResumeButton.tsx  Client: fetches /resume.txt and copies to clipboard
      opengraph-image.tsx
    beyond-code/
      page.tsx
      opengraph-image.tsx
  components/
    Nav.tsx             Client nav — useTranslations('nav'), locale-aware Link,
                        language switcher (EN ↔ FR)
    RichText.tsx        Renders paragraphs with inline {label} link placeholders
  lib/
    og.tsx              Shared OgCard component for ImageResponse
    metadata.ts         buildMetadata() helper — consistent openGraph + twitter fields
  globals.css           Tailwind v4 import + theme tokens
  icon.svg              Favicon

i18n/
  routing.ts            defineRouting({ locales: ['en','fr'], defaultLocale: 'en' })
  request.ts            getRequestConfig — loads messages/{locale}.json per request
  navigation.ts         createNavigation(routing) — locale-aware Link, usePathname, etc.

messages/               Single source of truth for all page content (replaces data/*.json)
  en.json               English: nav, about, work, beyondCode, resume namespaces
  fr.json               French translations of the same structure

proxy.ts                Next.js 16 locale proxy — reads Accept-Language, redirects to
                        /en or /fr; URL prefix (/fr/work) takes precedence

next.config.ts          Wrapped with withNextIntl(createNextIntlPlugin('./i18n/request.ts'))

data/
  resume.json           Used ONLY by the resume generator script — not read at runtime
  about.json            Legacy — superseded by messages/en.json (kept for reference)
  projects.json         Legacy — superseded by messages/en.json
  beyond-code.json      Legacy — superseded by messages/en.json

public/
  photo.jpeg            About photo
  resume.docx           Generated from data/resume.json (downloadable)
  resume.txt            Generated from data/resume.json (for clipboard + ATS)
  *.svg                 Brand icons

scripts/
  generate-resume-docx.mjs   Reads data/resume.json → writes resume.docx + resume.txt

docs/                   Working notes (not user-facing)
  interview-talking-points.md
  playwright-mcp-exploration.md
  resume.md

AGENTS.md               Loaded via CLAUDE.md; warns Next.js 16 differs from training data
```

## i18n Architecture

### How locale routing works
1. User visits `/` → `proxy.ts` reads `Accept-Language` header → redirects to `/en` or `/fr`
2. User visits `/fr/work` → proxy passes through, page renders in French
3. Nav language switcher (`EN` / `FR`) links to the same path in the other locale

### How translations work
- All page copy lives in `messages/{locale}.json`, namespaced by page:
  `nav`, `about`, `work`, `beyondCode`, `resume`
- Server components: `const t = await getTranslations('work')`
- Client components: `const t = useTranslations('nav')`
- Structured data (arrays/objects): `t.raw('projects')` returns raw JSON value
- To add content, edit both `messages/en.json` and `messages/fr.json`

### Static generation
- `generateStaticParams()` in `[locale]/layout.tsx` pre-builds `/en` and `/fr` variants
- All pages are statically generated at build time — no per-request server rendering
- `setRequestLocale(locale)` is called at the top of each Server Component to enable this

### Adding a new locale
1. Add the locale to `routing.locales` in `i18n/routing.ts`
2. Create `messages/{locale}.json` with translated content
3. `generateStaticParams` picks it up automatically

## Conventions

- **Content is data, not code.** Page copy lives in `messages/*.json`; `.tsx` files are layout/presentation only. To change content, edit the message files.
- **Inline links use `{label}` placeholders** resolved against a `links` map — same pattern in `RichText.tsx`, `app/[locale]/resume/page.tsx`, and `scripts/generate-resume-docx.mjs`. If the pattern changes, update all three.
- **Resume artifacts are generated, not hand-edited.** After editing `data/resume.json`, run `node scripts/generate-resume-docx.mjs` to regenerate `public/resume.docx` and `public/resume.txt`. The resume PAGE reads from `messages/{locale}.json`; the generator reads from `data/resume.json` — keep these in sync.
- Server components by default; `"use client"` is used sparingly (`Nav.tsx`, `CopyResumeButton.tsx`).
- Tailwind v4 `@theme inline` with CSS variables; prefer `text-accent` / `bg-accent` over hardcoded hex.
- Typography: `font-[family-name:var(--font-playfair)]` for display headings.

## Commands

```
pnpm dev      # Next dev server on :3000
pnpm build    # production build
pnpm start    # serve prod build
pnpm lint     # eslint
node scripts/generate-resume-docx.mjs   # regenerate resume.docx + resume.txt
```

## Gotchas

- Editing `data/resume.json` without running the generator leaves `/resume.docx` and `/resume.txt` (copy-to-clipboard) stale.
- The resume page reads from `messages/{locale}.json`; the generator reads from `data/resume.json`. If resume content changes, update both.
- `app/[locale]/resume/page.tsx` and `generate-resume-docx.mjs` must stay in sync on the resume schema.
- Next.js 16 uses `proxy.ts` (not `middleware.ts`) with a named `proxy` export.
- Next.js 16 is newer than training data — check `node_modules/next/dist/docs/` before touching routing, metadata, caching, or config.
