<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAboutActive = computed(() => route.path === "/" && route.hash === "#about");
</script>

<template>
  <div>
    <nav class="nav shell" aria-label="主导航">
      <RouterLink
        class="brand"
        :aria-current-value="isAboutActive ? 'false' : 'page'"
        to="/"
        aria-label="返回首页"
      >DEV<span>/WORKS</span></RouterLink>
      <div class="nav-links">
        <RouterLink
          class="nav-link"
          :class="{ 'nav-link-active': isAboutActive }"
          aria-current-value="location"
          :to="{ path: '/', hash: '#about' }"
        >关于我</RouterLink>
        <RouterLink class="nav-cta" to="/projects">
          项目集 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
        </RouterLink>
      </div>
    </nav>

    <main>
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer shell">
      <span>© 2026 SELECTED WORKS</span>
      <span>GAMES · SYSTEMS · TOOLS</span>
      <RouterLink :to="{ path: '/', hash: '#top' }">回到顶部 ↑</RouterLink>
    </footer>
  </div>
</template>
