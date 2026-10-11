# Phân tích Lỗ hổng AI cho FR-03: Rà soát Kiểm thử Miền giá trị & Phân tích Giá trị Biên

---

## 1. Tóm tắt Tổng quan (Executive Summary)

Tài liệu này trình bày kết quả rà soát toàn diện các bộ kiểm thử Miền giá trị (Domain Testing) và Phân tích Giá trị Biên (BVA) được thiết kế cho **FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)** trong hệ thống EShop (System Under Test - SUT).

Nội dung rà soát đối chiếu giữa:
1. **Test Oracle**: Đặc tả Yêu cầu Hệ thống (FR-03 và tham chiếu FR-01).
2. **Các Bộ Test Case Đã Thiết kế**: [`domain_testing.md`] và [`bva_testing.md`].
3. **Hiện trạng Cài đặt Thực tế**: Backend API ([`backend/server.js`]) và Frontend Web ([`frontend-web/src/pages/ForgotPassword.jsx`]).

Toàn bộ các test case và lỗ hổng ghi nhận trong tài liệu này đều đã được **thực thi và xác minh trực tiếp trên môi trường đang chạy** (Backend tại `http://127.0.0.1:3000` và kiểm tra mã nguồn Frontend). Không có kết quả giả định hoặc lỗi chưa được xác minh nào được báo cáo.

---

## 2. So sánh Đặc tả Yêu cầu Oracle vs. Hiện trạng Cài đặt Thực tế

| Khía cạnh Tính năng | Đặc tả Yêu cầu (FR-03 và tham chiếu FR-01) | Cài đặt Thực tế (Mã nguồn) | Trạng thái Tuân thủ |
|---|---|---|---|
| **Định dạng & Độ dài OTP** | 6 chữ số ngẫu nhiên (`000000`–`999999`) | Backend tạo 4 chữ số qua `Math.floor(1000 + Math.random() * 9000)` (`server.js:72`). Frontend ghi nhãn rõ ràng: `Mã OTP (4 số)` (`ForgotPassword.jsx:69`). | **Không tuân thủ (Lỗi)** |
| **Hiển thị OTP ở Môi trường Demo** | Hiển thị mã OTP trực tiếp trên màn hình | Frontend hiển thị thông báo `Mã OTP của bạn là: ${res.data.resetToken}` ở banner Bước 2 (`ForgotPassword.jsx:17, 66`). | **Tuân thủ** |
| **Chỉ báo Bước (Step Indicator)** | Phải hiển thị chỉ báo bước (ví dụ: "Bước 1 / 2") | Không có thành phần hay văn bản chỉ báo bước nào ở cả Bước 1 và Bước 2. | **Không tuân thủ (Lỗi)** |
| **Điều hướng ở Bước 1** | Có nút "Quay lại đăng nhập" | Biểu mẫu Bước 1 chỉ có trường nhập email và nút gửi; hoàn toàn không có nút "Quay lại đăng nhập" (`ForgotPassword.jsx:45-60`). | **Không tuân thủ (Lỗi)** |
| **Xác thực Trường Email** | Phải dùng `type="email"` có validate HTML5 (theo FR-02/FR-01) | Ô nhập email ở Bước 1 sử dụng `type="text"` (`ForgotPassword.jsx:50`). | **Không tuân thủ (Lỗi)** |
| **Xác nhận Mật khẩu** | Phải có "Xác nhận mật khẩu mới" và từ chối nếu không khớp | Biểu mẫu Bước 2 hoàn toàn không có ô nhập xác nhận mật khẩu (`ForgotPassword.jsx:63-97`). Backend `/api/reset-password` bỏ qua trường xác nhận. | **Không tuân thủ (Lỗi)** |
| **Độ mạnh Mật khẩu (Frontend)** | Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt (`@$!%*?&`) | Regex bị sai logic: `/(?=.*\s)[A-Za-z\d\s]{8,}$/`. Regex này bắt buộc phải có khoảng trắng (`\s`) và từ chối toàn bộ ký tự đặc biệt (`@`, `!`,...) (`ForgotPassword.jsx:26`). | **Không tuân thủ (Lỗi)** |
| **Độ mạnh Mật khẩu (Backend)** | Mật khẩu mới phải tuân thủ điều kiện mạnh | Backend `/api/reset-password` **hoàn toàn không xác thực**; chấp nhận bất kỳ chuỗi nào (ví dụ: `"weak"`) và lưu thẳng vào cơ sở dữ liệu (`server.js:88-98`). | **Không tuân thủ (Lỗi)** |
| **Liên kết OTP - Email** | OTP chỉ hợp lệ cho chính email đã yêu cầu | Backend kiểm tra `WHERE email = ? AND reset_token = ?` (`server.js:90`). Từ chối việc dùng OTP chéo email. | **Tuân thủ** |
| **Tính Dùng một lần của OTP** | OTP phải bị hủy sau khi sử dụng thành công | Backend đặt `reset_token = NULL` sau khi đặt lại mật khẩu thành công (`server.js:90`). Dùng lại mã cũ trả về lỗi 400. | **Tuân thủ** |

---

## 3. Phân tích các Lỗ hổng AI (Lý do AI Bỏ sót Từng Trường hợp)

### Nhóm 1: Lỗ hổng Kiến trúc Xác thực Mật khẩu & Cô lập Tầng (Password Validation Architecture & Tier Isolation Gaps)
- **Điểm Bị Bỏ sót**:
  - Kiểm thử trực tiếp tầng Backend API bỏ qua tầng giao diện người dùng (ví dụ: gửi mật khẩu rỗng `""` hoặc mật khẩu ngắn `"a"` trực tiếp đến `POST /api/reset-password`).
  - Lỗi biểu thức chính quy (regex) ở frontend: AI thiết kế test case kỳ vọng mật khẩu hợp lệ như `Abc123@!` sẽ được chấp nhận và mật khẩu có khoảng trắng sẽ bị từ chối. Trên thực tế, regex của hệ thống đã đảo ngược hoàn toàn logic này do có `(?=.*\s)`.
- **Lý do AI Bỏ sót**:
  1. *Giả định Đồng bộ Đa tầng (Assumption of Tier Symmetry)*: AI ngầm giả định rằng quy tắc xác thực của client và server được đồng bộ hóa hoặc dùng chung một bộ validator.
  2. *Chủ nghĩa Hoàn hảo theo Đặc tả (Specification Idealism)*: AI suy diễn kiểm thử dựa trên đặc tả thuần túy (test oracle) và cho rằng hệ thống sẽ kiểm tra ký tự đặc biệt, không ngờ rằng lập trình viên lại cài đặt regex lỗi yêu cầu khoảng trắng thay cho ký tự đặc biệt.

### Nhóm 2: Thiếu các Phần tử UI trong DOM Biểu mẫu (Missing UI Elements in Form DOM)
- **Điểm Bị Bỏ sót**:
  - Không có bước kiểm tra sự tồn tại trong cấu trúc DOM của trường xác nhận mật khẩu (`confirmPassword`).
  - Không có bước kiểm tra sự tồn tại trong DOM của nút "Quay lại đăng nhập" ở Bước 1 và thành phần Chỉ báo bước ("Bước 1 / 2").
  - Không kiểm tra thuộc tính thẻ (`type="email"` vs `type="text"`).
- **Lý do AI Bỏ sót**:
  1. *Tập trung vào Biến Dữ liệu thay vì Cấu trúc*: Trong kiểm thử hộp đen, AI tập trung vào các *biến đầu vào* (`confirm_password`, `email`) thay vì kiểm tra xem UI có render các thẻ input đó hay không.
  2. *Tiền điều kiện Lạc quan (Optimistic Preconditions)*: AI viết các bước kiểm thử kiểu *"Nhập Abc123@! vào ô 'Xác nhận mật khẩu mới'"* vì mặc định tin rằng giao diện đã cung cấp đầy đủ các trường theo đặc tả.

### Nhóm 3: Lỗ hổng về Độ dài và Định dạng Biểu diễn OTP (OTP Length and Representation Gaps)
- **Điểm Bị Bỏ sót**:
  - Thiếu test case so sánh trực tiếp token 4 chữ số thực tế do backend tạo ra so với yêu cầu 6 chữ số của đặc tả.
  - Xử lý số 0 ở đầu: kiểm thử xem mã OTP như `012345` có bị cơ sở dữ liệu coi là số nguyên và cắt mất số 0 thành `12345` hay không.
  - Gửi dữ liệu kiểu số thay vì chuỗi trong JSON (ví dụ: `{"resetToken": 1234}` so với `"1234"`).
- **Lý do AI Bỏ sót**:
  1. *Ràng buộc Tuyệt đối theo Oracle*: AI chỉ tập trung kiểm tra các biên xung quanh số 6 (`5`, `6`, `7` chữ số). Do đặc tả không hề nhắc đến số 4, AI chỉ xếp 4 chữ số vào lớp phân hoạch không hợp lệ chung `< 6` mà không phát hiện ra rằng hàm sinh mã thực tế chỉ tạo ra 4 chữ số.

### Nhóm 4: Lỗ hổng Vòng đời Trạng thái và Đồng thời Đa tầng (Cross-Tier Concurrency and State Lifecycle Gaps)
- **Điểm Bị Bỏ sót**:
  - Yêu cầu lấy OTP nhiều lần liên tiếp ở Bước 1 (hệ thống ghi đè `reset_token` hay tồn tại song song nhiều token hợp lệ?).
  - Tính phân biệt chữ hoa/thường của email khi đặt lại mật khẩu (ví dụ: yêu cầu OTP cho `Test@eshop.com` và đặt lại bằng `test@eshop.com`).
  - Hết hạn phiên / thời gian sống của OTP (kiểm thử hết hạn sau 5, 10 hoặc 30 phút).
- **Lý do AI Bỏ sót**:
  1. *Đặc tả Thiếu Thông tin*: Đặc tả không nêu rõ thời gian timeout hay cơ chế xử lý đồng thời. Tuân theo nguyên tắc *"Không tự ý bịa ra các giới hạn, ngưỡng, timeout chưa được quy định"*, AI đã không tạo ra ngưỡng giả định nhưng đồng thời cũng quên ghi nhận việc thiếu chính sách hết hạn là một rủi ro an ninh.

---

## 4. Bảng Kết quả Thực thi Kiểm thử Thực tế (Live Execution Results Table)

Các test case từ [`domain_testing.md`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/test-cases/FR-03/domain_testing.md), [`bva_testing.md`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/test-cases/FR-03/bva_testing.md) và các kịch bản phát hiện lỗ hổng đã được thực thi trực tiếp trên hệ thống đang chạy.

| Mã Kiểm thử (Test ID) | Kịch bản Kiểm thử | Dữ liệu Đầu vào / Thao tác | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Ghi nhận) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-FORGOT-001** | Bước 1: Yêu cầu OTP với email hợp lệ | `email: "test@eshop.com"` | Trả về 200; tạo mã OTP 6 chữ số hiển thị trên màn hình | HTTP 200; trả về mã OTP 4 chữ số (`5386`) | **FAIL** | Payload API: `{"message":"Mã đặt lại mật khẩu đã được tạo","resetToken":"5386"}` | **DEF-FR03-01** |
| **TC-FORGOT-002** | Bước 1: Yêu cầu OTP với email chưa đăng ký | `email: "unregistered@eshop.com"` | Trả về 404 / Báo lỗi; không sinh mã OTP | HTTP 404 `{ error: "User not found" }` | **PASS** | Xác minh qua API probe | Không có |
| **TC-FORGOT-003** | Bước 1: Kiểm tra định dạng HTML5 của email | `email: "invalid-email-format"` | Form chặn gửi; yêu cầu đúng cú pháp email | Input là `type="text"`; API trả về 404 | **FAIL** | HTML: `<input type="text" ... />` không có validate HTML5 | **DEF-FR03-02** |
| **TC-FORGOT-004** | Bước 1: Điều hướng "Quay lại đăng nhập" | Nhấn nút "Quay lại đăng nhập" | Chuyển hướng về `/login` | Nút không hề tồn tại trong DOM Bước 1 | **FAIL** | Kiểm tra `ForgotPassword.jsx:45-60`; không có nút quay lại | **DEF-FR03-03** |
| **TC-UI-IND-001** | Bước 1 & 2: Hiển thị Chỉ báo bước | Xem giao diện Bước 1 và Bước 2 | Hiển thị "Bước 1 / 2" / "Step 1/2" | Không có chỉ báo bước nào được render | **FAIL** | Kiểm tra `ForgotPassword.jsx`; không có văn bản chỉ báo bước | **DEF-FR03-04** |
| **TC-BVA-OTP-002** | Bước 2: Chấp nhận OTP đúng 6 chữ số | Nhập mã OTP 6 chữ số | Hệ thống chấp nhận mã 6 chữ số | Backend chỉ tạo và nhận mã 4 số; UI ghi nhãn `Mã OTP (4 số)` | **FAIL** | Nhãn: `Mã OTP (4 số)`; `server.js:72` chỉ tạo 4 số ngẫu nhiên | **DEF-FR03-01** |
| **TC-BVA-OTP-004** | Bước 2: Từ chối mã OTP không đúng | `otp: "999999"`, `email: "admin@eshop.com"` | Báo lỗi; mật khẩu không thay đổi | HTTP 400 `{ error: "Invalid token or email" }` | **PASS** | API trả về HTTP 400 | Không có |
| **TC-BVA-PW-LEN-002** | Bước 2: Nhập mật khẩu 8 ký tự hợp lệ qua UI | `new_password: "Abc123@!"` | Đặt lại mật khẩu thành công | Cảnh báo: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* | **FAIL** | Regex `/(?=.*\s)[A-Za-z\d\s]{8,}$/` từ chối ký tự đặc biệt | **DEF-FR03-05** |
| **TC-GAP-PW-SPACE** | Bước 2: Nhập mật khẩu có khoảng trắng qua UI | `new_password: "Abc 1234"` | Từ chối vì khoảng trắng không nằm trong `{@,$,!,%,*,?,&}` | Regex của client chấp nhận `Abc 1234` là mật khẩu mạnh! | **FAIL** | `regex.test("Abc 1234") === true` | **DEF-FR03-05** |
| **TC-GAP-API-PW** | Bước 2: Gửi mật khẩu yếu trực tiếp đến API | `newPassword: "weak"`, token hợp lệ | Backend từ chối mật khẩu không đủ độ mạnh | Backend trả về HTTP 200; đổi thành công mật khẩu thành `"weak"`! | **FAIL** | Đăng nhập bằng `"weak"` thành công: HTTP 200 `{ message: "Login successful" }` | **DEF-FR03-06** |
| **TC-FORGOT-013** | Bước 2: Kiểm tra lệch Xác nhận mật khẩu | Gửi `newPassword` khác `confirmPassword` | Từ chối do không khớp | Trường không có trên UI; API không nhận hay kiểm tra xác nhận | **FAIL** | `ForgotPassword.jsx:63-97` thiếu ô xác nhận; `server.js:88` không có param | **DEF-FR03-07** |
| **TC-BVA-ASSOC-002** | Bước 2: Dùng mã OTP chéo tài khoản | Email B dùng OTP tạo cho Email A | Bị từ chối; tài khoản B không đổi mật khẩu | HTTP 400 `{ error: "Invalid token or email" }` | **PASS** | Câu lệnh SQL `WHERE email = ? AND reset_token = ?` cô lập tài khoản chuẩn | Không có |
| **TC-GAP-OTP-REUSE** | Bước 2: Tấn công phát lại / Dùng lại OTP | Gửi lại OTP đã dùng đặt lại lần 2 | Từ chối mã đã sử dụng | HTTP 400 `{ error: "Invalid token or email" }` | **PASS** | Backend đặt `reset_token = NULL` sau lần đặt lại đầu tiên | Không có |

---

## 5. Danh mục Lỗi Phần mềm (Defect Catalog)

### DEF-FR03-01: Backend tạo mã OTP 4 chữ số thay vì 6 chữ số; UI ghi nhãn gây hiểu lầm
- **Mức độ Nghiêm trọng**: Cao (Chức năng / Vi phạm Đặc tả Yêu cầu)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 1: *"Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên"*.
- **Hành vi Ghi nhận**:
  - [`backend/server.js:72`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L72): `const resetToken = Math.floor(1000 + Math.random() * 9000).toString();` tạo số ngẫu nhiên trong khoảng 1000–9999 (chỉ 4 chữ số).
  - [`frontend-web/src/pages/ForgotPassword.jsx:69`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/frontend-web/src/pages/ForgotPassword.jsx#L69): Nhãn hướng dẫn hiển thị `Mã OTP (4 số)`.
- **Hệ quả**: Độ phức tạp không gian mã (entropy) thấp hơn rất nhiều so với đặc tả (chỉ 9.000 khả năng thay vì 900.000 khả năng), tạo nguy cơ bị tấn công dò quét (brute-force).

### DEF-FR03-02: Trường email sử dụng `type="text"` thay vì `type="email"`
- **Mức độ Nghiêm trọng**: Trung bình (Xác thực / Vi phạm Đặc tả)
- **Đặc tả Yêu cầu Oracle**: FR-02/FR-01: *"Trường email phải dùng type="email" (có validate HTML5 format)"*.
- **Hành vi Ghi nhận**:
  - [`frontend-web/src/pages/ForgotPassword.jsx:50`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/frontend-web/src/pages/ForgotPassword.jsx#L50): `<input type="text" ... />`.
- **Hệ quả**: Trình duyệt không kích hoạt kiểm tra tính hợp lệ của định dạng email trước khi gửi form.

### DEF-FR03-03: Thiếu nút "Quay lại đăng nhập" ở Bước 1
- **Mức độ Nghiêm trọng**: Thấp (Giao diện / Điều hướng)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 1: *"Có nút Quay lại đăng nhập"*.
- **Hành vi Ghi nhận**:
  - Giao diện Bước 1 chỉ có duy nhất nút gửi (`Lấy mã OTP`). Không có bất kỳ nút hay liên kết nào để quay lại trang `/login`.
- **Hệ quả**: Người dùng không có lối thoát trực tiếp trên giao diện để quay về trang đăng nhập.

### DEF-FR03-04: Thiếu Chỉ báo bước ("Bước 1 / 2")
- **Mức độ Nghiêm trọng**: Thấp (Giao diện / Trải nghiệm Người dùng)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 1: *"Giao diện phải hiển thị chỉ báo bước (Step Indicator) — ví dụ: "Bước 1 / 2""*.
- **Hành vi Ghi nhận**:
  - Cả Bước 1 và Bước 2 đều không có chỉ báo bước nào được hiển thị.
- **Hệ quả**: Người dùng không nắm được tiến trình thực hiện của quy trình nhiều bước.

### DEF-FR03-05: Regex kiểm tra mật khẩu phía client bị lỗi logic: bắt buộc khoảng trắng thay vì ký tự đặc biệt
- **Mức độ Nghiêm trọng**: Cao (Chức năng / Lỗi Logic)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 2 / FR-01: *"Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &)"*.
- **Hành vi Ghi nhận**:
  - [`frontend-web/src/pages/ForgotPassword.jsx:26`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/frontend-web/src/pages/ForgotPassword.jsx#L26):
    ```javascript
    const flawedStrongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/;
    ```
  - Mật khẩu hợp lệ theo đúng đặc tả (ví dụ: `Abc123@!`) **bị từ chối**.
  - Mật khẩu không hợp lệ chứa khoảng trắng (ví dụ: `Abc 1234`) **được chấp nhận**.
- **Hệ quả**: Người dùng không thể đặt lại mật khẩu theo đúng định dạng mạnh mà hệ thống quy định.

### DEF-FR03-06: Backend API hoàn toàn không xác thực độ phức tạp của mật khẩu
- **Mức độ Nghiêm trọng**: Nghiêm trọng (Bảo mật / Logic Nghiệp vụ)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 2: *"Mật khẩu mới phải tuân thủ điều kiện như FR-01"*.
- **Hành vi Ghi nhận**:
  - [`backend/server.js:88-98`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L88-L98) cập nhật trực tiếp chuỗi `newPassword` vào cơ sở dữ liệu mà không kiểm tra bất kỳ điều kiện nào về độ dài hay độ phức tạp.
  - Gửi `newPassword: "weak"` thành công với mã HTTP 200, mật khẩu mới được cập nhật thành `"weak"`.
- **Hệ quả**: Kẻ tấn công hoặc client bên ngoài có thể vượt qua kiểm tra của frontend để đặt các mật khẩu yếu, dễ đoán.

### DEF-FR03-07: Thiếu trường nhập và logic kiểm tra "Xác nhận mật khẩu mới"
- **Mức độ Nghiêm trọng**: Cao (Giao diện & Chức năng / Vi phạm Đặc tả)
- **Đặc tả Yêu cầu Oracle**: FR-03 Bước 2: *"Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới. Hai trường mật khẩu phải khớp nhau."*
- **Hành vi Ghi nhận**:
  - Trong [`frontend-web/src/pages/ForgotPassword.jsx:63-97`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/frontend-web/src/pages/ForgotPassword.jsx#L63-L97), chỉ có ô `resetToken` và `newPassword`.
  - Trong [`backend/server.js:88-98`](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L88-L98), API không nhận và không kiểm tra trường xác nhận.
- **Hệ quả**: Người dùng không có cơ chế đối chiếu để tránh lỗi gõ nhầm khi nhập mật khẩu mới.

---

## 6. Khuyến nghị Nhằm Ngăn ngừa Lỗ hổng Kiểm thử AI (Recommendations to Prevent AI Testing Gaps)

1. **Áp dụng Thiết kế Kiểm thử Đa tầng (Dual-Tier Test Design)**:
   - Đối với mỗi ràng buộc đầu vào, luôn sinh test case cho cả **tầng giao diện UI** và **tầng trực tiếp API**. Không bao giờ mặc định rằng client và server chia sẻ cùng một cơ chế xác thực.
2. **Bổ sung các Test Case Kiểm tra Cấu trúc DOM**:
   - Trước khi thử nghiệm các tổ hợp dữ liệu, cần có các test case kiểm tra sự hiện diện, loại thẻ và thuộc tính của các phần tử bắt buộc (`input[type="email"]`, `Chỉ báo bước`, `confirmPassword`).
3. **Đối chiếu Trực tiếp Mã nguồn Thực tế khi Thiết kế Test Case**:
   - Dù tài liệu đặc tả luôn là oracle cho *kết quả mong đợi*, việc xem xét mã nguồn thực tế (như regex, tham số endpoint) trong quá trình thiết kế test case sẽ giúp phát hiện ngay các "bẫy" cài đặt (ví dụ: `\s` thay vì ký tự đặc biệt) mà mô hình phân hoạch lý thuyết thuần túy dễ bỏ sót.
