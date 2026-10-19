# TC-COUPON-001: Tạo mã giảm giá loại percent

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_PERCENT_NEW` chưa tồn tại.

## Test data
| code | EP_PERCENT_NEW |
| type | `percent` |
| discount_value | 10 |
| expired_at | 2027-12-31 |
| min_order_amount | 100000 |
| max_uses_per_user | 2 |

## Test steps
1. Nhập `EP_PERCENT_NEW` vào `Mã coupon (VD: SAVE10)`, chọn `Phần trăm (%)`, rồi nhập các giá trị Test data vào các field tương ứng.
2. Bấm `Tạo mã`.
3. Kiểm tra bảng hiển thị mã mới với Loại là `Phần trăm`.

## Expected result
Mã loại `percent` được tạo. Message cụ thể chưa được mô tả.

## Status / Related Bugs
Not Run / None
