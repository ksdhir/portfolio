@AGENTS.md
@PROJECT.md

## Translation Rule

Whenever content is updated in `messages/en.json`, you MUST update all other translation files (`messages/fr.json`, `messages/de.json`, and any future locale files) with the equivalent translated content. Never leave translation files out of sync with the English source.

## 404 / Not-Found Pages

`app/[locale]/not-found.tsx` only fires when `notFound()` is **explicitly called** inside the segment — it does NOT automatically catch unmatched URLs. For the custom 404 to show on unknown routes, a catch-all page must exist at `app/[locale]/[...rest]/page.tsx` that calls `notFound()`. Without it, Next.js falls back to the default built-in 404 page.
