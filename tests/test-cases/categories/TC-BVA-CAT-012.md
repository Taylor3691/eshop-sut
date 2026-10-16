# TC-BVA-CAT-012: Mã định danh ngay trên biên tồn tại lớn nhất khi xóa danh mục (id = max_existing_id + 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Lấy `max_id` hiện có trong hệ thống qua `GET /api/categories` (giả sử danh mục có ID lớn nhất hiện tại là `3`).
- `id = 4` hoàn toàn chưa từng được tạo trong cơ sở dữ liệu.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/4` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `4` (`max_id + 1`) |

## Test Steps

1. Gửi request `DELETE /api/categories/4`.
2. Kiểm tra mã trạng thái HTTP từ server.

## Expected Result

- Hệ thống kiểm tra thấy `id = 4` không tồn tại trong bảng `categories`.
- Trả về mã lỗi HTTP 404 Not Found (hoặc thông báo không tìm thấy danh mục).
- Không làm thay đổi số lượng bản ghi trong cơ sở dữ liệu.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category deleted"} cho ID không tồn tại #125 thay vì trả về HTTP 404 Not Found.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-012.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng tồn tại lớn nhất (`max_id + 1`), thuộc miền ID không tồn tại (Non-existent boundary).

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
