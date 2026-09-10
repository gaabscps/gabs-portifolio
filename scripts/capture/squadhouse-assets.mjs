import { chromium } from "/Volumes/KINGSTON/Developer/projects/soundwave-summit/node_modules/playwright/index.mjs";
import sharp from "sharp";

const output = new URL("../../public/projects/squadhouse/", import.meta.url);
const crmUrl = process.env.SQUADHOUSE_CRM_URL;
if (!crmUrl) throw new Error("SQUADHOUSE_CRM_URL is required; refusing to risk a real CRM instance");
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 720 } });

async function capture(url, name) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const png = `/tmp/squadhouse-${name}.png`;
  await page.screenshot({ path: png, fullPage: false });
  await sharp(png).webp({ quality: 88 }).toFile(new URL(`${name}.webp`, output).pathname);
  return png;
}

const platform = await capture(process.env.SQUADHOUSE_PLATFORM_URL ?? "http://127.0.0.1:3000/modelo", "platform");
await page.goto(crmUrl, { waitUntil: "domcontentloaded", timeout: 20_000 });
if (!(await page.getByText("DEMO DATA · PORTFOLIO CAPTURE", { exact: true }).count())) {
  throw new Error("CRM page did not prove it is the synthetic portfolio fixture");
}
const crm = "/tmp/squadhouse-crm.png";
await page.screenshot({ path: crm, fullPage: false });
await sharp(crm).webp({ quality: 88 }).toFile(new URL("crm.webp", output).pathname);
await sharp(platform).webp({ quality: 88 }).toFile(new URL("cover.webp", output).pathname);
const recordingContext = await browser.newContext({
  viewport: { width: 1440, height: 720 },
  recordVideo: { dir: "/tmp/squadhouse-video", size: { width: 1440, height: 720 } },
});
const recording = await recordingContext.newPage();
await recording.goto(process.env.SQUADHOUSE_PLATFORM_URL ?? "http://127.0.0.1:3000/modelo", { waitUntil: "domcontentloaded" });
await recording.waitForTimeout(1200);
await recording.mouse.wheel(0, 650);
await recording.waitForTimeout(2500);
await recording.goto(crmUrl, { waitUntil: "domcontentloaded" });
if (!(await recording.getByText("DEMO DATA · PORTFOLIO CAPTURE", { exact: true }).count())) throw new Error("recording CRM fixture marker missing");
await recording.waitForTimeout(1800);
const board = recording.locator('main .overflow-x-auto');
const bounds = await board.boundingBox();
if (!bounds) throw new Error("CRM board not visible");
await recording.mouse.move(bounds.x + bounds.width / 2, bounds.y + Math.min(bounds.height / 2, 150));
await recording.mouse.wheel(700, 0);
await recording.waitForTimeout(2200);
if (!(await board.evaluate(el => el.scrollLeft > 0))) throw new Error("CRM board did not scroll horizontally");
await recording.mouse.wheel(-700, 0);
await recording.waitForTimeout(3200);
if (!(await board.evaluate(el => el.scrollLeft === 0))) throw new Error("CRM board did not return to first column");
const videoPath = await recording.video().path();
await recordingContext.close();
const { execFileSync } = await import("node:child_process");
execFileSync("ffmpeg", ["-y", "-i", videoPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", new URL("walkthrough.mp4", output).pathname], { stdio: "inherit" });
console.log(`Captured platform=${platform} crm=${crm} video=${videoPath}`);
await browser.close();
