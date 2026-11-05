# TC-BVA-FR07-003: Hiển thị giỏ hàng ngay trên biên với 2 dòng

## Requirement ID
FR-07

## Module / Test type / Technique
Giỏ hàng / Functional / Boundary Value Analysis

## Preconditions
- Hệ thống có ít nhất hai sản phẩm phân biệt có thể dùng để thiết lập giỏ hàng; người dùng có thể mở trang Giỏ hàng. Mỗi test case độc lập và giỏ hàng phải được đưa về đúng số dòng nêu trong test data trước khi kiểm tra.
- Giỏ hàng có Sản phẩm A và B phân biệt.

## Test data
| Boundary | Số dòng sản phẩm phân biệt = 2 (LB+1) |
| Dữ liệu | 2 dòng sản phẩm phân biệt |

## Test steps
1. Thiết lập giỏ hàng có đúng 2 dòng sản phẩm phân biệt.
2. Mở trang Giỏ hàng.
3. Quan sát danh sách và các cột.

## Expected result
Danh sách hiển thị 2 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác.

## Status / Related Bugs
Not Run / None
