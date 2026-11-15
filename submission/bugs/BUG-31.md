# BUG-31: [Sản phẩm, Mã giảm giá] Cuộn chuột trên ô số làm đổi giá trị đã nhập

| Trường | Giá trị |
|---|---|
| GitHub Issue | [#148](https://github.com/Taylor3691/eshop-sut/issues/148) |
| Nguồn phát hiện | Checklist GUI-02-24 |
| Màn hình | Quản lý Sản phẩm, Quản lý Mã giảm giá |
| Môi trường | macOS 27.2, Google Chrome 157.0.8103.51 (Playwright, headless), http://localhost:5174 |
| Severity | Minor — giá có thể bị đổi mà người dùng không để ý |
| Priority | Low |
| Tham chiếu spec | BP |

**Điều kiện tiên quyết:** SUT chạy bằng `scripts/start-sut.sh` (+ `scripts/seed-hw03.sh 3`); đăng nhập Web Admin bằng `admin@eshop.com` / `Admin123!`.

**Bước tái hiện:**
1. Tab Sản phẩm, bấm vào ô Giá, nhập 100000.
2. Giữ con trỏ trên ô, cuộn chuột lên 2 nấc.
3. Lặp lại ở ô Giá trị giảm (tab Mã Giảm Giá), cuộn xuống.

**Kết quả mong đợi:** BP: cuộn chuột không làm đổi giá trị ô số.

**Kết quả thực tế:** Ô Giá đổi 100000 → 100002; ô Giá trị giảm đổi 50 → 48. Ghi chú: quan sát bằng Playwright (headless), nên xác nhận lại bằng chuột thật.

**Ảnh chụp:**

![GUI-02-24.png](../task1-checklist/screenshots/failed/GUI-02-24.png)
![GUI-02-24-2.png](../task1-checklist/screenshots/failed/GUI-02-24-2.png)

**Kết quả cross-browser (Task 3, trình duyệt thật trên macOS, 15/11/2026):**

| Trình duyệt | Ô Giá 100000, cuộn lên 3 nấc | Kết quả |
|---|---|---|
| Chrome (macOS) | 100000 → 100003 | Lỗi xảy ra |
| Firefox 153.0.4 (macOS) | giữ 100000 | Không xảy ra |
| Safari 27.2 (macOS) | giữ 100000 (cuộn bằng sự kiện giả lập, cần xác nhận bằng chuột thật) | Không xảy ra |

Lỗi chỉ tái hiện trên Chrome (hành vi mặc định của Chrome với `<input type="number">` đang focus); cần chặn sự kiện wheel trên ô số để thống nhất giữa các trình duyệt.

![GUI-02-24_CH.png](../task3-crossplatform/chrome/GUI-02-24_CH.png)
![GUI-02-24_FF.png](../task3-crossplatform/firefox/GUI-02-24_FF.png)
![GUI-02-24_SF.png](../task3-crossplatform/safari/GUI-02-24_SF.png)
