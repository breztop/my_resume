<script setup>
import { computed, ref, watch } from 'vue';
import { projectCategories, projects } from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.vue';
const categoryStorageKey = 'portfolio:selected-project-category';
const validCategories = new Set(['all', ...projectCategories.map(category => category.id)]);
const readCategory = () => { try { const value = sessionStorage.getItem(categoryStorageKey); return validCategories.has(value) ? value : 'all'; } catch { return 'all'; } };
const selectedCategory = ref(readCategory());
const query = ref('');
watch(selectedCategory, value => { try { sessionStorage.setItem(categoryStorageKey, value); } catch { /* Storage is optional. */ } });
const searchedProjects = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase();
  return projects.filter(project => [project.title, project.displayTitle, project.subtitle, project.summary, ...project.stack].join(' ').toLocaleLowerCase().includes(needle));
});
const filters = computed(() => [
  { id: 'all', filterLabel: '全部作品', count: searchedProjects.value.length },
  ...projectCategories.map(category => ({ ...category, count: searchedProjects.value.filter(project => project.category === category.id).length })),
]);
const groups = computed(() => projectCategories.map(category => ({ ...category, projects: searchedProjects.value.filter(project => project.category === category.id && (selectedCategory.value === 'all' || selectedCategory.value === category.id)) })).filter(category => category.projects.length));
const count = computed(() => groups.value.reduce((total, group) => total + group.projects.length, 0));
const clearFilters = () => { query.value = ''; selectedCategory.value = 'all'; };
</script>
<template>
  <div class="archive shell" id="top">
    <header class="archive-heading"><div><p class="eyebrow">THE WHOLE COLLECTION / {{ projects.length }} WORKS</p><h1>打开我的<span>作品抽屉。</span></h1><p>好玩的实验，认真的实现。挑一个感兴趣的，进去看看。</p></div><span class="archive-stamp" aria-hidden="true">IDEAS<br />↓<br />THINGS</span></header>
    <section class="filter-panel" aria-label="筛选作品">
      <div class="search-row"><label for="project-search">找一个作品</label><div class="search-box"><span aria-hidden="true">⌕</span><input id="project-search" v-model="query" type="search" placeholder="搜索名称、简介或技术栈" autocomplete="off" /><button v-if="query" type="button" @click="query = ''" aria-label="清空搜索">×</button></div></div>
      <div class="filter-row"><div class="category-filters" role="group" aria-label="按方向筛选"><button v-for="category in filters" :key="category.id" type="button" :aria-pressed="selectedCategory === category.id" @click="selectedCategory = category.id">{{ category.filterLabel }}<span>{{ category.count }}</span></button></div><p role="status">找到 {{ count }} 个作品</p></div>
    </section>
    <section v-for="group in groups" :key="group.id" class="archive-group"><header><h2>{{ group.filterLabel }}<span>{{ group.projects.length.toString().padStart(2, '0') }}</span></h2><p>{{ group.description }}</p></header><div class="archive-grid"><ProjectCard v-for="project in group.projects" :key="project.id" :project="project" /></div></section>
    <div v-if="!count" class="empty-state"><span aria-hidden="true">⌕</span><h2>这个抽屉里暂时没找到。</h2><p>试试其他关键词，或清空筛选重新看看。</p><button class="button button-dark" type="button" @click="clearFilters">查看全部作品 ↗</button></div>
  </div>
</template>
<style scoped>
.archive{padding-block:60px 90px;min-height:75vh}.archive-heading{display:flex;justify-content:space-between;align-items:center;gap:30px;margin-bottom:45px}h1{font-size:clamp(34px,4.5vw,62px);letter-spacing:-.05em;line-height:1.3;margin:20px 0}h1 span{color:var(--blue)}.archive-heading p:not(.eyebrow){font-size:15px;color:var(--muted);line-height:1.8}.archive-stamp{font:700 17px/1.25 monospace;background:var(--lime);width:108px;height:108px;border:1px solid var(--ink);border-radius:50%;display:grid;place-content:center;text-align:center;transform:rotate(12deg);flex-shrink:0}.filter-panel{padding:22px 24px;border:1px solid var(--line);border-radius:10px;background:#efeee6}.search-row{display:flex;align-items:center;gap:24px}.search-row label{font-size:13px;font-weight:700;flex-shrink:0}.search-box{display:flex;align-items:center;width:min(100%,500px);background:var(--paper);border:1px solid var(--line);border-radius:6px;padding-inline:12px;gap:10px}.search-box>span{font-size:23px}.search-box input{width:100%;min-width:0;border:0;background:none;font:inherit;font-size:14px;color:var(--ink);padding:12px 0;min-height:44px}.search-box button{background:none;cursor:pointer;font-size:22px;min-width:32px;min-height:44px}.search-box:focus-within{outline:2px solid var(--blue);outline-offset:2px}.search-box input:focus{outline:none}.filter-row{display:flex;justify-content:space-between;align-items:center;gap:18px;margin-top:18px}.category-filters{display:flex;flex-wrap:wrap;gap:8px}.category-filters button{background:var(--paper);border:1px solid var(--line);border-radius:5px;min-height:44px;padding:10px 13px;font-size:12px;cursor:pointer}.category-filters button span{font:10px monospace;margin-left:12px;opacity:.7}.category-filters button[aria-pressed=true]{background:var(--ink);color:var(--paper);border-color:var(--ink)}.filter-row>p{font-size:12px;color:var(--muted);white-space:nowrap}.archive-group{margin-top:48px}.archive-group>header{display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--line);gap:24px;padding-bottom:16px;margin-bottom:25px}.archive-group h2{font-size:23px;margin:0;flex-shrink:0}.archive-group h2 span{font:11px monospace;vertical-align:super;color:var(--blue);margin-left:12px}.archive-group header p{font-size:12px;color:var(--muted);line-height:1.8;margin:0}.archive-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:38px 25px}.empty-state{text-align:center;padding:70px 0}.empty-state>span{font-size:50px;color:var(--blue)}.empty-state h2{font-size:24px}.empty-state p{font-size:14px;color:var(--muted)}.empty-state .button{margin-top:18px}
@media(max-width:1000px){.archive-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.filter-row{flex-wrap:wrap;gap:4px}.archive-group>header{display:block}.archive-group header p{margin-top:10px}}
@media(max-width:600px){.archive{padding-block:30px 55px}.archive-heading{margin-bottom:28px}.archive-stamp{display:none}h1{font-size:34px;max-width:350px}.archive-heading p:not(.eyebrow){font-size:14px}.filter-panel{padding:16px}.search-row{display:block}.search-row label{display:block;margin-bottom:10px}.category-filters{display:grid;grid-template-columns:1fr 1fr;width:100%}.category-filters button{padding:10px;text-align:left;display:flex;justify-content:space-between}.filter-row{display:block}.filter-row>p{margin:15px 0 0}.archive-grid{grid-template-columns:1fr;gap:30px}.archive-group{margin-top:32px}}
</style>
