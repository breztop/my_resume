<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="defense-page">
    <header class="command-header">
      <RouterLink to="/projects" class="command-back">[ ESC ] RETURN TO ARCHIVE</RouterLink>
      <div class="command-state"><i /> SIMULATION ONLINE</div>
      <span>BUILD {{ project.year }}.{{ project.number }}</span>
    </header>

    <main>
      <section class="battle-hero">
        <div class="hero-copy">
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <span>{{ project.subtitle }}</span>
          <div class="summary-log">
            <b>MISSION BRIEF</b>
            <p>{{ project.summary }}</p>
          </div>
        </div>

        <figure class="battle-map">
          <div class="map-coordinates map-x">X 012 — 086</div>
          <div class="map-coordinates map-y">Y 441 — 792</div>
          <img :src="project.cover" :alt="project.coverAlt" />
          <span class="target target-a" aria-hidden="true"><i /></span>
          <span class="target target-b" aria-hidden="true"><i /></span>
          <span class="target target-c" aria-hidden="true"><i /></span>
          <figcaption><b>LIVE MAP</b><span>{{ project.visualLabel }}</span></figcaption>
        </figure>

        <aside class="wave-counter" aria-label="项目编号">
          <small>WAVE</small><strong>{{ project.number }}</strong><span>READY</span>
        </aside>
      </section>

      <section class="system-readout" aria-label="项目元信息">
        <article><span>OPERATOR</span><p>{{ project.role }}</p></article>
        <article><span>LOADOUT</span><p>{{ project.stack.join(" + ") }}</p></article>
        <article><span>STATUS</span><p><i /> Modular systems nominal</p></article>
      </section>

      <section class="strategy-brief">
        <header><span>TACTICAL ANALYSIS / 01—02</span><h2>复杂度需要被编队，<br />而不是被堆叠。</h2></header>
        <div class="brief-grid">
          <article class="threat-card">
            <div class="card-head"><span>01</span><b>THREAT DETECTED</b></div>
            <h3>条件分支正在失控</h3>
            <p>{{ project.challenge }}</p>
            <div class="threat-meter" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          </article>
          <article class="plan-card">
            <div class="card-head"><span>02</span><b>COUNTERMEASURE</b></div>
            <h3>以模块组合系统</h3>
            <p>{{ project.solution }}</p>
            <div class="plan-nodes" aria-hidden="true"><i>TOWER</i><i>EVENT</i><i>WAVE</i><i>DATA</i></div>
          </article>
        </div>
      </section>

      <section class="deployment-path">
        <header>
          <div><span>03 / DEPLOYMENT PATH</span><h2>每一次实现，<br />都是一座防御节点。</h2></div>
          <p>系统沿统一事件层流动；内容增长时，不需要拆掉核心路径。</p>
        </header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <span class="node-index">T-{{ String(index + 1).padStart(2, "0") }}</span>
            <div class="turret" aria-hidden="true"><i /><b /></div>
            <p>{{ item }}</p>
          </li>
        </ol>
      </section>
    </main>

    <footer class="command-footer">
      <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><small>← PREVIOUS MISSION</small><strong>{{ previousProject.title }}</strong></RouterLink>
      <RouterLink to="/projects" class="mission-grid" aria-label="全部项目"><i v-for="n in 9" :key="n" /></RouterLink>
      <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><small>NEXT MISSION →</small><strong>{{ nextProject.title }}</strong></RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.defense-page {
  --signal: #d8ff3e;
  --danger: #ff6b38;
  --panel: #141a15;
  min-height: 100vh;
  color: #e8eddf;
  background: #090d0a;
  font-family: "Courier New", ui-monospace, monospace;
}

.command-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 72px;
  padding: 0 clamp(18px, 4vw, 62px);
  border-bottom: 1px solid #52605066;
  color: #899487;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
}
.command-header > :last-child { text-align: right; }
.command-back { color: inherit; text-decoration: none; }.command-back:hover { color: var(--signal); }
.command-state { display: flex; align-items: center; gap: 9px; color: var(--signal); }
.command-state i { width: 6px; height: 6px; background: currentColor; box-shadow: 0 0 12px currentColor; animation: state 1.2s steps(2) infinite; }

main { overflow: hidden; }
.battle-hero {
  position: relative;
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  gap: clamp(40px, 7vw, 110px);
  max-width: 1500px;
  min-height: 800px;
  margin: 0 auto;
  padding: 110px clamp(18px, 5vw, 80px) 130px;
  background-image: linear-gradient(#91a1940b 1px, transparent 1px), linear-gradient(90deg, #91a1940b 1px, transparent 1px);
  background-size: 34px 34px;
}
.hero-copy { position: relative; z-index: 2; align-self: center; }
.hero-copy > p { margin: 0 0 26px; color: var(--signal); font-size: 10px; font-weight: 700; letter-spacing: .24em; }
.hero-copy h1 { margin: 0; font-family: Impact, "Arial Narrow", sans-serif; font-size: clamp(72px, 9vw, 136px); font-weight: 900; line-height: .82; letter-spacing: -.04em; text-transform: uppercase; }
.hero-copy > span { display: block; margin-top: 28px; color: #a9b3a7; font: 700 15px/1.6 Arial, sans-serif; }
.summary-log { max-width: 560px; margin-top: 70px; padding: 24px 28px; border-left: 3px solid var(--signal); background: #121813dd; box-shadow: 18px 18px 0 #000; }
.summary-log b { color: var(--signal); font-size: 9px; letter-spacing: .2em; }
.summary-log p { margin: 14px 0 0; color: #b9c1b7; font: 14px/1.8 Arial, sans-serif; }

.battle-map { position: relative; align-self: center; margin: 0; padding: 18px; border: 1px solid #4d604e; background: #172018; clip-path: polygon(8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%, 0 8%); box-shadow: 0 0 0 12px #0d120e, 0 0 0 13px #273628; transform: perspective(1200px) rotateY(-6deg) rotateX(3deg); }
.battle-map::after { position: absolute; inset: 18px; content: ""; pointer-events: none; background: repeating-linear-gradient(0deg, transparent 0 4px, rgb(0 0 0 / 8%) 5px); }
.battle-map img { display: block; width: 100%; aspect-ratio: 1.25; object-fit: cover; filter: sepia(.14) saturate(.8) contrast(1.15); }
.battle-map figcaption { display: flex; justify-content: space-between; padding: 14px 2px 2px; color: #889889; font-size: 8px; letter-spacing: .13em; }
.battle-map figcaption b { color: var(--signal); }
.map-coordinates { position: absolute; z-index: 3; color: #718273; font-size: 8px; letter-spacing: .16em; }.map-x { top: -20px; left: 20%; }.map-y { top: 30%; right: -48px; transform: rotate(90deg); }
.target { position: absolute; z-index: 4; display: grid; place-items: center; width: 35px; height: 35px; border: 1px solid var(--danger); border-radius: 50%; animation: lock 2.2s ease-in-out infinite; }.target i { width: 5px; height: 5px; background: var(--danger); box-shadow: 0 0 10px var(--danger); }.target-a { top: 32%; left: 35%; }.target-b { top: 59%; left: 68%; animation-delay: -.8s; }.target-c { top: 21%; left: 74%; animation-delay: -1.4s; }
.wave-counter { position: absolute; right: clamp(18px, 2vw, 30px); bottom: 60px; display: flex; flex-direction: column; align-items: center; padding: 14px; border: 1px solid #506050; background: #111712; }
.wave-counter small, .wave-counter span { color: #798478; font-size: 7px; letter-spacing: .16em; }.wave-counter strong { color: var(--signal); font: 50px/.95 Impact, sans-serif; }

.system-readout { display: grid; grid-template-columns: 1.2fr 1.2fr .6fr; max-width: 1500px; margin: 0 auto; padding: 0 clamp(18px, 5vw, 80px) 90px; }
.system-readout article { min-height: 120px; padding: 24px; border: 1px solid #3d493e; border-right: 0; }.system-readout article:last-child { border-right: 1px solid #3d493e; }
.system-readout span { color: #727d71; font-size: 8px; font-weight: 700; letter-spacing: .2em; }.system-readout p { margin: 18px 0 0; color: #d2dbce; font: 12px/1.65 Arial, sans-serif; }.system-readout p i { display: inline-block; width: 6px; height: 6px; margin-right: 8px; background: var(--signal); }

.strategy-brief { padding: 130px clamp(18px, 6vw, 100px); color: #11140f; background: #d9ded2; }
.strategy-brief > header { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; max-width: 1300px; margin: 0 auto 70px; }.strategy-brief > header span { font-size: 9px; font-weight: 700; letter-spacing: .2em; }.strategy-brief h2 { margin: 0; font: 800 clamp(42px, 5vw, 74px)/.98 Arial, sans-serif; letter-spacing: -.055em; }
.brief-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; max-width: 1300px; margin: 0 auto; }
.brief-grid article { position: relative; min-height: 470px; padding: 40px; overflow: hidden; }.threat-card { color: #f3e5dd; background: #381b12; }.plan-card { background: #f2f5ed; border: 1px solid #929b8d; }
.card-head { display: flex; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid currentColor; font-size: 9px; letter-spacing: .17em; opacity: .65; }.brief-grid h3 { max-width: 440px; margin: 70px 0 26px; font: 800 40px/1 Arial, sans-serif; letter-spacing: -.04em; }.brief-grid article > p { max-width: 560px; margin: 0; font: 15px/1.9 Arial, sans-serif; opacity: .82; }
.threat-meter { position: absolute; right: 34px; bottom: 32px; display: flex; align-items: end; gap: 7px; height: 64px; }.threat-meter i { width: 8px; height: 25%; background: var(--danger); }.threat-meter i:nth-child(2),.threat-meter i:nth-child(5) { height: 55%; }.threat-meter i:nth-child(3),.threat-meter i:nth-child(6) { height: 85%; }.threat-meter i:nth-child(4) { height: 100%; }
.plan-nodes { position: absolute; right: 28px; bottom: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }.plan-nodes i { display: grid; place-items: center; width: 62px; height: 38px; border: 1px solid #2e4927; color: #2e4927; font-size: 7px; font-style: normal; }

.deployment-path { position: relative; padding: 140px clamp(18px, 6vw, 100px); background: #0b100c; }
.deployment-path header { display: grid; grid-template-columns: 1.3fr .7fr; gap: 70px; max-width: 1300px; margin: 0 auto 110px; }.deployment-path header span { color: var(--signal); font-size: 9px; font-weight: 700; letter-spacing: .2em; }.deployment-path h2 { margin: 24px 0 0; font: 800 clamp(45px, 5.5vw, 78px)/.98 Arial, sans-serif; letter-spacing: -.055em; }.deployment-path header > p { align-self: end; max-width: 370px; margin: 0; color: #8e9a8c; font: 14px/1.8 Arial, sans-serif; }
.deployment-path ol { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1300px; margin: 0 auto; padding: 0; list-style: none; }.deployment-path ol::before { position: absolute; top: 76px; left: 6%; right: 6%; height: 2px; content: ""; background: repeating-linear-gradient(90deg, #5b6e5b 0 7px, transparent 7px 13px); }
.deployment-path li { position: relative; min-height: 250px; padding: 0 20px; text-align: center; }.node-index { display: block; color: #728172; font-size: 8px; letter-spacing: .15em; }.turret { position: relative; z-index: 2; display: grid; place-items: center; width: 84px; height: 84px; margin: 28px auto; border: 1px solid #5d6e5d; background: #101611; transform: rotate(45deg); }.turret i { display: block; width: 34px; height: 34px; border: 2px solid var(--signal); border-radius: 50%; }.turret b { position: absolute; width: 28px; height: 4px; background: var(--signal); transform: rotate(-45deg) translateX(18px); transform-origin: left center; }.deployment-path li p { margin: 0; color: #c0c9bd; font: 13px/1.65 Arial, sans-serif; }

.command-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 30px; padding: 60px clamp(18px, 5vw, 80px); border-top: 1px solid #374238; background: #090d0a; }.command-footer > a:not(.mission-grid) { display: flex; flex-direction: column; gap: 7px; color: white; text-decoration: none; }.command-footer > a:last-child { text-align: right; }.command-footer small { color: #778176; font-size: 8px; letter-spacing: .15em; }.command-footer strong { font: 700 14px Arial, sans-serif; }.mission-grid { display: grid; grid-template-columns: repeat(3, 4px); gap: 3px; padding: 14px; border: 1px solid #3c483d; }.mission-grid i { width: 4px; height: 4px; background: var(--signal); }

@keyframes state { 50% { opacity: .25; } }
@keyframes lock { 50% { transform: scale(1.25); opacity: .45; } }

@media (max-width: 700px) {
  .command-header { grid-template-columns: 1fr auto; height: 64px; }.command-state { display: none; }
  .battle-hero { grid-template-columns: 1fr; min-height: 0; padding: 76px 18px 80px; }.hero-copy h1 { font-size: 68px; }.summary-log { margin-top: 44px; }.battle-map { margin: 0 10px; transform: none; }.wave-counter { display: none; }
  .system-readout { grid-template-columns: 1fr; padding: 0 18px 70px; }.system-readout article { min-height: auto; border-right: 1px solid #3d493e; border-bottom: 0; }.system-readout article:last-child { border-bottom: 1px solid #3d493e; }
  .strategy-brief { padding: 86px 18px; }.strategy-brief > header { grid-template-columns: 1fr; }.strategy-brief h2 { font-size: 44px; }.brief-grid { grid-template-columns: 1fr; }.brief-grid article { min-height: 430px; padding: 28px; }.brief-grid h3 { margin-top: 50px; font-size: 34px; }
  .deployment-path { padding: 90px 18px; }.deployment-path header { grid-template-columns: 1fr; margin-bottom: 70px; }.deployment-path h2 { font-size: 46px; }.deployment-path ol { grid-template-columns: 1fr; }.deployment-path ol::before { top: 0; bottom: 0; left: 61px; right: auto; width: 2px; height: auto; background: repeating-linear-gradient(0deg, #5b6e5b 0 7px, transparent 7px 13px); }.deployment-path li { display: grid; grid-template-columns: 34px 84px 1fr; align-items: center; gap: 10px; min-height: 140px; padding: 0; text-align: left; }.turret { margin: 0; transform: rotate(45deg) scale(.72); }.deployment-path li p { padding-left: 8px; }
  .command-footer { grid-template-columns: 1fr 1fr; }.mission-grid { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .defense-page *, .defense-page *::before, .defense-page *::after { animation: none !important; transition: none !important; }
}
</style>
