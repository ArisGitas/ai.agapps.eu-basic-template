---
status: filled
tier: 2
last_verified: 2026-08-05
verified_against: src/app/layout.tsx, src/app/page.tsx, src/lib/i18n.tsx, all 6 components
---

# System Architecture

## Topology

None. This template talks to zero external systems — no database, no
API, no third-party service, no queue, no cache. `next/font/google`
fetches DM Sans at **build time** only (standard Next.js behavior, not
a runtime dependency). Confirmed by reading every file in `src/`: there
is no `fetch(`, no `process.env`, no client library import beyond
`next`, `react`, and `react-dom`.

## Layers/boundaries that actually exist in this codebase

No routing/business-logic/data-access split exists, because there is no
business logic or data access — this is presentation only. The one real
boundary is **content vs. structure**: all visible text lives in
`src/lib/i18n.tsx`'s `translations` object; every component is purely
structural JSX that calls `t("some.key")` rather than containing
literal strings (verified in all 6 components — zero hardcoded visible
English/Greek text found outside `i18n.tsx`, `layout.tsx`'s
`metadata.title`/`description`, and `CTASection.tsx`'s literal
`mailto:`/`tel:` href values, which are data, not display text).

## Request/operation lifecycle (one real, traced example)

**A visitor loads `/` and switches the language to Greek:**

1. Next.js renders `src/app/layout.tsx` server-side: loads DM Sans,
   sets `<html lang="en">` (hardcoded — the real language is decided
   client-side, see step 3), wraps `{children}` in `<LanguageProvider>`.
2. `src/app/page.tsx` renders server-side too, composing `<Header />`,
   `<HeroSection />`, `<ServicesSection />`, `<AboutSection />`,
   `<CTASection />`, `<Footer />` in that fixed order inside `<main>`
   (Header/Footer outside it).
3. Every section component is `"use client"` (all of them read
   `useT()`). On the server, `LanguageProvider`'s
   `useSyncExternalStore` has no `localStorage` to read, so its
   `getServerSnapshot` (`() => "en"`) is used — the initial render is
   always English, server and client, avoiding a hydration mismatch.
4. After hydration, the browser's `useSyncExternalStore` re-subscribes
   and calls `readLang()`, which checks `localStorage["site-lang"]` —
   if the visitor previously chose `"el"`, the UI updates to Greek at
   this point (a real, visible re-render right after hydration, not a
   server-side decision).
5. The visitor clicks `EL` in `Header.tsx`'s `LanguageSwitch`, calling
   `setLang("el")` → `writeLang` in `i18n.tsx`: writes to
   `localStorage`, then manually calls every subscriber in the
   `listeners` Set (the native `"storage"` event only fires in *other*
   tabs, so this manual fan-out is what makes the *same* tab react
   immediately).
6. Every component holding a `useT()` subscription re-renders with
   `lang = "el"`; a separate `useEffect` in `LanguageProvider` sets
   `document.documentElement.lang = "el"`.

## Synchronous vs. asynchronous work

Everything is synchronous, client-side React state/effects — there is
no background job, no queue, no async data fetch of any kind at
runtime. The only asynchronous-feeling behavior is the one-tick delay
between initial (English) hydration and the `localStorage`-driven
re-render in step 4 above, which is a React rendering detail, not a
network or job boundary.

## Scaling/deployment constraints worth knowing

None found — no in-memory server state, no singleton, nothing that
would behave differently under multiple instances. The `listeners` Set
in `i18n.tsx` is **client-side, per-browser-tab** module state (each
tab gets its own JS module instance), not server state, so it does not
carry any horizontal-scaling risk.
