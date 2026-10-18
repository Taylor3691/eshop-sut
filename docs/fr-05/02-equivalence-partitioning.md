# FR-05 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1. Chỉ search và trạng thái dữ liệu thuộc miền chức năng.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị vi phạm ràng buộc đã nêu. Input chưa được spec quy định phải ghi là chưa xác định, không tự coi là invalid.

Các lớp trong cùng một đặc tính thì rời nhau. Một giá trị có thể thuộc nhiều đặc tính khác nhau (ví dụ vừa khớp một phần vừa khác hoa thường). Vì vậy bảng chia theo đặc tính, không dồn mọi tính chất của từ khóa vào một danh sách phẳng.

Query ngoài đặc tả chỉ được kiểm tra bổ sung, không lập miền chức năng giả định.

Dữ liệu seed dùng làm mốc cho giá trị đại diện:

| id | name | price | category_id |
| --- | --- | --- | --- |
| 1 | iPhone 15 Pro Max | 30000000 | 1 |
| 2 | Samsung Galaxy S24 Ultra | 28000000 | 1 |
| 3 | MacBook Pro M3 | 45000000 | 2 |
| 4 | Tai nghe AirPods Pro 2 | 6000000 | 3 |
| 5 | Bàn phím cơ Keychron Q1 | 4000000 | 3 |

Danh mục seed: `1` Điện thoại, `2` Laptop, `3` Phụ kiện.

## 1. Từ khóa (`search`)

### 1.1 Mức khớp với tên đã lưu

`iPhone` (tiền tố), `15 Pro` (giữa tên) và `Max` (hậu tố) cùng một lớp: spec chỉ nói tìm theo tên, không tách vị trí trong tên.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-01 | VEC | Khớp toàn phần với một tên | `iPhone 15 Pro Max` | Tìm theo tên sản phẩm |
| KW-VEC-02 | VEC | Khớp một phần, không trùng cả tên | `iPhone` | Vẫn là từ khóa tên. Spec không giới hạn chỉ khớp đúng cả chuỗi |
| KW-VEC-03 | VEC | Không nằm trong bất kỳ tên nào | `zzzz-khong-co` | Phải có empty state khi không có kết quả |

### 1.2 Hoa thường

Ba lớp này giữ nguyên dấu và phần còn lại của từ. Không gộp ASCII với chữ có dấu, vì spec không yêu cầu bỏ phân biệt hoa thường, còn SQLite chỉ không phân biệt hoa thường trong ASCII.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-04 | VEC | Cùng hoa thường với tên | `iPhone` | Từ khóa tên hợp lệ |
| KW-VEC-05 | VEC | Khác hoa thường ở chữ ASCII | `iphone` | Input hợp lệ. Spec không yêu cầu phải khớp khi khác hoa thường |
| KW-VEC-06 | VEC | Khác hoa thường ở chữ có dấu | `CƠ` | Input hợp lệ. Tên seed chứa `cơ` trong `Bàn phím cơ Keychron Q1`. Spec không yêu cầu `CƠ` khớp `cơ` |

### 1.3 Dấu tiếng Việt

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-07 | VEC | Giữ đúng dấu của tên | `Bàn phím` | Tên seed `Bàn phím cơ Keychron Q1` là tên tiếng Việt hợp lệ |
| KW-VEC-08 | VEC | Bỏ dấu so với tên có dấu | `Ban phim` | Input hợp lệ. Spec không yêu cầu bỏ dấu, nên không lấy sản phẩm chỉ vì khác dấu |

### 1.4 Hình dạng chuỗi

`%`, `_` và `'` mỗi ký tự một lớp vì chúng không cùng tác dụng lên `LIKE` và câu SQL. `<script>` là VEC: FR-05 bắt hiển thị an toàn, nghĩa là chấp nhận chuỗi và không render HTML, không phải từ chối chuỗi.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-09 | VEC | Chuỗi rỗng | `""` | Trang chủ hiển thị tất cả sản phẩm. Lần mở trang cũng gửi chuỗi rỗng |
| KW-IEC-01 | VEC | Chỉ khoảng trắng | `"   "` (3 dấu cách) | Người dùng nhập được. README không nói trim hay không, nên chấp nhận cả hai cách xử lý; chỉ yêu cầu không lỗi. |
| KW-IEC-02 | VEC | Chứa `%` | `%` | Ký tự thường trong từ khóa. Tìm theo tên nghĩa là tìm đúng ký tự `%`, không phải ký tự đại diện. SEC-05 cấm nối chuỗi vào SQL. |
| KW-IEC-03 | VEC | Chứa `_` | `_` | Như `%`: `_` là dữ liệu, không được khớp một ký tự bất kỳ. |
| KW-IEC-04 | VEC | Chứa `'` | `'` | Ký tự thường trong từ khóa. Không được làm vỡ câu SQL (SEC-05). |

Mã `KW-IEC-01..04` là mã lịch sử, giữ lại để không đổi liên kết tới TC-27..30 và bug report. Cả bốn lớp đều là VEC: README không cấm các ký tự này.
| KW-VEC-10 | VEC | Chứa HTML | `<script>` | Từ khóa phải được hiển thị an toàn, không render HTML |

## 2. Tham số không hỗ trợ — kiểm thử bổ sung

`min_price`, `max_price`, `category`, `sort`, `page` không thuộc input space FR-05. Không lập VEC/IEC hoặc BVA của bộ lọc chưa tồn tại. Các TC-14..22, TC-32..45 được giữ để truy vết lượt chạy cũ, nhưng chỉ là kiểm thử độ bền khi nhận query thừa, không tính là coverage miền giá/danh mục/phân trang. Việc bỏ qua query là giả định của bộ kiểm thử, không phải yêu cầu phải mở rộng API.

## 3. Ký tự có ý nghĩa trong URL

| ID | Lớp chuỗi | Đại diện | Oracle |
| --- | --- | --- | --- |
| URL-01 | Có dấu & | a&b | Tìm cả chuỗi người dùng nhập |
| URL-02 | Có dấu # | a#b | Tìm cả chuỗi người dùng nhập |
| URL-03 | Có dấu ? | a?b | Tìm cả chuỗi người dùng nhập |

Không coi `%`, `_`, dấu nháy hoặc ký tự URL là invalid chỉ vì có ý nghĩa trong SQL/URL: chúng là dữ liệu tìm kiếm; các mã KW-IEC cũ được giữ để truy vết, không có nghĩa người dùng nhập sai.

## 4. Số sản phẩm trong CSDL (`products`)

Bước 1 đã ghi biến này làm đổi tập kết quả. README: "Trang chủ hiển thị danh sách tất cả sản phẩm" và FR-24 "Trang trống phải có icon/hình minh họa và message thân thiện". Hai lớp có hành vi khác nhau nên tách riêng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CAT-VEC-01 | VEC | Không có sản phẩm nào | Bảng `products` rỗng | Trang trống: icon/hình minh họa và message (FR-24) |
| CAT-VEC-02 | VEC | Có ít nhất một sản phẩm | 5 sản phẩm seed | Hiển thị tất cả sản phẩm dạng lưới |

README không đặt số sản phẩm tối đa, nên không có lớp "quá nhiều sản phẩm".
