# Báo cáo Thực thi Kiểm thử Miền giá trị (Domain Testing Report) — FR-03: Quên Mật Khẩu & Đặt Lại Mật Khẩu

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-03 (Quên mật khẩu & Đặt lại mật khẩu — 2 bước)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Frontend Web: `http://localhost:5173/forgot-password` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tài khoản Kiểm thử**: `test@eshop.com` / `Test1234!` (User), `admin@eshop.com` / `Admin123!` (Admin)

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case thiết kế (Total Test Cases)** | 18 | 100% |
| **Số Test Case đã thực thi (Executed)** | 18 | 100% |
| **Số Test Case ĐẠT (PASS)** | 12 | 66.67% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 6 | 33.33% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi phần mềm xác minh (Verified Defects)** | 6 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Kịch bản Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-FORGOT-001** | Bước 1: Yêu cầu OTP với email hợp lệ | `email: "test@eshop.com"` | Sinh OTP 6 chữ số; hiển thị demo; chỉ báo bước "Bước 1 / 2"; nút "Quay lại đăng nhập" | OTP sinh ra có 4 chữ số (`5984`). Không có chỉ báo bước. Nhãn ghi "Mã OTP (4 số)". | **FAIL** | [TC-FORGOT-001.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-001.png) | DEF-FR03-01, DEF-FR03-04 |
| **TC-FORGOT-002** | Bước 1: Yêu cầu OTP với email chưa đăng ký | `email: "notfound@eshop.com"` | Báo lỗi email không tồn tại; không chuyển Bước 2 | Hệ thống hiển thị alert: "Lỗi: User not found". Giữ nguyên ở Bước 1. | **PASS** | [TC-FORGOT-002.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-002.png) | Không có |
| **TC-FORGOT-003** | Bước 1: Yêu cầu OTP với email sai cú pháp | `email: "testeshop.com"` | Trình duyệt kích hoạt validate HTML5 và chặn gửi form | Input là `type="text"`; form không chặn HTML5; gửi request và nhận alert: "Lỗi: User not found" | **FAIL** | [TC-FORGOT-003.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-003.png) | DEF-FR03-02 |
| **TC-FORGOT-004** | Bước 1: Điều hướng "Quay lại đăng nhập" | Nhấn nút "Quay lại đăng nhập" | Chuyển hướng người dùng về trang `/login` | Bước 1 không có nút hoặc liên kết "Quay lại đăng nhập" trong form. | **FAIL** | [TC-FORGOT-004.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-004.png) | DEF-FR03-03 |
| **TC-FORGOT-005** | Bước 2: Đặt lại MK với đúng 8 ký tự tối thiểu | `Pass123@` | Đặt lại mật khẩu thành công | Bị Client Regex chặn với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | **FAIL** | [TC-FORGOT-005.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-005.png) | DEF-FR03-05 |
| **TC-FORGOT-006** | Bước 2: Đặt lại MK với 9 ký tự (min + 1) | `Passw123!` | Đặt lại mật khẩu thành công | Bị Client Regex chặn với alert: "Mật khẩu quá yếu!...". Regex cấm ký tự đặc biệt `!`. | **FAIL** | [TC-FORGOT-006.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-006.png) | DEF-FR03-05 |
| **TC-FORGOT-007** | Bước 2: Mật khẩu dưới 8 ký tự (7 ký tự) | `Pas12@!` | Báo lỗi mật khẩu quá yếu; không đổi MK | Hệ thống chặn thành công với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự...". | **PASS** | [TC-FORGOT-007.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-007.png) | Không có |
| **TC-FORGOT-008** | Bước 2: Mật khẩu thiếu chữ hoa | `validpass1!` | Báo lỗi thiếu chữ hoa | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-FORGOT-008.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-008.png) | Không có |
| **TC-FORGOT-009** | Bước 2: Mật khẩu thiếu chữ thường | `VALIDPASS1!` | Báo lỗi thiếu chữ thường | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-FORGOT-009.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-009.png) | Không có |
| **TC-FORGOT-010** | Bước 2: Mật khẩu thiếu chữ số | `ValidPass!` | Báo lỗi thiếu chữ số | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-FORGOT-010.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-010.png) | Không có |
| **TC-FORGOT-011** | Bước 2: Mật khẩu thiếu ký tự đặc biệt | `ValidPass1` | Báo lỗi thiếu ký tự đặc biệt | Từ chối chính xác với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-FORGOT-011.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-011.png) | Không có |
| **TC-FORGOT-012** | Bước 2: Ký tự đặc biệt không thuộc tập cho phép | `ValidPass1#` | Báo lỗi ký tự đặc biệt không hợp lệ | Từ chối với alert: "Mật khẩu quá yếu!...". | **PASS** | [TC-FORGOT-012.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-012.png) | Không có |
| **TC-FORGOT-013** | Bước 2: Xác nhận mật khẩu không khớp | `new: Abc123@!`, `confirm: Other123@!` | Từ chối đổi mật khẩu do không khớp | Bước 2 hoàn toàn không có trường "Xác nhận mật khẩu mới" trong giao diện. | **FAIL** | [TC-FORGOT-013.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-013.png) | DEF-FR03-07 |
| **TC-FORGOT-014** | Bước 2: Nhập OTP sai giá trị | `otp: "654321"` | Từ chối cập nhật mật khẩu | Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". Mật khẩu giữ nguyên. | **PASS** | [TC-FORGOT-014.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-014.png) | Không có |
| **TC-FORGOT-015** | Bước 2: Mã OTP 5 chữ số (< 6) | `otp: "12345"` | Từ chối OTP không hợp lệ | Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". | **PASS** | [TC-FORGOT-015.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-015.png) | Không có |
| **TC-FORGOT-016** | Bước 2: Mã OTP 7 chữ số (> 6) | `otp: "1234567"` | Từ chối OTP không hợp lệ | Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". | **PASS** | [TC-FORGOT-016.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-016.png) | Không có |
| **TC-FORGOT-017** | Bước 2: Mã OTP chứa chữ cái và ký tự đặc biệt | `otp: "12A45!"` | Từ chối OTP không phải số | Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". | **PASS** | [TC-FORGOT-017.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-017.png) | Không có |
| **TC-FORGOT-018** | Bước 2: Dùng OTP chéo tài khoản | Dùng OTP của User A cho User B | Từ chối OTP không thuộc về tài khoản | Alert: "Mã OTP không đúng hoặc có lỗi xảy ra.". Cô lập tài khoản chuẩn xác. | **PASS** | [TC-FORGOT-018.png](../../../tests/test-cases/password-reset-web/screenshots/TC-FORGOT-018.png) | Không có |

---

## 4. Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR03-01: Sinh mã OTP 4 chữ số thay vì 6 chữ số theo đặc tả
- **Mức độ Nghiêm trọng**: Cao (Functional Defect)
- **Vị trí**: `backend/server.js:72`, `frontend-web/src/pages/ForgotPassword.jsx:69`
- **Mô tả**: Hàm `Math.floor(1000 + Math.random() * 9000)` chỉ sinh mã 4 chữ số. Nhãn UI hiển thị `Mã OTP (4 số)`.

- **GitHub Issue:** [#7](https://github.com/Taylor3691/eshop-sut/issues/7).
### DEF-FR03-02: Trường email Bước 1 không có validate HTML5
- **Mức độ Nghiêm trọng**: Trung bình (UI/Form Validation)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:50`
- **Mô tả**: Ô nhập email sử dụng `type="text"` thay vì `type="email"`, cho phép gửi email sai cú pháp lên server.

- **Manual review:** The requirement does not explicitly require HTML5 input validation/type=email; review TC-FORGOT-003 before treating it as a defect.
### DEF-FR03-03: Thiếu nút "Quay lại đăng nhập" tại Bước 1
- **Mức độ Nghiêm trọng**: Trung bình (Navigation Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:45-60`
- **Mô tả**: Biểu mẫu Bước 1 hoàn toàn không có nút điều hướng quay về `/login`.

- **GitHub Issue:** [#14](https://github.com/Taylor3691/eshop-sut/issues/14).
### DEF-FR03-04: Thiếu Chỉ báo bước (Step Indicator)
- **Mức độ Nghiêm trọng**: Thấp (GUI Specification Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx`
- **Mô tả**: Cả Bước 1 và Bước 2 không hiển thị chỉ báo bước ("Bước 1 / 2", "Bước 2 / 2").

- **GitHub Issue:** [#13](https://github.com/Taylor3691/eshop-sut/issues/13).
### DEF-FR03-05: Biểu thức chính quy (Regex) mật khẩu phía Client bị lỗi logic đảo ngược
- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical / Blocker)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:26`
- **Mô tả**: Regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/` bắt buộc phải có khoảng trắng `\s` và từ chối toàn bộ ký tự đặc biệt (`@$!%*?&`). Mật khẩu hợp lệ theo đặc tả đều bị chặn.

- **GitHub Issue:** [#15](https://github.com/Taylor3691/eshop-sut/issues/15).
### DEF-FR03-07: Thiếu trường "Xác nhận mật khẩu mới" tại Bước 2
- **Mức độ Nghiêm trọng**: Cao (Specification Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:63-97`, `backend/server.js:88-98`
- **Mô tả**: Giao diện và API đều không có trường `confirmPassword`, bỏ qua việc xác nhận khớp mật khẩu.

- **GitHub Issue:** [#16](https://github.com/Taylor3691/eshop-sut/issues/16).

## Additional AI-gap cases requiring manual review

- TC-GAP-API-PW: backend accepted a weak password in a reported API probe, but no matching screenshot evidence was found.
