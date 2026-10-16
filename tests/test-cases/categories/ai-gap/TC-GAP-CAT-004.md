# TC-GAP-CAT-004: Người dùng thường thực hiện thêm danh mục (Lỗ hổng Phân quyền RBAC)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) và sở hữu JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Danh mục của User" }` |

## Test Steps

1. Đăng nhập tài khoản `test@eshop.com` để nhận token vai trò `user`.
2. Gửi request `POST /api/categories` với payload danh mục kèm token của user.
3. Kiểm tra mã phản hồi HTTP từ server.

## Expected Result

- Theo `README.md` mục 6: *"Tất cả các API Admin... và các API có tính ảnh hưởng dữ liệu (POST/PUT/DELETE /api/categories...) đều phải yêu cầu Token hợp lệ và Role là admin. Nếu role khác admin, API phải trả về HTTP 403 (không có quyền)"*.
- Hệ thống từ chối yêu cầu và trả về HTTP 403 Forbidden.
- Danh mục không được tạo.

## Actual Result

HTTP 200; `{"message":"Category created","id":8}`

## Missing Scenario

Kiểm tra lỗ hổng leo thang đặc quyền (Privilege Escalation) khi người dùng có vai trò thông thường (`role = 'user'`) gọi API tạo danh mục.

## Gap Rationale

Bộ test cũ giả định middleware `authenticateToken` tự động kiểm tra quyền Admin. Trong thực tế mã nguồn, middleware này chỉ kiểm tra tính hợp lệ của token mà không hề kiểm tra `req.user.role === 'admin'`.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
