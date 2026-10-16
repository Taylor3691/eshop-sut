# [BUG][DEF-FR14-06] Không kiểm tra tính duy nhất (Uniqueness), cho phép tạo nhiều danh mục trùng tên

## Found by Test Case

[TC-CAT-009](../test-cases/categories/TC-CAT-009.md), [TC-GAP-CAT-010](../test-cases/categories/ai-gap/TC-GAP-CAT-010.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Trung bình (Business Logic Defect)
- **Vị trí**: `backend/server.js:249-254`, `backend/database.js:23-26`
- **Mô tả**: Cột `name` trong bảng `categories` không có ràng buộc `UNIQUE` và API `POST /api/categories` không kiểm tra sự tồn tại của tên danh mục trước khi `INSERT`. Hệ thống cho phép tạo nhiều danh mục trùng tên hoàn toàn (ví dụ trùng "Điện thoại"), gây nhiễu và trùng lặp dữ liệu danh mục phân loại sản phẩm.

- **Manual review:** Requirements do not state that category names must be unique; review TC-CAT-009.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-CAT-009` | - Nếu hệ thống có ràng buộc tính duy nhất (UNIQUE): Trả về HTTP 400 / 409 Conflict thông báo tên danh mục đã tồn... | Backend trả về HTTP 200 OK và tạo thêm danh mục trùng tên "Điện thoại" (ID mới #14). Bảng CSDL không có ràng buộc UNIQUE cho cột name. | [TC-CAT-009.png](../test-cases/categories/screenshots/TC-CAT-009.png) |
| `TC-GAP-CAT-010` | HTTP 400/409 Conflict; từ chối trùng tên | HTTP 200; {"message":"Category created","id":9} | Recorded: Bảng categories không có ràng buộc UNIQUE, tạo 2 danh mục cùng tên |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
