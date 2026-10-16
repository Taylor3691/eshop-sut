# TC-MOB-FORGOT-029: Điều hướng quay lại Bước 1 từ Bước 2 bằng nút "← Quay lại"

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đã hoàn thành Bước 1 với email `test@eshop.com` và đang ở Bước 2 (`forgotStep === 2`).

## Test Data

| Trường / Thao tác  | Giá trị                                    |
| ------------------ | ------------------------------------------ |
| Màn hình           | Quên mật khẩu (Bước 2)                     |
| Thao tác tương tác | Nhấn nút "← Quay lại" (`setForgotStep(1)`) |

## Test Steps

1. Tại màn hình Bước 2, nhấn vào nút "← Quay lại".
2. Quan sát sự thay đổi của giao diện ứng dụng.
3. Kiểm tra giá trị ô nhập email tại Bước 1.

## Expected Result

- Giao diện chuyển đổi trạng thái trở lại Bước 1 (`forgotStep = 1`).
- Form Bước 2 (ô OTP, mật khẩu mới) được ẩn đi; form Bước 1 (ô email, nút "Lấy mã OTP") hiển thị trở lại.
- Giá trị email đã nhập trước đó (`test@eshop.com`) vẫn được lưu giữ trong state `forgotEmail`, không bị mất trắng.

## Actual Result

Nút quay lại Bước 2 về Bước 1 và giữ email.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-007.png)

## Coverage Rationale

Kiểm thử điều hướng quay lại giữa các bước (Step-back Navigation & Form State Retention) trong quy trình Quên mật khẩu.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
