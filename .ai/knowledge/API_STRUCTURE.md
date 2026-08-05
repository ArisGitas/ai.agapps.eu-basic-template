---
status: not applicable
tier: 3
last_verified: 2026-08-05
verified_against: full src/ tree (no src/app/api/, no route handler of any kind)
---

# API Structure

**Not applicable.** This template has no API surface of any kind —
confirmed by the file tree: no `src/app/api/`, no route handler, no
CLI, no RPC/GraphQL layer. It is a single static page (`src/app/page.tsx`)
composed of presentational components. If a customer site descended
from this template later adds a real API route (e.g. a contact-form
backend), that customer repo should get its own filled-in version of
this file — this file describes the **template baseline**, not any
customer's eventual additions.
