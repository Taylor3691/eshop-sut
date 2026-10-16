# TC-CAT-003: Thêm danh mục mới với tên có độ dài tối thiểu (1 ký tự)

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
| `name` | `"A"` |

## Test Steps

1. Gửi request `POST /api/categories` với `name: "A"`.
2. Kiểm tra phản hồi và xác minh dữ liệu trong danh sách danh mục.

## Expected Result

- Hệ thống chấp nhận và tạo danh mục thành công, trả về HTTP 200 cùng `id` danh mục.
- Danh mục `"A"` xuất hiện trong danh sách `GET /api/categories`.

## Actual Result

Hệ thống tiếp nhận và tạo danh mục 1 ký tự "A" thành công, phản hồi HTTP 200, danh mục hiển thị trên bảng quản trị.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-003.png)

## Coverage Rationale

Kiểm thử giá trị biên độ dài chuỗi tối thiểu (1 ký tự không rỗng) trong miền chuỗi hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
