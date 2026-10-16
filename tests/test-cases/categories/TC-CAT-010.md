# TC-CAT-010: Xử lý an toàn khi tên danh mục chứa mã HTML/JavaScript (XSS Payload)

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
| `name` | `"<script>alert('XSS')</script> Thời trang"` |

## Test Steps

1. Gửi request `POST /api/categories` với payload chứa thẻ script HTML.
2. Kiểm tra phản hồi của API.
3. Truy cập màn hình Admin Categories và Storefront để xem tên danh mục được hiển thị ra sao.

## Expected Result

- Hệ thống lưu trữ an toàn hoặc mã hóa thực thể HTML (HTML entity encode).
- Khi render trên giao diện web/admin, trình duyệt hiển thị chuỗi ký tự dạng văn bản thuần túy, không kích hoạt thực thi đoạn mã script độc hại.

## Actual Result

Mã XSS được React render an toàn dưới dạng plain text thuần túy trong thẻ <td>; script không bị thực thi; giao diện không phát sinh hộp thoại alert() độc hại.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-010.png)

## Coverage Rationale

Kiểm thử miền dữ liệu chứa mã thực thi độc hại (Cross-Site Scripting - XSS) trong tên danh mục theo tiêu chuẩn bảo mật.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
