# TC-BVA-CAT-006: Độ dài tên danh mục dưới biên tối thiểu khi cập nhật (length = 0, chuỗi rỗng)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục có `id = 1` tồn tại trong hệ thống (tên ban đầu `"Điện thoại"`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` |
| Body `name` | `""` (độ dài chuỗi bằng 0) |

## Test Steps

1. Gửi request `PUT /api/categories/1` với payload `{ "name": "" }`.
2. Kiểm tra mã lỗi trả về từ máy chủ.
3. Gửi request `GET /api/categories` để xác minh tên danh mục `id = 1` có bị đổi thành chuỗi rỗng hay không.

## Expected Result

- Hệ thống từ chối cập nhật do vi phạm ràng buộc tên danh mục không được để trống.
- Trả về mã lỗi HTTP 400 Bad Request.
- Tên danh mục `id = 1` trong CSDL được giữ nguyên là `"Điện thoại"`.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category updated"} và cập nhật tên thành chuỗi rỗng. Thiếu validate độ dài tối thiểu khi update.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-006.png)

## Boundary Rationale

Kiểm tra biên dưới mức tối thiểu (`min_length - 1 = 0`) cho thao tác Cập nhật (Update), thuộc miền không hợp lệ.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
