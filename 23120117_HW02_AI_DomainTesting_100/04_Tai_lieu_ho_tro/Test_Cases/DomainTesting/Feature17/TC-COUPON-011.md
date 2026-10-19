# TC-COUPON-011: Từ chối min_order_amount âm

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_MIN_NEG` chưa tồn tại.

## Test data
| min_order_amount | -1000 |
| code | `EP_MIN_NEG` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập `-1000` vào `Đơn tối thiểu (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `min_order_amount < 0`.

## Status / Related Bugs
Not Run / None
