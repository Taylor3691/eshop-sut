# TC-COUPON-014: Xem mã giảm giá hiện có

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin đã mở tab `Mã Giảm Giá`.
- `EP_COUPON_VIEW` tồn tại với một cấu hình coupon hợp lệ đã biết.

## Test data
| Thao tác | Xem |
| Mã | EP_COUPON_VIEW |

## Test steps
1. Mở tab `Mã Giảm Giá` nếu chưa mở.
2. Quan sát bảng coupon và tìm chính xác mã `EP_COUPON_VIEW` trong cột `Mã`.

## Expected result
Admin xem được mã `EP_COUPON_VIEW`; FR-17 không quy định danh sách/chi tiết hoặc cột hiển thị.

## Status / Related Bugs
Not Run / None
