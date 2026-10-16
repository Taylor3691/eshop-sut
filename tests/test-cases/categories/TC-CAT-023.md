# TC-CAT-023: Từ chối xóa danh mục khi người dùng có vai trò thường (role = 'user')

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 3` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/3` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |

## Test Steps

1. Đăng nhập với tài khoản `test@eshop.com`.
2. Gửi request `DELETE /api/categories/3` với token nhận được.
3. Kiểm tra mã phản hồi HTTP.

## Expected Result

- Hệ thống từ chối xóa do người dùng không có vai trò Admin, trả về HTTP 403 Forbidden.
- Danh mục ID 3 không bị xóa khỏi cơ sở dữ liệu.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục thành công khi dùng Token của User thường. Thiếu kiểm tra role Admin.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-023.png)

## Coverage Rationale

Kiểm thử phân quyền RBAC cho thao tác Xóa danh mục: Bảo vệ dữ liệu trước các yêu cầu từ tài khoản người dùng thông thường.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
