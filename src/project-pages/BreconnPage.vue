<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="network-page">
    <header class="masthead">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <span>DOC.{{ project.number }} — REV.{{ project.year }}</span>
    </header>

    <div class="case-content">
      <section class="intro">
        <div class="intro-copy">
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <ProjectByline :project="project" />
          <h2>{{ project.subtitle }}</h2>
          <div class="line-count"><strong>2 万+</strong><span>LINES OF<br />NETWORKING CORE</span></div>
        </div>
        <div class="intro-note">
          <span>ARCHITECTURE NOTE / 001</span>
          <p>{{ project.summary }}</p>
        </div>
      </section>

      <section class="topology" aria-labelledby="topology-title">
        <header><span>FIGURE 01</span><h2 id="topology-title">One channel.<br />Many transports.</h2><p>所有后端向同一个稳定边界汇聚；协议再从边界之上生长。</p></header>
        <div class="topology-board">
          <figure>
            <ProjectImage :project="project" priority />
            <figcaption>REFERENCE ARCHITECTURE / {{ project.visualLabel }}</figcaption>
          </figure>
          <div class="node-map" aria-label="网络模块拓扑">
            <article v-for="(module,index) in (project.modules || [])" :key="module.name">
              <span>N{{ String(index + 1).padStart(2,'0') }}</span>
              <strong>{{ module.name }}</strong>
              <p>{{ module.detail }}</p>
            </article>
            <div class="channel-core"><i /> CHANNEL API <i /></div>
          </div>
        </div>
      </section>

      <section class="specification">
        <aside>
          <span>PROJECT SPECIFICATION</span>
          <dl><div><dt>RESPONSIBILITY</dt><dd>{{ project.role }}</dd></div><div><dt>IMPLEMENTATION</dt><dd>{{ project.stack.join(" · ") }}</dd></div></dl>
        </aside>
        <div class="decisions">
          <article>
            <span>PROBLEM / A</span>
            <h2>协议差异，不应该泄漏到业务。</h2>
            <p>{{ project.challenge }}</p>
          </article>
          <article>
            <span>DECISION / B</span>
            <h2>把变化隔离在 Channel 的另一侧。</h2>
            <p>{{ project.solution }}</p>
          </article>
        </div>
      </section>

      <section class="capabilities">
        <header><span>CAPABILITY MATRIX</span><h2>网络能力与实现边界</h2><b>能力与边界</b></header>
        <div class="matrix">
          <article v-for="(item,index) in project.highlights" :key="item">
            <span>{{ String(index + 1).padStart(2,'0') }}</span>
            <p>{{ item }}</p>
            <div><i /><em>{{ item.includes('规划') || item.includes('尚未') ? '规划中' : '项目能力' }}</em></div>
          </article>
        </div>
      </section>

      <section v-if="project.roadmap?.length" class="releases">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <header><span>EVOLUTION MAP</span><h2>接口保持稳定，<br />能力继续向外扩张。</h2></header>
        <div class="release-grid">
          <article v-for="(phase,index) in project.roadmap" :key="phase.label">
            <div class="release-node"><i /><span>R{{ index + 1 }}</span></div>
            <p>{{ phase.label }}</p><h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="invariants">
        <header><span>ARCHITECTURAL INVARIANTS</span><h2>任何新协议都不能破坏这些约束</h2></header>
        <ol><li v-for="(principle,index) in project.principles" :key="principle"><b>0{{ index + 1 }}</b><p>{{ principle }}</p><span>LOCKED</span></li></ol>
      </section>
    </div>


  </article>
</template>

<style scoped>
.network-page{--paper:#f0eee8;--ink:#171713;--orange:#ff5b2d;--lime:#cde757;--line:#b8b6ad;min-height:100vh;background:var(--paper);color:var(--ink);font-family:"IBM Plex Mono","SFMono-Regular",Consolas,monospace;background-image:linear-gradient(rgba(23,23,19,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(23,23,19,.045) 1px,transparent 1px);background-size:24px 24px}.masthead{height:62px;border-bottom:1px solid var(--ink);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,60px);font-size:9px;letter-spacing:.14em}.masthead a{color:var(--ink);text-decoration:none}.case-content{width:min(1420px,calc(100% - 48px));margin:auto;border-left:1px solid var(--line);border-right:1px solid var(--line)}.intro{min-height:720px;display:grid;grid-template-columns:1.35fr .65fr;border-bottom:1px solid var(--ink)}.intro-copy{padding:90px clamp(22px,5vw,80px);position:relative}.intro-copy>p,.intro-note>span,.topology header>span,.decisions article>span,.capabilities header>span,.releases header>span,.invariants header>span{font-size:9px;letter-spacing:.18em;color:var(--orange)}.intro h1{font:800 clamp(90px,15vw,230px)/.7 Inter,system-ui,sans-serif;letter-spacing:-.105em;margin:100px 0 65px}.intro h2{font:500 clamp(21px,2.3vw,34px)/1.3 Inter,system-ui,sans-serif;letter-spacing:-.03em;max-width:900px}.line-count{display:flex;align-items:center;gap:18px;margin-top:55px}.line-count strong{font:700 38px Inter,sans-serif}.line-count span{font-size:8px;line-height:1.4;color:#6b6a64}.intro-note{border-left:1px solid var(--line);padding:90px clamp(22px,3vw,48px);display:flex;flex-direction:column;justify-content:flex-end}.intro-note p{font:17px/1.85 Inter,"Noto Sans SC",sans-serif;margin:25px 0 0}
.topology{padding:130px clamp(20px,5vw,75px);border-bottom:1px solid var(--ink)}.topology>header{display:grid;grid-template-columns:160px 1fr 280px;gap:35px;align-items:start;margin-bottom:90px}.topology h2,.decisions h2,.capabilities h2,.releases h2,.invariants h2{font:700 clamp(42px,6vw,84px)/.95 Inter,system-ui,sans-serif;letter-spacing:-.07em;margin:0}.topology header p{font:13px/1.7 Inter,sans-serif;color:#66665f}.topology-board{display:grid;grid-template-columns:.8fr 1.2fr;border:1px solid var(--ink);background:#e7e5dd}.topology figure{margin:0;border-right:1px solid var(--ink);padding:18px;display:flex;flex-direction:column}.topology figure img{width:100%;height:100%;min-height:500px;object-fit:contain;background:#fff}.topology figcaption{font-size:8px;letter-spacing:.14em;padding:14px 0 0}.node-map{padding:34px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;position:relative}.node-map article{border:1px solid #9f9e97;background:var(--paper);padding:18px;min-height:140px;position:relative}.node-map article:after{content:"";position:absolute;width:12px;height:12px;border-radius:50%;background:var(--orange);right:-7px;top:20px;border:3px solid #e7e5dd}.node-map article span{font-size:8px;color:var(--orange)}.node-map strong{display:block;font:600 15px Inter,sans-serif;margin:14px 0 8px}.node-map p{font:10px/1.55 Inter,sans-serif;color:#686760;margin:0}.channel-core{grid-column:1/-1;background:var(--ink);color:var(--paper);height:52px;display:flex;align-items:center;justify-content:center;gap:25px;font-size:10px;letter-spacing:.16em}.channel-core i{height:1px;width:60px;background:var(--lime)}
.specification{display:grid;grid-template-columns:.7fr 1.3fr;border-bottom:1px solid var(--ink)}.specification aside{padding:90px clamp(20px,4vw,55px);border-right:1px solid var(--line)}.specification aside>span{font-size:9px;color:var(--orange);letter-spacing:.16em}.specification dl{margin-top:80px}.specification dl div{border-top:1px solid var(--line);padding:20px 0}dt{font-size:8px;color:#797870;margin-bottom:10px}dd{margin:0;font:13px/1.6 Inter,sans-serif}.decisions article{padding:85px clamp(25px,5vw,70px)}.decisions article+article{border-top:1px solid var(--line);background:var(--ink);color:var(--paper)}.decisions h2{font-size:clamp(37px,4vw,61px);margin:24px 0 32px}.decisions p{font:15px/1.85 Inter,sans-serif;color:#62625c}.decisions article+article p{color:#bbb9af}
.capabilities{padding:120px clamp(20px,5vw,75px);border-bottom:1px solid var(--ink)}.capabilities header{display:grid;grid-template-columns:180px 1fr auto;align-items:end;margin-bottom:70px}.capabilities h2{font-size:clamp(38px,5vw,68px)}.capabilities header b{font-size:8px;background:var(--lime);padding:10px}.matrix{border-top:1px solid var(--ink)}.matrix article{display:grid;grid-template-columns:60px 1fr 130px;align-items:center;min-height:76px;border-bottom:1px solid var(--line)}.matrix article>span{font-size:9px;color:var(--orange)}.matrix p{font:14px/1.55 Inter,sans-serif}.matrix article>div{display:flex;align-items:center;gap:8px;justify-content:end}.matrix i{width:7px;height:7px;background:var(--lime);border-radius:50%}.matrix em{font-style:normal;font-size:8px}
.releases{padding:120px clamp(20px,5vw,75px);background:#dedbd0;border-bottom:1px solid var(--ink)}.releases>header{display:grid;grid-template-columns:180px 1fr;margin-bottom:90px}.releases h2{font-size:clamp(38px,5vw,70px)}.release-grid{display:grid;grid-template-columns:1fr 1fr;position:relative;gap:80px}.release-grid:before{content:"";position:absolute;left:0;right:0;top:19px;height:1px;background:var(--ink)}.release-grid article{position:relative}.release-node{height:40px;display:flex;align-items:start;justify-content:space-between}.release-node i{width:13px;height:13px;background:var(--orange);border:5px solid #dedbd0;box-shadow:0 0 0 1px var(--ink);border-radius:50%;position:relative;z-index:1}.release-node span{background:#dedbd0;padding-left:15px;font-size:9px}.release-grid article>p{color:var(--orange);font-size:9px;letter-spacing:.15em;margin-top:30px}.release-grid h3{font:600 29px/1.2 Inter,sans-serif}.release-grid ul{list-style:none;padding:0}.release-grid li{font:13px Inter,sans-serif;border-top:1px solid #b5b2a7;padding:13px 0}
.invariants{padding:120px clamp(20px,5vw,75px)}.invariants header{display:grid;grid-template-columns:180px 1fr;margin-bottom:80px}.invariants h2{font-size:clamp(37px,5vw,68px)}.invariants ol{list-style:none;padding:0;margin:0;border-top:1px solid var(--ink)}.invariants li{display:grid;grid-template-columns:70px 1fr 80px;align-items:center;border-bottom:1px solid var(--line);min-height:90px}.invariants li b{color:var(--orange);font-size:10px}.invariants li p{font:15px/1.6 Inter,sans-serif}.invariants li span{font-size:8px;border:1px solid var(--ink);padding:7px;text-align:center}
footer{background:var(--ink);color:var(--paper);padding:65px max(4vw,calc((100vw - 1420px)/2));display:grid;grid-template-columns:1fr 1.5fr;gap:80px}.footer-title{display:grid;gap:12px}.footer-title span,footer nav span{font-size:8px;letter-spacing:.15em;color:#89887f}.footer-title strong{font-size:20px}footer nav{display:grid;grid-template-columns:1fr 1fr;gap:45px}footer nav a{color:var(--paper);text-decoration:none;display:grid;gap:10px}footer nav a:last-child{text-align:right}footer nav b{font:600 16px Inter,sans-serif}
@media(max-width:900px){.masthead{padding:0 14px}.masthead span{font-size:7px}.case-content{width:calc(100% - 28px)}.intro{display:block;min-height:0}.intro-copy{padding:65px 20px}.intro h1{font-size:92px;margin:80px 0 55px}.intro-note{border-left:0;border-top:1px solid var(--line);padding:55px 20px}.topology{padding:80px 14px}.topology>header{display:block}.topology h2{margin:18px 0}.topology-board{display:block}.topology figure{border-right:0;border-bottom:1px solid var(--ink)}.topology figure img{min-height:250px}.node-map{display:block;padding:15px}.node-map article{margin-bottom:10px}.channel-core{margin-top:10px}.specification{display:block}.specification aside{border-right:0;border-bottom:1px solid var(--line);padding:60px 20px}.specification aside dl{margin-top:45px}.decisions article{padding:65px 20px}.capabilities{padding:80px 14px}.capabilities header{display:block}.capabilities h2{margin:15px 0}.capabilities header b{display:inline-block}.matrix article{grid-template-columns:35px 1fr}.matrix article>div{display:none}.matrix p{font-size:12px}.releases{padding:80px 14px}.releases>header,.invariants header{display:block}.releases h2,.invariants h2{margin-top:18px}.release-grid{display:block}.release-grid:before{display:none}.release-grid article+article{margin-top:70px}.invariants{padding:80px 14px}.invariants li{grid-template-columns:35px 1fr}.invariants li span{display:none}.invariants li p{font-size:13px}footer{display:block;padding:50px 24px}.footer-title{margin-bottom:50px}footer nav b{font-size:12px}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
.intro h1{line-height:1;letter-spacing:-.07em;margin:42px 0 30px}.intro{min-height:0}.intro-copy{padding-block:65px}.intro-note{padding-block:65px}@media(max-width:900px){.intro-copy{padding:40px 20px}.intro h1{font-size:76px;margin:30px 0}.line-count{margin-top:30px}.intro-note{padding:35px 20px}}
</style>
