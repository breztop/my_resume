<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="table-page">
    <header class="table-header">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <span>TABLE № {{ project.number }}</span>
      <strong>{{ project.year }} / AUTH SERVER</strong>
    </header>

    <div class="case-content">
      <section class="opening">
        <div class="title-card">
          <span class="corner top">A<br />♠</span>
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <p class="subtitle">{{ project.subtitle }}</p>
          <span class="corner bottom">A<br />♠</span>
        </div>
        <div class="opening-copy">
          <p class="deal">THE SERVER DEALS. THE SERVER DECIDES.</p>
          <p class="summary">{{ project.summary }}</p>
          <ProjectByline :project="project" />
          <dl>
            <div><dt>DEALER / ROLE</dt><dd>{{ project.role }}</dd></div>
            <div><dt>RULESET / STACK</dt><dd>{{ project.stack.join(" · ") }}</dd></div>
          </dl>
        </div>
        <figure class="cover-card">
          <ProjectImage :project="project" priority />
          <figcaption>AUTHORITATIVE MATCH / {{ project.year }}</figcaption>
        </figure>
      </section>

      <section class="ruling">
        <header><span>ROUND 01</span><h2>争议进入牌桌，<br />结果离开服务器。</h2></header>
        <div class="ruling-grid">
          <article class="challenge">
            <i>×</i><span>PLAYER CLAIM</span>
            <h3>如果客户端各自相信自己，谁来决定这一回合发生了什么？</h3>
            <p>{{ project.challenge }}</p>
          </article>
          <div class="versus">VS</div>
          <article class="solution">
            <i>✓</i><span>SERVER VERDICT</span>
            <h3>唯一状态、命令校验、确定迁移。</h3>
            <p>{{ project.solution }}</p>
          </article>
        </div>
      </section>

      <section class="hand">
        <header><span>ROUND 02 / THE HAND</span><h2>四张关键牌</h2><p>每个机制都在收窄“结果不一致”的可能性。</p></header>
        <div class="cards">
          <article v-for="(item, index) in project.highlights" :key="item" :class="`card-${index + 1}`">
            <span>{{ ['K','Q','J','10','9','8'][index] || index + 1 }}<br />{{ index % 2 ? '♥' : '♣' }}</span>
            <strong>{{ item }}</strong>
            <small>0{{ index + 1 }} / 机制说明</small>
          </article>
        </div>
      </section>

      <section v-if="project.modules?.length" class="score-sheet">
        <div><span>SCORE SHEET</span><h2>规则模块</h2></div>
        <ol><li v-for="module in project.modules" :key="module.name"><strong>{{ module.name }}</strong><p>{{ module.detail }}</p></li></ol>
      </section>

      <section v-if="project.roadmap?.length" class="rounds">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <article v-for="phase in project.roadmap" :key="phase.label">
          <span>{{ phase.label }}</span><h3>{{ phase.title }}</h3>
          <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
        </article>
      </section>

      <section v-if="project.principles?.length" class="house-rules">
        <h2>HOUSE RULES</h2>
        <p v-for="(principle,index) in project.principles" :key="principle"><b>{{ index + 1 }}</b>{{ principle }}</p>
      </section>
    </div>


  </article>
</template>

<style scoped>
.table-page{--cream:#f2e8d2;--red:#c43c35;--dark:#101f19;--felt:#173c30;min-height:100vh;background:var(--felt);color:var(--cream);font-family:Georgia,"Noto Serif SC",serif;background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:5px 5px}.table-header{height:74px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-bottom:1px solid rgba(242,232,210,.22);padding:0 4vw;font:11px Inter,sans-serif;letter-spacing:.14em}.table-header a{color:var(--cream);text-decoration:none}.table-header strong{text-align:right;font-weight:500;color:#b8c5b6}.case-content{width:min(1360px,calc(100% - 56px));margin:auto}
.opening{min-height:730px;padding:100px 2vw;display:grid;grid-template-columns:.85fr .9fr 1.25fr;gap:6vw;align-items:center;position:relative}.title-card{aspect-ratio:5/7;background:var(--cream);color:var(--dark);border-radius:18px;padding:55px 40px;box-shadow:0 28px 70px rgba(0,0,0,.32);position:relative;transform:rotate(-4deg);display:flex;flex-direction:column;justify-content:center}.title-card>p:first-of-type{font:10px Inter,sans-serif;letter-spacing:.2em;color:var(--red)}h1{font-size:clamp(42px,5vw,78px);line-height:1.1;letter-spacing:-.055em;margin:14px 0 22px}.subtitle{font-size:15px;line-height:1.6;color:#516057}.corner{position:absolute;font:bold 20px/1 Inter,sans-serif;color:var(--red)}.corner.top{top:22px;left:22px}.corner.bottom{bottom:22px;right:22px;transform:rotate(180deg)}.deal{font:700 11px Inter,sans-serif;letter-spacing:.16em;color:#f0b649}.summary{font-size:clamp(19px,2.1vw,29px);line-height:1.55;margin:28px 0 45px}.opening-copy dl{margin:0}.opening-copy dl div{padding:17px 0;border-top:1px solid rgba(242,232,210,.22)}dt{font:9px Inter,sans-serif;letter-spacing:.16em;color:#93a99f;margin-bottom:7px}dd{margin:0;font:13px/1.55 Inter,sans-serif;color:#d0dbd2}.cover-card{margin:0;background:#0d241c;border:12px solid var(--cream);transform:rotate(3deg);box-shadow:0 35px 80px rgba(0,0,0,.42)}.cover-card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.cover-card figcaption{color:var(--dark);background:var(--cream);font:9px Inter,sans-serif;letter-spacing:.14em;padding:16px 4px 5px}
.ruling{background:var(--cream);color:var(--dark);padding:110px clamp(25px,6vw,90px);margin:0 calc(50% - 50vw)}.ruling>header,.hand>header{width:min(1250px,calc(100% - 56px));margin:0 auto 70px;display:flex;justify-content:space-between;align-items:start}.ruling header span,.hand header span{font:10px Inter,sans-serif;letter-spacing:.16em;color:var(--red)}.ruling h2,.hand h2{font-size:clamp(38px,5vw,74px);line-height:1.02;letter-spacing:-.05em;margin:0}.ruling-grid{width:min(1250px,calc(100% - 56px));margin:auto;display:grid;grid-template-columns:1fr 70px 1fr;align-items:center}.ruling article{padding:45px;border:1px solid #cbbfa8;min-height:400px}.ruling article i{width:52px;height:52px;border:1px solid;display:grid;place-items:center;border-radius:50%;font:26px Inter,sans-serif;margin-bottom:50px}.ruling article span{font:700 9px Inter,sans-serif;letter-spacing:.17em}.ruling h3{font-size:28px;line-height:1.25;margin:16px 0}.ruling article p{font:15px/1.8 Inter,sans-serif;color:#526058}.challenge{background:#e8d9bd}.solution{background:var(--dark);color:var(--cream)!important}.solution p{color:#b4c0b7!important}.solution i{color:#71c79f}.versus{height:70px;width:70px;background:var(--red);color:#fff;border-radius:50%;display:grid;place-items:center;font:bold 14px Inter,sans-serif;z-index:1}
.hand{padding:120px 0 150px}.hand>header{width:100%}.hand header p{width:260px;font:13px/1.7 Inter,sans-serif;color:#a9baaf}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start}.cards article{aspect-ratio:3/4;background:var(--cream);color:var(--dark);border-radius:14px;padding:25px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 18px 32px rgba(0,0,0,.2)}.cards article:nth-child(even){transform:translateY(38px);color:var(--red)}.cards article>span{font:bold 22px/1 Inter,sans-serif}.cards strong{font-size:clamp(19px,2vw,29px);line-height:1.25}.cards small{font:8px Inter,sans-serif;letter-spacing:.16em;color:#68766e}
.score-sheet,.rounds,.house-rules{border-top:1px solid rgba(242,232,210,.24);padding:90px 0}.score-sheet{display:grid;grid-template-columns:1fr 2fr;gap:60px}.score-sheet span{font:10px Inter,sans-serif;letter-spacing:.2em;color:#f0b649}.score-sheet h2,.house-rules h2{font-size:50px;margin:14px 0}.score-sheet ol{margin:0;padding:0;list-style:none}.score-sheet li{display:grid;grid-template-columns:180px 1fr;gap:20px;padding:20px 0;border-bottom:1px solid rgba(242,232,210,.18)}.score-sheet p{margin:0;color:#b3c1b8;font:14px/1.6 Inter,sans-serif}.rounds{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}.rounds article{border:1px solid rgba(242,232,210,.24);padding:36px}.rounds span{color:#f0b649;font:11px Inter,sans-serif}.rounds h3{font-size:28px}.rounds li{margin:12px 0;color:#b3c1b8}.house-rules p{display:grid;grid-template-columns:60px 1fr;border-top:1px solid rgba(242,232,210,.2);padding:18px 0;margin:0}.house-rules b{color:#f0b649}
footer{background:#0e271f;border-top:1px solid rgba(242,232,210,.2);padding:55px 4vw}footer>p{text-align:center;font:9px Inter,sans-serif;letter-spacing:.2em;color:#718b80}footer nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;margin-top:35px}footer nav a{color:var(--cream);text-decoration:none;display:flex;flex-direction:column;gap:8px}footer nav a:last-child{text-align:right}footer nav span{font:9px Inter,sans-serif;color:#8ea39a;letter-spacing:.14em}footer nav b{font-size:18px}.all{font:10px Inter,sans-serif!important;letter-spacing:.1em;border:1px solid #61746b;padding:12px 18px}
@media(max-width:900px){.table-header{grid-template-columns:1fr auto;padding:0 16px}.table-header>span{display:none}.case-content{width:calc(100% - 28px)}.opening{display:flex;flex-direction:column;padding:65px 10px;gap:60px}.title-card{width:min(72vw,310px);align-self:flex-start}.opening-copy{order:-1}.cover-card{margin-left:12vw}.ruling{padding:75px 0}.ruling>header,.ruling-grid{width:calc(100% - 28px)}.ruling>header,.hand>header{display:block}.ruling h2,.hand h2{font-size:43px;margin-top:15px}.ruling-grid{display:block}.ruling article{min-height:0;padding:30px}.versus{margin:-12px auto;position:relative}.cards{grid-template-columns:1fr 1fr}.cards article:nth-child(even){transform:translateY(18px)}.hand{padding:80px 0 100px}.hand header p{width:auto}.score-sheet{display:block}.score-sheet li{grid-template-columns:1fr}.rounds{display:block}.rounds article+article{margin-top:18px}footer nav{grid-template-columns:1fr 1fr;gap:20px}.all{display:none!important}footer nav b{font-size:13px}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
@media(max-width:900px){.opening{display:flex;flex-direction:column;gap:32px;padding:40px 12px}.opening-copy{order:0;width:100%}.title-card{width:min(100%,360px);align-self:center;aspect-ratio:auto;padding:45px 40px;transform:rotate(-2deg)}.title-card h1{font-size:42px;line-height:1.2;margin:10px 0}.title-card .subtitle{margin-bottom:0}.corner{font-size:15px}.cover-card{margin:0;width:90%}.summary{font-size:18px;line-height:1.8;margin:18px 0}.opening-copy dl{display:none}.deal{font-size:9px}}
</style>
