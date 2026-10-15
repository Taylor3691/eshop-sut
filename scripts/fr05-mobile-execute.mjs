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
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL ?? "http://127.0.0.1:3000";
const WEB = process.env.MOBILE_WEB_URL ?? "http://127.0.0.1:8081";
const APP_HOST = "http://192.168.10.13:3000";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const A254 = "a".repeat(254);
const A255 = "a".repeat(255);
const A256 = "a".repeat(256);

const CASES = [
  { id: "TC-01", expect: "Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Ảnh có alt mô tả. Danh sách dạng lưới. Đúng một h1. Có loading. Chữ iPhone hiện dạng text.", search: "iPhone", names: ["iPhone 15 Pro Max"], ui: true, alt: true, grid: true, h1: true, loading: true, show: "iPhone" },
  { id: "TC-02", expect: "Chỉ đúng một sản phẩm iPhone 15 Pro Max.", search: "iPhone 15 Pro Max", names: ["iPhone 15 Pro Max"] },
  { id: "TC-03", expect: "Có empty state. Không hiện năm sản phẩm seed.", search: "zzzz-khong-co", names: [], empty: true },
  { id: "TC-04", expect: "Empty state. iPhone 15 Pro Max không được trả về chỉ vì khác hoa thường.", search: "iphone", names: [], empty: true, absent: ["iPhone 15 Pro Max"] },
  { id: "TC-05", expect: "Empty state. Bàn phím cơ Keychron Q1 không được trả về chỉ vì khác hoa thường ở chữ ơ.", search: "CƠ", names: [], empty: true, absent: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-06", expect: "Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫.", search: "Bàn phím", names: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-07", expect: "Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu.", search: "Ban phim", names: [], empty: true, absent: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-08", expect: "Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn.", search: "", names: ALL, mount: true },
  { id: "TC-09", expect: "Empty state. Trang hiện đúng các ký tự <script>, không chạy script.", search: "<script>", names: [], empty: true, show: "<script>" },
  { id: "TC-10", expect: "Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron.", search: "a", names: WITH_A, absent: ["Bàn phím cơ Keychron Q1"] },
  { id: "TC-11", expect: "Empty state. Không tên seed nào chứa aa.", search: "aa", names: [], empty: true },
  { id: "TC-12", expect: "Empty state. Không lỗi.", search: A254, names: [], empty: true },
  { id: "TC-13", expect: "Empty state. Không lỗi.", search: A255, names: [], empty: true },
  { id: "TC-14", expect: "HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo.", api: true },
  { id: "TC-15", expect: "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", search: " ", names: [], empty: true },
  { id: "TC-16", expect: "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", search: "  ", names: [], empty: true },
  { id: "TC-17", expect: "Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text.", search: "%", names: [], empty: true, show: "%", noSql: true },
  { id: "TC-18", expect: "Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL.", search: "_", names: [], empty: true, noSql: true },
  { id: "TC-19", expect: "Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text.", search: "'", names: [], empty: true, show: "'", noSql: true },
  { id: "TC-20", expect: "Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi.", search: "a&b", names: [], empty: true, show: "a&b", absent: WITH_A },
  { id: "TC-21", expect: "Empty state. Tìm cả chuỗi a#b. Không lỗi.", search: "a#b", names: [], empty: true, show: "a#b" },
  { id: "TC-22", expect: "Empty state. Tìm cả chuỗi a?b. Không lỗi.", search: "a?b", names: [], empty: true, show: "a?b" },
  { id: "TC-23", expect: "Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text.", search: A256, names: [], empty: true, show: A256 },
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
  for (const name of testCase.absent ?? []) {
    if (text.includes(name)) reasons.push(`vẫn thấy ${name}`);
  }
  if (testCase.names?.length) {
    for (const name of testCase.names) {
      if (text.includes(name) && !hasMoney(text, name) && ["TC-01", "TC-06", "TC-08"].includes(testCase.id)) {
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
  if (testCase.noSql && looksSql(text)) reasons.push("trang lỗi SQL");
  if (looksSql(text) && testCase.names) reasons.push("thân là lỗi SQL");
  if (extra.httpStatus != null && extra.httpStatus >= 400) reasons.push(`HTTP ${extra.httpStatus}`);
  const actual = [
    names.length ? names.join("; ") : "(không có sản phẩm)",
    dom ? `h1 (${dom.h1.length}).` : null,
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

async function openHome(page) {
  const first = page.waitForResponse(
    (response) => response.url().includes("/api/products") && response.request().method() === "GET",
    { timeout: 120000 },
  );
  await page.goto(WEB, { waitUntil: "domcontentloaded", timeout: 120000 });
  await first;
  await page.getByText("Danh sách sản phẩm").waitFor({ timeout: 120000 });
  await page.getByText("iPhone 15 Pro Max").waitFor();
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
  return { dom, loadingSeen, grid, requestUrl };
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
      await openHome(page);
      const seen = await searchUi(page, testCase.search, testCase.mount, testCase.id);
      if (testCase.id === "TC-01") {
        const box = await page.getByText("iPhone 15 Pro Max", { exact: true }).first().boundingBox().catch(() => null);
        const image = seen.dom.cards[0];
        seen.grid = Boolean(image && image.w > 0 && image.w < 220);
      }
      judged = judge(testCase, seen.dom, seen);
    }
    results.push({ ...testCase, ...judged });
    console.log(`${testCase.id}\t${judged.pass ? "PASS" : "FAIL"}\t${judged.actual}`);
  }
  await browser.close();

  const pass = results.filter((result) => result.pass).length;
  const fail = results.length - pass;
  const lines = [
    "# FR-05 mobile — Kết quả chạy test case",
    "",
    `Chạy trên app mobile web \`${WEB}\` và API \`${API}\`. Script: \`scripts/fr05-mobile-execute.mjs\`.`,
    "",
    "App đang gọi `http://192.168.10.13:3000`. Máy này không mở được địa chỉ đó. Script chuyển host sang API local và giữ query do app tạo.",
    "",
    `Tổng: ${results.length}. PASS: ${pass}. FAIL: ${fail}. BLOCKED: 0.`,
    "",
    "| TC | Kết quả | Expected Result | Actual Result |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${result.id} | ${result.pass ? "PASS" : "FAIL"} | ${result.expect.replaceAll("|", "\\|")} | ${result.actual.replaceAll("|", "\\|").replaceAll("\n", " ")} |`,
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
