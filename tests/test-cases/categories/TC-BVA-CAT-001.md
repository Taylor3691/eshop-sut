# TC-BVA-CAT-001: Độ dài tên danh mục dưới biên tối thiểu khi tạo mới (length = 0, chuỗi rỗng)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và có JWT Token hợp lệ.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| `name` | `""` (độ dài chuỗi bằng 0) |

## Test Steps

1. Đăng nhập tài khoản Admin và lấy JWT Token.
2. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
3. Kiểm tra mã phản hồi HTTP và dữ liệu trả về từ server.
4. Gửi request `GET /api/categories` để kiểm tra danh sách danh mục trong cơ sở dữ liệu.

## Expected Result

- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Hệ thống từ chối yêu cầu, trả về mã lỗi HTTP 400 Bad Request.
- Thông báo lỗi hiển thị: Tên danh mục không được để trống.
- Không có bản ghi danh mục mới nào được thêm vào cơ sở dữ liệu.

## Actual Result

Backend chấp nhận chuỗi rỗng (length = 0), trả về HTTP 200 OK {"message": "Category created", "id": 21}. Vi phạm ràng buộc không được để trống.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-001.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới mức tối thiểu (`min_length - 1 = 0`), thuộc miền giá trị không hợp lệ của ràng buộc bắt buộc nhập tên danh mục.

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
