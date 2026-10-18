# FR-05 mobile — Kết quả chạy test case

Chạy trên app mobile web `http://127.0.0.1:8081` và API `http://127.0.0.1:3000`. Script: `scripts/fr05-mobile-execute.mjs`.

App đang gọi `http://192.168.10.13:3000`. Máy này không mở được địa chỉ đó. Script chuyển host sang API local và giữ query do app tạo. Script thêm 0,5 giây vào mỗi lần gọi `/api/products` để thấy chữ "Đang tải...".

Đây là app React Native chạy bằng `react-native-web` trong Chrome, không phải iOS hay Android thật. Vì vậy `h1`, `alt` và số cột không được chấm: app mobile không có thẻ `h1`, `react-native-web` tự sinh `<img alt="">`, và README không nêu số cột trên mobile.

Tổng: 28. PASS: 11. FAIL: 15. BLOCKED: 2.

Trong đó TC-14 là kiểm tra bổ sung query thừa, không tính vào coverage chức năng.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | PASS | Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Có loading. Chữ iPhone hiện dạng text. | iPhone 15 Pro Max Viewport 390px, scrollWidth 390. Request: search=iPhone. |
| TC-02 | PASS | Chỉ đúng một sản phẩm iPhone 15 Pro Max. | iPhone 15 Pro Max Viewport 390px, scrollWidth 390. Request: search=iPhone%2015%20Pro%20Max. |
| TC-03 | FAIL | Có empty state. Không hiện năm sản phẩm seed. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=zzzz-khong-co. Lệch: không có câu empty state; không có icon empty state. |
| TC-04 | PASS | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | iPhone 15 Pro Max Viewport 390px, scrollWidth 390. Request: search=iphone. |
| TC-05 | FAIL | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=C%C6%A0. Lệch: thiếu empty state. |
| TC-06 | PASS | Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫. | Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. Request: search=B%C3%A0n%20ph%C3%ADm. |
| TC-07 | FAIL | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=Ban%20phim. Lệch: thiếu empty state. |
| TC-08 | PASS | Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. |
| TC-09 | FAIL | Empty state. Trang hiện đúng các ký tự <script>, không chạy script. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=%3Cscript%3E. Lệch: không có câu empty state; không có icon empty state. |
| TC-10 | PASS | Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 390px, scrollWidth 390. Request: search=a. |
| TC-11 | FAIL | Empty state. Không tên seed nào chứa aa. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=aa. Lệch: không có câu empty state; không có icon empty state. |
| TC-12 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-13 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-14 | PASS | HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo. | HTTP 200. iPhone 15 Pro Max |
| TC-15 | BLOCKED | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. Không chấm. Chrome cắt dấu cách cuối URL trước khi gửi nên request thành search= rỗng. Chưa biết app trên iOS/Android gửi gì. Cần thiết bị thật hoặc Expo Go. |
| TC-16 | BLOCKED | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. Không chấm. Chrome cắt dấu cách cuối URL trước khi gửi nên request thành search= rỗng. Chưa biết app trên iOS/Android gửi gì. Cần thiết bị thật hoặc Expo Go. |
| TC-17 | FAIL | Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. Request: search=%. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-18 | FAIL | Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 390px, scrollWidth 390. Request: search=_. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-19 | FAIL | Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=%27. Lỗi: EShop Mobile Đăng nhập Giỏ (0) Danh sách sản phẩm Tìm <h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p> © 2026 EShop SUT. Dành cho mục đích kiểm thử.. Lệch: không có câu empty state; không có icon empty state; trang lỗi SQL; thân là lỗi SQL. |
| TC-20 | FAIL | Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 390px, scrollWidth 390. Request: search=a&b. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; vẫn thấy iPhone 15 Pro Max; vẫn thấy Samsung Galaxy S24 Ultra; vẫn thấy MacBook Pro M3; vẫn thấy Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-21 | FAIL | Empty state. Tìm cả chuỗi a#b. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 390px, scrollWidth 390. Request: search=a. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-22 | FAIL | Empty state. Tìm cả chuỗi a?b. Không lỗi. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=a?b. Lệch: không có câu empty state; không có icon empty state. |
| TC-23 | FAIL | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. | (không có sản phẩm) Viewport 390px, scrollWidth 390. Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-24 | FAIL | CSDL 0 sản phẩm. Màn home không có sản phẩm và có empty state (icon/hình minh họa và message). | (không có sản phẩm) Viewport 390px, scrollWidth 390. Lệch: không có câu empty state; không có icon empty state. |
| TC-25 | PASS | CSDL 1 sản phẩm. Danh sách có đúng iPhone 15 Pro Max, giá 30.000.000 ₫. | iPhone 15 Pro Max Viewport 390px, scrollWidth 390. |
| TC-26 | PASS | CSDL 2 sản phẩm. Danh sách có đúng iPhone 15 Pro Max và Samsung Galaxy S24 Ultra. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra Viewport 390px, scrollWidth 390. |
| TC-27 | PASS | Màn 320px (điện thoại nhỏ). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 320px, scrollWidth 320. |
| TC-28 | PASS | Màn 768px (tablet). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 768px, scrollWidth 768. |
## Tóm tắt lệch

- Thiếu empty state (BUG-21): TC-03, 05, 07, 09, 11, 12, 13, 22, 23 khi tìm không ra kết quả, và TC-24 khi CSDL không có sản phẩm nào. Ảnh TC-24: `docs/bugs/fr05-mobile-TC-24.png`.
- `&` và `#` cắt từ khóa (BUG-22): TC-20, TC-21. `?` (TC-22) không cắt, chỉ fail vì thiếu empty state.
- `%`, `_` khớp mọi sản phẩm (TC-17, 18) và `'` gây trang lỗi SQL (TC-19). Cùng nguyên nhân ở backend với BUG-08 và BUG-09 của bộ web.
- TC-15, 16 BLOCKED: Chrome cắt dấu cách cuối URL, chưa có thiết bị native để biết app gửi gì.
- PASS: tìm theo tên, hoa thường/dấu khi có kết quả, giá `₫`, số sản phẩm 1 và 2 (TC-25, 26), màn 320 px và 768 px không tràn ngang, tên và giá nằm trong màn (TC-27, 28). Ảnh: `docs/bugs/fr05-mobile-TC-25.png` đến `TC-28.png`.

Lượt chạy ngày 18/10/2026 (UTC+7) trên Expo web. Kết quả chưa thay cho chạy trên Android/iOS.
