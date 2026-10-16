# TC-BVA-CAT-007: Độ dài tên danh mục tại đúng biên tối thiểu khi cập nhật (length = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `2` |
| Body `name` | `"X"` (độ dài đúng 1 ký tự) |

## Test Steps

1. Gửi request `PUT /api/categories/2` với payload `{ "name": "X" }`.
2. Kiểm tra mã trạng thái HTTP.
3. Gửi `GET /api/categories` để xác minh tên danh mục `id = 2` sau khi cập nhật.

## Expected Result

- Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`.
- Danh mục `id = 2` có tên mới là `"X"`.

## Actual Result

Cập nhật tên danh mục 1 ký tự "X" thành công, phản hồi HTTP 200 OK {"message": "Category updated"}.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-007.png)

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu (`min_length = 1`) cho thao tác Cập nhật, thuộc miền hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
