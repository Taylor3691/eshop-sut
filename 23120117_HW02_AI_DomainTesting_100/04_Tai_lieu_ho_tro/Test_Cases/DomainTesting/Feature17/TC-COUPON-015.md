# TC-COUPON-015: Xóa mã giảm giá hiện có

## Requirement ID
FR-17

## Module / Test type / Technique
Coupon / Functional / Equivalence Partitioning

## Preconditions
- Admin đã mở tab `Mã Giảm Giá`.
- `EP_COUPON_DELETE` tồn tại với một cấu hình coupon hợp lệ đã biết.

## Test data
| Thao tác | Xóa |
| Mã | EP_COUPON_DELETE |

## Test steps
1. Trong đúng hàng có mã `EP_COUPON_DELETE`, bấm nút `Xóa`.
2. Thực hiện theo UI hiện có; chỉ xử lý xác nhận nếu UI thực sự hiển thị.
3. Kiểm tra `EP_COUPON_DELETE` không còn trong bảng coupon.

## Expected result
Mã đích được xóa; FR-17 không quy định dialog/message.

## Status / Related Bugs
Not Run / None
