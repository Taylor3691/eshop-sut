# [BUG][DEF-FR14-01] Chấp nhận tên danh mục rỗng, khoảng trắng hoặc giá trị null khi tạo và cập nhật danh mục

## Found by Test Case

[TC-BVA-CAT-001](../test-cases/categories/TC-BVA-CAT-001.md), [TC-BVA-CAT-004](../test-cases/categories/TC-BVA-CAT-004.md), [TC-BVA-CAT-006](../test-cases/categories/TC-BVA-CAT-006.md), [TC-CAT-005](../test-cases/categories/TC-CAT-005.md), [TC-CAT-006](../test-cases/categories/TC-CAT-006.md), [TC-CAT-007](../test-cases/categories/TC-CAT-007.md), [TC-CAT-008](../test-cases/categories/TC-CAT-008.md), [TC-CAT-016](../test-cases/categories/TC-CAT-016.md), [TC-CAT-024](../test-cases/categories/TC-CAT-024.md), [TC-GAP-CAT-001](../test-cases/categories/ai-gap/TC-GAP-CAT-001.md), [TC-GAP-CAT-002](../test-cases/categories/ai-gap/TC-GAP-CAT-002.md), [TC-GAP-CAT-003](../test-cases/categories/ai-gap/TC-GAP-CAT-003.md), [TC-GAP-CAT-011](../test-cases/categories/ai-gap/TC-GAP-CAT-011.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (Functional Defect / Validation Defect)
- **Vị trí**: `backend/server.js:249-267`
- **Mô tả**: Endpoint `POST /api/categories` và `PUT /api/categories/:id` không kiểm tra tính hợp lệ của trường `name` (không kiểm tra `!name || name.trim() === ''`). Cơ sở dữ liệu SQLite bảng `categories` cũng không có ràng buộc `NOT NULL`, dẫn đến việc hệ thống chấp nhận chuỗi rỗng `""`, chuỗi khoảng trắng `"   "`, `null` hoặc payload rỗng `{}` và trả về HTTP 200 OK, vi phạm yêu cầu nghiệp vụ *"Tên danh mục là bắt buộc, không được để trống"*.

- **GitHub Issue:** [#23](https://github.com/Taylor3691/eshop-sut/issues/23).
- **Manual review:** Whitespace-only names (TC-CAT-006, TC-BVA-CAT-004) require confirmation whether trimming is required.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-CAT-001` | - Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*. - Hệ thống từ chối yêu cầu, trả về mã lỗ... | Backend chấp nhận chuỗi rỗng (length = 0), trả về HTTP 200 OK {"message": "Category created", "id": 21}. Vi phạm ràng buộc không được để trống. | [TC-BVA-CAT-001.png](../test-cases/categories/screenshots/TC-BVA-CAT-001.png) |
| `TC-BVA-CAT-004` | - Hệ thống thực hiện chuẩn hóa (trim) chuỗi đầu vào; chuỗi chỉ chứa khoảng trắng được coi là rỗng (length = 0)... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 24}. Hệ thống không trim() khoảng trắng trước khi lưu. | [TC-BVA-CAT-004.png](../test-cases/categories/screenshots/TC-BVA-CAT-004.png) |
| `TC-BVA-CAT-006` | - Hệ thống từ chối cập nhật do vi phạm ràng buộc tên danh mục không được để trống. - Trả về mã lỗi HTTP 400 Bad ... | Backend trả về HTTP 200 OK {"message": "Category updated"} và cập nhật tên thành chuỗi rỗng. Thiếu validate độ dài tối thiểu khi update. | [TC-BVA-CAT-006.png](../test-cases/categories/screenshots/TC-BVA-CAT-006.png) |
| `TC-CAT-005` | - Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*. - Hệ thống từ chối request, trả về mã lỗ... | Backend trả về HTTP 200 OK và tạo danh mục với tên rỗng vào CSDL. Form Admin không chặn submit chuỗi rỗng, thêm dòng danh mục không tên vào bảng. | [TC-CAT-005.png](../test-cases/categories/screenshots/TC-CAT-005.png) |
| `TC-CAT-006` | - Hệ thống áp dụng quy tắc cắt khoảng trắng (trim) và xác định tên rỗng, từ chối tạo với HTTP 400. - Không có da... | Backend trả về HTTP 200 OK và lưu danh mục chứa toàn khoảng trắng. Không có cơ chế trim() hay kiểm tra độ dài ký tự thực tế. | [TC-CAT-006.png](../test-cases/categories/screenshots/TC-CAT-006.png) |
| `TC-CAT-007` | - Hệ thống phát hiện thiếu trường bắt buộc name (undefined/missing). - Trả về mã lỗi HTTP 400 Bad Request kèm ... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 12}. Hệ thống chèn giá trị undefined/null vào CSDL thay vì từ chối HTTP 400. | [TC-CAT-007.png](../test-cases/categories/screenshots/TC-CAT-007.png) |
| `TC-CAT-008` | - Hệ thống từ chối giá trị null đối với trường bắt buộc, trả về HTTP 400 Bad Request. - CSDL không lưu bản ghi... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 13}. CSDL chèn giá trị NULL do thiếu ràng buộc NOT NULL. | [TC-CAT-008.png](../test-cases/categories/screenshots/TC-CAT-008.png) |
| `TC-CAT-016` | - Hệ thống từ chối cập nhật do tên danh mục là bắt buộc và không được để trống (HTTP 400). - Tên danh mục ID 2 k... | Backend trả về HTTP 200 OK {"message": "Category updated"} và ghi đè tên danh mục ID 2 thành chuỗi rỗng, vi phạm ràng buộc tên bắt buộc. | [TC-CAT-016.png](../test-cases/categories/screenshots/TC-CAT-016.png) |
| `TC-CAT-024` | - Giao diện người dùng phải ngăn chặn việc submit biểu mẫu (Client-side validation). - Hiển thị thông báo yêu cầ... | Form không có thuộc tính HTML5 required, gửi request POST rỗng thành công và thêm một dòng trống mới vào bảng quản trị mà không có thông báo lỗi hay ngăn chặn. | [TC-CAT-024.png](../test-cases/categories/screenshots/TC-CAT-024.png) |
| `TC-GAP-CAT-001` | HTTP 400; từ chối tạo do tên bắt buộc | HTTP 200; {"message":"Category created","id":4} | Recorded: Server tạo danh mục có tên "" trong SQLite; vi phạm FR-14 |
| `TC-GAP-CAT-002` | HTTP 400; từ chối chuỗi rỗng sau khi trim | HTTP 200; {"message":"Category created","id":5} | Recorded: Server tạo danh mục có tên " " trong CSDL |
| `TC-GAP-CAT-003` | HTTP 400; yêu cầu trường name | HTTP 200; {"message":"Category created","id":6} | Recorded: CSDL lưu bản ghi có name = null |
| `TC-GAP-CAT-011` | HTTP 400; từ chối giá trị null | HTTP 200; {"message":"Category updated"} | Recorded: Danh mục id = 2 bị cập nhật thành name = null trong CSDL |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-14/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
