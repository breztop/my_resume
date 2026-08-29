<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects.js";
import { projectPageComponents } from "../project-pages/projectPageRegistry.js";

const route = useRoute();
const currentIndex = computed(() => projects.findIndex((project) => project.id === route.params.id));
const project = computed(() => currentIndex.value >= 0 ? projects[currentIndex.value] : null);
const pageComponent = computed(() => project.value ? projectPageComponents[project.value.id] : null);
const previousProject = computed(() => currentIndex.value > 0 ? projects[currentIndex.value - 1] : null);
const nextProject = computed(() => currentIndex.value >= 0 && currentIndex.value < projects.length - 1
  ? projects[currentIndex.value + 1]
  : null);
</script>

<template>
  <component
    :is="pageComponent"
    v-if="project && pageComponent"
    :project="project"
    :previous-project="previousProject"
    :next-project="nextProject"
  />

  <section v-else class="not-found shell">
    <p class="eyebrow">PROJECT NOT FOUND</p>
    <h1>没有找到这个项目。</h1>
    <RouterLink to="/projects">返回全部项目 →</RouterLink>
  </section>
</template>
