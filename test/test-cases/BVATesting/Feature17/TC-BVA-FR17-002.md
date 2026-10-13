# TC-BVA-FR17-002: Tạo mã với min_order_amount bằng 0

## Requirement ID
FR-17

## Module / Test type / Technique
Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis

## Preconditions
- Admin ở chức năng Thêm mã giảm giá.
- `BVA17MIN0` chưa tồn tại.

## Test data
| Boundary | `min_order_amount = 0` (LB) |
| code | `BVA17MIN0` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| max_uses_per_user | `5` |

## Test steps
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Mã giảm giá được tạo thành công vì `min_order_amount = 0` thỏa `>= 0` và các input khác hợp lệ.

## Status / Related Bugs
Not Run / None
