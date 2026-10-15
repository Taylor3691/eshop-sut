# FR-16 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-16 Import sản phẩm từ CSV** (trang Admin, tab Sản phẩm, `frontend-admin/src/App.jsx`, `http://localhost:5174`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

## Cách làm

1. Đọc FR-16 trong `README.md`, cùng FR-12 (API admin cần JWT và `role = admin`), FR-15 (ràng buộc tên và giá khi quản lý sản phẩm) và SEC-02, SEC-03.
2. Đọc khối "Import sản phẩm từ CSV" trên tab Sản phẩm. Trang admin không có route con và không có query trên URL.
3. Đọc `POST /api/admin/import-products`. Handler không đọc query.
4. Đọc bảng `products` và `categories` trong `backend/database.js`.

Form Thêm/Sửa sản phẩm trên cùng tab thuộc FR-15, không phải input của FR-16.

## 1. Biến đầu vào tường minh trên UI

Ô nhập của FR-16 là một `input type="file"` ở dòng 356 của `frontend-admin/src/App.jsx`. Không có `accept`. Khi chọn file, UI gọi `FileReader.readAsText` ngay, không đợi bấm Import.

Nút **Import** gửi mảng đã tách từ file. Nút tắt khi chưa có dòng xem trước hoặc khi đang gửi. Nút không phải một biến có miền riêng.

Link "Tải file mẫu" chỉ tải một file mẫu, không gửi dữ liệu lên server.

Chưa đăng nhập thì không thấy tab Sản phẩm. Đăng nhập xong, UI chỉ giữ token nếu `role` là `admin`.

## 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL trang admin | không có | — |
| `POST /api/admin/import-products` | không có query | Header `Authorization: Bearer <token>`. Body JSON `{ "products": [ ... ] }`, theo `api_specification.md` mục 6.3 |

Handler chỉ đọc `req.body.products` và `req.user` sau khi xác thực token. Không đọc `req.query`. Không kiểm tra `role`.

File CSV không được gửi nguyên. Trình duyệt tách file thành mảng object rồi POST JSON.

## 3. Biến trạng thái dữ liệu

| Biến | Có làm đổi kết quả import không | Vì sao |
| --- | --- | --- |
| Số dòng đang có trong `products` | Không chặn dòng mới | Không có ràng buộc tên duy nhất. Import chỉ `INSERT` |
| `categories.id` | Không được dùng để chấp nhận hay từ chối | Không có khóa ngoại. `category_id` lạ vẫn được ghi |
| Sản phẩm ẩn / tồn kho | Không thể | Bảng `products` không có cột ẩn hay tồn kho |
| `role` trong JWT | Không, ở API | Handler không đọc `req.user.role`. UI thì chặn đăng nhập nếu không phải admin |

Seed danh mục: `1` Điện thoại, `2` Laptop, `3` Phụ kiện. Seed sản phẩm có 5 dòng. Import thêm dòng, không sửa 5 dòng đó.

## 4. Bảng biến, kiểu, và ràng buộc

| Tên biến | Kiểu dữ liệu | Ràng buộc theo spec | Ràng buộc thực tế trong code |
| --- | --- | --- | --- |
| Phiên admin | Có token của admin, hoặc không | FR-16 dành cho admin. FR-12: API `/api/admin/*` cần JWT hợp lệ và `role = admin`. | UI từ chối đăng nhập nếu `role` khác `admin`. API import chỉ gọi `authenticateToken`: thiếu token thì 401, token không verify được thì 403. Không kiểm tra role. |
| File được chọn | File | Đuôi phải là `.csv`. | `input type="file"` không lọc đuôi. Mọi file đều được đọc thành chữ. Không có nhánh báo sai đuôi. |
| Nội dung file | Văn bản CSV, RFC 4180 | Dòng đầu là header đúng `name,price,description,imageUrl,category_id`. Trường có dấu phẩy phải được bọc trong nháy kép. | Tách bằng `split(",")` và `split("\n")`. Nháy kép không được xử lý. Header lấy từ dòng đầu, không đối chiếu với chuỗi spec. Ô thiếu thành chuỗi rỗng. |
| Số dòng dữ liệu | Số nguyên ≥ 0 | Import nhiều sản phẩm. Một dòng lỗi thì cả file rollback. | Dòng sau header thành một phần tử preview. 0 dòng thì nút Import tắt. API từ chối mảng rỗng bằng HTTP 400 `Không có dữ liệu để import`. Có dòng thì insert từng dòng, không có transaction. |
| `name` | Chuỗi | Không được rỗng. FR-15, khi quản lý sản phẩm, thêm tối đa 255 ký tự. FR-16 không nhắc 255. | API bỏ qua dòng nếu `!row.name` và ghi lỗi `Thiếu tên sản phẩm`. Chuỗi khác rỗng, kể cả toàn dấu cách, được insert. Cột `TEXT`, không `CHECK` độ dài. UI còn nhận cột `ten` hoặc `Name`. |
| `price` | Số | Phải là số dương. | UI gửi chuỗi trong ô, hoặc `0` nếu ô rỗng. API không kiểm tra dương, không kiểm tra là số. Cột `INTEGER`. UI còn nhận cột `gia` hoặc `Price`. |
| `description` | Chuỗi | Có trong header. FR-16 không cấm rỗng. | Rỗng thì ghi `""`. UI còn nhận `mo_ta` hoặc `Description`. |
| `imageUrl` | Chuỗi | Có trong header. FR-16 không cấm rỗng. | Rỗng thì ghi `""`. UI còn nhận `image` hoặc `Image`. |
| `category_id` | Số nguyên | Có trong header. FR-16 không nói phải là id đang có trong `categories`. | Thiếu hoặc rỗng thì UI và API đều lấy `1`. UI `parseInt` trước khi gửi. Không đối chiếu bảng `categories`. |
| `products` đang có | Các dòng seed và dòng đã thêm | Import lỗi phải rollback, không để lại một phần. | Không xóa và không sửa dòng cũ. Dòng insert thành công nằm lại trong bảng kể cả khi dòng khác lỗi. |

## Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.
