# TC-BVA-FR07-001: Hiển thị giỏ hàng trống tại biên 0 dòng

## Requirement ID
FR-07

## Module / Test type / Technique
Giỏ hàng / Functional / Boundary Value Analysis

## Preconditions
- Hệ thống có ít nhất hai sản phẩm phân biệt có thể dùng để thiết lập giỏ hàng; người dùng có thể mở trang Giỏ hàng. Mỗi test case độc lập và giỏ hàng phải được đưa về đúng số dòng nêu trong test data trước khi kiểm tra.
- Giỏ hàng không có sản phẩm.

## Test data
| Boundary | Số dòng sản phẩm phân biệt = 0 (LB-1) |

## Test steps
1. Thiết lập giỏ hàng có 0 dòng sản phẩm.
2. Mở trang Giỏ hàng.
3. Quan sát nội dung hiển thị.

## Expected result
Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống.

## Status / Related Bugs
Not Run / None
