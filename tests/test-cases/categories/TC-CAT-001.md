# TC-CAT-001: Thêm danh mục mới thành công với tên hợp lệ chuẩn (Quyền Admin)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và sở hữu JWT Token hợp lệ.
- Tên danh mục `"Đồ gia dụng"` chưa tồn tại trong cơ sở dữ liệu.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| `name` | `"Đồ gia dụng"` |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "Đồ gia dụng" }` kèm Authorization header của Admin.
2. Kiểm tra mã trạng thái HTTP và nội dung phản hồi từ hệ thống.
3. Gửi request `GET /api/categories` để xác minh danh mục mới đã được lưu vào cơ sở dữ liệu.

## Expected Result

- Hệ thống trả về mã trạng thái HTTP 200 (hoặc 201 Created).
- Nội dung phản hồi chứa thông báo tạo thành công và trả về `id` mới: `{"message": "Category created", "id": <new_id>}`.
- Danh sách trả về từ `GET /api/categories` có chứa bản ghi danh mục mới `"Đồ gia dụng"`.

## Actual Result

Giao diện gửi POST request thành công, danh mục "Đồ gia dụng" được lưu vào CSDL với ID #4. Bảng danh mục cập nhật hiển thị ngay lập tức.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-001.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cơ bản cho thao tác Tạo (Create) danh mục mới với tên tiêu chuẩn và phân quyền Admin hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
