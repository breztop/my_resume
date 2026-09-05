<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const isAbout = computed(() => route.path === '/' && route.hash === '#about');
const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
</script>
<template>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <header class="site-header shell"><RouterLink class="site-brand" to="/" aria-label="创作空间首页"><span class="brand-symbol" aria-hidden="true">✳</span> DEV<span class="brand-slash">/</span>WORKS<span class="brand-note">想法的落脚点</span></RouterLink><nav aria-label="主导航"><RouterLink to="/" :aria-current-value="isAbout ? 'false' : 'page'" :class="{ active: route.path === '/' && !isAbout }">首页</RouterLink><RouterLink to="/projects" :class="{ active: route.path.startsWith('/projects') }">作品集 <span aria-hidden="true">↗</span></RouterLink><RouterLink :to="{ path: '/', hash: '#about' }" :aria-current-value="isAbout ? 'location' : 'false'" :class="{ active: isAbout }">关于我</RouterLink></nav></header>
  <main id="main-content" tabindex="-1"><RouterView /></main>
  <footer class="site-footer shell"><span>© 2026 DEV / WORKS</span><span class="footer-note">保持好奇，继续创造。</span><button type="button" @click="toTop">回到顶部 ↑</button></footer>
</template>
<style scoped>
.site-header{height:86px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);gap:20px}.site-brand{display:flex;align-items:center;font-weight:800;font-size:17px;letter-spacing:-.04em;white-space:nowrap}.brand-symbol{font-size:32px;color:var(--blue);margin-right:10px}.brand-slash{color:var(--blue);margin-inline:3px}.brand-note{font-size:10px;font-weight:400;color:var(--muted);margin-left:18px;letter-spacing:.04em}.site-header nav{display:flex;gap:28px;align-items:center}.site-header nav a{font-size:12px;padding-block:13px;position:relative}.site-header nav a.active{color:var(--blue)}.site-header nav a.active:after{content:'';position:absolute;bottom:5px;left:0;right:0;height:2px;background:var(--blue)}.site-footer{display:flex;justify-content:space-between;align-items:center;gap:20px;min-height:90px;border-top:1px solid var(--line);font:10px/1.5 monospace;color:var(--muted)}.site-footer button{background:none;font-size:12px;min-height:44px;cursor:pointer}.skip-link{position:fixed;z-index:100;top:10px;left:10px;padding:12px;background:var(--ink);color:var(--paper);transform:translateY(-150%)}.skip-link:focus{transform:translateY(0)}#main-content:focus{outline:none}
@media(max-width:600px){.site-header{height:68px;gap:12px}.site-brand{font-size:14px}.brand-symbol{font-size:25px;margin-right:6px}.brand-note{display:none}.site-header nav{gap:15px}.site-header nav a{font-size:11px}.site-footer{min-height:76px;gap:10px}.footer-note{display:none}}
</style>
