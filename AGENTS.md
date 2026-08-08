# Project guide

This is a Vue 3 + Vite portfolio. It is data-driven; do not add a new page
component for an ordinary portfolio project.

## High-value files

- `src/data/projects.js`: all project content, categories, related-project links.
- `src/views/HomeView.vue`: featured project presentation.
- `src/views/ProjectsView.vue`: archive grouped by `category`.
- `src/views/ProjectDetailView.vue`: reusable project-detail template.
- `src/components/ProjectCard.vue`: home-card rendering.
- `src/style.css`: shared visual treatment.
- `public/images/projects/`: project cover assets.

## Adding or changing a project

1. Update one object in `src/data/projects.js`.
2. Use a unique `id`, `number`, cover path, and a valid category: `client`,
   `server`, or `tooling`.
3. Add `relatedProjectIds` in both directions when the relationship is mutual.
4. Use `modules`, `roadmap`, and `principles` only when a detailed case study
   benefits from them; the shared detail page renders them automatically.
5. Put new cover assets in `public/images/projects/`; do not reference temp or
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
