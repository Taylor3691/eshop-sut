# [BUG][DEF-FR03-03] Thiếu nút "Quay lại đăng nhập" tại Bước 1

## Found by Test Case

[TC-BVA-TRANS-003](../test-cases/password-reset-web/TC-BVA-TRANS-003.md), [TC-FORGOT-004](../test-cases/password-reset-web/TC-FORGOT-004.md), [TC-GAP-MOB-004](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-004.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Trung bình (Navigation Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:45-60`
- **Mô tả**: Biểu mẫu Bước 1 hoàn toàn không có nút điều hướng quay về `/login`.

- **GitHub Issue:** [#14](https://github.com/Taylor3691/eshop-sut/issues/14).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-TRANS-003` | Chuyển về trang /login | Giao diện Bước 1 không có nút hoặc liên kết "Quay lại đăng nhập". | [TC-BVA-TRANS-003.png](../test-cases/password-reset-web/screenshots/TC-BVA-TRANS-003.png) |
| `TC-FORGOT-004` | Chuyển hướng về /login | Nút không hề tồn tại trong DOM Bước 1 | Recorded: Kiểm tra ForgotPassword.jsx:45-60; không có nút quay lại |
| `TC-GAP-MOB-004` | Có nút "Quay lại đăng nhập" đưa về trang Login | Bước 1 chỉ có nút "Lấy mã OTP", không có nút quay lại đăng nhập | Recorded: frontend-mobile/App.js:843-858 không có nút quay lại |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)
- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
