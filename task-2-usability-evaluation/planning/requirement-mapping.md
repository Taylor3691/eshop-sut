# Bản đồ Yêu cầu (Requirement Mapping)

| Bước trong luồng | FR liên quan | Mục tiêu Usability | Mô tả kiểm tra |
|---|---|---|---|
| **Login** | FR-02 | 1. Điều hướng & Hoàn thành Nhiệm vụ<br>2. Độ rõ ràng & Hiểu giao diện<br>5. Phản hồi & Trạng thái | Kiểm tra người dùng có thể locate trường Email/Password, nhập đúng thông tin, nhận phản hồi lỗi khi sai, và cảm nhận an toàn khi đăng nhập. |
| **Cart** | FR-07 | 1. Điều hướng & Hoàn thành Nhiệm vụ<br>3. Hiệu quả & Tính tiện lợi<br>4. Ngăn ngừa & Khôi phục lỗi | Người dùng kiểm tra danh sách sản phẩm, thay đổi số lượng, sử dụng nút +/- hoặc nhập thủ công, và nhận dialog xác nhận khi xóa. |
| **Apply Coupon** | FR-09 | 2. Độ rõ ràng & Hiểu giao diện<br>4. Ngăn ngừa & Khôi phục lỗi<br>5. Phản hồi & Trạng thái | Người dùng nhập mã coupon, hệ thống kiểm tra 5 điều kiện, trả về thông báo thành công hoặc lỗi chi tiết, và hiển thị số tiền giảm. |
| **Checkout** | FR-08 | 3. Hiệu quả & Tính tiện lợi<br>5. Phản hồi & Trạng thái<br>6. Niềm tin & An tâm | Kiểm tra tóm tắt đơn hàng, tổng tiền tự động, người dùng xác nhận thanh toán, nhận thông báo thanh toán thành công, và cảm giác an toàn about payment. |
| **Verify Order** | FR-10, FR-11 | 2. Độ rõ ràng & Hiểu giao diện<br>6. Niềm tin & An tâm | Người dùng vào mục Lịch sử đơn hàng, kiểm tra trạng thái (pending → confirmed → …) được dịch sang tiếng Việt, màu sắc rõ ràng, và tin tưởng vào quá trình xử lý. |
| **Logout** | FR-02 | 1. Điều hướng & Hoàn thành Nhiệm vụ<br>5. Phản hồi & Trạng thái | Người dùng tìm và nhấn nút Đăng xuất, hệ thống trả về trạng thái đăng xuất, và xác nhận không còn token. |

*Các mục tiêu được liên kết với các thước đo trong `planning/usability-evaluation-plan.md`.*
