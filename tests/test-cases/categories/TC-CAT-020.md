# TC-CAT-020: Kiểm tra ràng buộc toàn vẹn khi xóa danh mục đang có sản phẩm liên kết

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` (`"Điện thoại"`) đang có ít nhất 2 sản phẩm liên kết (`iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` có `category_id = 1`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` |

## Test Steps

1. Gửi request `DELETE /api/categories/1` kèm token Admin.
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra danh sách sản phẩm `GET /api/products` xem các sản phẩm thuộc danh mục 1 có bị xóa mất hay trở thành mồ côi (orphaned).

## Expected Result

- Theo chuẩn toàn vẹn dữ liệu: Hệ thống phải từ chối xóa hoặc cảnh báo lỗi xung đột ràng buộc (HTTP 400 hoặc 409 Conflict): *"Không thể xóa danh mục đang có sản phẩm liên kết"*.
- Hoặc nếu cho phép xóa: Hệ thống phải có chính sách xử lý rõ ràng (SET NULL hoặc xóa có xác nhận), không làm lỗi hiển thị catalog sản phẩm.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa mất danh mục ID 1. Toàn bộ 2 sản phẩm liên kết bị mồ côi (category_id = 1 không còn tồn tại).

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-020.png)

## Coverage Rationale

Kiểm thử ràng buộc toàn vẹn dữ liệu quan hệ (Referential Integrity Constraint) giữa bảng `categories` và bảng `products`.

## Status / Related Bugs

FAIL / DEF-FR14-05 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
