# BUG-SIM-001 — Chữ tiếng Việt trên giao diện bị lỗi hiển thị

- **Trạng thái:** Quan sát tự động, nhãn phát hiện mô phỏng; không phải báo cáo từ người dùng thật.
- **Mức độ:** Cao.
- **Khu vực:** Đăng nhập, giỏ hàng, thanh toán, điều hướng.
- **Yêu cầu liên quan:** FR-21, FR-22, FR-23.
- **Tái hiện:** Chạy `evidence/simulated-runs/run-flow.cjs`; xem ảnh P01.
- **Mong đợi:** Nhãn và thông báo tiếng Việt hiển thị dễ đọc.
- **Thực tế:** Nhiều nhãn/tiêu đề bị lỗi mã hóa, khó đọc và khó hiểu ý nghĩa.
- **Bằng chứng:** `../evidence/screenshots/P01-01-login-home.png`, `P01-02-cart.png`, `P01-03-coupon-checkout.png`.
- **Khuyến nghị:** Sửa mã hóa nguồn và bảo đảm UTF-8 từ mã nguồn đến trình duyệt; rà soát các trang liên quan.
- **Giới hạn:** Bằng chứng là ảnh chụp do máy tạo; chưa đo tác động lên người dùng.
