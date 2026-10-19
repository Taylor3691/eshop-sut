# TC-COUPON-009: Từ chối tạo mã khi thiếu expired_at

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_EXPIRED_EMPTY` chưa tồn tại.

## Test data
| expired_at | không cung cấp |
| code | `EP_EXPIRED_EMPTY` |
| type | `fixed` |
| discount_value | `10` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập các field theo Test data, để trống input ngày `Ngày hết hạn`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `expired_at`; không khẳng định format/message.

## Status / Related Bugs
Not Run / None
