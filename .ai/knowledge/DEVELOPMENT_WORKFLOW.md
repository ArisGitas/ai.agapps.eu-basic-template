---
status: filled
tier: 1
last_verified: 2026-08-05
verified_against: package.json scripts, eslint.config.mjs, tsconfig.json
---

# Development Workflow

## Verification commands

| Purpose | Command | Prerequisites | Confirmed working |
|---|---|---|---|
| Install deps | `npm install` | none | confirmed present (`package-lock.json` exists) |
| Lint | `npm run lint` | none | script exists, calls `eslint` |
| Format | (none — no `format`/`prettier` script) | — | `prettier` + `eslint-config-prettier` are devDependencies, but only used to **disable** conflicting ESLint rules; nothing runs Prettier itself as a script |
| Type-check | `npm run typecheck` | none | script exists, calls `tsc --noEmit` |
| Unit tests | **none** | — | no test runner installed, no `"test"` script |
| Integration tests | **none** | — | same as above |
| Build | `npm run build` | none (no DB, no env vars required) | script exists, calls `next build` |
| Run locally | `npm run dev` | none | script exists, calls `next dev` |

Commands verified to exist verbatim in `package.json`; not re-executed
this session (small, freshly-scaffolded template, no reason to suspect
drift). Re-run for real before trusting this if `last_verified` is old.

**Which of these gate a change?** No CI config exists in this repo
(`.github/` here only has `copilot-instructions.md`, not a workflow) —
so nothing gates a change automatically today. Lint + typecheck are the
two real correctness checks available; there is no test suite to lean
on at all (see `TESTING_STRATEGY.md`).

## The standard task loop in this project

For a change made by the **Hub's own site-editing AI** (the common
case for this repo's descendants), the real loop is documented in the
parent project, not here — see `AGENTS.md` + `agent.manifest.json` at
this repo's root, which is what that AI actually reads.

For a change to **this template's own baseline** (by a human or a
coding assistant), no distinct loop has been established beyond the
generic one in `../TASK_PROTOCOL.md`. In practice, given the tooling
above:

```
1. Make the change.
2. npm run lint && npm run typecheck
3. npm run build (confirms it actually compiles/renders - no test suite to lean on)
4. If a data-section/data-role/content-array shape changed, update agent.manifest.json in the same change.
```

## Branching and commits

`git log` shows a short history (5 commits at this writing) with
non-conventional, low-signal messages ("1", "1", ...) except one real
one (`feat: agapps.eu basic landing page template`) and one more recent
real one (`feat: add assets configuration and README for image
handling`) — no enforced commit message convention observed. Only
`origin` remote exists (`github.com/ArisGitas/ai.agapps.eu-basic-template`).
No branch other than the checked-out one was inspected this session; no
evidence of required PR review (no `.github/workflows/`, no branch
protection visible from the local clone).

## Environment setup

No environment variables are read anywhere in `src/` (confirmed: no
`process.env.*` reference in any of the 11 source files). Nothing needs
to be running to develop this template — no database, no external
service. `npm install` + `npm run dev` is the complete setup.

## Environment-sensitive facts to re-verify, never assume

None found — this is intentionally a fully static template with no
environments to confuse (no dev/staging/prod config split exists in
this repo at all). Once a real customer site diverges from this
baseline (adds a form backend, analytics, etc.), that customer repo may
grow real environment-sensitivity that this file does not describe —
this file is about the **template**, not any of its descendants.

## Release / deploy

Not established in this repo. The template itself is not deployed on
its own in the traditional sense — the parent Hub platform clones it
per customer (`repo: "ArisGitas/ai.agapps.eu-basic-template"` in the
Hub's `src/lib/templates.ts`) and deploys each **clone** to Railway.
`src/lib/templates.ts` also lists a `previewUrl`
(`https://aiagappseu-basic-tamplate-production.up.railway.app`) — a
live Railway deployment of this template itself, used as the wizard's
"preview" link, but the deploy mechanism for keeping that preview in
sync with this repo was not inspected this session (not visible from
the local clone alone — likely a Railway auto-deploy hook on `origin`,
unconfirmed).

## What is NOT automatically checked

Everything visual/behavioral — there is no test suite, so lint +
typecheck passing proves the code compiles and has no obvious type
errors, but proves nothing about whether a section actually renders
correctly, whether both languages are complete, or whether an anchor
link still resolves after a section id changes. All of that requires an
actual `npm run dev` + browser check.
