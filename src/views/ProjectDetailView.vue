<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects.js";

const route = useRoute();
const project = computed(() => projects.find((item) => item.id === route.params.id));
const currentIndex = computed(() => projects.findIndex((item) => item.id === route.params.id));
const previousProject = computed(() => currentIndex.value > 0 ? projects[currentIndex.value - 1] : null);
const nextProject = computed(() => currentIndex.value >= 0 && currentIndex.value < projects.length - 1 ? projects[currentIndex.value + 1] : null);
</script>

<template>
  <article v-if="project" class="detail-page">
    <header class="detail-head shell">
      <div class="detail-breadcrumb"><RouterLink to="/projects">全部项目</RouterLink><span>/</span><span>{{ project.number }}</span></div>
      <p class="eyebrow">{{ project.kicker }} · {{ project.year }}</p>
      <h1>{{ project.title }}</h1>
      <p class="detail-lead">{{ project.summary }}</p>
    </header>

    <figure class="detail-media shell">
      <img :src="project.cover" :alt="project.coverAlt" width="1536" height="1024" />
      <figcaption>CONCEPT VISUAL · {{ project.visualLabel }}</figcaption>
    </figure>

    <div class="detail-content shell">
      <div class="detail-meta">
        <div><span>职责</span><p>{{ project.role }}</p></div>
        <div><span>技术栈</span><p>{{ project.stack.join(" · ") }}</p></div>
      </div>

      <div class="detail-case-grid">
        <section><span>01 / 挑战</span><h2>问题是什么？</h2><p>{{ project.challenge }}</p></section>
        <section><span>02 / 方案</span><h2>如何解决？</h2><p>{{ project.solution }}</p></section>
      </div>

      <section class="detail-deliverables">
        <span>03 / 核心实现</span>
        <ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul>
      </section>

      <nav class="project-pagination" aria-label="项目翻页">
        <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><span>← 上一个</span><strong>{{ previousProject.title }}</strong></RouterLink>
        <span v-else />
        <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><span>下一个 →</span><strong>{{ nextProject.title }}</strong></RouterLink>
      </nav>
    </div>
  </article>

  <section v-else class="not-found shell">
    <p class="eyebrow">PROJECT NOT FOUND</p>
    <h1>没有找到这个项目。</h1>
    <RouterLink to="/projects">返回全部项目 →</RouterLink>
  </section>
</template>
