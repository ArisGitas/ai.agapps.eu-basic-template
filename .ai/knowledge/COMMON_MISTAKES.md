---
status: filled
tier: 4
last_verified: 2026-08-05
verified_against: ../failures/LESSONS_LEARNED.md (this is its fast-scan index)
---

# Common Mistakes

> Fast-scan checklist version of real incidents. Full narrative for each:
> `../failures/LESSONS_LEARNED.md`.

## Checklist

- **Adding anything `.ai/`-related (a loader block, a reference, a
  pointer) into `AGENTS.md` in this specific repo** — tempting because
  that's the standard convention in most projects, but `AGENTS.md` here
  is ALSO read directly by the Hub platform's own runtime site-editing
  AI on every customer edit turn, which has no way to act on
  developer-tooling instructions and gets pure overhead from them. Keep
  `.ai/`'s loader in `CLAUDE.md` only. Full incident:
  `../failures/LESSONS_LEARNED.md#ai-os-block-in-agents-md`
- **Letting `agent.manifest.json` drift from the real `data-section`/
  `data-role` attributes in `src/components/*.tsx`** — a stale manifest
  actively misleads the Hub's runtime AI on every future customer edit,
  worse than no manifest at all (stated directly in `AGENTS.md` itself).
  Update both in the same change.
- **Adding a nav link to `Header.tsx`'s `navLinks` without also adding
  it to `Footer.tsx`'s separate, hand-duplicated `navLinks`** (they are
  NOT shared — see `MODULE_MAP.md`) — no incident yet, but the shape is
  real and easy to hit.

## How this file should grow

Add an entry here **only** when a mistake is the kind that could
plausibly recur in a different form — not a one-off typo. Add the full
narrative to `../failures/LESSONS_LEARNED.md` first, then a one-line
pointer here.
