# TC-FR-02-LOGIN-017: Kiểm tra sau khi hết thời gian khóa

## Requirement ID

FR-02.3

## Module / Test Type / Technique

AUTHENTICATION / Functional / Boundary Value Analysis

## Preconditions

- Prepare the account failed-attempt/lock state specified in Test Data.
- Record the initial counter/state before the attempt.

## Test Data

| Field | Value |
|---|---|
| Input / state | Tài khoản vừa bị khóa<br>Thời gian đã qua: `31 giây`<br>Password đúng |

## Test Steps

1. Verify the initial counter and lock state.
2. Perform the login attempt specified in Test Data.
3. Observe the response, counter, lock state, and whether login is allowed.

## Expected Result

- Tài khoản được phép thử đăng nhập lại

## Status / Related Bugs

Not Run / None
