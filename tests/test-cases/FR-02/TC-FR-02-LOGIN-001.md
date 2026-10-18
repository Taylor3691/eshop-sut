# TC-FR-02-LOGIN-001: Kiểm tra email rỗng

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
| Input / state | Email: `""`<br>Password: `Test1234!` |

## Test Steps

1. Open the login form.
2. Enter the Test Data and submit.
3. Observe the response, login state, and token behavior.

## Expected Result

- Hệ thống từ chối input email và không đăng nhập

## Status / Related Bugs

Not Run / None
