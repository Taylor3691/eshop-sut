import {
  assert,
  clickByText,
  focusableElements,
  gotoApp,
  openCartWithOneItem,
  openDetail,
  requireByText,
  visibleBodyText,
} from "../lib/ui-helpers.js";
import { test } from "../lib/test-runner.js";

test(24, "Logo EShop đưa về Danh sách sản phẩm", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  await clickByText(page, "header a", "EShop", true);
  await page.waitForFunction(() => location.pathname === "/");
  assert.match(await visibleBodyText(page), /Danh sách sản phẩm/);
});

test(25, "Thanh điều hướng làm nổi bật đúng trang", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1", "/cart"]) {
    await gotoApp(page, path);
    const current = await page.$$("header [aria-current='page'], header .active, header [data-active='true']");
    assert.equal(current.length, 1, `Phải có đúng một mục đang hoạt động tại ${path}`);
  }
});

test(26, "Giỏ hàng có badge số lượng đúng", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await clickByText(page, "main button", "Thêm vào giỏ", true);
  const cartLink = await requireByText(page, "header a", "Giỏ hàng", false);
  const result = await cartLink.evaluate((link) => ({
    text: link.textContent?.replace(/\s+/g, " ").trim(),
    badge: link.querySelector("[class*='badge'], [data-count], [aria-label*='sản phẩm']")?.textContent?.trim() || "",
  }));
  assert.match(`${result.text} ${result.badge}`, /1/, "Badge Giỏ hàng chưa hiển thị số lượng 1");
});

test(27, "Nút đăng xuất có đúng nhãn", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const text = await page.$$eval("header button", (items) => items.map((item) => item.textContent?.trim()));
  assert.ok(text.includes("Đăng xuất"), `Nhãn hiện tại: ${text.join(", ")}`);
  assert.equal(text.includes("Thoát"), false);
});

test(28, "Chi tiết sản phẩm có breadcrumb", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  const breadcrumb = await page.$("main nav[aria-label*='readcrumb' i], main .breadcrumb, main [data-testid='breadcrumb']");
  assert.ok(breadcrumb, "Không có breadcrumb ở Chi tiết sản phẩm");
  const text = await breadcrumb.evaluate((element) => element.textContent?.replace(/\s+/g, " ").trim());
  assert.match(text, /Trang chủ|Danh sách sản phẩm/);
  assert.match(text, /Chi tiết|iPhone 15 Pro Max/);
});

test(29, "Giỏ hàng có breadcrumb", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  const breadcrumb = await page.$("main nav[aria-label*='readcrumb' i], main .breadcrumb, main [data-testid='breadcrumb']");
  assert.ok(breadcrumb, "Không có breadcrumb ở Giỏ hàng");
  const text = await breadcrumb.evaluate((element) => element.textContent?.replace(/\s+/g, " ").trim());
  assert.match(text, /Trang chủ|Danh sách sản phẩm/);
  assert.match(text, /Giỏ hàng/i);
});

test(30, "Xem chi tiết mở đúng sản phẩm", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const card = await page.$("main .grid > div");
  const expected = await card.evaluate((element) => ({
    name: element.querySelector("h2")?.textContent?.trim(),
    price: element.querySelector("p")?.textContent?.trim(),
    image: element.querySelector("img")?.getAttribute("src"),
  }));
  const link = await card.$("a");
  await link.click();
  await page.waitForSelector("main h1");
  const actual = await page.evaluate(() => ({
    name: document.querySelector("main h1")?.textContent?.trim(),
    price: document.querySelector("main p")?.textContent?.trim(),
    image: document.querySelector("main img")?.getAttribute("src"),
  }));
  assert.equal(actual.name, expected.name);
  assert.equal(actual.price, expected.price?.replace("VND", "₫"));
  assert.equal(actual.image, expected.image);
});

test(31, "Tiếp tục mua sắm giữ nguyên giỏ hàng", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  await clickByText(page, "main a, main button", "Tiếp tục mua sắm", true);
  await page.waitForFunction(() => location.pathname === "/");
  await clickByText(page, "header a", "Giỏ hàng", false);
  await page.waitForSelector("main table tbody tr");
  assert.equal(await page.$$eval("main table tbody tr", (items) => items.length), 1);
});

test(49, "Có thể điều hướng toàn bộ luồng bằng bàn phím", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path);
    const elements = await page.$$("main a[href], main button:not([disabled]), main input:not([disabled])");
    assert.ok(elements.length > 0);
    for (const element of elements) {
      await element.focus();
      const state = await element.evaluate((item) => {
        const style = getComputedStyle(item);
        const rect = item.getBoundingClientRect();
        const name = item.getAttribute("aria-label") || item.textContent?.trim() || item.getAttribute("placeholder") || "";
        return {
          focused: document.activeElement === item,
          visible: rect.width > 0 && rect.height > 0,
          name,
          focusVisible: style.outlineStyle !== "none" || style.boxShadow !== "none" || style.borderColor !== "rgba(0, 0, 0, 0)",
        };
      });
      assert.equal(state.focused && state.visible, true);
      assert.ok(state.name.length > 0, "Có control không có tên");
      assert.equal(state.focusVisible, true, `Không thấy focus ở ${state.name}`);
    }
  }
});

test(53, "Thứ tự và ký hiệu điều hướng đúng trong RTL", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
  const direction = await page.evaluate(() => getComputedStyle(document.documentElement).direction);
  assert.equal(direction, "rtl");
  const tableAlignment = await page.$eval("main table", (table) => getComputedStyle(table).textAlign);
  assert.notEqual(tableAlignment, "left", "Bảng vẫn căn trái trong RTL");
  const back = await page.$eval("main a[href='/']", (link) => link.textContent?.trim() || "");
  assert.match(back, /→/, "Mũi tên quay lại chưa đổi hướng trong RTL");
  const focusables = await focusableElements(page);
  assert.ok(focusables.length > 0);
  const text = await visibleBodyText(page);
  assert.match(text, /\d{1,3}(?:\.\d{3})* ₫/);
});
