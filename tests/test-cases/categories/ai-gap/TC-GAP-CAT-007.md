# TC-GAP-CAT-007: Cập nhật danh mục với ID không tồn tại báo thành công giả (False-Positive Success)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- `id = 9999` không tồn tại trong bảng `categories`.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Tên mới" }` |

## Test Steps

1. Gửi request `PUT /api/categories/9999` với tên hợp lệ.
2. Kiểm tra mã phản hồi HTTP và thông báo từ server.

## Expected Result

- Backend phải kiểm tra số dòng bị ảnh hưởng (`this.changes`); nếu `changes === 0`, phải trả về HTTP 404 Not Found kèm thông báo không tìm thấy danh mục.
- Không báo thành công khi không có bản ghi nào được cập nhật.

## Actual Result

HTTP 200; `{"message":"Category updated"}`

## Missing Scenario

Kiểm tra phản hồi của hệ thống khi gửi yêu cầu cập nhật một danh mục có `id` không tồn tại trong CSDL (ví dụ `id = 9999`).

## Gap Rationale

Trong `server.js:257-266`, câu lệnh SQL `UPDATE categories SET name = ? WHERE id = ?` chạy mà không kiểm tra `this.changes`, dẫn đến việc trả về HTTP 200 `{ message: "Category updated" }` gây hiểu lầm cho client rằng việc cập nhật đã thành công.

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
