---
status: template
tier: 3
last_verified: never
verified_against: none
---

# Database Examples

> TEMPLATE — each entry documents a real, instructive database
> interaction in this project — a schema change, a non-trivial query, a
> transaction, a concurrency-safe write pattern. See
> `../knowledge/DATABASE_STRUCTURE.md` for the schema-level picture.

## Example: [real interaction name]

**Context**: [what real requirement this database interaction addresses.]

**Analysis**: [what was considered before implementing — concurrency
concerns, consistency requirements, whether a transaction was needed.]

**Implementation**: [the real query/migration/transaction code, as
actually written in this project.]

**Validation**: [how correctness was actually verified — real tests, or
real manual verification of the resulting data.]

**Common Errors**: [a real mistake to avoid — e.g. a race condition this
pattern specifically prevents, a migration-ordering issue once
encountered.]

---

[Repeat for each real database interaction worth documenting as a
reference example.]
