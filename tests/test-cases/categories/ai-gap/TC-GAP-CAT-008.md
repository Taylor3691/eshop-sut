# TC-GAP-CAT-008: Xóa danh mục với ID không tồn tại báo thành công giả (False-Positive Success)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- `id = 9999` không tồn tại trong CSDL.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |

## Test Steps

1. Gửi request `DELETE /api/categories/9999`.
2. Kiểm tra mã phản hồi HTTP.

## Expected Result

- Backend phải kiểm tra `this.changes === 0` và trả về HTTP 404 Not Found: Không tìm thấy danh mục để xóa.
- Không trả về HTTP 200 giả định.

## Actual Result

HTTP 200; `{"message":"Category deleted"}`

## Missing Scenario

Kiểm tra phản hồi của hệ thống khi gửi yêu cầu xóa một danh mục không tồn tại trong CSDL (`id = 9999`).

## Gap Rationale

Tương tự như API cập nhật, `server.js:269-278` không kiểm tra kết quả thực thi của lệnh `DELETE`, luôn trả về HTTP 200 `{ message: "Category deleted" }` ngay cả khi ID truyền vào hoàn toàn không tồn tại.

## Status / Related Bugs

FAIL / DEF-FR14-03 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
