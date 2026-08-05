---
type: prompt
---

# Prompt: Bug Fix

> Use this for "something is broken." The discipline that matters here is
> **diagnose before fixing** — the most expensive bug-fix failure mode is a
> confident fix applied to a symptom while the real cause stays in place.

## Prompt

```
Before changing any code:

1. Reproduce or precisely locate the failure. State: what I expected, what
   actually happens, and the exact evidence you have for that (error text,
   log line, failing test, observed behaviour). If you cannot reproduce it,
   say so before proposing anything.

2. Check .ai/failures/LESSONS_LEARNED.md and
   .ai/knowledge/COMMON_MISTAKES.md - has this shape of bug happened here
   before?

3. Find the root cause, and distinguish it from the symptom. State which is
   which. If you are not sure you have the root cause, say that explicitly
   rather than fixing the most likely-looking line.

4. Before fixing, tell me:
   - the root cause
   - the smallest change that addresses it
   - what else in the codebase has the same flaw (search for it - a bug
     rarely occurs exactly once)
   - whether a test currently exists that should have caught this

5. Fix it. Prefer the minimal correct change. Do not refactor surrounding
   code in the same pass.

6. Verify: run the real checks from
   .ai/knowledge/DEVELOPMENT_WORKFLOW.md, and demonstrate that the specific
   failure is gone - not just that the build passes.

7. Add or update a test that would have caught this, if this project's
   .ai/knowledge/TESTING_STRATEGY.md conventions support it. If you are not
   adding one, say why.

8. Apply .ai/MEMORY_UPDATE_RULES.md. A bug worth remembering (one whose
   shape could recur) goes in .ai/failures/LESSONS_LEARNED.md; a trivial one
   goes nowhere.
```

## The rule this prompt exists to enforce

> **Two failed fix attempts means the diagnosis is wrong, not that the third
> attempt will work.** Stop, re-read the evidence, and question an assumption
> you have not tested.
