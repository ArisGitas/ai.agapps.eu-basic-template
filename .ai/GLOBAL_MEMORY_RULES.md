---
type: core
always_read: false
read_when: you learn something that seems true beyond this project
---

# Global Memory Rules

> This project's `.ai/` describes **this project only**. This file governs the
> boundary between it and any cross-project memory — the rule that keeps the
> same template safely reusable across every repository you own.

## The relationship, stated plainly

This project's `.ai/` folder is **self-contained**. It does not read from,
depend on, or require any global memory store. Everything here works
identically on a machine that has one and a machine that does not.

If a cross-project store exists (a personal "AI brain" directory, or your
agent tool's own user-level memory — e.g. `~/.claude/CLAUDE.md`), it holds
knowledge that applies **across every project**, never knowledge about this one.

## The boundary — never crossed automatically, in either direction

**Never leaves this project:**

- Architectural decisions made for this project.
- This project's folder structure, module names, or dependency versions.
- Real code from this repository.
- Anything client-confidential or business-specific.

**Never enters this project's `knowledge/`:**

- Content copied from another project's `.ai/`.
- Content copied from a global store.
- Generic best practices, from anywhere.

Every fact in this project's `knowledge/` must be independently verified
against **this** repository's real code — even when you are confident it is the
same as another project you worked on. *Especially* then: two projects using the
same framework diverge in exactly the places that matter, and a carried-over
assumption is invisible until it causes a wrong change.

## What CAN be proposed for global memory

Occasionally something learned here is genuinely general — true regardless of
project or stack. Examples of the right shape:

- A debugging discipline ("after two failed fixes, re-diagnose instead of
  trying a third").
- A class of bug and its general fix shape.
- A stated preference of the human's about how they want work reported.
- A verification habit ("confirm claimed-complete work before building on it").

When you notice one:

1. **Do not put it in this project's `knowledge/`** — that would misrepresent
   generic advice as project fact, which `KNOWLEDGE_MANAGEMENT.md` forbids.
2. **Say it out loud to the human**: *"This seems like a general lesson rather
   than something specific to this project — worth adding to your global AI
   memory?"*
3. Only if they agree, and into their global store — never into this `.ai/`.

The transfer is never automatic and never silent. The human decides.

## Preferences about *you* vs. facts about the project

A useful distinction when you are unsure which side of the boundary something
falls on:

- *"This project's tests need a running Postgres container"* → project fact →
  `knowledge/TESTING_STRATEGY.md`.
- *"Always show me the plan before editing more than three files"* → a
  preference about how the human wants agents to behave → belongs in global
  memory, or in this project's `knowledge/PROJECT_OVERVIEW.md` constraints section if it
  applies here only.

When genuinely ambiguous: ask which they want. It costs one sentence.

## Why the separation matters

- **Trust**: a reader of `knowledge/*.md` can assume every line is about this
  project, verified here. That assumption is what makes the files worth
  reading at all.
- **Portability**: this template drops into a brand-new project on any machine
  and behaves identically.
- **No silent pollution**: generic advice never masquerades as project fact,
  and project detail never leaks into a global store where it will be wrong for
  the next repository.
