<script setup>
import { projects } from "../data/projects.js";
</script>

<template>
  <section class="archive shell">
    <header class="archive-head">
      <div>
        <p class="eyebrow">PROJECT ARCHIVE · {{ projects.length.toString().padStart(2, "0") }} ITEMS</p>
        <h1>全部项目</h1>
      </div>
      <p>这里收录完整项目、实验和技术原型。选择任意项目进入独立案例页面。</p>
    </header>

    <div class="project-grid">
      <RouterLink
        v-for="project in projects"
        :key="project.id"
        class="grid-card"
        :class="`grid-card-${project.color}`"
        :to="`/projects/${project.id}`"
      >
        <figure class="grid-card-media">
          <img :src="project.cover" :alt="project.coverAlt" width="1536" height="1024" loading="lazy" decoding="async" />
          <span>{{ project.number }} / {{ project.year }}</span>
        </figure>
        <div class="grid-card-copy">
          <p>{{ project.kicker }}</p>
          <h2>{{ project.title }}</h2>
          <h3>{{ project.subtitle }}</h3>
          <div class="tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
