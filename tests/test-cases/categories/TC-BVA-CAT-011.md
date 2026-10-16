# TC-BVA-CAT-011: Mã định danh tại đúng biên nhỏ nhất của cơ sở dữ liệu khi thao tác (id = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` tồn tại trong hệ thống (danh mục đầu tiên được tạo/seed).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` (giá trị ID nhỏ nhất của CSDL) |
| Body `name` | `"Điện thoại di động cao cấp"` |

## Test Steps

1. Gửi request `PUT /api/categories/1` với tên mới hợp lệ.
2. Kiểm tra mã phản hồi HTTP.
3. Xác minh dữ liệu danh mục `id = 1` qua `GET /api/categories`.

## Expected Result

- Hệ thống cập nhật thành công, trả về HTTP 200.
- Bản ghi có `id = 1` được cập nhật chính xác.

## Actual Result

Thao tác cập nhật danh mục tại biên ID hợp lệ nhỏ nhất thực hiện thành công, trả về HTTP 200 OK.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-011.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên ID nhỏ nhất của hệ thống (`min_id = 1`), thuộc miền hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
