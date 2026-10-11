# Báo cáo Thực thi Phân tích Giá trị Biên (BVA Testing Report) — FR-03: Quên Mật Khẩu & Đặt Lại Mật Khẩu

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-03 (Quên mật khẩu & Đặt lại mật khẩu — 2 bước)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Frontend Web: `http://localhost:5173/forgot-password` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tập trung Phân tích Biên (BVA Focus)**:
  - Biên độ dài mã OTP: 5 chữ số (`len - 1`), 6 chữ số (`at`), 7 chữ số (`len + 1`).
  - Biên độ dài mật khẩu: 7 ký tự (`min - 1`), 8 ký tự (`min`), 9 ký tự (`min + 1`).
  - Biên số lượng các lớp ký tự trong mật khẩu (chữ hoa, chữ thường, số, ký tự đặc biệt).
  - Biên khoảng cách so khớp xác nhận mật khẩu (distance = 0, distance = 1).
  - Biên liên kết OTP - Email (cùng tài khoản vs khác tài khoản).
  - Biên chuyển đổi trạng thái Bước 1 và điều hướng quay lại.

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case BVA (Total BVA Test Cases)** | 21 | 100% |
| **Số Test Case đã thực thi (Executed)** | 21 | 100% |
| **Số Test Case ĐẠT (PASS)** | 11 | 52.38% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 10 | 47.62% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi phần mềm xác minh (Verified Defects)** | 5 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Điểm Biên Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-BVA-OTP-001** | Độ dài OTP dưới biên (len - 1 = 5) | `otp: "12345"` | Từ chối OTP không đủ 6 chữ số | Từ chối OTP 5 chữ số với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". | **PASS** | [TC-BVA-OTP-001.png](test-cases/FR-03/screenshots/TC-BVA-OTP-001.png) | Không có |
| **TC-BVA-OTP-002** | Độ dài OTP tại đúng biên (len = 6) | `otp: <6 chữ số>` | Chấp nhận OTP 6 chữ số hợp lệ | Backend chỉ tạo mã OTP 4 số; nhãn UI ghi "Mã OTP (4 số)"; không hỗ trợ mã 6 chữ số. | **FAIL** | [TC-BVA-OTP-002.png](test-cases/FR-03/screenshots/TC-BVA-OTP-002.png) | DEF-FR03-01 |
| **TC-BVA-OTP-003** | Độ dài OTP trên biên (len + 1 = 7) | `otp: "1234567"` | Từ chối OTP vượt quá 6 chữ số | Từ chối OTP 7 chữ số với alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". | **PASS** | [TC-BVA-OTP-003.png](test-cases/FR-03/screenshots/TC-BVA-OTP-003.png) | Không có |
| **TC-BVA-PW-LEN-001** | Độ dài mật khẩu dưới biên (len - 1 = 7) | `Abc12@!` | Từ chối mật khẩu chưa đủ 8 ký tự | Chặn thành công với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...". | **PASS** | [TC-BVA-PW-LEN-001.png](test-cases/FR-03/screenshots/TC-BVA-PW-LEN-001.png) | Không có |
| **TC-BVA-PW-LEN-002** | Độ dài mật khẩu tại đúng biên (len = 8) | `Pass123@` | Chấp nhận mật khẩu đủ 8 ký tự | Bị Client Regex chặn do có ký tự `@` và thiếu khoảng trắng; alert báo mật khẩu quá yếu. | **FAIL** | [TC-BVA-PW-LEN-002.png](test-cases/FR-03/screenshots/TC-BVA-PW-LEN-002.png) | DEF-FR03-05 |
| **TC-BVA-PW-LEN-003** | Độ dài mật khẩu trên biên (len + 1 = 9) | `Passw123!` | Chấp nhận mật khẩu 9 ký tự hợp lệ | Bị Client Regex chặn do có ký tự `!` và thiếu khoảng trắng; alert báo mật khẩu quá yếu. | **FAIL** | [TC-BVA-PW-LEN-003.png](test-cases/FR-03/screenshots/TC-BVA-PW-LEN-003.png) | DEF-FR03-05 |
| **TC-BVA-COMP-UPPER-001** | Số lượng chữ hoa dưới biên (count = 0) | `pass123@!` | Từ chối mật khẩu thiếu chữ hoa | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-BVA-COMP-UPPER-001.png](test-cases/FR-03/screenshots/TC-BVA-COMP-UPPER-001.png) | Không có |
| **TC-BVA-COMP-UPPER-002** | Số lượng chữ hoa tại biên (count = 1) | `Pass123@!` | Chấp nhận mật khẩu có đúng 1 chữ hoa | Bị Client Regex chặn do chứa ký tự đặc biệt `@!` và thiếu khoảng trắng. | **FAIL** | [TC-BVA-COMP-UPPER-002.png](test-cases/FR-03/screenshots/TC-BVA-COMP-UPPER-002.png) | DEF-FR03-05 |
| **TC-BVA-COMP-LOWER-001** | Số lượng chữ thường dưới biên (count = 0) | `PASS123@!` | Từ chối mật khẩu thiếu chữ thường | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-BVA-COMP-LOWER-001.png](test-cases/FR-03/screenshots/TC-BVA-COMP-LOWER-001.png) | Không có |
| **TC-BVA-COMP-LOWER-002** | Số lượng chữ thường tại biên (count = 1) | `pASS123@!` | Chấp nhận mật khẩu có đúng 1 chữ thường | Bị Client Regex chặn do chứa ký tự đặc biệt `@!` và thiếu khoảng trắng. | **FAIL** | [TC-BVA-COMP-LOWER-002.png](test-cases/FR-03/screenshots/TC-BVA-COMP-LOWER-002.png) | DEF-FR03-05 |
| **TC-BVA-COMP-DIGIT-001** | Số lượng chữ số dưới biên (count = 0) | `PassWord@!` | Từ chối mật khẩu thiếu chữ số | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-BVA-COMP-DIGIT-001.png](test-cases/FR-03/screenshots/TC-BVA-COMP-DIGIT-001.png) | Không có |
| **TC-BVA-COMP-DIGIT-002** | Số lượng chữ số tại biên (count = 1) | `PassWord1@!` | Chấp nhận mật khẩu có đúng 1 chữ số | Bị Client Regex chặn do chứa ký tự đặc biệt `@!` và thiếu khoảng trắng. | **FAIL** | [TC-BVA-COMP-DIGIT-002.png](test-cases/FR-03/screenshots/TC-BVA-COMP-DIGIT-002.png) | DEF-FR03-05 |
| **TC-BVA-COMP-SPEC-001** | Ký tự đặc biệt dưới biên (count = 0) | `Password123` | Từ chối mật khẩu thiếu ký tự đặc biệt | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-BVA-COMP-SPEC-001.png](test-cases/FR-03/screenshots/TC-BVA-COMP-SPEC-001.png) | Không có |
| **TC-BVA-COMP-SPEC-002** | Ký tự đặc biệt tại biên (count = 1 hợp lệ) | `Password123@` | Chấp nhận mật khẩu có 1 ký tự đặc biệt hợp lệ | Bị Client Regex chặn do chứa ký tự `@` và thiếu khoảng trắng. | **FAIL** | [TC-BVA-COMP-SPEC-002.png](test-cases/FR-03/screenshots/TC-BVA-COMP-SPEC-002.png) | DEF-FR03-05 |
| **TC-BVA-MATCH-001** | Khớp xác nhận mật khẩu (distance = 0) | Khớp chính xác hoàn toàn | Đặt lại mật khẩu thành công | Giao diện Bước 2 thiếu ô "Xác nhận mật khẩu mới" trong cấu trúc DOM. | **FAIL** | [TC-BVA-MATCH-001.png](test-cases/FR-03/screenshots/TC-BVA-MATCH-001.png) | DEF-FR03-07 |
| **TC-BVA-MATCH-002** | Lệch xác nhận mật khẩu (distance = 1) | Lệch 1 ký tự | Từ chối do không khớp xác nhận | Giao diện Bước 2 thiếu ô "Xác nhận mật khẩu mới"; không kiểm tra khớp. | **FAIL** | [TC-BVA-MATCH-002.png](test-cases/FR-03/screenshots/TC-BVA-MATCH-002.png) | DEF-FR03-07 |
| **TC-BVA-ASSOC-001** | Khớp liên kết OTP - Email (cùng tài khoản) | OTP của test@ cho test@ | Đặt lại mật khẩu thành công | Đổi mật khẩu thành công khi OTP khớp với email yêu cầu. | **PASS** | [TC-BVA-ASSOC-001.png](test-cases/FR-03/screenshots/TC-BVA-ASSOC-001.png) | Không có |
| **TC-BVA-ASSOC-002** | Lệch liên kết OTP - Email (khác tài khoản) | OTP của test@ cho admin@ | Từ chối OTP chéo tài khoản | Từ chối sử dụng OTP chéo tài khoản với alert: "Mã OTP không đúng...". | **PASS** | [TC-BVA-ASSOC-002.png](test-cases/FR-03/screenshots/TC-BVA-ASSOC-002.png) | Không có |
| **TC-BVA-TRANS-001** | Chuyển đổi trạng thái Bước 1 sang 2 | Nhập email hợp lệ | Chuyển sang Bước 2 kèm chỉ báo "Bước 2 / 2" | Chuyển sang Bước 2 thành công nhưng thiếu chỉ báo bước "Bước 2 / 2". | **FAIL** | [TC-BVA-TRANS-001.png](test-cases/FR-03/screenshots/TC-BVA-TRANS-001.png) | DEF-FR03-01, DEF-FR03-04 |
| **TC-BVA-TRANS-002** | Biên chuyển đổi Bước 1: Email rỗng ("") | Bỏ trống ô email | Chặn submit form | Trình duyệt chặn submit nhờ thuộc tính HTML5 `required`; giữ nguyên Bước 1. | **PASS** | [TC-BVA-TRANS-002.png](test-cases/FR-03/screenshots/TC-BVA-TRANS-002.png) | Không có |
| **TC-BVA-TRANS-003** | Biên điều hướng "Quay lại đăng nhập" | Nhấn "Quay lại đăng nhập" | Chuyển về trang `/login` | Giao diện Bước 1 không có nút hoặc liên kết "Quay lại đăng nhập". | **FAIL** | [TC-BVA-TRANS-003.png](test-cases/FR-03/screenshots/TC-BVA-TRANS-003.png) | DEF-FR03-03 |

---

## 4. Danh mục Lỗi Biên Xác minh (Verified Boundary Defects)

1. **DEF-FR03-01 (Mã OTP 4 số thay vì 6 số)**:
   - Backend `server.js:72` chỉ sinh số ngẫu nhiên 4 chữ số (`Math.floor(1000 + Math.random() * 9000)`). Biên 6 chữ số theo đặc tả bị vi phạm.
2. **DEF-FR03-03 (Thiếu nút Quay lại đăng nhập)**:
   - Biểu mẫu Bước 1 thiếu phần tử điều hướng quay về trang login.
3. **DEF-FR03-04 (Thiếu Chỉ báo bước Bước 1 / 2 và Bước 2 / 2)**:
   - Cả 2 bước đều không hiển thị thông tin chỉ báo tiến trình.
4. **DEF-FR03-05 (Lỗi logic đảo ngược trong Regex mật khẩu)**:
   - Regex `/(?=.*\s)[A-Za-z\d\s]{8,}$/` yêu cầu khoảng trắng và từ chối mọi ký tự đặc biệt, khiến tất cả các giá trị tại biên hợp lệ (8 ký tự, 9 ký tự, 1 ký tự đặc biệt) đều bị đánh trượt.
5. **DEF-FR03-07 (Thiếu trường Xác nhận mật khẩu)**:
   - Thiếu hoàn toàn trường `confirmPassword` trong UI Bước 2, khiến kiểm thử biên khớp xác nhận (distance = 0 vs distance = 1) không thể thực hiện đầy đủ trên giao diện.
