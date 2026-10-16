# TC-GAP-CAT-010: Thêm danh mục trùng lặp tên do thiếu ràng buộc duy nhất (Missing Unique Constraint)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `"Điện thoại"` đã tồn tại trong CSDL.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Điện thoại" }` |

## Test Steps

1. Gửi request `POST /api/categories` với tên trùng lặp `"Điện thoại"`.
2. Kiểm tra phản hồi từ server.
3. Gửi `GET /api/categories` để kiểm tra số lượng danh mục trùng tên.

## Expected Result

- Hệ thống phải có cơ chế kiểm tra tính duy nhất (UNIQUE): Trả về cảnh báo lỗi HTTP 400 / 409 Conflict: Tên danh mục đã tồn tại.
- Không cho phép tồn tại nhiều danh mục trùng tên trong hệ thống.

## Actual Result

HTTP 200; `{"message":"Category created","id":9}`

## Missing Scenario

Kiểm tra việc hệ thống cho phép tạo nhiều danh mục có tên giống hệt nhau (ví dụ nhiều danh mục cùng mang tên `"Điện thoại"`), gây dư thừa và nhầm lẫn dữ liệu.

## Gap Rationale

Schema tạo bảng `categories` trong `database.js:23-26` chỉ khai báo `name TEXT` mà không có từ khóa `UNIQUE`, dẫn đến việc người dùng có thể tạo không giới hạn các danh mục trùng tên.

## Status / Related Bugs

FAIL / DEF-FR14-06 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
