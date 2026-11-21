# AI Audit Log – HW05 Performance Testing

**Tuyên bố:** I use AI tools for the following tasks.

| AI tool | Model | Dùng cho |
|---|---|---|
| Claude Code | Claude Opus 5.5 | Phân tích SUT, chọn luồng, lập kế hoạch prompt, chuẩn bị môi trường, sinh/review test plan, phân tích log |
| Cursor | Grok 4.7 | Phân tích luồng end-to-end, mapping endpoint, hành vi ảnh hưởng test tải, thiết kế CSV và script tạo user |

Mỗi mục gồm đúng 4 trường theo đề (mục 9): tên AI tool, ngày giờ, prompt, AI output.

---

## #01 — Phân tích luồng end-to-end và hành vi ảnh hưởng test tải

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 01:10
- **Prompt:**

```
Tôi đang làm bài Performance Testing với JMeter cho backend EShop (Node/Express + SQLite, cổng 3000).
Tôi đính kèm server.js, database.js và api_specification.md.

Luồng end-to-end tôi chọn cho một virtual user:
Đăng nhập → Xem chi tiết sản phẩm → Thêm vào giỏ → Áp mã giảm giá → Thanh toán

Chưa sinh test plan. Hãy làm các việc sau:
1. Với từng bước, liệt kê: method, URL, header cần có (đặc biệt Authorization),
   request body mẫu, response thành công mẫu, và giá trị nào cần trích xuất để dùng cho bước sau.
2. Phân loại từng bước vào nhóm auth-heavy / read-heavy / transactional và giải thích ngắn gọn
   vì sao luồng này phủ đủ 3 nhóm.
3. Chỉ ra những hành vi trong code có thể ảnh hưởng tới kết quả test tải
   (ví dụ: cơ chế khóa tài khoản, giới hạn dùng mã, dữ liệu lưu trong RAM, DB bị reset khi khởi động).
Chỉ dựa vào code tôi đưa, nếu không chắc thì ghi rõ "không chắc".
```

- **AI output:**
  - Map 5 bước trên `http://localhost:3000`. Login `POST /api/login` không cần `Authorization`; trích `token` và `user.id` (user seed `test@eshop.com` là id `2`). Chi tiết sản phẩm `GET /api/products/:id` không auth; id lẻ giữ `price` kiểu số, id chẵn trả `price` dạng chuỗi; id không tồn tại vẫn `200` với `{}`. Thêm giỏ `POST /api/cart` cần `Bearer`; response chỉ có `message`, không có field cho bước sau. Áp mã `POST /api/apply-coupon` không cần token; body `code`, `total_amount`, `user_id` (bỏ `user_id` thì bỏ qua đếm lượt dùng). Checkout `POST /api/checkout` cần `Bearer`; body `total_amount` và `shipping_address` do client gửi, server không đọc giỏ.
  - `SAVE10` (`discount_value` = 10) tính `Math.floor(total_amount * (1 - 10))`. Với `total_amount` = 30000000 thì `discount_amount` = -270000000, `final_amount` = 300000000, trong khi `message` vẫn nói giảm 10%. `apply-coupon` không ghi `coupon_usage`.
  - Nhóm: login = auth-heavy; chi tiết sản phẩm = read-heavy; thêm giỏ = transactional (ghi RAM); áp mã = read-heavy (chỉ SELECT + tính); checkout = transactional (`INSERT` vào `orders`). Luồng đủ 3 nhóm nhờ login, chi tiết sản phẩm, thêm giỏ và checkout.
  - Khóa tài khoản: mỗi lần sai cộng `login_attempts + 2`, khóa khi `>= 3` trong 180000 ms. Lần sai đầu (0 → 2) chưa khóa và trả `401`. Lần sai thứ hai mới đặt `locked_until`; response của lần đó vẫn `401`. Request sau trong 3 phút trả `403`, kể cả đúng mật khẩu. `UPDATE` attempts không đợi callback và không nằm trong transaction.
  - `userCarts` chỉ `push`, checkout không xóa, mất khi tắt process. `initDatabase()` DROP và seed lại toàn bộ DB mỗi lần process khởi động. Email không có index/`UNIQUE`. Một connection SQLite, không thấy WAL hay `busyTimeout`.
  - Không chắc: default hết hạn của `jsonwebtoken` (lời gọi không truyền `expiresIn`); chuỗi `message` của mã `fixed` vì `toLocaleString()` phụ thuộc locale; timeout `SQLITE_BUSY`; request tới trước khi seed xong vì `app.listen` không đợi `initDatabase()`.
  - Cần tự quyết khi viết báo cáo: áp mã có nên ghi là transactional theo luồng nghiệp vụ hay read-heavy theo code (output chọn read-heavy).
  - File: không tạo/sửa file ở lượt này.

---

## #02 — Thiết kế CSV và script tạo user

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 11:45
- **Prompt:**

```
Dựa trên phân tích ở bước trước, hãy thiết kế dữ liệu CSV cho test plan:
1. users.csv: email,password,user_id. Tôi cần khoảng 200 user. Viết cho tôi một script bash dùng curl
   gọi POST /api/register để tạo các user này và ghi ra users.csv
   (lấy user_id từ response; DB bị reset mỗi lần khởi động server nên script phải chạy lại được).
2. products.csv: product_id,price, lấy từ 5 sản phẩm seed trong database.js.
3. coupons.csv: code,min_order_amount, chỉ gồm mã còn hiệu lực. Giải thích vì sao loại mã EXPIRED,
   hoặc đề xuất cách giữ lại nó như một test case negative có assertion riêng.
Với mỗi file, nêu rõ cấu hình CSV Data Set Config nên dùng
(Recycle on EOF, Stop thread on EOF, Sharing mode) và lý do.
```

- **AI output:**
  - Viết `hw05/scripts/create_users.sh`: login trước, `401` thì `POST /api/register` và lấy `id` từ response; tài khoản đã có thì ghi `id` từ login, không insert thêm vì `email` không có `UNIQUE`. `403` thì dừng và yêu cầu khởi động lại backend. Mật khẩu chung `LoadUser123!`.
  - Chạy script trên server cổng 3000: tạo 200 user, `user_id` 3–202 (`loaduser001@eshop.com` … `loaduser200@eshop.com`). Chạy lại: created 0, reused 200, id không đổi. Sau mỗi lần restart server phải chạy lại script vì DB bị seed lại.
  - `products.csv`: 5 sản phẩm seed, giá 30000000, 28000000, 45000000, 6000000, 4000000. Giá thấp nhất 4.000.000 vẫn lớn hơn `min_order_amount` cao nhất của mã còn hạn (`BIGBUY` 500000). `total_amount` nên lấy `${price}` từ CSV vì id chẵn trả `price` dạng chuỗi.
  - `coupons.csv`: `SAVE10` 300000, `BIGBUY` 500000, `VIP100` 300000. Loại `EXPIRED` (`expired_at` `2020-01-01`, `is_active` vẫn 1) vì request trả `400` "Mã giảm giá đã hết hạn" và sẽ bị tính là lỗi tải. Giữ riêng ở `coupons_negative.csv`, Thread Group 1 thread / 1 loop, Response Assertion `400` + `$.error`, bật Ignore Status; `total_amount` phải > 100000.
  - CSV Data Set Config cho cả 3 file chính: Ignore first line True, Recycle on EOF True, Stop thread on EOF False, Sharing mode All threads. Current thread khiến mọi thread đọc cùng dòng đầu. Số thread đồng thời nên ≤ 200 để không dùng chung một tài khoản.
  - `SAVE10` còn hạn nên nằm ở file chính, nhưng assertion luồng chính chỉ nên kiểm tra HTTP 200 và `$.success` = true. Công thức percent là `total_amount * (1 - 10)`, không phải giảm 10%.
  - File: `hw05/scripts/create_users.sh`, `hw05/data/users.csv`, `hw05/data/products.csv`, `hw05/data/coupons.csv`, `hw05/data/coupons_negative.csv`

---

<!--
MẪU MỤC MỚI (chèn ngay phía trên khối comment này, đánh số tăng dần)

## #NN — <Tên bước ngắn gọn>

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** <YYYY-MM-DD HH:MM>   (lấy bằng: date "+%Y-%m-%d %H:%M")
- **Prompt:** <nguyên văn tin nhắn, không sửa, không tóm tắt>
- **AI output:**
  - <đã làm gì, phát hiện gì; số liệu chính>
  - <phát hiện ngoài phạm vi hoặc điều cần người dùng quyết, nếu có>
  - File: <đường dẫn tương đối các file đã tạo/sửa>

---
-->
