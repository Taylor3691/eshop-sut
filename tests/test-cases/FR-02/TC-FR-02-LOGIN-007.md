# TC-FR-02-LOGIN-007: Kiểm tra mật khẩu không khớp

## Requirement ID

FR-02.1, FR-02.2, FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare a registered test account and open the login screen.
- Ensure the account is not locked unless Test Data requires it.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email: `test@eshop.com`<br>Password: `WrongPass123!` |

## Test Steps

1. Open the login form.
2. Enter the Test Data and submit.
3. Observe the response, login state, and token behavior.

## Expected Result

- Đăng nhập thất bại, bộ đếm tăng đúng 1, thông báo không lộ chi tiết

## Status / Related Bugs

Not Run / None
