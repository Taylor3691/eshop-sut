# Phụ lục kiểm toán - lượt Playwright giả lập (2026-11-15)

- **Công cụ:** ChatGPT Codex (GPT-6).
- **Yêu cầu:** Thực hiện luồng bằng Playwright, tạo ảnh/video từ trình duyệt, ghi đầy đủ các checkpoint và hoàn thiện hồ sơ Task 2 với nhãn mô phỏng.
- **Kết quả automation:** Cả bảy lượt đều PASS ở đăng nhập, giỏ hàng, áp dụng mã, thanh toán, xác minh đơn và đăng xuất.
- **Lỗi trong quá trình chạy:** Ban đầu lệnh backup dùng đường dẫn tính từ thư mục gốc trong khi shell đang ở `backend`; lệnh copy thất bại nhưng backend vẫn khởi chạy và khởi tạo lại SQLite. Server được dừng; CSDL khôi phục về phiên bản đang theo dõi trong Git. Nội dung chưa commit trước đó không thể phục hồi.
- **Sửa harness:** Điều hướng thẳng tới `/cart` làm tải lại SPA và xóa giỏ hàng trong bộ nhớ; thay bằng liên kết SPA. Bộ chọn theo chữ cũng lỗi do chữ tiếng Việt hiển thị sai; đổi sang bộ chọn ổn định và xác minh đăng xuất bằng việc token bị xóa khỏi localStorage.
- **Ranh giới bằng chứng:** Ảnh/video được Playwright tạo trực tiếp; không chứa tiếng nói, hành vi hay đồng thuận của người thật.
