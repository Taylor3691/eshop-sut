# TC-COUPON-004: Từ chối tạo mã với code đã tồn tại

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.
- `EP_COUPON_EXISTING` đã tồn tại.

## Test data
| code | EP_COUPON_EXISTING |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Nhập `EP_COUPON_EXISTING` vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì `code` không duy nhất; không khẳng định message.

## Status / Related Bugs
Not Run / None
