---
status: filled
tier: 3
last_verified: 2026-08-05
verified_against: full src/ tree, package.json
---

# Security Rules

## Authentication

Not applicable — there is no login, no session, no concept of a
"user" anywhere in this codebase.

## Authorization

Not applicable — same reason as above; there is nothing to authorize
access to (a fully public, static marketing page).

## Secrets handling

Not applicable — no `process.env` reference exists anywhere in `src/`,
confirmed by direct read of all 11 files. There are no secrets in this
template to handle.

## Input validation as a security boundary

Not applicable — there is no `<form>` element anywhere in this
codebase (confirmed by reading all 6 components), so there is no
user-submitted input to validate at all. `CTASection.tsx`'s
`mailto:`/`tel:` links hand off entirely to the visitor's own OS/mail
client with no data passing through this app's own code.

## Known sensitive operations

None — nothing in this codebase writes, deletes, or exposes anything
sensitive.

## What this project does NOT currently have (be honest, don't assume otherwise)

- No CSP, no security headers of any kind (`next.config.ts` is an empty
  `{}` — no `headers()` function defined).
- No rate limiting anywhere (nothing to rate-limit — no endpoints).
- No CSRF protection (nothing to protect — no state-changing request
  exists in this codebase).
- No dependency-vulnerability scanning configured in this repo (no
  Dependabot config, no CI at all — see `DEVELOPMENT_WORKFLOW.md`).

**This is the correct state for what this template currently is** — a
static marketing page with no data collection. If a descendant customer
site adds a real form/API/auth, that customer repo needs its own
security review; do not assume this template's "nothing to secure"
baseline still holds once real functionality is added on top of it.
