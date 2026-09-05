<script setup>
defineProps({ project: { type: Object, required: true }, priority: Boolean, sizes: { type: String, default: '(max-width: 700px) 100vw, 80vw' } });
</script>
<template>
  <img class="project-image" :src="project.image?.large || project.cover" :srcset="project.image ? project.image.small + ' 640w, ' + project.image.large + ' ' + project.image.width + 'w' : undefined" :sizes="project.image ? sizes : undefined" :alt="project.coverAlt" :width="project.image?.width || 1536" :height="project.image?.height || 1024" :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : undefined" decoding="async" />
</template>


<style scoped>
.project-image{height:auto}
</style>
