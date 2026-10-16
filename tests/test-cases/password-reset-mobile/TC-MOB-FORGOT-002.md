# TC-MOB-FORGOT-002: Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 1 theo đặc tả FR-03

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu tại Bước 1 (`forgotStep === 1`).

## Test Data

| Trường / Thao tác   | Giá trị                       |
| ------------------- | ----------------------------- |
| Màn hình            | Quên mật khẩu (Bước 1)        |
| Thành phần kiểm tra | Chỉ báo bước (Step Indicator) |

## Test Steps

1. Điều hướng đến màn hình Quên mật khẩu (Bước 1).
2. Quan sát toàn bộ giao diện từ tiêu đề đến nút "Lấy mã OTP".
3. Kiểm tra sự xuất hiện của thông tin chỉ báo tiến trình bước (ví dụ: "Bước 1 / 2" hoặc "Step 1/2").

## Expected Result

- Theo đặc tả FR-03: Giao diện phải hiển thị rõ ràng chỉ báo bước "Bước 1 / 2" (hoặc "Step 1/2") giúp người dùng nhận biết tiến trình 2 bước.
- Các thành phần giao diện không bị che khuất hoặc lỗi hiển thị layout.

## Actual Result

Không hiển thị chỉ báo bước tại Bước 1.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-001.png)

## Coverage Rationale

Kiểm thử tuân thủ yêu cầu giao diện (GUI Requirement Compliance) đối với thành phần chỉ báo bước quy định bắt buộc tại FR-03 và FR-22.

## Status / Related Bugs

FAIL / D-FR03-MOB-001 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
