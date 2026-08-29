<script setup>
import { computed, ref } from "vue";
import { projectCategories, projects } from "../data/projects.js";

const categoryStorageKey = "portfolio:selected-project-category";
const validCategoryIds = new Set(["all", ...projectCategories.map((category) => category.id)]);

const getStoredCategory = () => {
  try {
    const storedCategory = sessionStorage.getItem(categoryStorageKey);
    return validCategoryIds.has(storedCategory) ? storedCategory : "all";
  } catch {
    return "all";
  }
};

const selectedCategory = ref(getStoredCategory());

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  try {
    sessionStorage.setItem(categoryStorageKey, categoryId);
  } catch {
    // Filtering still works when browser storage is unavailable.
  }
};

const categoryFilters = computed(() => [
  { id: "all", filterLabel: "全部", count: projects.length },
  ...projectCategories.map((category) => ({
    ...category,
    count: projects.filter((project) => project.category === category.id).length,
  })),
]);

const visibleProjectCount = computed(() =>
  categoryFilters.value.find((category) => category.id === selectedCategory.value)?.count
  ?? projects.length,
);

const projectGroups = computed(() =>
  projectCategories
    .map((category) => ({
      ...category,
      projects: projects.filter((project) =>
        project.category === category.id
        && (selectedCategory.value === "all" || selectedCategory.value === category.id),
      ),
    }))
    .filter((category) => category.projects.length),
);
</script>

<template>
  <section class="archive shell">
    <header class="archive-head">
      <div>
        <p class="eyebrow">PROJECT ARCHIVE · {{ projects.length.toString().padStart(2, "0") }} WORKS</p>
        <h1>项目集</h1>
      </div>
      <p>游戏、网络服务与桌面工具。这里不再用评分替作品说话，直接从画面和问题进入案例。</p>
    </header>

    <div class="archive-filter">
      <header class="archive-filter-head">
        <h2 id="project-filter-title">按方向筛选</h2>
        <p aria-live="polite">显示 <strong>{{ visibleProjectCount }}</strong> 个项目</p>
      </header>
      <nav class="archive-tabs" aria-labelledby="project-filter-title">
        <button
          v-for="category in categoryFilters"
          :key="category.id"
          type="button"
          :aria-pressed="selectedCategory === category.id"
          @click="selectCategory(category.id)"
        >
          <span>{{ category.filterLabel }}</span>
          <small>{{ category.count.toString().padStart(2, "0") }}</small>
        </button>
      </nav>
    </div>

    <section v-for="group in projectGroups" :key="group.id" class="archive-group">
      <header class="archive-group-head">
        <p>{{ group.index }} / {{ group.label }}</p>
        <h2>{{ group.title }}</h2>
        <span>{{ group.projects.length.toString().padStart(2, "0") }} PROJECTS</span>
      </header>

      <div class="archive-grid">
        <article
          v-for="project in group.projects"
          :key="project.id"
          class="archive-card"
          :class="`project-${project.color}`"
        >
          <RouterLink :to="`/projects/${project.id}`" :aria-label="`查看${project.title}详情`">
            <figure :class="{ 'archive-card-media-contain': project.mediaFit === 'contain' }">
              <img :src="project.cover" :alt="project.coverAlt" width="1536" height="1024" loading="lazy" decoding="async" />
              <figcaption><span>{{ project.number }}</span><span>{{ project.year }}</span></figcaption>
            </figure>
            <div class="archive-card-copy">
              <p>{{ project.kicker }}</p>
              <h3>{{ project.title }}</h3>
              <h4>{{ project.subtitle }}</h4>
              <div>
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
              </div>
              <i aria-hidden="true">↗</i>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </section>
</template>
