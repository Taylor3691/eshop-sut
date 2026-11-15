# BUG-SIM-002 — Nhãn và kiểu trường của biểu mẫu đăng nhập gây hiểu nhầm

- **Trạng thái:** Quan sát tự động, nhãn phát hiện mô phỏng; không phải báo cáo từ người dùng thật.
- **Mức độ:** Cao.
- **Khu vực:** Đăng nhập.
- **Yêu cầu liên quan:** FR-02, FR-21, FR-22.
- **Tái hiện:** Mở `/login`, xem ảnh P01 hoặc `frontend-web/src/pages/Login.jsx`.
- **Mong đợi:** Tiêu đề/nút đăng nhập rõ ràng, dùng tiếng Việt; email có `type="email"`; mật khẩu có `type="password"`.
- **Thực tế:** Tiêu đề hiển thị nội dung đăng ký, trường email ghi “Username”, mật khẩu dùng `type="text"`, nút gửi bằng tiếng Anh (“Sign In”).
- **Bằng chứng:** `../evidence/screenshots/P01-01-login-home.png`.
- **Khuyến nghị:** Dùng tiêu đề đăng nhập mô tả đúng chức năng, nhãn/nút tiếng Việt, kiểu email phù hợp và trường mật khẩu được che.
- **Giới hạn:** Chưa đo sự nhầm lẫn hay tác động bảo mật với người tham gia thật.
