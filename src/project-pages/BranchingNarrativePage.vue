<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="narrative-page">
    <header class="novel-hero">
      <img class="hero-backdrop" :src="project.cover" :alt="project.coverAlt" />
      <div class="film-grain" aria-hidden="true" />
      <nav>
        <RouterLink to="/projects">← Library</RouterLink>
        <span>Chapter {{ project.number }}</span>
        <span>{{ project.year }} / {{ project.visualLabel }}</span>
      </nav>
      <div class="title-card">
        <p>{{ project.kicker }}</p>
        <h1>{{ project.title }}</h1>
        <span>{{ project.subtitle }}</span>
      </div>
      <div class="dialogue-box">
        <div class="speaker">NARRATOR</div>
        <p>{{ project.summary }}</p>
        <i aria-hidden="true">▼</i>
      </div>
      <span class="scene-count">SCENE 01 / 06</span>
    </header>

    <main>
      <section class="credits-strip">
        <div><span>Written & directed by</span><p>{{ project.role }}</p></div>
        <div><span>Production tools</span><p>{{ project.stack.join(" · ") }}</p></div>
      </section>

      <section class="story-conflict">
        <aside><span>SCENE 02</span><b>冲突</b><i /></aside>
        <article>
          <p class="scene-label">THE CONFLICT</p>
          <h2>每一个选择，<br />都留下看不见的回声。</h2>
          <p>{{ project.challenge }}</p>
        </article>
        <blockquote>“读档以后，世界必须记得玩家曾经走到哪里。”</blockquote>
      </section>

      <section class="story-solution">
        <div class="chapter-number" aria-hidden="true">03</div>
        <div class="solution-copy">
          <p class="scene-label">THE SYSTEM</p>
          <h2>将故事写成<br />可恢复的状态。</h2>
          <p>{{ project.solution }}</p>
        </div>
        <div class="save-slots" aria-label="存档系统示意">
          <article><span>AUTO</span><b>Current node</b><small>Just now</small></article>
          <article><span>01</span><b>Narrative state</b><small>Chapter saved</small></article>
          <article><span>02</span><b>Ending flags</b><small>Cross-play data</small></article>
        </div>
      </section>

      <section class="choice-sequence">
        <header><span>SCENE 04 / PLAYER CHOICES</span><h2>你会如何推进这个故事？</h2><p>每个选项，都是已经完成的一条系统能力。</p></header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <span>{{ String.fromCharCode(65 + index) }}</span>
            <p>{{ item }}</p>
            <i>选择</i>
          </li>
        </ol>
      </section>

      <section v-if="project.modules?.length" class="branch-map">
        <header><span>SCENE 05 / NARRATIVE GRAPH</span><h2>六个系统节点，<br />共同托住所有分支。</h2></header>
        <div class="branch-canvas">
          <article v-for="(module, index) in project.modules" :key="module.name" :class="`branch-${index + 1}`">
            <span>NODE {{ String(index + 1).padStart(2, "0") }}</span>
            <h3>{{ module.name }}</h3>
            <p>{{ module.detail }}</p>
          </article>
          <svg viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M170 110 C300 110 250 255 425 255 S560 400 680 400" />
            <path d="M170 110 C330 110 370 90 500 90 S650 135 805 135" />
            <path d="M170 410 C320 410 280 255 425 255 S660 135 805 135" />
            <path d="M425 255 C590 255 620 400 680 400" />
          </svg>
        </div>
      </section>

      <section v-if="project.principles?.length" class="ending-credits">
        <div class="ending-title"><span>FINAL SCENE</span><h2>TRUE END</h2><p>叙事系统设计原则</p></div>
        <ol>
          <li v-for="(principle, index) in project.principles" :key="principle"><span>{{ String(index + 1).padStart(2, "0") }}</span><p>{{ principle }}</p></li>
        </ol>
      </section>
    </main>

    <footer class="novel-footer">
      <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><small>← Previous chapter</small><strong>{{ previousProject.title }}</strong></RouterLink>
      <RouterLink to="/projects" class="title-screen">TITLE SCREEN</RouterLink>
      <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><small>Next chapter →</small><strong>{{ nextProject.title }}</strong></RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.narrative-page {
  --rose: #df8cae;
  --violet: #5d416f;
  --night: #10101c;
  min-height: 100vh;
  color: #eee9f0;
  background: var(--night);
  font-family: "Times New Roman", "Songti SC", serif;
}
.novel-hero { position: relative; min-height: 1000px; overflow: hidden; isolation: isolate; background: #10101c; }
.hero-backdrop { position: absolute; inset: 0; z-index: -3; width: 100%; height: 100%; object-fit: cover; filter: saturate(.55) brightness(.54) contrast(1.08); transform: scale(1.02); animation: slow-scene 18s ease-out both; }
.novel-hero::before { position: absolute; inset: 0; z-index: -2; content: ""; background: linear-gradient(90deg, #0a0914cc, transparent 56%, #0d0b15aa), linear-gradient(0deg, #0c0b16 0, transparent 48%, #0c0b1688); }
.film-grain { position: absolute; inset: 0; z-index: -1; opacity: .18; background-image: radial-gradient(#fff 0 .6px, transparent .7px), radial-gradient(#000 0 .8px, transparent .9px); background-position: 0 0, 7px 11px; background-size: 13px 13px, 17px 17px; mix-blend-mode: overlay; }
.novel-hero nav { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 84px; margin: 0 clamp(20px, 5vw, 78px); border-bottom: 1px solid #ffffff3d; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: .17em; text-transform: uppercase; }.novel-hero nav a { color: inherit; text-decoration: none; }.novel-hero nav span:last-child { text-align: right; }
.title-card { position: absolute; top: 18%; left: clamp(20px, 8vw, 130px); max-width: 850px; }.title-card p { margin: 0 0 24px; color: #edb4cb; font: 600 10px Arial, sans-serif; letter-spacing: .27em; }.title-card h1 { margin: 0; font-size: clamp(69px, 10vw, 145px); font-weight: 400; line-height: .87; letter-spacing: -.06em; text-shadow: 0 8px 40px #000; }.title-card > span { display: block; max-width: 580px; margin: 34px 0 0 10vw; font-size: clamp(16px, 1.6vw, 23px); font-style: italic; line-height: 1.5; }
.dialogue-box { position: absolute; right: clamp(20px, 7vw, 110px); bottom: 95px; width: min(720px, 65vw); padding: 36px 42px; border: 1px solid #e6d8e366; border-radius: 4px; background: #13111fd9; box-shadow: 0 22px 70px #000a; backdrop-filter: blur(12px); }.speaker { position: absolute; top: -15px; left: 30px; padding: 8px 18px; color: white; background: var(--violet); font: 700 9px Arial, sans-serif; letter-spacing: .19em; }.dialogue-box p { margin: 0; font-size: 17px; line-height: 1.9; }.dialogue-box i { position: absolute; right: 20px; bottom: 14px; color: var(--rose); font-size: 10px; animation: next 1.2s ease-in-out infinite; }.scene-count { position: absolute; left: clamp(20px, 5vw, 78px); bottom: 105px; font: 700 9px Arial, sans-serif; letter-spacing: .2em; writing-mode: vertical-rl; }

.credits-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; padding: 1px clamp(20px, 6vw, 95px); background: #524a5e; }.credits-strip div { padding: 40px; background: #f0eaed; color: #251f2b; }.credits-strip span { color: #8d7487; font: 700 9px Arial, sans-serif; letter-spacing: .17em; text-transform: uppercase; }.credits-strip p { margin: 13px 0 0; font: 13px/1.7 Arial, sans-serif; }

.story-conflict { display: grid; grid-template-columns: 130px 1.2fr .8fr; gap: 6vw; padding: 160px clamp(20px, 7vw, 110px); color: #29212e; background: #eee7e9; }.story-conflict aside { display: flex; flex-direction: column; align-items: center; gap: 26px; padding-top: 10px; border-right: 1px solid #9b8993; }.story-conflict aside span { font: 700 9px Arial, sans-serif; letter-spacing: .16em; writing-mode: vertical-rl; }.story-conflict aside b { color: #9a5271; font-size: 48px; font-weight: 400; writing-mode: vertical-rl; }.story-conflict aside i { width: 1px; height: 90px; background: #9b8993; }.scene-label { margin: 0 0 28px !important; color: #9a5271 !important; font: 700 9px Arial, sans-serif !important; letter-spacing: .2em; }.story-conflict h2,.story-solution h2 { margin: 0 0 42px; font-size: clamp(48px, 6vw, 84px); font-weight: 400; line-height: 1.02; letter-spacing: -.05em; }.story-conflict article > p:last-child { max-width: 760px; margin: 0; color: #5f5360; font: 15px/2 Arial, sans-serif; }.story-conflict blockquote { align-self: end; margin: 0 0 25px; padding: 35px 0 35px 30px; border-left: 3px solid var(--rose); color: #725c6e; font-size: 25px; font-style: italic; line-height: 1.65; }

.story-solution { position: relative; display: grid; grid-template-columns: 1fr .9fr; gap: 9vw; padding: 160px clamp(20px, 8vw, 130px); overflow: hidden; background: #5c3f6e; }.chapter-number { position: absolute; top: -80px; right: 3vw; color: #ffffff0d; font-size: 410px; line-height: 1; }.solution-copy { position: relative; z-index: 2; }.story-solution .scene-label { color: #e9aac5 !important; }.story-solution h2 { color: #fff; }.solution-copy > p:last-child { max-width: 730px; margin: 0; color: #ded0e1; font: 15px/2 Arial, sans-serif; }.save-slots { position: relative; z-index: 2; align-self: center; display: grid; gap: 13px; }.save-slots article { display: grid; grid-template-columns: 55px 1fr auto; align-items: center; gap: 20px; min-height: 88px; padding: 18px 24px; border: 1px solid #eadde377; background: #291f31aa; box-shadow: 10px 10px 0 #3e2b4b; }.save-slots span { display: grid; place-items: center; width: 43px; height: 43px; border: 1px solid #b88ba3; color: var(--rose); font: 700 9px Arial, sans-serif; }.save-slots b { font-size: 17px; font-weight: 400; }.save-slots small { color: #a999ad; font: 9px Arial, sans-serif; }

.choice-sequence { padding: 150px max(20px, calc((100vw - 1150px) / 2)); color: #241c27; background: #f2edef; }.choice-sequence header { display: grid; grid-template-columns: .7fr 1.4fr .9fr; gap: 40px; align-items: end; margin-bottom: 80px; }.choice-sequence header > span { color: #9a5271; font: 700 9px Arial, sans-serif; letter-spacing: .18em; }.choice-sequence h2 { margin: 0; font-size: clamp(46px, 5vw, 70px); font-weight: 400; line-height: 1.05; }.choice-sequence header > p { margin: 0; color: #786b76; font: 13px/1.7 Arial, sans-serif; }.choice-sequence ol { max-width: 900px; margin: 0 0 0 auto; padding: 0; list-style: none; }.choice-sequence li { display: grid; grid-template-columns: 56px 1fr auto; gap: 25px; align-items: center; min-height: 86px; margin-bottom: 13px; padding: 17px 24px; border: 1px solid #a99ca5; background: white; box-shadow: 7px 7px 0 #ddd3d9; transition: color .25s ease, background .25s ease, transform .25s ease; }.choice-sequence li:hover { color: white; background: #6c4a7f; transform: translateX(-12px); }.choice-sequence li > span { display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid currentColor; border-radius: 50%; font-style: italic; }.choice-sequence li p { margin: 0; font: 14px/1.6 Arial, sans-serif; }.choice-sequence li i { color: #9b758a; font-size: 11px; font-style: normal; }

.branch-map { padding: 150px clamp(20px, 6vw, 95px); background: #171520; }.branch-map header { display: grid; grid-template-columns: .7fr 1.3fr; gap: 50px; margin-bottom: 100px; }.branch-map header span { color: var(--rose); font: 700 9px Arial, sans-serif; letter-spacing: .18em; }.branch-map h2 { margin: 0; font-size: clamp(48px, 6vw, 82px); font-weight: 400; line-height: 1.05; }.branch-canvas { position: relative; min-height: 620px; }.branch-canvas svg { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; overflow: visible; }.branch-canvas path { fill: none; stroke: #cf8eaa77; stroke-width: 2; stroke-dasharray: 6 8; animation: path 12s linear infinite; }.branch-canvas article { position: absolute; z-index: 2; width: 260px; min-height: 140px; padding: 24px; border: 1px solid #826e80; background: #25202c; box-shadow: 10px 10px 0 #0b0a0f; }.branch-canvas article::before { position: absolute; top: 50%; left: -7px; width: 12px; height: 12px; content: ""; border: 2px solid var(--rose); border-radius: 50%; background: #171520; }.branch-canvas article > span { color: var(--rose); font: 700 8px Arial, sans-serif; letter-spacing: .16em; }.branch-canvas h3 { margin: 13px 0 10px; font-size: 21px; font-weight: 400; }.branch-canvas p { margin: 0; color: #aa9fab; font: 12px/1.6 Arial, sans-serif; }.branch-1 { top: 30px; left: 2%; }.branch-2 { top: 235px; left: 29%; }.branch-3 { top: 10px; left: 40%; }.branch-4 { top: 330px; left: 58%; }.branch-5 { top: 55px; right: 2%; }.branch-6 { right: 9%; bottom: 0; }

.ending-credits { display: grid; grid-template-columns: .7fr 1.3fr; gap: 8vw; padding: 160px clamp(20px, 8vw, 130px); color: #24202a; background: #e2dce0; }.ending-title > span { color: #985b78; font: 700 9px Arial, sans-serif; letter-spacing: .2em; }.ending-title h2 { margin: 20px 0 12px; color: #603c70; font-size: clamp(62px, 8vw, 115px); font-weight: 400; line-height: .83; letter-spacing: -.06em; }.ending-title p { color: #776a75; font-size: 14px; }.ending-credits ol { margin: 0; padding: 0; list-style: none; }.ending-credits li { display: grid; grid-template-columns: 55px 1fr; gap: 25px; padding: 29px 0; border-top: 1px solid #a69ba3; }.ending-credits li:last-child { border-bottom: 1px solid #a69ba3; }.ending-credits li span { color: #9a5271; font-style: italic; }.ending-credits li p { margin: 0; font-size: 19px; line-height: 1.65; }

.novel-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 30px; padding: 70px clamp(20px, 6vw, 95px); }.novel-footer > a:not(.title-screen) { display: flex; flex-direction: column; gap: 9px; color: inherit; text-decoration: none; }.novel-footer > a:last-child { text-align: right; }.novel-footer small { color: #746b7b; font: 9px Arial, sans-serif; letter-spacing: .13em; }.novel-footer strong { font-size: 17px; font-weight: 400; }.title-screen { padding: 12px 22px; border: 1px solid #6b6070; color: inherit; font: 9px Arial, sans-serif; letter-spacing: .17em; text-decoration: none; }

@keyframes slow-scene { from { transform: scale(1.1); } to { transform: scale(1.02); } } @keyframes next { 50% { transform: translateY(5px); opacity: .4; } } @keyframes path { to { stroke-dashoffset: -140; } }
@media (max-width: 700px) {
  .novel-hero { min-height: 850px; }.novel-hero nav { grid-template-columns: 1fr auto; height: 68px; margin: 0 18px; }.novel-hero nav span:last-child { display: none; }.title-card { top: 17%; left: 18px; right: 18px; }.title-card h1 { font-size: 63px; }.title-card > span { margin: 26px 0 0; font-size: 16px; }.dialogue-box { right: 18px; bottom: 65px; width: calc(100% - 36px); padding: 32px 24px 25px; box-sizing: border-box; }.dialogue-box p { font-size: 14px; }.scene-count { display: none; }
  .credits-strip { grid-template-columns: 1fr; padding: 1px 18px; }
  .story-conflict { grid-template-columns: 1fr; padding: 90px 18px; }.story-conflict aside { display: none; }.story-conflict h2,.story-solution h2 { font-size: 45px; }.story-conflict blockquote { margin-top: 25px; font-size: 21px; }
  .story-solution { grid-template-columns: 1fr; padding: 90px 18px; }.save-slots { margin-top: 35px; }.save-slots article { grid-template-columns: 48px 1fr; padding: 15px; }.save-slots small { display: none; }
  .choice-sequence { padding: 90px 18px; }.choice-sequence header { grid-template-columns: 1fr; }.choice-sequence h2 { font-size: 45px; }.choice-sequence li { grid-template-columns: 44px 1fr; gap: 14px; padding: 14px; }.choice-sequence li i { display: none; }
  .branch-map { padding: 90px 18px; }.branch-map header { grid-template-columns: 1fr; }.branch-map h2 { font-size: 45px; }.branch-canvas { min-height: auto; }.branch-canvas svg { display: none; }.branch-canvas article { position: relative; inset: auto !important; width: auto; min-height: auto; margin-bottom: 14px; }
  .ending-credits { grid-template-columns: 1fr; padding: 90px 18px; }.ending-title h2 { font-size: 72px; }.ending-credits li { grid-template-columns: 40px 1fr; }.ending-credits li p { font-size: 16px; }
  .novel-footer { grid-template-columns: 1fr 1fr; padding: 50px 18px; }.title-screen { display: none; }
}
@media (prefers-reduced-motion: reduce) { .narrative-page *, .narrative-page *::before, .narrative-page *::after { animation: none !important; transition: none !important; } }
</style>
