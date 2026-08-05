---
status: not applicable
tier: 3
last_verified: 2026-08-05
verified_against: package.json (no db/ORM dependency), full src/ tree (no db client, no schema/migration files)
---

# Database Structure

**Not applicable.** No database engine, ORM, or query builder is a
dependency (`package.json` has exactly three runtime dependencies:
`next`, `react`, `react-dom` — see `DEPENDENCY_RULES.md`), and no
`src/` file connects to or queries any data store. All content is
either static JSX or the `translations` dictionary in `src/lib/i18n.tsx`.
The only "persistence" anywhere is the visitor's language choice in
`localStorage` — see `DATA_FLOW.md`, not a database by any definition.
