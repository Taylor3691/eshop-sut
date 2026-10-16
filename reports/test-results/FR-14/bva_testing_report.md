# Báo cáo Thực thi Phân tích Giá trị Biên (BVA Testing Report) — FR-14: Quản lý Danh mục (Category CRUD)

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-14 (Quản lý Danh mục — Category CRUD) & FR-12 (Kiểm soát truy cập Admin)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Web Admin: `http://localhost:5174` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tập trung Phân tích Biên (BVA Focus)**:
  - Biên độ dài tên danh mục khi tạo mới: `length = 0` (`min - 1`), `length = 1` (`min`), `length = 2` (`min + 1`).
  - Biên độ dài sau khi loại bỏ khoảng trắng (Trimmed length): `trimmed = 0` (`min - 1`), `trimmed = 1` (`min`).
  - Biên độ dài tên danh mục khi cập nhật: `length = 0`, `length = 1`, `length = 2`.
  - Biên mã định danh danh mục (Category ID): `id = 0` (`min - 1`), `id = -1` (ngoài biên âm), `id = 1` (`min valid`), `id = max + 1` (ngoài biên trên).
  - Biên số lượng danh mục trong hệ thống: `count = 0` (tập rỗng), `count = 1` (tập tối thiểu).
  - Biên số lượng sản phẩm liên kết khi xóa: `product_count = 0` (độc lập), `product_count = 1` (ngưỡng phụ thuộc liên kết).

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case BVA (Total BVA Test Cases)** | 16 | 100% |
| **Số Test Case đã thực thi (Executed)** | 16 | 100% |
| **Số Test Case ĐẠT (PASS)** | 9 | 56.25% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 7 | 43.75% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi phần mềm xác minh (Verified Defects)** | 3 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Điểm Biên Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-BVA-CAT-001** | Độ dài tên danh mục dưới biên tối thiểu khi tạo mới (length = 0, chuỗi rỗng) | `name: "" (length = 0)` | - Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*. - Hệ thống từ chối yêu cầu, trả về mã lỗ... | Backend chấp nhận chuỗi rỗng (length = 0), trả về HTTP 200 OK {"message": "Category created", "id": 21}. Vi phạm ràng buộc không được để trống. | **FAIL** | [TC-BVA-CAT-001.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-001.png) | DEF-FR14-01 |
| **TC-BVA-CAT-002** | Độ dài tên danh mục tại đúng biên tối thiểu khi tạo mới (length = 1) | `name: "A" (length = 1)` | - Hệ thống chấp nhận và tạo danh mục thành công, trả về mã trạng thái HTTP 200 (hoặc 201 Created). - Phản hồi ch... | Tạo danh mục 1 ký tự tại biên tối thiểu hợp lệ thành công, trả về HTTP 200 OK {"message": "Category created", "id": 22}. | **PASS** | [TC-BVA-CAT-002.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-002.png) | Không có |
| **TC-BVA-CAT-003** | Độ dài tên danh mục ngay trên biên tối thiểu khi tạo mới (length = 2) | `name: "TB" (length = 2)` | - Hệ thống xử lý thành công, trả về HTTP 200 kèm `id` danh mục mới. - Danh mục `"TB"` được lưu trữ đầy đủ và hiể... | Tạo danh mục 2 ký tự ngay trên biên tối thiểu thành công, trả về HTTP 200 OK {"message": "Category created", "id": 23}. | **PASS** | [TC-BVA-CAT-003.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-003.png) | Không có |
| **TC-BVA-CAT-004** | Độ dài tên danh mục sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed length = 0) | `name: " " (trimmed length = 0)` | - Hệ thống thực hiện chuẩn hóa (trim) chuỗi đầu vào; chuỗi chỉ chứa khoảng trắng được coi là rỗng (`length = 0`)... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 24}. Hệ thống không trim() khoảng trắng trước khi lưu. | **FAIL** | [TC-BVA-CAT-004.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-004.png) | DEF-FR14-01 |
| **TC-BVA-CAT-005** | Độ dài tên danh mục sau khi loại bỏ khoảng trắng tại đúng biên tối thiểu (trimmed length = 1) | `name: " K " (trimmed length = 1)` | - Hệ thống chấp nhận tạo danh mục thành công, trả về HTTP 200. - Tên danh mục được chuẩn hóa thành `"K"` (hoặc l... | Hệ thống chấp nhận tạo danh mục " B " thành công, trả về HTTP 200 OK. | **PASS** | [TC-BVA-CAT-005.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-005.png) | Không có |
| **TC-BVA-CAT-006** | Độ dài tên danh mục dưới biên tối thiểu khi cập nhật (length = 0, chuỗi rỗng) | `PUT /categories/1, name: "" (length = 0)` | - Hệ thống từ chối cập nhật do vi phạm ràng buộc tên danh mục không được để trống. - Trả về mã lỗi HTTP 400 Bad ... | Backend trả về HTTP 200 OK {"message": "Category updated"} và cập nhật tên thành chuỗi rỗng. Thiếu validate độ dài tối thiểu khi update. | **FAIL** | [TC-BVA-CAT-006.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-006.png) | DEF-FR14-01 |
| **TC-BVA-CAT-007** | Độ dài tên danh mục tại đúng biên tối thiểu khi cập nhật (length = 1) | `PUT /categories/2, name: "X" (length = 1)` | - Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`. - Danh mục `id = 2` có tên m... | Cập nhật tên danh mục 1 ký tự "X" thành công, phản hồi HTTP 200 OK {"message": "Category updated"}. | **PASS** | [TC-BVA-CAT-007.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-007.png) | Không có |
| **TC-BVA-CAT-008** | Độ dài tên danh mục ngay trên biên tối thiểu khi cập nhật (length = 2) | `PUT /categories/3, name: "PK" (length = 2)` | - Hệ thống xử lý cập nhật thành công, trả về HTTP 200. - Danh mục `id = 3` được đổi tên thành `"PK"`. | Cập nhật tên danh mục 2 ký tự "XY" thành công, phản hồi HTTP 200 OK {"message": "Category updated"}. | **PASS** | [TC-BVA-CAT-008.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-008.png) | Không có |
| **TC-BVA-CAT-009** | Mã định danh dưới biên tối thiểu hợp lệ khi cập nhật danh mục (id = 0) | `PUT /categories/0 (id = 0)` | - Hệ thống xác định `id = 0` không tồn tại trong cơ sở dữ liệu. - Trả về mã lỗi HTTP 404 Not Found (hoặc thông b... | Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID = 0 không tồn tại. Hệ thống không kiểm tra this.changes === 0. | **FAIL** | [TC-BVA-CAT-009.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-009.png) | DEF-FR14-03 |
| **TC-BVA-CAT-010** | Mã định danh số âm ngoài biên hợp lệ khi xóa danh mục (id = -1) | `DELETE /categories/-1 (id = -1)` | - Hệ thống nhận diện ID số âm không hợp lệ và từ chối yêu cầu. - Trả về mã lỗi HTTP 400 Bad Request hoặc 404 Not... | Backend trả về HTTP 200 OK {"message": "Category deleted"} với ID âm (-1). Không từ chối HTTP 400 hoặc 404. | **FAIL** | [TC-BVA-CAT-010.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-010.png) | DEF-FR14-03 |
| **TC-BVA-CAT-011** | Mã định danh tại đúng biên nhỏ nhất của cơ sở dữ liệu khi thao tác (id = 1) | `PUT /categories/1 (id = 1)` | - Hệ thống cập nhật thành công, trả về HTTP 200. - Bản ghi có `id = 1` được cập nhật chính xác. | Thao tác cập nhật danh mục tại biên ID hợp lệ nhỏ nhất thực hiện thành công, trả về HTTP 200 OK. | **PASS** | [TC-BVA-CAT-011.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-011.png) | Không có |
| **TC-BVA-CAT-012** | Mã định danh ngay trên biên tồn tại lớn nhất khi xóa danh mục (id = max_existing_id + 1) | `DELETE /categories/4 (id = max_id + 1)` | - Hệ thống kiểm tra thấy `id = 4` không tồn tại trong bảng `categories`. - Trả về mã lỗi HTTP 404 Not Found (hoặ... | Backend trả về HTTP 200 OK {"message": "Category deleted"} cho ID không tồn tại #125 thay vì trả về HTTP 404 Not Found. | **FAIL** | [TC-BVA-CAT-012.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-012.png) | DEF-FR14-03 |
| **TC-BVA-CAT-013** | Biên số lượng danh mục tối thiểu trong hệ thống (count = 0, danh sách rỗng) | `GET /api/categories (count = 0)` | - Hệ thống trả về mã trạng thái HTTP 200 OK. - Dữ liệu trả về là một mảng rỗng: `[]` (`response.data.length === ... | API GET /api/categories trả về HTTP 200 OK, định dạng kiểu mảng chuẩn (Array), không trả về null hay undefined khi rỗng. | **PASS** | [TC-BVA-CAT-013.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-013.png) | Không có |
| **TC-BVA-CAT-014** | Biên số lượng danh mục ngay trên mức tối thiểu (count = 1) | `GET /api/categories (count = 1)` | - Hệ thống trả về HTTP 200 OK. - Mảng dữ liệu chứa chính xác 1 phần tử (`response.data.length === 1`). - Thông t... | API GET /api/categories trả về HTTP 200 OK với danh sách mảng đối tượng danh mục chuẩn xác. | **PASS** | [TC-BVA-CAT-014.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-014.png) | Không có |
| **TC-BVA-CAT-015** | Biên số lượng sản phẩm liên kết bằng 0 khi xóa danh mục (product_count = 0) | `DELETE /categories/5 (product_count = 0)` | - Hệ thống xóa thành công do không có ràng buộc phụ thuộc dữ liệu nào, trả về HTTP 200. - Danh mục `id = 5` bị x... | Xóa danh mục độc lập có 0 sản phẩm liên kết thành công, trả về HTTP 200 OK {"message": "Category deleted"}. | **PASS** | [TC-BVA-CAT-015.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-015.png) | Không có |
| **TC-BVA-CAT-016** | Biên số lượng sản phẩm liên kết bằng 1 khi xóa danh mục (product_count = 1) | `DELETE /categories/6 (product_count = 1)` | - Theo tiêu chuẩn toàn vẹn dữ liệu quan hệ: Hệ thống phải phát hiện có sản phẩm liên kết và từ chối xóa (HTTP 40... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục dù có 1 sản phẩm liên kết. Sản phẩm ID #6 bị mồ côi (orphaned) do thiếu ràng buộc khóa ngoại. | **FAIL** | [TC-BVA-CAT-016.png](../../../tests/test-cases/categories/screenshots/TC-BVA-CAT-016.png) | DEF-FR14-05 |

---

## 4. Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR14-01: Chấp nhận tên danh mục rỗng hoặc khoảng trắng dưới biên tối thiểu (length = 0)
- **Mức độ Nghiêm trọng**: Cao (Boundary Validation Defect)
- **Vị trí**: `backend/server.js:249-267`
- **Mô tả**: Khi gửi tên danh mục có `length = 0` (`""`) hoặc `trimmed length = 0` (`"   "`) trong thao tác Tạo mới hoặc Cập nhật, hệ thống không chặn ở giá trị biên dưới mức tối thiểu mà vẫn lưu bản ghi và trả về HTTP 200 OK, vi phạm ràng buộc bắt buộc nhập tên.

### DEF-FR14-03: Thao tác Cập nhật và Xóa với ID ngoài biên hợp lệ (id <= 0 hoặc non-existent id) trả về HTTP 200
- **Mức độ Nghiêm trọng**: Trung bình (Boundary & REST API Defect)
- **Vị trí**: `backend/server.js:257-278`
- **Mô tả**: Với các giá trị ID dưới biên hợp lệ (`id = 0`, `id = -1`) hoặc trên biên tồn tại lớn nhất (`id = max_id + 1`), hệ thống không kiểm tra số lượng bản ghi thực tế được cập nhật/xóa (`this.changes === 0`), vẫn trả về HTTP 200 OK thay vì từ chối HTTP 400 hoặc 404.

### DEF-FR14-05: Cho phép xóa danh mục tại biên có sản phẩm liên kết (product_count = 1) gây lỗi dữ liệu mồ côi
- **Mức độ Nghiêm trọng**: Cao (Referential Boundary Defect)
- **Vị trí**: `backend/server.js:269-278`, `backend/database.js:23-26`
- **Mô tả**: Tại điểm biên bắt đầu xuất hiện ràng buộc dữ liệu quan hệ (`product_count = 1`), hệ thống không có kiểm tra hay kích hoạt khóa ngoại ngăn chặn xóa. Thao tác xóa danh mục vẫn hoàn tất thành công (HTTP 200), để lại sản phẩm mồ côi không có danh mục hợp lệ.
