# AI Audit Report — HW03

**I use AI tools for the following tasks.**

---

## #01 — Setup môi trường

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:00
- **Prompt:**
  ```
  Dựa vào yêu cầu trong "2026.HW03.GUI Usability_En.md" và phạm vi của tôi (Web Admin: Task 1 màn hình chính
  Quản lý Sản phẩm, màn phụ Login/Dashboard/Danh mục/Mã giảm giá; Task 2 flow Đăng nhập Admin → Tạo danh mục
  → Thêm sản phẩm → Tạo mã giảm giá → Cập nhật trạng thái đơn → Đăng xuất), hãy setup:
  1. Script chạy/dừng SUT (backend, web, admin) và script tạo đơn hàng pending mẫu.
  2. Thư mục submission/ theo đúng các mục nộp bài ở mục 14 của đề.
  3. Template: checklist Excel (có cột Notes, kết quả Passed/Failed, sheet tổng hợp), bảng SUS tự tính điểm,
     ghi chú phiên P1–P7, danh sách người tham gia, bug report.
  4. File CSV thử cho Import sản phẩm theo FR-16.
  ```
- **AI output:**
  - Tạo `scripts/start-sut.sh`, `scripts/stop-sut.sh` (chạy/dừng backend :3000, web :5173, admin :5174) và `scripts/seed-hw03.sh` (tạo đơn hàng `pending` mẫu).
  - Tạo khung thư mục `submission/` và các template: README, checklist.xlsx, sus-and-metrics.xlsx, ghi chú phiên P1–P7, bug template, khung report.
  - Tạo 8 file CSV thử cho Import sản phẩm (`submission/test-data/csv/`).
  - Lưu ý: backend reset database mỗi lần khởi động; `setup_guide.md` ghi mật khẩu admin `admin123` khác dữ liệu thật `Admin123!`.

---

## #02 — Liệt kê thành phần giao diện 5 màn hình Web Admin

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:37
- **Prompt:**
  ```
  Bạn là QA tester. Tôi đang kiểm thử GUI trang Web Admin của EShop (http://localhost:5174).
  Phạm vi gồm 5 màn hình: Admin Login, Dashboard, Quản lý Danh mục, Quản lý Sản phẩm (gồm Import CSV), Quản lý Mã giảm giá.

  Tài liệu:
  - Đặc tả: README.md, mục FR-12 → FR-17 và FR-21 → FR-24
  - Các nhóm kiểm thử giao diện IA-01 → IA-04: mục 4 trong "2026.HW03.GUI Usability_En.md"
  - Code giao diện: frontend-admin/src/App.jsx

  Liệt kê các thành phần giao diện của từng màn hình (form, trường nhập, nút, bảng, menu, thông báo)
  và yêu cầu liên quan (ghi mã FR, nhóm IA). Trả về mỗi màn hình một bảng.
  Chỉ dựa vào tài liệu và code tôi cung cấp. Ghi riêng những điểm đặc tả không nói rõ.
  Chưa viết checklist.
  ```
- **AI output:**
  - Lập 6 bảng thành phần giao diện (khung chung sidebar + 5 màn hình) kèm dòng code, mã FR và nhóm IA; liệt kê riêng 15 điểm đặc tả không nói rõ.
  - Ghi nhận từ code: form admin chỉ có placeholder, không nhãn/`*`; ô Email login không `type="email"`; thông báo lỗi dùng `alert()`; nút Xóa không có dialog xác nhận; giá sản phẩm không phân cách hàng nghìn; menu sidebar là `<li>` nên không Tab tới được; Dashboard nhân doanh thu ×2 (dòng 218); sửa 1 sản phẩm đổi tên toàn bộ danh sách trên UI (dòng 110–114); preview CSV tách bằng dấu phẩy, không theo RFC 4180; ô file không giới hạn `.csv`.
  - Không tạo/sửa file nào ngoài log (kết quả trả trong chat).

---

## #03 — Lưu bảng thành phần giao diện

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:43
- **Prompt:** hãy lưu lại phần kết quả này
- **AI output:**
  - Lưu nguyên kết quả mục #02 (6 bảng thành phần giao diện + 15 điểm đặc tả không rõ) thành file markdown, thêm phần đầu ghi nguồn và chú giải IA.
  - `submission/task1-checklist/ui-inventory.md`

---

## #04 — Ghi giải đáp 15 điểm đặc tả không rõ

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:51
- **Prompt:**
  ```
  đây là phần giải đáp cho 15 điều mơ hồ

  1. <h1> trong SPA (FR-21): Mỗi tab tính là một trang. Mỗi màn hình, kể cả Login, phải có đúng một <h1> mô tả nội dung của màn đó. Nếu mọi tab dùng chung <h1> "EShop Admin" thì Fail.
  2. Thuật ngữ kỹ thuật (FR-21):
     - Được giữ tiếng Anh: Dashboard, Admin, CSV, Import, URL, ID, Email.
     - Phải dịch: Login → Đăng nhập, Password → Mật khẩu, Delivered → Đã giao, và các thông báo lỗi kỹ thuật.
  3. Màu nút (FR-21, nới lỏng):
     - Bắt buộc: nút nguy hiểm (Xóa, Đăng xuất) có màu đỏ, nút hành động chính không có màu đỏ.
     - Khuyến nghị: nút hành động chính nên màu xanh dương. Nút màu khác (ví dụ "Lưu sản phẩm" màu xanh lá, "Tạo mã" màu cam) vẫn Pass, chỉ ghi chú vào Notes.
  4. Dạng thông báo (FR-22, nới lỏng; BP: Nielsen #9):
     - Bắt buộc: khi có lỗi phải hiện thông báo bằng tiếng Việt, nêu được lý do và người dùng hiểu được. Dùng alert() vẫn chấp nhận. Thông báo kỹ thuật như "Request failed with status code 400" thì Fail.
     - Khuyến nghị: thông báo lỗi nằm ngay trong form, phía trên nút submit.
     - Sau khi thêm, sửa hoặc xóa, chỉ cần người dùng thấy được kết quả (bảng cập nhật ngay) là Pass.
  5. Nhãn và dấu * (FR-22; BP: WCAG 3.3.2): Mỗi trường phải có nhãn hiển thị, trường bắt buộc có * bên cạnh nhãn. Nếu chỉ có placeholder thì Fail.
  6. Dialog xác nhận (BP: Nielsen #5, mở rộng từ FR-24): Mọi thao tác xóa ở admin (danh mục, sản phẩm, coupon) phải có dialog xác nhận. Đăng xuất thì không cần.
  7. Empty state (FR-24, mở rộng): Áp dụng cho các bảng ở admin. Khi bảng rỗng phải hiện thông báo thân thiện, không để bảng trống trơn.
  8. Loading (BP: Nielsen #1):
     - Dashboard và các bảng phải có trạng thái loading khi đang tải dữ liệu.
     - Nút submit phải bị khóa trong lúc đang gửi, để tránh bấm hai lần.
  9. Sidebar và breadcrumb (FR-23): Sidebar được tính là navbar, nên phải highlight mục đang chọn. Breadcrumb không bắt buộc ở admin (N/A).
  10. Đăng nhập admin (FR-02, FR-12; BP):
      - Khóa tài khoản sau 3 lần nhập sai giống FR-02, vì dùng chung API đăng nhập.
      - Thông báo lỗi viết chung chung, không để lộ lý do.
      - Tài khoản không phải admin phải thấy thông báo rõ ràng.
      - Khi hết phiên thì quay về màn Login, kèm thông báo.
  11. Dashboard (FR-13, FR-21):
      - "Tổng số đơn hàng" đếm đơn ở mọi trạng thái.
      - Doanh thu chỉ tính các đơn đã giao (delivered).
      - Tiền hiển thị theo định dạng vi-VN 1.234.567 ₫ (dấu chấm phân cách, ký hiệu ₫ đứng sau) và thống nhất giữa các màn hình.
  12. Danh mục (FR-14; BP):
      - Tên chỉ gồm khoảng trắng được tính là rỗng và bị từ chối. Tên tối đa 255 ký tự, không được trùng.
      - Xóa danh mục đang có sản phẩm phải bị chặn hoặc có cảnh báo.
      - Mọi trường hợp lỗi đều phải có thông báo hiện trên giao diện.
  13. Sản phẩm (FR-15; BP):
      - Mô tả và URL ảnh không bắt buộc.
      - Giá là số nguyên lớn hơn 0, không nhận số lẻ (VND không có đơn vị lẻ).
      - Ở chế độ sửa, form phải thể hiện rõ đang sửa (đổi tiêu đề, có nút Hủy) và tự cuộn lên form.
  14. Import CSV (FR-16; BP):
      - Chỉ cho chọn file .csv, chọn file khác phải báo lỗi. File rỗng cũng phải báo lỗi.
      - Header phải đúng tên cột, không phân biệt hoa thường.
      - Dòng có category_id không tồn tại được tính là dòng lỗi.
      - Bảng xem trước phải khớp với dữ liệu sẽ import, kể cả trường có dấu phẩy nằm trong nháy kép.
      - Báo cáo kết quả phải có số dòng thành công, số dòng lỗi và lý do lỗi của từng dòng.
      - Giới hạn kích thước file không kiểm thử (N/A).
  15. Mã giảm giá (FR-17; BP):
      - Loại phần trăm phải không quá 100.
      - Mã chỉ gồm chữ hoa và số, không có khoảng trắng.
      - Ngày hết hạn phải là ngày trong tương lai. Mã đã hết hạn hiện nhãn "Hết hạn" là chấp nhận được.
      - Giá trị mặc định (0 và 1) được tính là đã nhập, nhưng các trường vẫn phải có nhãn và dấu *.
  ```
- **AI output:**
  - Ghi nguyên văn 15 giải đáp thành mục "Giải đáp các điểm không rõ (dùng làm oracle cho checklist)" ở cuối file; giữ nguyên phần câu hỏi gốc.
  - `submission/task1-checklist/ui-inventory.md`

---

## #05 — Commit bảng thành phần giao diện

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:58
- **Prompt:** hãy commit lại phần này
- **AI output:**
  - Commit bảng thành phần giao diện kèm giải đáp và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/task1-checklist/ui-inventory.md`, `submission/ai/ai-audit-log.md`

---

<!-- Mẫu cho mục tiếp theo:

## #NN — <Tên bước>

- **AI tool:**
- **Date & time:**
- **Prompt:**
- **AI output:** (nguyên văn, hoặc tóm tắt + đường dẫn file output)
-->