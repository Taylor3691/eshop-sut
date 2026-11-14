import assert from "node:assert/strict";
import { config } from "../config.js";
import { products as defaultProducts, testUser } from "./test-data.js";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const jsonResponse = (body, status = 200) => ({
  status,
  contentType: "application/json; charset=utf-8",
  headers: {
    "Access-Control-Allow-Origin": new URL(config.baseUrl).origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
  body: JSON.stringify(body),
});

export async function createEshopPage(browser, options = {}) {
  const page = await browser.newPage();
  await page.setViewport(options.viewport || config.viewport);
  await page.setExtraHTTPHeaders({ "Accept-Language": "vi-VN,vi;q=0.9" });
  page.setDefaultTimeout(config.timeout);
  page.setDefaultNavigationTimeout(config.timeout);

  const apiCalls = [];
  page.apiCalls = apiCalls;
  const products = options.products ?? defaultProducts;
  const product = options.product ?? products[0] ?? defaultProducts[0];
  const productDelay = options.productDelay ?? 0;

  await page.evaluateOnNewDocument((useDarkMode) => {
    try {
      localStorage.setItem("token", "puppeteer-e2e-token");
    } catch {}
    if (useDarkMode) {
      const install = () => {
        const original = window.matchMedia?.bind(window);
        window.matchMedia = (query) => {
          if (query.includes("prefers-color-scheme")) {
            return {
              matches: query.includes("dark"),
              media: query,
              onchange: null,
              addListener() {},
              removeListener() {},
              addEventListener() {},
              removeEventListener() {},
              dispatchEvent() { return false; },
            };
          }
          return original ? original(query) : { matches: false, media: query };
        };
      };
      install();
    }
  }, Boolean(options.dark));

  await page.setRequestInterception(true);
  page.on("request", async (request) => {
    const url = new URL(request.url());
    if (url.hostname === "localhost" && url.port === "3000") {
      apiCalls.push({ method: request.method(), url: request.url() });
      if (request.method() === "OPTIONS") {
        await request.respond({
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": new URL(config.baseUrl).origin,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
        });
        return;
      }
      if (url.pathname === "/api/users/me") {
        await request.respond(jsonResponse(testUser));
        return;
      }
      if (url.pathname === "/api/products") {
        if (productDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, productDelay));
        }
        const search = (url.searchParams.get("search") || "").toLocaleLowerCase();
        const result = search
          ? products.filter((item) => item.name.toLocaleLowerCase().includes(search))
          : products;
        await request.respond(jsonResponse(result));
        return;
      }
      if (/^\/api\/products\/\d+$/.test(url.pathname)) {
        await request.respond(jsonResponse(product));
        return;
      }
      await request.respond(jsonResponse({ message: "Mock endpoint not configured" }, 404));
      return;
    }
    await request.continue();
  });

  return page;
}

export async function gotoApp(page, pathname = "/", options = {}) {
  const waitUntil = options.waitUntil || "networkidle0";
  await page.goto(new URL(pathname, config.baseUrl).href, { waitUntil });
  if (options.rtl) {
    await page.evaluate(() => {
      document.documentElement.setAttribute("dir", "rtl");
    });
  }
}

export async function findByText(page, selector, text, exact = true) {
  const handles = await page.$$(selector);
  for (const handle of handles) {
    const value = await handle.evaluate((element) => element.textContent?.trim() || "");
    if ((exact && value === text) || (!exact && value.includes(text))) {
      return handle;
    }
    await handle.dispose();
  }
  return null;
}

export async function requireByText(page, selector, text, exact = true) {
  const handle = await findByText(page, selector, text, exact);
  assert.ok(handle, `Không tìm thấy ${selector} có nội dung “${text}”`);
  return handle;
}

export async function clickByText(page, selector, text, exact = true) {
  const handle = await requireByText(page, selector, text, exact);
  await handle.click();
  await handle.dispose();
}

export async function visibleBodyText(page) {
  return page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());
}

export async function openDetail(page) {
  await gotoApp(page, "/product/1");
  await page.waitForSelector("main h1");
}

export async function openCartWithOneItem(page) {
  await gotoApp(page, "/");
  const addButton = await requireByText(page, "main button", "Thêm vào giỏ", true);
  await addButton.click();
  await addButton.dispose();
  await clickByText(page, "header a", "Giỏ hàng", true);
  await page.waitForSelector("main table");
}

export async function assertNoHorizontalOverflow(page, message = "Trang bị tràn ngang") {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert.ok(metrics.scrollWidth <= metrics.clientWidth + 1, `${message}: ${metrics.scrollWidth}px > ${metrics.clientWidth}px`);
}

export async function assertVisibleInsideViewport(page, selector) {
  const failures = await page.$$eval(selector, (elements) =>
    elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: element.textContent?.trim().slice(0, 50),
          left: rect.left,
          right: rect.right,
          width: rect.width,
        };
      })
      .filter((rect) => rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1)),
  );
  assert.deepEqual(failures, [], `Có phần tử nằm ngoài viewport: ${JSON.stringify(failures)}`);
}

function parseRgb(value) {
  const match = String(value).match(/rgba?\((\d+(?:\.\d+)?)[, ]+\s*(\d+(?:\.\d+)?)[, ]+\s*(\d+(?:\.\d+)?)(?:[, /]+\s*(\d+(?:\.\d+)?))?\)/);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function channel(value) {
  const ratio = value / 255;
  return ratio <= 0.04045 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function contrastRatio(foreground, background) {
  const fg = typeof foreground === "string" ? parseRgb(foreground) : foreground;
  const bg = typeof background === "string" ? parseRgb(background) : background;
  assert.ok(fg && bg, `Không đọc được màu: ${foreground} / ${background}`);
  const light = Math.max(luminance(fg), luminance(bg));
  const dark = Math.min(luminance(fg), luminance(bg));
  return (light + 0.05) / (dark + 0.05);
}

export async function elementColors(handle) {
  return handle.evaluate((element) => {
    const foreground = getComputedStyle(element).color;
    let current = element;
    let background = "rgb(255, 255, 255)";
    while (current) {
      const color = getComputedStyle(current).backgroundColor;
      const match = color.match(/rgba?\(([^)]+)\)/);
      if (match) {
        const parts = match[1].split(/[, /]+/).map(Number);
        const alpha = parts.length > 3 ? parts[3] : 1;
        if (alpha > 0) {
          background = color;
          break;
        }
      }
      current = current.parentElement;
    }
    return {
      foreground,
      background,
      fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
      fontWeight: Number.parseInt(getComputedStyle(element).fontWeight, 10) || 400,
    };
  });
}

export async function assertReadableContrast(page, selector) {
  const handles = await page.$$(selector);
  assert.ok(handles.length > 0, `Không có phần tử để kiểm tra độ tương phản: ${selector}`);
  for (const handle of handles) {
    const visible = await handle.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });
    if (!visible) continue;
    const colors = await elementColors(handle);
    const ratio = contrastRatio(colors.foreground, colors.background);
    const large = colors.fontSize >= 24 || (colors.fontSize >= 18.66 && colors.fontWeight >= 700);
    assert.ok(ratio >= (large ? 3 : 4.5), `Độ tương phản ${ratio.toFixed(2)}:1 không đạt cho “${await handle.evaluate((element) => element.textContent?.trim().slice(0, 40))}”`);
  }
}

export async function colorIsDominant(handle, channelName, useBackground = true) {
  const value = await handle.evaluate(
    (element, background) =>
      background ? getComputedStyle(element).backgroundColor : getComputedStyle(element).color,
    useBackground,
  );
  const rgb = parseRgb(value);
  assert.ok(rgb, `Không đọc được màu ${value}`);
  if (channelName === "blue") return rgb.b > rgb.r * 1.15 && rgb.b > rgb.g * 1.05;
  if (channelName === "red") return rgb.r > rgb.g * 1.2 && rgb.r > rgb.b * 1.2;
  return false;
}

export async function accessibleName(page, selector) {
  return page.$eval(selector, (element) => {
    const labelledBy = element.getAttribute("aria-labelledby");
    if (labelledBy) {
      return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim() || "")
        .join(" ")
        .trim();
    }
    const ariaLabel = element.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel.trim();
    if (element.id) {
      const label = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
      if (label) return label.textContent?.trim() || "";
    }
    const wrappingLabel = element.closest("label");
    return wrappingLabel?.textContent?.trim() || "";
  });
}

export async function focusableElements(page, root = "main") {
  return page.$$eval(`${root} ${focusableSelector}`, (elements) =>
    elements
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        text: element.textContent?.trim() || "",
        type: element.getAttribute("type") || "",
        tabindex: element.getAttribute("tabindex"),
      })),
  );
}

export async function backgroundLuminance(page, selector) {
  const color = await page.$eval(selector, (element) => getComputedStyle(element).backgroundColor);
  const rgb = parseRgb(color);
  assert.ok(rgb, `Không đọc được màu nền của ${selector}`);
  return luminance(rgb);
}

export { assert, focusableSelector };
