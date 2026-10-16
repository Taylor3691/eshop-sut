# TC-CAT-004: Thêm danh mục mới với tên có độ dài lớn

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
| `name` | `"Thiết bị điện tử viễn thông và phụ kiện công nghệ cao cấp chính hãng nhập khẩu"` (82 ký tự) |

## Test Steps

1. Gửi request `POST /api/categories` với tên danh mục dài.
2. Kiểm tra phản hồi HTTP và dữ liệu được ghi vào CSDL.

## Expected Result

- Hệ thống tiếp nhận và lưu trữ toàn bộ chuỗi ký tự, trả về HTTP 200.
- Danh mục hiển thị đầy đủ trong `GET /api/categories`.

## Actual Result

Tạo danh mục tên dài (150 ký tự) thành công, cơ sở dữ liệu lưu chuỗi đầy đủ và bảng hiển thị toàn vẹn nội dung.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-004.png)

## Coverage Rationale

Kiểm thử khả năng xử lý chuỗi văn bản dài trong miền dữ liệu tên danh mục hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
