# FR-05 — Domain Testing, bước 1: Input Space Partitioning (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, kiểm trên app mobile `frontend-mobile/App.js`, màn `home`.

Bộ tài liệu web đã có ở `docs/fr-05/`. File này không sửa bộ đó.

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

## Cách làm

1. Đọc FR-05 trong `README.md`, cùng FR-21 (một `h1`, tiền dùng `₫`) và FR-24 (empty state, `alt` của ảnh). Đọc mục 3.1 trong `api_specification.md`.
2. Đọc màn `home` trong `frontend-mobile/App.js`. App đổi màn bằng state `view`, không có route và không có query trên URL trang.
3. Đọc `GET /api/products`. Chỉ tính query mà handler thực sự đọc.
4. Đọc bảng `products` và seed trong `backend/database.js`.

Màn chi tiết sản phẩm là FR-06. Nút "Thêm vào giỏ" trên thẻ sản phẩm không phải input của FR-05.

## 1. Biến đầu vào tường minh trên UI

Chỉ có một ô nhập:

| Vị trí | Tên trên UI | Biến | Khi nào gửi |
| --- | --- | --- | --- |
| `TextInput`, placeholder "Tìm kiếm..." | Từ khóa | `search` | Khi bấm nút **Tìm** |
| Lần mở màn `home` | Không qua ô nhập | `search = ""` | `useEffect` gọi `fetchProducts()` ngay |

Nút **Tìm** gửi giá trị hiện có của `search`. Nút không phải một biến có miền riêng.

Không có trên màn này: danh mục, sắp xếp, phân trang, giá tối thiểu, giá tối đa, tồn kho, trạng thái ẩn.

## 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL app mobile | không có | App một màn, đổi bằng `view` |
| `GET /api/products` | `search` | không, theo `api_specification.md` mục 3.1 |

Handler chỉ đọc `req.query.search`. Mọi key khác không được dùng.

Client ghép từ khóa thẳng vào URL, không gọi `encodeURIComponent`:

```88:88:frontend-mobile/App.js
      const response = await fetch(`${API_URL}/products?search=${query}`);
```

`API_URL` trong file là `http://192.168.10.13:3000/api`. Ký tự `&`, `#`, `?` trong từ khóa có thể cắt hoặc thêm query key. Server vẫn bỏ qua mọi key khác `search`.

## 3. Biến trạng thái dữ liệu

| Biến | Có làm đổi tập kết quả không | Vì sao |
| --- | --- | --- |
| Nội dung `products.name`, gồm tên có dấu tiếng Việt | Có, khi `search` khác rỗng | `WHERE name LIKE '%từ khóa%'` |
| Số dòng trong `products` | Có | API trả mọi dòng khi không tìm, hoặc mọi dòng khớp khi có từ khóa. Seed có 5 sản phẩm |
| `products.description` | Không | Không có trong `WHERE`. Spec chỉ tìm theo tên |
| `products.category_id` | Không | Có cột, không có điều kiện lọc |
| `products.price`, `products.imageUrl` | Không | Chỉ được trả ra để hiện, không dùng để lọc |
| Sản phẩm ẩn / `is_active` | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột này |
| Tồn kho = 0 | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột tồn kho |

## 4. Bảng biến, kiểu, và ràng buộc

| Tên biến | Kiểu dữ liệu | Ràng buộc theo spec | Ràng buộc thực tế trong code |
| --- | --- | --- | --- |
| `search` (ô tìm trên UI) | Chuỗi | Tìm theo tên sản phẩm. Từ khóa phải hiển thị an toàn, không render HTML. Spec không nêu độ dài, rỗng, hoa thường, hay khớp một phần. | `TextInput` không `maxLength`, không `pattern`. Giá trị chỉ gửi khi bấm **Tìm**. Có chữ "Đang tải..." khi `loadingProducts` đang bật. Từ khóa được đặt trong `<Text>`, không render HTML. |
| `search` (query của `GET /api/products`) | Chuỗi, tùy chọn | `?search=keyword` tìm theo tên. Vắng tham số thì lấy danh sách. Trang chủ phải hiện mọi sản phẩm. | Đọc `req.query.search`. Chuỗi rỗng hoặc tham số vắng thì `SELECT * FROM products`. Chuỗi khác rỗng, kể cả toàn dấu cách, thì `WHERE name LIKE '%${searchQuery}%'`, nối thẳng vào SQL, không tham số hóa. `%` và `_` là ký tự đại diện của `LIKE`, không được escape. Lỗi SQL trả HTML. |
| `products.name` (dấu tiếng Việt và cách viết) | `TEXT` | Tên là chuỗi được tìm. FR-15 giới hạn tên tối đa 255 ký tự khi tạo sản phẩm. FR-05 không yêu cầu bỏ dấu hay không phân biệt hoa thường. | Cột `TEXT`, không `CHECK` độ dài. `LIKE` của SQLite không phân biệt hoa thường với chữ ASCII, nhưng phân biệt dấu với chữ ngoài ASCII. |
| `products` (số dòng trả về) | Số nguyên ≥ 0 | Danh sách dạng lưới. Mỗi sản phẩm có ảnh có `alt`, tên, giá dùng `₫` và phân cách hàng nghìn. Không có kết quả thì có empty state. Trang có đúng một `h1`. | `FlatList` không `numColumns`, xếp một cột. `Image` không có `alt` hay `accessibilityLabel`. Giá qua `formatMoney`: `toLocaleString()` rồi `₫`. Khi `products.length` là 0, không có icon và không có câu empty state. Tiêu đề là `<Text>` "Danh sách sản phẩm", không có thẻ `h1`. |
| `products.description` | `TEXT` | Không dùng làm khóa tìm. | Không có trong `WHERE`. Màn danh sách không hiện mô tả. |
| `products.category_id` | Số nguyên, có thể rỗng | FR-05 không có lọc theo danh mục. | Cột có trong bảng và trong seed. `SELECT` không dùng cột này để lọc. |
| `products.is_active` | Không có kiểu | FR-05 không định nghĩa sản phẩm ẩn. | Không có cột. Mọi dòng `products` đều được trả. |
| `products.stock` | Không có kiểu | FR-05 không định nghĩa tồn kho. | Không có cột. Không loại sản phẩm hết hàng. |
