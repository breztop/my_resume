# Project guide

This is a Vue 3 + Vite portfolio. Project content is data-driven, while every
project detail has its own registered Vue page so its structure and visual
language can differ completely from the others.

## High-value files

- `src/data/projects.js`: all project content, categories, related-project links.
- `src/views/HomeView.vue`: featured project presentation.
- `src/views/ProjectsView.vue`: archive grouped by `category`.
- `src/views/ProjectDetailView.vue`: route dispatcher for project pages.
- `src/project-pages/projectPageRegistry.js`: project id to Vue page mapping.
- `src/project-pages/*.vue`: bespoke project-detail pages with scoped styles.
- `src/components/ProjectCard.vue`: home-card rendering.
- `src/style.css`: shared visual treatment.
- `public/images/projects/`: project cover assets.

## Adding or changing a project

1. Update one object in `src/data/projects.js`.
2. Use a unique `id`, `number`, cover path, and a valid category: `client`,
   `server`, or `tooling`.
3. Add `relatedProjectIds` in both directions when the relationship is mutual.
4. Create or update its bespoke component in `src/project-pages/`, then register
   it in `projectPageRegistry.js`; do not fall back to a shared detail template.
5. Use `modules`, `roadmap`, and `principles` only when that project's page can
   present them meaningfully.
6. Put new cover assets in `public/images/projects/`; do not reference temp or
   user-home paths.

## Efficient workflow

- Start with `rg -n` against the high-value files above; avoid broad repository
  scans or reading generated `dist/` and `node_modules/` content.
- Preserve unrelated worktree changes. Inspect `git status --short` before
  reporting a change.
- Verify UI/data edits with `npm run build`. Vite may need an approved elevated
  invocation on Windows because config loading spawns a child process.
- This repository is a website. Do not run Godot unless the user explicitly
  asks, even when editing Godot project descriptions.
