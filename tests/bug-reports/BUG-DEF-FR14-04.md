# [BUG][DEF-FR14-04] Biểu mẫu Thêm danh mục trên Web Admin thiếu xác thực đầu vào phía Client (Client-side Validation)

## Found by Test Case

[TC-CAT-024](../test-cases/categories/TC-CAT-024.md), [TC-GAP-CAT-012](../test-cases/categories/ai-gap/TC-GAP-CAT-012.md).

## Related requirement

FR-14 (category management); access control references FR-12.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Trung bình (UI/Form Validation Defect)
- **Vị trí**: `frontend-admin/src/App.jsx:298-308`
- **Mô tả**: Ô input "Tên danh mục mới" không có thuộc tính HTML5 `required`, hàm `handleCategorySubmit` không kiểm tra `if (!categoryName.trim()) return;`. Khi người dùng click nút "Thêm mới" với ô nhập trống, form vẫn gửi request rỗng lên server và bổ sung dòng trống vào bảng danh mục trên giao diện.

- **GitHub Issue:** [#23](https://github.com/Taylor3691/eshop-sut/issues/23).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-CAT-024` | - Giao diện người dùng phải ngăn chặn việc submit biểu mẫu (Client-side validation). - Hiển thị thông báo yêu cầ... | Form không có thuộc tính HTML5 required, gửi request POST rỗng thành công và thêm một dòng trống mới vào bảng quản trị mà không có thông báo lỗi hay ngăn chặn. | [TC-CAT-024.png](../test-cases/categories/screenshots/TC-CAT-024.png) |
| `TC-GAP-CAT-012` | UI chặn gửi form; hiển thị thông báo lỗi | Form gửi { name: "" } lên API; thêm dòng trống | Recorded: App.jsx:297 thiếu thuộc tính required và validation |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-14/domain_testing_report.md)
- [FR-14-ai-gap-analysis.md](../test-summary/FR-14-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
