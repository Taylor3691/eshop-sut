# TC-COUPON-002: Tạo mã giảm giá loại fixed

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_FIXED_NEW` chưa tồn tại.

## Test data
| code | EP_FIXED_NEW |
| type | `fixed` |
| discount_value | 50000 |
| expired_at | 2027-12-31 |
| min_order_amount | 100000 |
| max_uses_per_user | 2 |

## Test steps
1. Nhập `EP_FIXED_NEW` vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào các field tương ứng.
2. Bấm `Tạo mã`.
3. Kiểm tra bảng hiển thị mã mới với Loại là `Cố định`.

## Expected result
Mã loại `fixed` được tạo. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
