# Architecture Decisions Log

> Real ADRs for this project, newest first. Format in `DECISION_TEMPLATE.md`.

## The `.ai/` operating-system loader lives only in `CLAUDE.md`, never in `AGENTS.md` {#ai-os-loader-not-in-agents-md}

**Date**: 2026-08-05

**Decision**: For this repo specifically, the standard convention used
in the parent Hub project (`AGENTS.md` as the canonical loader pointing
at `.ai/AI_OPERATING_SYSTEM.md`, with `CLAUDE.md` etc. as thin
re-exports of it) is **inverted**: `AGENTS.md` here carries zero `.ai/`
references and stays scoped entirely to facts about this template's own
code (data-section/data-role convention, i18n system, known quirks).
The `.ai/` loader block lives in `CLAUDE.md` only.

**Reason**: this repo's `AGENTS.md` is not read only by developer-facing
coding tools (Claude Code, Cursor, Copilot) the way it is in every other
project using this `.ai/` convention — it is **also** read directly,
verbatim, by the AgApps Hub platform's own runtime site-editing AI, on
every single customer edit turn to every site cloned from this template
(verified: the Hub's `prompts/system.ts`, `SYSTEM_PROMPT_V7` onward,
explicitly instructs it to `read_files` `AGENTS.md` "FIRST, before
anything else, every turn" and treat it as "the primary source of
truth"). That AI has a fixed, small toolset
(`get_file_tree`/`read_files`/`write_file`/`edit_file`/`inject_template`/`update_plan`)
and no ability to act on operating-system-style instructions like "read
`.ai/AI_OPERATING_SYSTEM.md`" or "stop and ask before anything
irreversible" — those are meaningless overhead to it, at best wasted
tokens/read calls on every customer turn, at worst actively confusing.

**Alternatives rejected**:
- Keep the standard convention (loader in `AGENTS.md`, imported by
  `CLAUDE.md`) — rejected because it was tried first (2026-08-05,
  installer-generated) and is the real incident this decision fixes;
  see `../failures/LESSONS_LEARNED.md#ai-os-block-in-agents-md`.
- Rename the runtime-AI-facing file to something other than `AGENTS.md`
  — rejected because the Hub's `prompts/system.ts` hardcodes the literal
  filename `AGENTS.md` (and `agent.manifest.json`); renaming it would
  require a parent-repo prompt change instead, a much larger blast
  radius for a template-repo-local problem.

**Impact**: `AGENTS.md` was stripped back to its original,
pre-installer content (data-section/role convention, `agent.manifest.json`
structure, stack facts, i18n system — §1-4 of the file). `CLAUDE.md`
already independently pointed at `.ai/AI_OPERATING_SYSTEM.md`, so no
change was needed there. `.cursor/rules/ai-operating-system.mdc` and
`.github/copilot-instructions.md` were left as-is (Cursor/Copilot never
read `AGENTS.md`/`agent.manifest.json` as the runtime AI does, so they
don't collide with this problem).

**Future considerations**: if the Hub's `prompts/system.ts` is ever
changed to check a *different* filename for template facts, revisit
whether `AGENTS.md` can safely carry the `.ai/` loader again. Any future
`.ai/`-template installer run against this repo (or any other site
template) must re-apply this same split manually — it is not something
the generic installer knows to do on its own.

**Addendum (2026-08-07)**: with Claude Code confirmed as the only coding
tool used on this repo going forward, `CLAUDE.md` was rewritten from a
thin `.ai/` re-export into a real, dense "quick facts" file (stack table,
verification commands, the AGENTS.md-dual-audience rule above, and the
top verified gotchas from `PROJECT_OVERVIEW.md`) with the original
`.ai/` loader block kept below it, unchanged and still machine-managed
(`<!-- AI-OS:BEGIN/END -->`). Rationale: CLAUDE.md is read on every
Claude Code session regardless of task, so the highest-value facts
belong there directly instead of costing a tool call into `.ai/` for
things a trivial task never otherwise needs to look up. `.cursor/rules/`
and `.github/copilot-instructions.md` were left untouched - they still
work and aren't the primary target, but nothing about them is broken.
