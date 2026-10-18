# TC-FR-15-PRODUCT-MOBILE-004: Sản phẩm đã xóa không còn trong catalog mobile

## Requirement ID

FR-15 (Delete / View)

## Module / Test Type / Technique

PRODUCT-MOBILE / Functional / State Partition

## Preconditions

- Backend và mobile hoạt động.
- Có sản phẩm thử trong catalog; ghi lại ID, tên và dữ liệu để xác định đúng sản phẩm.
- Admin có quyền xóa sản phẩm.

## Test Data

| Field | Value |
|---|---|
| Product ID | ID sản phẩm thử |
| Product name | Tên sản phẩm dùng tìm kiếm/đối chiếu |
| Initial state | Sản phẩm tồn tại và hiển thị trên mobile |
| State after Admin delete | Sản phẩm đã bị xóa |

## Test Steps

1. Xác nhận sản phẩm thử đang hiển thị trên mobile.
2. Trên giao diện Admin, xóa đúng sản phẩm thử.
3. Tải lại catalog mobile hoặc thực hiện lại tìm kiếm sản phẩm.
4. Ghi nhận kết quả; không yêu cầu hành vi cụ thể nếu mở lại một màn hình chi tiết cũ đang được giữ trong bộ nhớ.

## Expected Result

- Sau khi catalog được tải lại, sản phẩm đã xóa không còn xuất hiện trong danh sách.
- Sản phẩm đối chứng vẫn hiển thị.

## Status / Related Bugs

Not Run / None
