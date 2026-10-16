# TC-CAT-011: Từ chối thêm danh mục khi client chưa đăng nhập (Thiếu JWT Token)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Client chưa đăng nhập, không gửi Authorization Header hoặc gửi Token rỗng.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | Không có `Authorization` header |
| `name` | `"Sách mới"` |

## Test Steps

1. Gửi request `POST /api/categories` mà không kèm token xác thực.
2. Kiểm tra mã trạng thái HTTP trả về.

## Expected Result

- Theo quy định bảo mật hệ thống: Các API thay đổi dữ liệu phải yêu cầu xác thực.
- Hệ thống từ chối thực thi và trả về mã lỗi HTTP 401 Unauthorized (`{ "error": "Unauthorized" }`).
- Không có danh mục mới nào được tạo trong cơ sở dữ liệu.

## Actual Result

Middleware authenticateToken chặn request chính xác, trả về HTTP 401 Unauthorized {"error": "Token missing"}.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-011.png)

## Coverage Rationale

Kiểm thử phân hoạch quyền truy cập: Vi phạm điều kiện xác thực danh tính (Authentication missing).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
