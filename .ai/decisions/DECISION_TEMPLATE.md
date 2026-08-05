# Decision Template

> Copy this block into `ARCHITECTURE_DECISIONS.md` for every new
> significant architectural decision made in this project. Use an
> anchor-friendly heading so other files can link directly to it.

```markdown
## <Short, specific title> {#anchor-slug}

**Date**: YYYY-MM-DD

**Decision**: <One or two sentences — what was actually decided/built.>

**Reason**: <Why. The real trigger — a requirement, a bug, a limitation
hit in practice. Not a generic justification. If the real reason isn't
known/documented, say so explicitly instead of inventing one — see
../KNOWLEDGE_MANAGEMENT.md.>

**Alternatives rejected**:
- <Option A> — rejected because <concrete reason>.
- <Option B> — rejected because <concrete reason>.

**Impact**: <What actually changed as a result — real files, real
modules, real behavior.>

**Future considerations**: <What to watch for, what's still open, what
would need revisiting if a stated assumption changes.>
```

## What makes a decision "significant" enough to log

- It changes how data is modeled.
- It changes a cross-cutting pattern (error handling, auth, background
  processing).
- It was the resolution of a real problem, not just a stylistic
  preference.
- It rejected a real alternative that a future task might otherwise
  reach for again without knowing it was already considered and rejected.

See `../MEMORY_UPDATE_RULES.md` for the general criteria this specific
case falls under.
