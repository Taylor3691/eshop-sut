# FR-02 Test Plan: Đăng nhập và Khóa tài khoản

## 1. Mục tiêu

Đánh giá chức năng đăng nhập và cơ chế tạm khóa tài khoản theo yêu cầu FR-02, bao gồm xác thực thông tin đăng nhập, giới hạn số lần đăng nhập sai, phát hành JWT và kiểm tra định dạng email.

## 2. Phạm vi

- Đăng nhập bằng email và mật khẩu.
- Xử lý đăng nhập thành công và thất bại.
- Tăng bộ đếm sau mỗi lần đăng nhập sai.
- Khóa tài khoản sau từ 3 lần đăng nhập sai liên tiếp.
- Thời gian khóa tài khoản 30 giây trong môi trường demo.
- Thông báo lỗi không làm lộ chi tiết nguyên nhân.
- Phát hành, lưu trữ và gửi JWT trong các yêu cầu cần xác thực.
- Kiểm tra trường email sử dụng validate HTML5 với `type="email"`.

## 3. Tiêu chí mong đợi tổng quát

- Thông tin đăng nhập hợp lệ cho phép người dùng đăng nhập.
- Thông tin đăng nhập không hợp lệ làm bộ đếm tăng đúng 1 đơn vị.
- Tài khoản bị tạm khóa khi đạt ngưỡng 3 lần sai liên tiếp và được mở lại sau 30 giây.
- Đăng nhập thành công trả về JWT hợp lệ; client lưu và gửi token theo dạng `Authorization: Bearer <token>`.
- Email sai định dạng bị trình duyệt hoặc giao diện từ chối trước khi gửi yêu cầu.
- Thông báo lỗi phù hợp và không tiết lộ thông tin nhạy cảm về tài khoản.

## 4. Phương pháp kiểm thử

Kiểm thử chức năng qua giao diện đăng nhập và API, kết hợp kiểm thử giá trị biên tại các mốc số lần sai: trước ngưỡng, đúng ngưỡng và sau ngưỡng. Kiểm tra thêm trạng thái token và quyền truy cập vào các API yêu cầu xác thực.

## 5. Ngoài phạm vi

Đăng ký tài khoản, quên/đặt lại mật khẩu, quản lý hồ sơ cá nhân và các chức năng mua hàng không thuộc phạm vi của test plan FR-02.
