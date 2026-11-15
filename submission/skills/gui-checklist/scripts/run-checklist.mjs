#!/usr/bin/env node
// Chạy GUI checklist bằng Playwright, CHỈ ghi quan sát + ảnh, không kết luận Pass/Fail.
// Rút gọn từ scripts/hw03-run-checklist.mjs (HW03). Các hàm kiểm từng mục nằm trong file checks
// (xem checks.example.mjs); file này chỉ lo trình duyệt, ảnh, ghi chú và báo cáo.
//
// Dùng:  node run-checklist.mjs --config run.config.json
//        ONLY=GUI-02-11,GUI-04-02 node run-checklist.mjs --config run.config.json   (chạy lại vài mục)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const cfgPath = path.resolve(argv[argv.indexOf("--config") + 1] || "run.config.json");
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const base = path.dirname(cfgPath);
const rel = (p) => path.resolve(base, p);

const OUT_DIR = rel(cfg.outDir || ".");
const SHOTS = path.join(OUT_DIR, "screenshots/run");
const OUT = path.join(OUT_DIR, cfg.reportFile || "execution-observations.md");
const STATE = path.join(OUT_DIR, ".run-results.json");
fs.mkdirSync(SHOTS, { recursive: true });

// playwright-core: lấy theo cfg.playwright, nếu không có thì tìm trong node_modules của thư mục config / thư mục hiện tại
async function loadPlaywright() {
  const tries = [cfg.playwright && rel(cfg.playwright), path.join(base, "x.js"), path.join(process.cwd(), "x.js")].filter(Boolean);
  for (const t of tries) {
    try {
      const p = t.endsWith("x.js") ? createRequire(t).resolve("playwright-core") : t;
      return await import(pathToFileURL(p.endsWith(".mjs") || p.endsWith(".js") ? p : path.join(p, "index.mjs")).href);
    } catch {}
  }
  throw new Error("Không tìm thấy playwright-core. Chạy `npm i playwright-core` hoặc đặt cfg.playwright.");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = {};
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
if (ONLY && fs.existsSync(STATE)) Object.assign(results, JSON.parse(fs.readFileSync(STATE, "utf8")));
let currentPhase = "";

function rec(id, obs, imgs = [], hint = "") {
  results[id] = { obs: Array.isArray(obs) ? obs : [obs], imgs, hint, phase: currentPhase };
  fs.writeFileSync(STATE, JSON.stringify(results, null, 2));
  console.log(`✓ ${id}`);
}

let browser;
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: cfg.viewport || { width: 1366, height: 768 }, locale: cfg.locale || "vi-VN", ...opts });
  const page = await ctx.newPage();
  page.dialogs = [];
  page.dialogMode = "accept";
  page.on("dialog", async (d) => {
    page.dialogs.push(`${d.type()}("${d.message()}")`);
    if (page.dialogMode === "dismiss" && d.type() === "confirm") await d.dismiss(); else await d.accept();
  });
  return page;
}
const takeDialogs = (page) => page.dialogs.splice(0);

async function login(page, override = {}) {
  const L = { ...cfg.login, ...override };
  await page.goto(L.url || cfg.baseUrl);
  for (const [sel, val] of Object.entries(L.fields || {})) await page.fill(sel, val);
  await page.click(L.submit);
  if (L.waitFor && !override.noWait) { await page.waitForSelector(L.waitFor, { timeout: 15000 }); await page.waitForLoadState("networkidle"); }
}

async function outline(locator) {
  const n = await locator.count();
  for (let i = 0; i < n; i++) await locator.nth(i).evaluate((e) => { e.style.outline = "3px solid #ff00ff"; e.dataset.qaOutline = "1"; });
}
async function clearOutline(page) {
  await page.evaluate(() => document.querySelectorAll("[data-qa-outline]").forEach((e) => { e.style.outline = ""; delete e.dataset.qaOutline; }));
}

// Chụp ảnh; lines = ghi chú chèn vào góc ảnh (số đo, nội dung hộp thoại), ghi rõ là không thuộc SUT
async function shot(page, name, lines = [], { full = false } = {}) {
  if (lines.length) {
    await page.evaluate((ls) => {
      const d = document.createElement("div"); d.id = "__qa_note";
      d.style.cssText = "position:fixed;right:8px;bottom:8px;max-width:560px;z-index:2147483647;background:#fff8c5;color:#000;border:2px dashed #b08800;padding:6px 8px;font:12px/1.35 Menlo,monospace;white-space:pre-wrap;box-shadow:0 2px 8px rgba(0,0,0,.3)";
      d.textContent = "▶ Ghi chú của Playwright (không thuộc SUT)\n" + ls.join("\n");
      document.body.appendChild(d);
    }, lines);
  }
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: full });
  if (lines.length) await page.evaluate(() => document.getElementById("__qa_note")?.remove());
  return `${name}.png`;
}

function checklistIds() {
  const md = fs.readFileSync(rel(cfg.checklist), "utf8");
  const re = new RegExp(`^\\| (${cfg.idPattern || "GUI-\\d\\d-\\d\\d"}) \\|`, "gm");
  return [...new Set([...md.matchAll(re)].map((m) => m[1]))];
}

function writeReport(meta, started, ended) {
  const ids = checklistIds();
  const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ").replace(/<(?!br>)([^<>`]+)>/g, "`<$1>`");
  const L = [
    `# Quan sát khi chạy checklist GUI — ${cfg.title || cfg.baseUrl}`, "",
    `- **Checklist:** \`${cfg.checklist}\` (${ids.length} mục)`,
    `- **Thời gian chạy:** ${started} → ${ended}`,
    `- **Môi trường:** Chrome ${meta.version} qua Playwright, khung nhìn ${(cfg.viewport || { width: 1366 }).width}×${(cfg.viewport || { height: 768 }).height}, ngôn ngữ ${cfg.locale || "vi-VN"}`,
    `- **SUT:** ${cfg.baseUrl}`, "",
    "**Lưu ý khi xem ảnh**",
    "- Khung nền vàng **\"▶ Ghi chú của Playwright (không thuộc SUT)\"** do script chèn vào để ghi số đo và nội dung hộp thoại.",
    "- Viền tím quanh phần tử là đánh dấu của script.",
    "- Cột **Gợi ý kết quả** chỉ là gợi ý; Pass/Fail do người kiểm thử quyết định sau khi xem ảnh.",
    "- Điền cột **Kết quả đã kiểm chứng** theo dạng `Passed`, `Failed — <lý do>`, `N/A — <lý do>`.", "",
    "| ID | Pha | Quan sát | Ảnh | Gợi ý kết quả | Kết quả đã kiểm chứng |", "|---|---|---|---|---|---|",
  ];
  for (const id of ids) {
    const r = results[id];
    if (!r) { L.push(`| ${id} | — | Chưa chạy | — | Cần kiểm tay |  |`); continue; }
    const imgs = r.imgs.length ? r.imgs.map((f) => `[${f}](screenshots/run/${f})`).join("<br>") : "—";
    L.push(`| ${id} | ${esc(r.phase)} | ${r.obs.map((o) => "• " + esc(o)).join("<br>")} | ${imgs} | ${esc(r.hint)} |  |`);
  }
  fs.writeFileSync(OUT, L.join("\n") + "\n");
  console.log(`Đã ghi ${OUT}`);
}

const pad = (n) => String(n).padStart(2, "0");
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
const started = fmt(new Date());

const { chromium } = await loadPlaywright();
browser = await chromium.launch({ executablePath: cfg.chrome || undefined, headless: cfg.headless !== false });
const ctx = { cfg, browser, newPage, login, shot, rec, sleep, outline, clearOutline, takeDialogs };
const { phases } = await import(pathToFileURL(rel(cfg.checks)).href);
try {
  for (const ph of phases) {
    currentPhase = ph.name;
    for (const [id, fn] of Object.entries(ph.items)) {
      if (ONLY && !ONLY.includes(id)) continue;
      try { await fn(ctx, id); } catch (e) {
        const msg = e.message.split("\n")[0];
        console.log(`✗ ${id}: ${msg}`);
        rec(id, `Không chạy tự động được: ${msg}`, [], "Cần kiểm tay");
      }
    }
    if (ph.after) await ph.after(ctx);
  }
} finally {
  const version = browser.version();
  await browser.close();
  writeReport({ version }, started, fmt(new Date()));
}
