# TC-FR-02-LOGIN-037: Kiểm tra thông báo lỗi đăng nhập chung

## Requirement ID

FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email không tồn tại hoặc password sai |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Thông báo lỗi chung, không phân biệt email có tồn tại hay không

## Status / Related Bugs

Not Run / None
