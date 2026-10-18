/**
 * Chụp ảnh bằng chứng riêng cho BUG-01 (đơn vị giá), BUG-02 (alt rỗng), BUG-03 (hai h1).
 * Chú thích màu vàng và viền đỏ do script chèn để chỉ vị trí lỗi; không đổi nội dung trang.
 *
 * Cần sẵn backend :3000 và frontend-web :5173. Chạy: node scripts/evidence-fr05.mjs
 */
import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = process.env.WEB_URL ?? "http://localhost:5173";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (name) => path.join(root, "docs/bugs", name);

async function search(page, keyword) {
  await page.goto(WEB, { waitUntil: "networkidle" });
  await page.getByPlaceholder("Tìm kiếm...").fill(keyword);
  await page.getByRole("button", { name: "Tìm" }).click();
  await page.getByRole("heading", { name: keyword, exact: false }).first().waitFor();
  await page.waitForTimeout(300);
}

async function annotate(page, selector, label) {
  await page.evaluate(
    ([sel, text]) => {
      const note = document.createElement("div");
      note.textContent = text;
      note.style.cssText =
        "position:sticky;top:0;z-index:9999;background:#fef3c7;border:2px solid #d97706;padding:8px;font:14px monospace;white-space:pre-wrap";
      document.body.prepend(note);
      for (const node of document.querySelectorAll(sel)) node.style.outline = "3px solid red";
    },
    [selector, label],
  );
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1100, height: 700 }, locale: "vi-VN" });

  await search(page, "iPhone");
  const price = await page.locator("h2 + p, h2 ~ p").first().innerText();
  await annotate(page, "h2 ~ p", `BUG-01 — giá hiển thị: "${price}". README FR-05/FR-21 yêu cầu ký hiệu ₫.`);
  await page.screenshot({ path: out("BUG-01-evidence.png") });

  await search(page, "iPhone");
  const img = await page.locator("img").first().evaluate((node) => node.outerHTML);
  await annotate(page, "img", `BUG-02 — DOM của ảnh sản phẩm:\n${img}\nREADME FR-05/FR-24 yêu cầu alt mô tả, không rỗng.`);
  await page.screenshot({ path: out("BUG-02-evidence.png") });

  await search(page, "iPhone");
  const h1 = await page.locator("h1").allInnerTexts();
  await annotate(page, "h1", `BUG-03 — số thẻ <h1>: ${h1.length} → ${h1.map((t) => `"${t}"`).join(", ")}. README FR-05 yêu cầu đúng một <h1>.`);
  await page.screenshot({ path: out("BUG-03-evidence.png") });

  await page.goto(WEB, { waitUntil: "networkidle" });
  await page.getByPlaceholder("Tìm kiếm...").fill("a&b");
  const request = page.waitForRequest((req) => req.url().includes("/api/products?search="));
  await page.getByRole("button", { name: "Tìm" }).click();
  const sent = (await request).url();
  await page.waitForTimeout(500);
  const names = await page.locator("h2").allInnerTexts();
  await annotate(page, "h2", `BUG-23 — từ khóa gõ: "a&b". Request gửi: ${sent}\nServer chỉ nhận search=a, trả ${names.length} sản phẩm có chữ "a". Expected: tìm cả chuỗi "a&b", không có kết quả.`);
  await page.screenshot({ path: out("BUG-23-actual.png") });

  await browser.close();
  console.log({ price, img, h1, sent, names });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
