# Phân tích Giá trị Biên (BVA) cho FR-03: Quên mật khẩu & Đặt lại mật khẩu

---

## 1. Phân tích Yêu cầu & Hiện trạng Cài đặt

### Đặc tả Yêu cầu (Test Oracle)
- **Mã Yêu cầu (Feature ID)**: [FR-03] (tham chiếu điều kiện mật khẩu từ [FR-01])
- **Phân hệ (Module)**: Quản lý Tài khoản & Xác thực (Authentication & Account Management)
- **Bước 1 (Lấy mã OTP)**:
  - Đầu vào: Địa chỉ Email đã đăng ký.
  - Đầu ra: Mã OTP 6 chữ số ngẫu nhiên (hiển thị trực tiếp trên màn hình trong môi trường demo).
- **Bước 2 (Đặt lại mật khẩu)**:
  - Đầu vào: Mã OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
  - Ràng buộc mật khẩu: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa (`A-Z`), ít nhất 1 chữ thường (`a-z`), ít nhất 1 chữ số (`0-9`), ít nhất 1 ký tự đặc biệt thuộc tập hợp `{@, $, !, %, *, ?, &}`.
  - Ràng buộc xác nhận: Mật khẩu mới và Xác nhận mật khẩu phải khớp nhau hoàn toàn.
  - Ràng buộc bảo mật: Mã OTP chỉ hợp lệ cho email đã yêu cầu; không thể sử dụng cho bất kỳ email nào khác.

### Quan sát Hiện trạng Cài đặt (Không định kiến trước kết quả kiểm thử)
- **Backend API** ([`backend/server.js`]):
  - `/api/forgot-password` tạo mã OTP bằng `Math.floor(1000 + Math.random() * 9000).toString()` (định dạng 4 chữ số).
  - `/api/reset-password` cập nhật mật khẩu với điều kiện `email = ? AND reset_token = ?`.
- **Frontend Web** ([`frontend-web/src/pages/ForgotPassword.jsx`]):
  - Trường nhập email ở Bước 1 sử dụng `type="text"`.
  - Nhãn OTP ở Bước 2 ghi chú "(4 số)".
  - Biểu thức chính quy (regex) kiểm tra mật khẩu bị lỗi: kiểm tra khoảng trắng (`\s`) thay vì tập ký tự đặc biệt được chỉ định.
  - Biểu mẫu chỉ chứa trường `newPassword` (thiếu trường nhập `confirmPassword`).

---

## 2. Xác định & Phân tích Biên

| Biên Mục tiêu | Biến / Thuộc tính | Ngưỡng Biên | Tính Bao gồm | Hành vi Mong đợi tại Biên | Ghi chú |
|---|---|---|---|---|---|
| **BND-OTP-LEN** | Độ dài OTP | Cố định 6 chữ số | Chính xác (Dưới = Trên = 6) | Độ dài 6 là Hợp lệ; < 6 hoặc > 6 là Không hợp lệ | Đặc tả yêu cầu 6 chữ số |
| **BND-PW-LEN** | Độ dài Mật khẩu | Tối thiểu 8 ký tự | Bao gồm Biên dưới | Độ dài 8 là Hợp lệ; Độ dài 7 là Không hợp lệ | Đặc tả: "Tối thiểu 8 ký tự" |
| **BND-PW-UPPER** | Số lượng chữ hoa | Tối thiểu 1 ký tự chữ hoa | Bao gồm Biên dưới | 1 là Hợp lệ; 0 là Không hợp lệ | Tập ký tự `[A-Z]` |
| **BND-PW-LOWER** | Số lượng chữ thường | Tối thiểu 1 ký tự chữ thường | Bao gồm Biên dưới | 1 là Hợp lệ; 0 là Không hợp lệ | Tập ký tự `[a-z]` |
| **BND-PW-DIGIT** | Số lượng chữ số | Tối thiểu 1 chữ số | Bao gồm Biên dưới | 1 là Hợp lệ; 0 là Không hợp lệ | Tập ký tự `[0-9]` |
| **BND-PW-SPEC** | Số lượng ký tự đặc biệt | Tối thiểu 1 từ `{@,$,!,%,*,?,&}` | Bao gồm Biên dưới | 1 là Hợp lệ; 0 là Không hợp lệ | Tập cho phép: `@, $, !, %, *, ?, &` |
| **BND-PW-MATCH** | Độ lệch Xác nhận Mật khẩu | Khoảng cách Levenshtein = 0 | Chính xác (Độ lệch bằng 0) | Lệch 0 ký tự là Hợp lệ; Lệch >= 1 ký tự là Không hợp lệ | Mật khẩu mới == Xác nhận mật khẩu |
| **BND-EMAIL-ASSOC** | Liên kết Tài khoản | Email trùng khớp tuyệt đối | Khớp chính xác | Trùng khớp là Hợp lệ; Không trùng khớp là Không hợp lệ | Ràng buộc 1-1 giữa OTP và Email |
| **BND-STEP-TRANS** | Trạng thái Chuyển bước 1 | Email Hợp lệ đã đăng ký | Kích hoạt Boolean | Email hợp lệ -> Sang Bước 2; Không hợp lệ -> Ở lại Bước 1 | Biên chuyển trạng thái |

---

## 3. Các Giá trị BVA Suy diễn (Dưới, Tại, Trên)

| ID Biên | Biến / Điều kiện | Dưới Biên (`min - 1`) | Tại Biên (`min` / Ngưỡng) | Trên Biên (`min + 1` / Danh định) | Phân loại & Cơ sở Lý luận |
|---|---|---|---|---|---|
| **BND-OTP-LEN** | Độ dài OTP | 5 chữ số (`12345`) | 6 chữ số (`123456`) | 7 chữ số (`1234567`) | Dưới/Trên = KHÔNG HỢP LỆ; Tại = HỢP LỆ |
| **BND-PW-LEN** | Độ dài Mật khẩu | 7 ký tự (`Abc12@x`) | 8 ký tự (`Abc123@x`) | 9 ký tự (`Abc1234@x`) | 7 = KHÔNG HỢP LỆ; 8 = HỢP LỆ; 9 = HỢP LỆ |
| **BND-PW-UPPER** | Số lượng chữ hoa | 0 chữ hoa (`abc1234@x`) | 1 chữ hoa (`Abc1234@x`) | 2 chữ hoa (`ABc1234@x`) | 0 = KHÔNG HỢP LỆ; 1 = HỢP LỆ; 2 = HỢP LỆ |
| **BND-PW-LOWER** | Số lượng chữ thường | 0 chữ thường (`ABC1234@X`) | 1 chữ thường (`ABc1234@X`) | 2 chữ thường (`Abc1234@X`) | 0 = KHÔNG HỢP LỆ; 1 = HỢP LỆ; 2 = HỢP LỆ |
| **BND-PW-DIGIT** | Số lượng chữ số | 0 chữ số (`Abcdefgh@`) | 1 chữ số (`Abcdefg1@`) | 2 chữ số (`Abcdef12@`) | 0 = KHÔNG HỢP LỆ; 1 = HỢP LỆ; 2 = HỢP LỆ |
| **BND-PW-SPEC** | Số lượng ký tự đặc biệt | 0 ký tự đặc biệt (`Abcdefg12`) | 1 ký tự đặc biệt (`Abcdef12@`) | 2 ký tự đặc biệt (`Abcdef12@!`) | 0 = KHÔNG HỢP LỆ; 1 = HỢP LỆ; 2 = HỢP LỆ |
| **BND-PW-MATCH** | Độ lệch Xác nhận | Lệch 1 ký tự (`Abc123@y` vs `Abc123@x`) | Lệch 0 ký tự (Khớp hoàn toàn) | N/A (Nhị phân: Khớp vs Không khớp) | Lệch 1 = KHÔNG HỢP LỆ; Lệch 0 = HỢP LỆ |
| **BND-EMAIL-ASSOC**| Liên kết OTP - Email | Khác tài khoản (`admin@...`) | Cùng tài khoản (`test@...`) | N/A (Khớp định danh) | Không khớp = KHÔNG HỢP LỆ; Khớp = HỢP LỆ |
| **BND-STEP-TRANS** | Kích hoạt Chuyển bước 1 | Email không hợp lệ / Rỗng | Email hợp lệ đã đăng ký | N/A (Sự kiện trạng thái) | Không hợp lệ = Ở lại Bước 1; Hợp lệ = Sang Bước 2 |

---

## 4. Các Test Case BVA Chính thức

### TC-BVA-OTP-001: Độ dài OTP Dưới Biên (5 Chữ số)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (len - 1)
## Điều kiện Tiên quyết
- Người dùng đã đăng ký `test@eshop.com` đã thực hiện Bước 1 để lấy OTP.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `test@eshop.com` |
| `otp` | `12345` (5 chữ số) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Điều hướng đến Bước 2 của quy trình đặt lại mật khẩu cho `test@eshop.com`.
2. Nhập mã OTP 5 chữ số `12345`.
3. Nhập mật khẩu mới hợp lệ và xác nhận mật khẩu.
4. Nhấn nút gửi ("Đặt lại mật khẩu").
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu do độ dài mã OTP không hợp lệ (phải chính xác 6 chữ số).
- Mật khẩu không bị thay đổi.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra giá trị biên ngay dưới yêu cầu 6 chữ số (`6 - 1 = 5`).

---

### TC-BVA-OTP-002: Độ dài OTP Tại Biên (6 Chữ số)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1, Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (biên chính xác)
## Điều kiện Tiên quyết
- Người dùng đã đăng ký `test@eshop.com` đã thực hiện Bước 1.
- Mã OTP 6 chữ số đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `test@eshop.com` |
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 1, nhập `test@eshop.com` và nhận mã OTP được tạo.
2. Tại Bước 2, nhập chính xác mã OTP 6 chữ số.
3. Nhập mật khẩu mới hợp lệ và xác nhận mật khẩu.
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống chấp nhận mã OTP 6 chữ số.
- Đặt lại mật khẩu thành công; người dùng có thể đăng nhập bằng `ValidPass1!`.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra đúng ngưỡng 6 chữ số theo yêu cầu của FR-03.

---

### TC-BVA-OTP-003: Độ dài OTP Trên Biên (7 Chữ số)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (len + 1)
## Điều kiện Tiên quyết
- Người dùng đã đăng ký `test@eshop.com` đã thực hiện Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `test@eshop.com` |
| `otp` | `1234567` (7 chữ số) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP 7 chữ số `1234567`.
2. Nhập mật khẩu mới hợp lệ và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu do độ dài mã OTP không hợp lệ.
- Mật khẩu không bị thay đổi.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra giá trị biên ngay trên yêu cầu 6 chữ số (`6 + 1 = 7`).

---

### TC-BVA-PW-LEN-001: Độ dài Mật khẩu Dưới Biên (7 Ký tự)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min - 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc12@x` (7 ký tự: 1 chữ hoa, 3 chữ thường, 2 chữ số, 1 ký tự đặc biệt) |
| `confirm_password` | `Abc12@x` |
## Các Bước Thực hiện
1. Điều hướng đến Bước 2.
2. Nhập mã OTP hợp lệ.
3. Nhập mật khẩu 7 ký tự `Abc12@x` vào cả hai trường mật khẩu mới và xác nhận mật khẩu.
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu với thông báo lỗi xác thực yêu cầu mật khẩu phải có ít nhất 8 ký tự.
- Mật khẩu không bị thay đổi.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra ngưỡng độ dài số nguyên ngay dưới mức tối thiểu (`8 - 1 = 7`).

---

### TC-BVA-PW-LEN-002: Độ dài Mật khẩu Tại Biên (8 Ký tự)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc123@x` (8 ký tự: 1 chữ hoa, 3 chữ thường, 3 chữ số, 1 ký tự đặc biệt) |
| `confirm_password` | `Abc123@x` |
## Các Bước Thực hiện
1. Điều hướng đến Bước 2.
2. Nhập mã OTP hợp lệ.
3. Nhập mật khẩu 8 ký tự `Abc123@x` vào cả hai trường mật khẩu mới và xác nhận mật khẩu.
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống chấp nhận mật khẩu; đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra chính xác biên tối thiểu được bao gồm (`min = 8`).

---

### TC-BVA-PW-LEN-003: Độ dài Mật khẩu Trên Biên (9 Ký tự)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min + 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc1234@x` (9 ký tự) |
| `confirm_password` | `Abc1234@x` |
## Các Bước Thực hiện
1. Điều hướng đến Bước 2.
2. Nhập mã OTP hợp lệ.
3. Nhập mật khẩu 9 ký tự `Abc1234@x` vào cả hai trường mật khẩu mới và xác nhận mật khẩu.
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống chấp nhận mật khẩu; đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra độ dài danh định ngay trên ngưỡng tối thiểu (`8 + 1 = 9`).

---

### TC-BVA-COMP-UPPER-001: Số lượng Chữ hoa Dưới Biên (0 Chữ hoa)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 0)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `abc1234@x` (8 ký tự, 0 chữ hoa) |
| `confirm_password` | `abc1234@x` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `abc1234@x` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối mật khẩu do thiếu ký tự viết hoa (`min = 1`).
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên số lượng chữ hoa dưới ngưỡng (`1 - 1 = 0`).

---

### TC-BVA-COMP-UPPER-002: Số lượng Chữ hoa Tại Biên (1 Chữ hoa)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc1234@x` (8 ký tự, chính xác 1 chữ hoa) |
| `confirm_password` | `Abc1234@x` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abc1234@x` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Xác thực mật khẩu vượt qua yêu cầu chữ hoa. Đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra số lượng chữ hoa chính xác tại ngưỡng tối thiểu (`min = 1`).

---

### TC-BVA-COMP-LOWER-001: Số lượng Chữ thường Dưới Biên (0 Chữ thường)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 0)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `ABC1234@X` (8 ký tự, 0 chữ thường) |
| `confirm_password` | `ABC1234@X` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `ABC1234@X` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối mật khẩu do thiếu ký tự viết thường (`min = 1`).
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên số lượng chữ thường dưới ngưỡng (`1 - 1 = 0`).

---

### TC-BVA-COMP-LOWER-002: Số lượng Chữ thường Tại Biên (1 Chữ thường)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `ABc1234@X` (8 ký tự, chính xác 1 chữ thường: 'c') |
| `confirm_password` | `ABc1234@X` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `ABc1234@X` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Xác thực mật khẩu vượt qua yêu cầu chữ thường. Đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra số lượng chữ thường chính xác tại ngưỡng tối thiểu (`min = 1`).

---

### TC-BVA-COMP-DIGIT-001: Số lượng Chữ số Dưới Biên (0 Chữ số)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 0)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abcdefgh@` (8 ký tự, 0 chữ số) |
| `confirm_password` | `Abcdefgh@` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdefgh@` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối mật khẩu do thiếu chữ số (`min = 1`).
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên số lượng chữ số dưới ngưỡng (`1 - 1 = 0`).

---

### TC-BVA-COMP-DIGIT-002: Số lượng Chữ số Tại Biên (1 Chữ số)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abcdefg1@` (8 ký tự, chính xác 1 chữ số: '1') |
| `confirm_password` | `Abcdefg1@` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdefg1@` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Xác thực mật khẩu vượt qua yêu cầu chữ số. Đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra số lượng chữ số chính xác tại ngưỡng tối thiểu (`min = 1`).

---

### TC-BVA-COMP-SPEC-001: Số lượng Ký tự Đặc biệt Dưới Biên (0 Ký tự Đặc biệt)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 0)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abcdefg12` (8 ký tự, 0 ký tự đặc biệt) |
| `confirm_password` | `Abcdefg12` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdefg12` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối mật khẩu do thiếu ký tự đặc biệt thuộc tập `@, $, !, %, *, ?, &`.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên số lượng ký tự đặc biệt dưới ngưỡng (`1 - 1 = 0`).

---

### TC-BVA-COMP-SPEC-002: Số lượng Ký tự Đặc biệt Tại Biên (1 Ký tự Đặc biệt Hợp lệ)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (count = 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abcdef12@` (8 ký tự, chính xác 1 ký tự đặc biệt: '@') |
| `confirm_password` | `Abcdef12@` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abcdef12@` vào trường mật khẩu mới và xác nhận mật khẩu.
3. Nhấn nút gửi.
## Kết quả Mong đợi
- Xác thực mật khẩu vượt qua yêu cầu ký tự đặc biệt. Đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra số lượng ký tự đặc biệt chính xác tại ngưỡng tối thiểu (`min = 1`).

---

### TC-BVA-MATCH-001: Khớp Xác nhận Mật khẩu (Khoảng cách = 0, Khớp Hoàn toàn)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (diff = 0)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc123@x` |
| `confirm_password` | `Abc123@x` (Lệch 0 ký tự) |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abc123@x` vào "Mật khẩu mới".
3. Nhập `Abc123@x` vào "Xác nhận mật khẩu mới".
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống xác nhận cả hai trường khớp nhau; đặt lại mật khẩu thành công.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên đồng nhất chính xác nơi độ lệch giữa hai trường bằng 0.

---

### TC-BVA-MATCH-002: Lệch Xác nhận Mật khẩu 1 Ký tự (Khoảng cách = 1)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (diff = 1)
## Điều kiện Tiên quyết
- Mã OTP hợp lệ đã được tạo cho `test@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP hợp lệ>` |
| `new_password` | `Abc123@x` |
| `confirm_password` | `Abc123@y` (Lệch 1 ký tự duy nhất ở vị trí cuối) |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abc123@x` vào mật khẩu mới.
3. Nhập `Abc123@y` vào xác nhận mật khẩu.
4. Nhấn nút gửi.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu do mật khẩu mới và xác nhận mật khẩu không khớp nhau.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên ngay ngoài điều kiện khớp (lệch đúng 1 ký tự).

---

### TC-BVA-ASSOC-001: Biên Khớp Liên kết OTP - Email (Cùng Tài khoản)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng & Bảo mật / Phân tích Giá trị Biên
## Điều kiện Tiên quyết
- Tài khoản A: `test@eshop.com` (Đã tạo OTP-A).
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| Tài khoản Mục tiêu | `test@eshop.com` |
| `otp` | OTP-A |
| `new_password` | `NewPass123!` |
| `confirm_password` | `NewPass123!` |
## Các Bước Thực hiện
1. Gửi yêu cầu đặt lại mật khẩu cho `test@eshop.com` bằng OTP-A.
## Kết quả Mong đợi
- Đặt lại thành công vì OTP-A thuộc về tài khoản `test@eshop.com`.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Điều kiện biên hợp lệ khi định danh người yêu cầu và đối tượng đặt lại trùng khớp (độ lệch định danh bằng 0).

---

### TC-BVA-ASSOC-002: Biên Lệch Liên kết OTP - Email (Khác Tài khoản)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Bảo mật / Phân tích Giá trị Biên
## Điều kiện Tiên quyết
- Tài khoản A: `test@eshop.com` (Đã tạo OTP-A).
- Tài khoản B: `admin@eshop.com`.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| Tài khoản Mục tiêu | `admin@eshop.com` |
| `otp` | OTP-A (được tạo cho `test@eshop.com`) |
| `new_password` | `AdminPass123!` |
| `confirm_password` | `AdminPass123!` |
## Các Bước Thực hiện
1. Gửi yêu cầu đặt lại mật khẩu cho `admin@eshop.com` bằng OTP-A.
## Kết quả Mong đợi
- Yêu cầu bị từ chối vì OTP-A không hợp lệ cho `admin@eshop.com`.
- Mật khẩu của tài khoản Admin không bị thay đổi.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm thử biên bảo mật nhằm xác minh tính cô lập tài khoản: OTP CHỈ hợp lệ cho chính email đã yêu cầu.

---

### TC-BVA-TRANS-001: Chuyển đổi Trạng thái từ Bước 1 sang Bước 2 (Kích hoạt Hợp lệ)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Biên Chuyển đổi Trạng thái
## Điều kiện Tiên quyết
- Người dùng đang ở Bước 1 (`/forgot-password`).
- `test@eshop.com` đã được đăng ký.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `test@eshop.com` |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password`.
2. Nhập email đã đăng ký `test@eshop.com`.
3. Nhấn "Lấy mã OTP".
## Kết quả Mong đợi
- Trạng thái chuyển đổi từ Bước 1 sang Bước 2.
- Chỉ báo bước cập nhật hiển thị Bước 2/2.
- Mã OTP được hiển thị trên màn hình (môi trường demo).
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên chuyển đổi tích cực qua các giai đoạn của biểu mẫu.

---

### TC-BVA-TRANS-002: Biên Chuyển đổi Trạng thái Bước 1 (Đầu vào Rỗng / Không hợp lệ)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Biên Chuyển đổi Trạng thái
## Điều kiện Tiên quyết
- Người dùng đang ở Bước 1 (`/forgot-password`).
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `""` (Chuỗi rỗng) |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password`.
2. Để trống trường email và nhấn "Lấy mã OTP".
## Kết quả Mong đợi
- Biểu mẫu KHÔNG chuyển sang Bước 2.
- Người dùng vẫn ở lại Bước 1 với thông báo lỗi xác thực hiển thị.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên chuyển đổi tiêu cực khi thiếu dữ liệu đầu vào chặn tiến trình chuyển bước.

---

### TC-BVA-TRANS-003: Biên Điều hướng "Quay lại đăng nhập" ở Bước 1
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Điều hướng UI / Phân tích Giá trị Biên
## Điều kiện Tiên quyết
- Người dùng đang ở Bước 1 (`/forgot-password`).
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| Thao tác UI | Nhấn nút "Quay lại đăng nhập" |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password` (Bước 1).
2. Tìm và nhấn nút "Quay lại đăng nhập".
## Kết quả Mong đợi
- Ứng dụng thoát khỏi luồng đặt lại mật khẩu và chuyển hướng điều hướng về `/login`.
## Trạng thái / Lỗi Liên quan
Chưa chạy / Không có
## Cơ sở Lý luận
Kiểm tra biên điều hướng thoát khỏi quy trình đặt lại mật khẩu.

---

## 5. Tóm tắt Độ bao phủ (Coverage Summary)

- **Số Biên được Xác định**: 9 biên
  - Độ dài OTP (cố định 6 chữ số)
  - Độ dài tối thiểu của mật khẩu (8 ký tự)
  - Ngưỡng tối thiểu chữ hoa (1 ký tự)
  - Ngưỡng tối thiểu chữ thường (1 ký tự)
  - Ngưỡng tối thiểu chữ số (1 ký tự)
  - Ngưỡng tối thiểu ký tự đặc biệt (1 ký tự thuộc tập chỉ định)
  - Độ lệch khớp xác nhận mật khẩu (lệch 0 vs lệch 1 ký tự)
  - Liên kết OTP - Email (trùng khớp định danh tuyệt đối)
  - Chuyển đổi trạng thái các bước (Bước 1 -> Bước 2, Chặn Bước 1, Bước 1 -> Đăng nhập)
- **Số Biên được Bao phủ**: 9 / 9 (100% các biên áp dụng được bao phủ với các giá trị dưới, tại và trên)
- **Số Test Case được Tạo**: 21 test case (`TC-BVA-OTP-001` đến `TC-BVA-TRANS-003`)
- **Giả định**:
  - Test oracle được căn cứ nghiêm ngặt theo đặc tả trong `README.md` (FR-03 & FR-01).
  - Các điểm sai khác trong hiện trạng cài đặt (ví dụ: backend tạo 4 chữ số thay vì 6 chữ số, frontend thiếu trường xác nhận) được ghi nhận trong quá trình thực thi kiểm thử so với oracle mà không định kiến trước trạng thái test case.

---

## 6. Yêu cầu Rà soát từ Con người (Human Review Required)

1. **Giới hạn Biên trên của Độ dài Mật khẩu**: Hệ thống có quy định giới hạn trên (ví dụ: 64 hoặc 128 ký tự) để cần thêm kiểm thử biên trên hay không?
2. **Xác minh Hiện trạng Cài đặt**: Khi thực thi `TC-BVA-OTP-002`, lưu ý rằng `server.js` hiện tại đang tạo token 4 chữ số trong khi đặc tả yêu cầu 6 chữ số. Test oracle kỳ vọng chuẩn 6 chữ số.
3. **Trường Xác nhận Mật khẩu trên Frontend**: Lưu ý rằng `ForgotPassword.jsx` hiện tại bỏ sót trường nhập xác nhận mật khẩu theo yêu cầu của Bước 2. Việc thực thi `TC-BVA-MATCH-001` và `TC-BVA-MATCH-002` sẽ ghi nhận hành vi thực tế so với FR-03.

---

## 7. Các Ứng viên Lỗ hổng AI (AI Gap Candidates)

### Ứng viên 1
- **Trường hợp có thể bị bỏ sót**: Các giá trị biên số học của OTP (ví dụ: số 6 chữ số nhỏ nhất `000000` hoặc `100000` so với số lớn nhất `999999`).
- **Nguyên nhân có thể bị bỏ sót**: Đặc tả định nghĩa OTP là "6 chữ số ngẫu nhiên", có thể hiểu là chuỗi 6 ký tự số hoặc khoảng số học `[000000, 999999]`.
- **Hành động con người cần làm**: Xác nhận xem việc bảo toàn số 0 ở đầu (ví dụ: `012345`) có cần kiểm thử hay không nếu hệ thống lưu trữ dưới dạng chuỗi so với số nguyên trong cơ sở dữ liệu.
