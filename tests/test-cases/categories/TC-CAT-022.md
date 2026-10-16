# TC-CAT-022: Từ chối xóa danh mục khi client chưa đăng nhập (Thiếu Token)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Client không gửi token xác thực.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/2` |
| Headers | Không có `Authorization` header |

## Test Steps

1. Gửi request `DELETE /api/categories/2` không kèm token.
2. Kiểm tra phản hồi từ server.

## Expected Result

- Hệ thống từ chối yêu cầu và trả về HTTP 401 Unauthorized.
- Danh mục ID 2 vẫn tồn tại nguyên vẹn trong CSDL.

## Actual Result

Middleware authenticateToken chặn request thành công, trả về HTTP 401 Unauthorized {"error": "Token missing"}.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-022.png)

## Coverage Rationale

Kiểm thử bảo mật tầng xác thực cho thao tác xóa dữ liệu (Thiếu thông tin danh tính).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
