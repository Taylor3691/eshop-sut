# TC-BVA-COUPON-015: Biên giá trị thanh toán cuối cùng đạt chính xác 0 ₫ (total_amount == discount_value)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / BVA

## Preconditions

- Người dùng đã đăng nhập.
- Mã giảm giá loại `fixed` có giá trị giảm `100,000 ₫` và `min_order_amount = 100,000 ₫`.
- Đơn hàng có tổng tiền đúng bằng giá trị giảm: `100,000 ₫`.

## Test Data

| Field | Value |
|---|---|
| `cart_total` | `100,000 ₫` |
| `discount_value` | `100,000 ₫` (loại fixed) |

## Test Steps

1. Tạo đơn hàng trị giá `100,000 ₫`.
2. Nhập mã giảm giá và áp dụng.

## Expected Result

- `discount_amount = 100,000 ₫`.
- `final_amount = 100,000 - 100,000 = 0 ₫`.
- Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không gây lỗi số học hoặc số âm.

## Actual Result

Bị từ chối do lỗi biên ngưỡng tối thiểu: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Hệ thống không áp dụng được tại ngưỡng 100,000 ₫ để đạt 0 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-COUPON-015.png)

## Boundary Rationale

Kiểm tra giá trị biên cực tiểu của số tiền thanh toán cuối cùng (`final_amount = 0 ₫`).

## Status / Related Bugs

FAIL / DEF-FR09-02 — see [execution report](../../../reports/test-results/FR-09/bva_testing_report.md).
