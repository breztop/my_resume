import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';
import { projects } from '../src/data/projects.js';

// configure-pages supplies base_path in CI; local builds use this repository's URL.
const basePath = process.env.PAGES_BASE_PATH ?? '/my_resume';
const base = `/${basePath.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\//, '/');
const outDir = 'dist/pages';

await build({ base, build: { outDir, emptyOutDir: true } });

// Pages has no server-side SPA rewrite. Each known route needs a real entry file.
const html = await readFile(resolve(outDir, 'index.html'), 'utf8');
const routes = ['projects', ...projects.map(project => `projects/${project.id}`)];
for (const route of routes) {
  const directory = resolve(outDir, route);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
// Let Vue render its existing missing-project UI for unknown direct links.
await writeFile(resolve(outDir, '404.html'), html);
await writeFile(resolve(outDir, '.nojekyll'), '');

console.log(`GitHub Pages prepared at ${base}: homepage + ${routes.length} route entries.`);
