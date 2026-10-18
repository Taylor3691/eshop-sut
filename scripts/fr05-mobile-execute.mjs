/**
 * Chạy bộ test case FR-05 mobile (docs/fr-05-mobile/04-test-cases.md).
 *
 * Cần sẵn:
 *   backend: node server.js                         → http://localhost:3000
 *   mobile:  cd frontend-mobile && npx expo start --web --port 8081
 *
 * App gọi http://192.168.10.13:3000. Máy này không có IP đó.
 * Script chuyển host sang localhost:3000 và giữ nguyên query do app tạo.
 *
 * Chạy: node scripts/fr05-mobile-execute.mjs
 */
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL ?? "http://127.0.0.1:3000";
const WEB = process.env.MOBILE_WEB_URL ?? "http://127.0.0.1:8081";
const APP_HOST = "http://192.168.10.13:3000";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "backend/package.json"));
const sqlite3 = require("sqlite3");
const dbFile = path.join(root, "backend/database.sqlite");

const SEED_ROWS = [
  ["iPhone 15 Pro Max", 30000000, "Điện thoại cao cấp của Apple", "https://placehold.co/300x300/png?text=iPhone+15", 1],
  ["Samsung Galaxy S24 Ultra", 28000000, "Màn hình hiển thị xuất sắc, camera siêu zoom", "https://placehold.co/300x300/png?text=Samsung+S24", 1],
  ["MacBook Pro M3", 45000000, "Laptop chuyên nghiệp mạnh mẽ", "https://placehold.co/300x300/png?text=Macbook+Pro", 2],
  ["Tai nghe AirPods Pro 2", 6000000, "Chống ồn chủ động xuất sắc", "https://placehold.co/300x300/png?text=AirPods+Pro", 3],
  ["Bàn phím cơ Keychron Q1", 4000000, "Gõ cực sướng, thiết kế kim loại", "https://placehold.co/300x300/png?text=Keychron+Q1", 3],
];

async function setProducts(count = SEED_ROWS.length) {
  const db = new sqlite3.Database(dbFile);
  const run = (sql, params = []) =>
    new Promise((resolve, reject) => db.run(sql, params, (err) => (err ? reject(err) : resolve())));
  try {
    await run("DELETE FROM products");
    for (const row of SEED_ROWS.slice(0, count)) {
      await run("INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)", row);
    }
  } finally {
    await new Promise((resolve) => db.close(resolve));
  }
}

const ALL = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "MacBook Pro M3",
  "Tai nghe AirPods Pro 2",
  "Bàn phím cơ Keychron Q1",
];
const WITH_A = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "MacBook Pro M3",
  "Tai nghe AirPods Pro 2",
];
const PRICES = {
  "iPhone 15 Pro Max": "30.000.000",
  "Samsung Galaxy S24 Ultra": "28.000.000",
  "MacBook Pro M3": "45.000.000",
  "Tai nghe AirPods Pro 2": "6.000.000",
  "Bàn phím cơ Keychron Q1": "4.000.000",
};

const BLOCKED_SPACE =
  "Không chấm. Chrome cắt dấu cách cuối URL trước khi gửi nên request thành search= rỗng. Chưa biết app trên iOS/Android gửi gì. Cần thiết bị thật hoặc Expo Go.";

const A254 = "a".repeat(254);
const A255 = "a".repeat(255);
const A256 = "a".repeat(256);

const CASES = [
  { id: "TC-01", expect: "Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Có loading. Chữ iPhone hiện dạng text.", search: "iPhone", names: ["iPhone 15 Pro Max"], ui: true, loading: true, show: "iPhone" },
  { id: "TC-02", expect: "Chỉ đúng một sản phẩm iPhone 15 Pro Max.", search: "iPhone 15 Pro Max", names: ["iPhone 15 Pro Max"] },
  { id: "TC-03", expect: "Có empty state. Không hiện năm sản phẩm seed.", search: "zzzz-khong-co", names: [], empty: true },
  { id: "TC-04", expect: "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", search: "iphone", allowed: ["iPhone 15 Pro Max"] },
  { id: "TC-05", expect: "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", search: "CƠ", allowed: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-06", expect: "Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫.", search: "Bàn phím", names: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-07", expect: "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", search: "Ban phim", allowed: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-08", expect: "Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn.", search: "", names: ALL, mount: true },
  { id: "TC-09", expect: "Empty state. Trang hiện đúng các ký tự <script>, không chạy script.", search: "<script>", names: [], empty: true, show: "<script>" },
  { id: "TC-10", expect: "Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron.", search: "a", names: WITH_A, absent: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-11", expect: "Empty state. Không tên seed nào chứa aa.", search: "aa", names: [], empty: true },
  { id: "TC-12", expect: "Empty state. Không lỗi.", search: A254, names: [], empty: true },
  { id: "TC-13", expect: "Empty state. Không lỗi.", search: A255, names: [], empty: true },
  { id: "TC-14", expect: "HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo.", api: true },
  { id: "TC-15", expect: "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", search: " ", names: [], empty: true, blocked: BLOCKED_SPACE },
  { id: "TC-16", expect: "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", search: "  ", names: [], empty: true, blocked: BLOCKED_SPACE },
  { id: "TC-17", expect: "Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text.", search: "%", names: [], empty: true, show: "%", noSql: true },
  { id: "TC-18", expect: "Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL.", search: "_", names: [], empty: true, noSql: true },
  { id: "TC-19", expect: "Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text.", search: "'", names: [], empty: true, show: "'", noSql: true },
  { id: "TC-20", expect: "Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi.", search: "a&b", names: [], empty: true, show: "a&b", absent: WITH_A },
  { id: "TC-21", expect: "Empty state. Tìm cả chuỗi a#b. Không lỗi.", search: "a#b", names: [], empty: true, show: "a#b" },
  { id: "TC-22", expect: "Empty state. Tìm cả chuỗi a?b. Không lỗi.", search: "a?b", names: [], empty: true, show: "a?b" },
  { id: "TC-23", expect: "Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text.", search: A256, names: [], empty: true, show: A256 },
  { id: "TC-24", expect: "CSDL 0 sản phẩm. Màn home không có sản phẩm và có empty state (icon/hình minh họa và message).", search: "", mount: true, products: 0, names: [], empty: true },
  { id: "TC-25", expect: "CSDL 1 sản phẩm. Danh sách có đúng iPhone 15 Pro Max, giá 30.000.000 ₫.", search: "", mount: true, products: 1, names: ["iPhone 15 Pro Max"], priceCheck: true },
  { id: "TC-26", expect: "CSDL 2 sản phẩm. Danh sách có đúng iPhone 15 Pro Max và Samsung Galaxy S24 Ultra.", search: "", mount: true, products: 2, names: ALL.slice(0, 2) },
  { id: "TC-27", expect: "Màn 320px (điện thoại nhỏ). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn.", search: "", mount: true, width: 320, names: ALL, layout: true },
  { id: "TC-28", expect: "Màn 768px (tablet). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn.", search: "", mount: true, width: 768, names: ALL, layout: true },
];

function sameNames(actual, expected) {
  const left = [...actual].sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((name, index) => name === right[index]);
}

function hasMoney(text, name) {
  const amount = PRICES[name];
  const comma = amount.replaceAll(".", ",");
  return text.includes("₫") && (text.includes(amount) || text.includes(comma));
}

function looksSql(text) {
  return /SQLITE|Database Error|syntax error/i.test(text);
}

async function readDom(page) {
  return page.evaluate(() => {
    const text = document.body.innerText;
    const h1 = [...document.querySelectorAll("h1")].map((node) => node.textContent.trim());
    const imgs = [...document.querySelectorAll("img")].map((img) => img.getAttribute("alt"));
    const cards = [...document.querySelectorAll("img")].map((img) => {
      const box = img.getBoundingClientRect();
      return { alt: img.getAttribute("alt"), x: box.x, y: box.y, w: box.width };
    });
    return { text, h1, imgs, cards };
  });
}

function judge(testCase, dom, extra) {
  const reasons = [];
  const text = dom?.text ?? "";
  const names = ALL.filter((name) => text.includes(name));
  if (testCase.names && !sameNames(names, testCase.names)) {
    reasons.push(`sản phẩm: ${names.join("; ") || "(không có)"}`);
  }
  if (testCase.allowed) {
    if (names.some(name => !testCase.allowed.includes(name))) reasons.push("sản phẩm ngoài lớp tương ứng");
    if (!names.length && !/không có|không tìm thấy|trống/i.test(text)) reasons.push("thiếu empty state");
    if (looksSql(text)) reasons.push("lỗi SQL");
  }
  for (const name of testCase.absent ?? []) {
    if (text.includes(name)) reasons.push(`vẫn thấy ${name}`);
  }
  if (testCase.names?.length) {
    for (const name of testCase.names) {
      if (text.includes(name) && !hasMoney(text, name) && (testCase.priceCheck || ["TC-01", "TC-06", "TC-08"].includes(testCase.id))) {
        reasons.push(`giá ${name} không đúng ₫`);
      }
    }
  }
  if (testCase.empty) {
    const message = /không có|không tìm thấy|trống/i.test(text);
    const icon = (dom?.imgs ?? []).some((alt) => alt && !String(alt).includes("placehold"));
    if (!message) reasons.push("không có câu empty state");
    if (!icon && !message) reasons.push("không có icon empty state");
    if (message && !(dom?.imgs ?? []).length) reasons.push("empty state không có icon");
  }
  if (testCase.alt) {
    const alts = (dom?.imgs ?? []).filter((alt) => alt != null);
    if (!alts.length || alts.some((alt) => String(alt).trim() === "")) reasons.push(`alt: ${JSON.stringify(dom?.imgs ?? [])}`);
  }
  if (testCase.h1 && (dom?.h1 ?? []).length !== 1) reasons.push(`h1 (${(dom?.h1 ?? []).length})`);
  if (testCase.loading && !extra.loadingSeen) reasons.push("không thấy loading");
  if (testCase.grid && extra.grid === false) reasons.push("các thẻ xếp một cột");
  if (testCase.show && !text.includes(testCase.show.length > 80 ? testCase.show.slice(0, 40) : testCase.show)) {
    reasons.push(`không thấy chữ từ khóa`);
  }
  if (testCase.layout && extra.layout) {
    if (extra.layout.overflow) reasons.push(`tràn ngang (scrollWidth ${extra.layout.scrollWidth} > ${extra.layout.width})`);
    if (extra.layout.clipped.length) reasons.push(`bị cắt khỏi màn: ${extra.layout.clipped.join("; ")}`);
  }
  if (testCase.noSql && looksSql(text)) reasons.push("trang lỗi SQL");
  if (looksSql(text) && testCase.names) reasons.push("thân là lỗi SQL");
  if (extra.httpStatus != null && extra.httpStatus >= 400) reasons.push(`HTTP ${extra.httpStatus}`);
  const actual = [
    names.length ? names.join("; ") : "(không có sản phẩm)",
    extra.layout ? `Viewport ${extra.layout.width}px, scrollWidth ${extra.layout.scrollWidth}.` : null,
    extra.requestUrl ? `Request: ${extra.requestUrl.slice(extra.requestUrl.indexOf("search=")).slice(0, 80)}.` : null,
    extra.httpStatus != null ? `HTTP ${extra.httpStatus}.` : null,
    looksSql(text) ? `Lỗi: ${text.replace(/\s+/g, " ").slice(0, 180)}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
  return {
    pass: reasons.length === 0,
    actual: reasons.length ? `${actual} Lệch: ${reasons.join("; ")}.` : actual,
  };
}

async function openHome(page, firstName = "iPhone 15 Pro Max") {
  const first = page.waitForResponse(
    (response) => response.url().includes("/api/products") && response.request().method() === "GET",
    { timeout: 120000 },
  );
  await page.goto(WEB, { waitUntil: "domcontentloaded", timeout: 120000 });
  await first;
  await page.getByText("Danh sách sản phẩm").waitFor({ timeout: 120000 });
  if (firstName) await page.getByText(firstName).first().waitFor();
  else await page.waitForTimeout(800);
}

async function searchUi(page, value, mount, testId) {
  let loadingSeen = false;
  const poll = setInterval(async () => {
    const text = await page.locator("body").innerText().catch(() => "");
    if (text.includes("Đang tải")) loadingSeen = true;
  }, 40);
  let requestUrl = "";
  if (!mount) {
    await page.getByPlaceholder("Tìm kiếm...").fill(value);
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/api/products") && response.url().includes("search="),
      { timeout: 20000 },
    );
    await page.getByText("Tìm", { exact: true }).click();
    const response = await responsePromise;
    requestUrl = response.url();
    console.error(`REQ ${testId} ${JSON.stringify(response.url())}`);
  }
  await page.waitForTimeout(300);
  clearInterval(poll);
  const dom = await readDom(page);
  let grid = null;
  if (mount) {
    const boxes = [];
    for (const name of ALL) {
      const box = await page.getByText(name, { exact: true }).first().boundingBox().catch(() => null);
      if (box) boxes.push(box);
    }
    grid = boxes.some((left, i) =>
      boxes.some((right, j) => i !== j && Math.abs(left.y - right.y) < 30 && Math.abs(left.x - right.x) > 40),
    );
  }
  const layout = await page.evaluate((names) => {
    const width = window.innerWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const clipped = [];
    for (const node of document.querySelectorAll("div, span")) {
      if (node.children.length) continue;
      const text = node.textContent.trim();
      if (!names.some((name) => text.includes(name)) && !text.includes("₫")) continue;
      const box = node.getBoundingClientRect();
      if (box.width && (box.left < 0 || box.right > width + 1)) clipped.push(text.slice(0, 40));
    }
    return { width, scrollWidth, overflow: scrollWidth > width, clipped };
  }, ALL);
  return { dom, loadingSeen, grid, requestUrl, layout };
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: "vi-VN" });
  page.on("dialog", (dialog) => dialog.accept());
  await page.route(`${APP_HOST}/**`, async (route) => {
    const url = route.request().url().replace(APP_HOST, API);
    if (url.includes("/api/products")) await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await route.fetch({ url });
    await route.fulfill({ response });
  });

  const results = [];
  for (const testCase of CASES) {
    let judged;
    if (testCase.api) {
      const response = await fetch(`${API}/api/products?search=iPhone&foo=1`);
      const body = await response.json();
      const names = Array.isArray(body) ? body.map((row) => row.name) : [];
      const pass = response.status < 400 && sameNames(names, ["iPhone 15 Pro Max"]);
      judged = {
        pass,
        actual: `HTTP ${response.status}. ${names.join("; ") || "(không có)"}${pass ? "" : ". Lệch: tập sản phẩm hoặc HTTP."}`,
      };
    } else {
      if (testCase.products != null) await setProducts(testCase.products);
      try {
        await page.setViewportSize({ width: testCase.width ?? 390, height: 844 });
        await openHome(page, testCase.products === 0 ? null : (testCase.names?.[0] ?? ALL[0]));
        const seen = await searchUi(page, testCase.search, testCase.mount, testCase.id);
        judged = judge(testCase, seen.dom, seen);
        if (testCase.blocked) {
          judged = { pass: false, blocked: true, actual: `${judged.actual} ${testCase.blocked}` };
        }
        if (testCase.products != null || testCase.layout) {
          await page.screenshot({ path: path.join(root, `docs/bugs/fr05-mobile-${testCase.id}.png`), fullPage: true });
        }
      } finally {
        if (testCase.products != null) await setProducts();
      }
    }
    results.push({ ...testCase, ...judged });
    const status = judged.blocked ? "BLOCKED" : judged.pass ? "PASS" : "FAIL";
    console.log(`${testCase.id}\t${status}\t${judged.actual}`);
  }
  await browser.close();

  const blocked = results.filter((result) => result.blocked).length;
  const pass = results.filter((result) => result.pass).length;
  const fail = results.length - pass - blocked;
  const lines = [
    "# FR-05 mobile — Kết quả chạy test case",
    "",
    `Chạy trên app mobile web \`${WEB}\` và API \`${API}\`. Script: \`scripts/fr05-mobile-execute.mjs\`.`,
    "",
    "App đang gọi `http://192.168.10.13:3000`. Máy này không mở được địa chỉ đó. Script chuyển host sang API local và giữ query do app tạo. Script thêm 0,5 giây vào mỗi lần gọi `/api/products` để thấy chữ \"Đang tải...\".",
    "",
    "Đây là app React Native chạy bằng `react-native-web` trong Chrome, không phải iOS hay Android thật. Vì vậy `h1`, `alt` và số cột không được chấm: app mobile không có thẻ `h1`, `react-native-web` tự sinh `<img alt=\"\">`, và README không nêu số cột trên mobile.",
    "",
    `Tổng: ${results.length}. PASS: ${pass}. FAIL: ${fail}. BLOCKED: ${blocked}.`,
    "",
    "Trong đó TC-14 là kiểm tra bổ sung query thừa, không tính vào coverage chức năng.",
    "",
    "| TC | Kết quả | Expected Result | Actual Result |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${result.id} | ${result.blocked ? "BLOCKED" : result.pass ? "PASS" : "FAIL"} | ${result.expect.replaceAll("|", "\\|")} | ${result.actual.replaceAll("|", "\\|").replaceAll("\n", " ")} |`,
    ),
    "",
  ];
  const out = path.join(root, "docs/fr-05-mobile/05-execution-results.md");
  writeFileSync(out, lines.join("\n"));
  console.log(`\n${pass} PASS, ${fail} FAIL. Ghi ${out}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
