<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="device-page">
    <header class="os-bar">
      <RouterLink class="back" to="/projects">← 全部作品</RouterLink>
      <div class="window-title"><span class="app-icon">DM</span> Device Manager</div>
      <div class="window-actions" aria-hidden="true"><i></i><i></i><i></i></div>
    </header>

    <div class="app-window">
      <aside class="sidebar">
        <div class="brand"><span>DM</span><strong>DEVICE<br />MANAGER</strong></div>
        <nav aria-label="诊断模块">
          <a class="active" href="#overview"><i>⌁</i>项目概览</a>
          <a v-for="(module, index) in project.modules || []" :key="module.name" href="#modules">
            <i>{{ String(index + 1).padStart(2, "0") }}</i>{{ module.name }}
          </a>
        </nav>
        <div class="connection"><span></span>LOCAL MACHINE<br /><small>Diagnostics ready</small></div>
      </aside>

      <div class="case-content">
        <section id="overview" class="dashboard-head">
          <div>
            <p>{{ project.kicker }} · BUILD {{ project.year }}</p>
            <h1>{{ project.title }}</h1>
          <ProjectByline :project="project" />
            <h2>{{ project.subtitle }}</h2>
            <div class="stack"><span v-for="item in project.stack" :key="item">{{ item }}</span></div>
          </div>
          <div class="health-score"><span>能力验证</span><strong>PROBE</strong><i>按设备检测</i></div>
        </section>

        <section class="overview-grid">
          <figure class="device-preview">
            <div class="preview-toolbar"><span>设备界面示意</span><span>功能概览</span></div>
            <ProjectImage :project="project" priority />
            <figcaption>{{ project.summary }}</figcaption>
          </figure>
          <div class="meta-panel">
            <div><span>ROLE / RESPONSIBILITY</span><p>{{ project.role }}</p></div>
            <div><span>ACTIVE ADAPTERS</span><p>{{ project.stack.join(" / ") }}</p></div>
            <div class="meter"><span>CAPABILITY COVERAGE</span><b><i></i></b><small>能力可用性由实际设备检测决定</small></div>
          </div>
        </section>

        <section class="diagnosis">
          <article class="issue">
            <header><span>!</span><div><small>DIAGNOSTIC ISSUE</small><h2>Capability is fragmented</h2></div></header>
            <p>{{ project.challenge }}</p>
          </article>
          <article class="resolved">
            <header><span>✓</span><div><small>RESOLUTION APPLIED</small><h2>One explicit device model</h2></div></header>
            <p>{{ project.solution }}</p>
          </article>
        </section>

        <section id="modules" v-if="project.modules?.length" class="module-console">
          <div class="section-label"><span>CAPABILITY MATRIX</span><small>{{ project.modules.length }} 个验证模块</small></div>
          <div class="module-list">
            <article v-for="(module, index) in project.modules" :key="module.name">
              <span>{{ String(index + 1).padStart(2, "0") }}</span>
              <div><strong>{{ module.name }}</strong><p>{{ module.detail }}</p></div>
              <i>探测项</i>
            </article>
          </div>
        </section>

        <section class="report-grid">
          <div class="implementation">
            <div class="section-label"><span>REPORT / CORE IMPLEMENTATION</span><small>Copy-safe summary</small></div>
            <ul><li v-for="item in project.highlights" :key="item"><span>✓</span>{{ item }}</li></ul>
          </div>
          <div v-if="project.principles?.length" class="policies">
            <div class="section-label"><span>SAFETY POLICIES</span></div>
            <ol><li v-for="(item, index) in project.principles" :key="item"><b>P{{ index + 1 }}</b>{{ item }}</li></ol>
          </div>
        </section>

        <section v-if="project.roadmap?.length" class="updates">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
          <div class="section-label"><span>UPDATE CHANNEL</span><small>Capability rollout</small></div>
          <article v-for="phase in project.roadmap" :key="phase.label">
            <span>{{ phase.label }}</span><div><strong>{{ phase.title }}</strong><p>{{ phase.items.join(" · ") }}</p></div><i>阶段说明</i>
          </article>
        </section>


      </div>
    </div>
  </article>
</template>

<style scoped>
.device-page{min-height:100vh;background:#17191d;color:#e9edf2;font-family:Inter,"Segoe UI",sans-serif;padding:22px}.os-bar{height:48px;max-width:1500px;margin:auto;background:#292c32;border:1px solid #3c4048;border-bottom:0;border-radius:12px 12px 0 0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 16px;font-size:12px}.back{color:#aeb5c0;text-decoration:none}.back:hover{color:#fff}.window-title{display:flex;align-items:center;gap:9px;font-weight:700}.app-icon{display:grid;place-items:center;width:23px;height:23px;background:linear-gradient(135deg,#8f7cff,#5b4ac8);border-radius:6px;font-size:9px}.window-actions{justify-self:end;display:flex}.window-actions i{width:42px;height:20px;border-left:1px solid #3b3e45}.app-window{max-width:1500px;margin:auto;display:grid;grid-template-columns:230px minmax(0,1fr);background:#202329;border:1px solid #3c4048;box-shadow:0 24px 70px #06070a99}.sidebar{background:#191b20;border-right:1px solid #373a42;padding:28px 16px;display:flex;flex-direction:column;min-height:calc(100vh - 92px)}.brand{display:flex;align-items:center;gap:12px;padding:0 10px 28px}.brand>span{width:40px;height:40px;display:grid;place-items:center;background:#7564eb;border-radius:9px;font-weight:800}.brand strong{font-size:11px;line-height:1.2;letter-spacing:.13em}.sidebar nav{display:grid;gap:3px}.sidebar a{display:flex;align-items:center;gap:12px;padding:10px 12px;color:#999faa;text-decoration:none;font-size:12px;border-radius:6px}.sidebar a:hover,.sidebar a.active{background:#2a2d35;color:#fff}.sidebar a.active{box-shadow:inset 2px 0 #9485ff}.sidebar a i{font-style:normal;font-family:monospace;color:#7e8490;font-size:10px;width:20px}.connection{margin-top:auto;border-top:1px solid #353840;padding:20px 10px 0;font:10px/1.6 monospace;color:#aab0ba}.connection span{display:inline-block;width:7px;height:7px;margin-right:8px;border-radius:50%;background:#68d899;box-shadow:0 0 10px #68d899}.connection small{color:#666d78}.case-content{min-width:0;padding:42px 46px 0}.dashboard-head{display:flex;justify-content:space-between;gap:30px;align-items:flex-start;margin-bottom:32px}.dashboard-head p,.section-label{font:10px/1.2 monospace;letter-spacing:.14em;color:#8b92a0}.dashboard-head h1{font-size:clamp(42px,6vw,82px);letter-spacing:-.055em;line-height:1.1;margin:14px 0 14px}.dashboard-head h2{margin:0;color:#aeb4bf;font-weight:400;font-size:16px}.stack{display:flex;flex-wrap:wrap;gap:7px;margin-top:24px}.stack span{font:10px monospace;color:#c8c4ff;background:#302d47;border:1px solid #494469;padding:7px 10px;border-radius:4px}.health-score{min-width:150px;border:1px solid #39413f;background:#222a28;padding:16px}.health-score span,.health-score i{display:block;font:9px monospace;color:#7e8a86}.health-score strong{display:block;color:#78e6aa;font-size:24px;margin:9px 0}.health-score i{font-style:normal}.overview-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(230px,.45fr);gap:14px}.device-preview,.meta-panel{margin:0;border:1px solid #3a3e46;background:#181a1f}.preview-toolbar{display:flex;justify-content:space-between;border-bottom:1px solid #393d45;padding:10px 14px;font:9px monospace;color:#8b92a0}.preview-toolbar span:last-child{color:#73d9a1}.device-preview img{display:block;width:100%;height:clamp(260px,36vw,540px);object-fit:contain;background:radial-gradient(circle at 50% 30%,#30343e,#121419 65%)}.device-preview figcaption{padding:18px 20px;color:#b6bcc6;font-size:13px;line-height:1.7;border-top:1px solid #32363d}.meta-panel{display:grid}.meta-panel>div{padding:20px;border-bottom:1px solid #32363d}.meta-panel>div:last-child{border:0}.meta-panel span{font:9px monospace;color:#737b87}.meta-panel p{font-size:13px;line-height:1.65;margin:10px 0 0}.meter b{display:block;height:5px;background:#343840;margin:18px 0 8px}.meter b i{display:block;width:86%;height:100%;background:#7d6ff0}.meter small{color:#777f89}.diagnosis{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0 40px}.diagnosis article{border:1px solid #3a3e46;background:#22252b;padding:22px}.diagnosis header{display:flex;gap:14px;align-items:center}.diagnosis header>span{width:35px;height:35px;display:grid;place-items:center;border-radius:50%;font-weight:800}.issue header>span{background:#4a352d;color:#ffb292}.resolved header>span{background:#244338;color:#74e1ab}.diagnosis small{font:9px monospace;color:#7e8692}.diagnosis h2{font-size:17px;margin:4px 0}.diagnosis p{color:#aab1bc;font-size:13px;line-height:1.8;margin:20px 0 0}.module-console,.implementation,.policies,.updates{border:1px solid #3b3f47;background:#1a1c21}.section-label{padding:12px 15px;border-bottom:1px solid #353941;display:flex;justify-content:space-between}.module-list{display:grid;grid-template-columns:1fr 1fr}.module-list article{display:grid;grid-template-columns:34px 1fr auto;gap:12px;padding:18px;border-bottom:1px solid #31343b}.module-list article:nth-child(odd){border-right:1px solid #31343b}.module-list article>span{font:10px monospace;color:#6d7480}.module-list strong{font-size:13px}.module-list p{font-size:11px;color:#818895;margin:6px 0 0}.module-list i,.updates article i{font:9px monospace;color:#6ed89e;font-style:normal}.report-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:14px;margin:14px 0}.implementation ul,.policies ol{list-style:none;padding:8px 20px 18px;margin:0}.implementation li{display:flex;gap:12px;border-bottom:1px solid #30333a;padding:13px 0;color:#bbc1cb;font-size:12px}.implementation li span{color:#71dda5}.policies li{font-size:11px;color:#9da4af;line-height:1.6;padding:12px 0;border-bottom:1px solid #30333a}.policies b{color:#978aff;margin-right:10px}.updates article{display:grid;grid-template-columns:75px 1fr auto;gap:18px;align-items:center;padding:18px;border-bottom:1px solid #31343b}.updates article>span{font:11px monospace;color:#a899ff}.updates strong{font-size:13px}.updates p{font-size:11px;color:#818895;margin:5px 0 0}.pager{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin:45px -46px 0;background:#3b3f47}.pager a{display:flex;flex-direction:column;gap:7px;padding:28px 46px;background:#202329;color:#fff;text-decoration:none}.pager a:last-child{text-align:right}.pager a span{font:9px monospace;color:#7f8792}.pager a strong{font-size:15px}.pager a:hover{background:#272a31}
@media(max-width:900px){.device-page{padding:0}.os-bar{border-radius:0;grid-template-columns:1fr auto}.window-title{display:none}.app-window{display:block;border-left:0;border-right:0}.sidebar{display:none}.case-content{padding:28px 16px 0}.dashboard-head{display:block}.health-score{margin-top:24px}.overview-grid,.diagnosis,.report-grid{grid-template-columns:1fr}.device-preview img{height:240px}.module-list{grid-template-columns:1fr}.module-list article:nth-child(odd){border-right:0}.updates article{grid-template-columns:55px 1fr}.updates article i{display:none}.pager{margin:34px -16px 0}.pager a{padding:22px 16px}.pager a strong{font-size:12px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}

</style>
