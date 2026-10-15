# FR-11 — Domain Testing, bước 2: Phân hoạch tương đương

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)**.

Bước này chia miền giá trị. Mỗi lớp có một mã và một giá trị đại diện nằm trong lớp. Chưa tổ hợp thành test case, chưa chọn điểm biên on/off.

Nguồn biến: bảng bước 1 trong `docs/fr-11/01-input-space-partitioning.md`.

## Cách chia VEC và IEC

- **VEC:** spec mô tả cách xử lý bình thường của giá trị đó.
- **IEC:** giá trị nằm ngoài miền spec đã mô tả.

Các lớp trong cùng một đặc tính thì rời nhau. Một đơn có thể thuộc nhiều đặc tính (vừa là đơn của mình, vừa ở `pending`, vừa có tổng tiền dương). Bảng chia theo đặc tính.

Seed không có dòng `orders`. Hai tài khoản seed, theo thứ tự insert:

| id | email | mật khẩu | role |
| --- | --- | --- | --- |
| 1 | admin@eshop.com | Admin123! | admin |
| 2 | test@eshop.com | Test1234! | user |

Giá trị đại diện của đơn là dòng cần tạo cho test, không có sẵn trong seed. `POST /api/checkout` chỉ tạo được `status = pending`. Bốn trạng thái còn lại phải được ghi thẳng vào cột `status`.

`shipping_address` và cờ ẩn đơn không có lớp: bước 1 đã kết luận chúng không đổi tập lịch sử và FR-11 không yêu cầu hiện địa chỉ. `GET /api/orders/:id` không thuộc màn này. `role` không tách lớp: admin gọi `my-orders` vẫn là người xem đơn của chính mình. Xem mọi đơn là FR-18.

FR-11 không yêu cầu thứ tự sắp xếp, nên không lập lớp cho `ORDER BY`.

## 1. Phiên trên UI

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| SES-VEC-01 | VEC | Đã đăng nhập | `test@eshop.com` | Người dùng xem lịch sử của chính mình |
| SES-IEC-01 | IEC | Chưa đăng nhập | Mở `/profile` khi không có phiên | FR-11 không mô tả khách xem lịch sử. SEC-02 yêu cầu JWT |

## 2. Header `Authorization` của `GET /api/orders/my-orders`

Thiếu header và token không verify được là hai lớp: spec chỉ nói JWT hợp lệ, còn API trả 401 và 403 cho hai trường hợp đó. Token sai chữ ký, token hết hạn và chuỗi `not-a-jwt` cùng lớp vì đều không qua `jwt.verify`.

Token của admin cùng lớp với token của test user. Spec không cho `role` một kết quả FR-11 khác.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| AUTH-VEC-01 | VEC | JWT hợp lệ của người gọi | Token đăng nhập `test@eshop.com`, payload `id = 2` | SEC-02. FR-11 xác định người xem bằng token |
| AUTH-IEC-01 | IEC | Không có header | Request không gửi `Authorization` | Ngoài miền JWT hợp lệ |
| AUTH-IEC-02 | IEC | Token không verify được | `Authorization: Bearer not-a-jwt` | Ngoài miền JWT hợp lệ. Khác lớp thiếu header |

## 3. Chủ đơn (`orders.user_id`)

Hai lớp đều hợp lệ. Spec vừa yêu cầu hiện đơn của mình, vừa yêu cầu không hiện đơn của người khác.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| OWN-VEC-01 | VEC | `user_id` trùng người gọi | Một đơn `user_id = 2`, người gọi là id 2 | "Chỉ xem được đơn hàng của chính mình" |
| OWN-VEC-02 | VEC | `user_id` khác người gọi | Một đơn `user_id = 1` tồn tại, người gọi là id 2 | Đơn đó không được xuất hiện trong lịch sử của id 2 |

## 4. Số đơn của người gọi

Spec không tách một đơn và nhiều đơn. `0` là lớp riêng vì kết quả là trang trống, không phải bảng.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| CNT-VEC-01 | VEC | Không có đơn của mình | User id 2 có 0 đơn. Đây là trạng thái seed | Phải có empty state. FR-24: trang trống có icon và message thân thiện |
| CNT-VEC-02 | VEC | Có ít nhất một đơn của mình | User id 2 có 2 đơn | Hiện mã đơn, ngày đặt, tổng tiền, trạng thái của từng đơn |

## 5. Trạng thái (`orders.status`)

Năm trạng thái FR-10 là năm lớp. Mỗi lớp cần một nhãn tiếng Việt riêng và một màu khác bốn lớp kia. README không chốt câu chữ của nhãn.

Chuỗi lạ và `NULL` cùng một lớp: cả hai không thuộc năm trạng thái. Đại diện lấy chuỗi `returned`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| ST-VEC-01 | VEC | `pending` | `pending` | FR-10. FR-11 hiện trạng thái hiện tại bằng tiếng Việt, có màu riêng |
| ST-VEC-02 | VEC | `confirmed` | `confirmed` | Cùng cơ sở. Khác `pending` |
| ST-VEC-03 | VEC | `shipping` | `shipping` | Cùng cơ sở. Khác hai lớp trên |
| ST-VEC-04 | VEC | `delivered` | `delivered` | Trạng thái kết thúc FR-10. Vẫn phải hiện trên lịch sử |
| ST-VEC-05 | VEC | `canceled` | `canceled` | Trạng thái kết thúc FR-10. Vẫn phải hiện trên lịch sử |
| ST-IEC-01 | IEC | Ngoài năm trạng thái | `returned` | FR-10 không có trạng thái này. `NULL` cùng lớp |

## 6. Mã đơn, ngày đặt, tổng tiền

Đây là dữ liệu của dòng được hiện, không phải ô nhập.

`id` chỉ có lớp hợp lệ. FR-11 không nhận mã đơn làm điều kiện lọc của danh sách.

Ngày hợp lệ là một mốc thời gian đọc được. `NULL` là không có ngày.

Tổng tiền: FR-11 và FR-08 không cấm `0` hay số âm, nên không tách hai giá trị đó thành IEC. Đại diện `30000000` nằm trong lớp và buộc phải thấy dấu phân cách hàng nghìn. `NULL` là thiếu tổng tiền, khác số `0`.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| ID-VEC-01 | VEC | Mã là số nguyên dương | id mà SQLite cấp, hiện kèm mã đó | Hiện mã đơn |
| DT-VEC-01 | VEC | Có ngày đặt | `2026-10-15 10:00:00` | Hiện ngày đặt |
| DT-IEC-01 | IEC | Không có ngày | `created_at` là `NULL` | Ngoài miền "có ngày đặt" |
| AMT-VEC-01 | VEC | Có tổng tiền dạng số nguyên | `30000000` | Hiện tổng tiền. FR-21: `₫` và phân cách hàng nghìn, ví dụ `30.000.000 ₫` |
| AMT-IEC-01 | IEC | Không có tổng tiền | `total_amount` là `NULL` | Ngoài miền "hiện tổng tiền" |

## 7. Query không thuộc API

Mục 4.4 không khai báo query. Không có VEC. `user_id`, `status` và `page` cùng một lớp.

| ID | Loại | Phân hoạch | Giá trị đại diện | Cơ sở spec |
| --- | --- | --- | --- | --- |
| Q-IEC-01 | IEC | Có thêm query | `?user_id=1` | FR-11 không cho chọn người khác bằng query. Mọi key khác cùng lớp |

## Việc cố ý chưa làm ở bước này

Chưa ghép các lớp thành test case. Chưa chọn giá trị sát biên (0 đơn so với 1 đơn, tổng tiền `0` so với `1`). Đó là bước phân tích giá trị biên.
