# TC-CAT-014: Lấy danh sách danh mục khi cơ sở dữ liệu chưa có danh mục nào

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Bảng `categories` trong cơ sở dữ liệu trống (0 bản ghi).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps

1. Gửi request `GET /api/categories`.
2. Kiểm tra định dạng dữ liệu trả về.

## Expected Result

- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Dữ liệu trả về là một mảng rỗng `[]` (không trả về `null`, lỗi 500 hay object sai định dạng).

## Actual Result

Hệ thống dùng sqlite db.all trả về cấu trúc mảng JavaScript tiêu chuẩn (mảng rỗng [] khi 0 bản ghi), mã trạng thái HTTP 200 OK.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-014.png)

## Coverage Rationale

Kiểm thử trạng thái biên của tập dữ liệu: Tập dữ liệu rỗng (Empty collection).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
