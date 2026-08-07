# CLAUDE.md

Claude Code is the only coding tool used on this repo (decided 2026-08-07) —
this file is written for it directly, not kept generic for other tools.
`.cursor/rules/` and `.github/copilot-instructions.md` still exist and still
work (they point straight at `.ai/`, unaffected by this), they're just no
longer the primary target.

## What this repo is, in one paragraph

The official starter site ("Βασικό Template" / `agapps-starter`) for the
AgApps Hub platform (`ai.agapps.eu`) — a single-page Next.js brochure site
(Header, Hero, Services, About, CTA, Footer) that GitHub's "Generate from
template" API clones for every new customer. From that point on, **the
Hub's own site-editing AI** edits the clone turn-by-turn from customer chat
requests, reading this repo's `AGENTS.md` + `agent.manifest.json` as its
primary source of truth on every single turn (`prompts/system.ts` in the
parent repo). This repo itself is never a live customer site — it's the
seed every one of them starts from. Full detail: `.ai/knowledge/PROJECT_OVERVIEW.md`.

## Stack, in one table

| Layer | What | Gotcha |
|---|---|---|
| Next.js 16.2.9, App Router | exact pin, not `^` | Real breaking changes vs. older training data on App Router async APIs — not yet exercised here (one static route), but check before adding a dynamic one |
| React 19.2.4 + Tailwind v4 | | Tailwind v4 is CSS-first (`@import "tailwindcss"` + `@theme inline` in `globals.css`) — no `tailwind.config.js` |
| TypeScript ^5, `strict: true` | | |
| No database, no test runner | fully static | See `.ai/knowledge/TESTING_STRATEGY.md` for what "verified" means without tests |

## Verify before saying "done" — the only checks that exist

```
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # next build - confirms it actually compiles/renders
npm run dev         # manual/visual check - no test suite to lean on at all
```
No CI gates any of this today. If a `data-section`/`data-role`/content-array
shape changed, update `agent.manifest.json` in the same change — a stale
manifest actively misleads the Hub's AI on every future customer edit.

## The one rule that matters more than any other here

**`AGENTS.md` in this repo has two readers, not one**: a coding assistant
*and* the Hub's runtime site-editing AI, verbatim, on every customer's live
edit turn. Never put anything here meant for a coding assistant (an `.ai/`
loader, a "read this operating system" instruction) into `AGENTS.md` — the
runtime AI has no tools to act on it and pays the token cost on every single
customer turn regardless. That kind of instruction belongs in **this file**
or `.cursor/`/`.github/copilot-instructions.md`, never `AGENTS.md`. This is
not theoretical: it happened once already and was caught before it shipped —
`.ai/failures/LESSONS_LEARNED.md#ai-os-block-in-agents-md`,
`.ai/decisions/ARCHITECTURE_DECISIONS.md#ai-os-loader-not-in-agents-md`.

## Other things that will surprise you (verified, not guessed)

- **Brand color is hardcoded in 6 places, not themed.** `globals.css`
  defines `--color-brand: #0070f3` but nothing uses it — every component
  hardcodes the literal `text-[#0070f3]`/`bg-[#0070f3]`. A rebrand is a
  find/replace across all 6 files, not a `globals.css` edit.
- **Every section component is a Client Component** (`"use client"`),
  including ones with no interactivity, because each calls `useT()` for
  translated text. Only `page.tsx`, `layout.tsx`, `Container.tsx` are
  Server Components.
- **Bilingual by design (en/el)** — all visible copy lives in
  `src/lib/i18n.tsx`'s `translations` object; never hardcode a string into
  JSX. Adding/changing copy means editing both `en` and `el` keys.
- **No image is wired up anywhere** — `AboutSection.tsx` renders a gray
  placeholder `<div>`, not a photo.

---

<!-- AI-OS:BEGIN — managed by the .ai/ template. Edit .ai/, not this block. -->

This repository's agent instructions live in `AGENTS.md`, which is imported
below. The full rule set and project knowledge base are under `.ai/`.

@AGENTS.md

**Session start:** read `.ai/AI_OPERATING_SYSTEM.md` (short, required) and
`.ai/STATUS.md`, then load only the `.ai/` files your task needs — the routing
table is in `AI_OPERATING_SYSTEM.md` §4.

**Before saying a task is done:** run the real verification commands in
`.ai/knowledge/DEVELOPMENT_WORKFLOW.md`. If you could not run them, say exactly
that rather than implying success.

<!-- AI-OS:END -->
