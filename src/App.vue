<template>
  <div>
    <nav class="nav shell" aria-label="主导航">
      <RouterLink class="brand" to="/" aria-label="返回首页">DEV<span>/01</span></RouterLink>
      <div class="nav-links">
        <RouterLink to="/projects">全部项目</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#about' }">关于</RouterLink>
        <RouterLink class="nav-cta" :to="{ path: '/', hash: '#contact' }">
          联系我 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
        </RouterLink>
      </div>
    </nav>

    <main><RouterView /></main>

    <footer class="footer shell">
      <span>© 2026 YOUR NAME</span>
      <span>GAME DEVELOPER · PORTFOLIO</span>
      <RouterLink :to="{ path: '/', hash: '#top' }">回到顶部 ↑</RouterLink>
    </footer>
  </div>
</template>
