# Kiểm thử Miền giá trị và Phân tích Giá trị Biên cho FR-03: Quên mật khẩu & Đặt lại mật khẩu

---

## 1. Phân tích Yêu cầu (Requirement Analysis)

### Yêu cầu
- **Mã Yêu cầu (ID)**: FR-03 (tham chiếu quy tắc độ mạnh mật khẩu từ FR-01)
- **Tính năng (Feature)**: Quên mật khẩu & Đặt lại mật khẩu (2 bước)
- **Phân hệ (Module)**: Quản lý Tài khoản / Xác thực (Authentication / Account Management)

### Các Quy tắc Chức năng (Functional Rules)
1. **Bước 1 — Lấy mã OTP**:
   - Người dùng nhập địa chỉ Email đã đăng ký.
   - Hệ thống sinh mã OTP **6 chữ số ngẫu nhiên** và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
   - Giao diện phải hiển thị **chỉ báo bước (Step Indicator)** — ví dụ: "Bước 1 / 2" hoặc "Step 1/2".
   - Có nút **Quay lại đăng nhập**.
2. **Bước 2 — Đặt lại mật khẩu**:
   - Người dùng nhập OTP, Mật khẩu mới, và **Xác nhận mật khẩu mới**.
   - Mật khẩu mới phải tuân thủ điều kiện như FR-01:
     - Tối thiểu 8 ký tự,
     - Có ít nhất 1 chữ hoa (`A-Z`),
     - Có ít nhất 1 chữ thường (`a-z`),
     - Có ít nhất 1 chữ số (`0-9`),
     - Có ít nhất 1 ký tự đặc biệt thuộc tập hợp: `@`, `$`, `!`, `%`, `*`, `?`, `&`.
   - Hai trường mật khẩu mới và xác nhận mật khẩu phải khớp nhau hoàn toàn.
   - Mã OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

### Điều kiện Tiên quyết (Preconditions)
- Tài khoản người dùng mục tiêu (`email`) đã tồn tại trong cơ sở dữ liệu hệ thống (ví dụ: `test@eshop.com`).
- Đối với Bước 2, Bước 1 phải được thực hiện thành công để tạo mã OTP cho email yêu cầu.

### Dữ liệu Đầu vào (Inputs)
| Biến | Kiểu dữ liệu | Mô tả | Ràng buộc |
|---|---|---|---|
| `email` | String | Địa chỉ email yêu cầu đặt lại mật khẩu | Định dạng email đã đăng ký (`user@domain.com`) |
| `otp` | String / Numeric | Mã One-Time Password nhận được từ Bước 1 | Chính xác 6 chữ số (`000000`–`999999`) |
| `new_password` | String | Mật khẩu mới ứng viên | Độ dài >= 8; gồm chữ hoa, chữ thường, số và ký tự đặc biệt thuộc `{@, $, !, %, *, ?, &}` |
| `confirm_password` | String | Xác nhận lại mật khẩu mới | Phải khớp chính xác với `new_password` |
| `otp_email_context` | String | Định danh tài khoản thực hiện đặt lại ở Bước 2 | Phải trùng khớp với `email` đã yêu cầu mã OTP |

### Kết quả / Hành vi Mong đợi (Expected Outputs / Behaviors)
- **Bước 1 (Email Hợp lệ)**: Hệ thống chấp nhận email, tạo mã OTP 6 chữ số, hiển thị trên màn hình (chế độ demo), chuyển sang Bước 2, hiển thị chỉ báo bước và nút "Quay lại đăng nhập".
- **Bước 1 (Email Không hợp lệ)**: Hệ thống từ chối yêu cầu, hiển thị thông báo lỗi, không sinh mã OTP cho email chưa đăng ký hoặc sai định dạng.
- **Bước 2 (Đầu vào Hợp lệ)**: Cập nhật mật khẩu thành công; người dùng đăng nhập được bằng mật khẩu mới; mật khẩu cũ bị hủy.
- **Bước 2 (OTP Không hợp lệ)**: Từ chối với thông báo lỗi; mật khẩu không thay đổi.
- **Bước 2 (Dùng OTP chéo tài khoản)**: Từ chối; mã OTP tạo cho Email A không thể dùng để đặt lại cho Email B.
- **Bước 2 (Mật khẩu yếu / Không khớp)**: Từ chối với thông báo lỗi xác thực; mật khẩu không thay đổi.

### Các Giả định (Assumptions)
- Trong môi trường demo, việc hiển thị OTP trực tiếp trên giao diện giúp kiểm thử tự động và thủ công mà không phụ thuộc vào máy chủ mail bên ngoài.
- Ràng buộc ký tự đặc biệt giới hạn nghiêm ngặt trong tập `@, $, !, %, *, ?, &` theo đặc tả.
- Xác thực HTML5 hoặc chặn form ngăn chặn việc gửi các trường để trống.

### Các Điểm Mơ hồ (Ambiguities)
- **Độ dài Tối đa của Mật khẩu**: Đặc tả chỉ ghi "tối thiểu 8 ký tự" nhưng không định nghĩa giới hạn trên (ví dụ: 64, 128 ký tự).
- **Hạn thời gian / Số lần thử OTP**: Đặc tả không nêu rõ thời gian hết hạn của OTP (ví dụ: 5 hoặc 15 phút) hay giới hạn số lần nhập sai liên tiếp.
- **Ký tự đặc biệt ngoài tập cho phép**: Đặc tả nêu "ít nhất một ký tự đặc biệt từ @, $, !, %, *, ?, &". Nếu có thêm các ký tự khác (ví dụ: `#`, `^`, `.`) kèm theo thì hợp lệ hay không hợp lệ?

---

## 2. Phân tích Miền giá trị (Domain Analysis)

| Biến | Kiểu Dữ liệu | Miền Hợp lệ | (Các) Miền Không hợp lệ | Ràng buộc / Ghi chú |
|---|---|---|---|---|
| `email` (Bước 1) | String | Định dạng hợp lệ (`user@domain.com`) đã có trong DB | Email chưa đăng ký; sai cú pháp; chuỗi rỗng `""` | Phải tồn tại trong cơ sở dữ liệu người dùng |
| `otp` (Bước 2) | String (Chữ số) | Mã 6 chữ số được cấp phát đúng cho email yêu cầu | Sai mã 6 chữ số; độ dài < 6; độ dài > 6; chứa ký tự không phải số; rỗng `""` | Ràng buộc chặt chẽ với email yêu cầu |
| `otp_email_context` (Bước 2) | String | Email trùng khớp người nhận OTP | Email khác với người nhận OTP | Biên bảo mật cô lập tài khoản |
| `new_password` (Bước 2) | String | Độ dài >= 8, chứa `[A-Z]`, `[a-z]`, `[0-9]`, và `[@$!%*?&]` | Độ dài < 8; thiếu chữ hoa; thiếu chữ thường; thiếu số; thiếu ký tự đặc biệt cho phép; rỗng `""` | Ràng buộc đa điều kiện đồng thời |
| `confirm_password` (Bước 2) | String | Chuỗi giống hệt `new_password` | Chuỗi khác với `new_password`; chuỗi rỗng `""` | Phụ thuộc vào `new_password` |

---

## 3. Phân hoạch Tương đương (Equivalence Partitions)

| Mã Phân hoạch | Biến | Phân lớp | Điều kiện | Giá trị Đại diện | Yêu cầu |
|---|---|---|---|---|---|
| **EP-EMAIL-01** | `email` | VALID | Email đã đăng ký, đúng định dạng | `test@eshop.com` | FR-03 (Bước 1) |
| **EP-EMAIL-02** | `email` | INVALID | Email chưa đăng ký, đúng định dạng | `notfound@eshop.com` | FR-03 (Bước 1) |
| **EP-EMAIL-03** | `email` | INVALID | Sai định dạng email (thiếu domain/`@`) | `testeshop.com` | FR-03, FR-01 |
| **EP-EMAIL-04** | `email` | INVALID | Chuỗi email để trống | `""` | FR-03 (Bước 1) |
| **EP-OTP-01** | `otp` | VALID | Mã 6 chữ số khớp với mã OTP được sinh ra | `123456` | FR-03 (Bước 2) |
| **EP-OTP-02** | `otp` | INVALID | Mã 6 chữ số không khớp với mã OTP được sinh ra | `654321` | FR-03 (Bước 2) |
| **EP-OTP-03** | `otp` | INVALID | Mã OTP thuộc về tài khoản/email khác | Mã OTP hợp lệ của user 2 | FR-03 (Bước 2) |
| **EP-OTP-04** | `otp` | INVALID | Độ dài < 6 chữ số | `12345` | FR-03 (Bước 1, 2) |
| **EP-OTP-05** | `otp` | INVALID | Độ dài > 6 chữ số | `1234567` | FR-03 (Bước 1, 2) |
| **EP-OTP-06** | `otp` | INVALID | Chuỗi 6 ký tự chứa ký tự không phải số | `12A45!` | FR-03 (Bước 1, 2) |
| **EP-OTP-07** | `otp` | INVALID | Chuỗi OTP để trống | `""` | FR-03 (Bước 2) |
| **EP-PW-LEN-01** | `new_password` | VALID | Độ dài >= 8 (thỏa mãn đầy đủ nhóm ký tự) | `Pass123@` (độ dài 8) | FR-03, FR-01 |
| **EP-PW-LEN-02** | `new_password` | INVALID | Độ dài < 8 (từ 1 đến 7 ký tự) | `Pas12@` (độ dài 6) | FR-03, FR-01 |
| **EP-PW-LEN-03** | `new_password` | INVALID | Mật khẩu để trống (độ dài 0) | `""` | FR-03, FR-01 |
| **EP-PW-CLS-01** | `new_password` | VALID | Chứa đủ chữ hoa, chữ thường, số và `@$!%*?&` | `ValidPass1!` | FR-03, FR-01 |
| **EP-PW-CLS-02** | `new_password` | INVALID | Thiếu ký tự chữ hoa | `validpass1!` | FR-03, FR-01 |
| **EP-PW-CLS-03** | `new_password` | INVALID | Thiếu ký tự chữ thường | `VALIDPASS1!` | FR-03, FR-01 |
| **EP-PW-CLS-04** | `new_password` | INVALID | Thiếu ký tự chữ số | `ValidPassword!` | FR-03, FR-01 |
| **EP-PW-CLS-05** | `new_password` | INVALID | Thiếu ký tự đặc biệt | `ValidPassword1` | FR-03, FR-01 |
| **EP-PW-CLS-06** | `new_password` | INVALID | Ký tự đặc biệt không thuộc `{@, $, !, %, *, ?, &}` | `ValidPass1#` | FR-03, FR-01 |
| **EP-MATCH-01** | `confirm_password` | VALID | Khớp chính xác hoàn toàn với `new_password` | Chuỗi giống hệt | FR-03 (Bước 2) |
| **EP-MATCH-02** | `confirm_password` | INVALID | Khác với `new_password` (lệch chữ hoa/thường hoặc ký tự) | Chuỗi không trùng | FR-03 (Bước 2) |
| **EP-MATCH-03** | `confirm_password` | INVALID | Xác nhận mật khẩu để trống | `""` | FR-03 (Bước 2) |
| **EP-UI-01** | Trạng thái UI | VALID | Chỉ báo bước hiển thị ("Bước 1 / 2" / "Step 1/2") | Màn hình Bước 1 | FR-03 (Bước 1) |
| **EP-UI-02** | Trạng thái UI | VALID | Nút "Quay lại đăng nhập" hoạt động điều hướng | Nhấn nút | FR-03 (Bước 1) |
| **EP-UI-03** | Trạng thái UI | VALID | Mã OTP hiển thị trực tiếp trên màn hình ở demo | Banner hiển thị | FR-03 (Bước 1) |

---

## 4. Phân tích Biên (Boundary Analysis)

| Biến | Biên Dưới | Biên Trên | Tính Bao gồm | Yêu cầu | Ghi chú |
|---|---:|---:|---|---|---|
| Độ dài `new_password` | 8 | Chưa xác định | Bao gồm biên dưới (tối thiểu 8) | FR-03, FR-01 | "Tối thiểu 8 ký tự". Biên trên chưa đặc tả. |
| Độ dài `otp` | 6 | 6 | Khớp chính xác (6 chữ số) | FR-03 (Bước 1) | "6 chữ số ngẫu nhiên". |

```text
ĐIỂM MƠ HỒ (AMBIGUITY):
Đặc tả không định nghĩa giới hạn trên cho độ dài mật khẩu.
BVA không thể hoàn thành tin cậy cho biên trên cho đến khi được làm rõ.
```

---

## 5. Các Giá trị BVA (BVA Values)

| Biến | Biên | Giá trị Kiểm thử | Phân loại | Lý do |
|---|---|---:|---|---|
| Độ dài `new_password` | Dưới (8) | 7 ký tự (`Abc12@x`) | INVALID | Ngay dưới ngưỡng tối thiểu (`min - 1`) |
| Độ dài `new_password` | Dưới (8) | 8 ký tự (`Abc123@x`) | VALID | Ngay tại ngưỡng tối thiểu (`min`) |
| Độ dài `new_password` | Dưới (8) | 9 ký tự (`Abc1234@x`) | VALID | Ngay trên ngưỡng tối thiểu (`min + 1`) |
| Độ dài `otp` | Chính xác (6) | 5 chữ số (`12345`) | INVALID | Ngay dưới độ dài cố định (`len - 1`) |
| Độ dài `otp` | Chính xác (6) | 6 chữ số (`123456`) | VALID | Đúng độ dài biên chuẩn |
| Độ dài `otp` | Chính xác (6) | 7 chữ số (`1234567`) | INVALID | Ngay trên độ dài cố định (`len + 1`) |

---

## 6. Các Test Case Được Tạo (Generated Test Cases)

# Kiểm thử Miền giá trị và Phân tích Giá trị Biên cho FR-03: Quên mật khẩu & Đặt lại mật khẩu

---

## 1. Phân tích Yêu cầu (Requirement Analysis)

### Yêu cầu
- **Mã Yêu cầu (ID)**: FR-03 (tham chiếu quy tắc độ mạnh mật khẩu từ FR-01)
- **Tính năng (Feature)**: Quên mật khẩu & Đặt lại mật khẩu (2 bước)
- **Phân hệ (Module)**: Quản lý Tài khoản / Xác thực (Authentication / Account Management)

### Các Quy tắc Chức năng (Functional Rules)
1. **Bước 1 — Lấy mã OTP**:
   - Người dùng nhập địa chỉ Email đã đăng ký.
   - Hệ thống sinh mã OTP **6 chữ số ngẫu nhiên** và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
   - Giao diện phải hiển thị **chỉ báo bước (Step Indicator)** — ví dụ: "Bước 1 / 2" hoặc "Step 1/2".
   - Có nút **Quay lại đăng nhập**.
2. **Bước 2 — Đặt lại mật khẩu**:
   - Người dùng nhập OTP, Mật khẩu mới, và **Xác nhận mật khẩu mới**.
   - Mật khẩu mới phải tuân thủ điều kiện như FR-01:
     - Tối thiểu 8 ký tự,
     - Có ít nhất 1 chữ hoa (`A-Z`),
     - Có ít nhất 1 chữ thường (`a-z`),
     - Có ít nhất 1 chữ số (`0-9`),
     - Có ít nhất 1 ký tự đặc biệt thuộc tập hợp: `@`, `$`, `!`, `%`, `*`, `?`, `&`.
   - Hai trường mật khẩu mới và xác nhận mật khẩu phải khớp nhau hoàn toàn.
   - Mã OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

### Điều kiện Tiên quyết (Preconditions)
- Tài khoản người dùng mục tiêu (`email`) đã tồn tại trong cơ sở dữ liệu hệ thống (ví dụ: `test@eshop.com`).
- Đối với Bước 2, Bước 1 phải được thực hiện thành công để tạo mã OTP cho email yêu cầu.

### Dữ liệu Đầu vào (Inputs)
| Biến | Kiểu dữ liệu | Mô tả | Ràng buộc |
|---|---|---|---|
| `email` | String | Địa chỉ email yêu cầu đặt lại mật khẩu | Định dạng email đã đăng ký (`user@domain.com`) |
| `otp` | String / Numeric | Mã One-Time Password nhận được từ Bước 1 | Chính xác 6 chữ số (`000000`–`999999`) |
| `new_password` | String | Mật khẩu mới ứng viên | Độ dài >= 8; gồm chữ hoa, chữ thường, số và ký tự đặc biệt thuộc `{@, $, !, %, *, ?, &}` |
| `confirm_password` | String | Xác nhận lại mật khẩu mới | Phải khớp chính xác với `new_password` |
| `otp_email_context` | String | Định danh tài khoản thực hiện đặt lại ở Bước 2 | Phải trùng khớp với `email` đã yêu cầu mã OTP |

### Kết quả / Hành vi Mong đợi (Expected Outputs / Behaviors)
- **Bước 1 (Email Hợp lệ)**: Hệ thống chấp nhận email, tạo mã OTP 6 chữ số, hiển thị trên màn hình (chế độ demo), chuyển sang Bước 2, hiển thị chỉ báo bước và nút "Quay lại đăng nhập".
- **Bước 1 (Email Không hợp lệ)**: Hệ thống từ chối yêu cầu, hiển thị thông báo lỗi, không sinh mã OTP cho email chưa đăng ký hoặc sai định dạng.
- **Bước 2 (Đầu vào Hợp lệ)**: Cập nhật mật khẩu thành công; người dùng đăng nhập được bằng mật khẩu mới; mật khẩu cũ bị hủy.
- **Bước 2 (OTP Không hợp lệ)**: Từ chối với thông báo lỗi; mật khẩu không thay đổi.
- **Bước 2 (Dùng OTP chéo tài khoản)**: Từ chối; mã OTP tạo cho Email A không thể dùng để đặt lại cho Email B.
- **Bước 2 (Mật khẩu yếu / Không khớp)**: Từ chối với thông báo lỗi xác thực; mật khẩu không thay đổi.

### Các Giả định (Assumptions)
- Trong môi trường demo, việc hiển thị OTP trực tiếp trên giao diện giúp kiểm thử tự động và thủ công mà không phụ thuộc vào máy chủ mail bên ngoài.
- Ràng buộc ký tự đặc biệt giới hạn nghiêm ngặt trong tập `@, $, !, %, *, ?, &` theo đặc tả.
- Xác thực HTML5 hoặc chặn form ngăn chặn việc gửi các trường để trống.

### Các Điểm Mơ hồ (Ambiguities)
- **Độ dài Tối đa của Mật khẩu**: Đặc tả chỉ ghi "tối thiểu 8 ký tự" nhưng không định nghĩa giới hạn trên (ví dụ: 64, 128 ký tự).
- **Hạn thời gian / Số lần thử OTP**: Đặc tả không nêu rõ thời gian hết hạn của OTP (ví dụ: 5 hoặc 15 phút) hay giới hạn số lần nhập sai liên tiếp.
- **Ký tự đặc biệt ngoài tập cho phép**: Đặc tả nêu "ít nhất một ký tự đặc biệt từ @, $, !, %, *, ?, &". Nếu có thêm các ký tự khác (ví dụ: `#`, `^`, `.`) kèm theo thì hợp lệ hay không hợp lệ?

---

## 2. Phân tích Miền giá trị (Domain Analysis)

| Biến | Kiểu Dữ liệu | Miền Hợp lệ | (Các) Miền Không hợp lệ | Ràng buộc / Ghi chú |
|---|---|---|---|---|
| `email` (Bước 1) | String | Định dạng hợp lệ (`user@domain.com`) đã có trong DB | Email chưa đăng ký; sai cú pháp; chuỗi rỗng `""` | Phải tồn tại trong cơ sở dữ liệu người dùng |
| `otp` (Bước 2) | String (Chữ số) | Mã 6 chữ số được cấp phát đúng cho email yêu cầu | Sai mã 6 chữ số; độ dài < 6; độ dài > 6; chứa ký tự không phải số; rỗng `""` | Ràng buộc chặt chẽ với email yêu cầu |
| `otp_email_context` (Bước 2) | String | Email trùng khớp người nhận OTP | Email khác với người nhận OTP | Biên bảo mật cô lập tài khoản |
| `new_password` (Bước 2) | String | Độ dài >= 8, chứa `[A-Z]`, `[a-z]`, `[0-9]`, và `[@$!%*?&]` | Độ dài < 8; thiếu chữ hoa; thiếu chữ thường; thiếu số; thiếu ký tự đặc biệt cho phép; rỗng `""` | Ràng buộc đa điều kiện đồng thời |
| `confirm_password` (Bước 2) | String | Chuỗi giống hệt `new_password` | Chuỗi khác với `new_password`; chuỗi rỗng `""` | Phụ thuộc vào `new_password` |

---

## 3. Phân hoạch Tương đương (Equivalence Partitions)

| Mã Phân hoạch | Biến | Phân lớp | Điều kiện | Giá trị Đại diện | Yêu cầu |
|---|---|---|---|---|---|
| **EP-EMAIL-01** | `email` | VALID | Email đã đăng ký, đúng định dạng | `test@eshop.com` | FR-03 (Bước 1) |
| **EP-EMAIL-02** | `email` | INVALID | Email chưa đăng ký, đúng định dạng | `notfound@eshop.com` | FR-03 (Bước 1) |
| **EP-EMAIL-03** | `email` | INVALID | Sai định dạng email (thiếu domain/`@`) | `testeshop.com` | FR-03, FR-01 |
| **EP-EMAIL-04** | `email` | INVALID | Chuỗi email để trống | `""` | FR-03 (Bước 1) |
| **EP-OTP-01** | `otp` | VALID | Mã 6 chữ số khớp với mã OTP được sinh ra | `123456` | FR-03 (Bước 2) |
| **EP-OTP-02** | `otp` | INVALID | Mã 6 chữ số không khớp với mã OTP được sinh ra | `654321` | FR-03 (Bước 2) |
| **EP-OTP-03** | `otp` | INVALID | Mã OTP thuộc về tài khoản/email khác | Mã OTP hợp lệ của user 2 | FR-03 (Bước 2) |
| **EP-OTP-04** | `otp` | INVALID | Độ dài < 6 chữ số | `12345` | FR-03 (Bước 1, 2) |
| **EP-OTP-05** | `otp` | INVALID | Độ dài > 6 chữ số | `1234567` | FR-03 (Bước 1, 2) |
| **EP-OTP-06** | `otp` | INVALID | Chuỗi 6 ký tự chứa ký tự không phải số | `12A45!` | FR-03 (Bước 1, 2) |
| **EP-OTP-07** | `otp` | INVALID | Chuỗi OTP để trống | `""` | FR-03 (Bước 2) |
| **EP-PW-LEN-01** | `new_password` | VALID | Độ dài >= 8 (thỏa mãn đầy đủ nhóm ký tự) | `Pass123@` (độ dài 8) | FR-03, FR-01 |
| **EP-PW-LEN-02** | `new_password` | INVALID | Độ dài < 8 (từ 1 đến 7 ký tự) | `Pas12@` (độ dài 6) | FR-03, FR-01 |
| **EP-PW-LEN-03** | `new_password` | INVALID | Mật khẩu để trống (độ dài 0) | `""` | FR-03, FR-01 |
| **EP-PW-CLS-01** | `new_password` | VALID | Chứa đủ chữ hoa, chữ thường, số và `@$!%*?&` | `ValidPass1!` | FR-03, FR-01 |
| **EP-PW-CLS-02** | `new_password` | INVALID | Thiếu ký tự chữ hoa | `validpass1!` | FR-03, FR-01 |
| **EP-PW-CLS-03** | `new_password` | INVALID | Thiếu ký tự chữ thường | `VALIDPASS1!` | FR-03, FR-01 |
| **EP-PW-CLS-04** | `new_password` | INVALID | Thiếu ký tự chữ số | `ValidPassword!` | FR-03, FR-01 |
| **EP-PW-CLS-05** | `new_password` | INVALID | Thiếu ký tự đặc biệt | `ValidPassword1` | FR-03, FR-01 |
| **EP-PW-CLS-06** | `new_password` | INVALID | Ký tự đặc biệt không thuộc `{@, $, !, %, *, ?, &}` | `ValidPass1#` | FR-03, FR-01 |
| **EP-MATCH-01** | `confirm_password` | VALID | Khớp chính xác hoàn toàn với `new_password` | Chuỗi giống hệt | FR-03 (Bước 2) |
| **EP-MATCH-02** | `confirm_password` | INVALID | Khác với `new_password` (lệch chữ hoa/thường hoặc ký tự) | Chuỗi không trùng | FR-03 (Bước 2) |
| **EP-MATCH-03** | `confirm_password` | INVALID | Xác nhận mật khẩu để trống | `""` | FR-03 (Bước 2) |
| **EP-UI-01** | Trạng thái UI | VALID | Chỉ báo bước hiển thị ("Bước 1 / 2" / "Step 1/2") | Màn hình Bước 1 | FR-03 (Bước 1) |
| **EP-UI-02** | Trạng thái UI | VALID | Nút "Quay lại đăng nhập" hoạt động điều hướng | Nhấn nút | FR-03 (Bước 1) |
| **EP-UI-03** | Trạng thái UI | VALID | Mã OTP hiển thị trực tiếp trên màn hình ở demo | Banner hiển thị | FR-03 (Bước 1) |

---

## 4. Phân tích Biên (Boundary Analysis)

| Biến | Biên Dưới | Biên Trên | Tính Bao gồm | Yêu cầu | Ghi chú |
|---|---:|---:|---|---|---|
| Độ dài `new_password` | 8 | Chưa xác định | Bao gồm biên dưới (tối thiểu 8) | FR-03, FR-01 | "Tối thiểu 8 ký tự". Biên trên chưa đặc tả. |
| Độ dài `otp` | 6 | 6 | Khớp chính xác (6 chữ số) | FR-03 (Bước 1) | "6 chữ số ngẫu nhiên". |

```text
ĐIỂM MƠ HỒ (AMBIGUITY):
Đặc tả không định nghĩa giới hạn trên cho độ dài mật khẩu.
BVA không thể hoàn thành tin cậy cho biên trên cho đến khi được làm rõ.
```

---

## 5. Các Giá trị BVA (BVA Values)

| Biến | Biên | Giá trị Kiểm thử | Phân loại | Lý do |
|---|---|---:|---|---|
| Độ dài `new_password` | Dưới (8) | 7 ký tự (`Abc12@x`) | INVALID | Ngay dưới ngưỡng tối thiểu (`min - 1`) |
| Độ dài `new_password` | Dưới (8) | 8 ký tự (`Abc123@x`) | VALID | Ngay tại ngưỡng tối thiểu (`min`) |
| Độ dài `new_password` | Dưới (8) | 9 ký tự (`Abc1234@x`) | VALID | Ngay trên ngưỡng tối thiểu (`min + 1`) |
| Độ dài `otp` | Chính xác (6) | 5 chữ số (`12345`) | INVALID | Ngay dưới độ dài cố định (`len - 1`) |
| Độ dài `otp` | Chính xác (6) | 6 chữ số (`123456`) | VALID | Đúng độ dài biên chuẩn |
| Độ dài `otp` | Chính xác (6) | 7 chữ số (`1234567`) | INVALID | Ngay trên độ dài cố định (`len + 1`) |

---

## 6. Các Test Case Được Tạo (Generated Test Cases)

## 7. Tóm tắt Độ bao phủ (Coverage Summary)

- **Số Yêu cầu được Phân tích**: 1 (FR-03, tham chiếu đến FR-01)
- **Số Biến được Xác định**: 5 (`email`, `otp`, `otp_email_context`, `new_password`, `confirm_password`)
- **Số Phân hoạch Tương đương**: 26 (trên các đầu vào, biến chéo và yêu cầu giao diện)
- **Số Phân hoạch được Bao phủ**: 26 (100% các phân hoạch được định nghĩa)
- **Số Biên được Xác định**: 2 (độ dài dưới của `new_password`, độ dài cố định của `otp`)
- **Số Biên được Bao phủ**: 2 (toàn bộ các giá trị suy diễn đều được kiểm thử)
- **Số Test Case được Tạo**: 18 test case

### Các Lỗ hổng Bao phủ Tiềm ẩn
- Giới hạn độ dài trên của mật khẩu (ví dụ: 64, 128, 255) không thể kiểm thử chính thức nếu thiếu đặc tả.
- Biên thời gian hết hạn của OTP (ví dụ: OTP hết hạn sau 5 phút) chưa được quy định.

### Các Giả định
- Ở chế độ demo, OTP hiển thị trực tiếp trên giao diện mà không phụ thuộc hạ tầng email bên ngoài.
- Tập ký tự đặc biệt cho phép bao gồm chính xác `@, $, !, %, *, ?, &`.

### Các Điểm Mơ hồ Cần Làm rõ
- Hệ thống chấp nhận hay từ chối nếu có thêm ký tự đặc biệt ngoài tập `@, $, !, %, *, ?, &`?
- Có thời gian sống cố định cho mã OTP không, và có giới hạn số lần nhập sai liên tiếp không?

---

## 8. Yêu cầu Rà soát từ Con người (Human Review Required)

1. **Giới hạn Biên trên của Độ dài Mật khẩu**: Có cần quy định độ dài tối đa rõ ràng cho mật khẩu (ví dụ: 64 hoặc 128 ký tự)?
2. **Ký tự đặc biệt không thuộc danh mục**: Mật khẩu chứa ký tự đặc biệt hợp lệ cộng thêm ký tự khác (ví dụ: `P@ss123#`) có được chấp nhận hay bị từ chối?
3. **Điều hướng ở Bước 2**: Bước 2 có cần nút "Quay lại bước 1" hay chỉ cần nút "Quay lại đăng nhập"?
4. **Vòng đời của OTP**: Nghiệp vụ có yêu cầu thời gian hết hạn (ví dụ: 5 phút) hoặc vô hiệu hóa OTP ngay sau 1 lần sử dụng hay không?

---

## 9. Các Ứng viên Lỗ hổng AI (AI Gap Candidates)

### Ứng viên 1
- **Trường hợp có thể bị bỏ sót**: Tái sử dụng OTP / vô hiệu hóa sau 1 lần dùng (cố gắng sử dụng lại chính mã OTP đó lần thứ hai sau khi đã đặt lại mật khẩu thành công).
- **Nguyên nhân có thể bị bỏ sót**: FR-03 không nêu rõ "OTP phải bị vô hiệu hóa ngay sau khi đặt lại mật khẩu thành công", mặc dù đây là nguyên tắc bảo mật thông thường.
- **Hành động con người cần làm**: Xác nhận xem việc kiểm tra tính dùng một lần (single-use) có phải là yêu cầu bắt buộc của FR-03 hay không.

### Ứng viên 2
- **Trường hợp có thể bị bỏ sót**: Yêu cầu tạo OTP nhiều lần liên tiếp ở Bước 1 (yêu cầu mã mới trước khi dùng mã cũ).
- **Nguyên nhân có thể bị bỏ sót**: Đặc tả không nói rõ mã OTP cũ có bị hủy khi người dùng yêu cầu mã mới cho cùng một email hay không.
- **Hành động con người cần làm**: Làm rõ hành vi mong đợi khi người dùng bấm "Lấy mã OTP" liên tục nhiều lần ở Bước 1.
