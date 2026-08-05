---
type: prompt
---

# Prompt: Initial Analysis

> Use this once, right after installing this template into a project, to build
> the knowledge base from the real code.

## Prompt

```
Read .ai/AI_OPERATING_SYSTEM.md in full, then .ai/PROJECT_INIT.md and
.ai/KNOWLEDGE_MANAGEMENT.md.

Then run the full initial analysis PROJECT_INIT.md describes:

- Ask me the two questions in its "Before you start" section first.
- Identify the real tech stack from manifests and lockfiles - the lockfile
  is the truth about versions.
- Map the real folder structure, opening enough of each folder to state its
  actual responsibility rather than guessing from its name.
- Establish and actually run this project's verification commands (lint,
  type-check, build, test). Record what really works.
- Trace at least one real end-to-end flow through the actual code.
- Fill in the knowledge files by tier: tier 1 always, tier 2 if there is
  enough code, tier 3 only where the project genuinely has that thing.

Rules while you do this:
- Replace the placeholder text, do not add alongside it.
- Never invent content. If a file's topic does not apply here, mark it "not
  applicable" and say why - that is a correct, useful outcome.
- Update each file's frontmatter (status, last_verified, verified_against).
- Update .ai/STATUS.md: initialized, project name, every row, and the
  "known gaps and open questions" section.

When done, report:
- which knowledge files now have real content
- which are deliberately empty or not applicable, and why
- what you could not verify or want me to confirm
- anything surprising you found in the codebase
```

## What a good result looks like

- Every file is either real content or an honest, reasoned `template` /
  `not applicable` — never leftover placeholder text left as if it were
  filled in.
- The verification commands were **run**, not just copied out of a script.
- `STATUS.md` matches reality, and its "known gaps" section is non-empty
  (on a real codebase, there is always something you could not determine —
  an empty gaps list usually means the analysis was shallow).
- Nothing anywhere is invented.
