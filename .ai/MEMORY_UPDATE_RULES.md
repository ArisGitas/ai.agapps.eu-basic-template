---
type: core
always_read: false
read_when: after completing significant work
---

# Memory Update Rules

> When this knowledge base grows, and — more importantly — when it must not.
> `KNOWLEDGE_MANAGEMENT.md` covers how to write well; this file covers whether
> to write at all. `prompts/UPDATE_MEMORY.md` is the routine to run.

## The principle

Memory is updated when there is **real, future value** — not on a schedule, not
after every change, not because "documentation should be kept current."

A knowledge base that grows on every commit becomes noise, and noise gets
skipped. One that grows only when something genuinely worth remembering happens
stays worth reading. **The default answer to "should I update memory?" is no,
and that is by design.**

## The four-step check

```
ANALYSIS         → What actually changed?
IMPACT           → Which parts of the system, and which .ai/ files, does it touch?
KNOWLEDGE CHECK  → Real future value? (tables below)
UPDATE           → Only the specific relevant file(s). No blanket rewrites.
```

If the knowledge check says no — stop. Do not write something just because you
performed the check.

## Update when

| Trigger | Where it goes |
|---|---|
| A new pattern was established (a genuinely new way of solving a class of problem here) | `knowledge/DESIGN_PATTERNS.md` |
| A hard problem was solved — real investigation, non-obvious solution | `failures/LESSONS_LEARNED.md` |
| A significant technical decision was made or reversed | `decisions/ARCHITECTURE_DECISIONS.md` |
| A reusable thing was built that future work should use instead of rebuilding | relevant `knowledge/` + `examples/` |
| A mistake was made that could recur in a different form | `knowledge/COMMON_MISTAKES.md` |
| The architecture actually changed shape | `knowledge/SYSTEM_ARCHITECTURE.md`, `knowledge/MODULE_MAP.md` |
| A recorded fact turned out to be wrong | **fix it in place, immediately — this one is not optional** |
| A significant feature shipped that a future task needs to know exists | `knowledge/` + `history/AI_CHANGE_HISTORY.md` |

## Do NOT update for

- A small bug fix with no general lesson — a typo, an off-by-one, a one-liner.
- Temporary debugging: logs added and removed, exploratory work that did not
  ship.
- Test scaffolding or throwaway code.
- Generated files — they document themselves via their generator.
- **Anything already recorded.** Improve the existing entry instead of adding a
  near-duplicate. Two entries on one topic means the next reader has to work out
  which is current.
- Anything the code already says clearly. Do not paraphrase the codebase back
  at itself.
- Something true of programming in general → `GLOBAL_MEMORY_RULES.md`.
- **Routine work done correctly.** A feature built cleanly by following an
  existing pattern teaches nothing new. That is the system working, not an
  event to log.

## Correcting vs. accumulating

If new information contradicts something recorded, **correct the existing
entry.** Never leave a wrong entry sitting next to a right one — stale
knowledge that contradicts reality is worse than a gap, because a future reader
has no way to tell which is current, and will not know to distrust the rest.

Never delete silently. If you remove something because it is no longer accurate
or relevant, say so in the edit — what was removed and why.

## What every update must record

- **Date.**
- **Why the update was needed** — the real trigger.
- **What changed in the knowledge** — not a restatement of the code diff.
- **What rule or pattern was established or corrected**, if any.
- Update `STATUS.md`: the file's status and `last_verified`.

## Scope discipline

Update **only** the files the change actually affects. A one-file change does
not justify a knowledge-base-wide refresh, and a broad rewrite makes it
impossible to see what genuinely moved.

## The test that matters

> *If a different agent, on a different task, six months from now, would be
> meaningfully faster or less wrong because this entry exists — write it.
> Otherwise do not.*

Everything above is an elaboration of that one sentence.
