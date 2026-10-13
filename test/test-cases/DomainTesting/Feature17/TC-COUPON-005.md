# TC-COUPON-005: Từ chối tạo mã khi thiếu type

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Có token Admin hợp lệ để gọi `POST /api/admin/coupons`.
- `EP_TYPE_EMPTY` chưa tồn tại.

## Test data
| type | `""` |
| code | `EP_TYPE_EMPTY` |
| discount_value | `10` |
| expired_at | `2099-12-31` |
| min_order_amount | `100000` |
| max_uses_per_user | `2` |

## Test steps
1. Gửi `POST /api/admin/coupons` với token Admin và body đúng Test data; chỉ `type` là chuỗi rỗng.

## Expected result
Từ chối tạo vì thiếu `type`; không khẳng định message. Đây là API-level test vì select UI không có lựa chọn rỗng.

## Status / Related Bugs
Not Run / None
