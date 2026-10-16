# TC-GAP-CAT-002: Thêm danh mục với tên chỉ chứa toàn khoảng trắng qua API

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
| Body | `{ "name": "   " }` (3 ký tự khoảng trắng) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "   " }` kèm token Admin.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để kiểm tra bản ghi được tạo trong CSDL.

## Expected Result

- Backend phải cắt tỉa khoảng trắng, phát hiện chuỗi rỗng và từ chối yêu cầu với HTTP 400 Bad Request.
- CSDL không lưu bản ghi danh mục chỉ chứa khoảng trắng.

## Actual Result

HTTP 200; `{"message":"Category created","id":5}`

## Missing Scenario

Kiểm tra việc backend không thực hiện cắt tỉa (trim) khoảng trắng trước khi lưu trữ, dẫn đến việc lưu tên danh mục vô nghĩa chỉ chứa ký tự khoảng trắng.

## Gap Rationale

Kiểm thử trước đó chỉ xem xét trường hợp lý thuyết trên giao diện mà không kiểm tra xử lý chuỗi ở tầng API, bỏ sót lỗ hổng ô nhiễm dữ liệu với chuỗi toàn khoảng trắng.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
