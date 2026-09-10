const { chromium } = require('/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules/playwright');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const SOURCE = '/Volumes/KINGSTON/Developer/ai-squad';
const OUTPUT = path.resolve(__dirname, '../../public/projects/ai-squad');
const VIDEO_TMP = path.join(OUTPUT, '.video-tmp');
const hook = path.join(SOURCE, 'squads/sdd/hooks/block-git-write.py');

function runHook(project, transcript, command) {
  const payload = JSON.stringify({ cwd: project, transcript_path: transcript, tool_input: { command } });
  const result = spawnSync('python3', [hook], {
    input: payload, encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: project }
  });
  if (result.status !== 0) throw new Error(result.stderr || `hook exited ${result.status}`);
  return result.stdout.trim();
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function hookReason(raw) {
  if (!raw) return 'No deny response · exit 0';
  return JSON.parse(raw).hookSpecificOutput.permissionDecisionReason;
}

(async () => {
  fs.mkdirSync(OUTPUT, { recursive: true });
  fs.rmSync(VIDEO_TMP, { recursive: true, force: true });
  fs.mkdirSync(VIDEO_TMP, { recursive: true });

  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-squad-capture-'));
  const project = path.join(fixture, 'project');
  const session = path.join(project, '.agent-session/FEAT-001');
  const transcript = path.join(fixture, 'transcript.jsonl');
  fs.mkdirSync(session, { recursive: true });
  fs.writeFileSync(transcript, JSON.stringify({
    isMeta: true,
    message: { role: 'user', content: [{ type: 'text', text: 'Base directory for this skill: /demo/skills/implementer\nPortfolio fixture activation' }] }
  }) + '\n');
  fs.writeFileSync(path.join(session, 'session.yml'), 'spec_id: FEAT-001\nstatus: implementing\n');

  const deniedBefore = hookReason(runHook(project, transcript, 'git commit -m demo'));
  fs.appendFileSync(path.join(session, 'session.yml'), 'final_approved_at: 2026-09-10T12:00:00Z\n');
  const allowedAfter = hookReason(runHook(project, transcript, 'git commit -m demo'));
  const pushDenied = hookReason(runHook(project, transcript, 'git push origin main'));
  const pipelineSvg = fs.readFileSync(path.join(SOURCE, 'docs/assets/build-pipeline.svg'), 'utf8');
  const pipelineUri = `data:image/svg+xml;base64,${Buffer.from(pipelineSvg).toString('base64')}`;
  const pkg = JSON.parse(fs.readFileSync(path.join(SOURCE, 'packages/cli/package.json'), 'utf8'));
  const help = execFileSync('node', ['packages/cli/bin/cli.js', 'help'], { cwd: SOURCE, encoding: 'utf8' });
  const cliLine = help.split('\n')[0].trim();

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#071018;color:#edf6ff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
    body:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 88% 8%,rgba(16,185,129,.16),transparent 34%),radial-gradient(circle at 8% 92%,rgba(56,189,248,.13),transparent 36%),linear-gradient(135deg,#071018,#0b1320 55%,#081218)}
    .noise{position:absolute;inset:0;opacity:.22;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:34px 34px}
    main{position:relative;height:100%;padding:38px 52px 34px;display:flex;flex-direction:column;gap:22px}
    header{display:flex;align-items:flex-start;justify-content:space-between}.eyebrow{color:#63e6be;font:700 12px ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;margin-bottom:10px}
    h1{margin:0;font-size:46px;line-height:1.02;letter-spacing:-.045em;max-width:850px}h1 em{font-style:normal;color:#7dd3fc}.sub{margin-top:10px;color:#93a4b7;font-size:17px}
    .meta{text-align:right;border:1px solid #263649;background:rgba(10,20,31,.75);padding:13px 16px;border-radius:12px;font:12px ui-monospace,monospace;color:#9fb0c2;line-height:1.6}.meta b{color:#d9f99d}
    .panel{background:rgba(10,18,29,.82);border:1px solid #223246;border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.24)}
    .pipeline{padding:14px 18px 12px;display:flex;align-items:center;justify-content:center;height:310px;overflow:hidden}.pipeline img{width:100%;height:100%;object-fit:contain}
    .proof{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;flex:1;min-height:0}.terminal{padding:20px 22px;font:13px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden}.dots{color:#586779;letter-spacing:.35em;margin-bottom:13px}.prompt{color:#7dd3fc}.cmd{color:#f8fafc}.deny{color:#fca5a5}.allow{color:#86efac}.muted{color:#718096}.line{margin:7px 0}
    .principles{padding:20px 22px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.card{border:1px solid #26384d;background:#0b1723;border-radius:13px;padding:15px}.card .n{color:#526579;font:11px ui-monospace,monospace}.card h3{font-size:15px;margin:7px 0 5px}.card p{font-size:12px;line-height:1.45;color:#8fa0b3;margin:0}.amber h3{color:#fcd34d}.blue h3{color:#7dd3fc}.green h3{color:#86efac}.purple h3{color:#c4b5fd}
    footer{display:flex;justify-content:space-between;color:#65778a;font:11px ui-monospace,monospace;letter-spacing:.04em}.label{color:#9ff5d0}
    [data-step]{transition:opacity .65s ease,transform .65s ease}.stage-0 .proof{opacity:.2;transform:translateY(22px)}.stage-0 .pipeline{transform:translateY(8px)}.stage-1 .proof{opacity:1;transform:none}.stage-2 .deny-row{background:rgba(248,113,113,.08);border-left:2px solid #f87171;padding-left:10px}.stage-3 .allow-row{background:rgba(34,197,94,.08);border-left:2px solid #22c55e;padding-left:10px}.stage-4 .push-row{background:rgba(245,158,11,.08);border-left:2px solid #f59e0b;padding-left:10px}
  </style></head><body class="stage-1"><div class="noise"></div><main>
    <header><div><div class="eyebrow">AI Squad · Spec-driven delivery</div><h1>Human checkpoints.<br><em>Executable guardrails.</em></h1><div class="sub">A workflow where verification and approval control what agents can ship.</div></div><div class="meta"><b>v${esc(pkg.version)}</b><br>${esc(cliLine)}<br>source · local V3 checkout</div></header>
    <section class="panel pipeline" data-step><img src="${pipelineUri}" alt="AI Squad build pipeline"></section>
    <section class="proof" data-step>
      <div class="panel terminal"><div class="dots">● ● ● <span class="muted">hook replay · disposable fixture</span></div>
        <div class="deny-row"><span class="prompt">before seal</span> <span class="cmd">git commit -m demo</span><div class="line deny">DENY · ${esc(deniedBefore.split('. After')[0])}</div></div>
        <div class="allow-row"><span class="prompt">after seal</span> <span class="cmd">git commit -m demo</span><div class="line allow">ALLOW · ${esc(allowedAfter)}</div></div>
        <div class="push-row"><span class="prompt">after seal</span> <span class="cmd">git push origin main</span><div class="line deny">DENY · ${esc(pushDenied.split('. After')[0])}</div></div>
      </div>
      <div class="panel principles"><div class="card blue"><div class="n">01 · MAP</div><h3>Reuse before build</h3><p>Find what already exists, then approve a scoped plan.</p></div><div class="card green"><div class="n">02 · VERIFY</div><h3>Commands decide</h3><p>The task’s verification exit code drives the fix loop.</p></div><div class="card purple"><div class="n">03 · REVIEW</div><h3>Fresh eyes advise</h3><p>Independent review informs the human checkpoint.</p></div><div class="card amber"><div class="n">04 · SEAL</div><h3>Approval unlocks commit</h3><p>Push stays outside the implementer’s authority.</p></div></div>
    </section>
    <footer><span class="label">WORKFLOW ILLUSTRATION · REAL HOOK OUTPUT · LOCAL FIXTURE</span><span>docs/assets/build-pipeline.svg · squads/sdd/hooks/block-git-write.py</span></footer>
  </main></body></html>`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, recordVideo: { dir: VIDEO_TMP, size: { width: 1440, height: 900 } } });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const coverPng = path.join(OUTPUT, '.cover.png');
  const workflowPng = path.join(OUTPUT, '.workflow.png');
  await page.screenshot({ path: coverPng });
  await page.evaluate(() => document.body.className = 'stage-4');
  await page.waitForTimeout(800);
  await page.screenshot({ path: workflowPng });

  await page.evaluate(() => document.body.className = 'stage-0');
  await page.waitForTimeout(1300);
  for (const stage of [1, 2, 3, 4]) {
    await page.evaluate(s => document.body.className = `stage-${s}`, stage);
    await page.waitForTimeout(stage === 1 ? 2600 : 2200);
  }
  await page.waitForTimeout(1400);

  const video = page.video();
  await context.close(); await browser.close();
  const webm = await video.path();
  execFileSync('ffmpeg', ['-y','-i',coverPng,'-quality','92',path.join(OUTPUT,'cover.webp')], { stdio: 'ignore' });
  execFileSync('ffmpeg', ['-y','-i',workflowPng,'-quality','92',path.join(OUTPUT,'workflow.webp')], { stdio: 'ignore' });
  execFileSync('ffmpeg', ['-y','-i',webm,'-an','-c:v','libx264','-preset','medium','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',path.join(OUTPUT,'walkthrough.mp4')], { stdio: 'ignore' });
  fs.rmSync(coverPng,{force:true}); fs.rmSync(workflowPng,{force:true}); fs.rmSync(VIDEO_TMP,{recursive:true,force:true}); fs.rmSync(fixture,{recursive:true,force:true});
  console.log(`Captured AI Squad v${pkg.version} assets in ${OUTPUT}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
