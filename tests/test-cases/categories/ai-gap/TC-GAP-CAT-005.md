# TC-GAP-CAT-005: Người dùng thường thực hiện cập nhật danh mục qua API

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) với JWT Token hợp lệ.
- Danh mục `id = 1` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Bị thay đổi bởi User" }` |

## Test Steps

1. Gửi request `PUT /api/categories/1` kèm token vai trò `user`.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để kiểm tra tên danh mục `id = 1`.

## Expected Result

- Hệ thống từ chối quyền truy cập, trả về HTTP 403 Forbidden.
- Tên danh mục `id = 1` được giữ nguyên trong cơ sở dữ liệu.

## Actual Result

HTTP 200; `{"message":"Category updated"}`

## Missing Scenario

Kiểm tra khả năng người dùng không có quyền quản trị chỉnh sửa tên danh mục có sẵn trong hệ thống qua `PUT /api/categories/:id`.

## Gap Rationale

Thiếu kịch bản xác minh bảo vệ endpoint Cập nhật chống lại người dùng đã xác thực nhưng không đủ quyền hạn quản trị.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
