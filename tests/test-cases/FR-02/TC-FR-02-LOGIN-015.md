# TC-FR-02-LOGIN-015: Kiểm tra tài khoản còn khóa ở giây 29

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
| Input / state | Tài khoản vừa bị khóa<br>Thời gian đã qua: `29 giây` |

## Test Steps

1. Verify the initial counter and lock state.
2. Perform the login attempt specified in Test Data.
3. Observe the response, counter, lock state, and whether login is allowed.

## Expected Result

- Đăng nhập bị từ chối vì tài khoản vẫn đang khóa

## Status / Related Bugs

Not Run / None
