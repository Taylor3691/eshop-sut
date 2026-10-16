# TC-BVA-CAT-016: Biên số lượng sản phẩm liên kết bằng 1 khi xóa danh mục (product_count = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Tạo một danh mục mới (ví dụ `id = 6`, tên `"Sách"`) và tạo đúng 1 sản phẩm liên kết với nó (`category_id = 6`, `product_count = 1`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/6` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `6` |

## Test Steps

1. Xác nhận có đúng 1 sản phẩm thuộc danh mục `id = 6`.
2. Gửi request `DELETE /api/categories/6` bằng tài khoản Admin.
3. Kiểm tra phản hồi HTTP từ server.
4. Kiểm tra trạng thái của sản phẩm liên kết trong bảng `products`.

## Expected Result

- Theo tiêu chuẩn toàn vẹn dữ liệu quan hệ: Hệ thống phải phát hiện có sản phẩm liên kết và từ chối xóa (HTTP 400 hoặc 409 Conflict), hoặc thông báo yêu cầu chuyển/xóa sản phẩm trước.
- Không để xảy ra tình trạng sản phẩm bị mồ côi (orphaned foreign key) làm hỏng hiển thị danh mục sản phẩm.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục dù có 1 sản phẩm liên kết. Sản phẩm ID #6 bị mồ côi (orphaned) do thiếu ràng buộc khóa ngoại.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-016.png)

## Boundary Rationale

Kiểm tra tại điểm biên phụ thuộc dữ liệu bắt đầu xuất hiện ràng buộc liên kết: Số lượng sản phẩm liên kết bằng 1 (`product_count = 1`).

## Status / Related Bugs

FAIL / DEF-FR14-05 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
