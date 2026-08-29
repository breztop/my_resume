<script setup>
defineProps({
  project: { type: Object, required: true },
  previousProject: { type: Object, default: null },
  nextProject: { type: Object, default: null },
});
</script>

<template>
  <article class="session-page">
    <header class="session-bar">
      <RouterLink class="back" to="/projects">← PROJECT INDEX</RouterLink>
      <div class="environment"><i /> SESSION SERVICE <span>ONLINE</span></div>
      <span class="build">BUILD {{ project.year }}.{{ project.number }}</span>
    </header>

    <main>
      <section class="hero">
        <div class="hero-copy">
          <p class="prompt"><span>operator@portfolio</span>:~/services/{{ project.id }}$ inspect --live</p>
          <p class="kicker">{{ project.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <p class="summary">{{ project.summary }}</p>
          <div class="actions">
            <a href="#session-flow">VIEW SESSION FLOW ↓</a>
            <span>STATUS / REUSABLE</span>
          </div>
        </div>

        <figure class="monitor">
          <div class="monitor-head"><span>orchestrator.trace</span><span>● ● ●</span></div>
          <img :src="project.cover" :alt="project.coverAlt" />
          <figcaption>
            <span><i /> room_01 / accepting peers</span>
            <strong>48ms</strong>
          </figcaption>
        </figure>
      </section>

      <section class="service-facts" aria-label="项目元信息">
        <div><span>RESPONSIBILITY</span><strong>{{ project.role }}</strong></div>
        <div><span>TRANSPORT / STACK</span><strong>{{ project.stack.join("  ·  ") }}</strong></div>
        <div><span>SERVICE CONTRACT</span><strong>Room → Session → Signal → Cleanup</strong></div>
      </section>

      <section id="session-flow" class="flow-section">
        <header>
          <span>LIVE EVENT STREAM</span>
          <h2>一局连接，五次状态交接</h2>
        </header>
        <ol class="flow">
          <li v-for="(item, index) in project.highlights" :key="item">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <div><i /><strong>{{ item }}</strong></div>
            <code>{{ index === project.highlights.length - 1 ? "closed" : "confirmed" }}</code>
          </li>
        </ol>
      </section>

      <section class="diagnosis">
        <article class="incident">
          <span class="label">INCIDENT / 001</span>
          <h2>通用服务不应该知道游戏规则。</h2>
          <p>{{ project.challenge }}</p>
          <div class="log-lines" aria-hidden="true">
            <span>WARN duplicate_peer / identity exists</span>
            <span>INFO heartbeat_timeout / reclaim pending</span>
            <span>TRACE gameplay_state / ignored by service</span>
          </div>
        </article>
        <article class="resolution">
          <span class="label">RESOLUTION / PASSED</span>
          <h2>把会合与玩法彻底拆开。</h2>
          <p>{{ project.solution }}</p>
          <div class="contract">
            <span>ROOM</span><b>→</b><span>PEER</span><b>→</b><span>SIGNAL</span><b>→</b><span>P2P</span>
          </div>
        </article>
      </section>

      <section v-if="project.modules?.length" class="optional-block">
        <span>MODULE REGISTRY</span>
        <article v-for="module in project.modules" :key="module.name">
          <strong>{{ module.name }}</strong><p>{{ module.detail }}</p><code>loaded</code>
        </article>
      </section>

      <section v-if="project.roadmap?.length" class="optional-block roadmap">
        <span>RELEASE QUEUE</span>
        <article v-for="phase in project.roadmap" :key="phase.label">
          <strong>{{ phase.label }} / {{ phase.title }}</strong>
          <p>{{ phase.items.join(" · ") }}</p>
        </article>
      </section>

      <section v-if="project.principles?.length" class="principles">
        <span>NON-NEGOTIABLES</span>
        <p v-for="principle in project.principles" :key="principle">$ {{ principle }}</p>
      </section>
    </main>

    <nav class="pager" aria-label="项目翻页">
      <RouterLink v-if="previousProject" :to="`/projects/${previousProject.id}`"><span>PREV SESSION</span><b>← {{ previousProject.title }}</b></RouterLink>
      <span v-else />
      <RouterLink v-if="nextProject" :to="`/projects/${nextProject.id}`"><span>NEXT SESSION</span><b>{{ nextProject.title }} →</b></RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.session-page{--ink:#dcecff;--muted:#7e96ae;--line:#1e3b50;--cyan:#4ee6ff;min-height:100vh;color:var(--ink);background:#061019;font-family:"IBM Plex Mono","SFMono-Regular",Consolas,monospace;background-image:linear-gradient(rgba(78,230,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(78,230,255,.025) 1px,transparent 1px);background-size:36px 36px}
.session-bar{height:58px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 clamp(18px,4vw,64px);font-size:11px;letter-spacing:.12em}.back{color:var(--muted);text-decoration:none}.back:hover{color:var(--cyan)}.environment{display:flex;gap:10px;align-items:center}.environment i,.monitor figcaption i{width:7px;height:7px;border-radius:50%;background:#47ef9a;box-shadow:0 0 12px #47ef9a}.environment span{color:#47ef9a}.build{text-align:right;color:#587087}
main{width:min(1320px,calc(100% - 48px));margin:auto}.hero{min-height:640px;display:grid;grid-template-columns:1.05fr .95fr;gap:7vw;align-items:center;border-left:1px solid var(--line);border-right:1px solid var(--line);padding:70px clamp(24px,4vw,68px)}.prompt{font-size:12px;color:#5f7e96;margin:0 0 80px}.prompt span{color:#47ef9a}.kicker,.label{font-size:10px;letter-spacing:.2em;color:var(--cyan)}h1{font-family:Inter,system-ui,sans-serif;font-size:clamp(52px,6.4vw,104px);line-height:.86;letter-spacing:-.075em;margin:18px 0 32px;max-width:760px}.summary{font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.85;color:#9db2c5;max-width:660px}.actions{display:flex;align-items:center;gap:30px;margin-top:40px;font-size:10px;letter-spacing:.12em}.actions a{background:var(--cyan);padding:13px 17px;color:#041019;text-decoration:none;font-weight:800}.actions span{color:#5d768c}
.monitor{margin:0;border:1px solid #2b526a;background:#091925;box-shadow:24px 24px 0 #07141e,24px 24px 0 1px #183246;position:relative}.monitor:before{content:"";position:absolute;inset:35px 0 45px;z-index:1;background:linear-gradient(transparent 49%,rgba(78,230,255,.055) 50%);background-size:100% 5px;pointer-events:none}.monitor-head,.monitor figcaption{height:34px;display:flex;align-items:center;justify-content:space-between;padding:0 13px;color:#658096;font-size:9px}.monitor-head{border-bottom:1px solid #214052}.monitor img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;filter:saturate(.75) contrast(1.1)}.monitor figcaption{height:45px;border-top:1px solid #214052}.monitor figcaption span{display:flex;gap:8px;align-items:center}.monitor figcaption strong{color:var(--cyan)}
.service-facts{border:1px solid var(--line);display:grid;grid-template-columns:1fr 1.2fr 1fr}.service-facts div{padding:28px 30px;border-right:1px solid var(--line)}.service-facts div:last-child{border:0}.service-facts span,.flow-section header span,.optional-block>span,.principles>span{display:block;font-size:9px;color:#5f7a90;letter-spacing:.18em;margin-bottom:10px}.service-facts strong{font:500 12px/1.6 Inter,system-ui,sans-serif;color:#b7c8d7}
.flow-section{padding:120px 0}.flow-section header{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid var(--line);padding-bottom:22px}.flow-section h2{font:600 clamp(28px,4vw,52px)/1 Inter,system-ui,sans-serif;letter-spacing:-.04em;margin:0}.flow{list-style:none;padding:0;margin:0}.flow li{display:grid;grid-template-columns:80px 1fr 100px;align-items:center;border-bottom:1px solid var(--line);min-height:86px}.flow li>span{color:#44647d;font-size:11px}.flow li div{display:flex;gap:18px;align-items:center}.flow li i{width:9px;height:9px;background:var(--cyan);transform:rotate(45deg)}.flow strong{font:500 15px Inter,system-ui,sans-serif}.flow code{justify-self:end;color:#47ef9a;font-size:10px}
.diagnosis{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);margin-bottom:100px}.diagnosis article{padding:clamp(28px,5vw,70px);min-height:470px}.incident{background:#08141e;border-right:1px solid var(--line)}.diagnosis h2{font:600 clamp(28px,3vw,47px)/1.06 Inter,system-ui,sans-serif;letter-spacing:-.04em;margin:40px 0 24px}.diagnosis p{font:15px/1.9 Inter,system-ui,sans-serif;color:#8fa6ba}.log-lines{margin-top:55px;border-left:2px solid #ff6d73;padding-left:18px;display:grid;gap:11px;color:#8b5f69;font-size:9px}.resolution{background:var(--cyan);color:#041019}.resolution .label{color:#08697b}.resolution p{color:#144b57}.contract{display:flex;align-items:center;justify-content:space-between;margin-top:58px;font-size:9px}.contract span{border:1px solid #08748a;padding:10px}.contract b{font-size:16px;color:#08748a}
.optional-block,.principles{margin:0 0 90px}.optional-block article{display:grid;grid-template-columns:220px 1fr 80px;gap:24px;padding:22px 0;border-top:1px solid var(--line);align-items:start}.optional-block p{margin:0;color:#8299ad;font:14px/1.6 Inter,sans-serif}.optional-block code{text-align:right;color:#47ef9a}.principles p{padding:14px 0;border-bottom:1px solid var(--line);color:#9bb1c3}
.pager{width:min(1320px,calc(100% - 48px));margin:auto;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr}.pager>a{padding:36px 0;color:var(--ink);text-decoration:none;display:grid;gap:8px}.pager>a:last-child{text-align:right}.pager span{font-size:9px;letter-spacing:.16em;color:#547088}.pager b{font:600 17px Inter,sans-serif}.pager a:hover b{color:var(--cyan)}
@media(max-width:700px){.session-bar{grid-template-columns:1fr auto}.environment{display:none}.build{display:block}.session-bar{padding:0 16px}main,.pager{width:calc(100% - 28px)}.hero{display:block;min-height:0;padding:45px 18px 55px}.prompt{margin-bottom:45px;white-space:nowrap;overflow:hidden}.hero h1{font-size:50px}.summary{font-size:14px}.actions{flex-wrap:wrap}.monitor{margin-top:60px;box-shadow:10px 10px 0 #07141e,10px 10px 0 1px #183246}.service-facts{display:block}.service-facts div{border-right:0;border-bottom:1px solid var(--line);padding:22px}.flow-section{padding:80px 0}.flow-section header{display:block}.flow-section h2{margin-top:15px}.flow li{grid-template-columns:38px 1fr;gap:6px;padding:18px 0}.flow li code{display:none}.flow strong{font-size:13px;line-height:1.5}.diagnosis{display:block}.diagnosis article{min-height:0}.incident{border-right:0;border-bottom:1px solid var(--line)}.contract{gap:5px}.contract span{padding:7px 4px}.optional-block article{grid-template-columns:1fr}.optional-block code{text-align:left}.pager b{font-size:12px}.pager>a{padding:28px 0}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
</style>
