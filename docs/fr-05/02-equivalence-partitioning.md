# FR-05 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-05/01-input-space-partitioning.md`, cộng ba nhóm được yêu cầu sau khi review: từ khóa, khoảng giá, danh mục và sắp xếp.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả. Hệ thống không có nghĩa vụ xử lý nó như một thao tác hợp lệ của FR-05.

Các lớp trong cùng một đặc tính thì rời nhau. Một giá trị có thể thuộc nhiều đặc tính khác nhau (ví dụ vừa khớp một phần vừa khác hoa thường). Vì vậy bảng chia theo đặc tính, không dồn mọi tính chất của từ khóa vào một danh sách phẳng.

`min_price`, `max_price`, `category` và `sort` không có trên UI FR-05 và `GET /api/products` không đọc chúng. Phân hoạch của bốn biến này vẫn được lập, để thấy miền nào sẽ là VEC nếu chức năng lọc tồn tại, và để ghi rằng hiện không có VEC nào được FR-05 công nhận cho `sort`.

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
| KW-IEC-01 | IEC | Chỉ khoảng trắng | `"   "` (3 dấu cách) | Không phải từ khóa tên. Spec không bảo liệt kê tất cả cho chuỗi này |
| KW-IEC-02 | IEC | Chứa `%` | `%` | Ngoài miền tìm đúng theo tên. Spec không định nghĩa ký tự đại diện |
| KW-IEC-03 | IEC | Chứa `_` | `_` | Ngoài miền tìm đúng theo tên. Khác `%` vì `_` trong `LIKE` là một ký tự bất kỳ |
| KW-IEC-04 | IEC | Chứa `'` | `'` | Ngoài miền từ khóa tên được mô tả. Spec không định nghĩa việc đưa nháy đơn vào câu SQL |
| KW-VEC-10 | VEC | Chứa HTML | `<script>` | Từ khóa phải được hiển thị an toàn, không render HTML |

## 2. Khoảng giá (`min_price`, `max_price`)

FR-05 không có hai biến này. Miền một biến lấy từ ràng buộc giá sản phẩm ở FR-15: số dương, lớn hơn 0. Giá trị đại diện số lấy bên trong miền, không lấy sát biên.

### 2.1 Miền của từng biên

Cùng một cách chia cho `min_price` và cho `max_price`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| PR-VEC-01 | VEC | Số dương | `100000` | FR-15: giá > 0. FR-05 không có ô lọc giá |
| PR-IEC-01 | IEC | Số âm | `-100` | Ngoài miền giá dương |
| PR-IEC-02 | IEC | Bằng 0 | `0` | FR-15 loại 0 vì giá phải lớn hơn 0. Lớp này khác số âm |
| PR-IEC-03 | IEC | Chữ cái | `abc` | Không phải số |
| PR-IEC-04 | IEC | Ký tự đặc biệt | `100@` | Không phải số. Khác `abc` vì có phần trông giống số |

### 2.2 Quan hệ giữa hai biến

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| PR-VEC-02 | VEC | `min_price < max_price` | `min_price=100000`, `max_price=500000` | Khoảng không rỗng, hai đầu đều dương |
| PR-VEC-03 | VEC | `min_price == max_price` | `min_price=6000000`, `max_price=6000000` | Một mức giá đúng một điểm vẫn là khoảng hợp lệ |
| PR-IEC-05 | IEC | `min_price > max_price` | `min_price=500000`, `max_price=100000` | Khoảng đảo. Không có cách xử lý trong spec |

## 3. Danh mục và sắp xếp

### 3.1 `category`

UI không có chọn danh mục, không có chọn nhiều. ID hợp lệ dưới đây là id đang có trong bảng `categories`, dùng khi giá trị đi qua query string.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CAT-VEC-01 | VEC | Một ID có trong `categories` | `1` | Seed còn `2`, `3`, cùng lớp. FR-05 không có lọc danh mục trên trang chủ |
| CAT-IEC-01 | IEC | Một ID số nhưng không có bản ghi | `999` | Ngoài tập id đang tồn tại |
| CAT-IEC-02 | IEC | Nhiều danh mục | `category=1&category=2` | FR-05 không có chọn nhiều. `category=1,2` cùng lớp này cho đến khi spec tách cách viết |

### 3.2 `sort`

Spec và code không có enum sắp xếp. Không lập VEC, vì gán `price_asc` hay `name_desc` là hợp lệ sẽ bịa yêu cầu.

Mọi chuỗi `sort` trên query string là một lớp. `price_asc`, `name_desc`, `foo` và `<script>` cùng lớp: FR-05 không công nhận giá trị nào, API không đọc `sort`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| SORT-IEC-01 | IEC | Mọi giá trị `sort` | `price_asc` | Không có enum hợp lệ trong FR-05 |

## Việc cố ý chưa làm ở bước này

Chưa ghép các lớp thành test case. Chưa chọn giá trị sát biên (0 so với 1, độ dài, khoảng trắng một ký tự so với rỗng). Đó là bước phân tích giá trị biên.
