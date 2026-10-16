# TC-BVA-CAT-014: Biên số lượng danh mục ngay trên mức tối thiểu (count = 1)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Cơ sở dữ liệu hiện chỉ có duy nhất 1 danh mục (ví dụ `id = 1`, tên `"Điện thoại"`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps

1. Thiết lập CSDL chỉ chứa duy nhất 1 danh mục.
2. Gửi request `GET /api/categories`.
3. Kiểm tra số lượng phần tử trong mảng phản hồi.

## Expected Result

- Hệ thống trả về HTTP 200 OK.
- Mảng dữ liệu chứa chính xác 1 phần tử (`response.data.length === 1`).
- Thông tin phần tử khớp chính xác với bản ghi duy nhất trong CSDL.

## Actual Result

API GET /api/categories trả về HTTP 200 OK với danh sách mảng đối tượng danh mục chuẩn xác.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-014.png)

## Boundary Rationale

Kiểm tra giá trị biên ngay trên mức tối thiểu của tập hợp dữ liệu (`count = 1`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
