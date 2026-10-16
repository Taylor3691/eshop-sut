# [BUG][DEF-FR03-06] Bước 2: Gửi mật khẩu yếu trực tiếp đến API

## Found by Test Case

[TC-GAP-API-PW](../test-cases/password-reset-web/TC-GAP-API-PW.md), [TC-GAP-MOB-005](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-005.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-GAP-API-PW` | Backend từ chối mật khẩu không đủ độ mạnh | Backend trả về HTTP 200; đổi thành công mật khẩu thành "weak"! | Recorded: Đăng nhập bằng "weak" thành công: HTTP 200 { message: "Login successful" } |
| `TC-GAP-MOB-005` | Backend từ chối HTTP 400 do mật khẩu yếu | Backend trả về HTTP 200; đổi thành công MK thành "123"; đăng nhập bằng "123" OK | Recorded: Probe live: HTTP 200; server.js:87-98 thiếu validation |

## Source reports

- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)
- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
