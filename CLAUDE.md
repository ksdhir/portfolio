@AGENTS.md
@PROJECT.md

## Translation Rule

Whenever content is updated in `messages/en.json`, you MUST update all other translation files (`messages/fr.json`, `messages/de.json`, and any future locale files) with the equivalent translated content. Never leave translation files out of sync with the English source.

## OG Image Localisation

Every `opengraph-image.tsx` under `app/[locale]/` MUST be locale-aware. The rules:

- Accept `params: Promise<{ locale: string }>` and resolve locale before rendering.
- Use `getTranslations({ locale, namespace })` — **never hardcode English strings** in `pageLabel`, `subtitle`, or `alt`.
- `pageLabel` → translated page heading (e.g. `tWork('heading')`, `tBeyondCode('heading')`, `tNav('resume')`).
- `subtitle` → `${tResume('title')} · Vancouver, BC` (uses `resume.title` from the locale's message file).

Triggers — update OG images when **any** of these happen:
1. **New locale added** — all existing `opengraph-image.tsx` files automatically pick it up via params; verify translations exist for every namespace used (`resume.title`, page headings).
2. **New page added** — create a locale-aware `opengraph-image.tsx` in the new route segment following the pattern above.
3. **Page heading changed** in `messages/en.json` — update all translation files; OG images derive from those keys so they update automatically.

## 404 / Not-Found Pages

`app/[locale]/not-found.tsx` only fires when `notFound()` is **explicitly called** inside the segment — it does NOT automatically catch unmatched URLs. For the custom 404 to show on unknown routes, a catch-all page must exist at `app/[locale]/[...rest]/page.tsx` that calls `notFound()`. Without it, Next.js falls back to the default built-in 404 page.
