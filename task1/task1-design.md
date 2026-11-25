# Task 1.1 — Thiết kế JMeter Load, Stress và Spike

## 1. Thông tin đầu vào

- StudentID: `23120117`
- Ngày đặt tên file: `20261120`
- Base URL mặc định: `http://localhost:3000`
- Flow nguyên văn: `Đăng nhập → Lấy danh sách sản phẩm → Thêm sản phẩm vào giỏ → Thanh toán → Kiểm tra đơn hàng`
- Phạm vi: chỉ thiết kế và sinh test plan; không chạy performance test, không tạo `.jtl`, report HTML, screenshot, video hoặc số liệu hiệu năng.

## 2. Kiểm chứng flow và coverage

Implementation trong `backend/server.js` là nguồn quyết định endpoint. `api_specification.md` khớp với năm endpoint được chọn. Quy tắc nghiệp vụ mong đợi được đối chiếu với `README.md`, và yêu cầu ba nhóm endpoint được đối chiếu với Task 1 trong `HW5.md`.

| Bước | Nhóm coverage | Method và path | Xác thực | Input | Kỳ vọng và correlation |
|---|---|---|---|---|---|
| 1. Đăng nhập | auth-heavy | `POST /api/login` | Không | `email`, `password` từ CSV | HTTP 200; response có `token`; extract `$.token` thành `${token}` |
| 2. Lấy danh sách sản phẩm | read-heavy | `GET /api/products` | Không | `product_id` từ CSV dùng để chọn một phần tử trong response | HTTP 200; response là JSON array; tìm đúng sản phẩm và tạo `${product_name}`, `${product_price}` |
| 3. Thêm sản phẩm vào giỏ | transactional | `POST /api/cart` | `Authorization: Bearer ${token}` | ID, tên, giá đã correlation; `quantity` từ CSV | HTTP 200; response chứa `Added to cart` |
| 4. Thanh toán | transactional | `POST /api/checkout` | `Authorization: Bearer ${token}` | `total_amount = product_price × quantity`; `shipping_address` từ CSV | HTTP 200; response có `orderId`; extract `$.orderId` thành `${order_id}` |
| 5. Kiểm tra đơn hàng | read-heavy, auth-heavy | `GET /api/orders/my-orders` | `Authorization: Bearer ${token}` | `${order_id}` dùng để tìm đúng đơn trong response | HTTP 200; response là JSON array; đơn vừa tạo tồn tại và có status `pending` |

Flow bao phủ đủ cả ba nhóm bắt buộc: **auth-heavy**, **read-heavy** và **transactional**.

## 3. Request chain và correlation

Chuỗi sampler dùng chung, giữ nguyên trong mọi Thread Group của cả ba plan:

1. `01 - Login`
2. `02 - Get product list`
3. `03 - Add selected product to cart`
4. `04 - Checkout cart`
5. `05 - Verify created order in history`

Correlation và dữ liệu:

- `protocol`, `host`, `port` là User Defined Variables; mặc định `http`, `localhost`, `3000`.
- CSV Data Set nhận `email,password,product_id,quantity,shipping_address`. Có thể đổi file bằng `-JdataFile=<path>`.
- JSON Extractor lấy JWT sau login và `orderId` sau checkout trước khi các biến này được sử dụng.
- JSR223 Assertion của bước lấy sản phẩm parse JSON array, xác nhận `product_id` tồn tại, rồi lưu tên và giá thật từ response. Payload giỏ hàng không hard-code tên hoặc giá.
- JSR223 PreProcessor dựng JSON payload giỏ hàng và checkout bằng `JsonOutput`, tránh lỗi escape dữ liệu đầu vào.
- Request được bảo vệ có header `Authorization: Bearer ${token}`; endpoint public không gắn token.
- Uniform Random Timer 1–3 giây được đặt ở bước 2–5, tức có think-time giữa các hành động nhưng không có timer trước login đầu tiên.
- Mỗi sampler có HTTP status assertion; các bước quan trọng còn kiểm tra token, cấu trúc JSON, confirmation message, `orderId` và trạng thái đơn.
- Không có Cookie Manager vì implementation chỉ dùng JWT header, không dùng cookie session.
- Không có GUI listener nặng. Report view, raw log và HTML report thuộc phần thực thi, ngoài phạm vi yêu cầu hiện tại.

## 4. Workload model

Các giá trị dưới đây là thiết kế khởi điểm thận trọng theo contract của skill, chưa phải ngưỡng đã đo.

| Plan | Thread Group chuẩn JMeter | Ramp/shape | Hold | Tổng thời gian lịch |
|---|---|---|---|---:|
| Load | 1 group, 20 VU | 0 → 20 VU trong 60 giây | 300 giây ở 20 VU | 360 giây |
| Stress | 4 group cộng dồn: 20 + 20 + 40 + 40 VU | 0 → 20 (0–60s); giữ 20 (60–120s); 20 → 40 (120–180s); giữ 40 (180–240s); 40 → 80 (240–300s); giữ 80 (300–360s); 80 → 120 (360–420s) | 60 giây ở mỗi mức 20, 40, 80, 120 VU | 480 giây |
| Spike | baseline 10 VU + burst 90 VU | baseline 10 VU bắt đầu ngay; tại giây 60 thêm 90 VU trong 5 giây, tổng 100 VU | spike 60 giây; sau đó 60 giây recovery ở 10 VU | 185 giây |

Think-time của mọi plan là ngẫu nhiên 1–3 giây giữa các bước nghiệp vụ. Load mô phỏng tải bình thường có ramp và plateau. Stress tăng theo bậc để quan sát điểm suy giảm nếu được chạy sau này. Spike giữ baseline, tăng đột ngột lên 100 VU rồi trở lại baseline để quan sát phục hồi nếu được chạy sau này. Chỉ workload shape khác nhau; endpoint, thứ tự sampler, payload, correlation, assertions và think-time giữ nguyên.

Tất cả workload chỉ dùng thành phần chuẩn của JMeter 5.6.3: Thread Group, scheduler, timer, controller, extractor, assertion và pre/post-processor; không cần plugin.

## 5. Dữ liệu đầu vào

`flow-data-template.csv` có một dòng minh họa lấy từ seed data của repository. Đây là schema mẫu, không phải dataset đủ để chạy workload.

CSV Data Set được cấu hình `recycle=false`, `stopThread=true`, `shareMode.all` để một dòng không bị tái sử dụng mặc định bởi nhiều VU/iteration. Trước khi thực thi thật, người rà soát phải tạo đủ dòng dữ liệu hợp lệ và ưu tiên tài khoản riêng cho từng workflow iteration. Nếu không, thread sẽ dừng khi hết dữ liệu và workload thực tế sẽ thấp hơn thiết kế. Không nên đổi sang tái sử dụng một tài khoản duy nhất vì giỏ hàng được giữ theo user trong bộ nhớ và mỗi checkout ghi thêm đơn hàng.

## 6. Giả định, giới hạn và điểm cần human review

1. Base URL mặc định là `http://localhost:3000`, lấy từ implementation và tài liệu. Có thể override `protocol`, `host`, `port` trong JMeter.
2. Tài khoản seed `test@eshop.com / Test1234!` và sản phẩm ID `1` tồn tại sau khi database được khởi tạo theo `backend/database.js`. Dòng minh họa phải được thay/mở rộng trước khi chạy tải.
3. Implementation checkout tin `total_amount` từ client, không tự tính lại từ cart và không xóa cart. Điều này lệch FR-08 trong `README.md`. Plan dùng contract thực tế để request chạy được, nhưng đây là điểm cần người làm bài ghi nhận khi review SUT.
4. Implementation login tăng `login_attempts` thêm 2 và khóa 180 giây, lệch yêu cầu tăng 1 và khóa 30 giây trong FR-02. Plan dùng credential đúng và không cố tình kích hoạt lockout.
5. `GET /api/orders/my-orders` được chọn để kiểm tra đơn vì có bảo vệ theo user. Plan tìm theo `${order_id}` đã extract, không giả định đơn mới luôn ở phần tử đầu tiên.
6. Mỗi iteration tạo một order mới trong SQLite; dữ liệu tăng dần có thể ảnh hưởng Stress/Spike. Cần reset/seed môi trường theo quy trình có kiểm soát giữa các lần chạy thật và ghi evidence riêng.
7. Các mức 20/40/80/120/100 VU chưa được hiệu chỉnh theo phần cứng. Cần smoke/baseline test và human review trước khi thực thi đầy đủ.
8. Chưa thực hiện Task 1.2 data-driven dataset hoàn chỉnh, Task 1.3 report views, Task 1.5 human review, Task 1.6 execution/evidence hoặc bất kỳ kết luận hiệu năng nào.

## 7. Tóm tắt pha AI đã thực hiện

- Kiểm chứng flow theo thứ tự nguồn: `backend/server.js` → `api_specification.md` → `README.md` → `HW5.md`.
- Ánh xạ từng bước sang endpoint thực, authentication, input, expected response và correlation.
- Kiểm tra coverage gate đủ auth-heavy, read-heavy và transactional.
- Thiết kế một request chain dùng chung cùng assertions và think-time.
- Thiết kế ba workload khác nhau bằng thành phần JMeter chuẩn.
- Sinh ba file `.jmx` và CSV schema mẫu.
- Tự kiểm tra tĩnh: XML hợp lệ, chuỗi sampler đồng nhất, biến có nguồn, token/order ID được tạo trước khi dùng, endpoint thuộc implementation và workload shape khác nhau.

Tóm tắt này hỗ trợ audit nhưng không thay thế AI Audit Report đầy đủ hoặc human review bắt buộc của bài tập.
