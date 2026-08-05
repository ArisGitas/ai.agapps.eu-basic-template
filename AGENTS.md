# Agent notes — agapps.eu basic template

This template is customized per client by an AI agent (interactive or API-driven), not by a human reading every file first. Two things make that fast:

## 1. `data-section` / `data-role` attributes in the JSX

Every page-section component's root element carries `data-section="<name>"` (e.g. `hero`, `services`, `footer`). Elements a client is likely to ask about carry `data-role="<name>"` describing **what the element does**, not where it is (e.g. `title`, `subtitle`, `contact-button`, `nav-link`).

- Role names are **reused** across sections by design — several elements can share `data-role="nav-link"` or `data-role="contact-button"`. Always scope a lookup to the nearest `data-section` ancestor rather than assuming a role is unique on the page.
- Not every element has a role — only the ones enumerated in `agent.manifest.json` under each section's `untaggedContent`. If something isn't tagged, grep the file directly.
- These attributes are purely presentational metadata: don't remove them when editing content, and add matching ones (function-based, generic, no business-specific wording) if you introduce a new section or a new interactive element.

## 2. `agent.manifest.json`

Structured map of every section: its file path, its `data-role`s, any content array it's driven by (`services`, `navLinks`, `highlights`), and known quirks worth knowing before editing — notably:

- The brand color (`#0070f3`) is hardcoded as a Tailwind arbitrary value in six separate files. There's an unused `--color-brand` token in `globals.css`, but nothing references it. A full color change means a literal find/replace across all six files, not just editing `globals.css`.
- The brand name string is hardcoded in three separate places (Header, Footer, and `layout.tsx` metadata), not a shared constant.
- Section anchors (`#about`, `#services`, `#contact`) are targeted by nav `href`s in both Header and Footer — if you rename an id, update every link pointing to it.

**Keep the manifest in sync**: if you add, remove, or rename a `data-section`/`data-role` or a content array's shape, update `agent.manifest.json` in the same change. A stale manifest is worse than no manifest.

## 3. Stack facts — this is App Router, not Pages Router

Next.js 16 App Router, React 19, Tailwind v4. There is **no `src/pages/` directory, no `_app.tsx`/`_document.tsx`, and no `i18n` block in `next.config.ts`** — those are Pages Router concepts and do nothing here. Routes live under `src/app/`; the homepage is `src/app/page.tsx`, the root wrapper is `src/app/layout.tsx`. Every section component in `src/components/` is a **client component** (`"use client"`) because each reads the language dictionary via `useT()` (see §4). `page.tsx`, `layout.tsx`, and `Container.tsx` stay Server Components. A component must be marked `"use client"` before it can use React state, effects, context, or DOM event handlers.

## 4. Bilingual (i18n) — how this template works

This template is **bilingual**: base language **English (`en`)**, secondary **Greek (`el`)**. All visible copy lives in one dictionary and every component reads from it — do NOT hardcode visible text back into the JSX.

- **`src/lib/i18n.tsx`** — the whole i18n system: a `translations = { en: {…}, el: {…} }` object (one key per visible string, both languages filled), a `LanguageProvider` (defaults to `en`, persists the choice to `localStorage`, updates `<html lang>`), and the `useT()` hook returning `{ lang, setLang, t }`.
- **`src/app/layout.tsx`** wraps everything in `<LanguageProvider>` and sets `<html lang="en">` + English metadata title.
- **`Header.tsx`** renders the language switcher (`data-role="lang-switch"`, `EN | EL`).
- Components render text with `t("some.key")`, never a literal string.

**To change or add copy:** edit the value in `src/lib/i18n.tsx` for **both** `en` and `el` — never edit the JSX to hardcode a string, that breaks the other language. Keys are content arrays too: `Header`/`Footer` nav use `labelKey`, `ServicesSection` uses `titleKey`/`descKey`, `AboutSection` uses `highlightKeys`.

**To add a third language:** add its block to `translations` in `i18n.tsx` (same keys) and add a button for it to the switcher in `Header.tsx`.

**Do not:** add an `i18n` key to `next.config.ts` (Pages Router only — silently does nothing); install `next-intl`/`next-i18next` or add `[lang]` route folders unless the client explicitly needs separate per-language URLs / SEO. When you add a new visible string, add its key to **both** languages in `i18n.tsx` (and update `agent.manifest.json` if you add a section/role).

<!-- This file is read directly by the AgApps platform's own site-editing AI
     (see ai.agapps.eu's prompts/system.ts) on every customer site cloned from
     this template - keep it scoped to facts about THIS template's code only.
     Instructions for a coding assistant (Claude Code, Cursor, ...) working on
     this template repo itself belong in CLAUDE.md + .ai/, never here - the
     runtime AI has no tools to act on them and no benefit from reading them. -->
