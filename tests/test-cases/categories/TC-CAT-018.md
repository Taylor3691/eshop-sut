# TC-CAT-018: Từ chối cập nhật danh mục khi người dùng không có quyền Admin

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 1` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |
| Body `name` | `"Tên sửa trái phép"` |

## Test Steps

1. Gửi request `PUT /api/categories/1` sử dụng JWT Token của người dùng thường.
2. Kiểm tra phản hồi HTTP từ server.

## Expected Result

- Hệ thống từ chối cập nhật do thiếu quyền Admin, trả về HTTP 403 Forbidden.
- Danh mục ID 1 giữ nguyên tên ban đầu trong CSDL.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category updated"}. User thường có thể sửa danh mục do thiếu kiểm tra quyền Admin tại endpoint PUT.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-018.png)

## Coverage Rationale

Kiểm thử phân quyền RBAC cho thao tác Cập nhật danh mục: Ngăn chặn người dùng không phải Admin chỉnh sửa dữ liệu.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
