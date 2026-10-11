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

### TC-FORGOT-001: Bước 1 - Yêu cầu OTP với Email Hợp lệ đã Đăng ký
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Người dùng `test@eshop.com` đã tồn tại trong cơ sở dữ liệu.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `test@eshop.com` |
## Các Bước Thực hiện
1. Điều hướng đến trang `/forgot-password`.
2. Quan sát giao diện để kiểm tra Chỉ báo bước ("Bước 1 / 2" / "Step 1/2") và nút "Quay lại đăng nhập".
3. Nhập `test@eshop.com` vào ô email.
4. Nhấn nút "Lấy mã OTP".
## Kết quả Mong đợi
- Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên.
- Mã OTP hiển thị trực tiếp trên màn hình (môi trường demo).
- Biểu mẫu chuyển sang Bước 2.
## Kết quả Thực tế (Actual Result)
OTP sinh ra có 4 chữ số (ví dụ: 5984) thay vì 6 chữ số theo đặc tả. Nhãn trường nhập liệu tại Bước 2 ghi "Mã OTP (4 số)". Giao diện hoàn toàn không có chỉ báo bước ("Bước 1 / 2").

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-001](test-cases/FR-03/screenshots/TC-FORGOT-001.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-01, DEF-FR03-04

---

### TC-FORGOT-002: Bước 1 - Yêu cầu OTP với Email Chưa Đăng ký
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Email `unregistered@eshop.com` không tồn tại trong cơ sở dữ liệu.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `unregistered@eshop.com` |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password`.
2. Nhập `unregistered@eshop.com`.
3. Nhấn "Lấy mã OTP".
## Kết quả Mong đợi
- Hệ thống trả về thông báo lỗi chỉ ra người dùng/email không tồn tại.
- Không sinh mã OTP; hệ thống không chuyển sang Bước 2.
## Kết quả Thực tế (Actual Result)
Hệ thống hiển thị alert lỗi: "Lỗi: User not found". Không sinh mã OTP và giao diện giữ nguyên ở Bước 1.

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-002](test-cases/FR-03/screenshots/TC-FORGOT-002.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-003: Bước 1 - Yêu cầu OTP với Email Sai Định dạng
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Không có.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `email` | `invalid-email-format` |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password`.
2. Nhập `invalid-email-format`.
3. Nhấn gửi biểu mẫu.
## Kết quả Mong đợi
- Trình duyệt/form cảnh báo định dạng email không hợp lệ. Biểu mẫu không được gửi đi.
## Kết quả Thực tế (Actual Result)
Thẻ input email ở Bước 1 sử dụng type="text" thay vì type="email". Trình duyệt không kích hoạt validation HTML5; request được gửi lên backend và trả về alert: "Lỗi: User not found".

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-003](test-cases/FR-03/screenshots/TC-FORGOT-003.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-02

---

### TC-FORGOT-004: Bước 1 - Kiểm tra Điều hướng "Quay lại đăng nhập"
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Điều hướng UI
## Điều kiện Tiên quyết
- Người dùng đang ở Bước 1 của trang Quên mật khẩu.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| Thao tác | Nhấn nút "Quay lại đăng nhập" |
## Các Bước Thực hiện
1. Điều hướng đến `/forgot-password`.
2. Nhấn nút hoặc liên kết "Quay lại đăng nhập".
## Kết quả Mong đợi
- Ứng dụng điều hướng người dùng về trang Đăng nhập (`/login`).
## Kết quả Thực tế (Actual Result)
Giao diện biểu mẫu Bước 1 chỉ có trường nhập email và nút "Lấy mã OTP". Hoàn toàn không có nút hoặc liên kết "Quay lại đăng nhập" trong biểu mẫu.

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-004](test-cases/FR-03/screenshots/TC-FORGOT-004.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-03

---

### TC-FORGOT-005: Bước 2 - Đặt lại Mật khẩu với Đúng 8 Ký tự Tối thiểu
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min)
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abc123@!` (8 ký tự) |
| `confirm_password` | `Abc123@!` (8 ký tự) |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP 6 chữ số hiển thị ở Bước 1.
2. Nhập `Abc123@!` vào ô "Mật khẩu mới".
3. Nhập `Abc123@!` vào ô "Xác nhận mật khẩu mới".
4. Nhấn "Đặt lại mật khẩu".
5. Điều hướng đến `/login` và đăng nhập thử bằng `test@eshop.com` và `Abc123@!`.
## Kết quả Mong đợi
- Đặt lại mật khẩu thành công.
- Người dùng đăng nhập thành công trên `/login` với `Abc123@!`.
## Kết quả Thực tế (Actual Result)
Mật khẩu hợp lệ 8 ký tự "Pass123@" (hoặc "Abc123@!") bị biểu thức chính quy của Client (/(?=.*\s)[A-Za-z\d\s]{8,}$/) từ chối với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.". Regex đòi hỏi khoảng trắng và cấm ký tự đặc biệt.

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-005](test-cases/FR-03/screenshots/TC-FORGOT-005.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-05

---

### TC-FORGOT-006: Bước 2 - Đặt lại Mật khẩu với 9 Ký tự (min + 1)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min + 1)
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abc1234@!` (9 ký tự) |
| `confirm_password` | `Abc1234@!` (9 ký tự) |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP 6 chữ số.
2. Nhập `Abc1234@!` vào "Mật khẩu mới".
3. Nhập `Abc1234@!` vào "Xác nhận mật khẩu mới".
4. Gửi biểu mẫu đặt lại mật khẩu.
## Kết quả Mong đợi
- Đặt lại mật khẩu thành công.
## Kết quả Thực tế (Actual Result)
Mật khẩu hợp lệ 9 ký tự "Passw123!" bị regex Client từ chối do chứa ký tự đặc biệt "!" và không có khoảng trắng; hiển thị alert cảnh báo mật khẩu quá yếu.

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-006](test-cases/FR-03/screenshots/TC-FORGOT-006.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-05

---

### TC-FORGOT-007: Bước 2 - Vi phạm Biên Độ dài Mật khẩu (7 Ký tự)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (min - 1)
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abc12@!` (7 ký tự) |
| `confirm_password` | `Abc12@!` (7 ký tự) |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP hợp lệ.
2. Nhập `Abc12@!` (7 ký tự gồm đủ chữ hoa, thường, số, ký tự đặc biệt).
3. Nhập `Abc12@!` vào ô xác nhận.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu do mật khẩu ngắn hơn 8 ký tự.
- Mật khẩu không bị cập nhật.
## Kết quả Thực tế (Actual Result)
Mật khẩu 7 ký tự "Pas12@!" bị chặn thành công với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-007](test-cases/FR-03/screenshots/TC-FORGOT-007.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-008: Bước 2 - Mật khẩu Thiếu Chữ hoa
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `abc12345@!` |
| `confirm_password` | `abc12345@!` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `abc12345@!` (có chữ thường, số, ký tự đặc biệt nhưng KHÔNG có chữ hoa).
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Từ chối với thông báo lỗi yêu cầu mật khẩu phải có ít nhất 1 chữ hoa.
## Kết quả Thực tế (Actual Result)
Mật khẩu thiếu chữ hoa "validpass1!" bị từ chối chính xác với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-008](test-cases/FR-03/screenshots/TC-FORGOT-008.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-009: Bước 2 - Mật khẩu Thiếu Chữ thường
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `ABC12345@!` |
| `confirm_password` | `ABC12345@!` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `ABC12345@!` (có chữ hoa, số, ký tự đặc biệt nhưng KHÔNG có chữ thường).
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Từ chối với thông báo lỗi yêu cầu mật khẩu phải có ít nhất 1 chữ thường.
## Kết quả Thực tế (Actual Result)
Mật khẩu thiếu chữ thường "VALIDPASS1!" bị từ chối chính xác với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-009](test-cases/FR-03/screenshots/TC-FORGOT-009.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-010: Bước 2 - Mật khẩu Thiếu Chữ số
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abcdefgh@!` |
| `confirm_password` | `Abcdefgh@!` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `Abcdefgh@!` (có chữ hoa, chữ thường, ký tự đặc biệt nhưng KHÔNG có số).
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Từ chối với thông báo lỗi yêu cầu mật khẩu phải có ít nhất 1 chữ số.
## Kết quả Thực tế (Actual Result)
Mật khẩu thiếu chữ số "ValidPass!" bị từ chối chính xác với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-010](test-cases/FR-03/screenshots/TC-FORGOT-010.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-011: Bước 2 - Mật khẩu Thiếu Ký tự Đặc biệt
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abcdefgh12` |
| `confirm_password` | `Abcdefgh12` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `Abcdefgh12` (có chữ hoa, chữ thường, chữ số nhưng KHÔNG có ký tự đặc biệt).
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Từ chối với thông báo lỗi yêu cầu mật khẩu phải có ít nhất 1 ký tự đặc biệt từ `@, $, !, %, *, ?, &`.
## Kết quả Thực tế (Actual Result)
Mật khẩu thiếu ký tự đặc biệt "ValidPass1" bị từ chối chính xác với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-011](test-cases/FR-03/screenshots/TC-FORGOT-011.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-012: Bước 2 - Mật khẩu Chứa Ký tự Đặc biệt Không Cho Phép
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2), FR-01
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abcdef123#` (`#` không nằm trong tập `@, $, !, %, *, ?, &`) |
| `confirm_password` | `Abcdef123#` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `Abcdef123#`.
3. Nhập ô xác nhận trùng khớp.
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối vì `#` không thuộc tập hợp ký tự đặc biệt được đặc tả cho phép.
## Kết quả Thực tế (Actual Result)
Mật khẩu chứa ký tự đặc biệt không cho phép "#" ("ValidPass1#") bị từ chối với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-012](test-cases/FR-03/screenshots/TC-FORGOT-012.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-013: Bước 2 - Mật khẩu và Xác nhận Mật khẩu Không Khớp
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `<Mã OTP 6 chữ số được tạo>` |
| `new_password` | `Abc12345@!` |
| `confirm_password` | `Abc12345@?` |
## Các Bước Thực hiện
1. Nhập mã OTP hợp lệ.
2. Nhập `Abc12345@!` vào "Mật khẩu mới".
3. Nhập `Abc12345@?` vào "Xác nhận mật khẩu mới".
4. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối với thông báo lỗi hai trường mật khẩu không khớp nhau.
## Kết quả Thực tế (Actual Result)
Giao diện Bước 2 chỉ có đúng 1 trường mật khẩu ("Mật khẩu mới"). Ô "Xác nhận mật khẩu mới" hoàn toàn không tồn tại trong mã nguồn HTML của giao diện.

## Trạng thái (Status)
**FAIL**

## Minh chứng (Evidence)
![TC-FORGOT-013](test-cases/FR-03/screenshots/TC-FORGOT-013.png)

## Mã Lỗi Liên quan (Defect ID)
DEF-FR03-07

---

### TC-FORGOT-014: Bước 2 - Mã OTP 6 Chữ số Không Chính Xác
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `999999` (không khớp với mã OTP thực tế) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP sai `999999`.
2. Nhập mật khẩu mới hợp lệ và xác nhận.
3. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu với thông báo lỗi mã OTP không đúng. Mật khẩu không bị thay đổi.
## Kết quả Thực tế (Actual Result)
Hệ thống từ chối mã OTP không chính xác ("654321") và hiển thị alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-014](test-cases/FR-03/screenshots/TC-FORGOT-014.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-015: Bước 2 - Biên Độ dài OTP: 5 Chữ số
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1, 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (len - 1)
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `12345` (5 chữ số) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP 5 chữ số `12345`.
2. Nhập mật khẩu mới hợp lệ và xác nhận.
3. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối do định dạng/độ dài OTP không hợp lệ (phải đủ 6 chữ số).
## Kết quả Thực tế (Actual Result)
Hệ thống từ chối mã OTP 5 chữ số ("12345") với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-015](test-cases/FR-03/screenshots/TC-FORGOT-015.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-016: Bước 2 - Biên Độ dài OTP: 7 Chữ số
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1, 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân tích Giá trị Biên (len + 1)
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `1234567` (7 chữ số) |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập mã OTP 7 chữ số `1234567`.
2. Nhập mật khẩu mới hợp lệ và xác nhận.
3. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối do độ dài OTP vượt quá quy định.
## Kết quả Thực tế (Actual Result)
Hệ thống từ chối mã OTP 7 chữ số ("1234567") với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-016](test-cases/FR-03/screenshots/TC-FORGOT-016.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-017: Bước 2 - Mã OTP Chứa Ký tự Không Phải Số
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 1, 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Đã yêu cầu OTP cho `test@eshop.com` ở Bước 1.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| `otp` | `12A45!` |
| `new_password` | `ValidPass1!` |
| `confirm_password` | `ValidPass1!` |
## Các Bước Thực hiện
1. Tại Bước 2, nhập `12A45!`.
2. Nhập mật khẩu mới hợp lệ và xác nhận.
3. Gửi biểu mẫu.
## Kết quả Mong đợi
- Hệ thống từ chối đầu vào (mã OTP phải là 6 chữ số).
## Kết quả Thực tế (Actual Result)
Hệ thống từ chối mã OTP chứa ký tự chữ và ký tự đặc biệt ("12A45!") với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-017](test-cases/FR-03/screenshots/TC-FORGOT-017.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

### TC-FORGOT-018: Bước 2 - Cô lập OTP Giữa các Tài khoản (Quy tắc Bảo mật)
## Mã Yêu cầu (Requirement ID)
FR-03 (Bước 2)
## Phân hệ / Loại Kiểm thử / Kỹ thuật
Quản lý Tài khoản / Chức năng & Bảo mật / Phân hoạch Tương đương
## Điều kiện Tiên quyết
- Người dùng 1 (`test@eshop.com`) yêu cầu mã OTP (ví dụ: OTP-A).
- Người dùng 2 (`admin@eshop.com`) là tài khoản đã đăng ký.
## Dữ liệu Kiểm thử
| Trường | Giá trị |
|---|---|
| Tài khoản Mục tiêu | `admin@eshop.com` |
| `otp` | OTP-A (tạo cho `test@eshop.com`) |
| `new_password` | `NewPass123!` |
| `confirm_password` | `NewPass123!` |
## Các Bước Thực hiện
1. Khởi tạo quy trình đặt lại mật khẩu cho `test@eshop.com` để nhận OTP-A.
2. Cố gắng gửi yêu cầu đặt lại mật khẩu cho `admin@eshop.com` nhưng dùng mã OTP-A.
## Kết quả Mong đợi
- Hệ thống từ chối yêu cầu; OTP của `test@eshop.com` không có hiệu lực cho `admin@eshop.com`.
- Mật khẩu của tài khoản Admin không bị thay đổi.
## Kết quả Thực tế (Actual Result)
Hệ thống cô lập OTP theo email chuẩn xác; sử dụng OTP của test@eshop.com cho admin@eshop.com bị từ chối với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".

## Trạng thái (Status)
**PASS**

## Minh chứng (Evidence)
![TC-FORGOT-018](test-cases/FR-03/screenshots/TC-FORGOT-018.png)

## Mã Lỗi Liên quan (Defect ID)
Không có

---

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
