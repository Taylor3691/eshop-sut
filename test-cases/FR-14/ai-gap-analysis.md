# Phân tích Lỗ hổng AI cho FR-14: Quản lý Danh mục (Category CRUD)

---

# TC-GAP-CAT-001: Thêm danh mục với tên là chuỗi rỗng qua API

## Missing Scenario
Kiểm tra khả năng bắt lỗi và từ chối của backend khi client gửi yêu cầu tạo danh mục với `name: ""` trực tiếp tới API, không qua giao diện trình duyệt.

## Preconditions
- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và sở hữu JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "" }` |

## Test Steps
1. Đăng nhập tài khoản Admin để lấy JWT Token.
2. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
3. Kiểm tra mã trạng thái HTTP và nội dung phản hồi từ hệ thống.
4. Gửi request `GET /api/categories` để kiểm tra danh sách danh mục trong cơ sở dữ liệu.

## Expected Result
- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Backend phải xác thực dữ liệu và trả về mã lỗi HTTP 400 Bad Request kèm thông báo: Tên danh mục không được để trống.
- Không có bản ghi danh mục nào có tên rỗng được tạo trong cơ sở dữ liệu.

## Gap Rationale
Bộ test ban đầu giả định rằng quy tắc nghiệp vụ "không được để trống" hiển nhiên được backend kiểm tra. Việc thiếu kịch bản kiểm thử tính phòng thủ của backend đã bỏ sót lỗ hổng server không validate dữ liệu và chèn bản ghi rỗng vào cơ sở dữ liệu.

---

# TC-GAP-CAT-002: Thêm danh mục với tên chỉ chứa toàn khoảng trắng qua API

## Missing Scenario
Kiểm tra việc backend không thực hiện cắt tỉa (trim) khoảng trắng trước khi lưu trữ, dẫn đến việc lưu tên danh mục vô nghĩa chỉ chứa ký tự khoảng trắng.

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "   " }` (3 ký tự khoảng trắng) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "   " }` kèm token Admin.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để kiểm tra bản ghi được tạo trong CSDL.

## Expected Result
- Backend phải cắt tỉa khoảng trắng, phát hiện chuỗi rỗng và từ chối yêu cầu với HTTP 400 Bad Request.
- CSDL không lưu bản ghi danh mục chỉ chứa khoảng trắng.

## Gap Rationale
Kiểm thử trước đó chỉ xem xét trường hợp lý thuyết trên giao diện mà không kiểm tra xử lý chuỗi ở tầng API, bỏ sót lỗ hổng ô nhiễm dữ liệu với chuỗi toàn khoảng trắng.

---

# TC-GAP-CAT-003: Thêm danh mục khi không truyền trường "name" hoặc "name: null"

## Missing Scenario
Kiểm tra phản ứng của backend khi nhận payload JSON thiếu thuộc tính `name` (`{}`) hoặc có giá trị `null` (`{ "name": null }`).

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{}` hoặc `{ "name": null }` |

## Test Steps
1. Gửi request `POST /api/categories` với body `{}`.
2. Gửi request `POST /api/categories` với body `{ "name": null }`.
3. Kiểm tra mã trạng thái HTTP và danh sách trả về từ `GET /api/categories`.

## Expected Result
- Backend phải trả về lỗi HTTP 400 Bad Request: Thiếu trường `name` bắt buộc.
- CSDL không cho phép lưu bản ghi có giá trị `name` là `NULL`.

## Gap Rationale
Bảng `categories` trong schema SQLite được tạo với `name TEXT` không có ràng buộc `NOT NULL`. Bộ test cũ không kiểm tra trường hợp payload thiếu trường dẫn đến giá trị `NULL` trong CSDL.

---

# TC-GAP-CAT-004: Người dùng thường thực hiện thêm danh mục (Lỗ hổng Phân quyền RBAC)

## Missing Scenario
Kiểm tra lỗ hổng leo thang đặc quyền (Privilege Escalation) khi người dùng có vai trò thông thường (`role = 'user'`) gọi API tạo danh mục.

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) và sở hữu JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Danh mục của User" }` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com` để nhận token vai trò `user`.
2. Gửi request `POST /api/categories` với payload danh mục kèm token của user.
3. Kiểm tra mã phản hồi HTTP từ server.

## Expected Result
- Theo `README.md` mục 6: *"Tất cả các API Admin... và các API có tính ảnh hưởng dữ liệu (POST/PUT/DELETE /api/categories...) đều phải yêu cầu Token hợp lệ và Role là admin. Nếu role khác admin, API phải trả về HTTP 403 (không có quyền)"*.
- Hệ thống từ chối yêu cầu và trả về HTTP 403 Forbidden.
- Danh mục không được tạo.

## Gap Rationale
Bộ test cũ giả định middleware `authenticateToken` tự động kiểm tra quyền Admin. Trong thực tế mã nguồn, middleware này chỉ kiểm tra tính hợp lệ của token mà không hề kiểm tra `req.user.role === 'admin'`.

---

# TC-GAP-CAT-005: Người dùng thường thực hiện cập nhật danh mục qua API

## Missing Scenario
Kiểm tra khả năng người dùng không có quyền quản trị chỉnh sửa tên danh mục có sẵn trong hệ thống qua `PUT /api/categories/:id`.

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) với JWT Token hợp lệ.
- Danh mục `id = 1` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Bị thay đổi bởi User" }` |

## Test Steps
1. Gửi request `PUT /api/categories/1` kèm token vai trò `user`.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để kiểm tra tên danh mục `id = 1`.

## Expected Result
- Hệ thống từ chối quyền truy cập, trả về HTTP 403 Forbidden.
- Tên danh mục `id = 1` được giữ nguyên trong cơ sở dữ liệu.

## Gap Rationale
Thiếu kịch bản xác minh bảo vệ endpoint Cập nhật chống lại người dùng đã xác thực nhưng không đủ quyền hạn quản trị.

---

# TC-GAP-CAT-006: Người dùng thường thực hiện xóa danh mục qua API

## Missing Scenario
Kiểm tra khả năng người dùng không có quyền Admin thực hiện xóa danh mục qua `DELETE /api/categories/:id`.

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 3` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/3` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |

## Test Steps
1. Gửi request `DELETE /api/categories/3` sử dụng token của tài khoản thường.
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra danh mục `id = 3` trong CSDL.

## Expected Result
- Hệ thống từ chối xóa và trả về HTTP 403 Forbidden.
- Danh mục `id = 3` vẫn tồn tại nguyên vẹn trong CSDL.

## Gap Rationale
Tương tự như API tạo và sửa, API xóa danh mục thiếu tầng kiểm tra vai trò người dùng, cho phép bất kỳ tài khoản khách hàng nào cũng có thể xóa sạch danh mục của cửa hàng.

---

# TC-GAP-CAT-007: Cập nhật danh mục với ID không tồn tại báo thành công giả (False-Positive Success)

## Missing Scenario
Kiểm tra phản hồi của hệ thống khi gửi yêu cầu cập nhật một danh mục có `id` không tồn tại trong CSDL (ví dụ `id = 9999`).

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- `id = 9999` không tồn tại trong bảng `categories`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Tên mới" }` |

## Test Steps
1. Gửi request `PUT /api/categories/9999` với tên hợp lệ.
2. Kiểm tra mã phản hồi HTTP và thông báo từ server.

## Expected Result
- Backend phải kiểm tra số dòng bị ảnh hưởng (`this.changes`); nếu `changes === 0`, phải trả về HTTP 404 Not Found kèm thông báo không tìm thấy danh mục.
- Không báo thành công khi không có bản ghi nào được cập nhật.

## Gap Rationale
Trong `server.js:257-266`, câu lệnh SQL `UPDATE categories SET name = ? WHERE id = ?` chạy mà không kiểm tra `this.changes`, dẫn đến việc trả về HTTP 200 `{ message: "Category updated" }` gây hiểu lầm cho client rằng việc cập nhật đã thành công.

---

# TC-GAP-CAT-008: Xóa danh mục với ID không tồn tại báo thành công giả (False-Positive Success)

## Missing Scenario
Kiểm tra phản hồi của hệ thống khi gửi yêu cầu xóa một danh mục không tồn tại trong CSDL (`id = 9999`).

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- `id = 9999` không tồn tại trong CSDL.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |

## Test Steps
1. Gửi request `DELETE /api/categories/9999`.
2. Kiểm tra mã phản hồi HTTP.

## Expected Result
- Backend phải kiểm tra `this.changes === 0` và trả về HTTP 404 Not Found: Không tìm thấy danh mục để xóa.
- Không trả về HTTP 200 giả định.

## Gap Rationale
Tương tự như API cập nhật, `server.js:269-278` không kiểm tra kết quả thực thi của lệnh `DELETE`, luôn trả về HTTP 200 `{ message: "Category deleted" }` ngay cả khi ID truyền vào hoàn toàn không tồn tại.

---

# TC-GAP-CAT-009: Xóa danh mục đang có sản phẩm liên kết gây mồ côi dữ liệu khóa ngoại (Orphaned Foreign Key)

## Missing Scenario
Kiểm tra việc xóa danh mục đang có sản phẩm thuộc về nó dẫn đến việc sản phẩm bị mồ côi (`category_id` trỏ tới ID không còn tồn tại) do thiếu ràng buộc khóa ngoại trong CSDL.

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` ("Điện thoại") đang có ít nhất 2 sản phẩm liên kết (`iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` có `category_id = 1`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |

## Test Steps
1. Xác nhận các sản phẩm trong `GET /api/products` có `category_id = 1`.
2. Gửi request `DELETE /api/categories/1` bằng tài khoản Admin.
3. Kiểm tra phản hồi từ server.
4. Gửi `GET /api/products` để kiểm tra giá trị `category_id` của các sản phẩm liên quan.

## Expected Result
- Hệ thống phải kiểm tra toàn vẹn dữ liệu quan hệ: Từ chối xóa danh mục khi còn sản phẩm liên kết (HTTP 400 hoặc 409 Conflict), hoặc cập nhật chuyển đổi danh mục cho các sản phẩm.
- Không để xảy ra tình trạng các sản phẩm trỏ tới một `category_id` không còn tồn tại trong hệ thống.

## Gap Rationale
Hệ thống SQLite không kích hoạt `PRAGMA foreign_keys = ON` và API backend không kiểm tra bảng `products` trước khi xóa danh mục. Kết quả là danh mục bị xóa mất nhưng sản phẩm vẫn giữ `category_id = 1`, làm hỏng bộ lọc sản phẩm trên giao diện người dùng.

---

# TC-GAP-CAT-010: Thêm danh mục trùng lặp tên do thiếu ràng buộc duy nhất (Missing Unique Constraint)

## Missing Scenario
Kiểm tra việc hệ thống cho phép tạo nhiều danh mục có tên giống hệt nhau (ví dụ nhiều danh mục cùng mang tên `"Điện thoại"`), gây dư thừa và nhầm lẫn dữ liệu.

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `"Điện thoại"` đã tồn tại trong CSDL.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": "Điện thoại" }` |

## Test Steps
1. Gửi request `POST /api/categories` với tên trùng lặp `"Điện thoại"`.
2. Kiểm tra phản hồi từ server.
3. Gửi `GET /api/categories` để kiểm tra số lượng danh mục trùng tên.

## Expected Result
- Hệ thống phải có cơ chế kiểm tra tính duy nhất (UNIQUE): Trả về cảnh báo lỗi HTTP 400 / 409 Conflict: Tên danh mục đã tồn tại.
- Không cho phép tồn tại nhiều danh mục trùng tên trong hệ thống.

## Gap Rationale
Schema tạo bảng `categories` trong `database.js:23-26` chỉ khai báo `name TEXT` mà không có từ khóa `UNIQUE`, dẫn đến việc người dùng có thể tạo không giới hạn các danh mục trùng tên.

---

# TC-GAP-CAT-011: Cập nhật danh mục với giá trị tên là null làm hỏng dữ liệu

## Missing Scenario
Kiểm tra việc gửi `name: null` khi gọi `PUT /api/categories/:id` ghi đè giá trị `NULL` vào tên danh mục hiện có.

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` đang có tên là `"Laptop"`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| Body | `{ "name": null }` |

## Test Steps
1. Gửi request `PUT /api/categories/2` với `{ "name": null }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Gửi `GET /api/categories` kiểm tra tên của danh mục `id = 2`.

## Expected Result
- Backend phải từ chối cập nhật khi tên là `null` (HTTP 400 Bad Request).
- Tên danh mục `id = 2` phải được bảo toàn giá trị cũ `"Laptop"`.

## Gap Rationale
Bộ test ban đầu chỉ kiểm tra chuỗi rỗng `""` mà bỏ sót giá trị `null` khi cập nhật, dẫn đến việc bản ghi danh mục đang hoạt động bị biến thành `NULL`.

---

# TC-GAP-CAT-012: Thêm danh mục để trống tên trực tiếp qua biểu mẫu UI Admin

## Missing Scenario
Kiểm tra việc biểu mẫu thêm danh mục trong giao diện Admin (`frontend-admin`) không có kiểm tra hợp lệ phía client (client-side validation), cho phép submit form rỗng lên server.

## Preconditions
- Admin đã đăng nhập vào `frontend-admin` trên trình duyệt và mở tab "Quản lý Danh mục".

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | Để trống (`""`) |
| Thao tác | Nhấn nút "Thêm mới" |

## Test Steps
1. Truy cập tab "Quản lý Danh mục" trên `frontend-admin`.
2. Không nhập ký tự nào vào ô "Tên danh mục mới".
3. Nhấn nút "Thêm mới".
4. Quan sát mạng (Network tab) và bảng danh mục bên dưới.

## Expected Result
- Form HTML phải có thuộc tính `required` hoặc hàm submit kiểm tra `!categoryName.trim()`.
- Chặn không cho gửi request và hiển thị thông báo lỗi yêu cầu nhập tên.
- Không xuất hiện dòng danh mục rỗng nào trên bảng giao diện.

## Gap Rationale
Trong `frontend-admin/src/App.jsx:297-308`, thẻ input không có thuộc tính `required` và `handleCategorySubmit` (dòng 142) gửi thẳng `{ name: categoryName }` lên API, khiến giao diện tạo ra các dòng danh mục rỗng không tên.

---

## Bảng Kết quả Thực thi Kiểm thử Thực tế (Execution Results Table)

Toàn bộ các ca kiểm thử lỗ hổng dưới đây đã được **thực thi và xác minh trực tiếp** trên Backend EShop đang chạy tại `http://127.0.0.1:3000` và đối chiếu với mã nguồn thực tế.

| Mã Kiểm thử (Test ID) | Kịch bản Kiểm thử | Dữ liệu Đầu vào / Thao tác | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Ghi nhận) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-GAP-CAT-001** | Thêm danh mục tên rỗng qua API | `POST /api/categories`, payload `{ "name": "" }` | HTTP 400; từ chối tạo do tên bắt buộc | HTTP 200; `{"message":"Category created","id":4}` | **FAIL** | Server tạo danh mục có tên `""` trong SQLite; vi phạm FR-14 | **DEF-FR14-01** |
| **TC-GAP-CAT-002** | Thêm danh mục chỉ toàn khoảng trắng | `POST /api/categories`, payload `{ "name": "   " }` | HTTP 400; từ chối chuỗi rỗng sau khi trim | HTTP 200; `{"message":"Category created","id":5}` | **FAIL** | Server tạo danh mục có tên `"   "` trong CSDL | **DEF-FR14-01** |
| **TC-GAP-CAT-003** | Thêm danh mục thiếu trường `name` | `POST /api/categories`, payload `{}` | HTTP 400; yêu cầu trường `name` | HTTP 200; `{"message":"Category created","id":6}` | **FAIL** | CSDL lưu bản ghi có `name = null` | **DEF-FR14-01** |
| **TC-GAP-CAT-004** | Người dùng thường tạo danh mục | `POST /api/categories` với Token vai trò `user` | HTTP 403 Forbidden; từ chối người dùng thường | HTTP 200; `{"message":"Category created","id":8}` | **FAIL** | `authenticateToken` không kiểm tra `role === 'admin'`; user thường tạo được danh mục | **DEF-FR14-02** |
| **TC-GAP-CAT-005** | Người dùng thường cập nhật danh mục | `PUT /api/categories/1` với Token vai trò `user` | HTTP 403 Forbidden; từ chối chỉnh sửa | HTTP 200; `{"message":"Category updated"}` | **FAIL** | User thường đổi được tên danh mục `id = 1` thành `"User Mod"` | **DEF-FR14-02** |
| **TC-GAP-CAT-006** | Người dùng thường xóa danh mục | `DELETE /api/categories/3` với Token vai trò `user` | HTTP 403 Forbidden; từ chối thao tác xóa | HTTP 200; `{"message":"Category deleted"}` | **FAIL** | User thường xóa thành công danh mục `id = 3` khỏi hệ thống | **DEF-FR14-02** |
| **TC-GAP-CAT-007** | Cập nhật danh mục không tồn tại | `PUT /api/categories/9999`, `{ "name": "New Name" }` | HTTP 404 Not Found; báo ID không tồn tại | HTTP 200; `{"message":"Category updated"}` | **FAIL** | Server không kiểm tra `this.changes`, báo thành công giả | **DEF-FR14-03** |
| **TC-GAP-CAT-008** | Xóa danh mục không tồn tại | `DELETE /api/categories/9999` | HTTP 404 Not Found; báo ID không tồn tại | HTTP 200; `{"message":"Category deleted"}` | **FAIL** | Server không kiểm tra `this.changes`, báo thành công giả | **DEF-FR14-03** |
| **TC-GAP-CAT-009** | Xóa danh mục đang có sản phẩm liên kết | `DELETE /api/categories/1` (có 2 sản phẩm thuộc DM này) | HTTP 400/409; từ chối xóa để bảo toàn dữ liệu | HTTP 200; `{"message":"Category deleted"}` | **FAIL** | Xóa mất DM 1; 2 sản phẩm `iPhone` và `Samsung` bị mồ côi `category_id: 1` | **DEF-FR14-04** |
| **TC-GAP-CAT-010** | Thêm danh mục trùng tên đã có | `POST /api/categories`, payload `{ "name": "Laptop" }` | HTTP 400/409 Conflict; từ chối trùng tên | HTTP 200; `{"message":"Category created","id":9}` | **FAIL** | Bảng `categories` không có ràng buộc `UNIQUE`, tạo 2 danh mục cùng tên | **DEF-FR14-05** |
| **TC-GAP-CAT-011** | Cập nhật tên danh mục thành `null` | `PUT /api/categories/2`, payload `{ "name": null }` | HTTP 400; từ chối giá trị `null` | HTTP 200; `{"message":"Category updated"}` | **FAIL** | Danh mục `id = 2` bị cập nhật thành `name = null` trong CSDL | **DEF-FR14-01** |
| **TC-GAP-CAT-012** | Form Admin submit ô input rỗng | Nhấn "Thêm mới" trên UI khi ô nhập rỗng | UI chặn gửi form; hiển thị thông báo lỗi | Form gửi `{ name: "" }` lên API; thêm dòng trống | **FAIL** | `App.jsx:297` thiếu thuộc tính `required` và validation | **DEF-FR14-06** |

---

## Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR14-01: Backend thiếu kiểm tra xác thực trường tên danh mục bắt buộc (Chấp nhận rỗng/null)
- **Mức độ Nghiêm trọng**: Cao (Major - Business Logic & Input Validation)
- **Đặc tả Yêu cầu Oracle**: `README.md` FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- **Hiện trạng Thực tế**:
  - Mã nguồn [backend/server.js:249-255](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L249-L255):
    ```javascript
    app.post("/api/categories", authenticateToken, (req, res) => {
      const { name } = req.body;
      db.run("INSERT INTO categories (name) VALUES (?)", [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Category created", id: this.lastID });
      });
    });
    ```
  - Schema [backend/database.js:23-26](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/database.js#L23-L26) chỉ định nghĩa `name TEXT` (không có `NOT NULL`).
- **Hệ quả Thực tế**: Backend chấp nhận lưu các chuỗi rỗng `""`, chuỗi khoảng trắng `"   "` và giá trị `null`, làm vỡ hiển thị danh mục trên Storefront và Admin.

---

### DEF-FR14-02: Lỗ hổng kiểm soát truy cập - Thiếu phân quyền Admin cho các API Quản lý Danh mục (Broken Access Control)
- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical - Security & Authorization Defect)
- **Đặc tả Yêu cầu Oracle**: `README.md` Mục 6 (Dòng 177): *"Tất cả các API Admin... và các API có tính ảnh hưởng dữ liệu (POST/PUT/DELETE /api/products, /api/categories, /api/coupons) đều phải yêu cầu Token hợp lệ và Role là admin. Nếu role khác admin, API phải trả về HTTP 403 (không có quyền)"*.
- **Hiện trạng Thực tế**:
  - Middleware [backend/server.js:100-110](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L100-L110):
    ```javascript
    const authenticateToken = (req, res, next) => {
      ...
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        req.user = user;
        next();
      });
    };
    ```
  - Middleware chỉ kiểm tra giải mã JWT token thành công mà hoàn toàn không kiểm tra `req.user.role === 'admin'`.
- **Hệ quả Thực tế**: Bất kỳ người dùng thông thường nào (`role = 'user'`) sau khi đăng nhập đều có thể gửi request `POST`, `PUT`, `DELETE` đến `/api/categories` để tạo mới, chỉnh sửa, hoặc xóa toàn bộ danh mục của cửa hàng.

---

### DEF-FR14-03: API Cập nhật và Xóa trả về mã thành công giả khi ID không tồn tại (False-Positive Response)
- **Mức độ Nghiêm trọng**: Trung bình (Medium - API Logic & Integrity)
- **Đặc tả Yêu cầu Oracle**: Khi tài nguyên không tồn tại, API RESTful chuẩn phải trả về HTTP 404 Not Found.
- **Hiện trạng Thực tế**:
  - [backend/server.js:257-278](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/backend/server.js#L257-L278): Lệnh `UPDATE` và `DELETE` chạy qua `db.run` nhưng callback không kiểm tra thuộc tính `this.changes`.
- **Hệ quả Thực tế**: Khi gọi với ID không tồn tại (`id = 9999`), server vẫn trả về HTTP 200 `{ message: "Category updated" }` hoặc `{ message: "Category deleted" }`, đánh lừa ứng dụng client rằng bản ghi đã được xử lý.

---

### DEF-FR14-04: Xóa danh mục không kiểm tra ràng buộc toàn vẹn khóa ngoại gây mồ côi sản phẩm (Orphaned Records)
- **Mức độ Nghiêm trọng**: Cao (High - Database Integrity)
- **Đặc tả Yêu cầu Oracle**: Toàn vẹn dữ liệu quan hệ giữa Danh mục và Sản phẩm.
- **Hiện trạng Thực tế**:
  - Hệ thống SQLite không bật cơ chế kiểm tra khóa ngoại (`PRAGMA foreign_keys = ON`).
  - API `DELETE /api/categories/:id` thực hiện xóa thẳng bản ghi trong bảng `categories` mà không kiểm tra xem có sản phẩm nào đang mang `category_id` tương ứng trong bảng `products`.
- **Hệ quả Thực tế**: Khi xóa danh mục ID 1, 2 sản phẩm cao cấp (`iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`) vẫn giữ `category_id = 1` nhưng danh mục 1 không còn tồn tại, dẫn đến việc sản phẩm bị ẩn hoặc lỗi hiển thị bộ lọc danh mục.

---

### DEF-FR14-05: Thiếu ràng buộc duy nhất cho tên danh mục trong cơ sở dữ liệu (Data Duplication)
- **Mức độ Nghiêm trọng**: Thấp (Low - Data Quality & Usability)
- **Đặc tả Yêu cầu Oracle**: Quản lý danh mục hợp lý, tránh trùng lặp dữ liệu.
- **Hiện trạng Thực tế**:
  - Bảng `categories` không có ràng buộc `UNIQUE(name)` và backend không kiểm tra `SELECT ... WHERE name = ?` trước khi chèn.
- **Hệ quả Thực tế**: Cho phép tạo nhiều danh mục có tên giống hệt nhau, làm rối loạn danh mục sản phẩm.

---

### DEF-FR14-06: Giao diện Admin thiếu kiểm tra đầu vào trước khi gửi form (Missing Client-Side Form Validation)
- **Mức độ Nghiêm trọng**: Trung bình (Medium - UI/UX & Form Validation)
- **Đặc tả Yêu cầu Oracle**: Form thêm danh mục phải yêu cầu nhập tên hợp lệ.
- **Hiện trạng Thực tế**:
  - Trong [frontend-admin/src/App.jsx:298-308](file:///d:/HK1%2026-27/Software%20Testing/Homework/HW2/eshop-sut/frontend-admin/src/App.jsx#L298-L308):
    `<input type="text" placeholder="Tên danh mục mới" className="border p-2 rounded flex-1" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />`
    Thẻ input thiếu thuộc tính `required`, và hàm `handleCategorySubmit` (dòng 142) không kiểm tra điều kiện `categoryName.trim()`.
- **Hệ quả Thực tế**: Admin vô tình nhấn nút "Thêm mới" khi chưa gõ tên sẽ lập tức tạo ra một danh mục không tên trên bảng.
