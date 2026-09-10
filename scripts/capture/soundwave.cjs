const { chromium } = require('/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const APP_URL = process.env.SOUNDWAVE_URL || 'http://127.0.0.1:4181';
const OUTPUT_DIR = path.resolve(__dirname, '../../public/projects/soundwave');
const VIDEO_DIR = path.join(OUTPUT_DIR, '.video-tmp');

const demoAnalysis = {
  id: 'portfolio-demo-analysis',
  file_name: 'Product Strategy Sync — Demo',
  created_at: '2026-08-28T14:00:00.000Z',
  duration_seconds: 842,
  transcription: [
    '[Jordan - 00:00:04] We should make the onboarding value visible before asking teams to configure integrations.',
    '[Maya - 00:01:18] The clearest signal from interviews is time to first useful insight. Let us target under five minutes.',
    '[Jordan - 00:03:42] Agreed. The September roadmap should prioritize the guided upload flow and a sample analysis.',
    '[Maya - 00:06:09] I will own the prototype and schedule five usability sessions for next week.',
    '[Jordan - 00:09:31] I will define the activation event and add it to the product dashboard.',
    '[Maya - 00:12:47] We can review the results Friday and decide whether the new flow is ready for the beta cohort.'
  ].join('\n'),
  topics: [
    'Reducing time to first useful insight',
    'Guided onboarding and sample analyses',
    'September roadmap and beta readiness'
  ],
  insights: [
    { text: 'Lead with a useful result before integration setup to reduce early friction.', assignee: 'Maya' },
    { text: 'Use a five-minute activation target as the primary onboarding success measure.', assignee: 'Jordan' },
    { text: 'Validate the guided flow with five moderated sessions before expanding the beta.', assignee: 'Maya' }
  ],
  decisions: [
    { text: 'Prioritize guided upload and a sample analysis in the September roadmap.', assignee: 'Jordan' },
    { text: 'Use time to first insight as the activation metric.', assignee: 'Jordan' }
  ],
  todos: [
    { text: 'Build the guided upload prototype.', assignee: 'Maya' },
    { text: 'Schedule five usability sessions for next week.', assignee: 'Maya' },
    { text: 'Define and instrument the activation event.', assignee: 'Jordan' }
  ],
  sentiment: {
    overall: 'Focused and constructive, with clear alignment on the customer outcome.',
    trends: 'The conversation moves from problem framing to concrete owners and validation steps.',
    participants: [
      { name: 'Jordan', sentiment: 'Analytical and decisive; focused on measurement and prioritization.' },
      { name: 'Maya', sentiment: 'Optimistic and action oriented; focused on prototyping and customer evidence.' }
    ]
  },
  speech_time_stats: {
    participants: [
      { idx: 0, total_ms: 451000, percent: 54 },
      { idx: 1, total_ms: 391000, percent: 46 }
    ],
    total_duration_ms: 842000
  },
  participants: ['Jordan', 'Maya'],
  participant_edits: { names: { Jordan: 'Jordan', Maya: 'Maya' } },
  public_visibility: {
    transcription: true,
    topics: true,
    insights: true,
    decisions: true,
    todos: true,
    sentiment: true,
    speech_time: true,
    audio: false
  },
  storage_path: null
};

async function addDemoBadge(page) {
  await page.evaluate(() => {
    const badge = document.createElement('div');
    badge.id = 'portfolio-demo-badge';
    badge.textContent = 'DEMO DATA · PORTFOLIO CAPTURE';
    Object.assign(badge.style, {
      position: 'fixed', right: '20px', bottom: '20px', zIndex: '99999',
      padding: '9px 14px', borderRadius: '999px',
      background: 'rgba(13, 18, 29, .94)', color: '#a7f3d0',
      border: '1px solid rgba(52, 211, 153, .5)',
      boxShadow: '0 10px 35px rgba(0,0,0,.35)',
      font: '700 11px/1.2 ui-sans-serif, system-ui', letterSpacing: '.11em'
    });
    document.body.appendChild(badge);
  });
}

async function smoothScroll(page, y, duration = 1500) {
  await page.evaluate(({ y, duration }) => new Promise((resolve) => {
    const start = window.scrollY;
    const delta = y - start;
    const begun = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - begun) / duration);
      const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
      window.scrollTo(0, start + delta * eased);
      if (progress < 1) requestAnimationFrame(tick); else resolve();
    };
    requestAnimationFrame(tick);
  }), { y, duration });
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.rmSync(VIDEO_DIR, { recursive: true, force: true });
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    colorScheme: 'dark',
    recordVideo: { dir: VIDEO_DIR, size: { width: 1440, height: 900 } }
  });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'en'));
  await page.route('**/rest/v1/rpc/get_public_analysis', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(demoAnalysis)
    });
  });
  await page.route('**/functions/v1/**', (route) => route.abort());

  await page.goto(`${APP_URL}/analysis/portfolio-demo-analysis`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Product Strategy Sync — Demo' }).waitFor();
  await page.waitForTimeout(1200);
  await addDemoBadge(page);

  const coverPng = path.join(OUTPUT_DIR, '.cover.png');
  const analysisPng = path.join(OUTPUT_DIR, '.analysis.png');
  await page.screenshot({ path: coverPng, type: 'png' });
  await smoothScroll(page, 700, 1600);
  await page.waitForTimeout(700);
  await page.screenshot({ path: analysisPng, type: 'png' });

  await smoothScroll(page, 0, 1200);
  await page.waitForTimeout(800);
  await smoothScroll(page, 690, 1800);
  await page.waitForTimeout(1200);
  const search = page.getByPlaceholder('Search the conversation...');
  if (await search.isVisible()) {
    await search.fill('roadmap');
    await page.waitForTimeout(1600);
    await search.fill('');
    await page.waitForTimeout(900);
  }
  await smoothScroll(page, 1250, 1600);
  await page.waitForTimeout(1400);

  const video = page.video();
  await context.close();
  await browser.close();
  const webmPath = await video.path();
  execFileSync('ffmpeg', ['-y', '-i', coverPng, '-quality', '92', path.join(OUTPUT_DIR, 'cover.webp')], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-i', analysisPng, '-quality', '92', path.join(OUTPUT_DIR, 'analysis.webp')], { stdio: 'inherit' });
  execFileSync('ffmpeg', [
    '-y', '-i', webmPath, '-an', '-c:v', 'libx264', '-preset', 'medium',
    '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(OUTPUT_DIR, 'walkthrough.mp4')
  ], { stdio: 'inherit' });
  fs.rmSync(coverPng, { force: true });
  fs.rmSync(analysisPng, { force: true });
  fs.rmSync(VIDEO_DIR, { recursive: true, force: true });
  console.log(`Captured SoundWave assets in ${OUTPUT_DIR}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
