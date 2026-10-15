# FR-05 mobile — Kết quả chạy test case

Chạy trên app mobile web `http://127.0.0.1:8081` và API `http://127.0.0.1:3000`. Script: `scripts/fr05-mobile-execute.mjs`.

App đang gọi `http://192.168.10.13:3000`. Máy này không mở được địa chỉ đó. Script chuyển host sang API local và giữ query do app tạo.

Tổng: 23. PASS: 5. FAIL: 18. BLOCKED: 0.

## Các lệch đã thấy

- TC-01: đúng một sản phẩm `iPhone 15 Pro Max`, có loading, giá dùng `₫`. `alt` rỗng. Không có `h1`. Các thẻ xếp một cột.
- TC-03, TC-05, TC-07, TC-09, TC-11, TC-12, TC-13, TC-22, TC-23: không còn sản phẩm, nhưng không có câu empty state và không có icon. TC-09 vẫn hiện chữ `<script>` và không chạy script.
- TC-04: gõ `iphone` vẫn ra `iPhone 15 Pro Max`.
- TC-15, TC-16: ô chỉ có dấu cách nhưng request thành `search=` rỗng. Hiện đủ 5 sản phẩm.
- TC-17: `%` trả cả 5 sản phẩm.
- TC-18: `_` trả cả 5 sản phẩm.
- TC-19: dấu `'` hiện khối `SQLITE_ERROR: unrecognized token: "'"`.
- TC-20: chuỗi `a&b` bị cắt, request là `search=a&b`, ra các sản phẩm có chữ `a`.
- TC-21: chuỗi `a#b` bị cắt, request chỉ còn `search=a`.
- TC-02, TC-06, TC-08, TC-10, TC-14: PASS. TC-10 có `iPhone 15 Pro Max` vì tên chứa chữ `a` trong `Max`.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | FAIL | Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Ảnh có alt mô tả. Danh sách dạng lưới. Đúng một h1. Có loading. Chữ iPhone hiện dạng text. | iPhone 15 Pro Max h1 (0). Request: search=iPhone. Lệch: alt: [""]; h1 (0); các thẻ xếp một cột. |
| TC-02 | PASS | Chỉ đúng một sản phẩm iPhone 15 Pro Max. | iPhone 15 Pro Max h1 (0). Request: search=iPhone%2015%20Pro%20Max. |
| TC-03 | FAIL | Có empty state. Không hiện năm sản phẩm seed. | (không có sản phẩm) h1 (0). Request: search=zzzz-khong-co. Lệch: không có câu empty state; không có icon empty state. |
| TC-04 | FAIL | Empty state. iPhone 15 Pro Max không được trả về chỉ vì khác hoa thường. | iPhone 15 Pro Max h1 (0). Request: search=iphone. Lệch: sản phẩm: iPhone 15 Pro Max; vẫn thấy iPhone 15 Pro Max; không có câu empty state; không có icon empty state. |
| TC-05 | FAIL | Empty state. Bàn phím cơ Keychron Q1 không được trả về chỉ vì khác hoa thường ở chữ ơ. | (không có sản phẩm) h1 (0). Request: search=C%C6%A0. Lệch: không có câu empty state; không có icon empty state. |
| TC-06 | PASS | Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫. | Bàn phím cơ Keychron Q1 h1 (0). Request: search=B%C3%A0n%20ph%C3%ADm. |
| TC-07 | FAIL | Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu. | (không có sản phẩm) h1 (0). Request: search=Ban%20phim. Lệch: không có câu empty state; không có icon empty state. |
| TC-08 | PASS | Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 h1 (0). |
| TC-09 | FAIL | Empty state. Trang hiện đúng các ký tự <script>, không chạy script. | (không có sản phẩm) h1 (0). Request: search=%3Cscript%3E. Lệch: không có câu empty state; không có icon empty state. |
| TC-10 | PASS | Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 h1 (0). Request: search=a. |
| TC-11 | FAIL | Empty state. Không tên seed nào chứa aa. | (không có sản phẩm) h1 (0). Request: search=aa. Lệch: không có câu empty state; không có icon empty state. |
| TC-12 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) h1 (0). Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-13 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) h1 (0). Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-14 | PASS | HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo. | HTTP 200. iPhone 15 Pro Max |
| TC-15 | FAIL | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 h1 (0). Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-16 | FAIL | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 h1 (0). Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-17 | FAIL | Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 h1 (0). Request: search=%. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-18 | FAIL | Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 h1 (0). Request: search=_. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-19 | FAIL | Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text. | (không có sản phẩm) h1 (0). Request: search=%27. Lỗi: EShop Mobile Đăng nhập Giỏ (0) Danh sách sản phẩm Tìm <h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p> © 2026 EShop SUT. Dành cho mục đích kiểm thử.. Lệch: không có câu empty state; không có icon empty state; trang lỗi SQL; thân là lỗi SQL. |
| TC-20 | FAIL | Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 h1 (0). Request: search=a&b. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; vẫn thấy iPhone 15 Pro Max; vẫn thấy Samsung Galaxy S24 Ultra; vẫn thấy MacBook Pro M3; vẫn thấy Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-21 | FAIL | Empty state. Tìm cả chuỗi a#b. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 h1 (0). Request: search=a. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-22 | FAIL | Empty state. Tìm cả chuỗi a?b. Không lỗi. | (không có sản phẩm) h1 (0). Request: search=a?b. Lệch: không có câu empty state; không có icon empty state. |
| TC-23 | FAIL | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. | (không có sản phẩm) h1 (0). Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
