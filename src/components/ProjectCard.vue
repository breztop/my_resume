<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
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
          <span>{{ project.visualLabel }}</span>
        </figcaption>
      </figure>
    </RouterLink>

    <div class="project-info">
      <div class="project-index"><span>{{ project.number }}</span><i /></div>
      <p class="project-kicker">{{ project.kicker }}</p>
      <h3>{{ project.title }}</h3>
      <h4>{{ project.subtitle }}</h4>
      <p class="project-summary">{{ project.summary }}</p>
      <div class="tags"><span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span></div>
      <RouterLink class="text-button" :to="`/projects/${project.id}`">
        查看项目详情
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </RouterLink>
    </div>
  </article>
</template>
