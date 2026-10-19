# HW02 — Domain Testing và Boundary Value Analysis

Sinh viên: Huỳnh Thái Toàn — MSSV: 23120175.

## 1. Phạm vi và phương pháp

| Pool | Chức năng | Môi trường | Báo cáo trong tài liệu này |
| --- | --- | --- | --- |
| A | FR-05 tìm kiếm sản phẩm | Web localhost:5173 | Mục 2 |
| B | FR-11 lịch sử đơn hàng | Web localhost:5173/profile | Mục 3 |
| C | FR-16 import CSV | Admin localhost:5174 | Mục 4 |
| D | FR-05 trên app mobile | Android emulator, Expo Go 54 | Mục 5 |

Mỗi mục 2–5 chứa toàn văn báo cáo domain testing và boundary value analysis của chức năng đó: biến đầu vào, phân hoạch tương đương, điểm on/off/in/out, BVA 3 giá trị, và bộ test case. Kết quả chạy nằm ở `05-execution-results.md` trong thư mục chức năng. AI gap analysis nằm ở `06-ai-gap-analysis.md`. Bug report nằm ở mục 7.

Quy trình:

1. **Xác định biến.** Trích yêu cầu FR và điều kiện UI/bảo mật dùng chung; tách ràng buộc đặc tả với cách code đang làm. Gồm cả biến trạng thái dữ liệu (ví dụ số dòng trong bảng).
2. **Phân miền.** Chia miền theo từng đặc tính. VEC/IEC dựa trên điều kiện xác nhận; spec im lặng thì ghi giả định hoặc thăm dò.
3. **Chọn điểm on/off/in/out (domain testing).** Với mỗi biên của biến có thứ tự: on nằm trên biên; off gần biên nhất ở phía bên kia (biên đóng thì off ngoài miền, biên mở thì off trong miền); in/out là giá trị điển hình trong/ngoài miền.
4. **BVA 3 giá trị.** Min-1/Min/Min+1 và Max-1/Max/Max+1 khi spec có biên. Không áp BVA số học cho ID; không bịa Max hoặc phân trang.
5. **Viết test case.** Base choice cho từng đặc tính, mỗi test invalid chỉ đổi một điều kiện; lập ma trận miền/biên/điểm → TC.
6. **Chạy.** Script Playwright/fetch, ghi Expected/Actual và ảnh bằng chứng cho test FAIL. FAIL của test không đồng nghĩa bug đặc tả.
7. **Bug report và AI gap analysis.** Gom phát hiện theo nguyên nhân, ghi bug kèm ảnh và issue; ghi phần AI bỏ sót và lý do.

## 2. FR-05 web — Pool A

Toàn văn báo cáo domain testing và boundary value analysis của chức năng này.

### FR-05 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm** (trang chủ Web, `frontend-web/src/pages/Home.jsx`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

#### Cách làm

1. Đọc FR-05 trong `README.md` và mục 3.1 trong `api_specification.md`.
2. Đọc UI trang chủ để lấy mọi ô nhập và mọi query trên URL trang.
3. Đọc `GET /api/products` để lấy mọi query parameter mà API thực sự đọc.
4. Đọc bảng `products` để lấy các biến trạng thái dữ liệu có thể làm đổi tập sản phẩm trả về.
5. Với mỗi biến, ghi ràng buộc spec và ràng buộc đang có trong code thành hai cột riêng.

#### 1. Biến đầu vào tường minh trên UI

Trang FR-05 là route `/`. URL trang không có query parameter. Từ khóa không được ghi lên URL.

Chỉ có một biến dữ liệu:

| Vị trí | Tên trên UI | Biến | Khi nào gửi |
| --- | --- | --- | --- |
| Ô `input type="text"`, placeholder "Tìm kiếm..." | Từ khóa | `search` | Khi bấm nút **Tìm** (submit form) |
| Lần mở trang | Không có ô nhập | `search = ""` | `useEffect` gọi API ngay, không qua ô tìm |

Nút **Tìm** là hành động gửi giá trị hiện có của `search`, không phải một biến có miền giá trị riêng.

Không có trên UI: danh mục, sắp xếp, phân trang, giá tối thiểu/tối đa, tồn kho, trạng thái ẩn/hiện.

#### 2. Query parameter trên URL và API

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

#### 3. Biến trạng thái dữ liệu

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

#### 4. Bảng biến, kiểu, và ràng buộc

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

#### Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.

### FR-05 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1. Chỉ search và trạng thái dữ liệu thuộc miền chức năng.

#### Cách chia VEC và IEC

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

#### 1. Từ khóa (`search`)

##### 1.1 Mức khớp với tên đã lưu

`iPhone` (tiền tố), `15 Pro` (giữa tên) và `Max` (hậu tố) cùng một lớp: spec chỉ nói tìm theo tên, không tách vị trí trong tên.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-01 | VEC | Khớp toàn phần với một tên | `iPhone 15 Pro Max` | Tìm theo tên sản phẩm |
| KW-VEC-02 | VEC | Khớp một phần, không trùng cả tên | `iPhone` | Vẫn là từ khóa tên. Spec không giới hạn chỉ khớp đúng cả chuỗi |
| KW-VEC-03 | VEC | Không nằm trong bất kỳ tên nào | `zzzz-khong-co` | Phải có empty state khi không có kết quả |

##### 1.2 Hoa thường

Ba lớp này giữ nguyên dấu và phần còn lại của từ. Không gộp ASCII với chữ có dấu, vì spec không yêu cầu bỏ phân biệt hoa thường, còn SQLite chỉ không phân biệt hoa thường trong ASCII.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-04 | VEC | Cùng hoa thường với tên | `iPhone` | Từ khóa tên hợp lệ |
| KW-VEC-05 | VEC | Khác hoa thường ở chữ ASCII | `iphone` | Input hợp lệ. Spec không yêu cầu phải khớp khi khác hoa thường |
| KW-VEC-06 | VEC | Khác hoa thường ở chữ có dấu | `CƠ` | Input hợp lệ. Tên seed chứa `cơ` trong `Bàn phím cơ Keychron Q1`. Spec không yêu cầu `CƠ` khớp `cơ` |

##### 1.3 Dấu tiếng Việt

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-07 | VEC | Giữ đúng dấu của tên | `Bàn phím` | Tên seed `Bàn phím cơ Keychron Q1` là tên tiếng Việt hợp lệ |
| KW-VEC-08 | VEC | Bỏ dấu so với tên có dấu | `Ban phim` | Input hợp lệ. Spec không yêu cầu bỏ dấu, nên không lấy sản phẩm chỉ vì khác dấu |

##### 1.4 Hình dạng chuỗi

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

#### 2. Tham số không hỗ trợ — kiểm thử bổ sung

`min_price`, `max_price`, `category`, `sort`, `page` không thuộc input space FR-05. Không lập VEC/IEC hoặc BVA của bộ lọc chưa tồn tại. Các TC-14..22, TC-32..45 được giữ để truy vết lượt chạy cũ, nhưng chỉ là kiểm thử độ bền khi nhận query thừa, không tính là coverage miền giá/danh mục/phân trang. Việc bỏ qua query là giả định của bộ kiểm thử, không phải yêu cầu phải mở rộng API.

#### 3. Ký tự có ý nghĩa trong URL

| ID | Lớp chuỗi | Đại diện | Oracle |
| --- | --- | --- | --- |
| URL-01 | Có dấu & | a&b | Tìm cả chuỗi người dùng nhập |
| URL-02 | Có dấu # | a#b | Tìm cả chuỗi người dùng nhập |
| URL-03 | Có dấu ? | a?b | Tìm cả chuỗi người dùng nhập |

Không coi `%`, `_`, dấu nháy hoặc ký tự URL là invalid chỉ vì có ý nghĩa trong SQL/URL: chúng là dữ liệu tìm kiếm; các mã KW-IEC cũ được giữ để truy vết, không có nghĩa người dùng nhập sai.

#### 4. Số sản phẩm trong CSDL (`products`)

Bước 1 đã ghi biến này làm đổi tập kết quả. README: "Trang chủ hiển thị danh sách tất cả sản phẩm" và FR-24 "Trang trống phải có icon/hình minh họa và message thân thiện". Hai lớp có hành vi khác nhau nên tách riêng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CAT-VEC-01 | VEC | Không có sản phẩm nào | Bảng `products` rỗng | Trang trống: icon/hình minh họa và message (FR-24) |
| CAT-VEC-02 | VEC | Có ít nhất một sản phẩm | 5 sản phẩm seed | Hiển thị tất cả sản phẩm dạng lưới |

README không đặt số sản phẩm tối đa, nên không có lớp "quá nhiều sản phẩm".

### FR-05 — Chọn điểm on/off/in/out và phân tích biên

#### A. Domain testing — chọn điểm on/off/in/out

Quy ước theo bài giảng domain testing:

- **On point:** giá trị nằm đúng trên biên.
- **Off point:** giá trị gần biên nhất nằm ở phía bên kia biên. Biên đóng (`≥`) thì off point nằm ngoài miền; biên mở (`>`) thì off point nằm trong miền.
- **In point:** giá trị điển hình nằm trong miền, không sát biên.
- **Out point:** giá trị điển hình nằm ngoài miền, không sát biên.

Chỉ áp dụng cho biến có thứ tự. Các lớp liệt kê ở bước 2 (khớp/không khớp, hoa thường, dấu, `%`, `_`, `'`, `&`, `#`, `?`, HTML) không có biên nên không có on/off; chúng được phủ bằng một giá trị đại diện mỗi lớp.

##### A.1 Độ dài từ khóa — biên `len(search) ≥ 1`

Miền "có lọc theo tên" là `len ≥ 1` (biên đóng). Miền kề bên `len = 0` là "hiện tất cả sản phẩm".

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (len 1) | Có lọc | TC-10 |
| Off | `""` (len 0) | Hiện tất cả | TC-08 |
| In | `iPhone` (len 6) | Có lọc | TC-01 |
| Out | `""` (len 0) | Hiện tất cả | TC-08 |

Độ dài không âm, nên out point trùng off point. Không có biên trên (README không nêu MaxLength).

##### A.2 Số sản phẩm trong CSDL — biên `N ≥ 1`

Miền CAT-VEC-02 "có sản phẩm để hiện lưới" là `N ≥ 1` (biên đóng). `N = 0` là CAT-VEC-01, phải hiện trang trống.

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có lưới | TC-53 |
| Off | 0 | Trang trống | TC-52 |
| In | 5 (seed) | Có lưới | TC-08 |
| Out | 0 | Trang trống | TC-52 |

Số dòng không âm, nên out point trùng off point. README không có giới hạn trên.

#### B. Boundary value analysis

FR-05 không quy định độ dài tối đa của từ khóa. Giới hạn tên sản phẩm ở FR-15 không phải giới hạn ô tìm kiếm. Không áp dụng Max = 255 cho từ khóa.

##### B.1 Biên chuyển trạng thái rỗng / không rỗng

| ID | Độ dài | Giá trị | Ý nghĩa |
| --- | --- | --- | --- |
| LEN-01 | 0 | Chuỗi rỗng | Liệt kê tất cả sản phẩm |
| LEN-02 | 1 | a | Đầu lớp chuỗi không rỗng |
| LEN-03 | 2 | aa | Bên trong lớp chuỗi không rỗng |

Các mã LEN-04, LEN-05, LEN-06 giữ các chuỗi 254, 255, 256 ký tự làm kiểm thử độ bền bổ sung, không phải Max-1/Max/Max+1 của search. Không được mong đợi lỗi độ dài vì spec không nêu giới hạn.

Khoảng trắng: 0, 1, 2 dấu cách kiểm tra chuyển từ rỗng sang chuỗi chỉ dấu cách; chính sách trim chưa được spec chốt. `%`, `_`, nháy đơn, `&`, `#`, `?` là các lớp ký tự, không phải biên số.

##### B.2 Số sản phẩm trong CSDL

Miền CAT-VEC-02 là `N ≥ 1`, nên `Min = 1`. Không có Max, nên không có bộ `Max-1/Max/Max+1`.

| ID | Vị trí | N | Lớp bước 2 | Expected |
| --- | --- | --- | --- | --- |
| CAT-B-01 | Min-1 | 0 | CAT-VEC-01 | Trang trống có icon/hình và message |
| CAT-B-02 | Min | 1 | CAT-VEC-02 | Lưới đúng 1 sản phẩm |
| CAT-B-03 | Min+1 | 2 | CAT-VEC-02 | Lưới đúng 2 sản phẩm |

Không lập BVA giá, sort, danh mục hoặc phân trang cho FR-05. Không dùng ký hiệu L và không tạo test blocked cho chức năng không được yêu cầu.

### FR-05 — Test cases

Nguồn: miền ở `docs/fr-05/02-equivalence-partitioning.md` và biên ở `docs/fr-05/03-boundary-value-analysis.md`.

#### Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: lưới gồm mọi sản phẩm đang có.
- Tìm theo tên; chính sách hoa thường và bỏ dấu chưa được spec chốt. Không tự bắt buộc phân biệt hoặc không phân biệt.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có thông báo empty state. Trang có đúng một `h1`. Ảnh có alt mô tả. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- `min_price`, `max_price`, `category`, `sort`, `page` không thuộc FR-05. Gửi chúng không được đổi tập sản phẩm so với cùng từ khóa khi không gửi, và không được trả lỗi.

#### Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn của từ khóa là `iPhone` (khớp một phần, cùng hoa thường, đúng 1 sản phẩm seed). Các test query thừa giữ dữ liệu cũ để đối chiếu, không đặt mức chuẩn cho miền chức năng không tồn tại.

Base choice cho search; mỗi lớp còn lại đổi một yếu tố. `15 Pro` và `Max` là các đại diện bổ sung có thể dùng khi kiểm tra độ đầy đủ khớp chuỗi. Query thừa được tách khỏi coverage chức năng.

**Ký tự đặc biệt — một yếu tố một test.** Mỗi test chỉ đổi một lớp ký tự so với mức chuẩn, để lỗi này không bị lỗi khác che.

Không có miền phân trang; loại các test phụ thuộc L.

Seed, trừ test nào ghi khác:

| Tên | Giá | category_id |
| --- | --- | --- |
| iPhone 15 Pro Max | 30000000 | 1 |
| Samsung Galaxy S24 Ultra | 28000000 | 1 |
| MacBook Pro M3 | 45000000 | 2 |
| Tai nghe AirPods Pro 2 | 6000000 | 3 |
| Bàn phím cơ Keychron Q1 | 4000000 | 3 |

Dữ liệu UI là chuỗi người dùng nhập, không encode trước. URLSearchParams chỉ dùng cho request API; lỗi UI quên encode phải được giữ để kiểm thử.

#### Quy trình

**UI.** Mở `http://localhost:5173/`. Thấy loading trước khi có danh sách. Nhập từ khóa, bấm Tìm. Chuỗi rỗng: để ô trống rồi bấm Tìm.

**API.** `GET http://localhost:3000/api/products` với query của test. Dùng khi test có tham số không có ô trên trang chủ.

#### Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | KW-VEC-02, KW-VEC-04 | Seed | `search=iPhone` | UI | Chỉ `iPhone 15 Pro Max`, giá `30.000.000 ₫`. Ảnh có alt mô tả. Đúng một `h1`. Có loading. Chữ `iPhone` hiện dạng text. N = 1. |
| TC-02 | KW-VEC-01 | Seed | `search=iPhone 15 Pro Max` | UI | Chỉ đúng một sản phẩm `iPhone 15 Pro Max`. |
| TC-03 | KW-VEC-03 | Seed | `search=zzzz-khong-co` | UI | Có thông báo empty state. Không hiện lưới năm sản phẩm. N = 0. |
| TC-04 | KW-VEC-05 | Seed | `search=iphone` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-05 | KW-VEC-06 | Seed, tên `Bàn phím cơ Keychron Q1` còn trong DB | `search=CƠ` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-06 | KW-VEC-07 | Seed | `search=Bàn phím` | UI | Chỉ `Bàn phím cơ Keychron Q1`, giá `4.000.000 ₫`. |
| TC-07 | KW-VEC-08 | Seed | `search=Ban phim` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-08 | KW-VEC-09, LEN-01 | Seed | `search=""` | UI | Đủ 5 sản phẩm seed, mỗi giá đúng đơn vị `₫` và có phân cách hàng nghìn. |
| TC-09 | KW-VEC-10 | Seed | `search=<script>` | UI | Empty state. Trang hiện đúng các ký tự `<script>`, không chạy script. |
| TC-10 | LEN-02 | Seed | `search=a` (1 ký tự) | UI | Có `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2`. Không có `Bàn phím cơ Keychron Q1`. |
| TC-11 | LEN-03 | Seed | `search=aa` (2 ký tự) | UI | Empty state. Không tên seed nào chứa `aa`. |
| TC-12 | LEN-04 | Seed | `search=` chữ `a` lặp 254 lần | UI | Empty state. Không lỗi. |
| TC-13 | LEN-05 | Seed | `search=` chữ `a` lặp 255 lần | UI | Empty state. Không lỗi. |
| TC-14 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000000&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`, giống lúc không gửi giá. HTTP không phải lỗi. |
| TC-15 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=1&max_price=45000000` | API | Cùng tập TC-14. |
| TC-16 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=3999999&max_price=45000000` | API | Cùng tập TC-14. |
| TC-17 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000001&max_price=45000000` | API | Cùng tập TC-14. |
| TC-18 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000000&max_price=44999999` | API | Cùng tập TC-14. |
| TC-19 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000000&max_price=45000001` | API | Cùng tập TC-14. |
| TC-20 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=45000000&max_price=45000000` | API | Cùng tập TC-14. Hai đầu bằng nhau không làm rỗng kết quả. |
| TC-21 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=44999999&max_price=45000000` | API | Cùng tập TC-14. |
| TC-22 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&category=1` | API | Cùng tập TC-01. `category=1` không lọc mất iPhone và không thêm sản phẩm khác. |

#### Ký tự đặc biệt và kiểm tra độ bền (không mặc nhiên là input invalid)

Mỗi dòng chỉ một dữ liệu sai.

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-27 | KW-IEC-01 | Seed | `search=` 3 dấu cách | UI | Spec chưa chốt trim: chấp nhận đủ seed hoặc rỗng có empty state; không lỗi. |
| TC-28 | KW-IEC-02 | Seed | `search=%` | UI | Empty state. `%` không được làm trả về mọi sản phẩm. Không lỗi SQL. Ký tự `%` hiện dạng text. |
| TC-29 | KW-IEC-03 | Seed | `search=_` | UI | Empty state. `_` không được khớp một ký tự bất kỳ trong tên. Không lỗi SQL. |
| TC-30 | KW-IEC-04 | Seed | `search='` | UI | Empty state. Không trả trang lỗi SQL. Dấu `'` hiện dạng text. |
| TC-31 | LEN-06 | Seed | `search=` chữ `a` lặp 256 lần | UI | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. |
| TC-32 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=-1&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. `max_price` giữ mức chuẩn. |
| TC-33 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&max_price=-1` | API | Cùng tập TC-01. Không gửi `min_price`, để không thêm lỗi đảo khoảng. |
| TC-34 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=0&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-35 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&max_price=0` | API | Cùng tập TC-01. Không gửi `min_price`. |
| TC-36 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=abc&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-37 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000000&max_price=abc` | API | Cùng tập TC-01. Chỉ `max_price` sai kiểu. |
| TC-38 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=100@&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-39 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=4000000&max_price=100@` | API | Cùng tập TC-01. Chỉ `max_price` sai kiểu. |
| TC-40 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&min_price=45000001&max_price=45000000` | API | Cả hai giá đều dương. Chỉ quan hệ `min = max + 1` là sai. JSON vẫn chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-41 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&category=999` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-42 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&category=1&category=2` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-43 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&sort=price_asc` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-44 | EXTRA-QUERY (không phải miền chức năng) | Seed. N = 1 với từ khóa `iPhone` | `search=iPhone&page=0` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-45 | EXTRA-QUERY (không phải miền chức năng) | Seed | `search=iPhone&page=-1` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |

#### Phân loại coverage sau review

TC-01..13, TC-27..31: tìm kiếm và trạng thái dữ liệu. Trong đó các chuỗi dài 254/255/256 chỉ là kiểm tra độ bền.

TC-14..22, TC-32..45: 23 kiểm tra bổ sung query thừa; không tính là miền giá/danh mục/phân trang.

TC-23..26 và TC-46: loại khỏi bộ hiện hành vì FR-05 không có phân trang; không còn tính BLOCKED. Giữ nguyên khoảng trống mã để truy vết bằng chứng cũ.

#### Test bổ sung từ AI gap analysis

| TC ID | Miền | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-47 | URL-01 | Seed 5 sản phẩm | a&b | UI | Tìm cả chuỗi; không có kết quả, có empty state, từ khóa hiện text |
| TC-48 | URL-02 | Seed 5 sản phẩm | a#b | UI | Như TC-47, không cắt fragment |
| TC-49 | URL-03 | Seed 5 sản phẩm | a?b | UI | Như TC-47, giữ dấu ? trong từ khóa |

Ma trận miền chính: KW-VEC-01..10 → TC-02,01,03,01,04,05,06,07,08,09; KW-IEC-01..04 (mã lịch sử) → TC-27..30; LEN-01..06 → TC-08,10,11,12,13,31; URL-01..03 → TC-47..49.

#### Giao diện bổ sung

| TC ID | Miền | Precondition | Dữ liệu | Steps | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-50 | UI-GRID-DESKTOP | Seed, Chrome | Viewport 1280×844, search rỗng | UI | Đủ seed; nhiều thẻ trên cùng hàng; không tràn ngang; ảnh dùng cover/contain/scale-down để giữ tỷ lệ |
| TC-51 | UI-RESPONSIVE | Seed, Chrome | Viewport 390×844, search rỗng | UI | Đủ seed, không tràn ngang; cho phép một cột; ảnh giữ tỷ lệ |

Đây là kiểm tra layout/CSS bổ sung, không đặt tỷ lệ ảnh số học hoặc số cột cụ thể mà đặc tả chưa quy định. Chưa chứng minh mọi ảnh tải thành công hoặc mọi viewport đều đúng.

#### Số sản phẩm trong CSDL

Precondition đặt trực tiếp bảng `products`: giữ `N` dòng đầu của seed theo thứ tự id, chạy xong khôi phục đủ 5 dòng. Từ khóa để rỗng (mở trang chủ, bấm Tìm với ô trống).

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-52 | CAT-VEC-01, CAT-B-01, off/out point A.2 | `products` rỗng | `search=""` | UI | Không có thẻ sản phẩm. Có trang trống với icon/hình minh họa và message (FR-24). |
| TC-53 | CAT-B-02, on point A.2 | Chỉ còn `iPhone 15 Pro Max` | `search=""` | UI | Lưới đúng 1 sản phẩm `iPhone 15 Pro Max`, giá `30.000.000 ₫`. |
| TC-54 | CAT-B-03 | Còn `iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` | `search=""` | UI | Lưới đúng 2 sản phẩm đó. |

#### Tổng hợp

49 test hiện hành:

- 26 test chức năng FR-05: TC-01..13, TC-27..31, TC-47..54.
- 23 kiểm tra bổ sung query thừa: TC-14..22, TC-32..45. Không tính vào coverage chức năng và được tách riêng trong test summary.

Phủ on/off/in/out (bước 3, phần A): A.1 → TC-10 (on), TC-08 (off/out), TC-01 (in). A.2 → TC-53 (on), TC-52 (off/out), TC-08 (in). CAT-B-01..03 → TC-52..54.

## 3. FR-11 — Pool B

Toàn văn báo cáo domain testing và boundary value analysis của chức năng này.

### FR-11 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)** (trang hồ sơ Web, `frontend-web/src/pages/Profile.jsx`, route `/profile`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

#### Cách làm

1. Đọc FR-11 trong `README.md`, cùng FR-10 (năm trạng thái), FR-21 (tiền tệ, một `h1`) và SEC-02 (API cần JWT).
2. Đọc route `/profile` và khối "Lịch sử đơn hàng" để lấy mọi ô nhập và mọi query trên URL trang.
3. Đọc `GET /api/orders/my-orders` để lấy mọi query parameter mà API thực sự đọc.
4. Đọc bảng `orders` và seed trong `backend/database.js`.

Form Họ Tên, Số điện thoại, Địa chỉ giao hàng trên cùng trang thuộc FR-04. Nút Hủy đơn đổi trạng thái theo FR-10. Cả hai không phải input của FR-11. Mobile cũng gọi API này, nhưng lịch sử trên mobile thuộc FR-20.

#### 1. Biến đầu vào tường minh trên UI

Route là `/profile`. URL trang không có query parameter.

Khối lịch sử không có ô nhập, không có lọc, không có phân trang, không có sắp xếp. Danh sách được tải khi trang mở, nếu đã có token:

```14:20:frontend-web/src/pages/Profile.jsx
  const fetchOrders = () => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
```

Chưa đăng nhập thì trang chỉ hiện chữ "Vui lòng đăng nhập" và không gọi API.

Nút **Hủy đơn** gửi `PUT /api/orders/:id/cancel` với `id` của dòng đang hiện. Đó là thao tác FR-10, không phải một biến có miền giá trị của FR-11.

#### 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL trang `/profile` | không có | — |
| `GET /api/orders/my-orders` | không có query | Header `Authorization: Bearer <token>`, theo `api_specification.md` mục 4 |

Handler chỉ đọc `req.user.id` sau khi xác thực token. Không đọc `req.query`. Mọi key gắn thêm (`user_id`, `status`, `page`, ...) không được khai báo và không được dùng.

`GET /api/orders/:id` có tham số đường dẫn `id`, không yêu cầu token, và trang lịch sử không gọi endpoint này. FR-11 không mô tả màn chi tiết một đơn.

#### 3. Biến trạng thái dữ liệu

Các biến này không nằm trên form. Chúng quyết định dòng nào được trả và dòng đó hiện những gì.

Seed không chèn đơn hàng nào. Cả `admin@eshop.com` và `test@eshop.com` bắt đầu với 0 đơn. Đơn chỉ xuất hiện sau `POST /api/checkout`, lúc đó `status` được ghi `pending`.

| Biến | Có làm đổi tập kết quả không | Vì sao |
| --- | --- | --- |
| `orders.user_id` so với `id` trong JWT | Có | `WHERE user_id = ?` với `req.user.id`. Đơn của người khác không nằm trong tập |
| Số dòng `orders` của đúng user đó | Có | 0 dòng thì UI hiện "Bạn chưa có đơn hàng nào." Có dòng thì hiện bảng |
| `orders.status` | Không lọc tập | Mọi trạng thái của đơn mình đều được trả. Giá trị này đổi nhãn và màu trên từng dòng |
| `orders.id`, `created_at`, `total_amount` | Không lọc tập | Được hiện trên bảng. Spec bắt buộc hiện mã đơn, ngày đặt, tổng tiền |
| `orders.shipping_address` | Không | `SELECT *` trả cột này. Bảng lịch sử không hiện địa chỉ. FR-11 không yêu cầu hiện địa chỉ |
| Đơn bị ẩn / đã xóa | Không thể | Bảng `orders` không có cột ẩn hay xóa mềm |
| `users.role` trong token | Không đổi tập của FR-11 | Câu lệnh không lọc theo role. Xem mọi đơn của mọi user là FR-18, endpoint khác |

Năm giá trị `status` mà FR-10 định nghĩa: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.

#### 4. Bảng biến, kiểu, và ràng buộc

| Tên biến | Kiểu dữ liệu | Ràng buộc theo spec | Ràng buộc thực tế trong code |
| --- | --- | --- | --- |
| Phiên đăng nhập (điều kiện để mở lịch sử) | Có hoặc không có user | Người dùng chỉ xem được đơn của chính mình. SEC-02: API bảo mật cần JWT hợp lệ. | Không có `user` thì UI không gọi API, hiện "Vui lòng đăng nhập". Có token thì gửi header `Authorization`. |
| `Authorization` của `GET /api/orders/my-orders` | Chuỗi `Bearer <JWT>` | JWT hợp lệ. Payload phải xác định đúng người đang xem. | Thiếu token: HTTP 401 `Unauthorized`. Token không verify được: HTTP 403 `Forbidden`. Token hợp lệ là JWT ký bằng `SECRET_KEY`, payload `{ id, role }`. |
| Query của `GET /api/orders/my-orders` | Không có | Mục 4.4 không khai báo query. Tập trả về là đơn của chính người gọi. | Handler không đọc `req.query`. `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC`. Lỗi SQL không được trả `res.status`; callback vẫn `res.json(orders)`. |
| `orders.user_id` | Số nguyên | Chỉ đơn của người đang đăng nhập. | So sánh bằng `req.user.id`. Không có tham số client để đổi user. |
| `orders.id` | Số nguyên, tự tăng | Hiện mã đơn. | UI hiện `#{o.id}`. |
| `orders.created_at` | Ngày giờ | Hiện ngày đặt. | Cột `DATETIME DEFAULT CURRENT_TIMESTAMP`. UI gọi `new Date(o.created_at).toLocaleDateString()`, không nêu múi giờ. |
| `orders.total_amount` | Số nguyên | Hiện tổng tiền. FR-21: ký hiệu `₫`, có phân cách hàng nghìn. | Cột `INTEGER`. UI: `Number(o.total_amount \|\| 0).toLocaleString() + " ₫"`. `null` hiện `0 ₫`. |
| `orders.status` | Chuỗi, một trong năm trạng thái FR-10 | Hiện trạng thái hiện tại. Phải dịch sang tiếng Việt rõ ràng và phân biệt màu. | Nhãn: `pending` → Chờ xác nhận, `confirmed` → Đã xác nhận, `shipping` → Đang giao, `delivered` → Đã giao, `canceled` → Đã hủy. Màu: vàng, chàm, xanh dương, xanh lá, đỏ. Chuỗi khác năm giá trị này: nhãn là `status.toUpperCase()`, màu vàng (nhánh `default`). |
| Số đơn của user | Số nguyên ≥ 0 | Spec không mô tả trang trống. FR-24 yêu cầu empty state có icon và message thân thiện cho trang trống. | 0 đơn: một thẻ `<p>` "Bạn chưa có đơn hàng nào.", không icon. Có đơn: bảng đủ bốn cột Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, thêm cột Thao tác. |
| `orders.shipping_address` | `TEXT`, có thể rỗng | FR-11 không yêu cầu hiện trên lịch sử. | Có trong `SELECT *`. Không có ô nào của bảng lịch sử đọc cột này. |
| Cờ ẩn đơn | Không có kiểu | FR-11 không định nghĩa đơn ẩn. | Không có cột. Mọi đơn của user đều được trả. |

#### Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.

### FR-11 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-11/01-input-space-partitioning.md`.

#### Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả.

Các lớp trong cùng một đặc tính thì rời nhau. Một đơn có thể thuộc nhiều đặc tính (vừa là đơn của mình, vừa ở `pending`, vừa có tổng tiền dương). Bảng chia theo đặc tính.

Seed không có dòng `orders`. Hai tài khoản seed, theo thứ tự insert:

| id | email | mật khẩu | role |
| --- | --- | --- | --- |
| 1 | admin@eshop.com | Admin123! | admin |
| 2 | test@eshop.com | Test1234! | user |

Giá trị đại diện của đơn là dòng cần tạo cho test, không có sẵn trong seed. `POST /api/checkout` chỉ tạo được `status = pending`. Bốn trạng thái còn lại phải được ghi thẳng vào cột `status`.

`shipping_address` và cờ ẩn đơn không có lớp: bước 1 đã kết luận chúng không đổi tập lịch sử và FR-11 không yêu cầu hiện địa chỉ. `GET /api/orders/:id` không thuộc màn này. `role` không tách lớp: admin gọi `my-orders` vẫn là người xem đơn của chính mình. Xem mọi đơn là FR-18.

FR-11 không yêu cầu thứ tự sắp xếp, nên không lập lớp cho `ORDER BY`.

#### 1. Phiên trên UI

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| SES-VEC-01 | VEC | Đã đăng nhập | `test@eshop.com` | Người dùng xem lịch sử của chính mình |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở `/profile` khi không có phiên | FR-11 không mô tả khách xem lịch sử. SEC-02 yêu cầu JWT |

#### 2. Header `Authorization` của `GET /api/orders/my-orders`

Thiếu header và token không verify được là hai lớp: spec chỉ nói JWT hợp lệ, còn API trả 401 và 403 cho hai trường hợp đó. Token sai chữ ký, token hết hạn và chuỗi `not-a-jwt` cùng lớp vì đều không qua `jwt.verify`.

Token của admin cùng lớp với token của test user. Spec không cho `role` một kết quả FR-11 khác.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| AUTH-VEC-01 | VEC | JWT hợp lệ của người gọi | Token đăng nhập `test@eshop.com`, payload `id = 2` | SEC-02. FR-11 xác định người xem bằng token |
| AUTH-IEC-01 | IEC | Không có header | Request không gửi `Authorization` | Ngoài miền JWT hợp lệ |
| AUTH-IEC-02 | IEC | Token không verify được | `Authorization: Bearer not-a-jwt` | Ngoài miền JWT hợp lệ. Khác lớp thiếu header |

#### 3. Chủ đơn (`orders.user_id`)

Hai lớp đều hợp lệ. Spec vừa yêu cầu hiện đơn của mình, vừa yêu cầu không hiện đơn của người khác.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| OWN-VEC-01 | VEC | `user_id` trùng người gọi | Một đơn `user_id = 2`, người gọi là id 2 | "Chỉ xem được đơn hàng của chính mình" |
| OWN-VEC-02 | VEC | `user_id` khác người gọi | Một đơn `user_id = 1` tồn tại, người gọi là id 2 | Đơn đó không được xuất hiện trong lịch sử của id 2 |

#### 4. Số đơn của người gọi

Spec không tách một đơn và nhiều đơn. `0` là lớp riêng vì kết quả là trang trống, không phải bảng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CNT-VEC-01 | VEC | Không có đơn của mình | User id 2 có 0 đơn. Đây là trạng thái seed | Phải có empty state. FR-24: trang trống có icon và message thân thiện |
| CNT-VEC-02 | VEC | Có ít nhất một đơn của mình | User id 2 có 2 đơn | Hiện mã đơn, ngày đặt, tổng tiền, trạng thái của từng đơn |

#### 5. Trạng thái (`orders.status`)

Năm trạng thái FR-10 là năm lớp. Mỗi lớp cần một nhãn tiếng Việt riêng và một màu khác bốn lớp kia. README không chốt câu chữ của nhãn.

Chuỗi lạ và `NULL` cùng một lớp: cả hai không thuộc năm trạng thái. Đại diện lấy chuỗi `returned`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| ST-VEC-01 | VEC | `pending` | `pending` | FR-10. FR-11 hiện trạng thái hiện tại bằng tiếng Việt, có màu riêng |
| ST-VEC-02 | VEC | `confirmed` | `confirmed` | Cùng cơ sở. Khác `pending` |
| ST-VEC-03 | VEC | `shipping` | `shipping` | Cùng cơ sở. Khác hai lớp trên |
| ST-VEC-04 | VEC | `delivered` | `delivered` | Trạng thái kết thúc FR-10. Vẫn phải hiện trên lịch sử |
| ST-VEC-05 | VEC | `canceled` | `canceled` | Trạng thái kết thúc FR-10. Vẫn phải hiện trên lịch sử |
| ST-IEC-01 | IEC | Ngoài năm trạng thái | `returned` | FR-10 không có trạng thái này. `NULL` cùng lớp |

#### 6. Mã đơn, ngày đặt, tổng tiền

Đây là dữ liệu của dòng được hiện, không phải ô nhập.

`id` chỉ có lớp hợp lệ. FR-11 không nhận mã đơn làm điều kiện lọc của danh sách.

Ngày hợp lệ là một mốc thời gian đọc được. `NULL` là không có ngày.

Tổng tiền: FR-11 và FR-08 không cấm `0` hay số âm, nên không tách hai giá trị đó thành IEC. Đại diện `30000000` nằm trong lớp và buộc phải thấy dấu phân cách hàng nghìn. `NULL` là thiếu tổng tiền, khác số `0`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| ID-VEC-01 | VEC | Mã là số nguyên dương | id mà SQLite cấp, hiện kèm mã đó | Hiện mã đơn |
| DT-VEC-01 | VEC | Có ngày đặt | `2026-10-15 10:00:00` | Hiện ngày đặt |
| DT-IEC-01 | IEC | Không có ngày | `created_at` là `NULL` | Ngoài miền "có ngày đặt" |
| AMT-VEC-01 | VEC | Có tổng tiền dạng số nguyên | `30000000` | Hiện tổng tiền. FR-21: `₫` và phân cách hàng nghìn, ví dụ `30.000.000 ₫` |
| AMT-IEC-01 | IEC | Không có tổng tiền | `total_amount` là `NULL` | Ngoài miền "hiện tổng tiền" |

#### 7. Query không thuộc API

Mục 4.4 không khai báo query. Không có VEC. `user_id`, `status` và `page` cùng một lớp.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| Q-IEC-01 | IEC | Có thêm query | `?user_id=1` | FR-11 không cho chọn người khác bằng query. Mọi key khác cùng lớp |

#### Việc cố ý chưa làm ở bước này

Chưa ghép các lớp thành test case. Chưa chọn giá trị sát biên (0 đơn so với 1 đơn, tổng tiền `0` so với `1`). Đó là bước phân tích giá trị biên.

#### Phạm vi oracle cần xác nhận

TC-21/TC-22 chèn NULL trực tiếp vào DB là kiểm thử độ bền. README không quy định cách hiện NULL. Hai case không được tính là bug. BUG-12 và BUG-13 đã kết luận không vi phạm đặc tả.

### FR-11 — Chọn điểm on/off/in/out và Boundary Value Analysis, 3-value

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)**.

#### A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia (biên đóng `≥` thì off point nằm ngoài miền). In point và out point là giá trị điển hình trong và ngoài miền, không sát biên. Chỉ áp dụng cho biến có thứ tự. Phiên, JWT, chủ đơn (bằng/khác người gọi) và năm trạng thái là miền liệt kê, không có on/off.

##### A.1 Số đơn của người gọi — biên `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có bảng đơn (CNT-VEC-02) | TC-01 |
| Off | 0 | Empty state (CNT-VEC-01) | TC-02 |
| In | 2 | Có bảng đơn | TC-03 |
| Out | 0 | Empty state | TC-02 |

Số đơn không âm nên out point trùng off point. Không có Max nên in point lấy 2, giá trị nhỏ nhất bên trong miền khác on point.

##### A.2 Tổng tiền — biên định dạng `amount ≥ 1000` (bắt đầu có dấu phân cách hàng nghìn)

| Điểm | amount | Dạng phải hiện | Test case |
| --- | --- | --- | --- |
| On | 1000 | `1.000 ₫` | TC-16 |
| Off | 999 | `999 ₫` | TC-15 |
| In | 30000000 | `30.000.000 ₫` | TC-01 |
| Out | 1 | `1 ₫` | TC-14 |

##### A.3 Tổng tiền — biên `amount ≥ 1000000` (dấu phân cách thứ hai)

| Điểm | amount | Dạng phải hiện | Test case |
| --- | --- | --- | --- |
| On | 1000000 | `1.000.000 ₫` | TC-19 |
| Off | 999999 | `999.999 ₫` | TC-18 |
| In | 30000000 | `30.000.000 ₫` | TC-01 |
| Out | 1000 | `1.000 ₫` | TC-16 |

#### B. Boundary value analysis

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-11/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Người gọi ở các mốc dưới đây là user id 2 (`test@eshop.com`). Seed không có đơn. Mỗi mốc là số dòng cần tạo.

Phiên đăng nhập, JWT, năm trạng thái FR-10 và query thừa là miền liệt kê, không có `[Min, Max]`. Không gán số cho chúng. FR-11 không có phân trang, nên không đặt `Limit` và không lập biên `page`.

##### B.1 Số đơn của người gọi

Lớp có đơn bắt đầu tại `N = 1` (CNT-VEC-02). `N = 0` là lớp trang trống kế bên (CNT-VEC-01), không phải lỗi.

FR-11 không khai báo số đơn tối đa. Không bịa Max. Không có bộ `Max-1`, `Max`, `Max+1`.

| ID | Vị trí | N | So với miền N ≥ 1 |
| --- | --- | --- | --- |
| CNT-B-01 | Min-1 | 0 | Sát dưới Min. Lớp CNT-VEC-01, trang trống |
| CNT-B-02 | Min | 1 | Trên biên dưới. Đủ để hiện bảng một dòng |
| CNT-B-03 | Min+1 | 2 | Trong miền. Đúng giá trị đại diện CNT-VEC-02 |

##### B.2 Quan hệ sở hữu và mã đơn — kiểm tra bổ sung

ID là định danh, không phải đại lượng liên tục. Người gọi id 2 và chủ đơn id 1/2/3 kiểm tra hai lớp bằng/khác, không phải Min-1/Min/Min+1. Mã OWN-B-01..03 cũ chỉ giữ để truy vết TC-04, TC-01, TC-05.

FR-11 không quy định biên mã đơn. ID-B-01..03 (0,1,2; TC-06, TC-01, TC-07) là kiểm tra hiển thị dữ liệu fixture, không khẳng định id 0 là mã đơn hợp lệ trong nghiệp vụ.

##### B.3 Tổng tiền

`0` và số âm vẫn thuộc AMT-VEC-01. Ba giá trị quanh `0` là các điểm trong cùng một lớp, không phải IEC.

Mốc phân cách lấy từ FR-21: định dạng hàng nghìn. Ngưỡng đầu tiên của dấu phân cách là `1000`. Ngưỡng nhóm tiếp theo là `1000000`. Không có trần số tiền, nên không có `Max+1` của một Max spec.

`NULL` không phải `0 - 1`. Đó là AMT-IEC-01, đã chốt ở bước 2.

Chuỗi tiền dưới đây là dạng `vi-VN` kèm `₫`.

###### B.3.1 Mốc 0

| ID | Vị trí | total_amount | Dạng phải hiện | Lớp |
| --- | --- | --- | --- | --- |
| AMT-B-01 | Dưới mốc | -1 | `-1 ₫` | AMT-VEC-01 |
| AMT-B-02 | Đúng mốc | 0 | `0 ₫` | AMT-VEC-01 |
| AMT-B-03 | Trên mốc | 1 | `1 ₫` | AMT-VEC-01 |

###### B.3.2 Mốc 1 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-04 | Min-1 | 999 | `999 ₫` |
| AMT-B-05 | Min | 1000 | `1.000 ₫` |
| AMT-B-06 | Min+1 | 1001 | `1.001 ₫` |

###### B.3.3 Mốc 1 000 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-07 | Min-1 | 999999 | `999.999 ₫` |
| AMT-B-08 | Min | 1000000 | `1.000.000 ₫` |
| AMT-B-09 | Min+1 | 1000001 | `1.000.001 ₫` |

##### B.4 Ngày đặt

FR-11 không có khoảng đóng cho ngày. Không lấy năm nhỏ nhất hay năm lớn nhất. Trường hợp thiếu dữ liệu (không phải điểm liền kề theo thứ tự ngày) là `created_at = NULL` (DT-IEC-01).

#### Việc cố ý chưa làm ở bước này

Chưa ghép các mốc thành test case.

### FR-11 — Test cases

Nguồn: miền ở `docs/fr-11/02-equivalence-partitioning.md` và biên ở `docs/fr-11/03-boundary-value-analysis.md`.

#### Oracle

Expected result bám README, không bám code.

- Người xem chỉ thấy đơn có `user_id` trùng mình.
- Mỗi đơn hiện mã, ngày đặt, tổng tiền, trạng thái hiện tại.
- Trạng thái thuộc FR-10 thì nhãn là tiếng Việt, không phải mã tiếng Anh, và màu khác bốn trạng thái kia. README không chốt câu chữ.
- Tổng tiền dùng `₫` và phân cách hàng nghìn (FR-21).
- Không có đơn của mình: empty state có icon và message thân thiện (FR-24).
- Chưa đăng nhập hoặc JWT không hợp lệ: không nhận được danh sách đơn (SEC-02).
- `user_id` trên query không thuộc FR-11. Gửi nó không được đổi tập đơn so với cùng người gọi khi không gửi, và không được trả lỗi.
- `NULL` không phải số `0` và không phải một ngày. Ô tương ứng không được bịa `0 ₫` hoặc một ngày. Trang không đổ lỗi.

#### Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn là một đơn của user id 2:

| Trường | Mức chuẩn |
| --- | --- |
| Người gọi | `test@eshop.com` / `Test1234!`, id 2 |
| `id` | 1 |
| `user_id` | 2 |
| `status` | `pending` |
| `created_at` | `2026-10-15 10:00:00` |
| `total_amount` | 30000000 |

Mỗi lớp hoặc biên hợp lệ khác được phủ bằng một test, chỉ đổi yếu tố đó. `N = 1` là CNT-B-02, nằm trong CNT-VEC-02. `N = 2` mới là CNT-B-03.

**Không hợp lệ — một lỗi một test.** Chỉ một dữ liệu sai. Trường còn lại ở mức chuẩn.

Seed không có đơn. Dòng trong bảng là dữ liệu phải tạo trước khi mở lịch sử. `id` ghi trong bảng là id chèn tường minh.

#### Quy trình

**UI.** Tạo dòng `orders` của test. Đăng nhập `test@eshop.com`. Mở `http://localhost:5173/profile`. TC-24 không đăng nhập.

**API.** `GET http://localhost:3000/api/orders/my-orders`. Dùng khi test đụng header hoặc query mà trang không có ô nhập.

#### Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | SES-VEC-01, AUTH-VEC-01, OWN-VEC-01, OWN-B-02, CNT-B-02, ST-VEC-01, ID-VEC-01, ID-B-02, DT-VEC-01, AMT-VEC-01 | User id 2 | Một đơn mức chuẩn | UI | Đúng một đơn. Mã `1`. Ngày là 15/10/2026. Tiền `30.000.000 ₫`. Nhãn `pending` là tiếng Việt, có màu. Trang một `h1`. |
| TC-02 | CNT-VEC-01, CNT-B-01 | User id 2 có 0 đơn | Không có dòng `orders` | UI | Empty state có icon và message thân thiện. Không có bảng đơn. |
| TC-03 | CNT-B-03 | User id 2 | Hai đơn mức chuẩn, `id` 1 và 2 | UI | Đúng hai dòng. Cả hai mã, ngày 15/10/2026, tiền `30.000.000 ₫`, nhãn tiếng Việt của `pending`. |
| TC-04 | OWN-VEC-02, OWN-B-01 | User id 2 | Đơn chuẩn `id=1` và một đơn `id=2`, `user_id=1`, trường khác chuẩn | UI | Chỉ thấy đơn `id=1`. Đơn của admin không xuất hiện. |
| TC-05 | OWN-B-03 | User id 2 | Đơn chuẩn `id=1` và một đơn `id=2`, `user_id=3`, trường khác chuẩn | UI | Chỉ thấy đơn `id=1`. Đơn `user_id=3` không xuất hiện. |
| TC-06 | ID-B-01 | User id 2 | Một đơn chuẩn nhưng `id=0` | UI | Thấy mã `0`, ngày 15/10/2026, tiền `30.000.000 ₫`. |
| TC-07 | ID-B-03 | User id 2 | Một đơn chuẩn nhưng `id=2` | UI | Thấy đúng một đơn, mã `2`. |
| TC-08 | ST-VEC-02 | User id 2 | Một đơn chuẩn nhưng `status=confirmed` | UI | Nhãn tiếng Việt của `confirmed`, màu khác `pending`, `shipping`, `delivered`, `canceled`. Vẫn hiện mã, ngày, tiền chuẩn. |
| TC-09 | ST-VEC-03 | User id 2 | Một đơn chuẩn nhưng `status=shipping` | UI | Nhãn tiếng Việt của `shipping`, màu khác bốn trạng thái kia. |
| TC-10 | ST-VEC-04 | User id 2 | Một đơn chuẩn nhưng `status=delivered` | UI | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của `delivered`, màu khác bốn trạng thái kia. |
| TC-11 | ST-VEC-05 | User id 2 | Một đơn chuẩn nhưng `status=canceled` | UI | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của `canceled`, màu khác bốn trạng thái kia. |
| TC-12 | AMT-B-01 | User id 2 | Một đơn chuẩn nhưng `total_amount=-1` | UI | Tiền hiện `-1 ₫`. |
| TC-13 | AMT-B-02 | User id 2 | Một đơn chuẩn nhưng `total_amount=0` | UI | Tiền hiện `0 ₫`. |
| TC-14 | AMT-B-03 | User id 2 | Một đơn chuẩn nhưng `total_amount=1` | UI | Tiền hiện `1 ₫`. |
| TC-15 | AMT-B-04 | User id 2 | Một đơn chuẩn nhưng `total_amount=999` | UI | Tiền hiện `999 ₫`. |
| TC-16 | AMT-B-05 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000` | UI | Tiền hiện `1.000 ₫`. |
| TC-17 | AMT-B-06 | User id 2 | Một đơn chuẩn nhưng `total_amount=1001` | UI | Tiền hiện `1.001 ₫`. |
| TC-18 | AMT-B-07 | User id 2 | Một đơn chuẩn nhưng `total_amount=999999` | UI | Tiền hiện `999.999 ₫`. |
| TC-19 | AMT-B-08 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000000` | UI | Tiền hiện `1.000.000 ₫`. |
| TC-20 | AMT-B-09 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000001` | UI | Tiền hiện `1.000.001 ₫`. |

#### Test case không hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-21 | DT-IEC-01 | User id 2 | Một đơn chuẩn nhưng `created_at` là `NULL` | UI | Đơn vẫn hiện mã, tiền `30.000.000 ₫`, nhãn `pending`. Ô ngày không bịa một ngày. Trang không lỗi. |
| TC-22 | AMT-IEC-01 | User id 2 | Một đơn chuẩn nhưng `total_amount` là `NULL` | UI | Đơn vẫn hiện mã, ngày 15/10/2026, nhãn `pending`. Ô tiền không hiện `0 ₫`. Trang không lỗi. |
| TC-23 | ST-IEC-01 | User id 2 | Một đơn chuẩn nhưng `status=returned` | UI | Đơn vẫn hiện mã, ngày, tiền chuẩn. Nhãn không phải nhãn của năm trạng thái FR-10. Trang không lỗi. |
| TC-24 | SES-IEC-01 | Đơn chuẩn của user id 2 đang có. Chưa đăng nhập | Mở `/profile` | UI | Không thấy mã `1` và không thấy `30.000.000 ₫`. |
| TC-25 | AUTH-IEC-01 | Đơn chuẩn của user id 2 đang có | `GET /api/orders/my-orders` không có header `Authorization` | API | Bị từ chối. Thân response không phải danh sách chứa đơn `id=1`. |
| TC-26 | AUTH-IEC-02 | Đơn chuẩn của user id 2 đang có | Header `Authorization: Bearer not-a-jwt` | API | Bị từ chối. Thân response không phải danh sách chứa đơn `id=1`. |
| TC-27 | Q-IEC-01 | Đơn chuẩn của user id 2 đang có | Token hợp lệ của id 2. Query `user_id=1` | API | HTTP không phải lỗi. JSON chỉ có đơn `id=1` của user 2, giống lúc không gửi query. |

#### Kiểm tra giao diện bổ sung từ AI gap analysis

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-28 | UI-TAB (GAP-11-02, FR-21) | User id 2 đăng nhập | Hai đơn chuẩn `id` 1 và 2 (có nút Hủy đơn để nhận focus) | UI: mở `/profile`, nhấn Tab liên tục từ đầu trang | Mỗi phần tử nhận focus tiếp theo không nằm phía trên phần tử trước; cùng hàng thì nằm bên phải. Oracle đọc FR-21 theo thứ tự dòng (row-major). |

FR-21 chốt thứ tự từ trên xuống dưới, trái sang phải. Focus nhảy lên phía trên là lệch đặc tả, ghi ở BUG-24.

#### Phủ

| Mã | Test |
| --- | --- |
| SES-VEC-01, AUTH-VEC-01, OWN-VEC-01, OWN-B-02, CNT-B-02, ST-VEC-01, ID-VEC-01, ID-B-02, DT-VEC-01, AMT-VEC-01 | TC-01 |
| CNT-VEC-01, CNT-B-01 | TC-02 |
| CNT-VEC-02 | TC-01 |
| CNT-B-03 | TC-03 |
| OWN-VEC-02, OWN-B-01 | TC-04 |
| OWN-B-03 | TC-05 |
| ID-B-01 | TC-06 |
| ID-B-03 | TC-07 |
| ST-VEC-02 | TC-08 |
| ST-VEC-03 | TC-09 |
| ST-VEC-04 | TC-10 |
| ST-VEC-05 | TC-11 |
| AMT-B-01 … AMT-B-09 | TC-12 … TC-20 |
| DT-IEC-01 | TC-21 |
| AMT-IEC-01 | TC-22 |
| ST-IEC-01 | TC-23 |
| SES-IEC-01 | TC-24 |
| AUTH-IEC-01 | TC-25 |
| AUTH-IEC-02 | TC-26 |
| Q-IEC-01 | TC-27 |

Phủ điểm on/off/in/out (bước 3, phần A):

| Biên | On | Off | In | Out |
| --- | --- | --- | --- | --- |
| A.1 `N ≥ 1` | TC-01 | TC-02 | TC-03 | TC-02 |
| A.2 `amount ≥ 1000` | TC-16 | TC-15 | TC-01 | TC-14 |
| A.3 `amount ≥ 1000000` | TC-19 | TC-18 | TC-01 | TC-16 |

#### Phạm vi oracle cần xác nhận

TC-21/TC-22 chèn NULL trực tiếp vào DB là kiểm thử độ bền. README không quy định cách hiện NULL. Hai case không được tính là bug. BUG-12 và BUG-13 đã kết luận không vi phạm đặc tả.

## 4. FR-16 — Pool C

Toàn văn báo cáo domain testing và boundary value analysis của chức năng này.

### FR-16 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-16 Import sản phẩm từ CSV** (trang Admin, tab Sản phẩm, `frontend-admin/src/App.jsx`, `http://localhost:5174`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

#### Cách làm

1. Đọc FR-16 trong `README.md`, cùng FR-12 (API admin cần JWT và `role = admin`), FR-15 (ràng buộc tên và giá khi quản lý sản phẩm) và SEC-02, SEC-03.
2. Đọc khối "Import sản phẩm từ CSV" trên tab Sản phẩm. Trang admin không có route con và không có query trên URL.
3. Đọc `POST /api/admin/import-products`. Handler không đọc query.
4. Đọc bảng `products` và `categories` trong `backend/database.js`.

Form Thêm/Sửa sản phẩm trên cùng tab thuộc FR-15, không phải input của FR-16.

#### 1. Biến đầu vào tường minh trên UI

Ô nhập của FR-16 là một `input type="file"` ở dòng 356 của `frontend-admin/src/App.jsx`. Không có `accept`. Khi chọn file, UI gọi `FileReader.readAsText` ngay, không đợi bấm Import.

Nút **Import** gửi mảng đã tách từ file. Nút tắt khi chưa có dòng xem trước hoặc khi đang gửi. Nút không phải một biến có miền riêng.

Link "Tải file mẫu" chỉ tải một file mẫu, không gửi dữ liệu lên server.

Chưa đăng nhập thì không thấy tab Sản phẩm. Đăng nhập xong, UI chỉ giữ token nếu `role` là `admin`.

#### 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL trang admin | không có | — |
| `POST /api/admin/import-products` | không có query | Header `Authorization: Bearer <token>`. Body JSON `{ "products": [ ... ] }`, theo `api_specification.md` mục 6.3 |

Handler chỉ đọc `req.body.products` và `req.user` sau khi xác thực token. Không đọc `req.query`. Không kiểm tra `role`.

File CSV không được gửi nguyên. Trình duyệt tách file thành mảng object rồi POST JSON.

#### 3. Biến trạng thái dữ liệu

| Biến | Có làm đổi kết quả import không | Vì sao |
| --- | --- | --- |
| Số dòng đang có trong `products` | Không chặn dòng mới | Không có ràng buộc tên duy nhất. Import chỉ `INSERT` |
| `categories.id` | Không được dùng để chấp nhận hay từ chối | Không có khóa ngoại. `category_id` lạ vẫn được ghi |
| Sản phẩm ẩn / tồn kho | Không thể | Bảng `products` không có cột ẩn hay tồn kho |
| `role` trong JWT | Không, ở API | Handler không đọc `req.user.role`. UI thì chặn đăng nhập nếu không phải admin |

Seed danh mục: `1` Điện thoại, `2` Laptop, `3` Phụ kiện. Seed sản phẩm có 5 dòng. Import thêm dòng, không sửa 5 dòng đó.

#### 4. Bảng biến, kiểu, và ràng buộc

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

#### Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.

### FR-16 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-16 Import sản phẩm từ CSV**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-16/01-input-space-partitioning.md`.

#### Cách chia VEC và IEC

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

#### 1. Phiên trên UI

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| SES-VEC-01 | VEC | Admin đã đăng nhập | `admin@eshop.com` trên `http://localhost:5174`, tab Sản phẩm | Chỉ admin import được |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở admin khi không có phiên | FR-16 không mô tả khách import |

#### 2. Header `Authorization` và role

Thiếu header và token không verify được là hai lớp. Token của user thường là lớp thứ ba: JWT hợp lệ nhưng FR-12 bắt `role = admin`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| AUTH-VEC-01 | VEC | JWT của admin | Token đăng nhập `admin@eshop.com` | FR-12. SEC-02 và SEC-03 |
| AUTH-IEC-01 | IEC | Không có header | POST không gửi `Authorization` | Ngoài miền JWT hợp lệ |
| AUTH-IEC-02 | IEC | Token không verify được | `Authorization: Bearer not-a-jwt` | Ngoài miền JWT hợp lệ. Khác lớp thiếu header |
| ROLE-IEC-01 | IEC | JWT hợp lệ, role không phải admin | Token của `test@eshop.com` | FR-12. Khác hai lớp trên vì token vẫn verify được |

#### 3. Đuôi file

`.CSV` cùng lớp với đuôi khác `.csv`. Spec chỉ viết `.csv`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| EXT-VEC-01 | VEC | Đuôi `.csv` | `hang.csv`, nội dung là dòng chuẩn | Đuôi file phải là `.csv` |
| EXT-IEC-01 | IEC | Đuôi khác `.csv` | `hang.txt`, cùng nội dung dòng chuẩn | Ngoài miền file CSV |

#### 4. Header và RFC 4180

Header thiếu cột, đảo cột, hoặc dùng tên khác (`ten`, `gia`) cùng một lớp: dòng đầu không phải `name,price,description,imageUrl,category_id`.

Dấu phẩy trong trường là đặc tính riêng. Có nháy kép là cách spec bắt hệ thống đọc đúng. Không có nháy kép là file không theo RFC 4180.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| HDR-VEC-01 | VEC | Đúng header spec | `name,price,description,imageUrl,category_id` | Dòng đầu tiên là header này |
| HDR-IEC-01 | IEC | Header khác chuỗi spec | `ten,gia,mo_ta,image,danh_muc` | Ngoài header đã cho |
| CSV-VEC-01 | VEC | Dấu phẩy nằm trong nháy kép | `description` là `"Mo ta, co phay"` | RFC 4180. Trường có dấu phẩy phải được bọc trong nháy kép |
| CSV-IEC-01 | IEC | Dấu phẩy không nằm trong nháy kép | `description` là `Mo ta, co phay` | Ngoài RFC 4180. Khác lớp có nháy kép |

#### 5. Tên và giá

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

#### 6. Mô tả, ảnh, danh mục

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| DESC-VEC-01 | VEC | Mọi chuỗi mô tả, kể cả rỗng | `Mo ta san pham` | Có trong header. FR-16 không cấm rỗng |
| IMG-VEC-01 | VEC | Mọi chuỗi ảnh, kể cả rỗng | `https://placehold.co/300` | Có trong header. FR-16 không cấm rỗng |
| CAT-VEC-01 | VEC | Mọi giá trị `category_id` | `1` | Có trong header. Spec không bắt id phải tồn tại |

#### 7. Số dòng và rollback

Một dòng dữ liệu hợp lệ cùng lớp với nhiều dòng hợp lệ. Đại diện lấy hai dòng để đúng chữ "nhiều sản phẩm".

File có một dòng lỗi là lớp riêng: spec không xử lý nó như import một phần. Dòng lỗi trong đại diện là tên rỗng, tức NM-IEC-01 đặt ở dòng 2. Lớp này phủ quy tắc rollback, không thay lớp tên rỗng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| N-VEC-01 | VEC | Có ít nhất một dòng hợp lệ | Hai dòng chuẩn, tên `SP Import A` và `SP Import B` | Import nhiều sản phẩm |
| N-IEC-01 | IEC | Không có dòng dữ liệu | Chỉ có dòng header | Không có sản phẩm để import |
| ATOM-VEC-01 | VEC | Mọi dòng đều hợp lệ | Cùng hai dòng của N-VEC-01 | Cả file được thêm. Sản phẩm sẵn có không bị sửa |
| ATOM-IEC-01 | IEC | Có ít nhất một dòng lỗi | Dòng 1 chuẩn. Dòng 2 có `name` rỗng, giá `100000` | Một dòng lỗi thì rollback toàn bộ. Báo số dòng lỗi và lý do |

#### 8. Query không thuộc API

Mục 6.3 không khai báo query. Không có VEC.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| Q-IEC-01 | IEC | Có thêm query | `?foo=1` | FR-16 không đọc query. Mọi key khác cùng lớp |

#### Việc cố ý chưa làm ở bước này

Chưa ghép các lớp thành test case. Chưa chọn giá trị sát biên (giá `1` so với `0`, tên dài 255 so với 256, một dòng so với hai dòng). Đó là bước phân tích giá trị biên.

#### Phân hoạch bổ sung sau review

CSV-VEC-02: nháy kép escape (TC-25); CSV-VEC-03: newline trong trường nháy kép (TC-26); CSV-VEC-04: kết thúc dòng CRLF (TC-27). Giá dương có phần thập phân là PR-VEC-02 (TC-29), vẫn hợp lệ theo điều kiện > 0. TC-30/31 lấy mẫu sát 0 với bước 0.01; không gọi 0.01 là số dương nhỏ nhất. Tên chỉ dấu cách tách thành NM-SPACE (TC-28), expected là giả định cần xác nhận. BOM và dấu phân cách địa phương nằm trong danh sách cần làm rõ yêu cầu.

### FR-16 — Chọn điểm on/off/in/out và Boundary Value Analysis, 3-value

Chức năng: **FR-16 Import sản phẩm từ CSV**.

#### A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia: biên đóng (`≥`) thì off point nằm ngoài miền, biên mở (`>`) thì off point nằm trong miền. In point và out point là giá trị điển hình trong và ngoài miền. Phiên, JWT, role, đuôi file, header và cú pháp CSV là miền liệt kê, không có on/off.

##### A.1 Độ dài tên — biên đóng `len(name) ≥ 1`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (1) | Hợp lệ | TC-04 |
| Off | `""` (0) | Không hợp lệ | TC-16 |
| In | `SP Import` (9) | Hợp lệ | TC-01 |
| Out | `""` (0) | Không hợp lệ | TC-16 |

Độ dài không âm nên out point trùng off point.

##### A.2 Giá — biên mở `price > 0`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `0` | Không hợp lệ (biên mở) | TC-18 |
| Off | `0.01` | Hợp lệ, gần 0 nhất theo bước lấy mẫu 0.01 | TC-30 |
| In | `100000` | Hợp lệ | TC-01 |
| Out | `-1` | Không hợp lệ | TC-17 |

Miền số thực không có số dương nhỏ nhất. Bước 0.01 là bước lấy mẫu được công bố (đơn vị tiền nhỏ nhất thường gặp), không phải giới hạn của spec. `-0.01` (TC-31) là điểm ngoài sát biên bổ sung.

##### A.3 Số dòng dữ liệu — biên đóng `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có sản phẩm để import | TC-01 |
| Off | 0 (chỉ header) | Không có sản phẩm | TC-22 |
| In | 2 | Có sản phẩm để import | TC-02 |
| Out | 0 | Không có sản phẩm | TC-22 |

#### B. Boundary value analysis

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-16/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Mỗi mốc dưới đây là một file `hang.csv`, header đúng, các cột còn lại ở dòng chuẩn của bước 2. Chỉ cột đang xét đổi.

Phiên đăng nhập, JWT, đuôi file, header, dấu phẩy trong nháy kép, mô tả, ảnh và `category_id` là miền liệt kê. Không có `[Min, Max]`. Không gán số cho chúng.

##### B.1 Độ dài tên

Tên không rỗng có biên dưới `Min = 1` ký tự. Chuỗi dài 0 là lớp NM-IEC-01, không phải một tên hợp lệ.

FR-16 không chốt MaxLength. Không mặc nhiên áp giới hạn 255 của FR-15 cho import. NM-B-01..03 là biên dưới 0/1/2 ký tự. NM-B-04..06 (254/255/256) là thăm dò tính nhất quán giữa hai đường tạo sản phẩm. TC-21 được rút khỏi bộ chấm PASS/FAIL hiện hành. Tên 256 ký tự không bị coi là lỗi của FR-16. BUG-19 đã kết luận không vi phạm đặc tả.

##### B.2 Giá

Miền hợp lệ là số dương. Không có giá tối đa trong FR-16, nên không có `Max-1`, `Max`, `Max+1`.

Giá là số dương, không bắt buộc số nguyên. 0 là biên mở; không tồn tại số dương nhỏ nhất. Bộ -1/0/1 là mẫu với bước 1, bổ sung -0.01/0.01 (TC-31/TC-30) và 1.5 (TC-29) để tránh ngầm ép kiểu nguyên:

| ID | Vị trí | price | Lớp bước 2 |
| --- | --- | --- | --- |
| PR-B-01 | Dưới mốc | -1 | PR-IEC-01, số âm |
| PR-B-02 | Đúng mốc | 0 | PR-IEC-02, bằng 0 |
| PR-B-03 | Trên mốc | 1 | PR-VEC-01, điểm lấy mẫu dương |

##### B.3 Số dòng dữ liệu

Lớp có sản phẩm để import bắt đầu tại `N = 1`. `N = 0` là file chỉ có header (N-IEC-01).

FR-16 không khai báo số dòng tối đa. Không bịa Max.

| ID | Vị trí | N | So với miền N ≥ 1 |
| --- | --- | --- | --- |
| N-B-01 | Min-1 | 0 | Sát dưới Min. Chỉ header |
| N-B-02 | Min | 1 | Trên biên dưới. Một dòng chuẩn |
| N-B-03 | Min+1 | 2 | Trong miền. Đúng đại diện N-VEC-01: `SP Import A` và `SP Import B` |

`N = 2` với dòng 2 có tên rỗng vẫn là ATOM-IEC-01 của bước 2, không phải một biên số mới.

#### Việc cố ý chưa làm ở bước này

Chưa ghép các mốc thành test case.

### FR-16 — Test cases

Nguồn: miền ở `docs/fr-16/02-equivalence-partitioning.md` và biên ở `docs/fr-16/03-boundary-value-analysis.md`.

#### Oracle

Expected result bám README, không bám code.

- Chỉ admin import được. API admin cần JWT hợp lệ và `role = admin`.
- File phải có đuôi `.csv`. Dòng đầu phải là `name,price,description,imageUrl,category_id`.
- Trường có dấu phẩy phải nằm trong nháy kép và được đọc thành một trường.
- `name` không rỗng. `price` là số dương, có thể có phần thập phân. Giới hạn 255 của FR-15 chưa xác nhận áp dụng cho FR-16.
- Mọi dòng hợp lệ thì được thêm. Một dòng lỗi thì rollback cả file: không thêm dòng nào của file đó. Năm sản phẩm seed giữ nguyên.
- Báo cáo ghi số dòng thành công, số dòng lỗi và lý do.
- Query không thuộc API. Gửi thêm query không được đổi kết quả so với cùng body khi không gửi, và không được trả lỗi.

#### Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn là file `hang.csv`:

```csv
name,price,description,imageUrl,category_id
SP Import,100000,Mo ta san pham,https://placehold.co/300,1
```

Người gọi chuẩn là `admin@eshop.com` / `Admin123!`. Mỗi lớp hoặc biên hợp lệ khác được phủ bằng một test, chỉ đổi yếu tố đó. `N = 1` là N-B-02. `N = 2` mới là N-B-03.

**Không hợp lệ — một lỗi một test.** Chỉ một dữ liệu sai. Phần còn lại ở mức chuẩn. Giá âm lấy `-1` vì đó là biên PR-B-01, không thêm test `-100`.

Seed trước mỗi test, chưa có dòng import trước đó:

| Tên | Giá | category_id |
| --- | --- | --- |
| iPhone 15 Pro Max | 30000000 | 1 |
| Samsung Galaxy S24 Ultra | 28000000 | 1 |
| MacBook Pro M3 | 45000000 | 2 |
| Tai nghe AirPods Pro 2 | 6000000 | 3 |
| Bàn phím cơ Keychron Q1 | 4000000 | 3 |

Nội dung file dưới đây là nội dung logic. Test UI chọn đúng file đó, không gửi JSON đã tách sẵn.

#### Quy trình

**UI.** Đăng nhập admin tại `http://localhost:5174`. Mở tab Sản phẩm. Chọn file. Bấm Import. TC-09 không đăng nhập.

**API.** `POST http://localhost:3000/api/admin/import-products` với body `{ "products": [ ... ] }`. Dùng khi test đụng header hoặc query mà ô file không thể hiện.

#### Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | SES-VEC-01, AUTH-VEC-01, EXT-VEC-01, HDR-VEC-01, NM-VEC-01, PR-VEC-01, DESC-VEC-01, IMG-VEC-01, CAT-VEC-01, N-B-02 | Seed 5 sản phẩm | `hang.csv` mức chuẩn | UI | Thêm đúng `SP Import`, giá 100000, mô tả `Mo ta san pham`, ảnh URL chuẩn, `category_id` 1. Năm sản phẩm seed còn nguyên. Báo 1 dòng thành công, 0 dòng lỗi. |
| TC-02 | N-VEC-01, N-B-03, ATOM-VEC-01 | Seed | `hang.csv` hai dòng chuẩn, tên `SP Import A` và `SP Import B` | UI | Thêm đúng hai sản phẩm đó. Seed còn nguyên. Báo 2 dòng thành công, 0 dòng lỗi. |
| TC-03 | CSV-VEC-01 | Seed | Dòng chuẩn, `description` là `"Mo ta, co phay"` | UI | Thêm một sản phẩm. Mô tả đúng `Mo ta, co phay`, không bị tách thành cột khác. Báo 1 thành công, 0 lỗi. |
| TC-04 | NM-B-02 | Seed | Dòng chuẩn, `name` là `a` | UI | Thêm một sản phẩm tên `a`. Seed còn nguyên. |
| TC-05 | NM-B-03 | Seed | Dòng chuẩn, `name` là `aa` | UI | Thêm một sản phẩm tên `aa`. |
| TC-06 | NM-B-04 | Seed | Dòng chuẩn, `name` là `a` lặp 254 lần | UI | Thêm một sản phẩm, tên dài 254 ký tự. |
| TC-07 | NM-B-05 | Seed | Dòng chuẩn, `name` là `a` lặp 255 lần | UI | Thêm một sản phẩm, tên dài 255 ký tự. |
| TC-08 | PR-B-03 | Seed | Dòng chuẩn, `price` là `1` | UI | Thêm một sản phẩm giá 1. Seed còn nguyên. |

#### Test case không hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-09 | SES-IEC-01 | Seed. Chưa đăng nhập | File mức chuẩn | UI | Không thêm sản phẩm. Seed còn 5 dòng. |
| TC-10 | AUTH-IEC-01 | Seed | Body một sản phẩm chuẩn. Không có header `Authorization` | API | Bị từ chối. Không thêm `SP Import`. |
| TC-11 | AUTH-IEC-02 | Seed | Body chuẩn. Header `Authorization: Bearer not-a-jwt` | API | Bị từ chối. Không thêm `SP Import`. |
| TC-12 | ROLE-IEC-01 | Seed | Body chuẩn. Token của `test@eshop.com` | API | Bị từ chối vì không phải admin. Không thêm `SP Import`. |
| TC-13 | EXT-IEC-01 | Seed | Cùng nội dung mức chuẩn, tên file `hang.txt` | UI | Từ chối vì đuôi không phải `.csv`. Không thêm sản phẩm. |
| TC-14 | HDR-IEC-01 | Seed | Header `ten,gia,mo_ta,image,danh_muc`, một dòng giá trị chuẩn | UI | Từ chối vì header sai. Không thêm sản phẩm. |
| TC-15 | CSV-IEC-01 | Seed | Dòng chuẩn, `description` là `Mo ta, co phay` không có nháy kép | UI | Không thêm sản phẩm với mô tả bị cắt ở dấu phẩy. Seed còn nguyên. Có báo lỗi. |
| TC-16 | NM-IEC-01, NM-B-01 | Seed | Một dòng, `name` rỗng, các cột khác chuẩn | UI | Không thêm sản phẩm. Báo lỗi tên. Seed còn nguyên. |
| TC-17 | PR-IEC-01, PR-B-01 | Seed | Một dòng chuẩn, `price` là `-1` | UI | Không thêm sản phẩm. Báo lỗi giá. Seed còn nguyên. |
| TC-18 | PR-IEC-02, PR-B-02 | Seed | Một dòng chuẩn, `price` là `0` | UI | Không thêm sản phẩm. Báo lỗi giá. Seed còn nguyên. |
| TC-19 | PR-IEC-03 | Seed | Một dòng chuẩn, `price` là `abc` | UI | Không thêm sản phẩm. Báo lỗi giá. Seed còn nguyên. |
| TC-20 | PR-IEC-04 | Seed | Một dòng chuẩn, `price` là `100@` | UI | Không thêm sản phẩm. Báo lỗi giá. Seed còn nguyên. |
| TC-22 | N-IEC-01, N-B-01 | Seed | File chỉ có dòng header | UI | Không thêm sản phẩm. Seed còn nguyên. |
| TC-23 | ATOM-IEC-01 | Seed | Dòng 1 chuẩn `SP Import`. Dòng 2 tên rỗng, giá `100000` | UI | Rollback cả file. Không có `SP Import`. Seed còn nguyên. Báo lỗi tên ở dòng 2. |
| TC-24 | Q-IEC-01 | Seed | Body một sản phẩm chuẩn. Token admin. Query `foo=1` | API | HTTP không phải lỗi. Thêm đúng `SP Import`, giống lúc không gửi query. Seed còn nguyên. |

#### Phủ

| Mã | Test |
| --- | --- |
| SES-VEC-01, AUTH-VEC-01, EXT-VEC-01, HDR-VEC-01, NM-VEC-01, PR-VEC-01, DESC-VEC-01, IMG-VEC-01, CAT-VEC-01, N-B-02 | TC-01 |
| N-VEC-01, N-B-03, ATOM-VEC-01 | TC-02 |
| CSV-VEC-01 | TC-03 |
| NM-B-02 | TC-04 |
| NM-B-03 | TC-05 |
| NM-B-04 | TC-06 |
| NM-B-05 | TC-07 |
| PR-B-03 | TC-08 |
| SES-IEC-01 | TC-09 |
| AUTH-IEC-01 | TC-10 |
| AUTH-IEC-02 | TC-11 |
| ROLE-IEC-01 | TC-12 |
| EXT-IEC-01 | TC-13 |
| HDR-IEC-01 | TC-14 |
| CSV-IEC-01 | TC-15 |
| NM-IEC-01, NM-B-01 | TC-16 |
| PR-IEC-01, PR-B-01 | TC-17 |
| PR-IEC-02, PR-B-02 | TC-18 |
| PR-IEC-03 | TC-19 |
| PR-IEC-04 | TC-20 |
| N-IEC-01, N-B-01 | TC-22 |
| ATOM-IEC-01 | TC-23 |
| Q-IEC-01 | TC-24 |

#### Bổ sung sau review ngày 18/10/2026

| TC ID | Miền/biên | Precondition | Dữ liệu | Steps | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-25 | CSV-VEC-02 | Seed, admin | Mô tả CSV `"Mo ta ""dep"""` | UI chọn file và Import | Một sản phẩm, mô tả `Mo ta "dep"` |
| TC-26 | CSV-VEC-03 | Seed, admin | Mô tả trong nháy kép gồm Dong 1, LF, Dong 2 | UI | Một sản phẩm, giữ newline trong mô tả |
| TC-27 | CSV-VEC-04 | Seed, admin | Header và dòng chuẩn dùng CRLF | UI | Một sản phẩm, dữ liệu đúng, category 1 |
| TC-28 | NM-SPACE | Seed, admin | Tên ba dấu cách | UI | Giả định cần xác nhận: từ chối tên không có nội dung |
| TC-29 | PR-VEC-02 | Seed, admin | Giá 1.5 | UI | Import được, giá 1.5 |
| TC-30 | PR-SAMPLE-POS | Seed, admin | Giá 0.01 | UI | Import được, giá 0.01 |
| TC-31 | PR-SAMPLE-NEG | Seed, admin | Giá -0.01 | UI | Từ chối, không thêm dòng, có lỗi giá |

Phủ điểm on/off/in/out (bước 3, phần A):

| Biên | On | Off | In | Out |
| --- | --- | --- | --- | --- |
| A.1 `len(name) ≥ 1` | TC-04 | TC-16 | TC-01 | TC-16 |
| A.2 `price > 0` | TC-18 | TC-30 | TC-01 | TC-17 |
| A.3 `N ≥ 1` | TC-01 | TC-22 | TC-02 | TC-22 |

30 test hiện hành: 24 cũ trừ TC-21 chưa chốt oracle, cộng 7 test mới. TC-06/07 là kiểm thử chuỗi dài bổ sung, không phải biên trên FR-16. BOM và giá có dấu phân cách địa phương chưa có oracle thống nhất nên chưa chấm PASS/FAIL; không tự tuyên bố chúng phải hợp lệ.

## 5. FR-05 mobile — Pool D

Toàn văn báo cáo domain testing và boundary value analysis của chức năng này.

### FR-05 — Domain Testing, bước 1: Input Space Partitioning (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, kiểm trên app mobile `frontend-mobile/App.js`, màn `home`.

Bộ tài liệu web đã có ở `docs/fr-05/`. File này không sửa bộ đó.

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

#### Cách làm

1. Đọc FR-05 trong `README.md`, cùng FR-21 (một `h1`, tiền dùng `₫`) và FR-24 (empty state, `alt` của ảnh). Đọc mục 3.1 trong `api_specification.md`.
2. Đọc màn `home` trong `frontend-mobile/App.js`. App đổi màn bằng state `view`, không có route và không có query trên URL trang.
3. Đọc `GET /api/products`. Chỉ tính query mà handler thực sự đọc.
4. Đọc bảng `products` và seed trong `backend/database.js`.

Màn chi tiết sản phẩm là FR-06. Nút "Thêm vào giỏ" trên thẻ sản phẩm không phải input của FR-05.

#### 1. Biến đầu vào tường minh trên UI

Chỉ có một ô nhập:

| Vị trí | Tên trên UI | Biến | Khi nào gửi |
| --- | --- | --- | --- |
| `TextInput`, placeholder "Tìm kiếm..." | Từ khóa | `search` | Khi bấm nút **Tìm** |
| Lần mở màn `home` | Không qua ô nhập | `search = ""` | `useEffect` gọi `fetchProducts()` ngay |

Nút **Tìm** gửi giá trị hiện có của `search`. Nút không phải một biến có miền riêng.

Không có trên màn này: danh mục, sắp xếp, phân trang, giá tối thiểu, giá tối đa, tồn kho, trạng thái ẩn.

#### 2. Query parameter trên URL và API

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

#### 3. Biến trạng thái dữ liệu

| Biến | Có làm đổi tập kết quả không | Vì sao |
| --- | --- | --- |
| Nội dung `products.name`, gồm tên có dấu tiếng Việt | Có, khi `search` khác rỗng | `WHERE name LIKE '%từ khóa%'` |
| Số dòng trong `products` | Có | API trả mọi dòng khi không tìm, hoặc mọi dòng khớp khi có từ khóa. Seed có 5 sản phẩm |
| `products.description` | Không | Không có trong `WHERE`. Spec chỉ tìm theo tên |
| `products.category_id` | Không | Có cột, không có điều kiện lọc |
| `products.price`, `products.imageUrl` | Không | Chỉ được trả ra để hiện, không dùng để lọc |
| Sản phẩm ẩn / `is_active` | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột này |
| Tồn kho = 0 | Không thể | FR-05 không định nghĩa. Bảng `products` không có cột tồn kho |

#### 4. Bảng biến, kiểu, và ràng buộc

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

### FR-05 — Domain Testing, bước 2: Phân hoạch tương đương (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-05-mobile/01-input-space-partitioning.md`. Bộ web ở `docs/fr-05/` không bị sửa.

#### Cách chia VEC và IEC

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

#### 1. Mức khớp với tên đã lưu

`iPhone` (tiền tố), `15 Pro` (giữa tên) và `Max` (hậu tố) cùng một lớp. Spec chỉ nói tìm theo tên, không tách vị trí trong tên.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-01 | VEC | Khớp toàn phần với một tên | `iPhone 15 Pro Max` | Tìm theo tên sản phẩm |
| KW-VEC-02 | VEC | Khớp một phần, không trùng cả tên | `iPhone` | Vẫn là từ khóa tên. Spec không giới hạn chỉ khớp đúng cả chuỗi |
| KW-VEC-03 | VEC | Không nằm trong bất kỳ tên nào | `zzzz-khong-co` | Phải có empty state khi không có kết quả |

#### 2. Hoa thường

Không gộp ASCII với chữ có dấu. Spec không yêu cầu bỏ phân biệt hoa thường.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-04 | VEC | Cùng hoa thường với tên | `iPhone` | Từ khóa tên hợp lệ |
| KW-VEC-05 | VEC | Khác hoa thường ở chữ ASCII | `iphone` | Input hợp lệ. Spec không yêu cầu phải khớp khi khác hoa thường |
| KW-VEC-06 | VEC | Khác hoa thường ở chữ có dấu | `CƠ` | Input hợp lệ. Tên seed chứa `cơ` trong `Bàn phím cơ Keychron Q1`. Spec không yêu cầu `CƠ` khớp `cơ` |

#### 3. Dấu tiếng Việt

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-07 | VEC | Giữ đúng dấu của tên | `Bàn phím` | Tên seed `Bàn phím cơ Keychron Q1` |
| KW-VEC-08 | VEC | Bỏ dấu so với tên có dấu | `Ban phim` | Input hợp lệ. Spec không yêu cầu bỏ dấu |

#### 4. Hình dạng chuỗi

`%`, `_` và `'` mỗi ký tự một lớp vì bước 1 ghi chúng không cùng tác dụng lên `LIKE` và câu SQL. `&`, `#` và `?` mỗi ký tự một lớp vì client nối thẳng vào URL và ba ký tự này không cắt request theo cùng một cách. `<script>` là VEC: FR-05 bắt hiển thị an toàn, nghĩa là hiện thành chữ, không từ chối chuỗi.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| KW-VEC-09 | VEC | Chuỗi rỗng | `""` | Trang chủ hiển thị tất cả sản phẩm. Lần mở màn cũng gửi chuỗi rỗng |
| KW-IEC-01 | VEC | Chỉ khoảng trắng | `"   "` (3 dấu cách) | Người dùng nhập được. README không nói trim hay không, nên chấp nhận cả hai cách; chỉ yêu cầu không lỗi. |
| KW-IEC-02 | VEC | Chứa `%` | `%` | Ký tự thường trong từ khóa, không phải ký tự đại diện. SEC-05 cấm nối chuỗi vào SQL. |
| KW-IEC-03 | VEC | Chứa `_` | `_` | Như `%`: `_` là dữ liệu, không được khớp một ký tự bất kỳ. |
| KW-IEC-04 | VEC | Chứa `'` | `'` | Ký tự thường trong từ khóa. Không được làm vỡ câu SQL (SEC-05). |
| KW-IEC-05 | VEC | Chứa `&` | `a&b` | Phải tìm cả chuỗi `a&b`; `&` không được tách thành tham số URL mới. |
| KW-IEC-06 | VEC | Chứa `#` | `a#b` | Phải tìm cả chuỗi `a#b`; `#` không được cắt phần sau thành fragment. |
| KW-IEC-07 | VEC | Chứa `?` | `a?b` | Phải tìm cả chuỗi `a?b`. |
| KW-VEC-10 | VEC | Chứa HTML | `<script>` | Từ khóa phải được hiển thị an toàn, không render HTML |

Mã `KW-IEC-01..07` là mã lịch sử, giữ để không đổi liên kết tới TC-15..22 và bug report. Cả bảy lớp đều là VEC: README không cấm các ký tự này.

#### 5. Số sản phẩm trong CSDL

README: trang chủ hiển thị tất cả sản phẩm; FR-24: trang trống phải có icon/hình minh họa và message thân thiện. Màn `home` mobile gọi cùng `GET /api/products` khi mở màn, nên số dòng của bảng `products` quyết định danh sách.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CAT-VEC-01 | VEC | Không có sản phẩm | Bảng `products` rỗng | Trang trống có icon/hình và message (FR-24) |
| CAT-VEC-02 | VEC | Có ít nhất một sản phẩm | 5 sản phẩm seed | Hiển thị tất cả sản phẩm |

#### 6. Độ rộng màn hình thiết bị

Đây là đặc tính riêng của Pool D: cùng một app chạy trên nhiều cỡ màn. README không nêu breakpoint hay số cột trên mobile, nên chỉ lấy oracle chung: đủ sản phẩm, không tràn ngang, tên và giá không bị đẩy ra ngoài màn. Ba lớp theo nhóm thiết bị phổ biến; ranh giới 360 và 600 px là giả định của người kiểm thử, không phải biên của spec.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở |
| --- | --- | --- | --- | --- |
| VIEW-VEC-01 | VEC | Điện thoại nhỏ, dưới 360 px | 320 px | FR-05 yêu cầu hiện ảnh, tên, giá; không được mất nội dung |
| VIEW-VEC-02 | VEC | Điện thoại thường, 360–599 px | 390 px (dùng cho mọi test khác) | Như trên |
| VIEW-VEC-03 | VEC | Tablet, từ 600 px | 768 px | Như trên |

### FR-05 mobile — Chọn điểm on/off/in/out và phân tích biên

#### A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia (biên đóng `≥` thì off point nằm ngoài miền). In point và out point là giá trị điển hình trong và ngoài miền. Các lớp ký tự (`%`, `_`, `'`, `&`, `#`, `?`, HTML), hoa thường và dấu là miền liệt kê, không có on/off.

##### A.1 Độ dài từ khóa — biên `len(search) ≥ 1`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (1) | Có lọc | TC-10 |
| Off | `""` (0) | Hiện tất cả | TC-08 |
| In | `iPhone` (6) | Có lọc | TC-01 |
| Out | `""` (0) | Hiện tất cả | TC-08 |

##### A.2 Số sản phẩm trong CSDL — biên `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có danh sách | TC-25 |
| Off | 0 | Trang trống | TC-24 |
| In | 5 (seed) | Có danh sách | TC-08 |
| Out | 0 | Trang trống | TC-24 |

Độ dài và số dòng không âm, nên out point trùng off point.

Độ rộng màn hình (VIEW-VEC-01..03) không có on/off: ranh giới 360 và 600 px là giả định chia nhóm thiết bị, README không đặt breakpoint nào để kiểm tra hai phía.

#### B. Boundary value analysis

FR-05 không quy định độ dài tối đa của từ khóa. Giới hạn tên sản phẩm ở FR-15 không phải giới hạn ô tìm kiếm. Không áp dụng Max = 255 cho từ khóa.

##### B.1 Biên chuyển trạng thái rỗng / không rỗng

| ID | Độ dài | Giá trị | Ý nghĩa |
| --- | --- | --- | --- |
| LEN-B-01 | 0 | Chuỗi rỗng | Liệt kê tất cả sản phẩm |
| LEN-B-02 | 1 | a | Đầu lớp chuỗi không rỗng |
| LEN-B-03 | 2 | aa | Bên trong lớp chuỗi không rỗng |

Các mã LEN-B-04, LEN-B-05, LEN-B-06 giữ các chuỗi 254, 255, 256 ký tự làm kiểm thử độ bền bổ sung, không phải Max-1/Max/Max+1 của search. Không được mong đợi lỗi độ dài vì spec không nêu giới hạn.

Khoảng trắng: 0, 1, 2 dấu cách kiểm tra chuyển từ rỗng sang chuỗi chỉ dấu cách; chính sách trim chưa được spec chốt. `%`, `_`, nháy đơn, `&`, `#`, `?` là các lớp ký tự, không phải biên số.

##### B.2 Số sản phẩm trong CSDL

Miền CAT-VEC-02 là `N ≥ 1`, `Min = 1`. Không có Max.

| ID | Vị trí | N | Lớp bước 2 | Expected |
| --- | --- | --- | --- | --- |
| CAT-B-01 | Min-1 | 0 | CAT-VEC-01 | Trang trống có icon/hình và message |
| CAT-B-02 | Min | 1 | CAT-VEC-02 | Đúng 1 sản phẩm |
| CAT-B-03 | Min+1 | 2 | CAT-VEC-02 | Đúng 2 sản phẩm |

Không lập BVA giá, sort, danh mục hoặc phân trang cho FR-05. Không dùng ký hiệu L và không tạo test blocked cho chức năng không được yêu cầu.

### FR-05 — Test cases (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Nguồn: miền ở `docs/fr-05-mobile/02-equivalence-partitioning.md` và biên ở `docs/fr-05-mobile/03-boundary-value-analysis.md`. Bộ web ở `docs/fr-05/` không bị sửa.

#### Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: danh sách gồm mọi sản phẩm đang có.
- Tìm theo tên; chính sách hoa thường và bỏ dấu chưa được spec chốt. Không tự bắt buộc phân biệt hoặc không phân biệt.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có empty state. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- Không chấm `h1`, `alt` và số cột trên mobile. App mobile không có thẻ `h1`. Khi chạy bằng `react-native-web`, thư viện tự sinh `<img alt="">`. README không nêu số cột trên mobile. Các mục này chỉ chấm ở bộ web `docs/fr-05/`.
- Trên Chrome, TC-15 và TC-16 từng BLOCKED vì trình duyệt cắt dấu cách cuối URL. Lượt Android emulator ngày 18/10 chấm FAIL: ô tìm giữ dấu cách, request tới server là `search=` rỗng và trả đủ seed. Chi tiết ở `05-execution-results.md`.
- Query không thuộc FR-05 không được đổi tập sản phẩm so với cùng từ khóa khi không gửi query đó, và không được trả lỗi.

#### Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn là `iPhone`: khớp một phần, cùng hoa thường, đúng một sản phẩm seed. `15 Pro` và `Max` cùng lớp với `iPhone`, không có test riêng. KW-VEC-04 dùng cùng giá trị `iPhone`, nên nằm trong test mức chuẩn.

Mỗi lớp hoặc biên hợp lệ khác là một test, chỉ đổi từ khóa.

**Không hợp lệ — một lỗi một test.** Chỉ một dữ liệu sai. Không gửi thêm tham số ngoài dữ liệu đang xét.

Đại diện 3 dấu cách của KW-IEC-01 cùng lớp với 2 dấu cách (SP-B-03), nên không thêm test thứ ba cho dấu cách.

Seed:

| Tên | Giá |
| --- | --- |
| iPhone 15 Pro Max | 30000000 |
| Samsung Galaxy S24 Ultra | 28000000 |
| MacBook Pro M3 | 45000000 |
| Tai nghe AirPods Pro 2 | 6000000 |
| Bàn phím cơ Keychron Q1 | 4000000 |

Giá trị trong bảng là chuỗi gõ trên ô tìm, chưa encode.

#### Quy trình

**UI.** Mở màn `home`. Thấy loading trước khi có danh sách. Gõ từ khóa, bấm **Tìm**. Chuỗi rỗng: mở màn và không gõ.

**API.** `GET http://localhost:3000/api/products` với query của test. Chỉ dùng khi test gửi tham số không có ô trên màn.

#### Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | KW-VEC-02, KW-VEC-04 | Seed | `search=iPhone` | UI | Chỉ `iPhone 15 Pro Max`, giá `30.000.000 ₫`. Có loading. Chữ `iPhone` hiện dạng text. |
| TC-02 | KW-VEC-01 | Seed | `search=iPhone 15 Pro Max` | UI | Chỉ đúng một sản phẩm `iPhone 15 Pro Max`. |
| TC-03 | KW-VEC-03 | Seed | `search=zzzz-khong-co` | UI | Có empty state. Không hiện năm sản phẩm seed. |
| TC-04 | KW-VEC-05 | Seed | `search=iphone` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-05 | KW-VEC-06 | Seed, tên `Bàn phím cơ Keychron Q1` còn trong DB | `search=CƠ` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-06 | KW-VEC-07 | Seed | `search=Bàn phím` | UI | Chỉ `Bàn phím cơ Keychron Q1`, giá `4.000.000 ₫`. |
| TC-07 | KW-VEC-08 | Seed | `search=Ban phim` | UI | Spec chưa chốt chuẩn hóa hoa thường/dấu. Chấp nhận không có kết quả hoặc sản phẩm tương ứng, không sản phẩm khác; không lỗi. Nếu rỗng phải có empty state. |
| TC-08 | KW-VEC-09, LEN-B-01, SP-B-01 | Seed | `search=""` | UI | Đủ 5 sản phẩm seed. Giá lần lượt `30.000.000 ₫`, `28.000.000 ₫`, `45.000.000 ₫`, `6.000.000 ₫`, `4.000.000 ₫`. |
| TC-09 | KW-VEC-10 | Seed | `search=<script>` | UI | Empty state. Trang hiện đúng các ký tự `<script>`, không chạy script. |
| TC-10 | LEN-B-02 | Seed | `search=a` (1 ký tự) | UI | Có `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2`, vì các tên này chứa chữ `a`. Không có `Bàn phím cơ Keychron Q1`. |
| TC-11 | LEN-B-03 | Seed | `search=aa` (2 ký tự) | UI | Empty state. Không tên seed nào chứa `aa`. |
| TC-12 | LEN-B-04 | Seed | `search=` chữ `a` lặp 254 lần | UI | Empty state. Không lỗi. |
| TC-13 | LEN-B-05 | Seed | `search=` chữ `a` lặp 255 lần | UI | Empty state. Không lỗi. |
| TC-14 | Query thừa | Seed | `search=iPhone&foo=1` | API | HTTP không phải lỗi. JSON chỉ có `iPhone 15 Pro Max`, giống TC-01 khi không gửi `foo`. |

#### Ký tự đặc biệt và kiểm tra độ bền (không mặc nhiên là input invalid)

Mỗi dòng chỉ một dữ liệu sai.

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-15 | KW-IEC-01, SP-B-02 | Seed | `search=` 1 dấu cách | UI | Empty state. Không hiện đủ 5 sản phẩm như từ khóa rỗng. Không lỗi. |
| TC-16 | KW-IEC-01, SP-B-03 | Seed | `search=` 2 dấu cách | UI | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. |
| TC-17 | KW-IEC-02 | Seed | `search=%` | UI | Empty state. `%` không được làm trả về mọi sản phẩm. Không lỗi SQL. Ký tự `%` hiện dạng text. |
| TC-18 | KW-IEC-03 | Seed | `search=_` | UI | Empty state. `_` không được khớp một ký tự bất kỳ trong tên. Không lỗi SQL. |
| TC-19 | KW-IEC-04 | Seed | `search='` | UI | Empty state. Không trả trang lỗi SQL. Dấu `'` hiện dạng text. |
| TC-20 | KW-IEC-05 | Seed | `search=a&b` | UI | Empty state. Từ khóa được tìm là cả chuỗi `a&b`, không cắt thành `a`. Không lỗi. Chữ hiện dạng text. |
| TC-21 | KW-IEC-06 | Seed | `search=a#b` | UI | Empty state. Từ khóa được tìm là cả chuỗi `a#b`. Không lỗi. Chữ hiện dạng text. |
| TC-22 | KW-IEC-07 | Seed | `search=a?b` | UI | Empty state. Từ khóa được tìm là cả chuỗi `a?b`. Không lỗi. Chữ hiện dạng text. |
| TC-23 | LEN-B-06 | Seed | `search=` chữ `a` lặp 256 lần | UI | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. |

#### Ma trận phủ

| Mã | Test case |
| --- | --- |
| KW-VEC-01 .. 10 | TC-02, TC-01, TC-03, TC-01, TC-04, TC-05, TC-06, TC-07, TC-08, TC-09 |
| KW-IEC-01 .. 07 | TC-15 và TC-16, TC-17, TC-18, TC-19, TC-20, TC-21, TC-22 |
| LEN-B-01 .. 06 | TC-08, TC-10, TC-11, TC-12, TC-13, TC-23 |
| SP-B-01 .. 03 | TC-08, TC-15, TC-16 |
| CAT-VEC-01, CAT-B-01 | TC-24 |
| CAT-B-02 | TC-25 |
| CAT-B-03 | TC-26 |
| VIEW-VEC-01, VIEW-VEC-03 | TC-27, TC-28 |
| VIEW-VEC-02 | TC-01..TC-26 (mọi test chạy ở 390 px) |

Phủ điểm on/off/in/out (bước 3, phần A): A.1 → TC-10 (on), TC-08 (off/out), TC-01 (in). A.2 → TC-25 (on), TC-24 (off/out), TC-08 (in).

#### Test case riêng của mobile

Precondition số sản phẩm đặt trực tiếp bảng `products` (giữ `N` dòng đầu của seed theo id) và khôi phục seed sau test. Lượt chấm đặt độ rộng bằng `wm size` trên Android emulator: 320×711 và 768×1024.

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-24 | CAT-VEC-01, CAT-B-01 | `products` rỗng | Mở màn `home`, không gõ | UI | Không có sản phẩm. Có trang trống với icon/hình minh họa và message (FR-24). |
| TC-25 | CAT-B-02 | Chỉ còn `iPhone 15 Pro Max` | Mở màn `home` | UI | Đúng 1 sản phẩm `iPhone 15 Pro Max`, giá `30.000.000 ₫`. |
| TC-26 | CAT-B-03 | Còn `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra` | Mở màn `home` | UI | Đúng 2 sản phẩm đó. |
| TC-27 | VIEW-VEC-01 | Seed | Màn 320 px, mở `home` | UI | Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị đẩy ra ngoài màn. |
| TC-28 | VIEW-VEC-03 | Seed | Màn 768 px, mở `home` | UI | Như TC-27. |

#### Tổng hợp

28 test case: 27 test chức năng và 1 kiểm tra bổ sung query thừa (TC-14). Kết quả chạy ở `05-execution-results.md`.

## 6. Test summary hiện hành

Test chức năng:

| Chức năng | Thiết kế | Đã chạy | PASS | FAIL | BLOCKED |
| --- | --- | --- | --- | --- | --- |
| FR-05 web | 26 | 26 | 7 | 19 | 0 |
| FR-11 | 28 | 28 | 23 | 5 | 0 |
| FR-16 | 30 | 30 | 17 | 13 | 0 |
| FR-05 mobile (Android emulator) | 27 | 27 | 10 | 17 | 0 |
| Tổng | 111 | 111 | 57 | 54 | 0 |

Kiểm tra bổ sung query thừa: 23 (web) + 1 (mobile), đều PASS, không tính vào bảng trên. Số test FAIL không phải số bug.

## 7. Bug report và AI gap analysis

24 mã: 20 bug theo đặc tả, 4 mã đã kết luận không vi phạm đặc tả (BUG-07/12/13/19). BUG-24 là thứ tự Tab, lệch FR-21. BUG-01..23 có issue #44–#66 kèm ảnh. BUG-24 có issue #67. BUG-01/02/03 có ảnh riêng thấy đúng giá `VND`, `alt=""` và hai thẻ `h1`.

Mỗi thư mục có `06-ai-gap-analysis.md`: nguyên nhân (prompt hẹp, giới hạn công cụ, độ phức tạp chức năng), cách khắc phục và gap còn lại. Lần cập nhật này ghi thêm: AI coi BVA thay được bước on/off/in/out; biến số sản phẩm có ở bước 1 nhưng bị bỏ ở bước 2; bộ mobile chép bộ web; ảnh bằng chứng FR-16 trùng nhau mà AI không mở ra kiểm tra.

## 8. AI, skill và hồ sơ nộp

AI Critique: `ai-critique.md` và `.pdf`. AI Audit: `ai-audit-report.md` và `.pdf`.

Skill: `../.cursor/skills/fr-domain-testing/SKILL.md`, đã thêm bước on/off/in/out, quy tắc ảnh bằng chứng, miền riêng cho mobile và tách kiểm tra bổ sung khỏi summary. Video demo: https://youtu.be/b0SKlX8yYJU

Git commit log có commit riêng cho từng bước của lượt hiệu chỉnh này. Chưa xác minh việc chọn FR không trùng thành viên khác vì chưa có danh sách nhóm.

Tự đánh giá 99. Tên zip theo điểm đó: `23120175_HW02_AI_DomainTesting_099.zip`.
