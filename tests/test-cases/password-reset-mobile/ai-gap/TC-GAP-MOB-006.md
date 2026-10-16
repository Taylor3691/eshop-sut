# TC-GAP-MOB-006: Regex kiểm tra mật khẩu trên Mobile chấp nhận ký tự đặc biệt ngoài danh mục chuẩn FR-01

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 với mã OTP hợp lệ.

## Test Data

| Field | Value |
|---|---|
| `resetToken` | Mã OTP hợp lệ |
| `newPassword` | `"Pass1234#"` (chứa ký tự `#` không thuộc tập `{@, $, !, %, *, ?, &}`) |

## Test Steps

1. Nhập mã OTP hợp lệ vào ô OTP.
2. Nhập `"Pass1234#"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".
4. Quan sát phản ứng của client regex.

## Expected Result

- Theo đặc tả FR-01 và FR-03: Ký tự đặc biệt hợp lệ được giới hạn nghiêm ngặt trong tập hợp `{@, $, !, %, *, ?, &}`.
- Hệ thống cần từ chối hoặc cảnh báo nếu ký tự đặc biệt không thuộc danh mục cho phép.

## Actual Result

Regex `(?=.*[^A-Za-z\d])` chấp nhận `Pass1234#` là mật khẩu mạnh hợp lệ

## Missing Scenario

Kiểm tra việc biểu thức chính quy trên Mobile App chấp nhận các ký tự đặc biệt ngoài tập hợp quy định tại FR-01 (như `#`, `_`, `-`, `~`).

## Gap Rationale

Trong `frontend-mobile/App.js:261-262`, lập trình viên triển khai regex `(?=.*[^A-Za-z\d])`. Regex này chấp nhận bất kỳ ký tự nào không phải chữ cái và số, dẫn đến việc các ký tự như `#`, `_`, `-` đều được client coi là hợp lệ dù nằm ngoài danh mục đặc tả.

## Status / Related Bugs

FAIL / DEF-FR03-09 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
