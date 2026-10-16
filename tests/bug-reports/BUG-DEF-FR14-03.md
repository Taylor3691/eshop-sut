# [BUG][DEF-FR14-03] API Cập nhật và Xóa danh mục trả về HTTP 200 khi ID không tồn tại hoặc ID âm/bằng 0

## Found by Test Case

[TC-BVA-CAT-009](../test-cases/categories/TC-BVA-CAT-009.md), [TC-BVA-CAT-010](../test-cases/categories/TC-BVA-CAT-010.md), [TC-BVA-CAT-012](../test-cases/categories/TC-BVA-CAT-012.md), [TC-CAT-017](../test-cases/categories/TC-CAT-017.md), [TC-CAT-021](../test-cases/categories/TC-CAT-021.md), [TC-GAP-CAT-007](../test-cases/categories/ai-gap/TC-GAP-CAT-007.md), [TC-GAP-CAT-008](../test-cases/categories/ai-gap/TC-GAP-CAT-008.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Trung bình (REST API Standard Defect)
- **Vị trí**: `backend/server.js:257-278`
- **Mô tả**: Khi thực hiện `PUT /api/categories/:id` hoặc `DELETE /api/categories/:id` với `id` không tồn tại trong hệ thống (như `id = 9999`, `id = 0`, `id = -1`), server không kiểm tra số dòng bị ảnh hưởng (`this.changes === 0`) mà vẫn trả về phản hồi thành công `HTTP 200 OK` với thông báo `"Category updated"` hoặc `"Category deleted"` thay vì trả về `HTTP 404 Not Found` hoặc `HTTP 400 Bad Request`.

- **Manual review:** Requirements do not specify the response for nonexistent category IDs; review TC-CAT-017, TC-CAT-021, and related BVA cases.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-CAT-009` | - Hệ thống xác định id = 0 không tồn tại trong cơ sở dữ liệu. - Trả về mã lỗi HTTP 404 Not Found (hoặc thông b... | Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID = 0 không tồn tại. Hệ thống không kiểm tra this.changes === 0. | [TC-BVA-CAT-009.png](../test-cases/categories/screenshots/TC-BVA-CAT-009.png) |
| `TC-BVA-CAT-010` | - Hệ thống nhận diện ID số âm không hợp lệ và từ chối yêu cầu. - Trả về mã lỗi HTTP 400 Bad Request hoặc 404 Not... | Backend trả về HTTP 200 OK {"message": "Category deleted"} với ID âm (-1). Không từ chối HTTP 400 hoặc 404. | [TC-BVA-CAT-010.png](../test-cases/categories/screenshots/TC-BVA-CAT-010.png) |
| `TC-BVA-CAT-012` | - Hệ thống kiểm tra thấy id = 4 không tồn tại trong bảng categories. - Trả về mã lỗi HTTP 404 Not Found (hoặ... | Backend trả về HTTP 200 OK {"message": "Category deleted"} cho ID không tồn tại #125 thay vì trả về HTTP 404 Not Found. | [TC-BVA-CAT-012.png](../test-cases/categories/screenshots/TC-BVA-CAT-012.png) |
| `TC-CAT-017` | - Hệ thống thông báo không tìm thấy bản ghi cần cập nhật, trả về HTTP 404 Not Found (hoặc thông báo lỗi rõ ràng)... | Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID 9999 không tồn tại trong CSDL. Hệ thống không kiểm tra this.changes === 0 để trả về 404. | [TC-CAT-017.png](../test-cases/categories/screenshots/TC-CAT-017.png) |
| `TC-CAT-021` | - Hệ thống trả về lỗi HTTP 404 Not Found (hoặc thông báo danh mục không tồn tại). - Không làm gián đoạn hệ thống... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} dù ID 9999 không tồn tại. Thiếu kiểm tra this.changes để trả về lỗi 404. | [TC-CAT-021.png](../test-cases/categories/screenshots/TC-CAT-021.png) |
| `TC-GAP-CAT-007` | HTTP 404 Not Found; báo ID không tồn tại | HTTP 200; {"message":"Category updated"} | Recorded: Server không kiểm tra this.changes, báo thành công giả |
| `TC-GAP-CAT-008` | HTTP 404 Not Found; báo ID không tồn tại | HTTP 200; {"message":"Category deleted"} | Recorded: Server không kiểm tra this.changes, báo thành công giả |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-14/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
