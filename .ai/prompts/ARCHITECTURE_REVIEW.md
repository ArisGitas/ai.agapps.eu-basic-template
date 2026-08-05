---
type: prompt
---

# Prompt: Architecture Review

> A verification pass, run periodically or before a significant structural
> change, to check the knowledge base against what the code actually is now.
> Knowledge decays silently; this is what catches it.

## Prompt

```
This is a verification pass, not a redesign. Do not propose new architecture
unless I explicitly ask.

1. Read .ai/STATUS.md. Prioritise the files with the oldest last_verified
   dates and the areas that have changed most since.

2. For each of .ai/knowledge/SYSTEM_ARCHITECTURE.md, MODULE_MAP.md and
   DATA_FLOW.md: read the real, current code for what they describe and
   check whether the description still matches.

   Report each as:
   - accurate - no change needed
   - partially stale - state exactly what is wrong and what the real current
     structure or behaviour is
   - no longer applicable - state what replaced it

3. Verify .ai/knowledge/DEPENDENCY_RULES.md's stated import direction with a
   real search of the current codebase. Report any actual violations, and
   show the search you ran.

4. Verify the commands in .ai/knowledge/DEVELOPMENT_WORKFLOW.md still work.
   A stale verification command is the most damaging kind of stale
   knowledge, because agents rely on it to decide when work is done.

5. Fix everything you found stale, in place, per .ai/MEMORY_UPDATE_RULES.md.
   Never leave a known-wrong entry next to a note saying it is wrong -
   correct it, and say in the edit what changed and why.

6. Update each corrected file's frontmatter (status, last_verified,
   verified_against), update .ai/STATUS.md's table and its "known gaps"
   section, and set last_full_review.

7. Report: what was accurate, what was stale, what you corrected, and
   anything you could not verify.
```

## Also worth asking during this pass

- Is any knowledge file **too detailed to stay true** — going stale every
  time it is checked? That is a signal to write it at a higher level, or to
  point at the code instead of describing it.
- Is anything here that nobody has needed since it was written? Consider
  deleting it. Volume is not the goal; trustworthiness is.
