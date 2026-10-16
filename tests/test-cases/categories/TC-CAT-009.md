# TC-CAT-009: Xử lý thêm danh mục trùng tên với danh mục đã tồn tại trong hệ thống

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `"Điện thoại"` đã tồn tại trong hệ thống (ID = 1 từ dữ liệu mẫu).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"Điện thoại"` |

## Test Steps

1. Gửi request `POST /api/categories` với tên `"Điện thoại"`.
2. Kiểm tra phản hồi HTTP và hành vi của hệ thống (chấp nhận hay cảnh báo trùng lặp).

## Expected Result

- Nếu hệ thống có ràng buộc tính duy nhất (UNIQUE): Trả về HTTP 400 / 409 Conflict thông báo tên danh mục đã tồn tại.
- Nếu hệ thống cho phép tạo trùng lặp: Trả về HTTP 200 nhưng tạo ID phân biệt mới.

## Actual Result

Backend trả về HTTP 200 OK và tạo thêm danh mục trùng tên "Điện thoại" (ID mới #14). Bảng CSDL không có ràng buộc UNIQUE cho cột name.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-009.png)

## Coverage Rationale

Kiểm thử lớp tương đương cho trường hợp xung đột dữ liệu danh mục trùng tên đã có.

## Status / Related Bugs

FAIL / DEF-FR14-06 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
