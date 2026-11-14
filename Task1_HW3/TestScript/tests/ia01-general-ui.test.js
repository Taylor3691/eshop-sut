import {
  assert,
  assertNoHorizontalOverflow,
  assertReadableContrast,
  assertVisibleInsideViewport,
  backgroundLuminance,
  clickByText,
  colorIsDominant,
  gotoApp,
  openCartWithOneItem,
  openDetail,
  requireByText,
  visibleBodyText,
} from "../lib/ui-helpers.js";
import { test } from "../lib/test-runner.js";

test(1, "Nhất quán ngôn ngữ trên ba màn hình", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1", "/cart"]) {
    await gotoApp(page, path);
    const text = await visibleBodyText(page);
    assert.doesNotMatch(text, /\b(Search|Cart|Logout|Add to cart|Checkout|Continue shopping|Loading)\b/i);
  }
});

test(2, "Nút hành động tích cực dùng màu xanh dương", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  for (const label of ["Tìm", "Thêm vào giỏ"]) {
    const button = await requireByText(page, "main button", label, true);
    assert.equal(await colorIsDominant(button, "blue", true), true, `Nút ${label} không có màu xanh dương`);
    await button.dispose();
  }
  await openDetail(page);
  const add = await requireByText(page, "main button", "Thêm vào giỏ hàng", true);
  assert.equal(await colorIsDominant(add, "blue", true), true, "Nút Thêm vào giỏ hàng không có màu xanh dương");
  await add.dispose();
  await openCartWithOneItem(page);
  const checkout = await requireByText(page, "main button", "Tiến hành thanh toán", true);
  assert.equal(await colorIsDominant(checkout, "blue", true), true, "Nút thanh toán không có màu xanh dương");
});

test(3, "Nút nguy hiểm dùng màu đỏ", async ({ newPage }) => {
  const page = await newPage();
  await openCartWithOneItem(page);
  const remove = await requireByText(page, "main button", "Xóa", true);
  assert.equal(await colorIsDominant(remove, "red", false), true, "Nút Xóa không có màu đỏ");
  const logout = await requireByText(page, "header button", "Đăng xuất", true);
  assert.equal(await colorIsDominant(logout, "red", true), true, "Nút Đăng xuất không có màu đỏ");
});

test(4, "Định dạng tiền tệ thống nhất", async ({ newPage }) => {
  const page = await newPage();
  const moneyPattern = /^\d{1,3}(?:\.\d{3})* ₫$/;
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path);
    const texts = await page.$$eval("main p, main td, main span", (elements) =>
      elements.map((element) => element.textContent?.trim() || "").filter(Boolean),
    );
    assert.ok(texts.some((text) => moneyPattern.test(text)), `Không tìm thấy giá đúng định dạng tại ${path}`);
    assert.equal(texts.some((text) => /\bVND\b/.test(text)), false, `Còn dùng VND tại ${path}`);
  }
  await openCartWithOneItem(page);
  const cartText = await visibleBodyText(page);
  assert.doesNotMatch(cartText, /\bVND\b/);
});

test(5, "Mỗi trang có đúng một h1", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  assert.equal(await page.$$eval("main h1", (items) => items.length), 1, "Trang Danh sách không có đúng một h1");
  await openDetail(page);
  assert.equal(await page.$$eval("main h1", (items) => items.length), 1, "Trang Chi tiết không có đúng một h1");
  await openCartWithOneItem(page);
  assert.equal(await page.$$eval("main h1", (items) => items.length), 1, "Trang Giỏ hàng không có đúng một h1");
});

test(6, "Các thẻ sản phẩm được căn đều", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const layout = await page.$$eval("main .grid > div", (cards) =>
    cards.slice(0, 3).map((card) => {
      const rect = card.getBoundingClientRect();
      const actions = card.querySelector("a")?.parentElement?.getBoundingClientRect();
      return { width: rect.width, top: rect.top, actionTop: actions?.top || 0 };
    }),
  );
  assert.equal(layout.length, 3);
  assert.ok(Math.max(...layout.map((item) => item.width)) - Math.min(...layout.map((item) => item.width)) <= 2);
  assert.ok(Math.max(...layout.map((item) => item.actionTop)) - Math.min(...layout.map((item) => item.actionTop)) <= 2);
});

test(7, "Ảnh sản phẩm không bị méo", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path);
    const images = await page.$$eval("main img", (items) =>
      items.map((image) => {
        const rect = image.getBoundingClientRect();
        const naturalRatio = image.naturalWidth / image.naturalHeight;
        const renderedRatio = rect.width / rect.height;
        return { naturalRatio, renderedRatio, objectFit: getComputedStyle(image).objectFit };
      }),
    );
    assert.ok(images.length > 0);
    for (const image of images) {
      const preservesRatio = Math.abs(image.naturalRatio - image.renderedRatio) < 0.05;
      assert.ok(preservesRatio || ["cover", "contain"].includes(image.objectFit), `Ảnh bị méo tại ${path}`);
    }
  }
});

test(8, "Nội dung không chồng lấn hoặc tràn khung", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await assertNoHorizontalOverflow(page);
  await assertVisibleInsideViewport(page, "main h1, main img, main button, main a");
  await openDetail(page);
  await assertNoHorizontalOverflow(page);
  await assertVisibleInsideViewport(page, "main h1, main img, main button, main input");
  await openCartWithOneItem(page);
  await assertNoHorizontalOverflow(page);
  await assertVisibleInsideViewport(page, "main table, main button, main a");
});

test(9, "Phân cấp chữ rõ ràng", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const sizes = await page.evaluate(() => ({
    h1: Number.parseFloat(getComputedStyle(document.querySelector("main h1")).fontSize),
    h2: Number.parseFloat(getComputedStyle(document.querySelector("main h2")).fontSize),
    price: Number.parseFloat(getComputedStyle(document.querySelector("main p")).fontSize),
  }));
  assert.ok(sizes.h1 > sizes.h2 && sizes.h2 >= sizes.price, `Phân cấp cỡ chữ chưa rõ: ${JSON.stringify(sizes)}`);
});

test(10, "Khoảng cách và căn chỉnh trong lưới đồng đều", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const result = await page.$eval("main .grid", (grid) => {
    const style = getComputedStyle(grid);
    const cards = [...grid.children].slice(0, 3).map((item) => item.getBoundingClientRect());
    const gaps = cards.slice(1).map((rect, index) => rect.left - cards[index].right);
    return { columnGap: Number.parseFloat(style.columnGap), gaps };
  });
  assert.ok(result.columnGap > 0);
  assert.ok(result.gaps.every((gap) => Math.abs(gap - result.gaps[0]) <= 2));
});

test(11, "Bố cục responsive không tràn ngang", async ({ newPage }) => {
  const page = await newPage({ viewport: { width: 375, height: 812 } });
  await gotoApp(page, "/");
  await assertNoHorizontalOverflow(page, "Danh sách sản phẩm tràn ngang");
  await assertVisibleInsideViewport(page, "main button, main a");
  await openDetail(page);
  await assertNoHorizontalOverflow(page, "Chi tiết sản phẩm tràn ngang");
  await assertVisibleInsideViewport(page, "main input, main button");
  await openCartWithOneItem(page);
  await assertNoHorizontalOverflow(page, "Giỏ hàng tràn ngang");
});

test(12, "Độ tương phản chữ đạt yêu cầu", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  await assertReadableContrast(page, "header a, header button, main h1, main h2, main p, main button, main a");
});

test(13, "Trang Chi tiết có đủ thông tin sản phẩm", async ({ newPage }) => {
  const page = await newPage();
  await openDetail(page);
  const text = await visibleBodyText(page);
  for (const expected of ["iPhone 15 Pro Max", "30.000.000 ₫", "Điện thoại cao cấp của Apple", "Điện thoại"]) {
    assert.ok(text.includes(expected), `Thiếu thông tin: ${expected}`);
  }
  assert.equal(await page.$$eval("main img", (items) => items.length), 1);
});

test(41, "Ảnh sản phẩm có alt text phù hợp", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/");
  const homeAlts = await page.$$eval("main img", (items) => items.map((item) => item.getAttribute("alt")));
  assert.ok(homeAlts.every((alt) => Boolean(alt?.trim())), "Có ảnh trong danh sách thiếu alt text");
  await openDetail(page);
  assert.equal(await page.$eval("main img", (item) => item.getAttribute("alt")), "iPhone 15 Pro Max");
});

test(42, "Nội dung dùng được khi phóng to 200%", async ({ newPage }) => {
  const page = await newPage({ viewport: { width: 720, height: 800 } });
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path);
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    await assertNoHorizontalOverflow(page, `Trang ${path} tràn khi zoom 200%`);
    await assertVisibleInsideViewport(page, "main button, main a, main input");
  }
});

test(43, "Thông tin không chỉ được thể hiện bằng màu", async ({ newPage }) => {
  const page = await newPage();
  await gotoApp(page, "/cart");
  const active = await page.$("header [aria-current='page'], header .active, header [data-active='true']");
  assert.ok(active, "Trang hiện tại chỉ dựa vào màu hoặc chưa có dấu hiệu ngoài màu");
  const labels = await page.$$eval("button, a", (items) => items.map((item) => item.textContent?.trim()).filter(Boolean));
  assert.ok(labels.includes("Đăng xuất") && labels.includes("Xóa"));
});

test(51, "Trang có landmark, heading và bảng ngữ nghĩa", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path);
    assert.equal(await page.$$eval("header", (items) => items.length), 1);
    assert.equal(await page.$$eval("nav", (items) => items.length), 1);
    assert.equal(await page.$$eval("main", (items) => items.length), 1);
    assert.equal(await page.$$eval("main h1", (items) => items.length), 1);
  }
  await openCartWithOneItem(page);
  assert.equal(await page.$$eval("main h1", (items) => items.length), 1);
  const headerScopes = await page.$$eval("table th", (items) => items.map((item) => item.getAttribute("scope")));
  assert.ok(headerScopes.length > 0 && headerScopes.every((scope) => scope === "col"));
});

test(52, "Bố cục không vỡ trong RTL", async ({ newPage }) => {
  const page = await newPage();
  for (const path of ["/", "/product/1"]) {
    await gotoApp(page, path, { rtl: true });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).direction), "rtl");
    await assertNoHorizontalOverflow(page, `RTL bị tràn tại ${path}`);
    await assertVisibleInsideViewport(page, "header *, main *");
  }
  await openCartWithOneItem(page);
  await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
  await assertNoHorizontalOverflow(page, "RTL bị tràn tại Giỏ hàng");
});

test(54, "Dark mode được áp dụng nhất quán", async ({ newPage }) => {
  const page = await newPage({ dark: true });
  await gotoApp(page, "/");
  assert.ok((await backgroundLuminance(page, ".min-h-screen")) < 0.35, "Nền chính chưa chuyển sang tối");
  for (const selector of ["header", "main .grid > div", "footer", "main input"]) {
    assert.ok((await backgroundLuminance(page, selector)) < 0.45, `${selector} chưa có nền tối`);
  }
});

test(55, "Dark mode giữ độ tương phản và trạng thái rõ ràng", async ({ newPage }) => {
  const page = await newPage({ dark: true });
  await gotoApp(page, "/");
  assert.ok((await backgroundLuminance(page, ".min-h-screen")) < 0.35, "Ứng dụng chưa bật dark mode");
  await assertReadableContrast(page, "header a, header button, main h1, main h2, main p, main button, main a");
  const focusable = await page.$$("main button, main a, main input");
  for (const item of focusable) {
    await item.focus();
    const outline = await item.evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.outlineStyle} ${style.outlineWidth}`;
    });
    assert.doesNotMatch(outline, /^none 0px$/);
  }
});
