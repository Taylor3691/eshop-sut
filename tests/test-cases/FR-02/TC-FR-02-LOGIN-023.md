# TC-FR-02-LOGIN-023: Kiểm tra JWT rỗng

## Requirement ID

FR-02.4

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare an API that requires authentication.
- Obtain or prepare the token/header specified in Test Data; do not expose real tokens in evidence.

## Test Data

| Field | Value |
|---|---|
| Input / state | Đăng nhập thành công<br>Kiểm tra trường `token` |

## Test Steps

1. Prepare the token/header specified in Test Data.
2. Call the protected API or inspect the client request.
3. Record the response status and accessible data.

## Expected Result

- Trường token không được rỗng

## Status / Related Bugs

Not Run / None
