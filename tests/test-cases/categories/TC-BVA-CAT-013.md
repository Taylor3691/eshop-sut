# TC-BVA-CAT-013: Biên số lượng danh mục tối thiểu trong hệ thống (count = 0, danh sách rỗng)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / BVA

## Preconditions

- Toàn bộ danh mục trong bảng `categories` đã được xóa sạch (0 bản ghi).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps

1. Đảm bảo bảng `categories` có 0 bản ghi.
2. Gửi request `GET /api/categories`.
3. Kiểm tra mã trạng thái HTTP và độ dài mảng trả về.

## Expected Result

- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Dữ liệu trả về là một mảng rỗng: `[]` (`response.data.length === 0`).
- Không trả về giá trị `null`, `undefined` hoặc phát sinh lỗi 500.

## Actual Result

API GET /api/categories trả về HTTP 200 OK, định dạng kiểu mảng chuẩn (Array), không trả về null hay undefined khi rỗng.

## Evidence

- [Screenshot evidence](screenshots/TC-BVA-CAT-013.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới cùng của tập hợp dữ liệu: Số lượng bản ghi danh mục bằng 0 (`count = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/bva_testing_report.md).
