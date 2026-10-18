# TC-FR-02-LOGIN-006: Kiểm tra mật khẩu rỗng

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
| Input / state | Email: `test@eshop.com`<br>Password: `""` |

## Test Steps

1. Open the login form.
2. Enter the Test Data and submit.
3. Observe the response, login state, and token behavior.

## Expected Result

- Đăng nhập thất bại và không tạo JWT

## Status / Related Bugs

Not Run / None
