# Images

Drop client image files here. Next.js serves everything in `public/` from the site root, so a file saved as `public/images/team.jpg` is referenced in code as `/images/team.jpg` — no import needed for a plain `<img>`, or pass that same path as the `src` to `next/image`.

Suggested naming: lowercase, kebab-case, descriptive of function not vertical (e.g. `hero-photo.jpg`, `about-photo.jpg`, `logo.svg`, `service-1-icon.svg`) so filenames stay meaningful across different client swaps of this template.

## Current wiring

No component reads from this folder yet. `src/components/AboutSection.tsx` has a placeholder `<div>` (gray box with "Εικόνα εταιρείας" text) marked with a code comment to swap for a real `next/image` once a client photo is dropped here — that's the first candidate to wire up.

When you do wire an image in, add `data-role="photo"` (or a similarly generic, function-based name) to the `<img>`/`next/image` element so it stays consistent with the `data-section`/`data-role` convention documented in [AGENTS.md](../../AGENTS.md).
