# FR-05 mobile — Kết quả chạy test case

Chạy trên app mobile web `http://127.0.0.1:8081` và API `http://127.0.0.1:3000`. Script: `scripts/fr05-mobile-execute.mjs`.

App đang gọi `http://192.168.10.13:3000`. Máy này không mở được địa chỉ đó. Script chuyển host sang API local và giữ query do app tạo. Script thêm 0,5 giây vào mỗi lần gọi `/api/products` để thấy chữ "Đang tải...".

Đây là app React Native chạy bằng `react-native-web` trong Chrome, không phải iOS hay Android thật. Vì vậy `h1`, `alt` và số cột không được chấm: app mobile không có thẻ `h1`, `react-native-web` tự sinh `<img alt="">`, và README không nêu số cột trên mobile.

Tổng: 23. PASS: 6. FAIL: 15. BLOCKED: 2.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | PASS | Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Có loading. Chữ iPhone hiện dạng text. | iPhone 15 Pro Max Request: search=iPhone. |
| TC-02 | PASS | Chỉ đúng một sản phẩm iPhone 15 Pro Max. | iPhone 15 Pro Max Request: search=iPhone%2015%20Pro%20Max. |
| TC-03 | FAIL | Có empty state. Không hiện năm sản phẩm seed. | (không có sản phẩm) Request: search=zzzz-khong-co. Lệch: không có câu empty state; không có icon empty state. |
| TC-04 | FAIL | Empty state. iPhone 15 Pro Max không được trả về chỉ vì khác hoa thường. | iPhone 15 Pro Max Request: search=iphone. Lệch: sản phẩm: iPhone 15 Pro Max; vẫn thấy iPhone 15 Pro Max; không có câu empty state; không có icon empty state. |
| TC-05 | FAIL | Empty state. Bàn phím cơ Keychron Q1 không được trả về chỉ vì khác hoa thường ở chữ ơ. | (không có sản phẩm) Request: search=C%C6%A0. Lệch: không có câu empty state; không có icon empty state. |
| TC-06 | PASS | Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫. | Bàn phím cơ Keychron Q1 Request: search=B%C3%A0n%20ph%C3%ADm. |
| TC-07 | FAIL | Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu. | (không có sản phẩm) Request: search=Ban%20phim. Lệch: không có câu empty state; không có icon empty state. |
| TC-08 | PASS | Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 |
| TC-09 | FAIL | Empty state. Trang hiện đúng các ký tự <script>, không chạy script. | (không có sản phẩm) Request: search=%3Cscript%3E. Lệch: không có câu empty state; không có icon empty state. |
| TC-10 | PASS | Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Request: search=a. |
| TC-11 | FAIL | Empty state. Không tên seed nào chứa aa. | (không có sản phẩm) Request: search=aa. Lệch: không có câu empty state; không có icon empty state. |
| TC-12 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-13 | FAIL | Empty state. Không lỗi. | (không có sản phẩm) Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |
| TC-14 | PASS | HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo. | HTTP 200. iPhone 15 Pro Max |
| TC-15 | BLOCKED | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. Không chấm. Chrome cắt dấu cách cuối URL trước khi gửi nên request thành search= rỗng. Chưa biết app trên iOS/Android gửi gì. Cần thiết bị thật hoặc Expo Go. |
| TC-16 | BLOCKED | Empty state. Không hiện đủ 5 sản phẩm. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Request: search=. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. Không chấm. Chrome cắt dấu cách cuối URL trước khi gửi nên request thành search= rỗng. Chưa biết app trên iOS/Android gửi gì. Cần thiết bị thật hoặc Expo Go. |
| TC-17 | FAIL | Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Request: search=%. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-18 | FAIL | Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1 Request: search=_. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1; không có câu empty state; không có icon empty state. |
| TC-19 | FAIL | Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text. | (không có sản phẩm) Request: search=%27. Lỗi: EShop Mobile Đăng nhập Giỏ (0) Danh sách sản phẩm Tìm <h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p> © 2026 EShop SUT. Dành cho mục đích kiểm thử.. Lệch: không có câu empty state; không có icon empty state; trang lỗi SQL; thân là lỗi SQL. |
| TC-20 | FAIL | Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Request: search=a&b. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; vẫn thấy iPhone 15 Pro Max; vẫn thấy Samsung Galaxy S24 Ultra; vẫn thấy MacBook Pro M3; vẫn thấy Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-21 | FAIL | Empty state. Tìm cả chuỗi a#b. Không lỗi. | iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2 Request: search=a. Lệch: sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; không có câu empty state; không có icon empty state. |
| TC-22 | FAIL | Empty state. Tìm cả chuỗi a?b. Không lỗi. | (không có sản phẩm) Request: search=a?b. Lệch: không có câu empty state; không có icon empty state. |
| TC-23 | FAIL | Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text. | (không có sản phẩm) Request: search=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Lệch: không có câu empty state; không có icon empty state. |

## Các lệch đã thấy

15 FAIL không phải 15 lỗi. Gom theo nguyên nhân:

| Nhóm | TC | Nguyên nhân | Chắc chắn là lỗi app? |
| --- | --- | --- | --- |
| Không có empty state | TC-03, 05, 07, 09, 11, 12, 13, 22, 23 | `App.js` không có câu hay icon khi danh sách rỗng. Chín test chỉ fail vì lỗi này. | Có. README yêu cầu empty state. |
| `%` và `_` là ký tự đại diện | TC-17, TC-18 | API đưa thẳng vào `LIKE`. Giống BUG-10 trên web. | Có |
| Dấu nháy làm lỗi SQL | TC-19 | API trả HTML `Database Error`, app hiện nguyên chuỗi đó. Giống BUG-11 trên web. | Có |
| `&` và `#` làm cụt từ khóa | TC-20, TC-21 | App nối `search=${query}` không mã hóa. Từ khóa `a&b` thành `a`. `a#b` thành `a` vì `#` bắt đầu fragment. | `&`: có. `#`: rất có thể giống nhau trên thiết bị thật, chưa kiểm. |
| Tìm không phân biệt hoa thường | TC-04 | `iphone` ra iPhone. README không cấm. Expected của TC-04 là diễn giải của nhóm, không phải câu trong README. | Không. Không lập bug. Web cũng xử lý TC-04 theo cách này. |

TC-02, 06, 08, 10, 14 và TC-01 PASS. TC-01 trước đó FAIL vì ba mục không áp dụng cho mobile (`h1`, `alt`, một cột). Chúng đã bị bỏ khỏi Expected, lý do ở `04-test-cases.md`.

TC-15 và TC-16 BLOCKED. Trên Chrome, app gửi `search=` rỗng và thấy đủ 5 sản phẩm. Kết quả này do trình duyệt cắt dấu cách, chưa chứng minh app lỗi.

Còn thiếu: chưa chạy trên iOS/Android thật. `react-native-web` dùng DOM của Chrome, không dùng native view và `fetch` của React Native.
