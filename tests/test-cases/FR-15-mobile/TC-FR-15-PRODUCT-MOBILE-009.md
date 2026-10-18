# TC-FR-15-PRODUCT-MOBILE-009: Từ chối giá bằng hoặc nhỏ hơn 0

## Requirement ID

FR-15 (price > 0); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION / Functional / Boundary Value Analysis + Equivalence Partitioning

## Preconditions

- Có token admin hợp lệ và category đang tồn tại.
- Ghi nhận số sản phẩm ban đầu để kiểm tra không phát sinh bản ghi.
- Dùng tên khác nhau, hợp lệ và duy nhất cho từng lần thử.

## Test Data

| Attempt | Name | Price | Category |
|---|---|---:|---|
| At boundary | `FR15 Mobile Price Zero` | 0 | Existing category ID |
| Below boundary | `FR15 Mobile Price Negative` | -1 | Existing category ID |

## Test Steps

1. Gửi request tạo sản phẩm với giá `0`; ghi nhận phản hồi và trạng thái lưu.
2. Gửi request thứ hai với giá `-1`; ghi nhận phản hồi và trạng thái lưu.
3. Tải lại catalog mobile và tìm theo hai tên thử.

## Expected Result

- Cả hai giá trị đều bị từ chối vì không lớn hơn 0.
- Không tạo sản phẩm với giá `0` hoặc `-1`; cả hai không xuất hiện trên mobile.

## Status / Related Bugs

Not Run / None
