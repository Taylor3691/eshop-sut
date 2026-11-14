# Puppeteer TestScript cho GUI Checklist

Bộ test tự động hóa **56 mục** trong `GUI_checklist.md` cho luồng:

```text
Danh sách sản phẩm → Chi tiết sản phẩm → Thêm vào giỏ → Giỏ hàng
```

## Cấu trúc

```text
TestScript/
├── config.js
├── package.json
├── run-tests.js
├── lib/
│   ├── test-data.js
│   ├── test-runner.js
│   └── ui-helpers.js
└── tests/
    ├── ia01-general-ui.test.js
    ├── ia02-forms-controls.test.js
    ├── ia03-navigation.test.js
    └── ia04-feedback-state.test.js
```

Mỗi test có mã tương ứng với số thứ tự trong checklist, từ `GUI-01` đến `GUI-56`.

## Chuẩn bị

Yêu cầu Node.js 18 trở lên. Cài Puppeteer trong thư mục này:

```powershell
cd Task1_HW3\TestScript
npm install
```

Script tự dùng Google Chrome tại đường dẫn mặc định trên Windows nếu tìm thấy. Có thể chỉ định trình duyệt khác bằng:

```powershell
$env:PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Khởi chạy frontend web ở một terminal khác:

```powershell
cd frontend-web
npm install
npm run dev
```

Backend không bắt buộc cho bộ test này vì các API sản phẩm và người dùng được giả lập trong Puppeteer. Điều này giúp dữ liệu ổn định và tránh làm thay đổi database.

## Chạy test

Chạy headless:

```powershell
cd Task1_HW3\TestScript
npm test
```

Chạy có hiển thị trình duyệt:

```powershell
npm run test:headed
```

Nếu frontend chạy ở URL khác:

```powershell
$env:ESHOP_BASE_URL="http://localhost:5173"
npm test
```

Có thể đổi timeout và viewport:

```powershell
$env:GUI_TEST_TIMEOUT="15000"
$env:GUI_VIEWPORT_WIDTH="1440"
$env:GUI_VIEWPORT_HEIGHT="900"
npm test
```

## Kết quả

Sau khi chạy, script tạo:

- `reports/results.json`: kết quả có cấu trúc để xử lý tự động.
- `reports/results.md`: bảng kết quả dễ đưa vào báo cáo.
- `reports/screenshots/GUI-XX.png`: ảnh chụp toàn trang cho từng test thất bại.

Script chạy tiếp sau khi một test thất bại và trả exit code `1` nếu có ít nhất một mục Không đạt.

## Lưu ý về phạm vi tự động hóa

- Các tiêu chí thị giác được kiểm tra bằng thuộc tính DOM, CSS tính toán, kích thước và vị trí phần tử.
- Accessibility được kiểm tra qua tên truy cập, cấu trúc ngữ nghĩa, ARIA, thứ tự focus và độ tương phản. Việc nghe và đánh giá chất lượng giọng đọc thực tế vẫn nên được xác nhận thêm bằng NVDA/VoiceOver.
- Zoom 200% được mô phỏng bằng CSS zoom kết hợp viewport thu hẹp.
- RTL được kích hoạt bằng `dir="rtl"` trên phần tử `<html>`.
- Dark mode được yêu cầu qua `prefers-color-scheme: dark`. Nếu SUT không có cơ chế dark mode, các test tương ứng sẽ thất bại đúng theo checklist.
- Nhiều lỗi trong SUT là cố ý. Test thất bại là kết quả kiểm thử, không phải lỗi của TestScript.
