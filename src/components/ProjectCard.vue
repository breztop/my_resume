<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});

defineEmits(["select"]);
</script>

<template>
  <article class="project" :class="`project-${project.color}`">
    <button class="project-visual" :aria-label="`查看${project.title}详情`" @click="$emit('select', project)">
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
    </button>

    <div class="project-info">
      <div class="project-index"><span>{{ project.number }}</span><i /></div>
      <p class="project-kicker">{{ project.kicker }}</p>
      <h3>{{ project.title }}</h3>
      <h4>{{ project.subtitle }}</h4>
      <p class="project-summary">{{ project.summary }}</p>
      <div class="tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
      <button class="text-button" @click="$emit('select', project)">
        查看项目详情
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  </article>
</template>
