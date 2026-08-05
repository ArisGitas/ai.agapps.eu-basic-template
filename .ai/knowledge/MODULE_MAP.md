---
status: filled
tier: 1
last_verified: 2026-08-05
verified_against: full src/ tree (11 files) via direct read
---

# Module Map

Small enough (11 source files) to list every file exhaustively rather
than summarize by folder.

## Top-level structure

| Path | Responsibility | Verified by reading |
|---|---|---|
| `src/app/layout.tsx` | Root HTML shell, `<head>` metadata, DM Sans font, wraps app in `<LanguageProvider>`. | direct read |
| `src/app/page.tsx` | The one homepage route — pure composition of the 6 section components, no content of its own. | direct read |
| `src/app/globals.css` | Tailwind v4 entry + `@theme inline` (`--font-sans`, `--color-brand`). | direct read |
| `src/lib/i18n.tsx` | Entire bilingual system: dictionary, `LanguageProvider`, `useT()`, `localStorage` persistence. | direct read |
| `src/components/Container.tsx` | Shared layout wrapper (`max-w-5xl mx-auto px-6`). Server Component. | direct read |
| `src/components/Header.tsx` | Nav bar: logo, nav links, language switch, contact CTA, mobile menu. | direct read |
| `src/components/HeroSection.tsx` | `data-section="hero"` — headline, subtitle, two CTAs. | direct read |
| `src/components/ServicesSection.tsx` | `data-section="services"` — owns the 3-item `services` content array. | direct read |
| `src/components/AboutSection.tsx` | `data-section="about"` — owns `highlightKeys`, has the unwired image placeholder. | direct read |
| `src/components/CTASection.tsx` | `data-section="cta"`, `id="contact"` (name/id mismatch — see below). Real `mailto:`/`tel:` links. | direct read |
| `src/components/Footer.tsx` | `data-section="footer"` — its own separate, hardcoded `navLinks` array. | direct read |

## Dependency direction

Strictly one level: `page.tsx` imports all 6 section components + none
of them import each other. Every section component (except `Container`)
imports `useT` from `src/lib/i18n.tsx` — `i18n.tsx` has zero imports
from `components/`, so the dependency is one-directional
(components → i18n, never the reverse). Verified by reading every
`import` line in all 11 files; no cross-component imports exist except
each section importing `./Container`.

## Entry points

Exactly one: `src/app/page.tsx`, rendered by Next.js App Router at `/`.
There is no API route, no CLI, no worker/cron, no other page.

## Modules that are unusually important or unusually risky to change

- **`src/lib/i18n.tsx`** — every single piece of visible text in the
  entire site is a key in its `translations` object. A change here that
  drops a key (or fills only one language) silently breaks the other
  language's rendering (falls back to the key string itself, or to the
  English value — see `t()`'s fallback chain in the file). Every other
  component depends on it.
- **`Header.tsx` and `Footer.tsx` both hardcode their own `navLinks`
  array independently** (confirmed: not shared, not imported from a
  common source) — a nav item added to one and not the other is a real,
  easy-to-miss inconsistency. No incident recorded yet, but this is the
  single most likely place for one (see `COMMON_MISTAKES.md`).
- **`agent.manifest.json`** (not a `src/` file, but equally load-bearing)
  — the Hub's runtime AI treats it as ground truth for every customer
  edit turn. Letting it drift from the real `data-section`/`data-role`
  attributes is worse than deleting it (per `AGENTS.md`'s own stated rule).
