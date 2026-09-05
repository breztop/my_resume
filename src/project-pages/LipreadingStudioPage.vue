<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});

const waveform = [26, 51, 36, 78, 64, 42, 85, 58, 28, 66, 91, 47, 73, 34, 59, 80, 44, 68, 24, 54, 87, 39, 71, 49, 63, 31, 76, 56, 89, 43, 67, 37, 82, 52, 72, 29, 61, 92, 45, 69];
</script>

<template>
  <article class="studio-page">
    <header class="studio-bar">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <div class="transport" aria-label="编辑界面示意"><i>◀</i><b>▶</b><i>▶</i><time>00:00:00:00</time></div>
      <span>LOCAL STUDIO / {{ project.year }}</span>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p>{{ project.kicker }}</p>
        <h1>LIPREADING<br /><i>STUDIO</i></h1>
          <ProjectByline :project="project" />
        <h2>{{ project.subtitle }}</h2>
        <div class="hero-meta"><span>{{ project.number }} / {{ project.visualLabel }}</span><span>{{ project.stack.length }}-STAGE STACK</span></div>
      </div>
      <figure class="video-monitor">
        <ProjectImage :project="project" priority />
        <div class="safe-frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <figcaption><span>工作流概念示意</span><b>PURE VISUAL</b><time>00:00:24:18</time></figcaption>
        <p>“{{ project.summary.split("：")[0] }}”</p>
      </figure>
    </section>

    <section class="master-timeline">
      <div class="ruler"><span v-for="n in 9" :key="n">00:{{ String((n - 1) * 15).padStart(2, "0") }}</span></div>
      <div class="playhead" aria-hidden="true"></div>
      <div class="track video-track"><strong>V1<br /><small>VIDEO</small></strong><i v-for="n in 12" :key="n"></i></div>
      <div class="track subtitle-track"><strong>S1<br /><small>SUBTITLE</small></strong><span v-for="(item, index) in project.highlights.slice(0, 5)" :key="item" :class="`clip-${index}`">{{ item }}</span></div>
      <div class="track audio-track"><strong>A1<br /><small>TTS</small></strong><div><i v-for="(height, index) in waveform" :key="index" :style="{ height: `${height}%` }"></i></div></div>
    </section>

    <div class="case-content">
      <section class="project-brief">
        <aside><span>DIRECTOR / ROLE</span><p>{{ project.role }}</p><span>PRODUCTION STACK</span><p>{{ project.stack.join(" / ") }}</p></aside>
        <div><span>PROJECT SYNOPSIS</span><p>{{ project.summary }}</p></div>
      </section>

      <section class="sync-dialogue">
        <article>
          <time>00:00:00,000 → 00:00:05,000</time><span>CHALLENGE / SOURCE</span>
          <h2>模型看见嘴型，<br />媒体需要时间。</h2><p>{{ project.challenge }}</p>
        </article>
        <article>
          <time>00:00:05,001 → 00:00:10,000</time><span>SOLUTION / CONFORMED</span>
          <h2>一条时间轴，<br />统一全部输出。</h2><p>{{ project.solution }}</p>
        </article>
      </section>

      <section class="deliverables">
        <header><span>EDIT DECISIONS / 01</span><h2>每个输出，都是时间轴上的一次决定。</h2></header>
        <div class="decision-list">
          <article v-for="(item, index) in project.highlights" :key="item">
            <time>{{ String(Math.floor(index * 5 / 60)).padStart(2, "0") }}:{{ String(index * 5 % 60).padStart(2, "0") }}:00</time>
            <span :class="index % 2 ? 'violet' : 'yellow'">{{ index % 2 ? "RENDER" : "SYNC" }}</span>
            <p>{{ item }}</p><i>{{ String(index + 1).padStart(2, "0") }}</i>
          </article>
        </div>
      </section>

      <section v-if="project.modules?.length" class="studio-rack">
        <header><span>SIGNAL ROUTING / 02</span><h2>六条轨道，一次成片。</h2></header>
        <div class="rack">
          <article v-for="(module, index) in project.modules" :key="module.name">
            <div class="channel"><span>CH {{ index + 1 }}</span><i></i><i></i><b :style="{ height: `${40 + index * 8}%` }"></b></div>
            <div><small>{{ index < 2 ? "VISION" : index < 4 ? "INFERENCE" : "MEDIA" }}</small><h3>{{ module.name }}</h3><p>{{ module.detail }}</p></div>
          </article>
        </div>
      </section>

      <section v-if="project.roadmap?.length" class="production-cues">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <header><span>PRODUCTION CUES / 03</span><h2>从离线识别到边处理边播放</h2></header>
        <div>
          <article v-for="(phase, index) in project.roadmap" :key="phase.label">
            <time>MARKER 0{{ index + 1 }}</time><span>{{ phase.label }}</span><h3>{{ phase.title }}</h3>
            <ul><li v-for="item in phase.items" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="sync-rules">
        <header><span>SYNC RULES / 04</span><h2>播放时钟只有一个。</h2></header>
        <ol><li v-for="(item, index) in project.principles" :key="item"><span>RULE {{ String(index + 1).padStart(2, "0") }}</span><p>{{ item }}</p></li></ol>
      </section>


    </div>
  </article>
</template>

<style scoped>
.studio-page{--yellow:#e7ff47;--violet:#af8cff;min-height:100vh;background:#101010;color:#f4f2ed;font-family:Inter,Arial,sans-serif}.studio-bar{height:56px;border-bottom:1px solid #383838;padding:0 24px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;font:9px monospace;letter-spacing:.12em}.studio-bar>a{color:#eee;text-decoration:none}.studio-bar>span{justify-self:end;color:#8b8b8b}.transport{display:flex;align-items:center;gap:17px;color:#8f8f8f}.transport i{font-style:normal}.transport b{width:29px;height:29px;border-radius:50%;background:#f4f2ed;color:#111;display:grid;place-items:center;padding-left:2px}.transport time{font-size:12px;color:var(--yellow);margin-left:10px}.hero{display:grid;grid-template-columns:1fr 1fr;min-height:670px;border-bottom:1px solid #393939}.hero-copy{padding:7vw 5vw;display:flex;flex-direction:column;justify-content:center}.hero-copy>p{font:10px monospace;color:var(--yellow);letter-spacing:.16em}.hero-copy h1{font-size:clamp(66px,9vw,145px);line-height:1.1;letter-spacing:-.07em;margin:40px 0}.hero-copy h1 i{font-style:normal;color:transparent;-webkit-text-stroke:1px var(--violet)}.hero-copy h2{font-size:18px;font-weight:400;max-width:600px;line-height:1.5}.hero-meta{display:flex;gap:35px;margin-top:60px;font:9px monospace;color:#797979}.video-monitor{position:relative;margin:0;background:#050505;overflow:hidden;border-left:1px solid #393939}.video-monitor img{width:100%;height:100%;object-fit:contain;display:block;filter:contrast(1.08)}.video-monitor::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 80%,#000b)}.safe-frame{position:absolute;inset:8%}.safe-frame i{position:absolute;width:40px;height:40px;border:1px solid var(--yellow)}.safe-frame i:nth-child(1){left:0;top:0;border-width:1px 0 0 1px}.safe-frame i:nth-child(2){right:0;top:0;border-width:1px 1px 0 0}.safe-frame i:nth-child(3){left:0;bottom:0;border-width:0 0 1px 1px}.safe-frame i:nth-child(4){right:0;bottom:0;border-width:0 1px 1px 0}.video-monitor figcaption{position:absolute;z-index:2;left:22px;right:22px;top:22px;display:grid;grid-template-columns:1fr auto auto;gap:25px;font:9px monospace}.video-monitor figcaption b{color:var(--yellow)}.video-monitor>p{position:absolute;z-index:2;left:8%;right:8%;bottom:8%;font-size:22px;text-align:center;text-shadow:0 2px 7px #000}.master-timeline{position:relative;border-bottom:1px solid #393939;padding-top:28px;background:#181818;overflow:hidden}.ruler{position:absolute;left:112px;right:10px;top:5px;display:flex;justify-content:space-between;color:#777;font:8px monospace}.ruler::after{content:"";position:absolute;left:0;right:0;bottom:-9px;height:6px;background:repeating-linear-gradient(90deg,#565656 0 1px,transparent 1px 2.5%)}.playhead{position:absolute;z-index:3;left:43%;top:18px;bottom:0;width:1px;background:#ff5b52}.playhead::before{content:"";position:absolute;left:-5px;width:11px;height:8px;background:#ff5b52}.track{height:62px;border-top:1px solid #303030;display:grid;grid-template-columns:105px 1fr;position:relative}.track>strong{font:10px/1.2 monospace;padding:15px;color:#ccc;background:#121212;border-right:1px solid #353535}.track>strong small{color:#666}.video-track{grid-template-columns:105px repeat(12,1fr)}.video-track i{background:linear-gradient(135deg,#292929,#191919);border-right:1px solid #414141}.subtitle-track{grid-template-columns:105px repeat(10,1fr);gap:2px}.subtitle-track span{grid-column:span 2;background:#584c72;color:#e9dcff;padding:8px;font:8px/1.4 monospace;overflow:hidden}.subtitle-track span:nth-child(even){background:#7f7138;color:#fff8bc}.audio-track>div{display:flex;align-items:center;gap:3px;padding:7px;background:#171726}.audio-track>div i{flex:1;max-width:6px;background:var(--violet)}.case-content{max-width:1400px;margin:auto;padding:0 30px}.project-brief{display:grid;grid-template-columns:.7fr 1.3fr;border:1px solid #383838;border-top:0}.project-brief>*{padding:55px}.project-brief aside{border-right:1px solid #383838;display:grid;grid-template-columns:1fr;gap:9px}.project-brief span,.sync-dialogue span,.deliverables header span,.studio-rack header span,.production-cues header span,.sync-rules header span{font:9px monospace;color:var(--yellow);letter-spacing:.13em}.project-brief aside p{font-size:12px;line-height:1.65;margin:0 0 20px}.project-brief>div p{font-size:21px;line-height:1.7;margin:15px 0}.sync-dialogue{display:grid;grid-template-columns:1fr 1fr}.sync-dialogue article{min-height:580px;padding:55px;border:1px solid #393939;border-top:0;display:flex;flex-direction:column}.sync-dialogue article+article{border-left:0;background:#e7ff47;color:#111}.sync-dialogue time{font:9px monospace;color:#777}.sync-dialogue article+article span{color:#4a5416}.sync-dialogue h2{font-size:clamp(40px,5vw,68px);line-height:1.05;letter-spacing:-.055em;margin:auto 0 35px}.sync-dialogue p{font-size:13px;line-height:1.9}.deliverables{padding:120px 0}.deliverables>header,.studio-rack>header,.production-cues>header,.sync-rules>header{display:grid;grid-template-columns:.4fr 1fr;margin-bottom:55px}.deliverables h2,.studio-rack h2,.production-cues h2,.sync-rules h2{font-size:clamp(40px,6vw,80px);line-height:1;letter-spacing:-.055em;margin:0}.decision-list{border-top:1px solid #393939}.decision-list article{display:grid;grid-template-columns:100px 70px 1fr 30px;gap:18px;padding:20px;border-bottom:1px solid #393939;align-items:center}.decision-list time,.decision-list article>span,.decision-list article>i{font:9px monospace}.decision-list article>span{padding:5px;text-align:center;color:#111}.decision-list .yellow{background:var(--yellow)}.decision-list .violet{background:var(--violet)}.decision-list article>i{font-style:normal;color:#777}.decision-list p{margin:0;font-size:13px}.studio-rack{padding-bottom:120px}.rack{display:grid;grid-template-columns:1fr 1fr;border:1px solid #393939}.rack article{display:grid;grid-template-columns:90px 1fr;min-height:220px;border-right:1px solid #393939;border-bottom:1px solid #393939}.rack article:nth-child(even){border-right:0}.channel{position:relative;background:#191919;border-right:1px solid #393939;padding:14px;text-align:center}.channel span{font:9px monospace;color:#858585}.channel i{display:inline-block;width:8px;height:8px;border-radius:50%;background:#555;margin:14px 3px}.channel i:first-of-type{background:var(--yellow);box-shadow:0 0 8px var(--yellow)}.channel b{position:absolute;width:8px;bottom:20px;left:41px;background:linear-gradient(var(--yellow),var(--violet));max-height:110px}.rack article>div:last-child{padding:30px}.rack small{font:9px monospace;color:var(--violet)}.rack h3{font-size:22px;margin:15px 0}.rack p{font-size:12px;color:#999;line-height:1.7}.production-cues{padding-bottom:120px}.production-cues>div{display:grid;grid-template-columns:1fr 1fr}.production-cues article{padding:45px;min-height:380px;border:1px solid #393939;position:relative}.production-cues article+article{border-left:0}.production-cues time{display:block;color:#ff6258;font:9px monospace;margin-bottom:70px}.production-cues article>span{font:10px monospace;background:var(--violet);color:#111;padding:7px}.production-cues h3{font-size:27px;margin:24px 0}.production-cues ul{list-style:none;padding:0;color:#999;font-size:12px;line-height:2}.production-cues li::before{content:"◆";color:var(--yellow);font-size:7px;margin-right:10px}.sync-rules{padding-bottom:100px}.sync-rules ol{list-style:none;padding:0;margin:0;border-top:1px solid #393939}.sync-rules li{display:grid;grid-template-columns:160px 1fr;padding:28px 0;border-bottom:1px solid #393939}.sync-rules li span{color:var(--violet)}.sync-rules li p{margin:0;font-size:14px;line-height:1.7}.pager{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #393939}.pager a{display:flex;flex-direction:column;gap:10px;padding:40px 0;color:#f5f3ee;text-decoration:none}.pager a:last-child{text-align:right}.pager a span{font:9px monospace;color:var(--yellow)}.pager a strong{font-size:17px}
@media(max-width:900px){.studio-bar{grid-template-columns:1fr auto}.studio-bar>span{display:none}.transport i{display:none}.transport{gap:8px}.hero{grid-template-columns:1fr}.hero-copy{min-height:560px;padding:70px 20px}.hero-copy h1{font-size:61px}.hero-meta{margin-top:40px}.video-monitor{height:420px;border-left:0;border-top:1px solid #393939}.master-timeline{overflow-x:auto}.track,.ruler{min-width:800px}.project-brief,.sync-dialogue{grid-template-columns:1fr}.project-brief>*{padding:35px 24px}.project-brief aside{border-right:0;border-bottom:1px solid #383838}.sync-dialogue article{min-height:470px;padding:32px 24px}.sync-dialogue article+article{border-left:1px solid #393939}.deliverables,.studio-rack{padding:80px 0}.deliverables>header,.studio-rack>header,.production-cues>header,.sync-rules>header{display:block}.deliverables h2,.studio-rack h2,.production-cues h2,.sync-rules h2{margin-top:24px}.decision-list article{grid-template-columns:65px 58px 1fr;padding:16px 8px;gap:8px}.decision-list article>i{display:none}.rack{grid-template-columns:1fr}.rack article{border-right:0}.production-cues>div{grid-template-columns:1fr}.production-cues article+article{border-left:1px solid #393939;border-top:0}.sync-rules li{grid-template-columns:85px 1fr}.pager a strong{font-size:12px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
@media(max-width:900px){.hero-copy{padding:40px 20px}.hero-copy h1{font-size:clamp(44px,8vw,66px);line-height:1.05;margin:24px 0}.hero-meta{margin-top:22px}}
</style>
