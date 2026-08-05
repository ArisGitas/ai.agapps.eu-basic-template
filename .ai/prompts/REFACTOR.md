---
type: prompt
---

# Prompt: Refactor

> Use this for structural change with no intended behaviour change. The whole
> risk of a refactor is **incompleteness** — a rename or signature change that
> is 90% applied is worse than one never started, because the codebase now
> looks consistent while being broken.

## Prompt

```
Before changing anything:

1. State the goal precisely: what structure changes, and what behaviour must
   stay identical. If any behaviour is *intended* to change, say so now -
   that makes this not a pure refactor.

2. Establish the full blast radius before the first edit. Search
   exhaustively for every affected usage - and tell me the exact searches
   you ran, so I can judge whether they were sufficient. Include: direct
   calls, re-exports, dynamic/string references, tests, config, docs,
   generated code.

3. Check .ai/knowledge/DEPENDENCY_RULES.md and .ai/knowledge/MODULE_MAP.md -
   does this change any established dependency direction? Check
   .ai/examples/REFACTORING_EXAMPLES.md for a precedent in this project.

4. Confirm a safety net exists before starting: which tests currently cover
   this behaviour? If coverage is thin, say so - and consider adding
   characterization tests first, so "behaviour unchanged" is something you
   can actually demonstrate rather than assert.

5. Give me the plan as an ordered sequence of steps, each leaving the
   codebase in a working state. Wait for my go-ahead if this touches more
   than a few files.

6. Execute in that order. Do not mix in unrelated improvements - if you spot
   something, note it for later.

7. Verify completeness explicitly:
   - run everything in .ai/knowledge/DEVELOPMENT_WORKFLOW.md
   - re-run the search from step 2 and show me it returns nothing stale
   - confirm behaviour is unchanged, not merely that it compiles

8. Report what changed, what you verified, and anything you deliberately
   left alone.
```

## Non-negotiable

**"It builds" is not evidence a refactor is correct.** Compilation proves the
shape is consistent, not that behaviour survived. Say precisely what you ran
that demonstrates behaviour is unchanged — and if the honest answer is
"nothing does", say that, because it is important.
