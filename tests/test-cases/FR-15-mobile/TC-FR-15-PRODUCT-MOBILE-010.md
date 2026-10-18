# TC-FR-15-PRODUCT-MOBILE-010: Từ chối sản phẩm không có danh mục

## Requirement ID

FR-15 (category required and selected from existing categories); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION / Functional / Equivalence Partitioning

## Preconditions

- Có token admin hợp lệ.
- Ghi nhận số lượng sản phẩm ban đầu hoặc chuẩn bị tên duy nhất để tìm bản ghi.

## Test Data

| Field | Value |
|---|---|
| Name | `FR15 Mobile Missing Category` |
| Price | 100000 |
| Category | Omitted from request |

## Test Steps

1. Gửi request tạo sản phẩm với name và price hợp lệ nhưng không cung cấp trường category.
2. Ghi nhận response và kiểm tra sản phẩm không được lưu.
3. Tải lại catalog mobile và tìm theo tên thử.

## Expected Result

- Hệ thống từ chối sản phẩm không có danh mục.
- Không tạo bản ghi thiếu category và sản phẩm không xuất hiện trên mobile.

## Status / Related Bugs

Not Run / None
