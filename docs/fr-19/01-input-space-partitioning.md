# FR-19 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-19 Quản lý Người dùng (Admin)**, kiểm trên app mobile `frontend-mobile/App.js`.

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

## Cách làm

1. Đọc FR-19 trong `README.md`. Đọc thêm FR-12 và SEC-03 vì API admin phải có JWT và `role = admin`.
2. Đọc mọi màn trong `frontend-mobile/App.js`. App đổi màn bằng state `view`, không có route con và không có query trên URL.
3. Đọc mọi `fetch` trong file đó. Đối chiếu `GET /api/admin/users` và `DELETE /api/admin/users/:id` trong `backend/server.js` và `api_specification.md` mục 6.1.
4. Đọc bảng `users` và hai dòng seed trong `backend/database.js`.

Đăng nhập, đăng ký, quên mật khẩu, giỏ hàng, thanh toán và hồ sơ trên app mobile thuộc FR-20 và các FR tương ứng, không phải input của FR-19.

## Đặc tả

README FR-19:

- Admin xem danh sách tất cả người dùng (không lộ mật khẩu).
- Admin có thể xóa người dùng, ngoại trừ không được xóa chính tài khoản đang đăng nhập.

## 1. Biến đầu vào tường minh trên UI

App mobile không có ô nhập cho FR-19.

Các màn đang có: `home`, `productDetail`, `cart`, `checkout`, `login`, `register`, `forgotPassword`, `profile`. Không màn nào có danh sách người dùng, không có nút xóa người dùng, không có ô chọn người dùng.

## 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL app mobile | không có | App một màn, đổi bằng `view` |
| Lời gọi từ `frontend-mobile/App.js` | không có lời gọi FR-19 | File không gọi `GET /api/admin/users` hay `DELETE /api/admin/users/:id` |

Server có hai endpoint trong `api_specification.md` mục 6.1. Handler `GET` không đọc `req.query`. Handler `DELETE` chỉ đọc `req.params.id`. Cả hai chỉ kiểm tra token, không kiểm tra `role`. App mobile không gửi hai request này, nên id người dùng và token admin không phải input của màn mobile.

## 3. Biến trạng thái dữ liệu

| Biến | Có làm đổi kết quả trên mobile không | Vì sao |
| --- | --- | --- |
| Cột `password` | Không | Màn mobile không tải danh sách người dùng. Seed có mật khẩu `Admin123!` và `Test1234!`, nhưng không có chỗ để lộ. |
| `role` của người đang đăng nhập | Không | Không có nút xóa và không có lời gọi API admin. |
| Id tài khoản đang đăng nhập | Không | Spec cấm xóa chính mình. App không có thao tác xóa. |
| Số người dùng trong bảng | Không | Seed có 2 dòng: admin id sẽ là 1, user id sẽ là 2. Không có danh sách để số dòng làm đổi giao diện. |

## 4. Bảng biến

| Biến | Kiểu | Ràng buộc theo spec | Ràng buộc trong code |
| --- | --- | --- | --- |
| Không có biến UI của FR-19 trên mobile | — | Admin xem mọi người dùng, không thấy mật khẩu, và xóa được người khác, không xóa chính mình | `frontend-mobile/App.js` không có ô nhập, không có query, không gọi API quản lý người dùng |
