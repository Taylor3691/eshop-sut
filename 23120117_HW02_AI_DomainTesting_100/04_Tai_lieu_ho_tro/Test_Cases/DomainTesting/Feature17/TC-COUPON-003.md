# TC-COUPON-003: Từ chối tạo mã khi thiếu code

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin ở chức năng Thêm.

## Test data
| code | `""` |
| type | `fixed` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Để trống `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Expected result
Từ chối tạo vì thiếu `code`; không khẳng định message.

## Status / Related Bugs
Not Run / None
