# [BUG][DEF-FR03-08] Hiển thị mã OTP ở môi trường demo trên Mobile

## Found by Test Case

[TC-GAP-MOB-001](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-001.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-GAP-MOB-001` | Ứng dụng hiển thị mã OTP trực tiếp trên màn hình demo | setForgotMessage() hiển thị chuỗi tĩnh; bỏ qua data.resetToken, không hiện OTP | Recorded: frontend-mobile/App.js:251-253 bỏ qua data.resetToken từ API |

## Source reports

- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
