# TC-BVA-CAT-003: Độ dài tên danh mục ngay trên biên tối thiểu khi tạo mới (length = 2)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Chưa tồn tại danh mục có tên `"TB"` trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"TB"` (độ dài đúng 2 ký tự) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "TB" }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Xác minh sự tồn tại của danh mục `"TB"` trong cơ sở dữ liệu qua `GET /api/categories`.

## Expected Result

- Hệ thống xử lý thành công, trả về HTTP 200 kèm `id` danh mục mới.
- Danh mục `"TB"` được lưu trữ đầy đủ và hiển thị chính xác trong danh sách danh mục.

## Actual Result

Tạo danh mục 2 ký tự ngay trên biên tối thiểu thành công, trả về HTTP 200 OK {"message": "Category created", "id": 23}.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-003.png)

## Boundary Rationale

Kiểm tra giá trị ngay trên ngưỡng biên tối thiểu (`min_length + 1 = 2`), thuộc miền giá trị hợp lệ danh định.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
