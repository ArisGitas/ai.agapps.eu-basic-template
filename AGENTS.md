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

## 3. `data-agapps-id` attributes (2026-08-12, for the AgApps Studio visual editor)

Every editable element (headings, body text, buttons, links, images, and
each section's root/container) also carries a `data-agapps-id="<name>"`
attribute — e.g. `homepage-hero-title`, `homepage-hero-cta-primary`,
`homepage-about-body`, `global-footer-copyright`. This is a **separate
system from `data-section`/`data-role` above** (§1) — it complements it,
doesn't replace it. Both sets of attributes must stay on the same
elements.

- **Purpose**: `data-section`/`data-role` locate an element for *you* (the
  AI) to read/reason about. `data-agapps-id` is what the platform's
  **non-AI visual editor** uses to target one exact DOM node for a
  deterministic patch (text/color/image/link/visibility) — it needs a
  value that's stable and **globally unique across the whole site**,
  which `data-role` deliberately is not (role names are intentionally
  reused across sections).
- **Naming pattern: `<scope>-<section>-<what-it-is>`**, kebab-case,
  human-readable, function-based. `<scope>` is the page slug the
  component only ever renders on (e.g. `homepage` for `HeroSection.tsx`,
  `ServicesSection.tsx`, `AboutSection.tsx`, `CTASection.tsx` — all
  imported by `src/app/page.tsx` alone today), or `global` for chrome
  reused across every page regardless of route (`Header.tsx`,
  `Footer.tsx`). This exists so that adding a second page later (see §5's
  note on adding new pages, e.g. Terms/Privacy) can't produce a
  same-named-but-different id collision — a new page's own hero-like
  section gets its own page's scope (e.g. `about-us-hero-title`), never
  bare `hero-title` again. **When you add a page, decide the scope first
  and use it consistently across every new component that page alone
  renders; when you add a new component to an existing page's component
  set, reuse that page's existing scope.**
- **Never remove or duplicate an existing `data-agapps-id`** when editing
  content in the same element — same rule as `data-section`/`data-role`.
  If you rewrite a whole file with `write_file`, carry every existing
  `data-agapps-id` over onto the same (or the closest equivalent)
  element. Never change an id's `<scope>` on an element that already has
  one, even if the component gets reused by a second page later — treat
  that as a sign the component should move to `global` scope, and say so
  rather than silently guessing.
- **When you add a brand-new editable element** (a new section, a new
  button, a new paragraph that didn't exist before), stamp it with a
  **new, unique** `data-agapps-id` following the naming pattern above
  (e.g. a new testimonials section's heading on the homepage →
  `homepage-testimonials-title`, not `testimonials-title`,
  `testimonials-h2`, or a random string). Check the file (and ideally the
  rest of the site) to make sure the name isn't already used.
- **Elements rendered from a `.map()` over an array (or a component
  instantiated more than once, like `LanguageSwitch` in `Header.tsx`)
  share ONE `data-agapps-id` across every rendered instance** — the id
  lives on the single source JSX node, not per rendered copy. Today's
  known instances of this: `global-header-nav-link-desktop`/`-mobile`
  (Header's `navLinks.map`), `global-header-lang-switch`/`-button` (the
  `LanguageSwitch` component, called twice), `homepage-services-item-card`/
  `-title`/`-description` (`ServicesSection`'s `services.map`),
  `homepage-about-highlight-item` (`AboutSection`'s `highlightKeys.map`),
  `global-footer-nav-link` (Footer's own local `navLinks.map`). A shared id
  alone can't target "just the second card" — see `data-agapps-key` below
  for how TEXT edits to looped items are resolved; reordering the loop
  stays an AI-chat-only operation.

- **`data-agapps-key` (2026-08-14) — the dictionary key behind a
  text-editable element.** Every element whose content is a single `t(...)`
  call carries the exact translation key it renders, so the visual editor
  can patch the dictionary directly without ever reading the JSX:
  `data-agapps-key="hero.title"` for a static `{t("hero.title")}`, or
  `data-agapps-key={service.titleKey}` inside a `.map()` where the key is
  only known at runtime. This is what unlocks editing ONE looped service
  card's text (the key tells the editor which dictionary entry to patch —
  `services.item2.title` for the second card, not "the second card").
  - **Only stamp it on elements whose SOLE content is one `t(...)` call.**
    Never stamp a wrapper/mixed element — e.g. `homepage-about-highlight-item`
    (`{t(key)}` plus a nested checkmark `<span>`), `global-footer-copyright`
    (two `t()` calls + a dynamic year), or `global-header-lang-switch-button`
    (`{l.toUpperCase()}`, not a dictionary key at all) must NOT get a key.
  - **Keep it in sync with the key it renders.** `data-agapps-key={x}` must
    be the exact same `x` passed to `t(x)` on that element.
  - **Preserve/stamp it** the same way as `data-agapps-id` above: never
    remove it, and when you add a new `t(...)`-driven element, add its key.

## 4. Stack facts — this is App Router, not Pages Router

Next.js 16 App Router, React 19, Tailwind v4. There is **no `src/pages/` directory, no `_app.tsx`/`_document.tsx`, and no `i18n` block in `next.config.ts`** — those are Pages Router concepts and do nothing here. Routes live under `src/app/`; the homepage is `src/app/page.tsx`, the root wrapper is `src/app/layout.tsx`. Every section component in `src/components/` is a **client component** (`"use client"`) because each reads the language dictionary via `useT()` (see §5). `page.tsx`, `layout.tsx`, and `Container.tsx` stay Server Components. A component must be marked `"use client"` before it can use React state, effects, context, or DOM event handlers.

## 5. Bilingual (i18n) — how this template works

This template is **bilingual**: base language **English (`en`)**, secondary **Greek (`el`)**. All visible copy lives in one dictionary and every component reads from it — do NOT hardcode visible text back into the JSX.

- **`src/content/en.json` / `src/content/el.json`** — the translation dictionaries (one key per visible string, both languages filled). **`src/lib/i18n.tsx`** imports them into a `translations = { en, el }` object and provides the rest of the i18n system: a `LanguageProvider` (defaults to `en`, persists the choice to `localStorage`, updates `<html lang>`), and the `useT()` hook returning `{ lang, setLang, t }`.
- **`src/app/layout.tsx`** wraps everything in `<LanguageProvider>` and sets `<html lang="en">` + English metadata title.
- **`Header.tsx`** renders the language switcher (`data-role="lang-switch"`, `EN | EL`).
- Components render text with `t("some.key")`, never a literal string.

**To change or add copy:** edit the value in **both** `src/content/en.json` and `src/content/el.json` — never edit the JSX to hardcode a string, that breaks the other language. Keys are content arrays too: `Header`/`Footer` nav use `labelKey`, `ServicesSection` uses `titleKey`/`descKey`, `AboutSection` uses `highlightKeys`.

**To add a third language:** add a `src/content/{locale}.json` file (same keys), import it into the `translations` object in `i18n.tsx`, and add a button for it to the switcher in `Header.tsx`.

**Do not:** add an `i18n` key to `next.config.ts` (Pages Router only — silently does nothing); install `next-intl`/`next-i18next` or add `[lang]` route folders unless the client explicitly needs separate per-language URLs / SEO. When you add a new visible string, add its key to **both** `src/content/en.json` and `src/content/el.json` (and update `agent.manifest.json` if you add a section/role).

**Adding a brand-new page (e.g. Terms/Privacy) is the same rule, not an exception.** A whole new route still goes through the JSON dictionaries in both `en` and `el` — write it directly in JSX in whichever language the request happened to be phrased in, and you've broken the site for the other language. This applies **regardless of what language the customer's own chat instruction was written in** — a Greek instruction does not mean the new page should be Greek; check `layout.tsx`'s default (`en`) and the existing pages, not the instruction's language.

## 5. Static site — hard constraints

This site is a **static export** (`output: 'export'` in `next.config.ts`). `next build` produces a plain `out/` folder of HTML/CSS/JS — there is no Node server at runtime. It is hosted so the container can sleep when idle, which only holds while the site makes **zero server-side and zero runtime outbound calls**. Two rules follow, and they are hard:

- **No server-side code.** Never add an API route (`app/**/route.ts`), a Server Action (`"use server"`), `middleware.ts`, `getServerSideProps`/`getStaticProps`, or any server-side data fetch. With `output: 'export'` these don't just get ignored — they **fail the build**, and the customer's site stops updating. Anything dynamic (a contact form that emails, a booking system) must come from a platform-provided skill/template, never a hand-rolled backend.
- **No runtime outbound calls from the page.** Never add a Google Fonts / CDN `<link>` tag (fonts go through `next/font`, already self-hosted at build — see `layout.tsx`), never hot-link an external image (download it into `public/` and reference it locally), never add a third-party analytics/tracking `<script>` or beacon. A single external `<link>`/`fetch` keeps the site awake 24/7 and costs the owner money for nothing.

Everything this template already does (client-side i18n via `localStorage`, `next/font`, local assets) is compatible with this. Keep it that way.

<!-- This file is read directly by the AgApps platform's own site-editing AI
     (see ai.agapps.eu's prompts/system.ts) on every customer site cloned from
     this template - keep it scoped to facts about THIS template's code only.
     Instructions for a coding assistant (Claude Code, Cursor, ...) working on
     this template repo itself belong in CLAUDE.md + .ai/, never here - the
     runtime AI has no tools to act on them and no benefit from reading them. -->
