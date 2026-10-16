# [BUG][DEF-FR03-11] Thông báo lỗi mạng sai lệch tại Bước 2

## Found by Test Case

[TC-GAP-MOB-010](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-010.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-GAP-MOB-010` | Hiển thị lỗi kết nối mạng | Khối catch hiển thị cố định: "Mã OTP không đúng hoặc có lỗi xảy ra." | Recorded: App.js:282 Alert quy chụp mọi ngoại lệ thành lỗi sai OTP |

## Source reports

- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
