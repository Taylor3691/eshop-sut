# [BUG][DEF-FR03-07] Thiếu trường "Xác nhận mật khẩu mới" tại Bước 2

## Found by Test Case

[TC-BVA-MATCH-001](../test-cases/password-reset-web/TC-BVA-MATCH-001.md), [TC-BVA-MATCH-002](../test-cases/password-reset-web/TC-BVA-MATCH-002.md), [TC-FORGOT-013](../test-cases/password-reset-web/TC-FORGOT-013.md), [TC-GAP-MOB-002](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-002.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (Specification Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:63-97`, `backend/server.js:88-98`
- **Mô tả**: Giao diện và API đều không có trường `confirmPassword`, bỏ qua việc xác nhận khớp mật khẩu.

- **GitHub Issue:** [#16](https://github.com/Taylor3691/eshop-sut/issues/16).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-MATCH-001` | Đặt lại mật khẩu thành công | Giao diện Bước 2 thiếu ô "Xác nhận mật khẩu mới" trong cấu trúc DOM. | [TC-BVA-MATCH-001.png](../test-cases/password-reset-web/screenshots/TC-BVA-MATCH-001.png) |
| `TC-BVA-MATCH-002` | Từ chối do không khớp xác nhận | Giao diện Bước 2 thiếu ô "Xác nhận mật khẩu mới"; không kiểm tra khớp. | [TC-BVA-MATCH-002.png](../test-cases/password-reset-web/screenshots/TC-BVA-MATCH-002.png) |
| `TC-FORGOT-013` | Từ chối do không khớp | Trường không có trên UI; API không nhận hay kiểm tra xác nhận | Recorded: ForgotPassword.jsx:63-97 thiếu ô xác nhận; server.js:88 không có param |
| `TC-GAP-MOB-002` | Có trường "Xác nhận mật khẩu mới" và so khớp | Biểu mẫu Bước 2 chỉ có resetToken và newPassword; thiếu hoàn toàn ô xác nhận | Recorded: frontend-mobile/App.js:860-889 không render trường confirmPassword |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)
- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
