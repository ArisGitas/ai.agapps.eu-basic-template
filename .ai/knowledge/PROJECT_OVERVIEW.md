---
status: filled
tier: 1
last_verified: 2026-08-05
verified_against: package.json, all of src/ (11 files), agent.manifest.json, AGENTS.md
---

# Project Overview

## What this project is

**agapps.eu basic template** ("Βασικό Template" / `agapps-starter`) — the
official starter site of the AgApps Hub platform (the parent project,
`ai.agapps.eu`). It is a single-page Next.js business/brochure site
(Header, Hero, Services, About, CTA/Contact, Footer) that gets cloned
via GitHub's "Generate from template" API (`repo: "ArisGitas/ai.agapps.eu-basic-template"`
in the Hub's `src/lib/templates.ts`) every time a customer creates a new
site on the platform. From that point on, it is edited turn-by-turn by
the Hub's own AI agent based on the customer's chat requests — **this
repo is not itself a live customer site**, it is the seed every one of
them starts from.

Because of that, its real "users" are two different audiences, and both
matter:
1. The Hub's own site-editing AI (`runAgentTurn` in the parent repo's
   `services/ai.ts`), which reads this repo's `AGENTS.md` +
   `agent.manifest.json` **on every single customer edit turn** — see
   "Non-negotiable operating constraints" below.
2. A human developer (or a coding assistant) evolving this template's
   own baseline over time — what `.ai/` (this knowledge base) is for.

## Tech stack

| Layer | Technology | Version (verified) | Notes / gotchas |
|---|---|---|---|
| Language | TypeScript | ^5, `strict: true`, `noUncheckedIndexedAccess: true` | Same strict settings as the parent Hub project. |
| Framework | Next.js, App Router | 16.2.9 (exact, not `^`) | Real breaking changes vs. older training data on the App Router (async `params`/`cookies()` etc.) — none of that is exercised here yet since there's only one static route, but any new dynamic route needs it checked. |
| UI | React, Tailwind CSS | 19.2.4, v4 | Tailwind v4 is CSS-first (`@import "tailwindcss"` + `@theme inline` in `globals.css`), not the old `tailwind.config.js` model. |
| Font | `next/font/google` (DM Sans) | — | Loaded once in `layout.tsx`, exposed as `--font-dm-sans` → mapped to `--font-sans` in `globals.css`'s `@theme inline`. |
| Package manager | npm | — | |
| Test runner | **none** | — | No test runner, no test files, no `"test"` script in `package.json`. See `TESTING_STRATEGY.md`. |
| Database | **none** | — | Fully static content, no persistence layer at all. |
| Linting | ESLint 9 (flat config) + Prettier | `eslint-config-next` pinned to the exact Next.js version (16.2.9) | `eslint.config.mjs` composes `next/core-web-vitals` + `next/typescript` + `eslint-config-prettier` (Prettier integration is "disable conflicting ESLint formatting rules," not `eslint-plugin-prettier` — Prettier itself isn't run through ESLint). |

## Verification commands — run these before claiming anything is done

```
install:     npm install
lint:        npm run lint          (eslint)
type-check:  npm run typecheck     (tsc --noEmit)
test:        (none - no test script exists)
build:       npm run build         (next build)
run locally: npm run dev           (next dev)
```

All five scripts are confirmed to exist verbatim in `package.json`; not
independently re-run this session (no reason to suspect they're broken —
this is a freshly-scaffolded, small template with no CI failures on
record). Confirm with a real run before trusting further if this file's
`last_verified` date is old.

## How a typical operation flows

There is exactly one route. `src/app/layout.tsx` wraps everything in
`<LanguageProvider>` (English by default) and loads the DM Sans font.
`src/app/page.tsx` composes six section components in order
(`Header`, `HeroSection`, `ServicesSection`, `AboutSection`,
`CTASection`, `Footer`) — see `SYSTEM_ARCHITECTURE.md` for the full
trace including how the bilingual switch works client-side.

## Non-negotiable operating constraints

**The Hub's own AI reads `AGENTS.md` (and `agent.manifest.json`) as its
primary source of truth on every customer edit turn to this template's
descendants** (confirmed by reading the parent repo's
`prompts/system.ts`, `SYSTEM_PROMPT_V7` onward: *"check get_file_tree
for these FIRST, before anything else, every turn... they are the
primary source of truth and override the generic guesses below"*).
Consequences for anyone editing this template's baseline:

- **`AGENTS.md` must stay scoped to facts a site-editing AI can act on**
  — this template's own conventions (data-section/data-role, i18n,
  stack facts, known quirks). It must **never** carry instructions meant
  for a coding assistant working on a software project (e.g. this
  repo's own `.ai/` operating-system loader) — the runtime AI has no
  tools to act on those and no benefit from reading them, and every
  extra irrelevant paragraph is pure overhead on every single customer
  turn. That loader lives in `CLAUDE.md`/`.cursor/`/`.github/copilot-instructions.md`
  instead — never in `AGENTS.md`. (Real incident 2026-08-05, see
  `../failures/LESSONS_LEARNED.md#ai-os-block-in-agents-md`.)
- **`agent.manifest.json` must be updated in the same change** whenever
  a `data-section`/`data-role`/content-array shape changes — a stale
  manifest actively misleads every future customer edit, worse than no
  manifest (this rule is already stated in `AGENTS.md` itself and in
  the parent repo's system prompt rule 8).
- Ask the human before assuming more than this — no other constraints
  have been stated as of this init pass.

## Things that will surprise you about this codebase

- **`AGENTS.md` serves two audiences at once, unlike almost every other
  repo.** In the parent Hub project (and most software projects),
  `AGENTS.md` is read only by developer-facing coding tools. Here it is
  ALSO read directly, verbatim, by the product's own runtime AI on
  every customer's live edit — see "Non-negotiable operating
  constraints" above. Never assume the two-file (`AGENTS.md` +
  `CLAUDE.md`) convention from the parent repo transfers unchanged.
- **The brand color is NOT actually wired to its own design token.**
  `globals.css` defines `--color-brand: #0070f3` in `@theme inline`,
  but no component uses a `brand-*` Tailwind utility — every component
  hardcodes the literal arbitrary value `text-[#0070f3]`/`bg-[#0070f3]`
  instead, across 6 files (`globals.css`, `Header`, `HeroSection`,
  `ServicesSection`, `AboutSection`, `CTASection`). A full rebrand-color
  change is a literal find/replace across all 6, not a one-line
  `globals.css` edit. Already documented in `agent.manifest.json` and
  `AGENTS.md` — confirmed still true by reading all 6 files directly.
- **The brand *name* is not hardcoded** (already fixed, unlike the
  color) — it reads from `translations.{en,el}.brand` in `src/lib/i18n.tsx`
  everywhere except `layout.tsx`'s `metadata.title` literal (Next.js
  metadata can't call the `useT()` hook).
- **No image is actually wired up anywhere in the template.**
  `AboutSection.tsx` renders a gray placeholder `<div>` instead of a
  real photo; `public/images/` contains only a README explaining the
  convention (`public/images/<name>` → `/images/<name>`, no import
  needed) for whenever a real client photo is dropped in.
- **Language persistence uses `useSyncExternalStore`, not
  `useState`+`useEffect`.** `src/lib/i18n.tsx`'s `LanguageProvider`
  reads the saved language from `localStorage` this way specifically so
  the server always renders English (no `localStorage` access
  server-side) and the client reconciles on hydration with zero
  mismatch warning and no flash — a deliberate, slightly unusual
  pattern for what could look like a simple `useState`.
- **Every section component is a Client Component**, including ones
  with no interactivity of their own (`HeroSection`, `ServicesSection`,
  `CTASection`), purely because each calls `useT()` for translated
  text. `page.tsx`, `layout.tsx`, and `Container.tsx` are the only
  Server Components.
- **No test runner at all** — confirmed absent from `package.json`
  (no `vitest`/`jest`/`playwright` dependency, no `"test"` script).
  See `TESTING_STRATEGY.md`.

## Where the rest of the knowledge lives

- `MODULE_MAP.md` — what each file owns (there are only 11 source files total).
- `SYSTEM_ARCHITECTURE.md` — the full page-render + language-switch trace.
- `DATA_FLOW.md` — how a customer's chat request becomes a real code change here.
- `CODING_STANDARDS.md` / `DESIGN_PATTERNS.md` — data-section/data-role convention, i18n convention.
- `TESTING_STRATEGY.md` — confirms "none," and what that means for verification.
- `DEPENDENCY_RULES.md` — the three runtime dependencies, kept deliberately minimal.
- `COMMON_MISTAKES.md` / `../failures/LESSONS_LEARNED.md` — the AGENTS.md-contamination incident.
