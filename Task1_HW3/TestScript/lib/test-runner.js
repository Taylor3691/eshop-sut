import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import { config } from "../config.js";
import { createEshopPage } from "./ui-helpers.js";

const cases = [];

export function test(id, title, run) {
  if (cases.some((item) => item.id === id)) {
    throw new Error(`Mã checklist bị trùng: GUI-${String(id).padStart(2, "0")}`);
  }
  cases.push({ id, title, run });
}

function markdownEscape(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

async function writeReports(results, startedAt, finishedAt) {
  await fs.mkdir(config.reportDir, { recursive: true });
  const summary = {
    startedAt,
    finishedAt,
    baseUrl: config.baseUrl,
    total: results.length,
    passed: results.filter((item) => item.status === "PASSED").length,
    failed: results.filter((item) => item.status === "FAILED").length,
    results,
  };

  await fs.writeFile(
    path.join(config.reportDir, "results.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );

  const lines = [
    "# Kết quả kiểm thử GUI bằng Puppeteer",
    "",
    `- Thời gian bắt đầu: ${startedAt}`,
    `- Thời gian kết thúc: ${finishedAt}`,
    `- Base URL: ${config.baseUrl}`,
    `- Tổng số: ${summary.total}`,
    `- Đạt: ${summary.passed}`,
    `- Không đạt: ${summary.failed}`,
    "",
    "| ID | Trường hợp kiểm thử | Kết quả | Thời gian | Lỗi / Ảnh chụp |",
    "|---|---|---|---:|---|",
    ...results.map((item) =>
      `| GUI-${String(item.id).padStart(2, "0")} | ${markdownEscape(item.title)} | ${item.status} | ${item.durationMs} ms | ${markdownEscape([item.error, item.screenshot].filter(Boolean).join(" — ") || "—")} |`,
    ),
    "",
  ];
  await fs.writeFile(
    path.join(config.reportDir, "results.md"),
    `${lines.join("\n")}\n`,
    "utf8",
  );
}

export async function runAll() {
  const expectedIds = Array.from({ length: 56 }, (_, index) => index + 1);
  const actualIds = cases.map((item) => item.id).sort((a, b) => a - b);
  if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) {
    throw new Error(
      `Bộ test phải có đủ GUI-01 đến GUI-56. Hiện có: ${actualIds.join(", ")}`,
    );
  }

  const screenshotDir = path.join(config.reportDir, "screenshots");
  await fs.rm(screenshotDir, { recursive: true, force: true });
  await fs.mkdir(screenshotDir, { recursive: true });
  const browser = await puppeteer.launch({
    headless: config.headless,
    ...(config.executablePath ? { executablePath: config.executablePath } : {}),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=vi-VN"],
  });
  const formatClientTime = (date) =>
    `${new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date).replace(" ", "T")}+07:00`;
  const startedAt = formatClientTime(new Date());
  const results = [];

  try {
    for (const item of [...cases].sort((a, b) => a.id - b.id)) {
      const pages = [];
      const started = Date.now();
      let lastPage;
      try {
        const newPage = async (options = {}) => {
          const page = await createEshopPage(browser, options);
          pages.push(page);
          lastPage = page;
          return page;
        };
        await item.run({ newPage, config });
        results.push({
          id: item.id,
          title: item.title,
          status: "PASSED",
          durationMs: Date.now() - started,
        });
        console.log(`PASS GUI-${String(item.id).padStart(2, "0")} ${item.title}`);
      } catch (error) {
        let screenshot;
        if (lastPage && !lastPage.isClosed()) {
          screenshot = path.join(
            config.reportDir,
            "screenshots",
            `GUI-${String(item.id).padStart(2, "0")}.png`,
          );
          await lastPage.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
        }
        results.push({
          id: item.id,
          title: item.title,
          status: "FAILED",
          durationMs: Date.now() - started,
          error: error?.message || String(error),
          screenshot,
        });
        console.error(`FAIL GUI-${String(item.id).padStart(2, "0")} ${item.title}: ${error?.message || error}`);
      } finally {
        await Promise.all(pages.map((page) => page.close().catch(() => {})));
      }
    }
  } finally {
    await browser.close();
  }

  const finishedAt = formatClientTime(new Date());
  await writeReports(results, startedAt, finishedAt);
  const failed = results.filter((item) => item.status === "FAILED").length;
  console.log(`Hoàn tất: ${results.length - failed}/${results.length} test đạt.`);
  process.exitCode = failed > 0 ? 1 : 0;
}
