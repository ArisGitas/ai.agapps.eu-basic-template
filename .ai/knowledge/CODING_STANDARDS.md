---
status: filled
tier: 2
last_verified: 2026-08-05
verified_against: tsconfig.json, eslint.config.mjs, all 11 source files
---

# Coding Standards

## Language strictness/configuration

`tsconfig.json`: `strict: true` **and** `noUncheckedIndexedAccess: true`
(same as the parent Hub project) — any indexed access (`arr[i]`,
`obj[key]`) types as `T | undefined`, not `T`. In practice this codebase
mostly sidesteps the issue by using `.map()` over known-shape arrays
rather than indexing by number/dynamic key, so it rarely bites here —
but a future change that does index dynamically must handle the
`undefined` case.

## Comment policy

Sparse and WHY-only, matching the parent Hub project's stated style —
confirmed across multiple files: `i18n.tsx`'s block comment explains
*why* `useSyncExternalStore` is used instead of `useState` (hydration
mismatch avoidance), not what the code does line by line;
`AboutSection.tsx`'s one-line comment flags a TODO-shaped fact (replace
placeholder with `next/image`) rather than describing the JSX under it.
No file has been found with dense line-by-line comments.

## Function/module size conventions

Every component is one function, one file, no internal helper
extraction — even `Header.tsx`'s inline `LanguageSwitch` is a second
top-level function in the same file (not extracted to its own file)
because it is only ever used once, in that file. Content arrays
(`navLinks`, `services`, `highlightKeys`) are declared at module scope
directly above the component that uses them, not in a separate
constants file — this is a **two-occurrence pattern**: seen in
`Header.tsx`, `Footer.tsx` (`navLinks`), `ServicesSection.tsx`
(`services`), and `AboutSection.tsx` (`highlightKeys`).

## Formatting/linting

ESLint 9 flat config (`eslint.config.mjs`): `eslint-config-next`'s
`core-web-vitals` + `typescript` rule sets, plus `eslint-config-prettier`
to turn off any ESLint formatting rule that would conflict with
Prettier — Prettier itself is a devDependency but has no npm script of
its own; formatting is presumably applied via an editor integration,
not a CI/pre-commit step (none found in this repo). Real commands:
`npm run lint` (ESLint), `npm run typecheck` (`tsc --noEmit`).

## What NOT to do (observed anti-patterns already fixed once)

Nothing recorded yet in `../failures/LESSONS_LEARNED.md` for actual
template code (the one recorded incident so far is about `AGENTS.md`
content, not a code anti-pattern — see `COMMON_MISTAKES.md`). One
existing, deliberate-but-fragile pattern worth NOT copying elsewhere:
`Header.tsx` and `Footer.tsx` each hardcode their own separate copy of
`navLinks` rather than sharing one — this is documented as a known risk
in `MODULE_MAP.md`, not a mistake to blindly imitate when adding a
third nav-link consumer.
