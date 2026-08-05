---
type: core
always_read: false
read_when: STATUS.md says initialized: false
---

# Project Init

> The first-run analysis. Run it once, when `.ai/` has just been added to a
> project. Output: a `knowledge/` base containing only things you actually
> verified.
>
> **Budget it.** A small project deserves 15 minutes of analysis, a large one
> a couple of hours. Init is not a full code review — it is a map good enough
> that the next agent can find things and does not re-derive the basics.
> Depth comes later, from real work.

---

## Before you start

**Ask the human two questions** (they take seconds and prevent hours of wrong
work):

1. "Anything about this project I should know that is not visible in the
   code?" — constraints, history, things that look wrong but are deliberate.
2. "Anything I must never do here?" — deploy, touch prod data, modify certain
   files.

Whatever they answer goes into `knowledge/PROJECT_OVERVIEW.md` under
*Non-negotiable operating constraints*. If they are unavailable, proceed and
mark the section as unconfirmed.

**If this is a monorepo**, decide the scope first: one `.ai/` at the root
describing the whole workspace and how the packages relate, plus (only if a
package is large and independent enough to warrant it) its own `.ai/` inside
that package. Do not try to document every package in one file — say in
`knowledge/MODULE_MAP.md` which packages exist and which have their own
knowledge base.

**If the project is nearly empty** (a fresh scaffold, little real code): do
Step 1 and 2, fill `knowledge/PROJECT_OVERVIEW.md` and
`knowledge/DEVELOPMENT_WORKFLOW.md`, mark everything else honestly as
`template — project too new`, and stop. Filling
15 files about 200 lines of boilerplate produces fiction, not knowledge.

---

## Step 1 — Stack, from evidence

Read, do not assume:

- Manifests and lockfiles — `package.json`, `pyproject.toml`/`requirements.txt`,
  `go.mod`, `Cargo.toml`, `pom.xml`/`build.gradle`, `composer.json`, `*.csproj`,
  `Gemfile`. **The lockfile is the truth about versions**, the manifest is only
  the constraint.
- Language/tooling config — `tsconfig.json`, `.eslintrc*`, `ruff.toml`,
  `.editorconfig`, formatter config.
- Runtime/env config — `Dockerfile`, `docker-compose.yml`, CI workflows,
  `.env.example` (**never** read or record values from a real `.env`).
- The README, if one exists — but treat it as a claim to verify, not a fact.
  READMEs go stale faster than code.

Record: languages + versions, frameworks + **major** versions, database and
access method, package manager, build tool, test runner, deploy target.

**Flag any dependency whose major version is recent or unfamiliar to you** —
that is exactly where your training data will be wrong, and where a future
agent will confidently produce outdated code. Note it in
`knowledge/DEPENDENCY_RULES.md`.

→ writes `knowledge/PROJECT_OVERVIEW.md`, `knowledge/DEPENDENCY_RULES.md`

---

## Step 2 — Structure and workflow

Map the real tree, excluding dependency/build/vendor directories. For each
significant folder, open enough of its contents to state its real
responsibility — **a folder called `utils` tells you nothing until you read it.**

Find, concretely:

- Entry points — the real file that runs first, per way this project can start.
- Where business logic lives, if it is separated at all.
- Where data access lives.
- Where tests live and what they are named.
- Where configuration lives, and how environments differ.
- Anything that departs from what is conventional for this stack — those
  departures are the highest-value thing you can record, because they are what
  an agent will otherwise get wrong by defaulting to the convention.

Then establish the **verification commands** — the single most useful thing in
this entire knowledge base. From `package.json` scripts / `Makefile` / CI
config: how do you lint, type-check, build, and test this project? Run them if
you safely can, and record what actually works, not what the scripts claim.

→ writes `knowledge/MODULE_MAP.md`, `knowledge/DEVELOPMENT_WORKFLOW.md`

---

## Step 3 — Trace one real flow end to end

Pick the most representative operation this system performs (one HTTP request,
one CLI invocation, one job run) and follow it through the actual code, file by
file, from entry point to response or side effect.

This is the step that produces genuine architectural understanding. Everything
else in init is inventory; this is comprehension. Do not skip it, and do not
substitute a description of how projects of this type usually work.

While tracing, note:

- The layers/boundaries that actually exist (not the ones you expect).
- How errors are actually handled — is there one convention, or several?
- Where it talks to the outside world.
- What is synchronous vs. deferred to a background mechanism.

→ writes `knowledge/SYSTEM_ARCHITECTURE.md`, `knowledge/DATA_FLOW.md`

---

## Step 4 — Conventions and patterns

Now that you have read real code, record how this codebase *actually* does
things: naming, file layout, error handling, comment density, function size,
import style.

**The two-occurrence rule**: something is a pattern when you have seen it at
least twice. Once is an instance. Write "seen in `a.ts` and `b.ts`" — if you
cannot name two places, either say it is a single instance or leave it out.

→ writes `knowledge/CODING_STANDARDS.md`, `knowledge/DESIGN_PATTERNS.md`,
`knowledge/TESTING_STRATEGY.md`

---

## Step 5 — Tier 3 files, only where they apply

Fill each of these **only if the project genuinely has that thing.** Marking a
file `not applicable` is a correct, valuable outcome — it stops the next agent
from searching for something that does not exist.

- `knowledge/API_STRUCTURE.md` — if there is an API/CLI surface.
- `knowledge/DATABASE_STRUCTURE.md` — if there is a database. Read the real
  schema (migrations/models), and record **how many real environments exist**
  and how a migration reaches all of them.
- `knowledge/INTEGRATIONS.md` — if it calls external services.
- `knowledge/SECURITY_RULES.md` — if there is auth, permissions, or sensitive
  data. Record what protection **does not** exist as carefully as what does;
  a future agent assuming a protection is present is a real risk.

---

## Step 6 — Examples, only from real code

Populate `examples/` with real, already-shipped work from this repository —
real file paths, real excerpts. One genuinely good example beats six thin ones.

If there is not enough code yet to draw a real example from, leave those files
as template and say why. **Never invent an example.** A fabricated example is
worse than an empty file, because it teaches the wrong pattern with full
confidence.

---

## Step 7 — Close the loop

1. Update `STATUS.md`: `initialized: true`, project name, every row's status
   and `last_verified` date.
2. Set the frontmatter in each file you touched (`status`, `last_verified`,
   `verified_against`).
3. Fill in **Known gaps and open questions** in `STATUS.md` — everything you
   could not determine, could not verify, or want the human to confirm. This
   section is not an admission of failure; it is the highest-signal part of the
   whole init.
4. Report to the human: what is now documented, what is deliberately empty and
   why, what you are unsure about, and anything surprising you found in the
   codebase.

---

## Done means

- Every `knowledge/` file is either real content or an honest
  `template` / `not applicable` with a reason. **No leftover placeholder text
  presented as if it were filled in.**
- `STATUS.md` reflects reality.
- The verification commands in `knowledge/DEVELOPMENT_WORKFLOW.md` are ones you actually
  confirmed, not ones you copied from a script and hoped work.
- Nothing anywhere is invented.

Init is the *first* pass, not the last. From here the knowledge base grows from
real work — see `MEMORY_UPDATE_RULES.md`.
