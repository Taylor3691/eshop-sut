# TC-CAT-015: Cập nhật tên danh mục thành công với ID tồn tại và tên mới hợp lệ (Admin)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục có `id = 2` đang có tên là `"Laptop"`.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `2` |
| Body `name` | `"Máy tính xách tay & Laptop"` |

## Test Steps

1. Gửi request `PUT /api/categories/2` với tên mới hợp lệ.
2. Kiểm tra phản hồi HTTP từ hệ thống.
3. Gửi `GET /api/categories` để xác minh danh mục ID 2 đã được cập nhật tên mới.

## Expected Result

- Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`.
- Danh mục ID 2 có tên mới là `"Máy tính xách tay & Laptop"`.
- Các danh mục khác giữ nguyên, không bị ảnh hưởng.

## Actual Result

PUT /api/categories/2 trả về HTTP 200 OK {"message": "Category updated"}. Danh mục ID 2 được cập nhật tên mới thành công trong CSDL.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-015.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho thao tác Cập nhật (Update) với ID hợp lệ và tên danh mục mới hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
