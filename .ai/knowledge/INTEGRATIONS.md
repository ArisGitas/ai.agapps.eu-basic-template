---
status: not applicable
tier: 3
last_verified: 2026-08-05
verified_against: package.json, grep for fetch(/process.env across src/
---

# Integrations

**Not applicable at runtime.** No third-party service is called from
this template's code — confirmed: no `fetch(`/SDK import beyond `next`/
`react`/`react-dom`, no `process.env` reference anywhere in `src/`.

One **build-time-only** dependency worth noting even though it isn't a
runtime "integration": `next/font/google` (DM Sans, loaded in
`src/app/layout.tsx`) fetches the font files from Google Fonts during
`next build`/`next dev`, then self-hosts the result — this has no
runtime network dependency and no failure mode a visitor would ever see
(a build-time failure would show up as a failed build, not a broken
live page).
