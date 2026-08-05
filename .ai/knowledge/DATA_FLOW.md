---
status: filled
tier: 2
last_verified: 2026-08-05
verified_against: src/lib/i18n.tsx, all 6 components
---

# Data Flow

This template has no server-side data flow at all — no form submits
anywhere, no API call, no database write. The one real, traceable flow
is entirely client-side: the visitor's language preference.

## Primary data flows

### Flow: language preference

- **Entry point**: `Header.tsx`'s `LanguageSwitch` component, `onClick`
  on an `EN`/`EL` button → calls `setLang(lang)` from `useT()`.
- **Validation**: `readLang()` in `i18n.tsx` narrows any stored value to
  `"en" | "el"`, defaulting to `"en"` for anything else (including a
  missing/corrupted `localStorage` value) — the only "validation" that
  exists, and it's a type-narrowing fallback, not a validation error path.
- **Transformation**: none — the raw `"en"`/`"el"` string is what's
  stored and what's read back.
- **Persistence**: `window.localStorage`, key `"site-lang"` — client-side
  only, per-browser, no server ever sees this value.
- **Downstream effects**: every component subscribed via `useT()`
  re-renders with the new language (all 6 section components +
  `Header`'s own `LanguageSwitch`); a `useEffect` in `LanguageProvider`
  also sets `document.documentElement.lang` to match.

### Flow: contact intent (email/phone links)

- **Entry point**: `CTASection.tsx`'s `mailto:info@example.com` and
  `tel:+302101234567` links, and the plain-text (non-linked) equivalents
  in `Footer.tsx`.
- **Validation / Transformation / Persistence**: none — these are static
  literal href values handed off entirely to the visitor's OS/mail
  client. Nothing in this codebase captures, stores, or transmits any
  visitor-submitted data (there is no `<form>` element anywhere in the
  11 source files).
- **Downstream effects**: none within this codebase.

## State that lives outside the primary database

There is no database. The only persisted client state is the
`localStorage["site-lang"]` value described above — a single string,
never synced anywhere else, never expires.

## Data this project treats as sensitive

None. No PII is collected (no form to collect it with), no secrets, no
payment data. See `SECURITY_RULES.md` for the corresponding explicit
"not applicable" reasoning.
