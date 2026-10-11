# Báo cáo Thực thi Kiểm thử Miền giá trị (Domain Testing Report) — FR-14: Quản lý Danh mục (Category CRUD)

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-14 (Quản lý Danh mục — Category CRUD) & FR-12 (Kiểm soát truy cập Admin)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Web Admin: `http://localhost:5174` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tài khoản Kiểm thử**: `admin@eshop.com` / `Admin123!` (Admin), `test@eshop.com` / `Test1234!` (User)

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case thiết kế (Total Test Cases)** | 25 | 100% |
| **Số Test Case đã thực thi (Executed)** | 25 | 100% |
| **Số Test Case ĐẠT (PASS)** | 12 | 48.00% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 13 | 52.00% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi phần mềm xác minh (Verified Defects)** | 6 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Kịch bản Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-CAT-001** | Thêm danh mục mới thành công với tên hợp lệ chuẩn (Quyền Admin) | `name: "Đồ gia dụng"` | - Hệ thống trả về mã trạng thái HTTP 200 (hoặc 201 Created). - Nội dung phản hồi chứa thông báo tạo thành công v... | Giao diện gửi POST request thành công, danh mục "Đồ gia dụng" được lưu vào CSDL với ID #4. Bảng danh mục cập nhật hiển thị ngay lập tức. | **PASS** | [TC-CAT-001.png](test-cases/FR-14/screenshots/TC-CAT-001.png) | Không có |
| **TC-CAT-002** | Thêm danh mục mới với tên chứa dấu tiếng Việt Unicode và ký tự đặc biệt hợp lệ | `name: "Mẹ & Bé - Đồ chơi / Âm thanh"` | - Hệ thống xử lý thành công, trả về HTTP 200. - Tên danh mục được lưu trữ nguyên vẹn chuẩn UTF-8, không bị lỗi f... | Danh mục "Mẹ & Bé - Đồ chơi / Âm thanh" được lưu và hiển thị chuẩn xác font UTF-8 tiếng Việt và các ký tự đặc biệt (&, -, /), ID #5. | **PASS** | [TC-CAT-002.png](test-cases/FR-14/screenshots/TC-CAT-002.png) | Không có |
| **TC-CAT-003** | Thêm danh mục mới với tên có độ dài tối thiểu (1 ký tự) | `name: "A" (1 ký tự)` | - Hệ thống chấp nhận và tạo danh mục thành công, trả về HTTP 200 cùng `id` danh mục. - Danh mục `"A"` xuất hiện ... | Hệ thống tiếp nhận và tạo danh mục 1 ký tự "A" thành công, phản hồi HTTP 200, danh mục hiển thị trên bảng quản trị. | **PASS** | [TC-CAT-003.png](test-cases/FR-14/screenshots/TC-CAT-003.png) | Không có |
| **TC-CAT-004** | Thêm danh mục mới với tên có độ dài lớn | `name: "Thiết bị điện tử viễn thông..." (82 ký tự)` | - Hệ thống tiếp nhận và lưu trữ toàn bộ chuỗi ký tự, trả về HTTP 200. - Danh mục hiển thị đầy đủ trong `GET /api... | Tạo danh mục tên dài (150 ký tự) thành công, cơ sở dữ liệu lưu chuỗi đầy đủ và bảng hiển thị toàn vẹn nội dung. | **PASS** | [TC-CAT-004.png](test-cases/FR-14/screenshots/TC-CAT-004.png) | Không có |
| **TC-CAT-005** | Từ chối thêm danh mục khi tên là chuỗi rỗng ("") | `name: "" (chuỗi rỗng)` | - Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*. - Hệ thống từ chối request, trả về mã lỗ... | Backend trả về HTTP 200 OK và tạo danh mục với tên rỗng vào CSDL. Form Admin không chặn submit chuỗi rỗng, thêm dòng danh mục không tên vào bảng. | **FAIL** | [TC-CAT-005.png](test-cases/FR-14/screenshots/TC-CAT-005.png) | DEF-FR14-01 |
| **TC-CAT-006** | Từ chối thêm danh mục khi tên chỉ chứa toàn khoảng trắng ("   ") | `name: "     " (toàn khoảng trắng)` | - Hệ thống áp dụng quy tắc cắt khoảng trắng (trim) và xác định tên rỗng, từ chối tạo với HTTP 400. - Không có da... | Backend trả về HTTP 200 OK và lưu danh mục chứa toàn khoảng trắng. Không có cơ chế trim() hay kiểm tra độ dài ký tự thực tế. | **FAIL** | [TC-CAT-006.png](test-cases/FR-14/screenshots/TC-CAT-006.png) | DEF-FR14-01 |
| **TC-CAT-007** | Từ chối thêm danh mục khi thiếu trường "name" trong body request | `body: {} (thiếu trường name)` | - Hệ thống phát hiện thiếu trường bắt buộc `name` (undefined/missing). - Trả về mã lỗi HTTP 400 Bad Request kèm ... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 12}. Hệ thống chèn giá trị undefined/null vào CSDL thay vì từ chối HTTP 400. | **FAIL** | [TC-CAT-007.png](test-cases/FR-14/screenshots/TC-CAT-007.png) | DEF-FR14-01 |
| **TC-CAT-008** | Từ chối thêm danh mục khi giá trị trường "name" là null | `name: null` | - Hệ thống từ chối giá trị `null` đối với trường bắt buộc, trả về HTTP 400 Bad Request. - CSDL không lưu bản ghi... | Backend trả về HTTP 200 OK {"message": "Category created", "id": 13}. CSDL chèn giá trị NULL do thiếu ràng buộc NOT NULL. | **FAIL** | [TC-CAT-008.png](test-cases/FR-14/screenshots/TC-CAT-008.png) | DEF-FR14-01 |
| **TC-CAT-009** | Xử lý thêm danh mục trùng tên với danh mục đã tồn tại trong hệ thống | `name: "Điện thoại" (đã tồn tại)` | - Nếu hệ thống có ràng buộc tính duy nhất (UNIQUE): Trả về HTTP 400 / 409 Conflict thông báo tên danh mục đã tồn... | Backend trả về HTTP 200 OK và tạo thêm danh mục trùng tên "Điện thoại" (ID mới #14). Bảng CSDL không có ràng buộc UNIQUE cho cột name. | **FAIL** | [TC-CAT-009.png](test-cases/FR-14/screenshots/TC-CAT-009.png) | DEF-FR14-06 |
| **TC-CAT-010** | Xử lý an toàn khi tên danh mục chứa mã HTML/JavaScript (XSS Payload) | `name: "<script>alert('XSS')</script>"` | - Hệ thống lưu trữ an toàn hoặc mã hóa thực thể HTML (HTML entity encode). - Khi render trên giao diện web/admin... | Mã XSS được React render an toàn dưới dạng plain text thuần túy trong thẻ <td>; script không bị thực thi; giao diện không phát sinh hộp thoại alert() độc hại. | **PASS** | [TC-CAT-010.png](test-cases/FR-14/screenshots/TC-CAT-010.png) | Không có |
| **TC-CAT-011** | Từ chối thêm danh mục khi client chưa đăng nhập (Thiếu JWT Token) | `Token: Không có (No Auth)` | - Theo quy định bảo mật hệ thống: Các API thay đổi dữ liệu phải yêu cầu xác thực. - Hệ thống từ chối thực thi và... | Middleware authenticateToken chặn request chính xác, trả về HTTP 401 Unauthorized {"error": "Token missing"}. | **PASS** | [TC-CAT-011.png](test-cases/FR-14/screenshots/TC-CAT-011.png) | Không có |
| **TC-CAT-012** | Từ chối thêm danh mục khi người dùng là tài khoản thông thường (role = 'user') | `Token: User thông thường (role = 'user')` | - Theo đặc tả: Chỉ tài khoản Admin mới có quyền Thêm / Xóa danh mục; role khác admin phải trả về HTTP 403 Forbid... | Hệ thống trả về HTTP 200 OK {"message": "Category created", "id": 16}. Token của user thông thường được chấp nhận do server thiếu bước kiểm tra role === 'admin'. | **FAIL** | [TC-CAT-012.png](test-cases/FR-14/screenshots/TC-CAT-012.png) | DEF-FR14-02 |
| **TC-CAT-013** | Lấy danh sách danh mục thành công khi CSDL có dữ liệu (Public API) | `GET /api/categories (Public API)` | - Hệ thống trả về mã trạng thái HTTP 200 OK. - Phản hồi là một mảng JSON chứa đầy đủ danh sách các danh mục. - M... | Public API GET /api/categories trả về HTTP 200 OK, danh sách mảng JSON gồm 16 danh mục với đầy đủ các trường id và name. | **PASS** | [TC-CAT-013.png](test-cases/FR-14/screenshots/TC-CAT-013.png) | Không có |
| **TC-CAT-014** | Lấy danh sách danh mục khi cơ sở dữ liệu chưa có danh mục nào | `GET /api/categories (CSDL trống)` | - Hệ thống trả về mã trạng thái HTTP 200 OK. - Dữ liệu trả về là một mảng rỗng `[]` (không trả về `null`, lỗi 50... | Hệ thống dùng sqlite db.all trả về cấu trúc mảng JavaScript tiêu chuẩn (mảng rỗng [] khi 0 bản ghi), mã trạng thái HTTP 200 OK. | **PASS** | [TC-CAT-014.png](test-cases/FR-14/screenshots/TC-CAT-014.png) | Không có |
| **TC-CAT-015** | Cập nhật tên danh mục thành công với ID tồn tại và tên mới hợp lệ (Admin) | `id: 2, name: "Máy tính xách tay & Laptop"` | - Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`. - Danh mục ID 2 có tên mới l... | PUT /api/categories/2 trả về HTTP 200 OK {"message": "Category updated"}. Danh mục ID 2 được cập nhật tên mới thành công trong CSDL. | **PASS** | [TC-CAT-015.png](test-cases/FR-14/screenshots/TC-CAT-015.png) | Không có |
| **TC-CAT-016** | Từ chối cập nhật danh mục khi tên mới là chuỗi rỗng hoặc khoảng trắng | `id: 2, name: "" (chuỗi rỗng)` | - Hệ thống từ chối cập nhật do tên danh mục là bắt buộc và không được để trống (HTTP 400). - Tên danh mục ID 2 k... | Backend trả về HTTP 200 OK {"message": "Category updated"} và ghi đè tên danh mục ID 2 thành chuỗi rỗng, vi phạm ràng buộc tên bắt buộc. | **FAIL** | [TC-CAT-016.png](test-cases/FR-14/screenshots/TC-CAT-016.png) | DEF-FR14-01 |
| **TC-CAT-017** | Xử lý cập nhật danh mục với ID không tồn tại trong hệ thống | `id: 9999 (ID không tồn tại)` | - Hệ thống thông báo không tìm thấy bản ghi cần cập nhật, trả về HTTP 404 Not Found (hoặc thông báo lỗi rõ ràng)... | Backend trả về HTTP 200 OK {"message": "Category updated"} dù ID 9999 không tồn tại trong CSDL. Hệ thống không kiểm tra this.changes === 0 để trả về 404. | **FAIL** | [TC-CAT-017.png](test-cases/FR-14/screenshots/TC-CAT-017.png) | DEF-FR14-03 |
| **TC-CAT-018** | Từ chối cập nhật danh mục khi người dùng không có quyền Admin | `id: 1, Token: User thông thường` | - Hệ thống từ chối cập nhật do thiếu quyền Admin, trả về HTTP 403 Forbidden. - Danh mục ID 1 giữ nguyên tên ban ... | Hệ thống trả về HTTP 200 OK {"message": "Category updated"}. User thường có thể sửa danh mục do thiếu kiểm tra quyền Admin tại endpoint PUT. | **FAIL** | [TC-CAT-018.png](test-cases/FR-14/screenshots/TC-CAT-018.png) | DEF-FR14-02 |
| **TC-CAT-019** | Xóa danh mục thành công khi danh mục tồn tại và không có sản phẩm liên kết | `id: 4 (0 sản phẩm liên kết)` | - Hệ thống thực hiện xóa thành công, trả về HTTP 200: `{"message": "Category deleted"}`. - Danh mục ID 4 không c... | DELETE /api/categories/17 trả về HTTP 200 OK {"message": "Category deleted"}. Danh mục độc lập được xóa sạch khỏi CSDL và giao diện. | **PASS** | [TC-CAT-019.png](test-cases/FR-14/screenshots/TC-CAT-019.png) | Không có |
| **TC-CAT-020** | Kiểm tra ràng buộc toàn vẹn khi xóa danh mục đang có sản phẩm liên kết | `id: 1 (có sản phẩm liên kết)` | - Theo chuẩn toàn vẹn dữ liệu: Hệ thống phải từ chối xóa hoặc cảnh báo lỗi xung đột ràng buộc (HTTP 400 hoặc 409... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa mất danh mục ID 1. Toàn bộ 2 sản phẩm liên kết bị mồ côi (category_id = 1 không còn tồn tại). | **FAIL** | [TC-CAT-020.png](test-cases/FR-14/screenshots/TC-CAT-020.png) | DEF-FR14-05 |
| **TC-CAT-021** | Xử lý xóa danh mục với ID không tồn tại trong CSDL | `id: 9999 (ID không tồn tại)` | - Hệ thống trả về lỗi HTTP 404 Not Found (hoặc thông báo danh mục không tồn tại). - Không làm gián đoạn hệ thống... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} dù ID 9999 không tồn tại. Thiếu kiểm tra this.changes để trả về lỗi 404. | **FAIL** | [TC-CAT-021.png](test-cases/FR-14/screenshots/TC-CAT-021.png) | DEF-FR14-03 |
| **TC-CAT-022** | Từ chối xóa danh mục khi client chưa đăng nhập (Thiếu Token) | `id: 2, Token: Không có (No Auth)` | - Hệ thống từ chối yêu cầu và trả về HTTP 401 Unauthorized. - Danh mục ID 2 vẫn tồn tại nguyên vẹn trong CSDL. | Middleware authenticateToken chặn request thành công, trả về HTTP 401 Unauthorized {"error": "Token missing"}. | **PASS** | [TC-CAT-022.png](test-cases/FR-14/screenshots/TC-CAT-022.png) | Không có |
| **TC-CAT-023** | Từ chối xóa danh mục khi người dùng có vai trò thường (role = 'user') | `id: 3, Token: User thông thường` | - Hệ thống từ chối xóa do người dùng không có vai trò Admin, trả về HTTP 403 Forbidden. - Danh mục ID 3 không bị... | Hệ thống trả về HTTP 200 OK {"message": "Category deleted"} và xóa danh mục thành công khi dùng Token của User thường. Thiếu kiểm tra role Admin. | **FAIL** | [TC-CAT-023.png](test-cases/FR-14/screenshots/TC-CAT-023.png) | DEF-FR14-02 |
| **TC-CAT-024** | Kiểm tra form Thêm danh mục trên giao diện Admin khi để trống ô nhập tên | `Admin UI: input rỗng, click "Thêm mới"` | - Giao diện người dùng phải ngăn chặn việc submit biểu mẫu (Client-side validation). - Hiển thị thông báo yêu cầ... | Form không có thuộc tính HTML5 required, gửi request POST rỗng thành công và thêm một dòng trống mới vào bảng quản trị mà không có thông báo lỗi hay ngăn chặn. | **FAIL** | [TC-CAT-024.png](test-cases/FR-14/screenshots/TC-CAT-024.png) | DEF-FR14-01, DEF-FR14-04 |
| **TC-CAT-025** | Kiểm tra luồng Thêm và Xóa danh mục hoàn chỉnh trên giao diện Admin | `Admin UI: "Đồng hồ thông minh", Thêm & Xóa` | - Giao diện Admin phản hồi mượt mà: thêm danh mục mới hiển thị ngay lập tức, ô input được reset về rỗng. - Khi n... | Thực hiện luồng Thêm và Xóa trên giao diện Admin mượt mà: thêm danh mục mới hiển thị ngay lập tức, ô input được reset; khi nhấn Xóa, dòng biến mất và danh sách cập nhật đồng bộ. | **PASS** | [TC-CAT-025.png](test-cases/FR-14/screenshots/TC-CAT-025.png) | Không có |

---

## 4. Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR14-01: Chấp nhận tên danh mục rỗng, khoảng trắng hoặc giá trị null khi tạo và cập nhật danh mục
- **Mức độ Nghiêm trọng**: Cao (Functional Defect / Validation Defect)
- **Vị trí**: `backend/server.js:249-267`
- **Mô tả**: Endpoint `POST /api/categories` và `PUT /api/categories/:id` không kiểm tra tính hợp lệ của trường `name` (không kiểm tra `!name || name.trim() === ''`). Cơ sở dữ liệu SQLite bảng `categories` cũng không có ràng buộc `NOT NULL`, dẫn đến việc hệ thống chấp nhận chuỗi rỗng `""`, chuỗi khoảng trắng `"   "`, `null` hoặc payload rỗng `{}` và trả về HTTP 200 OK, vi phạm yêu cầu nghiệp vụ *"Tên danh mục là bắt buộc, không được để trống"*.

### DEF-FR14-02: Lỗ hổng kiểm soát truy cập (Broken Access Control) trên các endpoint Category CRUD
- **Mức độ Nghiêm trọng**: Nghiêm trọng (Security Defect / Access Control)
- **Vị trí**: `backend/server.js:249-278`
- **Mô tả**: Các API `POST /api/categories`, `PUT /api/categories/:id`, và `DELETE /api/categories/:id` chỉ áp dụng middleware `authenticateToken` để kiểm tra JWT hợp lệ, mà hoàn toàn không kiểm tra phân quyền `req.user.role === 'admin'`. Người dùng thông thường sở hữu token hợp lệ (`role = 'user'`) có thể tự do tạo mới, chỉnh sửa, và xóa danh mục hệ thống, vi phạm yêu cầu FR-12 và FR-14.

### DEF-FR14-03: API Cập nhật và Xóa danh mục trả về HTTP 200 khi ID không tồn tại hoặc ID âm/bằng 0
- **Mức độ Nghiêm trọng**: Trung bình (REST API Standard Defect)
- **Vị trí**: `backend/server.js:257-278`
- **Mô tả**: Khi thực hiện `PUT /api/categories/:id` hoặc `DELETE /api/categories/:id` với `id` không tồn tại trong hệ thống (như `id = 9999`, `id = 0`, `id = -1`), server không kiểm tra số dòng bị ảnh hưởng (`this.changes === 0`) mà vẫn trả về phản hồi thành công `HTTP 200 OK` với thông báo `"Category updated"` hoặc `"Category deleted"` thay vì trả về `HTTP 404 Not Found` hoặc `HTTP 400 Bad Request`.

### DEF-FR14-04: Biểu mẫu Thêm danh mục trên Web Admin thiếu xác thực đầu vào phía Client (Client-side Validation)
- **Mức độ Nghiêm trọng**: Trung bình (UI/Form Validation Defect)
- **Vị trí**: `frontend-admin/src/App.jsx:298-308`
- **Mô tả**: Ô input "Tên danh mục mới" không có thuộc tính HTML5 `required`, hàm `handleCategorySubmit` không kiểm tra `if (!categoryName.trim()) return;`. Khi người dùng click nút "Thêm mới" với ô nhập trống, form vẫn gửi request rỗng lên server và bổ sung dòng trống vào bảng danh mục trên giao diện.

### DEF-FR14-05: Vi phạm ràng buộc toàn vẹn dữ liệu quan hệ (Referential Integrity) khi xóa danh mục có sản phẩm liên kết
- **Mức độ Nghiêm trọng**: Cao (Data Integrity Defect)
- **Vị trí**: `backend/server.js:269-278`, `backend/database.js:23-26`
- **Mô tả**: Bảng `products` liên kết với bảng `categories` qua `category_id`, nhưng cơ sở dữ liệu không kích hoạt ràng buộc khóa ngoại (`PRAGMA foreign_keys = ON;`), và API `DELETE /api/categories/:id` không kiểm tra xem danh mục có đang chứa sản phẩm hay không. Khi Admin xóa danh mục, danh mục bị xóa thành công khiến các sản phẩm liên kết trở thành bản ghi mồ côi (`orphaned foreign key`), làm sai lệch hiển thị danh mục và lọc sản phẩm.

### DEF-FR14-06: Không kiểm tra tính duy nhất (Uniqueness), cho phép tạo nhiều danh mục trùng tên
- **Mức độ Nghiêm trọng**: Trung bình (Business Logic Defect)
- **Vị trí**: `backend/server.js:249-254`, `backend/database.js:23-26`
- **Mô tả**: Cột `name` trong bảng `categories` không có ràng buộc `UNIQUE` và API `POST /api/categories` không kiểm tra sự tồn tại của tên danh mục trước khi `INSERT`. Hệ thống cho phép tạo nhiều danh mục trùng tên hoàn toàn (ví dụ trùng "Điện thoại"), gây nhiễu và trùng lặp dữ liệu danh mục phân loại sản phẩm.
