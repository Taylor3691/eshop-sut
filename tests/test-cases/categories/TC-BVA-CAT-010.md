# TC-BVA-CAT-010: Mã định danh số âm ngoài biên hợp lệ khi xóa danh mục (id = -1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/-1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `-1` |

## Test Steps

1. Gửi request `DELETE /api/categories/-1`.
2. Kiểm tra phản hồi từ máy chủ.

## Expected Result

- Hệ thống nhận diện ID số âm không hợp lệ và từ chối yêu cầu.
- Trả về mã lỗi HTTP 400 Bad Request hoặc 404 Not Found.
- Không gây ra lỗi crash máy chủ (HTTP 500) và không ảnh hưởng đến CSDL.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category deleted"} với ID âm (-1). Không từ chối HTTP 400 hoặc 404.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-010.png)

## Boundary Rationale

Kiểm tra giá trị biên âm (`id < 0`), thuộc miền giá trị không hợp lệ của khóa chính kiểu số nguyên dương.

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
