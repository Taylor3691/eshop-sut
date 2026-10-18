# [BUG][FR-02] Bộ đếm lần đăng nhập sai tăng 2 thay vì 1

## Môi trường

- Thành phần: Backend API
- Endpoint: `POST http://localhost:3000/api/login`
- Cơ sở dữ liệu: SQLite (`backend/database.sqlite`)
- Tài khoản kiểm thử: `test@eshop.com`
- Trình duyệt: Chrome DevTools
- Yêu cầu: FR-02 - Đăng nhập và Khóa tài khoản

## Điều kiện tiên quyết

- Người dùng `test@eshop.com` tồn tại.
- `login_attempts = 0` trước khi kiểm thử.
- Tài khoản không bị khóa.
- Backend đang chạy bằng `node server.js`.

## Các bước tái hiện

1. Kiểm tra bản ghi người dùng và xác nhận `login_attempts = 0`.
2. Mở trang đăng nhập.
3. Nhập:
   - Email: `test@eshop.com`
   - Mật khẩu: `WrongPass123!`
4. Gửi biểu mẫu đăng nhập một lần.
5. Kiểm tra lại giá trị `login_attempts` trong bản ghi người dùng hoặc qua API danh sách người dùng admin.

## Kết quả thực tế

- Đăng nhập thất bại với HTTP `401 Unauthorized`.
- Giá trị `login_attempts` thay đổi từ `0` thành `2` sau một lần đăng nhập sai.
- Sau hai lần đăng nhập sai, tài khoản đã bị khóa.

## Kết quả mong đợi

- Đăng nhập thất bại với HTTP `401 Unauthorized`.
- Giá trị `login_attempts` tăng chính xác một đơn vị: `0 -> 1`.
- Tài khoản không được bị khóa trước khi có ít nhất ba lần đăng nhập sai liên tiếp.

## Bằng chứng

Backend tính bộ đếm mới bằng `+ 2`:

```js
const newAttempts = user.login_attempts + 2;
```

Điều này khiến một lần đăng nhập sai bị tính thành hai lần và ngưỡng khóa bị đạt sớm hơn quy định.

## Ảnh hưởng

- Người dùng có thể bị khóa sau hai lần đăng nhập sai thay vì ba lần.
- Cơ chế khóa đăng nhập không tuân thủ FR-02.
- Các test case bị ảnh hưởng: `TC-FR-02-LOGIN-007`, `TC-FR-02-LOGIN-009`, `TC-FR-02-LOGIN-011`, `TC-FR-02-LOGIN-012`, `TC-FR-02-LOGIN-013`.

## Mức độ nghiêm trọng

**Major - Nghiêm trọng**

## Đề xuất sửa lỗi

Thay đổi mức tăng bộ đếm thành một:

```js
const newAttempts = user.login_attempts + 1;
```

Sau đó kiểm tra lại các trường hợp biên:

- 1 lần đăng nhập sai: bộ đếm là `1`, tài khoản chưa bị khóa.
- 2 lần đăng nhập sai: bộ đếm là `2`, tài khoản chưa bị khóa.
- 3 lần đăng nhập sai: tài khoản bị khóa theo thời gian khóa đã cấu hình.

## Tiêu chí kiểm thử lại

- Một lần đăng nhập sai làm `login_attempts` tăng chính xác `1`.
- Bộ đếm không tăng nhiều hơn một lần cho một request.
- Tài khoản chỉ bị khóa khi đạt đúng ngưỡng yêu cầu.
- Đăng nhập thành công đặt lại `login_attempts` về `0`.
