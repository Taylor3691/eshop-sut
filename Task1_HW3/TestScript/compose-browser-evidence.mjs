import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const [inputPath, outputPath, browserLabel, resultText] = process.argv.slice(2);

if (!inputPath || !outputPath || !browserLabel || !resultText) {
  throw new Error(
    "Usage: node compose-browser-evidence.mjs <input> <output> <browser-label> <result-text>",
  );
}

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const imageBytes = await fs.readFile(path.resolve(inputPath));
const imageMimeType = path.extname(inputPath).toLowerCase() === ".jpg" ? "image/jpeg" : "image/png";
const imageUrl = `data:${imageMimeType};base64,${imageBytes.toString("base64")}`;

await page.setContent(`
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #ffffff; font-family: Arial, sans-serif; }
    img { display: block; width: 100%; height: auto; }
    #evidence-card {
      margin: 24px 0 0;
      padding: 24px 32px;
      background: #102a43;
      border-top: 4px solid #62b6cb;
      color: #f7fafc;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.55;
    }
    #evidence-card strong { display: block; margin-top: 4px; font-size: 23px; }
  </style>
  <img id="window-capture" src="${imageUrl}" alt="Ảnh cửa sổ trình duyệt có thanh địa chỉ localhost">
  <section id="evidence-card">
    <div>GUI-001 · ${browserLabel} · Windows 11 · Laptop Dell</div>
    <div>http://localhost:5173/cart · 23120117@student.hcmus.edu.vn</div>
    <div>${resultText}</div>
    <strong>VÕ HOÀNG DANH · MSSV 23120117</strong>
  </section>
`);
await page.locator("#window-capture").waitFor({ state: "visible" });
await page.locator("#window-capture").evaluate((image) => image.decode());
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();
