---
status: filled
tier: 2
last_verified: 2026-08-05
verified_against: package.json (no test-related dependency or script), full src/ tree
---

# Testing Strategy

## Test runner(s) and real configuration

**None.** Confirmed by reading `package.json` in full: no `vitest`,
`jest`, `@testing-library/*`, `playwright`, or any other test-related
dependency, and no `"test"` script. No test config file exists anywhere
in the repo (no `vitest.config.ts`, `jest.config.*`, `playwright.config.*`).

## What test tiers actually exist here

None. There is no unit, integration, or E2E tier — this is a genuine
absence, not an undocumented one.

## What CI actually runs

No CI workflow exists (`.github/` contains only `copilot-instructions.md`,
no `workflows/` directory). Nothing runs automatically on push or PR.

## What is NOT covered by automated tests

Everything. In practice, the two real checks available are lint
(`npm run lint`) and type-check (`npm run typecheck`) — neither proves
a component renders correctly, that both languages are complete for a
given key, or that an anchor link (`#services`/`#about`/`#contact`)
still resolves after a section's `id` changes. All visual/behavioral
verification here is manual: `npm run dev` + a real browser check.

## Real test-writing convention

Not applicable — no test file exists to demonstrate a convention from.
If tests are ever added to this template, note the chosen convention
here rather than assuming one.
