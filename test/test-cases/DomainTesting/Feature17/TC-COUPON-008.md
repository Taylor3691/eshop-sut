# TC-COUPON-008: Từ chối discount_value không dương

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_DISCOUNT_NEG` chưa tồn tại.

## Test data
| discount_value | -10 |
| code | `EP_DISCOUNT_NEG` |
| type | `fixed` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập `-10` vào `Số tiền (VD: 50000)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `discount_value` không dương.

## Status / Related Bugs
Not Run / None
