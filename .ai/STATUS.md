---
type: core
always_read: true
initialized: true
project_name: agapps.eu basic template (ai.agapps.eu-basic-template)
last_full_review: 2026-08-05
---

# Status

> **Read this immediately after `AI_OPERATING_SYSTEM.md`.** It is the index of
> what is actually known about this project, so you can tell the difference
> between "documented and verified" and "nobody has looked at this yet."
>
> Keep it accurate. A wrong `filled` here is worse than an honest `template`,
> because it makes a future agent trust something that was never checked.

## Is this project initialized?

**Yes.** Initialized 2026-08-05 — full `PROJECT_INIT.md` pass against
the real, small (11 source file) codebase. Two questions from
"Before you start" were not asked interactively this pass (the human's
actual request was "set up `.ai/` and fix the AGENTS.md contamination
issue," not a fresh init conversation) — see Known gaps below.

## Knowledge coverage

Update a row the moment you fill in or verify a file. `last_verified` is the
date you last confirmed the content against the real code — not the date you
last edited the file.

| File | Tier | Status | Last verified |
|---|---|---|---|
| `knowledge/PROJECT_OVERVIEW.md` | 1 | filled | 2026-08-05 |
| `knowledge/MODULE_MAP.md` | 1 | filled | 2026-08-05 |
| `knowledge/DEVELOPMENT_WORKFLOW.md` | 1 | filled | 2026-08-05 |
| `knowledge/SYSTEM_ARCHITECTURE.md` | 2 | filled | 2026-08-05 |
| `knowledge/CODING_STANDARDS.md` | 2 | filled | 2026-08-05 |
| `knowledge/DESIGN_PATTERNS.md` | 2 | filled | 2026-08-05 |
| `knowledge/TESTING_STRATEGY.md` | 2 | filled | 2026-08-05 |
| `knowledge/DATA_FLOW.md` | 2 | filled | 2026-08-05 |
| `knowledge/API_STRUCTURE.md` | 3 | not applicable | 2026-08-05 |
| `knowledge/DATABASE_STRUCTURE.md` | 3 | not applicable | 2026-08-05 |
| `knowledge/INTEGRATIONS.md` | 3 | not applicable | 2026-08-05 |
| `knowledge/SECURITY_RULES.md` | 3 | filled | 2026-08-05 |
| `knowledge/DEPENDENCY_RULES.md` | 3 | filled | 2026-08-05 |
| `knowledge/PERFORMANCE_NOTES.md` | 4 | template | 2026-08-05 |
| `knowledge/COMMON_MISTAKES.md` | 4 | filled | 2026-08-05 |

**Tiers** — how much of this to fill in, and when:

- **Tier 1** — always, during init. Without these the system provides no value.
- **Tier 2** — during init if the project has enough code to support real
  content; otherwise as soon as it does.
- **Tier 3** — only if the project actually has that thing (an API, a database,
  external integrations, auth). Mark `not applicable` rather than inventing
  content. This is the correct outcome for many projects.
- **Tier 4** — grows from real experience over time. Empty at init is normal
  and healthy; these fill in as real mistakes and real measurements happen.

**Statuses** — `template` (no real content, do not cite) · `partial` (real but
incomplete) · `filled` (complete and verified) · `not applicable` (verified
that this project genuinely has no such thing).

## Experience log coverage

| File | Entries | Notes |
|---|---|---|
| `decisions/ARCHITECTURE_DECISIONS.md` | 1 | Why the `.ai/` loader lives in `CLAUDE.md`, not `AGENTS.md`, in this repo specifically |
| `failures/LESSONS_LEARNED.md` | 1 | The AGENTS.md-contamination incident this init pass fixed |
| `history/AI_CHANGE_HISTORY.md` | 0 | Not backfilled — starts empty from here forward |
| `examples/` | 1 (FEATURE_EXAMPLES) | Bilingual i18n system. API/SERVICE/DATABASE/INTEGRATION marked not applicable (none exist); REFACTORING has no real refactor yet |

## Known gaps and open questions

> Things an agent has noticed but not resolved — areas nobody has analyzed,
> claims that could not be verified, questions waiting on the human. Being
> explicit here is what stops the next agent from confidently guessing.

- **`PROJECT_INIT.md`'s two opening questions were not asked
  interactively** ("anything not visible in the code?" / "anything to
  never do here?") — this init ran as part of a request to fix a
  specific problem (AGENTS.md contamination) rather than a from-scratch
  init conversation. `PROJECT_OVERVIEW.md`'s "Non-negotiable operating
  constraints" section is derived from what's independently verifiable
  (the parent repo's `prompts/system.ts`), not from a direct human
  answer. Ask if a future session has the chance to.
- **How the live Railway preview
  (`aiagappseu-basic-tamplate-production.up.railway.app`, referenced
  from the parent Hub's `src/lib/templates.ts`) actually stays in sync
  with this repo** — not confirmed from this local clone alone (likely
  a Railway auto-deploy hook on `origin`, unconfirmed).
- ~~`.cursor/rules/ai-operating-system.mdc` and
  `.github/copilot-instructions.md` not yet read in full~~ — verified:
  both independently point straight at `.ai/` (never through `AGENTS.md`),
  so Cursor and Copilot are unaffected by the `AGENTS.md` issue and
  needed no changes.
- **This template's own live Git remote (`ArisGitas/ai.agapps.eu-basic-template`)
  had uncommitted changes (`.ai/`, `.cursor/`, `.github/`, modified
  `AGENTS.md`, new `CLAUDE.md`) at the time of this init** — nothing in
  this pass was committed/pushed; that remains a human decision.

## Review cadence

Run `prompts/ARCHITECTURE_REVIEW.md` when any of these is true:

- A `last_verified` date above is old enough that the code has moved on
  significantly since.
- A major refactor, dependency upgrade, or structural change just landed.
- An agent found a knowledge file contradicting the real code (fix it
  immediately, then consider whether neighbours drifted too).

Set `last_full_review` in the frontmatter when a full pass completes.
