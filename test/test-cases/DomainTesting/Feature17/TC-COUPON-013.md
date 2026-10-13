# TC-COUPON-013: Từ chối max_uses_per_user nhỏ hơn 1

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_MAX_ZERO` chưa tồn tại.

## Test data
| max_uses_per_user | 0 |
| code | `EP_MAX_ZERO` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |

## Test steps
1. Nhập `0` vào `Số lần dùng tối đa/người` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `max_uses_per_user < 1`.

## Status / Related Bugs
Not Run / None
