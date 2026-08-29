<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="scan-page">
    <header class="lab-header">
      <RouterLink to="/projects">← EXIT LAB</RouterLink>
      <span>LOCAL SESSION / {{ project.year }}</span>
      <i><b></b> PIPELINE ONLINE</i>
    </header>

    <section class="scan-hero">
      <aside class="telemetry left-data" aria-hidden="true">
        <span>SUBJECT_ID</span><strong>FS-{{ project.number }}-001</strong>
        <span>DETECTOR</span><strong>YUNET / ACTIVE</strong>
        <span>EMBEDDING</span><strong>SFACE / INT8</strong>
        <div class="vector">0.24<br />0.87<br />0.13<br />0.76<br />0.42<br />0.91</div>
      </aside>

      <figure class="scan-viewport">
        <img :src="project.cover" :alt="project.coverAlt" />
        <div class="scanner" aria-hidden="true"></div>
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        <figcaption><span>LIVE / LOCAL ONLY</span><strong>MATCH CANDIDATE</strong><i>0.94</i></figcaption>
      </figure>

      <aside class="telemetry right-data">
        <div class="dial"><span>94</span><small>MATCH</small></div>
        <p>TRACK 012<br />QUALITY 0.87<br />FPS 30.0<br />LATENCY 18MS</p>
        <div class="landmarks" aria-hidden="true"><i v-for="n in 16" :key="n"></i></div>
      </aside>

      <div class="hero-title">
        <p>{{ project.kicker }} / {{ project.visualLabel }}</p>
        <h1>{{ project.title }}</h1>
        <h2>{{ project.subtitle }}</h2>
      </div>
    </section>

    <main>
      <section class="abstract">
        <span>ABSTRACT / 00</span>
        <p>{{ project.summary }}</p>
        <div><small>RESPONSIBILITY</small><strong>{{ project.role }}</strong></div>
        <div><small>RUNTIME</small><strong>{{ project.stack.join(" · ") }}</strong></div>
      </section>

      <section class="case-samples">
        <article class="rejected">
          <header><span>INPUT / UNCONTROLLED</span><i>REJECTED</i></header>
          <div class="sample-graphic"><b></b><b></b><b></b></div>
          <h2>真实现场不会配合模型。</h2>
          <p>{{ project.challenge }}</p>
        </article>
        <article class="accepted">
          <header><span>PIPELINE / EXPLAINED</span><i>ACCEPTED</i></header>
          <div class="embedding-bars" aria-hidden="true"><i v-for="n in 32" :key="n" :style="{ height: `${18 + ((n * 23) % 72)}%` }"></i></div>
          <h2>每个判断都能被追踪。</h2>
          <p>{{ project.solution }}</p>
        </article>
      </section>

      <section v-if="project.modules?.length" class="pipeline">
        <header><span>PIPELINE TOPOLOGY / 01</span><h2>不是一次推理，<br />是一条可观察的链路。</h2></header>
        <div class="pipeline-flow">
          <article v-for="(module, index) in project.modules" :key="module.name">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <div><small>NODE / ACTIVE</small><h3>{{ module.name }}</h3><p>{{ module.detail }}</p></div>
            <i>{{ index === project.modules.length - 1 ? "OUTPUT" : "PASS →" }}</i>
          </article>
        </div>
      </section>

      <section class="event-log">
        <header><span>EVENT LOG / 02</span><h2>系统确认了什么</h2><i>{{ project.highlights.length }} EVENTS</i></header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <time>00:00:{{ String(index * 3 + 1).padStart(2, "0") }}</time><span>INFO</span><p>{{ item }}</p><i>VERIFIED</i>
          </li>
        </ol>
      </section>

      <section v-if="project.roadmap?.length" class="experiment-stages">
        <header><span>EXPERIMENT STAGES / 03</span><h2>从验证样本到实时现场</h2></header>
        <div>
          <article v-for="(phase, index) in project.roadmap" :key="phase.label">
            <b>0{{ index + 1 }}</b><span>{{ phase.label }}</span><h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="ethics-panel">
        <div class="ethics-title"><span>BOUNDARIES / 04</span><h2>能力边界<br />也是系统的一部分。</h2><div class="fingerprint" aria-hidden="true"></div></div>
        <ol><li v-for="(item, index) in project.principles" :key="item"><b>{{ String(index + 1).padStart(2, "0") }}</b><p>{{ item }}</p></li></ol>
      </section>

      <nav class="pager" aria-label="项目翻页">
        <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><span>← PREVIOUS SUBJECT</span><strong>{{ previousProject.title }}</strong></RouterLink><span v-else></span>
        <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><span>NEXT SUBJECT →</span><strong>{{ nextProject.title }}</strong></RouterLink>
      </nav>
    </main>
  </article>
</template>

<style scoped>
.scan-page{--acid:#c8ff32;--cyan:#40e4df;min-height:100vh;background:#080b0a;color:#ecf3e9;font-family:"Arial Narrow",Arial,sans-serif}.lab-header{height:48px;padding:0 22px;border-bottom:1px solid #26302b;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;font:10px monospace;letter-spacing:.14em}.lab-header a{color:#b8c1bb;text-decoration:none}.lab-header i{justify-self:end;font-style:normal;color:var(--acid)}.lab-header i b{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--acid);box-shadow:0 0 12px var(--acid)}.scan-hero{min-height:760px;display:grid;grid-template-columns:180px minmax(0,1fr) 180px;grid-template-rows:1fr auto;position:relative;overflow:hidden;border-bottom:1px solid #273029;background:radial-gradient(circle at center,#17211c,#080b0a 64%)}.telemetry{font:9px/1.6 monospace;color:#748078;padding:40px 24px;z-index:2}.telemetry span,.telemetry strong{display:block}.telemetry strong{color:#dbe5dd;margin-bottom:24px}.left-data{border-right:1px solid #26302b}.right-data{border-left:1px solid #26302b}.vector{font-size:25px;line-height:1.15;letter-spacing:.12em;color:#28352e;writing-mode:vertical-lr;margin-top:65px}.scan-viewport{position:relative;align-self:center;justify-self:center;margin:0;width:min(76%,780px);aspect-ratio:16/10;border:1px solid #5e6b63;background:#0c100e;box-shadow:0 0 80px #7aff6010}.scan-viewport img{width:100%;height:100%;display:block;object-fit:contain;filter:saturate(.85) contrast(1.1)}.scan-viewport::before{content:"";position:absolute;inset:8%;border:1px solid #a7ff7638;background:linear-gradient(90deg,transparent 49.8%,#b1ff7a30 50%,transparent 50.2%),linear-gradient(transparent 49.8%,#b1ff7a30 50%,transparent 50.2%)}.scanner{position:absolute;z-index:2;left:8%;right:8%;top:15%;height:1px;background:var(--acid);box-shadow:0 0 14px var(--acid);animation:scan 5s ease-in-out infinite alternate}.corner{position:absolute;width:28px;height:28px;border-color:var(--acid);border-style:solid}.tl{left:6%;top:6%;border-width:2px 0 0 2px}.tr{right:6%;top:6%;border-width:2px 2px 0 0}.bl{left:6%;bottom:6%;border-width:0 0 2px 2px}.br{right:6%;bottom:6%;border-width:0 2px 2px 0}.scan-viewport figcaption{position:absolute;left:8%;right:8%;bottom:8%;display:grid;grid-template-columns:1fr auto auto;gap:15px;align-items:center;background:#07100ce8;border-left:3px solid var(--acid);padding:12px;font:9px monospace}.scan-viewport figcaption strong{color:var(--acid)}.scan-viewport figcaption i{font-style:normal;font-size:20px}.dial{width:92px;aspect-ratio:1;border:2px solid var(--acid);border-left-color:#344037;border-radius:50%;display:grid;place-content:center;text-align:center;margin:0 auto 35px;box-shadow:inset 0 0 25px #c8ff3215}.dial span{font-size:28px;color:var(--acid)}.dial small{font-size:8px}.right-data p{font:9px/2 monospace;color:#a3afa7}.landmarks{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:50px}.landmarks i{width:4px;height:4px;border-radius:50%;background:var(--cyan);box-shadow:0 0 6px var(--cyan)}.hero-title{grid-column:1/-1;padding:0 6vw 45px;z-index:3}.hero-title p{font:10px monospace;color:var(--acid);letter-spacing:.16em}.hero-title h1{font-size:clamp(82px,16vw,230px);line-height:.7;letter-spacing:-.075em;margin:22px 0 32px;text-transform:uppercase}.hero-title h2{font-size:clamp(17px,2vw,27px);font-weight:400;margin:0;color:#b3bdb6}@keyframes scan{from{top:15%}to{top:82%}}main{max-width:1420px;margin:auto;padding:0 30px}.abstract{display:grid;grid-template-columns:.35fr 1.4fr .8fr .8fr;border-left:1px solid #29332d;border-right:1px solid #29332d}.abstract>*{padding:38px;border-right:1px solid #29332d}.abstract>*:last-child{border-right:0}.abstract>span,.abstract small{font:9px monospace;color:#758078}.abstract>p{font-size:19px;line-height:1.65;margin:0}.abstract div strong{display:block;font-size:11px;line-height:1.7;margin-top:12px}.case-samples{display:grid;grid-template-columns:1fr 1fr;border:1px solid #29332d}.case-samples article{min-height:620px;padding:34px;display:flex;flex-direction:column}.rejected{background:#111513;border-right:1px solid #29332d}.accepted{background:#d8ff68;color:#0b0e0c}.case-samples header{display:flex;justify-content:space-between;font:9px monospace}.case-samples header i{font-style:normal}.rejected header i{color:#ff7f73}.accepted header i{color:#203310}.case-samples h2{font-size:clamp(30px,4vw,58px);letter-spacing:-.045em;margin-top:auto}.case-samples p{font-size:13px;line-height:1.9;max-width:590px}.sample-graphic{height:230px;position:relative;margin:45px 10%;border:1px solid #4e5a52}.sample-graphic::before,.sample-graphic::after{content:"";position:absolute;inset:20%;border:1px dashed #56645b}.sample-graphic::after{inset:35%;border-style:solid;border-color:#ff7165}.sample-graphic b{position:absolute;width:45px;height:45px;border:1px solid #77867c;transform:rotate(45deg)}.sample-graphic b:nth-child(1){left:8%;top:12%}.sample-graphic b:nth-child(2){right:12%;top:35%}.sample-graphic b:nth-child(3){left:30%;bottom:5%}.embedding-bars{height:230px;display:flex;align-items:center;gap:4px;margin:45px 0}.embedding-bars i{flex:1;background:#182217;min-height:8px}.pipeline{padding:120px 0}.pipeline>header{display:grid;grid-template-columns:.4fr 1fr;align-items:start;margin-bottom:70px}.pipeline header span,.event-log header span,.experiment-stages header span,.ethics-title>span{font:9px monospace;color:var(--acid)}.pipeline h2,.experiment-stages header h2{font-size:clamp(42px,6vw,78px);letter-spacing:-.055em;line-height:1;margin:0}.pipeline-flow{margin-left:24%;border-left:1px solid var(--acid)}.pipeline-flow article{position:relative;display:grid;grid-template-columns:55px 1fr auto;gap:25px;align-items:center;padding:28px 0 28px 38px;border-bottom:1px solid #2a342e}.pipeline-flow article::before{content:"";position:absolute;left:-5px;width:9px;height:9px;background:var(--acid);transform:rotate(45deg)}.pipeline-flow article>span,.pipeline-flow small,.pipeline-flow article>i{font:9px monospace;color:#718078}.pipeline-flow h3{font-size:21px;margin:5px 0}.pipeline-flow p{font-size:12px;color:#8d9991;margin:0}.pipeline-flow article>i{font-style:normal;color:var(--acid)}.event-log{border:1px solid #29332d}.event-log header{display:grid;grid-template-columns:1fr 1fr auto;padding:30px;border-bottom:1px solid #29332d;align-items:end}.event-log h2{font-size:34px;margin:0}.event-log header i{font:9px monospace;color:var(--cyan);font-style:normal}.event-log ol{list-style:none;margin:0;padding:0}.event-log li{display:grid;grid-template-columns:100px 60px 1fr auto;gap:20px;padding:18px 25px;border-bottom:1px solid #232c27;align-items:center;font-size:12px}.event-log time,.event-log li>span,.event-log li>i{font:9px monospace;color:#69756e}.event-log li>span{color:var(--cyan)}.event-log li>i{font-style:normal;color:var(--acid)}.event-log li p{margin:0}.experiment-stages{padding:120px 0}.experiment-stages>header{display:grid;grid-template-columns:.4fr 1fr;margin-bottom:55px}.experiment-stages>div{display:grid;grid-template-columns:1fr 1fr}.experiment-stages article{position:relative;border:1px solid #2a342e;padding:45px;min-height:330px}.experiment-stages article+article{border-left:0}.experiment-stages article>b{position:absolute;right:25px;top:15px;font-size:90px;color:#131b17}.experiment-stages article>span{font:10px monospace;color:var(--acid)}.experiment-stages h3{position:relative;font-size:28px;margin:55px 0 30px}.experiment-stages ul{list-style:square;padding-left:18px;color:#8e9992;font-size:12px;line-height:2}.ethics-panel{display:grid;grid-template-columns:1fr 1fr;background:#d8ff68;color:#0b0e0c}.ethics-title{min-height:520px;padding:45px;position:relative;overflow:hidden}.ethics-title>span{color:#192613}.ethics-title h2{font-size:clamp(42px,5vw,70px);line-height:1.05;letter-spacing:-.055em}.fingerprint{position:absolute;width:310px;height:310px;border:1px solid #101810;border-radius:48% 52% 45% 55%;right:-80px;bottom:-70px;box-shadow:inset 0 0 0 18px #d8ff68,inset 0 0 0 19px #101810,inset 0 0 0 36px #d8ff68,inset 0 0 0 37px #101810,inset 0 0 0 54px #d8ff68,inset 0 0 0 55px #101810}.ethics-panel ol{list-style:none;padding:0;margin:0;border-left:1px solid #0b0e0c}.ethics-panel li{display:grid;grid-template-columns:55px 1fr;padding:28px;border-bottom:1px solid #0b0e0c}.ethics-panel li:last-child{border-bottom:0}.ethics-panel li b{font:10px monospace}.ethics-panel li p{font-size:13px;line-height:1.7;margin:0}.pager{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #29332d}.pager a{display:flex;flex-direction:column;padding:45px 0;gap:9px;color:#eef4ef;text-decoration:none}.pager a:last-child{text-align:right}.pager a span{font:9px monospace;color:var(--acid)}.pager a strong{font-size:17px}
@media(max-width:700px){.lab-header{grid-template-columns:1fr auto}.lab-header>span{display:none}.scan-hero{min-height:720px;grid-template-columns:1fr;grid-template-rows:1fr auto}.telemetry{display:none}.scan-viewport{width:calc(100% - 34px)}.hero-title{grid-column:1;padding:0 17px 40px}.hero-title h1{font-size:68px}.abstract{grid-template-columns:1fr}.abstract>*{border-right:0;border-bottom:1px solid #29332d;padding:26px 22px}.case-samples{grid-template-columns:1fr}.case-samples article{min-height:500px;padding:24px}.rejected{border-right:0;border-bottom:1px solid #29332d}.pipeline{padding:80px 0}.pipeline>header,.experiment-stages>header{display:block}.pipeline h2,.experiment-stages h2{margin-top:25px}.pipeline-flow{margin-left:8px}.pipeline-flow article{grid-template-columns:35px 1fr;padding-left:22px}.pipeline-flow article>i{display:none}.event-log header{grid-template-columns:1fr auto}.event-log header span{display:none}.event-log li{grid-template-columns:62px 1fr;padding:16px 12px;gap:10px}.event-log li>span,.event-log li>i{display:none}.experiment-stages>div{grid-template-columns:1fr}.experiment-stages article+article{border-left:1px solid #2a342e;border-top:0}.ethics-panel{grid-template-columns:1fr}.ethics-panel ol{border-left:0;border-top:1px solid #0b0e0c}.pager a strong{font-size:12px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}.scanner{top:50%}}
</style>
