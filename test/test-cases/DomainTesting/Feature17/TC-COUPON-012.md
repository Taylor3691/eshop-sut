# TC-COUPON-012: Từ chối tạo mã khi thiếu max_uses_per_user

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_MAX_EMPTY` chưa tồn tại.

## Test data
| max_uses_per_user | không cung cấp |
| code | `EP_MAX_EMPTY` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |

## Test steps
1. Nhập các field theo Test data, để trống `Số lần dùng tối đa/người`.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `max_uses_per_user`.

## Status / Related Bugs
Not Run / None
