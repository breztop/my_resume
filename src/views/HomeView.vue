<script setup>
import ProjectCard from '../components/ProjectCard.vue';
import ProjectImage from '../components/ProjectImage.vue';
import { projects, getProjectById, featuredProjectIds } from '../data/projects.js';
const featuredProjects = featuredProjectIds.map(getProjectById);
const deskProjects = ['p2p', 'breconn', 'conutline'].map(getProjectById);
const capabilities = [
  { number: '01', title: '让想法可以玩', text: '从核心玩法到角色、关卡与交互，让规则成为体验。', id: 'p2p', label: '走进元素人的协作世界', icon: '✳' },
  { number: '02', title: '让系统连起来', text: '把连接、状态与协议理清楚，为复杂体验搭好底座。', id: 'breconn', label: '看看 breconn 的网络架构', icon: '↔' },
  { number: '03', title: '让工作轻一点', text: '从具体问题出发，把重复的操作变成顺手的工具。', id: 'conutline', label: '认识 conutline', icon: '⌘' },
];
</script>
<template>
  <div class="home-page">
    <header id="top" class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow"><span class="little-dot" /> 独立开发者的创作空间</p>
        <h1>做点<span class="playful">好玩的</span>，<br />也做点<span class="useful">有用的</span>。</h1>
        <p class="hero-intro">你好，我喜欢把想法做出来。<br />这里有游戏、有连接它们的系统，也有让日常轻松一点的工具。</p>
        <a class="button button-dark" href="#work">翻翻我的作品 <span aria-hidden="true">↘</span></a>
        <div class="desk-note" aria-hidden="true">保持好奇，继续折腾 <span>⤳</span></div>
      </div>
      <div class="creative-desk" aria-label="三个创作方向，点击探索项目">
        <div class="desk-grid" aria-hidden="true" /><span class="desk-star" aria-hidden="true">✳</span>
        <span class="desk-sticker" aria-hidden="true">MADE WITH<br /><strong>CURIOSITY</strong></span>
        <RouterLink v-for="(project, index) in deskProjects" :key="project.id" :to="'/projects/' + project.id" class="desk-piece" :class="'piece-' + index">
          <ProjectImage :project="project" :priority="index === 0" sizes="(max-width: 600px) 70vw, 400px" />
          <div><span>{{ ['01 / 游戏世界', '02 / 连接万物', '03 / 顺手工具'][index] }}</span><strong>{{ project.title }} <i aria-hidden="true">↗</i></strong></div>
        </RouterLink>
        <span class="desk-caption" aria-hidden="true">一点想象力 + 很多次实现</span>
      </div>
    </header>
    <section id="work" class="work shell">
      <header class="section-heading"><div><p class="eyebrow">SELECTED / 01—06</p><h2>一些认真做的<span>小宇宙。</span></h2></div><p>玩法、系统、工具。<br />从一个念头，到一个具体的作品。</p></header>
      <div class="selected-grid"><ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" /></div>
    </section>
    <section id="about" class="about-section">
      <div class="shell"><header class="section-heading"><div><p class="eyebrow">BEHIND THE WORK</p><h2>好奇心负责开始，<br /><span>工程负责实现。</span></h2></div><p>我关注玩法、联机架构与工程实现。<br />喜欢拆开问题，也喜欢把它们拼成体验。</p></header>
        <div class="capability-grid"><RouterLink v-for="item in capabilities" :key="item.id" :to="'/projects/' + item.id" class="capability"><div class="capability-top"><span>{{ item.number }}</span><i aria-hidden="true">{{ item.icon }}</i></div><h3>{{ item.title }}</h3><p>{{ item.text }}</p><span class="capability-link">{{ item.label }} <b aria-hidden="true">↗</b></span></RouterLink></div>
      </div>
    </section>
    <section class="explore shell"><span class="explore-star" aria-hidden="true">✳</span><div><p class="eyebrow">THERE'S MORE ON THE DESK</p><h2>还有一些，等你发现。</h2><p>{{ projects.length }} 个作品，各有各的想法。</p></div><RouterLink class="button button-dark" to="/projects">打开全部作品 <span aria-hidden="true">↗</span></RouterLink></section>
  </div>
</template>
<style scoped>
.hero{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:28px;padding-block:65px 85px}.hero-copy{position:relative}.hero .eyebrow{display:flex;gap:10px;align-items:center}.little-dot{width:8px;height:8px;border-radius:50%;background:var(--blue)}h1{font-size:clamp(38px,4.5vw,66px);letter-spacing:-.055em;line-height:1.35;margin:26px 0}.playful{color:var(--blue);position:relative}.playful:after{content:'';position:absolute;height:3px;background:currentColor;bottom:-3px;left:0;right:0;transform:rotate(-3deg)}.useful{background:var(--lime);padding-inline:5px;border-radius:48% 30% 42% 15%}.hero-intro{color:var(--muted);font-size:16px;line-height:1.9;margin:26px 0 30px;max-width:400px}.desk-note{font-size:12px;color:var(--muted);margin:24px 0 0 10px;transform:rotate(-5deg);width:220px}.desk-note span{font-size:32px;margin-left:15px}.creative-desk{height:510px;position:relative;isolation:isolate}.desk-grid{position:absolute;inset:10px -5px 0;background-image:radial-gradient(#c6c2b7 1px,transparent 1px);background-size:18px 18px;border-radius:50%;mask-image:radial-gradient(ellipse,#000 40%,transparent 72%)}.desk-piece{position:absolute;display:block;background:#fffefa;padding:9px;border:1px solid var(--line);box-shadow:0 12px 30px #29251918;transition:transform .25s,box-shadow .25s}.desk-piece:hover,.desk-piece:focus-visible{z-index:5;transform:rotate(0) translateY(-6px);box-shadow:0 18px 32px #29251925}.desk-piece :deep(img){width:100%;height:100%;object-fit:cover}.desk-piece>div{padding:10px 5px 3px}.desk-piece span{display:block;font-size:9px;color:var(--muted);letter-spacing:.08em}.desk-piece strong{display:flex;justify-content:space-between;font-size:15px;margin-top:3px}.desk-piece i{font-style:normal}.piece-0{width:71%;top:18px;left:4%;transform:rotate(-7deg);z-index:2}.piece-0 :deep(img){aspect-ratio:16/10;height:auto}.piece-1{width:48%;right:0;top:205px;transform:rotate(8deg);z-index:3}.piece-1 :deep(img){aspect-ratio:16/10;height:auto;object-fit:contain;background:#f6f8fc}.piece-2{width:46%;left:4%;bottom:0;transform:rotate(-3deg);z-index:3}.piece-2 :deep(img){aspect-ratio:16/9;height:auto;object-fit:contain;background:#142b29}.desk-star{position:absolute;top:-6px;right:7%;font-size:86px;color:var(--coral);z-index:4;transform:rotate(15deg);line-height:1}.desk-sticker{position:absolute;right:4%;top:107px;background:var(--lime);color:var(--ink);border:1px solid var(--ink);padding:12px 16px;font:10px/1.5 monospace;text-align:center;transform:rotate(12deg);z-index:4;border-radius:50%}.desk-caption{position:absolute;right:7%;bottom:14px;font-size:11px;transform:rotate(-5deg);color:var(--muted)}.work{padding-block:65px 100px;border-top:1px solid var(--line)}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:28px;margin-bottom:38px}.section-heading h2{font-size:clamp(28px,3.3vw,44px);line-height:1.3;margin:12px 0 0;letter-spacing:-.045em}.section-heading h2 span{color:var(--blue)}.section-heading>p{font-size:14px;line-height:1.9;color:var(--muted);margin:0}.selected-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:42px 25px}.about-section{padding:75px 0 85px;background:#eaece1;border-block:1px solid var(--line)}.capability-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.capability{padding:24px;background:var(--paper);border:1px solid var(--line);border-radius:10px;transition:transform .2s}.capability:hover{transform:translateY(-4px)}.capability-top{display:flex;justify-content:space-between;align-items:center;font:12px monospace}.capability-top i{font-size:36px;font-style:normal;color:var(--blue)}.capability:nth-child(2) .capability-top i{color:#bb4928}.capability:nth-child(3) .capability-top i{color:#526b24}.capability h3{font-size:22px;margin:28px 0 12px}.capability p{color:var(--muted);font-size:14px;line-height:1.85;min-height:52px}.capability-link{display:flex;justify-content:space-between;gap:10px;margin-top:28px;font-size:12px;border-top:1px solid var(--line);padding-top:16px}.explore{display:flex;gap:30px;align-items:center;padding-block:75px}.explore-star{font-size:80px;color:var(--coral);line-height:1}.explore h2{font-size:clamp(24px,3vw,36px);margin:10px 0}.explore p:not(.eyebrow){font-size:14px;color:var(--muted);margin-bottom:0}.explore .button{margin-left:auto;flex-shrink:0}
@media(max-width:1000px){.hero{gap:18px;padding-block:45px 60px}.creative-desk{height:450px}.piece-1{top:185px}.selected-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.capability{padding:20px}.section-heading>p{max-width:240px}}
@media(max-width:600px){.hero{grid-template-columns:1fr;padding-top:28px;gap:15px;padding-bottom:40px}.hero h1{font-size:38px;margin:18px 0}.hero-intro{font-size:14px;margin:18px 0}.hero .eyebrow{font-size:10px}.desk-note{display:none}.creative-desk{height:350px;margin-top:12px}.piece-0{width:67%;top:9px}.piece-1{top:155px;width:46%;right:2%}.piece-2{width:43%;bottom:4px}.desk-star{font-size:65px;right:10%;top:0}.desk-sticker{top:67px;right:5%;font-size:8px;padding:8px 12px}.desk-caption{font-size:9px;right:4%;bottom:0}.desk-piece strong{font-size:12px}.desk-piece>div{padding:6px 2px 2px}.desk-piece{padding:6px}.work{padding-block:40px 55px}.section-heading{display:block;margin-bottom:26px}.section-heading>p{margin-top:18px;max-width:none}.selected-grid{grid-template-columns:1fr;gap:30px}.capability-grid{grid-template-columns:1fr;gap:12px}.capability h3{margin-top:12px}.capability p{min-height:0}.capability-link{margin-top:18px}.about-section{padding-block:45px}.explore{flex-wrap:wrap;gap:18px;padding-block:45px}.explore-star{font-size:48px}.explore .button{margin-left:0}.explore .eyebrow{font-size:9px}}
</style>
