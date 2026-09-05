<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="cast-page">
    <header class="topbar">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <div class="signal-mark" aria-label="信号强度"><i /><i /><i /><i /></div>
      <span>WFD SESSION / {{ project.year }}</span>
    </header>

    <div class="case-content">
      <section class="hero">
        <div class="hero-title">
          <p>{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <ProjectByline :project="project" />
          <div class="hero-meta"><span>{{ project.number }}</span><span>LINUX ↔ WINDOWS</span><span>STATE / STREAMING</span></div>
        </div>
        <div class="beam" aria-hidden="true"><i /><i /><i /></div>
        <figure class="receiver">
          <div class="screen-bar"><span>RECEIVER_01</span><span class="live"><i /> LIVE</span></div>
          <ProjectImage :project="project" priority />
          <figcaption><span>1920 × 1080 / WFD</span><span>CONTROL + MEDIA</span></figcaption>
        </figure>
        <p class="hero-summary">{{ project.summary }}</p>
      </section>

      <section class="link-facts">
        <p>不是一个“连接成功”的按钮，<br />而是一整条可观察的会话。</p>
        <dl>
          <div><dt>ENGINEERING ROLE</dt><dd>{{ project.role }}</dd></div>
          <div><dt>LINK LAYERS</dt><dd>{{ project.stack.join(" / ") }}</dd></div>
        </dl>
      </section>

      <section class="signal-chain">
        <header><span>END-TO-END TRACE</span><h2>从发现设备，<br />到第一帧抵达。</h2><p>每一个节点都有自己的进入条件、超时和清理路径。</p></header>
        <div class="chain">
          <article v-for="(module, index) in (project.modules || [])" :key="module.name">
            <div class="node"><span>{{ String(index + 1).padStart(2, "0") }}</span><i /></div>
            <strong>{{ module.name }}</strong>
            <p>{{ module.detail }}</p>
            <small>{{ index === 0 ? 'SOURCE' : index === project.modules.length - 1 ? 'OBSERVE' : 'NEGOTIATING' }}</small>
          </article>
        </div>
      </section>

      <section class="fault-story">
        <aside>
          <span>CONNECTION ≠ BOOLEAN</span>
          <div class="radar" aria-hidden="true"><i /><i /><i /><b /></div>
        </aside>
        <div class="story-copy">
          <article>
            <span>01 / LOST CONTEXT</span>
            <h2>为什么“已经配对”仍然没有画面？</h2>
            <p>{{ project.challenge }}</p>
          </article>
          <article>
            <span>02 / SESSION ENGINE</span>
            <h2>把偶然成功，变成可以解释的状态迁移。</h2>
            <p>{{ project.solution }}</p>
          </article>
        </div>
      </section>

      <section class="telemetry">
        <header><span>SESSION TELEMETRY</span><h2>链路必须留下证据</h2></header>
        <ol>
          <li v-for="(item,index) in project.highlights" :key="item">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <p>{{ item }}</p>
            <i :style="{ '--level': `${100 - index * 9}%` }" />
          </li>
        </ol>
      </section>

      <section v-if="project.roadmap?.length" class="bandwidth-map">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <article v-for="phase in project.roadmap" :key="phase.label">
          <span>{{ phase.label }}</span><h3>{{ phase.title }}</h3>
          <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
        </article>
      </section>

      <section v-if="project.principles?.length" class="principles">
        <header><span>LINK RULES</span><h2>不被平台差异冲散的原则</h2></header>
        <ol><li v-for="(principle,index) in project.principles" :key="principle"><b>0{{ index + 1 }}</b><p>{{ principle }}</p></li></ol>
      </section>
    </div>


  </article>
</template>

<style scoped>
.cast-page{--ink:#131621;--paper:#f4f6f8;--blue:#445bff;--aqua:#42e8da;--line:#cfd5df;min-height:100vh;color:var(--ink);background:var(--paper);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}.topbar{height:64px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 clamp(18px,4vw,64px);font-size:10px;letter-spacing:.15em}.topbar a{color:var(--ink);text-decoration:none}.topbar>span{text-align:right}.signal-mark{height:20px;display:flex;align-items:end;gap:3px}.signal-mark i{display:block;width:3px;background:var(--blue)}.signal-mark i:nth-child(1){height:5px}.signal-mark i:nth-child(2){height:9px}.signal-mark i:nth-child(3){height:13px}.signal-mark i:nth-child(4){height:18px}.case-content{overflow:hidden}.hero{min-height:870px;position:relative;padding:80px clamp(20px,6vw,90px);background:radial-gradient(circle at 76% 45%,rgba(66,232,218,.22),transparent 28%),linear-gradient(120deg,#edf0f5,#f8fafb)}.hero:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(68,91,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(68,91,255,.055) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(to bottom,black,transparent 85%);pointer-events:none}.hero-title{position:relative;z-index:2}.hero-title>p{font-size:10px;letter-spacing:.22em;color:var(--blue);font-weight:700}.hero h1{font-size:clamp(58px,9.5vw,154px);line-height:1.1;letter-spacing:-.085em;max-width:1080px;margin:25px 0 30px}.hero-meta{display:flex;gap:8px}.hero-meta span{border:1px solid #bdc6d7;border-radius:20px;padding:8px 13px;font-size:8px;letter-spacing:.12em;background:rgba(255,255,255,.5)}.receiver{position:absolute;z-index:3;width:min(47vw,700px);right:6vw;bottom:70px;margin:0;background:#0d1119;border:10px solid #171c28;border-radius:12px;box-shadow:0 40px 80px rgba(22,32,65,.2)}.receiver img{width:100%;display:block;aspect-ratio:16/9;object-fit:cover}.screen-bar,.receiver figcaption{height:34px;padding:0 11px;color:#a6b0c4;display:flex;align-items:center;justify-content:space-between;font-size:8px;letter-spacing:.12em}.receiver figcaption{height:31px}.live{color:var(--aqua)}.live i{display:inline-block;width:5px;height:5px;background:var(--aqua);border-radius:50%;margin-right:5px}.hero-summary{position:absolute;z-index:3;left:6vw;bottom:90px;max-width:38vw;font-size:18px;line-height:1.7;font-weight:500}.beam{position:absolute;left:40%;bottom:240px;width:22vw;height:200px;z-index:2;transform:skewY(-10deg);background:linear-gradient(90deg,transparent,rgba(68,91,255,.1),rgba(66,232,218,.25));clip-path:polygon(0 42%,100% 0,100% 100%,0 58%)}
.link-facts{width:min(1240px,calc(100% - 48px));margin:100px auto;display:grid;grid-template-columns:1fr 1.2fr;gap:10vw;align-items:end}.link-facts>p{font-size:clamp(27px,3.3vw,48px);line-height:1.17;letter-spacing:-.035em;margin:0}.link-facts dl{margin:0}.link-facts dl div{display:grid;grid-template-columns:160px 1fr;border-top:1px solid var(--line);padding:18px 0}dt{font-size:8px;letter-spacing:.15em;color:#6e7789}dd{margin:0;font-size:12px;line-height:1.65}
.signal-chain{background:#111521;color:#eaf0ff;padding:130px max(5vw,calc((100vw - 1380px)/2))}.signal-chain header{display:grid;grid-template-columns:180px 1fr 300px;gap:30px;align-items:start;margin-bottom:100px}.signal-chain header span,.fault-story article>span,.telemetry header span,.principles header span{font-size:9px;color:#7f91ff;letter-spacing:.18em}.signal-chain h2,.fault-story h2,.telemetry h2,.principles h2{font-size:clamp(38px,5vw,74px);line-height:1.02;letter-spacing:-.055em;margin:0}.signal-chain header p{color:#9099ab;font-size:13px;line-height:1.7}.chain{display:grid;grid-template-columns:repeat(6,1fr);position:relative}.chain:before{content:"";position:absolute;height:1px;left:5%;right:5%;top:24px;background:linear-gradient(90deg,var(--blue),var(--aqua))}.chain article{position:relative;padding-right:24px}.node{display:flex;align-items:center;gap:10px;height:50px}.node span{font-size:8px;color:#6e7891;background:#111521;padding-right:8px;position:relative;z-index:1}.node i{display:block;width:13px;height:13px;border-radius:50%;border:3px solid #111521;background:var(--aqua);box-shadow:0 0 0 1px var(--aqua),0 0 20px var(--aqua);position:relative;z-index:1}.chain strong{display:block;font-size:14px;margin:30px 0 15px}.chain p{font-size:11px;line-height:1.7;color:#8993a7}.chain small{display:block;color:#59657e;font-size:7px;letter-spacing:.15em;margin-top:25px}
.fault-story{width:min(1240px,calc(100% - 48px));margin:140px auto;display:grid;grid-template-columns:.7fr 1.3fr;gap:8vw}.fault-story aside>span{font-size:9px;color:var(--blue);letter-spacing:.18em}.radar{width:min(28vw,320px);aspect-ratio:1;border:1px solid var(--line);border-radius:50%;margin-top:60px;position:relative;background:repeating-radial-gradient(circle,transparent 0 19%,#d7dce4 20%)}.radar:before,.radar:after{content:"";position:absolute;background:#d7dce4}.radar:before{width:1px;height:100%;left:50%}.radar:after{height:1px;width:100%;top:50%}.radar b{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--blue);left:65%;top:32%;box-shadow:0 0 0 8px rgba(68,91,255,.13)}.story-copy article{padding:0 0 70px;margin-bottom:70px;border-bottom:1px solid var(--line)}.story-copy h2{font-size:clamp(31px,4vw,58px);margin:20px 0 28px}.story-copy p{font-size:15px;line-height:1.85;color:#626b7b}
.telemetry{background:#e5e9ef;padding:120px max(5vw,calc((100vw - 1240px)/2))}.telemetry header{display:flex;justify-content:space-between;align-items:end;margin-bottom:70px}.telemetry h2{font-size:54px}.telemetry ol{list-style:none;margin:0;padding:0}.telemetry li{display:grid;grid-template-columns:70px 1fr 220px;align-items:center;min-height:83px;border-top:1px solid #c0c7d2}.telemetry li span{font-size:10px;color:var(--blue)}.telemetry li p{font-size:15px}.telemetry li>i{height:3px;background:#c6ccd6;position:relative}.telemetry li>i:after{content:"";display:block;height:100%;width:var(--level);background:linear-gradient(90deg,var(--blue),var(--aqua))}
.bandwidth-map,.principles{width:min(1240px,calc(100% - 48px));margin:120px auto}.bandwidth-map{display:grid;grid-template-columns:1fr 1fr;gap:24px}.bandwidth-map article{border:1px solid var(--line);padding:45px}.bandwidth-map span{font-size:9px;color:var(--blue);letter-spacing:.16em}.bandwidth-map h3{font-size:27px}.bandwidth-map li{margin:12px 0;color:#626b7b}.principles{display:grid;grid-template-columns:.8fr 1.2fr;gap:8vw}.principles h2{font-size:50px;margin-top:18px}.principles ol{margin:0;padding:0;list-style:none}.principles li{display:grid;grid-template-columns:60px 1fr;padding:20px 0;border-top:1px solid var(--line)}.principles b{color:var(--blue);font-size:10px}.principles p{margin:0;line-height:1.7}
.pager{border-top:1px solid var(--line);padding:50px 4vw;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}.pager a{color:var(--ink);text-decoration:none;display:grid;gap:8px}.pager a:last-child{text-align:right}.pager span{font-size:8px;color:#687182;letter-spacing:.16em}.pager strong{font-size:17px}.pager .index{display:flex;gap:3px;align-items:end;font-size:9px;letter-spacing:.1em}.pager .index i{width:3px;background:var(--blue);height:8px}.pager .index i:nth-child(2){height:13px}.pager .index i:nth-child(3){height:18px}
@media(max-width:900px){.topbar{grid-template-columns:1fr auto;padding:0 16px}.topbar>.signal-mark{display:none}.hero{min-height:960px;padding:55px 20px}.hero h1{font-size:58px}.hero-meta{flex-wrap:wrap}.hero-summary{left:20px;right:20px;bottom:70px;max-width:none;font-size:15px}.receiver{width:calc(100% - 50px);right:25px;bottom:310px;border-width:6px}.beam{display:none}.link-facts{display:block;margin:75px auto}.link-facts dl{margin-top:50px}.link-facts dl div{grid-template-columns:1fr}.signal-chain{padding:85px 20px}.signal-chain header{display:block;margin-bottom:65px}.signal-chain h2{margin:18px 0}.chain{display:block}.chain:before{left:24px;top:0;bottom:0;width:1px;height:auto}.chain article{padding:0 0 45px 55px}.node{position:absolute;left:0}.chain strong{padding-top:5px;margin-top:0}.fault-story{display:block;margin:90px auto}.radar{width:220px;margin:45px auto 80px}.telemetry{padding:80px 20px}.telemetry header{display:block}.telemetry h2{font-size:39px;margin-top:15px}.telemetry li{grid-template-columns:35px 1fr}.telemetry li>i{display:none}.telemetry li p{font-size:13px}.bandwidth-map,.principles{display:block;margin:80px auto}.bandwidth-map article+article{margin-top:20px}.principles ol{margin-top:50px}.pager strong{font-size:12px}.pager .index{display:none}.pager{grid-template-columns:1fr 1fr}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:35px;align-items:center;min-height:0}.hero-title{min-width:0}.hero h1{font-size:clamp(44px,5.8vw,84px);line-height:1.06}.receiver{position:relative;right:auto;bottom:auto;width:100%;grid-column:2;grid-row:1}.hero-summary{position:relative;left:auto;bottom:auto;max-width:850px;grid-column:1/-1;margin:0;font-size:16px}@media(max-width:900px){.hero{grid-template-columns:1fr;padding:40px 20px;gap:30px}.receiver{grid-column:1;grid-row:auto;width:100%;right:auto;bottom:auto}.hero h1{font-size:48px}.hero-summary{right:auto;font-size:14px}.hero-meta{flex-wrap:wrap}}
</style>
