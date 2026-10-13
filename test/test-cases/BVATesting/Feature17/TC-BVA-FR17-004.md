# TC-BVA-FR17-004: Tạo mã với max_uses_per_user bằng 1

## Requirement ID
FR-17

## Module / Test type / Technique
Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis

## Preconditions
- Admin ở chức năng Thêm mã giảm giá.
- `BVA17MAX1` chưa tồn tại.

## Test data
| Boundary | `max_uses_per_user = 1` (LB) |
| code | `BVA17MAX1` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |

## Test steps
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Mã giảm giá được tạo thành công vì `max_uses_per_user = 1` nằm đúng tại giới hạn dưới và các input khác hợp lệ.

## Status / Related Bugs
Not Run / None
