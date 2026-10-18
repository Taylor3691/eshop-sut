# TC-FR-02-LOGIN-039: Kiểm tra lỗi không làm lộ email

## Requirement ID

FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email không tồn tại<br>Password hợp lệ |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Không trả thông báo như `Email này đã tồn tại nhưng mật khẩu sai`

## Status / Related Bugs

Not Run / None
