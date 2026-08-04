<script setup>
import { computed } from "vue";
import { getRelatedProjects } from "../data/projects.js";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const relatedProjects = computed(() => getRelatedProjects(props.project));
</script>

<template>
  <article class="project" :class="`project-${project.color}`">
    <RouterLink class="project-visual" :to="`/projects/${project.id}`" :aria-label="`查看${project.title}详情`">
      <figure class="project-media">
        <img
          :src="project.cover"
          :alt="project.coverAlt"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
        <span class="media-shade" aria-hidden="true" />
        <figcaption class="media-label">
          <span>{{ project.number }} / {{ project.year }}</span>
          <span>CONCEPT VISUAL · {{ project.visualLabel }}</span>
        </figcaption>
      </figure>
    </RouterLink>

    <div class="project-info">
      <div class="project-index"><span>{{ project.number }}</span><i /></div>
      <p class="project-kicker">{{ project.kicker }}</p>
      <h3>{{ project.title }}</h3>
      <h4>{{ project.subtitle }}</h4>
      <p class="project-summary">{{ project.summary }}</p>
      <div class="tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
      <div v-if="relatedProjects.length" class="featured-related">
        <span>{{ project.systemLabel }}</span>
        <RouterLink v-for="related in relatedProjects" :key="related.id" :to="`/projects/${related.id}`">
          查看{{ related.partLabel }} <i>↗</i>
        </RouterLink>
      </div>
      <RouterLink class="text-button" :to="`/projects/${project.id}`">
        查看项目详情
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </RouterLink>
    </div>
  </article>
</template>
