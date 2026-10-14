/**
 * Chạy bộ test case FR-05 (docs/fr-05/04-test-cases.md) trên eshop-sut local.
 *
 * Cần sẵn:
 *   backend:      node server.js          → http://localhost:3000
 *   frontend-web: npm run dev             → http://localhost:5173
 *
 * Chạy: node scripts/fr05-execute.mjs
 * UI dùng Chrome đã cài trên máy. API dùng fetch.
 */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = process.env.API_URL ?? "http://localhost:3000";
const WEB = process.env.WEB_URL ?? "http://localhost:5173";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const IPHONE = ["iPhone 15 Pro Max"];
const KEYCHRON = ["Bàn phím cơ Keychron Q1"];
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
  "iPhone 15 Pro Max": 30000000,
  "Samsung Galaxy S24 Ultra": 28000000,
  "MacBook Pro M3": 45000000,
  "Tai nghe AirPods Pro 2": 6000000,
  "Bàn phím cơ Keychron Q1": 4000000,
};

const BLOCKED =
  "Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit.";

function sameNames(actual, expected) {
  const a = [...actual].sort();
  const b = [...expected].sort();
  return a.length === b.length && a.every((name, i) => name === b[i]);
}

function priceOk(shown, amount) {
  const digits = String(amount);
  const dot = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const comma = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return shown.includes("₫") && (shown.includes(dot) || shown.includes(comma));
}

function list(names) {
  return names.length ? names.join("; ") : "(không có sản phẩm)";
}

async function apiGet(params) {
  const url = new URL(`${API}/api/products`);
  for (const [key, value] of Object.entries(params)) {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) url.searchParams.append(key, String(item));
  }
  const response = await fetch(url);
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return {
    status: response.status,
    text,
    names: Array.isArray(json) ? json.map((row) => row.name) : null,
    isHtml: text.includes("<h1>"),
  };
}

function judgeApi(body, expectNames) {
  if (body.names == null) {
    const snippet = body.text.replace(/\s+/g, " ").slice(0, 180);
    return {
      pass: false,
      actual: `HTTP ${body.status}, không phải JSON. ${snippet}`,
    };
  }
  const namesPass = sameNames(body.names, expectNames);
  const httpPass = body.status < 400;
  return {
    pass: namesPass && httpPass,
    actual: `HTTP ${body.status}. Sản phẩm: ${list(body.names)}.`,
  };
}

async function readDom(page) {
  return page.evaluate(() => {
    const cards = [...document.querySelectorAll("h2")].map((heading) => {
      const card = heading.closest("div.border");
      return {
        name: heading.textContent.trim(),
        price: card?.querySelector("p")?.textContent?.trim() ?? "",
        alt: card?.querySelector("img")?.getAttribute("alt"),
      };
    });
    const echo = [...document.querySelectorAll("div")].find((node) =>
      node.childNodes.length &&
      [...node.childNodes].some(
        (child) =>
          child.nodeType === Node.TEXT_NODE &&
          child.textContent.includes("Kết quả tìm kiếm cho:"),
      ),
    );
    const span = echo?.querySelector("span");
    const error = document.querySelector(".bg-red-100");
    return {
      cards,
      h1: [...document.querySelectorAll("h1")].map((node) => node.textContent.trim()),
      echoText: span?.textContent ?? null,
      echoHtml: span?.innerHTML ?? null,
      errorText: error?.innerText?.replace(/\s+/g, " ").trim().slice(0, 240) ?? null,
      bodyText: document.body.innerText,
    };
  });
}

function hasEmptyMessage(dom) {
  return /không có kết quả|không tìm thấy|không có sản phẩm|empty state|no results/i.test(
    dom.bodyText,
  );
}

async function runUi(page, search, { watchLoading = false } = {}) {
  let loadingSeen = false;
  if (watchLoading) {
    await page.route("**/api/products**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    });
  }

  const noticeLoading = async () => {
    const text = await page.locator("body").innerText().catch(() => "");
    if (/đang tải|loading/i.test(text)) loadingSeen = true;
    const busy = await page.locator("[aria-busy='true']").count().catch(() => 0);
    if (busy > 0) loadingSeen = true;
  };

  await page.goto(WEB, { waitUntil: "domcontentloaded" });
  if (watchLoading) {
    for (let i = 0; i < 12; i += 1) {
      await noticeLoading();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  await page.waitForLoadState("networkidle");
  await page.getByPlaceholder("Tìm kiếm...").fill(search);
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/products") && response.request().method() === "GET",
  );
  await page.getByRole("button", { name: "Tìm" }).click();
  if (watchLoading) {
    for (let i = 0; i < 12; i += 1) {
      await noticeLoading();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  const response = await responsePromise;
  await page.waitForTimeout(300);
  const dom = await readDom(page);
  dom.loadingSeen = loadingSeen;
  dom.httpStatus = response.status();
  if (watchLoading) await page.unroute("**/api/products**");
  return dom;
}

function uiActual(dom, extra = "") {
  const parts = [
    `Sản phẩm: ${list(dom.cards.map((card) => card.name))}.`,
    dom.cards.length
      ? `Giá: ${dom.cards.map((card) => `${card.name} = ${card.price}`).join("; ")}.`
      : null,
    dom.cards.length
      ? `alt: ${dom.cards.map((card) => JSON.stringify(card.alt)).join(", ")}.`
      : null,
    `h1 (${dom.h1.length}): ${dom.h1.join(" | ") || "(không có)"}.`,
    `Loading: ${dom.loadingSeen ? "có" : "không thấy"}.`,
    `Echo text: ${dom.echoText == null ? "(không có)" : JSON.stringify(dom.echoText)}.`,
    dom.errorText ? `Khối lỗi: ${dom.errorText}.` : "Không có khối lỗi SQL/HTML.",
    hasEmptyMessage(dom) ? "Có thông báo empty state." : "Không có thông báo empty state.",
    extra,
  ];
  return parts.filter(Boolean).join(" ");
}

const cases = [
  {
    id: "TC-01",
    kind: "ui",
    search: "iPhone",
    watchLoading: true,
    expected:
      "Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Ảnh có alt mô tả. Đúng một h1. Có loading. Chữ iPhone hiện dạng text.",
    judge(dom) {
      const namesOk = sameNames(dom.cards.map((card) => card.name), IPHONE);
      const price = dom.cards[0]?.price ?? "";
      const alt = dom.cards[0]?.alt ?? "";
      const checks = [
        namesOk,
        priceOk(price, 30000000),
        alt.trim().length > 0,
        dom.h1.length === 1,
        dom.loadingSeen,
        dom.echoText === "iPhone",
        !dom.errorText,
      ];
      return { pass: checks.every(Boolean), actual: uiActual(dom) };
    },
  },
  {
    id: "TC-02",
    kind: "ui",
    search: "iPhone 15 Pro Max",
    expected: "Chỉ đúng một sản phẩm iPhone 15 Pro Max.",
    judge(dom) {
      return {
        pass: sameNames(dom.cards.map((card) => card.name), IPHONE) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-03",
    kind: "ui",
    search: "zzzz-khong-co",
    expected: "Có thông báo empty state. Không hiện năm sản phẩm. N = 0.",
    judge(dom) {
      const empty = dom.cards.length === 0;
      return {
        pass: empty && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-04",
    kind: "ui",
    search: "iphone",
    expected: "Empty state. iPhone 15 Pro Max không được trả về chỉ vì khác hoa thường.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-05",
    kind: "ui",
    search: "CƠ",
    expected: "Empty state. Bàn phím cơ Keychron Q1 không được trả về chỉ vì khác hoa thường ở chữ ơ.",
    judge(dom) {
      const leaked = dom.cards.some((card) => card.name === KEYCHRON[0]);
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !leaked && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-06",
    kind: "ui",
    search: "Bàn phím",
    expected: "Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫.",
    judge(dom) {
      const price = dom.cards[0]?.price ?? "";
      return {
        pass:
          sameNames(dom.cards.map((card) => card.name), KEYCHRON) &&
          priceOk(price, 4000000) &&
          !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-07",
    kind: "ui",
    search: "Ban phim",
    expected: "Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-08",
    kind: "ui",
    search: "",
    expected: "Đủ 5 sản phẩm seed, mỗi giá có ₫ và phân cách hàng nghìn.",
    judge(dom) {
      const namesOk = sameNames(dom.cards.map((card) => card.name), ALL);
      const pricesOk = ALL.every((name) => {
        const card = dom.cards.find((item) => item.name === name);
        return card && priceOk(card.price, PRICES[name]);
      });
      return { pass: namesOk && pricesOk && !dom.errorText, actual: uiActual(dom) };
    },
  },
  {
    id: "TC-09",
    kind: "ui",
    search: "<script>",
    expected: "Empty state. Trang hiện đúng các ký tự <script>, không chạy script.",
    judge(dom) {
      const shown = (dom.echoText ?? "").includes("<script>");
      const ran = (dom.echoHtml ?? "").includes("<script") && (dom.echoText ?? "") === "";
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && shown && !dom.errorText,
        actual: uiActual(dom, ran ? "HTML đã nuốt thẻ script." : ""),
      };
    },
  },
  {
    id: "TC-10",
    kind: "ui",
    search: "a",
    expected:
      "Có iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, Tai nghe AirPods Pro 2. Không có Bàn phím cơ Keychron Q1.",
    judge(dom) {
      return {
        pass: sameNames(dom.cards.map((card) => card.name), WITH_A) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-11",
    kind: "ui",
    search: "aa",
    expected: "Empty state. Không tên seed nào chứa aa.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-12",
    kind: "ui",
    search: "a".repeat(254),
    expected: "Empty state. Không lỗi.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-13",
    kind: "ui",
    search: "a".repeat(255),
    expected: "Empty state. Không lỗi.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  ...[
    ["TC-14", { search: "iPhone", min_price: "4000000", max_price: "45000000" }, "JSON chỉ có iPhone 15 Pro Max. HTTP không phải lỗi."],
    ["TC-15", { search: "iPhone", min_price: "1", max_price: "45000000" }, "Cùng tập TC-14."],
    ["TC-16", { search: "iPhone", min_price: "3999999", max_price: "45000000" }, "Cùng tập TC-14."],
    ["TC-17", { search: "iPhone", min_price: "4000001", max_price: "45000000" }, "Cùng tập TC-14."],
    ["TC-18", { search: "iPhone", min_price: "4000000", max_price: "44999999" }, "Cùng tập TC-14."],
    ["TC-19", { search: "iPhone", min_price: "4000000", max_price: "45000001" }, "Cùng tập TC-14."],
    ["TC-20", { search: "iPhone", min_price: "45000000", max_price: "45000000" }, "Cùng tập TC-14. Hai đầu bằng nhau không làm rỗng kết quả."],
    ["TC-21", { search: "iPhone", min_price: "44999999", max_price: "45000000" }, "Cùng tập TC-14."],
    ["TC-22", { search: "iPhone", category: "1" }, "Cùng tập TC-01. category=1 không đổi tập iPhone."],
    ["TC-32", { search: "iPhone", min_price: "-1", max_price: "45000000" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-33", { search: "iPhone", max_price: "-1" }, "Cùng tập TC-01. Không gửi min_price."],
    ["TC-34", { search: "iPhone", min_price: "0", max_price: "45000000" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-35", { search: "iPhone", max_price: "0" }, "Cùng tập TC-01. Không gửi min_price."],
    ["TC-36", { search: "iPhone", min_price: "abc", max_price: "45000000" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-37", { search: "iPhone", min_price: "4000000", max_price: "abc" }, "Cùng tập TC-01. Chỉ max_price sai kiểu."],
    ["TC-38", { search: "iPhone", min_price: "100@", max_price: "45000000" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-39", { search: "iPhone", min_price: "4000000", max_price: "100@" }, "Cùng tập TC-01. Chỉ max_price sai kiểu."],
    ["TC-40", { search: "iPhone", min_price: "45000001", max_price: "45000000" }, "Chỉ quan hệ đảo. JSON vẫn chỉ có iPhone 15 Pro Max."],
    ["TC-41", { search: "iPhone", category: "999" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-42", { search: "iPhone", category: ["1", "2"] }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-43", { search: "iPhone", sort: "price_asc" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-44", { search: "iPhone", page: "0" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
    ["TC-45", { search: "iPhone", page: "-1" }, "JSON chỉ có iPhone 15 Pro Max. Không lỗi."],
  ].map(([id, params, expected]) => ({
    id,
    kind: "api",
    params,
    expected,
    expectNames: IPHONE,
  })),
  {
    id: "TC-27",
    kind: "ui",
    search: "   ",
    expected: "Empty state. Không hiện đủ 5 sản phẩm như từ khóa rỗng. Không lỗi.",
    judge(dom) {
      return {
        pass:
          dom.cards.length === 0 &&
          hasEmptyMessage(dom) &&
          !dom.errorText &&
          !sameNames(dom.cards.map((card) => card.name), ALL),
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-28",
    kind: "ui",
    search: "%",
    expected: "Empty state. % không trả về mọi sản phẩm. Không lỗi SQL. Ký tự % hiện dạng text.",
    judge(dom) {
      const notAll = !sameNames(dom.cards.map((card) => card.name), ALL);
      return {
        pass:
          dom.cards.length === 0 &&
          notAll &&
          hasEmptyMessage(dom) &&
          !dom.errorText &&
          dom.echoText === "%",
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-29",
    kind: "ui",
    search: "_",
    expected: "Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL.",
    judge(dom) {
      return {
        pass: dom.cards.length === 0 && hasEmptyMessage(dom) && !dom.errorText,
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-30",
    kind: "ui",
    search: "'",
    expected: "Empty state. Không trả trang lỗi SQL. Dấu ' hiện dạng text.",
    judge(dom) {
      return {
        pass:
          dom.cards.length === 0 &&
          hasEmptyMessage(dom) &&
          !dom.errorText &&
          dom.echoText === "'",
        actual: uiActual(dom),
      };
    },
  },
  {
    id: "TC-31",
    kind: "ui",
    search: "a".repeat(256),
    expected: "Empty state. Không báo lỗi độ dài. Chuỗi hiện dạng text.",
    judge(dom) {
      return {
        pass:
          dom.cards.length === 0 &&
          hasEmptyMessage(dom) &&
          !dom.errorText &&
          dom.echoText === "a".repeat(256),
        actual: uiActual(dom),
      };
    },
  },
  ...["TC-23", "TC-24", "TC-25", "TC-26", "TC-46"].map((id) => ({
    id,
    kind: "blocked",
    expected: "Phụ thuộc L. Xem docs/fr-05/04-test-cases.md.",
  })),
];

async function waitFor(url) {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status < 500) return;
    } catch {
      // server chưa nghe cổng
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Không kết nối được ${url}`);
}

function mdCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

async function main() {
  await waitFor(`${API}/api/products`);
  await waitFor(WEB);

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ locale: "vi-VN" });
  const results = [];

  for (const testCase of cases) {
    if (testCase.kind === "blocked") {
      results.push({
        id: testCase.id,
        result: "BLOCKED",
        expected: testCase.expected,
        actual: BLOCKED,
      });
      console.log(`${testCase.id}\tBLOCKED\t${BLOCKED}`);
      continue;
    }

    let judged;
    if (testCase.kind === "api") {
      const body = await apiGet(testCase.params);
      judged = judgeApi(body, testCase.expectNames);
    } else {
      const dom = await runUi(page, testCase.search, {
        watchLoading: Boolean(testCase.watchLoading),
      });
      judged = testCase.judge(dom);
    }
    const result = judged.pass ? "PASS" : "FAIL";
    results.push({
      id: testCase.id,
      result,
      expected: testCase.expected,
      actual: judged.actual,
    });
    console.log(`${testCase.id}\t${result}\t${judged.actual}`);
  }

  await browser.close();

  const pass = results.filter((row) => row.result === "PASS").length;
  const fail = results.filter((row) => row.result === "FAIL").length;
  const blocked = results.filter((row) => row.result === "BLOCKED").length;
  const lines = [
    "# FR-05 — Kết quả chạy test case",
    "",
    `Chạy trên API \`${API}\` và UI \`${WEB}\`. Script: \`scripts/fr05-execute.mjs\`.`,
    "",
    `Tổng: ${results.length}. PASS: ${pass}. FAIL: ${fail}. BLOCKED: ${blocked}.`,
    "",
    "TC-23, TC-24, TC-25, TC-26 và TC-46 không chạy vì precondition dùng ký hiệu `L`, chưa có số Limit.",
    "",
    "| TC | Kết quả | Expected Result | Actual Result |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (row) =>
        `| ${row.id} | ${row.result} | ${mdCell(row.expected)} | ${mdCell(row.actual)} |`,
    ),
    "",
  ];
  const out = path.join(root, "docs/fr-05/05-execution-results.md");
  writeFileSync(out, lines.join("\n"));
  console.log(`\nPASS ${pass}  FAIL ${fail}  BLOCKED ${blocked}`);
  console.log(`Đã ghi ${out}`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
