# Danh mục API EShop phục vụ kiểm thử hiệu năng

**Phạm vi:** backend local EShop. Nội dung đối chiếu từ `backend/server.js`, `backend/database.js`, `api_specification.md`, `setup_guide.md`, và snapshot chỉ đọc của `backend/database.sqlite` ngày 2026-11-18. Chưa gửi request tới server đang chạy vì khởi động backend có thể xóa/tạo lại DB. Đây là hợp đồng suy ra từ mã nguồn/tài liệu và snapshot, chưa phải xác nhận HTTP trực tiếp. Khi tài liệu khác implementation, ghi rõ cả hai và dùng implementation làm mô tả actual behavior.

## Môi trường và xác thực

- `backend/server.js` đặt `PORT = 3000`; base URL local là `http://localhost:3000`, cũng được ghi trong `setup_guide.md` và API specification.
- Middleware đọc `Authorization: Bearer <JWT>`, gọi `jwt.verify`, rồi gắn payload `{id, role}` vào `req.user`. Không thấy expiry được cấu hình khi ký token.
- Thiếu token: `401 {"error":"Unauthorized"}`. Token sai/không xác minh được: `403 {"error":"Forbidden"}`.
- Middleware chỉ xác minh JWT; không kiểm tra `role`. Các route admin được rà soát cũng chỉ áp middleware này, không kiểm tra role. Không dùng account admin cho workflow khách hàng.
- JSON body được parse qua `bodyParser.json()`. Nhánh thành công không set status trả mặc định `200`.

## Endpoint được chọn cho workflow

| Nhóm / thao tác | Method và URL | Query/path | Header / auth | Request body | Phản hồi từ mã nguồn | Side effect / căn cứ |
|---|---|---|---|---|---|---|
| Auth-heavy / login | `POST /api/login` | Không | `Content-Type: application/json`; public | `{"email": string, "password": string}` | Thành công `200 {"message":"Login successful","token": string,"user": object}`. Source trả toàn bộ user row từ `SELECT *`, nên object này cũng chứa trường `password`. Sai credentials/user không tồn tại `401 {"error":"Invalid email or password"}`. Đang khóa `403` với thông báo khóa. | Sai password cập nhật `login_attempts`, `locked_until`; đúng password reset hai trường rồi tạo JWT. `server.js` 32-65. |
| Read-heavy / search + listing | `GET /api/products` | Tùy chọn `search` tìm theo tên | Public | Không có | `200`: JSON array product rows `{id,name,price,description,imageUrl,category_id}`. Nhánh search lỗi DB trả `500` HTML; nhánh list không xử lý lỗi rõ ràng. | SELECT `products`; query search được nối chuỗi. `server.js` 141-157. |
| Read-heavy / detail | `GET /api/products/:id` | Path `id` | Public | Không có | Có row: `200` product object; không có: `200 {}`. Với ID chẵn, `price` bị đổi thành string; ID lẻ giữ số. | SELECT theo ID; không đổi DB. `server.js` 159-165. |
| Transactional / cart read (tùy chọn) | `GET /api/cart` | Không | Bearer JWT | Không có | `200`: JSON array; user chưa có cart nhận `[]`. | Khởi tạo cart rỗng trong `userCarts` khi đọc. RAM theo process. `server.js` 284-288. |
| Transactional / add cart item | `POST /api/cart` | Không | Bearer JWT | API specification/frontend dùng object item: `{"id": number,"name": string,"price": number,"quantity": number}`. Route append `req.body` nguyên trạng, không validate schema. | `200 {"message":"Added to cart"}`. | Append vào `userCarts[req.user.id]`; không gộp item hoặc kiểm tra tồn kho/giá. `server.js` 290-295; schema ví dụ ở API specification. |
| Transactional / checkout | `POST /api/checkout` | Không | Bearer JWT | Route đọc `total_amount`, `shipping_address`; API spec: `{"total_amount": number,"shipping_address": string}`. Frontend web gửi thêm `items` nhưng backend bỏ qua. | Thành công `200 {"message":"Checkout successful","orderId": number}`; lỗi DB `500 {"error": string}`. | Insert order mới với user ID từ JWT, tổng tiền client cung cấp, status `pending`, shipping address. Không đọc/clear cart. `server.js` 297-309, schema ở `database.js`. |
| Kiểm chứng order (tùy chọn) | `GET /api/orders/my-orders` | Không | Bearer JWT | Không có | `200`: JSON array, mới nhất theo ID trước. | SELECT order theo user ID. Nếu thêm vào đo chính, phải giữ ở cả Load/Stress/Spike. `server.js` 311-319. |

## Endpoint auth/phụ trợ đã rà soát

| Method / URL | Body / auth | Hành vi nguồn |
|---|---|---|
| `POST /api/register` | `{name,email,password}`; public | Insert user (role mặc định `user`); `200 {message,id}`; lỗi DB `500 {error}`. `server.js` 20-30. |
| `POST /api/forgot-password` | `{email}`; public | Không có user: `404`; thành công tạo code reset 4 chữ số, ghi `reset_token`, trả `200 {message,resetToken}`. `server.js` 68-85. |
| `POST /api/reset-password` | `{email,resetToken,newPassword}`; public | Update password và clear `reset_token`; thành công `200 {message}`; không khớp `400 {error}`. `server.js` 87-101. |
| `GET /api/users/me` | Bearer JWT | Trả user row từ `SELECT *`, gồm các cột tài khoản; không thấy xử lý lỗi DB hoặc `404` nếu user bị xóa. `server.js` 112-116. |

Các API khác trong spec (profile update, categories, admin CRUD/import, coupon, cancel order) không đưa vào luồng đề xuất để giữ đúng ba nhóm endpoint cần đo.

## Tài khoản và dữ liệu snapshot

Seed trong `database.js` tạo `test@eshop.com` (role `user`) và `admin@eshop.com` (role `admin`). Mật khẩu seed được ghi trong `AGENTS.md`; không lặp lại secret trong tài liệu/commit. Chỉ account user phù hợp cho customer workflow. DB snapshot có hai account này với `login_attempts=0`, `locked_until=NULL`.

| Product ID | Tên | Giá | Category ID |
|---:|---|---:|---:|
| 1 | iPhone 15 Pro Max | 30,000,000 | 1 |
| 2 | Samsung Galaxy S24 Ultra | 28,000,000 | 1 |
| 3 | MacBook Pro M3 | 45,000,000 | 2 |
| 4 | Tai nghe AirPods Pro 2 | 6,000,000 | 3 |
| 5 | Bàn phím cơ Keychron Q1 | 4,000,000 | 3 |

Snapshot được đọc chỉ đọc trực tiếp từ `database.sqlite`, khớp seed data. Có **3 order** đã tồn tại tại thời điểm đọc; checkout mới sẽ tăng số này. Snapshot không đảm bảo còn đúng sau khi backend khởi động: import `database.js` gọi `initDatabase()` vô điều kiện và drop/recreate bảng. Sao lưu DB trước khi start server theo `AGENTS.md`.

## Login lockout: requirement và implementation khác nhau

PDF HW05 và `AGENTS.md` yêu cầu tính đến khóa sau ba lần đăng nhập sai liên tiếp. `server.js` lại cộng `login_attempts` thêm **2** mỗi lần sai rồi khóa khi `newAttempts >= 3`; do đó chỉ một lần sai đã kích hoạt khóa 180 giây. Email không tồn tại trả 401 nhưng không tăng bộ đếm. Đây là khác biệt của SUT cần bảo toàn/ghi nhận, không sửa trong task thiết kế. Main workflow không thử sai password. Nếu account test riêng bị khóa, chờ ít nhất 180 giây hoặc reset account đó trong DB test cô lập; không reset account khác.

## Giới hạn xác minh

- Chưa xác minh status/response qua HTTP vì không start backend để tránh reset DB.
- DB hiện có 3 order; không có cleanup API customer phù hợp. Giới hạn số checkout và ghi lại số order trước/sau.
- `HW05/README.md` đã ghi sequence Login → Search Products → View Product Detail → Add to Cart → Checkout. Repo không có danh sách thành viên/kịch bản của nhóm khác nên tính duy nhất trong nhóm **chưa xác minh**; cần đối chiếu trước khi nộp.
- Chọn ID từ search response thay vì hard-code. Nếu dùng ID chẵn, detail trả `price` kiểu string; ID lẻ trả number.
