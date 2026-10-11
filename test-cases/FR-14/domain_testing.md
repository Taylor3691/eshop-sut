# TC-CAT-001: Thêm danh mục mới thành công với tên hợp lệ chuẩn (Quyền Admin)

## Preconditions
- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và sở hữu JWT Token hợp lệ.
- Tên danh mục `"Đồ gia dụng"` chưa tồn tại trong cơ sở dữ liệu.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| `name` | `"Đồ gia dụng"` |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "Đồ gia dụng" }` kèm Authorization header của Admin.
2. Kiểm tra mã trạng thái HTTP và nội dung phản hồi từ hệ thống.
3. Gửi request `GET /api/categories` để xác minh danh mục mới đã được lưu vào cơ sở dữ liệu.

## Expected Result
- Hệ thống trả về mã trạng thái HTTP 200 (hoặc 201 Created).
- Nội dung phản hồi chứa thông báo tạo thành công và trả về `id` mới: `{"message": "Category created", "id": <new_id>}`.
- Danh sách trả về từ `GET /api/categories` có chứa bản ghi danh mục mới `"Đồ gia dụng"`.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cơ bản cho thao tác Tạo (Create) danh mục mới với tên tiêu chuẩn và phân quyền Admin hợp lệ.

---

# TC-CAT-002: Thêm danh mục mới với tên chứa dấu tiếng Việt Unicode và ký tự đặc biệt hợp lệ

## Preconditions
- Người dùng đăng nhập tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"Mẹ & Bé - Đồ chơi / Âm thanh"` |

## Test Steps
1. Gửi request `POST /api/categories` với tên danh mục chứa dấu tiếng Việt Unicode đầy đủ và các ký tự `&`, `-`, `/`.
2. Kiểm tra phản hồi từ API.
3. Gửi request `GET /api/categories` và kiểm tra chuỗi hiển thị.

## Expected Result
- Hệ thống xử lý thành công, trả về HTTP 200.
- Tên danh mục được lưu trữ nguyên vẹn chuẩn UTF-8, không bị lỗi font hoặc biến đổi ký tự đặc biệt.

## Coverage Rationale
Kiểm thử miền dữ liệu chuỗi ký tự Unicode tiếng Việt và ký tự đặc biệt phân cách thường gặp trong thương mại điện tử.

---

# TC-CAT-003: Thêm danh mục mới với tên có độ dài tối thiểu (1 ký tự)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"A"` |

## Test Steps
1. Gửi request `POST /api/categories` với `name: "A"`.
2. Kiểm tra phản hồi và xác minh dữ liệu trong danh sách danh mục.

## Expected Result
- Hệ thống chấp nhận và tạo danh mục thành công, trả về HTTP 200 cùng `id` danh mục.
- Danh mục `"A"` xuất hiện trong danh sách `GET /api/categories`.

## Coverage Rationale
Kiểm thử giá trị biên độ dài chuỗi tối thiểu (1 ký tự không rỗng) trong miền chuỗi hợp lệ.

---

# TC-CAT-004: Thêm danh mục mới với tên có độ dài lớn

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"Thiết bị điện tử viễn thông và phụ kiện công nghệ cao cấp chính hãng nhập khẩu"` (82 ký tự) |

## Test Steps
1. Gửi request `POST /api/categories` với tên danh mục dài.
2. Kiểm tra phản hồi HTTP và dữ liệu được ghi vào CSDL.

## Expected Result
- Hệ thống tiếp nhận và lưu trữ toàn bộ chuỗi ký tự, trả về HTTP 200.
- Danh mục hiển thị đầy đủ trong `GET /api/categories`.

## Coverage Rationale
Kiểm thử khả năng xử lý chuỗi văn bản dài trong miền dữ liệu tên danh mục hợp lệ.

---

# TC-CAT-005: Từ chối thêm danh mục khi tên là chuỗi rỗng ("")

## Preconditions
- Người dùng đăng nhập với quyền Admin có JWT Token.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `""` |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
2. Quan sát mã phản hồi HTTP và thông báo lỗi.
3. Kiểm tra danh sách `GET /api/categories` xem có danh mục tên rỗng nào bị thêm vào không.

## Expected Result
- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Hệ thống từ chối request, trả về mã lỗi HTTP 400 Bad Request.
- Thông báo lỗi hiển thị: Tên danh mục không được để trống.
- Cơ sở dữ liệu không ghi nhận thêm bản ghi mới.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ vi phạm quy tắc bắt buộc của trường `name` (chuỗi rỗng 0 ký tự).

---

# TC-CAT-006: Từ chối thêm danh mục khi tên chỉ chứa toàn khoảng trắng ("   ")

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"     "` (5 ký tự khoảng trắng) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "     " }`.
2. Kiểm tra mã phản hồi HTTP từ server.
3. Xác minh trong CSDL xem bản ghi có bị chèn vào không.

## Expected Result
- Hệ thống áp dụng quy tắc cắt khoảng trắng (trim) và xác định tên rỗng, từ chối tạo với HTTP 400.
- Không có danh mục chỉ chứa khoảng trắng nào được lưu vào CSDL.

## Coverage Rationale
Kiểm thử lớp tương đương không hợp lệ: chuỗi ký tự khoảng trắng vô nghĩa được coi là để trống theo nghiệp vụ.

---

# TC-CAT-007: Từ chối thêm danh mục khi thiếu trường "name" trong body request

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body | `{}` (Object rỗng, không truyền thuộc tính `name`) |

## Test Steps
1. Gửi request `POST /api/categories` với body `{}`.
2. Kiểm tra phản hồi trả về từ hệ thống.

## Expected Result
- Hệ thống phát hiện thiếu trường bắt buộc `name` (undefined/missing).
- Trả về mã lỗi HTTP 400 Bad Request kèm thông báo yêu cầu cung cấp tên danh mục.

## Coverage Rationale
Kiểm thử tính toàn vẹn của hợp đồng API (API contract) khi client không truyền thuộc tính bắt buộc.

---

# TC-CAT-008: Từ chối thêm danh mục khi giá trị trường "name" là null

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `null` |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": null }`.
2. Kiểm tra mã lỗi và phản hồi.

## Expected Result
- Hệ thống từ chối giá trị `null` đối với trường bắt buộc, trả về HTTP 400 Bad Request.
- CSDL không lưu bản ghi có giá trị `name` là `NULL`.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ với kiểu dữ liệu `null` đối với trường bắt buộc của CSDL.

---

# TC-CAT-009: Xử lý thêm danh mục trùng tên với danh mục đã tồn tại trong hệ thống

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `"Điện thoại"` đã tồn tại trong hệ thống (ID = 1 từ dữ liệu mẫu).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"Điện thoại"` |

## Test Steps
1. Gửi request `POST /api/categories` với tên `"Điện thoại"`.
2. Kiểm tra phản hồi HTTP và hành vi của hệ thống (chấp nhận hay cảnh báo trùng lặp).

## Expected Result
- Nếu hệ thống có ràng buộc tính duy nhất (UNIQUE): Trả về HTTP 400 / 409 Conflict thông báo tên danh mục đã tồn tại.
- Nếu hệ thống cho phép tạo trùng lặp: Trả về HTTP 200 nhưng tạo ID phân biệt mới.

## Coverage Rationale
Kiểm thử lớp tương đương cho trường hợp xung đột dữ liệu danh mục trùng tên đã có.

---

# TC-CAT-010: Xử lý an toàn khi tên danh mục chứa mã HTML/JavaScript (XSS Payload)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"<script>alert('XSS')</script> Thời trang"` |

## Test Steps
1. Gửi request `POST /api/categories` với payload chứa thẻ script HTML.
2. Kiểm tra phản hồi của API.
3. Truy cập màn hình Admin Categories và Storefront để xem tên danh mục được hiển thị ra sao.

## Expected Result
- Hệ thống lưu trữ an toàn hoặc mã hóa thực thể HTML (HTML entity encode).
- Khi render trên giao diện web/admin, trình duyệt hiển thị chuỗi ký tự dạng văn bản thuần túy, không kích hoạt thực thi đoạn mã script độc hại.

## Coverage Rationale
Kiểm thử miền dữ liệu chứa mã thực thi độc hại (Cross-Site Scripting - XSS) trong tên danh mục theo tiêu chuẩn bảo mật.

---

# TC-CAT-011: Từ chối thêm danh mục khi client chưa đăng nhập (Thiếu JWT Token)

## Preconditions
- Client chưa đăng nhập, không gửi Authorization Header hoặc gửi Token rỗng.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | Không có `Authorization` header |
| `name` | `"Sách mới"` |

## Test Steps
1. Gửi request `POST /api/categories` mà không kèm token xác thực.
2. Kiểm tra mã trạng thái HTTP trả về.

## Expected Result
- Theo quy định bảo mật hệ thống: Các API thay đổi dữ liệu phải yêu cầu xác thực.
- Hệ thống từ chối thực thi và trả về mã lỗi HTTP 401 Unauthorized (`{ "error": "Unauthorized" }`).
- Không có danh mục mới nào được tạo trong cơ sở dữ liệu.

## Coverage Rationale
Kiểm thử phân hoạch quyền truy cập: Vi phạm điều kiện xác thực danh tính (Authentication missing).

---

# TC-CAT-012: Từ chối thêm danh mục khi người dùng là tài khoản thông thường (role = 'user')

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`) và sở hữu JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |
| `name` | `"Danh mục của User"` |

## Test Steps
1. Đăng nhập bằng tài khoản `test@eshop.com` để nhận token vai trò `user`.
2. Gửi request `POST /api/categories` với token vừa nhận được.
3. Kiểm tra phản hồi từ máy chủ.

## Expected Result
- Theo đặc tả: Chỉ tài khoản Admin mới có quyền Thêm / Xóa danh mục; role khác admin phải trả về HTTP 403 Forbidden.
- Hệ thống từ chối yêu cầu và trả về HTTP 403 Forbidden.
- Cơ sở dữ liệu không bị thay đổi.

## Coverage Rationale
Kiểm thử phân hoạch phân quyền (Role-Based Access Control - RBAC): Người dùng đã xác thực nhưng không đủ quyền quản trị.

---

# TC-CAT-013: Lấy danh sách danh mục thành công khi CSDL có dữ liệu (Public API)

## Preconditions
- Cơ sở dữ liệu đã có sẵn 3 danh mục mẫu (`Điện thoại` - ID: 1, `Laptop` - ID: 2, `Phụ kiện` - ID: 3).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Không yêu cầu Authorization (Public) |

## Test Steps
1. Gửi request `GET /api/categories` không kèm token.
2. Kiểm tra mã trạng thái HTTP và cấu trúc dữ liệu trả về.

## Expected Result
- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Phản hồi là một mảng JSON chứa đầy đủ danh sách các danh mục.
- Mỗi phần tử có cấu trúc: `{ "id": <number>, "name": "<string>" }`.
- Danh sách chứa ít nhất 3 danh mục mẫu ban đầu.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cho thao tác Đọc (Read / Retrieve) danh sách danh mục công khai.

---

# TC-CAT-014: Lấy danh sách danh mục khi cơ sở dữ liệu chưa có danh mục nào

## Preconditions
- Bảng `categories` trong cơ sở dữ liệu trống (0 bản ghi).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps
1. Gửi request `GET /api/categories`.
2. Kiểm tra định dạng dữ liệu trả về.

## Expected Result
- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Dữ liệu trả về là một mảng rỗng `[]` (không trả về `null`, lỗi 500 hay object sai định dạng).

## Coverage Rationale
Kiểm thử trạng thái biên của tập dữ liệu: Tập dữ liệu rỗng (Empty collection).

---

# TC-CAT-015: Cập nhật tên danh mục thành công với ID tồn tại và tên mới hợp lệ (Admin)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục có `id = 2` đang có tên là `"Laptop"`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `2` |
| Body `name` | `"Máy tính xách tay & Laptop"` |

## Test Steps
1. Gửi request `PUT /api/categories/2` với tên mới hợp lệ.
2. Kiểm tra phản hồi HTTP từ hệ thống.
3. Gửi `GET /api/categories` để xác minh danh mục ID 2 đã được cập nhật tên mới.

## Expected Result
- Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`.
- Danh mục ID 2 có tên mới là `"Máy tính xách tay & Laptop"`.
- Các danh mục khác giữ nguyên, không bị ảnh hưởng.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cho thao tác Cập nhật (Update) với ID hợp lệ và tên danh mục mới hợp lệ.

---

# TC-CAT-016: Từ chối cập nhật danh mục khi tên mới là chuỗi rỗng hoặc khoảng trắng

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body `name` | `""` (chuỗi rỗng) |

## Test Steps
1. Gửi request `PUT /api/categories/2` với `{ "name": "" }`.
2. Kiểm tra phản hồi lỗi từ server.
3. Gửi `GET /api/categories` xác minh tên danh mục ID 2 vẫn giữ nguyên giá trị cũ.

## Expected Result
- Hệ thống từ chối cập nhật do tên danh mục là bắt buộc và không được để trống (HTTP 400).
- Tên danh mục ID 2 không bị thay đổi thành rỗng trong CSDL.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ đối với thao tác Cập nhật khi vi phạm ràng buộc bắt buộc của trường `name`.

---

# TC-CAT-017: Xử lý cập nhật danh mục với ID không tồn tại trong hệ thống

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Không tồn tại danh mục nào có `id = 9999` trong CSDL.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| Body `name` | `"Tên danh mục mới"` |

## Test Steps
1. Gửi request `PUT /api/categories/9999` với tên hợp lệ.
2. Kiểm tra mã trạng thái HTTP trả về.

## Expected Result
- Hệ thống thông báo không tìm thấy bản ghi cần cập nhật, trả về HTTP 404 Not Found (hoặc thông báo lỗi rõ ràng).
- Không có bản ghi danh mục mới nào bị tạo nhầm.

## Coverage Rationale
Kiểm thử miền giá trị khóa chính `id`: ID không tồn tại ngoài phạm vi CSDL (Non-existent ID domain).

---

# TC-CAT-018: Từ chối cập nhật danh mục khi người dùng không có quyền Admin

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 1` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |
| Body `name` | `"Tên sửa trái phép"` |

## Test Steps
1. Gửi request `PUT /api/categories/1` sử dụng JWT Token của người dùng thường.
2. Kiểm tra phản hồi HTTP từ server.

## Expected Result
- Hệ thống từ chối cập nhật do thiếu quyền Admin, trả về HTTP 403 Forbidden.
- Danh mục ID 1 giữ nguyên tên ban đầu trong CSDL.

## Coverage Rationale
Kiểm thử phân quyền RBAC cho thao tác Cập nhật danh mục: Ngăn chặn người dùng không phải Admin chỉnh sửa dữ liệu.

---

# TC-CAT-019: Xóa danh mục thành công khi danh mục tồn tại và không có sản phẩm liên kết

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Một danh mục mới `"Đồ văn phòng"` vừa được tạo (ví dụ `id = 4`) và chưa có bất kỳ sản phẩm nào liên kết với nó (`category_id = 4` không có trong bảng `products`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/4` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `4` |

## Test Steps
1. Gửi request `DELETE /api/categories/4` kèm token Admin.
2. Kiểm tra mã phản hồi HTTP.
3. Gửi `GET /api/categories` để xác minh danh mục đã biến mất.

## Expected Result
- Hệ thống thực hiện xóa thành công, trả về HTTP 200: `{"message": "Category deleted"}`.
- Danh mục ID 4 không còn xuất hiện trong danh sách trả về từ `GET /api/categories`.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cho thao tác Xóa (Delete) danh mục độc lập không có ràng buộc toàn vẹn dữ liệu.

---

# TC-CAT-020: Kiểm tra ràng buộc toàn vẹn khi xóa danh mục đang có sản phẩm liên kết

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` (`"Điện thoại"`) đang có ít nhất 2 sản phẩm liên kết (`iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` có `category_id = 1`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` |

## Test Steps
1. Gửi request `DELETE /api/categories/1` kèm token Admin.
2. Kiểm tra phản hồi HTTP từ server.
3. Kiểm tra danh sách sản phẩm `GET /api/products` xem các sản phẩm thuộc danh mục 1 có bị xóa mất hay trở thành mồ côi (orphaned).

## Expected Result
- Theo chuẩn toàn vẹn dữ liệu: Hệ thống phải từ chối xóa hoặc cảnh báo lỗi xung đột ràng buộc (HTTP 400 hoặc 409 Conflict): *"Không thể xóa danh mục đang có sản phẩm liên kết"*.
- Hoặc nếu cho phép xóa: Hệ thống phải có chính sách xử lý rõ ràng (SET NULL hoặc xóa có xác nhận), không làm lỗi hiển thị catalog sản phẩm.

## Coverage Rationale
Kiểm thử ràng buộc toàn vẹn dữ liệu quan hệ (Referential Integrity Constraint) giữa bảng `categories` và bảng `products`.

---

# TC-CAT-021: Xử lý xóa danh mục với ID không tồn tại trong CSDL

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- ID `9999` không tồn tại trong bảng `categories`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/9999` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `9999` |

## Test Steps
1. Gửi request `DELETE /api/categories/9999`.
2. Kiểm tra mã phản hồi HTTP từ máy chủ.

## Expected Result
- Hệ thống trả về lỗi HTTP 404 Not Found (hoặc thông báo danh mục không tồn tại).
- Không làm gián đoạn hệ thống hoặc lỗi máy chủ 500.

## Coverage Rationale
Kiểm thử miền dữ liệu `id` không hợp lệ: Xóa đối tượng không tồn tại trong cơ sở dữ liệu.

---

# TC-CAT-022: Từ chối xóa danh mục khi client chưa đăng nhập (Thiếu Token)

## Preconditions
- Client không gửi token xác thực.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/2` |
| Headers | Không có `Authorization` header |

## Test Steps
1. Gửi request `DELETE /api/categories/2` không kèm token.
2. Kiểm tra phản hồi từ server.

## Expected Result
- Hệ thống từ chối yêu cầu và trả về HTTP 401 Unauthorized.
- Danh mục ID 2 vẫn tồn tại nguyên vẹn trong CSDL.

## Coverage Rationale
Kiểm thử bảo mật tầng xác thực cho thao tác xóa dữ liệu (Thiếu thông tin danh tính).

---

# TC-CAT-023: Từ chối xóa danh mục khi người dùng có vai trò thường (role = 'user')

## Preconditions
- Người dùng đăng nhập tài khoản thường `test@eshop.com` (`role = 'user'`).
- Danh mục `id = 3` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/3` |
| Headers | `Authorization: Bearer <USER_JWT_TOKEN>` |

## Test Steps
1. Đăng nhập với tài khoản `test@eshop.com`.
2. Gửi request `DELETE /api/categories/3` với token nhận được.
3. Kiểm tra mã phản hồi HTTP.

## Expected Result
- Hệ thống từ chối xóa do người dùng không có vai trò Admin, trả về HTTP 403 Forbidden.
- Danh mục ID 3 không bị xóa khỏi cơ sở dữ liệu.

## Coverage Rationale
Kiểm thử phân quyền RBAC cho thao tác Xóa danh mục: Bảo vệ dữ liệu trước các yêu cầu từ tài khoản người dùng thông thường.

---

# TC-CAT-024: Kiểm tra form Thêm danh mục trên giao diện Admin khi để trống ô nhập tên

## Preconditions
- Admin đã đăng nhập vào trang quản trị (`frontend-admin`) trên trình duyệt.
- Admin đang ở tab "Quản lý Danh mục" (`activeTab === 'categories'`).

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | Để trống (`""`) hoặc chỉ nhập dấu cách |
| Nút bấm | "Thêm mới" |

## Test Steps
1. Mở giao diện Admin tại mục Quản lý Danh mục.
2. Không nhập gì vào ô input `Tên danh mục mới`.
3. Nhấn nút "Thêm mới".
4. Quan sát phản ứng của giao diện và kiểm tra xem có request gửi đi hay danh mục trống nào được thêm vào bảng không.

## Expected Result
- Giao diện người dùng phải ngăn chặn việc submit biểu mẫu (Client-side validation).
- Hiển thị thông báo yêu cầu nhập tên danh mục hợp lệ.
- Không thêm dòng danh mục trống nào vào bảng danh sách danh mục bên dưới.

## Coverage Rationale
Kiểm thử tương tác người dùng trên giao diện Admin: Xác thực đầu vào phía Client (UI Form validation) ngăn chặn tên danh mục rỗng.

---

# TC-CAT-025: Kiểm tra luồng Thêm và Xóa danh mục hoàn chỉnh trên giao diện Admin

## Preconditions
- Admin đã đăng nhập vào `frontend-admin` và đang mở tab "Quản lý Danh mục".

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | `"Đồng hồ thông minh"` |
| Hành động 1 | Nhấn nút "Thêm mới" |
| Hành động 2 | Nhấn nút "Xóa" tại dòng `"Đồng hồ thông minh"` vừa tạo |

## Test Steps
1. Nhập `"Đồng hồ thông minh"` vào ô "Tên danh mục mới".
2. Nhấn nút "Thêm mới".
3. Kiểm tra: Ô nhập liệu được xóa sạch (`clear input`), bảng danh mục xuất hiện thêm dòng mới `"Đồng hồ thông minh"`.
4. Nhấn nút "Xóa" màu đỏ tại dòng vừa thêm.
5. Kiểm tra: Dòng `"Đồng hồ thông minh"` biến mất khỏi bảng và danh sách được làm mới tự động.

## Expected Result
- Giao diện Admin phản hồi mượt mà: thêm danh mục mới hiển thị ngay lập tức, ô input được reset về rỗng.
- Khi nhấn Xóa, danh mục được xóa thành công và bảng tự động cập nhật đồng bộ với CSDL.

## Coverage Rationale
Kiểm thử luồng tích hợp vòng đời Danh mục (End-to-End Category Lifecycle UI Flow) trên giao diện quản trị Admin.
