# Hướng dẫn demo `GUI_skill.md`

## 1. Mục đích

`GUI_skill.md` hỗ trợ tạo file `GUI_checklist.md` cho giai đoạn **thiết kế checklist GUI**. Skill đọc yêu cầu trong repository, quan sát ảnh chụp các màn hình được cung cấp và tạo các tiêu chí kiểm thử; skill không chạy kiểm thử và không tự kết luận giao diện đang Đạt hoặc Không đạt.

## 2. Chuẩn bị

Trước khi chạy skill, cần có:

- File `GUI_skill.md`, `HW03.md` và `README.md` trong thư mục làm việc.
- Tên màn hình chính, các màn hình liên quan và luồng cần kiểm thử.
- Ít nhất một ảnh chụp rõ ràng cho mỗi màn hình trong phạm vi.
- Nếu có, bổ sung vai trò người dùng, tên dự án, thiết bị/trình duyệt, viewport và người rà soát.

Tên ảnh nên thể hiện rõ màn hình và trạng thái, ví dụ: `DanhSachSanPham.png`, `ChiTietSanPham.png`, `GioHang_Rong.png`.

## 3. Prompt mẫu để demo

Đính kèm ba ảnh chụp tương ứng với Danh sách sản phẩm, Chi tiết sản phẩm và Giỏ hàng, sau đó gửi prompt sau:

```text
Hãy làm theo GUI_skill.md và tạo file GUI_checklist.md.

Dự án: EShop SUT
Màn hình chính: Chi tiết sản phẩm
Màn hình liên quan: Danh sách sản phẩm; Giỏ hàng
Luồng: Danh sách sản phẩm → Nhấn Xem chi tiết → Chi tiết sản phẩm → Nhấn Thêm vào giỏ hàng → Giỏ hàng
Vai trò: Khách hàng đã đăng nhập
Người rà soát: [Tên người rà soát]
Nền tảng / Viewport: Chrome trên Windows, 1440 × 900
Ảnh chụp: sử dụng các ảnh đính kèm; tên file ảnh cho biết màn hình và trạng thái.

Không thực thi kiểm thử và không điền Đạt/Không đạt.
```

## 4. Những gì skill thực hiện

1. Đọc toàn bộ Task 1 trong `HW03.md`.
2. Đọc Mục 8 trong `README.md`, đặc biệt FR-21 đến FR-24, và các yêu cầu chức năng liên quan đến luồng đã chọn.
3. Quan sát ảnh để xác định thành phần giao diện và các trạng thái cần kiểm tra.
4. Tạo bộ checklist ban đầu, rồi rà soát để bổ sung các khoảng trống quan trọng.
5. Ghi hoặc thay thế file `GUI_checklist.md` tại thư mục làm việc hiện tại.

## 5. Kết quả mong đợi

File `GUI_checklist.md` phải có:

- Thông tin dự án, phạm vi màn hình, luồng, vai trò và trạng thái `Đã thiết kế — Chưa thực thi`.
- Hơn 40 mục checklist không trùng lặp.
- Độ bao phủ có ý nghĩa cho bốn nhóm: IA-01, IA-02, IA-03 và IA-04.
- Bảng gồm các cột: số thứ tự, màn hình/trạng thái, phân loại, checkpoint, tiêu chí xác minh, Đạt, Không đạt và ghi chú/minh chứng.
- Hai cột `Đạt` và `Không đạt` luôn để trống bằng ký hiệu `☐`.
- Phần tổng hợp ghi số mục đã thiết kế, còn kết quả thực thi vẫn là `0` hoặc `Chưa thực thi`.

## 6. Lưu ý khi trình bày demo

- Ảnh chụp chỉ cung cấp ngữ cảnh; không được xem ảnh là yêu cầu đúng. Nếu ảnh khác với FR-21 đến FR-24, checklist vẫn phải ưu tiên yêu cầu chính thức.
- Không đưa ảnh lỗi, trạng thái Pass/Fail hoặc bug report vào `GUI_checklist.md` khi đang ở bước thiết kế.
- Nếu không có ảnh cho một màn hình hoặc thiếu màn hình có form/control, bổ sung ảnh hoặc mở rộng phạm vi trước khi tạo checklist.
- Sau khi có `GUI_checklist.md`, bước tiếp theo là thực thi các mục checklist bằng tay hoặc bằng công cụ tự động; đó là giai đoạn riêng với việc tạo checklist.
