# TC-FR-15-PRODUCT-MOBILE-003: Sửa một sản phẩm không làm thay đổi sản phẩm khác

## Requirement ID

FR-15 (Update isolation)

## Module / Test Type / Technique

PRODUCT-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Backend và mobile hoạt động.
- Có hai sản phẩm thử riêng biệt: sản phẩm A sẽ sửa và sản phẩm B dùng đối chứng.
- Ghi lại ID, tên và giá của cả A và B trên mobile trước khi sửa.
- Admin có quyền sửa sản phẩm.

## Test Data

| Field | Value |
|---|---|
| Target product | Sản phẩm A |
| Control product | Sản phẩm B |
| Change | Đổi tên và giá của A; không thao tác với B |

## Test Steps

1. Trên Admin, sửa tên và giá sản phẩm A.
2. Không chỉnh sửa sản phẩm B.
3. Tải lại catalog mobile và kiểm tra cả A lẫn B; mở chi tiết để xác nhận dữ liệu.

## Expected Result

- Mobile phản ánh dữ liệu mới của A.
- Tên và giá của B không thay đổi.

## Status / Related Bugs

Not Run / None
