# TC-CAT-021: Xử lý xóa danh mục với ID không tồn tại trong CSDL

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- ID `9999` không tồn tại trong bảng `categories`.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `9999` |

## Test Steps

1. Gửi request `DELETE /api/categories/9999`.
2. Kiểm tra mã phản hồi HTTP từ máy chủ.

## Expected Result

- Hệ thống trả về lỗi HTTP 404 Not Found (hoặc thông báo danh mục không tồn tại).
- Không làm gián đoạn hệ thống hoặc lỗi máy chủ 500.

## Actual Result

Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} dù ID 9999 không tồn tại. Thiếu kiểm tra this.changes để trả về lỗi 404.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-021.png)

## Coverage Rationale

Kiểm thử miền dữ liệu `id` không hợp lệ: Xóa đối tượng không tồn tại trong cơ sở dữ liệu.

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
