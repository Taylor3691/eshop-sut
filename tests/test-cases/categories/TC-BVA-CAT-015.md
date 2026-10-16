# TC-BVA-CAT-015: Biên số lượng sản phẩm liên kết bằng 0 khi xóa danh mục (product_count = 0)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Một danh mục mới được tạo (ví dụ `id = 5`, tên `"Gia dụng"`) và có chính xác 0 sản phẩm nào liên kết (`product_count = 0`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/5` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `5` |

## Test Steps

1. Xác nhận không có sản phẩm nào có `category_id = 5` trong bảng `products`.
2. Gửi request `DELETE /api/categories/5`.
3. Kiểm tra mã phản hồi HTTP và kiểm tra danh sách qua `GET /api/categories`.

## Expected Result

- Hệ thống xóa thành công do không có ràng buộc phụ thuộc dữ liệu nào, trả về HTTP 200.
- Danh mục `id = 5` bị xóa hoàn toàn khỏi cơ sở dữ liệu.

## Actual Result

Xóa danh mục độc lập có 0 sản phẩm liên kết thành công, trả về HTTP 200 OK {"message": "Category deleted"}.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-015.png)

## Boundary Rationale

Kiểm tra tại điểm biên phụ thuộc dữ liệu: Số lượng sản phẩm liên kết bằng 0 (`product_count = 0`), là trạng thái xóa độc lập an toàn tuyệt đối.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
