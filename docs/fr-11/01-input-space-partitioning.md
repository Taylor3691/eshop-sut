# FR-11 — Domain Testing, bước 1: Input Space Partitioning

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)** (trang hồ sơ Web, `frontend-web/src/pages/Profile.jsx`, route `/profile`).

Bước này chỉ xác định biến đầu vào và ràng buộc. Chưa chia miền, chưa chọn giá trị, chưa viết test case.

## Cách làm

1. Đọc FR-11 trong `README.md`, cùng FR-10 (năm trạng thái), FR-21 (tiền tệ, một `h1`) và SEC-02 (API cần JWT).
2. Đọc route `/profile` và khối "Lịch sử đơn hàng" để lấy mọi ô nhập và mọi query trên URL trang.
3. Đọc `GET /api/orders/my-orders` để lấy mọi query parameter mà API thực sự đọc.
4. Đọc bảng `orders` và seed trong `backend/database.js`.

Form Họ Tên, Số điện thoại, Địa chỉ giao hàng trên cùng trang thuộc FR-04. Nút Hủy đơn đổi trạng thái theo FR-10. Cả hai không phải input của FR-11. Mobile cũng gọi API này, nhưng lịch sử trên mobile thuộc FR-20.

## 1. Biến đầu vào tường minh trên UI

Route là `/profile`. URL trang không có query parameter.

Khối lịch sử không có ô nhập, không có lọc, không có phân trang, không có sắp xếp. Danh sách được tải khi trang mở, nếu đã có token:

```14:20:frontend-web/src/pages/Profile.jsx
  const fetchOrders = () => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
```

Chưa đăng nhập thì trang chỉ hiện chữ "Vui lòng đăng nhập" và không gọi API.

Nút **Hủy đơn** gửi `PUT /api/orders/:id/cancel` với `id` của dòng đang hiện. Đó là thao tác FR-10, không phải một biến có miền giá trị của FR-11.

## 2. Query parameter trên URL và API

| Nơi | Tham số | Bắt buộc |
| --- | --- | --- |
| URL trang `/profile` | không có | — |
| `GET /api/orders/my-orders` | không có query | Header `Authorization: Bearer <token>`, theo `api_specification.md` mục 4 |

Handler chỉ đọc `req.user.id` sau khi xác thực token. Không đọc `req.query`. Mọi key gắn thêm (`user_id`, `status`, `page`, ...) không được khai báo và không được dùng.

`GET /api/orders/:id` có tham số đường dẫn `id`, không yêu cầu token, và trang lịch sử không gọi endpoint này. FR-11 không mô tả màn chi tiết một đơn.

## 3. Biến trạng thái dữ liệu

Các biến này không nằm trên form. Chúng quyết định dòng nào được trả và dòng đó hiện những gì.

Seed không chèn đơn hàng nào. Cả `admin@eshop.com` và `test@eshop.com` bắt đầu với 0 đơn. Đơn chỉ xuất hiện sau `POST /api/checkout`, lúc đó `status` được ghi `pending`.

| Biến | Có làm đổi tập kết quả không | Vì sao |
| --- | --- | --- |
| `orders.user_id` so với `id` trong JWT | Có | `WHERE user_id = ?` với `req.user.id`. Đơn của người khác không nằm trong tập |
| Số dòng `orders` của đúng user đó | Có | 0 dòng thì UI hiện "Bạn chưa có đơn hàng nào." Có dòng thì hiện bảng |
| `orders.status` | Không lọc tập | Mọi trạng thái của đơn mình đều được trả. Giá trị này đổi nhãn và màu trên từng dòng |
| `orders.id`, `created_at`, `total_amount` | Không lọc tập | Được hiện trên bảng. Spec bắt buộc hiện mã đơn, ngày đặt, tổng tiền |
| `orders.shipping_address` | Không | `SELECT *` trả cột này. Bảng lịch sử không hiện địa chỉ. FR-11 không yêu cầu hiện địa chỉ |
| Đơn bị ẩn / đã xóa | Không thể | Bảng `orders` không có cột ẩn hay xóa mềm |
| `users.role` trong token | Không đổi tập của FR-11 | Câu lệnh không lọc theo role. Xem mọi đơn của mọi user là FR-18, endpoint khác |

Năm giá trị `status` mà FR-10 định nghĩa: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.

## 4. Bảng biến, kiểu, và ràng buộc

| Tên biến | Kiểu dữ liệu | Ràng buộc theo spec | Ràng buộc thực tế trong code |
| --- | --- | --- | --- |
| Phiên đăng nhập (điều kiện để mở lịch sử) | Có hoặc không có user | Người dùng chỉ xem được đơn của chính mình. SEC-02: API bảo mật cần JWT hợp lệ. | Không có `user` thì UI không gọi API, hiện "Vui lòng đăng nhập". Có token thì gửi header `Authorization`. |
| `Authorization` của `GET /api/orders/my-orders` | Chuỗi `Bearer <JWT>` | JWT hợp lệ. Payload phải xác định đúng người đang xem. | Thiếu token: HTTP 401 `Unauthorized`. Token không verify được: HTTP 403 `Forbidden`. Token hợp lệ là JWT ký bằng `SECRET_KEY`, payload `{ id, role }`. |
| Query của `GET /api/orders/my-orders` | Không có | Mục 4.4 không khai báo query. Tập trả về là đơn của chính người gọi. | Handler không đọc `req.query`. `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC`. Lỗi SQL không được trả `res.status`; callback vẫn `res.json(orders)`. |
| `orders.user_id` | Số nguyên | Chỉ đơn của người đang đăng nhập. | So sánh bằng `req.user.id`. Không có tham số client để đổi user. |
| `orders.id` | Số nguyên, tự tăng | Hiện mã đơn. | UI hiện `#{o.id}`. |
| `orders.created_at` | Ngày giờ | Hiện ngày đặt. | Cột `DATETIME DEFAULT CURRENT_TIMESTAMP`. UI gọi `new Date(o.created_at).toLocaleDateString()`, không nêu múi giờ. |
| `orders.total_amount` | Số nguyên | Hiện tổng tiền. FR-21: ký hiệu `₫`, có phân cách hàng nghìn. | Cột `INTEGER`. UI: `Number(o.total_amount \|\| 0).toLocaleString() + " ₫"`. `null` hiện `0 ₫`. |
| `orders.status` | Chuỗi, một trong năm trạng thái FR-10 | Hiện trạng thái hiện tại. Phải dịch sang tiếng Việt rõ ràng và phân biệt màu. | Nhãn: `pending` → Chờ xác nhận, `confirmed` → Đã xác nhận, `shipping` → Đang giao, `delivered` → Đã giao, `canceled` → Đã hủy. Màu: vàng, chàm, xanh dương, xanh lá, đỏ. Chuỗi khác năm giá trị này: nhãn là `status.toUpperCase()`, màu vàng (nhánh `default`). |
| Số đơn của user | Số nguyên ≥ 0 | Spec không mô tả trang trống. FR-24 yêu cầu empty state có icon và message thân thiện cho trang trống. | 0 đơn: một thẻ `<p>` "Bạn chưa có đơn hàng nào.", không icon. Có đơn: bảng đủ bốn cột Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, thêm cột Thao tác. |
| `orders.shipping_address` | `TEXT`, có thể rỗng | FR-11 không yêu cầu hiện trên lịch sử. | Có trong `SELECT *`. Không có ô nào của bảng lịch sử đọc cột này. |
| Cờ ẩn đơn | Không có kiểu | FR-11 không định nghĩa đơn ẩn. | Không có cột. Mọi đơn của user đều được trả. |

## Việc cố ý chưa làm ở bước này

Chưa chia miền giá trị, chưa chọn điểm on/off/in/out, chưa viết test case.
