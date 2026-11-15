# BUG-19: [Sản phẩm, Dashboard, Mã giảm giá] Số tiền không theo định dạng vi-VN thống nhất

| Trường | Giá trị |
|---|---|
| GitHub Issue | [#136](https://github.com/Taylor3691/eshop-sut/issues/136) |
| Nguồn phát hiện | Checklist GUI-01-09, GUI-01-10 |
| Màn hình | Quản lý Sản phẩm, Dashboard, Quản lý Mã giảm giá |
| Môi trường | macOS 27.2, Google Chrome 157.0.8103.51 (Playwright, headless), http://localhost:5174 |
| Severity | Minor — giá khó đọc, định dạng khác nhau giữa các màn |
| Priority | Medium |
| Tham chiếu spec | FR-21, giải đáp 11 |

**Điều kiện tiên quyết:** SUT chạy bằng `scripts/start-sut.sh` (+ `scripts/seed-hw03.sh 3`); đăng nhập Web Admin bằng `admin@eshop.com` / `Admin123!`.

**Bước tái hiện:**
1. Tab Sản phẩm: xem cột Giá.
2. Đặt ngôn ngữ trình duyệt là English (US), tải lại, xem Dashboard và bảng Mã giảm giá.

**Kết quả mong đợi:** FR-21: luôn dùng ký hiệu ₫ với định dạng phân cách hàng nghìn. Giải đáp 11: định dạng vi-VN `1.234.567 ₫`, thống nhất giữa các màn.

**Kết quả thực tế:** Cột Giá in thô "30000000 ₫" (không phân cách). Dashboard và bảng Mã giảm giá đổi theo ngôn ngữ trình duyệt: vi-VN "60.000.000 ₫", en-US "60,000,000 ₫".

**Ảnh chụp:**

![GUI-01-09.png](../task1-checklist/screenshots/failed/GUI-01-09.png)
![GUI-01-10.png](../task1-checklist/screenshots/failed/GUI-01-10.png)
![GUI-01-10-3.png](../task1-checklist/screenshots/failed/GUI-01-10-3.png)
![GUI-01-10-4.png](../task1-checklist/screenshots/failed/GUI-01-10-4.png)

**Kết quả cross-browser (Task 3, trình duyệt thật trên macOS, 15/11/2026):**

| Trình duyệt | Cột Giá (Sản phẩm) | Bảng Mã giảm giá |
|---|---|---|
| Chrome (macOS) | 30000000 ₫ | 300,000 ₫ |
| Firefox 153.0.4 (macOS, giao diện tiếng Việt) | 30000000 ₫ | 300.000 ₫ |
| Safari 27.2 (macOS) | 30000000 ₫ | 300,000 ₫ |

Cùng một dữ liệu, Firefox hiện dấu chấm còn Chrome và Safari hiện dấu phẩy, xác nhận định dạng tiền phụ thuộc ngôn ngữ của trình duyệt chứ không cố định vi-VN.

![GUI-01-10-2_CH.png](../task3-crossplatform/chrome/GUI-01-10-2_CH.png)
![GUI-01-10-2_FF.png](../task3-crossplatform/firefox/GUI-01-10-2_FF.png)
![GUI-01-10-2_SF.png](../task3-crossplatform/safari/GUI-01-10-2_SF.png)
