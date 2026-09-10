// Capture the real aiOS React app with isolated, synthetic WebSocket data.
// Start: npm run dev:web -w @ai-squad/os -- --host 127.0.0.1 --port 4182
// Run: node scripts/capture/aios.cjs
const path = require('node:path');
const fs = require('node:fs/promises');
const { execFileSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules/playwright');
const sharp = require('sharp');
const { WebSocketServer } = require('/Volumes/KINGSTON/Developer/ai-squad/node_modules/ws');
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'public/projects/aios');
const raw = path.join(root, '.next/capture-aios');
const now = Date.now();
const iso = (hours) => new Date(now - hours * 3600000).toISOString();
const tokens = { input: 28000, output: 5400, cacheRead: 126000, cacheCreation: 18000 };
const groups = [
  ['soundwave', 'SoundWave', ['Resumable audio uploads', 'Transcript speaker labels', 'Credit balance reconciliation']],
  ['ai-squad', 'ai-squad', ['Task scope enforcement', 'Executable verification', 'CLI upgrade flow']],
  ['squadhouse', 'Squadhouse', ['Lead board and filters', 'Agent output validation', 'Shared data contracts']],
];
const states = ['needs_attention', 'running', 'done', 'running', 'done', 'awaiting_deploy', 'running', 'needs_attention', 'done'];
const costs = [12.4, 8.75, 6.8, 9.2, 4.6, 3.25, 11.5, 5.6, 7.8];
let counter = 0;
const projects = groups.map(([id, name, titles]) => {
  const specs = titles.map((title) => {
    const i = counter++;
    const state = states[i];
    const done = state === 'done' || state === 'awaiting_deploy';
    const needs = state === 'needs_attention';
    const tasks = [1, 2, 3].map((n) => ({ id: `T-00${n}`, state: done || n < 3 ? 'done' : needs ? 'blocked' : 'running', loops: 0, dispatches: [{ role: 'implementer', loop: 1, status: done || n < 3 ? 'done' : 'running', summary: 'Implementation and executable verification.', filesChanged: ['src/features/example.tsx'], findings: [], testEvidence: [{ command: 'npm test', passed: true, detail: 'Synthetic demonstration evidence' }], tokens: 3200 }] }));
    return {
      id: `FEAT-${String(i + 1).padStart(3, '0')}`, title, squad: 'sdd', phase: 'implementation',
      plannedPhases: ['scope', 'specify', 'plan', 'tasks', 'implementation'], status: needs ? 'blocked' : done ? 'done' : 'running',
      tasks, health: { pendingHuman: needs ? 1 : 0, escalationRate: 0, auditException: false }, lastActivityAt: iso(0.2 + i * 0.1),
      timeline: [{ kind: 'created', timestamp: iso(10 + i * 4), note: 'Demonstration session created' }, { kind: 'phase', timestamp: iso(4 + i), phase: 'implementation', note: 'Implementation started' }, { kind: 'verify', timestamp: iso(0.3), note: 'Synthetic verification event for portfolio demonstration' }],
      cost: { totalCostUsd: costs[i], partial: false, tokens, totalTokens: 177400, reportPath: null, source: 'report', scopingSuspect: false, excludedSubagents: 0, recoveredSubagents: 0, byPhase: { planning: costs[i] * 0.2, orchestration: costs[i] * 0.1, implementation: costs[i] * 0.7 }, complete: true },
      deliveryReport: null,
      observed: { intent: title, createdAt: iso(10 + i * 4), closedAt: done ? iso(0.4) : null, attentionKind: needs ? 'approval' : null, decisions: [{ what: 'Keep processing outside the HTTP request.', why: 'A long task should survive the browser closing.', rejected: null, ref: null }], evidence: [{ cmd: 'npm test', result: 'Demonstration evidence; not a production test report.', kind: 'test' }], driftFlags: [], baseSha: null, outputLocale: 'en-US', feature: { id: `ft-${i}`, key: null, name: title, jira: null }, markers: [
        { kind: 'open', at: iso(10 + i * 4), exact: true, note: 'Inspect the existing upload flow and define the change.', decision: null, evidence: null, editFiles: null, blockMs: null },
        { kind: 'decision', at: iso(8 + i), exact: false, note: null, decision: { what: 'Move audio processing to a separate worker.', why: 'Uploads can finish without holding an HTTP request open.', rejected: 'Process the full recording in the request handler.', ref: null }, evidence: null, editFiles: null, blockMs: null },
        { kind: 'verify', at: iso(1.5), exact: false, note: null, decision: null, evidence: { cmd: 'npm test', result: 'Example verification entry for this demonstration.', kind: 'test' }, editFiles: null, blockMs: null },
        { kind: needs ? 'block' : 'close', at: iso(0.2), exact: true, note: needs ? 'Review the diff before accepting the change.' : 'Demonstration session complete.', decision: null, evidence: null, editFiles: null, blockMs: needs ? 720000 : null }
      ], report: null },
    };
  });
  return { id, name, path: `/demo/${id}`, specs, hidden: false, features: specs.map((spec) => {
    const i = Number(spec.id.slice(-3)) - 1;
    const done = states[i] === 'done' || states[i] === 'awaiting_deploy';
    return { id: `ft-${i}`, key: null, name: spec.title, orphan: false, projectId: id, sessionIds: [spec.id], status: states[i], doneSource: states[i] === 'done' ? 'manual' : null, attention: { count: states[i] === 'needs_attention' ? 1 : 0, items: states[i] === 'needs_attention' ? [{ sessionId: spec.id, kind: 'approval', blockedForMs: 600000 }] : [] }, delivery: { sessionsClosed: done ? 1 : 0, sessionsTotal: 1, deliverables: [] }, cost: { totalCostUsd: costs[i], totalTokens: 177400, tokens, incomplete: false }, time: { firstOpenedAt: iso(10 + i * 4), lastClosedAt: done ? iso(0.4) : null, spanMs: 3600000 * (2 + i), engagedMs: 1800000 * (2 + i) }, lastActivityAt: spec.lastActivityAt, jira: null };
  }) };
});

(async () => {
  await fs.mkdir(out, { recursive: true });
  await fs.mkdir(raw, { recursive: true });
  const wsServer = new WebSocketServer({ host: '127.0.0.1', port: 4717 });
  wsServer.on('connection', ws => ws.send(JSON.stringify({ type: 'snapshot', projects, archiveAfterDays: 30, include: [] })));
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', recordVideo: { dir: raw, size: { width: 1440, height: 900 } } });
  await context.route('**/api/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  const page = await context.newPage();
  page.on('pageerror', error => console.error(error.message));
  await page.goto(process.env.AIOS_URL || 'http://127.0.0.1:4182');
  await page.getByText('ai-squad-os', { exact: true }).waitFor();
  await page.evaluate(() => {
    const banner = document.createElement('div');
    banner.textContent = 'PORTFOLIO DEMO · SYNTHETIC SESSIONS AND COSTS';
    Object.assign(banner.style, { position: 'fixed', bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: '99999', padding: '9px 16px', background: '#161c29', color: '#abbcdd', border: '1px solid #3b475e', borderRadius: '6px', font: '10px monospace', letterSpacing: '1.6px' });
    document.body.append(banner);
  });
  await page.waitForTimeout(1500);
  const shot = async (name) => sharp(await page.screenshot()).webp({ quality: 90 }).toFile(path.join(out, name));
  await shot('overview.webp');
  await shot('cover.webp');
  await page.waitForTimeout(2200);
  await page.getByRole('button', { name: 'Kanban', exact: true }).click();
  await page.waitForTimeout(1000);
  await shot('board.webp');
  await page.waitForTimeout(1800);
  await page.getByText('Resumable audio uploads', { exact: true }).first().click();
  await page.waitForTimeout(1000);
  console.log((await page.locator('body').innerText()).slice(-6500));
  // Expanding the feature reveals its session. Click the actual session card.
  await page.getByText('FEAT-001', { exact: true }).first().click();
  await page.waitForTimeout(1200);
  await shot('session.webp');
  await page.waitForTimeout(3500);
  const video = page.video();
  await context.close();
  const videoPath = await video.path();
  await browser.close();
  wsServer.close();
  execFileSync('ffmpeg', ['-y', '-ss', '1.5', '-i', videoPath, '-an', '-vf', 'fps=24,scale=1440:-2', '-c:v', 'libx264', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(out, 'walkthrough.mp4')], { stdio: 'ignore' });
  console.log('aiOS captures saved to', out);
})().catch(error => { console.error(error); process.exit(1); });
