# FR-05 mobile — Kết quả chạy test case

Hai lượt chạy. Lượt mới nhất là Android emulator (Expo Go), không còn BLOCKED vì Chrome cắt dấu cách.

## Lượt 2 — Android emulator + Expo Go (18/10/2026, UTC+7)

Thiết bị: AVD `Medium_Phone`, Android 17, Expo Go 54.0.8, gói `host.exp.exponent`.
API: `http://10.0.2.2:3000` (host của emulator). Script: `scripts/fr05-mobile-native-execute.py`.
App gốc gọi `http://192.168.10.13:3000`; máy này là `192.168.2.24` nên chỉ đổi host lúc chạy, không đổi cách ghép query `search=${query}`.

Tổng: 28. PASS: 11. FAIL: 17. BLOCKED: 0.

Trong đó TC-14 là kiểm tra bổ sung query thừa, không tính vào coverage chức năng.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | PASS | Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Có loading. Chữ iPhone hiện dạng text. | iPhone 15 Pro Max Viewport 1080px. Request: /api/products?search=iPhone. |
| TC-02 | PASS | Chỉ đúng một sản phẩm iPhone 15 Pro Max. | iPhone 15 Pro Max Viewport 1080px. Request: /api/products?search=iPhone%2015%20Pro%20Max. |
| TC-03 | FAIL | Có empty state. Không hiện năm sản phẩm seed. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=zzzz-khong-co. Lệch: không có câu empty state; không có icon empty state. |
| TC-04 | PASS | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | iPhone 15 Pro Max Viewport 1080px. Request: /api/products?search=iphone. |
| TC-05 | FAIL | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=C%C6%A0. Lệch: thiếu empty state. |
| TC-06 | PASS | Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫. | Bàn phím cơ Keychron Q1 Viewport 1080px. Request: /api/products?search=B%C3%A0n%20ph%C3%ADm. |
| TC-07 | FAIL | Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=Ban%20phim. Lệch: thiếu empty state. |
| TC-08 | PASS | Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 1080px. |
| TC-09 | FAIL | Empty state. Trang hiện đúng các ký tự <script>, không chạy script. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=%3Cscript%3E. Lệch: không có câu empty state; không có icon empty state. |
| TC-10 | PASS | Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 1080px. Request: /api/products?search=a. |
| TC-11 | FAIL | Empty state. Không tên seed nào chứa aa. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=aa. Lệch: không có câu empty state; không có icon empty state. |
| TC-12 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-13 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-14 | PASS | HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo. | HTTP 200. iPhone 15 Pro Max |
| TC-15 | FAIL | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 1080px. Request: /api/products?search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-16 | FAIL | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 1080px. Request: /api/products?search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-17 | FAIL | Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 1080px. Request: /api/products?search=%. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-18 | FAIL | Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 1080px. Request: /api/products?search=_. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-19 | FAIL | Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=%27. Lỗi: 12:19 EShop Mobile Đăng nhập Giỏ (0) Danh sách sản phẩm ' Tìm <h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p> © 2026 EShop SUT. Dành cho mục đích kiểm thử. 12:1. Lệch: không có câu empty state; không có icon empty state; trang lỗi SQL; thân là lỗi SQL. |
| TC-20 | FAIL | Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 1080px. Request: /api/products?search=a&b. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; vẫn thấy iPhone 15 Pro Max; vẫn thấy Samsung Galaxy S24 Ultra; vẫn thấy MacBook Pro M3; vẫn thấy Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-21 | FAIL | Empty state. Tìm cả chuỗi a#b. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Viewport 1080px. Request: /api/products?search=a. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-22 | FAIL | Empty state. Tìm cả chuỗi a?b. Không lỗi. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=a?b. Lệch: không có câu empty state; không có icon empty state. |
| TC-23 | FAIL | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. | (không có sản phẩm) Viewport 1080px. Request: /api/products?search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-24 | FAIL | CSDL 0 sản phẩm. Màn home không có sản phẩm và có empty state (icon/hình minh họa và message). | (không có sản phẩm) Viewport 1080px. Lệch: không có câu empty state; không có icon empty state. |
| TC-25 | PASS | CSDL 1 sản phẩm. Danh sách có đúng iPhone 15 Pro Max, giá 30.000.000 ₫. | iPhone 15 Pro Max Viewport 1080px. |
| TC-26 | PASS | CSDL 2 sản phẩm. Danh sách có đúng iPhone 15 Pro Max và Samsung Galaxy S24 Ultra. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra Viewport 1080px. |
| TC-27 | PASS | Màn 320px (điện thoại nhỏ). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 320px. |
| TC-28 | PASS | Màn 768px (tablet). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Viewport 768px. |

Ảnh native: `docs/bugs/fr05-mobile-native-TC-24.png` đến `TC-28.png`.

TC-15 và TC-16 không còn BLOCKED. Ô tìm giữ dấu cách (dòng "Kết quả tìm kiếm cho:" có dấu cách), nhưng request tới server là `search=` rỗng vì app ghép `search=${query}` không encode. Danh sách trả về đủ sản phẩm seed, giống từ khóa rỗng.

TC-08, TC-24, TC-25, TC-26, TC-27, TC-28 mở lại app bằng force-stop rồi vào `exp://127.0.0.1:8081`, đợi request `/api/products` mới, rồi mới đọc màn hình.

## Lượt 1 — Expo web (giữ để đối chiếu)

Chạy trên `http://127.0.0.1:8081` bằng `scripts/fr05-mobile-execute.mjs`. TC-15 và TC-16 BLOCKED vì Chrome cắt dấu cách cuối URL.

