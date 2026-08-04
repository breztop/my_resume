<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getRelatedProjects, projects } from "../data/projects.js";

const route = useRoute();
const project = computed(() => projects.find((item) => item.id === route.params.id));
const currentIndex = computed(() => projects.findIndex((item) => item.id === route.params.id));
const previousProject = computed(() => currentIndex.value > 0 ? projects[currentIndex.value - 1] : null);
const nextProject = computed(() => currentIndex.value >= 0 && currentIndex.value < projects.length - 1 ? projects[currentIndex.value + 1] : null);
const relatedProjects = computed(() => getRelatedProjects(project.value));
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

      <aside v-if="relatedProjects.length" class="detail-related" aria-labelledby="related-projects-title">
        <div>
          <span>RELATED / SAME SYSTEM</span>
          <h2 id="related-projects-title">同一系统的其他实现</h2>
          <p>{{ project.systemLabel }}</p>
        </div>
        <RouterLink v-for="related in relatedProjects" :key="related.id" :to="`/projects/${related.id}`">
          <span>{{ related.partLabel }}</span>
          <strong>{{ related.title }}</strong>
          <i>↗</i>
        </RouterLink>
      </aside>

      <div class="detail-case-grid">
        <section><span>01 / 挑战</span><h2>问题是什么？</h2><p>{{ project.challenge }}</p></section>
        <section><span>02 / 方案</span><h2>如何解决？</h2><p>{{ project.solution }}</p></section>
      </div>

      <section class="detail-deliverables">
        <span>03 / 核心实现</span>
        <ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul>
      </section>

      <section v-if="project.modules?.length" class="detail-section detail-modules">
        <div class="detail-section-head">
          <span>04 / 信息架构</span>
          <h2>一眼定位设备，一步进入测试</h2>
          <p>从概览到单项能力，页面结构与真实排障路径保持一致。</p>
        </div>
        <div class="module-grid">
          <article v-for="module in project.modules" :key="module.name">
            <strong>{{ module.name }}</strong>
            <p>{{ module.detail }}</p>
          </article>
        </div>
      </section>

      <section v-if="project.roadmap?.length" class="detail-section detail-roadmap">
        <div class="detail-section-head">
          <span>05 / ROADMAP</span>
          <h2>从设备体检，到能力验收</h2>
        </div>
        <div class="roadmap-grid">
          <article v-for="phase in project.roadmap" :key="phase.label">
            <span>{{ phase.label }}</span>
            <h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="detail-section detail-principles">
        <div class="detail-section-head">
          <span>06 / TEST CONTRACT</span>
          <h2>检测工具本身，也必须值得信任</h2>
        </div>
        <ol>
          <li v-for="(principle, index) in project.principles" :key="principle">
            <span>{{ (index + 1).toString().padStart(2, "0") }}</span>
            <p>{{ principle }}</p>
          </li>
        </ol>
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
