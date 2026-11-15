import fs from "node:fs/promises";
import path from "node:path";
import { chromium, firefox } from "playwright";
import { products, testUser } from "./lib/test-data.js";

const root = path.resolve("../..");
const baseUrl = "http://localhost:5173";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const captureRoot = path.join(root, "Task3_HW3");

const cases = [
  {
    id: "046",
    urls: ["/", "/product/1"],
    result: "Không đạt — Sau khi thêm từ Danh sách sản phẩm không xuất hiện toast hoặc badge; vì vậy chưa thể xác nhận phản hồi nhất quán với trang Chi tiết.",
    prepare: async (page) => {
      await open(page, "/");
      await page.getByRole("button", { name: "Thêm vào giỏ" }).first().click();
      await page.waitForTimeout(100);
    },
  },
  {
    id: "050",
    urls: ["/"],
    result: "Không đạt — Trong lúc tải danh sách sản phẩm, không có vùng thông báo trạng thái (role=status hoặc aria-live) để công nghệ hỗ trợ nhận biết.",
    prepare: async (page) => {
      await open(page, "/", { delay: 1500, waitUntil: "domcontentloaded" });
      await page.locator("main").waitFor();
      await page.waitForTimeout(100);
    },
  },
  {
    id: "051",
    urls: ["/", "/product/1", "/cart"],
    result: "Không đạt — Trang Danh sách sản phẩm có 2 thẻ h1; cấu trúc heading/landmark chưa đáp ứng đúng yêu cầu ngữ nghĩa.",
    prepare: async (page) => {
      await addOneAndOpenCart(page);
    },
  },
  {
    id: "052",
    urls: ["/", "/product/1", "/cart"],
    result: "Đạt — Khi đặt dir=rtl, bố cục hiển thị theo phải-sang-trái và không xuất hiện cuộn ngang.",
    prepare: async (page) => {
      await open(page, "/");
      await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    },
  },
  {
    id: "053",
    urls: ["/cart"],
    result: "Không đạt — Ở chế độ RTL, bảng giỏ hàng vẫn căn trái nên thứ tự/định hướng chưa phù hợp.",
    prepare: async (page) => {
      await addOneAndOpenCart(page);
      await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    },
  },
];

function response(body) {
  return {
    status: 200,
    contentType: "application/json; charset=utf-8",
    headers: {
      "Access-Control-Allow-Origin": baseUrl,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

async function preparePage(context) {
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem("token", "gui-evidence-token"));
  await page.route("http://localhost:3000/**", async (route) => {
    const request = route.request();
    const requestUrl = new URL(request.url());
    if (request.method() === "OPTIONS") return route.fulfill({ status: 204, headers: response({}).headers });
    if (requestUrl.pathname === "/api/users/me") return route.fulfill(response(testUser));
    if (requestUrl.pathname === "/api/products") {
      const delay = Number(request.headers()["x-gui-delay"] || 0);
      if (delay) await page.waitForTimeout(delay);
      const keyword = (requestUrl.searchParams.get("search") || "").toLocaleLowerCase();
      return route.fulfill(response(keyword ? products.filter((item) => item.name.toLocaleLowerCase().includes(keyword)) : products));
    }
    if (/^\/api\/products\/\d+$/.test(requestUrl.pathname)) return route.fulfill(response(products[0]));
    return route.fulfill({ status: 404, body: JSON.stringify({ message: "Mock endpoint not configured" }) });
  });
  return page;
}

async function open(page, pathname, { delay = 0, waitUntil = "networkidle" } = {}) {
  if (delay) await page.setExtraHTTPHeaders({ "x-gui-delay": String(delay) });
  await page.goto(new URL(pathname, baseUrl).href, { waitUntil });
  if (delay) await page.setExtraHTTPHeaders({});
}

async function addOneAndOpenCart(page) {
  await open(page, "/");
  await page.getByRole("button", { name: "Thêm vào giỏ" }).first().click();
  await page.getByRole("link", { name: /Giỏ hàng/ }).click();
  await page.locator("main table").waitFor();
}

function cardHtml(imageUrl, item, browserLabel) {
  const urlText = item.urls.map((itemUrl) => `${baseUrl}${itemUrl}`).join(" · ");
  const mode = ["052", "053"].includes(item.id) ? " · dir=rtl" : "";
  return `<!doctype html><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #fff; font-family: Arial, sans-serif; }
    img { display: block; width: 100%; height: auto; }
    section { margin-top: 20px; padding: 22px 30px; background: #102a43; border-top: 4px solid #62b6cb; color: #f7fafc; font-size: 18px; font-weight: 600; line-height: 1.55; }
    strong { display: block; margin-top: 4px; font-size: 22px; }
  </style><img src="${imageUrl}" alt="Ảnh kiểm thử giao diện"><section>
    <div>GUI-${item.id} · ${browserLabel} · Windows 11 · Laptop Dell</div>
    <div>URL kiểm tra: ${urlText}${mode} · 23120117@student.hcmus.edu.vn</div>
    <div>${item.result}</div><strong>VÕ HOÀNG DANH · MSSV 23120117</strong>
  </section>`;
}

async function writeComposite(browser, rawPath, outputPath, item, browserLabel) {
  const bytes = await fs.readFile(rawPath);
  const mime = path.extname(rawPath).toLowerCase() === ".jpg" ? "image/jpeg" : "image/png";
  const imageUrl = `data:${mime};base64,${bytes.toString("base64")}`;
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setContent(cardHtml(imageUrl, item, browserLabel));
  await page.locator("img").evaluate((image) => image.decode());
  await page.screenshot({ path: outputPath, fullPage: true });
  await page.close();
}

async function capture(browserType, browserName, launchOptions) {
  const browser = await browserType.launch(launchOptions);
  const browserLabel = `${browserName} ${browser.version()}`;
  const folder = browserName.toLowerCase();
  await fs.mkdir(path.join(captureRoot, folder), { recursive: true });

  try {
    for (const item of cases) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "vi-VN" });
      const page = await preparePage(context);
      await item.prepare(page);
      const rawPath = path.join(captureRoot, folder, `GUI-${item.id}-raw.png`);
      const outputPath = path.join(captureRoot, folder, `GUI-${item.id}.png`);
      await page.screenshot({ path: rawPath, fullPage: true });
      await context.close();
      await writeComposite(browser, rawPath, outputPath, item, browserLabel);
      console.log(`Created ${outputPath}`);
    }
  } finally {
    await browser.close();
  }
}

await capture(chromium, "Chrome", { executablePath: chromePath, headless: true, args: ["--no-sandbox"] });
await capture(firefox, "Firefox", { headless: true });
