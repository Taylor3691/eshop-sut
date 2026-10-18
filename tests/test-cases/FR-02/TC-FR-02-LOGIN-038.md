# TC-FR-02-LOGIN-038: Kiểm tra thông báo tài khoản bị khóa

## Requirement ID

FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Tài khoản đã đạt ngưỡng khóa |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Thông báo phù hợp; không hiển thị số lần sai hoặc dữ liệu nội bộ

## Status / Related Bugs

Not Run / None
