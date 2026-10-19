# TC-BVA-FR17-003: Từ chối max_uses_per_user bằng 0

## Requirement ID
FR-17

## Module / Test type / Technique
Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis

## Preconditions
- Admin ở chức năng Thêm mã giảm giá.
- `BVA17MAX0` chưa tồn tại.

## Test data
| Boundary | `max_uses_per_user = 0` (LB-1) |
| code | `BVA17MAX0` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |

## Test steps
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Hệ thống từ chối tạo mã giảm giá vì `max_uses_per_user` nhỏ hơn 1.

## Status / Related Bugs
Not Run / None
