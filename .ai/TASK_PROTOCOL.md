---
type: core
always_read: false
read_when: once per session, before your first non-trivial change
---

# Task Protocol

> The loop `AI_OPERATING_SYSTEM.md` §2 summarizes, in full. This is the file
> that actually changes how well you perform on a task — the knowledge files
> only tell you *what is true about this project*, this one tells you *how to
> work in it*.

Scale the depth of each phase to the size of the task. Never skip a phase
entirely — a one-line change still has a done-condition and still needs
verification.

---

## 1. UNDERSTAND — before touching anything

Write down, in one or two sentences:

- **Goal**: what the human actually wants, in your own words.
- **Done-condition**: the observable thing that will be true when this is
  finished. "Tests pass" / "the endpoint returns 403 for a non-owner" /
  "the build succeeds". If you cannot state a done-condition, you do not yet
  understand the task — ask.

**Ambiguity rule.** If the request has more than one reasonable
interpretation and they lead to materially different work, ask. Do not pick
one silently and build it. One clarifying question costs less than a wrong
implementation.

**Scope rule.** Note explicitly what is *not* in scope. This is what you will
be tempted to fix later (see H6).

---

## 2. LOCATE — find the truth, don't reconstruct it

- Search for the real code before reading `.ai/` about it — `.ai/` tells you
  *where to look* and *what to expect*; the code tells you what *is*.
- Read whole functions, not fragments. A fragment that looks correct in
  isolation is the standard source of a plausible wrong answer.
- Find at least one existing, similar thing already done in this codebase.
  Almost every task has a precedent here; the precedent is your template.
- Check `failures/LESSONS_LEARNED.md` and `knowledge/COMMON_MISTAKES.md` for
  this area **before** designing, not after breaking something.

**Stop condition for research.** Stop when you can name every file you are
going to change and say why. Not before — and not much after; unbounded
exploration is its own failure mode.

---

## 3. PLAN — state it before you build it

Before the first edit, state:

1. Your understanding of the requirement.
2. The existing pattern/precedent you found, and whether you are following it.
3. The files you will change, and what changes in each.
4. How you will verify it.
5. Anything you are still unsure about.

For a trivial change this is two lines. For anything touching more than ~3
files, or auth, or data shape, or a public interface: say the plan and let the
human react before you implement. Rework is more expensive than a plan.

**Prefer the smallest correct change.** The best change is the one that solves
the problem and leaves nothing else different.

---

## 4. CHANGE — implement

- Follow the local convention (H7). When in doubt, open the nearest sibling
  file and copy its shape.
- Do not add a new dependency without checking `knowledge/DEPENDENCY_RULES.md`
  and saying why an existing one does not suffice.
- Do not leave commented-out code, debug logging, or `TODO` markers you have
  no intention of resolving.
- **Comments**: only where the code cannot state the constraint itself. Never
  comment what the next line does, never annotate your own change for the
  reviewer ("changed this to fix X") — that belongs in the report, not the
  file.
- If, mid-implementation, you discover the plan was wrong: stop, say so,
  re-plan. Do not quietly build something different from what you announced.

---

## 5. VERIFY — the phase that is most often skipped

**A change is not done because it looks right. It is done when a check
confirms it.**

In order of strength:

1. Run the project's real verification commands
   (`knowledge/DEVELOPMENT_WORKFLOW.md`): type-check, lint, build, test.
2. Run the specific test that covers the change — and if none exists, say so
   explicitly, and consider whether one should.
3. Exercise the real behaviour (call the endpoint, run the command, load the
   page) where practical.
4. Re-read your own diff, line by line, as if reviewing someone else's work.

Then check specifically:

- **Completeness**: did you update every call site? Name the search you ran to
  establish that. A rename or signature change that is 90% done is worse than
  not started.
- **Edge cases**: empty, null/undefined, zero, very large, concurrent,
  already-exists, permission-denied.
- **Blast radius**: what else reads this data / calls this function / depends
  on this shape?
- **Reversibility**: if this is wrong in production, how is it undone?

If you cannot verify — no test runner, no environment, no permission — say
precisely that, and state what a human needs to run.

---

## 6. REPORT — honestly and specifically

Structure:

- **What changed** — files and behaviour, briefly.
- **What was verified** — the exact commands/checks you ran and their result.
- **What was NOT verified** — always present this section, even if it is
  "nothing"; it is the most useful line in the report.
- **What you noticed but did not touch** — the out-of-scope things from §1.
- **Open questions / assumptions made.**

Never overstate. "I updated the three call sites `grep -r` found" is a better
sentence than "I updated all call sites" when you only ran one search.

---

## 7. REMEMBER — usually, do nothing

Run the four-step check in `MEMORY_UPDATE_RULES.md`. For most tasks the correct
outcome is **no memory update**, and that is a success, not a shortfall.

Update when: a new pattern was established, a hard problem was solved, a
significant decision changed, a reusable thing was built, or a real mistake was
made that could recur.

If you learned something about *how to work well*, that is different — see
`SELF_IMPROVEMENT.md`.

---

## Failure modes to watch for in yourself

| Symptom | What is actually happening | Correction |
|---|---|---|
| You are describing a file you have not opened | Reconstructing from the name | Open it |
| Your answer would be equally true of any project | Generic theory, not knowledge | Find the real thing in this repo |
| You are about to say "should work" | Skipping VERIFY | Run the check |
| The diff touches files you did not plan to touch | Scope creep | Revert the extras, report them instead |
| You are adding a new abstraction on the first occurrence | Premature pattern | Two occurrences make a pattern, one does not |
| You are rewriting working code you find inelegant | Preference, not requirement | Leave it, mention it |
| You are stuck repeating a fix that does not work | Wrong root cause | Stop, re-diagnose from evidence |
| You are confident and have not run anything | The most dangerous state | Run something |

## When you are stuck

After two failed attempts at the same problem, stop iterating and change
approach:

1. State what you expected, what actually happened, and the gap.
2. Question an assumption you have not tested — often the bug is not where you
   are looking.
3. Reduce to the smallest reproduction.
4. Report the state and ask, rather than making a third blind attempt.

Three silent failed attempts costs more of the human's trust than one honest
"I am stuck, here is what I know."
