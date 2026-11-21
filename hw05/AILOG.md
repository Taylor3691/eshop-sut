# AI Audit Log – HW05 Performance Testing

**Tuyên bố:** I use AI tools for the following tasks.

| AI tool | Model | Dùng cho |
|---|---|---|
| Claude Code | Claude Opus 5.5 | Phân tích SUT, chọn luồng, lập kế hoạch prompt, chuẩn bị môi trường, sinh/review test plan, phân tích log |
| Cursor | Grok 4.7 | Phân tích luồng end-to-end, mapping endpoint, hành vi ảnh hưởng test tải, thiết kế CSV và script tạo user, đề xuất tham số Load/Stress/Spike, sinh test plan Load, sinh test plan Stress |

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

## #03 — Tham số Load, Stress, Spike

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 11:57
- **Prompt:**

```
Máy chạy test và SUT là cùng một máy: cấu hình trong ảnh bên dưới .
Backend là Node.js single-thread + SQLite.

Hãy đề xuất tham số cho 3 kịch bản dùng chung luồng trên:
- Load: tải bình thường kéo dài
- Stress: tăng dần đến khi hệ thống bắt đầu lỗi hoặc chậm rõ rệt
- Spike: tăng đột ngột rồi giảm

Với mỗi kịch bản, cho: số thread, ramp-up, thời lượng hoặc số vòng lặp, think-time
(loại timer + giá trị), loại Thread Group (Thread Group thường, Stepping/Concurrency Thread Group,
hoặc Ultimate Thread Group). Giải thích vì sao các con số đó thực tế với máy của tôi.
Đề xuất ngưỡng chấp nhận (p95, error rate) cho từng kịch bản.
Trình bày dạng bảng.
/Users/toanhuynh/orca/workspaces/eshop-sut/hw05-toanhuynh/hw05/evidence/hardware/hardware_fastfetch.png
```

- **AI output:**
  - Máy trong ảnh: MacBook Air 13-inch M5, CPU 4+6 nhân @ 4.46 GHz, RAM 16 GB đang dùng 12.64 GB (79%), swap chưa dùng. JMeter và Node cùng máy. Các số là mức khởi đầu, chưa benchmark.
  - Load: Thread Group thường, 30 thread, ramp-up 60 giây, loop vô hạn, duration 600 giây. Uniform Random Timer offset 1000 ms + maximum 2000 ms (trung bình 2 giây/request, khoảng 15 request/giây). Ngưỡng: p95 < 300 ms, error < 1%.
  - Stress: Stepping Thread Group, tối đa 200 thread, thêm 20 thread mỗi 30 giây, ramp-up mỗi bậc 10 giây, giữ đỉnh 60 giây, hạ 50 thread mỗi 5 giây (khoảng 6–7 phút). Timer offset 200 ms + maximum 300 ms. Bậc khỏe: p95 < 800 ms, error < 1%. Suy giảm: p95 > 1000 ms hoặc error > 2% suốt một bậc. Không chắc bậc nào chạm ngưỡng.
  - Spike: Ultimate Thread Group. Hàng 1: 20 thread, delay 0, startup 20, hold 160, shutdown 20. Hàng 2: 130 thread, delay 80, startup 10, hold 40, shutdown 10. Đỉnh 150 thread khoảng giây 90–130. Cùng timer với Stress. Nền: p95 < 300 ms, error < 1%. Đỉnh: p95 < 1500 ms, error < 5%. 30 giây sau khi hạ: p95 < 500 ms, error < 1%.
  - Trần 200 thread vì CSV chỉ có 200 user. Node một thread và SQLite không WAL nên không tăng lên hàng nghìn thread. Chạy non-GUI, heap JMeter ≤ 1 GB, cắm sạc, chừa khoảng 3 GB RAM. Plugin cần có: Custom Thread Groups (`jpgc-casutg`). Error rate chỉ có nghĩa nếu assertion áp mã không bắt công thức `SAVE10`.
  - File: không tạo/sửa file ở lượt này. Ảnh đã đọc: `hw05/evidence/hardware/hardware_fastfetch.png`.

---

## #04 — Sinh test plan Load

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 12:03
- **Prompt:**

```
Hãy sinh file JMeter test plan (.jmx, JMeter) tên 23120175_Load_<YYYYMMDD>.jmx với:
- User Defined Variables: HOST=localhost, PORT=3000
- HTTP Header Manager: Content-Type: application/json
- 3 CSV Data Set Config: users.csv, products.csv, coupons.csv (theo thiết kế ở bước 2)
- Thread Group theo tham số Load ở bước 3
- 5 sampler đặt tên rõ ràng: 01_Login, 02_ProductDetail, 03_AddToCart, 04_ApplyCoupon, 05_Checkout
- JSON Extractor lấy token sau 01_Login, gắn header Authorization: Bearer ${token} cho 03 và 05
- Dùng final_amount từ 04_ApplyCoupon làm total_amount cho 05_Checkout
- Assertion cho từng sampler: Response Code 200 và JSON Assertion kiểm tra trường quan trọng
  (token tồn tại, id sản phẩm khớp, "Added to cart", success=true, orderId tồn tại)
- Think-time giữa các bước theo bước 3
- Listener: Aggregate Report
Giải thích từng thành phần bạn thêm vào.
```

- **AI output:**
  - Tạo `hw05/23120175_Load_20261121.jmx` (JMeter 5.6.3). `xmllint` và kiểm tra cặp `hashTree` đều đạt.
  - User Defined Variables: `HOST=localhost`, `PORT=3000`. HTTP Request Defaults dùng hai biến này, encoding UTF-8, connect timeout 5 giây, response timeout 10 giây. Header gốc: `Content-Type: application/json`.
  - Ba CSV Data Set Config, đường dẫn tính từ thư mục chứa `.jmx`: `data/users.csv` (`email`, `password`, `user_id`), `data/products.csv` (`product_id`, `price`), `data/coupons.csv` (`code`, `min_order_amount`). Cả ba: Ignore first line True, Recycle True, Stop thread False, Sharing mode All threads.
  - Thread Group thường `TG Load 30x600s`: 30 thread, ramp-up 60 giây, loop vô hạn, scheduler 600 giây. Khi sampler lỗi thì thread chạy tiếp.
  - `01_Login` `POST /api/login` không auth; JSON Extractor `$.token` → `token`. `02_ProductDetail` `GET /api/products/${product_id}`. `03_AddToCart` `POST /api/cart` với `Authorization: Bearer ${token}`, `quantity` 1, `price` từ CSV. `04_ApplyCoupon` `POST /api/apply-coupon` không auth, `total_amount` = `${price}`, `user_id` = `${user_id}`; JSON Extractor `$.final_amount`. `05_Checkout` `POST /api/checkout` với Bearer, `total_amount` = `${final_amount}`, địa chỉ cố định `123 Le Loi, TP.HCM`.
  - Mỗi sampler: Response Assertion HTTP 200 và JSON Assertion. `$.token` tồn tại; `$.id` = `${product_id}`; `$.message` = `Added to cart`; `$.success` = `true`; `$.orderId` tồn tại. Assertion áp mã không kiểm tra số tiền giảm vì `SAVE10` vẫn trả `success: true` khi công thức percent sai.
  - Think-time: bốn Uniform Random Timer (offset 1000 ms, maximum 2000 ms) đứng trước sampler 02–05. `01_Login` không có timer. Trung bình khoảng 8 giây think-time mỗi vòng.
  - Listener duy nhất: Aggregate Report, filename để trống để khi chạy non-GUI ghi bằng `-l`.
  - Smoke 1 thread, 1 vòng, timer bằng 0, trên server đang chạy: 5 sample, HTTP 200, 0% lỗi. Chưa chạy đủ 30 thread trong 10 phút. `users.csv` (id 3–202) chỉ đúng với process backend hiện tại; restart thì phải chạy lại `hw05/scripts/create_users.sh`.
  - File: `hw05/23120175_Load_20261121.jmx`

---

## #05 — Sinh test plan Stress

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 12:10
- **Prompt:**

```
Dựa trên <MSSV>_Load_<YYYYMMDD>.jmx (đã sửa, tôi đính kèm), tạo <MSSV>_Stress_<YYYYMMDD>.jmx:
- Giữ nguyên luồng, CSV và assertion
- Đổi Thread Group theo tham số Stress ở bước 3 (tăng theo bậc)
- Listener: Summary Report (không dùng Aggregate Report)
- Thêm xử lý khi login trả về 403 (tài khoản bị khóa): ghi nhận lỗi rõ ràng và bỏ qua vòng lặp đó
Chỉ ra những gì khác so với plan Load.
```

- **AI output:**
  - Tạo `hw05/23120175_Stress_20261121.jmx` từ `hw05/23120175_Load_20261121.jmx`. Giữ 5 sampler, body, CSV (`data/users.csv`, `data/products.csv`, `data/coupons.csv`), header và assertion. `xmllint` và kiểm tra cặp `hashTree` đều đạt.
  - Đổi sang Stepping Thread Group `TG Stress stepping 200`: 200 thread, chờ 0 giây, thêm 20 thread mỗi 30 giây, ramp-up mỗi bậc 10 giây, giữ đỉnh 60 giây, hạ 50 thread mỗi 5 giây. Plugin cộng ramp vào khoảng cách bậc nên mỗi bậc cách nhau 40 giây. Lịch chạy khoảng 445 giây (7 phút 25 giây). Khi sampler lỗi thì thread chạy tiếp.
  - Think-time đổi theo tham số Stress ở bước 3: Uniform Random Timer offset 200 ms, maximum 300 ms (200–500 ms) trước sampler 02–05. `01_Login` không có timer.
  - Listener duy nhất: Summary Report, filename để trống. Không còn Aggregate Report.
  - Login 403: JSR223 PostProcessor đổi nhãn sample thành `01_Login_403_Locked` và ghi message `403: Tài khoản đã bị khóa. Vui lòng thử lại sau. Bỏ qua vòng lặp này.` JSR223 Assertion đặt cùng câu đó làm failure message. If Controller `${login_locked}` gọi TestAction Start Next Thread Loop (action 3), nên `02`–`05` của vòng đó không chạy. Login 401 không đi vào nhánh này.
  - Máy chưa có Custom Thread Groups. Đã thêm `jmeter-plugins-casutg` 3.1.1 và `jmeter-plugins-cmn-jmeter` 0.6 vào `lib/ext` của JMeter 5.6.3. Không có hai jar này thì plan không mở được.
  - Smoke 1 thread, 1 vòng, timer bằng 0: user hợp lệ cho 5 sample HTTP 200, 0% lỗi. User `stresslock@eshop.com` (id 203, không nằm trong `users.csv`) sau khi bị khóa cho đúng 1 sample `01_Login_403_Locked`, lỗi, không có sampler 02–05. Chưa chạy đủ 200 thread.
  - File: `hw05/23120175_Stress_20261121.jmx`

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
