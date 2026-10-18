# FR-05 — Test cases (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Nguồn: miền ở `docs/fr-05-mobile/02-equivalence-partitioning.md` và biên ở `docs/fr-05-mobile/03-boundary-value-analysis.md`. Bộ web ở `docs/fr-05/` không bị sửa.

## Oracle

Expected result bám README, không bám code.

- Từ khóa rỗng: danh sách gồm mọi sản phẩm đang có.
- Tìm theo tên; chính sách hoa thường và bỏ dấu chưa được spec chốt. Không tự bắt buộc phân biệt hoặc không phân biệt.
- Từ khóa hiện thành chữ, không chạy HTML.
- Có trạng thái loading khi đang tải. Hết kết quả thì có empty state. Giá dùng `₫` và dấu phân cách hàng nghìn, ví dụ `30.000.000 ₫`.
- Không chấm `h1`, `alt` và số cột trên mobile. App mobile không có thẻ `h1`. Khi chạy bằng `react-native-web`, thư viện tự sinh `<img alt="">`. README không nêu số cột trên mobile. Các mục này chỉ chấm ở bộ web `docs/fr-05/`.
- TC-15 và TC-16 là BLOCKED khi chạy trên Chrome: trình duyệt cắt dấu cách cuối URL nên app gửi `search=` rỗng. Chỉ thiết bị thật hoặc Expo Go mới biết app gửi gì.
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

## Ký tự đặc biệt và kiểm tra độ bền (không mặc nhiên là input invalid)

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
| CAT-VEC-01, CAT-B-01 | TC-24 |
| CAT-B-02 | TC-25 |
| CAT-B-03 | TC-26 |
| VIEW-VEC-01, VIEW-VEC-03 | TC-27, TC-28 |
| VIEW-VEC-02 | TC-01..TC-26 (mọi test chạy ở 390 px) |

Phủ điểm on/off/in/out (bước 3, phần A): A.1 → TC-10 (on), TC-08 (off/out), TC-01 (in). A.2 → TC-25 (on), TC-24 (off/out), TC-08 (in).

## Test case riêng của mobile

Precondition số sản phẩm đặt trực tiếp bảng `products` (giữ `N` dòng đầu của seed theo id) và khôi phục seed sau test. Độ rộng màn đặt bằng viewport của trình duyệt chạy Expo web.

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-24 | CAT-VEC-01, CAT-B-01 | `products` rỗng | Mở màn `home`, không gõ | UI | Không có sản phẩm. Có trang trống với icon/hình minh họa và message (FR-24). |
| TC-25 | CAT-B-02 | Chỉ còn `iPhone 15 Pro Max` | Mở màn `home` | UI | Đúng 1 sản phẩm `iPhone 15 Pro Max`, giá `30.000.000 ₫`. |
| TC-26 | CAT-B-03 | Còn `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra` | Mở màn `home` | UI | Đúng 2 sản phẩm đó. |
| TC-27 | VIEW-VEC-01 | Seed | Màn 320 px, mở `home` | UI | Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị đẩy ra ngoài màn. |
| TC-28 | VIEW-VEC-03 | Seed | Màn 768 px, mở `home` | UI | Như TC-27. |

## Tổng hợp

28 test case: 27 test chức năng và 1 kiểm tra bổ sung query thừa (TC-14). Kết quả chạy ở `05-execution-results.md`.
