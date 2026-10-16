# TC-CAT-013: Lấy danh sách danh mục thành công khi CSDL có dữ liệu (Public API)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Cơ sở dữ liệu đã có sẵn 3 danh mục mẫu (`Điện thoại` - ID: 1, `Laptop` - ID: 2, `Phụ kiện` - ID: 3).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Không yêu cầu Authorization (Public) |

## Test Steps

1. Gửi request `GET /api/categories` không kèm token.
2. Kiểm tra mã trạng thái HTTP và cấu trúc dữ liệu trả về.

## Expected Result

- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Phản hồi là một mảng JSON chứa đầy đủ danh sách các danh mục.
- Mỗi phần tử có cấu trúc: `{ "id": <number>, "name": "<string>" }`.
- Danh sách chứa ít nhất 3 danh mục mẫu ban đầu.

## Actual Result

Public API GET /api/categories trả về HTTP 200 OK, danh sách mảng JSON gồm 16 danh mục với đầy đủ các trường id và name.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-013.png)

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho thao tác Đọc (Read / Retrieve) danh sách danh mục công khai.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
