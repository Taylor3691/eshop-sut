# TC-FR-02-LOGIN-029: Kiểm tra trường email dùng HTML5 email

## Requirement ID

FR-02.6

## Module / Test Type / Technique

AUTHENTICATION / Functional / Equivalence Partitioning

## Preconditions

- Open the web login form in a browser with HTML5 form validation support.

## Test Data

| Field | Value |
|---|---|
| Input / state | Mở form đăng nhập<br>Kiểm tra thuộc tính input email |

## Test Steps

1. Inspect the email input type.
2. Enter the Test Data and submit the form.
3. Observe browser validation and whether a request is sent.

## Expected Result

- Trường email có `type="email"`

## Status / Related Bugs

Not Run / None
