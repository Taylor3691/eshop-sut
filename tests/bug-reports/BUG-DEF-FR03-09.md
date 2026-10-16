# [BUG][DEF-FR03-09] Mobile Regex chấp nhận ký tự ngoài FR-01

## Found by Test Case

[TC-GAP-MOB-006](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-006.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-GAP-MOB-006` | Từ chối do # không thuộc tập {@,$,!,%,*,?,&} | Regex (?=.*[^A-Za-z\d]) chấp nhận Pass1234# là mật khẩu mạnh hợp lệ | Recorded: strongPasswordRegex.test("Pass1234#") === true (App.js:261) |

## Source reports

- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
