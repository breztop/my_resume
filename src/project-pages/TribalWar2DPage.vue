<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="lane-page">
    <header class="game-hud">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <div class="core-health"><span>CORE</span><i><b /></i><strong>100%</strong></div>
      <div class="hud-score">STAGE {{ project.number }} <span>{{ project.year }}</span></div>
    </header>

    <div class="case-content">
      <section class="lane-hero">
        <div class="hero-sky" aria-hidden="true"><i /><i /><i /></div>
        <div class="hero-title">
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}<sup>2D</sup></h1>
          <ProjectByline :project="project" />
          <strong>{{ project.subtitle }}</strong>
        </div>
        <figure>
          <ProjectImage :project="project" priority />
          <div class="battle-overlay" aria-hidden="true">
            <span class="camp camp-left">A</span><i class="lane-line" /><b class="energy-core">◆</b><span class="camp camp-right">B</span>
          </div>
          <figcaption><span>◉ LIVE BATTLEFIELD</span><span>{{ project.visualLabel }}</span></figcaption>
        </figure>
        <div class="press-start">SCROLL TO START ↓</div>
      </section>

      <section class="player-card">
        <div class="portrait" aria-hidden="true"><span>DEV</span><i /></div>
        <div><span>PLAYER / ROLE</span><p>{{ project.role }}</p></div>
        <div><span>ITEM SLOTS / STACK</span><p>{{ project.stack.join(" + ") }}</p></div>
      </section>

      <section class="mission-text">
        <span class="mission-label">MISSION STORY</span>
        <p>{{ project.summary }}</p>
      </section>

      <section class="versus-section">
        <article class="enemy-side">
          <div class="side-tag">ENEMY LOGIC / 01</div>
          <h2>屏幕越挤，<br />规则越乱。</h2>
          <p>{{ project.challenge }}</p>
          <div class="enemy-bar"><span>COMPLEXITY</span><i><b /></i></div>
        </article>
        <div class="versus-mark" aria-hidden="true">VS</div>
        <article class="player-side">
          <div class="side-tag">PLAYER STRATEGY / 02</div>
          <h2>分层战斗，<br />锁定焦点。</h2>
          <p>{{ project.solution }}</p>
          <div class="enemy-bar"><span>READABILITY</span><i><b /></i></div>
        </article>
      </section>

      <section class="achievement-list">
        <header><span>03 / ACHIEVEMENTS</span><h2>解锁战场能力</h2><b>{{ project.highlights.length }}/{{ project.highlights.length }}</b></header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <i aria-hidden="true">★</i>
            <span>ACHIEVEMENT {{ String(index + 1).padStart(2, "0") }}</span>
            <p>{{ item }}</p>
            <b>UNLOCKED</b>
          </li>
        </ol>
      </section>

      <section v-if="project.modules?.length" class="inventory">
        <header><span>04 / LOADOUT</span><h2>模块背包</h2><p>每个槽位只负责一种战场能力。</p></header>
        <div class="inventory-grid">
          <article v-for="(module, index) in project.modules" :key="module.name">
            <div class="item-icon" aria-hidden="true"><span>{{ index + 1 }}</span><i /></div>
            <small>SLOT {{ String(index + 1).padStart(2, "0") }}</small>
            <h3>{{ module.name }}</h3>
            <p>{{ module.detail }}</p>
          </article>
        </div>
      </section>

      <section v-if="project.roadmap?.length" class="level-select">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <header><span>05 / CAMPAIGN</span><h2>选择下一张地图</h2></header>
        <div class="levels">
          <article v-for="(phase, index) in project.roadmap" :key="phase.label">
            <div class="level-preview"><i v-for="n in 5" :key="n" /><b>{{ index + 1 }}</b></div>
            <span>{{ phase.label }} / STAGE {{ index + 1 }}</span>
            <h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="rule-screen">
        <p>06 / GAME RULES</p>
        <h2>胜利条件</h2>
        <ol><li v-for="(principle, index) in project.principles" :key="principle"><b>{{ index + 1 }}P</b><span>{{ principle }}</span></li></ol>
      </section>
    </div>


  </article>
</template>

<style scoped>
.lane-page {
  --gold: #ffd85a;
  --cyan: #62efff;
  --pink: #ff5c92;
  min-height: 100vh;
  color: #f5f7ff;
  background: #171027;
  font-family: "Courier New", ui-monospace, monospace;
  image-rendering: pixelated;
}
.game-hud { position: relative; z-index: 10; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 70px; padding: 0 clamp(16px, 4vw, 60px); border-bottom: 4px solid #090612; background: #271b3d; box-shadow: 0 4px 0 #58447a; font-size: 10px; font-weight: 800; letter-spacing: .1em; }
.game-hud a { color: var(--gold); text-decoration: none; }.hud-score { text-align: right; }.hud-score span { margin-left: 14px; color: #897b9c; }
.core-health { display: flex; align-items: center; gap: 10px; color: #a89cb8; }.core-health i { display: block; width: 170px; height: 10px; padding: 2px; border: 1px solid white; background: #0f0a19; }.core-health b { display: block; width: 100%; height: 100%; background: repeating-linear-gradient(90deg, var(--pink) 0 14px, #ff86ab 14px 16px); animation: charge 2s steps(5) infinite; }.core-health strong { color: white; font-size: 9px; }

.case-content { overflow: hidden; }
.lane-hero { position: relative; min-height: 900px; padding: 100px clamp(16px, 5vw, 78px) 110px; overflow: hidden; background: linear-gradient(#302054 0 62%, #1f1538 62% 69%, #100c1e 69%); }
.hero-sky i { position: absolute; width: 4px; height: 4px; background: white; box-shadow: 13vw 8vh #fff, 25vw 2vh #79e4ff, 39vw 15vh #fff, 57vw 4vh #fff, 71vw 18vh #ffd85a, 84vw 7vh #fff, 92vw 23vh #fff; animation: twinkle 1.8s steps(2) infinite; }.hero-sky i:nth-child(2) { top: 80px; left: 9%; animation-delay: -.6s; }.hero-sky i:nth-child(3) { top: 190px; left: 3%; animation-delay: -1.1s; }
.hero-title { position: relative; z-index: 3; max-width: 1300px; margin: 0 auto; text-align: center; }.hero-title p { margin: 0 0 18px; color: var(--cyan); font-size: 10px; font-weight: 800; letter-spacing: .25em; }.hero-title h1 { margin: 0; color: white; font-family: Impact, "Arial Black", sans-serif; font-size: clamp(85px, 13vw, 190px); line-height:1.1; letter-spacing: -.04em; text-shadow: 7px 7px 0 #0d0917, -3px -3px 0 var(--pink); }.hero-title sup { display: inline-block; margin-left: 15px; color: var(--gold); font: 900 .25em "Courier New", monospace; letter-spacing: 0; text-shadow: 3px 3px 0 #0d0917; transform: translateY(-1.5em); }.hero-title strong { display: block; margin-top: 32px; color: #d3c9df; font-size: 14px; line-height: 1.5; }
.lane-hero figure { position: relative; z-index: 3; width: min(1160px, 90vw); margin: 70px auto 0; border: 8px solid #0d0917; outline: 3px solid #7453a3; background: #0d0917; box-shadow: 18px 18px 0 #0a0711; }.lane-hero figure img { display: block; width: 100%; aspect-ratio: 16 / 7; object-fit: cover; filter: saturate(1.12) contrast(1.05); }.lane-hero figcaption { display: flex; justify-content: space-between; padding: 12px 9px 6px; color: #9a8baa; font-size: 8px; letter-spacing: .12em; }.lane-hero figcaption span:first-child { color: #68ffac; }
.battle-overlay { position: absolute; inset: 0 0 32px; display: flex; align-items: center; padding: 0 4%; pointer-events: none; }.camp { display: grid; place-items: center; width: 38px; height: 50px; border: 3px solid white; color: white; background: #2e1b4d; font-weight: 900; box-shadow: 4px 4px 0 #0b0712; }.lane-line { flex: 1; height: 3px; background: repeating-linear-gradient(90deg, var(--gold) 0 9px, transparent 9px 15px); }.energy-core { display: grid; place-items: center; width: 58px; height: 58px; color: var(--cyan); border: 3px solid var(--cyan); background: #15102a; box-shadow: 0 0 24px #62efff99; animation: core 1.5s steps(4) infinite; }
.press-start { margin-top: 75px; color: var(--gold); font-size: 10px; font-weight: 800; letter-spacing: .18em; text-align: center; animation: blink 1s steps(2) infinite; }

.player-card { display: grid; grid-template-columns: 110px 1fr 1fr; align-items: center; gap: 30px; max-width: 1200px; margin: -44px auto 0; padding: 25px 35px; border: 4px solid #0c0814; outline: 2px solid #5c457e; background: #2a1d40; box-shadow: 9px 9px 0 #0b0712; transform: translateY(50%); }.portrait { position: relative; display: grid; place-items: center; width: 82px; height: 82px; border: 3px solid var(--cyan); color: var(--cyan); background: #120c20; }.portrait span { font-size: 18px; font-weight: 900; }.portrait i { position: absolute; right: 5px; bottom: 5px; width: 8px; height: 8px; background: #68ffac; }.player-card > div:not(.portrait) { padding-left: 25px; border-left: 1px dashed #6d5b82; }.player-card div > span { color: var(--gold); font-size: 8px; font-weight: 800; letter-spacing: .16em; }.player-card p { margin: 10px 0 0; color: #d5ccdf; font: 12px/1.65 Arial, sans-serif; }
.mission-text { padding: 170px max(18px, calc((100vw - 1050px) / 2)) 110px; background: #110c1d; }.mission-label { color: var(--pink); font-size: 9px; font-weight: 800; letter-spacing: .2em; }.mission-text p { margin: 26px 0 0; font: 700 clamp(22px, 2.7vw, 38px)/1.65 Arial, sans-serif; }

.versus-section { display: grid; grid-template-columns: 1fr 90px 1fr; align-items: stretch; padding: 120px clamp(16px, 5vw, 78px); background: #e8e4ee; color: #20172c; }.versus-section article { min-height: 560px; padding: 55px; border: 4px solid #1b1229; box-shadow: 10px 10px 0 #1b1229; }.enemy-side { background: #ffb14d; }.player-side { background: #6de5de; }.side-tag { font-size: 9px; font-weight: 900; letter-spacing: .16em; }.versus-section h2 { margin: 80px 0 28px; font: 900 clamp(43px, 5vw, 70px)/.95 Arial, sans-serif; letter-spacing: -.05em; }.versus-section article > p { margin: 0; font: 15px/1.9 Arial, sans-serif; }.versus-mark { position: relative; z-index: 3; align-self: center; display: grid; place-items: center; width: 100px; height: 100px; margin-left: -5px; border: 5px solid #1b1229; border-radius: 50%; color: white; background: var(--pink); font: 900 36px Impact, sans-serif; box-shadow: 7px 7px 0 #1b1229; transform: rotate(-8deg); }.enemy-bar { margin-top: 45px; }.enemy-bar span { display: block; margin-bottom: 8px; font-size: 8px; font-weight: 900; }.enemy-bar i { display: block; height: 14px; border: 2px solid #1b1229; padding: 2px; }.enemy-bar b { display: block; width: 86%; height: 100%; background: #1b1229; }.player-side .enemy-bar b { width: 96%; }

.achievement-list { padding: 130px clamp(16px, 7vw, 110px); background: #181027; }.achievement-list header { display: grid; grid-template-columns: 1fr 2fr auto; align-items: end; gap: 30px; margin-bottom: 70px; }.achievement-list header span { color: var(--cyan); font-size: 9px; font-weight: 800; letter-spacing: .18em; }.achievement-list h2 { margin: 0; font: 900 clamp(48px, 6vw, 80px)/1 Arial, sans-serif; letter-spacing: -.05em; }.achievement-list header > b { color: var(--gold); font-size: 20px; }
.achievement-list ol { margin: 0; padding: 0; list-style: none; }.achievement-list li { display: grid; grid-template-columns: 58px 150px 1fr auto; align-items: center; gap: 24px; min-height: 96px; border-top: 2px solid #554568; }.achievement-list li:last-child { border-bottom: 2px solid #554568; }.achievement-list li > i { display: grid; place-items: center; width: 38px; height: 38px; border: 2px solid var(--gold); color: var(--gold); font-style: normal; transform: rotate(45deg); }.achievement-list li > i::first-letter { transform: rotate(-45deg); }.achievement-list li > span,.achievement-list li > b { color: #8e7da4; font-size: 8px; letter-spacing: .13em; }.achievement-list li > b { color: #69f1a9; }.achievement-list li p { margin: 0; font: 14px/1.55 Arial, sans-serif; }

.inventory { padding: 130px clamp(16px, 6vw, 95px); color: #211a2b; background: #f0d765; }.inventory header { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: end; gap: 30px; margin-bottom: 65px; }.inventory header > span { font-size: 9px; font-weight: 900; letter-spacing: .17em; }.inventory h2 { margin: 0; font: 900 clamp(48px, 6vw, 80px)/1 Arial, sans-serif; letter-spacing: -.05em; }.inventory header > p { margin: 0; font: 14px/1.7 Arial, sans-serif; }.inventory-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }.inventory-grid article { min-height: 320px; padding: 25px; border: 4px solid #211a2b; background: #f8e99d; box-shadow: 7px 7px 0 #211a2b; }.item-icon { position: relative; display: grid; place-items: center; width: 82px; height: 82px; margin-bottom: 40px; border: 3px solid #211a2b; background: var(--pink); }.item-icon span { color: white; font-size: 30px; font-weight: 900; }.item-icon i { position: absolute; inset: 9px; border: 1px dashed white; }.inventory-grid small { font-size: 8px; font-weight: 900; letter-spacing: .16em; }.inventory-grid h3 { margin: 10px 0 16px; font: 900 24px Arial, sans-serif; }.inventory-grid p { margin: 0; font: 13px/1.7 Arial, sans-serif; }

.level-select { padding: 130px clamp(16px, 7vw, 110px); background: #241836; }.level-select header { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 75px; }.level-select header span { color: var(--pink); font-size: 9px; font-weight: 800; letter-spacing: .18em; }.level-select h2 { margin: 0; font: 900 clamp(48px, 6vw, 80px) Arial, sans-serif; letter-spacing: -.05em; }.levels { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }.levels article { padding: 20px 20px 38px; border: 3px solid #76628d; background: #171023; }.level-preview { position: relative; display: flex; align-items: end; justify-content: space-around; height: 180px; margin-bottom: 28px; overflow: hidden; background: linear-gradient(#493263 0 65%, #271c38 65%); }.level-preview::after { position: absolute; bottom: 25%; left: 0; right: 0; height: 3px; content: ""; background: repeating-linear-gradient(90deg, var(--cyan) 0 7px, transparent 7px 13px); }.level-preview i { position: relative; z-index: 2; width: 15px; height: calc(25px + var(--h, 0px)); background: var(--pink); box-shadow: 3px 3px 0 #0d0914; }.level-preview i:nth-child(2) { height: 55px; }.level-preview i:nth-child(3) { height: 35px; }.level-preview i:nth-child(4) { height: 70px; }.level-preview b { position: absolute; top: 20px; right: 20px; color: #ffffff22; font: 900 80px Impact, sans-serif; }.levels article > span { color: var(--gold); font-size: 8px; font-weight: 800; letter-spacing: .16em; }.levels h3 { margin: 13px 0 22px; font: 800 25px/1.2 Arial, sans-serif; }.levels ul { margin: 0; padding-left: 18px; color: #b8abc8; font: 13px/1.8 Arial, sans-serif; }

.rule-screen { padding: 130px max(18px, calc((100vw - 1050px) / 2)); color: #171021; background: var(--cyan); }.rule-screen > p { font-size: 9px; font-weight: 900; letter-spacing: .18em; }.rule-screen h2 { margin: 20px 0 60px; font: 900 clamp(55px, 7vw, 95px)/.9 Arial, sans-serif; letter-spacing: -.06em; }.rule-screen ol { margin: 0; padding: 0; list-style: none; }.rule-screen li { display: grid; grid-template-columns: 70px 1fr; gap: 25px; padding: 28px 0; border-top: 3px solid #171021; font: 700 18px/1.55 Arial, sans-serif; }.rule-screen li:last-child { border-bottom: 3px solid #171021; }.rule-screen li b { font: 900 15px "Courier New", monospace; }

.lane-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 25px; padding: 65px clamp(16px, 5vw, 78px); background: #100a1c; }.lane-footer > a:not(.continue) { display: flex; flex-direction: column; gap: 7px; color: white; text-decoration: none; }.lane-footer > a:last-child { text-align: right; }.lane-footer small { color: #837493; font-size: 8px; letter-spacing: .14em; }.lane-footer strong { font: 700 14px Arial, sans-serif; }.continue { padding: 12px 18px; border: 3px solid var(--gold); color: var(--gold); font-size: 10px; font-weight: 900; text-decoration: none; animation: blink 1s steps(2) infinite; }

@keyframes blink { 50% { opacity: .25; } } @keyframes twinkle { 50% { opacity: .2; } } @keyframes core { 50% { transform: scale(1.12) rotate(45deg); } } @keyframes charge { 50% { width: 92%; } }
@media (max-width:900px) {
  .game-hud { grid-template-columns: 1fr auto; height: 62px; }.core-health { display: none; }
  .lane-hero { min-height: auto; padding: 75px 16px 80px; }.hero-title h1 { font-size: 70px; }.hero-title sup { margin-left: 7px; }.lane-hero figure { width: 100%; margin-top: 50px; border-width: 5px; }.battle-overlay { display: none; }.lane-hero figcaption span:last-child { display: none; }
  .player-card { grid-template-columns: 60px 1fr; gap: 18px; margin: -20px 16px 0; padding: 18px; transform: translateY(40%); }.portrait { width: 58px; height: 58px; }.player-card > div:not(.portrait) { padding-left: 15px; }.player-card > div:last-child { grid-column: 1 / -1; padding: 17px 0 0; border-left: 0; border-top: 1px dashed #6d5b82; }
  .mission-text { padding: 140px 18px 80px; }.mission-text p { font-size: 21px; }
  .versus-section { grid-template-columns: 1fr; padding: 80px 18px; }.versus-section article { min-height: 470px; padding: 30px; }.versus-section h2 { font-size: 43px; margin-top: 60px; }.versus-mark { width: 76px; height: 76px; margin: -14px auto; }
  .achievement-list { padding: 85px 18px; }.achievement-list header { grid-template-columns: 1fr auto; }.achievement-list h2 { grid-column: 1 / -1; grid-row: 2; font-size: 49px; }.achievement-list li { grid-template-columns: 45px 1fr; gap: 15px; padding: 18px 0; }.achievement-list li > span,.achievement-list li > b { display: none; }
  .inventory { padding: 85px 18px; }.inventory header { grid-template-columns: 1fr; }.inventory h2 { font-size: 50px; }.inventory-grid { grid-template-columns: 1fr; }.inventory-grid article { min-height: 280px; }
  .level-select { padding: 85px 18px; }.level-select header { display: block; }.level-select h2 { margin-top: 20px; font-size: 48px; }.levels { grid-template-columns: 1fr; }
  .rule-screen { padding: 85px 18px; }.rule-screen h2 { font-size: 59px; }.rule-screen li { grid-template-columns: 46px 1fr; font-size: 15px; }
  .lane-footer { grid-template-columns: 1fr 1fr; padding: 50px 18px; }.continue { display: none; }
}
@media (prefers-reduced-motion: reduce) { .lane-page *, .lane-page *::before, .lane-page *::after { animation: none !important; transition: none !important; } }

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}

</style>
