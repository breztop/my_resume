<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="spatial-page">
    <header class="spatial-hero">
      <div class="hero-nav">
        <RouterLink to="/projects">Index ↗</RouterLink>
        <span>Spatial study · {{ project.year }}</span>
      </div>

      <div class="hero-stage">
        <div class="hero-title">
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <span>{{ project.subtitle }}</span>
        </div>
        <figure>
          <div class="frame-note frame-note-a">CAM A / FOLLOW</div>
          <img :src="project.cover" :alt="project.coverAlt" />
          <div class="frame-note frame-note-b">CAM B / OVERVIEW</div>
          <figcaption>{{ project.visualLabel }}</figcaption>
        </figure>
        <p class="hero-index">{{ project.number }}</p>
      </div>
    </header>

    <main>
      <section class="project-intro">
        <p class="intro-copy">{{ project.summary }}</p>
        <dl>
          <div><dt>Contribution</dt><dd>{{ project.role }}</dd></div>
          <div><dt>Toolkit</dt><dd>{{ project.stack.join(" / ") }}</dd></div>
        </dl>
      </section>

      <section class="problem-space">
        <aside>
          <span>01</span>
          <p>Problem<br />space</p>
        </aside>
        <article>
          <p class="section-label">THE CHALLENGE</p>
          <h2>空间越自由，<br />协作信息越容易失焦。</h2>
          <p>{{ project.challenge }}</p>
        </article>
        <article class="solution-card">
          <p class="section-label">THE RESPONSE</p>
          <h3>把相机变成第二套协作语言。</h3>
          <p>{{ project.solution }}</p>
          <i aria-hidden="true">⌁</i>
        </article>
      </section>

      <section v-if="project.modules?.length" class="spatial-modules">
        <header>
          <span>02 / SYSTEM ROOMS</span>
          <h2>从角色脚下，<br />一直设计到镜头之外。</h2>
        </header>
        <div class="room-grid">
          <article v-for="(module, index) in project.modules" :key="module.name" :class="`room-${index + 1}`">
            <span>ROOM {{ String(index + 1).padStart(2, "0") }}</span>
            <h3>{{ module.name }}</h3>
            <p>{{ module.detail }}</p>
          </article>
        </div>
      </section>

      <section class="focus-list">
        <div class="focus-sticky">
          <p>03 / FOCUS POINTS</p>
          <h2>七个观察焦点</h2>
          <span>每一个工程判断，都在回答“玩家此刻需要看见什么”。</span>
        </div>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <b>{{ String(index + 1).padStart(2, "0") }}</b>
            <p>{{ item }}</p>
          </li>
        </ol>
      </section>

      <section v-if="project.roadmap?.length" class="camera-roadmap">
        <header><span>04 / DEPTH PLAN</span><h2>景深不是一次完成的。</h2></header>
        <article v-for="(phase, index) in project.roadmap" :key="phase.label">
          <div class="lens"><i :style="{ '--lens': `${46 + index * 24}px` }" /></div>
          <div><span>{{ phase.label }}</span><h3>{{ phase.title }}</h3></div>
          <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
        </article>
      </section>

      <section v-if="project.principles?.length" class="principle-wall">
        <p>DESIGN PRINCIPLES</p>
        <blockquote v-for="principle in project.principles" :key="principle">{{ principle }}</blockquote>
      </section>
    </main>

    <nav class="spatial-pagination" aria-label="项目翻页">
      <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><small>← Previous</small><span>{{ previousProject.title }}</span></RouterLink>
      <RouterLink to="/projects" class="all-projects">All projects</RouterLink>
      <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><small>Next →</small><span>{{ nextProject.title }}</span></RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.spatial-page {
  --ink: #13251f;
  --mint: #bbf6df;
  min-height: 100vh;
  color: var(--ink);
  background: #f1efe9;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.spatial-hero { padding: 26px clamp(20px, 5vw, 76px) 100px; }
.hero-nav { display: flex; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid #192a2460; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.hero-nav a { color: inherit; text-decoration: none; }
.hero-stage { position: relative; max-width: 1440px; min-height: 780px; margin: 74px auto 0; }
.hero-title { position: relative; z-index: 3; width: 62%; }
.hero-title p { margin: 0 0 20px; font: 700 11px ui-monospace, monospace; letter-spacing: .2em; }
.hero-title h1 { max-width: 900px; margin: 0; font-family: Georgia, "Songti SC", serif; font-size: clamp(68px, 9vw, 138px); font-weight: 400; line-height: .84; letter-spacing: -.075em; }
.hero-title > span { display: block; max-width: 440px; margin-top: 34px; font-size: 17px; line-height: 1.6; }
.hero-stage figure { position: absolute; top: 145px; right: 0; width: 62%; margin: 0; padding: 14px; background: #d9e3dd; transform: rotate(1.5deg); box-shadow: 28px 34px 0 #c7ff86; }
.hero-stage figure::before { position: absolute; inset: -34px auto auto 9%; width: 1px; height: 90px; content: ""; background: #19352a; }
.hero-stage img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; filter: saturate(.82) contrast(1.04); }
.hero-stage figcaption { padding: 13px 3px 0; font: 700 9px ui-monospace, monospace; letter-spacing: .14em; }
.frame-note { position: absolute; z-index: 2; padding: 7px 9px; color: white; background: #153026; font: 700 8px ui-monospace, monospace; letter-spacing: .13em; }
.frame-note-a { top: 30px; left: -38px; }.frame-note-b { right: -28px; bottom: 70px; }
.hero-index { position: absolute; bottom: -5px; left: 0; margin: 0; color: #163329; font: 300 clamp(90px, 15vw, 210px)/.75 Arial, sans-serif; letter-spacing: -.1em; opacity: .13; }

main { overflow: hidden; }
.project-intro { display: grid; grid-template-columns: 1.5fr 1fr; gap: 8vw; padding: 120px clamp(20px, 8vw, 130px); background: #153027; color: #e9fff5; }
.intro-copy { max-width: 820px; margin: 0; font-family: Georgia, "Songti SC", serif; font-size: clamp(25px, 3vw, 43px); line-height: 1.45; }
.project-intro dl { margin: 0; }
.project-intro dl div { padding: 0 0 28px; margin-bottom: 28px; border-bottom: 1px solid #d3f9e344; }
.project-intro dt { margin-bottom: 9px; color: #97c8b3; font: 700 10px ui-monospace, monospace; letter-spacing: .15em; text-transform: uppercase; }
.project-intro dd { margin: 0; font-size: 13px; line-height: 1.7; }

.problem-space { display: grid; grid-template-columns: 100px 1.2fr .8fr; gap: clamp(28px, 5vw, 86px); padding: 150px clamp(20px, 6vw, 100px); }
.problem-space aside { padding-top: 8px; border-top: 1px solid #1a3028; }
.problem-space aside span { display: block; margin: 14px 0 80px; font: 700 12px ui-monospace, monospace; }
.problem-space aside p { writing-mode: vertical-rl; font-size: 13px; line-height: 1.4; letter-spacing: .17em; text-transform: uppercase; }
.section-label { margin: 0 0 26px !important; font: 700 10px ui-monospace, monospace !important; letter-spacing: .18em; }
.problem-space h2 { margin: 0 0 40px; font-family: Georgia, "Songti SC", serif; font-size: clamp(42px, 5vw, 74px); font-weight: 400; line-height: 1.05; letter-spacing: -.04em; }
.problem-space article > p:last-child { max-width: 680px; margin: 0; color: #44564f; font-size: 15px; line-height: 2; }
.solution-card { position: relative; align-self: end; padding: 46px; background: var(--mint); }
.solution-card::before { position: absolute; top: -22px; right: 28px; width: 74px; height: 44px; content: ""; border: 1px solid #214438; border-bottom: 0; border-radius: 50% 50% 0 0; }
.solution-card h3 { max-width: 380px; margin: 0 0 30px; font-family: Georgia, "Songti SC", serif; font-size: 34px; font-weight: 400; line-height: 1.2; }
.solution-card i { position: absolute; right: 22px; bottom: 14px; font-size: 46px; font-style: normal; opacity: .25; }

.spatial-modules { padding: 120px clamp(20px, 6vw, 100px); background: #dce4df; }
.spatial-modules header { display: grid; grid-template-columns: 1fr 2fr; align-items: start; gap: 50px; margin-bottom: 80px; }
.spatial-modules header span, .focus-sticky > p, .camera-roadmap header > span { font: 700 10px ui-monospace, monospace; letter-spacing: .18em; }
.spatial-modules header h2 { margin: 0; font-family: Georgia, "Songti SC", serif; font-size: clamp(44px, 5.5vw, 78px); font-weight: 400; line-height: 1.08; }
.room-grid { display: grid; grid-template-columns: 1.1fr .9fr 1.2fr; grid-template-rows: auto auto; gap: 16px; }
.room-grid article { min-height: 250px; padding: 34px; border: 1px solid #8c9c94; background: #edf0ed; transition: transform .35s ease, background .35s ease; }
.room-grid article:hover { z-index: 2; background: #c7ff86; transform: translateY(-8px) rotate(-1deg); }
.room-grid article > span { font: 700 9px ui-monospace, monospace; letter-spacing: .15em; }
.room-grid h3 { margin: 72px 0 12px; font: 400 25px Georgia, serif; }
.room-grid p { margin: 0; color: #52625a; font-size: 13px; line-height: 1.7; }
.room-2 { transform: translateY(40px); }.room-5 { transform: translateY(-25px); }.room-grid .room-6 { color: white; background: #173228; }

.focus-list { display: grid; grid-template-columns: .75fr 1.25fr; gap: 10vw; padding: 150px clamp(20px, 8vw, 130px); }
.focus-sticky { align-self: start; position: sticky; top: 50px; }
.focus-sticky h2 { margin: 24px 0; font: 400 clamp(43px, 5vw, 70px)/1 Georgia, "Songti SC", serif; }
.focus-sticky > span { display: block; max-width: 320px; color: #66736d; font-size: 14px; line-height: 1.8; }
.focus-list ol { margin: 0; padding: 0; list-style: none; }
.focus-list li { display: grid; grid-template-columns: 68px 1fr; gap: 24px; align-items: start; padding: 34px 0; border-top: 1px solid #aeb7b2; }
.focus-list li:last-child { border-bottom: 1px solid #aeb7b2; }
.focus-list b { color: #6c7d75; font: 400 24px Georgia, serif; }
.focus-list li p { margin: 0; font-size: 20px; line-height: 1.55; }

.camera-roadmap { padding: 120px clamp(20px, 6vw, 100px); color: white; background: #15241f; }
.camera-roadmap header { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 70px; }
.camera-roadmap header h2 { margin: 0; font: 400 clamp(38px, 5vw, 68px) Georgia, "Songti SC", serif; }
.camera-roadmap article { display: grid; grid-template-columns: 160px .8fr 1.2fr; gap: 48px; align-items: center; padding: 44px 0; border-top: 1px solid #b9d3c633; }
.lens { display: grid; place-items: center; width: 110px; height: 110px; border: 1px solid #70847b; border-radius: 50%; }
.lens i { display: block; width: var(--lens); height: var(--lens); border-radius: 50%; background: #c7ff86; box-shadow: 0 0 40px #c7ff8666; }
.camera-roadmap article span { color: #c7ff86; font: 700 10px ui-monospace, monospace; letter-spacing: .17em; }
.camera-roadmap h3 { margin: 10px 0 0; font: 400 27px Georgia, "Songti SC", serif; }
.camera-roadmap ul { columns: 2; margin: 0; padding-left: 18px; color: #bac9c2; font-size: 13px; line-height: 1.8; }

.principle-wall { display: grid; grid-template-columns: 1fr 2fr; gap: 30px 8vw; padding: 130px clamp(20px, 8vw, 130px); background: #c7ff86; }
.principle-wall > p { grid-row: 1 / span 4; margin: 6px 0; font: 700 10px ui-monospace, monospace; letter-spacing: .18em; }
.principle-wall blockquote { margin: 0; padding-bottom: 30px; border-bottom: 1px solid #38522b55; font: 400 clamp(20px, 2.3vw, 31px)/1.55 Georgia, "Songti SC", serif; }

.spatial-pagination { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 30px; padding: 70px clamp(20px, 6vw, 100px); background: #f1efe9; }
.spatial-pagination a { display: flex; flex-direction: column; gap: 8px; color: inherit; text-decoration: none; }
.spatial-pagination a:last-child { text-align: right; }.spatial-pagination small { color: #68766f; font-size: 10px; text-transform: uppercase; letter-spacing: .13em; }.spatial-pagination span { font: 400 20px Georgia, serif; }
.spatial-pagination .all-projects { display: block; padding: 12px 20px; border: 1px solid currentColor; font-size: 11px; text-transform: uppercase; letter-spacing: .13em; }

@media (max-width: 700px) {
  .spatial-hero { padding: 20px 18px 70px; }.hero-stage { min-height: 630px; margin-top: 50px; }.hero-title { width: 100%; }.hero-title h1 { font-size: 64px; }.hero-title > span { font-size: 14px; }
  .hero-stage figure { top: 275px; width: 94%; }.frame-note-b { right: -8px; }.hero-index { display: none; }
  .project-intro { grid-template-columns: 1fr; padding: 78px 18px; }.intro-copy { font-size: 25px; }
  .problem-space { grid-template-columns: 1fr; padding: 90px 18px; }.problem-space aside { display: none; }.problem-space h2 { font-size: 45px; }.solution-card { padding: 30px; }
  .spatial-modules { padding: 84px 18px; }.spatial-modules header { grid-template-columns: 1fr; }.spatial-modules header h2 { font-size: 43px; }.room-grid { grid-template-columns: 1fr; }.room-grid article { min-height: 210px; transform: none; }.room-grid h3 { margin-top: 45px; }
  .focus-list { grid-template-columns: 1fr; padding: 90px 18px; }.focus-sticky { position: static; }.focus-list li p { font-size: 17px; }
  .camera-roadmap { padding: 80px 18px; }.camera-roadmap header { display: block; }.camera-roadmap header h2 { margin-top: 20px; }.camera-roadmap article { grid-template-columns: 80px 1fr; gap: 20px; }.lens { width: 72px; height: 72px; }.camera-roadmap article ul { grid-column: 1 / -1; columns: 1; }
  .principle-wall { grid-template-columns: 1fr; padding: 80px 18px; }.principle-wall > p { grid-row: auto; }.principle-wall blockquote { font-size: 20px; }
  .spatial-pagination { grid-template-columns: 1fr 1fr; padding: 50px 18px; }.spatial-pagination .all-projects { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .spatial-page *, .spatial-page *::before, .spatial-page *::after { animation: none !important; scroll-behavior: auto !important; transition: none !important; }
}
</style>
