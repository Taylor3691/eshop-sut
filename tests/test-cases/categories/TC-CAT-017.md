# TC-CAT-017: Xử lý cập nhật danh mục với ID không tồn tại trong hệ thống

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Không tồn tại danh mục nào có `id = 9999` trong CSDL.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body `name` | `"Tên danh mục mới"` |

## Test Steps

1. Gửi request `PUT /api/categories/9999` với tên hợp lệ.
2. Kiểm tra mã trạng thái HTTP trả về.

## Expected Result

- Hệ thống thông báo không tìm thấy bản ghi cần cập nhật, trả về HTTP 404 Not Found (hoặc thông báo lỗi rõ ràng).
- Không có bản ghi danh mục mới nào bị tạo nhầm.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID 9999 không tồn tại trong CSDL. Hệ thống không kiểm tra this.changes === 0 để trả về 404.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-017.png)

## Coverage Rationale

Kiểm thử miền giá trị khóa chính `id`: ID không tồn tại ngoài phạm vi CSDL (Non-existent ID domain).

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
