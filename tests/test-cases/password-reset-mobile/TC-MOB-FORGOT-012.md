# TC-MOB-FORGOT-012: Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 2 theo đặc tả FR-03

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).

## Test Data

| Trường / Thao tác   | Giá trị                   |
| ------------------- | ------------------------- |
| Màn hình            | Quên mật khẩu (Bước 2)    |
| Thành phần kiểm tra | Chỉ báo bước "Bước 2 / 2" |

## Test Steps

1. Điều hướng đến màn hình Bước 2 sau khi lấy OTP.
2. Quan sát toàn bộ giao diện từ tiêu đề đến các nút hành động.
3. Kiểm tra sự xuất hiện của nhãn chỉ báo "Bước 2 / 2" (hoặc "Step 2/2").

## Expected Result

- Theo đặc tả FR-03 và FR-22: Giao diện Bước 2 phải hiển thị chỉ báo bước rõ ràng "Bước 2 / 2" nhằm đồng bộ trải nghiệm người dùng trên biểu mẫu 2 bước.

## Actual Result

Không hiển thị chỉ báo bước tại Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử tuân thủ đặc tả giao diện (GUI Step Indicator Compliance) tại giai đoạn xác nhận mật khẩu mới.

## Status / Related Bugs

FAIL / D-FR03-MOB-001 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
