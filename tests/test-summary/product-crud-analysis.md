# Pool C — Quản lý sản phẩm

Phạm vi hiện hành: **24 cases (16 BVA + 8 EP)** với thao tác trên trang web. Đây là thiết kế, không phải kết quả chạy. [Test run](../test-runs/pool-c-test-run.md).

## Requirement Analysis

### Requirement

Nguồn đúng/sai: [README hệ thống](../../README.md), không lấy lỗi hiện tại làm chuẩn. Giữ mục tiêu nghiệp vụ, chỉ đổi cách thực hiện và cách quan sát theo yêu cầu người dùng.

### Functional Rules

1. FR-15: quản trị viên được thêm/xem/sửa/xóa sản phẩm.
2. Tên bắt buộc, tối đa 255 ký tự; giá bắt buộc là số dương; danh mục phải chọn từ danh sách có sẵn.
3. Khi sửa chỉ sản phẩm đã chọn thay đổi.
4. FR-12/SEC-03: khách hàng không được quản lý sản phẩm.

### Preconditions

Tài khoản, dữ liệu thử và thao tác chuẩn bị nằm trong [README của pool](../test-cases/product-crud/README.md). Không cần tester gửi request hay sửa cơ sở dữ liệu. Nếu không chuẩn bị được, ghi Blocked; không coi thao tác chuẩn bị lỗi là bằng chứng đã chạy case.

### Inputs / Expected Outputs

Inputs là dữ liệu trong form, tài khoản đăng nhập, lựa chọn sản phẩm hoặc trạng thái đơn. Expected Result phải nhìn thấy bằng thông báo, màn hình sau lưu và sau tải lại/đăng nhập lại. Chỉ báo thành công chưa đủ để chứng minh dữ liệu được lưu.

### Assumptions / Ambiguities

Không kiểm tra trường bị loại khỏi thông điệp, null, mã danh mục không tồn tại, thông tin xác thực bị sửa hoặc mã sản phẩm bị giả. Giá để trống không tương đương trường bị bỏ khỏi thông điệp. Chưa kết luận về khoảng trắng/Unicode của tên, độ chính xác giá lẻ, xóa sản phẩm đã có đơn hàng hoặc danh mục bị xóa giữa lúc sửa.

## Domain Analysis

| Biến | Miền/điều kiện |
|---|---|
| name | ASCII length 1–255; tên nominal thông thường |
| name | Chuỗi rỗng |
| name | ASCII length >=256 |
| price | >0 |
| price | =0 |
| price | <0 |
| Giá tiền | Không có giá trị số hợp lệ |
| Danh mục | Danh mục thuộc danh sách có sẵn |
| Quyền quản trị | Khách hàng thử vào quản lý sản phẩm |
| product resource | Sản phẩm mục tiêu tồn tại |
| operation/mode | Create đúng mode |
| operation/mode | Edit đúng selected ID |
| Xem sản phẩm | Xem sản phẩm đang tồn tại |
| operation/mode | Delete sản phẩm không có liên kết order/cart |
| description | Mô tả nominal |
| imageUrl | URL fixture nominal |
| Chọn sản phẩm sửa | Đổi từ P sang Q trước khi lưu |

## Equivalence Partitions

17 partitions có đại diện trong suite hiện hành. ID cũ được giữ khi cùng nghĩa; không gán kiểm tra màn hình vào partition giả mạo dữ liệu. Mỗi partition không có case được liệt kê riêng bên dưới.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PC-01 | name | VALID | ASCII length 1–255; tên nominal thông thường | A; tên dài 255; Bàn phím kiểm tra | FR-15 R-PC-02 |
| EP-PC-02 | name | INVALID | Chuỗi rỗng | "" | FR-15 R-PC-02 |
| EP-PC-03 | name | INVALID | ASCII length >=256 | A lặp 256 lần | FR-15 R-PC-02 |
| EP-PC-06 | price | VALID | >0 | 1; 100000 | FR-15 R-PC-03 |
| EP-PC-07 | price | INVALID | =0 | 0 | FR-15 R-PC-03 |
| EP-PC-08 | price | INVALID | <0 | -1 | FR-15 R-PC-03 |
| EP-PC-11 | Giá tiền | INVALID | Không có giá trị số hợp lệ | Thử gõ/dán abc; ghi việc bị chặn/ô rỗng | FR-15 R-PC-03 |
| EP-PC-12 | Danh mục | VALID | Danh mục thuộc danh sách có sẵn | Phụ kiện / Điện thoại | FR-15 R-PC-04 |
| EP-PC-17 | Quyền quản trị | INVALID | Khách hàng thử vào quản lý sản phẩm | Đăng nhập A ở trang quản trị | FR-12; SEC-03 |
| EP-PC-21 | product resource | VALID | Sản phẩm mục tiêu tồn tại | P_ID / Q_ID | FR-15 R-PC-01/05 |
| EP-PC-22 | operation/mode | VALID | Create đúng mode | Thêm mới | FR-15 R-PC-01 |
| EP-PC-23 | operation/mode | VALID | Edit đúng selected ID | Sửa P | FR-15 R-PC-01/05 |
| EP-PC-24 | Xem sản phẩm | VALID | Xem sản phẩm đang tồn tại | Danh sách và form Sửa P | FR-15 R-PC-01 |
| EP-PC-25 | operation/mode | VALID | Delete sản phẩm không có liên kết order/cart | Xóa P_ID | FR-15 R-PC-01; AM-PC-06 |
| EP-PC-26 | description | VALID | Mô tả nominal | Mô tả kiểm tra sản phẩm | FR-15 R-PC-01; AS-PC-07 |
| EP-PC-27 | imageUrl | VALID | URL fixture nominal | http://localhost:5174/favicon.svg | FR-15 R-PC-01; AS-PC-07 |
| EP-PC-29 | Chọn sản phẩm sửa | VALID | Đổi từ P sang Q trước khi lưu | Sửa P → Sửa Q → Lưu | FR-15 R-PC-05 |

### Partitions chưa kiểm tra trong phạm vi mới

Các định nghĩa sau giữ để thấy phần thiếu; **không phải các bước tester phải làm** và không được tính covered.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PC-04 | name | INVALID | Không có field name | Body bỏ name | FR-15 R-PC-02 |
| EP-PC-05 | name | INVALID | name=null | null | FR-15 R-PC-02 |
| EP-PC-09 | price | INVALID | Không có field price | Body bỏ price | FR-15 R-PC-03 |
| EP-PC-10 | price | INVALID | price=null | null | FR-15 R-PC-03 |
| EP-PC-13 | category_id | INVALID | Không có field category_id | Body bỏ category_id | FR-15 R-PC-04 |
| EP-PC-14 | category_id | INVALID | category_id=null | null | FR-15 R-PC-04 |
| EP-PC-15 | category_id | INVALID | ID không nằm trong tập category tồn tại | CAT_MISSING_ID | FR-15 R-PC-04 |
| EP-PC-16 | auth/role mutation | VALID | JWT hợp lệ, role admin | TOKEN_M | FR-12; SEC-02/03 |
| EP-PC-18 | Authorization mutation | INVALID | Thiếu token | Không gửi Authorization | FR-12; SEC-02 |
| EP-PC-19 | Authorization mutation | INVALID | Malformed token | Bearer not-a-jwt | FR-12; SEC-02 |
| EP-PC-20 | Authorization mutation | INVALID | JWT role sửa nhưng chữ ký cũ | TOKEN_A_TAMPERED | FR-12; SEC-02/03 |
| EP-PC-28 | target selection | INVALID (hành động) | Body id=Q nhưng URL chọn P; không được sửa Q | PUT /products/P_ID, body id=Q_ID | FR-15 R-PC-05; AM-PC-05 |
| EP-PC-30 | category current membership | INVALID (theo AS-PC-05) | UI đã chọn category nhưng category bị xóa trước submit | CAT_B_ID không còn tồn tại | FR-15 R-PC-04; AS-PC-05 |

## Boundary Analysis

| Variable | Lower | Upper | Values |
|---|---|---|---|
| Độ dài tên | 1 | 255 | 0, 1, 2, 254, 255, 256 ký tự ASCII |
| Giá | > 0 | Chưa quy định | -1, 0, 1 trên lát cắt số nguyên |

## BVA Values

Giá -1/0/1 chỉ là lát cắt số nguyên; không coi 1 là giá nhỏ nhất hoặc tự cấm giá lẻ. Tên dùng ASCII để đếm rõ số ký tự. Thêm và sửa là hai thao tác riêng.

Cases BVA: [001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md), [002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md), [003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md), [004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md), [005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md), [006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md), [013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md), [014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md), [017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md), [018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md), [025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md), [026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md), [027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md), [032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md), [033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md), [034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md).

## Generated Test Cases

[001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md), [002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md), [003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md), [004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md), [005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md), [006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md), [013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md), [014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md), [017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md), [018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md), [025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md), [026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md), [027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md), [032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md), [033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md), [034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md), [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md), [041](../test-cases/product-crud/TC-PRODUCT-CRUD-041.md), [043](../test-cases/product-crud/TC-PRODUCT-CRUD-043.md), [051](../test-cases/product-crud/TC-PRODUCT-CRUD-051.md), [054](../test-cases/product-crud/TC-PRODUCT-CRUD-054.md), [073](../test-cases/product-crud/TC-PRODUCT-CRUD-073.md), [075](../test-cases/product-crud/TC-PRODUCT-CRUD-075.md)

Danh sách có 24 file với ID gốc, một case một mục tiêu chính; bước thực hiện dùng nhãn trên màn hình. Xem [danh mục và dữ liệu chuẩn bị](../test-cases/product-crud/README.md).

## Coverage Summary

- 24 cases: 16 BVA + 8 EP.
- 17/30 partitions có đại diện; 13 chưa kiểm tra trong phạm vi này.
- Cách kiểm tra lưu dữ liệu: tải lại trang hoặc đăng xuất/đăng nhập lại và quan sát dữ liệu hiển thị.
- Không suy kết quả bảo vệ server từ việc form/nút chặn thao tác. Không tuyên bố bao phủ toàn bộ yêu cầu bảo mật hay mọi trạng thái/thiết bị.
- [Ma trận hiện hành](traceability-matrix.md) và [lý do loại cases](manual-testing-scope.md).

### Potential Coverage Gaps

Không kiểm tra trường bị loại khỏi thông điệp, null, mã danh mục không tồn tại, thông tin xác thực bị sửa hoặc mã sản phẩm bị giả. Giá để trống không tương đương trường bị bỏ khỏi thông điệp. Chưa kết luận về khoảng trắng/Unicode của tên, độ chính xác giá lẻ, xóa sản phẩm đã có đơn hàng hoặc danh mục bị xóa giữa lúc sửa.

### Assumptions / Ambiguities Requiring Clarification

Tên/địa chỉ danh nghĩa và dữ liệu mẫu là dữ liệu thử, không phải giới hạn nghiệp vụ. Các khoảng chưa được requirement quy định vẫn mở; chỉ bổ sung Expected Result khi có nguồn rõ ràng.

## Human Review Required

1. Kiểm tra rule, dữ liệu thử và nhãn màn hình có đúng requirement không.
2. Đối chiếu các partitions chưa kiểm tra với phạm vi thao tác thủ công đã chọn.
3. Xác nhận dữ liệu chuẩn bị và cách ghi Blocked khi không đến được bước cần thử. Không tự ghi phê duyệt/Pass khi chưa có kết quả thật.

## AI Gap Candidates

- Khi form chặn sớm, các bước quan sát dữ liệu đã lưu/hiển thị có thể chưa thực hiện được; ghi điểm dừng, không suy Pass cho phần chưa đến.
- Các miền chưa có oracle và các partitions bị loại cần được xem lại nếu phạm vi đổi; đây là giới hạn thiết kế, không phải lỗi hệ thống đã được xác nhận.
