# Copilot Instructions

<!-- AI-OS:BEGIN — managed by the .ai/ template. Edit .ai/, not this block. -->

This repository has an AI rule set and project knowledge base under `.ai/`.

**Before your first action in a session:**

1. Read `.ai/AI_OPERATING_SYSTEM.md` in full — it is short and it is required.
2. Read `.ai/STATUS.md` — what is already known and verified about this project.
3. Load only the further `.ai/` files this task needs (routing table in
   `AI_OPERATING_SYSTEM.md` §4).

If `.ai/STATUS.md` says `initialized: false`, follow `.ai/PROJECT_INIT.md`.

**Core rules** (full text in `.ai/AI_OPERATING_SYSTEM.md` §3):

- Verify, never assume — read the real file before describing what it does.
- Training data is stale; verify versions and APIs against this repo's lockfile.
- "I don't know" is a valid answer. Never invent a path, function, command, or
  reason. Distinguish `verified:` from `inferred:`.
- Never report work as done without running this project's real checks
  (`.ai/knowledge/DEVELOPMENT_WORKFLOW.md`). If you could not run them, say so.
- Follow the existing pattern; justify any new one before introducing it.
- Stay in scope — report unrelated problems, do not silently fix them.
- Stop and ask before irreversible or outward-facing actions.
- Never write secret values into code, files, commits, or chat.

Task loop: `.ai/TASK_PROTOCOL.md` —
understand → locate → plan → change → verify → report → remember.

<!-- AI-OS:END -->
