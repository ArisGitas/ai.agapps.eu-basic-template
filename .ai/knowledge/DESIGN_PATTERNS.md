---
status: filled
tier: 2
last_verified: 2026-08-05
verified_against: all 6 components, src/lib/i18n.tsx, agent.manifest.json
---

# Design Patterns

## Pattern: `data-section` / `data-role` locator attributes

**Purpose**: lets the Hub's runtime AI (and `agent.manifest.json`) find
and target a specific DOM element/section reliably across restyles,
without depending on CSS classes or exact text content, which both
change on every visual edit.

**Location**: every section's root element (`<header data-section="header">`,
`<section data-section="hero">`, etc. — 6 occurrences, one per
component) and named interactive/content elements within them
(`data-role="title"`, `"nav-link"`, `"contact-button"`, etc. — see
`agent.manifest.json`'s `sections.*.roles` for the full enumerated list).

**Example** (`HeroSection.tsx`):
```tsx
<section data-section="hero" className="bg-white py-24">
  <h1 data-role="title" ...>{t("hero.title")}</h1>
  <a href="#contact" data-role="contact-button" ...>{t("contactUs")}</a>
```

**How to extend**: new section → root element gets
`data-section="<lowercase-kebab-name>"` describing WHAT it is, never
WHERE it sits on the page. New interactive/content element worth
targeting → `data-role="<function-name>"`, also function-based, and
expected to **repeat** across sections by design (e.g. `contact-button`
already appears in `Header`, `HeroSection`, and `Footer`'s "logo"
concept, differently rendered in each — a name is not assumed unique
page-wide, only unique *within its nearest `data-section` ancestor*, per
`agent.manifest.json`'s own stated `roleNamingConvention`).

**Avoid**: baking a page/section name into a role
(`hero-contact-button` instead of `contact-button`) — the whole point is
that content moves between sections over time and the role must survive
that move.

---

## Pattern: dictionary-driven copy (`useT()` / `t("key")`)

**Purpose**: keeps every visible string bilingual by construction —
there is no code path that renders a string that isn't in
`translations`, so it's structurally hard to add English-only (or
Greek-only) content by accident.

**Location**: `src/lib/i18n.tsx` defines the dictionary + hook; every
one of the 6 section components (and `Header`'s `LanguageSwitch`) calls
`t("key")` instead of a literal string — seen in all 6, not just one or
two.

**Example** (`ServicesSection.tsx`):
```tsx
const { t } = useT();
...
<h2 data-role="title">{t("services.title")}</h2>
```

**How to extend**: adding a new visible string → add its key to
**both** `translations.en` and `translations.el` in `i18n.tsx` in the
same change, then reference it via `t()` — never write the literal
string into JSX. Adding a third language → new top-level key in
`translations` (same key set) + a new button in `Header.tsx`'s
`LanguageSwitch`, per `AGENTS.md` §4.

**Avoid**: hardcoding a string in JSX "temporarily" — there is no
lint rule enforcing dictionary-only copy (confirmed: no custom ESLint
rule for this), so this is a convention, not something the tooling
catches. Also avoid using a raw string as the `TranslationKey` type
parameter without adding it to the dictionary first — `t()`'s
`translations[lang][key] ?? translations.en[key] ?? key` fallback means
a missing key silently renders the key string itself instead of erroring.

---

## Pattern: content arrays co-located with their component

**Purpose**: keeps a section's repeated-item data (services, nav links,
highlights) next to the one component that renders it, instead of a
shared/global content file — appropriate at this size (11 files, one
consumer each).

**Location**: `Header.tsx`/`Footer.tsx`'s `navLinks`,
`ServicesSection.tsx`'s `services`, `AboutSection.tsx`'s
`highlightKeys` — each declared at module scope directly above its
component, each referenced in `agent.manifest.json` under that
section's `contentArrays`.

**How to extend**: adding an item → push into the array with new
`TranslationKey` values already added to `i18n.tsx`; update
`agent.manifest.json`'s `currentItems` count for that array in the same
change (already flagged in `AGENTS.md` as a "keep in sync" rule, not
just a suggestion here).

**Avoid**: this pattern breaks down if a content array needs to be
shared across more than one component (as `navLinks` already
demonstrates by being duplicated, not shared, between `Header` and
`Footer` — see `MODULE_MAP.md`'s risk note). Extracting a shared
`src/lib/content.ts` would be the natural next step if a third consumer
appears, but that refactor has not happened yet — don't assume it exists.
