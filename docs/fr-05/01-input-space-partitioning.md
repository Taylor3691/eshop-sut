# FR-05 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm** (trang chủ Web, `frontend-web/src/pages/Home.jsx`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

## Cách làm

1. Đọc FR-05 trong `README.md` và mục 3.1 trong `api_specification.md`.
2. Đọc UI trang chủ để lấy mọi ô nhập và mọi query trên URL trang.
3. Đọc `GET /api/products` để lấy mọi query parameter mà API thực sự đọc.
4. Đọc bảng `products` để lấy các biến trạng thái dữ liệu có thể làm đổi tập sản phẩm trả về.
5. Với mỗi biến, ghi ràng buộc spec và ràng buộc đang có trong code thành hai cột riêng.

## 1. Biến đầu vào tường minh trên UI

Trang FR-05 là route `/`. URL trang không có query parameter. Từ khóa không được ghi lên URL.

Chỉ có một biến dữ liệu:

| Vị trí | Tên trên UI | Biến | Khi nào gửi |
| --- | --- | --- | --- |
| Ô `input type="text"`, placeholder "Tìm kiếm..." | Từ khóa | `search` | Khi bấm nút **Tìm** (submit form) |
| Lần mở trang | Không có ô nhập | `search = ""` | `useEffect` gọi API ngay, không qua ô tìm |

Nút **Tìm** là hành động gửi giá trị hiện có của `search`, không phải một biến có miền giá trị riêng.

Không có trên UI: danh mục, sắp xếp, phân trang, giá tối thiểu/tối đa, tồn kho, trạng thái ẩn/hiện.

## 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL trang `/` | không có | — |
| `GET /api/products` | `search` | không, theo `api_specification.md` mục 3.1 |

API chỉ đọc `req.query.search`. Mọi key khác (`category`, `page`, `limit`, `sort`, `stock`, `is_active`, ...) không được khai báo và không được dùng.

Client ghép từ khóa thẳng vào URL, không gọi `encodeURIComponent`:

```16:16:frontend-web/src/pages/Home.jsx
        `http://localhost:3000/api/products?search=${query}`,
```

Ký tự `&`, `#`, `?` trong từ khóa vì vậy có thể cắt hoặc thêm query key. Server vẫn bỏ qua mọi key khác `search`.

## 3. Biến trạng thái dữ liệu

Các biến này không nằm trên form. Chúng là trạng thái của dòng sản phẩm trong CSDL và quyết định dòng đó có nằm trong kết quả hay không.

| Biến | Có làm đổi tập kết quả không | Vì sao |
| --- | --- | --- |
| Nội dung `products.name`, gồm tên có dấu tiếng Việt | Có, khi `search` khác rỗng | `WHERE name LIKE '%từ khóa%'` |
| Số dòng trong `products` | Có | API trả mọi dòng khi không tìm, hoặc mọi dòng khớp khi có từ khóa |
| `products.description` | Không | Không có trong `WHERE`. Spec cũng chỉ tìm theo tên |
| `products.category_id` | Không | Có cột, không có điều kiện lọc |
| `products.price`, `products.imageUrl` | Không | Chỉ được trả ra, không dùng để lọc |
| Sản phẩm ẩn / `is_active` | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột này |
| Tồn kho = 0 | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột tồn kho |

`is_active` chỉ tồn tại ở bảng `coupons`, không liên quan FR-05.

## 4. Bảng biến, kiểu, và ràng buộc

| Tên biến | Kiểu dữ liệu | Ràng buộc theo spec | Ràng buộc thực tế trong code |
| --- | --- | --- | --- |
| `search` (ô tìm trên UI) | Chuỗi | Tìm theo tên sản phẩm. Từ khóa phải hiển thị an toàn, không render HTML. Spec không nêu độ dài, rỗng, hoa thường, hay khớp một phần. | `input type="text"`, không `maxLength`, không `pattern`. Giá trị chỉ được gửi khi submit. Trang không hiện loading. Khi có từ khóa, UI đưa nguyên chuỗi vào `dangerouslySetInnerHTML`. |
| `search` (query của `GET /api/products`) | Chuỗi, tùy chọn | `?search=keyword` tìm theo tên. Vắng tham số thì lấy danh sách. Trang chủ phải hiện mọi sản phẩm. | Đọc `req.query.search`. Chuỗi rỗng hoặc tham số vắng thì `SELECT * FROM products`. Chuỗi khác rỗng, kể cả toàn dấu cách, thì `WHERE name LIKE '%${searchQuery}%'`, nối thẳng vào SQL, không tham số hóa. `%` và `_` là ký tự đại diện của `LIKE`, không được escape. |
| `products.name` (dấu tiếng Việt và cách viết) | `TEXT` | Tên là chuỗi được tìm. FR-15 (khi tạo sản phẩm) yêu cầu tên bắt buộc, tối đa 255 ký tự. FR-05 không yêu cầu bỏ dấu hay không phân biệt hoa thường. | Cột `TEXT`, không `CHECK` độ dài. `LIKE` của SQLite không phân biệt hoa thường với chữ ASCII, nhưng phân biệt hoa thường và dấu với chữ ngoài ASCII. `điện` không khớp `dien` hay `Dien`. Không có chuẩn hóa Unicode. |
| `products` (số dòng trong CSDL) | Số nguyên ≥ 0 | Không có kết quả tìm kiếm thì phải có empty state. | Không lọc trước khi trả. Mảng rỗng vẫn là JSON `[]`. UI không có nhánh empty state; lưới để trống. |
| `products.description` | `TEXT` | Không dùng làm khóa tìm. | Không có trong `WHERE`. |
| `products.category_id` | Số nguyên, có thể rỗng | FR-05 không có lọc theo danh mục. | Cột có trong bảng và trong dữ liệu seed. `SELECT` không dùng cột này để lọc. |
| `products.is_active` (ẩn / inactive) | Không có kiểu | FR-05 không định nghĩa sản phẩm ẩn hay ngừng bán. | Không có cột. Mọi dòng `products` đều được trả. |
| `products.stock` (tồn kho) | Không có kiểu | FR-05 không định nghĩa tồn kho, kể cả tồn kho = 0. | Không có cột. Không có điều kiện loại sản phẩm hết hàng. |

## Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.
