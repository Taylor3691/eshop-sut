# TC-CAT-016: Từ chối cập nhật danh mục khi tên mới là chuỗi rỗng hoặc khoảng trắng

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body `name` | `""` (chuỗi rỗng) |

## Test Steps

1. Gửi request `PUT /api/categories/2` với `{ "name": "" }`.
2. Kiểm tra phản hồi lỗi từ server.
3. Gửi `GET /api/categories` xác minh tên danh mục ID 2 vẫn giữ nguyên giá trị cũ.

## Expected Result

- Hệ thống từ chối cập nhật do tên danh mục là bắt buộc và không được để trống (HTTP 400).
- Tên danh mục ID 2 không bị thay đổi thành rỗng trong CSDL.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category updated"} và ghi đè tên danh mục ID 2 thành chuỗi rỗng, vi phạm ràng buộc tên bắt buộc.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-016.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ đối với thao tác Cập nhật khi vi phạm ràng buộc bắt buộc của trường `name`.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
