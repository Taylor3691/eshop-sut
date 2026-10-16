# TC-CAT-007: Từ chối thêm danh mục khi thiếu trường "name" trong body request

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body | `{}` (Object rỗng, không truyền thuộc tính `name`) |

## Test Steps

1. Gửi request `POST /api/categories` với body `{}`.
2. Kiểm tra phản hồi trả về từ hệ thống.

## Expected Result

- Hệ thống phát hiện thiếu trường bắt buộc `name` (undefined/missing).
- Trả về mã lỗi HTTP 400 Bad Request kèm thông báo yêu cầu cung cấp tên danh mục.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category created", "id": 12}. Hệ thống chèn giá trị undefined/null vào CSDL thay vì từ chối HTTP 400.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-007.png)

## Coverage Rationale

Kiểm thử tính toàn vẹn của hợp đồng API (API contract) khi client không truyền thuộc tính bắt buộc.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
