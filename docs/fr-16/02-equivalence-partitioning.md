# FR-16 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-16 Import sản phẩm từ CSV**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-16/01-input-space-partitioning.md`.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả.

Các lớp trong cùng một đặc tính thì rời nhau. Một file hợp lệ mang nhiều đặc tính cùng lúc (đuôi `.csv`, header đúng, tên không rỗng, giá dương). Bảng chia theo đặc tính.

Dòng chuẩn, dùng khi một đặc tính khác đang được xét:

```csv
name,price,description,imageUrl,category_id
SP Import,100000,Mo ta san pham,https://placehold.co/300,1
```

Tài khoản seed:

| id | email | mật khẩu | role |
| --- | --- | --- | --- |
| 1 | admin@eshop.com | Admin123! | admin |
| 2 | test@eshop.com | Test1234! | user |

Không lập lớp cho số sản phẩm sẵn có, sản phẩm ẩn, hay tồn kho. Bước 1 đã kết luận chúng không chặn import. `description` rỗng và `imageUrl` rỗng không tách lớp: FR-16 không cấm rỗng. `category_id` `2`, `3` và `999` cùng lớp với `1`: FR-16 không bắt id phải có trong `categories`.

## 1. Phiên trên UI

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| SES-VEC-01 | VEC | Admin đã đăng nhập | `admin@eshop.com` trên `http://localhost:5174`, tab Sản phẩm | Chỉ admin import được |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở admin khi không có phiên | FR-16 không mô tả khách import |

## 2. Header `Authorization` và role

Thiếu header và token không verify được là hai lớp. Token của user thường là lớp thứ ba: JWT hợp lệ nhưng FR-12 bắt `role = admin`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| AUTH-VEC-01 | VEC | JWT của admin | Token đăng nhập `admin@eshop.com` | FR-12. SEC-02 và SEC-03 |
| AUTH-IEC-01 | IEC | Không có header | POST không gửi `Authorization` | Ngoài miền JWT hợp lệ |
| AUTH-IEC-02 | IEC | Token không verify được | `Authorization: Bearer not-a-jwt` | Ngoài miền JWT hợp lệ. Khác lớp thiếu header |
| ROLE-IEC-01 | IEC | JWT hợp lệ, role không phải admin | Token của `test@eshop.com` | FR-12. Khác hai lớp trên vì token vẫn verify được |

## 3. Đuôi file

`.CSV` cùng lớp với đuôi khác `.csv`. Spec chỉ viết `.csv`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| EXT-VEC-01 | VEC | Đuôi `.csv` | `hang.csv`, nội dung là dòng chuẩn | Đuôi file phải là `.csv` |
| EXT-IEC-01 | IEC | Đuôi khác `.csv` | `hang.txt`, cùng nội dung dòng chuẩn | Ngoài miền file CSV |

## 4. Header và RFC 4180

Header thiếu cột, đảo cột, hoặc dùng tên khác (`ten`, `gia`) cùng một lớp: dòng đầu không phải `name,price,description,imageUrl,category_id`.

Dấu phẩy trong trường là đặc tính riêng. Có nháy kép là cách spec bắt hệ thống đọc đúng. Không có nháy kép là file không theo RFC 4180.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| HDR-VEC-01 | VEC | Đúng header spec | `name,price,description,imageUrl,category_id` | Dòng đầu tiên là header này |
| HDR-IEC-01 | IEC | Header khác chuỗi spec | `ten,gia,mo_ta,image,danh_muc` | Ngoài header đã cho |
| CSV-VEC-01 | VEC | Dấu phẩy nằm trong nháy kép | `description` là `"Mo ta, co phay"` | RFC 4180. Trường có dấu phẩy phải được bọc trong nháy kép |
| CSV-IEC-01 | IEC | Dấu phẩy không nằm trong nháy kép | `description` là `Mo ta, co phay` | Ngoài RFC 4180. Khác lớp có nháy kép |

## 5. Tên và giá

Tên chỉ dấu cách được tách riêng trong phần bổ sung, cần làm rõ nghĩa không rỗng sau trim. `0` khác số âm: cả hai đều không phải số dương, nhưng spec nói "dương", không gộp với âm.

Giá trị dưới đây nằm trong lớp, không lấy sát biên.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| NM-VEC-01 | VEC | Tên không rỗng | `SP Import` | `name` không được rỗng |
| NM-IEC-01 | IEC | Tên rỗng | `""` | Ngoài miền tên không rỗng |
| PR-VEC-01 | VEC | Giá là số dương | `100000` | `price` phải là số dương |
| PR-IEC-01 | IEC | Giá âm | `-100` | Không phải số dương |
| PR-IEC-02 | IEC | Giá bằng 0 | `0` | Không phải số dương. Khác số âm |
| PR-IEC-03 | IEC | Giá là chữ | `abc` | Không phải số |
| PR-IEC-04 | IEC | Giá có ký tự đặc biệt | `100@` | Không phải số. Khác `abc` vì có phần trông giống số |

## 6. Mô tả, ảnh, danh mục

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| DESC-VEC-01 | VEC | Mọi chuỗi mô tả, kể cả rỗng | `Mo ta san pham` | Có trong header. FR-16 không cấm rỗng |
| IMG-VEC-01 | VEC | Mọi chuỗi ảnh, kể cả rỗng | `https://placehold.co/300` | Có trong header. FR-16 không cấm rỗng |
| CAT-VEC-01 | VEC | Mọi giá trị `category_id` | `1` | Có trong header. Spec không bắt id phải tồn tại |

## 7. Số dòng và rollback

Một dòng dữ liệu hợp lệ cùng lớp với nhiều dòng hợp lệ. Đại diện lấy hai dòng để đúng chữ "nhiều sản phẩm".

File có một dòng lỗi là lớp riêng: spec không xử lý nó như import một phần. Dòng lỗi trong đại diện là tên rỗng, tức NM-IEC-01 đặt ở dòng 2. Lớp này phủ quy tắc rollback, không thay lớp tên rỗng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| N-VEC-01 | VEC | Có ít nhất một dòng hợp lệ | Hai dòng chuẩn, tên `SP Import A` và `SP Import B` | Import nhiều sản phẩm |
| N-IEC-01 | IEC | Không có dòng dữ liệu | Chỉ có dòng header | Không có sản phẩm để import |
| ATOM-VEC-01 | VEC | Mọi dòng đều hợp lệ | Cùng hai dòng của N-VEC-01 | Cả file được thêm. Sản phẩm sẵn có không bị sửa |
| ATOM-IEC-01 | IEC | Có ít nhất một dòng lỗi | Dòng 1 chuẩn. Dòng 2 có `name` rỗng, giá `100000` | Một dòng lỗi thì rollback toàn bộ. Báo số dòng lỗi và lý do |

## 8. Query không thuộc API

Mục 6.3 không khai báo query. Không có VEC.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| Q-IEC-01 | IEC | Có thêm query | `?foo=1` | FR-16 không đọc query. Mọi key khác cùng lớp |

## Việc cố ý chưa làm ở bước này

Chưa ghép các lớp thành test case. Chưa chọn giá trị sát biên (giá `1` so với `0`, tên dài 255 so với 256, một dòng so với hai dòng). Đó là bước phân tích giá trị biên.

## Phân hoạch bổ sung sau review

CSV-VEC-02: nháy kép escape (TC-25); CSV-VEC-03: newline trong trường nháy kép (TC-26); CSV-VEC-04: kết thúc dòng CRLF (TC-27). Giá dương có phần thập phân là PR-VEC-02 (TC-29), vẫn hợp lệ theo điều kiện > 0. TC-30/31 lấy mẫu sát 0 với bước 0.01; không gọi 0.01 là số dương nhỏ nhất. Tên chỉ dấu cách tách thành NM-SPACE (TC-28), expected là giả định cần xác nhận. BOM và dấu phân cách địa phương nằm trong danh sách cần làm rõ yêu cầu.
