# TC-BVA-COUPON-018: Biên trạng thái kích hoạt nhị phân của mã (is_active = 0 vs is_active = 1)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng đã đăng nhập.
- Có mã `ACTIVE_CODE` (`is_active = 1`) và mã `INACTIVE_CODE` (`is_active = 0`) trong CSDL.
- Cả hai mã đều có cùng hạn dùng và cùng ngưỡng đơn hàng `300,000 ₫`.
- Đơn hàng trị giá `400,000 ₫`.

## Test Data

| Trường | Thử nghiệm A | Thử nghiệm B |
|---|---|---|
| `coupon_code` | `ACTIVE_CODE` (`is_active = 1`) | `INACTIVE_CODE` (`is_active = 0`) |
| `cart_total` | `400,000 ₫` | `400,000 ₫` |

## Test Steps

1. Thử nghiệm A: Nhập mã `ACTIVE_CODE` và nhấn "Áp dụng".
2. Thử nghiệm B: Nhập mã `INACTIVE_CODE` và nhấn "Áp dụng".

## Expected Result

- Thử nghiệm A: Áp dụng thành công vì `is_active = 1` thỏa điều kiện C1.
- Thử nghiệm B: Bị từ chối vì `is_active = 0` vi phạm điều kiện C1; hiển thị mã không tồn tại hoặc đã bị vô hiệu hóa.

## Actual Result

ACTIVE_CODE (is_active=1) áp dụng thành công ("✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 350,000 ₫"); INACTIVE_CODE (is_active=0) bị từ chối chính xác ("Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa").

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-018.png)

## Boundary Rationale

Kiểm tra giá trị biên nhị phân (boolean boundary: 0 vs 1) của trạng thái hoạt động theo điều kiện C1.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
