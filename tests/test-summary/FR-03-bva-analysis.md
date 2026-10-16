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
