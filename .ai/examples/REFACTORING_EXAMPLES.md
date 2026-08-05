---
status: template
tier: 3
last_verified: never
verified_against: none
---

# Refactoring Examples

> TEMPLATE — each entry documents a real, significant refactor carried
> out in this project — what changed, how the risk was managed, what was
> learned. See `../knowledge/DESIGN_PATTERNS.md` for the resulting
> pattern, if the refactor established one.

## Example: [real refactor name]

**Context**: [what real problem/limitation prompted this refactor.]

**Analysis**: [how the full scope of the change was determined before
starting — what was searched/grepped, what was found to be affected.]

**Implementation**: [the real sequence of steps taken, in order — schema/
structure change first, then which files were updated and in what order.]

**Validation**: [how it was verified the refactor was actually complete
and correct — not just that it compiled/built, but that the real
behavior was confirmed unchanged (or correctly changed, if that was the
point).]

**Common Errors**: [any real mistake made during this refactor — an
incomplete first pass, a missed call site, an assumption that turned out
wrong — and how it was caught.]

---

[Repeat for each real refactor worth documenting. This file, alongside
`../failures/LESSONS_LEARNED.md`, is one of the most valuable files in
this knowledge base once populated — refactors are exactly the kind of
work where a future task benefits most from a real precedent.]
