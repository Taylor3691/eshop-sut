/**
 * Chạy bộ test case FR-11 (docs/fr-11/04-test-cases.md) trên eshop-sut local.
 *
 * Cần sẵn:
 *   backend:      node server.js          → http://localhost:3000
 *   frontend-web: npm run dev             → http://localhost:5173
 *
 * Chạy: node scripts/fr11-execute.mjs
 * UI dùng Chrome đã cài trên máy. API dùng fetch.
 * Dòng orders được chèn vào backend/database.sqlite, không qua checkout,
 * vì checkout chỉ tạo được status pending.
 */
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL ?? "http://localhost:3000";
const WEB = process.env.WEB_URL ?? "http://localhost:5173";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "backend/package.json"));
const sqlite3 = require("sqlite3");
const dbFile = path.join(root, "backend/database.sqlite");

const DATE = "2026-10-15 10:00:00";
const DATE_SHOWN = "15/10/2026";
const BASE_MONEY = "30.000.000 ₫";

function order(overrides = {}) {
  return {
    id: 1,
    user_id: 2,
    total_amount: 30000000,
    status: "pending",
    created_at: DATE,
    ...overrides,
  };
}

const CASES = [
  {
    id: "TC-01",
    ui: true,
    login: true,
    rows: [order()],
    expect: "Đúng một đơn. Mã 1. Ngày 15/10/2026. Tiền 30.000.000 ₫. Nhãn pending là tiếng Việt, có màu. Trang một h1.",
    check: { ids: [1], date: true, money: [BASE_MONEY], status: "pending", h1: 1 },
  },
  {
    id: "TC-02",
    ui: true,
    login: true,
    rows: [],
    expect: "Empty state có icon và message thân thiện. Không có bảng đơn.",
    check: { empty: true },
  },
  {
    id: "TC-03",
    ui: true,
    login: true,
    rows: [order(), order({ id: 2 })],
    expect: "Đúng hai dòng. Cả hai mã, ngày 15/10/2026, tiền 30.000.000 ₫, nhãn tiếng Việt của pending.",
    check: { ids: [1, 2], date: true, money: [BASE_MONEY, BASE_MONEY], status: "pending" },
  },
  {
    id: "TC-04",
    ui: true,
    login: true,
    rows: [order(), order({ id: 2, user_id: 1 })],
    expect: "Chỉ thấy đơn id=1. Đơn của admin không xuất hiện.",
    check: { ids: [1], absent: [2] },
  },
  {
    id: "TC-05",
    ui: true,
    login: true,
    rows: [order(), order({ id: 2, user_id: 3 })],
    expect: "Chỉ thấy đơn id=1. Đơn user_id=3 không xuất hiện.",
    check: { ids: [1], absent: [2] },
  },
  {
    id: "TC-06",
    ui: true,
    login: true,
    rows: [order({ id: 0 })],
    expect: "Thấy mã 0, ngày 15/10/2026, tiền 30.000.000 ₫.",
    check: { ids: [0], date: true, money: [BASE_MONEY] },
  },
  {
    id: "TC-07",
    ui: true,
    login: true,
    rows: [order({ id: 2 })],
    expect: "Thấy đúng một đơn, mã 2.",
    check: { ids: [2] },
  },
  {
    id: "TC-08",
    ui: true,
    login: true,
    rows: [order({ status: "confirmed" })],
    expect: "Nhãn tiếng Việt của confirmed, màu khác bốn trạng thái kia. Vẫn hiện mã, ngày, tiền chuẩn.",
    check: { ids: [1], date: true, money: [BASE_MONEY], status: "confirmed" },
  },
  {
    id: "TC-09",
    ui: true,
    login: true,
    rows: [order({ status: "shipping" })],
    expect: "Nhãn tiếng Việt của shipping, màu khác bốn trạng thái kia.",
    check: { ids: [1], status: "shipping" },
  },
  {
    id: "TC-10",
    ui: true,
    login: true,
    rows: [order({ status: "delivered" })],
    expect: "Đơn vẫn trong lịch sử. Nhãn tiếng Việt của delivered, màu khác bốn trạng thái kia.",
    check: { ids: [1], status: "delivered" },
  },
  {
    id: "TC-11",
    ui: true,
    login: true,
    rows: [order({ status: "canceled" })],
    expect: "Đơn vẫn trong lịch sử. Nhãn tiếng Việt của canceled, màu khác bốn trạng thái kia.",
    check: { ids: [1], status: "canceled" },
  },
  ...[
    [-1, "-1 ₫"],
    [0, "0 ₫"],
    [1, "1 ₫"],
    [999, "999 ₫"],
    [1000, "1.000 ₫"],
    [1001, "1.001 ₫"],
    [999999, "999.999 ₫"],
    [1000000, "1.000.000 ₫"],
    [1000001, "1.000.001 ₫"],
  ].map(([amount, shown], index) => ({
    id: `TC-${12 + index}`,
    ui: true,
    login: true,
    rows: [order({ total_amount: amount })],
    expect: `Tiền hiện ${shown}.`,
    check: { ids: [1], money: [shown] },
  })),
  {
    id: "TC-21",
    ui: true,
    login: true,
    rows: [order({ created_at: null })],
    expect: "Đơn vẫn hiện mã, tiền 30.000.000 ₫, nhãn pending. Ô ngày không bịa một ngày. Trang không lỗi.",
    check: { ids: [1], money: [BASE_MONEY], status: "pending", noDate: true, noPageError: true },
  },
  {
    id: "TC-22",
    ui: true,
    login: true,
    rows: [order({ total_amount: null })],
    expect: "Đơn vẫn hiện mã, ngày 15/10/2026, nhãn pending. Ô tiền không hiện 0 ₫. Trang không lỗi.",
    check: { ids: [1], date: true, status: "pending", notMoney: ["0 ₫"], noPageError: true },
  },
  {
    id: "TC-23",
    ui: true,
    login: true,
    rows: [order({ status: "returned" })],
    expect: "Đơn vẫn hiện mã, ngày, tiền chuẩn. Nhãn không phải nhãn của năm trạng thái FR-10. Trang không lỗi.",
    check: { ids: [1], date: true, money: [BASE_MONEY], notFiveLabels: true, noPageError: true },
  },
  {
    id: "TC-24",
    ui: true,
    login: false,
    rows: [order()],
    expect: "Không thấy mã 1 và không thấy 30.000.000 ₫.",
    check: { hidden: ["#1", BASE_MONEY] },
  },
  {
    id: "TC-25",
    ui: false,
    rows: [order()],
    expect: "Bị từ chối. Thân response không phải danh sách chứa đơn id=1.",
    check: { reject: true },
  },
  {
    id: "TC-26",
    ui: false,
    rows: [order()],
    token: "not-a-jwt",
    expect: "Bị từ chối. Thân response không phải danh sách chứa đơn id=1.",
    check: { reject: true },
  },
  {
    id: "TC-27",
    ui: false,
    rows: [order()],
    query: { user_id: "1" },
    expect: "HTTP không phải lỗi. JSON chỉ có đơn id=1 của user 2, giống lúc không gửi query.",
    check: { apiIds: [1], apiUsers: [2] },
  },
];

function openDb() {
  return new sqlite3.Database(dbFile);
}

function dbAll(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

function dbRun(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

async function replaceOrders(rows) {
  const db = openDb();
  try {
    await dbRun(db, "DELETE FROM orders");
    for (const row of rows) {
      await dbRun(
        db,
        `INSERT INTO orders (id, user_id, total_amount, status, shipping_address, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [row.id, row.user_id, row.total_amount, row.status, "123 Le Loi", row.created_at],
      );
    }
    return await dbAll(db, "SELECT id, user_id, total_amount, status, created_at FROM orders ORDER BY id");
  } finally {
    await new Promise((resolve) => db.close(resolve));
  }
}

function norm(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function isVietnamese(label) {
  return /[^\u0000-\u007F]/.test(label);
}

function looksLikeDate(text) {
  return /\d{1,4}/.test(text) && /\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|\d{4}[/.-]\d{1,2}[/.-]\d{1,2}/.test(text);
}

async function readHistory(page) {
  return page.evaluate(() => {
    const heading = [...document.querySelectorAll("h2")].find((node) =>
      node.textContent.includes("Lịch sử đơn hàng"),
    );
    const card = heading?.parentElement ?? null;
    const rows = [...(card?.querySelectorAll("tbody tr") ?? [])].map((tr) => {
      const cells = [...tr.querySelectorAll("td")].map((td) => td.textContent.trim());
      const badge = tr.querySelector("span");
      const style = badge ? getComputedStyle(badge) : null;
      return {
        code: cells[0] ?? "",
        date: cells[1] ?? "",
        money: cells[2] ?? "",
        label: badge?.textContent?.trim() ?? cells[3] ?? "",
        bg: style?.backgroundColor ?? "",
        fg: style?.color ?? "",
      };
    });
    return {
      rows,
      h1: [...document.querySelectorAll("h1")].map((node) => node.textContent.trim()),
      loggedOut: document.body.innerText.includes("Vui lòng đăng nhập"),
      historyText: card?.innerText ?? "",
      hasIcon: !!card?.querySelector("img, svg"),
      hasTable: !!card?.querySelector("table"),
      pageError: /Database Error|SQLITE|TypeError|Cannot read/i.test(document.body.innerText),
      bodyText: document.body.innerText,
    };
  });
}

function judgeUi(dom, testCase, fiveLabels) {
  const reasons = [];
  const codes = dom.rows.map((row) => row.code);
  const { check } = testCase;

  if (check.ids) {
    const wanted = check.ids.map((id) => `#${id}`).sort();
    const seen = [...codes].sort();
    if (seen.length !== wanted.length || wanted.some((code, i) => seen[i] !== code)) {
      reasons.push(`mã thấy ${codes.join(", ") || "(không có)"}`);
    }
  }
  if (check.absent) {
    for (const id of check.absent) {
      if (codes.includes(`#${id}`)) reasons.push(`vẫn thấy #${id}`);
    }
  }
  if (check.date && dom.rows.some((row) => !row.date.includes(DATE_SHOWN))) {
    reasons.push(`ngày thấy ${dom.rows.map((row) => row.date).join(", ") || "(trống)"}`);
  }
  if (check.money) {
    const seen = dom.rows.map((row) => norm(row.money));
    const wanted = check.money.map(norm);
    if (seen.length !== wanted.length || wanted.some((money, i) => seen[i] !== money)) {
      reasons.push(`tiền thấy ${seen.join(", ") || "(trống)"}`);
    }
  }
  if (check.notMoney) {
    const seen = dom.rows.map((row) => norm(row.money));
    for (const money of check.notMoney.map(norm)) {
      if (seen.includes(money)) reasons.push(`tiền bịa ${money}`);
    }
  }
  if (check.status) {
    for (const row of dom.rows) {
      if (!isVietnamese(row.label) || row.label.toLowerCase() === check.status) {
        reasons.push(`nhãn "${row.label}" không phải tiếng Việt của ${check.status}`);
      }
      if (!row.bg || row.bg === "rgba(0, 0, 0, 0)") reasons.push("không có màu");
    }
  }
  if (check.noDate && dom.rows.some((row) => looksLikeDate(row.date))) {
    reasons.push(`ô ngày bịa "${dom.rows.map((row) => row.date).join(", ")}"`);
  }
  if (check.notFiveLabels) {
    for (const row of dom.rows) {
      if (fiveLabels.includes(row.label)) reasons.push(`nhãn trùng một trạng thái FR-10: ${row.label}`);
    }
  }
  if (check.noPageError && dom.pageError) reasons.push("trang lỗi");
  if (check.h1 != null && dom.h1.length !== check.h1) {
    reasons.push(`h1 (${dom.h1.length}): ${dom.h1.join(" | ") || "(không có)"}`);
  }
  if (check.empty) {
    if (dom.hasTable) reasons.push("vẫn có bảng đơn");
    if (!dom.hasIcon) reasons.push("không có icon");
    const message = norm(dom.historyText.replace("Lịch sử đơn hàng", ""));
    if (!message) reasons.push("không có message");
  }
  if (check.hidden) {
    for (const piece of check.hidden) {
      if (dom.bodyText.includes(piece)) reasons.push(`vẫn thấy ${piece}`);
    }
  }

  const actual = dom.loggedOut && !dom.rows.length
    ? "Trang yêu cầu đăng nhập. Không có bảng đơn."
    : [
        dom.rows.length
          ? dom.rows
              .map((row) => `${row.code} | ${row.date || "(không ngày)"} | ${norm(row.money) || "(không tiền)"} | ${row.label}`)
              .join(" ; ")
          : "(không có đơn)",
        check.h1 != null ? `h1 (${dom.h1.length}): ${dom.h1.join(" | ") || "(không có)"}` : null,
        check.empty
          ? `icon: ${dom.hasIcon ? "có" : "không"}. message: ${JSON.stringify(norm(dom.historyText))}`
          : null,
        dom.pageError ? "Có lỗi trên trang." : null,
      ]
        .filter(Boolean)
        .join(". ");

  return { pass: reasons.length === 0, actual: reasons.length ? `${actual}. Lệch: ${reasons.join("; ")}.` : actual, color: dom.rows[0] ? `${dom.rows[0].bg}|${dom.rows[0].fg}` : "" };
}

function judgeApi(body, testCase) {
  const list = Array.isArray(body.json) ? body.json : null;
  const ids = list ? list.map((row) => row.id) : [];
  if (testCase.check.reject) {
    const leaked = list?.some((row) => row.id === 1);
    const pass = body.status >= 400 && !leaked;
    return {
      pass,
      actual: `HTTP ${body.status}. ${list ? `Đơn: ${ids.join(", ") || "(rỗng)"}.` : body.text.replace(/\s+/g, " ").slice(0, 180)}`,
    };
  }
  const users = list ? list.map((row) => row.user_id) : [];
  const pass =
    body.status < 400 &&
    list != null &&
    ids.length === testCase.check.apiIds.length &&
    testCase.check.apiIds.every((id, i) => ids[i] === id) &&
    testCase.check.apiUsers.every((id, i) => users[i] === id);
  return {
    pass,
    actual: `HTTP ${body.status}. Đơn: ${list ? ids.map((id, i) => `#${id} user ${users[i]}`).join(", ") || "(rỗng)" : "không phải JSON"}.`,
  };
}

async function login(page) {
  await page.goto(`${WEB}/login`, { waitUntil: "domcontentloaded" });
  const inputs = page.locator("form input");
  await inputs.nth(0).fill("test@eshop.com");
  await inputs.nth(1).fill("Test1234!");
  await page.locator("form button[type=submit]").click();
  await page.waitForFunction(() => localStorage.getItem("token"));
}

async function openProfile(page) {
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes("/api/orders/my-orders") && response.request().method() === "GET",
  );
  await page.goto(`${WEB}/profile`, { waitUntil: "domcontentloaded" });
  await responsePromise;
  await page.getByRole("heading", { name: "Lịch sử đơn hàng" }).waitFor();
}

async function main() {
  const db = openDb();
  const users = await dbAll(db, "SELECT id, email FROM users ORDER BY id");
  await new Promise((resolve) => db.close(resolve));
  const testUser = users.find((user) => user.email === "test@eshop.com");
  if (!testUser || testUser.id !== 2) {
    throw new Error(`Cần test@eshop.com có id 2. Đang có: ${JSON.stringify(users)}`);
  }

  const loginRes = await fetch(`${API}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }),
  });
  const loginBody = await loginRes.json();
  if (!loginRes.ok) throw new Error(`Đăng nhập API thất bại: ${JSON.stringify(loginBody)}`);
  const token = loginBody.token;

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ locale: "vi-VN", timezoneId: "Asia/Ho_Chi_Minh" });
  const page = await context.newPage();
  await login(page);

  const results = [];
  const fiveLabels = [];

  for (const testCase of CASES) {
    const stored = await replaceOrders(testCase.rows);
    if (testCase.ui && testCase.login) {
      const dom = await openProfile(page).then(() => readHistory(page));
      const judged = judgeUi(dom, testCase, fiveLabels);
      if (testCase.check.status && dom.rows[0]) {
        fiveLabels.push(dom.rows[0].label);
        judged.status = testCase.check.status;
        judged.colorKey = judged.color;
      }
      results.push({ ...testCase, ...judged, stored });
    } else if (testCase.ui) {
      const guest = await browser.newContext({ locale: "vi-VN", timezoneId: "Asia/Ho_Chi_Minh" });
      const guestPage = await guest.newPage();
      await guestPage.goto(`${WEB}/profile`, { waitUntil: "domcontentloaded" });
      await guestPage.getByText("Vui lòng đăng nhập").waitFor();
      const dom = await readHistory(guestPage);
      results.push({ ...testCase, ...judgeUi(dom, testCase, fiveLabels), stored });
      await guest.close();
    } else {
      const headers = {};
      if (testCase.token) headers.Authorization = `Bearer ${testCase.token}`;
      else if (testCase.id !== "TC-25") headers.Authorization = `Bearer ${token}`;
      const url = new URL(`${API}/api/orders/my-orders`);
      for (const [key, value] of Object.entries(testCase.query ?? {})) url.searchParams.append(key, value);
      const response = await fetch(url, { headers });
      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }
      results.push({
        ...testCase,
        ...judgeApi({ status: response.status, text, json }, testCase),
        stored,
      });
    }
    console.log(`${testCase.id}\t${results.at(-1).pass ? "PASS" : "FAIL"}\t${results.at(-1).actual}`);
  }

  const palette = new Map();
  for (const result of results) {
    if (!result.status || !result.colorKey) continue;
    const group = palette.get(result.colorKey) ?? [];
    group.push(result);
    palette.set(result.colorKey, group);
  }
  for (const group of palette.values()) {
    const statuses = new Set(group.map((result) => result.status));
    if (statuses.size < 2) continue;
    for (const result of group) {
      result.pass = false;
      result.actual += " Lệch: màu trùng một trạng thái khác.";
    }
  }

  await browser.close();
  await replaceOrders([]);

  const pass = results.filter((result) => result.pass).length;
  const fail = results.length - pass;
  const lines = [
    "# FR-11 — Kết quả chạy test case",
    "",
    `Chạy trên API \`${API}\` và UI \`${WEB}\`. Script: \`scripts/fr11-execute.mjs\`.`,
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
  const out = path.join(root, "docs/fr-11/05-execution-results.md");
  writeFileSync(out, lines.join("\n"));
  console.log(`\n${pass} PASS, ${fail} FAIL. Ghi ${out}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
