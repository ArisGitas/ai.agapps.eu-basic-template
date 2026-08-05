---
status: template
tier: 3
last_verified: never
verified_against: none
---

# Integration Examples

> TEMPLATE — each entry documents how a real external service was
> integrated into this project. See `../knowledge/INTEGRATIONS.md` for
> the full inventory this draws from.

## Example: [real external service name]

**Context**: [what this project needed the external service for.]

**Analysis**: [what was checked before integrating — the provider's real
API shape, auth scheme, rate limits, failure modes.]

**Implementation**: [the real integration code — where it lives, how
credentials are read, how the provider's calls are wrapped.]

**Validation**: [how this integration is actually tested/verified —
including whether tests hit the real provider or a mock/sandbox, and
under what conditions.]

**Common Errors**: [a real mistake to avoid — a wrong assumption about
the provider's behavior, a credential-handling mistake, a webhook-
verification gap once found.]

---

[Repeat for each real integration worth documenting as a reference
example. If a new integration is ever added to this project, add its
entry here — see `../MEMORY_UPDATE_RULES.md`.]
