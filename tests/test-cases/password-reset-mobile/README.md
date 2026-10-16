# FR-03-mobile — Forgot password and reset (mobile)

## Test Cases

| ID | Test case | Technique | Status |
|---|---|---|---|
| [TC-MOB-BVA-FORGOT-001](TC-MOB-BVA-FORGOT-001.md) | Độ dài mã OTP dưới biên tối thiểu (length = 0, chuỗi rỗng) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-002](TC-MOB-BVA-FORGOT-002.md) | Độ dài mã OTP ngay dưới ngưỡng triển khai mobile (length = 3) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-003](TC-MOB-BVA-FORGOT-003.md) | Độ dài mã OTP tại đúng ngưỡng triển khai mobile (length = 4) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-004](TC-MOB-BVA-FORGOT-004.md) | Độ dài mã OTP dưới ngưỡng đặc tả 6 chữ số (length = 5) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-005](TC-MOB-BVA-FORGOT-005.md) | Độ dài mã OTP tại đúng ngưỡng đặc tả 6 chữ số (length = 6) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-006](TC-MOB-BVA-FORGOT-006.md) | Độ dài mã OTP ngay trên ngưỡng đặc tả 6 chữ số (length = 7) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-007](TC-MOB-BVA-FORGOT-007.md) | Độ dài mật khẩu mới bằng 0 (length = 0, chuỗi rỗng) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-008](TC-MOB-BVA-FORGOT-008.md) | Độ dài mật khẩu mới ngay dưới biên tối thiểu (length = 7, min - 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-009](TC-MOB-BVA-FORGOT-009.md) | Độ dài mật khẩu mới tại đúng biên tối thiểu (length = 8, min) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-010](TC-MOB-BVA-FORGOT-010.md) | Độ dài mật khẩu mới ngay trên biên tối thiểu (length = 9, min + 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-011](TC-MOB-BVA-FORGOT-011.md) | Số lượng chữ in hoa dưới biên tối thiểu (count = 0) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-012](TC-MOB-BVA-FORGOT-012.md) | Số lượng chữ in hoa tại đúng biên tối thiểu (count = 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-013](TC-MOB-BVA-FORGOT-013.md) | Số lượng chữ in thường dưới biên tối thiểu (count = 0) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-014](TC-MOB-BVA-FORGOT-014.md) | Số lượng chữ in thường tại đúng biên tối thiểu (count = 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-015](TC-MOB-BVA-FORGOT-015.md) | Số lượng chữ số dưới biên tối thiểu (count = 0) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-016](TC-MOB-BVA-FORGOT-016.md) | Số lượng chữ số tại đúng biên tối thiểu (count = 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-017](TC-MOB-BVA-FORGOT-017.md) | Số lượng ký tự đặc biệt dưới biên tối thiểu (count = 0) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-018](TC-MOB-BVA-FORGOT-018.md) | Số lượng ký tự đặc biệt tại đúng biên tối thiểu (count = 1) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-019](TC-MOB-BVA-FORGOT-019.md) | Độ lệch so khớp Xác nhận mật khẩu tại biên khớp hoàn toàn (distance = 0) | BVA | FAIL |
| [TC-MOB-BVA-FORGOT-020](TC-MOB-BVA-FORGOT-020.md) | Độ lệch so khớp Xác nhận mật khẩu ngay trên biên khớp (distance = 1) | BVA | FAIL |
| [TC-MOB-BVA-FORGOT-021](TC-MOB-BVA-FORGOT-021.md) | Độ dài chuỗi email dưới biên tối thiểu tại Bước 1 (length = 0, chuỗi rỗng) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-022](TC-MOB-BVA-FORGOT-022.md) | Độ dài email sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed_length = 0) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-023](TC-MOB-BVA-FORGOT-023.md) | Email hợp lệ bọc bởi khoảng trắng ở hai đầu (Trim boundary) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-024](TC-MOB-BVA-FORGOT-024.md) | Biên liên kết tài khoản OTP - Email trùng khớp (email_match = True) | BVA | PASS |
| [TC-MOB-BVA-FORGOT-025](TC-MOB-BVA-FORGOT-025.md) | Biên liên kết tài khoản OTP - Email không trùng khớp (email_match = False) | BVA | BLOCKED |
| [TC-MOB-FORGOT-001](TC-MOB-FORGOT-001.md) | Điều hướng từ màn hình Đăng nhập sang màn hình Quên mật khẩu | Domain Testing | PASS |
| [TC-MOB-FORGOT-002](TC-MOB-FORGOT-002.md) | Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 1 theo đặc tả FR-03 | Domain Testing | FAIL |
| [TC-MOB-FORGOT-003](TC-MOB-FORGOT-003.md) | Kiểm tra sự hiện diện của nút "Quay lại đăng nhập" tại Bước 1 theo đặc tả FR-03 | Domain Testing | FAIL |
| [TC-MOB-FORGOT-004](TC-MOB-FORGOT-004.md) | Yêu cầu mã OTP thành công với email đã đăng ký hợp lệ (Phân hoạch hợp lệ cơ bản) | Domain Testing | PASS |
| [TC-MOB-FORGOT-005](TC-MOB-FORGOT-005.md) | Kiểm tra hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo theo đặc tả FR-03 | Domain Testing | FAIL |
| [TC-MOB-FORGOT-006](TC-MOB-FORGOT-006.md) | Yêu cầu mã OTP với địa chỉ email chưa từng đăng ký trong hệ thống | Domain Testing | BLOCKED |
| [TC-MOB-FORGOT-007](TC-MOB-FORGOT-007.md) | Yêu cầu mã OTP khi để trống ô nhập email (Chuỗi rỗng "") | Domain Testing | BLOCKED |
| [TC-MOB-FORGOT-008](TC-MOB-FORGOT-008.md) | Yêu cầu mã OTP với email sai định dạng (Thiếu ký tự @ hoặc tên miền) | Domain Testing | PASS |
| [TC-MOB-FORGOT-009](TC-MOB-FORGOT-009.md) | Yêu cầu mã OTP với email chứa khoảng trắng ở đầu hoặc cuối (" test@eshop.com ") | Domain Testing | PASS |
| [TC-MOB-FORGOT-010](TC-MOB-FORGOT-010.md) | Yêu cầu mã OTP với email dạng chữ hoa toàn bộ ("TEST@ESHOP.COM") | Domain Testing | FAIL |
| [TC-MOB-FORGOT-011](TC-MOB-FORGOT-011.md) | Chuyển đổi trạng thái từ Bước 1 sang Bước 2 và hiển thị các trường nhập liệu | Domain Testing | PASS |
| [TC-MOB-FORGOT-012](TC-MOB-FORGOT-012.md) | Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 2 theo đặc tả FR-03 | Domain Testing | FAIL |
| [TC-MOB-FORGOT-013](TC-MOB-FORGOT-013.md) | Kiểm tra sự hiện diện của trường "Xác nhận mật khẩu mới" tại Bước 2 theo đặc tả FR-03 & FR-01 | Domain Testing | FAIL |
| [TC-MOB-FORGOT-014](TC-MOB-FORGOT-014.md) | Kiểm tra nhãn và quy cách mã OTP tại Bước 2 giữa đặc tả (6 chữ số) và ứng dụng di động (4 chữ số) | Domain Testing | FAIL |
| [TC-MOB-FORGOT-015](TC-MOB-FORGOT-015.md) | Đặt lại mật khẩu thành công với mã OTP hợp lệ và mật khẩu mới mạnh hợp lệ | Domain Testing | PASS |
| [TC-MOB-FORGOT-016](TC-MOB-FORGOT-016.md) | Từ chối đặt lại mật khẩu khi nhập sai giá trị mã OTP | Domain Testing | PASS |
| [TC-MOB-FORGOT-017](TC-MOB-FORGOT-017.md) | Từ chối đặt lại mật khẩu khi để trống mã OTP ("") | Domain Testing | PASS |
| [TC-MOB-FORGOT-018](TC-MOB-FORGOT-018.md) | Từ chối đặt lại mật khẩu khi mã OTP chứa chữ cái hoặc ký tự đặc biệt | Domain Testing | PASS |
| [TC-MOB-FORGOT-019](TC-MOB-FORGOT-019.md) | Cô lập tài khoản — Từ chối sử dụng mã OTP chéo giữa các tài khoản người dùng | Domain Testing | BLOCKED |
| [TC-MOB-FORGOT-020](TC-MOB-FORGOT-020.md) | Đặt lại mật khẩu với mật khẩu mới đạt đúng độ dài tối thiểu 8 ký tự kèm đủ các nhóm ký tự | Domain Testing | PASS |
| [TC-MOB-FORGOT-021](TC-MOB-FORGOT-021.md) | Từ chối mật khẩu mới có độ dài dưới 8 ký tự (7 ký tự) | Domain Testing | PASS |
| [TC-MOB-FORGOT-022](TC-MOB-FORGOT-022.md) | Từ chối mật khẩu mới để trống ("") | Domain Testing | PASS |
| [TC-MOB-FORGOT-023](TC-MOB-FORGOT-023.md) | Từ chối mật khẩu mới thiếu ký tự chữ in hoa (A-Z) | Domain Testing | PASS |
| [TC-MOB-FORGOT-024](TC-MOB-FORGOT-024.md) | Từ chối mật khẩu mới thiếu ký tự chữ in thường (a-z) | Domain Testing | PASS |
| [TC-MOB-FORGOT-025](TC-MOB-FORGOT-025.md) | Từ chối mật khẩu mới thiếu ký tự chữ số (0-9) | Domain Testing | PASS |
| [TC-MOB-FORGOT-026](TC-MOB-FORGOT-026.md) | Từ chối mật khẩu mới thiếu ký tự đặc biệt | Domain Testing | PASS |
| [TC-MOB-FORGOT-027](TC-MOB-FORGOT-027.md) | Đặt lại mật khẩu với các ký tự đặc biệt hợp lệ trong tập quy định (@, $, !, %, \*, ?, &) | Domain Testing | PASS |
| [TC-MOB-FORGOT-028](TC-MOB-FORGOT-028.md) | Đặt lại mật khẩu với ký tự đặc biệt ngoài tập quy định tại FR-01 (ví dụ #, ^, \_) | Domain Testing | FAIL |
| [TC-MOB-FORGOT-029](TC-MOB-FORGOT-029.md) | Điều hướng quay lại Bước 1 từ Bước 2 bằng nút "← Quay lại" | Domain Testing | PASS |
| [TC-MOB-FORGOT-030](TC-MOB-FORGOT-030.md) | Xác minh đăng nhập thành công bằng mật khẩu mới sau khi hoàn tất quy trình Quên mật khẩu | Domain Testing | PASS |

## AI Gap Cases

| ID | Scenario | Status |
|---|---|---|
| [TC-GAP-MOB-001](ai-gap/TC-GAP-MOB-001.md) | Không hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo trên Mobile | FAIL |
| [TC-GAP-MOB-002](ai-gap/TC-GAP-MOB-002.md) | Thiếu trường "Xác nhận mật khẩu mới" (Confirm New Password) trên giao diện Mobile | FAIL |
| [TC-GAP-MOB-003](ai-gap/TC-GAP-MOB-003.md) | Thiếu Chỉ báo bước ("Bước 1 / 2" và "Bước 2 / 2") trên giao diện Mobile | FAIL |
| [TC-GAP-MOB-004](ai-gap/TC-GAP-MOB-004.md) | Thiếu nút "Quay lại đăng nhập" trong biểu mẫu Bước 1 trên Mobile | FAIL |
| [TC-GAP-MOB-005](ai-gap/TC-GAP-MOB-005.md) | Backend API bỏ qua kiểm tra độ mạnh mật khẩu khi đặt lại mật khẩu trực tiếp qua API | FAIL |
| [TC-GAP-MOB-006](ai-gap/TC-GAP-MOB-006.md) | Regex kiểm tra mật khẩu trên Mobile chấp nhận ký tự đặc biệt ngoài danh mục chuẩn FR-01 | FAIL |
| [TC-GAP-MOB-007](ai-gap/TC-GAP-MOB-007.md) | Kiểm tra tính dùng một lần của mã OTP (Ngăn chặn Tấn công phát lại / Replay Attack) | PASS |
| [TC-GAP-MOB-008](ai-gap/TC-GAP-MOB-008.md) | Độ dài mã OTP sinh ra trên Backend và nhãn UI là 4 chữ số thay vì 6 chữ số | FAIL |
| [TC-GAP-MOB-009](ai-gap/TC-GAP-MOB-009.md) | Thiếu trạng thái Loading và khóa nút bấm chống gửi trùng lặp (Double Submit) trên Mobile | FAIL |
| [TC-GAP-MOB-010](ai-gap/TC-GAP-MOB-010.md) | Thông báo lỗi mạng sai lệch ở Bước 2 trên Mobile | FAIL |

## Reports and analysis

- [Domain testing report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md)
- [BVA testing report](../../../reports/test-results/FR-03-mobile/bva_testing_report.md)
- [Analysis: FR-03-mobile-ai-gap-analysis](../../test-summary/FR-03-mobile-ai-gap-analysis.md)
