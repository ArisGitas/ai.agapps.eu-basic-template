---
status: filled
tier: 3
last_verified: 2026-08-05
verified_against: package.json, import statements in all 11 source files
---

# Dependency Rules

## Internal dependency direction

`page.tsx` → 6 section components → (5 of 6) `Container.tsx` +
`src/lib/i18n.tsx`. `i18n.tsx` imports nothing from `components/`.
Checked all 11 files' import lines: no cycle exists, no component
imports another component directly (each only imports `Container` and
`i18n`). See `MODULE_MAP.md` for the full per-file breakdown.

## What would violate this (if nothing does yet, say so)

Nothing does yet. The direction would break if, e.g., `i18n.tsx` ever
imported a component (inverting the current one-way dependency), or if
`Footer.tsx` started importing `Header.tsx`'s `navLinks` directly
instead of keeping its own separate copy (which — see `MODULE_MAP.md` —
is arguably a bug-prone duplication today, but changing it is a
deliberate refactor to flag, not something to do silently mid-way
through an unrelated task).

## Policy for adding new third-party dependencies

Not yet established — no documentation or PR history to observe a real
policy from. Note that this template also has **zero devDependencies
beyond tooling** (TypeScript, ESLint, Tailwind, their type packages,
Prettier) — no state-management library, no UI kit, no icon package
(icons are inline `<svg>`/`<path>` JSX, see `ServicesSection.tsx`,
`Header.tsx`'s hamburger icon). Adding a dependency here is a bigger
relative change than in a larger project — worth flagging to the human
before doing it rather than treating it as routine.

## Dependencies with known constraints

- `next` is pinned to the **exact** version `16.2.9` (not `^16.2.9`) in
  `package.json` — same exact-pin convention as the parent Hub project
  (`ai.agapps.eu`'s own `package.json` pins `next` exactly too, per that
  repo's `PROJECT_OVERVIEW.md`). Don't "helpfully" loosen this to `^`.
- `eslint-config-next` is pinned to the identical `16.2.9` version —
  keeping the ESLint Next.js rule set in lock-step with the actual
  Next.js version is deliberate, not an oversight to "fix" by using
  `^` or `latest`.
- `react`/`react-dom` at `19.2.4` — React 19 has real API differences
  from React 18 (e.g. `useSyncExternalStore` usage in `i18n.tsx` relies
  on stable React 18+ behavior, no React-19-specific API used yet, but
  don't assume React 18 patterns/docs apply without checking).
