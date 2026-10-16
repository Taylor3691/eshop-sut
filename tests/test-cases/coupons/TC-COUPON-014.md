# TC-COUPON-014: Kiểm thử độ chính xác công thức tính giảm giá phần trăm (Percent Calculation)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `type = 'percent'` và `discount_value = 10`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `1,250,000 ₫` |

## Test Steps

1. Tạo đơn hàng trị giá `1,250,000 ₫`.
2. Áp dụng mã `SAVE10`.

## Expected Result

- `discount_amount` tính đúng theo công thức: `1,250,000 × 10 / 100 = 125,000 ₫`.
- `final_amount` tính đúng theo công thức: `1,250,000 - 125,000 = 1,125,000 ₫`.
- Giá trị giảm giá phải là số dương, không được âm.

## Actual Result

Công thức phần trăm sai nghiêm trọng: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -11,250,000 ₫ Thành tiền: 12,500,000 ₫". Giảm giá -11,250,000 ₫ thay vì 125,000 ₫; tổng tiền thành 12,500,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-014.png)

## Coverage Rationale

Kiểm thử tính đúng đắn của công thức tính toán giảm giá phần trăm theo đặc tả FR-09.

## Status / Related Bugs

FAIL / DEF-FR09-01 — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
