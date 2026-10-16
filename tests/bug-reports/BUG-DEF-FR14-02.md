# [BUG][DEF-FR14-02] Lỗ hổng kiểm soát truy cập (Broken Access Control) trên các endpoint Category CRUD

## Found by Test Case

[TC-CAT-012](../test-cases/categories/TC-CAT-012.md), [TC-CAT-018](../test-cases/categories/TC-CAT-018.md), [TC-CAT-023](../test-cases/categories/TC-CAT-023.md), [TC-GAP-CAT-004](../test-cases/categories/ai-gap/TC-GAP-CAT-004.md), [TC-GAP-CAT-005](../test-cases/categories/ai-gap/TC-GAP-CAT-005.md), [TC-GAP-CAT-006](../test-cases/categories/ai-gap/TC-GAP-CAT-006.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Nghiêm trọng (Security Defect / Access Control)
- **Vị trí**: `backend/server.js:249-278`
- **Mô tả**: Các API `POST /api/categories`, `PUT /api/categories/:id`, và `DELETE /api/categories/:id` chỉ áp dụng middleware `authenticateToken` để kiểm tra JWT hợp lệ, mà hoàn toàn không kiểm tra phân quyền `req.user.role === 'admin'`. Người dùng thông thường sở hữu token hợp lệ (`role = 'user'`) có thể tự do tạo mới, chỉnh sửa, và xóa danh mục hệ thống, vi phạm yêu cầu FR-12 và FR-14.

- **GitHub Issue:** [#24](https://github.com/Taylor3691/eshop-sut/issues/24).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-CAT-012` | - Theo đặc tả: Chỉ tài khoản Admin mới có quyền Thêm / Xóa danh mục; role khác admin phải trả về HTTP 403 Forbid... | Hệ thống trả về HTTP 200 OK {"message": "Category created", "id": 16}. Token của user thông thường được chấp nhận do server thiếu bước kiểm tra role === 'admin'. | [TC-CAT-012.png](../test-cases/categories/screenshots/TC-CAT-012.png) |
| `TC-CAT-018` | - Hệ thống từ chối cập nhật do thiếu quyền Admin, trả về HTTP 403 Forbidden. - Danh mục ID 1 giữ nguyên tên ban ... | Hệ thống trả về HTTP 200 OK {"message": "Category updated"}. User thường có thể sửa danh mục do thiếu kiểm tra quyền Admin tại endpoint PUT. | [TC-CAT-018.png](../test-cases/categories/screenshots/TC-CAT-018.png) |
| `TC-CAT-023` | - Hệ thống từ chối xóa do người dùng không có vai trò Admin, trả về HTTP 403 Forbidden. - Danh mục ID 3 không bị... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục thành công khi dùng Token của User thường. Thiếu kiểm tra role Admin. | [TC-CAT-023.png](../test-cases/categories/screenshots/TC-CAT-023.png) |
| `TC-GAP-CAT-004` | HTTP 403 Forbidden; từ chối người dùng thường | HTTP 200; {"message":"Category created","id":8} | Recorded: authenticateToken không kiểm tra role === 'admin'; user thường tạo được danh mục |
| `TC-GAP-CAT-005` | HTTP 403 Forbidden; từ chối chỉnh sửa | HTTP 200; {"message":"Category updated"} | Recorded: User thường đổi được tên danh mục id = 1 thành "User Mod" |
| `TC-GAP-CAT-006` | HTTP 403 Forbidden; từ chối thao tác xóa | HTTP 200; {"message":"Category deleted"} | Recorded: User thường xóa thành công danh mục id = 3 khỏi hệ thống |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
