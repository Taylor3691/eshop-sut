# TC-CAT-012: Từ chối thêm danh mục khi người dùng là tài khoản thông thường (role = 'user')

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) và sở hữu JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |
| `name` | `"Danh mục của User"` |

## Test Steps

1. Đăng nhập bằng tài khoản `test@eshop.com` để nhận token vai trò `user`.
2. Gửi request `POST /api/categories` với token vừa nhận được.
3. Kiểm tra phản hồi từ máy chủ.

## Expected Result

- Theo đặc tả: Chỉ tài khoản Admin mới có quyền Thêm / Xóa danh mục; role khác admin phải trả về HTTP 403 Forbidden.
- Hệ thống từ chối yêu cầu và trả về HTTP 403 Forbidden.
- Cơ sở dữ liệu không bị thay đổi.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category created", "id": 16}. Token của user thông thường được chấp nhận do server thiếu bước kiểm tra role === 'admin'.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-012.png)

## Coverage Rationale

Kiểm thử phân hoạch phân quyền (Role-Based Access Control - RBAC): Người dùng đã xác thực nhưng không đủ quyền quản trị.

## Status / Related Bugs

FAIL / DEF-FR14-02 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
