# [BUG][DEF-FR03-05] Biểu thức chính quy (Regex) mật khẩu phía Client bị lỗi logic đảo ngược

## Found by Test Case

[TC-BVA-COMP-DIGIT-002](../test-cases/password-reset-web/TC-BVA-COMP-DIGIT-002.md), [TC-BVA-COMP-LOWER-002](../test-cases/password-reset-web/TC-BVA-COMP-LOWER-002.md), [TC-BVA-COMP-SPEC-002](../test-cases/password-reset-web/TC-BVA-COMP-SPEC-002.md), [TC-BVA-COMP-UPPER-002](../test-cases/password-reset-web/TC-BVA-COMP-UPPER-002.md), [TC-BVA-PW-LEN-002](../test-cases/password-reset-web/TC-BVA-PW-LEN-002.md), [TC-BVA-PW-LEN-003](../test-cases/password-reset-web/TC-BVA-PW-LEN-003.md), [TC-FORGOT-005](../test-cases/password-reset-web/TC-FORGOT-005.md), [TC-FORGOT-006](../test-cases/password-reset-web/TC-FORGOT-006.md), [TC-GAP-PW-SPACE](../test-cases/password-reset-web/TC-GAP-PW-SPACE.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical / Blocker)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:26`
- **Mô tả**: Regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/` bắt buộc phải có khoảng trắng `\s` và từ chối toàn bộ ký tự đặc biệt (`@$!%*?&`). Mật khẩu hợp lệ theo đặc tả đều bị chặn.

- **GitHub Issue:** [#15](https://github.com/Taylor3691/eshop-sut/issues/15).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-COMP-DIGIT-002` | Chấp nhận mật khẩu có đúng 1 chữ số | Bị Client Regex chặn do chứa ký tự đặc biệt @! và thiếu khoảng trắng. | [TC-BVA-COMP-DIGIT-002.png](../test-cases/password-reset-web/screenshots/TC-BVA-COMP-DIGIT-002.png) |
| `TC-BVA-COMP-LOWER-002` | Chấp nhận mật khẩu có đúng 1 chữ thường | Bị Client Regex chặn do chứa ký tự đặc biệt @! và thiếu khoảng trắng. | [TC-BVA-COMP-LOWER-002.png](../test-cases/password-reset-web/screenshots/TC-BVA-COMP-LOWER-002.png) |
| `TC-BVA-COMP-SPEC-002` | Chấp nhận mật khẩu có 1 ký tự đặc biệt hợp lệ | Bị Client Regex chặn do chứa ký tự @ và thiếu khoảng trắng. | [TC-BVA-COMP-SPEC-002.png](../test-cases/password-reset-web/screenshots/TC-BVA-COMP-SPEC-002.png) |
| `TC-BVA-COMP-UPPER-002` | Chấp nhận mật khẩu có đúng 1 chữ hoa | Bị Client Regex chặn do chứa ký tự đặc biệt @! và thiếu khoảng trắng. | [TC-BVA-COMP-UPPER-002.png](../test-cases/password-reset-web/screenshots/TC-BVA-COMP-UPPER-002.png) |
| `TC-BVA-PW-LEN-002` | Đặt lại mật khẩu thành công | Cảnh báo: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* | Recorded: Regex /(?=.*\s)[A-Za-z\d\s]{8,}$/ từ chối ký tự đặc biệt |
| `TC-BVA-PW-LEN-003` | Chấp nhận mật khẩu 9 ký tự hợp lệ | Bị Client Regex chặn do có ký tự ! và thiếu khoảng trắng; alert báo mật khẩu quá yếu. | [TC-BVA-PW-LEN-003.png](../test-cases/password-reset-web/screenshots/TC-BVA-PW-LEN-003.png) |
| `TC-FORGOT-005` | Đặt lại mật khẩu thành công | Bị Client Regex chặn với alert: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | [TC-FORGOT-005.png](../test-cases/password-reset-web/screenshots/TC-FORGOT-005.png) |
| `TC-FORGOT-006` | Đặt lại mật khẩu thành công | Bị Client Regex chặn với alert: "Mật khẩu quá yếu!...". Regex cấm ký tự đặc biệt !. | [TC-FORGOT-006.png](../test-cases/password-reset-web/screenshots/TC-FORGOT-006.png) |
| `TC-GAP-PW-SPACE` | Từ chối vì khoảng trắng không nằm trong {@,$,!,%,*,?,&} | Regex của client chấp nhận Abc 1234 là mật khẩu mạnh! | Recorded: regex.test("Abc 1234") === true |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
