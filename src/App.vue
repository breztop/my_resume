<template>
  <div>
    <nav class="nav shell" aria-label="主导航">
      <RouterLink class="brand" to="/" aria-label="返回首页">DEV<span>/WORKS</span></RouterLink>
      <div class="nav-links">
        <RouterLink to="/projects">全部项目</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#about' }">能力</RouterLink>
        <RouterLink class="nav-cta" :to="{ path: '/', hash: '#work' }">
          精选案例 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
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
