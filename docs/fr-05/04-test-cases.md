# FR-05 — Test cases

Nguồn: miền ở `docs/fr-05/02-equivalence-partitioning.md` và biên ở `docs/fr-05/03-boundary-value-analysis.md`.

## Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: lưới gồm mọi sản phẩm đang có.
- Từ khóa khác rỗng: chỉ sản phẩm có tên chứa đúng chuỗi đó. So khớp từng ký tự, có phân biệt hoa thường và dấu, vì FR-05 không yêu cầu quy về cùng dạng.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có thông báo empty state. Trang có đúng một `h1`. Ảnh có alt mô tả. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- `min_price`, `max_price`, `category`, `sort`, `page` không thuộc FR-05. Gửi chúng không được đổi tập sản phẩm so với cùng từ khóa khi không gửi, và không được trả lỗi.

## Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn của từ khóa là `iPhone` (khớp một phần, cùng hoa thường, đúng 1 sản phẩm seed). Mức chuẩn của giá, khi test đang đụng tới giá, là `min_price=4000000`, `max_price=45000000`. Danh mục chuẩn là `1`. Trang chuẩn là `1`.

Mỗi lớp hoặc biên hợp lệ khác được phủ bằng đúng một test, chỉ đổi yếu tố đó. `15 Pro` và `Max` cùng lớp với `iPhone` nên không có test riêng. `category=2` và `3` cùng lớp với `1`. `sort` không có lớp hợp lệ.

**Không hợp lệ — một lỗi một test.** Chỉ một trường sai. Trường còn lại ở mức chuẩn. Không gửi thêm tham số ngoài trường đang xét, để lỗi này không bị lỗi khác che.

Khi `max_price` âm hoặc bằng 0, không gửi `min_price`. Nếu vẫn gửi `min_price=4000000` thì vừa sai giá trị vừa đảo khoảng (`min > max`), hai lỗi cùng lúc.

`L` vẫn là ký hiệu. Không gán `L = 10`.

Seed, trừ test nào ghi khác:

| Tên | Giá | category_id |
| --- | --- | --- |
| iPhone 15 Pro Max | 30000000 | 1 |
| Samsung Galaxy S24 Ultra | 28000000 | 1 |
| MacBook Pro M3 | 45000000 | 2 |
| Tai nghe AirPods Pro 2 | 6000000 | 3 |
| Bàn phím cơ Keychron Q1 | 4000000 | 3 |

Giá trị dưới đây là giá trị logic. Đưa lên query string thì encode URL.

## Quy trình

**UI.** Mở `http://localhost:5173/`. Thấy loading trước khi có danh sách. Nhập từ khóa, bấm Tìm. Chuỗi rỗng: để ô trống rồi bấm Tìm.

**API.** `GET http://localhost:3000/api/products` với query của test. Dùng khi test có tham số không có ô trên trang chủ.

## Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | KW-VEC-02, KW-VEC-04, PG-02 | Seed | `search=iPhone` | UI | Chỉ `iPhone 15 Pro Max`, giá `30.000.000 ₫`. Ảnh có alt mô tả. Đúng một `h1`. Có loading. Chữ `iPhone` hiện dạng text. N = 1. |
| TC-02 | KW-VEC-01 | Seed | `search=iPhone 15 Pro Max` | UI | Chỉ đúng một sản phẩm `iPhone 15 Pro Max`. |
| TC-03 | KW-VEC-03, PG-01 | Seed | `search=zzzz-khong-co` | UI | Có thông báo empty state. Không hiện lưới năm sản phẩm. N = 0. |
| TC-04 | KW-VEC-05 | Seed | `search=iphone` | UI | Empty state. `iPhone 15 Pro Max` không được trả về chỉ vì khác hoa thường. |
| TC-05 | KW-VEC-06 | Seed, tên `Bàn phím cơ Keychron Q1` còn trong DB | `search=CƠ` | UI | Empty state. Sản phẩm đó không được trả về chỉ vì khác hoa thường ở chữ `ơ`. |
| TC-06 | KW-VEC-07 | Seed | `search=Bàn phím` | UI | Chỉ `Bàn phím cơ Keychron Q1`, giá `4.000.000 ₫`. |
| TC-07 | KW-VEC-08 | Seed | `search=Ban phim` | UI | Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu. |
| TC-08 | KW-VEC-09, LEN-01 | Seed | `search=""` | UI | Đủ 5 sản phẩm seed, mỗi giá đúng đơn vị `₫` và có phân cách hàng nghìn. |
| TC-09 | KW-VEC-10 | Seed | `search=<script>` | UI | Empty state. Trang hiện đúng các ký tự `<script>`, không chạy script. |
| TC-10 | LEN-02 | Seed | `search=a` (1 ký tự) | UI | Có `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2`. Không có `Bàn phím cơ Keychron Q1`. |
| TC-11 | LEN-03 | Seed | `search=aa` (2 ký tự) | UI | Empty state. Không tên seed nào chứa `aa`. |
| TC-12 | LEN-04 | Seed | `search=` chữ `a` lặp 254 lần | UI | Empty state. Không lỗi. |
| TC-13 | LEN-05 | Seed | `search=` chữ `a` lặp 255 lần | UI | Empty state. Không lỗi. |
| TC-14 | PR-VEC-01, PR-VEC-02, PRC-05, PRC-08 | Seed | `search=iPhone&min_price=4000000&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`, giống lúc không gửi giá. HTTP không phải lỗi. |
| TC-15 | PRC-03 | Seed | `search=iPhone&min_price=1&max_price=45000000` | API | Cùng tập TC-14. |
| TC-16 | PRC-04 | Seed | `search=iPhone&min_price=3999999&max_price=45000000` | API | Cùng tập TC-14. |
| TC-17 | PRC-06 | Seed | `search=iPhone&min_price=4000001&max_price=45000000` | API | Cùng tập TC-14. |
| TC-18 | PRC-07 | Seed | `search=iPhone&min_price=4000000&max_price=44999999` | API | Cùng tập TC-14. |
| TC-19 | PRC-09 | Seed | `search=iPhone&min_price=4000000&max_price=45000001` | API | Cùng tập TC-14. |
| TC-20 | PR-VEC-03, PRC-11 | Seed | `search=iPhone&min_price=45000000&max_price=45000000` | API | Cùng tập TC-14. Hai đầu bằng nhau không làm rỗng kết quả. |
| TC-21 | PRC-10 | Seed | `search=iPhone&min_price=44999999&max_price=45000000` | API | Cùng tập TC-14. |
| TC-22 | CAT-VEC-01 | Seed | `search=iPhone&category=1` | API | Cùng tập TC-01. `category=1` không lọc mất iPhone và không thêm sản phẩm khác. |
| TC-23 | PG-03, PG-08 | Đúng `L-1` sản phẩm có tên chứa `iPhone`. Mọi tên khác không chứa `iPhone` | `search=iPhone&page=1` | API | JSON có đúng `L-1` sản phẩm đó. `page=1` không cắt bớt. |
| TC-24 | PG-04, PG-11 | Đúng `L` sản phẩm có tên chứa `iPhone` | `search=iPhone&page=1` | API | JSON có đúng `L` sản phẩm. Không có trang 2. |
| TC-25 | PG-05, PG-10 | Đúng `L+1` sản phẩm có tên chứa `iPhone`. `MaxPage=2` | `search=iPhone&page=1` | API | JSON có đủ `L+1` sản phẩm. `page=1` là `MaxPage-1` trong mô hình bước 3, nhưng FR-05 không chia trang. |
| TC-26 | PG-05, PG-09, PG-11 | Cùng precondition TC-25 | `search=iPhone&page=2` | API | JSON vẫn đủ `L+1` sản phẩm, không chỉ 1 sản phẩm. |

## Test case không hợp lệ

Mỗi dòng chỉ một dữ liệu sai.

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-27 | KW-IEC-01 | Seed | `search=` 3 dấu cách | UI | Empty state. Không hiện đủ 5 sản phẩm như từ khóa rỗng. Không lỗi. |
| TC-28 | KW-IEC-02 | Seed | `search=%` | UI | Empty state. `%` không được làm trả về mọi sản phẩm. Không lỗi SQL. Ký tự `%` hiện dạng text. |
| TC-29 | KW-IEC-03 | Seed | `search=_` | UI | Empty state. `_` không được khớp một ký tự bất kỳ trong tên. Không lỗi SQL. |
| TC-30 | KW-IEC-04 | Seed | `search='` | UI | Empty state. Không trả trang lỗi SQL. Dấu `'` hiện dạng text. |
| TC-31 | LEN-06 | Seed | `search=` chữ `a` lặp 256 lần | UI | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. |
| TC-32 | PRC-01, PR-IEC-01 | Seed | `search=iPhone&min_price=-1&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. `max_price` giữ mức chuẩn. |
| TC-33 | PRC-01, PR-IEC-01 | Seed | `search=iPhone&max_price=-1` | API | Cùng tập TC-01. Không gửi `min_price`, để không thêm lỗi đảo khoảng. |
| TC-34 | PRC-02, PR-IEC-02 | Seed | `search=iPhone&min_price=0&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-35 | PRC-02, PR-IEC-02 | Seed | `search=iPhone&max_price=0` | API | Cùng tập TC-01. Không gửi `min_price`. |
| TC-36 | PR-IEC-03 | Seed | `search=iPhone&min_price=abc&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-37 | PR-IEC-03 | Seed | `search=iPhone&min_price=4000000&max_price=abc` | API | Cùng tập TC-01. Chỉ `max_price` sai kiểu. |
| TC-38 | PR-IEC-04 | Seed | `search=iPhone&min_price=100@&max_price=45000000` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-39 | PR-IEC-04 | Seed | `search=iPhone&min_price=4000000&max_price=100@` | API | Cùng tập TC-01. Chỉ `max_price` sai kiểu. |
| TC-40 | PRC-12, PR-IEC-05 | Seed | `search=iPhone&min_price=45000001&max_price=45000000` | API | Cả hai giá đều dương. Chỉ quan hệ `min = max + 1` là sai. JSON vẫn chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-41 | CAT-IEC-01 | Seed | `search=iPhone&category=999` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-42 | CAT-IEC-02 | Seed | `search=iPhone&category=1&category=2` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-43 | SORT-IEC-01 | Seed | `search=iPhone&sort=price_asc` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-44 | PG-07 | Seed. N = 1 với từ khóa `iPhone` | `search=iPhone&page=0` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-45 | PG-06 | Seed | `search=iPhone&page=-1` | API | JSON chỉ có `iPhone 15 Pro Max`. Không lỗi. |
| TC-46 | PG-12 | Đúng `L+1` sản phẩm có tên chứa `iPhone`. `MaxPage=2` | `search=iPhone&page=3` | API | Không lỗi. JSON vẫn đủ `L+1` sản phẩm. `page=3` là `MaxPage+1`. |

## Ma trận phủ

| Mã | Test case |
| --- | --- |
| KW-VEC-01 .. 10 | TC-02, TC-01, TC-03, TC-01, TC-04, TC-05, TC-06, TC-07, TC-08, TC-09 |
| KW-IEC-01 .. 04 | TC-27 .. TC-30 |
| LEN-01 .. 06 | TC-08, TC-10, TC-11, TC-12, TC-13, TC-31 |
| PR-VEC-01, 02, 03 | TC-14, TC-14, TC-20 |
| PR-IEC-01 .. 05 | TC-32 và TC-33, TC-34 và TC-35, TC-36 và TC-37, TC-38 và TC-39, TC-40 |
| PRC-01 .. 12 | TC-32/33, TC-34/35, TC-15, TC-16, TC-14, TC-17, TC-18, TC-14, TC-19, TC-21, TC-20, TC-40 |
| CAT-VEC-01, CAT-IEC-01, CAT-IEC-02 | TC-22, TC-41, TC-42 |
| SORT-IEC-01 | TC-43 |
| PG-01 .. 12 | TC-03, TC-01, TC-23, TC-24, TC-25 và TC-26, TC-45, TC-44, TC-23, TC-26, TC-25, TC-24 và TC-26, TC-46 |

46 test case: 26 hợp lệ, 20 không hợp lệ.
