---
type: core
always_read: false
---

# `.ai/` — map of this folder

> **Agents: do not start here.** Start with `AI_OPERATING_SYSTEM.md`, then
> `STATUS.md`. This file is a directory listing for humans, not part of the
> reading order.

## Rules (the operating system)

| File | What it is | Read it when |
|---|---|---|
| `AI_OPERATING_SYSTEM.md` | Hard rules, precedence, context-loading policy, routing | **Every session, in full** |
| `STATUS.md` | What is known and verified here; known gaps | **Every session** |
| `TASK_PROTOCOL.md` | The task loop: understand → locate → plan → change → verify → report → remember | Once per session, before the first real change |
| `PROJECT_INIT.md` | The first-run analysis that builds the knowledge base | `STATUS.md` says `initialized: false` |
| `KNOWLEDGE_MANAGEMENT.md` | How to write knowledge that stays true | Before writing into `knowledge/` or `examples/` |
| `MEMORY_UPDATE_RULES.md` | When to update memory — and when not to | After significant work |
| `GLOBAL_MEMORY_RULES.md` | The boundary with cross-project memory | You learned something general |
| `SELF_IMPROVEMENT.md` | How this system improves itself | You were corrected, or a rule got in the way |

## Knowledge (filled from the real project)

`knowledge/` holds the factual base — 15 files, each with
`status` / `last_verified` frontmatter. Tiers are listed in `STATUS.md`:

- **Tier 1** — `PROJECT_OVERVIEW`, `MODULE_MAP`, `DEVELOPMENT_WORKFLOW`.
  Always filled. Without these the system provides no value.
- **Tier 2** — `SYSTEM_ARCHITECTURE`, `DATA_FLOW`, `CODING_STANDARDS`,
  `DESIGN_PATTERNS`, `TESTING_STRATEGY`. Filled when there is enough code.
- **Tier 3** — `API_STRUCTURE`, `DATABASE_STRUCTURE`, `INTEGRATIONS`,
  `SECURITY_RULES`, `DEPENDENCY_RULES`. Only if the project has that thing.
- **Tier 4** — `PERFORMANCE_NOTES`, `COMMON_MISTAKES`. Grow from real
  experience. Empty is normal.

## Experience

| Folder | What goes in it |
|---|---|
| `examples/` | Real worked examples from this codebase — never invented ones |
| `decisions/` | Architecture decisions: what, why, what was rejected |
| `failures/` | Real incidents: what broke, root cause, how to recognize the shape again |
| `history/` | Chronological log of significant AI-driven changes |

## Prompts

Ready-made prompts in `prompts/`, for when you want to drive a specific task
shape explicitly: `SESSION_START`, `INITIAL_ANALYSIS`, `FEATURE_DEVELOPMENT`,
`BUGFIX`, `REFACTOR`, `CODE_REVIEW`, `ARCHITECTURE_REVIEW`, `UPDATE_MEMORY`.

## The one-line version

> Read the rules once per session, load only what the task needs, verify before
> claiming anything, and write to memory only when a future session would
> genuinely be better for it.
