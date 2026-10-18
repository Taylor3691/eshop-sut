# FR-16 — Test cases

Nguồn: miền ở `docs/fr-16/02-equivalence-partitioning.md` và biên ở `docs/fr-16/03-boundary-value-analysis.md`.

## Oracle

Expected result bám README, không bám code.

- Chỉ admin import được. API admin cần JWT hợp lệ và `role = admin`.
- File phải có đuôi `.csv`. Dòng đầu phải là `name,price,description,imageUrl,category_id`.
- Trường có dấu phẩy phải nằm trong nháy kép và được đọc thành một trường.
- `name` không rỗng. `price` là số dương, có thể có phần thập phân. Giới hạn 255 của FR-15 chưa xác nhận áp dụng cho FR-16.
- Mọi dòng hợp lệ thì được thêm. Một dòng lỗi thì rollback cả file: không thêm dòng nào của file đó. Năm sản phẩm seed giữ nguyên.
- Báo cáo ghi số dòng thành công, số dòng lỗi và lý do.
- Query không thuộc API. Gửi thêm query không được đổi kết quả so với cùng body khi không gửi, và không được trả lỗi.

## Cách rút số test case

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

## Quy trình

**UI.** Đăng nhập admin tại `http://localhost:5174`. Mở tab Sản phẩm. Chọn file. Bấm Import. TC-09 không đăng nhập.

**API.** `POST http://localhost:3000/api/admin/import-products` với body `{ "products": [ ... ] }`. Dùng khi test đụng header hoặc query mà ô file không thể hiện.

## Test case hợp lệ

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

## Test case không hợp lệ

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

## Phủ

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

## Bổ sung sau review ngày 18/10/2026

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
