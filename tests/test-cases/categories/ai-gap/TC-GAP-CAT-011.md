# TC-GAP-CAT-011: Cập nhật danh mục với giá trị tên là null làm hỏng dữ liệu

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` đang có tên là `"Laptop"`.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": null }` |

## Test Steps

1. Gửi request `PUT /api/categories/2` với `{ "name": null }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Gửi `GET /api/categories` kiểm tra tên của danh mục `id = 2`.

## Expected Result

- Backend phải từ chối cập nhật khi tên là `null` (HTTP 400 Bad Request).
- Tên danh mục `id = 2` phải được bảo toàn giá trị cũ `"Laptop"`.

## Actual Result

HTTP 200; `{"message":"Category updated"}`

## Missing Scenario

Kiểm tra việc gửi `name: null` khi gọi `PUT /api/categories/:id` ghi đè giá trị `NULL` vào tên danh mục hiện có.

## Gap Rationale

Bộ test ban đầu chỉ kiểm tra chuỗi rỗng `""` mà bỏ sót giá trị `null` khi cập nhật, dẫn đến việc bản ghi danh mục đang hoạt động bị biến thành `NULL`.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
