# TC-FR-15-PRODUCT-MOBILE-007: Từ chối tên sản phẩm rỗng

## Requirement ID

FR-15 (name required); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION / Functional / Equivalence Partitioning

## Preconditions

- Có token admin hợp lệ và category đang tồn tại.
- Ghi nhận số lượng sản phẩm hoặc xác định cách tìm sản phẩm mới trước khi thử.

## Test Data

| Field | Value |
|---|---|
| Name | Empty string `""` |
| Price | 100000 |
| Category | ID của category có sẵn |

## Test Steps

1. Gửi request tạo sản phẩm với name rỗng, giá dương và category hợp lệ.
2. Ghi nhận response và kiểm tra không có sản phẩm mới được lưu.
3. Tải lại catalog mobile và xác nhận không có sản phẩm mới thiếu tên.

## Expected Result

- Hệ thống từ chối dữ liệu vì tên sản phẩm là bắt buộc.
- Không tạo sản phẩm không tên và không hiển thị sản phẩm đó trên mobile.

## Status / Related Bugs

Not Run / None
