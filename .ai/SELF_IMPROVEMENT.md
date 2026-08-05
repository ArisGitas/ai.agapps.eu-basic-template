---
type: core
always_read: false
read_when: the human gives you feedback, or a way of working proves itself
---

# Self-Improvement

> Three kinds of thing get learned while working on a project, and they belong
> in three different places. Putting one in the wrong place is how a knowledge
> base becomes untrustworthy.

| What you learned | Where it goes |
|---|---|
| A fact about **this project** ("auth is enforced in `x/y.ts`") | `knowledge/*.md` |
| A fact about **how to work here** ("always run `pnpm typecheck` before claiming done — the build passes without it") | `knowledge/DEVELOPMENT_WORKFLOW.md`, or this file's §2 if it is about agent behaviour |
| A fact about **working in general**, true in any project | Nowhere in this repo → propose it to the human, see `GLOBAL_MEMORY_RULES.md` |

---

## 1. This system is meant to be edited

`.ai/` is not a fixed spec you comply with. It is a living controller for how
AI works in this repository. When a rule here is wrong for this project, the
right response is to propose changing the rule — not to follow it badly or
ignore it silently.

**Change the rules when:**

- A rule caused you to do the wrong thing, or produced friction with no benefit.
- The human corrected you on something a rule should have prevented.
- A rule is ambiguous enough that two readings lead to different behaviour.
- The project changed shape and a rule no longer matches reality.

**How to change them:** state what you want to change, why, and what the
concrete failure was that prompted it. Get the human's agreement before
editing anything under `.ai/` that is `type: core`. Knowledge files you may
correct directly when the code proves them wrong (that is required, not
optional) — but the operating rules themselves change only with the human's
say-so.

---

## 2. Recording behavioural corrections

When the human corrects **how you work** (as opposed to what the code should
be), that correction is worth more than the individual fix — it will apply
again next session, to a different task, when nobody remembers this
conversation.

Record it in `knowledge/COMMON_MISTAKES.md` in this shape:

```markdown
- [ ] **<the mistake, in one line>** — <how it happens / why it is tempting>
  → <what to do instead>. Corrected: YYYY-MM-DD.
```

Record it **only** if it could plausibly recur in a different form. A one-off
misreading is not a lesson; a habit is.

Signals that a correction is worth recording:

- The human says "again", "as I said before", "you always…", or repeats an
  instruction from earlier in the session.
- You were confidently wrong about something checkable — that is a process
  failure (you did not check), not a knowledge failure.
- You claimed something was done and it was not.

---

## 3. The end-of-work reflection

After a substantial piece of work, before you report, spend one pass on:

1. **What made this slower than it needed to be?** Missing knowledge? A wrong
   assumption? A rule that misdirected you? Something the human had to repeat?
2. **Would that be fixed by a knowledge entry?** → add it, per
   `MEMORY_UPDATE_RULES.md`.
3. **Would it be fixed by a rule change?** → propose it, per §1.
4. **Or was it just this task being hard?** → then nothing needs to change.
   This is the most common answer and it is fine.

Do not manufacture a lesson from every task. An honest "nothing to add here"
keeps this system worth reading.

---

## 4. Contradiction is a signal, not an error

When `.ai/` says one thing and the code says another, that gap is information:

- The code is right about *what is*. Correct the file, immediately, and say
  you did.
- But ask *why* it drifted. A file that goes stale repeatedly is either
  describing something too volatile to document, or is written at the wrong
  level of detail. Both are fixable — raise it rather than re-correcting the
  same file every month.

The same goes for a rule you keep having to work around: that is the rule
telling you it is wrong.

---

## 5. Signs this system is working — and signs it is not

**Working:**

- A new session gets productive on a task without the human re-explaining the
  architecture.
- Agents follow this project's conventions without being told them.
- Repeat mistakes stop repeating.
- `knowledge/` stays small enough that reading it is cheaper than deriving it.

**Not working — raise it with the human:**

- Nobody reads it because it is too long, or too generic to be worth the time.
- Its files contradict the code more often than they match.
- It has grown into a second, worse copy of the codebase's own documentation.
- Filling it in has become a ritual performed after tasks rather than a tool
  used during them.

If the second list is where this project is, the fix is deletion and
simplification, not more content.
