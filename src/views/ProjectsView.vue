<script setup>
import { computed } from "vue";
import { getRelatedProjects, projectCategories, projects } from "../data/projects.js";

const projectGroups = computed(() =>
  projectCategories
    .map((category) => ({
      ...category,
      projects: projects.filter((project) => project.category === category.id),
    }))
    .filter((category) => category.projects.length),
);
</script>

<template>
  <section class="archive shell">
    <header class="archive-head">
      <div>
        <p class="eyebrow">PROJECT ARCHIVE · {{ projects.length.toString().padStart(2, "0") }} ITEMS</p>
        <h1>全部项目</h1>
      </div>
      <p>按方向快速浏览项目。选择名称进入完整案例；同一系统的相关实现会在列表中直接标出。</p>
    </header>

    <section v-for="group in projectGroups" :key="group.id" class="archive-group">
      <header class="archive-group-head">
        <div>
          <p>{{ group.index }} / {{ group.label }}</p>
          <h2>{{ group.title }}</h2>
        </div>
        <p>{{ group.projects.length.toString().padStart(2, "0") }} ITEMS</p>
      </header>

      <div class="project-list">
        <article
          v-for="project in group.projects"
          :key="project.id"
          class="project-row"
          :class="`project-row-${project.color}`"
        >
          <RouterLink class="project-row-main" :to="`/projects/${project.id}`">
            <figure class="project-row-media">
              <img :src="project.cover" :alt="project.coverAlt" width="1536" height="1024" loading="lazy" decoding="async" />
            </figure>
            <div class="project-row-copy">
              <p>{{ project.number }} · {{ project.kicker }} · {{ project.year }}</p>
              <h3>{{ project.title }}</h3>
              <h4>{{ project.subtitle }}</h4>
              <div class="project-row-tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
            </div>
            <span class="project-row-arrow" aria-hidden="true">→</span>
          </RouterLink>

          <div v-if="getRelatedProjects(project).length" class="related-strip">
            <span>{{ project.systemLabel }}</span>
            <RouterLink
              v-for="related in getRelatedProjects(project)"
              :key="related.id"
              :to="`/projects/${related.id}`"
            >
              关联：{{ related.title }} <i>↗</i>
            </RouterLink>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>
