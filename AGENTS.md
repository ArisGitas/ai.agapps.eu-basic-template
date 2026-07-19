# Agent notes — agapps.eu basic template

This template is customized per client by an AI agent (interactive or API-driven), not by a human reading every file first. Two things make that fast:

## 1. `data-section` / `data-role` attributes in the JSX

Every page-section component's root element carries `data-section="<name>"` (e.g. `hero`, `services`, `footer`). Elements a client is likely to ask about carry `data-role="<name>"` describing **what the element does**, not where it is (e.g. `title`, `subtitle`, `contact-button`, `nav-link`).

- Role names are **reused** across sections by design — several elements can share `data-role="nav-link"` or `data-role="contact-button"`. Always scope a lookup to the nearest `data-section` ancestor rather than assuming a role is unique on the page.
- Not every element has a role — only the ones enumerated in `agent.manifest.json` under each section's `untaggedContent`. If something isn't tagged, grep the file directly.
- These attributes are purely presentational metadata: don't remove them when editing content, and add matching ones (function-based, generic, no business-specific wording) if you introduce a new section or a new interactive element.

## 2. `agent.manifest.json`

Structured map of every section: its file path, its `data-role`s, any content array it's driven by (`services`, `navLinks`, `highlights`), and known quirks worth knowing before editing — notably:

- The brand color (`#0070f3`) is hardcoded as a Tailwind arbitrary value in six separate files. There's an unused `--color-brand` token in `globals.css`, but nothing references it. A full color change means a literal find/replace across all six files, not just editing `globals.css`.
- The brand name string is hardcoded in three separate places (Header, Footer, and `layout.tsx` metadata), not a shared constant.
- Section anchors (`#about`, `#services`, `#contact`) are targeted by nav `href`s in both Header and Footer — if you rename an id, update every link pointing to it.

**Keep the manifest in sync**: if you add, remove, or rename a `data-section`/`data-role` or a content array's shape, update `agent.manifest.json` in the same change. A stale manifest is worse than no manifest.
