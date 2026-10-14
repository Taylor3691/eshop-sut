# FR-05 — Kết quả chạy test case

Chạy trên API `http://localhost:3000` và UI `http://localhost:5173`. Script: `scripts/fr05-execute.mjs`.

Tổng: 46. PASS: 25. FAIL: 16. BLOCKED: 5.

TC-23, TC-24, TC-25, TC-26 và TC-46 không chạy vì precondition dùng ký hiệu `L`, chưa có số Limit.

## Các lệch đã thấy

- TC-01, TC-06, TC-08: tập sản phẩm đúng, giá hiện `30.000.000 VND` thay vì có ký hiệu `₫`.
- TC-01: `alt` rỗng, có 2 thẻ `h1` (`Danh sách sản phẩm` và `Hiển thị 1 sản phẩm`), không thấy trạng thái loading. Chữ `iPhone` hiện đúng dạng text.
- TC-03, TC-05, TC-07, TC-11, TC-12, TC-13, TC-31: không có sản phẩm khớp và không có lỗi, nhưng không có thông báo empty state.
- TC-04: từ khóa `iphone` vẫn trả `iPhone 15 Pro Max`.
- TC-05, TC-07: `CƠ` và `Ban phim` không trả sản phẩm có dấu. Thiếu empty state nên vẫn FAIL.
- TC-09: từ khóa `<script>` không còn trên trang (echo text rỗng). HTML đã nuốt thẻ script.
- TC-27: ô tìm là 3 dấu cách nhưng trang vẫn hiện đủ 5 sản phẩm.
- TC-28, TC-29: `%` và `_` đều trả đủ 5 sản phẩm.
- TC-30: API/UI trả `Database Error SQLITE_ERROR: unrecognized token: "'"`. Trang có thêm `h1` của lỗi và vẫn có dòng `Hiển thị 5 sản phẩm`.
- TC-14 đến TC-22 và TC-32 đến TC-45: PASS. Tham số giá, danh mục, sort, page không đổi tập `iPhone 15 Pro Max` và không trả lỗi.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | FAIL | Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Ảnh có alt mô tả. Đúng một h1. Có loading. Chữ iPhone hiện dạng text. | Sản phẩm: iPhone 15 Pro Max. Giá: iPhone 15 Pro Max = 30.000.000 VND. alt: "". h1 (2): Danh sách sản phẩm \| Hiển thị 1 sản phẩm. Loading: không thấy. Echo text: "iPhone". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-02 | PASS | Chỉ đúng một sản phẩm iPhone 15 Pro Max. | Sản phẩm: iPhone 15 Pro Max. Giá: iPhone 15 Pro Max = 30.000.000 VND. alt: "". h1 (2): Danh sách sản phẩm \| Hiển thị 1 sản phẩm. Loading: không thấy. Echo text: "iPhone 15 Pro Max". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-03 | FAIL | Có thông báo empty state. Không hiện năm sản phẩm. N = 0. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "zzzz-khong-co". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-04 | FAIL | Empty state. iPhone 15 Pro Max không được trả về chỉ vì khác hoa thường. | Sản phẩm: iPhone 15 Pro Max. Giá: iPhone 15 Pro Max = 30.000.000 VND. alt: "". h1 (2): Danh sách sản phẩm \| Hiển thị 1 sản phẩm. Loading: không thấy. Echo text: "iphone". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-05 | FAIL | Empty state. Bàn phím cơ Keychron Q1 không được trả về chỉ vì khác hoa thường ở chữ ơ. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "CƠ". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-06 | FAIL | Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫. | Sản phẩm: Bàn phím cơ Keychron Q1. Giá: Bàn phím cơ Keychron Q1 = 4.000.000 VND. alt: "". h1 (2): Danh sách sản phẩm \| Hiển thị 1 sản phẩm. Loading: không thấy. Echo text: "Bàn phím". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-07 | FAIL | Empty state. Không trả sản phẩm chỉ vì đã bỏ dấu. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "Ban phim". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-08 | FAIL | Đủ 5 sản phẩm seed, mỗi giá có ₫ và phân cách hàng nghìn. | Sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1. Giá: iPhone 15 Pro Max = 30.000.000 VND; Samsung Galaxy S24 Ultra = 28.000.000 VND; MacBook Pro M3 = 45.000.000 VND; Tai nghe AirPods Pro 2 = 6.000.000 VND; Bàn phím cơ Keychron Q1 = 4.000.000 VND. alt: "", "", "", "", "". h1 (2): Danh sách sản phẩm \| Hiển thị 5 sản phẩm. Loading: không thấy. Echo text: (không có). Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-09 | FAIL | Empty state. Trang hiện đúng các ký tự <script>, không chạy script. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "". Không có khối lỗi SQL/HTML. Không có thông báo empty state. HTML đã nuốt thẻ script. |
| TC-10 | PASS | Có iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, Tai nghe AirPods Pro 2. Không có Bàn phím cơ Keychron Q1. | Sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2. Giá: iPhone 15 Pro Max = 30.000.000 VND; Samsung Galaxy S24 Ultra = 28.000.000 VND; MacBook Pro M3 = 45.000.000 VND; Tai nghe AirPods Pro 2 = 6.000.000 VND. alt: "", "", "", "". h1 (2): Danh sách sản phẩm \| Hiển thị 4 sản phẩm. Loading: không thấy. Echo text: "a". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-11 | FAIL | Empty state. Không tên seed nào chứa aa. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "aa". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-12 | FAIL | Empty state. Không lỗi. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-13 | FAIL | Empty state. Không lỗi. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-14 | PASS | JSON chỉ có iPhone 15 Pro Max. HTTP không phải lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-15 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-16 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-17 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-18 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-19 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-20 | PASS | Cùng tập TC-14. Hai đầu bằng nhau không làm rỗng kết quả. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-21 | PASS | Cùng tập TC-14. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-22 | PASS | Cùng tập TC-01. category=1 không đổi tập iPhone. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-32 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-33 | PASS | Cùng tập TC-01. Không gửi min_price. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-34 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-35 | PASS | Cùng tập TC-01. Không gửi min_price. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-36 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-37 | PASS | Cùng tập TC-01. Chỉ max_price sai kiểu. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-38 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-39 | PASS | Cùng tập TC-01. Chỉ max_price sai kiểu. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-40 | PASS | Chỉ quan hệ đảo. JSON vẫn chỉ có iPhone 15 Pro Max. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-41 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-42 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-43 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-44 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-45 | PASS | JSON chỉ có iPhone 15 Pro Max. Không lỗi. | HTTP 200. Sản phẩm: iPhone 15 Pro Max. |
| TC-27 | FAIL | Empty state. Không hiện đủ 5 sản phẩm như từ khóa rỗng. Không lỗi. | Sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1. Giá: iPhone 15 Pro Max = 30.000.000 VND; Samsung Galaxy S24 Ultra = 28.000.000 VND; MacBook Pro M3 = 45.000.000 VND; Tai nghe AirPods Pro 2 = 6.000.000 VND; Bàn phím cơ Keychron Q1 = 4.000.000 VND. alt: "", "", "", "", "". h1 (2): Danh sách sản phẩm \| Hiển thị 5 sản phẩm. Loading: không thấy. Echo text: "   ". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-28 | FAIL | Empty state. % không trả về mọi sản phẩm. Không lỗi SQL. Ký tự % hiện dạng text. | Sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1. Giá: iPhone 15 Pro Max = 30.000.000 VND; Samsung Galaxy S24 Ultra = 28.000.000 VND; MacBook Pro M3 = 45.000.000 VND; Tai nghe AirPods Pro 2 = 6.000.000 VND; Bàn phím cơ Keychron Q1 = 4.000.000 VND. alt: "", "", "", "", "". h1 (2): Danh sách sản phẩm \| Hiển thị 5 sản phẩm. Loading: không thấy. Echo text: "%". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-29 | FAIL | Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL. | Sản phẩm: iPhone 15 Pro Max; Samsung Galaxy S24 Ultra; MacBook Pro M3; Tai nghe AirPods Pro 2; Bàn phím cơ Keychron Q1. Giá: iPhone 15 Pro Max = 30.000.000 VND; Samsung Galaxy S24 Ultra = 28.000.000 VND; MacBook Pro M3 = 45.000.000 VND; Tai nghe AirPods Pro 2 = 6.000.000 VND; Bàn phím cơ Keychron Q1 = 4.000.000 VND. alt: "", "", "", "", "". h1 (2): Danh sách sản phẩm \| Hiển thị 5 sản phẩm. Loading: không thấy. Echo text: "_". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-30 | FAIL | Empty state. Không trả trang lỗi SQL. Dấu ' hiện dạng text. | Sản phẩm: (không có sản phẩm). h1 (3): Danh sách sản phẩm \| Database Error \| Hiển thị 5 sản phẩm. Loading: không thấy. Echo text: (không có). Khối lỗi: Database Error SQLITE_ERROR: unrecognized token: "'". Không có thông báo empty state. |
| TC-31 | FAIL | Empty state. Không báo lỗi độ dài. Chuỗi hiện dạng text. | Sản phẩm: (không có sản phẩm). h1 (1): Danh sách sản phẩm. Loading: không thấy. Echo text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa". Không có khối lỗi SQL/HTML. Không có thông báo empty state. |
| TC-23 | BLOCKED | Phụ thuộc L. Xem docs/fr-05/04-test-cases.md. | Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit. |
| TC-24 | BLOCKED | Phụ thuộc L. Xem docs/fr-05/04-test-cases.md. | Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit. |
| TC-25 | BLOCKED | Phụ thuộc L. Xem docs/fr-05/04-test-cases.md. | Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit. |
| TC-26 | BLOCKED | Phụ thuộc L. Xem docs/fr-05/04-test-cases.md. | Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit. |
| TC-46 | BLOCKED | Phụ thuộc L. Xem docs/fr-05/04-test-cases.md. | Không chạy. Precondition cần số L, trong khi FR-05 và bước 3 không xác định Limit. |
