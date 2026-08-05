---
type: prompt
---

# Prompt: Feature Development

> Use this when starting a new feature in a project whose knowledge base is
> already populated.

## Prompt

```
Before writing any code:

1. Load what this task needs (AI_OPERATING_SYSTEM.md section 4): at minimum
   .ai/knowledge/PROJECT_OVERVIEW.md, MODULE_MAP.md, DESIGN_PATTERNS.md and
   CODING_STANDARDS.md, plus whichever of API_STRUCTURE.md /
   DATABASE_STRUCTURE.md / SECURITY_RULES.md / INTEGRATIONS.md this feature
   actually touches.

2. Find the precedent. Search .ai/examples/ and the codebase itself for
   something similar already built here. Almost every feature has one, and
   it is a better template than anything you would design from scratch.

3. Check .ai/failures/LESSONS_LEARNED.md and
   .ai/knowledge/COMMON_MISTAKES.md for this area.

4. Before writing code, state:
   - what you understood the requirement to be, and its done-condition
   - the existing pattern you found and are following
   - the files you will change and what changes in each
   - how you will verify it
   - anything ambiguous you want me to decide

   If the requirement has more than one reasonable reading, ask instead of
   picking one silently.

5. Implement, following this project's real conventions. Do not introduce a
   new pattern where a documented one fits - if you believe a new one is
   genuinely needed, say so and why before building it that way.

6. Verify per .ai/knowledge/DEVELOPMENT_WORKFLOW.md and TESTING_STRATEGY.md.
   Report what you ran, what passed, and what you did NOT verify.

7. Apply .ai/MEMORY_UPDATE_RULES.md. For most features the right answer is
   no memory update - only record something if a future, different task
   would genuinely benefit.
```

## The failure this prompt prevents

An agent that skips step 2 builds a second way of doing something this project
already does. That costs nothing today and compounds forever: the next agent
finds two precedents, picks one, and the codebase forks a little further.
