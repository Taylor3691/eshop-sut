# TC-FR-02-LOGIN-035: Kiểm tra response thành công có JWT rỗng

## Requirement ID

FR-02.4

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare the login/API response described in Test Data and a way to inspect the HTTP response and client state.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email và password hợp lệ<br>`token: ""` |

## Test Steps

1. Perform the login/request using the Test Data.
2. Inspect the HTTP response and client state where applicable.
3. Check the message and sensitive data against Expected Result.

## Expected Result

- Response không được coi là hợp lệ

## Status / Related Bugs

Not Run / None
