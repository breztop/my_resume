<script setup>
import { computed } from 'vue';
import { getRelatedProjects } from '../data/projects.js';
const props = defineProps({ project: { type: Object, required: true }, previousProject: Object, nextProject: Object });
const related = computed(() => getRelatedProjects(props.project));
</script>
<template>
  <div class="project-navigation shell">
    <section v-if="related.length" class="related"><h2>沿着这个想法，继续看看</h2><div><RouterLink v-for="item in related" :key="item.id" :to="'/projects/' + item.id">{{ item.displayTitle || item.title }} <span aria-hidden="true">↗</span></RouterLink></div></section>
    <nav class="project-pagination" aria-label="项目翻页"><RouterLink v-if="previousProject" :to="'/projects/' + previousProject.id" class="previous"><small>← 上一个项目</small><strong>{{ previousProject.displayTitle || previousProject.title }}</strong></RouterLink><span v-else /><RouterLink class="all-projects" to="/projects">全部作品 <span aria-hidden="true">▦</span></RouterLink><RouterLink v-if="nextProject" :to="'/projects/' + nextProject.id" class="next"><small>下一个项目 →</small><strong>{{ nextProject.displayTitle || nextProject.title }}</strong></RouterLink><span v-else /></nav>
  </div>
</template>
<style scoped>
.project-navigation{padding-block:38px 48px;color:var(--ink)}.related{padding-bottom:30px}.related h2{font-size:19px;margin:0 0 16px}.related>div{display:flex;flex-wrap:wrap;gap:10px}.related a{font-size:13px;border:1px solid var(--line);border-radius:5px;min-height:44px;padding:12px 16px;display:flex;gap:22px}.project-pagination{display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:center;border-top:1px solid var(--line);padding-top:28px}.project-pagination a{display:flex;flex-direction:column;gap:9px;padding-block:10px;min-height:44px}.project-pagination small{font-size:11px;color:var(--muted)}.project-pagination strong{font-size:17px;font-weight:600;overflow-wrap:anywhere}.project-pagination .next{text-align:right}.project-pagination .all-projects{display:flex;flex-direction:row;gap:16px;font-size:12px;padding:14px;border:1px solid var(--line);border-radius:5px}.project-pagination a:hover,.related a:hover{color:var(--blue)}
@media(max-width:600px){.project-pagination{grid-template-columns:1fr 1fr;gap:15px}.project-pagination .all-projects{grid-row:2;grid-column:1/-1;justify-content:center}.project-pagination strong{font-size:14px}.project-navigation{padding-block:28px}.related h2{font-size:17px}}
</style>
