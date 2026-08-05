---
status: filled
tier: 3
last_verified: 2026-08-05
verified_against: src/lib/i18n.tsx, src/app/layout.tsx, src/components/Header.tsx
---

# Feature Examples

## Example: bilingual (en/el) content system

**Context**: every visible string on the site needs to exist in both
English (base) and Greek (secondary), switchable at runtime, with the
choice remembered across visits — without a routing change (no `[lang]`
segment, no separate URLs per language).

**Analysis**: the two real constraints that shaped this: (1) Next.js
App Router server-renders `layout.tsx`/`page.tsx`, which have no access
to `localStorage`, so the server can't know the visitor's saved
preference; (2) React would throw a hydration-mismatch warning if the
server rendered one language and the client immediately rendered
another. The design accepts "always server-render English first" as the
tradeoff, and re-renders to the saved language client-side right after
hydration — a real, visible (if very brief) flash for a returning
Greek-preferring visitor, not eliminated, but accepted as the simplest
correct option.

**Implementation**: `src/lib/i18n.tsx` is the whole feature in one
file:
1. `translations = { en: {...}, el: {...} }` — a flat, one-level object
   keyed by dotted-string keys (`"hero.title"`, `"services.item1.title"`),
   `as const satisfies Record<Lang, Record<string, string>>` so
   TypeScript catches a key present in one language but not the other.
2. `LanguageProvider` uses `useSyncExternalStore(subscribe, readLang,
   () => "en")` — the third argument is the server snapshot (always
   `"en"`), `readLang()` is the client snapshot (reads `localStorage`).
   This is what avoids the mismatch: React knows to treat these as
   deliberately different and reconciles after hydration instead of
   warning.
3. `writeLang()` writes to `localStorage` AND manually calls every
   function in a module-level `listeners` Set — necessary because the
   browser's native `"storage"` event only fires in *other* tabs, not
   the one that made the change.
4. `src/app/layout.tsx` wraps `{children}` in `<LanguageProvider>`;
   every component that needs translated text calls `useT()` to get
   `{ lang, setLang, t }` and is therefore a Client Component
   (`"use client"`) even if it has no other interactivity.
5. `Header.tsx`'s `LanguageSwitch` is the only UI that calls `setLang`.

**Validation**: no automated test exists (see `../knowledge/TESTING_STRATEGY.md`) —
verified manually via `npm run dev`, clicking the switch, and confirming
both the visible text and `document.documentElement.lang` update, plus
confirming the choice survives a page reload.

**Common Errors**: the fallback chain in `t()` —
`translations[lang][key] ?? translations.en[key] ?? key` — means a key
added to only one language does not error, it silently falls back to
English (or, if missing from both, renders the raw key string). This
will NOT be caught by `npm run typecheck` if the key was added to
`translations.en` correctly (the `TranslationKey` type is derived from
`en`'s keys) but forgotten in `translations.el` — the `satisfies
Record<Lang, Record<string, string>>` constraint only fails if a key is
missing from *both*, not if the two languages' key sets diverge
silently in a way that still satisfies "some string value exists."
Always grep both language blocks after adding a key to confirm it's in
both.
