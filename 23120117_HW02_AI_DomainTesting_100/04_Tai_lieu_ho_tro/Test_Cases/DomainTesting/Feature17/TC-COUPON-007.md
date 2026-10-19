# TC-COUPON-007: Từ chối tạo mã khi thiếu discount_value

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_DISCOUNT_EMPTY` chưa tồn tại.

## Test data
| discount_value | không cung cấp |
| code | `EP_DISCOUNT_EMPTY` |
| type | `fixed` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập các field theo Test data, để trống field `Số tiền (VD: 50000)`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `discount_value`; không khẳng định message.

## Status / Related Bugs
Not Run / None
