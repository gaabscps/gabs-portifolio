// Browser/media smoke check. Uses the local Playwright installation used for capture.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3030';
const output = process.env.PORTFOLIO_QA_DIR || '/tmp/gabs-portfolio-qa';
const slugs = ['ai-squad', 'soundwave', 'aios', 'squadhouse'];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      for (const route of ['/', '/work', ...slugs.map(slug => `/work/${slug}`), '/about']) {
        const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
        assert.equal(response.status(), 200, `${device} ${route} status`);
        await page.locator('h1').waitFor({ timeout: 15000 });
        assert.equal(await page.locator('h1').count(), 1, `${route}: one h1`);
        // Trigger lazy-loaded media before checking image decoding.
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
            scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 30));
          }
          scrollTo(0, 0);
        });
        await page.waitForTimeout(700);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${device} ${route} horizontal overflow`);
        const badImages = await page.locator('img').evaluateAll(images => images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')));
        assert.deepEqual(badImages, [], `${device} ${route} image decoding`);
        const text = await page.locator('body').innerText();
        assert.ok(!/BetterSMP|Minecraft|CalendarFR|join the server|case study · coming soon/i.test(text), `${route} stale showcase copy`);
        if (route === '/' || route === '/work') {
          for (const slug of slugs) assert.ok(await page.locator(`a[href="/work/${slug}"]`).count() > 0, `${route} links ${slug}`);
        }
        if (route.startsWith('/work/')) {
          const videos = page.locator('video');
          assert.ok(await videos.count() >= 1, `${route} visible walkthrough`);
          for (const video of await videos.all()) {
            assert.equal(await video.getAttribute('autoplay'), null, `${route} no forced autoplay`);
            assert.notEqual(await video.getAttribute('controls'), null, `${route} video controls`);
            const src = await video.getAttribute('src');
            const result = await context.request.get(base + src);
            assert.equal(result.status(), 200, src);
            assert.match(result.headers()['content-type'], /^video\//, src);
            await video.scrollIntoViewIfNeeded();
            await video.evaluate(v => { v.muted = true; return v.play(); });
            await page.waitForTimeout(400);
            assert.ok(await video.evaluate(v => v.currentTime > 0 && v.readyState >= 2), `${route} video decodes and plays`);
            await video.evaluate(v => v.pause());
            await video.focus();
            await page.keyboard.press('Space');
            assert.equal(await page.getByRole('dialog').count(), 0, `${route} video keyboard does not open detail modal`);
            await video.evaluate(v => v.pause());
            const bounds = await video.boundingBox();
            assert.ok(bounds.width > (device === 'mobile' ? 280 : 550), `${route} video is readable`);
          }
        }
        await page.evaluate(() => scrollTo(0, 0));
        const filename = `${device}-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.png`;
        await page.screenshot({ path: path.join(output, filename), fullPage: route !== '/' });
        results.push({ device, route, status: 'pass', screenshot: filename });
        console.log('PASS', device, route);
      }
      assert.deepEqual(errors, [], `${device} runtime exceptions`);
      await context.close();
    }
    const api = await browser.newContext();
    for (const route of ['/work/bettersmp', '/work/calendarfr', '/work/playx1', '/work/banca-do-ingresso', '/work/dashboard', '/projects', '/playx1', '/banca-do-ingresso']) {
      const response = await api.request.get(base + route, { maxRedirects: 0 });
      assert.ok([307, 308].includes(response.status()), `${route} redirect`);
      assert.equal(new URL(response.headers().location, base).pathname, '/work', `${route} redirect target`);
    }
    await api.close();
    await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ checkedAt: new Date().toISOString(), base, results, redirects: 'pass' }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
