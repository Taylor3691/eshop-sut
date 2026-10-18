# TC-FR-02-LOGIN-021: Kiểm tra tài khoản đang bị khóa

## Requirement ID

FR-02.3, FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the account failed-attempt/lock state specified in Test Data.
- Record the initial counter/state before the attempt.

## Test Data

| Field | Value |
|---|---|
| Input / state | Tài khoản có trạng thái khóa<br>Email và password đúng |

## Test Steps

1. Verify the initial counter and lock state.
2. Perform the login attempt specified in Test Data.
3. Observe the response, counter, lock state, and whether login is allowed.

## Expected Result

- Phản hồi lỗi phù hợp, không đăng nhập và không tạo JWT

## Status / Related Bugs

Not Run / None
