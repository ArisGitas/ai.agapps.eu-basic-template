---
type: prompt
---

# Prompt: Session Start

> Paste this at the beginning of a session when your tool did **not** pick up
> the rules automatically (no `AGENTS.md` / `CLAUDE.md` support, a web chat, a
> fresh context). If your tool did load them, you do not need this.

## Prompt

```
This repository uses an AI Operating System under .ai/.

Before doing anything else:
1. Read .ai/AI_OPERATING_SYSTEM.md in full - it is short and it governs how
   you work here.
2. Read .ai/STATUS.md - it tells you what is already known and verified about
   this project, and what has never been analyzed.
3. Then load only the .ai/ files my task actually needs (routing table in
   AI_OPERATING_SYSTEM.md section 4). Do not read all of .ai/.

Then tell me, in a few lines:
- whether this project's knowledge base is initialized
- what you now know about the stack and the verification commands
- anything in STATUS.md's "known gaps" that is relevant to what I am about
  to ask you

Then wait for my task.
```

## Why start this way

The first thing an agent does in a session determines the quality of
everything after it. Two minutes of orientation against real recorded
knowledge is cheaper than an hour of work built on a wrong assumption about
how this project is structured.
