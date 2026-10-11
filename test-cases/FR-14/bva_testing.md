# TC-BVA-CAT-001: Độ dài tên danh mục dưới biên tối thiểu khi tạo mới (length = 0, chuỗi rỗng)

## Preconditions
- Người dùng đã đăng nhập với tài khoản Admin (`admin@eshop.com`) và có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>`, `Content-Type: application/json` |
| `name` | `""` (độ dài chuỗi bằng 0) |

## Test Steps
1. Đăng nhập tài khoản Admin và lấy JWT Token.
2. Gửi request `POST /api/categories` với payload `{ "name": "" }`.
3. Kiểm tra mã phản hồi HTTP và dữ liệu trả về từ server.
4. Gửi request `GET /api/categories` để kiểm tra danh sách danh mục trong cơ sở dữ liệu.

## Expected Result
- Theo đặc tả FR-14: *"Tên danh mục là bắt buộc, không được để trống"*.
- Hệ thống từ chối yêu cầu, trả về mã lỗi HTTP 400 Bad Request.
- Thông báo lỗi hiển thị: Tên danh mục không được để trống.
- Không có bản ghi danh mục mới nào được thêm vào cơ sở dữ liệu.

## Boundary Rationale
Kiểm tra giá trị biên dưới mức tối thiểu (`min_length - 1 = 0`), thuộc miền giá trị không hợp lệ của ràng buộc bắt buộc nhập tên danh mục.

---

# TC-BVA-CAT-002: Độ dài tên danh mục tại đúng biên tối thiểu khi tạo mới (length = 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Chưa tồn tại danh mục có tên `"A"` trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"A"` (độ dài đúng 1 ký tự) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "A" }` kèm Authorization header của Admin.
2. Kiểm tra mã trạng thái HTTP từ API.
3. Gửi request `GET /api/categories` để kiểm tra xem danh mục `"A"` đã được lưu chưa.

## Expected Result
- Hệ thống chấp nhận và tạo danh mục thành công, trả về mã trạng thái HTTP 200 (hoặc 201 Created).
- Phản hồi chứa `id` mới: `{"message": "Category created", "id": <new_id>}`.
- Danh mục tên `"A"` xuất hiện trong danh sách trả về từ `GET /api/categories`.

## Boundary Rationale
Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu (`min_length = 1`), là độ dài ký tự hợp lệ nhỏ nhất thỏa mãn điều kiện "không được để trống".

---

# TC-BVA-CAT-003: Độ dài tên danh mục ngay trên biên tối thiểu khi tạo mới (length = 2)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Chưa tồn tại danh mục có tên `"TB"` trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `"TB"` (độ dài đúng 2 ký tự) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": "TB" }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Xác minh sự tồn tại của danh mục `"TB"` trong cơ sở dữ liệu qua `GET /api/categories`.

## Expected Result
- Hệ thống xử lý thành công, trả về HTTP 200 kèm `id` danh mục mới.
- Danh mục `"TB"` được lưu trữ đầy đủ và hiển thị chính xác trong danh sách danh mục.

## Boundary Rationale
Kiểm tra giá trị ngay trên ngưỡng biên tối thiểu (`min_length + 1 = 2`), thuộc miền giá trị hợp lệ danh định.

---

# TC-BVA-CAT-004: Độ dài tên danh mục sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed length = 0)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `" "` (chuỗi 1 ký tự khoảng trắng, độ dài sau trim bằng 0) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": " " }`.
2. Quan sát phản hồi của server.
3. Kiểm tra CSDL xem có bản ghi danh mục chứa khoảng trắng rỗng bị chèn vào không.

## Expected Result
- Hệ thống thực hiện chuẩn hóa (trim) chuỗi đầu vào; chuỗi chỉ chứa khoảng trắng được coi là rỗng (`length = 0`).
- Từ chối yêu cầu và trả về HTTP 400 Bad Request kèm thông báo lỗi.
- Không có danh mục mới được tạo trong cơ sở dữ liệu.

## Boundary Rationale
Kiểm tra biên chuỗi chứa đúng 1 ký tự khoảng trắng, sau khi cắt tỉa (trim) sẽ trở về độ dài 0 ký tự (`trimmed length = 0`), thuộc miền không hợp lệ.

---

# TC-BVA-CAT-005: Độ dài tên danh mục sau khi loại bỏ khoảng trắng tại đúng biên tối thiểu (trimmed length = 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Chưa có danh mục `"K"` trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `POST /api/categories` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| `name` | `" K "` (1 ký tự chữ cái bọc bởi khoảng trắng ở 2 đầu) |

## Test Steps
1. Gửi request `POST /api/categories` với payload `{ "name": " K " }`.
2. Kiểm tra phản hồi HTTP từ server.
3. Gửi `GET /api/categories` kiểm tra tên danh mục được lưu trữ là `"K"` (đã trim) hoặc `" K "`.

## Expected Result
- Hệ thống chấp nhận tạo danh mục thành công, trả về HTTP 200.
- Tên danh mục được chuẩn hóa thành `"K"` (hoặc lưu hợp lệ), thỏa mãn điều kiện có ít nhất 1 ký tự nội dung.

## Boundary Rationale
Kiểm tra giá trị biên chuỗi có đúng 1 ký tự có nghĩa sau khi loại bỏ khoảng trắng thừa (`trimmed length = 1`).

---

# TC-BVA-CAT-006: Độ dài tên danh mục dưới biên tối thiểu khi cập nhật (length = 0, chuỗi rỗng)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục có `id = 1` tồn tại trong hệ thống (tên ban đầu `"Điện thoại"`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` |
| Body `name` | `""` (độ dài chuỗi bằng 0) |

## Test Steps
1. Gửi request `PUT /api/categories/1` với payload `{ "name": "" }`.
2. Kiểm tra mã lỗi trả về từ máy chủ.
3. Gửi request `GET /api/categories` để xác minh tên danh mục `id = 1` có bị đổi thành chuỗi rỗng hay không.

## Expected Result
- Hệ thống từ chối cập nhật do vi phạm ràng buộc tên danh mục không được để trống.
- Trả về mã lỗi HTTP 400 Bad Request.
- Tên danh mục `id = 1` trong CSDL được giữ nguyên là `"Điện thoại"`.

## Boundary Rationale
Kiểm tra biên dưới mức tối thiểu (`min_length - 1 = 0`) cho thao tác Cập nhật (Update), thuộc miền không hợp lệ.

---

# TC-BVA-CAT-007: Độ dài tên danh mục tại đúng biên tối thiểu khi cập nhật (length = 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 2` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/2` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `2` |
| Body `name` | `"X"` (độ dài đúng 1 ký tự) |

## Test Steps
1. Gửi request `PUT /api/categories/2` với payload `{ "name": "X" }`.
2. Kiểm tra mã trạng thái HTTP.
3. Gửi `GET /api/categories` để xác minh tên danh mục `id = 2` sau khi cập nhật.

## Expected Result
- Hệ thống cập nhật thành công, trả về HTTP 200: `{"message": "Category updated"}`.
- Danh mục `id = 2` có tên mới là `"X"`.

## Boundary Rationale
Kiểm tra tại đúng ngưỡng biên tối thiểu (`min_length = 1`) cho thao tác Cập nhật, thuộc miền hợp lệ.

---

# TC-BVA-CAT-008: Độ dài tên danh mục ngay trên biên tối thiểu khi cập nhật (length = 2)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 3` tồn tại trong hệ thống.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/3` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `3` |
| Body `name` | `"PK"` (độ dài đúng 2 ký tự) |

## Test Steps
1. Gửi request `PUT /api/categories/3` với payload `{ "name": "PK" }`.
2. Kiểm tra phản hồi HTTP từ hệ thống.
3. Gửi `GET /api/categories` để kiểm tra tên mới của danh mục `id = 3`.

## Expected Result
- Hệ thống xử lý cập nhật thành công, trả về HTTP 200.
- Danh mục `id = 3` được đổi tên thành `"PK"`.

## Boundary Rationale
Kiểm tra giá trị ngay trên ngưỡng biên tối thiểu (`min_length + 1 = 2`) cho thao tác Cập nhật.

---

# TC-BVA-CAT-009: Mã định danh dưới biên tối thiểu hợp lệ khi cập nhật danh mục (id = 0)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- CSDL sử dụng khóa chính tự tăng bắt đầu từ 1 (`id >= 1`), không tồn tại `id = 0`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/0` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `0` (ngay dưới ngưỡng ID tối thiểu 1) |
| Body `name` | `"Danh mục Test"` |

## Test Steps
1. Gửi request `PUT /api/categories/0` với tên hợp lệ.
2. Kiểm tra mã trạng thái HTTP và phản hồi từ hệ thống.

## Expected Result
- Hệ thống xác định `id = 0` không tồn tại trong cơ sở dữ liệu.
- Trả về mã lỗi HTTP 404 Not Found (hoặc thông báo không tìm thấy bản ghi cần cập nhật).
- Không có bản ghi nào bị thay đổi.

## Boundary Rationale
Kiểm tra giá trị biên dưới mức tối thiểu của khóa chính (`min_id - 1 = 0`), là giá trị không tồn tại trong tập ID hợp lệ.

---

# TC-BVA-CAT-010: Mã định danh số âm ngoài biên hợp lệ khi xóa danh mục (id = -1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/-1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `-1` |

## Test Steps
1. Gửi request `DELETE /api/categories/-1`.
2. Kiểm tra phản hồi từ máy chủ.

## Expected Result
- Hệ thống nhận diện ID số âm không hợp lệ và từ chối yêu cầu.
- Trả về mã lỗi HTTP 400 Bad Request hoặc 404 Not Found.
- Không gây ra lỗi crash máy chủ (HTTP 500) và không ảnh hưởng đến CSDL.

## Boundary Rationale
Kiểm tra giá trị biên âm (`id < 0`), thuộc miền giá trị không hợp lệ của khóa chính kiểu số nguyên dương.

---

# TC-BVA-CAT-011: Mã định danh tại đúng biên nhỏ nhất của cơ sở dữ liệu khi thao tác (id = 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` tồn tại trong hệ thống (danh mục đầu tiên được tạo/seed).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `PUT /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `1` (giá trị ID nhỏ nhất của CSDL) |
| Body `name` | `"Điện thoại di động cao cấp"` |

## Test Steps
1. Gửi request `PUT /api/categories/1` với tên mới hợp lệ.
2. Kiểm tra mã phản hồi HTTP.
3. Xác minh dữ liệu danh mục `id = 1` qua `GET /api/categories`.

## Expected Result
- Hệ thống cập nhật thành công, trả về HTTP 200.
- Bản ghi có `id = 1` được cập nhật chính xác.

## Boundary Rationale
Kiểm tra tại đúng ngưỡng biên ID nhỏ nhất của hệ thống (`min_id = 1`), thuộc miền hợp lệ.

---

# TC-BVA-CAT-012: Mã định danh ngay trên biên tồn tại lớn nhất khi xóa danh mục (id = max_existing_id + 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Lấy `max_id` hiện có trong hệ thống qua `GET /api/categories` (giả sử danh mục có ID lớn nhất hiện tại là `3`).
- `id = 4` hoàn toàn chưa từng được tạo trong cơ sở dữ liệu.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/4` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `4` (`max_id + 1`) |

## Test Steps
1. Gửi request `DELETE /api/categories/4`.
2. Kiểm tra mã trạng thái HTTP từ server.

## Expected Result
- Hệ thống kiểm tra thấy `id = 4` không tồn tại trong bảng `categories`.
- Trả về mã lỗi HTTP 404 Not Found (hoặc thông báo không tìm thấy danh mục).
- Không làm thay đổi số lượng bản ghi trong cơ sở dữ liệu.

## Boundary Rationale
Kiểm tra giá trị biên ngay trên ngưỡng tồn tại lớn nhất (`max_id + 1`), thuộc miền ID không tồn tại (Non-existent boundary).

---

# TC-BVA-CAT-013: Biên số lượng danh mục tối thiểu trong hệ thống (count = 0, danh sách rỗng)

## Preconditions
- Toàn bộ danh mục trong bảng `categories` đã được xóa sạch (0 bản ghi).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps
1. Đảm bảo bảng `categories` có 0 bản ghi.
2. Gửi request `GET /api/categories`.
3. Kiểm tra mã trạng thái HTTP và độ dài mảng trả về.

## Expected Result
- Hệ thống trả về mã trạng thái HTTP 200 OK.
- Dữ liệu trả về là một mảng rỗng: `[]` (`response.data.length === 0`).
- Không trả về giá trị `null`, `undefined` hoặc phát sinh lỗi 500.

## Boundary Rationale
Kiểm tra giá trị biên dưới cùng của tập hợp dữ liệu: Số lượng bản ghi danh mục bằng 0 (`count = 0`).

---

# TC-BVA-CAT-014: Biên số lượng danh mục ngay trên mức tối thiểu (count = 1)

## Preconditions
- Cơ sở dữ liệu hiện chỉ có duy nhất 1 danh mục (ví dụ `id = 1`, tên `"Điện thoại"`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `GET /api/categories` |
| Headers | Mặc định |

## Test Steps
1. Thiết lập CSDL chỉ chứa duy nhất 1 danh mục.
2. Gửi request `GET /api/categories`.
3. Kiểm tra số lượng phần tử trong mảng phản hồi.

## Expected Result
- Hệ thống trả về HTTP 200 OK.
- Mảng dữ liệu chứa chính xác 1 phần tử (`response.data.length === 1`).
- Thông tin phần tử khớp chính xác với bản ghi duy nhất trong CSDL.

## Boundary Rationale
Kiểm tra giá trị biên ngay trên mức tối thiểu của tập hợp dữ liệu (`count = 1`).

---

# TC-BVA-CAT-015: Biên số lượng sản phẩm liên kết bằng 0 khi xóa danh mục (product_count = 0)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Một danh mục mới được tạo (ví dụ `id = 5`, tên `"Gia dụng"`) và có chính xác 0 sản phẩm nào liên kết (`product_count = 0`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/5` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `5` |

## Test Steps
1. Xác nhận không có sản phẩm nào có `category_id = 5` trong bảng `products`.
2. Gửi request `DELETE /api/categories/5`.
3. Kiểm tra mã phản hồi HTTP và kiểm tra danh sách qua `GET /api/categories`.

## Expected Result
- Hệ thống xóa thành công do không có ràng buộc phụ thuộc dữ liệu nào, trả về HTTP 200.
- Danh mục `id = 5` bị xóa hoàn toàn khỏi cơ sở dữ liệu.

## Boundary Rationale
Kiểm tra tại điểm biên phụ thuộc dữ liệu: Số lượng sản phẩm liên kết bằng 0 (`product_count = 0`), là trạng thái xóa độc lập an toàn tuyệt đối.

---

# TC-BVA-CAT-016: Biên số lượng sản phẩm liên kết bằng 1 khi xóa danh mục (product_count = 1)

## Preconditions
- Tài khoản Admin có JWT Token hợp lệ.
- Tạo một danh mục mới (ví dụ `id = 6`, tên `"Sách"`) và tạo đúng 1 sản phẩm liên kết với nó (`category_id = 6`, `product_count = 1`).

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Method & Endpoint | `DELETE /api/categories/6` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |
| URL Param `id` | `6` |

## Test Steps
1. Xác nhận có đúng 1 sản phẩm thuộc danh mục `id = 6`.
2. Gửi request `DELETE /api/categories/6` bằng tài khoản Admin.
3. Kiểm tra phản hồi HTTP từ server.
4. Kiểm tra trạng thái của sản phẩm liên kết trong bảng `products`.

## Expected Result
- Theo tiêu chuẩn toàn vẹn dữ liệu quan hệ: Hệ thống phải phát hiện có sản phẩm liên kết và từ chối xóa (HTTP 400 hoặc 409 Conflict), hoặc thông báo yêu cầu chuyển/xóa sản phẩm trước.
- Không để xảy ra tình trạng sản phẩm bị mồ côi (orphaned foreign key) làm hỏng hiển thị danh mục sản phẩm.

## Boundary Rationale
Kiểm tra tại điểm biên phụ thuộc dữ liệu bắt đầu xuất hiện ràng buộc liên kết: Số lượng sản phẩm liên kết bằng 1 (`product_count = 1`).
