// HW03 — chạy checklist GUI Web Admin (submission/task1-checklist/checklist-filtered.md) bằng Playwright + Chrome.
// Ghi quan sát thực tế + ảnh bằng chứng; KHÔNG kết luận Pass/Fail.
// Dùng: node scripts/hw03-run-checklist.mjs   (SUT phải đang chạy: scripts/start-sut.sh && scripts/seed-hw03.sh 3)
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ADMIN = "http://localhost:5174";
const API = "http://localhost:3000/api";
const TC = path.join(ROOT, "submission/task1-checklist");
const SHOTS = path.join(TC, "screenshots/run");
const CSV = path.join(ROOT, "submission/test-data/csv");
const TMP = process.env.QA_TMP || path.join(ROOT, "logs/qa-tmp");
const OUT = path.join(TC, "execution-observations.md");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const results = {};
const phaseOf = {};
let currentPhase = "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayOffset = (k) => { const d = new Date(); d.setDate(d.getDate() + k); return ymd(d); };
const trunc = (s, n = 60) => (s && s.length > n ? s.slice(0, n) + "…" : s);

function rec(id, obs, imgs, hint) {
  results[id] = { obs: Array.isArray(obs) ? obs : [obs], imgs, hint, phase: currentPhase };
  phaseOf[id] = currentPhase;
  fs.writeFileSync(path.join(TMP, "results.json"), JSON.stringify(results, null, 2));
  console.log(`✓ ${id}`);
}

// ---------- browser helpers ----------
let browser;
const HELPERS = () => {
  window.__qa = {
    rgb(c) {
      const cv = document.createElement("canvas"); cv.width = cv.height = 1;
      const x = cv.getContext("2d"); x.clearRect(0, 0, 1, 1); x.fillStyle = "rgba(0,0,0,0)"; x.fillStyle = c; x.fillRect(0, 0, 1, 1);
      const d = x.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255];
    },
    bg(el) {
      while (el) { const r = this.rgb(getComputedStyle(el).backgroundColor); if (r[3] > 0.5) return r; el = el.parentElement; }
      return [255, 255, 255, 1];
    },
    lum([r, g, b]) { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); },
    ratio(a, b) { const [x, y] = [this.lum(a), this.lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); },
    hex(c) { return "#" + c.slice(0, 3).map((v) => v.toString(16).padStart(2, "0")).join(""); },
    desc(el) {
      if (!el || el === document.body) return "(body)";
      const t = el.tagName.toLowerCase();
      const ty = el.getAttribute("type") ? `[type=${el.getAttribute("type")}]` : "";
      const label = el.getAttribute("placeholder") || (el.innerText || el.value || "").trim().slice(0, 30);
      return `${t}${ty} "${label}"`;
    },
  };
};

async function newPage(opts = {}) {
  const b = opts.browser || browser;
  const { browser: _b, ...ctxOpts } = opts;
  const ctx = await b.newContext({ viewport: { width: 1366, height: 768 }, locale: "vi-VN", ...ctxOpts });
  await ctx.addInitScript(HELPERS);
  const page = await ctx.newPage();
  page.dialogs = [];
  page.dialogMode = "accept";
  page.reqs = [];
  page.on("dialog", async (d) => {
    page.dialogs.push(`${d.type()}("${d.message()}")`);
    if (page.dialogMode === "dismiss" && d.type() === "confirm") await d.dismiss(); else await d.accept();
  });
  page.on("request", (r) => { if (r.url().startsWith(API)) page.reqs.push(`${r.method()} ${r.url().replace(API, "/api")}`); });
  return page;
}
const takeDialogs = (page) => { const d = page.dialogs.slice(); page.dialogs.length = 0; return d; };

async function login(page, email = "admin@eshop.com", pw = "Admin123!") {
  await page.goto(ADMIN);
  await page.fill('input[placeholder="Email"]', email);
  await page.fill('input[placeholder="Password"]', pw);
  await page.click("form button");
  if (email === "admin@eshop.com" && pw === "Admin123!") {
    await page.waitForSelector("text=EShop Admin", { timeout: 15000 });
    await page.waitForLoadState("networkidle");
    await sleep(300);
  }
}
async function tab(page, name) { await page.click(`li:text-is("${name}")`); await sleep(350); }
const mainTable = (page) => page.locator("table").last();
const rowsOf = (page) => mainTable(page).locator("tbody tr");
async function outline(locator) { const n = await locator.count(); for (let i = 0; i < n; i++) await locator.nth(i).evaluate((e) => (e.style.outline = "3px solid #ff00ff")); }
async function clearOutline(page) { await page.evaluate(() => document.querySelectorAll("[style*='outline']").forEach((e) => (e.style.outline = ""))); }

async function shot(page, name, lines = [], { full = false } = {}) {
  if (lines.length) {
    await page.evaluate((ls) => {
      const d = document.createElement("div"); d.id = "__pw_note";
      d.style.cssText = "position:fixed;right:8px;bottom:8px;max-width:560px;z-index:2147483647;background:#fff8c5;color:#000;border:2px dashed #b08800;padding:6px 8px;font:12px/1.35 Menlo,monospace;white-space:pre-wrap;box-shadow:0 2px 8px rgba(0,0,0,.3)";
      d.textContent = "▶ Ghi chú của Playwright (không thuộc SUT)\n" + ls.join("\n");
      document.body.appendChild(d);
    }, lines);
  }
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: full });
  if (lines.length) await page.evaluate(() => document.getElementById("__pw_note")?.remove());
  return `${name}.png`;
}

const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
if (ONLY && fs.existsSync(path.join(TMP, "results.json"))) {
  Object.assign(results, JSON.parse(fs.readFileSync(path.join(TMP, "results.json"), "utf8")));
  for (const k of Object.keys(results)) phaseOf[k] = results[k].phase;
}
async function run(id, fn) {
  if (ONLY && !ONLY.includes(id)) return;
  try { await fn(); } catch (e) {
    console.log(`✗ ${id}: ${e.message.split("\n")[0]}`);
    rec(id, `Không chạy tự động được: ${e.message.split("\n")[0]}`, [], "Cần kiểm tay");
  }
}

// ---------- form helpers ----------
const catInput = (p) => p.locator('input[placeholder="Tên danh mục mới"]');
async function addCategory(p, name) {
  await catInput(p).fill(name);
  await p.click('button:has-text("Thêm mới")');
  await p.waitForLoadState("networkidle"); await sleep(400);
}
const prodForm = (p) => p.locator("form").filter({ has: p.locator('button:has-text("Lưu sản phẩm")') });
async function fillProduct(p, { name, price, img, desc, cat }) {
  const f = prodForm(p);
  if (name !== undefined) await f.locator('input[placeholder="Tên sản phẩm"]').fill(name);
  if (price !== undefined) await f.locator('input[placeholder="Giá tiền"]').fill(String(price));
  if (img !== undefined) await f.locator('input[placeholder="URL Ảnh"]').fill(img);
  if (desc !== undefined) await f.locator('textarea[placeholder="Mô tả"]').fill(desc);
  if (cat !== undefined) await f.locator("select").selectOption({ label: cat });
}
async function invalidFields(form) {
  return form.evaluate((f) => [...f.elements].filter((e) => e.willValidate && !e.checkValidity()).map((e) => `${e.placeholder || e.type}: "${e.validationMessage}"`));
}
async function submitProduct(p) {
  const inv = await invalidFields(prodForm(p));
  await prodForm(p).locator('button:has-text("Lưu sản phẩm")').click();
  await p.waitForLoadState("networkidle"); await sleep(500);
  return inv;
}
const coupForm = (p) => p.locator("form").filter({ has: p.locator('button:has-text("Tạo mã")') });
async function createCoupon(p, { code, type = "percent", value = "10", min, date = "2099-12-31", max }) {
  const f = coupForm(p);
  await f.locator("input").first().fill(code);
  await f.locator("select").selectOption(type);
  await f.locator("input[type=number]").nth(0).fill(String(value));
  if (min !== undefined) await f.locator("input[type=number]").nth(1).fill(String(min));
  await f.locator("input[type=date]").fill(date);
  if (max !== undefined) await f.locator("input[type=number]").nth(2).fill(String(max));
  const inv = await invalidFields(f);
  const before = p.reqs.length;
  takeDialogs(p);
  await f.locator('button:has-text("Tạo mã")').click();
  await p.waitForLoadState("networkidle"); await sleep(500);
  const sent = p.reqs.slice(before).some((r) => r.startsWith("POST /api/admin/coupons"));
  const shown = (await rowsOf(p).filter({ hasText: code.toUpperCase() }).count()) > 0;
  const dlg = takeDialogs(p);
  // reset form for next attempt
  await f.locator("input").first().fill("");
  await f.locator("input[type=number]").nth(1).fill("0");
  await f.locator("input[type=number]").nth(2).fill("1");
  return { inv, sent, shown, dlg };
}
const describeAttempt = (label, r) =>
  `${label} → ${r.inv.length ? `trình duyệt chặn (${r.inv.join("; ")})` : r.sent ? "đã gửi request" : "không gửi request"}` +
  `${r.dlg.length ? `, hộp thoại: ${r.dlg.join(" / ")}` : ""}${r.shown ? ", mã XUẤT HIỆN trong bảng" : ", mã không có trong bảng"}`;

async function apiAdminToken() {
  const r = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@eshop.com", password: "Admin123!" }) });
  return (await r.json()).token;
}

// =====================================================================
async function main() {
  browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const chromeVersion = browser.version();

  // ---- chuẩn bị dữ liệu: chuyển đơn #1 sang delivered để Dashboard có doanh thu ----
  const tok = await apiAdminToken();
  for (const s of ["confirmed", "shipping", "delivered"]) {
    await fetch(`${API}/admin/orders/1/status`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${tok}` }, body: JSON.stringify({ status: s }) });
  }
  const orders = await (await fetch(`${API}/admin/orders`, { headers: { Authorization: `Bearer ${tok}` } })).json();
  const delivered = orders.filter((o) => o.status === "delivered");
  const expectedRevenue = delivered.reduce((s, o) => s + o.total_amount, 0);

  // ===================== PHASE 1: mục chỉ xem =====================
  currentPhase = "1. Chỉ xem";
  const L = await newPage();
  await L.goto(ADMIN);
  const P = await newPage();
  await login(P);

  await run("GUI-01-01", async () => {
    await L.goto(ADMIN);
    const lh = await L.$$eval("h1", (a) => a.map((e) => e.innerText.trim()));
    const lh2 = await L.$$eval("h2", (a) => a.map((e) => e.innerText.trim()));
    const lines = [`Login: ${lh.length} thẻ <h1> ${JSON.stringify(lh)}; <h2>: ${JSON.stringify(lh2)}`];
    const i1 = await shot(L, "GUI-01-01", lines);
    const per = [];
    for (const t of ["Dashboard", "Danh mục", "Sản phẩm", "Mã Giảm Giá"]) {
      await tab(P, t);
      const h1 = await P.$$eval("h1", (a) => a.map((e) => e.innerText.trim()));
      const h2 = await P.$eval("div.flex-1 h2", (e) => e.innerText.trim());
      per.push(`${t}: ${h1.length} <h1> ${JSON.stringify(h1)}, tiêu đề màn là <h2> "${h2}"`);
    }
    await tab(P, "Sản phẩm");
    await outline(P.locator("h1"));
    const i2 = await shot(P, "GUI-01-01-2", per);
    await clearOutline(P);
    const same = new Set(per.map((x) => x.split("[")[1]?.split("]")[0])).size === 1;
    rec("GUI-01-01", [...lines, ...per], [i1, i2],
      lh.length !== 1 || same ? "Có thể Failed: Login không có <h1>; 4 tab dùng chung <h1> \"EShop Admin\"" : "Cần xem ảnh");
  });

  await run("GUI-01-02", async () => {
    await L.goto(ADMIN);
    const info = await L.evaluate(() => ({
      title: document.querySelector("h2")?.innerText,
      ph: [...document.querySelectorAll("input")].map((i) => i.placeholder),
      btn: document.querySelector("form button")?.innerText,
    }));
    const lines = [`Tiêu đề: "${info.title}"`, `Placeholder: ${info.ph.map((x) => `"${x}"`).join(", ")}`, `Nút: "${info.btn}"`];
    await outline(L.locator("h2, input, form button"));
    const i = await shot(L, "GUI-01-02", lines);
    await clearOutline(L);
    rec("GUI-01-02", lines, [i], /Login|Password/.test(JSON.stringify(info)) ? "Có thể Failed: còn \"Admin Login\", \"Password\", \"Login\" tiếng Anh" : "Có thể Passed");
  });

  await run("GUI-01-03", async () => {
    const allow = new Set(["Dashboard", "Admin", "CSV", "Import", "URL", "ID", "Email", "EShop", "csv", "VD", "SAVE10"]);
    const out = []; const imgs = [];
    for (const [t, n] of [["Dashboard", "GUI-01-03"], ["Danh mục", "GUI-01-03-2"], ["Sản phẩm", "GUI-01-03-3"], ["Mã Giảm Giá", "GUI-01-03-4"]]) {
      await tab(P, t);
      const strings = await P.evaluate(() => {
        const els = [...document.querySelectorAll("h1,h2,h3,li,th,button,label,a,p,option,span,div")].filter((e) => !e.closest("tbody") && e.id !== "__pw_note" && !e.closest("#__pw_note"));
        const own = els.map((e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").trim()).filter(Boolean);
        const ph = [...document.querySelectorAll("input,textarea")].map((i) => i.placeholder).filter(Boolean);
        return [...new Set([...own, ...ph])];
      });
      const VI = new Set(["Danh", "danh", "doanh", "thu", "Xem", "xem", "tho", "VD", "lan", "Ma"]);
      const words = [...new Set(strings.flatMap((x) => x.split(/[^\p{L}\p{N}]+/u)).filter((w) => /^[A-Za-z]{2,}$/.test(w) && !allow.has(w) && !VI.has(w)))];
      const where = words.map((w) => `${w} (“${trunc(strings.find((x) => x.split(/[^\p{L}\p{N}]+/u).includes(w)), 40)}”)`);
      out.push(`${t}: từ tiếng Anh ngoài danh sách được giữ: ${where.length ? where.join(", ") : "(không có)"}`);
      imgs.push(await shot(P, n, [out.at(-1)]));
    }
    rec("GUI-01-03", out, imgs, out.some((x) => !x.endsWith("(không có)")) ? "Có thể Failed: còn từ tiếng Anh (xem danh sách)" : "Có thể Passed");
  });

  await run("GUI-01-05", async () => {
    const info = await P.evaluate(() => ({ menu: [...document.querySelectorAll("li")].map((l) => l.innerText.trim()) }));
    const heads = [];
    for (const t of ["Danh mục", "Sản phẩm", "Mã Giảm Giá"]) {
      await tab(P, t);
      heads.push(`${t}: h2 "${await P.$eval("div.flex-1 h2", (e) => e.innerText)}", cột [${(await mainTable(P).locator("th").allInnerTexts()).join(" | ")}]`);
    }
    const lines = [`Menu: ${info.menu.join(" | ")}`, ...heads];
    await outline(P.locator("li, div.flex-1 h2, th"));
    const i = await shot(P, "GUI-01-05", lines);
    await clearOutline(P);
    rec("GUI-01-05", lines, [i], "Có thể Failed: trộn kiểu viết hoa (\"Mã Giảm Giá\", \"Tên Danh Mục\" so với \"Danh mục\", \"Tên SP\")");
  });

  await run("GUI-01-06", async () => {
    const res = [];
    const lo = await P.locator('li:text-is("Đăng xuất")').evaluate((e) => ({ color: __qa.hex(__qa.rgb(getComputedStyle(e).color)), bg: __qa.hex(__qa.bg(e)) }));
    res.push(`Đăng xuất: chữ ${lo.color} trên nền ${lo.bg} (không phải nút, là chữ màu đỏ)`);
    const imgs = [];
    for (const [t, n] of [["Danh mục", "GUI-01-06"], ["Sản phẩm", "GUI-01-06-2"], ["Mã Giảm Giá", "GUI-01-06-3"]]) {
      await tab(P, t);
      const b = rowsOf(P).first().locator('button:has-text("Xóa")');
      const c = await b.evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).backgroundColor)));
      res.push(`${t} — nút Xóa: nền ${c}`);
      await outline(P.locator('button:has-text("Xóa"), li:text-is("Đăng xuất")'));
      imgs.push(await shot(P, n, res.slice(-1)));
      await clearOutline(P);
    }
    rec("GUI-01-06", res, imgs, "Có thể Passed (nền đỏ #ef4444, Đăng xuất chữ đỏ) — xem ảnh");
  });

  await run("GUI-01-07", async () => {
    const res = [];
    await L.goto(ADMIN);
    res.push(`Login "${await L.locator("form button").innerText()}": nền ${await L.locator("form button").evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).backgroundColor)))}`);
    const i1 = await shot(L, "GUI-01-07", res.slice(-1));
    const btns = [["Danh mục", "Thêm mới"], ["Sản phẩm", "Import"], ["Sản phẩm", "Lưu sản phẩm"], ["Mã Giảm Giá", "Tạo mã"]];
    for (const [t, b] of btns) {
      await tab(P, t);
      const bl = P.locator(`button:has-text("${b}")`).first();
      res.push(`${t} — "${(await bl.innerText()).trim()}": nền ${await bl.evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).backgroundColor)))}`);
    }
    await tab(P, "Sản phẩm");
    await outline(P.locator('button:has-text("Import"), button:has-text("Lưu sản phẩm")'));
    const i2 = await shot(P, "GUI-01-07-2", res);
    await clearOutline(P);
    await tab(P, "Mã Giảm Giá");
    await outline(P.locator('button:has-text("Tạo mã")'));
    const i3 = await shot(P, "GUI-01-07-3", res);
    await clearOutline(P);
    rec("GUI-01-07", res, [i1, i2, i3], "Có thể Passed (không nút chính nào đỏ); ghi Notes: \"Lưu sản phẩm\" xanh lá, \"Tạo mã\" cam");
  });

  await run("GUI-01-08", async () => {
    const res = [];
    for (const t of ["Danh mục", "Sản phẩm", "Mã Giảm Giá"]) {
      await tab(P, t);
      const b = await rowsOf(P).first().locator('button:has-text("Xóa")').evaluate((e) => { const s = getComputedStyle(e); return `nền ${__qa.hex(__qa.rgb(s.backgroundColor))}, chữ ${s.fontSize}, padding ${s.padding}, bo góc ${s.borderRadius}`; });
      const th = await mainTable(P).locator("thead tr").evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).backgroundColor)));
      const last = (await mainTable(P).locator("th").allInnerTexts()).at(-1);
      res.push(`${t}: Xóa (${b}); header nền ${th}; cột cuối "${last}"`);
    }
    const i = await shot(P, "GUI-01-08", res);
    rec("GUI-01-08", res, [i], "Cần xem ảnh (số đo kiểu nút/bảng ghi ở cột Quan sát)");
  });

  await run("GUI-01-09", async () => {
    await tab(P, "Sản phẩm");
    const prices = (await rowsOf(P).locator("td:nth-child(3)").allInnerTexts()).slice(0, 5);
    await rowsOf(P).first().scrollIntoViewIfNeeded();
    await outline(rowsOf(P).locator("td:nth-child(3)"));
    const i = await shot(P, "GUI-01-09", [`Cột Giá (5 dòng đầu): ${prices.join(" | ")}`]);
    await clearOutline(P);
    rec("GUI-01-09", [`Cột Giá hiển thị: ${prices.join(" | ")}`], [i], prices.some((x) => /\d{4,}/.test(x.replace(/\./g, "") ) && !/\./.test(x)) ? "Có thể Failed: giá in thô, không phân cách hàng nghìn" : "Có thể Passed");
  });

  await run("GUI-01-11", async () => {
    await L.goto(ADMIN);
    const seq = [];
    for (let k = 0; k < 4; k++) { await L.keyboard.press("Tab"); seq.push(await L.evaluate(() => __qa.desc(document.activeElement))); }
    const i = await shot(L, "GUI-01-11", [`Tab 1–4: ${seq.join(" → ")}`]);
    rec("GUI-01-11", [`Thứ tự focus khi nhấn Tab từ đầu trang: ${seq.join(" → ")}`], [i], "Cần xem ảnh / đối chiếu thứ tự");
  });

  await run("GUI-01-12", async () => {
    await tab(P, "Sản phẩm");
    await P.click('h3:has-text("Thêm sản phẩm mới")');
    const s1 = [];
    for (let k = 0; k < 7; k++) { await P.keyboard.press("Tab"); s1.push(await P.evaluate(() => __qa.desc(document.activeElement))); }
    const i1 = await shot(P, "GUI-01-12", [`Form Sản phẩm (bắt đầu từ tiêu đề form): ${s1.join(" → ")}`]);
    await tab(P, "Mã Giảm Giá");
    await P.click('h3:has-text("Tạo mã giảm giá mới")');
    const s2 = [];
    for (let k = 0; k < 14; k++) { await P.keyboard.press("Tab"); const d = await P.evaluate(() => __qa.desc(document.activeElement)); if (d !== s2.at(-1)) s2.push(d); else s2[s2.length - 1] = d; if (d.startsWith("button")) break; }
    const i2 = await shot(P, "GUI-01-12-2", [`Form Mã giảm giá: ${s2.join(" → ")}`]);
    rec("GUI-01-12", [`Sản phẩm: ${s1.join(" → ")}`, `Mã giảm giá: ${s2.join(" → ")}`], [i1, i2], "Cần đối chiếu với thứ tự yêu cầu (xem Quan sát)");
  });

  await run("GUI-01-13", async () => {
    await P.reload(); await P.waitForLoadState("networkidle");
    await P.click("h1");
    const seq = [];
    for (let k = 0; k < 6; k++) { await P.keyboard.press("Tab"); seq.push(await P.evaluate(() => __qa.desc(document.activeElement))); }
    const liFocusable = await P.$$eval("li", (a) => a.map((l) => l.tabIndex));
    await P.click("h1"); await P.keyboard.press("Tab");
    const i = await shot(P, "GUI-01-13", [`Tab từ tiêu đề sidebar: ${seq.join(" → ")}`, `tabIndex các <li> menu: ${liFocusable.join(",")}`]);
    rec("GUI-01-13", [`6 lần Tab từ tiêu đề sidebar: ${seq.join(" → ")}`, `Mục menu là <li>, tabIndex = ${liFocusable.join(",")} → focus không dừng ở mục menu nào`], [i],
      seq.some((x) => x.startsWith("li")) ? "Cần xem ảnh" : "Có thể Failed: không Tab tới được mục menu / Đăng xuất");
  });

  await run("GUI-01-14", async () => {
    await tab(P, "Mã Giảm Giá");
    await P.click('h3:has-text("Tạo mã giảm giá mới")');
    await P.keyboard.press("Tab");
    const st = async () => P.evaluate(() => { const s = getComputedStyle(document.activeElement); return `${__qa.desc(document.activeElement)}: outline ${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}, box-shadow ${s.boxShadow}`; });
    const a = await st();
    const i1 = await shot(P, "GUI-01-14", [a]);
    for (let k = 0; k < 6; k++) await P.keyboard.press("Tab");
    const b = await st();
    const i2 = await shot(P, "GUI-01-14-2", [b]);
    rec("GUI-01-14", [a, b, "Mục menu sidebar không nhận focus nên không có viền focus (xem GUI-01-13)"], [i1, i2], "Cần xem ảnh (viền focus mặc định của Chrome)");
  });

  await run("GUI-02-01", async () => {
    const forms = [];
    await L.goto(ADMIN);
    const l = await L.evaluate(() => [...document.querySelectorAll("form input")].map((e) => `placeholder "${e.placeholder}", nhãn: ${e.labels.length}`));
    forms.push(`Login: ${l.join("; ")}`);
    const i3 = await shot(L, "GUI-02-01-3", forms.slice(-1));
    const imgs = [];
    for (const [t, n] of [["Mã Giảm Giá", "GUI-02-01"], ["Sản phẩm", "GUI-02-01-2"], ["Danh mục", "GUI-02-01-4"]]) {
      await tab(P, t);
      const f = await P.evaluate(() => [...document.querySelectorAll("form input:not([type=file]), form select, form textarea")].map((e) => `${e.placeholder ? `"${e.placeholder}"` : e.tagName.toLowerCase() + (e.type ? "[" + e.type + "]" : "")}${e.value ? ` (đang có giá trị "${e.value}")` : ""}: nhãn ${e.labels?.length || 0}`));
      forms.push(`${t}: ${f.join("; ")}`);
      imgs.push(await shot(P, n, [forms.at(-1)]));
    }
    rec("GUI-02-01", forms, [...imgs, i3], "Có thể Failed: không trường nào có <label>; ô Đơn tối thiểu (0), Số lần (1), ô ngày không còn chữ gợi ý");
  });

  await run("GUI-02-02", async () => {
    const res = [];
    await L.goto(ADMIN);
    res.push(`Login: số ký tự "*" trong form = ${(await L.locator("form").innerText()).split("*").length - 1}`);
    for (const t of ["Danh mục", "Sản phẩm", "Mã Giảm Giá"]) {
      await tab(P, t);
      const n = await P.evaluate(() => [...document.querySelectorAll("form")].map((f) => (f.innerText + [...f.querySelectorAll("input,textarea")].map((i) => i.placeholder).join("")).split("*").length - 1).reduce((a, b) => a + b, 0));
      res.push(`${t}: số ký tự "*" trong form = ${n}`);
    }
    await tab(P, "Sản phẩm");
    const i = await shot(P, "GUI-02-02", res);
    rec("GUI-02-02", res, [i], res.every((x) => x.endsWith("= 0")) ? "Có thể Failed: không trường bắt buộc nào có \"*\"" : "Cần xem ảnh");
  });

  await run("GUI-02-07", async () => {
    await L.goto(ADMIN);
    await L.fill('input[placeholder="Password"]', "MatKhau123!");
    const ty = await L.getAttribute('input[placeholder="Password"]', "type");
    await outline(L.locator('input[placeholder="Password"]'));
    const i = await shot(L, "GUI-02-07", [`type="${ty}"; đã gõ "MatKhau123!"`]);
    await clearOutline(L);
    rec("GUI-02-07", [`Ô mật khẩu có type="${ty}"; chuỗi gõ vào hiển thị dạng dấu chấm (xem ảnh)`], [i], ty === "password" ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-02-25", async () => {
    await L.goto(ADMIN); await sleep(300);
    const a = await L.evaluate(() => __qa.desc(document.activeElement));
    const ac = await L.$$eval("form input", (x) => x.map((e) => `"${e.placeholder}": autocomplete=${e.getAttribute("autocomplete") ?? "(không có)"}, autofocus=${e.autofocus}`));
    const i = await shot(L, "GUI-02-25", [`Phần tử đang focus khi mở trang: ${a}`, ...ac]);
    rec("GUI-02-25", [`Khi mở trang, focus ở: ${a}`, ...ac], [i], a === "(body)" ? "Có thể Failed: con trỏ không nằm sẵn ở ô Email, không có autocomplete" : "Cần xem ảnh");
  });

  await run("GUI-03-01", async () => {
    const res = []; const imgs = [];
    for (const [t, n] of [["Dashboard", null], ["Danh mục", "GUI-03-01"], ["Sản phẩm", null], ["Mã Giảm Giá", "GUI-03-01-2"]]) {
      await tab(P, t);
      const hl = await P.$$eval("li", (a) => a.filter((l) => l.className.includes("text-blue-400")).map((l) => l.innerText.trim()));
      const col = await P.locator(`li:text-is("${t}")`).evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).color)));
      res.push(`Mở "${t}": mục được tô = ${JSON.stringify(hl)}, màu chữ ${col}`);
      if (n) imgs.push(await shot(P, n, res.slice(-1)));
    }
    rec("GUI-03-01", [...res, "Phân biệt chỉ bằng màu chữ xanh nhạt; không có nền/chữ đậm/vạch chỉ báo"], imgs, "Có thể Passed (mỗi lúc 1 mục được tô) — xem ảnh");
  });

  await run("GUI-03-02", async () => {
    const Q = await newPage();
    await login(Q);
    const h2 = await Q.$eval("div.flex-1 h2", (e) => e.innerText);
    const hl = await Q.$$eval("li", (a) => a.filter((l) => l.className.includes("text-blue-400")).map((l) => l.innerText.trim()));
    const i = await shot(Q, "GUI-03-02", [`Sau đăng nhập: màn "${h2}", mục tô ${JSON.stringify(hl)}`]);
    await Q.context().close();
    rec("GUI-03-02", [`Sau khi đăng nhập hiện màn "${h2}", mục sidebar được tô: ${JSON.stringify(hl)}`], [i], "Có thể Passed");
  });

  await run("GUI-03-03", async () => {
    const it = P.locator('li:text-is("Sản phẩm")');
    await tab(P, "Dashboard");
    const before = await it.evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).color)));
    await it.hover(); await sleep(250);
    const after = await it.evaluate((e) => ({ c: __qa.hex(__qa.rgb(getComputedStyle(e).color)), cur: getComputedStyle(e).cursor }));
    const i = await shot(P, "GUI-03-03", [`Hover "Sản phẩm": con trỏ ${after.cur}, màu ${before} → ${after.c}`]);
    rec("GUI-03-03", [`Rê chuột lên "Sản phẩm": cursor = ${after.cur}; màu chữ ${before} → ${after.c}`, "Ảnh chụp headless không hiện con trỏ chuột"], [i], after.cur === "pointer" && before !== after.c ? "Có thể Passed" : "Cần xem ảnh");
  });

  await run("GUI-04-03", async () => {
    await tab(P, "Sản phẩm");
    const b = P.locator('button:has-text("Import")');
    const st = `nút "${(await b.innerText()).trim()}", disabled=${await b.isDisabled()}`;
    await outline(b);
    const i = await shot(P, "GUI-04-03", [`Chưa chọn file: ${st}`]);
    await clearOutline(P);
    rec("GUI-04-03", [`Chưa chọn file: ${st}`, "Trạng thái \"đang chạy\" xem ở GUI-04-13 / GUI-04-02 (cần mạng chậm mới thấy)"], [i],
      /0 sản phẩm/.test(st) ? "Có thể Failed: nút bị khóa nhưng nhãn ghi \"Import 0 sản phẩm\"" : "Cần xem ảnh");
  });

  await run("GUI-04-14", async () => {
    await tab(P, "Sản phẩm");
    const alts = await mainTable(P).locator("img").evaluateAll((a) => a.map((e) => e.getAttribute("alt")));
    const empty = alts.filter((x) => !x || !x.trim()).length;
    await rowsOf(P).first().scrollIntoViewIfNeeded();
    const i = await shot(P, "GUI-04-14", [`${alts.length} ảnh, alt rỗng: ${empty}`, `Ví dụ: ${alts.slice(0, 3).map((x) => `"${trunc(x, 30)}"`).join(", ")}`]);
    rec("GUI-04-14", [`${alts.length} ảnh trong bảng; ${empty} ảnh có alt rỗng; alt = tên sản phẩm (ví dụ ${alts.slice(0, 3).map((x) => `"${trunc(x, 30)}"`).join(", ")})`], [i], empty ? "Có thể Failed" : "Có thể Passed");
  });

  await run("GUI-04-15", async () => {
    await tab(P, "Mã Giảm Giá");
    const row = rowsOf(P).filter({ hasText: "EXPIRED" });
    const cell = row.locator("td").nth(4);
    const t = await cell.innerText();
    const c = await cell.locator("span").evaluate((e) => __qa.hex(__qa.rgb(getComputedStyle(e).color))).catch(() => "(không có span màu)");
    await outline(row);
    const i = await shot(P, "GUI-04-15", [`Dòng EXPIRED — cột Hết hạn: "${t}", màu ${c}`]);
    await clearOutline(P);
    rec("GUI-04-15", [`Mã EXPIRED: cột "Hết hạn" hiện "${t}" màu ${c}; mã còn hạn hiện ngày (ví dụ 2099-12-31)`], [i], t.includes("Hết hạn") ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-01-19", async () => {
    const res = [];
    await tab(P, "Sản phẩm");
    const m = await P.evaluate(() => {
      const out = [];
      const fgbg = (label, el, fg) => { const f = __qa.rgb(fg || getComputedStyle(el).color); const b = __qa.bg(el); out.push(`${label}: ${__qa.hex(f)} trên ${__qa.hex(b)} = ${__qa.ratio(f, b)}:1`); };
      const act = [...document.querySelectorAll("li")].find((l) => l.className.includes("text-blue-400"));
      fgbg("Mục menu đang chọn", act);
      fgbg("Mục menu thường", [...document.querySelectorAll("li")].find((l) => !l.className.includes("text-blue-400") && !l.className.includes("red")));
      fgbg("Đăng xuất", [...document.querySelectorAll("li")].find((l) => l.innerText.includes("Đăng xuất")));
      const inp = document.querySelector('input[placeholder="Tên sản phẩm"]');
      fgbg("Placeholder ô nhập", inp, getComputedStyle(inp, "::placeholder").color);
      for (const t of ["Lưu sản phẩm", "Sửa", "Xóa", "Import"]) { const b = [...document.querySelectorAll("button")].find((x) => x.innerText.includes(t)); if (b) fgbg(`Nút "${b.innerText.trim()}"`, b); }
      return out;
    });
    res.push(...m);
    await tab(P, "Mã Giảm Giá");
    res.push(...(await P.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => x.innerText.includes("Tạo mã")); const f = __qa.rgb(getComputedStyle(b).color); const g = __qa.bg(b); const code = document.querySelector("tbody td"); const cf = __qa.rgb(getComputedStyle(code).color); const cb = __qa.bg(code); return [`Nút "Tạo mã": ${__qa.hex(f)} trên ${__qa.hex(g)} = ${__qa.ratio(f, g)}:1`, `Mã coupon (chữ cam) trong bảng: ${__qa.hex(cf)} trên ${__qa.hex(cb)} = ${__qa.ratio(cf, cb)}:1`]; })));
    await tab(P, "Dashboard");
    res.push(...(await P.evaluate(() => { const h = document.querySelector("h3"); const f = __qa.rgb(getComputedStyle(h).color); const b = __qa.bg(h); return [`Tiêu đề thẻ Dashboard (xám): ${__qa.hex(f)} trên ${__qa.hex(b)} = ${__qa.ratio(f, b)}:1`]; })));
    await tab(P, "Sản phẩm");
    const i = await shot(P, "GUI-01-19", res);
    const low = res.filter((x) => parseFloat(x.split("= ")[1]) < 4.5);
    rec("GUI-01-19", [...res, "Đo bằng màu tính toán (getComputedStyle), ngưỡng 4.5:1"], [i], low.length ? `Có thể Failed: ${low.length} cặp dưới 4.5:1 (${low.map((x) => x.split(":")[0]).join("; ")})` : "Có thể Passed");
  });

  await run("GUI-01-21", async () => {
    const res = [];
    await L.goto(ADMIN);
    res.push(`Login: title "${await L.title()}"`);
    for (const t of ["Dashboard", "Danh mục", "Sản phẩm", "Mã Giảm Giá"]) { await tab(P, t); res.push(`${t}: title "${await P.title()}"`); }
    const fav = await P.$eval('link[rel="icon"]', (e) => e.href).catch(() => "(không có)");
    res.push(`favicon: ${fav}`);
    const i = await shot(P, "GUI-01-21", [...res, "(ảnh headless không có thanh tab; giá trị đọc từ document.title)"]);
    rec("GUI-01-21", res, [i], new Set(res.slice(0, 5).map((x) => x.split("title")[1])).size === 1 ? "Có thể Failed: tiêu đề tab giữ nguyên \"frontend-admin\" ở mọi màn" : "Cần xem ảnh");
  });

  // ===================== PHASE 2: form =====================
  currentPhase = "2. Form";
  const allDialogs = [];
  const collect = (p) => { const d = takeDialogs(p); allDialogs.push(...d); return d; };

  await run("GUI-02-06", async () => {
    const Q = await newPage(); await Q.goto(ADMIN);
    const ty = await Q.getAttribute('input[placeholder="Email"]', "type");
    await Q.fill('input[placeholder="Email"]', "abc");
    await Q.fill('input[placeholder="Password"]', "Abc12345!");
    const inv = await invalidFields(Q.locator("form"));
    await Q.click("form button"); await Q.waitForLoadState("networkidle"); await sleep(500);
    const d = collect(Q);
    const sent = Q.reqs.some((r) => r.startsWith("POST /api/login"));
    const i = await shot(Q, "GUI-02-06", [`type="${ty ?? "(không có → text)"}"`, `Nhập "abc": trình duyệt chặn = ${inv.length > 0}; request gửi đi = ${sent}`, `Hộp thoại: ${d.join(" / ") || "(không)"}`]);
    await Q.context().close();
    rec("GUI-02-06", [`Ô Email không có thuộc tính type (thành text)`, `Nhập "abc" + mật khẩu rồi bấm Login: trình duyệt không chặn, request /api/login vẫn được gửi`, `Hộp thoại: ${d.join(" / ") || "(không)"}`], [i],
      ty === "email" ? "Cần xem ảnh" : "Có thể Failed: không có type=\"email\", không kiểm định dạng");
  });

  await run("GUI-02-08", async () => {
    const Q = await newPage(); await Q.goto(ADMIN);
    await Q.click("form button"); await Q.waitForLoadState("networkidle"); await sleep(500);
    const d1 = collect(Q); const r1 = Q.reqs.length;
    await Q.fill('input[placeholder="Password"]', "Abc12345!");
    await Q.click("form button"); await Q.waitForLoadState("networkidle"); await sleep(500);
    const d2 = collect(Q); const r2 = Q.reqs.length - r1;
    const i = await shot(Q, "GUI-02-08", [`Trống cả 2 ô: request ${r1}, hộp thoại ${d1.join(" / ") || "(không)"}`, `Trống Email: request ${r2}, hộp thoại ${d2.join(" / ") || "(không)"}`]);
    await Q.context().close();
    rec("GUI-02-08", [`Trống cả 2 ô rồi bấm Login: trình duyệt không chặn, gửi ${r1} request; hộp thoại: ${d1.join(" / ") || "(không)"}`, `Trống Email, có mật khẩu: gửi ${r2} request; hộp thoại: ${d2.join(" / ") || "(không)"}`, "Không có chỉ báo trường nào cần nhập"], [i],
      r1 ? "Có thể Failed: form vẫn gửi khi để trống, chỉ báo chung \"Đăng nhập thất bại\"" : "Cần xem ảnh");
  });

  await run("GUI-02-09", async () => {
    const Q = await newPage();
    await login(Q, "admin@eshop.com", "SaiMatKhau1!"); await sleep(800); const a = collect(Q);
    const i1 = await shot(Q, "GUI-02-09", [`Sai mật khẩu (admin@eshop.com): ${a.join(" / ")}`]);
    await login(Q, "khongtontai@eshop.com", "Abc12345!"); await sleep(800); const b = collect(Q);
    const i2 = await shot(Q, "GUI-02-09-2", [`Email không tồn tại: ${b.join(" / ")}`]);
    await Q.context().close();
    rec("GUI-02-09", [`Sai mật khẩu: ${a.join(" / ") || "(không)"}`, `Email không tồn tại: ${b.join(" / ") || "(không)"}`, "Thông báo dạng alert(), ảnh không chụp được hộp thoại gốc (nội dung ghi trong khung ghi chú)"], [i1, i2],
      a.join() === b.join() ? "Có thể Passed (cùng một thông báo)" : "Có thể Failed: hai trường hợp khác thông báo");
  });

  await tab(P, "Danh mục");
  await run("GUI-02-10", async () => {
    await tab(P, "Danh mục");
    const n0 = await rowsOf(P).count();
    await catInput(P).fill(""); await P.click('button:has-text("Thêm mới")'); await P.waitForLoadState("networkidle"); await sleep(500);
    const d1 = collect(P); const n1 = await rowsOf(P).count();
    await addCategory(P, "   ");
    const d2 = collect(P); const n2 = await rowsOf(P).count();
    await rowsOf(P).last().scrollIntoViewIfNeeded();
    await outline(rowsOf(P).last());
    const i = await shot(P, "GUI-02-10", [`Ô trống: số dòng ${n0} → ${n1}; hộp thoại ${d1.join(" / ") || "(không)"}`, `"   ": số dòng ${n1} → ${n2}; hộp thoại ${d2.join(" / ") || "(không)"}`]);
    await clearOutline(P);
    rec("GUI-02-10", [`Ô trống + Thêm mới: số dòng ${n0} → ${n1}; hộp thoại: ${d1.join(" / ") || "(không)"}`, `Nhập "   " + Thêm mới: số dòng ${n1} → ${n2}; hộp thoại: ${d2.join(" / ") || "(không)"}`], [i],
      n1 > n0 || n2 > n1 ? "Có thể Failed: danh mục rỗng/khoảng trắng vẫn được thêm" : d1.length || d2.length ? "Cần xem nội dung thông báo" : "Cần xem ảnh");
  });

  await tab(P, "Sản phẩm");
  await run("GUI-02-11", async () => {
    await tab(P, "Sản phẩm");
    const n0 = await rowsOf(P).count();
    await fillProduct(P, { name: "", price: "120000" });
    const inv1 = await submitProduct(P); const d1 = collect(P); const n1 = await rowsOf(P).count();
    await prodForm(P).scrollIntoViewIfNeeded();
    const i1 = await shot(P, "GUI-02-11", [`Trống Tên: trình duyệt chặn = ${inv1.join("; ") || "không"}; số dòng ${n0} → ${n1}`]);
    await fillProduct(P, { name: "QA thiếu giá", price: "" });
    const inv2 = await submitProduct(P); const d2 = collect(P); const n2 = await rowsOf(P).count();
    const added = await rowsOf(P).filter({ hasText: "QA thiếu giá" }).count();
    const priceShown = added ? await rowsOf(P).filter({ hasText: "QA thiếu giá" }).first().locator("td").nth(2).innerText() : "";
    if (added) await rowsOf(P).filter({ hasText: "QA thiếu giá" }).first().scrollIntoViewIfNeeded();
    const i2 = await shot(P, "GUI-02-11-2", [`Trống Giá: trình duyệt chặn = ${inv2.join("; ") || "không"}; hộp thoại ${d2.join(" / ") || "(không)"}; số dòng ${n1} → ${n2}${added ? `; đã thêm "QA thiếu giá" giá "${priceShown}"` : ""}`]);
    rec("GUI-02-11", [`Trống Tên: trình duyệt chặn (${inv1.join("; ") || "không"}); hộp thoại ${d1.join(" / ") || "(không)"}; số dòng ${n0} → ${n1}`, `Trống Giá: trình duyệt chặn = ${inv2.length ? inv2.join("; ") : "không"}; hộp thoại ${d2.join(" / ") || "(không)"}; số dòng ${n1} → ${n2}${added ? `; sản phẩm được tạo với Giá hiển thị "${priceShown}"` : ""}`], [i1, i2],
      added ? "Có thể Failed: Tên được kiểm (required) nhưng Giá trống vẫn lưu được" : "Cần xem ảnh");
  });

  await run("GUI-02-12", async () => {
    await tab(P, "Sản phẩm");
    const n255 = "QA" + "A".repeat(253), n256 = "QB" + "B".repeat(254);
    const ml = await prodForm(P).locator('input[placeholder="Tên sản phẩm"]').getAttribute("maxlength");
    await fillProduct(P, { name: n255, price: "100000" }); await submitProduct(P); const d1 = collect(P);
    await fillProduct(P, { name: n256, price: "100000" });
    const typed = (await prodForm(P).locator('input[placeholder="Tên sản phẩm"]').inputValue()).length;
    await submitProduct(P); const d2 = collect(P);
    const a = await rowsOf(P).filter({ hasText: n255 }).count(), b = await rowsOf(P).filter({ hasText: n256 }).count();
    if (b) await rowsOf(P).filter({ hasText: n256 }).first().scrollIntoViewIfNeeded();
    const i = await shot(P, "GUI-02-12", [`maxlength = ${ml ?? "(không có)"}; gõ 256 ký tự → ô giữ ${typed} ký tự`, `255 ký tự: ${a ? "đã lưu" : "không lưu"}; 256 ký tự: ${b ? "ĐÃ LƯU" : "không lưu"}`, `Hộp thoại: ${[...d1, ...d2].join(" / ") || "(không)"}`]);
    rec("GUI-02-12", [`Ô Tên không có maxlength (${ml ?? "null"}); gõ 256 ký tự thì ô giữ đủ ${typed} ký tự`, `Tên 255 ký tự: ${a ? "lưu thành công" : "không lưu"}; tên 256 ký tự: ${b ? "lưu thành công" : "bị từ chối"}`, `Hộp thoại: ${[...d1, ...d2].join(" / ") || "(không)"}`], [i],
      b ? "Có thể Failed: tên 256 ký tự vẫn lưu được" : "Cần xem ảnh");
  });

  await run("GUI-02-13", async () => {
    await tab(P, "Sản phẩm");
    const res = [];
    for (const [nm, pr] of [["QA giá 0", "0"], ["QA giá âm", "-1000"], ["QA giá lẻ", "1000.5"], ["QA giá 1", "1"]]) {
      await fillProduct(P, { name: nm, price: pr });
      const inv = await submitProduct(P); const d = collect(P);
      const row = rowsOf(P).filter({ hasText: nm });
      const ok = await row.count();
      res.push(`Giá ${pr}: ${inv.length ? `trình duyệt chặn (${inv.join("; ")})` : "không bị chặn"}; ${ok ? `ĐÃ LƯU, hiển thị "${await row.first().locator("td").nth(2).innerText()}"` : "không lưu"}; hộp thoại ${d.join(" / ") || "(không)"}`);
    }
    await rowsOf(P).filter({ hasText: "QA giá" }).first().scrollIntoViewIfNeeded().catch(() => {});
    await outline(rowsOf(P).filter({ hasText: "QA giá" }));
    const i = await shot(P, "GUI-02-13", res);
    await clearOutline(P);
    rec("GUI-02-13", res, [i], res.slice(0, 3).some((x) => x.includes("ĐÃ LƯU")) ? "Có thể Failed: giá 0 / âm / lẻ vẫn lưu được" : "Cần xem ảnh");
  });

  await run("GUI-02-14", async () => {
    await P.reload(); await P.waitForLoadState("networkidle"); await tab(P, "Sản phẩm");
    const sel = prodForm(P).locator("select");
    const opts = await sel.locator("option").allInnerTexts();
    const cur = await sel.evaluate((s) => s.options[s.selectedIndex]?.text);
    await outline(sel); await sel.scrollIntoViewIfNeeded();
    const i = await shot(P, "GUI-02-14", [`Lựa chọn đang chọn sẵn: "${cur}"`, `Các lựa chọn: ${opts.join(" | ")}`]);
    await clearOutline(P);
    rec("GUI-02-14", [`Form thêm mới chọn sẵn "${cur}"; danh sách: ${opts.join(" | ")}`, "Không có lựa chọn gợi ý kiểu \"-- Chọn danh mục --\" nên không thể gửi form khi chưa chọn"], [i],
      /chọn/i.test(opts[0] || "") ? "Cần xem ảnh" : "Có thể Failed: không có lựa chọn gợi ý, mặc định chọn sẵn danh mục đầu");
  });

  await run("GUI-02-15", async () => {
    await P.reload(); await P.waitForLoadState("networkidle"); await tab(P, "Sản phẩm");
    const last = rowsOf(P).last();
    await last.scrollIntoViewIfNeeded();
    const sc = () => P.$eval("div.flex-1.overflow-auto", (e) => e.scrollTop);
    const s0 = await sc();
    const rowName = await last.locator("td").nth(1).innerText();
    await last.locator('button:has-text("Sửa")').click(); await sleep(500);
    const s1 = await sc();
    const h3 = await P.$eval("form h3", (e) => e.innerText);
    const val = await prodForm(P).locator('input[placeholder="Tên sản phẩm"]').inputValue();
    const formBox = await prodForm(P).boundingBox();
    const inView = formBox && formBox.y + formBox.height > 0 && formBox.y < 768;
    const cancel = await P.locator('button:has-text("Hủy sửa")').count();
    const i1 = await shot(P, "GUI-02-15", [`Bấm Sửa ở dòng cuối "${trunc(rowName, 40)}": scrollTop ${s0} → ${s1}; form trong khung nhìn: ${inView}`]);
    await prodForm(P).scrollIntoViewIfNeeded();
    const i2 = await shot(P, "GUI-02-15-2", [`Tiêu đề form: "${h3}"; ô Tên = "${trunc(val, 40)}"; nút Hủy sửa: ${cancel ? "có" : "không"}`]);
    rec("GUI-02-15", [`Bấm Sửa ở dòng cuối: vùng nội dung ${s0 === s1 ? "không cuộn" : "có cuộn"} (scrollTop ${s0} → ${s1}); form ${inView ? "nằm trong" : "nằm ngoài"} khung nhìn (ảnh 1)`, `Cuộn lên tay: tiêu đề "${h3}", ô Tên = tên dòng đã chọn (${val === rowName}), nút "Hủy sửa": ${cancel ? "có" : "không"} (ảnh 2)`], [i1, i2],
      !inView ? "Có thể Failed: không tự cuộn lên form (các phần khác đạt)" : "Cần xem ảnh");
  });

  await run("GUI-02-16", async () => {
    const before = await rowsOf(P).allInnerTexts();
    await fillProduct(P, { name: "QA tạm sửa", price: "777" });
    await P.click('button:has-text("Hủy sửa")'); await sleep(300);
    const h3 = await P.$eval("form h3", (e) => e.innerText);
    const vals = await prodForm(P).evaluate((f) => [...f.querySelectorAll("input,textarea")].map((e) => e.value));
    const after = await rowsOf(P).allInnerTexts();
    const i = await shot(P, "GUI-02-16", [`Sau Hủy sửa: tiêu đề "${h3}"; giá trị các ô ${JSON.stringify(vals)}; bảng không đổi = ${JSON.stringify(before) === JSON.stringify(after)}`]);
    rec("GUI-02-16", [`Sau khi sửa vài ô rồi bấm Hủy sửa: tiêu đề form "${h3}"; các ô ${JSON.stringify(vals)}; bảng ${JSON.stringify(before) === JSON.stringify(after) ? "không thay đổi" : "CÓ thay đổi"}`], [i], "Có thể Passed — xem ảnh");
  });

  await run("GUI-04-04", async () => {
    await P.reload(); await P.waitForLoadState("networkidle");
    await tab(P, "Danh mục");
    const r0 = P.reqs.length;
    await addCategory(P, "QA Danh mục mới"); collect(P);
    const catShown = await rowsOf(P).filter({ hasText: "QA Danh mục mới" }).count();
    await tab(P, "Sản phẩm");
    await fillProduct(P, { name: "QA Thêm SP", price: "150000" }); await submitProduct(P); collect(P);
    const prodRow = rowsOf(P).filter({ hasText: "QA Thêm SP" });
    const prodShown = await prodRow.count();
    const prodText = prodShown ? (await prodRow.first().innerText()).replace(/\s+/g, " ") : "";
    await tab(P, "Mã Giảm Giá");
    const c = await createCoupon(P, { code: "QAMOI", type: "fixed", value: "20000", min: "100000", date: "2099-06-30", max: "2" });
    const coupText = c.shown ? (await rowsOf(P).filter({ hasText: "QAMOI" }).first().innerText()).replace(/\s+/g, " ") : "";
    const reloads = P.reqs.slice(r0).filter((r) => r.startsWith("GET")).length;
    // sửa sản phẩm
    await tab(P, "Sản phẩm");
    const namesBefore = await rowsOf(P).locator("td:nth-child(2)").allInnerTexts();
    await rowsOf(P).filter({ hasText: "QA Thêm SP" }).first().locator('button:has-text("Sửa")').click();
    await fillProduct(P, { name: "QA Đã sửa SP" }); await submitProduct(P); const de = collect(P);
    const namesAfter = await rowsOf(P).locator("td:nth-child(2)").allInnerTexts();
    const changed = namesAfter.filter((n, k) => n !== namesBefore[k]).length;
    await rowsOf(P).first().scrollIntoViewIfNeeded();
    const i1 = await shot(P, "GUI-04-04", [`Sau khi sửa 1 sản phẩm: ${changed}/${namesAfter.length} dòng đổi tên; ${namesAfter.filter((n) => n === "QA Đã sửa SP").length} dòng mang tên "QA Đã sửa SP"`, `Hộp thoại: ${de.join(" / ")}`]);
    await P.reload(); await P.waitForLoadState("networkidle"); await tab(P, "Sản phẩm");
    const namesReload = await rowsOf(P).locator("td:nth-child(2)").allInnerTexts();
    await rowsOf(P).filter({ hasText: "QA Đã sửa SP" }).first().scrollIntoViewIfNeeded();
    const i2 = await shot(P, "GUI-04-04-2", [`Sau F5: ${namesReload.filter((n) => n === "QA Đã sửa SP").length} dòng mang tên "QA Đã sửa SP"`]);
    rec("GUI-04-04", [
      `Thêm danh mục: dòng mới ${catShown ? "xuất hiện ngay" : "KHÔNG xuất hiện"} (không tải lại trang)`,
      `Thêm sản phẩm: ${prodShown ? `xuất hiện ngay: "${trunc(prodText, 70)}"` : "KHÔNG xuất hiện"}`,
      `Tạo mã QAMOI: ${c.shown ? `xuất hiện ngay: "${coupText}"` : "KHÔNG xuất hiện"}`,
      `Sửa "QA Thêm SP" → "QA Đã sửa SP": hộp thoại ${de.join(" / ")}; ngay sau khi lưu ${changed}/${namesAfter.length} dòng trong bảng đổi tên thành "QA Đã sửa SP" (ảnh 1)`,
      `Sau F5 chỉ còn ${namesReload.filter((n) => n === "QA Đã sửa SP").length} dòng mang tên mới (ảnh 2) → dữ liệu thật chỉ đổi 1 sản phẩm, bảng hiển thị sai`,
    ], [i1, i2], changed > 1 ? "Có thể Failed: sau khi sửa, mọi dòng trong bảng hiển thị cùng tên mới" : "Cần xem ảnh");
    void reloads;
  });

  // Import CSV
  await run("GUI-02-17", async () => {
    await tab(P, "Sản phẩm");
    const acc = await P.getAttribute("input[type=file]", "accept");
    await P.setInputFiles("input[type=file]", path.join(CSV, "06-wrong-extension.txt")); await sleep(500);
    const d = collect(P);
    const b = P.locator('button:has-text("Import")');
    const st = `nút "${(await b.innerText()).trim()}", disabled=${await b.isDisabled()}`;
    const prev = await P.locator("text=Xem trước").count();
    await P.locator("h3:has-text('Import')").scrollIntoViewIfNeeded();
    const i = await shot(P, "GUI-02-17", [`accept = ${acc ?? "(không có)"}`, `Chọn 06-wrong-extension.txt: ${st}; bảng xem trước ${prev ? "hiện" : "không hiện"}; hộp thoại ${d.join(" / ") || "(không)"}`]);
    rec("GUI-02-17", [`Ô chọn file không có thuộc tính accept (${acc ?? "null"}) nên hộp chọn file không lọc .csv`, `Chọn 06-wrong-extension.txt: không có thông báo lỗi; ${st}; bảng xem trước ${prev ? "hiện nội dung file" : "không hiện"} (chưa bấm Import)`], [i],
      !acc && !(await b.isDisabled()) ? "Có thể Failed: nhận file .txt, nút Import vẫn bật" : "Cần xem ảnh");
  });

  await run("GUI-02-18", async () => {
    await P.reload(); await P.waitForLoadState("networkidle"); await tab(P, "Sản phẩm");
    fs.writeFileSync(path.join(TMP, "empty-0byte.csv"), "");
    fs.writeFileSync(path.join(TMP, "header-only.csv"), "name,price,description,imageUrl,category_id\n");
    const res = []; const imgs = [];
    const b = P.locator('button:has-text("Import")');
    for (const [f, n] of [[path.join(TMP, "empty-0byte.csv"), "GUI-02-18"], [path.join(TMP, "header-only.csv"), "GUI-02-18-2"]]) {
      await P.setInputFiles("input[type=file]", f); await sleep(500);
      const d = collect(P);
      res.push(`${path.basename(f)}: không có thông báo; nút "${(await b.innerText()).trim()}" disabled=${await b.isDisabled()}; hộp thoại ${d.join(" / ") || "(không)"}`);
      await P.locator("h3:has-text('Import')").scrollIntoViewIfNeeded();
      imgs.push(await shot(P, n, [res.at(-1)]));
    }
    const n0 = await rowsOf(P).count();
    await P.setInputFiles("input[type=file]", path.join(CSV, "05-wrong-header.csv")); await sleep(500);
    const prevHdr = await P.locator("table").first().locator("th").allInnerTexts();
    await b.click(); await P.waitForLoadState("networkidle"); await sleep(800);
    const rep = await P.locator("div.mt-2.p-3").innerText().catch(() => "(không có khung kết quả)");
    const n1 = await rowsOf(P).count();
    const added = await rowsOf(P).filter({ hasText: "Sản phẩm sai header" }).count();
    await P.locator("h3:has-text('Import')").scrollIntoViewIfNeeded();
    imgs.push(await shot(P, "GUI-02-18-3", [`05-wrong-header.csv: header xem trước ${JSON.stringify(prevHdr)}`, `Bấm Import → "${rep.replace(/\n/g, " ")}"; số sản phẩm ${n0} → ${n1}`]));
    res.push(`05-wrong-header.csv (header ten,gia,mo_ta): xem trước hiện header sai không cảnh báo; bấm Import → "${rep.replace(/\n/g, " ")}"; số sản phẩm ${n0} → ${n1}${added ? ' — sản phẩm "Sản phẩm sai header" ĐƯỢC THÊM' : ""}`);
    rec("GUI-02-18", res, imgs, added ? "Có thể Failed: file rỗng chỉ khóa nút (không báo), file sai header vẫn được import" : "Cần xem ảnh");
  });

  await run("GUI-04-12", async () => {
    await tab(P, "Sản phẩm");
    await P.setInputFiles("input[type=file]", path.join(CSV, "01-valid-3-rows.csv")); await sleep(500);
    const pv = P.locator("table").first();
    const hdr = await pv.locator("th").allInnerTexts();
    const rows = await pv.locator("tbody tr").evaluateAll((a) => a.map((r) => [...r.querySelectorAll("td")].map((t) => t.innerText)));
    const cap = await P.locator("text=Xem trước").innerText();
    await P.locator("h3:has-text('Import')").scrollIntoViewIfNeeded();
    const i1 = await shot(P, "GUI-04-12", [`"${cap}"; header ${hdr.length} cột`, `Dòng 3: ${JSON.stringify(rows[2])}`]);
    const n0 = await rowsOf(P).count();
    await P.click('button:has-text("Import")'); await P.waitForLoadState("networkidle"); await sleep(800);
    const rep = await P.locator("div.mt-2.p-3").innerText().catch(() => "");
    const n1 = await rowsOf(P).count();
    const op = await rowsOf(P).filter({ hasText: "Ốp lưng" }).allInnerTexts();
    const i2 = await shot(P, "GUI-04-12-2", [`Sau Import: "${rep.replace(/\n/g, " ")}"; số SP ${n0} → ${n1}`, `Dòng "Ốp lưng" trong bảng: ${JSON.stringify(op.map((x) => x.replace(/\s+/g, " ")))}`]);
    rec("GUI-04-12", [`Xem trước: "${cap}", header ${hdr.length} cột (${hdr.join(", ")})`, `Dòng 3 hiển thị: ${JSON.stringify(rows[2])} → trường có dấu phẩy bị tách: name = "${rows[2]?.[0]}", price = "${rows[2]?.[1]}"`, `Bấm Import (thêm quan sát): "${rep.replace(/\n/g, " ")}"; dòng "Ốp lưng" trong bảng: ${JSON.stringify(op.map((x) => x.replace(/\s+/g, " ")))}`], [i1, i2],
      rows[2]?.[0]?.startsWith('"') ? "Có thể Failed: xem trước tách sai trường có dấu phẩy trong nháy kép" : "Cần xem ảnh");
  });

  await run("GUI-04-13", async () => {
    await tab(P, "Sản phẩm");
    const n0 = await rowsOf(P).count();
    await P.setInputFiles("input[type=file]", path.join(CSV, "02-invalid-negative-price.csv")); await sleep(500);
    await P.click('button:has-text("Import")'); await P.waitForLoadState("networkidle"); await sleep(800);
    const rep = await P.locator("div.mt-2.p-3").innerText().catch(() => "");
    const n1 = await rowsOf(P).count();
    const neg = await rowsOf(P).filter({ hasText: "Cáp lỗi giá âm" }).allInnerTexts();
    await P.locator("h3:has-text('Import')").scrollIntoViewIfNeeded();
    const i1 = await shot(P, "GUI-04-13", [`Báo cáo: "${rep.replace(/\n/g, " ")}"`, `Số sản phẩm ${n0} → ${n1}`]);
    if (neg.length) await rowsOf(P).filter({ hasText: "Cáp lỗi giá âm" }).first().scrollIntoViewIfNeeded();
    const i2 = await shot(P, "GUI-04-13-2", [`Dòng "Cáp lỗi giá âm": ${JSON.stringify(neg.map((x) => x.replace(/\s+/g, " ")))}`]);
    rec("GUI-04-13", [`Import 02-invalid-negative-price.csv: báo cáo "${rep.replace(/\n/g, " ")}"`, `Số sản phẩm ${n0} → ${n1}; dòng giá âm ${neg.length ? `ĐƯỢC THÊM: ${JSON.stringify(neg.map((x) => x.replace(/\s+/g, " ")))}` : "không có"}`, "Báo cáo không có số dòng lỗi và lý do theo từng dòng"], [i1, i2],
      n1 > n0 ? "Có thể Failed: không rollback, dòng giá âm được thêm, báo cáo thiếu lỗi theo dòng" : "Cần xem ảnh");
  });

  // Coupon
  await tab(P, "Mã Giảm Giá");
  await run("GUI-02-19", async () => {
    await tab(P, "Mã Giảm Giá");
    const res = [];
    for (const code of ["SAVE20", "SAVE 20", "GIẢM10", "SAVE-20"]) {
      const f = coupForm(P);
      await f.locator("input").first().fill(code);
      const shownInInput = await f.locator("input").first().inputValue();
      const r = await createCoupon(P, { code });
      res.push(describeAttempt(`"${code}" (ô hiển thị "${shownInInput}")`, r));
    }
    await outline(rowsOf(P).filter({ hasText: /SAVE ?-?20|GIẢM10/ }));
    const i = await shot(P, "GUI-02-19", res);
    await clearOutline(P);
    rec("GUI-02-19", [...res, "Ô Mã tự chuyển chữ hoa khi gõ"], [i], res.slice(1).some((x) => x.includes("XUẤT HIỆN")) ? "Có thể Failed: mã có khoảng trắng / dấu / gạch ngang vẫn tạo được" : "Cần xem ảnh");
  });

  await run("GUI-02-20", async () => {
    await tab(P, "Mã Giảm Giá");
    const res = [];
    for (const [code, type, v] of [["QAVAL0", "fixed", "0"], ["QAVALAM", "fixed", "-5"], ["QAPCT101", "percent", "101"], ["QAPCT100", "percent", "100"]]) {
      res.push(describeAttempt(`${code} (${type}, giá trị ${v})`, await createCoupon(P, { code, type, value: v })));
    }
    await outline(rowsOf(P).filter({ hasText: /QAVAL|QAPCT/ }));
    const i = await shot(P, "GUI-02-20", res);
    await clearOutline(P);
    rec("GUI-02-20", res, [i], res.slice(0, 3).some((x) => x.includes("XUẤT HIỆN")) ? "Có thể Failed: giá trị 0 / âm / >100% vẫn tạo được" : "Cần xem ảnh");
  });

  await run("GUI-02-21", async () => {
    await tab(P, "Mã Giảm Giá");
    const res = [];
    for (const [code, opt, label] of [["QAMINAM", { min: "-1" }, "Đơn tối thiểu -1"], ["QAMIN0", { min: "0" }, "Đơn tối thiểu 0"], ["QAMAX0", { max: "0" }, "Số lần 0"], ["QAMAX15", { max: "1.5" }, "Số lần 1.5"], ["QAMAX1", { max: "1" }, "Số lần 1"]]) {
      res.push(describeAttempt(`${code} (${label})`, await createCoupon(P, { code, ...opt })));
    }
    await outline(rowsOf(P).filter({ hasText: /QAMIN|QAMAX/ }));
    const i = await shot(P, "GUI-02-21", res);
    await clearOutline(P);
    rec("GUI-02-21", res, [i], res[0].includes("XUẤT HIỆN") ? "Có thể Failed: đơn tối thiểu âm vẫn tạo được (Số lần có min=1 nên trình duyệt chặn)" : "Cần xem ảnh");
  });

  await run("GUI-02-22", async () => {
    await tab(P, "Mã Giảm Giá");
    const res = [];
    for (const [code, date, label] of [["QADATETRONG", "", "ngày trống"], ["QAHOMQUA", dayOffset(-1), `hôm qua ${dayOffset(-1)}`], ["QAHOMNAY", dayOffset(0), `hôm nay ${dayOffset(0)}`], ["QANGAYMAI", dayOffset(1), `ngày mai ${dayOffset(1)}`]]) {
      res.push(describeAttempt(`${code} (${label})`, await createCoupon(P, { code, date })));
    }
    await outline(rowsOf(P).filter({ hasText: /QAHOM|QANGAY|QADATE/ }));
    const i = await shot(P, "GUI-02-22", res);
    await clearOutline(P);
    rec("GUI-02-22", res, [i], res[1].includes("XUẤT HIỆN") ? "Có thể Failed: ngày đã qua vẫn tạo được (ngày trống bị chặn bởi required)" : "Cần xem ảnh");
  });

  await run("GUI-02-23", async () => {
    await tab(P, "Danh mục");
    await addCategory(P, "<b>Test</b>"); collect(P);
    const cRow = rowsOf(P).filter({ hasText: "<b>Test</b>" });
    const cHtml = (await cRow.count()) ? await cRow.first().locator("td").nth(1).innerHTML() : "(không có dòng)";
    await cRow.first().scrollIntoViewIfNeeded().catch(() => {});
    const i1 = await shot(P, "GUI-02-23", [`Danh mục "<b>Test</b>": innerHTML ô = ${cHtml}`]);
    await tab(P, "Sản phẩm");
    await fillProduct(P, { name: "<img src=x onerror=alert(1)>", price: "1000" }); await submitProduct(P); await sleep(800);
    const d1 = collect(P);
    await P.setInputFiles("input[type=file]", path.join(CSV, "08-html-escape.csv")); await sleep(400);
    await P.click('button:has-text("Import")'); await P.waitForLoadState("networkidle"); await sleep(1000);
    const d2 = collect(P);
    const pRows = await rowsOf(P).filter({ hasText: /<img src=x|<b>Sản phẩm HTML/ }).evaluateAll((a) => a.map((r) => r.querySelectorAll("td")[1].innerHTML));
    const bolds = await mainTable(P).locator("td b, td img[src='x']").count();
    await rowsOf(P).filter({ hasText: /<img src=x|<b>Sản phẩm HTML/ }).first().scrollIntoViewIfNeeded().catch(() => {});
    const i2 = await shot(P, "GUI-02-23-2", [`Ô tên sản phẩm (innerHTML): ${pRows.join(" | ")}`, `Phần tử <b>/<img src=x> sinh ra trong bảng: ${bolds}; hộp thoại: ${[...d1, ...d2].join(" / ") || "(không)"}`]);
    rec("GUI-02-23", [`Danh mục "<b>Test</b>": hiển thị nguyên văn, innerHTML ô = ${cHtml}`, `Sản phẩm "<img src=x onerror=alert(1)>" và import 08-html-escape.csv: ô tên hiển thị nguyên văn (${pRows.join(" | ")}); không có phần tử HTML sinh ra (${bolds}); hộp thoại: ${[...d1, ...d2].join(" / ") || "(không)"}`], [i1, i2],
      bolds === 0 && ![...d1, ...d2].some((x) => x.includes('"1"')) ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-02-24", async () => {
    await tab(P, "Sản phẩm");
    const inp = prodForm(P).locator('input[placeholder="Giá tiền"]');
    await inp.click(); await inp.fill("100000");
    const bb = await inp.boundingBox(); await P.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await P.mouse.wheel(0, -100); await sleep(200); await P.mouse.wheel(0, -100); await sleep(300);
    const v1 = await inp.inputValue();
    const i1 = await shot(P, "GUI-02-24", [`Ô Giá: nhập 100000, cuộn chuột 2 nấc khi đang focus → "${v1}"`]);
    await fillProduct(P, { price: "" });
    await tab(P, "Mã Giảm Giá");
    const vin = coupForm(P).locator("input[type=number]").first();
    await vin.click(); await vin.fill("50");
    const b2 = await vin.boundingBox(); await P.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2);
    await P.mouse.wheel(0, 100); await sleep(200); await P.mouse.wheel(0, 100); await sleep(300);
    const v2 = await vin.inputValue();
    const i2 = await shot(P, "GUI-02-24-2", [`Ô Giá trị giảm: nhập 50, cuộn chuột 2 nấc → "${v2}"`]);
    await vin.fill("");
    rec("GUI-02-24", [`Ô Giá (type=number): 100000 → sau 2 nấc cuộn lên = "${v1}"`, `Ô Giá trị giảm: 50 → sau 2 nấc cuộn xuống = "${v2}"`, "Chạy headless; nên thử lại bằng chuột thật trên Chrome/Firefox/Safari"], [i1, i2],
      v1 !== "100000" || v2 !== "50" ? "Có thể Failed: cuộn chuột làm đổi giá trị" : "Có thể Passed (cần xác nhận bằng chuột thật)");
  });

  await run("GUI-02-03", async () => {
    const res = [];
    await tab(P, "Danh mục");
    await catInput(P).fill(""); await P.click('button:has-text("Thêm mới")'); await sleep(700);
    res.push(`Danh mục trống: ${collect(P).join(" / ") || "(không có thông báo)"}`);
    await tab(P, "Sản phẩm");
    await fillProduct(P, { name: "QA lỗi giá 0", price: "0", desc: "Mô tả giữ lại" }); await submitProduct(P);
    res.push(`Sản phẩm giá 0: ${collect(P).join(" / ") || "(không có thông báo)"}`);
    await tab(P, "Mã Giảm Giá");
    const r = await createCoupon(P, { code: "SAVE10" });
    res.push(`Mã trùng SAVE10: ${r.dlg.join(" / ") || "(không có thông báo)"}`);
    allDialogs.push(...r.dlg);
    const r2 = await createCoupon(P, { code: "QAPCT150", value: "150" });
    res.push(`Mã % = 150: ${r2.dlg.join(" / ") || "(không có thông báo)"}${r2.shown ? " (mã được tạo)" : ""}`);
    const i = await shot(P, "GUI-02-03", res);
    rec("GUI-02-03", res, [i], "Có thể Failed: hầu hết lỗi không có thông báo; thông báo có được thì không nêu trường/lý do dễ hiểu");
  });

  await run("GUI-02-04", async () => {
    await tab(P, "Mã Giảm Giá");
    const r = await createCoupon(P, { code: "SAVE10" });
    allDialogs.push(...r.dlg);
    const inline = await coupForm(P).evaluate((f) => [...f.querySelectorAll("p,span,div")].filter((e) => /lỗi|error/i.test(e.innerText)).length);
    const i = await shot(P, "GUI-02-04", [`Tạo mã trùng SAVE10: thông báo qua ${r.dlg.length ? r.dlg.join(" / ") : "(không có)"}`, `Phần tử báo lỗi trong form: ${inline}`]);
    rec("GUI-02-04", [`Lỗi hiển thị bằng hộp thoại alert() của trình duyệt (${r.dlg.join(" / ") || "không có"}), không có phần tử báo lỗi trong form (${inline}); áp dụng tương tự Login, Danh mục, Sản phẩm`], [i], "Có thể Passed (ghi Notes \"dùng alert\") nếu chấp nhận theo GĐ 4");
  });

  await run("GUI-02-05", async () => {
    await tab(P, "Mã Giảm Giá");
    const f = coupForm(P);
    await f.locator("input").first().fill("SAVE10");
    await f.locator("select").selectOption("fixed");
    await f.locator("input[type=number]").nth(0).fill("30000");
    await f.locator("input[type=number]").nth(1).fill("200000");
    await f.locator("input[type=date]").fill("2099-01-15");
    await f.locator("input[type=number]").nth(2).fill("3");
    await f.locator('button:has-text("Tạo mã")').click(); await P.waitForLoadState("networkidle"); await sleep(600);
    const d = collect(P);
    const vals = await f.evaluate((x) => [...x.querySelectorAll("input,select")].map((e) => e.value));
    const i1 = await shot(P, "GUI-02-05", [`Mã giảm giá sau lỗi (${d.join(" / ") || "không thông báo"}): ${JSON.stringify(vals)}`]);
    await tab(P, "Sản phẩm");
    await fillProduct(P, { name: "QA giữ dữ liệu", price: "", desc: "Mô tả giữ lại", img: "https://placehold.co/80" });
    await submitProduct(P); const d2 = collect(P);
    const pv = await prodForm(P).evaluate((x) => [...x.querySelectorAll("input,textarea")].map((e) => e.value));
    const i2 = await shot(P, "GUI-02-05-2", [`Sản phẩm thiếu giá: hộp thoại ${d2.join(" / ") || "(không)"}; các ô sau khi gửi: ${JSON.stringify(pv)}`]);
    rec("GUI-02-05", [`Mã giảm giá trùng (lỗi từ server): sau thông báo các ô vẫn giữ ${JSON.stringify(vals)}`, `Sản phẩm thiếu giá: ${d2.length ? "báo lỗi" : "không báo lỗi, form bị xóa trắng vì được lưu thành công"} → các ô ${JSON.stringify(pv)}`], [i1, i2], "Có thể Passed khi có lỗi (dữ liệu được giữ) — xem ảnh");
    await fillProduct(P, { name: "", desc: "", img: "" });
  });

  await run("GUI-04-05", async () => {
    await tab(P, "Danh mục"); await addCategory(P, "QA Xóa DM"); collect(P);
    await tab(P, "Sản phẩm"); await fillProduct(P, { name: "QA Xóa SP", price: "5000" }); await submitProduct(P); collect(P);
    await tab(P, "Mã Giảm Giá"); await createCoupon(P, { code: "QAXOA" });
    P.dialogMode = "dismiss";
    const res = []; const dlgs = [];
    for (const [t, key] of [["Danh mục", "QA Xóa DM"], ["Sản phẩm", "QA Xóa SP"], ["Mã Giảm Giá", "QAXOA"]]) {
      await tab(P, t);
      const n0 = await rowsOf(P).count();
      await rowsOf(P).filter({ hasText: key }).first().locator('button:has-text("Xóa")').click();
      await P.waitForLoadState("networkidle"); await sleep(600);
      const d = collect(P); dlgs.push(`${t}: ${d.join(" / ") || "(không có hộp thoại)"}`);
      const still = await rowsOf(P).filter({ hasText: key }).count();
      res.push(`${t}: bấm Xóa "${key}" → ${d.length ? `hộp thoại ${d.join(" / ")} (đã chọn Hủy)` : "KHÔNG có hộp thoại xác nhận"}; dòng ${still ? "vẫn còn" : "biến mất ngay"} (số dòng ${n0} → ${await rowsOf(P).count()})`);
    }
    P.dialogMode = "accept";
    const i = await shot(P, "GUI-04-05", res);
    results.__dlg0405 = dlgs;
    rec("GUI-04-05", res, [i], "Có thể Passed (dòng biến mất ngay, không cần tải lại)");
  });

  await run("GUI-04-06", async () => {
    const dl = results.__dlg0405 || [];
    const none = dl.every((x) => x.includes("không có hộp thoại"));
    rec("GUI-04-06", [`Cùng thao tác ở GUI-04-05 (Playwright được đặt chọn "Hủy" nếu có confirm): ${dl.join("; ")}`, none ? "Bấm Xóa là xóa ngay ở cả 3 bảng, không có bước xác nhận" : ""].filter(Boolean), [results["GUI-04-05"]?.imgs?.[0]].filter(Boolean),
      none ? "Có thể Failed: không có hộp thoại xác nhận khi xóa" : "Cần xem ảnh");
    delete results.__dlg0405;
  });

  await run("GUI-04-07", async () => {
    await tab(P, "Danh mục"); await addCategory(P, "QA DM có SP"); collect(P);
    const catId = (await rowsOf(P).filter({ hasText: "QA DM có SP" }).first().locator("td").first().innerText()).replace("#", "");
    await tab(P, "Sản phẩm"); await fillProduct(P, { name: "QA SP thuộc DM", price: "8000", cat: "QA DM có SP" }); await submitProduct(P); collect(P);
    await tab(P, "Danh mục");
    await rowsOf(P).filter({ hasText: "QA DM có SP" }).first().locator('button:has-text("Xóa")').click();
    await P.waitForLoadState("networkidle"); await sleep(700);
    const d = collect(P);
    const gone = !(await rowsOf(P).filter({ hasText: "QA DM có SP" }).count());
    const prods = await (await fetch(`${API}/products`)).json();
    const sp = prods.find((x) => x.name === "QA SP thuộc DM");
    const i = await shot(P, "GUI-04-07", [`Xóa danh mục #${catId} "QA DM có SP" (có 1 sản phẩm): hộp thoại ${d.join(" / ") || "(không)"}; danh mục ${gone ? "BỊ XÓA" : "vẫn còn"}`, `Sản phẩm "QA SP thuộc DM": ${sp ? `vẫn tồn tại, category_id = ${sp.category_id}` : "không còn"}`]);
    rec("GUI-04-07", [`Xóa danh mục "QA DM có SP" đang có 1 sản phẩm: ${d.length ? `hộp thoại ${d.join(" / ")}` : "không chặn, không cảnh báo"}; danh mục ${gone ? "bị xóa ngay" : "vẫn còn"}`, `Sản phẩm "QA SP thuộc DM" ${sp ? `vẫn còn với category_id = ${sp.category_id} (trỏ tới danh mục đã xóa)` : "không còn"}`], [i],
      gone && !d.length ? "Có thể Failed: xóa được danh mục đang có sản phẩm, không cảnh báo" : "Cần xem ảnh");
  });

  await run("GUI-01-20", async () => {
    await P.reload(); await P.waitForLoadState("networkidle");
    await tab(P, "Danh mục");
    await addCategory(P, "QD" + "D".repeat(253)); await addCategory(P, "Danh mục thử nghiệm có tên tiếng Việt rất dài để kiểm tra việc xuống dòng trong bảng quản lý"); collect(P);
    const m = async () => P.evaluate(() => {
      const t = [...document.querySelectorAll("table")].at(-1); const c = document.querySelector("div.flex-1.overflow-auto");
      const btns = [...t.querySelectorAll("button")].map((b) => b.getBoundingClientRect()); const right = Math.max(...btns.map((r) => r.right));
      return { tableW: Math.round(t.scrollWidth), contW: c.clientWidth, contScroll: c.scrollWidth, maxBtnRight: Math.round(right), vw: innerWidth };
    });
    const a = await m();
    await rowsOf(P).last().scrollIntoViewIfNeeded();
    const i1 = await shot(P, "GUI-01-20", [`Danh mục: bảng rộng ${a.tableW}px, vùng nội dung ${a.contW}px (scrollWidth ${a.contScroll}); nút Xóa xa nhất tới x=${a.maxBtnRight} / khung ${a.vw}`]);
    await tab(P, "Sản phẩm");
    const b = await m();
    await rowsOf(P).filter({ hasText: "QAAAA" }).first().scrollIntoViewIfNeeded().catch(() => {});
    const i2 = await shot(P, "GUI-01-20-2", [`Sản phẩm: bảng rộng ${b.tableW}px, vùng nội dung ${b.contW}px (scrollWidth ${b.contScroll}); nút Xóa xa nhất tới x=${b.maxBtnRight} / khung ${b.vw}`]);
    const over = (x) => x.contScroll > x.contW + 1 || x.maxBtnRight > x.vw;
    rec("GUI-01-20", [`Danh mục (tên 255 ký tự liền + tên tiếng Việt dài): bảng ${a.tableW}px trong vùng ${a.contW}px; nút Xóa xa nhất x=${a.maxBtnRight} (khung ${a.vw})`, `Sản phẩm (tên 255 ký tự liền từ GUI-02-12): bảng ${b.tableW}px trong vùng ${b.contW}px; nút Xóa xa nhất x=${b.maxBtnRight}`], [i1, i2],
      over(a) || over(b) ? "Có thể Failed: tên dài làm bảng tràn ngang / đẩy nút ra ngoài" : "Cần xem ảnh");
  });

  // Điều hướng + phiên
  await run("GUI-03-04", async () => {
    const Q = await newPage(); await login(Q);
    await Q.click('li:text-is("Đăng xuất")'); await sleep(500);
    const s1 = (await Q.locator('input[placeholder="Email"]').count()) ? "màn Login" : "màn admin";
    const i1 = await shot(Q, "GUI-03-04", [`Sau Đăng xuất: ${s1}; URL ${Q.url()}`]);
    await Q.goBack().catch(() => {}); await sleep(500);
    const u2 = Q.url(); const s2 = (await Q.locator('input[placeholder="Email"]').count()) ? "màn Login" : (await Q.locator("text=EShop Admin").count()) ? "màn admin" : "trang khác";
    const i2 = await shot(Q, "GUI-03-04-2", [`Bấm Back: URL ${u2} → ${s2}`]);
    await Q.goto(ADMIN); await Q.reload(); await sleep(500);
    const s3 = (await Q.locator('input[placeholder="Email"]').count()) ? "màn Login" : "màn admin";
    await Q.context().close();
    rec("GUI-03-04", [`Bấm Đăng xuất → ${s1} (không hỏi xác nhận)`, `Bấm Back → URL ${u2} (${s2}): ứng dụng chỉ có 1 mục lịch sử nên Back rời khỏi trang`, `Mở lại + F5 → ${s3}; không thấy dữ liệu admin`], [i1, i2], s1 === "màn Login" && s3 === "màn Login" ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-03-05", async () => {
    const Q = await newPage(); await Q.goto(ADMIN); await sleep(500);
    const s = (await Q.locator('input[placeholder="Email"]').count()) ? "màn Login" : "màn admin";
    const ls = await Q.evaluate(() => localStorage.getItem("adminToken"));
    const i = await shot(Q, "GUI-03-05", [`Ngữ cảnh mới (không có localStorage): ${s}; adminToken = ${ls}`]);
    await Q.context().close();
    rec("GUI-03-05", [`Ngữ cảnh trình duyệt mới (tương đương cửa sổ ẩn danh): hiện ${s}`], [i], s === "màn Login" ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-03-06", async () => {
    const urls = [];
    for (const t of ["Dashboard", "Danh mục", "Sản phẩm", "Mã Giảm Giá"]) { await tab(P, t); urls.push(`${t}: ${P.url()}`); }
    await tab(P, "Sản phẩm"); await P.reload(); await P.waitForLoadState("networkidle"); await sleep(300);
    const afterF5 = await P.$eval("div.flex-1 h2", (e) => e.innerText);
    const i1 = await shot(P, "GUI-03-06", [...urls, `F5 khi đang ở Sản phẩm → màn "${afterF5}"`]);
    await tab(P, "Danh mục"); await tab(P, "Sản phẩm");
    await P.goBack().catch(() => {}); await sleep(500);
    const bu = P.url();
    const i2 = await shot(P, "GUI-03-06-2", [`Danh mục → Sản phẩm → Back: URL ${bu}`]);
    await P.goto(ADMIN); await P.waitForLoadState("networkidle");
    rec("GUI-03-06", [`URL không đổi giữa các tab: ${[...new Set(urls.map((u) => u.split(": ")[1]))].join(", ")}`, `F5 ở tab Sản phẩm → quay về "${afterF5}"`, `Danh mục → Sản phẩm → Back: URL ${bu} (rời khỏi ứng dụng)`], [i1, i2],
      new Set(urls.map((u) => u.split(": ")[1])).size === 1 ? "Có thể Failed: các tab dùng chung 1 URL, F5 về Dashboard, Back rời ứng dụng" : "Cần xem ảnh");
  });

  await run("GUI-03-07", async () => {
    await tab(P, "Sản phẩm");
    await fillProduct(P, { name: "QA nhập dở", price: "45000", desc: "Đang nhập dở" });
    await tab(P, "Danh mục"); const d = collect(P); await tab(P, "Sản phẩm");
    const v = await prodForm(P).evaluate((x) => [...x.querySelectorAll("input,textarea")].map((e) => e.value));
    await prodForm(P).scrollIntoViewIfNeeded();
    const i = await shot(P, "GUI-03-07", [`Sau khi chuyển tab và quay lại: ${JSON.stringify(v)}; cảnh báo khi rời: ${d.join(" / ") || "(không)"}`]);
    await fillProduct(P, { name: "", price: "", desc: "" });
    rec("GUI-03-07", [`Nhập dở form Sản phẩm, chuyển sang Danh mục rồi quay lại: các ô còn nguyên ${JSON.stringify(v)}; không có cảnh báo khi rời`, "Dữ liệu chỉ còn khi không tải lại trang"], [i], v[0] === "QA nhập dở" ? "Có thể Passed" : "Có thể Failed");
  });

  await run("GUI-04-10", async () => {
    const Q = await newPage();
    await login(Q, "test@eshop.com", "Test1234!"); await Q.waitForLoadState("networkidle"); await sleep(800);
    const d = collect(Q);
    const s = (await Q.locator('input[placeholder="Email"]').count()) ? "vẫn ở màn Login" : "vào màn admin";
    const i = await shot(Q, "GUI-04-10", [`Đăng nhập test@eshop.com: hộp thoại ${d.join(" / ") || "(không)"}; ${s}`]);
    await Q.context().close();
    rec("GUI-04-10", [`Đăng nhập test@eshop.com: thông báo ${d.join(" / ") || "(không có)"}; ${s}`], [i], d.length ? "Có thể Passed (thông báo bằng alert) — xem nội dung" : "Có thể Failed");
  });

  await run("GUI-04-11", async () => {
    const Q = await newPage(); await login(Q);
    await tab(Q, "Danh mục");
    await Q.evaluate(() => localStorage.setItem("adminToken", "token.khong.hop.le"));
    await addCategory(Q, "QA sau khi sửa token"); const d1 = collect(Q);
    const added = await rowsOf(Q).filter({ hasText: "QA sau khi sửa token" }).count();
    const i1 = await shot(Q, "GUI-04-11", [`Sửa adminToken trong localStorage rồi thêm danh mục: ${added ? "VẪN THÊM ĐƯỢC" : "không thêm được"}; hộp thoại ${d1.join(" / ") || "(không)"}`]);
    await Q.reload(); await Q.waitForLoadState("networkidle"); await sleep(800);
    const d2 = collect(Q);
    const s = (await Q.locator('input[placeholder="Email"]').count()) ? "màn Login" : "màn admin";
    const i2 = await shot(Q, "GUI-04-11-2", [`Tải lại trang: ${s}; thông báo: ${d2.join(" / ") || "(không có)"}`]);
    await Q.context().close();
    rec("GUI-04-11", [`Sửa adminToken rồi thao tác ngay (thêm danh mục): ${added ? "vẫn thành công vì ứng dụng giữ token cũ trong bộ nhớ" : "không thành công"}; hộp thoại ${d1.join(" / ") || "(không)"}`, `Tải lại trang: về ${s}, không có thông báo hết phiên`], [i1, i2],
      s === "màn Login" && !d2.length ? "Có thể Failed: về Login nhưng không có thông báo hết phiên" : "Cần xem ảnh");
  });

  await run("GUI-01-04", async () => {
    const uniq = [...new Set(allDialogs)];
    const tech = uniq.filter((x) => /Request failed|status code|Error|SQLITE|undefined/i.test(x));
    const abbr = uniq.filter((x) => /\bDM\b|\bSP\b/.test(x));
    await tab(P, "Danh mục");
    rec("GUI-01-04", [`Các thông báo lỗi thu được trong pha Form (${uniq.length}): ${uniq.join(" / ") || "(không)"}`, `Chứa chuỗi kỹ thuật: ${tech.join(" / ") || "(không)"}`, `Chứa viết tắt: ${abbr.join(" / ") || "(không)"}`, "Thông báo \"Lỗi xóa DM/SP\" chỉ xuất hiện khi xóa thất bại — xem GUI-04-09"],
      ["GUI-02-09.png", "GUI-02-03.png"], tech.length || abbr.length ? "Có thể Failed: có thông báo kỹ thuật / viết tắt" : "Cần xem thêm GUI-04-09");
  });

  // ===================== PHASE 3: môi trường đặc biệt =====================
  currentPhase = "3. Môi trường đặc biệt";
  await run("GUI-01-10", async () => {
    const read = async (pg) => {
      await tab(pg, "Dashboard"); const rev = await pg.locator("p.text-3xl").first().innerText();
      await tab(pg, "Mã Giảm Giá");
      const rows = await rowsOf(pg).filter({ hasText: /BIGBUY|SAVE10/ }).evaluateAll((a) => a.map((r) => [...r.querySelectorAll("td")].slice(0, 4).map((t) => t.innerText).join(" · ")));
      return { rev, rows };
    };
    const V = await newPage({ locale: "vi-VN" }); await login(V); const v = await read(V);
    await tab(V, "Dashboard"); const i1 = await shot(V, "GUI-01-10", [`locale vi-VN: doanh thu "${v.rev}" (kỳ vọng tổng đơn delivered = ${expectedRevenue})`]);
    await tab(V, "Mã Giảm Giá"); const i2 = await shot(V, "GUI-01-10-2", [`vi-VN: ${v.rows.join(" | ")}`]);
    await V.context().close();
    const E = await newPage({ locale: "en-US" }); await login(E); const e = await read(E);
    await tab(E, "Dashboard"); const i3 = await shot(E, "GUI-01-10-3", [`locale en-US: doanh thu "${e.rev}"`]);
    await tab(E, "Mã Giảm Giá"); const i4 = await shot(E, "GUI-01-10-4", [`en-US: ${e.rows.join(" | ")}`]);
    await E.context().close();
    rec("GUI-01-10", [`Trình duyệt vi-VN: doanh thu "${v.rev}"; coupon ${v.rows.join(" | ")}`, `Trình duyệt en-US: doanh thu "${e.rev}"; coupon ${e.rows.join(" | ")}`, `Đơn đã giao hiện có tổng total_amount = ${expectedRevenue} (đơn #1 được chuyển sang delivered qua API trước khi chạy); Dashboard hiện ${v.rev} — ${Number(v.rev.replace(/\D/g, "")) === 2 * expectedRevenue ? "GẤP ĐÔI giá trị thực" : "đối chiếu thêm"}`],
      [i1, i2, i3, i4], v.rev !== e.rev ? "Có thể Failed: định dạng đổi theo ngôn ngữ trình duyệt (en-US dùng dấu phẩy)" : "Cần xem ảnh");
  });

  await run("GUI-01-15", async () => {
    const res = []; const imgs = [];
    for (const [w, h, n] of [[1024, 768, "GUI-01-15"], [768, 1024, "GUI-01-15-2"]]) {
      const Q = await newPage({ viewport: { width: w, height: h } }); await login(Q); await tab(Q, "Sản phẩm");
      const m = await Q.evaluate(() => { const c = document.querySelector("div.flex-1.overflow-auto"); const t = [...document.querySelectorAll("table")].at(-1); return { doc: document.documentElement.scrollWidth, vw: innerWidth, cont: c.clientWidth, contSW: c.scrollWidth, table: t.scrollWidth, sidebar: document.querySelector("div.w-64").getBoundingClientRect().width }; });
      res.push(`${w}px: sidebar ${m.sidebar}px, vùng nội dung ${m.cont}px, bảng ${m.table}px, cuộn ngang vùng nội dung ${m.contSW > m.cont + 1 ? "CÓ" : "không"}, trang ${m.doc > m.vw ? "tràn" : "không tràn"}`);
      imgs.push(await shot(Q, n, [res.at(-1)]));
      await tab(Q, "Mã Giảm Giá"); imgs.push(await shot(Q, `${n}-coupon`, [`${w}px — Mã giảm giá`]));
      await Q.context().close();
    }
    rec("GUI-01-15", res, imgs, "Cần xem ảnh");
  });

  await run("GUI-01-16", async () => {
    const Q = await newPage({ viewport: { width: 683, height: 384 }, deviceScaleFactor: 2 });
    await login(Q); await tab(Q, "Sản phẩm");
    const m = await Q.evaluate(() => { const c = document.querySelector("div.flex-1.overflow-auto"); return { cont: c.clientWidth, sw: c.scrollWidth, sh: c.scrollHeight, ch: c.clientHeight }; });
    const i1 = await shot(Q, "GUI-01-16", [`Giả lập 200% (khung 683×384 CSS px): vùng nội dung ${m.cont}px, cuộn ngang ${m.sw > m.cont + 1 ? "CÓ" : "không"}`]);
    await tab(Q, "Mã Giảm Giá"); const i2 = await shot(Q, "GUI-01-16-2", ["200% — Mã giảm giá"]);
    await tab(Q, "Danh mục"); const i3 = await shot(Q, "GUI-01-16-3", ["200% — Danh mục"]);
    await Q.context().close();
    rec("GUI-01-16", [`Giả lập phóng to 200% trên màn 1366×768 (khung 683×384, deviceScaleFactor 2): sidebar 256px chiếm hơn 1/3 chiều ngang; vùng nội dung ${m.cont}px, cuộn ngang ${m.sw > m.cont + 1 ? "có" : "không"}`, "Nên kiểm lại bằng Cmd + trên Chrome thật"], [i1, i2, i3], "Cần xem ảnh");
  });

  await run("GUI-01-17", async () => {
    const Q = await newPage({ colorScheme: "dark" }); await login(Q); await tab(Q, "Sản phẩm");
    const bg = await Q.evaluate(() => __qa.hex(__qa.bg(document.querySelector("div.flex-1"))));
    const i1 = await shot(Q, "GUI-01-17", [`prefers-color-scheme: dark → nền vùng nội dung ${bg}`]);
    await Q.context().close();
    const b2 = await chromium.launch({ executablePath: CHROME, headless: true, args: ["--enable-features=WebContentsForceDark"] });
    const R = await newPage({ browser: b2 }); await login(R); await tab(R, "Sản phẩm");
    const i2 = await shot(R, "GUI-01-17-2", ["Chrome Auto Dark Mode (WebContentsForceDark)"]);
    await tab(R, "Mã Giảm Giá"); const i3 = await shot(R, "GUI-01-17-3", ["Chrome Auto Dark Mode — Mã giảm giá"]);
    await b2.close();
    rec("GUI-01-17", [`Bật prefers-color-scheme: dark: giao diện không đổi (nền ${bg}) — trang không hỗ trợ dark mode`, "Bật Auto Dark Mode của Chrome: trình duyệt tự đảo màu (ảnh 2, 3) — xem độ đọc được"], [i1, i2, i3], "Cần xem ảnh");
  });

  await run("GUI-01-18", async () => {
    const Q = await newPage(); await login(Q);
    await Q.evaluate(() => (document.documentElement.dir = "rtl"));
    await tab(Q, "Sản phẩm"); const i1 = await shot(Q, "GUI-01-18", ['<html dir="rtl"> — Sản phẩm']);
    await tab(Q, "Mã Giảm Giá"); const i2 = await shot(Q, "GUI-01-18-2", ['<html dir="rtl"> — Mã giảm giá']);
    await Q.context().close();
    rec("GUI-01-18", ['Đặt <html dir="rtl">: sidebar chuyển sang phải, bảng và form lật theo (xem ảnh để đánh giá chồng/cắt)'], [i1, i2], "Cần xem ảnh");
  });

  await run("GUI-03-08", async () => {
    const Q = await newPage({ viewport: { width: 768, height: 1024 } }); await login(Q);
    const m = await Q.evaluate(() => ({ sb: document.querySelector("div.w-64").getBoundingClientRect().width, items: [...document.querySelectorAll("li")].map((l) => { const r = l.getBoundingClientRect(); return `${l.innerText.trim()}${r.bottom <= innerHeight && r.right <= innerWidth ? "" : " (ngoài khung)"}`; }), burger: !!document.querySelector("button[aria-label*=menu i], .hamburger") }));
    const i = await shot(Q, "GUI-03-08", [`768px: sidebar ${m.sb}px (${Math.round((m.sb / 768) * 100)}% bề ngang), nút ☰: ${m.burger ? "có" : "không"}`, `Mục menu: ${m.items.join(", ")}`]);
    await Q.context().close();
    rec("GUI-03-08", [`Ở 768px sidebar vẫn cố định ${m.sb}px (${Math.round((m.sb / 768) * 100)}% bề ngang), không thu gọn, không có nút ☰`, `Các mục menu đều nằm trong khung: ${m.items.join(", ")}`], [i], "Cần xem ảnh (menu vẫn dùng được nhưng chiếm nhiều chỗ)");
  });

  await run("GUI-04-01", async () => {
    const Q = await newPage(); await Q.goto(ADMIN);
    await Q.fill('input[placeholder="Email"]', "admin@eshop.com"); await Q.fill('input[placeholder="Password"]', "Admin123!");
    const cdp = await Q.context().newCDPSession(Q);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 2000, downloadThroughput: 50 * 1024, uploadThroughput: 25 * 1024 });
    await Q.click("form button");
    await Q.waitForSelector("text=EShop Admin", { timeout: 30000 }); await sleep(300);
    const spin = async () => Q.evaluate(() => ({ spin: document.querySelectorAll(".animate-spin, [role=progressbar], [aria-busy=true]").length, text: /Đang tải|Loading/i.test(document.body.innerText) }));
    const dash = await Q.locator("p.text-3xl").allInnerTexts(); const s1 = await spin();
    const i1 = await shot(Q, "GUI-04-01", [`Slow (2s/request): ngay sau đăng nhập, Dashboard hiện ${JSON.stringify(dash)}; chỉ báo loading: ${s1.spin || s1.text ? "có" : "không"}`]);
    await tab(Q, "Danh mục"); const nrow = await rowsOf(Q).count(); const s2 = await spin();
    const i2 = await shot(Q, "GUI-04-01-2", [`Tab Danh mục khi đang tải: ${nrow} dòng; chỉ báo loading: ${s2.spin || s2.text ? "có" : "không"}`]);
    await Q.waitForLoadState("networkidle", { timeout: 60000 }); await sleep(500);
    await tab(Q, "Dashboard"); const dash2 = await Q.locator("p.text-3xl").allInnerTexts();
    const i3 = await shot(Q, "GUI-04-01-3", [`Sau khi tải xong: Dashboard ${JSON.stringify(dash2)}`]);
    await Q.context().close();
    rec("GUI-04-01", [`Mạng chậm (latency 2s, 50 KB/s): ngay sau đăng nhập Dashboard hiện ${JSON.stringify(dash)} trong khi dữ liệu chưa về; không có spinner/chữ "Đang tải"`, `Tab Danh mục lúc đang tải: bảng chỉ có header (${nrow} dòng), không có chỉ báo`, `Tải xong: Dashboard ${JSON.stringify(dash2)}`], [i1, i2, i3],
      !s1.spin && !s1.text ? "Có thể Failed: không có trạng thái loading, hiện số 0 trước khi có dữ liệu" : "Cần xem ảnh");
  });

  await run("GUI-04-02", async () => {
    const Q = await newPage(); await login(Q);
    const cdp = await Q.context().newCDPSession(Q);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 1500, downloadThroughput: 50 * 1024, uploadThroughput: 25 * 1024 });
    await tab(Q, "Danh mục");
    await catInput(Q).fill("QA bấm đôi");
    const btn = Q.locator('button:has-text("Thêm mới")');
    const r0 = Q.reqs.length;
    await btn.click(); const dis = await btn.isDisabled(); await btn.click({ timeout: 2000 }).catch(() => {});
    const i1 = await shot(Q, "GUI-04-02", [`Ngay sau lần bấm đầu: nút "Thêm mới" disabled=${dis}`]);
    await Q.waitForLoadState("networkidle", { timeout: 60000 }); await sleep(1500);
    const posts = Q.reqs.slice(r0).filter((r) => r.startsWith("POST /api/categories")).length;
    await Q.waitForFunction(() => [...document.querySelectorAll("tbody td")].some((t) => t.innerText === "QA bấm đôi"), null, { timeout: 60000 }).catch(() => {});
    const cnt = (await (await fetch(`${API}/categories`)).json()).filter((c) => c.name === "QA bấm đôi").length;
    await rowsOf(Q).filter({ hasText: "QA bấm đôi" }).first().scrollIntoViewIfNeeded().catch(() => {});
    const i2 = await shot(Q, "GUI-04-02-2", [`Bấm "Thêm mới" 2 lần nhanh: ${posts} request POST; ${cnt} danh mục "QA bấm đôi" trong CSDL`]);
    await Q.context().close();
    const Z = await newPage(); await Z.goto(ADMIN);
    const c2 = await Z.context().newCDPSession(Z); await c2.send("Network.enable");
    await c2.send("Network.emulateNetworkConditions", { offline: false, latency: 1500, downloadThroughput: 50 * 1024, uploadThroughput: 25 * 1024 });
    await Z.fill('input[placeholder="Email"]', "admin@eshop.com"); await Z.fill('input[placeholder="Password"]', "Admin123!");
    await Z.click("form button"); const ld = await Z.locator("form button").isDisabled().catch(() => "?"); await Z.click("form button", { timeout: 2000 }).catch(() => {});
    await Z.waitForSelector("text=EShop Admin", { timeout: 30000 }).catch(() => {});
    const lp = Z.reqs.filter((r) => r.startsWith("POST /api/login")).length;
    await Z.context().close();
    rec("GUI-04-02", [`Danh mục (mạng chậm 1.5s): sau lần bấm đầu nút "Thêm mới" disabled=${dis}; bấm 2 lần → ${posts} request, ${cnt} danh mục "QA bấm đôi" được tạo (đếm qua API)`, `Login: sau lần bấm đầu disabled=${ld}; bấm 2 lần → ${lp} request /api/login`], [i1, i2],
      cnt > 1 || posts > 1 ? "Có thể Failed: nút không khóa, bấm đôi tạo bản ghi trùng" : "Cần xem ảnh");
  });

  await run("GUI-04-16", async () => {
    await tab(P, "Mã Giảm Giá");
    const r = await createCoupon(P, { code: "SAVE10" });
    const aria = await P.evaluate(() => ({ alert: document.querySelectorAll("[role=alert],[aria-live]").length, invalid: document.querySelectorAll("[aria-invalid=true]").length, describedby: document.querySelectorAll("[aria-describedby]").length }));
    const i = await shot(P, "GUI-04-16", [`Sau lỗi tạo mã trùng: ${r.dlg.join(" / ")}`, `role=alert/aria-live: ${aria.alert}; aria-invalid=true: ${aria.invalid}; aria-describedby: ${aria.describedby}`]);
    rec("GUI-04-16", [`Lỗi hiển thị bằng alert() của trình duyệt (${r.dlg.join(" / ")}); DOM không có role="alert"/aria-live (${aria.alert}), không có aria-invalid (${aria.invalid})`, "Chưa kiểm bằng VoiceOver — alert() gốc thường được trình đọc màn hình đọc, cần tester tự nghe để xác nhận"], [i], "Cần kiểm tay bằng VoiceOver");
  });

  // ===================== PHASE 4: empty state + dừng backend =====================
  currentPhase = "4. Empty state, dừng backend";
  await run("GUI-04-08", async () => {
    await P.reload(); await P.waitForLoadState("networkidle");
    const res = []; const imgs = [];
    for (const [t, n] of [["Mã Giảm Giá", "GUI-04-08"], ["Sản phẩm", "GUI-04-08-2"], ["Danh mục", "GUI-04-08-3"]]) {
      await tab(P, t);
      let guard = 0, stuck = 0;
      while ((await rowsOf(P).count()) > 0 && guard < 400 && stuck < 3) {
        const before = await rowsOf(P).count();
        await rowsOf(P).first().locator('button:has-text("Xóa")').click();
        await P.waitForLoadState("networkidle"); await sleep(250);
        stuck = (await rowsOf(P).count()) < before ? 0 : stuck + 1; guard++;
      }
      const left = await rowsOf(P).count(); const d = collect(P);
      const tbody = await mainTable(P).locator("tbody").innerText();
      const empty = await P.evaluate(() => /Chưa có|không có|trống/i.test(document.querySelector("div.flex-1").innerText));
      res.push(`${t}: còn ${left} dòng${d.length ? ` (lỗi khi xóa: ${[...new Set(d)].join(" / ")})` : ""}; tbody "${tbody.trim() || "(trống)"}"; thông báo bảng rỗng: ${empty ? "có" : "không"}`);
      imgs.push(await shot(P, n, [res.at(-1)]));
    }
    rec("GUI-04-08", [...res, "Đã xóa toàn bộ dữ liệu qua giao diện (dữ liệu được khôi phục khi khởi động lại backend)"], imgs, res.some((x) => x.includes("thông báo bảng rỗng: không")) ? "Có thể Failed: bảng rỗng chỉ còn header, không có thông báo" : "Cần xem ảnh");
  });

  await run("GUI-04-09", async () => {
    execSync("lsof -ti tcp:3000 | xargs kill 2>/dev/null || true"); await sleep(1500);
    await tab(P, "Danh mục");
    await addCategory(P, "QA mất kết nối"); const d1 = collect(P);
    const i1 = await shot(P, "GUI-04-09", [`Backend đã dừng — thêm danh mục: ${d1.join(" / ") || "(không có thông báo)"}`]);
    await P.reload(); await P.waitForLoadState("networkidle"); await sleep(1000);
    const d2 = collect(P);
    const s = (await P.locator('input[placeholder="Email"]').count()) ? "màn Login" : "màn admin";
    await tab(P, "Dashboard").catch(() => {});
    const dash = await P.locator("p.text-3xl").allInnerTexts().catch(() => []);
    const i2 = await shot(P, "GUI-04-09-2", [`Backend đã dừng — tải lại trang: ${s}; thông báo ${d2.join(" / ") || "(không có)"}; Dashboard ${JSON.stringify(dash)}`]);
    await tab(P, "Sản phẩm").catch(() => {});
    const i3 = await shot(P, "GUI-04-09-3", ["Backend đã dừng — tab Sản phẩm sau khi tải lại"]);
    rec("GUI-04-09", [`Dừng backend, thêm danh mục: ${d1.join(" / ") || "không có thông báo"}`, `Tải lại trang: ${s}, ${d2.length ? `thông báo ${d2.join(" / ")}` : "không có thông báo nào"}; Dashboard hiện ${JSON.stringify(dash)}, các bảng trống`], [i1, i2, i3],
      d1.some((x) => /Network Error|status code/.test(x)) || !d2.length ? "Có thể Failed: thông báo kỹ thuật (\"Network Error\"), tải lại thì im lặng hiện số 0" : "Cần xem ảnh");
  });

  await browser.close();
  return { chromeVersion, expectedRevenue };
}

// =====================================================================
function writeReport(meta, started, ended) {
  const md = fs.readFileSync(path.join(TC, "checklist-filtered.md"), "utf8");
  const ids = [...md.matchAll(/^\| (GUI-\d\d-\d\d) \|/gm)].map((m) => m[1]);
  const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ").replace(/<(?!br>)([^<>`]+)>/g, "`<$1>`").replace(/(&lt;[^&|`]*?&gt;)/g, "`$1`");
  const lines = [];
  lines.push("# Quan sát khi chạy checklist GUI — Web Admin", "");
  lines.push(`- **Checklist:** \`checklist-filtered.md\` (${ids.length} mục)`);
  lines.push(`- **Thời gian chạy:** ${started} → ${ended}`);
  lines.push(`- **Môi trường:** macOS, Google Chrome ${meta.chromeVersion} (headless) qua Playwright \`playwright-core\`, khung nhìn 1366×768, ngôn ngữ trình duyệt vi-VN (trừ mục ghi rõ khác)`);
  lines.push("- **SUT:** http://localhost:5174, tài khoản admin@eshop.com; trước khi chạy: `scripts/start-sut.sh`, `scripts/seed-hw03.sh 3`, chuyển đơn #1 sang `delivered` qua API để Dashboard có doanh thu");
  lines.push("- **Script:** `scripts/hw03-run-checklist.mjs`");
  lines.push("- **Thứ tự chạy:** (1) mục chỉ xem → (2) form → (3) môi trường đặc biệt (locale, kích thước, zoom, dark, RTL, mạng chậm) → (4) empty state và dừng backend");
  lines.push("");
  lines.push("**Lưu ý khi xem ảnh**");
  lines.push("- Khung nền vàng viền đứt **\"▶ Ghi chú của Playwright (không thuộc SUT)\"** ở góc phải dưới là do script chèn vào để ghi số đo và nội dung hộp thoại; không phải giao diện của SUT.");
  lines.push("- Viền tím (outline) quanh phần tử là đánh dấu của script để chỉ vị trí cần xem.");
  lines.push("- Hộp thoại `alert()`/`confirm()` gốc của trình duyệt không chụp được ở chế độ headless; nội dung được ghi trong khung ghi chú và cột Quan sát.");
  lines.push("- Cột **Gợi ý kết quả** chỉ là gợi ý của script dựa trên quan sát; Pass/Fail do tester quyết định sau khi xem ảnh.");
  lines.push("- Cột **Kết quả đã kiểm chứng** để tester điền `Passed` / `Failed` / `N/A` sau khi review.");
  lines.push("");
  lines.push("| ID | Pha | Quan sát | Ảnh | Gợi ý kết quả | Kết quả đã kiểm chứng |", "|---|---|---|---|---|---|");
  for (const id of ids) {
    const r = results[id];
    if (!r) { lines.push(`| ${id} | — | Chưa chạy | — | Cần kiểm tay |  |`); continue; }
    const imgs = r.imgs.length ? r.imgs.map((f) => `[${f}](screenshots/run/${f})`).join("<br>") : "—";
    lines.push(`| ${id} | ${esc(phaseOf[id] || "")} | ${r.obs.map((o) => "• " + esc(o)).join("<br>")} | ${imgs} | ${esc(r.hint)} |  |`);
  }
  fs.writeFileSync(OUT, lines.join("\n") + "\n");
  console.log(`Đã ghi ${OUT}`);
}

const started = new Date();
const fmt = (d) => `${ymd(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
main().then((meta) => writeReport(meta, fmt(started), fmt(new Date()))).catch(async (e) => {
  console.error(e);
  try { await browser?.close(); } catch {}
  writeReport({ chromeVersion: "?" }, fmt(started), fmt(new Date()));
  process.exit(1);
});
