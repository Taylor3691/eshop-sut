# TC-FR-02-LOGIN-025: Kiểm tra header không có token

## Requirement ID

FR-02.5

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Prepare an API that requires authentication.
- Obtain or prepare the token/header specified in Test Data; do not expose real tokens in evidence.

## Test Data

| Field | Value |
|---|---|
| Input / state | Gọi API cần xác thực<br>Không gửi `Authorization` |

## Test Steps

1. Prepare the token/header specified in Test Data.
2. Call the protected API or inspect the client request.
3. Record the response status and accessible data.

## Expected Result

- Request bị từ chối xác thực

## Status / Related Bugs

Not Run / None
