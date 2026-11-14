import {
  accessibleName,
  assert,
  focusableElements,
  gotoApp,
  openCartWithOneItem,
  openDetail,
  requireByText,
  visibleBodyText,
} from "../lib/ui-helpers.js";
import { test } from "../lib/test-runner.js";

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

test(14, "Ô tìm kiếm có tên rõ ràng", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const name = await accessibleName(page, "main input[type='text']");
  assert.ok(name.length > 0, "Ô tìm kiếm không có label hoặc aria-label");
  const placeholder = await page.$eval("main input[type='text']", (input) => input.getAttribute("placeholder") || "");
  assert.notEqual(name, placeholder, "Placeholder đang được dùng thay cho nhãn");
});

test(15, "Nút Tìm và phím Enter gửi cùng một tìm kiếm", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const initialCount = page.apiCalls.filter((call) => call.method === "GET" && new URL(call.url).pathname === "/api/products").length;

  await page.type("main input[type='text']", "iPhone");
  const search = await requireByText(page, "main button", "Tìm", true);
  await search.click();
  await pause(100);
  await page.$eval("main input[type='text']", (input) => { input.value = ""; input.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.type("main input[type='text']", "iPhone");
  await page.keyboard.press("Enter");
  await pause(100);

  const productCalls = page.apiCalls.filter((call) => call.method === "GET" && new URL(call.url).pathname === "/api/products");
  assert.equal(productCalls.length, initialCount + 2, "Mỗi thao tác phải gửi đúng một request");
  const submittedQueries = productCalls.slice(-2).map((call) => new URL(call.url).searchParams.get("search"));
  assert.deepEqual(submittedQueries, ["iPhone", "iPhone"]);
});

test(16, "Từ khóa tìm kiếm được hiển thị an toàn", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const payload = '<b data-gui-xss="1">Probe</b>';
  await page.type("main input[type='text']", payload);
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.body.innerText.includes("Kết quả tìm kiếm"));
  assert.equal(await page.$$eval("[data-gui-xss='1']", (items) => items.length), 0, "HTML từ từ khóa đã được render");
  const text = await visibleBodyText(page);
  assert.ok(text.includes(payload), "Từ khóa phải được hiển thị nguyên văn như chữ thường");
});

test(17, "Ô Số lượng chỉ nhận số nguyên dương", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  const attributes = await page.$eval("main input[type='number']", (input) => ({
    type: input.type,
    min: input.getAttribute("min"),
    step: input.getAttribute("step"),
  }));
  assert.equal(attributes.type, "number");
  assert.equal(attributes.min, "1", "Ô số lượng phải có min=1");
  assert.equal(attributes.step, "1", "Ô số lượng phải có step=1");
});

test(18, "Số lượng mặc định là 1", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  assert.equal(await page.$eval("main input[type='number']", (input) => input.value), "1");
});

test(19, "Số lượng không hợp lệ bị từ chối và có thông báo", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  for (const invalidValue of ["", "0", "-1", "1.5", "abc"]) {
    await page.$eval(
      "main input[type='number']",
      (input, value) => {
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      },
      invalidValue,
    );
    const button = await requireByText(page, "main button", "Thêm vào giỏ hàng", true);
    await button.click();
    await pause(50);
    const error = await page.$("main [role='alert'], main [aria-live], main .error, main [data-error]");
    assert.ok(error, `Không có thông báo cho giá trị “${invalidValue}”`);
    const positions = await page.evaluate((errorElement) => {
      const buttonElement = [...document.querySelectorAll("main button")].find((item) => item.textContent.includes("Thêm vào giỏ"));
      return {
        errorTop: errorElement.getBoundingClientRect().top,
        buttonTop: buttonElement.getBoundingClientRect().top,
      };
    }, error);
    assert.ok(positions.errorTop < positions.buttonTop, "Thông báo lỗi phải nằm phía trên nút Thêm vào giỏ hàng");
  }
});

test(20, "Trường Số lượng bắt buộc có dấu sao", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  const result = await page.evaluate(() => {
    const input = document.querySelector("main input[type='number']");
    const label = input.id ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`) : input.closest("div")?.querySelector("label");
    return { required: input.required, label: label?.textContent?.trim() || "" };
  });
  assert.equal(result.required, true, "Ô Số lượng chưa có thuộc tính required");
  assert.match(result.label, /\*/, "Nhãn Số lượng chưa có dấu *");
});

test(21, "Thứ tự Tab ở trang Danh sách hợp lý", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const items = await focusableElements(page);
  const searchIndex = items.findIndex((item) => item.tag === "input");
  const findIndex = items.findIndex((item) => item.text === "Tìm");
  const detailIndex = items.findIndex((item) => item.text === "Xem chi tiết");
  const addIndex = items.findIndex((item) => item.text === "Thêm vào giỏ");
  assert.ok(searchIndex >= 0 && searchIndex < findIndex && findIndex < detailIndex && detailIndex < addIndex, JSON.stringify(items));
});

test(22, "Thứ tự Tab ở trang Chi tiết hợp lý", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  const items = await focusableElements(page);
  const quantityIndex = items.findIndex((item) => item.tag === "input" && item.type === "number");
  const addIndex = items.findIndex((item) => item.text.includes("Thêm vào giỏ hàng"));
  assert.ok(quantityIndex >= 0 && addIndex === quantityIndex + 1, JSON.stringify(items));
});

test(23, "Giỏ hàng có nút tăng giảm số lượng", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  const buttonLabels = await page.$$eval("main table button", (items) => items.map((item) => item.textContent?.trim()));
  assert.ok(buttonLabels.includes("-") && buttonLabels.includes("+"), `Các nút hiện có: ${buttonLabels.join(", ")}`);
  const quantityText = await page.$eval("main table tbody tr td:nth-child(3)", (cell) => cell.textContent?.trim());
  assert.match(quantityText, /\d+/);
});

test(44, "Ô tìm kiếm và Số lượng có nhãn cho trình đọc màn hình", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  assert.ok((await accessibleName(page, "main input[type='text']")).length > 0, "Ô tìm kiếm thiếu tên truy cập");
  await openDetail(page);
  assert.match(await accessibleName(page, "main input[type='number']"), /Số lượng/i);
});

test(45, "Lỗi số lượng được công nghệ hỗ trợ nhận biết", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  await page.$eval("main input[type='number']", (input) => {
    input.value = "0";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const button = await requireByText(page, "main button", "Thêm vào giỏ hàng", true);
  await button.click();
  await pause(50);
  const result = await page.evaluate(() => {
    const input = document.querySelector("main input[type='number']");
    const errorId = input.getAttribute("aria-describedby") || input.getAttribute("aria-errormessage");
    const error = errorId ? document.getElementById(errorId) : document.querySelector("main [role='alert'], main [aria-live]");
    return {
      invalid: input.getAttribute("aria-invalid"),
      hasError: Boolean(error),
      announced: Boolean(error?.matches("[role='alert'], [aria-live]")),
    };
  });
  assert.equal(result.invalid, "true");
  assert.equal(result.hasError, true);
  assert.equal(result.announced, true);
});
