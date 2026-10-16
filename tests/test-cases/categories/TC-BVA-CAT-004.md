# TC-BVA-CAT-004: Độ dài tên danh mục sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed length = 0)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `" "` (chuỗi 1 ký tự khoảng trắng, độ dài sau trim bằng 0) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": " " }`.
2. Quan sát phản hồi của server.
3. Kiểm tra CSDL xem có bản ghi danh mục chứa khoảng trắng rỗng bị chèn vào không.

## Expected Result

- Hệ thống thực hiện chuẩn hóa (trim) chuỗi đầu vào; chuỗi chỉ chứa khoảng trắng được coi là rỗng (`length = 0`).
- Từ chối yêu cầu và trả về HTTP 400 Bad Request kèm thông báo lỗi.
- Không có danh mục mới được tạo trong cơ sở dữ liệu.

## Actual Result

Backend trả về HTTP 200 OK {"message": "Category created", "id": 24}. Hệ thống không trim() khoảng trắng trước khi lưu.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-004.png)

## Boundary Rationale

Kiểm tra biên chuỗi chứa đúng 1 ký tự khoảng trắng, sau khi cắt tỉa (trim) sẽ trở về độ dài 0 ký tự (`trimmed length = 0`), thuộc miền không hợp lệ.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
