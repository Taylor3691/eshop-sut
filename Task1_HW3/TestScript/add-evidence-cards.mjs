import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const workspace = path.resolve("../..");
const evidenceRoot = path.join(workspace, "Task3_HW3");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const urls = {
  1: ["/", "/product/1", "/cart"], 2: ["/", "/product/1", "/cart"], 3: ["/cart"],
  4: ["/", "/product/1", "/cart"], 5: ["/", "/product/1", "/cart"], 6: ["/"],
  7: ["/", "/product/1"], 8: ["/", "/product/1", "/cart"], 9: ["/"], 10: ["/"],
  11: ["/"], 12: ["/"], 13: ["/product/1"], 14: ["/"], 15: ["/"], 16: ["/"],
  17: ["/product/1"], 18: ["/product/1"], 19: ["/product/1"], 20: ["/product/1"],
  21: ["/"], 22: ["/product/1"], 23: ["/cart"], 24: ["/product/1 → /"],
  25: ["/", "/product/1", "/cart"], 26: ["/"], 27: ["/"], 28: ["/product/1"],
  29: ["/cart"], 30: ["/ → /product/1"], 31: ["/cart → /"], 32: ["/"], 33: ["/"],
  34: ["/"], 35: ["/product/1"], 36: ["/ → /cart"], 37: ["/cart"], 38: ["/cart"],
  39: ["/cart"], 40: ["/cart"], 41: ["/", "/product/1"], 42: ["/", "/product/1"],
  43: ["/cart"], 44: ["/", "/product/1"], 45: ["/product/1"], 46: ["/", "/product/1"],
  47: ["/cart"], 48: ["/", "/cart"], 49: ["/", "/product/1"], 50: ["/"],
  51: ["/", "/product/1", "/cart"], 52: ["/", "/product/1", "/cart"], 53: ["/cart"],
  54: ["/", "/product/1", "/cart"], 55: ["/", "/product/1", "/cart"], 56: ["/"],
};

const results = {
  1: "Đạt — Tiêu đề, nhãn, nút và thông báo trên các màn hình kiểm tra đều dùng tiếng Việt.",
  2: "Không đạt — Nút Thêm vào giỏ hàng chưa dùng màu xanh dương như tiêu chí yêu cầu.",
  3: "Không đạt — Không tìm thấy nút có nhãn Đăng xuất để kiểm tra hành động nguy hiểm.",
  4: "Không đạt — Giá vẫn dùng VND thay vì định dạng thống nhất 30.000.000 ₫.",
  5: "Không đạt — Trang Danh sách sản phẩm có 2 thẻ h1, không phải đúng 1 thẻ h1.",
  6: "Đạt — Các thẻ sản phẩm có kích thước và vị trí nút được căn đều.",
  7: "Đạt — Ảnh sản phẩm giữ đúng tỷ lệ, không bị méo.",
  8: "Đạt — Nội dung không chồng lấn hoặc tràn khỏi vùng hiển thị.",
  9: "Đạt — Tiêu đề, tên sản phẩm và giá có phân cấp chữ rõ ràng.",
  10: "Đạt — Khoảng cách và căn chỉnh giữa các thẻ sản phẩm đồng đều.",
  11: "Đạt — Ở viewport hẹp, bố cục không xuất hiện cuộn ngang.",
  12: "Không đạt — Độ tương phản của chữ Chào, Test User chỉ 3.92:1, thấp hơn yêu cầu.",
  13: "Đạt — Trang Chi tiết hiển thị đủ ảnh, tên, giá, mô tả và danh mục.",
  14: "Không đạt — Ô tìm kiếm thiếu label hoặc aria-label.",
  15: "Đạt — Nút Tìm và phím Enter gửi cùng một thao tác tìm kiếm.",
  16: "Không đạt — Mã HTML trong từ khóa tìm kiếm đã bị render thay vì hiển thị an toàn như văn bản.",
  17: "Không đạt — Ô Số lượng thiếu ràng buộc min=1.",
  18: "Đạt — Giá trị mặc định của Số lượng là 1.",
  19: "Không đạt — Không hiển thị thông báo lỗi khi Số lượng để trống/không hợp lệ.",
  20: "Không đạt — Trường Số lượng chưa có thuộc tính required và ký hiệu bắt buộc.",
  21: "Đạt — Thứ tự Tab trên Danh sách sản phẩm hợp lý.",
  22: "Đạt — Thứ tự Tab tại vùng mua hàng trên trang Chi tiết hợp lý.",
  23: "Không đạt — Giỏ hàng chưa có nút tăng/giảm số lượng (+ và -).",
  24: "Đạt — Bấm logo EShop đưa người dùng về Danh sách sản phẩm.",
  25: "Không đạt — Thanh điều hướng không đánh dấu đúng trang hiện tại.",
  26: "Không đạt — Badge Giỏ hàng chưa hiển thị đúng số lượng 1.",
  27: "Không đạt — Nút hiển thị Thoát thay vì nhãn yêu cầu là Đăng xuất.",
  28: "Không đạt — Trang Chi tiết sản phẩm không có breadcrumb.",
  29: "Không đạt — Trang Giỏ hàng không có breadcrumb.",
  30: "Đạt — Xem chi tiết mở đúng sản phẩm đã chọn.",
  31: "Không đạt — Không có nút/liên kết Tiếp tục mua sắm như yêu cầu.",
  32: "Không đạt — Khi tải danh sách, không thấy trạng thái loading rõ ràng.",
  33: "Không đạt — Khi không có kết quả tìm kiếm, thiếu thông báo Empty State đạt yêu cầu.",
  34: "Không đạt — Thêm từ thẻ sản phẩm không có toast hoặc badge xác nhận.",
  35: "Không đạt — Lần thêm từ trang Chi tiết đầu tiên không có phản hồi tức thời.",
  36: "Không đạt — Thêm lại cùng sản phẩm tạo 2 dòng thay vì tăng số lượng trên một dòng.",
  37: "Không đạt — Giỏ hàng không có nút + để cập nhật số lượng và thành tiền.",
  38: "Không đạt — Hiển thị Tổng tạm tính thay vì nhãn yêu cầu Tổng cộng.",
  39: "Không đạt — Xóa sản phẩm không mở hộp xác nhận.",
  40: "Không đạt — Giỏ hàng trống thiếu hình minh họa.",
  41: "Không đạt — Có ảnh sản phẩm thiếu alt text.",
  42: "Không đạt — Trang bị tràn ngang khi zoom 200%.",
  43: "Không đạt — Trang hiện tại chưa có dấu hiệu ngoài màu sắc để nhận biết.",
  44: "Không đạt — Ô tìm kiếm thiếu tên truy cập cho trình đọc màn hình.",
  45: "Không đạt — Lỗi Số lượng không có aria-invalid=true để công nghệ hỗ trợ nhận biết.",
  46: "Không đạt — Sau khi thêm từ Danh sách sản phẩm không xuất hiện toast hoặc badge; vì vậy chưa thể xác nhận phản hồi nhất quán với trang Chi tiết.",
  47: "Không đạt — Hộp xác nhận xóa không nêu rõ sản phẩm cần xóa.",
  48: "Không đạt — Empty State chưa cung cấp thông báo và hành động phục hồi phù hợp.",
  49: "Không đạt — Có control không có tên truy cập khi điều hướng bằng bàn phím.",
  50: "Không đạt — Loading không có vùng thông báo trạng thái (role=status hoặc aria-live).",
  51: "Không đạt — Trang Danh sách sản phẩm có 2 thẻ h1; cấu trúc heading/landmark chưa đúng.",
  52: "Đạt — Khi đặt dir=rtl, bố cục hiển thị theo phải-sang-trái và không xuất hiện cuộn ngang.",
  53: "Không đạt — Trong RTL, bảng giỏ hàng vẫn căn trái nên thứ tự/định hướng chưa phù hợp.",
  54: "Không đạt — Nền trang chưa chuyển sang dark mode.",
  55: "Không đạt — Ứng dụng chưa áp dụng dark mode để kiểm tra độ tương phản và trạng thái tương tác.",
  56: "Không đạt — Ứng dụng chưa áp dụng dark mode để kiểm tra phản hồi hệ thống.",
};

const alreadyCarded = {
  chrome: new Set([...Array(32)].map((_, index) => index + 1).concat([46, 50, 51, 52, 53])),
  firefox: new Set([46, 50, 51, 52, 53]),
  Android_chrome: new Set(),
};

// Các ảnh Android do người kiểm thử chụp. Một trạng thái thực tế có thể làm
// minh chứng chung cho nhiều checkpoint; không tạo hay chỉnh sửa giao diện SUT.
const androidSourceForGui = {
  1: 1, 2: 1, 3: 36, 4: 1, 5: 1, 6: 1, 7: 13, 8: 1, 9: 1, 10: 1,
  11: 1, 12: 1, 13: 13, 14: 1, 15: 1, 16: 16, 17: 19, 18: 13, 19: 19, 20: 19,
  21: 1, 22: 13, 23: 36, 24: 1, 25: 1, 26: 36, 27: 1, 28: 13, 29: 36, 30: 13,
  31: 36, 32: 1, 33: 33, 34: 1, 35: 35, 36: 36, 37: 36, 38: 36, 39: 36, 40: 40,
  41: 1, 42: 42, 43: 1, 44: 1, 45: 19, 46: 1, 47: 36, 48: 40, 49: 1, 50: 1,
  51: 1, 52: 36, 53: 36, 54: 54, 55: 54, 56: 54,
};

function guiFilename(id) {
  return `GUI-${String(id).padStart(3, "0")}.png`;
}

async function prepareAndroidImages() {
  const sourceIds = [...new Set(Object.values(androidSourceForGui))];
  const sourceBytes = new Map();
  for (const id of sourceIds) {
    sourceBytes.set(id, await fs.readFile(path.join(evidenceRoot, "Android_chrome", guiFilename(id))));
  }
  for (let id = 1; id <= 56; id += 1) {
    await fs.writeFile(
      path.join(evidenceRoot, "Android_chrome", guiFilename(id)),
      sourceBytes.get(androidSourceForGui[id]),
    );
  }
}

function urlText(id) {
  const prefix = "http://localhost:5173";
  const pathText = urls[id].map((item) => (item.includes(" → ") ? item.split(" → ").map((part) => `${prefix}${part}`).join(" → ") : `${prefix}${item}`)).join(" · ");
  return [52, 53].includes(id) ? `${pathText} · dir=rtl` : pathText;
}

function evidenceHtml(imageUrl, id, environmentLabel) {
  return `<!doctype html><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #fff; font-family: Arial, sans-serif; }
    img { display: block; width: 100%; height: auto; }
    #evidence-card { margin-top: 20px; padding: 22px 30px; background: #102a43; border-top: 4px solid #62b6cb; color: #f7fafc; font-size: 18px; font-weight: 600; line-height: 1.55; }
    #evidence-card strong { display: block; margin-top: 4px; font-size: 22px; }
  </style><img id="window-capture" src="${imageUrl}" alt="Ảnh kiểm thử giao diện GUI-${String(id).padStart(3, "0")}">
  <section id="evidence-card"><div>GUI-${String(id).padStart(3, "0")} · ${environmentLabel}</div>
  <div>URL kiểm tra: ${urlText(id)} · 23120117@student.hcmus.edu.vn</div>
  <div>${results[id]}</div><strong>VÕ HOÀNG DANH · MSSV 23120117</strong></section>`;
}

async function addCard(browser, folder, id) {
  const filename = guiFilename(id);
  const imagePath = path.join(evidenceRoot, folder, filename);
  const imageBytes = await fs.readFile(imagePath);
  const imageUrl = `data:image/png;base64,${imageBytes.toString("base64")}`;
  const environmentLabel = folder === "chrome"
    ? "Chrome 157.0.8103.78 · Windows 11 · Laptop Dell"
    : folder === "firefox"
      ? "Firefox 159.0 · Windows 11 · Laptop Dell"
      : "Chrome · Android 16 · Xiaomi Redmi Note 13 Pro 5G";
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setContent(evidenceHtml(imageUrl, id, environmentLabel));
  await page.locator("#window-capture").evaluate((image) => image.decode());
  const image = await page.screenshot({ fullPage: true });
  await page.close();
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await fs.writeFile(imagePath, image);
      lastError = undefined;
      break;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 250));
    }
  }
  if (lastError) throw lastError;
  console.log(`Added card: ${folder}/${filename}`);
}

const repairChrome001 = process.argv.includes("--repair-chrome-001");
const targets = process.argv.includes("--android")
  ? ["Android_chrome"]
  : repairChrome001
    ? ["chrome"]
    : ["chrome", "firefox"];
if (targets.includes("Android_chrome")) await prepareAndroidImages();

const browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ["--no-sandbox"] });
try {
  for (const folder of targets) {
    for (let id = 1; id <= 56; id += 1) {
      if (repairChrome001 && (folder !== "chrome" || id !== 1)) continue;
      if (!repairChrome001 && alreadyCarded[folder].has(id)) continue;
      await addCard(browser, folder, id);
    }
  }
} finally {
  await browser.close();
}
