# TC-COUPON-010: Từ chối tạo mã khi thiếu min_order_amount

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_MIN_EMPTY` chưa tồn tại.

## Test data
| min_order_amount | không cung cấp |
| code | `EP_MIN_EMPTY` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập các field theo Test data, để trống `Đơn tối thiểu (₫)`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `min_order_amount`.

## Status / Related Bugs
Not Run / None
