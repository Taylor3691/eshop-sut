# TC-FR-02-LOGIN-004: Kiểm tra email hợp lệ nhưng chưa đăng ký

## Requirement ID

FR-02.1

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare a registered test account and open the login screen.
- Ensure the account is not locked unless Test Data requires it.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email: `unknown@example.com`<br>Password: `Test1234!` |

## Test Steps

1. Open the login form.
2. Enter the Test Data and submit.
3. Observe the response, login state, and token behavior.

## Expected Result

- Đăng nhập thất bại, không tạo JWT, không tiết lộ chi tiết tài khoản

## Status / Related Bugs

Not Run / None
