# Thiết kế dữ liệu kiểm thử

## Dữ liệu xác minh được

| Trường | Giá trị/nguồn | Ghi chú |
|---|---|---|
| Backend base URL | `http://localhost:3000` | `PORT=3000` trong server, khớp setup guide và API specification. |
| Seed user thường | `test@eshop.com` | Dùng cho smoke/tuần tự; secret có trong seed/AGENTS, không ghi vào CSV commit. |
| Seed admin | `admin@eshop.com` | Không dùng cho customer workflow. |
| Products snapshot | IDs 1-5, tên/giá/category trong `api-inventory.md` | Chọn ID động từ kết quả search; re-check sau reset. |
| DB snapshot | 2 users, 5 products, 3 orders | Đọc SQLite mode read-only ngày 2026-11-18; không tạo thêm data. |

## CSV hiện có và các giới hạn dữ liệu

```csv
username,password,search_term,product_id,product_name,product_price,quantity,total_amount,shipping_address
test@eshop.com,<seed-password>,iPhone 15 Pro Max,1,iPhone 15 Pro Max,30000000,1,30000000,
```

`test-data/users.csv` hiện chứa một dòng customer seed đã xác minh; giá trị mật khẩu lấy từ seed/`AGENTS.md`. Không có tài khoản mới được tạo. Trường `shipping_address` hiện để trống vì user seed không có địa chỉ trong DB snapshot; cần thay bằng fixture hợp lệ được phê duyệt trước khi chạy. CSV này chỉ đủ cho một VU.

- Một account riêng cho mỗi concurrent user vì cart keyed theo `userId`.
- Nếu cần thêm concurrency, provision account chỉ trong DB/environment test riêng, theo quy trình được phép (route `POST /api/register` đã xác minh hoặc fixture được quản trị). Task này không tự đăng ký account, đổi DB hoặc tự tạo credentials.
- Login lấy username/password từ CSV; trích JWT động từ response. Không lưu token cố định.
- Ưu tiên trích product ID/name/price từ kết quả search. Nếu CSV có ID, xác nhận sản phẩm vẫn còn trước run.
- Quantity cần được phê duyệt như test data hợp lệ; backend route không validate.
- Shipping address lấy từ fixture test được phép, không dùng địa chỉ thật hay commit thông tin cá nhân. Backend nhận field này, nhưng frontend web hiện không gửi.
- Tính `total_amount` từ product data hiện hành và quantity. Backend nhận tổng từ client, không tính lại dựa trên cart.

## Chuẩn bị, dùng và dọn dữ liệu

1. Cô lập backend DB test, backup DB hiện tại nếu cần giữ; không start backend tùy tiện vì import `database.js` reset/reseed.
2. Provision account test cần thiết và gán account độc quyền cho từng thread; kiểm tra login hợp lệ một lần trước test.
3. Kiểm tra search trả dữ liệu và product IDs tồn tại; giữ dataset/build ổn định trong cả ba scenario.
4. Ghi nhận order count trước/sau; mỗi checkout tạo một persistent order. Hạn chế iteration do không có cleanup customer API.
5. Cart chạy trong RAM và không clear sau checkout. Dùng quy trình reset ngoài measurement trong môi trường cô lập; không reset shared DB.
6. Không gửi sai password chủ đích trong Load/Stress/Spike. Do counter tăng +2, một lần sai có thể khóa account 180 giây. Chờ hết thời gian hoặc reset chính account test riêng trong DB cô lập.

## Cần chốt trước khi phát sinh CSV/JMeter data

- Roster/workflow của nhóm để xác nhận không trùng.
- Account test được cấp tương ứng concurrency, password được quản lý ngoài Git.
- Shipping address fixture và data values được phép dùng.
- Quy trình backup/restore, giới hạn số order, và backend DB test riêng.
