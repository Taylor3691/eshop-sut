# FR-19 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-19 Quản lý Người dùng (Admin)**, kiểm trên app mobile `frontend-mobile/App.js`.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-19/01-input-space-partitioning.md`.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả.

Bước 1 chốt một kết luận: app mobile không có biến đầu vào của FR-19. Không có ô nhập, không có query, và `frontend-mobile/App.js` không gọi `GET /api/admin/users` hay `DELETE /api/admin/users/:id`.

Một đặc tính chỉ được chia khi nó có miền giá trị. Biến vắng mặt không có giá trị để đặt vào VEC hay IEC.

Không lập lớp cho các mục bước 1 đã loại:

- `password`, `role`, id tài khoản đang đăng nhập, số người dùng trong bảng. Bước 1 kết luận chúng không đổi kết quả trên mobile vì không có màn danh sách và không có nút xóa.
- Ô đăng nhập, đăng ký, quên mật khẩu, giỏ hàng, thanh toán, hồ sơ. Chúng thuộc FR khác.
- `id` trên `DELETE /api/admin/users/:id` và header `Authorization` của API admin. Server có endpoint này, nhưng app mobile không gửi request, nên đó không phải biến của màn mobile.

## Kết quả

Không có đặc tính nào để chia. Không có mã lớp và không có giá trị đại diện.

README FR-19 vẫn mô tả admin xem danh sách người dùng, không lộ mật khẩu, và xóa được người khác trừ chính tài khoản đang đăng nhập. Trên app mobile không có giá trị đầu vào nào để kiểm hành vi đó.
