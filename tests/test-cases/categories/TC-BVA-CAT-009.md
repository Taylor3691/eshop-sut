# TC-BVA-CAT-009: Mã định danh dưới biên tối thiểu hợp lệ khi cập nhật danh mục (id = 0)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- CSDL sử dụng khóa chính tự tăng bắt đầu từ 1 (`id >= 1`), không tồn tại `id = 0`.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/0` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `0` (ngay dưới ngưỡng ID tối thiểu 1) |
| Body `name` | `"Danh mục Test"` |

## Test Steps

1. Gửi request `PUT /api/categories/0` với tên hợp lệ.
2. Kiểm tra mã trạng thái HTTP và phản hồi từ hệ thống.

## Expected Result

- Hệ thống xác định `id = 0` không tồn tại trong cơ sở dữ liệu.
- Trả về mã lỗi HTTP 404 Not Found (hoặc thông báo không tìm thấy bản ghi cần cập nhật).
- Không có bản ghi nào bị thay đổi.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID = 0 không tồn tại. Hệ thống không kiểm tra this.changes === 0.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-009.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới mức tối thiểu của khóa chính (`min_id - 1 = 0`), là giá trị không tồn tại trong tập ID hợp lệ.

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
