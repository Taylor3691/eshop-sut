# TC-GAP-CAT-006: Người dùng thường thực hiện xóa danh mục qua API

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 3` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/3` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |

## Test Steps

1. Gửi request `DELETE /api/categories/3` sử dụng token của tài khoản thường.
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra danh mục `id = 3` trong CSDL.

## Expected Result

- Hệ thống từ chối xóa và trả về HTTP 403 Forbidden.
- Danh mục `id = 3` vẫn tồn tại nguyên vẹn trong CSDL.

## Actual Result

HTTP 200; `{"message":"Category deleted"}`

## Missing Scenario

Kiểm tra khả năng người dùng không có quyền Admin thực hiện xóa danh mục qua `DELETE /api/categories/:id`.

## Gap Rationale

Tương tự như API tạo và sửa, API xóa danh mục thiếu tầng kiểm tra vai trò người dùng, cho phép bất kỳ tài khoản khách hàng nào cũng có thể xóa sạch danh mục của cửa hàng.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
