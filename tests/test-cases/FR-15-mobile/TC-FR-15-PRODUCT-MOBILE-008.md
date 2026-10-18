# TC-FR-15-PRODUCT-MOBILE-008: Chấp nhận giá dương 1 ₫

## Requirement ID

FR-15 (price > 0); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION + MOBILE CATALOG / Functional / Boundary Value Analysis (positive representative)

## Preconditions

- Có token admin hợp lệ và category đang tồn tại.
- Backend và mobile kết nối cùng môi trường test.
- Dùng tên hợp lệ, duy nhất, không quá 255 ký tự.

## Test Data

| Field | Value |
|---|---|
| Name | `FR15 Mobile Price Boundary Positive` |
| Price | 1 VND |
| Category | ID của category có sẵn |

## Test Steps

1. Tạo sản phẩm qua giao diện/API Admin với price `1` và các trường bắt buộc hợp lệ.
2. Xác nhận sản phẩm được lưu.
3. Tải lại catalog mobile, tìm sản phẩm và kiểm tra giá trong danh sách/chi tiết.

## Expected Result

- Giá `1` là số dương nên sản phẩm được chấp nhận.
- Sản phẩm xuất hiện trên mobile với giá tương ứng sau khi tải lại.

## Status / Related Bugs

Not Run / None
