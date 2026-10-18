# TC-FR-02-LOGIN-031: Kiểm tra HTML5 với chuỗi không phải email

## Requirement ID

FR-02.6

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Open the web login form in a browser with HTML5 form validation support.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email trên form: `abc`<br>Password hợp lệ |

## Test Steps

1. Inspect the email input type.
2. Enter the Test Data and submit the form.
3. Observe browser validation and whether a request is sent.

## Expected Result

- Trình duyệt từ chối định dạng email

## Status / Related Bugs

Not Run / None
