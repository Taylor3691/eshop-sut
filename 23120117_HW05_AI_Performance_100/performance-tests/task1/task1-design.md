# Task 1.1 – AI-assisted test design

## Thông tin chung

- Student ID: `23120117`
- Ngày thiết kế: `2026-11-20`
- Công cụ: Apache JMeter, chỉ dùng component chuẩn
- Base URL mặc định: `http://localhost:3000`

## Flow đầu vào

```text
Đăng nhập
→ Lấy danh sách sản phẩm
→ Thêm sản phẩm vào giỏ
→ Thanh toán
→ Kiểm tra đơn hàng
```

Cả ba test plan Load, Stress và Spike sử dụng đúng flow này. Chúng chỉ khác workload profile.

## Endpoint và coverage

| Bước | Request | Authentication | Nhóm endpoint | Kiểm tra chính |
|---|---|---|---|---|
| Đăng nhập | `POST /api/login` | Không | auth-heavy | HTTP 200 và response có JWT `token` |
| Lấy danh sách sản phẩm | `GET /api/products` | Không | read-heavy | HTTP 200, JSON array và tìm thấy `product_id` từ CSV |
| Thêm sản phẩm vào giỏ | `POST /api/cart` | Bearer JWT | transactional | HTTP 200 và có thông báo `Added to cart` |
| Thanh toán | `POST /api/checkout` | Bearer JWT | transactional | HTTP 200 và response có `orderId` |
| Kiểm tra đơn hàng | `GET /api/orders/my-orders` | Bearer JWT | read-heavy | Tìm thấy `orderId` vừa tạo với trạng thái `pending` |

Flow đáp ứng đủ ba nhóm: đăng nhập bao phủ auth-heavy; đọc danh sách sản phẩm và lịch sử đơn bao phủ read-heavy; thêm giỏ và tạo đơn bao phủ transactional.

## Correlation và dữ liệu

1. Login extract `$.token` thành `${token}`.
2. Các request được bảo vệ gửi `Authorization: Bearer ${token}`.
3. `GET /api/products` tìm sản phẩm có ID bằng `${product_id}`, sau đó lưu `product_name` và `product_price`.
4. Cart payload được tạo từ product vừa tìm cùng `${quantity}`.
5. Checkout payload tính `total_amount = product_price × quantity` và dùng `${shipping_address}`.
6. Checkout extract `$.orderId` thành `${order_id}`.
7. Lịch sử đơn phải chứa đúng `${order_id}` ở trạng thái `pending`.

File `flow-data.csv` cung cấp các cột:

```text
user_index,name,email,password,product_id,quantity,shipping_address
```

CSV có 240 dòng dữ liệu, gấp đôi peak 120 VU của Stress test. Các product ID luân phiên từ 1 đến 5, quantity từ 1 đến 3 và mỗi account có địa chỉ riêng. Tài khoản `perfuser001@eshop.test` đến `perfuser240@eshop.test` cần được đăng ký trước bằng `seed-test-users.ps1` khi backend đang chạy.

JMeter dùng `CSV Data Set Config` với:

- encoding `UTF-8`;
- header được khai báo tường minh;
- `quotedData=true` để đọc đúng địa chỉ có dấu phẩy;
- `shareMode.all` để các Thread Group Stress/Spike cùng dùng một data pool;
- `recycle=true` để bài kiểm thử theo duration không dừng khi đọc hết file.

Có thể thay file lúc chạy mà không sửa `.jmx`:

```powershell
jmeter -n -t <plan.jmx> -JdataFile=<path-to-csv> -l <result.jtl>
```

## Workload profile

| Plan | VU/Thread | Ramp/shape | Tổng thời gian | Think-time |
|---|---:|---|---:|---:|
| Load | 20 | Ramp đều trong 60 giây, giữ mức 20 VU thêm 300 giây | 360 giây | Ngẫu nhiên 1–3 giây trước mỗi bước sau login |
| Stress | 20 → 40 → 80 → 120 | Bốn Thread Group chuẩn bắt đầu tại giây 0, 60, 120 và 180 | 300 giây | Ngẫu nhiên 1–3 giây |
| Spike | Baseline 10, spike thêm 90 | Baseline ramp 30 giây; burst bắt đầu ở giây 60 và ramp trong 5 giây | 180 giây | Ngẫu nhiên 1–3 giây |

Các con số trên là điểm bắt đầu thận trọng khi chưa có baseline hoặc giới hạn phần cứng. Chúng chưa phải ngưỡng hiệu năng đã được chứng minh.

## Lý do lựa chọn

- Load mô phỏng tải bình thường đủ lâu để quan sát độ trễ ổn định.
- Stress tăng đến 120 VU theo các mốc để quan sát thời điểm latency/error rate suy giảm.
- Spike tạo bước nhảy từ khoảng 10 lên 100 VU, sau đó còn 60 giây baseline để quan sát phục hồi.
- Think-time 1–3 giây tránh tạo request liên tục phi thực tế nhưng vẫn đủ tải cho máy cá nhân.

## Sai lệch và rủi ro cần con người rà soát

1. README yêu cầu login sai tăng bộ đếm 1 và khóa 30 giây; implementation hiện tăng 2 và khóa 180 giây. Plans dùng credential đúng nhưng vẫn cần kiểm tra tài khoản không bị khóa trước khi chạy.
2. README yêu cầu backend tự tính tổng tiền và xóa giỏ sau checkout. Implementation hiện nhận `total_amount` từ client và không xóa `userCarts`. Đây là sai lệch chức năng có thể ảnh hưởng kết quả khi lặp nhiều iteration.
3. Giỏ hàng được giữ trong bộ nhớ và được khóa theo `userId`. Nhiều VU dùng chung một account sẽ làm giỏ hàng giao thoa.
4. SQLite sẽ tích lũy một order cho mỗi iteration; kích thước bảng orders tăng dần có thể ảnh hưởng Stress/Spike.
5. Cần chạy `seed-test-users.ps1` một lần trước test để tạo các account trong CSV. Script không được chạy trong workload đo hiệu năng.
6. `recycle=true` cho phép tái sử dụng account sau khi hết 240 dòng. Nếu iteration quá nhanh, một account có thể được cấp lại khi request cũ chưa hoàn tất; cần quan sát khi smoke test.
7. Ba plan chưa có listener/report view vì đây là yêu cầu Task 1.3, nằm ngoài phạm vi skill này.
8. Chưa có số liệu đo thực tế. Cần smoke test 1–2 VU và human review trước lần chạy chính thức.

Chi tiết phản biện và các sửa đổi được ghi trong `task1-human-review.md`.

## Các pha AI đã thực hiện

1. Kiểm chứng flow và xác nhận coverage ba nhóm endpoint.
2. Đối chiếu `backend/server.js`, `api_specification.md`, `README.md` và `HW5.md`.
3. Thiết kế correlation cho JWT, product và order ID.
4. Chọn workload khởi điểm cho Load, Stress và Spike.
5. Sinh ba JMeter plan và kiểm tra cấu trúc XML, sampler sequence, biến và endpoint.
6. Chuyển credential, product ID, quantity và shipping address sang CSV data pool dùng chung.

Phần này hỗ trợ ghi nhận quá trình thiết kế, nhưng không thay thế AI Audit Report bắt buộc của bài tập.
