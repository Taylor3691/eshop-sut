# FR-14 — Category management

## Test Cases

| ID | Test case | Technique | Status |
|---|---|---|---|
| [TC-BVA-CAT-001](TC-BVA-CAT-001.md) | Độ dài tên danh mục dưới biên tối thiểu khi tạo mới (length = 0, chuỗi rỗng) | BVA | FAIL |
| [TC-BVA-CAT-002](TC-BVA-CAT-002.md) | Độ dài tên danh mục tại đúng biên tối thiểu khi tạo mới (length = 1) | BVA | PASS |
| [TC-BVA-CAT-003](TC-BVA-CAT-003.md) | Độ dài tên danh mục ngay trên biên tối thiểu khi tạo mới (length = 2) | BVA | PASS |
| [TC-BVA-CAT-004](TC-BVA-CAT-004.md) | Độ dài tên danh mục sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed length = 0) | BVA | FAIL |
| [TC-BVA-CAT-005](TC-BVA-CAT-005.md) | Độ dài tên danh mục sau khi loại bỏ khoảng trắng tại đúng biên tối thiểu (trimmed length = 1) | BVA | PASS |
| [TC-BVA-CAT-006](TC-BVA-CAT-006.md) | Độ dài tên danh mục dưới biên tối thiểu khi cập nhật (length = 0, chuỗi rỗng) | BVA | FAIL |
| [TC-BVA-CAT-007](TC-BVA-CAT-007.md) | Độ dài tên danh mục tại đúng biên tối thiểu khi cập nhật (length = 1) | BVA | PASS |
| [TC-BVA-CAT-008](TC-BVA-CAT-008.md) | Độ dài tên danh mục ngay trên biên tối thiểu khi cập nhật (length = 2) | BVA | PASS |
| [TC-BVA-CAT-009](TC-BVA-CAT-009.md) | Mã định danh dưới biên tối thiểu hợp lệ khi cập nhật danh mục (id = 0) | BVA | FAIL |
| [TC-BVA-CAT-010](TC-BVA-CAT-010.md) | Mã định danh số âm ngoài biên hợp lệ khi xóa danh mục (id = -1) | BVA | FAIL |
| [TC-BVA-CAT-011](TC-BVA-CAT-011.md) | Mã định danh tại đúng biên nhỏ nhất của cơ sở dữ liệu khi thao tác (id = 1) | BVA | PASS |
| [TC-BVA-CAT-012](TC-BVA-CAT-012.md) | Mã định danh ngay trên biên tồn tại lớn nhất khi xóa danh mục (id = max_existing_id + 1) | BVA | FAIL |
| [TC-BVA-CAT-013](TC-BVA-CAT-013.md) | Biên số lượng danh mục tối thiểu trong hệ thống (count = 0, danh sách rỗng) | BVA | PASS |
| [TC-BVA-CAT-014](TC-BVA-CAT-014.md) | Biên số lượng danh mục ngay trên mức tối thiểu (count = 1) | BVA | PASS |
| [TC-BVA-CAT-015](TC-BVA-CAT-015.md) | Biên số lượng sản phẩm liên kết bằng 0 khi xóa danh mục (product_count = 0) | BVA | PASS |
| [TC-BVA-CAT-016](TC-BVA-CAT-016.md) | Biên số lượng sản phẩm liên kết bằng 1 khi xóa danh mục (product_count = 1) | BVA | FAIL |
| [TC-CAT-001](TC-CAT-001.md) | Thêm danh mục mới thành công với tên hợp lệ chuẩn (Quyền Admin) | Domain Testing | PASS |
| [TC-CAT-002](TC-CAT-002.md) | Thêm danh mục mới với tên chứa dấu tiếng Việt Unicode và ký tự đặc biệt hợp lệ | Domain Testing | PASS |
| [TC-CAT-003](TC-CAT-003.md) | Thêm danh mục mới với tên có độ dài tối thiểu (1 ký tự) | Domain Testing | PASS |
| [TC-CAT-004](TC-CAT-004.md) | Thêm danh mục mới với tên có độ dài lớn | Domain Testing | PASS |
| [TC-CAT-005](TC-CAT-005.md) | Từ chối thêm danh mục khi tên là chuỗi rỗng ("") | Domain Testing | FAIL |
| [TC-CAT-006](TC-CAT-006.md) | Từ chối thêm danh mục khi tên chỉ chứa toàn khoảng trắng ("   ") | Domain Testing | FAIL |
| [TC-CAT-007](TC-CAT-007.md) | Từ chối thêm danh mục khi thiếu trường "name" trong body request | Domain Testing | FAIL |
| [TC-CAT-008](TC-CAT-008.md) | Từ chối thêm danh mục khi giá trị trường "name" là null | Domain Testing | FAIL |
| [TC-CAT-009](TC-CAT-009.md) | Xử lý thêm danh mục trùng tên với danh mục đã tồn tại trong hệ thống | Domain Testing | FAIL |
| [TC-CAT-010](TC-CAT-010.md) | Xử lý an toàn khi tên danh mục chứa mã HTML/JavaScript (XSS Payload) | Domain Testing | PASS |
| [TC-CAT-011](TC-CAT-011.md) | Từ chối thêm danh mục khi client chưa đăng nhập (Thiếu JWT Token) | Domain Testing | PASS |
| [TC-CAT-012](TC-CAT-012.md) | Từ chối thêm danh mục khi người dùng là tài khoản thông thường (role = 'user') | Domain Testing | FAIL |
| [TC-CAT-013](TC-CAT-013.md) | Lấy danh sách danh mục thành công khi CSDL có dữ liệu (Public API) | Domain Testing | PASS |
| [TC-CAT-014](TC-CAT-014.md) | Lấy danh sách danh mục khi cơ sở dữ liệu chưa có danh mục nào | Domain Testing | PASS |
| [TC-CAT-015](TC-CAT-015.md) | Cập nhật tên danh mục thành công với ID tồn tại và tên mới hợp lệ (Admin) | Domain Testing | PASS |
| [TC-CAT-016](TC-CAT-016.md) | Từ chối cập nhật danh mục khi tên mới là chuỗi rỗng hoặc khoảng trắng | Domain Testing | FAIL |
| [TC-CAT-017](TC-CAT-017.md) | Xử lý cập nhật danh mục với ID không tồn tại trong hệ thống | Domain Testing | FAIL |
| [TC-CAT-018](TC-CAT-018.md) | Từ chối cập nhật danh mục khi người dùng không có quyền Admin | Domain Testing | FAIL |
| [TC-CAT-019](TC-CAT-019.md) | Xóa danh mục thành công khi danh mục tồn tại và không có sản phẩm liên kết | Domain Testing | PASS |
| [TC-CAT-020](TC-CAT-020.md) | Kiểm tra ràng buộc toàn vẹn khi xóa danh mục đang có sản phẩm liên kết | Domain Testing | FAIL |
| [TC-CAT-021](TC-CAT-021.md) | Xử lý xóa danh mục với ID không tồn tại trong CSDL | Domain Testing | FAIL |
| [TC-CAT-022](TC-CAT-022.md) | Từ chối xóa danh mục khi client chưa đăng nhập (Thiếu Token) | Domain Testing | PASS |
| [TC-CAT-023](TC-CAT-023.md) | Từ chối xóa danh mục khi người dùng có vai trò thường (role = 'user') | Domain Testing | FAIL |
| [TC-CAT-024](TC-CAT-024.md) | Kiểm tra form Thêm danh mục trên giao diện Admin khi để trống ô nhập tên | Domain Testing | FAIL |
| [TC-CAT-025](TC-CAT-025.md) | Kiểm tra luồng Thêm và Xóa danh mục hoàn chỉnh trên giao diện Admin | Domain Testing | PASS |

## AI Gap Cases

| ID | Scenario | Status |
|---|---|---|
| [TC-GAP-CAT-001](ai-gap/TC-GAP-CAT-001.md) | Thêm danh mục với tên là chuỗi rỗng qua API | FAIL |
| [TC-GAP-CAT-002](ai-gap/TC-GAP-CAT-002.md) | Thêm danh mục với tên chỉ chứa toàn khoảng trắng qua API | FAIL |
| [TC-GAP-CAT-003](ai-gap/TC-GAP-CAT-003.md) | Thêm danh mục khi không truyền trường "name" hoặc "name: null" | FAIL |
| [TC-GAP-CAT-004](ai-gap/TC-GAP-CAT-004.md) | Người dùng thường thực hiện thêm danh mục (Lỗ hổng Phân quyền RBAC) | FAIL |
| [TC-GAP-CAT-005](ai-gap/TC-GAP-CAT-005.md) | Người dùng thường thực hiện cập nhật danh mục qua API | FAIL |
| [TC-GAP-CAT-006](ai-gap/TC-GAP-CAT-006.md) | Người dùng thường thực hiện xóa danh mục qua API | FAIL |
| [TC-GAP-CAT-007](ai-gap/TC-GAP-CAT-007.md) | Cập nhật danh mục với ID không tồn tại báo thành công giả (False-Positive Success) | FAIL |
| [TC-GAP-CAT-008](ai-gap/TC-GAP-CAT-008.md) | Xóa danh mục với ID không tồn tại báo thành công giả (False-Positive Success) | FAIL |
| [TC-GAP-CAT-009](ai-gap/TC-GAP-CAT-009.md) | Xóa danh mục đang có sản phẩm liên kết gây mồ côi dữ liệu khóa ngoại (Orphaned Foreign Key) | FAIL |
| [TC-GAP-CAT-010](ai-gap/TC-GAP-CAT-010.md) | Thêm danh mục trùng lặp tên do thiếu ràng buộc duy nhất (Missing Unique Constraint) | FAIL |
| [TC-GAP-CAT-011](ai-gap/TC-GAP-CAT-011.md) | Cập nhật danh mục với giá trị tên là null làm hỏng dữ liệu | FAIL |
| [TC-GAP-CAT-012](ai-gap/TC-GAP-CAT-012.md) | Thêm danh mục để trống tên trực tiếp qua biểu mẫu UI Admin | FAIL |

## Reports and analysis

- [Domain testing report](../../../reports/test-results/FR-14/domain_testing_report.md)
- [BVA testing report](../../../reports/test-results/FR-14/bva_testing_report.md)
- [Analysis: FR-14-ai-gap-analysis](../../test-summary/FR-14-ai-gap-analysis.md)
