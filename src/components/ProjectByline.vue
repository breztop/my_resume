<script setup>
defineProps({ project: { type: Object, required: true } });
</script>
<template>
  <div class="project-byline"><p><span>我的职责</span>{{ project.role }}</p><ul aria-label="核心特点"><li v-for="item in project.tags.slice(0, 3)" :key="item">{{ item }}</li></ul></div>
</template>
<style scoped>
.project-byline{font-family:Inter,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:normal;font-weight:400;margin:18px 0 22px;max-width:650px;text-align:left;line-height:1.7}.project-byline p{font-size:12px;line-height:1.8;margin:0;color:inherit}.project-byline p span{display:block;font-size:10px;opacity:.7;margin-bottom:3px}.project-byline ul{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 0;padding:0;list-style:none}.project-byline li{font-size:10px;line-height:1.5;border:1px solid currentColor;border-radius:4px;padding:4px 7px}
</style>
