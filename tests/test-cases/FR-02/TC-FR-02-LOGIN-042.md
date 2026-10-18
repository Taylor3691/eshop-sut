# TC-FR-02-LOGIN-042: Kiểm tra đăng nhập sai luôn có phản hồi lỗi

## Requirement ID

FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email hợp lệ<br>Password sai |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Response thể hiện đăng nhập thất bại, không trả `success: true`

## Status / Related Bugs

Not Run / None
