# TC-FR-02-LOGIN-011: Kiểm tra bộ đếm không tăng nhiều hơn 1

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
| Input / state | Trạng thái ban đầu: `login_attempts = 0`<br>Thực hiện một lần đăng nhập sai |

## Test Steps

1. Verify the initial counter and lock state.
2. Perform the login attempt specified in Test Data.
3. Observe the response, counter, lock state, and whether login is allowed.

## Expected Result

- Sau một lần đăng nhập sai, bộ đếm chỉ tăng đúng `1` đơn vị, không tăng thành `2` hoặc lớn hơn.

## Status / Related Bugs

Not Run / None
