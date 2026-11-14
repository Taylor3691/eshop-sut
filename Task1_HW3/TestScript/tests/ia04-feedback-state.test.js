import {
  assert,
  backgroundLuminance,
  clickByText,
  contrastRatio,
  elementColors,
  gotoApp,
  openCartWithOneItem,
  openDetail,
  requireByText,
  visibleBodyText,
} from "../lib/ui-helpers.js";
import { test } from "../lib/test-runner.js";

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const feedbackSelector = "[role='status'], [aria-live], .toast, [data-testid*='toast'], [class*='toast']";

async function feedbackType(page) {
  return page.evaluate((selector) => {
    const feedback = document.querySelector(selector);
    if (feedback) return "message";
    const cart = [...document.querySelectorAll("header a")].find((item) => item.textContent.includes("Giỏ hàng"));
    return /\d+/.test(cart?.textContent || "") ? "badge" : "none";
  }, feedbackSelector);
}

test(32, "Hiển thị trạng thái loading khi tải sản phẩm", async ({ newPage }) => {
  const page = await newPage({ productDelay: 800 });
  await gotoApp(page, "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("main");
  const textDuringLoad = await visibleBodyText(page);
  assert.match(textDuringLoad, /Đang tải|Loading/i, "Không có trạng thái loading");
  assert.doesNotMatch(textDuringLoad, /không có kết quả|trống/i, "Hiển thị nhầm empty state khi đang tải");
  await page.waitForFunction(() => document.querySelectorAll("main .grid > div").length > 0);
});

test(33, "Tìm kiếm không có kết quả hiển thị Empty State", async ({ newPage }) => {
  const page = await newPage({ products: [] });
  await gotoApp(page, "/");
  const text = await visibleBodyText(page);
  assert.match(text, /không (có|tìm thấy).*sản phẩm|chưa có sản phẩm/i);
  assert.ok(await page.$("main img, main svg, main [role='img']"), "Empty State chưa có hình minh họa");
});

test(34, "Thêm từ thẻ sản phẩm có toast hoặc badge", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await clickByText(page, "main button", "Thêm vào giỏ", true);
  await pause(100);
  assert.notEqual(await feedbackType(page), "none", "Không có toast hoặc badge sau khi thêm giỏ");
});

test(35, "Thêm từ Chi tiết có phản hồi ngay lần đầu", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  await clickByText(page, "main button", "Thêm vào giỏ hàng", true);
  await pause(100);
  const feedback = await feedbackType(page);
  const buttonText = await page.$eval("main button", (button) => button.textContent?.trim() || "");
  assert.ok(feedback !== "none" || /Đã thêm/.test(buttonText), "Lần bấm đầu chưa có phản hồi");
  await page.evaluate(() => {
    const target = document.querySelector("main button");
    const rect = target.getBoundingClientRect();
    const top = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    if (top !== target && !target.contains(top)) throw new Error("Phản hồi đang che nút chính");
  });
});

test(36, "Thêm lại sản phẩm chỉ tăng số lượng", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const button = await requireByText(page, "main button", "Thêm vào giỏ", true);
  await button.click();
  await button.click();
  await clickByText(page, "header a", "Giỏ hàng", true);
  await page.waitForSelector("main table");
  assert.equal(await page.$$eval("main table tbody tr", (items) => items.length), 1, "Sản phẩm bị tạo thành hai dòng");
  assert.equal(await page.$eval("main table tbody tr td:nth-child(3)", (cell) => cell.textContent?.trim()), "2");
});

test(37, "Nút cộng trừ cập nhật số lượng và thành tiền", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  const before = await page.evaluate(() => ({
    quantity: document.querySelector("tbody tr td:nth-child(3)")?.textContent?.trim(),
    rowTotal: document.querySelector("tbody tr td:nth-child(4)")?.textContent?.trim(),
    total: document.querySelector("main table")?.nextElementSibling?.textContent?.replace(/\s+/g, " ").trim(),
  }));
  await clickByText(page, "main table button", "+", true);
  const after = await page.evaluate(() => ({
    quantity: document.querySelector("tbody tr td:nth-child(3)")?.textContent?.trim(),
    rowTotal: document.querySelector("tbody tr td:nth-child(4)")?.textContent?.trim(),
    total: document.querySelector("main table")?.nextElementSibling?.textContent?.replace(/\s+/g, " ").trim(),
  }));
  assert.equal(after.quantity, "2");
  assert.notEqual(after.rowTotal, before.rowTotal);
  assert.notEqual(after.total, before.total);
});

test(38, "Tổng tiền có đúng nhãn Tổng cộng", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  const text = await visibleBodyText(page);
  assert.match(text, /Tổng cộng:\s*30\.000\.000 ₫/);
  assert.doesNotMatch(text, /Tổng tạm tính/);
});

test(39, "Xóa sản phẩm phải xác nhận trước", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  let nativeDialogSeen = false;
  page.once("dialog", async (dialog) => {
    nativeDialogSeen = true;
    await dialog.dismiss();
  });
  await clickByText(page, "main button", "Xóa", true);
  await pause(100);
  const customDialog = await page.$("[role='dialog'], dialog[open]");
  assert.ok(nativeDialogSeen || customDialog, "Không có hộp xác nhận xóa");
  if (customDialog) {
    const cancel = await requireByText(page, "[role='dialog'] button, dialog button", "Hủy", true);
    await cancel.click();
  }
  assert.equal(await page.$$eval("main table tbody tr", (items) => items.length), 1, "Sản phẩm vẫn bị xóa khi hủy");
});

test(40, "Giỏ hàng rỗng có hình, thông báo và nút quay lại", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/cart");
  const text = await visibleBodyText(page);
  assert.match(text, /Giỏ hàng.*trống/i);
  assert.ok(await page.$("main img, main svg, main [role='img']"), "Giỏ hàng rỗng chưa có hình minh họa");
  await requireByText(page, "main a, main button", "Tiếp tục mua sắm", true);
  assert.equal(await page.$("main table"), null, "Giỏ rỗng vẫn hiển thị bảng");
});

test(46, "Toast hoặc badge nhất quán ở hai màn hình", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await clickByText(page, "main button", "Thêm vào giỏ", true);
  await pause(50);
  const homeFeedback = await feedbackType(page);
  assert.notEqual(homeFeedback, "none", "Danh sách sản phẩm thiếu phản hồi");

  await openDetail(page);
  await clickByText(page, "main button", "Thêm vào giỏ hàng", true);
  await pause(50);
  const detailFeedback = await feedbackType(page);
  assert.equal(detailFeedback, homeFeedback, "Hai màn hình dùng kiểu phản hồi khác nhau");
});

test(47, "Dialog xóa có đủ thông tin và nút Hủy", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  let nativeMessage = "";
  page.once("dialog", async (dialog) => {
    nativeMessage = dialog.message();
    await dialog.dismiss();
  });
  await clickByText(page, "main button", "Xóa", true);
  await pause(100);
  const custom = await page.$("[role='dialog'], dialog[open]");
  if (custom) {
    const text = await custom.evaluate((element) => element.textContent?.replace(/\s+/g, " ").trim() || "");
    assert.match(text, /iPhone 15 Pro Max/);
    await requireByText(page, "[role='dialog'] button, dialog button", "Xác nhận", true);
    const cancel = await requireByText(page, "[role='dialog'] button, dialog button", "Hủy", true);
    await cancel.click();
  } else {
    assert.match(nativeMessage, /iPhone 15 Pro Max/, "Hộp xác nhận không nêu sản phẩm cần xóa");
  }
  assert.equal(await page.$$eval("main table tbody tr", (items) => items.length), 1);
});

test(48, "Các Empty State có hướng phục hồi", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await page.type("main input[type='text']", "khong-co-san-pham");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelectorAll("main .grid > div").length === 0);
  assert.match(await visibleBodyText(page), /không (có|tìm thấy)|trống/i);
  assert.ok(await page.$("main img, main svg, main [role='img']"));
  assert.ok(await page.$("main button, main a"), "Không có hành động phục hồi tìm kiếm");

  await gotoApp(page, "/cart");
  assert.match(await visibleBodyText(page), /Giỏ hàng.*trống/i);
  assert.ok(await page.$("main img, main svg, main [role='img']"));
  await requireByText(page, "main a, main button", "Tiếp tục mua sắm", true);
});

test(50, "Trạng thái động được công bố cho công nghệ hỗ trợ", async ({ newPage }) => {
  const page = await newPage({ productDelay: 500 });
  await gotoApp(page, "/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("main");
  const loadingRegion = await page.$("main [role='status'], main [aria-live]");
  assert.ok(loadingRegion, "Loading không có vùng thông báo trạng thái");
  await page.waitForFunction(() => document.querySelectorAll("main .grid > div").length > 0);
  await clickByText(page, "main button", "Thêm vào giỏ", true);
  const feedback = await page.$(feedbackSelector);
  assert.ok(feedback, "Phản hồi Thêm vào giỏ không có role=status hoặc aria-live");
});

test(56, "Phản hồi hệ thống dễ nhìn trong dark mode", async ({ newPage }) => {
  const page = await newPage({ dark: true, products: [] });
  await gotoApp(page, "/");
  assert.ok((await backgroundLuminance(page, ".min-h-screen")) < 0.35, "Ứng dụng chưa bật dark mode");
  const feedback = await page.$("main [role='status'], main [aria-live], main .empty-state, main [data-empty]");
  assert.ok(feedback, "Không có Empty State để kiểm tra trong dark mode");
  const colors = await elementColors(feedback);
  assert.ok(contrastRatio(colors.foreground, colors.background) >= 4.5, "Empty State thiếu tương phản trong dark mode");
});
