# FR-05 — Test cases

Nguồn: miền ở `docs/fr-05/02-equivalence-partitioning.md` và biên ở `docs/fr-05/03-boundary-value-analysis.md`.

## Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: lưới gồm mọi sản phẩm đang có.
- Tìm theo tên; chính sách hoa thường và bỏ dấu chưa được spec chốt. Không tự bắt buộc phân biệt hoặc không phân biệt.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có thông báo empty state. Trang có đúng một `h1`. Ảnh có alt mô tả. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- `min_price`, `max_price`, `category`, `sort`, `page` không thuộc FR-05. Gửi chúng không được đổi tập sản phẩm so với cùng từ khóa khi không gửi, và không được trả lỗi.

## Cách rút số test case

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

## Quy trình

**UI.** Mở `http://localhost:5173/`. Thấy loading trước khi có danh sách. Nhập từ khóa, bấm Tìm. Chuỗi rỗng: để ô trống rồi bấm Tìm.

**API.** `GET http://localhost:3000/api/products` với query của test. Dùng khi test có tham số không có ô trên trang chủ.

## Test case hợp lệ

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

## Ký tự đặc biệt và kiểm tra độ bền (không mặc nhiên là input invalid)

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

## Phân loại coverage sau review

TC-01..13, TC-27..31: tìm kiếm và trạng thái dữ liệu. Trong đó các chuỗi dài 254/255/256 chỉ là kiểm tra độ bền.

TC-14..22, TC-32..45: 23 kiểm tra bổ sung query thừa; không tính là miền giá/danh mục/phân trang.

TC-23..26 và TC-46: loại khỏi bộ hiện hành vì FR-05 không có phân trang; không còn tính BLOCKED. Giữ nguyên khoảng trống mã để truy vết bằng chứng cũ.

## Test bổ sung từ AI gap analysis

| TC ID | Miền | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-47 | URL-01 | Seed 5 sản phẩm | a&b | UI | Tìm cả chuỗi; không có kết quả, có empty state, từ khóa hiện text |
| TC-48 | URL-02 | Seed 5 sản phẩm | a#b | UI | Như TC-47, không cắt fragment |
| TC-49 | URL-03 | Seed 5 sản phẩm | a?b | UI | Như TC-47, giữ dấu ? trong từ khóa |

Ma trận miền chính: KW-VEC-01..10 → TC-02,01,03,01,04,05,06,07,08,09; KW-IEC-01..04 (mã lịch sử) → TC-27..30; LEN-01..06 → TC-08,10,11,12,13,31; URL-01..03 → TC-47..49.

## Giao diện bổ sung

| TC ID | Miền | Precondition | Dữ liệu | Steps | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-50 | UI-GRID-DESKTOP | Seed, Chrome | Viewport 1280×844, search rỗng | UI | Đủ seed; nhiều thẻ trên cùng hàng; không tràn ngang; ảnh dùng cover/contain/scale-down để giữ tỷ lệ |
| TC-51 | UI-RESPONSIVE | Seed, Chrome | Viewport 390×844, search rỗng | UI | Đủ seed, không tràn ngang; cho phép một cột; ảnh giữ tỷ lệ |

Đây là kiểm tra layout/CSS bổ sung, không đặt tỷ lệ ảnh số học hoặc số cột cụ thể mà đặc tả chưa quy định. Chưa chứng minh mọi ảnh tải thành công hoặc mọi viewport đều đúng.

## Số sản phẩm trong CSDL

Precondition đặt trực tiếp bảng `products`: giữ `N` dòng đầu của seed theo thứ tự id, chạy xong khôi phục đủ 5 dòng. Từ khóa để rỗng (mở trang chủ, bấm Tìm với ô trống).

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-52 | CAT-VEC-01, CAT-B-01, off/out point A.2 | `products` rỗng | `search=""` | UI | Không có thẻ sản phẩm. Có trang trống với icon/hình minh họa và message (FR-24). |
| TC-53 | CAT-B-02, on point A.2 | Chỉ còn `iPhone 15 Pro Max` | `search=""` | UI | Lưới đúng 1 sản phẩm `iPhone 15 Pro Max`, giá `30.000.000 ₫`. |
| TC-54 | CAT-B-03 | Còn `iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` | `search=""` | UI | Lưới đúng 2 sản phẩm đó. |

## Tổng hợp

49 test hiện hành:

- 26 test chức năng FR-05: TC-01..13, TC-27..31, TC-47..54.
- 23 kiểm tra bổ sung query thừa: TC-14..22, TC-32..45. Không tính vào coverage chức năng và được tách riêng trong test summary.

Phủ on/off/in/out (bước 3, phần A): A.1 → TC-10 (on), TC-08 (off/out), TC-01 (in). A.2 → TC-53 (on), TC-52 (off/out), TC-08 (in). CAT-B-01..03 → TC-52..54.
