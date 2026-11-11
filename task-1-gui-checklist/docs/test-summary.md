# Test Summary - EShop GUI Checklist Execution

Báo cáo tổng kết kết quả thực thi GUI Checklist cho các màn hình Login, Register và Forgot Password của hệ thống EShop SUT.

## 1. Tổng quan kết quả (Execution Overview)

- **Tổng số checklist items (Total items):** `92`
- **Số item đã thiết kế (Items designed):** `92`
- **Số item đã thực thi (Items executed):** `92` (Tỷ lệ hoàn thành: 100%)
- **Số item Đạt (Passed items):** `59` (Tỷ lệ: 64.13%)
- **Số item Không đạt (Failed items):** `33` (Tỷ lệ: 35.87%)
- **Số item Chưa thực thi (Not executed items):** `0` (0%)
- **Số lỗi đã xác minh (Verified bugs):** `19` lỗi riêng biệt (được phân loại và lập biên bản đầy đủ)
- **Tổng số bằng chứng (Screenshots captured):** `33` ảnh chụp màn hình thực tế (100% Failed items đều có minh chứng tại `evidence/failed-items/`)

---

## 2. Kết quả theo Khía cạnh Giao diện (Results by IA Aspect)

| IA Aspect | Tổng số | Đạt (Passed) | Không đạt (Failed) | Chưa chạy (Not Executed) | Tỷ lệ Đạt (%) |
|---|---:|---:|---:|---:|---:|
| **IA-01 Tiêu chuẩn UI chung (General UI Standards)** | 31 | 23 | 8 | 0 | 74.19% |
| **IA-02 Biểu mẫu (Forms)** | 27 | 10 | 17 | 0 | 37.04% |
| **IA-03 Điều hướng (Navigation)** | 13 | 10 | 3 | 0 | 76.92% |
| **IA-04 Phản hồi / Trạng thái (Feedback / State)** | 21 | 16 | 5 | 0 | 76.19% |
| **Tổng cộng** | **92** | **59** | **33** | **0** | **64.13%** |

---

## 3. Kết quả theo Màn hình (Results by Screen)

| Màn hình (Screen) | Tổng số | Đạt (Passed) | Không đạt (Failed) | Chưa chạy (Not Executed) | Tỷ lệ Đạt (%) |
|---|---:|---:|---:|---:|---:|
| **Login (`/login`)** | 26 | 16 | 10 | 0 | 61.54% |
| **Register (`/register`)** | 27 | 19 | 8 | 0 | 70.37% |
| **Forgot Password (`/forgot-password`)** | 32 | 19 | 13 | 0 | 59.38% |
| **Dùng chung (Shared Across Scoped Screens)** | 7 | 5 | 2 | 0 | 71.43% |
| **Tổng cộng** | **92** | **59** | **33** | **0** | **64.13%** |

---

## 4. Đánh giá chất lượng và Phát hiện chính (Key Findings)

### 4.1. Điểm mạnh của ứng dụng
1. **Khả năng hiển thị Responsive tốt:** Cả 3 màn hình đều co giãn mượt mà trên viewport di động (375x667) và thích ứng tốt khi phóng to văn bản lên 200% mà không bị vỡ layout hay che khuất nội dung.
2. **Khả năng thao tác bằng bàn phím cơ bản:** Người dùng có thể duyệt qua hầu hết các thành phần bằng phím Tab và kích hoạt nút/liên kết bằng Enter.
3. **Phản hồi người dùng khi thành công:** Luồng đăng nhập và đăng ký thành công chuyển hướng mượt mà; luồng Forgot Password ở Bước 1 hiển thị mã OTP trực tiếp trên màn hình demo rõ ràng.

### 4.2. Các sai lệch và khiếm khuyết nghiêm trọng (Critical Defects)
1. **Lỗ hổng bảo mật giao diện:** Trường mật khẩu trên trang Login sử dụng `type="text"`, làm lộ mật khẩu dạng văn bản rõ ngay khi người dùng nhập liệu (vi phạm SEC-01 và FR-22).
2. **Sai logic kiểm tra mật khẩu mạnh:** Biểu thức chính quy (Regex) trên trang Đăng ký bắt buộc phải có khoảng trắng và từ chối các ký tự đặc biệt hợp lệ (`@$!%*?&`), khiến người dùng không thể đăng ký bằng mật khẩu mạnh đạt chuẩn FR-01.
3. **Thiếu trường dữ liệu cốt lõi:** Cả form Đăng ký và Bước 2 của Quên Mật Khẩu đều hoàn toàn thiếu trường "Xác nhận mật khẩu" để kiểm tra tính trùng khớp (vi phạm FR-01 và FR-03).
4. **Mã OTP sai quy cách:** Backend chỉ sinh mã OTP gồm 4 chữ số thay vì 6 chữ số ngẫu nhiên theo FR-03 và SEC-07.
5. **Thiếu tính năng điều hướng:** Màn hình Quên Mật Khẩu không có nút hoặc liên kết để "Quay lại đăng nhập" theo FR-03.
6. **Vi phạm quy chuẩn giao diện chung:** Thiếu thẻ `<h1>` trên toàn bộ các màn hình, thiếu dấu sao `*` đánh dấu trường bắt buộc, nút đăng ký dùng màu đỏ thay vì xanh dương, tiêu đề trang đăng nhập ghi sai thành "Đăng Ký", và nhãn dùng lẫn lộn tiếng Anh ("Username", "Sign In").

---

## 5. Kết luận và Khuyến nghị (Conclusion & Recommendations)

1. **Khuyến nghị ưu tiên xử lý (P0 / Critical):**
   - Sửa ngay trường mật khẩu trên trang Đăng nhập thành `type="password"`.
   - Sửa biểu thức chính quy kiểm tra mật khẩu trên trang Đăng ký để chấp nhận các ký tự đặc biệt theo FR-01 và loại bỏ yêu cầu khoảng trắng.
2. **Khuyến nghị tính năng nghiệp vụ (P1 / High):**
   - Bổ sung trường Xác nhận mật khẩu vào form Đăng ký và Bước 2 của Quên Mật Khẩu.
   - Sửa backend để sinh mã OTP gồm 6 chữ số và cập nhật nhãn trên frontend.
   - Bổ sung nút "Quay lại đăng nhập" trên màn hình Quên Mật Khẩu.
   - Xử lý hiển thị thông báo tạm khóa tài khoản (30 giây) khi đăng nhập sai từ 3 lần trở lên.
3. **Khuyến nghị giao diện & tiếp cận (P2 / P3):**
   - Bổ sung thẻ `<h1>` duy nhất cho mỗi trang, thêm dấu `*` cho các nhãn trường bắt buộc, đổi màu nút submit đăng ký sang màu xanh dương, và liên kết `htmlFor` giữa label và input.
