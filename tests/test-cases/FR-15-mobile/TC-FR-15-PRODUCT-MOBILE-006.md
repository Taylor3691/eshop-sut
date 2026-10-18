# TC-FR-15-PRODUCT-MOBILE-006: Từ chối tên sản phẩm dài 256 ký tự

## Requirement ID

FR-15 (name maximum length 255); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION + MOBILE CATALOG / Functional / Boundary Value Analysis

## Preconditions

- Có token admin hợp lệ và category đang tồn tại.
- Backend và mobile kết nối cùng môi trường test.
- Chuẩn bị một tên duy nhất có đúng 256 ký tự.

## Test Data

| Field | Value |
|---|---|
| Name | 256 ASCII characters |
| Price | 100000 |
| Category | ID của category có sẵn |

## Test Steps

1. Gửi request tạo sản phẩm với tên dài 256 ký tự, giá dương và category hợp lệ.
2. Ghi nhận phản hồi và kiểm tra sản phẩm có được lưu hay không.
3. Tải lại catalog mobile và tìm theo đoạn đầu tên duy nhất.

## Expected Result

- Request bị từ chối theo giới hạn tên tối đa 255 ký tự.
- Không tạo sản phẩm 256 ký tự; sản phẩm đó không xuất hiện trong catalog mobile.

## Status / Related Bugs

Not Run / None
