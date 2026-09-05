import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { projects } from '../src/data/projects.js';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const output = resolve(process.env.PORTFOLIO_QA_DIR || 'artifacts/portfolio-qa');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:5173';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
const results = [];
const interactions = [];
const check = (name, condition) => { interactions.push({ name, passed: Boolean(condition) }); };
const routes = ['/', '/projects', ...projects.map(project => `/projects/${project.id}`), '/projects/not-a-project'];
try {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.locator('h1').waitFor();
      // Trigger lazy images before capturing the entire page.
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
      });
      const audit = await page.evaluate(() => ({
        mains: document.querySelectorAll('main').length,
        headings: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        offenders: [...document.querySelectorAll('main *')].filter(el => {
          const box = el.getBoundingClientRect();
          return box.width && (box.right > innerWidth + 2 || box.left < -2) && getComputedStyle(el).position !== 'absolute';
        }).slice(0, 12).map(el => `${el.tagName}.${el.className}: ${Math.round(el.getBoundingClientRect().width)}`),
        brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
      }));
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await page.screenshot({ path: resolve(output, `${name}-${width}.png`), fullPage: true });
      results.push({ route, width, ...audit });
      console.log(`${width} ${route}: ${audit.overflow ? 'OVERFLOW' : 'OK'}`);
    }
  }
  await page.goto(base + '/projects', { waitUntil: 'networkidle' });
  check('All 15 projects visible', await page.locator('.project-card').count() === 15);
  check('2D and 3D names are distinct', await page.getByRole('heading', { name: '部落战 · 2D', exact: true }).count() === 1 && await page.getByRole('heading', { name: '部落战 · 3D', exact: true }).count() === 1);
  await page.getByLabel('找一个作品', { exact: true }).fill('qT');
  check('Case-insensitive stack search', await page.locator('.project-card').count() > 0);
  await page.getByRole('button', { name: /^游戏 \/ 客户端/ }).click();
  check('Search intersects category', await page.locator('.project-card').count() === 0);
  await page.getByRole('button', { name: '查看全部作品 ↗' }).click();
  check('Clear empty results restores all', await page.locator('.project-card').count() === 15);
  await page.getByLabel('找一个作品', { exact: true }).fill('没有这样的作品XYZ');
  check('Unmatched query has empty state', await page.locator('.empty-state').isVisible());
  await page.getByRole('button', { name: '清空搜索', exact: true }).click();
  await page.getByRole('button', { name: /^工具 \/ 能力/ }).click();
  const toolingCount = projects.filter(project => project.category === 'tooling').length;
  check('Category count matches data', await page.locator('.project-card').count() === toolingCount);
  await page.reload({ waitUntil: 'networkidle' });
  check('Category survives refresh', await page.locator('.project-card').count() === toolingCount);
  await page.locator('.project-card a').first().click();
  await page.locator('.project-pagination').waitFor();
  check('Detail uses common navigation', await page.locator('.project-pagination').count() === 1);
  await page.goBack({ waitUntil: 'networkidle' });
  check('Category survives browser back', await page.locator('.project-card').count() === toolingCount);
  await page.goto(base + '/projects/p2p', { waitUntil: 'networkidle' });
  await page.locator('.related a').first().click();
  await page.waitForURL('**/projects/elemental-3d');
  check('Related case navigation', await page.locator('h1').textContent().then(text => text.includes('3D')));
  await page.locator('.project-pagination .next').click();
  await page.waitForURL('**/projects/tower');
  await page.locator('.project-pagination .previous').click();
  await page.waitForURL('**/projects/elemental-3d');
  check('Previous and next navigation', page.url().endsWith('/projects/elemental-3d'));
  await page.getByRole('link', { name: '关于我', exact: true }).click();
  await page.waitForURL('**/#about');
  await page.waitForFunction(() => Math.abs(document.querySelector('#about').getBoundingClientRect().top) < 100);
  check('About anchor from detail', true);
  await page.getByRole('button', { name: '回到顶部 ↑', exact: true }).click();
  await page.waitForFunction(() => scrollY === 0);
  check('Back to top uses current page', true);
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('Keyboard skip link', await page.evaluate(() => document.activeElement.classList.contains('skip-link')));
  await page.keyboard.press('Enter');
  check('Skip link focuses main', await page.evaluate(() => document.activeElement.id === 'main-content'));
  check('Reduced motion honored', await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => { Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('Unavailable', 'SecurityError'); } }); });
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(base + '/projects', { waitUntil: 'networkidle' });
  await blockedPage.getByRole('button', { name: /^服务 \/ 网络/ }).click();
  check('Storage unavailable still filters', await blockedPage.locator('.project-card').count() === projects.filter(project => project.category === 'server').length);
  await blocked.close();
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const touchPage = await mobile.newPage();
  await touchPage.goto(base, { waitUntil: 'networkidle' });
  const heroBounds = await touchPage.locator('.desk-piece').first().boundingBox();
  check('Mobile first screen includes artwork', heroBounds && heroBounds.y < 700);
  await touchPage.locator('.desk-piece').first().tap();
  await touchPage.waitForURL('**/projects/p2p');
  check('Touch opens hero project', true);
  await mobile.close();
  console.log(JSON.stringify(interactions, null, 2));
  await writeFile(resolve(output, 'layout-report.json'), JSON.stringify({ results, errors, interactions }, null, 2));
} finally {
  await browser.close();
}
if (results.some(result => result.overflow || result.mains !== 1 || result.headings !== 1 || result.brokenImages.length) || errors.length || interactions.some(test => !test.passed)) process.exitCode = 1;
