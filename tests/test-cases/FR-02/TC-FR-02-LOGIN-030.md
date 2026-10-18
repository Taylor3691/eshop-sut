# TC-FR-02-LOGIN-030: Kiểm tra HTML5 với email rỗng

## Requirement ID

FR-02.6

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Open the web login form in a browser with HTML5 form validation support.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email trên form: `""`<br>Password hợp lệ |

## Test Steps

1. Inspect the email input type.
2. Enter the Test Data and submit the form.
3. Observe browser validation and whether a request is sent.

## Expected Result

- Form không cho gửi nếu trường bắt buộc

## Status / Related Bugs

Not Run / None
