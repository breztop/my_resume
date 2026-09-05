<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="terminal-page">
    <header class="term-tabs">
      <RouterLink to="/projects">← 全部作品</RouterLink>
      <span class="active">● conutline — report</span><span>＋</span>
      <i>— □ ×</i>
    </header>

    <div class="case-content">
      <section class="command-hero">
        <p class="prompt"><span>dev@portfolio</span>:<b>~/projects/{{ project.id }}</b>$ conutline scan . --agent-context</p>
        <div class="scan-output">
          <p>[<i>INFO</i>] reading .gitignore rules...</p>
          <p>[<i>INFO</i>] classifying source files...</p>
          <p>[<strong>DONE</strong>] report generated</p>
        </div>
        <div class="title-row">
          <div>
            <p>{{ project.kicker }} / {{ project.year }}</p>
            <h1>{{ project.title }}</h1>
          <ProjectByline :project="project" />
            <h2>{{ project.subtitle }}</h2>
          </div>
          <div class="ascii" aria-hidden="true">
            <pre>  ┌────────────────────┐
  │ source → analysis │
  │ files → statistics│
  │ rules → filtering │
  │ report → context  │
  └────────────────────┘</pre>
          </div>
        </div>
        <div class="hero-report">
          <figure><ProjectImage :project="project" priority /><figcaption>{{ project.visualLabel }}</figcaption></figure>
          <div class="summary"><span>README_SUMMARY.md</span><p>{{ project.summary }}</p></div>
        </div>
      </section>

      <section class="system-info">
        <div><span>$ whoami --role</span><p>{{ project.role }}</p></div>
        <div><span>$ conutline --backends</span><p><b v-for="item in project.stack" :key="item">{{ item }}</b></p></div>
      </section>

      <section class="diff-case">
        <header><span>$ git diff --problem solution</span><i>2 blocks</i></header>
        <div class="diff-body">
          <article class="removed">
            <span>@@ challenge @@</span><h2>总数不是答案。</h2>
            <p>{{ project.challenge }}</p>
          </article>
          <article class="added">
            <span>@@ solution @@</span><h2>把仓库压缩成上下文。</h2>
            <p>{{ project.solution }}</p>
          </article>
        </div>
      </section>

      <section class="file-table">
        <header><span>$ conutline list --sort=impact</span><h2>CORE_IMPLEMENTATION.log</h2></header>
        <div class="table-head"><span>MODE</span><span>PATH / CAPABILITY</span><span>TYPE</span><span>INDEX</span></div>
        <div v-for="(item, index) in project.highlights" :key="item" class="file-row">
          <span>-rw-r--r--</span><p><i>{{ index === project.highlights.length - 1 ? "reports/" : index % 2 ? "scanner/" : "src/" }}</i>{{ item }}</p>
          <span>{{ index % 3 === 0 ? "CORE" : index % 3 === 1 ? "RULE" : "OUTPUT" }}</span>
          <b>{{ String(index + 1).padStart(2, "0") }}</b>
        </div>
        <footer><span>{{ project.highlights.length }} entries</span><span>能力概览</span></footer>
      </section>

      <section class="language-report" aria-label="分析流程示意">
        <div class="bars">
          <span>Static Analysis <i style="width:82%"></i><b>静态分析</b></span>
          <span>Gitignore Rules <i style="width:64%"></i><b>忽略规则</b></span>
          <span>File Metrics <i style="width:51%"></i><b>文件统计</b></span>
          <span>Agent Context <i style="width:37%"></i><b>上下文</b></span>
        </div>
        <div class="agent-prompt"><header>agent_context.txt <span>输出示意</span></header><pre><code># Repository overview
purpose: codebase statistics
focus:
  - language distribution
  - high-impact files
  - ignored boundaries
  - context-efficient summary

status: ready_for_agent</code></pre></div>
      </section>

      <section v-if="project.modules?.length" class="optional-list">
        <header><span>$ tree modules/</span></header>
        <p v-for="(module, index) in project.modules" :key="module.name"><b>{{ index === project.modules.length - 1 ? "└──" : "├──" }}</b> {{ module.name }} <i># {{ module.detail }}</i></p>
      </section>

      <section v-if="project.roadmap?.length" class="optional-list">
        <p class="roadmap-note">后续演进 · 以下为路线图，具体阶段以项目说明为准。</p>
        <header><span>$ conutline roadmap --all</span></header>
        <article v-for="phase in project.roadmap" :key="phase.label"><b>[{{ phase.label }}]</b> {{ phase.title }}<p>{{ phase.items.join(" · ") }}</p></article>
      </section>

      <section v-if="project.principles?.length" class="optional-list">
        <header><span>$ cat PRINCIPLES.md</span></header>
        <p v-for="(item, index) in project.principles" :key="item">{{ index + 1 }}. {{ item }}</p>
      </section>

      <div class="complete"><span>✓</span><div><strong>Scan complete</strong><p>Report is ready for humans, scripts, and AI agents.</p></div></div>


    </div>
  </article>
</template>

<style scoped>
.terminal-page{--green:#68f5a5;--amber:#ffd368;--red:#ff796f;min-height:100vh;background:#0d1011;color:#d4d9d7;font-family:"Cascadia Code","SFMono-Regular",Consolas,monospace;font-size:13px}.term-tabs{height:44px;background:#191d1f;border-bottom:1px solid #303638;display:grid;grid-template-columns:170px 1fr 40px 1fr;align-items:center}.term-tabs>*{padding:0 16px}.term-tabs a{color:#929b98;text-decoration:none}.term-tabs .active{height:44px;display:flex;align-items:center;color:#eee;background:#0d1011;border:1px solid #303638;border-bottom-color:#0d1011}.term-tabs .active::first-letter{color:var(--green)}.term-tabs i{font-style:normal;justify-self:end;color:#7e8784}.case-content{max-width:1360px;margin:auto;padding:0 34px}.command-hero{padding:55px 0 75px}.prompt{color:#d8dfdc;margin:0}.prompt span{color:var(--green)}.prompt b{color:#75a9ff}.scan-output{color:#66716d;line-height:1.7;margin:25px 0 55px}.scan-output i{color:#6ca8ff;font-style:normal}.scan-output strong{color:var(--green)}.title-row{display:grid;grid-template-columns:1.3fr .7fr;align-items:end;border-top:1px dashed #35403b;padding-top:45px}.title-row>div>p{font-size:11px;color:var(--green);letter-spacing:.12em}.title-row h1{font-size:clamp(80px,15vw,205px);line-height:1.1;letter-spacing:-.09em;margin:34px 0;text-transform:lowercase;color:#f0f4f2;text-shadow:5px 5px 0 #26322d}.title-row h2{font-size:17px;font-weight:400;line-height:1.5;max-width:780px}.ascii{justify-self:end;color:var(--green);font-size:13px;line-height:1.5}.hero-report{display:grid;grid-template-columns:1fr 1fr;margin-top:70px;border:1px solid #36403c}.hero-report figure{margin:0;border-right:1px solid #36403c;background:#080a0b}.hero-report img{width:100%;height:410px;object-fit:contain;display:block}.hero-report figcaption,.summary>span{display:block;border-top:1px solid #36403c;padding:11px 15px;color:#78827e;font-size:10px}.summary{display:flex;flex-direction:column}.summary>span{border-top:0;border-bottom:1px solid #36403c;color:var(--amber)}.summary p{font:17px/1.8 "Microsoft YaHei",sans-serif;margin:auto;padding:45px}.system-info{display:grid;grid-template-columns:1fr 1fr;border:1px solid #36403c}.system-info>div{padding:30px}.system-info>div+div{border-left:1px solid #36403c}.system-info span,.diff-case header,.file-table>header span,.optional-list header{color:var(--green)}.system-info p{font:13px/1.7 "Microsoft YaHei",sans-serif;margin:16px 0 0}.system-info p b{display:inline-block;font:11px monospace;border:1px solid #3b4641;padding:6px 9px;margin:3px}.diff-case{margin:70px 0;border:1px solid #36403c}.diff-case>header,.optional-list>header{display:flex;justify-content:space-between;padding:13px 18px;background:#181d1b;border-bottom:1px solid #36403c}.diff-case header i{font-style:normal;color:#75807b}.diff-body{display:grid;grid-template-columns:1fr 1fr}.diff-body article{min-height:450px;padding:42px;display:flex;flex-direction:column}.diff-body article+article{border-left:1px solid #36403c}.diff-body article>span{font-size:11px}.removed{background:linear-gradient(#29191988,#101212)}.removed>span{color:var(--red)}.added{background:linear-gradient(#10271a88,#101212)}.added>span{color:var(--green)}.diff-body h2{font:clamp(32px,4vw,54px)/1.1 "Microsoft YaHei",sans-serif;letter-spacing:-.05em;margin:auto 0 30px}.diff-body p{font:13px/1.9 "Microsoft YaHei",sans-serif;color:#aab2af}.file-table{border:1px solid #36403c}.file-table>header{display:flex;align-items:end;justify-content:space-between;padding:35px;border-bottom:1px solid #36403c}.file-table h2{font-size:25px;margin:0}.table-head,.file-row{display:grid;grid-template-columns:120px 1fr 80px 80px;gap:15px;padding:12px 18px;border-bottom:1px solid #29312e;align-items:center}.table-head{color:#6f7a75;font-size:9px;background:#161a19}.file-row>span{font-size:10px;color:#6f7a75}.file-row p{margin:0;font:12px/1.5 "Microsoft YaHei",sans-serif}.file-row p i{font:10px monospace;color:#6da5ff;font-style:normal;margin-right:7px}.file-row>b{color:var(--amber);font-size:11px;text-align:right}.file-table footer{display:flex;justify-content:space-between;padding:13px 18px;color:#75807b}.language-report{display:grid;grid-template-columns:1fr 1fr;margin:70px 0;border:1px solid #36403c}.bars{padding:42px;border-right:1px solid #36403c;display:grid;gap:28px}.bars span{display:grid;grid-template-columns:130px 1fr 42px;gap:14px;align-items:center;font-size:10px}.bars i{height:10px;background:var(--green);box-shadow:0 0 10px #68f5a52b}.bars b{color:var(--green)}.agent-prompt header{padding:12px 16px;border-bottom:1px solid #36403c;color:var(--amber)}.agent-prompt header span{float:right;color:#68736e}.agent-prompt pre{padding:30px;margin:0;color:#99b8aa;line-height:1.7;white-space:pre-wrap}.optional-list{margin:30px 0;border:1px solid #36403c}.optional-list>p,.optional-list>article{padding:10px 20px;margin:0;border-bottom:1px solid #29312e}.optional-list p b,.optional-list article>b{color:var(--green)}.optional-list p i{font-style:normal;color:#6e7874}.complete{display:flex;align-items:center;gap:20px;margin:70px 0;padding:25px;border:1px solid #34533f;background:#112219}.complete>span{font-size:28px;color:var(--green)}.complete strong{color:var(--green)}.complete p{margin:7px 0 0;color:#7e8a85}.pager{display:grid;grid-template-columns:1fr 1fr;border-top:1px dashed #36403c}.pager a{display:flex;flex-direction:column;gap:9px;padding:38px 0;color:#dce2df;text-decoration:none}.pager a:last-child{text-align:right}.pager a span{color:var(--green);font-size:10px}.pager a strong{font-size:15px}
@media(max-width:900px){.terminal-page{font-size:11px}.term-tabs{grid-template-columns:100px 1fr 30px}.term-tabs i{display:none}.case-content{padding:0 14px}.command-hero{padding-top:36px}.title-row{grid-template-columns:1fr}.title-row h1{font-size:79px}.ascii{justify-self:start;margin-top:45px}.hero-report,.system-info,.diff-body,.language-report{grid-template-columns:1fr}.hero-report figure,.system-info>div+div,.diff-body article+article,.bars{border-right:0;border-left:0}.hero-report figure,.system-info>div:first-child,.diff-body article:first-child,.bars{border-bottom:1px solid #36403c}.hero-report img{height:260px}.summary p{padding:28px 22px}.diff-body article{min-height:390px;padding:28px 22px}.file-table{overflow-x:auto}.file-table>*{min-width:680px}.file-table>header{min-width:0}.language-report{grid-template-columns:minmax(0,1fr)}.bars{padding:28px 18px}.bars span{grid-template-columns:100px 1fr 34px}.agent-prompt{min-width:0;overflow:hidden}.agent-prompt pre{font-size:10px}.pager a strong{font-size:11px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
.command-hero .prompt{overflow-wrap:anywhere}.file-table{max-width:100%}.file-table>header{flex-wrap:wrap;gap:18px}.file-row{min-width:0}.title-row>*{min-width:0}@media(max-width:900px){.file-table>*{min-width:0}.table-head,.file-row{grid-template-columns:minmax(0,1fr) 64px;padding:14px;gap:12px}.table-head>span:first-child,.file-head>span:last-child,.file-row>span:first-child,.file-row>b{display:none}.table-head>span:last-child{display:none}.file-row p{overflow-wrap:anywhere}.title-row h1{font-size:66px}.ascii{margin-top:15px}.scan-output{margin-bottom:25px}.file-table h2{font-size:20px}}
.bars span{grid-template-columns:125px 1fr 65px}.bars b{font-size:10px}
@media(max-width:900px){.term-tabs>span:nth-child(3){padding:0;text-align:center;min-width:0}.term-tabs{grid-template-columns:100px minmax(0,1fr) 30px}.term-tabs .active{min-width:0;overflow-wrap:anywhere;font-size:10px}}
</style>
