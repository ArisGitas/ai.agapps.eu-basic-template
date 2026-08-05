---
type: core
always_read: false
read_when: before writing anything into knowledge/ or examples/
---

# Knowledge Management

> How to write knowledge that is still useful in six months.
> `MEMORY_UPDATE_RULES.md` covers *when* to write; this file covers *what good
> looks like*.

## The core principle

Every statement in `.ai/` must be traceable to something real in this
repository: a real file, a real function, a real decision someone made, a real
problem that actually happened. If you cannot point at where it came from, it
does not belong here.

## The order of understanding

Doing these out of order is the main way a knowledge base fills with
confident-sounding wrong content.

1. **Read the code.** Actual implementation, before writing anything about it.
2. **See the architecture.** Only after enough real code that you can see how
   the pieces genuinely connect.
3. **Then identify patterns.** A pattern recurs — you cannot know something
   recurs until you have seen the code (1) and the structure (2).
4. **Then attribute reasons.** From comments, commit messages, linked issues,
   or the human. Never from plausibility.
5. **Then write examples.** An example written before you understand the
   pattern will demonstrate the wrong thing, persuasively.

## The specificity test

Before saving any sentence, ask: **could this be true of almost any project in
this stack?**

| ✗ Generic — does not belong here | ✓ Specific — belongs here |
|---|---|
| "REST APIs should validate input" | "Every route validates its body with `<real mechanism>` in `<real path>`; three legacy routes in `<path>` do not — listed below" |
| "Use dependency injection for testability" | "Services receive their DB handle as the first constructor argument (`<real file>`); tests substitute an in-memory one via `<real helper>`" |
| "Error handling is important" | "Two tiers: domain errors become 4xx via `<real file>`; anything else becomes a 500 and is logged with the request id" |
| "The codebase follows clean architecture" | "Routes never import from `db/` — verified with `grep -r \"from '.*db/\" src/routes` (0 hits)" |

The right-hand column has a property the left does not: **a reader can go
check it, and it can be wrong.** Knowledge that cannot be falsified is not
knowledge.

## Write for the reader who arrives cold

The next reader is an AI agent with no memory of this conversation and no
context beyond what is written. So:

- **Absolute, real paths** — `src/services/billing.ts`, not "the billing
  service".
- **Real names** — actual functions, actual env vars, actual commands.
- **Real commands, copy-pasteable** — `pnpm test --filter api`, not "run the
  tests".
- **Say what is surprising.** The highest-value sentence in any knowledge base
  is the one that begins "unlike what you would expect…". A convention that
  matches the ecosystem default barely needs recording; a departure from it
  absolutely does.
- **Say what is missing.** "There is no rate limiting" and "this path has no
  test coverage" prevent real mistakes. Absence is knowledge.

## Recording reasons honestly

Not every shape in a codebase has a knowable reason. When you can determine the
real one, record it via `decisions/DECISION_TEMPLATE.md`. When you cannot, write
exactly that:

> "Reason not documented in this repo — inferred from code structure only."

An honest "unknown" is more useful than a confident guess, because a future
agent can tell the difference and knows to ask. A plausible invented
justification is indistinguishable from a real one and will be built upon.

## Examples must be real

Reference a real file path, and where practical include a real excerpt —
verbatim or lightly trimmed, not a cleaned-up re-imagining that no longer
matches the repo. If the real code is too long to excerpt usefully, describe
its shape precisely enough that a reader can find and recognize it.

An idealized example that does not match reality is actively harmful: the next
agent will copy it and produce code that does not fit this codebase.

## Keep it small

Every file added is a file that must stay true. Prefer:

- **One good example** over five thin ones.
- **A pointer to the code** over a copy of the code. Anything duplicated from
  the codebase will drift; a path plus an explanation of *why* will not.
- **Deleting a stale section** over maintaining it out of politeness.

If a knowledge file has grown past roughly a screen or two, it is probably
mixing "what a reader always needs" with detail that belongs in the code. Split
or trim it.

## Self-check — signs you have drifted

- No real file path, function name, or command appears in what you just wrote.
- The same sentence would work in a different project's knowledge base.
- You are describing what *should* exist rather than what you verified exists.
- You are filling a section because the template has it, not because you found
  something real for it.
- You are restating what the code plainly says, adding nothing a reader could
  not get faster by opening the file.

Any of these → stop. Either go find the real thing to describe, or mark the
section honestly as not-analyzed / not-applicable and move on. An empty,
honest section costs nothing. A full, wrong one costs the next agent its trust
in everything else here.
