# TC-COUPON-015: Kiểm thử độ chính xác công thức tính giảm giá cố định (Fixed Calculation)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / Domain Testing

## Preconditions

- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `BIGBUY` có `type = 'fixed'` và `discount_value = 50,000`.

## Test Data

| Field | Value |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `750,000 ₫` |

## Test Steps

1. Tạo đơn hàng trị giá `750,000 ₫`.
2. Áp dụng mã `BIGBUY`.

## Expected Result

- `discount_amount = 50,000 ₫`.
- `final_amount = 750,000 - 50,000 = 700,000 ₫`.

## Actual Result

Áp dụng giảm cố định chính xác: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 700,000 ₫". Tiết kiệm đúng 50,000 ₫, thành tiền 700,000 ₫.

## Evidence

- [Screenshot evidence](screenshots/TC-COUPON-015.png)

## Coverage Rationale

Kiểm thử tính đúng đắn của công thức tính toán giảm giá cố định theo đặc tả FR-09.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-09/domain_testing_report.md).
