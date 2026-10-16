# TC-CAT-008: Từ chối thêm danh mục khi giá trị trường "name" là null

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
| `name` | `null` |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": null }`.
2. Kiểm tra mã lỗi và phản hồi.

## Expected Result

- Hệ thống từ chối giá trị `null` đối với trường bắt buộc, trả về HTTP 400 Bad Request.
- CSDL không lưu bản ghi có giá trị `name` là `NULL`.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category created", "id": 13}. CSDL chèn giá trị NULL do thiếu ràng buộc NOT NULL.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-008.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ với kiểu dữ liệu `null` đối với trường bắt buộc của CSDL.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
