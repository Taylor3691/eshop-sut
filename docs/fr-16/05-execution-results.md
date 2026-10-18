# FR-16 — Kết quả chạy test case

Chạy trên API `http://localhost:3000` và Admin `http://localhost:5174`. Script: `scripts/fr16-execute.mjs`.

Tổng: 30. PASS: 17. FAIL: 13. BLOCKED: 0.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | PASS | Thêm đúng SP Import, giá 100000, mô tả và ảnh chuẩn, category 1. Seed còn nguyên. Báo 1 thành công, 0 lỗi. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-02 | PASS | Thêm SP Import A và SP Import B. Seed còn nguyên. Báo 2 thành công, 0 lỗi. | DB: SP Import A \| 100000 \| Mo ta san pham \| cat 1 ; SP Import B \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 2/2 sản phẩm được thêm. |
| TC-03 | FAIL | Mô tả đúng Mo ta, co phay. Báo 1 thành công, 0 lỗi. | DB: SP Import \| 100000 \| "Mo ta \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| "Mo ta \| cat 1. |
| TC-04 | PASS | Thêm một sản phẩm tên a. | DB: a \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-05 | PASS | Thêm một sản phẩm tên aa. | DB: aa \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-06 | PASS | Thêm một sản phẩm tên dài 254 ký tự. | DB: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-07 | PASS | Thêm một sản phẩm tên dài 255 ký tự. | DB: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-08 | PASS | Thêm một sản phẩm giá 1. Seed còn nguyên. | DB: SP Import \| 1 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-09 | PASS | Không thêm sản phẩm. Seed còn 5 dòng. | DB: (không thêm sản phẩm). Báo cáo: Trang yêu cầu đăng nhập.. |
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
| TC-22 | PASS | Không thêm sản phẩm. Seed còn nguyên. | DB: (không thêm sản phẩm). Báo cáo: Nút Import tắt.. |
| TC-23 | FAIL | Rollback cả file. Không có SP Import. Báo lỗi tên ở dòng 2. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/2 sản phẩm được thêm Hàng 3: Thiếu tên sản phẩm. Lệch: thêm: SP Import \| 100000 \| Mo ta san pham \| cat 1. |
| TC-24 | PASS | HTTP không phải lỗi. Thêm đúng SP Import. Seed còn nguyên. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: {"message":"Import hoàn tất: 1/1 sản phẩm được thêm","inserted":1,"errors":[]}. HTTP 200. |
| TC-25 | FAIL | Đọc nháy kép escape thành ký tự nháy kép, mô tả đúng Mo ta "dep". | DB: SP Import \| 100000 \| "Mo ta ""dep""" \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| "Mo ta ""dep""" \| cat 1. |
| TC-26 | FAIL | Một sản phẩm, mô tả chứa xuống dòng trong trường nháy kép. | DB: SP Import \| 100000 \| "Dong 1 \| cat 1 ; Dong 2" \| https://placehold.co/300 \| 1 \| cat 1. Báo cáo: ✅ Import hoàn tất: 2/2 sản phẩm được thêm. Lệch: thêm: SP Import \| 100000 \| "Dong 1 \| cat 1 ; Dong 2" \| https://placehold.co/300 \| 1 \| cat 1. |
| TC-27 | PASS | CSV CRLF thêm đúng một sản phẩm và category 1. | DB: SP Import \| 100000 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-28 | PASS | Tên chỉ dấu cách không phải tên có nội dung: từ chối, không thêm sản phẩm (giả định cần xác nhận). | DB: (không thêm sản phẩm). Báo cáo: ✅ Import hoàn tất: 0/1 sản phẩm được thêm Hàng 2: Thiếu tên sản phẩm. |
| TC-29 | PASS | Giá 1.5 là số dương, được thêm và giữ nguyên giá trị. | DB: SP Import \| 1.5 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-30 | PASS | Giá dương 0.01 được thêm và giữ nguyên giá trị. | DB: SP Import \| 0.01 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
| TC-31 | FAIL | Giá âm -0.01 bị từ chối, không thêm sản phẩm. | DB: SP Import \| -0.01 \| Mo ta san pham \| cat 1. Báo cáo: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. Lệch: thêm: SP Import \| -0.01 \| Mo ta san pham \| cat 1; không thấy báo lỗi: ✅ Import hoàn tất: 1/1 sản phẩm được thêm. |
## Tóm tắt lệch và bằng chứng

- TC-12: token của user thường vẫn import được (HTTP 200), vi phạm FR-12/SEC-03 (BUG-15).
- TC-13, TC-14: file `.txt` và header sai vẫn được import (BUG-16, BUG-17).
- TC-03, TC-15, TC-25, TC-26: trình đọc CSV không theo RFC 4180 (BUG-14). Ảnh `docs/bugs/review-fr16-TC-03.png` và `review-fr16-TC-25.png` là trang chi tiết sản phẩm sau import, thấy mô tả bị cắt hoặc còn nháy kép thừa. Ảnh `review-fr16-TC-26.png` là bảng sản phẩm admin: một dòng CSV có xuống dòng trong nháy kép bị tách thành hai sản phẩm (`SP Import` và `Dong 2"`).
- TC-17..20, TC-31: giá âm, 0, chữ, ký tự đặc biệt và -0.01 đều được nhận (BUG-18). Ảnh `review-fr16-TC-31.png` thấy dòng `SP Import` giá `-0.01 ₫` trong bảng admin.
- TC-23: một dòng lỗi không rollback cả file, dòng hợp lệ vẫn được thêm (BUG-20).
- Các test còn lại PASS, gồm CRLF (TC-27), giá thập phân dương (TC-29, TC-30) và tên chỉ có dấu cách bị từ chối (TC-28, giả định trim).

Viền đỏ và khung chú thích màu vàng trong ảnh bảng admin do script kiểm thử chèn để chỉ dòng mới; không đổi dữ liệu trang. Lượt chạy ngày 18/10/2026 (UTC+7).
