# FR-16 — Kết quả chạy test case

Chạy trên API `http://localhost:3000` và Admin `http://localhost:5174`. Script: `scripts/fr16-execute.mjs`.

Tổng: 24. PASS: 13. FAIL: 11. BLOCKED: 0.

## Các lệch đã thấy

- TC-03: mô tả có dấu phẩy trong ngoặc kép bị cắt thành `"Mo ta`. File vẫn được báo thành công.
- TC-12: token của `test@eshop.com` import được. HTTP 200, thêm `SP Import`.
- TC-13: file `hang.txt` vẫn được import.
- TC-14: header `ten,gia,mo_ta,image,danh_muc` vẫn được import.
- TC-15: dấu phẩy không có ngoặc kép cắt mô tả thành `Mo ta` và vẫn thêm sản phẩm. Không có báo lỗi.
- TC-17, TC-18, TC-19, TC-20: giá `-1`, `0`, `abc`, `100@` đều được thêm. Báo cáo là thành công.
- TC-21: tên dài 256 ký tự được thêm.
- TC-23: dòng đúng được thêm, dòng tên trống bị bỏ. Không rollback cả file. Báo `1/2`, lỗi `Hàng 3: Thiếu tên sản phẩm`.
- TC-01, TC-02, TC-04 đến TC-11, TC-16, TC-22, TC-24: PASS. File chuẩn thêm đúng sản phẩm. Tên 1, 2, 254, 255 ký tự và giá `1` được thêm. Khách chưa đăng nhập không import. API thiếu token trả 401, token sai trả 403. Tên trống không thêm sản phẩm và có báo lỗi. File chỉ có header không bật nút Import. Query `foo=1` không đổi kết quả import.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | PASS | Thêm đúng SP Import, giá 100000, mô tả và ảnh chuẩn, category 1. Seed còn nguyên. Báo 1 thành công, 0 lỗi. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-02 | PASS | Thêm SP Import A và SP Import B. Seed còn nguyên. Báo 2 thành công, 0 lỗi. | DB: SP Import A \| 100000 \| Mo ta san pham \| cat 1 ; SP Import B \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 2/2 sản phẩm được thêm. |
| TC-03 | FAIL | Mô tả đúng Mo ta, co phay. Báo 1 thành công, 0 lỗi. | DB: SP Import \| 100000 \| "Mo ta \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| "Mo ta \| cat 1. |
| TC-04 | PASS | Thêm một sản phẩm tên a. | DB: a \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-05 | PASS | Thêm một sản phẩm tên aa. | DB: aa \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-06 | PASS | Thêm một sản phẩm tên dài 254 ký tự. | DB: tên 254×a \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-07 | PASS | Thêm một sản phẩm tên dài 255 ký tự. | DB: tên 255×a \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-08 | PASS | Thêm một sản phẩm giá 1. Seed còn nguyên. | DB: SP Import \| 1 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-09 | PASS | Không thêm sản phẩm. Seed còn 5 dòng. | DB: (không thêm sản phẩm). Báo cáo: Trang yêu cầu đăng nhập. |
| TC-10 | PASS | Bị từ chối. Không thêm SP Import. | DB: (không thêm sản phẩm). Báo cáo: {"error":"Unauthorized"}. HTTP 401. |
| TC-11 | PASS | Bị từ chối. Không thêm SP Import. | DB: (không thêm sản phẩm). Báo cáo: {"error":"Forbidden"}. HTTP 403. |
| TC-12 | FAIL | Bị từ chối vì không phải admin. Không thêm SP Import. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: {"message":"Import hoàn tất: 1/1 sản phẩm được thêm","inserted":1,"errors":[]}. HTTP 200. Lệch: thêm: SP Import \| 100000 \| Mo ta san pham \| cat 1; HTTP 200 không từ chối. |
| TC-13 | FAIL | Từ chối vì đuôi không phải .csv. Không thêm sản phẩm. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| Mo ta san pham \| cat 1. |
| TC-14 | FAIL | Từ chối vì header sai. Không thêm sản phẩm. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| Mo ta san pham \| cat 1. |
| TC-15 | FAIL | Không thêm sản phẩm với mô tả bị cắt ở dấu phẩy. Có báo lỗi. | DB: SP Import \| 100000 \| Mo ta \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| Mo ta \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-16 | PASS | Không thêm sản phẩm. Báo lỗi tên. Seed còn nguyên. | DB: (không thêm sản phẩm). Báo cáo: ✅ Import hoàn tất: 0/1 sản phẩm được thêm Hàng 2: Thiếu tên sản phẩm. |
| TC-17 | FAIL | Không thêm sản phẩm. Báo lỗi giá. | DB: SP Import \| -1 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| -1 \| Mo ta san pham \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-18 | FAIL | Không thêm sản phẩm. Báo lỗi giá. | DB: SP Import \| 0 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 0 \| Mo ta san pham \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-19 | FAIL | Không thêm sản phẩm. Báo lỗi giá. | DB: SP Import \| abc \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| abc \| Mo ta san pham \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-20 | FAIL | Không thêm sản phẩm. Báo lỗi giá. | DB: SP Import \| 100@ \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100@ \| Mo ta san pham \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-21 | FAIL | Từ chối vì tên dài hơn 255. Không thêm sản phẩm. | DB: tên 256×a \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: tên 256×a \| 100000 \| Mo ta san pham \| cat 1. |
| TC-22 | PASS | Không thêm sản phẩm. Seed còn nguyên. | DB: (không thêm sản phẩm). Báo cáo: Nút Import tắt. |
| TC-23 | FAIL | Rollback cả file. Không có SP Import. Báo lỗi tên ở dòng 2. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/2 sản phẩm được thêm Hàng 3: Thiếu tên sản phẩm. Lệch: thêm: SP Import \| 100000 \| Mo ta san pham \| cat 1. |
| TC-24 | PASS | HTTP không phải lỗi. Thêm đúng SP Import. Seed còn nguyên. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: {"message":"Import hoàn tất: 1/1 sản phẩm được thêm","inserted":1,"errors":[]}. HTTP 200. |
