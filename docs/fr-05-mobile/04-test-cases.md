# FR-05 — Test cases (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Nguồn: miền ở `docs/fr-05-mobile/02-equivalence-partitioning.md` và biên ở `docs/fr-05-mobile/03-boundary-value-analysis.md`. Bộ web ở `docs/fr-05/` không bị sửa.

## Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: danh sách gồm mọi sản phẩm đang có.
- Từ khóa khác rỗng: chỉ sản phẩm có tên chứa đúng chuỗi đó. So khớp từng ký tự, có phân biệt hoa thường và dấu, vì FR-05 không yêu cầu quy về cùng dạng.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có empty state. Trang có đúng một `h1`. Ảnh có `alt` mô tả. Danh sách dạng lưới. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- Query không thuộc FR-05 không được đổi tập sản phẩm so với cùng từ khóa khi không gửi query đó, và không được trả lỗi.

## Cách rút số test case

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

## Quy trình

**UI.** Mở màn `home`. Thấy loading trước khi có danh sách. Gõ từ khóa, bấm **Tìm**. Chuỗi rỗng: mở màn và không gõ.

**API.** `GET http://localhost:3000/api/products` với query của test. Chỉ dùng khi test gửi tham số không có ô trên màn.

## Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | KW-VEC-02, KW-VEC-04 | Seed | `search=iPhone` | UI | Chỉ `iPhone 15 Pro Max`, giá `30.000.000 ₫`. Ảnh có alt mô tả. Danh sách dạng lưới. Đúng một `h1`. Có loading. Chữ `iPhone` hiện dạng text. |
| TC-02 | KW-VEC-01 | Seed | `search=iPhone 15 Pro Max` | UI | Chỉ đúng một sản phẩm `iPhone 15 Pro Max`. |
| TC-03 | KW-VEC-03 | Seed | `search=zzzz-khong-co` | UI | Có empty state. Không hiện năm sản phẩm seed. |
| TC-04 | KW-VEC-05 | Seed | `search=iphone` | UI | Empty state. `iPhone 15 Pro Max` không được trả về chỉ vì khác hoa thường. |
| TC-05 | KW-VEC-06 | Seed, tên `Bàn phím cơ Keychron Q1` còn trong DB | `search=CƠ` | UI | Empty state. Sản phẩm đó không được trả về chỉ vì khác hoa thường ở chữ `ơ`. |
| TC-06 | KW-VEC-07 | Seed | `search=Bàn phím` | UI | Chỉ `Bàn phím cơ Keychron Q1`, giá `4.000.000 ₫`. |
| TC-07 | KW-VEC-08 | Seed | `search=Ban phim` | UI | Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu. |
| TC-08 | KW-VEC-09, LEN-B-01, SP-B-01 | Seed | `search=""` | UI | Đủ 5 sản phẩm seed. Giá lần lượt `30.000.000 ₫`, `28.000.000 ₫`, `45.000.000 ₫`, `6.000.000 ₫`, `4.000.000 ₫`. |
| TC-09 | KW-VEC-10 | Seed | `search=<script>` | UI | Empty state. Trang hiện đúng các ký tự `<script>`, không chạy script. |
| TC-10 | LEN-B-02 | Seed | `search=a` (1 ký tự) | UI | Có `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2`, vì các tên này chứa chữ `a`. Không có `Bàn phím cơ Keychron Q1`. |
| TC-11 | LEN-B-03 | Seed | `search=aa` (2 ký tự) | UI | Empty state. Không tên seed nào chứa `aa`. |
| TC-12 | LEN-B-04 | Seed | `search=` chữ `a` lặp 254 lần | UI | Empty state. Không lỗi. |
| TC-13 | LEN-B-05 | Seed | `search=` chữ `a` lặp 255 lần | UI | Empty state. Không lỗi. |
| TC-14 | Query thừa | Seed | `search=iPhone&foo=1` | API | HTTP không phải lỗi. JSON chỉ có `iPhone 15 Pro Max`, giống TC-01 khi không gửi `foo`. |

## Test case không hợp lệ

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

## Ma trận phủ

| Mã | Test case |
| --- | --- |
| KW-VEC-01 .. 10 | TC-02, TC-01, TC-03, TC-01, TC-04, TC-05, TC-06, TC-07, TC-08, TC-09 |
| KW-IEC-01 .. 07 | TC-15 và TC-16, TC-17, TC-18, TC-19, TC-20, TC-21, TC-22 |
| LEN-B-01 .. 06 | TC-08, TC-10, TC-11, TC-12, TC-13, TC-23 |
| SP-B-01 .. 03 | TC-08, TC-15, TC-16 |

23 test case: 14 hợp lệ, 9 không hợp lệ. Chưa chạy.
