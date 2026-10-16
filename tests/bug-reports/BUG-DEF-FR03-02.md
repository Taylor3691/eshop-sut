# [BUG][DEF-FR03-02] Trường email Bước 1 không có validate HTML5

## Found by Test Case

[TC-FORGOT-003](../test-cases/password-reset-web/TC-FORGOT-003.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Trung bình (UI/Form Validation)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx:50`
- **Mô tả**: Ô nhập email sử dụng `type="text"` thay vì `type="email"`, cho phép gửi email sai cú pháp lên server.

- **Manual review:** The requirement does not explicitly require HTML5 input validation/type=email; review TC-FORGOT-003 before treating it as a defect.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-FORGOT-003` | Form chặn gửi; yêu cầu đúng cú pháp email | Input là type="text"; API trả về 404 | Recorded: HTML: <input type="text" ... /> không có validate HTML5 |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
