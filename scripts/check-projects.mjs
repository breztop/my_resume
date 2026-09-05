import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { projects, featuredProjectIds, projectCategories } from '../src/data/projects.js';

const registry = readFileSync(new URL('../src/project-pages/projectPageRegistry.js', import.meta.url), 'utf8');
const ids = new Set(projects.map(project => project.id));
const categories = new Set(projectCategories.map(category => category.id));
assert.equal(ids.size, projects.length, 'Project IDs must be unique');
assert.equal(new Set(projects.map(project => project.number)).size, projects.length, 'Project numbers must be unique');
assert.equal(new Set(featuredProjectIds).size, 6, 'Exactly six distinct featured projects');
for (const id of featuredProjectIds) assert(ids.has(id), `Missing featured project: ${id}`);
for (const project of projects) {
  assert(categories.has(project.category), `Unknown category: ${project.id}`);
  assert(registry.includes(`"${project.id}":`) || registry.includes(`  ${project.id}:`), `Missing page: ${project.id}`);
  for (const path of [project.cover, project.image?.small, project.image?.large].filter(Boolean)) {
    assert(path.startsWith('/images/projects/'), `Non-project asset: ${path}`);
    assert(existsSync(new URL(`../public${path}`, import.meta.url)), `Missing asset: ${path}`);
  }
  for (const id of project.relatedProjectIds || []) assert(ids.has(id), `Missing related project: ${id}`);
}
console.log(`Validated ${projects.length} projects, 6 featured entries, registered pages, relations, and responsive assets.`);
