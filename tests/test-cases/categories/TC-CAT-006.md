# TC-CAT-006: Từ chối thêm danh mục khi tên chỉ chứa toàn khoảng trắng ("   ")

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
| `name` | `"     "` (5 ký tự khoảng trắng) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "     " }`.
2. Kiểm tra mã phản hồi HTTP từ server.
3. Xác minh trong CSDL xem bản ghi có bị chèn vào không.

## Expected Result

- Hệ thống áp dụng quy tắc cắt khoảng trắng (trim) và xác định tên rỗng, từ chối tạo với HTTP 400.
- Không có danh mục chỉ chứa khoảng trắng nào được lưu vào CSDL.

## Actual Result

Backend trả về HTTP 200 OK và lưu danh mục chứa toàn khoảng trắng. Không có cơ chế trim() hay kiểm tra độ dài ký tự thực tế.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-006.png)

## Coverage Rationale

Kiểm thử lớp tương đương không hợp lệ: chuỗi ký tự khoảng trắng vô nghĩa được coi là để trống theo nghiệp vụ.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
