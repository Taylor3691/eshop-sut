# Phê bình AI - giai đoạn tự động hóa Playwright (**SIMULATED DATA**)

Trong lần chạy đầu, AI mắc lỗi bảo toàn dữ liệu: lệnh backup dùng đường dẫn tính từ thư mục gốc trong khi terminal đang ở `backend`. Lệnh sao chép thất bại nhưng server vẫn khởi chạy và khởi tạo lại CSDL SQLite. Server đã được dừng và tệp được khôi phục về bản đang theo dõi trong Git, nhưng nội dung chưa commit trước đó không thể phục hồi. Chỉ nhắc “backup trước” là chưa đủ; cần xác minh bản sao tồn tại trước khi chạy dịch vụ có thể thay đổi trạng thái.

Harness ban đầu cũng mở thẳng `/cart`, làm ứng dụng React tải lại và mất giỏ hàng trong bộ nhớ. Bộ chọn theo nội dung nút không khớp vì giao diện hiển thị tiếng Việt lỗi mã hóa. Script được sửa để dùng điều hướng SPA, selector ổn định và kiểm tra token đã bị xóa khi đăng xuất.

Bài học là phải phân biệt nguồn bằng chứng. Checkpoint automation chỉ cho biết thao tác script hóa thành công trong cấu hình browser đó; chúng không tiết lộ người dùng ngập ngừng, hiểu nhãn, tin tưởng, bực bội hay trả lời SUS ra sao. Tên và tuổi được cung cấp có thể dùng làm nhãn persona tổng hợp, nhưng tài liệu hóa không biến họ thành người tham gia thật. Đầu ra AI cần được đối chiếu với yêu cầu, ứng dụng và bằng chứng thực tế; dữ liệu con người vẫn phải do nghiên cứu viên thu thập.
