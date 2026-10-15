# HW02 — Main report

Domain Testing và Boundary Value Analysis trên EShop.

Đây là bản Markdown để review. Chưa xuất PDF. Số liệu lấy từ file đã viết trong `docs/fr-05/`, `docs/fr-11/`, `docs/fr-16/` và `docs/fr-05-mobile/`. Bảng test case đầy đủ và kết quả từng dòng nằm ở các file đó, không chép lại hết vào đây.

MSSV và điểm tự chấm chưa có trong tài liệu đã viết. Điền trước khi nộp.

## 1. Chức năng đã chọn

Mỗi pool một chức năng, đúng mục 5 của đề.

| Pool | Chức năng | Nơi chạy | Tài liệu |
| --- | --- | --- | --- |
| A | FR-05 Xem danh sách và tìm kiếm sản phẩm | Web `http://localhost:5173` | `docs/fr-05/` |
| B | FR-11 Xem lịch sử đơn hàng | Web `http://localhost:5173/profile` | `docs/fr-11/` |
| C | FR-16 Import sản phẩm từ CSV | Admin `http://localhost:5174` | `docs/fr-16/` |
| D | FR-05 trên app mobile | Expo web `http://127.0.0.1:8081` | `docs/fr-05-mobile/` |

Pool D ban đầu định làm FR-19. App mobile không có màn quản lý người dùng, nên bộ tài liệu đó đã bỏ. Pool D là FR-05 trên mobile.

Oracle của mọi chức năng là câu trong `README.md`, không phải cách code đang làm.

## 2. Quy trình áp dụng cho mỗi chức năng

1. Đọc mục FR trong README và các mục UI hoặc bảo mật mà FR đó dẫn tới. Đọc màn hình và handler API. Chỉ tính query mà handler thực sự đọc.
2. **Input space partitioning.** Liệt kê ô nhập, query, và biến trạng thái dữ liệu. Tách ràng buộc spec khỏi ràng buộc trong code.
3. **Equivalence partitioning.** VEC là cách spec mô tả việc xử lý bình thường. IEC là giá trị ngoài miền spec đã mô tả. Các lớp của cùng một đặc tính thì rời nhau. Giá trị đại diện lấy từ seed khi kết quả phụ thuộc dữ liệu đang có.
4. **Boundary value analysis, 3 giá trị.** Với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giới hạn không có trong spec thì không bịa số. Test phụ thuộc giới hạn đó ghi BLOCKED lúc chạy.
5. **Test case.** Hợp lệ dùng base choice: một mức chuẩn, mỗi lớp hoặc biên hợp lệ khác chỉ đổi một yếu tố. Không hợp lệ thì đúng một dữ liệu sai. Expected trích hành vi README.
6. **Chạy trên hệ thống local.** Không chấm PASS/FAIL bằng cách đọc code.
7. **Bug report** chỉ khi kết quả đã chạy lệch câu trong README. Chi tiết và ảnh nằm ở `docs/bug-report.md`.

## 3. FR-05 — Web (Pool A)

### 3.1 Domain Testing

Màn là trang chủ `/`. Chỉ có một ô tìm. URL trang không có query. `GET /api/products` chỉ đọc `search`.

| Biến | Spec | Trong code |
| --- | --- | --- |
| `search` | Tìm theo tên. Từ khóa hiện an toàn, không render HTML. Hết kết quả thì có empty state. | Nối thẳng vào `LIKE '%...%'`, không tham số hóa. `%` và `_` là ký tự đại diện. UI đưa từ khóa vào `dangerouslySetInnerHTML`. |
| Chuỗi rỗng | Trang chủ hiện mọi sản phẩm. | `SELECT * FROM products`. |
| Tên có dấu | FR-05 không yêu cầu bỏ dấu hay gộp hoa thường. | SQLite `LIKE` không phân biệt hoa thường với chữ ASCII. Chữ có dấu thì có phân biệt. |
| `min_price`, `max_price`, `category`, `sort`, `page` | FR-05 không có các lọc này. | API không đọc. Vẫn phân hoạch để chứng tỏ gửi chúng không được đổi tập sản phẩm. |

Phân hoạch từ khóa:

| ID | Loại | Lớp | Đại diện |
| --- | --- | --- | --- |
| KW-VEC-01 | VEC | Khớp cả tên | `iPhone 15 Pro Max` |
| KW-VEC-02 | VEC | Khớp một phần | `iPhone` |
| KW-VEC-03 | VEC | Không có trong tên nào | `zzzz-khong-co` |
| KW-VEC-04 | VEC | Cùng hoa thường | `iPhone` |
| KW-VEC-05 | VEC | Khác hoa thường ASCII | `iphone` |
| KW-VEC-06 | VEC | Khác hoa thường ở chữ có dấu | `CƠ` |
| KW-VEC-07 | VEC | Đúng dấu | `Bàn phím` |
| KW-VEC-08 | VEC | Bỏ dấu | `Ban phim` |
| KW-VEC-09 | VEC | Chuỗi rỗng | `""` |
| KW-VEC-10 | VEC | Có HTML | `<script>` |
| KW-IEC-01 | IEC | Chỉ dấu cách | 3 dấu cách |
| KW-IEC-02 | IEC | Có `%` | `%` |
| KW-IEC-03 | IEC | Có `_` | `_` |
| KW-IEC-04 | IEC | Có `'` | `'` |

`iPhone`, `15 Pro` và `Max` cùng một lớp vì spec chỉ nói tìm theo tên, không tách vị trí trong tên.

Mức chuẩn của base choice là `search=iPhone`. Mỗi lớp hợp lệ khác một test, chỉ đổi yếu tố đó. Mỗi IEC một test, chỉ một dữ liệu sai.

### 3.2 Boundary Value Analysis

FR-05 không khai báo độ dài ô tìm. Biên trên mượn FR-15: tên tối đa 255 ký tự. Đếm theo số ký tự, chuỗi biên là chữ `a` lặp lại.

| ID | Vị trí | Số ký tự |
| --- | --- | --- |
| LEN-01 | Min-1 | 0 |
| LEN-02 | Min | 1 |
| LEN-03 | Min+1 | 2 |
| LEN-04 | Max-1 | 254 |
| LEN-05 | Max | 255 |
| LEN-06 | Max+1 | 256 |

Giá không có trên FR-05. Nếu tính theo giá seed, thấp nhất là 4.000.000, cao nhất là 45.000.000. Ba giá trị quanh 0 là `-1`, `0`, `1`. Biên đảo là `min_price = max_price + 1`.

Phân trang không có `Limit`. Các mốc giữ ký hiệu `L`. Không gán `L = 10`.

### 3.3 Chạy test

46 test case. Script `scripts/fr05-execute.mjs`.

Tổng: 46. PASS: 25. FAIL: 16. BLOCKED: 5.

Năm test BLOCKED là TC-23, TC-24, TC-25, TC-26 và TC-46 vì precondition dùng `L` chưa có số.

Lệch đã thấy khi chạy: giá hiện `VND` thay vì `₫`; `alt` rỗng; hai thẻ `h1`; không có loading; không có empty state; `<script>` bị nuốt khỏi trang; ba dấu cách vẫn ra đủ 5 sản phẩm; `%` và `_` khớp mọi tên; dấu nháy gây `SQLITE_ERROR`. `iphone` vẫn ra iPhone. README không cấm tìm không phân biệt hoa thường với chữ ASCII, nên TC-04 không lập bug.

Tham số giá, danh mục, sort và page không đổi tập iPhone và không trả lỗi.

Bug: BUG-01 đến BUG-09, issue #44–#52. Ảnh lỗi và ảnh trang issue ở `docs/bugs/`.

## 4. FR-11 — Lịch sử đơn hàng (Pool B)

### 4.1 Domain Testing

Màn là `/profile`. Khối lịch sử không có ô nhập. Danh sách tải khi mở trang nếu đã có token. `GET /api/orders/my-orders` không đọc query. Handler lọc `WHERE user_id = ?` với id trong JWT.

Form hồ sơ thuộc FR-04. Nút hủy đơn thuộc FR-10. Cả hai không phải input của FR-11. Seed không có đơn. `pending` tạo được bằng checkout. Bốn trạng thái còn lại phải ghi thẳng vào cột `status`.

| ID | Loại | Lớp | Đại diện |
| --- | --- | --- | --- |
| SES-VEC-01 | VEC | Đã đăng nhập | `test@eshop.com` |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở `/profile` không phiên |
| AUTH-VEC-01 | VEC | JWT hợp lệ | Token của test user, id 2 |
| AUTH-IEC-01 | IEC | Không có header | Request không `Authorization` |
| AUTH-IEC-02 | IEC | Token không verify được | `Bearer not-a-jwt` |
| OWN-VEC-01 | VEC | Đơn của mình | `user_id = 2` |
| OWN-VEC-02 | VEC | Đơn của người khác | `user_id = 1`, người gọi là id 2 |
| CNT-VEC-01 | VEC | Không có đơn | 0 đơn |
| CNT-VEC-02 | VEC | Có đơn | 2 đơn |
| ST-VEC-01 .. 05 | VEC | Năm trạng thái FR-10 | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` |
| ST-IEC-01 | IEC | Ngoài năm trạng thái | `returned` |
| DT-VEC-01 | VEC | Có ngày đặt | `2026-10-15 10:00:00` |
| DT-IEC-01 | IEC | Không có ngày | `created_at` null |
| AMT-VEC-01 | VEC | Có tổng tiền | `30000000` |
| AMT-IEC-01 | IEC | Không có tổng tiền | `total_amount` null |
| Q-IEC-01 | IEC | Query thừa | `?user_id=1` |

Mức chuẩn: một đơn của user id 2, `status = pending`, ngày `2026-10-15 10:00:00`, tiền `30000000`.

### 4.2 Boundary Value Analysis

Số đơn không có Max trong spec. Chỉ có biên dưới.

| ID | Vị trí | N |
| --- | --- | --- |
| CNT-B-01 | Min-1 | 0 |
| CNT-B-02 | Min | 1 |
| CNT-B-03 | Min+1 | 2 |

Chủ đơn là một điểm `user_id = 2`, không phải một khoảng. Ba giá trị là `1`, `2`, `3`. Mã đơn có Min = 1 và không có Max: `0`, `1`, `2`.

Tổng tiền có mốc 0 (`-1`, `0`, `1`) và hai mốc phân cách hàng nghìn: 1.000 và 1.000.000, mỗi mốc lấy `Min-1`, `Min`, `Min+1`. Ngày đặt không có khoảng đóng. Điểm sát ngoài là `created_at` null. Không lập biên `page`.

### 4.3 Chạy test

27 test case. Script `scripts/fr11-execute.mjs`.

Tổng: 27. PASS: 23. FAIL: 4. BLOCKED: 0.

Lệch đã thấy: trang không có `h1`; empty state có câu "Bạn chưa có đơn hàng nào." nhưng không có icon; `created_at` null hiện `1/1/1970`; `total_amount` null hiện `0 ₫`.

Đơn của người khác không hiện. Năm trạng thái có nhãn tiếng Việt và màu khác nhau. Khách chưa đăng nhập không thấy đơn. API thiếu token trả 401, token sai trả 403. Query `user_id=1` không đổi tập đơn. `status=returned` hiện `RETURNED` nhưng không lập bug: FR-11 không chốt nhãn cho trạng thái ngoài năm trạng thái của FR-10.

Bug: BUG-10 đến BUG-13, issue #53–#56.

## 5. FR-16 — Import CSV (Pool C)

### 5.1 Domain Testing

Ô nhập là `input type="file"`. Trình duyệt đọc file thành text, tách thành mảng, rồi `POST /api/admin/import-products` với body `{ "products": [...] }`. API không nhận file CSV nguyên và không đọc query. Form thêm sản phẩm trên cùng tab thuộc FR-15.

| ID | Loại | Lớp | Đại diện |
| --- | --- | --- | --- |
| SES-VEC-01 | VEC | Admin đã đăng nhập | `admin@eshop.com` |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở admin không phiên |
| AUTH-VEC-01 | VEC | JWT của admin | Token admin |
| AUTH-IEC-01 | IEC | Không có header | POST không `Authorization` |
| AUTH-IEC-02 | IEC | Token không verify được | `Bearer not-a-jwt` |
| ROLE-IEC-01 | IEC | JWT hợp lệ nhưng không phải admin | Token `test@eshop.com` |
| EXT-VEC-01 | VEC | Đuôi `.csv` | `hang.csv` |
| EXT-IEC-01 | IEC | Đuôi khác | `hang.txt` |
| HDR-VEC-01 | VEC | Đúng header | `name,price,description,imageUrl,category_id` |
| HDR-IEC-01 | IEC | Header khác | `ten,gia,mo_ta,image,danh_muc` |
| CSV-VEC-01 | VEC | Dấu phẩy trong nháy kép | `"Mo ta, co phay"` |
| CSV-IEC-01 | IEC | Dấu phẩy không nháy kép | `Mo ta, co phay` |
| NM-VEC-01 | VEC | Tên không rỗng | `SP Import` |
| NM-IEC-01 | IEC | Tên rỗng | `""` |
| PR-VEC-01 | VEC | Giá dương | `100000` |
| PR-IEC-01 .. 04 | IEC | Giá âm, 0, chữ, ký tự đặc biệt | `-100`, `0`, `abc`, `100@` |
| N-VEC-01 | VEC | Ít nhất một dòng hợp lệ | Hai dòng chuẩn |
| N-IEC-01 | IEC | Chỉ có header | Không có dòng dữ liệu |
| ATOM-VEC-01 | VEC | Mọi dòng hợp lệ | Cả file được thêm |
| ATOM-IEC-01 | IEC | Có một dòng lỗi | Dòng 2 tên rỗng. Rollback cả file |
| Q-IEC-01 | IEC | Query thừa | `?foo=1` |

Mô tả, ảnh và `category_id` mỗi thứ một lớp VEC. FR-16 không cấm rỗng và không bắt id danh mục phải tồn tại.

Mức chuẩn là file `hang.csv` một dòng `SP Import`, giá `100000`, người gọi `admin@eshop.com`.

### 5.2 Boundary Value Analysis

Tên lấy Max = 255 từ FR-15.

| ID | Vị trí | Giá trị |
| --- | --- | --- |
| NM-B-01 | Min-1 | tên rỗng, 0 ký tự |
| NM-B-02 | Min | 1 ký tự `a` |
| NM-B-03 | Min+1 | 2 ký tự `aa` |
| NM-B-04 | Max-1 | 254 ký tự `a` |
| NM-B-05 | Max | 255 ký tự `a` |
| NM-B-06 | Max+1 | 256 ký tự `a` |

Giá quanh mốc 0: `-1`, `0`, `1`. Không bịa giá Max.

Số dòng dữ liệu không có Max. Biên dưới của file có dữ liệu là 1 dòng.

| ID | Vị trí | Số dòng |
| --- | --- | --- |
| N-B-01 | Min-1 | 0, chỉ header |
| N-B-02 | Min | 1 |
| N-B-03 | Min+1 | 2 |

### 5.3 Chạy test

24 test case. Script `scripts/fr16-execute.mjs`.

Tổng: 24. PASS: 13. FAIL: 11. BLOCKED: 0.

Lệch đã thấy: dấu phẩy trong nháy kép vẫn bị cắt; user thường import được vì API không kiểm tra role; file `.txt` và header sai vẫn import; giá `-1`, `0`, `abc`, `100@` vẫn được thêm; tên 256 ký tự được thêm; một dòng lỗi không rollback cả file.

File chuẩn thêm đúng sản phẩm. Tên 1, 2, 254, 255 ký tự và giá `1` được thêm. Khách chưa đăng nhập không import. Thiếu token trả 401, token sai trả 403. Tên trống không thêm sản phẩm và có báo lỗi. File chỉ có header không bật nút Import. Query `foo=1` không đổi kết quả. Tên trống bị từ chối đúng spec nên không lập bug.

Bug: BUG-14 đến BUG-20, issue #57–#63.

## 6. FR-05 — Mobile (Pool D)

### 6.1 Domain Testing

Cùng FR-05, nhưng màn là `home` của `frontend-mobile/App.js`. App không có route. Một `TextInput` placeholder "Tìm kiếm...", nút Tìm. `GET /api/products` vẫn chỉ đọc `search`. App nối `search=${query}` và không gọi `encodeURIComponent`.

Không lập miền giá, danh mục, sắp xếp, phân trang. Những biến đó không có trên màn mobile và bước phân hoạch mobile không có các lớp đó.

Phân hoạch từ khóa giống web cho KW-VEC-01 đến KW-VEC-10 và KW-IEC-01 đến KW-IEC-04. Thêm ba lớp vì app ghép URL không mã hóa:

| ID | Loại | Lớp | Đại diện |
| --- | --- | --- | --- |
| KW-IEC-05 | IEC | Có `&` | `a&b` |
| KW-IEC-06 | IEC | Có `#` | `a#b` |
| KW-IEC-07 | IEC | Có `?` | `a?b` |

`h1`, `alt` và số cột không chấm trên mobile. App không có thẻ `h1`. README không nêu số cột trên mobile. Khi chạy bằng `react-native-web`, thư viện tự sinh `alt` rỗng.

Mức chuẩn vẫn là `iPhone`.

### 6.2 Boundary Value Analysis

Độ dài từ khóa cùng mốc 0, 1, 2, 254, 255, 256. Mã biên là LEN-B-01 đến LEN-B-06.

Chuỗi chỉ dấu cách không có Max. Biên dưới của lớp đó là 1 dấu cách.

| ID | Vị trí | Số dấu cách |
| --- | --- | --- |
| SP-B-01 | Min-1 | 0 |
| SP-B-02 | Min | 1 |
| SP-B-03 | Min+1 | 2 |

`%`, `_`, `'`, `&`, `#`, `?` và `<script>` là từng điểm, không gán số biên.

### 6.3 Chạy test

23 test case. Script `scripts/fr05-mobile-execute.mjs`.

App đang gọi `http://192.168.10.13:3000`. Máy chạy test không mở được địa chỉ đó, nên script chuyển host sang `http://127.0.0.1:3000` và giữ query do app tạo. Đây là React Native chạy bằng `react-native-web` trong Chrome, không phải điện thoại thật.

Tổng: 23. PASS: 6. FAIL: 15. BLOCKED: 2.

TC-15 và TC-16 BLOCKED. Chrome cắt dấu cách cuối URL nên request thành `search=` rỗng. Chưa biết app trên iOS hoặc Android gửi gì.

15 FAIL không phải 15 lỗi. Chín test chỉ fail vì không có empty state. `%` và `_` trả đủ 5 sản phẩm, cùng BUG-08. Dấu nháy trả lỗi SQL, cùng BUG-09. `a&b` và `a#b` bị cắt thành tìm chữ `a`. `iphone` vẫn ra iPhone và không lập bug, cùng lý do với web.

Bug mới của mobile: BUG-21 và BUG-22, issue #64 và #65.

## 7. Tổng hợp đã chạy

| Chức năng | Thiết kế | PASS | FAIL | BLOCKED | Bug mới |
| --- | --- | --- | --- | --- | --- |
| FR-05 web | 46 | 25 | 16 | 5 | BUG-01 .. BUG-09 |
| FR-11 | 27 | 23 | 4 | 0 | BUG-10 .. BUG-13 |
| FR-16 | 24 | 13 | 11 | 0 | BUG-14 .. BUG-20 |
| FR-05 mobile | 23 | 6 | 15 | 2 | BUG-21, BUG-22 |
| Tổng | 120 | 67 | 46 | 7 | 22 |

120 là số test case đã viết. 7 test chưa chấm được: 5 test phân trang của FR-05 web vì chưa có `Limit`, và 2 test dấu cách của FR-05 mobile vì Chrome cắt dấu cách cuối URL.

## 8. AI gap analysis

Các case dưới đây chưa được thêm vào bảng test case và chưa chạy, nên chưa có mã bug mới. Chi tiết nằm ở file của từng chức năng.

| Chức năng | File | Chỗ AI bỏ sót |
| --- | --- | --- |
| FR-05 web | `docs/fr-05/06-ai-gap-analysis.md` | Từ khóa `&`, `#`, `?` trên web. Ảnh tỷ lệ chuẩn. Lưới theo bề rộng màn hình. |
| FR-11 | `docs/fr-11/06-ai-gap-analysis.md` | Ngày đặt sát mốc đổi ngày theo múi giờ máy. Thứ tự Tab trên `/profile`. |
| FR-16 | `docs/fr-16/06-ai-gap-analysis.md` | Nháy kép escape `""`, xuống dòng trong trường nháy, CRLF, BOM, tên chỉ dấu cách, giá thập phân và giá có dấu phân cách. |
| FR-05 mobile | `docs/fr-05-mobile/06-ai-gap-analysis.md` | Từ khóa chỉ dấu cách và ký tự `#` trên thiết bị thật. Script chỉ chạy Expo web. |

Một số expected không phải bug: TC-04 bắt phân biệt hoa thường dù README không yêu cầu. Năm test phân trang của FR-05 web bị BLOCKED vì prompt đòi `Limit` mà spec không có. Lần chạy mobile đầu chép oracle web (`h1`, `alt`, một cột) sang Expo web.

## 9. AI Critique

Đoạn 200–300 từ nằm ở `docs/ai-critique.md`.

## 10. Phần đề còn chưa điền

Điểm tự chấm trong bảng mục 15 của đề. Chưa điền. MSSV chưa có trong tài liệu đã viết.

Bug report, ảnh, và AI Audit Report đã có file riêng: `docs/bug-report.md`, `docs/bugs/`, `docs/ai-audit-report.md`. Git commit log ở `docs/git-commit-log.txt`.
