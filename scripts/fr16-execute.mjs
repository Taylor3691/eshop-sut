/**
 * Chạy bộ test case FR-16 (docs/fr-16/04-test-cases.md) trên eshop-sut local.
 *
 * Cần sẵn:
 *   backend:        node server.js    → http://localhost:3000
 *   frontend-admin: npm run dev       → http://localhost:5174
 *
 * Chạy: node scripts/fr16-execute.mjs
 */
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL ?? "http://localhost:3000";
const ADMIN = process.env.ADMIN_URL ?? "http://localhost:5174";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "backend/package.json"));
const sqlite3 = require("sqlite3");
const dbFile = path.join(root, "backend/database.sqlite");

const HEADER = "name,price,description,imageUrl,category_id";
const SEED = [
  ["iPhone 15 Pro Max", 30000000, "Điện thoại cao cấp của Apple", "https://placehold.co/300x300/png?text=iPhone+15", 1],
  ["Samsung Galaxy S24 Ultra", 28000000, "Màn hình hiển thị xuất sắc, camera siêu zoom", "https://placehold.co/300x300/png?text=Samsung+S24", 1],
  ["MacBook Pro M3", 45000000, "Laptop chuyên nghiệp mạnh mẽ", "https://placehold.co/300x300/png?text=Macbook+Pro", 2],
  ["Tai nghe AirPods Pro 2", 6000000, "Chống ồn chủ động xuất sắc", "https://placehold.co/300x300/png?text=AirPods+Pro", 3],
  ["Bàn phím cơ Keychron Q1", 4000000, "Gõ cực sướng, thiết kế kim loại", "https://placehold.co/300x300/png?text=Keychron+Q1", 3],
];
const SEED_NAMES = SEED.map((row) => row[0]);

function line(fields) {
  return [
    fields.name ?? "SP Import",
    fields.price ?? "100000",
    fields.description ?? "Mo ta san pham",
    fields.imageUrl ?? "https://placehold.co/300",
    fields.category_id ?? "1",
  ].join(",");
}

function csv(dataLines, header = HEADER) {
  return [header, ...dataLines].join("\n");
}

const STD = line({});
const A = "a".repeat(254);
const B = "a".repeat(255);
const C = "a".repeat(256);

const CASES = [
  { id: "TC-01", expect: "Thêm đúng SP Import, giá 100000, mô tả và ảnh chuẩn, category 1. Seed còn nguyên. Báo 1 thành công, 0 lỗi.", file: { name: "hang.csv", text: csv([STD]) }, added: [{ name: "SP Import", price: 100000, description: "Mo ta san pham", imageUrl: "https://placehold.co/300", category_id: 1 }], report: { success: 1 } },
  { id: "TC-02", expect: "Thêm SP Import A và SP Import B. Seed còn nguyên. Báo 2 thành công, 0 lỗi.", file: { name: "hang.csv", text: csv([line({ name: "SP Import A" }), line({ name: "SP Import B" })]) }, added: [{ name: "SP Import A", price: 100000 }, { name: "SP Import B", price: 100000 }], report: { success: 2 } },
  { id: "TC-03", expect: "Mô tả đúng Mo ta, co phay. Báo 1 thành công, 0 lỗi.", file: { name: "hang.csv", text: csv(['SP Import,100000,"Mo ta, co phay",https://placehold.co/300,1']) }, added: [{ name: "SP Import", price: 100000, description: "Mo ta, co phay" }], report: { success: 1 } },
  { id: "TC-04", expect: "Thêm một sản phẩm tên a.", file: { name: "hang.csv", text: csv([line({ name: "a" })]) }, added: [{ name: "a", price: 100000 }] },
  { id: "TC-05", expect: "Thêm một sản phẩm tên aa.", file: { name: "hang.csv", text: csv([line({ name: "aa" })]) }, added: [{ name: "aa", price: 100000 }] },
  { id: "TC-06", expect: "Thêm một sản phẩm tên dài 254 ký tự.", file: { name: "hang.csv", text: csv([line({ name: A })]) }, added: [{ name: A, price: 100000 }] },
  { id: "TC-07", expect: "Thêm một sản phẩm tên dài 255 ký tự.", file: { name: "hang.csv", text: csv([line({ name: B })]) }, added: [{ name: B, price: 100000 }] },
  { id: "TC-08", expect: "Thêm một sản phẩm giá 1. Seed còn nguyên.", file: { name: "hang.csv", text: csv([line({ price: "1" })]) }, added: [{ name: "SP Import", price: 1 }] },
  { id: "TC-09", expect: "Không thêm sản phẩm. Seed còn 5 dòng.", guest: true, added: [] },
  { id: "TC-10", expect: "Bị từ chối. Không thêm SP Import.", api: { token: null }, added: [], reject: true },
  { id: "TC-11", expect: "Bị từ chối. Không thêm SP Import.", api: { token: "not-a-jwt" }, added: [], reject: true },
  { id: "TC-12", expect: "Bị từ chối vì không phải admin. Không thêm SP Import.", api: { token: "user" }, added: [], reject: true },
  { id: "TC-13", expect: "Từ chối vì đuôi không phải .csv. Không thêm sản phẩm.", file: { name: "hang.txt", text: csv([STD]) }, added: [] },
  { id: "TC-14", expect: "Từ chối vì header sai. Không thêm sản phẩm.", file: { name: "hang.csv", text: csv([STD], "ten,gia,mo_ta,image,danh_muc") }, added: [] },
  { id: "TC-15", expect: "Không thêm sản phẩm với mô tả bị cắt ở dấu phẩy. Có báo lỗi.", file: { name: "hang.csv", text: csv(["SP Import,100000,Mo ta, co phay,https://placehold.co/300,1"]) }, added: [], reportError: true },
  { id: "TC-16", expect: "Không thêm sản phẩm. Báo lỗi tên. Seed còn nguyên.", file: { name: "hang.csv", text: csv([line({ name: "" })]) }, added: [], reportError: true },
  { id: "TC-17", expect: "Không thêm sản phẩm. Báo lỗi giá.", file: { name: "hang.csv", text: csv([line({ price: "-1" })]) }, added: [], reportError: true },
  { id: "TC-18", expect: "Không thêm sản phẩm. Báo lỗi giá.", file: { name: "hang.csv", text: csv([line({ price: "0" })]) }, added: [], reportError: true },
  { id: "TC-19", expect: "Không thêm sản phẩm. Báo lỗi giá.", file: { name: "hang.csv", text: csv([line({ price: "abc" })]) }, added: [], reportError: true },
  { id: "TC-20", expect: "Không thêm sản phẩm. Báo lỗi giá.", file: { name: "hang.csv", text: csv([line({ price: "100@" })]) }, added: [], reportError: true },
  { id: "TC-22", expect: "Không thêm sản phẩm. Seed còn nguyên.", file: { name: "hang.csv", text: `${HEADER}\n` }, added: [] },
  { id: "TC-23", expect: "Rollback cả file. Không có SP Import. Báo lỗi tên ở dòng 2.", file: { name: "hang.csv", text: csv([STD, line({ name: "" })]) }, added: [], reportError: true },
  { id: "TC-24", expect: "HTTP không phải lỗi. Thêm đúng SP Import. Seed còn nguyên.", api: { token: "admin", query: { foo: "1" } }, added: [{ name: "SP Import", price: 100000 }], httpOk: true },
  { id: "TC-25", expect: 'Đọc nháy kép escape thành ký tự nháy kép, mô tả đúng Mo ta "dep".', file: { name: "hang.csv", text: csv(['SP Import,100000,"Mo ta ""dep""",https://placehold.co/300,1']) }, added: [{ name: "SP Import", price: 100000, description: 'Mo ta "dep"' }] },
  { id: "TC-26", expect: "Một sản phẩm, mô tả chứa xuống dòng trong trường nháy kép.", file: { name: "hang.csv", text: csv(['SP Import,100000,"Dong 1\nDong 2",https://placehold.co/300,1']) }, added: [{ name: "SP Import", price: 100000, description: "Dong 1\nDong 2" }] },
  { id: "TC-27", expect: "CSV CRLF thêm đúng một sản phẩm và category 1.", file: { name: "hang.csv", text: HEADER + "\r\n" + STD + "\r\n" }, added: [{ name: "SP Import", price: 100000, description: "Mo ta san pham", category_id: 1 }] },
  { id: "TC-28", expect: "Tên chỉ dấu cách không phải tên có nội dung: từ chối, không thêm sản phẩm (giả định cần xác nhận).", file: { name: "hang.csv", text: csv([line({ name: "   " })]) }, added: [], reportError: true },
  { id: "TC-29", expect: "Giá 1.5 là số dương, được thêm và giữ nguyên giá trị.", file: { name: "hang.csv", text: csv([line({ price: "1.5" })]) }, added: [{ name: "SP Import", price: 1.5 }] },
  { id: "TC-30", expect: "Giá dương 0.01 được thêm và giữ nguyên giá trị.", file: { name: "hang.csv", text: csv([line({ price: "0.01" })]) }, added: [{ name: "SP Import", price: 0.01 }] },
  { id: "TC-31", expect: "Giá âm -0.01 bị từ chối, không thêm sản phẩm.", file: { name: "hang.csv", text: csv([line({ price: "-0.01" })]) }, added: [], reportError: true },
];

function openDb() {
  return new sqlite3.Database(dbFile);
}
function dbAll(db, sql, params = []) {
  return new Promise((resolve, reject) => db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows))));
}
function dbRun(db, sql, params = []) {
  return new Promise((resolve, reject) => db.run(sql, params, (err) => (err ? reject(err) : resolve())));
}

async function resetProducts() {
  const db = openDb();
  try {
    await dbRun(db, "DELETE FROM products");
    for (const row of SEED) {
      await dbRun(
        db,
        "INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)",
        row,
      );
    }
  } finally {
    await new Promise((resolve) => db.close(resolve));
  }
}

async function readProducts() {
  const db = openDb();
  try {
    return await dbAll(db, "SELECT name, price, description, imageUrl, category_id FROM products ORDER BY id");
  } finally {
    await new Promise((resolve) => db.close(resolve));
  }
}

function extras(rows) {
  return rows.filter((row) => !SEED_NAMES.includes(row.name));
}

function sameAdded(actual, expected) {
  if (actual.length !== expected.length) return false;
  return expected.every((wanted) =>
    actual.some((row) =>
      Object.entries(wanted).every((entry) => String(row[entry[0]]) === String(entry[1])),
    ),
  );
}

function seedIntact(rows) {
  return SEED_NAMES.every((name) => rows.some((row) => row.name === name));
}

function formatRows(rows) {
  const extra = extras(rows);
  if (!extra.length) return "(không thêm sản phẩm)";
  return extra
    .map((row) => `${row.name} | ${row.price} | ${row.description} | cat ${row.category_id}`)
    .join(" ; ");
}

function judge(rows, testCase, report, httpStatus) {
  const reasons = [];
  const extra = extras(rows);
  if (!seedIntact(rows)) reasons.push("seed bị mất hoặc đổi");
  if (!sameAdded(extra, testCase.added)) reasons.push(`thêm: ${formatRows(rows)}`);
  if (testCase.report && testCase.added.length) {
    const text = report ?? "";
    if (!text.includes(String(testCase.report.success))) reasons.push(`báo cáo không thấy số ${testCase.report.success}: ${text || "(trống)"}`);
    if (/❌|Thiếu|lỗi/i.test(text) && testCase.report.success > 0 && !text.includes(`${testCase.report.success}/`)) {
      reasons.push(`báo cáo lỗi: ${text}`);
    }
  }
  if (testCase.reportError && !/thiếu|lỗi|error|không/i.test(report ?? "")) {
    reasons.push(`không thấy báo lỗi: ${report || "(trống)"}`);
  }
  if (testCase.reject && !(httpStatus >= 400)) reasons.push(`HTTP ${httpStatus} không từ chối`);
  if (testCase.httpOk && !(httpStatus < 400)) reasons.push(`HTTP ${httpStatus}`);
  const actual = [
    `DB: ${formatRows(rows)}.`,
    report ? `Báo cáo: ${report.replace(/\s+/g, " ").slice(0, 220)}.` : null,
    httpStatus != null ? `HTTP ${httpStatus}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
  return { pass: reasons.length === 0, actual: reasons.length ? `${actual} Lệch: ${reasons.join("; ")}.` : actual };
}

async function login(page) {
  await page.goto(ADMIN, { waitUntil: "domcontentloaded" });
  if (await page.getByPlaceholder("Email").count()) {
    await page.getByPlaceholder("Email").fill("admin@eshop.com");
    await page.getByPlaceholder("Password").fill("Admin123!");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByText("Sản phẩm").waitFor();
  }
}

async function runFile(page, file) {
  await page.getByText("Sản phẩm", { exact: true }).click();
  await page.locator('input[type="file"]').setInputFiles({
    name: file.name,
    mimeType: file.name.endsWith(".csv") ? "text/csv" : "text/plain",
    buffer: Buffer.from(file.text, "utf-8"),
  });
  const button = page.getByRole("button", { name: /Import/ });
  await page.waitForTimeout(300);
  if (await button.isDisabled()) return "Nút Import tắt.";
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/admin/import-products") && response.request().method() === "POST",
  );
  await button.click();
  await responsePromise;
  await page.waitForTimeout(200);
  const box = page.locator(".bg-green-100, .bg-red-100").last();
  return (await box.count()) ? box.innerText() : "(không có báo cáo)";
}

async function tokenFor(kind) {
  if (kind === "admin" || kind === "user") {
    const email = kind === "admin" ? "admin@eshop.com" : "test@eshop.com";
    const password = kind === "admin" ? "Admin123!" : "Test1234!";
    const response = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json();
    return body.token;
  }
  return kind;
}

const WEB = process.env.WEB_URL ?? "http://localhost:5173";

// Ảnh phải cho thấy dữ liệu sai sau import, không chỉ banner "Import hoàn tất".
const EVIDENCE = {
  "TC-03": "detail",
  "TC-25": "detail",
  "TC-26": "table",
  "TC-31": "table",
};

async function captureEvidence(browser, page, id, mode) {
  const file = path.join(root, `docs/bugs/review-fr16-${id}.png`);
  if (mode === "table") {
    const banner = await page.locator(".bg-green-100, .bg-red-100").last().innerText().catch(() => "");
    await page.reload({ waitUntil: "networkidle" });
    await page.getByText("Sản phẩm", { exact: true }).click();
    await page.waitForTimeout(500);
    await page.evaluate((text) => {
      const table = document.querySelector("table");
      const wrap = document.createElement("div");
      wrap.id = "evidence";
      wrap.style.cssText = "background:#fff;padding:8px";
      const note = document.createElement("div");
      note.textContent = `${text} — dòng viền đỏ là dòng do file CSV thêm vào (chú thích do script kiểm thử chèn).`;
      note.style.cssText = "background:#fef3c7;border:2px solid #d97706;padding:8px;margin-bottom:8px;font:14px sans-serif";
      table.parentNode.insertBefore(wrap, table);
      wrap.append(note, table);
      for (const row of table.querySelectorAll("tbody tr")) {
        if (!/iPhone 15|Samsung|MacBook|AirPods|Keychron/.test(row.innerText)) row.style.outline = "3px solid red";
      }
    }, `Banner sau khi import: ${banner.replace(/\s+/g, " ")}`);
    await page.locator("#evidence").screenshot({ path: file });
    return;
  }
  const rows = await readProducts();
  const db = openDb();
  const extra = await dbAll(db, "SELECT id FROM products WHERE name = 'SP Import' ORDER BY id DESC LIMIT 1");
  await new Promise((resolve) => db.close(resolve));
  if (!extra.length || !rows.length) return;
  const web = await browser.newPage({ viewport: { width: 1100, height: 700 } });
  await web.goto(`${WEB}/product/${extra[0].id}`, { waitUntil: "networkidle" });
  await web.screenshot({ path: file, fullPage: true });
  await web.close();
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ locale: "vi-VN" });
  const page = await context.newPage();
  page.on("dialog", (dialog) => dialog.accept());
  await login(page);

  const results = [];
  for (const testCase of CASES) {
    await resetProducts();
    let report = null;
    let httpStatus = null;
    if (testCase.guest) {
      const guest = await browser.newContext();
      const guestPage = await guest.newPage();
      await guestPage.goto(ADMIN, { waitUntil: "domcontentloaded" });
      report = (await guestPage.getByRole("heading", { name: "Admin Login" }).count())
        ? "Trang yêu cầu đăng nhập."
        : "Không thấy form đăng nhập.";
      await guest.close();
    } else if (testCase.file) {
      report = await runFile(page, testCase.file);
    } else {
      const headers = { "Content-Type": "application/json" };
      const token = await tokenFor(testCase.api.token);
      if (token) headers.Authorization = `Bearer ${token}`;
      const url = new URL(`${API}/api/admin/import-products`);
      for (const [key, value] of Object.entries(testCase.api.query ?? {})) url.searchParams.set(key, value);
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          products: [{
            name: "SP Import",
            price: 100000,
            description: "Mo ta san pham",
            imageUrl: "https://placehold.co/300",
            category_id: 1,
          }],
        }),
      });
      httpStatus = response.status;
      report = (await response.text()).replace(/\s+/g, " ").slice(0, 220);
    }
    const rows = await readProducts();
    const judged = judge(rows, testCase, report, httpStatus);
    if (EVIDENCE[testCase.id]) await captureEvidence(browser, page, testCase.id, EVIDENCE[testCase.id]);
    results.push({ ...testCase, ...judged });
    console.log(`${testCase.id}\t${judged.pass ? "PASS" : "FAIL"}\t${judged.actual}`);
  }

  await browser.close();
  await resetProducts();

  const pass = results.filter((result) => result.pass).length;
  const fail = results.length - pass;
  const lines = [
    "# FR-16 — Kết quả chạy test case",
    "",
    `Chạy trên API \`${API}\` và Admin \`${ADMIN}\`. Script: \`scripts/fr16-execute.mjs\`.`,
    "",
    `Tổng: ${results.length}. PASS: ${pass}. FAIL: ${fail}. BLOCKED: 0.`,
    "",
    "| TC | Kết quả | Expected Result | Actual Result |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${result.id} | ${result.pass ? "PASS" : "FAIL"} | ${result.expect.replaceAll("|", "\\|")} | ${result.actual.replaceAll("|", "\\|")} |`,
    ),
    "",
  ];
  const out = path.join(root, "docs/fr-16/05-execution-results.md");
  writeFileSync(out, lines.join("\n"));
  console.log(`\n${pass} PASS, ${fail} FAIL. Ghi ${out}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
