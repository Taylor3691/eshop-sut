# TC-FR-15-PRODUCT-MOBILE-002: Thay đổi sản phẩm được phản ánh trên mobile

## Requirement ID

FR-15 (Update / View)

## Module / Test Type / Technique

PRODUCT-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Backend và mobile hoạt động; có sản phẩm thử hiện trong catalog.
- Ghi nhận ID, tên và giá hiện tại của sản phẩm.
- Admin có quyền sửa sản phẩm.

## Test Data

| Field | Value |
|---|---|
| Product ID | ID sản phẩm thử đã ghi nhận |
| Updated name | `Mobile FR15 Test Product A Updated` |
| Updated price | `135000` |

## Test Steps

1. Trên giao diện Admin, sửa tên và giá của sản phẩm đã ghi nhận.
2. Tải lại catalog trên mobile.
3. Tìm sản phẩm theo tên mới và mở trang chi tiết.

## Expected Result

- Catalog mobile hiển thị tên mới và không còn hiển thị tên cũ cho sản phẩm đó.
- Trang chi tiết hiển thị giá mới `135000`.

## Status / Related Bugs

Not Run / None
