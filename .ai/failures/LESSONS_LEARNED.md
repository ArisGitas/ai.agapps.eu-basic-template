# Lessons Learned

> Real incidents in this project's history. Each entry: what broke, the
> real root cause, the real fix, and the general shape to recognize if
> it's about to happen again. Fast-scan index: `../knowledge/COMMON_MISTAKES.md`.

## How to add an entry

```markdown
## [N]. [Short description of what broke]

**What broke**: [the real, observed symptom.]

**Root cause**: [the real underlying cause, as actually determined —
not a guess.]

**Fix**: [what was actually changed to resolve it.]

**Recognize this shape**: [the general pattern to watch for, so a
different-looking instance of the same class of mistake is still
caught.]
```

## When to add an entry

Only when the mistake is the kind that could plausibly recur in a
different form — see `../MEMORY_UPDATE_RULES.md`. A one-off typo with no
general lesson does not belong here.

---

## 1. Generic `.ai/` installer contaminated `AGENTS.md` with developer-tooling instructions the runtime AI can't use {#ai-os-block-in-agents-md}

**What broke**: nothing was broken *yet* — caught during the same
session that added `.ai/` to this repo, before anything was committed.
Running the generic `.ai/`-template installer against this repo
appended a whole "AI Operating System" loader block (pointing at
`.ai/AI_OPERATING_SYSTEM.md`, `.ai/STATUS.md`, `.ai/TASK_PROTOCOL.md`,
listing rules like "stop and ask before anything irreversible") directly
into `AGENTS.md`, on top of that file's existing, deliberately-written
content (data-section/data-role convention, i18n system, known quirks).

**Root cause**: the installer is a generic tool — it assumes `AGENTS.md`
is only ever read by a developer-facing coding assistant, which is true
for the vast majority of projects (including the parent Hub project
itself) but **not** for this one. This repo's `AGENTS.md` is also read
directly by the AgApps Hub platform's own runtime, per-customer
site-editing AI (confirmed in the parent repo's `prompts/system.ts`,
which instructs it to read `AGENTS.md` "FIRST, before anything else,
every turn" and treat it as ground truth). Had this been committed and
pushed, every new customer site cloned from this template from that
point forward would have inherited an `AGENTS.md` bloated with
instructions meaningless to that AI (it has no tool to "read
`.ai/AI_OPERATING_SYSTEM.md`" with, no memory system, no task-loop
concept) — wasted context/read calls at best, confusing/contradictory
guidance at worst, on every single customer edit turn from then on.

**Fix**: stripped the injected block back out of `AGENTS.md`, keeping
only the pre-existing, runtime-AI-facing content. The `.ai/` knowledge
base itself was kept (genuinely useful for a human/coding-assistant
working on this template's own source later) but its loader now lives
only in `CLAUDE.md`, never in `AGENTS.md` — see the architecture
decision this incident produced:
`../decisions/ARCHITECTURE_DECISIONS.md#ai-os-loader-not-in-agents-md`.
Caught before any commit, so no customer site was actually affected.

**Recognize this shape**: any generic scaffolding/installer tool assumes
its target file serves the *usual* audience for that filename. When a
file in this specific project has a **second, non-obvious reader**
(here: a different codebase's runtime AI, not just human-facing coding
tools), re-check what a generic tool wrote into it before trusting the
output, especially for any file explicitly named in another system's
own prompt/config (grep the consuming system for the literal filename
if in doubt, the way this was confirmed via the parent repo's
`prompts/system.ts`).
