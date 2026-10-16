# TC-GAP-CAT-003: Thêm danh mục khi không truyền trường "name" hoặc "name: null"

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{}` hoặc `{ "name": null }` |

## Test Steps

1. Gửi request `POST /api/categories` với body `{}`.
2. Gửi request `POST /api/categories` với body `{ "name": null }`.
3. Kiểm tra mã trạng thái HTTP và danh sách trả về từ `GET /api/categories`.

## Expected Result

- Backend phải trả về lỗi HTTP 400 Bad Request: Thiếu trường `name` bắt buộc.
- CSDL không cho phép lưu bản ghi có giá trị `name` là `NULL`.

## Actual Result

HTTP 200; `{"message":"Category created","id":6}`

## Missing Scenario

Kiểm tra phản ứng của backend khi nhận payload JSON thiếu thuộc tính `name` (`{}`) hoặc có giá trị `null` (`{ "name": null }`).

## Gap Rationale

Bảng `categories` trong schema SQLite được tạo với `name TEXT` không có ràng buộc `NOT NULL`. Bộ test cũ không kiểm tra trường hợp payload thiếu trường dẫn đến giá trị `NULL` trong CSDL.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
