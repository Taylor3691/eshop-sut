# TC-FR-02-LOGIN-040: Kiểm tra lỗi không làm lộ số lần sai

## Requirement ID

FR-02 failed-login response

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Đăng nhập sai đến ngưỡng khóa |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Không trả thông báo như `Bạn đã sai 3 lần`

## Status / Related Bugs

Not Run / None
