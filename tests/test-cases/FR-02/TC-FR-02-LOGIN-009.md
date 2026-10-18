# TC-FR-02-LOGIN-009: Kiểm tra bộ đếm tăng đúng 1

## Requirement ID

FR-02.2

## Module / Test Type / Technique

AUTHENTICATION / Functional / Boundary Value Analysis

## Preconditions

- Prepare the account failed-attempt/lock state specified in Test Data.
- Record the initial counter/state before the attempt.

## Test Data

| Field | Value |
|---|---|
| Input / state | Thực hiện một lần đăng nhập sai với email hợp lệ và mật khẩu sai |

## Test Steps

1. Verify the initial counter and lock state.
2. Perform the login attempt specified in Test Data.
3. Observe the response, counter, lock state, and whether login is allowed.

## Expected Result

- Bộ đếm chuyển từ `0` thành `1`

## Status / Related Bugs

Not Run / None
