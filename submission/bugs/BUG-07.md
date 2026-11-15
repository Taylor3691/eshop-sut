# BUG-07: [Quản lý Sản phẩm] Form sản phẩm lưu được giá trống, 0, âm, số lẻ và tên dài hơn 255 ký tự

| Trường | Giá trị |
|---|---|
| GitHub Issue | Trùng issue có sẵn [#29](https://github.com/Taylor3691/eshop-sut/issues/29) (không tạo issue mới); quan sát bổ sung đã ghi bằng [comment](https://github.com/Taylor3691/eshop-sut/issues/29#issuecomment-6830789665) |
| Nguồn phát hiện | Checklist GUI-02-11, GUI-02-12, GUI-02-13, GUI-02-03; Usability P1, P3, P5, P6, P7 |
| Màn hình | Quản lý Sản phẩm |
| Môi trường | macOS 27.2, Google Chrome 157.0.8103.51 (Playwright, headless), http://localhost:5174 |
| Severity | Major — dữ liệu sản phẩm sai (giá ≤ 0) được lưu và hiển thị cho khách |
| Priority | High |
| Tham chiếu spec | FR-15, giải đáp 13 |

**Điều kiện tiên quyết:** SUT chạy bằng `scripts/start-sut.sh` (+ `scripts/seed-hw03.sh 3`); đăng nhập Web Admin bằng `admin@eshop.com` / `Admin123!`.

**Bước tái hiện:**
1. Tab Sản phẩm, form "Thêm sản phẩm mới": nhập Tên "QA thiếu giá", để trống Giá, bấm "Lưu sản phẩm".
2. Lặp lại với Giá = `0`, `-1000`, `1000.5`.
3. Nhập Tên dài 256 ký tự, Giá 100000, bấm "Lưu sản phẩm".

**Kết quả mong đợi:** FR-15: Tên bắt buộc, tối đa 255 ký tự; Giá bắt buộc, phải là số dương (> 0). Giải đáp 13: giá là số nguyên. Dữ liệu sai phải bị từ chối kèm thông báo.

**Kết quả thực tế:** Tất cả đều được lưu, không có thông báo: giá trống hiển thị "₫", các giá "0 ₫", "-1000 ₫", "1000.5 ₫"; tên 256 ký tự được lưu (ô không có `maxlength`). Riêng Tên trống thì bị chặn (`required`). Với giá `1000.5`, Chrome đánh dấu ô không hợp lệ (step mismatch) nhưng form vẫn gửi và backend lưu `1000.5` (đã kiểm lại riêng).

**Ảnh chụp:**

![GUI-02-11-2.png](../task1-checklist/screenshots/failed/GUI-02-11-2.png)
![GUI-02-13.png](../task1-checklist/screenshots/failed/GUI-02-13.png)
![GUI-02-12.png](../task1-checklist/screenshots/failed/GUI-02-12.png)

**Bằng chứng từ đánh giá khả dụng (Task 2, 15/11/2026, nhóm I4 trong `task2-usability/analysis.md`; đã ghi vào issue bằng [comment](https://github.com/Taylor3691/eshop-sut/issues/29#issuecomment-6897305582)):**
- 5/7 người tham gia gõ giá trên thẻ "890.000" vào ô Giá tiền (P1 03:40, P3 05:20, P5 02:40, P6 04:20, P7 06:30). Ô giữ nguyên "890.000", tức giá trị 890 (số lẻ), và trang không cảnh báo gì. Cả 5 người tự nhận ra và gõ lại 890000 trước khi lưu, nên không có giá sai nào được lưu trong phiên.
- *"Ô nuốt dấu chấm thành số lẻ. Phải gõ 890000."* (P1 03:40); *"Trang không cảnh báo, em tự đếm chữ số."* (P7 E1); *"Bên Kiot em gõ có dấu cũng được. Ở đây ô giữ 890.000."* (P6 04:20).
- Nếu người dùng không tự để ý, sản phẩm sẽ được lưu với giá 890 ₫. Đây đúng là trường hợp "số lẻ" mà bug này mô tả.
