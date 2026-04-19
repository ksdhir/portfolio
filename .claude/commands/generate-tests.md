---
description: Generate or update tests for recently changed source files
---

You are generating tests for this portfolio (Next.js 16, App Router, TypeScript).

## Scope

Generate or update tests for source files that are **staged for commit** (if any),
otherwise files changed since the last commit. Restrict to `app/`, `lib/`,
`components/`, and `scripts/`.

Run this first to see what's in scope:

```
git diff --name-only --cached --diff-filter=ACM
git diff --name-only HEAD --diff-filter=ACM
```

If both return nothing, report "No changed source files — nothing to generate"
and stop.

## What to generate

For each in-scope file, decide the right test layer:

- **Pure functions / utilities** → unit tests with Vitest
  (`*.test.ts` colocated next to source).
- **React components / pages** → integration tests with React Testing Library
  + Vitest (`*.test.tsx` colocated).
- **Full user flows** → Playwright E2E in `tests/e2e/` (only if the change
  clearly introduces a new user-visible flow, not for minor component edits).

If test deps aren't installed yet, stop and report exactly which to install
(`vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`,
`@playwright/test`). Don't attempt to install them yourself.

## Rules

- Prefer role-based locators and accessible names over CSS selectors or testids.
- Cover happy path + one realistic edge case per file. Don't pad with trivia.
- If a test already exists, update it rather than creating a parallel file.
- Never mock what can be tested for real (pure functions, static content).
- For Next.js server components, test the rendered output, not the framework.
- Read `AGENTS.md` and any relevant `node_modules/next/dist/docs/` guide before
  writing framework-specific code (testing server components, metadata, etc.).

## Output

After generation, report per file:

- Path of the generated/updated test
- Layer (unit / integration / E2E)
- One-line rationale for what's covered

Do **not** run the tests — leave that to CI or the developer. Do **not**
commit — the developer reviews first.
