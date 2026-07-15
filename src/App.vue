<script setup>
import { ref } from "vue";
import ProjectCard from "./components/ProjectCard.vue";
import ProjectModal from "./components/ProjectModal.vue";
import { projects } from "./data/projects.js";

const activeProject = ref(null);
</script>

<template>
  <main>
    <nav class="nav shell" aria-label="主导航">
      <a class="brand" href="#top" aria-label="返回首页">DEV<span>/01</span></a>
      <div class="nav-links">
        <a href="#work">项目</a><a href="#about">关于</a>
        <a class="nav-cta" href="#contact">联系我 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg></a>
      </div>
    </nav>

    <header id="top" class="hero shell">
      <div class="availability"><i /> AVAILABLE FOR OPPORTUNITIES · 2026</div>
      <h1>把复杂系统<br />做成<span>好玩的游戏。</span></h1>
      <div class="hero-bottom">
        <p>你好，我是一名专注于<span>游戏玩法、联机架构与工程实现</span>的开发者。我喜欢把模糊的创意，做成稳定、清晰、可体验的产品。</p>
        <a class="scroll-link" href="#work"><span>查看项目</span><i>↓</i></a>
      </div>
      <div class="hero-stats">
        <div><strong>03</strong><span>核心项目</span></div><div><strong>P2P</strong><span>实时联机</span></div><div><strong>C / S</strong><span>权威服务端</span></div>
      </div>
    </header>

    <section id="work" class="work shell">
      <div class="section-head">
        <p class="eyebrow">SELECTED WORK · 2025—2026</p><h2>项目作品</h2>
        <p>从实时联机到服务端权威对战，以下项目展示了我对玩法体验与底层系统的完整思考。</p>
      </div>

      <div class="projects">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" @select="activeProject = $event" />
      </div>
    </section>

    <section id="about" class="about">
      <div class="shell about-inner">
        <div><p class="eyebrow">ABOUT / CAPABILITIES</p><h2>不止实现功能，<br />也在意<span>为什么这样做。</span></h2></div>
        <div class="about-copy">
          <p>我关注从玩法验证到工程落地的完整过程：先找到影响体验的核心问题，再用合适的架构把它稳定实现。</p>
          <div class="capabilities">
            <div><span>01</span><strong>玩法开发</strong><p>核心循环、交互反馈、关卡机制</p></div>
            <div><span>02</span><strong>网络架构</strong><p>P2P、状态同步、权威服务器</p></div>
            <div><span>03</span><strong>系统工程</strong><p>模块化、数据驱动、性能优化</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact shell">
      <p class="eyebrow">LET'S BUILD SOMETHING</p><h2>有合适的机会？<br /><span>聊聊吧。</span></h2>
      <p>正在寻找游戏开发 / 客户端 / 服务端相关机会。</p>
      <a href="mailto:yourname@example.com">yourname@example.com <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg></a>
      <small>请将这里替换为你的真实邮箱</small>
    </section>

    <footer class="footer shell"><span>© 2026 YOUR NAME</span><span>GAME DEVELOPER · PORTFOLIO</span><a href="#top">回到顶部 ↑</a></footer>

    <ProjectModal v-if="activeProject" :project="activeProject" @close="activeProject = null" />
  </main>
</template>
