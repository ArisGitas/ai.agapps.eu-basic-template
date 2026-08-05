---
type: prompt
---

# Prompt: Update Memory

> Run after completing significant work, to decide whether the knowledge base
> should change. Applies the rules in `../MEMORY_UPDATE_RULES.md`.

## Prompt

```
Run the four-step memory-update check from .ai/MEMORY_UPDATE_RULES.md
against the work just completed.

ANALYSIS: What actually changed?

IMPACT: Which real parts of the system does it affect, and which .ai/ files
are candidates?

KNOWLEDGE CHECK: Apply the test - would a different agent, on a different
task, six months from now, be meaningfully faster or less wrong because this
entry exists?

  Update when: a new pattern was established, a hard problem was solved, a
  significant decision was made or reversed, a reusable thing was built, a
  recorded fact turned out to be wrong, or a mistake was made whose shape
  could recur.

  Do not update for: small fixes, one-liners, temporary debugging, throwaway
  code, generated files, duplicates of what is already recorded, or routine
  work done correctly by following an existing pattern.

If the check says NO: say so explicitly, with your reasoning, and write
nothing. This is the expected outcome most of the time.

If the check says YES:
- Update ONLY the specific relevant file(s). No blanket rewrites.
- An architectural decision -> .ai/decisions/ARCHITECTURE_DECISIONS.md,
  using DECISION_TEMPLATE.md's format.
- A real problem solved -> .ai/failures/LESSONS_LEARNED.md.
- A recurring mistake shape -> .ai/knowledge/COMMON_MISTAKES.md.
- Worth a chronological record -> .ai/history/AI_CHANGE_HISTORY.md.
- A fact that turned out wrong -> correct it in place, and say what changed.
- Something true beyond this project -> do NOT put it in knowledge/; see
  .ai/GLOBAL_MEMORY_RULES.md and propose it to me instead.

Every update records: date, why it was needed, what changed in the
knowledge (not a restatement of the code diff), and what rule or pattern was
established or corrected. Update the file's frontmatter and .ai/STATUS.md.

Finally, run the reflection in .ai/SELF_IMPROVEMENT.md section 3: was there
anything about how we worked - not about the code - that slowed this down
and would be worth fixing?
```

## Remember

Writing nothing is a valid, common, and correct outcome. The value of this
knowledge base comes from what it leaves out as much as what it contains.
