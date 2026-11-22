# HW05 – Performance Testing · Báo cáo chính

| | |
|---|---|
| **MSSV** | 23120175 |
| **Bài** | HW05-AI – Performance Testing |
| **SUT** | EShop backend (`backend/server.js`, Node.js + Express + SQLite), `http://localhost:3000` |
| **Repo** | https://github.com/Taylor3691/eshop-sut, nhánh `hw05/toanhuynh`, thư mục `hw05/` |
| **Công cụ** | Apache JMeter 5.6.3 (+ plugin `jpgc-casutg`), htop, curl, Python 3 |
| **AI** | Cursor (Grok 4.7), Claude Code (Claude Opus 5.5) – xem Phần 6 |
| **Máy** | MacBook Air M5, 10 nhân, 16 GB, macOS 27.2, hostname `CT-TOAN-HUYNH` |

> Báo cáo này được ghép từ `REPORT_TASK1.md`, `REPORT_TASK2.md`, `REPORT_TASK3.md` và các phần trong `report/` bằng `report/build_report.py`. Các đường dẫn tương đối tính từ thư mục `hw05/`.

## Tóm tắt

| Hạng mục | Kết quả |
|---|---|
| Luồng test | Đăng nhập → Xem chi tiết sản phẩm → Thêm vào giỏ → Áp mã giảm giá → Thanh toán (auth-heavy, read-heavy, transactional) |
| Kịch bản đã chạy | Load (30 thread, 10 phút), Stress (20 → 200 thread), Spike (nền 20, đỉnh 150), Soak (150 thread, 16 phút) |
| Lỗi luồng chính | 0 ở cả 4 lần chạy; lỗi duy nhất là `LOCK_04` (assertion bắt bug khóa tài khoản) |
| **Ngưỡng chịu tải** | **≈ 6.800 request/giây ổn định** (p95 2 ms, p99 3 ms) trong 7 phút; duy trì 15 phút ở **≈ 5.000–5.500 request/giây** (p95 ≤ 27 ms, p99 ≈ 190–236 ms); RAM `node` **79 → 329 MB**; điểm bão hòa (đo riêng) **≈ 11.400 request/giây** |
| Nút thắt | Luồng xử lý chính duy nhất của Node.js (CPU `node` 101,4% lúc đỉnh Stress) |
| Bug / vấn đề hiệu năng | 5 issue mới (#225–#229, trong đó 1 vấn đề hiệu năng #229), 4 bug xác nhận lại (#20, #34, #68, #70); demo skill phát hiện thêm lỗi SQL injection ở tìm kiếm (chưa tạo issue) |
| Task 2 | 6 chỗ AI đọc sai số liệu (có giá trị đúng từ `.jtl`), 5 đề xuất tối ưu được phân loại |
| Task 3 | Mô hình 5 tầng + cổng p95 tuyệt đối; prototype `p95_regression.py` bắt đúng regression +5 ms ở 2/2 lần lặp, không báo động giả |
| Video demo Task 1 | https://youtu.be/7uUt8abLXus |
| Agent Skill | `skill/perf-test/` + video demo https://youtu.be/aPxXErQeGD0 |

## Mục lục

1. Task 1: Thiết kế và thực thi kiểm thử hiệu năng
2. Task 2: AI phân tích kết quả và săn lỗi đọc sai
3. Agent Skill
4. Kết luận và đề xuất Continuous Performance Testing (Task 3)
5. AI Critique
6. AI Audit Report
