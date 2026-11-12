# AI Audit Report — HW03

**I use AI tools for the following tasks.**

---

## #01 — Setup môi trường

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date &amp; time:** 2026-11-12 22:00
- **Prompt:** Dựa vào yêu cầu trong "2026.HW03.GUI Usability\_[En.md](http://En.md)" và phạm vi của tôi (Web Admin: Task 1 màn hình chính

  Quản lý Sản phẩm, màn phụ Login/Dashboard/Danh mục/Mã giảm giá; Task 2 flow Đăng nhập Admin → Tạo danh mục

  → Thêm sản phẩm → Tạo mã giảm giá → Cập nhật trạng thái đơn → Đăng xuất), hãy setup:

  1. Script chạy/dừng SUT (backend, web, admin) và script tạo đơn hàng pending mẫu.

  2. Thư mục submission/ theo đúng các mục nộp bài ở mục 14 của đề.

  3. Template: checklist Excel (có cột Notes, kết quả Passed/Failed, sheet tổng hợp), bảng SUS tự tính điểm,

     ghi chú phiên P1–P7, danh sách người tham gia, bug report.

  4. File CSV thử cho Import sản phẩm theo FR-16.
- **AI output:**
  - Tạo `scripts/start-sut.sh`, `scripts/stop-sut.sh` (chạy/dừng backend :3000, web :5173, admin :5174) và `scripts/seed-hw03.sh` (tạo đơn hàng `pending` mẫu).
  - Tạo khung thư mục `submission/` và các template: README, checklist.xlsx, sus-and-metrics.xlsx, ghi chú phiên P1–P7, bug template, khung report.
  - Tạo 8 file CSV thử cho Import sản phẩm (`submission/test-data/csv/`).
  - Lưu ý: backend reset database mỗi lần khởi động; `setup_guide.md` ghi mật khẩu admin `admin123` khác dữ liệu thật `Admin123!`.

---

<!-- Mẫu cho mục tiếp theo:

## #NN — <Tên bước>

- **AI tool:**
- **Date & time:**
- **Prompt:**
- **AI output:** (nguyên văn, hoặc tóm tắt + đường dẫn file output)
-->