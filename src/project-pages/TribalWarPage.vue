<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="war-page">
    <header class="war-hero">
      <nav>
        <RouterLink to="/projects">← 返回项目营地</RouterLink>
        <span>战役卷宗 {{ project.number }} · {{ project.year }}</span>
      </nav>

      <div class="title-seal" aria-hidden="true"><span>部</span></div>
      <div class="hero-copy">
        <p>{{ project.kicker }}</p>
        <h1>{{ project.title }}</h1>
        <h2>{{ project.subtitle }}</h2>
      </div>

      <figure class="war-map">
        <img :src="project.cover" :alt="project.coverAlt" />
        <figcaption><span>FIELD RECORD / {{ project.visualLabel }}</span><b>争夺核心</b></figcaption>
      </figure>

      <div class="hero-summary">
        <span>战役摘要</span>
        <p>{{ project.summary }}</p>
      </div>
    </header>

    <main>
      <section class="war-meta">
        <div><span>统筹职责</span><p>{{ project.role }}</p></div>
        <div><span>战术工具</span><p>{{ project.stack.join(" · ") }}</p></div>
      </section>

      <section class="field-report">
        <header><span>第一卷</span><h2>战场为何会<br />变得不可控？</h2></header>
        <div class="report-body">
          <article>
            <span>敌情</span>
            <p>{{ project.challenge }}</p>
          </article>
          <i aria-hidden="true">×</i>
          <article>
            <span>阵法</span>
            <p>{{ project.solution }}</p>
          </article>
        </div>
      </section>

      <section class="battle-lines">
        <header><span>第二卷 / 作战节点</span><h2>让每一层职责守住自己的阵线</h2></header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <b>{{ String(index + 1).padStart(2, "0") }}</b>
            <p>{{ item }}</p>
          </li>
        </ol>
      </section>

      <section v-if="project.modules?.length" class="formations">
        <header>
          <span>第三卷 / 六部阵型</span>
          <h2>战役不是一团脚本，<br />而是一支有编制的军队。</h2>
        </header>
        <div class="formation-grid">
          <article v-for="(module, index) in project.modules" :key="module.name">
            <div class="unit-mark" aria-hidden="true"><i v-for="n in index + 3" :key="n" /></div>
            <span>DIVISION {{ String(index + 1).padStart(2, "0") }}</span>
            <h3>{{ module.name }}</h3>
            <p>{{ module.detail }}</p>
          </article>
        </div>
      </section>

      <section v-if="project.roadmap?.length" class="campaign-route">
        <header><span>第四卷 / 行军路线</span><h2>从一场交锋，推进到一场战役。</h2></header>
        <div class="route">
          <article v-for="(phase, index) in project.roadmap" :key="phase.label">
            <div class="route-stop"><b>{{ index + 1 }}</b><i /></div>
            <span>{{ phase.label }}</span>
            <h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="war-code">
        <div class="code-title"><span>第五卷</span><h2>战场军规</h2><i aria-hidden="true">令</i></div>
        <ol>
          <li v-for="(principle, index) in project.principles" :key="principle"><span>其 {{ index + 1 }}</span><p>{{ principle }}</p></li>
        </ol>
      </section>
    </main>

    <footer class="war-footer">
      <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><small>← 上一份卷宗</small><strong>{{ previousProject.title }}</strong></RouterLink>
      <RouterLink to="/projects" class="camp-button">返回营地</RouterLink>
      <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><small>下一份卷宗 →</small><strong>{{ nextProject.title }}</strong></RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.war-page {
  --paper: #d7c49b;
  --ink: #231e17;
  --blood: #8f2f23;
  min-height: 100vh;
  color: var(--ink);
  background: #17130f;
  font-family: Georgia, "Songti SC", "SimSun", serif;
}
.war-hero { position: relative; min-height: 1040px; padding: 0 clamp(20px, 6vw, 96px) 100px; overflow: hidden; isolation: isolate; background: var(--paper); }
.war-hero::before { position: absolute; inset: 0; z-index: -1; content: ""; opacity: .32; background: radial-gradient(circle at 12% 24%, #82673b55 0 1px, transparent 2px), radial-gradient(circle at 75% 68%, #523f2555 0 1px, transparent 2px), linear-gradient(97deg, transparent 48%, #735e3d22 50%, transparent 52%); background-size: 25px 23px, 31px 33px, 100% 100%; mix-blend-mode: multiply; }
.war-hero nav { display: flex; justify-content: space-between; align-items: center; height: 86px; border-bottom: 1px solid #6a583b; font-size: 11px; letter-spacing: .12em; }
.war-hero nav a { color: inherit; text-decoration: none; }
.title-seal { position: absolute; top: 135px; right: 8vw; display: grid; place-items: center; width: 90px; height: 90px; border: 4px double var(--blood); color: var(--blood); transform: rotate(8deg); opacity: .8; }
.title-seal span { font-size: 47px; font-weight: 800; }
.hero-copy { position: relative; z-index: 3; padding-top: 85px; }
.hero-copy > p { margin: 0 0 20px; color: var(--blood); font: 700 10px ui-monospace, monospace; letter-spacing: .25em; }
.hero-copy h1 { margin: 0; font-size: clamp(100px, 15vw, 220px); font-weight: 900; line-height: .72; letter-spacing: -.1em; }
.hero-copy h2 { max-width: 560px; margin: 42px 0 0 14vw; font-size: clamp(19px, 2vw, 30px); font-weight: 400; line-height: 1.45; }
.war-map { position: relative; width: min(900px, 72vw); margin: 70px 0 0 auto; padding: 13px; background: #30281c; transform: rotate(-1.4deg); box-shadow: -44px 42px 0 #b49b6c; }
.war-map::after { position: absolute; inset: 13px; content: ""; border: 1px solid #d7c49b88; box-shadow: inset 0 0 100px #1b120d; pointer-events: none; }
.war-map img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; filter: sepia(.45) contrast(1.07) saturate(.75); }
.war-map figcaption { display: flex; justify-content: space-between; padding: 12px 5px 1px; color: #c9b58b; font: 700 9px ui-monospace, monospace; letter-spacing: .13em; }
.war-map figcaption b { color: #f8ddaa; font-family: inherit; }
.hero-summary { position: absolute; left: clamp(20px, 6vw, 96px); bottom: 85px; z-index: 3; width: min(450px, 34vw); padding: 30px 30px 30px 0; background: linear-gradient(90deg, var(--paper) 85%, transparent); }
.hero-summary span, .war-meta span, .report-body article > span { color: var(--blood); font-size: 11px; font-weight: 700; letter-spacing: .22em; }
.hero-summary p { margin: 17px 0 0; font-size: 15px; line-height: 1.9; }

main { overflow: hidden; background: var(--paper); }
.war-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; padding: 0 clamp(20px, 6vw, 96px) 100px; background: #493c28; }
.war-meta div { padding: 32px; background: #201a14; color: #ead9b5; }.war-meta span { color: #bd7c61; }.war-meta p { margin: 13px 0 0; font-size: 13px; line-height: 1.7; }

.field-report { padding: 150px clamp(20px, 8vw, 130px); }
.field-report > header { display: grid; grid-template-columns: .6fr 1.4fr; gap: 50px; align-items: start; margin-bottom: 90px; }.field-report > header span, .battle-lines header > span, .formations header > span, .campaign-route header > span { color: var(--blood); font-size: 11px; font-weight: 700; letter-spacing: .2em; }.field-report h2 { margin: 0; font-size: clamp(51px, 7vw, 96px); line-height: .95; letter-spacing: -.055em; }
.report-body { display: grid; grid-template-columns: 1fr 60px 1fr; gap: 6vw; align-items: center; }.report-body article { padding: 0 0 40px; border-bottom: 2px solid #332a1e; }.report-body article p { margin: 30px 0 0; font-size: 16px; line-height: 2; }.report-body > i { color: var(--blood); font-size: 66px; font-style: normal; text-align: center; }

.battle-lines { padding: 130px clamp(20px, 6vw, 96px); color: #eadbbd; background: #211a14; }
.battle-lines header { display: flex; justify-content: space-between; align-items: end; gap: 30px; padding-bottom: 50px; border-bottom: 1px solid #756348; }.battle-lines header > span { color: #c67d63; }.battle-lines h2 { max-width: 700px; margin: 0; font-size: clamp(42px, 5vw, 72px); line-height: 1; text-align: right; }
.battle-lines ol { margin: 0; padding: 0; list-style: none; }.battle-lines li { display: grid; grid-template-columns: 120px 1fr; align-items: center; min-height: 115px; border-bottom: 1px solid #594b37; }.battle-lines li b { color: #9b8261; font: 400 28px Georgia, serif; }.battle-lines li p { max-width: 850px; margin: 0; font-size: 19px; line-height: 1.55; }.battle-lines li:hover p { color: #ffb097; }

.formations { padding: 150px clamp(20px, 6vw, 96px); background: #c9b484; }
.formations header { display: grid; grid-template-columns: .65fr 1.35fr; gap: 50px; margin-bottom: 80px; }.formations h2 { margin: 0; font-size: clamp(44px, 5.5vw, 78px); line-height: 1.05; letter-spacing: -.04em; }
.formation-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #5f4e34; border-left: 1px solid #5f4e34; }.formation-grid article { position: relative; min-height: 340px; padding: 32px; border-right: 1px solid #5f4e34; border-bottom: 1px solid #5f4e34; }.formation-grid article > span { font: 700 9px ui-monospace, monospace; letter-spacing: .15em; }.formation-grid h3 { margin: 70px 0 20px; font-size: 28px; }.formation-grid p { margin: 0; color: #53452f; font-size: 14px; line-height: 1.8; }.unit-mark { position: absolute; top: 30px; right: 30px; display: flex; flex-wrap: wrap; gap: 3px; width: 45px; }.unit-mark i { display: block; width: 7px; height: 7px; border-radius: 50%; background: var(--blood); }

.campaign-route { padding: 150px clamp(20px, 8vw, 130px); background: #e4d5b4; }
.campaign-route header { max-width: 900px; margin-bottom: 100px; }.campaign-route h2 { margin: 24px 0 0; font-size: clamp(48px, 6vw, 84px); line-height: 1; }
.route { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }.route::before { position: absolute; top: 48px; left: 20%; right: 20%; height: 2px; content: ""; background: repeating-linear-gradient(90deg, var(--blood) 0 5px, transparent 5px 11px); }.route article { position: relative; padding-top: 100px; }.route-stop { position: absolute; top: 14px; left: 50%; z-index: 2; display: grid; place-items: center; width: 68px; height: 68px; border: 2px solid var(--blood); border-radius: 50%; background: #e4d5b4; transform: translateX(-50%); }.route-stop b { color: var(--blood); font-size: 24px; }.route-stop i { position: absolute; inset: -9px; border: 1px solid #8f2f2366; border-radius: 50%; }.route article > span { color: var(--blood); font: 700 10px ui-monospace, monospace; letter-spacing: .16em; }.route h3 { margin: 13px 0 25px; font-size: 28px; line-height: 1.25; }.route ul { margin: 0; padding-left: 18px; color: #5d503b; font-size: 14px; line-height: 1.9; }

.war-code { display: grid; grid-template-columns: .6fr 1.4fr; gap: 9vw; padding: 140px clamp(20px, 8vw, 130px); color: #e5d5b5; background: #7b291f; }
.code-title span { font-size: 10px; letter-spacing: .2em; }.code-title h2 { margin: 16px 0 40px; font-size: clamp(55px, 7vw, 96px); line-height: .9; }.code-title i { display: grid; place-items: center; width: 88px; height: 88px; border: 3px double #e5d5b5; font-size: 43px; font-style: normal; transform: rotate(-7deg); opacity: .55; }
.war-code ol { margin: 0; padding: 0; list-style: none; }.war-code li { display: grid; grid-template-columns: 70px 1fr; gap: 30px; padding: 30px 0; border-top: 1px solid #e4ceb750; }.war-code li:last-child { border-bottom: 1px solid #e4ceb750; }.war-code li span { font-size: 11px; letter-spacing: .14em; }.war-code li p { margin: 0; font-size: 20px; line-height: 1.65; }

.war-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 30px; padding: 70px clamp(20px, 6vw, 96px); color: #decba5; background: #17130f; }.war-footer > a:not(.camp-button) { display: flex; flex-direction: column; gap: 8px; color: inherit; text-decoration: none; }.war-footer > a:last-child { text-align: right; }.war-footer small { color: #887860; font-size: 10px; }.war-footer strong { font-size: 17px; }.camp-button { padding: 13px 23px; border: 1px solid #8e7955; color: inherit; font-size: 12px; text-decoration: none; }

@media (max-width: 700px) {
  .war-hero { min-height: auto; padding: 0 18px 80px; }.war-hero nav { height: 70px; font-size: 9px; }.title-seal { top: 110px; right: 18px; width: 56px; height: 56px; }.title-seal span { font-size: 28px; }.hero-copy { padding-top: 68px; }.hero-copy h1 { font-size: 88px; }.hero-copy h2 { margin: 30px 0 0; font-size: 18px; }.war-map { width: calc(100% - 18px); margin-top: 55px; box-shadow: -18px 18px 0 #b49b6c; }.hero-summary { position: static; width: auto; margin-top: 60px; padding: 0; background: none; }
  .war-meta { grid-template-columns: 1fr; padding: 0 18px 75px; }
  .field-report { padding: 90px 18px; }.field-report > header { grid-template-columns: 1fr; }.field-report h2 { font-size: 52px; }.report-body { grid-template-columns: 1fr; }.report-body > i { transform: rotate(45deg); }
  .battle-lines { padding: 90px 18px; }.battle-lines header { display: block; }.battle-lines h2 { margin-top: 25px; font-size: 43px; text-align: left; }.battle-lines li { grid-template-columns: 60px 1fr; }.battle-lines li p { font-size: 15px; }
  .formations { padding: 90px 18px; }.formations header { grid-template-columns: 1fr; }.formations h2 { font-size: 42px; }.formation-grid { grid-template-columns: 1fr; }.formation-grid article { min-height: 270px; }
  .campaign-route { padding: 90px 18px; }.campaign-route h2 { font-size: 47px; }.route { grid-template-columns: 1fr; gap: 55px; }.route::before { top: 0; bottom: 0; left: 33px; right: auto; width: 2px; height: auto; background: repeating-linear-gradient(0deg, var(--blood) 0 5px, transparent 5px 11px); }.route article { padding: 0 0 0 90px; }.route-stop { top: 0; left: 0; transform: none; }
  .war-code { grid-template-columns: 1fr; padding: 90px 18px; }.code-title i { display: none; }.war-code li { grid-template-columns: 48px 1fr; gap: 15px; }.war-code li p { font-size: 17px; }
  .war-footer { grid-template-columns: 1fr 1fr; padding: 55px 18px; }.camp-button { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .war-page *, .war-page *::before, .war-page *::after { animation: none !important; transition: none !important; }
}
</style>
