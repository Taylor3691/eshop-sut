# TC-CART-003: Tăng số lượng khi thêm lại cùng sản phẩm

## Requirement ID
FR-07

## Module / Test type / Technique
Giỏ hàng / Functional / Equivalence Partitioning

## Preconditions
- Giỏ có đúng một dòng A, số lượng 1.
- Đã ghi nhận số dòng và số lượng.

## Test data
| Sản phẩm thêm | A |
| Quan hệ | cùng sản phẩm đã có |

## Test steps
1. Thêm lại A.
2. Quan sát giỏ.
3. So sánh số lượng và số dòng.

## Expected result
Số lượng dòng A tăng, số dòng không đổi, không có dòng A trùng. Mức tăng chưa được quy định.

## Status / Related Bugs
Not Run / None
