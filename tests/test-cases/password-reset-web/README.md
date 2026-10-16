# FR-03 — Forgot password and reset (web)

## Test Cases

| ID | Test case | Technique | Status |
|---|---|---|---|
| [TC-BVA-ASSOC-001](TC-BVA-ASSOC-001.md) | Biên Khớp Liên kết OTP - Email (Cùng Tài khoản) | BVA | PASS |
| [TC-BVA-ASSOC-002](TC-BVA-ASSOC-002.md) | Biên Lệch Liên kết OTP - Email (Khác Tài khoản) | BVA | PASS |
| [TC-BVA-COMP-DIGIT-001](TC-BVA-COMP-DIGIT-001.md) | Số lượng Chữ số Dưới Biên (0 Chữ số) | BVA | PASS |
| [TC-BVA-COMP-DIGIT-002](TC-BVA-COMP-DIGIT-002.md) | Số lượng Chữ số Tại Biên (1 Chữ số) | BVA | FAIL |
| [TC-BVA-COMP-LOWER-001](TC-BVA-COMP-LOWER-001.md) | Số lượng Chữ thường Dưới Biên (0 Chữ thường) | BVA | PASS |
| [TC-BVA-COMP-LOWER-002](TC-BVA-COMP-LOWER-002.md) | Số lượng Chữ thường Tại Biên (1 Chữ thường) | BVA | FAIL |
| [TC-BVA-COMP-SPEC-001](TC-BVA-COMP-SPEC-001.md) | Số lượng Ký tự Đặc biệt Dưới Biên (0 Ký tự Đặc biệt) | BVA | PASS |
| [TC-BVA-COMP-SPEC-002](TC-BVA-COMP-SPEC-002.md) | Số lượng Ký tự Đặc biệt Tại Biên (1 Ký tự Đặc biệt Hợp lệ) | BVA | FAIL |
| [TC-BVA-COMP-UPPER-001](TC-BVA-COMP-UPPER-001.md) | Số lượng Chữ hoa Dưới Biên (0 Chữ hoa) | BVA | PASS |
| [TC-BVA-COMP-UPPER-002](TC-BVA-COMP-UPPER-002.md) | Số lượng Chữ hoa Tại Biên (1 Chữ hoa) | BVA | FAIL |
| [TC-BVA-MATCH-001](TC-BVA-MATCH-001.md) | Khớp Xác nhận Mật khẩu (Khoảng cách = 0, Khớp Hoàn toàn) | BVA | FAIL |
| [TC-BVA-MATCH-002](TC-BVA-MATCH-002.md) | Lệch Xác nhận Mật khẩu 1 Ký tự (Khoảng cách = 1) | BVA | FAIL |
| [TC-BVA-OTP-001](TC-BVA-OTP-001.md) | Độ dài OTP Dưới Biên (5 Chữ số) | BVA | PASS |
| [TC-BVA-OTP-002](TC-BVA-OTP-002.md) | Độ dài OTP Tại Biên (6 Chữ số) | BVA | FAIL |
| [TC-BVA-OTP-003](TC-BVA-OTP-003.md) | Độ dài OTP Trên Biên (7 Chữ số) | BVA | PASS |
| [TC-BVA-PW-LEN-001](TC-BVA-PW-LEN-001.md) | Độ dài Mật khẩu Dưới Biên (7 Ký tự) | BVA | PASS |
| [TC-BVA-PW-LEN-002](TC-BVA-PW-LEN-002.md) | Độ dài Mật khẩu Tại Biên (8 Ký tự) | BVA | FAIL |
| [TC-BVA-PW-LEN-003](TC-BVA-PW-LEN-003.md) | Độ dài Mật khẩu Trên Biên (9 Ký tự) | BVA | FAIL |
| [TC-BVA-TRANS-001](TC-BVA-TRANS-001.md) | Chuyển đổi Trạng thái từ Bước 1 sang Bước 2 (Kích hoạt Hợp lệ) | BVA | FAIL |
| [TC-BVA-TRANS-002](TC-BVA-TRANS-002.md) | Biên Chuyển đổi Trạng thái Bước 1 (Đầu vào Rỗng / Không hợp lệ) | BVA | PASS |
| [TC-BVA-TRANS-003](TC-BVA-TRANS-003.md) | Biên Điều hướng "Quay lại đăng nhập" ở Bước 1 | BVA | FAIL |
| [TC-FORGOT-001](TC-FORGOT-001.md) | Bước 1 - Yêu cầu OTP với Email Hợp lệ đã Đăng ký | Domain Testing | FAIL |
| [TC-FORGOT-002](TC-FORGOT-002.md) | Bước 1 - Yêu cầu OTP với Email Chưa Đăng ký | Domain Testing | PASS |
| [TC-FORGOT-003](TC-FORGOT-003.md) | Bước 1 - Yêu cầu OTP với Email Sai Định dạng | Domain Testing | FAIL |
| [TC-FORGOT-004](TC-FORGOT-004.md) | Bước 1 - Kiểm tra Điều hướng "Quay lại đăng nhập" | Domain Testing | FAIL |
| [TC-FORGOT-005](TC-FORGOT-005.md) | Bước 2 - Đặt lại Mật khẩu với Đúng 8 Ký tự Tối thiểu | Domain Testing | FAIL |
| [TC-FORGOT-006](TC-FORGOT-006.md) | Bước 2 - Đặt lại Mật khẩu với 9 Ký tự (min + 1) | Domain Testing | FAIL |
| [TC-FORGOT-007](TC-FORGOT-007.md) | Bước 2 - Vi phạm Biên Độ dài Mật khẩu (7 Ký tự) | Domain Testing | PASS |
| [TC-FORGOT-008](TC-FORGOT-008.md) | Bước 2 - Mật khẩu Thiếu Chữ hoa | Domain Testing | PASS |
| [TC-FORGOT-009](TC-FORGOT-009.md) | Bước 2 - Mật khẩu Thiếu Chữ thường | Domain Testing | PASS |
| [TC-FORGOT-010](TC-FORGOT-010.md) | Bước 2 - Mật khẩu Thiếu Chữ số | Domain Testing | PASS |
| [TC-FORGOT-011](TC-FORGOT-011.md) | Bước 2 - Mật khẩu Thiếu Ký tự Đặc biệt | Domain Testing | PASS |
| [TC-FORGOT-012](TC-FORGOT-012.md) | Bước 2 - Mật khẩu Chứa Ký tự Đặc biệt Không Cho Phép | Domain Testing | PASS |
| [TC-FORGOT-013](TC-FORGOT-013.md) | Bước 2 - Mật khẩu và Xác nhận Mật khẩu Không Khớp | Domain Testing | FAIL |
| [TC-FORGOT-014](TC-FORGOT-014.md) | Bước 2 - Mã OTP 6 Chữ số Không Chính Xác | Domain Testing | PASS |
| [TC-FORGOT-015](TC-FORGOT-015.md) | Bước 2 - Biên Độ dài OTP: 5 Chữ số | Domain Testing | PASS |
| [TC-FORGOT-016](TC-FORGOT-016.md) | Bước 2 - Biên Độ dài OTP: 7 Chữ số | Domain Testing | PASS |
| [TC-FORGOT-017](TC-FORGOT-017.md) | Bước 2 - Mã OTP Chứa Ký tự Không Phải Số | Domain Testing | PASS |
| [TC-FORGOT-018](TC-FORGOT-018.md) | Bước 2 - Cô lập OTP Giữa các Tài khoản (Quy tắc Bảo mật) | Domain Testing | PASS |

## Supplemental AI-gap cases

| ID | Scenario | Technique | Recorded status |
|---|---|---|---|
| [TC-BVA-OTP-004](TC-BVA-OTP-004.md) | Bước 2: Từ chối mã OTP không đúng | BVA / AI gap | PASS |
| [TC-GAP-API-PW](TC-GAP-API-PW.md) | Bước 2: Gửi mật khẩu yếu trực tiếp đến API | AI gap | FAIL |
| [TC-GAP-OTP-REUSE](TC-GAP-OTP-REUSE.md) | Bước 2: Tấn công phát lại / Dùng lại OTP | AI gap | PASS |
| [TC-GAP-PW-SPACE](TC-GAP-PW-SPACE.md) | Bước 2: Nhập mật khẩu có khoảng trắng qua UI | AI gap | FAIL |
| [TC-UI-IND-001](TC-UI-IND-001.md) | Bước 1 & 2: Hiển thị Chỉ báo bước | AI gap | FAIL |

## Reports and analysis

- [Domain testing report](../../../reports/test-results/FR-03/domain_testing_report.md)
- [BVA testing report](../../../reports/test-results/FR-03/bva_testing_report.md)
- [Analysis: FR-03-ai-gap-analysis](../../test-summary/FR-03-ai-gap-analysis.md)
- [Analysis: FR-03-bva-analysis](../../test-summary/FR-03-bva-analysis.md)
- [Analysis: FR-03-domain-analysis](../../test-summary/FR-03-domain-analysis.md)
- [Analysis: FR-03-mobile-ai-gap-analysis](../../test-summary/FR-03-mobile-ai-gap-analysis.md)
