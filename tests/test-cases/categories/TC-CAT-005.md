# TC-CAT-005: Từ chối thêm danh mục khi tên là chuỗi rỗng ("")

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Người dùng đăng nhập với quyền Admin có JWT Token.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `""` |

## Test Steps

1. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
2. Quan sát mã phản hồi HTTP và thông báo lỗi.
3. Kiểm tra danh sách `GET /api/categories` xem có danh mục tên rỗng nào bị thêm vào không.

## Expected Result

- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Hệ thống từ chối request, trả về mã lỗi HTTP 400 Bad Request.
- Thông báo lỗi hiển thị: Tên danh mục không được để trống.
- Cơ sở dữ liệu không ghi nhận thêm bản ghi mới.

## Actual Result

Backend trả về HTTP 200 OK và tạo danh mục với tên rỗng vào CSDL. Form Admin không chặn submit chuỗi rỗng, thêm dòng danh mục không tên vào bảng.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-005.png)

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ vi phạm quy tắc bắt buộc của trường `name` (chuỗi rỗng 0 ký tự).

## Status / Related Bugs

FAIL / DEF-FR14-01 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
