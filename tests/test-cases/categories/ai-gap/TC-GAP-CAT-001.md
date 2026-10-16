# TC-GAP-CAT-001: Thêm danh mục với tên là chuỗi rỗng qua API

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và sở hữu JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "" }` |

## Test Steps

1. Đăng nhập tài khoản Admin để lấy JWT Token.
2. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
3. Kiểm tra mã trạng thái HTTP và nội dung phản hồi từ hệ thống.
4. Gửi request `GET /api/categories` để kiểm tra danh sách danh mục trong cơ sở dữ liệu.

## Expected Result

- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Backend phải xác thực dữ liệu và trả về mã lỗi HTTP 400 Bad Request kèm thông báo: Tên danh mục không được để trống.
- Không có bản ghi danh mục nào có tên rỗng được tạo trong cơ sở dữ liệu.

## Actual Result

HTTP 200; `{"message":"Category created","id":4}`

## Missing Scenario

Kiểm tra khả năng bắt lỗi và từ chối của backend khi client gửi yêu cầu tạo danh mục với `name: ""` trực tiếp tới API, không qua giao diện trình duyệt.

## Gap Rationale

Bộ test ban đầu giả định rằng quy tắc nghiệp vụ "không được để trống" hiển nhiên được backend kiểm tra. Việc thiếu kịch bản kiểm thử tính phòng thủ của backend đã bỏ sót lỗ hổng server không validate dữ liệu và chèn bản ghi rỗng vào cơ sở dữ liệu.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
