<script setup>
import ProjectImage from "../components/ProjectImage.vue";
import ProjectByline from "../components/ProjectByline.vue";
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <article class="coop-page">
    <header class="coop-hero">
      <nav class="coop-topbar" aria-label="项目导航">
        <RouterLink to="/projects" class="back-link">← 全部作品</RouterLink>
        <span class="connection"><i /> PEER CONNECTION ACTIVE</span>
        <span>{{ project.number }} / {{ project.year }}</span>
      </nav>

      <div class="element element-fire" aria-hidden="true"><span>FIRE</span></div>
      <div class="element element-water" aria-hidden="true"><span>WATER</span></div>

      <div class="hero-copy">
        <p>{{ project.kicker }}</p>
        <h1>{{ project.title }}</h1>
          <ProjectByline :project="project" />
        <strong>{{ project.subtitle }}</strong>
      </div>

      <figure class="portal-frame">
        <div class="portal-ring" aria-hidden="true" />
        <ProjectImage :project="project" priority />
        <figcaption>
          <span>PEER 01 — FIRE</span>
          <b>↔</b>
          <span>PEER 02 — WATER</span>
        </figcaption>
      </figure>

      <p class="hero-summary">{{ project.summary }}</p>
    </header>

    <div class="case-content">
      <section class="link-strip" aria-label="项目角色与技术栈">
        <div><span>ROLE / OWNERSHIP</span><p>{{ project.role }}</p></div>
        <div class="packet" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div><span>NETWORK / STACK</span><p>{{ project.stack.join(" · ") }}</p></div>
      </section>

      <section class="dual-case">
        <article class="case-fire">
          <span>01 / CONFLICT</span>
          <h2>两个空间，<br />一套规则。</h2>
          <p>{{ project.challenge }}</p>
        </article>
        <div class="sync-core" aria-hidden="true"><span>SYNC</span><i /></div>
        <article class="case-water">
          <span>02 / RESOLUTION</span>
          <h2>切换视角，<br />不切断协作。</h2>
          <p>{{ project.solution }}</p>
        </article>
      </section>

      <section class="sync-map">
        <header>
          <p>03 / SHARED STATE</p>
          <h2>一次协作，由这些信号共同成立</h2>
        </header>
        <ol>
          <li v-for="(item, index) in project.highlights" :key="item">
            <span>{{ String(index + 1).padStart(2, "0") }}</span>
            <p>{{ item }}</p>
            <i aria-hidden="true" />
          </li>
        </ol>
      </section>
    </div>


  </article>
</template>

<style scoped>
.coop-page {
  --fire: #ff6b30;
  --water: #42dbff;
  min-height: 100vh;
  overflow: hidden;
  color: #ecfaff;
  background: #050914;
  font-family: Inter, "Segoe UI", sans-serif;
}

.coop-hero {
  position: relative;
  min-height: 940px;
  padding: 0 max(28px, calc((100vw - 1280px) / 2));
  isolation: isolate;
  background:
    linear-gradient(90deg, rgb(255 86 35 / 9%), transparent 34%, transparent 66%, rgb(36 191 255 / 10%)),
    radial-gradient(circle at 50% 45%, #17223c, #050914 62%);
}

.coop-hero::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  opacity: .22;
  background-image: linear-gradient(rgb(255 255 255 / 8%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 8%) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.coop-topbar {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  height: 88px;
  border-bottom: 1px solid rgb(255 255 255 / 14%);
  color: #9ba8bb;
  font: 600 11px/1.2 ui-monospace, monospace;
  letter-spacing: .13em;
}

.coop-topbar > :last-child { text-align: right; }
.back-link { color: inherit; text-decoration: none; }
.back-link:hover { color: white; }
.connection { display: flex; align-items: center; gap: 9px; color: #baf9d2; }
.connection i { width: 7px; height: 7px; border-radius: 50%; background: #61ed9b; box-shadow: 0 0 14px #61ed9b; animation: pulse 1.8s ease-in-out infinite; }

.element {
  position: absolute;
  top: 280px;
  z-index: -1;
  width: 350px;
  height: 350px;
  border-radius: 48% 52% 63% 37% / 40% 42% 58% 60%;
  filter: blur(1px);
  opacity: .24;
  animation: drift 8s ease-in-out infinite alternate;
}

.element span { position: absolute; color: white; opacity: .35; font: 800 10px ui-monospace, monospace; letter-spacing: .4em; }
.element-fire { left: -130px; background: radial-gradient(circle at 70% 45%, var(--fire), transparent 68%); transform: rotate(-24deg); }
.element-fire span { right: 28px; top: 47%; }
.element-water { right: -130px; background: radial-gradient(circle at 30% 45%, var(--water), transparent 68%); transform: rotate(24deg); animation-delay: -2s; }
.element-water span { left: 28px; top: 47%; }

.hero-copy { position: relative; z-index: 2; padding: 76px 0 24px; text-align: center; }
.hero-copy p { margin: 0 0 15px; color: #9eabc0; font: 700 12px ui-monospace, monospace; letter-spacing: .35em; }
.hero-copy h1 { margin: 0; font-size: clamp(70px, 11vw, 154px); line-height:1.1; letter-spacing: -.08em; text-transform: uppercase; }
.hero-copy strong { display: block; margin-top: 30px; color: #b9c4d4; font-size: clamp(14px, 1.7vw, 22px); font-weight: 450; letter-spacing: .06em; }

.portal-frame { position: relative; width: min(940px, 76vw); margin: 54px auto 0; }
.portal-frame::before, .portal-frame::after { position: absolute; top: 34%; z-index: -1; width: 28vw; height: 2px; content: ""; }
.portal-frame::before { right: 92%; background: linear-gradient(90deg, transparent, var(--fire)); }
.portal-frame::after { left: 92%; background: linear-gradient(90deg, var(--water), transparent); }
.portal-frame img { display: block; width: 100%; aspect-ratio: 16 / 8.7; object-fit: cover; border: 1px solid rgb(255 255 255 / 24%); border-radius: 50% / 8%; box-shadow: 0 50px 100px #000c; clip-path: polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%); }
.portal-ring { position: absolute; inset: -18px -14px; z-index: -1; border: 1px solid rgb(99 219 255 / 35%); border-radius: 50%; box-shadow: inset 24px 0 34px -28px var(--fire), inset -24px 0 34px -28px var(--water); }
.portal-frame figcaption { display: flex; justify-content: center; gap: 28px; margin-top: 20px; color: #8090a8; font: 600 10px ui-monospace, monospace; letter-spacing: .18em; }
.portal-frame figcaption b { color: #eefcff; }
.hero-summary { max-width: 680px; margin: 40px auto 0; color: #bac6d7; font-size: 16px; line-height: 1.9; text-align: center; }

.case-content { max-width: 1280px; margin: 0 auto; padding: 0 28px; }
.link-strip { display: grid; grid-template-columns: 1fr 190px 1fr; align-items: center; gap: 34px; padding: 65px 0; border-top: 1px solid #1d2637; border-bottom: 1px solid #1d2637; }
.link-strip > div:last-child { text-align: right; }
.link-strip span, .dual-case article > span, .sync-map header p { color: #66748b; font: 700 10px ui-monospace, monospace; letter-spacing: .22em; }
.link-strip p { margin: 9px 0 0; color: #d9e4f2; font-size: 13px; line-height: 1.6; }
.packet { display: flex; align-items: center; justify-content: space-between; }
.packet::before, .packet::after { width: 55px; height: 1px; content: ""; background: #31435d; }
.packet i { width: 5px; height: 5px; border-radius: 50%; background: var(--water); animation: packet 1.6s linear infinite; }
.packet i:nth-child(2) { animation-delay: -.3s; }.packet i:nth-child(3) { animation-delay: -.6s;}.packet i:nth-child(4) { animation-delay: -.9s;}.packet i:nth-child(5) { animation-delay: -1.2s; }

.dual-case { display: grid; grid-template-columns: 1fr 110px 1fr; gap: 50px; padding: 130px 0; }
.dual-case article { padding: 10px 0; }
.dual-case .case-water { text-align: right; }
.dual-case h2 { margin: 30px 0; font-size: clamp(35px, 4.2vw, 62px); line-height: 1.04; letter-spacing: -.045em; }
.case-fire h2 { color: #ffc1a9; }.case-water h2 { color: #abecff; }
.dual-case p { margin: 0; color: #9daabe; font-size: 15px; line-height: 1.95; }
.sync-core { align-self: center; display: grid; place-items: center; aspect-ratio: 1; border: 1px solid #314159; border-radius: 50%; color: #d8f5ff; font: 700 10px ui-monospace, monospace; letter-spacing: .15em; box-shadow: inset 0 0 35px #1f304d; }
.sync-core i { position: absolute; width: 16px; height: 16px; border: 2px solid var(--water); border-top-color: var(--fire); border-radius: 50%; animation: spin 3s linear infinite; }

.sync-map { padding: 100px max(28px, 6vw); margin-bottom: 110px; border: 1px solid #233047; border-radius: 32px; background: linear-gradient(150deg, #0d1422, #080c15); }
.sync-map header { display: grid; grid-template-columns: 1fr 2fr; align-items: end; gap: 32px; margin-bottom: 64px; }
.sync-map h2 { max-width: 680px; margin: 0; font-size: clamp(32px, 4vw, 58px); line-height: 1.08; letter-spacing: -.04em; }
.sync-map ol { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin: 0; padding: 0; list-style: none; background: #26344a; }
.sync-map li { position: relative; min-height: 190px; padding: 26px; background: #0d1422; }
.sync-map li span { color: var(--water); font: 700 11px ui-monospace, monospace; }
.sync-map li p { margin: 48px 0 0; color: #d9e4f3; font-size: 14px; line-height: 1.6; }
.sync-map li i { position: absolute; top: -4px; right: -4px; z-index: 2; width: 8px; height: 8px; border-radius: 50%; background: var(--fire); box-shadow: 0 0 15px var(--fire); }

.coop-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 30px; max-width: 1280px; margin: 0 auto; padding: 0 28px 72px; }
.coop-footer > a { display: flex; flex-direction: column; gap: 8px; color: white; text-decoration: none; }
.coop-footer > a:last-child { text-align: right; }
.coop-footer a span { color: #69768b; font: 700 9px ui-monospace, monospace; letter-spacing: .2em; }
.coop-footer a strong { font-size: 16px; }
.footer-mark { display: flex; align-items: center; gap: 10px; color: #607089; font: 700 9px ui-monospace, monospace; letter-spacing: .2em; }
.footer-mark i { width: 4px; height: 4px; border-radius: 50%; background: currentColor; }

@keyframes pulse { 50% { opacity: .3; } }
@keyframes drift { to { translate: 20px 28px; rotate: 9deg; } }
@keyframes packet { 50% { background: var(--fire); box-shadow: 0 0 10px var(--fire); } }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width:900px) {
  .coop-hero { min-height: auto; padding: 0 18px 70px; }
  .coop-topbar { grid-template-columns: 1fr auto; height: 70px; }.connection { display: none; }
  .hero-copy { padding-top: 60px; }.hero-copy h1 { font-size: 68px; }.hero-copy strong { line-height: 1.5; }
  .portal-frame { width: 100%; margin-top: 36px; }.portal-frame figcaption { gap: 8px; font-size: 8px; }.portal-ring { inset: -8px; }
  .hero-summary { font-size: 14px; text-align: left; }
  .case-content { padding: 0 18px; }.link-strip { grid-template-columns: 1fr; gap: 24px; padding: 42px 0; }.link-strip > div:last-child { text-align: left; }.packet { display: none; }
  .dual-case { grid-template-columns: 1fr; gap: 70px; padding: 84px 0; }.dual-case .case-water { text-align: left; }.sync-core { display: none; }.dual-case h2 { font-size: 42px; }
  .sync-map { padding: 62px 18px 18px; margin: 0 0 80px; border-radius: 20px; }.sync-map header { grid-template-columns: 1fr; margin-bottom: 38px; }.sync-map ol { grid-template-columns: 1fr; }.sync-map li { min-height: 145px; }.sync-map li p { margin-top: 28px; }
  .coop-footer { grid-template-columns: 1fr 1fr; padding: 0 18px 48px; }.footer-mark { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .coop-page *, .coop-page *::before, .coop-page *::after { animation: none !important; scroll-behavior: auto !important; }
}

/* Reading rhythm shared within this case, independent of site styles. */
.case-content{min-width:0}.case-content section{min-width:0}
h1,h2,h3{overflow-wrap:anywhere}h2{line-height:1.2}
.roadmap-note{font:12px/1.8 "Microsoft YaHei",sans-serif;letter-spacing:normal;opacity:.8;margin:0 0 28px;padding-bottom:12px;border-bottom:1px solid currentColor}
@media(max-width:900px){h1{letter-spacing:-.045em} .case-content{max-width:100%}}
.hero-copy :deep(.project-byline){margin-inline:auto;text-align:center}.hero-copy :deep(.project-byline ul){justify-content:center}
</style>
