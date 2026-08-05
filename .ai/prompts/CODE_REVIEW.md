---
type: prompt
---

# Prompt: Code Review

> Use this to review a change — yours or someone else's — against this
> project's real conventions rather than generic best practice.

## Prompt

```
Review this change against this project's actual documented conventions, not
against generic best practices.

Correctness first:
1. Does it do what it claims? Trace the logic, do not trust the description
   or the commit message.
2. Edge cases: empty, null, zero, very large, concurrent, duplicate,
   permission-denied. Which are handled, which are not?
3. If it changed a shared function, type, or interface - are ALL call sites
   updated? Search, and tell me what search you ran.

Then, against recorded project knowledge:
4. .ai/knowledge/CODING_STANDARDS.md - does it match the observed
   conventions here?
5. .ai/knowledge/DEPENDENCY_RULES.md - does it respect the real import
   direction?
6. .ai/knowledge/DESIGN_PATTERNS.md - does it follow an existing pattern, or
   introduce a new one without justification?
7. .ai/knowledge/SECURITY_RULES.md - if it touches auth, permissions,
   secrets, or user input, does it hold the documented boundary?
8. .ai/failures/LESSONS_LEARNED.md and .ai/knowledge/COMMON_MISTAKES.md -
   does it repeat a known mistake?
9. If it changes the database: does it follow the real migration process in
   .ai/knowledge/DATABASE_STRUCTURE.md, for every environment that exists?
10. .ai/knowledge/TESTING_STRATEGY.md - is the test coverage consistent with
    how this project tests things?

Report as:
- Must fix - with the specific rule or file it violates, and why it matters
- Should consider - real improvement, not a preference
- Needs a human decision - genuinely ambiguous, do not guess

Do not pad the review. If the change is fine, say it is fine. A review that
manufactures findings to look thorough is worse than a short one.
```

## Note on severity

Rank by consequence, not by how easy the issue was to spot. A missed call
site and a naming nitpick are not the same finding, and listing them together
trains the reader to skim past both.
