# TC-BVA-CAT-008: Độ dài tên danh mục ngay trên biên tối thiểu khi cập nhật (length = 2)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 3` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/3` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `3` |
| Body `name` | `"PK"` (độ dài đúng 2 ký tự) |

## Test Steps

1. Gửi request `PUT /api/categories/3` với payload `{ "name": "PK" }`.
2. Kiểm tra phản hồi HTTP từ hệ thống.
3. Gửi `GET /api/categories` để kiểm tra tên mới của danh mục `id = 3`.

## Expected Result

- Hệ thống xử lý cập nhật thành công, trả về HTTP 200.
- Danh mục `id = 3` được đổi tên thành `"PK"`.

## Actual Result

Cập nhật tên danh mục 2 ký tự "XY" thành công, phản hồi HTTP 200 OK {"message": "Category updated"}.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-008.png)

## Boundary Rationale

Kiểm tra giá trị ngay trên ngưỡng biên tối thiểu (`min_length + 1 = 2`) cho thao tác Cập nhật.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
