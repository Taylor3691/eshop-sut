# TC-BVA-FR17-001: Từ chối discount_value bằng 0

## Requirement ID
FR-17

## Module / Test type / Technique
Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis

## Preconditions
- Admin ở chức năng Thêm mã giảm giá.
- `BVA17DV0` chưa tồn tại.

## Test data
| Boundary | `discount_value = 0` (mốc 0 bị loại) |
| code | `BVA17DV0` |
| type | `fixed` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `5` |

## Test steps
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Expected result
Hệ thống từ chối tạo mã giảm giá vì `discount_value` không phải giá trị dương.

## Status / Related Bugs
Not Run / None
