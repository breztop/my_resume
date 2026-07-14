<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

const projects = [
  {
    id: "p2p", number: "01", kicker: "NETWORKED CO-OP", title: "森林冰火人", subtitle: "P2P 联机协作游戏", year: "2025", color: "blue",
    tags: ["P2P 联机", "状态同步", "协作玩法"],
    summary: "把经典双人协作体验带到网络环境中，围绕房间连接、角色同步与关卡机关构建完整联机链路。",
    role: "独立开发 / 网络架构 / 玩法实现",
    challenge: "在非稳定网络中保持双角色移动、机关状态与关卡进度的一致，同时控制操作延迟。",
    solution: "拆分高频角色状态与低频关卡事件；对移动采用插值与预测，对关键机关使用可靠事件同步，并设计断线后的状态恢复流程。",
    highlights: ["房间创建与加入流程", "双角色移动和动画同步", "机关、收集物与胜负状态同步", "延迟与断线场景处理"],
    stack: ["Godot", "WebRTC / P2P", "GDScript", "状态同步"],
  },
  {
    id: "tower", number: "02", kicker: "SYSTEMIC STRATEGY", title: "综合塔防游戏", subtitle: "多系统策略塔防", year: "2025", color: "lime",
    tags: ["塔防", "数值系统", "模块化"],
    summary: "融合建造、升级、敌人编队与资源循环的综合塔防原型，强调系统组合和长期可扩展性。",
    role: "独立开发 / 系统设计 / 工程实现",
    challenge: "塔、敌人、关卡与增益之间存在大量组合关系，功能增长后容易形成难以维护的条件分支。",
    solution: "以数据驱动方式拆分塔属性、攻击策略和效果模块；通过统一事件层连接波次、经济与 UI，让内容扩展不依赖核心代码改动。",
    highlights: ["多类型防御塔与升级分支", "动态波次和敌人编队", "资源、增益与局内成长", "数据驱动关卡配置"],
    stack: ["Godot", "数据驱动", "行为状态机", "对象池"],
  },
  {
    id: "cards", number: "03", kicker: "AUTHORITATIVE MULTIPLAYER", title: "卡牌棋类游戏", subtitle: "权威服务器对战", year: "2026", color: "coral",
    tags: ["权威服务器", "回合制", "规则引擎"],
    summary: "面向公平竞技的卡牌棋类对战项目，由服务器裁决规则、回合与结果，客户端专注交互和表现。",
    role: "全栈开发 / 服务端架构 / 客户端实现",
    challenge: "既要保证对局规则不可篡改，又要让复杂回合流程在断线重连、重复请求等情况下保持确定性。",
    solution: "服务端持有唯一真实状态，以命令校验驱动状态迁移；为操作增加序列号与幂等约束，并用完整快照支持重连恢复。",
    highlights: ["服务端权威规则裁决", "回合状态机与操作校验", "匹配、房间和断线重连", "对局记录与结果结算"],
    stack: ["Go", "WebSocket", "权威服务器", "状态机"],
  },
];

const activeProject = ref(null);
const closeButton = ref(null);

function openProject(project) {
  activeProject.value = project;
}

function closeProject() {
  activeProject.value = null;
}

function onKeydown(event) {
  if (event.key === "Escape") closeProject();
}

watch(activeProject, async (project) => {
  document.body.style.overflow = project ? "hidden" : "";
  if (project) {
    window.addEventListener("keydown", onKeydown);
    await nextTick();
    closeButton.value?.focus();
  } else {
    window.removeEventListener("keydown", onKeydown);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
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
        <article v-for="project in projects" :key="project.id" class="project">
          <button class="project-visual" :aria-label="`查看${project.title}详情`" @click="openProject(project)">
            <div v-if="project.id === 'p2p'" class="art art-p2p" aria-hidden="true">
              <div class="network-line line-a" /><div class="network-line line-b" /><div class="network-line line-c" />
              <div class="player player-fire"><span>F</span></div><div class="player player-water"><span>W</span></div>
              <i class="node node-1" /><i class="node node-2" /><i class="node node-3" /><div class="latency">24 ms <span>CONNECTED</span></div>
            </div>
            <div v-else-if="project.id === 'tower'" class="art art-tower" aria-hidden="true">
              <div class="grid" /><div class="range range-1" /><div class="range range-2" />
              <div class="tower tower-1"><i /></div><div class="tower tower-2"><i /></div>
              <div class="path-line"><i /><i /><i /><i /></div><div class="wave-label">WAVE 12 <span>08 / 24</span></div>
            </div>
            <div v-else class="art art-cards" aria-hidden="true">
              <div class="server-pill"><i /> SERVER VERIFIED</div>
              <div class="card card-a"><span>♞</span><b>07</b></div><div class="card card-b"><span>◆</span><b>12</b></div><div class="card card-c"><span>♜</span><b>04</b></div>
              <div class="turn-label">YOUR TURN <span>00:18</span></div>
            </div>
          </button>
          <div class="project-info">
            <div class="project-index"><span>{{ project.number }}</span><i /></div><p class="project-kicker">{{ project.kicker }}</p>
            <h3>{{ project.title }}</h3><h4>{{ project.subtitle }}</h4><p class="project-summary">{{ project.summary }}</p>
            <div class="tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
            <button class="text-button" @click="openProject(project)">查看项目详情 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg></button>
          </div>
        </article>
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

    <Teleport to="body">
      <div v-if="activeProject" class="modal-backdrop" @mousedown.self="closeProject">
        <article class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button ref="closeButton" class="modal-close" aria-label="关闭项目详情" @click="closeProject">×</button>
          <div class="modal-top" :class="`modal-${activeProject.color}`"><span>{{ activeProject.kicker }}</span><strong>{{ activeProject.number }}</strong></div>
          <div class="modal-content">
            <p class="eyebrow">PROJECT CASE STUDY · {{ activeProject.year }}</p><h2 id="modal-title">{{ activeProject.title }}</h2><p class="modal-lead">{{ activeProject.summary }}</p>
            <div class="modal-meta"><div><span>职责</span><p>{{ activeProject.role }}</p></div><div><span>技术栈</span><p>{{ activeProject.stack.join(' · ') }}</p></div></div>
            <div class="case-grid">
              <section><span>01 / 挑战</span><h3>问题是什么？</h3><p>{{ activeProject.challenge }}</p></section>
              <section><span>02 / 方案</span><h3>如何解决？</h3><p>{{ activeProject.solution }}</p></section>
            </div>
            <section class="deliverables"><span>03 / 核心实现</span><ul><li v-for="item in activeProject.highlights" :key="item">{{ item }}</li></ul></section>
          </div>
        </article>
      </div>
    </Teleport>
  </main>
</template>
