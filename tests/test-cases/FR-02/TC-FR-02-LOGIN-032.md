# TC-FR-02-LOGIN-032: Kiểm tra HTML5 với email hợp lệ

## Requirement ID

FR-02.6

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Open the web login form in a browser with HTML5 form validation support.

## Test Data

| Field | Value |
|---|---|
| Input / state | Email trên form: `abc@example.com`<br>Password hợp lệ |

## Test Steps

1. Inspect the email input type.
2. Enter the Test Data and submit the form.
3. Observe browser validation and whether a request is sent.

## Expected Result

- Trình duyệt chấp nhận định dạng email

## Status / Related Bugs

Not Run / None
