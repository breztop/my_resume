<script setup>
import ProjectImage from './ProjectImage.vue';
import { projectCategories } from '../data/projects.js';
defineProps({ project: { type: Object, required: true } });
const categoryLabel = id => projectCategories.find(category => category.id === id)?.filterLabel;
</script>
<template>
  <article class="project-card" :class="'category-' + project.category">
    <RouterLink :to="'/projects/' + project.id" :aria-label="'查看' + (project.displayTitle || project.title) + '详情'">
      <figure :class="{ contain: project.mediaFit === 'contain' }"><ProjectImage :project="project" sizes="(max-width: 600px) 92vw, (max-width: 1000px) 45vw, 380px" /><figcaption>{{ categoryLabel(project.category) }}</figcaption><span class="card-arrow" aria-hidden="true">↗</span></figure>
      <div class="card-meta"><span>{{ project.kicker }}</span><span>{{ project.year }}</span></div>
      <h3>{{ project.displayTitle || project.title }}</h3><p>{{ project.subtitle }}</p>
      <div class="card-tags"><span v-for="tag in project.stack.slice(0, 3)" :key="tag">{{ tag }}</span></div>
    </RouterLink>
  </article>
</template>
<style scoped>
.project-card{min-width:0;--card-accent:#d9e4ff}.category-server{--card-accent:#f8d7bf}.category-tooling{--card-accent:#dfedb2}.project-card>a{display:block;border-radius:9px}.project-card figure{position:relative;margin:0 0 18px;border-radius:10px;overflow:hidden;aspect-ratio:4/3;background:#e9e7df;border:1px solid var(--line);transition:transform .22s,box-shadow .22s}.project-card :deep(img){width:100%;height:100%;object-fit:cover;transition:transform .3s}.project-card .contain :deep(img){object-fit:contain;padding:16px;background:#e7e9e0}.project-card a:hover figure{transform:translateY(-4px);box-shadow:0 10px 20px #29251912}.project-card a:hover :deep(img){transform:scale(1.025)}figcaption{position:absolute;left:12px;top:12px;background:var(--card-accent);color:#252820;padding:6px 10px;border:1px solid #2528202b;border-radius:4px;font-size:10px;font-weight:600}.card-arrow{position:absolute;bottom:12px;right:12px;display:grid;place-items:center;width:31px;height:31px;background:var(--paper);border-radius:50%;font-size:18px;transition:transform .2s}.project-card a:hover .card-arrow{transform:rotate(8deg)}.card-meta{display:flex;justify-content:space-between;gap:12px;color:var(--muted);font:9px/1.5 monospace;letter-spacing:.04em}.card-meta span:first-child{max-width:85%}h3{font-size:23px;line-height:1.3;letter-spacing:-.025em;margin:8px 0}p{font-size:13px;line-height:1.8;margin:0;color:var(--muted)}.card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px}.card-tags span{font-size:10px;padding:4px 7px;border:1px solid var(--line);border-radius:4px;color:var(--muted)}
@keyframes card-arrive{from{opacity:.65;transform:translateY(5px)}to{opacity:1;transform:none}}
.project-card{animation:card-arrive .25s ease-out}
</style>
