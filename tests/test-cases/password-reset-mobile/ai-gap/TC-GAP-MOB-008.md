# TC-GAP-MOB-008: Độ dài mã OTP sinh ra trên Backend và nhãn UI là 4 chữ số thay vì 6 chữ số

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng gửi yêu cầu lấy OTP cho tài khoản `test@eshop.com`.

## Test Data

| Field | Value |
|---|---|
| Endpoint API | `POST /api/forgot-password` |
| `email` | `"test@eshop.com"` |

## Test Steps

1. Gửi yêu cầu `POST /api/forgot-password`.
2. Kiểm tra độ dài và giá trị của chuỗi `resetToken` trong phản hồi API.
3. Quan sát nhãn của trường nhập mã OTP trên màn hình Bước 2 của Mobile App.

## Expected Result

- Theo đặc tả FR-03: *"Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên"*.
- Mã OTP phải gồm đúng 6 chữ số và nhãn giao diện phải ghi "Mã OTP (6 số)".

## Actual Result

Backend sinh mã 4 chữ số (`"6027"`); nhãn UI ghi `Mã OTP (4 số)`

## Missing Scenario

Kiểm tra độ dài thực tế của mã OTP được sinh ra từ backend và nhãn trường nhập liệu tương ứng trên giao diện Mobile App.

## Gap Rationale

AI thiết kế ban đầu chỉ phân loại các mã < 6 chữ số vào lớp không hợp lệ, không ngờ rằng mã nguồn thực tế tại `backend/server.js:72` lại dùng công thức `Math.floor(1000 + Math.random() * 9000)` chỉ sinh mã 4 chữ số, và nhãn trên mobile tại `frontend-mobile/App.js:862` ghi thẳng `Mã OTP (4 số)`.

## Status / Related Bugs

FAIL / DEF-FR03-01 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
