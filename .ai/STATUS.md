---
type: core
always_read: true
initialized: false
project_name: <not set>
last_full_review: never
---

# Status

> **Read this immediately after `AI_OPERATING_SYSTEM.md`.** It is the index of
> what is actually known about this project, so you can tell the difference
> between "documented and verified" and "nobody has looked at this yet."
>
> Keep it accurate. A wrong `filled` here is worse than an honest `template`,
> because it makes a future agent trust something that was never checked.

## Is this project initialized?

**No.** `initialized: false` in the frontmatter above.

→ Run `PROJECT_INIT.md` before doing substantial work, or, if the human asked
for something small and urgent, do that first and then say the knowledge base
is uninitialized and offer to run init.

Once init is done: set `initialized: true`, fill in `project_name`, and update
the table below.

## Knowledge coverage

Update a row the moment you fill in or verify a file. `last_verified` is the
date you last confirmed the content against the real code — not the date you
last edited the file.

| File | Tier | Status | Last verified |
|---|---|---|---|
| `knowledge/PROJECT_OVERVIEW.md` | 1 | template | never |
| `knowledge/MODULE_MAP.md` | 1 | template | never |
| `knowledge/DEVELOPMENT_WORKFLOW.md` | 1 | template | never |
| `knowledge/SYSTEM_ARCHITECTURE.md` | 2 | template | never |
| `knowledge/CODING_STANDARDS.md` | 2 | template | never |
| `knowledge/DESIGN_PATTERNS.md` | 2 | template | never |
| `knowledge/TESTING_STRATEGY.md` | 2 | template | never |
| `knowledge/DATA_FLOW.md` | 2 | template | never |
| `knowledge/API_STRUCTURE.md` | 3 | template | never |
| `knowledge/DATABASE_STRUCTURE.md` | 3 | template | never |
| `knowledge/INTEGRATIONS.md` | 3 | template | never |
| `knowledge/SECURITY_RULES.md` | 3 | template | never |
| `knowledge/DEPENDENCY_RULES.md` | 3 | template | never |
| `knowledge/PERFORMANCE_NOTES.md` | 4 | template | never |
| `knowledge/COMMON_MISTAKES.md` | 4 | template | never |

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
| `decisions/ARCHITECTURE_DECISIONS.md` | 0 | |
| `failures/LESSONS_LEARNED.md` | 0 | |
| `history/AI_CHANGE_HISTORY.md` | 0 | |
| `examples/` | 0 | |

## Known gaps and open questions

> Things an agent has noticed but not resolved — areas nobody has analyzed,
> claims that could not be verified, questions waiting on the human. Being
> explicit here is what stops the next agent from confidently guessing.

- (none recorded yet)

## Review cadence

Run `prompts/ARCHITECTURE_REVIEW.md` when any of these is true:

- A `last_verified` date above is old enough that the code has moved on
  significantly since.
- A major refactor, dependency upgrade, or structural change just landed.
- An agent found a knowledge file contradicting the real code (fix it
  immediately, then consider whether neighbours drifted too).

Set `last_full_review` in the frontmatter when a full pass completes.
