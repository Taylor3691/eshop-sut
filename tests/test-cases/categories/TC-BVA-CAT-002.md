# TC-BVA-CAT-002: Độ dài tên danh mục tại đúng biên tối thiểu khi tạo mới (length = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Chưa tồn tại danh mục có tên `"A"` trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"A"` (độ dài đúng 1 ký tự) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "A" }` kèm Authorization header của Admin.
2. Kiểm tra mã trạng thái HTTP từ API.
3. Gửi request `GET /api/categories` để kiểm tra xem danh mục `"A"` đã được lưu chưa.

## Expected Result

- Hệ thống chấp nhận và tạo danh mục thành công, trả về mã trạng thái HTTP 200 (hoặc 201 Created).
- Phản hồi chứa `id` mới: `{"message": "Category created", "id": <new_id>}`.
- Danh mục tên `"A"` xuất hiện trong danh sách trả về từ `GET /api/categories`.

## Actual Result

Tạo danh mục 1 ký tự tại biên tối thiểu hợp lệ thành công, trả về HTTP 200 OK {"message": "Category created", "id": 22}.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-002.png)

## Boundary Rationale

Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu (`min_length = 1`), là độ dài ký tự hợp lệ nhỏ nhất thỏa mãn điều kiện "không được để trống".

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
