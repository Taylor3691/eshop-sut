# TC-CAT-002: Thêm danh mục mới với tên chứa dấu tiếng Việt Unicode và ký tự đặc biệt hợp lệ

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đăng nhập tài khoản Admin có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"Mẹ & Bé - Đồ chơi / Âm thanh"` |

## Test Steps

1. Gửi request `POST /api/categories` với tên danh mục chứa dấu tiếng Việt Unicode đầy đủ và các ký tự `&`, `-`, `/`.
2. Kiểm tra phản hồi từ API.
3. Gửi request `GET /api/categories` và kiểm tra chuỗi hiển thị.

## Expected Result

- Hệ thống xử lý thành công, trả về HTTP 200.
- Tên danh mục được lưu trữ nguyên vẹn chuẩn UTF-8, không bị lỗi font hoặc biến đổi ký tự đặc biệt.

## Actual Result

Danh mục "Mẹ & Bé - Đồ chơi / Âm thanh" được lưu và hiển thị chuẩn xác font UTF-8 tiếng Việt và các ký tự đặc biệt (&, -, /), ID #5.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-002.png)

## Coverage Rationale

Kiểm thử miền dữ liệu chuỗi ký tự Unicode tiếng Việt và ký tự đặc biệt phân cách thường gặp trong thương mại điện tử.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
