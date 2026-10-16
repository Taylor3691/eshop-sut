# TC-BVA-CAT-005: Độ dài tên danh mục sau khi loại bỏ khoảng trắng tại đúng biên tối thiểu (trimmed length = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Chưa có danh mục `"K"` trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `" K "` (1 ký tự chữ cái bọc bởi khoảng trắng ở 2 đầu) |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": " K " }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Gửi `GET /api/categories` kiểm tra tên danh mục được lưu trữ là `"K"` (đã trim) hoặc `" K "`.

## Expected Result

- Hệ thống chấp nhận tạo danh mục thành công, trả về HTTP 200.
- Tên danh mục được chuẩn hóa thành `"K"` (hoặc lưu hợp lệ), thỏa mãn điều kiện có ít nhất 1 ký tự nội dung.

## Actual Result

Hệ thống chấp nhận tạo danh mục " B " thành công, trả về HTTP 200 OK.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-005.png)

## Boundary Rationale

Kiểm tra giá trị biên chuỗi có đúng 1 ký tự có nghĩa sau khi loại bỏ khoảng trắng thừa (`trimmed length = 1`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
