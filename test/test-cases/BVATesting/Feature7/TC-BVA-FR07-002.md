# TC-BVA-FR07-002: Hiển thị giỏ hàng tại biên 1 dòng

## Requirement ID
FR-07

## Module / Test type / Technique
Giỏ hàng / Functional / Boundary Value Analysis

## Preconditions
- Theo tiền điều kiện chung; giỏ hàng có Sản phẩm A

## Test data
| Boundary | Số dòng sản phẩm phân biệt = 1 (LB) |
| Dữ liệu | 1 dòng Sản phẩm A |

## Test steps
1. Thiết lập giỏ hàng có đúng 1 dòng sản phẩm.
2. Mở trang Giỏ hàng.
3. Quan sát danh sách và các cột.

## Expected result
Danh sách hiển thị 1 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác.

## Status / Related Bugs
Not Run / None
