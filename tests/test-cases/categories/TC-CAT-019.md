# TC-CAT-019: Xóa danh mục thành công khi danh mục tồn tại và không có sản phẩm liên kết

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Một danh mục mới `"Đồ văn phòng"` vừa được tạo (ví dụ `id = 4`) và chưa có bất kỳ sản phẩm nào liên kết với nó (`category_id = 4` không có trong bảng `products`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/4` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `4` |

## Test Steps

1. Gửi request `DELETE /api/categories/4` kèm token Admin.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để xác minh danh mục đã biến mất.

## Expected Result

- Hệ thống thực hiện xóa thành công, trả về HTTP 200: `{"message": "Category deleted"}`.
- Danh mục ID 4 không còn xuất hiện trong danh sách trả về từ `GET /api/categories`.

## Actual Result

DELETE /api/categories/17 trả về HTTP 200 OK {"message": "Category deleted"}. Danh mục độc lập được xóa sạch khỏi CSDL và giao diện.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-019.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho thao tác Xóa (Delete) danh mục độc lập không có ràng buộc toàn vẹn dữ liệu.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
