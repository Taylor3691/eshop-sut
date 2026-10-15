# FR-05 — Domain Testing, bước 2: Phân hoạch tương đương (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-05-mobile/01-input-space-partitioning.md`. Bộ web ở `docs/fr-05/` không bị sửa.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả.

Các lớp trong cùng một đặc tính thì rời nhau. Một từ khóa có thể thuộc nhiều đặc tính. Bảng chia theo đặc tính.

Không lập lớp cho giá, danh mục, sắp xếp, phân trang, tồn kho, sản phẩm ẩn. Bước 1 đã kết luận màn mobile không có các ô đó và `GET /api/products` không đọc chúng. Không lập lớp cho `description`: spec chỉ tìm theo tên.

Dữ liệu seed dùng làm mốc:

| id | name | price | category_id |
| --- | --- | --- | --- |
| 1 | iPhone 15 Pro Max | 30000000 | 1 |
| 2 | Samsung Galaxy S24 Ultra | 28000000 | 1 |
| 3 | MacBook Pro M3 | 45000000 | 2 |
| 4 | Tai nghe AirPods Pro 2 | 6000000 | 3 |
| 5 | Bàn phím cơ Keychron Q1 | 4000000 | 3 |

Giá trị trong bảng là chuỗi người dùng gõ trên ô tìm, chưa encode.

## 1. Mức khớp với tên đã lưu

`iPhone` (tiền tố), `15 Pro` (giữa tên) và `Max` (hậu tố) cùng một lớp. Spec chỉ nói tìm theo tên, không tách vị trí trong tên.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-01 | VEC | Khớp toàn phần với một tên | `iPhone 15 Pro Max` | Tìm theo tên sản phẩm |
| KW-VEC-02 | VEC | Khớp một phần, không trùng cả tên | `iPhone` | Vẫn là từ khóa tên. Spec không giới hạn chỉ khớp đúng cả chuỗi |
| KW-VEC-03 | VEC | Không nằm trong bất kỳ tên nào | `zzzz-khong-co` | Phải có empty state khi không có kết quả |

## 2. Hoa thường

Không gộp ASCII với chữ có dấu. Spec không yêu cầu bỏ phân biệt hoa thường.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-04 | VEC | Cùng hoa thường với tên | `iPhone` | Từ khóa tên hợp lệ |
| KW-VEC-05 | VEC | Khác hoa thường ở chữ ASCII | `iphone` | Input hợp lệ. Spec không yêu cầu phải khớp khi khác hoa thường |
| KW-VEC-06 | VEC | Khác hoa thường ở chữ có dấu | `CƠ` | Input hợp lệ. Tên seed chứa `cơ` trong `Bàn phím cơ Keychron Q1`. Spec không yêu cầu `CƠ` khớp `cơ` |

## 3. Dấu tiếng Việt

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-07 | VEC | Giữ đúng dấu của tên | `Bàn phím` | Tên seed `Bàn phím cơ Keychron Q1` |
| KW-VEC-08 | VEC | Bỏ dấu so với tên có dấu | `Ban phim` | Input hợp lệ. Spec không yêu cầu bỏ dấu |

## 4. Hình dạng chuỗi

`%`, `_` và `'` mỗi ký tự một lớp vì bước 1 ghi chúng không cùng tác dụng lên `LIKE` và câu SQL. `&`, `#` và `?` mỗi ký tự một lớp vì client nối thẳng vào URL và ba ký tự này không cắt request theo cùng một cách. `<script>` là VEC: FR-05 bắt hiển thị an toàn, nghĩa là hiện thành chữ, không từ chối chuỗi.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-09 | VEC | Chuỗi rỗng | `""` | Trang chủ hiển thị tất cả sản phẩm. Lần mở màn cũng gửi chuỗi rỗng |
| KW-IEC-01 | IEC | Chỉ khoảng trắng | `"   "` (3 dấu cách) | Không phải từ khóa tên. Spec không bảo liệt kê tất cả cho chuỗi này |
| KW-IEC-02 | IEC | Chứa `%` | `%` | Ngoài miền tìm đúng theo tên. Spec không định nghĩa ký tự đại diện |
| KW-IEC-03 | IEC | Chứa `_` | `_` | Ngoài miền tìm đúng theo tên. `_` trong `LIKE` là một ký tự bất kỳ, khác `%` |
| KW-IEC-04 | IEC | Chứa `'` | `'` | Ngoài miền từ khóa tên được mô tả. Spec không định nghĩa việc đưa nháy đơn vào câu SQL |
| KW-IEC-05 | IEC | Chứa `&` | `a&b` | Ngoài miền từ khóa tên. `&` thêm query key |
| KW-IEC-06 | IEC | Chứa `#` | `a#b` | Ngoài miền từ khóa tên. `#` mở fragment, khác `&` |
| KW-IEC-07 | IEC | Chứa `?` | `a?b` | Ngoài miền từ khóa tên. `?` mở query, khác `&` và `#` |
| KW-VEC-10 | VEC | Chứa HTML | `<script>` | Từ khóa phải được hiển thị an toàn, không render HTML |
