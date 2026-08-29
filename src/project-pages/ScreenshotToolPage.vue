<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="capture-page">
    <section class="desktop-canvas">
      <img class="wallpaper" :src="project.cover" :alt="project.coverAlt" />
      <div class="dim" aria-hidden="true"></div>
      <header class="capture-topbar">
        <RouterLink to="/projects">ESC&nbsp;&nbsp;退出截图 / 返回项目</RouterLink>
        <span>{{ project.kicker }} · {{ project.year }}</span>
      </header>

      <div class="selection">
        <i class="handle nw"></i><i class="handle ne"></i><i class="handle sw"></i><i class="handle se"></i>
        <span class="measure top">1280 px</span><span class="measure side">720 px</span>
        <div class="selection-title">
          <p>{{ project.number }} / {{ project.visualLabel }}</p>
          <h1>{{ project.title }}</h1>
          <h2>{{ project.subtitle }}</h2>
          <p class="summary">{{ project.summary }}</p>
        </div>
      </div>

      <div class="floating-tools" aria-label="截图工具">
        <span v-for="(module, index) in (project.modules || []).slice(0, 6)" :key="module.name" :class="{ active: index === 0 }">
          <b>{{ ["□", "▱", "◷", "⌾", "⇩", "Aa"][index] }}</b>{{ module.name }}
        </span>
      </div>
      <div class="coordinates">X 0640&nbsp;&nbsp;Y 0360&nbsp;&nbsp;RGB 20 23 27</div>
    </section>

    <main>
      <section class="capture-spec">
        <div class="spec-title"><span>CAPTURE_001.PNG</span><h2>选完，立即得到结果。</h2></div>
        <div class="spec-meta">
          <div><span>OWNER / ROLE</span><p>{{ project.role }}</p></div>
          <div><span>FORMAT / STACK</span><p>{{ project.stack.join(" · ") }}</p></div>
        </div>
      </section>

      <section class="before-after">
        <article class="before">
          <header><span>BEFORE</span><i>跨屏偏移</i></header>
          <div class="crop-lines" aria-hidden="true"><b></b><b></b><b></b></div>
          <h2>看似只是一个矩形</h2>
          <p>{{ project.challenge }}</p>
        </article>
        <article class="after">
          <header><span>AFTER</span><i>像素对齐</i></header>
          <div class="pixel-grid" aria-hidden="true"><i v-for="n in 24" :key="n"></i></div>
          <h2>让坐标、像素与动作对齐</h2>
          <p>{{ project.solution }}</p>
        </article>
      </section>

      <section class="actions">
        <header><p>06 QUICK ACTIONS</p><h2>主路径里，只留下必要动作</h2></header>
        <div class="action-grid">
          <article v-for="(item, index) in project.highlights" :key="item">
            <span>{{ ["⌗", "↯", "⇧", "◷", "⌾", "↔"][index] || "+" }}</span>
            <p>{{ item }}</p><i>{{ String(index + 1).padStart(2, "0") }}</i>
          </article>
        </div>
      </section>

      <section v-if="project.modules?.length" class="modes">
        <div class="mode-heading"><span>MODE PALETTE</span><h2>每种能力都在主流程之外待命</h2></div>
        <article v-for="(module, index) in project.modules" :key="module.name">
          <span>{{ String(index + 1).padStart(2, "0") }}</span><h3>{{ module.name }}</h3><p>{{ module.detail }}</p><i>↗</i>
        </article>
      </section>

      <section v-if="project.roadmap?.length" class="timer-roadmap">
        <div class="timer-face"><span>DELAY</span><strong>03</strong><small>SECONDS</small></div>
        <div class="phases">
          <article v-for="(phase, index) in project.roadmap" :key="phase.label">
            <span>0{{ index + 1 }}:00</span><div><small>{{ phase.label }}</small><h3>{{ phase.title }}</h3><p>{{ phase.items.join(" / ") }}</p></div>
          </article>
        </div>
      </section>

      <section v-if="project.principles?.length" class="capture-rules">
        <header><span>SELECTION RULES</span><h2>截图工具不该打断截图。</h2></header>
        <ol><li v-for="(item, index) in project.principles" :key="item"><span>0{{ index + 1 }}</span><p>{{ item }}</p></li></ol>
      </section>

      <nav class="pager" aria-label="项目翻页">
        <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><span>← 上一个画面</span><strong>{{ previousProject.title }}</strong></RouterLink><span v-else></span>
        <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><span>下一个画面 →</span><strong>{{ nextProject.title }}</strong></RouterLink>
      </nav>
    </main>
  </article>
</template>

<style scoped>
.capture-page{min-height:100vh;background:#f2f0e9;color:#18191b;font-family:Arial,"Microsoft YaHei",sans-serif}.desktop-canvas{height:min(790px,90vh);min-height:620px;position:relative;overflow:hidden;background:#15191d}.wallpaper{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.65) brightness(.8);transform:scale(1.02)}.dim{position:absolute;inset:0;background:rgba(8,11,14,.55)}.capture-topbar{position:absolute;z-index:3;inset:0 0 auto;display:flex;justify-content:space-between;padding:22px 30px;color:#fff;font:11px monospace;letter-spacing:.08em}.capture-topbar a{color:#fff;text-decoration:none}.selection{position:absolute;z-index:2;left:12%;right:12%;top:13%;bottom:15%;border:2px solid #fff;box-shadow:0 0 0 9999px rgba(5,8,10,.26);background:rgba(16,19,21,.08);display:flex;align-items:flex-end}.handle{position:absolute;width:12px;height:12px;background:#fff;border:1px solid #111}.nw{left:-7px;top:-7px}.ne{right:-7px;top:-7px}.sw{left:-7px;bottom:-7px}.se{right:-7px;bottom:-7px}.measure{position:absolute;background:#fff;color:#101214;padding:5px 9px;font:10px monospace}.measure.top{top:-28px;left:50%;transform:translateX(-50%)}.measure.side{right:-56px;top:50%;transform:rotate(90deg)}.selection-title{width:min(820px,88%);padding:0 5% 7%;color:#fff;text-shadow:0 2px 15px #000}.selection-title>p:first-child{font:11px monospace;letter-spacing:.16em}.selection-title h1{font-size:clamp(65px,11vw,170px);line-height:.75;letter-spacing:-.075em;margin:16px 0 25px}.selection-title h2{font-size:clamp(17px,2vw,28px);font-weight:400;margin:0}.summary{font-size:13px;line-height:1.75;max-width:720px;color:#dce2e5;margin:18px 0 0}.floating-tools{position:absolute;z-index:4;bottom:28px;left:50%;transform:translateX(-50%);display:flex;background:#fff;box-shadow:0 12px 35px #0008;padding:5px;border-radius:8px;color:#212326}.floating-tools span{min-width:64px;padding:8px 10px;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:9px;border-right:1px solid #e2e2e2}.floating-tools span:last-child{border:0}.floating-tools .active{background:#17191c;color:#fff;border-radius:5px}.floating-tools b{font-size:17px}.coordinates{position:absolute;z-index:3;right:26px;bottom:26px;background:#101214;color:#a9ffdf;padding:7px 10px;font:9px monospace}main{max-width:1320px;margin:auto;padding:0 30px}.capture-spec{display:grid;grid-template-columns:1fr 1fr;border-left:1px solid #222;border-right:1px solid #222}.spec-title{padding:70px 6vw;border-right:1px solid #222}.spec-title span,.spec-meta span{font:10px monospace;letter-spacing:.12em}.spec-title h2{font-size:clamp(32px,4vw,62px);line-height:1.08;letter-spacing:-.045em;margin:25px 0}.spec-meta{display:grid;grid-template-rows:1fr 1fr}.spec-meta div{padding:45px;border-bottom:1px solid #222}.spec-meta div:last-child{border-bottom:0}.spec-meta p{font-size:14px;line-height:1.7;margin:14px 0 0}.before-after{display:grid;grid-template-columns:1fr 1fr;border:1px solid #222}.before-after article{min-height:520px;padding:34px;display:flex;flex-direction:column}.before{background:#d9dad6;border-right:1px solid #222}.after{background:#202529;color:#f7f8f5}.before-after header{display:flex;justify-content:space-between;font:10px monospace}.before-after header i{font-style:normal}.before-after h2{font-size:33px;letter-spacing:-.04em;margin-top:auto}.before-after p{font-size:13px;line-height:1.85;max-width:510px}.crop-lines{height:220px;margin:40px 5%;border:1px dashed #494e53;position:relative;transform:rotate(-2deg)}.crop-lines b{position:absolute;background:#24282c}.crop-lines b:nth-child(1){height:1px;left:-10%;right:25%;top:25%}.crop-lines b:nth-child(2){width:1px;top:-10%;bottom:15%;right:20%}.crop-lines b:nth-child(3){height:18px;width:18px;right:calc(20% - 9px);top:calc(25% - 9px);background:#f2f0e9;border:1px solid #222}.pixel-grid{display:grid;grid-template-columns:repeat(8,1fr);height:220px;margin:40px 5%;gap:2px}.pixel-grid i{background:#2c3338;border:1px solid #343d42}.pixel-grid i:nth-child(3n){background:#19d5a3}.pixel-grid i:nth-child(7n){background:#fff}.actions{padding:100px 0}.actions header{display:grid;grid-template-columns:1fr 2fr;align-items:end;margin-bottom:42px}.actions header p{font:10px monospace}.actions header h2{font-size:clamp(34px,5vw,66px);letter-spacing:-.05em;margin:0}.action-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #222}.action-grid article{position:relative;min-height:190px;border-right:1px solid #222;border-bottom:1px solid #222;padding:25px;display:flex;flex-direction:column}.action-grid article:nth-child(3n){border-right:0}.action-grid article>span{font-size:30px}.action-grid article p{margin-top:auto;font-size:14px}.action-grid article i{position:absolute;right:15px;top:15px;font:9px monospace}.modes{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #222;border-left:1px solid #222}.mode-heading{grid-column:span 3;padding:50px;border-right:1px solid #222;border-bottom:1px solid #222}.mode-heading span{font:10px monospace}.mode-heading h2{font-size:38px;margin:15px 0 0}.modes article{min-height:190px;padding:25px;border-right:1px solid #222;border-bottom:1px solid #222;position:relative}.modes article>span{font:10px monospace}.modes article h3{font-size:22px;margin:34px 0 8px}.modes article p{font-size:12px;color:#65686a;line-height:1.6}.modes article i{position:absolute;right:18px;top:18px;font-style:normal}.timer-roadmap{margin:90px 0;display:grid;grid-template-columns:330px 1fr;background:#ff583f;color:#17191b}.timer-face{display:flex;min-height:350px;flex-direction:column;justify-content:center;align-items:center;border-right:1px solid #17191b}.timer-face span,.timer-face small{font:10px monospace;letter-spacing:.2em}.timer-face strong{font:140px/.8 Arial;letter-spacing:-.1em;margin:30px 15px 30px 0}.phases article{display:grid;grid-template-columns:80px 1fr;gap:20px;padding:44px;border-bottom:1px solid #17191b}.phases article:last-child{border:0}.phases article>span,.phases small{font:10px monospace}.phases h3{font-size:24px;margin:8px 0}.phases p{font-size:12px;line-height:1.6}.capture-rules{display:grid;grid-template-columns:.8fr 1.2fr;border:1px solid #222;margin-bottom:90px}.capture-rules header{padding:45px;background:#202529;color:#fff}.capture-rules header span{font:10px monospace}.capture-rules header h2{font-size:42px;letter-spacing:-.05em;margin:80px 0 0}.capture-rules ol{list-style:none;margin:0;padding:0}.capture-rules li{display:grid;grid-template-columns:50px 1fr;padding:25px;border-bottom:1px solid #222}.capture-rules li:last-child{border:0}.capture-rules li span{font:10px monospace}.capture-rules li p{font-size:13px;line-height:1.7;margin:0}.pager{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #222}.pager a{display:flex;flex-direction:column;gap:9px;color:#191a1c;text-decoration:none;padding:35px 0}.pager a:last-child{text-align:right}.pager a span{font:10px monospace}.pager a strong{font-size:18px}
@media(max-width:700px){.desktop-canvas{min-height:640px;height:92vh}.capture-topbar span{display:none}.selection{left:20px;right:20px;top:90px;bottom:145px}.selection-title{width:auto;padding:25px}.selection-title h1{font-size:58px}.summary{font-size:12px}.measure.side,.coordinates{display:none}.floating-tools{bottom:24px;max-width:calc(100% - 24px);overflow:auto}.floating-tools span{min-width:55px;padding:7px 5px}main{padding:0 14px}.capture-spec,.before-after,.capture-rules{grid-template-columns:1fr}.spec-title{border-right:0;border-bottom:1px solid #222;padding:45px 24px}.spec-meta div{padding:26px 24px}.before{border-right:0;border-bottom:1px solid #222}.before-after article{min-height:430px;padding:24px}.actions{padding:70px 0}.actions header{display:block}.actions header h2{margin-top:20px}.action-grid{grid-template-columns:1fr 1fr}.action-grid article:nth-child(3n){border-right:1px solid #222}.action-grid article:nth-child(2n){border-right:0}.modes{grid-template-columns:1fr}.mode-heading{grid-column:1;padding:32px 24px}.timer-roadmap{grid-template-columns:1fr}.timer-face{min-height:280px;border-right:0;border-bottom:1px solid #17191b}.phases article{padding:28px 20px}.capture-rules header h2{margin-top:35px}.pager a strong{font-size:13px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}.wallpaper{transform:none}}
</style>
