<script setup>
import ProjectImage from '../components/ProjectImage.vue';
import ProjectByline from '../components/ProjectByline.vue';

defineProps({ project: { type: Object, required: true } });

const sequence = [
  { time: '00', action: 'Start()', detail: '建立会话，确认后端与系统权限。' },
  { time: '01', action: 'Submit(event)', detail: '验证事件，进入有界队列。' },
  { time: '02', action: 'WaitForIdle()', detail: '等待已排队的输入处理完成。' },
  { time: '03', action: 'Stop()', detail: '释放本实例按下的输入，关闭资源。' },
];
const integration = `find_package(BreInput CONFIG REQUIRED)
target_link_libraries(your_app PRIVATE BreInput::BreInput)`;
</script>

<template>
  <article class="input-page">
    <header class="input-masthead">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <span>INPUT LAB / {{ project.number }} / {{ project.year }}</span>
    </header>

    <div class="input-content">
      <section class="input-hero" aria-labelledby="input-title">
        <div>
          <p class="label">{{ project.kicker }}</p>
          <h1 id="input-title">{{ project.title }}<span aria-hidden="true">_</span></h1>
          <h2>一次按下，<br />也照顾好每一次释放。</h2>
          <p class="subtitle">{{ project.subtitle }}</p>
          <ProjectByline :project="project" />
          <a class="source-link" :href="project.sourceUrl" target="_blank" rel="noopener noreferrer">查看 GitHub 仓库 ↗</a>
        </div>
        <figure class="input-cover">
          <ProjectImage :project="project" priority />
          <figcaption>输入事件与模块示意 / {{ project.visualLabel }}</figcaption>
        </figure>
      </section>

      <section class="overview" aria-labelledby="overview-title">
        <div><p class="label">01 / THE INPUT LAYER</p><h2 id="overview-title">把系统差异，<br />收进输入层。</h2></div>
        <div><p>{{ project.summary }}</p><p class="scope-note">独立静态库，不依赖 BreFlow、BreConn 或 FFmpeg。网络传输、远程授权和投屏协议由上层应用负责。</p></div>
      </section>

      <section class="module-section" aria-labelledby="modules-title">
        <header class="section-heading"><div><p class="label">02 / FOUR BUILDING BLOCKS</p><h2 id="modules-title">同一套事件，四块积木。</h2></div><span class="keycap" aria-hidden="true">⌘</span></header>
        <div class="module-grid">
          <article v-for="(module, index) in project.modules" :key="module.name">
            <span class="module-number">0{{ index + 1 }}</span><h3>{{ module.name }}</h3><p>{{ module.detail }}</p>
          </article>
        </div>
      </section>

      <section class="lifecycle" aria-labelledby="lifecycle-title">
        <header><p class="label">03 / SESSION LIFECYCLE</p><h2 id="lifecycle-title">输入有顺序，<br />会话有收尾。</h2><p>Submit 成功表示验证并入队；实际注入失败通过错误回调交给应用处理。</p></header>
        <ol class="sequence">
          <li v-for="step in sequence" :key="step.time"><span>{{ step.time }}</span><div><h3>{{ step.action }}</h3><p>{{ step.detail }}</p></div></li>
        </ol>
      </section>

      <section class="decisions" aria-label="设计问题与实现方式">
        <article><p class="label">THE CHALLENGE</p><h2>事件顺序之外，<br />还有线程与权限。</h2><p>{{ project.challenge }}</p></article>
        <article><p class="label">THE DESIGN</p><h2>统一接口，<br />明确失败的边界。</h2><p>{{ project.solution }}</p></article>
      </section>

      <section class="platform-section" aria-labelledby="platform-title">
        <header class="section-heading"><div><p class="label">04 / PLATFORM CAPABILITIES</p><h2 id="platform-title">相同接口，尊重各自的系统。</h2></div></header>
        <div class="platform-grid">
          <article v-for="platform in project.platforms" :key="platform.name">
            <p class="label">{{ platform.backend }}</p><h3>{{ platform.name }}</h3>
            <dl><div><dt>注入</dt><dd>{{ platform.injection }}</dd></div><div><dt>监听</dt><dd>{{ platform.capture }}</dd></div></dl>
            <p class="platform-note">{{ platform.note }}</p>
          </article>
        </div>
        <p class="scope-note">Wayland 使用系统 Portal 授权流程，受控捕获不等于被动全局监听。运行时缺少 libei 或必需符号时，注入可回退至 Portal Notify，受控捕获返回结构化错误。</p>
      </section>

      <section class="details" aria-labelledby="details-title">
        <div><p class="label">05 / ENGINEERING DETAILS</p><h2 id="details-title">让小动作，<br />有可靠的落点。</h2></div>
        <ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul>
      </section>

      <section class="integration" aria-labelledby="integration-title">
        <div><p class="label">06 / READY TO INTEGRATE</p><h2 id="integration-title">接入你的 C++ 应用。</h2><p>安装 SDK 后，设置 CMAKE_PREFIX_PATH 指向安装目录，通过导出目标链接静态库。平台依赖随目标传递。</p></div>
        <div class="code-panel"><span>CMakeLists.txt</span><pre><code>{{ integration }}</code></pre></div>
        <div class="stack"><span v-for="item in project.stack" :key="item">{{ item }}</span></div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.input-page{--input-ink:#29243b;--input-muted:#625c71;--input-purple:#6440be;--input-line:#d9d2e3;background:#f8f5ef;color:var(--input-ink)}
.input-masthead{display:flex;justify-content:space-between;align-items:center;gap:18px;min-height:64px;border-bottom:1px solid var(--input-line);padding:12px clamp(20px,5vw,80px);font:11px/1.6 monospace}
.input-masthead a{display:inline-flex;align-items:center;min-height:44px}.input-masthead span{color:var(--input-muted)}
.input-content{width:min(1240px,calc(100% - 80px));margin:auto}.input-content section{padding-block:72px;min-width:0;border-bottom:1px solid var(--input-line)}
.label{font:600 10px/1.6 monospace;letter-spacing:.11em;color:var(--input-purple);margin:0 0 20px}
h1,h2,h3,p{overflow-wrap:anywhere}h2{font-size:clamp(27px,3vw,40px);line-height:1.4;letter-spacing:-.035em;margin:0 0 22px}h3{font-size:21px;line-height:1.4;margin:18px 0 12px}p{font-size:14px;line-height:1.95}
.input-hero{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}.input-hero h1{font-size:clamp(58px,7.6vw,108px);line-height:1.1;letter-spacing:-.075em;margin:28px 0}.input-hero h1 span{color:var(--input-purple)}.input-hero h2{font-size:clamp(26px,2.6vw,36px)}.subtitle{color:var(--input-muted);max-width:440px}.source-link{display:inline-flex;align-items:center;min-height:46px;padding:12px 18px;background:var(--input-purple);color:#fff;border-radius:6px;font-size:12px}
.input-cover{margin:0;padding:16px;background:#ede7f4;border:1px solid var(--input-line);border-radius:16px;box-shadow:10px 12px 0 #ded5e9;transform:rotate(2deg)}.input-cover :deep(img){width:100%;height:auto;aspect-ratio:3/2;object-fit:contain}.input-cover figcaption{font:9px/1.8 monospace;color:var(--input-muted);margin-top:15px}
.overview,.details{display:grid;grid-template-columns:.8fr 1.2fr;gap:80px}.overview p:first-child{margin-top:0}.scope-note{color:var(--input-muted);font-size:12px;border-left:3px solid #b4a0d1;padding-left:18px;margin:24px 0 0}
.section-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:30px;gap:24px}.section-heading h2{margin-bottom:0}.keycap{display:grid;place-items:center;width:68px;height:68px;border:1px solid #b8a8ce;border-bottom-width:6px;border-radius:12px;background:#e8def6;font-size:36px;transform:rotate(8deg);flex-shrink:0}
.module-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.module-grid article{padding:25px 22px;border:1px solid var(--input-line);border-bottom-width:5px;border-radius:10px;background:#fffdf9}.module-grid article:nth-child(2){background:#e8def6}.module-number{font:12px monospace;color:var(--input-purple)}.module-grid h3{font:600 18px/1.5 monospace}.module-grid p{font-size:13px;color:var(--input-muted);margin-bottom:0}
.input-content .lifecycle{display:grid;grid-template-columns:1fr 1fr;gap:72px;padding:48px;margin-top:72px;background:#302940;color:#f8f5ef;border-radius:14px;border:0}.lifecycle .label{color:#c8b3f5}.lifecycle header>p:last-child{color:#d3cadd;max-width:360px}.sequence{list-style:none;padding:0;margin:0}.sequence li{display:flex;gap:22px;border-bottom:1px solid #675973;padding-block:18px}.sequence li:first-child{padding-top:0}.sequence li:last-child{border:0;padding-bottom:0}.sequence li>span{display:grid;place-items:center;flex-shrink:0;width:32px;height:32px;background:#c8b3f5;color:#302940;border-radius:7px;font:12px monospace}.sequence h3{font:16px/1.5 monospace;margin:0}.sequence p{font-size:12px;color:#d3cadd;margin:7px 0 0}
.decisions{display:grid;grid-template-columns:1fr 1fr;gap:72px}.decisions article>p:last-child{color:var(--input-muted);margin-bottom:0}.platform-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.platform-grid article{border:1px solid var(--input-line);border-radius:10px;padding:28px;background:#fffdf9}.platform-grid .label{margin-bottom:10px}.platform-grid h3{font-size:25px;margin:0 0 22px}.platform-grid dl{margin:0}.platform-grid dl>div{display:grid;grid-template-columns:40px 1fr;gap:15px;margin-top:10px;font-size:13px;line-height:1.8}.platform-grid dt{color:var(--input-purple)}.platform-grid dd{margin:0}.platform-note{font-size:12px;color:var(--input-muted);padding-top:18px;margin:20px 0 0;border-top:1px dashed var(--input-line)}
.details ul{list-style:none;padding:0;margin:0}.details li{position:relative;padding:16px 0 16px 28px;border-bottom:1px solid var(--input-line);font-size:14px;line-height:1.9}.details li:first-child{padding-top:0}.details li::before{content:'↳';position:absolute;left:0;color:var(--input-purple)}.details li:last-child{border:0;padding-bottom:0}
.integration{display:grid;grid-template-columns:1fr 1.2fr;gap:24px 48px}.integration p:not(.label){color:var(--input-muted)}.code-panel{min-width:0;align-self:center;background:#ebe5f2;border:1px solid var(--input-line);border-radius:10px;padding:24px}.code-panel>span{font:11px monospace;color:var(--input-muted)}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/2 monospace;margin:20px 0 0}.stack{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:8px}.stack span{padding:7px 10px;border:1px solid var(--input-line);border-radius:5px;font:11px/1.5 monospace}
@media(max-width:1000px){.input-content{width:calc(100% - 48px)}.input-hero{gap:28px}.input-hero h1{font-size:70px}.module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.overview,.details,.decisions{gap:36px}.input-content .lifecycle{padding:32px;gap:36px}.integration{grid-template-columns:1fr}}
@media(max-width:700px){.input-masthead{padding-inline:20px;font-size:9px}.input-content{width:calc(100% - 40px)}.input-content section{padding-block:44px}.input-hero,.overview,.details,.decisions{grid-template-columns:1fr;gap:24px}.input-hero h1{font-size:clamp(54px,13vw,76px);margin-block:20px}.input-cover{transform:none;box-shadow:5px 6px 0 #ded5e9;margin:10px 6px 6px 0}.module-grid,.platform-grid{grid-template-columns:1fr}.module-grid article{padding:22px}.input-content .lifecycle{grid-template-columns:1fr;padding:26px 22px;margin-top:44px;gap:24px}.lifecycle h2 br,.overview h2 br,.details h2 br{display:none}.platform-grid article{padding:24px}.section-heading{gap:12px}.keycap{width:50px;height:50px;font-size:28px}.code-panel{padding:18px}}
</style>
