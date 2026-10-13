# Pool C — Quản lý sản phẩm

**24 cases: 16 BVA + 8 EP.** ID cũ được giữ nguyên; người dùng tự thực hiện. [Test run](../../test-runs/pool-c-test-run.md) · [Phân tích](../../test-summary/product-crud-analysis.md).

## Tài khoản

| Tài khoản | Email | Mật khẩu | Vai trò |
|---|---|---|---|
| A (có thể dùng tài khoản mẫu) | test@eshop.com | Test1234! | Khách hàng |
| M | admin@eshop.com | Admin123! | Quản trị viên |

Nếu đã có tài khoản thử đang dùng, tiếp tục dùng tài khoản đó và ghi email thực tế trong test run. Không thay thế hồ sơ của người khác. Tài khoản mẫu chỉ dùng được nếu chưa bị đổi/xóa. Các tên A/B/M trong tài liệu là ký hiệu để dễ theo dõi, không phải tên phải nhập vào form.

## Chuẩn bị sản phẩm thử bằng trang quản trị

1. Đăng nhập M tại `http://localhost:5174`, mở Sản phẩm.
2. Dùng form Thêm sản phẩm mới để tạo P/Q/R theo bảng dưới; chọn Phụ kiện trong danh sách Danh mục. Không thêm các sản phẩm này vào giỏ/đơn hàng.
3. Sau mỗi lần tạo, tải lại trang và bấm Sửa để đọc lại đủ năm ô. Bấm Hủy sửa khi đọc xong. Nếu không chuẩn bị được dữ liệu, ghi Blocked cho case phụ thuộc dữ liệu đó.
4. Kiểm tra danh sách Danh mục có Phụ kiện và Điện thoại (hai danh mục mẫu). Nếu môi trường dùng tên khác, chọn hai danh mục đang có và ghi tên thay thế trong test run; không tự nhập mã danh mục.
5. Trước mỗi case, trả P/Q/R về dữ liệu dưới đây bằng form Sửa. Sau case thêm mới, xóa riêng sản phẩm vừa tạo khi đã ghi đủ kết quả. Sau case xóa P, tạo lại P nếu cần cho case tiếp theo.

| Ký hiệu | Tên sản phẩm | Giá tiền | Mô tả | URL Ảnh | Danh mục |
|---|---|---:|---|---|---|
| P | PC-P Bàn phím | 100000 | Mô tả kiểm tra sản phẩm | http://localhost:5174/favicon.svg | Phụ kiện |
| Q | PC-Q Chuột | 200000 | Mô tả Q | http://localhost:5174/favicon.svg | Phụ kiện |
| R | PC-R Tai nghe | 300000 | Mô tả R | http://localhost:5174/favicon.svg | Phụ kiện |

P/Q/R là ba sản phẩm thử khác nhau; ghi tên trước/sau sửa để tìm đúng dòng. Sau lưu, quan sát danh sách **trước khi tải lại** để không bỏ sót lỗi hiển thị tạm thời. Mở Sửa để đọc đủ năm ô nhưng không bấm Lưu trong bước chỉ đọc.

## Cách thực hiện và ghi kết quả

1. Mở case từ bảng bên dưới, chuẩn bị dữ liệu trong Preconditions rồi làm lần lượt Test Steps.
2. Ghi điều nhìn thấy: thông báo, dữ liệu trước/sau, ảnh màn hình nếu cần. Chỉ ghi Pass khi kiểm tra đủ Expected Result; ghi Fail khi hành vi sai yêu cầu.
3. Nếu chưa đăng nhập được, chưa có dữ liệu cần thử hoặc không tạo được trạng thái ban đầu, ghi Blocked và lý do. Không dùng dữ liệu sai để vượt qua lỗi chuẩn bị.
4. Kết thúc case, khôi phục dữ liệu thử bằng các màn hình của hệ thống. Nếu không khôi phục được, ghi rõ và dùng dữ liệu thử mới cho case tiếp theo.
5. Không khởi động lại hệ thống giữa lúc lưu và kiểm tra lại: lần khởi động có thể làm mất dữ liệu thử.

Các bước chỉ dùng thao tác trên màn hình; không cần công cụ lập trình. Việc thử bị chặn ở ô nhập/nút bấm chỉ chứng minh hành vi đã quan sát trên màn hình.

## Generated Test Cases

| ID | Mục tiêu | Technique |
|---|---|---|
| [TC-PRODUCT-CRUD-001](TC-PRODUCT-CRUD-001.md) | Thêm sản phẩm với tên 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-002](TC-PRODUCT-CRUD-002.md) | Thêm sản phẩm với tên 1 ký tự | BVA |
| [TC-PRODUCT-CRUD-003](TC-PRODUCT-CRUD-003.md) | Thêm sản phẩm với tên 2 ký tự | BVA |
| [TC-PRODUCT-CRUD-004](TC-PRODUCT-CRUD-004.md) | Thêm sản phẩm với tên 254 ký tự | BVA |
| [TC-PRODUCT-CRUD-005](TC-PRODUCT-CRUD-005.md) | Thêm sản phẩm với tên 255 ký tự | BVA |
| [TC-PRODUCT-CRUD-006](TC-PRODUCT-CRUD-006.md) | Thêm sản phẩm với tên 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-013](TC-PRODUCT-CRUD-013.md) | Sửa sản phẩm với tên 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-014](TC-PRODUCT-CRUD-014.md) | Sửa sản phẩm với tên 1 ký tự | BVA |
| [TC-PRODUCT-CRUD-017](TC-PRODUCT-CRUD-017.md) | Sửa sản phẩm với tên 255 ký tự | BVA |
| [TC-PRODUCT-CRUD-018](TC-PRODUCT-CRUD-018.md) | Sửa sản phẩm với tên 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-025](TC-PRODUCT-CRUD-025.md) | Thêm sản phẩm với giá -1 | BVA |
| [TC-PRODUCT-CRUD-026](TC-PRODUCT-CRUD-026.md) | Thêm sản phẩm với giá 0 | BVA |
| [TC-PRODUCT-CRUD-027](TC-PRODUCT-CRUD-027.md) | Thêm sản phẩm với giá 1 | BVA |
| [TC-PRODUCT-CRUD-032](TC-PRODUCT-CRUD-032.md) | Sửa sản phẩm với giá 0 | BVA |
| [TC-PRODUCT-CRUD-033](TC-PRODUCT-CRUD-033.md) | Sửa sản phẩm với giá 1 | BVA |
| [TC-PRODUCT-CRUD-034](TC-PRODUCT-CRUD-034.md) | Sửa sản phẩm với giá -1 | BVA |
| [TC-PRODUCT-CRUD-037](TC-PRODUCT-CRUD-037.md) | Thêm mới sản phẩm hợp lệ | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-039](TC-PRODUCT-CRUD-039.md) | Sửa đầy đủ các trường của một sản phẩm | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-041](TC-PRODUCT-CRUD-041.md) | Xem sản phẩm và mở form sửa không làm thay đổi dữ liệu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-043](TC-PRODUCT-CRUD-043.md) | Xóa đúng sản phẩm thử | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-051](TC-PRODUCT-CRUD-051.md) | Thêm sản phẩm với giá abc | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-054](TC-PRODUCT-CRUD-054.md) | Sửa sản phẩm với giá abc | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-073](TC-PRODUCT-CRUD-073.md) | Khách hàng không được quản lý sản phẩm | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-075](TC-PRODUCT-CRUD-075.md) | Chuyển lựa chọn từ sản phẩm P sang Q rồi chỉ lưu Q | Equivalence Partitioning |

## Giới hạn phạm vi

Không kiểm tra trường bị loại khỏi thông điệp, null, mã danh mục không tồn tại, thông tin xác thực bị sửa hoặc mã sản phẩm bị giả. Giá để trống không tương đương trường bị bỏ khỏi thông điệp. Chưa kết luận về khoảng trắng/Unicode của tên, độ chính xác giá lẻ, xóa sản phẩm đã có đơn hàng hoặc danh mục bị xóa giữa lúc sửa.

Các case yêu cầu gửi request trực tiếp đã loại theo [bảng thay đổi](../../test-summary/manual-testing-scope.md).
