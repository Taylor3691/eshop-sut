# [BUG][DEF-FR14-05] Vi phạm ràng buộc toàn vẹn dữ liệu quan hệ (Referential Integrity) khi xóa danh mục có sản phẩm liên kết

## Found by Test Case

[TC-BVA-CAT-016](../test-cases/categories/TC-BVA-CAT-016.md), [TC-CAT-020](../test-cases/categories/TC-CAT-020.md), [TC-GAP-CAT-009](../test-cases/categories/ai-gap/TC-GAP-CAT-009.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (Data Integrity Defect)
- **Vị trí**: `backend/server.js:269-278`, `backend/database.js:23-26`
- **Mô tả**: Bảng `products` liên kết với bảng `categories` qua `category_id`, nhưng cơ sở dữ liệu không kích hoạt ràng buộc khóa ngoại (`PRAGMA foreign_keys = ON;`), và API `DELETE /api/categories/:id` không kiểm tra xem danh mục có đang chứa sản phẩm hay không. Khi Admin xóa danh mục, danh mục bị xóa thành công khiến các sản phẩm liên kết trở thành bản ghi mồ côi (`orphaned foreign key`), làm sai lệch hiển thị danh mục và lọc sản phẩm.

- **Manual review:** No requirement defines deletion behavior for a category referenced by products; review TC-CAT-020 and TC-BVA-CAT-016.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-CAT-016` | - Theo tiêu chuẩn toàn vẹn dữ liệu quan hệ: Hệ thống phải phát hiện có sản phẩm liên kết và từ chối xóa (HTTP 40... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục dù có 1 sản phẩm liên kết. Sản phẩm ID #6 bị mồ côi (orphaned) do thiếu ràng buộc khóa ngoại. | [TC-BVA-CAT-016.png](../test-cases/categories/screenshots/TC-BVA-CAT-016.png) |
| `TC-CAT-020` | - Theo chuẩn toàn vẹn dữ liệu: Hệ thống phải từ chối xóa hoặc cảnh báo lỗi xung đột ràng buộc (HTTP 400 hoặc 409... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa mất danh mục ID 1. Toàn bộ 2 sản phẩm liên kết bị mồ côi (category_id = 1 không còn tồn tại). | [TC-CAT-020.png](../test-cases/categories/screenshots/TC-CAT-020.png) |
| `TC-GAP-CAT-009` | HTTP 400/409; từ chối xóa để bảo toàn dữ liệu | HTTP 200; {"message":"Category deleted"} | Recorded: Xóa mất DM 1; 2 sản phẩm iPhone và Samsung bị mồ côi category_id: 1 |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-14/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
