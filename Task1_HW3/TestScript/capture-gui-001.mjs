import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, firefox } from "playwright";
import { products, testUser } from "./lib/test-data.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(scriptDir, "..", "..");
const outputRoot = path.join(workspaceDir, "Task3_HW3");
const baseUrl = process.env.ESHOP_BASE_URL || "http://localhost:5173";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const selectedBrowser = process.env.GUI_CAPTURE_BROWSER?.toLowerCase();
const captureHeadful = process.env.GUI_CAPTURE_HEADFUL === "true";
const holdMs = Number(process.env.GUI_CAPTURE_HOLD_MS || 0);
const languageRule = /\b(Search|Cart|Logout|Add to cart|Checkout|Continue shopping|Loading)\b/i;
const criterion =
  "Toàn bộ tiêu đề, nhãn, nút và thông báo trên ba màn hình dùng tiếng Việt.";

function jsonResponse(body, status = 200) {
  return {
    status,
    contentType: "application/json; charset=utf-8",
    body: JSON.stringify(body),
  };
}

async function mockApi(page) {
  await page.route("http://localhost:3000/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());

    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204 });
      return;
    }
    if (url.pathname === "/api/users/me") {
      await route.fulfill(jsonResponse(testUser));
      return;
    }
    if (url.pathname === "/api/products") {
      const search = (url.searchParams.get("search") || "").toLocaleLowerCase();
      const body = search
        ? products.filter((item) => item.name.toLocaleLowerCase().includes(search))
        : products;
      await route.fulfill(jsonResponse(body));
      return;
    }
    if (/^\/api\/products\/\d+$/.test(url.pathname)) {
      await route.fulfill(jsonResponse(products[0]));
      return;
    }
    await route.fulfill(jsonResponse({ message: "Mock endpoint not configured" }, 404));
  });
}

async function goTo(page, pathname) {
  await page.goto(new URL(pathname, baseUrl).href, { waitUntil: "networkidle" });
  return page.locator("body").innerText();
}

async function appendEvidenceCard(page, metadata) {
  await page.evaluate((card) => {
    const existing = document.getElementById("gui-evidence-card");
    existing?.remove();

    const footer = document.createElement("section");
    footer.id = "gui-evidence-card";
    footer.setAttribute("aria-label", "Thông tin bằng chứng kiểm thử");
    footer.innerHTML = `
      <div>${card.identity}</div>
      <div>${card.context}</div>
      <div>${card.result}</div>
      <strong>${card.tester}</strong>
    `;
    Object.assign(footer.style, {
      boxSizing: "border-box",
      width: "100%",
      marginTop: "24px",
      padding: "20px 28px",
      background: "#102a43",
      color: "#f7fafc",
      borderTop: "4px solid #62b6cb",
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.55",
      letterSpacing: "0.1px",
    });
    footer.querySelector("strong").style.fontSize = "21px";
    document.body.append(footer);
  }, metadata);
}

async function runBrowser({ browserName, browserType, launchOptions }) {
  const outputDir = path.join(outputRoot, browserName.toLowerCase());
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await browserType.launch(launchOptions);
  const browserVersion = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "vi-VN",
    extraHTTPHeaders: { "Accept-Language": "vi-VN,vi;q=0.9" },
  });
  await context.addInitScript(() => localStorage.setItem("token", "gui-001-test-token"));
  const page = await context.newPage();
  await mockApi(page);

  let resultText;
  try {
    for (const route of ["/", "/product/1", "/cart"]) {
      const text = await goTo(page, route);
      assert.doesNotMatch(text, languageRule);
    }
    resultText = `Đạt — Tiêu chí GUI-001: ${criterion}`;
  } catch (error) {
    resultText = `Không đạt — Tiêu chí GUI-001: ${criterion} Thực tế: ${error.message}`;
  }

  await goTo(page, "/cart");
  if (captureHeadful) {
    await page.evaluate((name) => {
      document.title = `GUI-001 ${name} Evidence`;
    }, browserName);
  }
  await appendEvidenceCard(page, {
    identity: `GUI-001 · ${browserName} ${browserVersion} · Windows 11 · Laptop Dell`,
    context: `${page.url()} · 23120117@student.hcmus.edu.vn`,
    result: resultText,
    tester: "VÕ HOÀNG DANH · MSSV 23120117",
  });

  if (holdMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, holdMs));
  }

  const outputPath = path.join(outputDir, "GUI-001.png");
  await page.screenshot({ path: outputPath, fullPage: true });
  await context.close();
  await browser.close();
  return { browserName, browserVersion, outputPath, resultText };
}

const results = [];
try {
  const browsers = [
    {
      browserName: "Chrome",
      browserType: chromium,
      launchOptions: {
        executablePath: chromePath,
        headless: !captureHeadful,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=vi-VN"],
      },
    },
    {
      browserName: "Firefox",
      browserType: firefox,
      launchOptions: { headless: !captureHeadful },
    },
  ];
  for (const browser of browsers) {
    if (!selectedBrowser || selectedBrowser === browser.browserName.toLowerCase()) {
      results.push(await runBrowser(browser));
    }
  }
  console.table(results);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
