# AI Audit Log – HW05 Performance Testing

**Tuyên bố:** I use AI tools for the following tasks.

| AI tool | Model | Dùng cho |
|---|---|---|
| Claude Code | Claude Opus 5.5 | Phân tích SUT, chọn luồng, lập kế hoạch prompt, chuẩn bị môi trường, sinh/review test plan, phân tích log |
| Cursor | Grok 4.7 | Phân tích luồng end-to-end, mapping endpoint, hành vi ảnh hưởng test tải, thiết kế CSV và script tạo user, đề xuất tham số Load/Stress/Spike, sinh test plan Load, sinh test plan Stress, đề xuất mức Soak từ kết quả Stress, sinh test plan Soak và script ghi RAM, phân tích statistics.json và .jtl theo cửa sổ thời gian của Load/Stress/Spike/Soak, đề xuất tối ưu hiệu năng từ kết quả đo và code backend, phân loại commit nào cần chạy performance test, thiết kế pipeline nhiều tầng và ngưỡng p95 regression, vẽ flow chart Mermaid và lưu thành file |

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

## #06 — Tăng tải Stress để tìm điểm bão hòa

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-21 13:37
- **Prompt:**

```
ok sửa và commit lại
```

- **AI output:**
  - Bối cảnh: lần chạy Stress thật (`results/stress_try.jtl`, 445 giây, 178.301 sample) chỉ đạt khoảng 700 request/giây ở 200 thread, p95 = 3 ms, 0 lỗi luồng chính, nên chưa tìm được điểm gãy. Đo thử bản rút gọn không think-time (trong `/tmp`, không nộp): Node bão hòa ở khoảng 50 thread, khoảng 11.400 request/giây; ở 200 thread còn khoảng 8.600 request/giây, p95 tăng từ 4 ms lên 35 ms, CPU `node` khoảng 125–130%.
  - Sửa `23120175_Stress_20261121.jmx`: think-time từ 200–500 ms xuống 0–50 ms; Stepping Thread Group thêm 20 thread mỗi 25 giây, ramp-up 5 giây, tối đa 200 thread, giữ 60 giây. Ước tính khoảng 6,5 phút (chưa chạy đủ thời lượng để đo).
  - Ghi chú trong plan: phải chạy với `-Jhttpclient.reset_state_on_thread_group_iteration=false`. Nếu không, JMeter mở kết nối mới mỗi vòng lặp, macOS hết cổng TCP tạm (49152–65535) sau khoảng 8 giây và báo `BindException` (28% lỗi ngay ở 25 thread), lỗi do máy test chứ không do backend.
  - `REVIEW_TESTPLANS.md`: thêm dòng 8 (Stress không đủ tải) và dòng 9 (hết cổng TCP) vào bảng "AI sai/thiếu", sửa dòng 6 cho khớp. `scripts/smoke_test.sh`: cập nhật giá trị gốc của Stress và tự thêm tham số giữ kết nối. `.gitignore`: bỏ qua `hw05/results/*_try.jtl`, `hw05/reports/*_try/`.
  - Chạy lại `smoke_test.sh stress`: 4.800 sample, luồng chính 0 lỗi, chỉ `LOCK_04` failed như kỳ vọng.
  - Đính chính trong lúc làm: AI trước đó tính sai thời lượng Stress cũ là khoảng 350 giây; số đo thật là 445 giây (mỗi bậc = 10 giây ramp-up + 30 giây chờ), ghi chú gốc của Cursor là đúng.
  - Commit `5eb22e4` (Stress, review, `.gitignore`) và `a214fe1` (smoke test, kịch bản video). Sau đó người dùng yêu cầu không commit kịch bản video, commit thứ hai được amend thành `82ba65b`, chỉ còn `scripts/smoke_test.sh`.
  - File: `hw05/23120175_Stress_20261121.jmx`, `hw05/REVIEW_TESTPLANS.md`, `hw05/scripts/smoke_test.sh`, `.gitignore`

---

## #07 — Đề xuất mức tải Soak từ kết quả Stress

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 16:14
- **Prompt:**

```
Từ kết quả Stress (statistics.json), hãy đề xuất mức tải
cho soak test 10–15 phút, khoảng 70–80% điểm hệ thống bắt đầu suy giảm.
Tôi cần đo: RPS ổn định tối đa, p95, error rate, RAM của process node theo thời gian.
Đề xuất cách ghi RAM định kỳ trên macOS (ví dụ ps -o rss -p <pid> mỗi 5 giây ra file).
```

- **AI output:**
  - `statistics.json`: 1.852.603 sample, p95 = 2 ms, p99 = 4 ms, throughput 5293 request/giây. Một lỗi duy nhất là `LOCK_04`. Năm sampler chính 0 lỗi.
  - Tách `stress.jtl` mỗi 30 giây: 200 thread ở giây 270–330 đạt 8861 rồi 8930 request/giây, p95 3 ms, lỗi luồng chính 0%. Request/giây tăng gần thẳng theo thread, khoảng 44 request/giây mỗi thread. Kết luận điểm suy giảm chưa xuất hiện trong bài này.
  - Đề xuất soak 150 thread (75% của 200), ramp-up 60 giây, duration 960 giây, kỳ vọng khoảng 6700 request/giây. Ngưỡng đoạn giữ tải: RPS mỗi phút trong ±10% phút giữa, p95 trên 15 ms thì coi là bắt đầu suy, error luồng chính dưới 0,1%.
  - Sai: thấy cột `IdleTime` = 0 nên kết luận bài Stress không có think-time, và đề xuất để timer = 0. Cách đọc này sai. Prompt sau (#08) sửa lại: giữ timer 0–50 ms, 6700 request/giây là khoảng 59% của điểm bão hòa khoảng 11.400 request/giây khi tắt think-time.
  - Đưa vòng `ps -o rss=` mỗi 5 giây, PID lấy bằng `lsof` cổng 3000, ghi `epoch_ms,rss_kb`. `rss` trên macOS là kilobyte.
  - File: không tạo/sửa file ở lượt này.

---

## #08 — Sửa đề xuất Soak và sinh plan

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 16:20
- **Prompt:**

```
Mình đã kiểm tra lại đề xuất soak của bạn và thấy một chỗ sai, cần sửa trước khi sinh plan:

1. Bạn kết luận "cột IdleTime = 0 nên bài Stress không có think-time". Sai:
   - IdleTime trong JMeter không ghi thời gian chờ của timer, nên luôn bằng 0 dù có think-time.
   - Plan 23120175_Stress_20261121.jmx có 4 Uniform Random Timer: delay 0, range 50 (0–50 ms).
   - Chính số liệu của bạn chứng minh: 45 request/giây/thread → mỗi vòng 5 request mất ~110 ms,
     trong đó ~100 ms là timer, chỉ ~10 ms là server xử lý.
   - Mình đã đo thử không think-time: Node bão hòa ở ~50 thread, ~11.400 request/giây;
     150 thread không think-time thì p95 lên ~27 ms. Vậy để timer = 0 ở 150 thread là vượt bão hòa,
     không còn là soak 75%.
   Hãy giải thích ngắn gọn vì sao bạn đọc sai.

2. Sinh file hw05/23120175_Soak_20261121.jmx từ plan Stress (giữ luồng, CSV, assertion,
   setUp lockout, xử lý bỏ qua vòng lặp khi lỗi):
   - Thread Group thường: 150 thread, ramp-up 60 giây, duration 960 giây
   - GIỮ timer 0–50 ms như Stress
   - Listener: không thêm listener mới (3 plan chính đã dùng đủ 3 loại khác nhau)
   - Ghi chú trong Test Plan: mục tiêu ~6.700 request/giây ≈ 59% điểm bão hòa đo được (~11.400)
   - Lệnh chạy phải có -Jhttpclient.reset_state_on_thread_group_iteration=false
     (thiếu thì macOS hết cổng TCP, lỗi BindException)

3. Ước tính dung lượng soak.jtl (~131 byte/dòng) và đề xuất cách lưu lên GitHub (giới hạn 100 MB).

4. Viết script hw05/scripts/record_node_rss.sh từ đoạn ghi RAM bạn đưa, tự dừng khi file
   soak.jtl ngừng thay đổi hoặc khi nhận Ctrl+C.

Chạy thử plan Soak với 3 thread trong 30 giây để chắc plan mở được và luồng pass. Chưa chạy bản thật.
```

- **AI output:**
  - Giải thích chỗ sai: cột `IdleTime` không ghi thời gian Uniform Random Timer, nên bằng 0 dù timer vẫn chạy. Bốn timer 0–50 ms (trung bình khoảng 25 ms) cộng khoảng 10 ms xử lý năm request cho một vòng khoảng 110 ms, khớp khoảng 45 request/giây mỗi thread. Tắt timer là bài khác: Node bão hòa khoảng 50 thread, khoảng 11.400 request/giây.
  - Tạo `hw05/23120175_Soak_20261121.jmx` từ plan Stress. Thread Group thường `TG Soak 150x960s`: 150 thread, ramp-up 60 giây, duration 960 giây. Giữ CSV, assertion, setUp lockout, bỏ qua phần còn lại của vòng khi login hoặc apply-coupon lỗi, và bốn timer delay 0 / range 50. Không gắn listener. Ghi chú trong Test Plan: mục tiêu khoảng 6.700 request/giây, khoảng 59% của khoảng 11.400. Lệnh chạy có `-Jhttpclient.reset_state_on_thread_group_iteration=false`.
  - `stress.jtl` đo được 131,95 byte/dòng. Soak ước lượng khoảng 6,23 triệu dòng, khoảng 784 MB thô, gzip khoảng 38 MB (tỷ lệ nén của `stress.jtl` là 4,8%). GitHub từ chối file trên 100 MB. Thêm `hw05/results/soak.jtl` vào `.gitignore`, cùng cách với `stress.jtl`: repo giữ `soak.jtl.gz`, bản gốc để trong zip nộp bài. Commit thêm `statistics.json`.
  - Viết `hw05/scripts/record_node_rss.sh`: ghi `epoch_ms,rss_kb` mỗi 5 giây. Dừng khi `soak.jtl` không đổi trong 15 giây, khi Ctrl+C, hoặc khi process cổng 3000 tắt.
  - Lần thử đầu backend không chạy, 592.758 sample lỗi kết nối. Bật lại `node server.js` (DB seed lại) và chạy `create_users.sh`: 200 user, id 3–202. Chạy lại 3 thread trong 30 giây: plan mở được. `01_Login` đến `05_Checkout` 0 lỗi (765, 765, 763, 762, 762 sample). `LOCK_01`–`LOCK_03` đúng. `LOCK_04` lỗi 1 sample, assertion chờ HTTP 200, server trả 403 sau hai lần sai mật khẩu. Chưa chạy 150 thread.
  - File: `hw05/23120175_Soak_20261121.jmx`, `hw05/scripts/record_node_rss.sh`, `.gitignore`, `hw05/data/users.csv`

---

## #09 — Viết báo cáo Task 1

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-21 17:05
- **Prompt:**

```
hãy viết báo cáo phần task 1
```

- **AI output:**
  - Tính lại số liệu trực tiếp từ `results/load.jtl`, `stress.jtl`, `spike.jtl`, `soak.jtl` (bỏ sample `LOCK_*`), theo từng bước và theo cửa sổ thời gian (Load 60 giây, Spike 10 giây, Soak 1 phút).
  - Load: 10.739 request, 0 lỗi luồng chính, ổn định ~18,9 request/giây, p95 = 4 ms, p99 = 5 ms, max 41 ms; `05_Checkout` chậm nhất (trung bình 3,7 ms). Stress: 1.852.603 request, đỉnh ~8.900 request/giây ở 200 thread, p95 2–3 ms, 0 lỗi luồng chính. Spike: 14.473 request; nền ~24 request/giây, đỉnh ~186 request/giây ở 150 thread, p95 4–5 ms suốt bài.
  - Phát hiện: Spike quá nhẹ, đỉnh chỉ < 3% năng lực ổn định (~6.800 request/giây), nên chưa thử được đột biến gần ngưỡng. Ghi là hạn chế, đề xuất spike tới vùng 6.000–11.000 request/giây.
  - Phát hiện: percentile trong `reports/soak/statistics.json` khác giá trị tính từ `.jtl`: Total p99 3 ms (report) so với 86 ms (`.jtl`); `01_Login` p99 110 so với 58 ms; `04_ApplyCoupon` p99 211 so với 177 ms. Báo cáo dùng giá trị từ `.jtl`; nguyên nhân chưa xác minh.
  - Viết `hw05/REPORT_TASK1.md` 11 mục: môi trường, luồng và nhóm endpoint, CSV, quy trình AI theo AILOG, thiết kế 3 kịch bản, bảng review 10 dòng (thêm dòng 10: AI đọc sai `IdleTime` khi đề xuất Soak), thực thi và các bước reset lockout, kết quả, ngưỡng chịu tải, bug #225–#229, hạn chế.
  - Còn TODO: ảnh JMeter + resource monitor cho Load/Stress/Spike, ảnh 3 listener, ảnh các bước reset lockout, link video. AILOG chưa có mục cho bước sinh plan Spike.
  - File: `hw05/REPORT_TASK1.md`

---

## #10 — Phân tích statistics.json bốn lần chạy

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:11
- **Prompt:**

```
Mình chạy performance test backend EShop (Node.js + Express + SQLite) bằng JMeter trên MacBook Air M5,
JMeter và backend chạy chung máy. Luồng mỗi vòng lặp: 01_Login → 02_ProductDetail → 03_AddToCart
→ 04_ApplyCoupon → 05_Checkout. Mình đính kèm statistics.json của 4 lần chạy:
- Load: 30 thread, ramp-up 60 s, 600 s, think-time 1–3 s
- Stress: Stepping Thread Group 20 → 200 thread, +20 mỗi 25 s, think-time 0–50 ms
- Spike: nền 20 thread, spike +130 thread trong 10 s, giữ 40 s, think-time 0,5–1,5 s
- Soak: 150 thread, ramp-up 60 s, 960 s, think-time 0–50 ms

Hãy:
1. Với từng lần chạy, tóm tắt throughput, thời gian phản hồi (mean, p90, p95, p99, max), tỉ lệ lỗi.
2. Đánh giá từng kịch bản đạt hay không, bước nào là nút thắt.
3. Đề xuất ngưỡng hiệu năng (SLA) cho hệ thống: p95, p99, error rate, throughput tối thiểu, kèm lý do.
4. Kết luận năng lực tối đa của hệ thống trên m��y này.
Trình bày bằng bảng, ghi rõ mỗi con số lấy từ trường nào của file.
```

- **AI output:**
  - Đọc `hw05/reports/{load,stress,spike,soak}/statistics.json`. Đối chiếu `dashboard.js`: `pct1ResTime` = p90, `pct2ResTime` = p95, `pct3ResTime` = p99. `throughput` là trung bình cả lần chạy, gồm cả lúc tăng và giảm thread.
  - `Total.throughput`: Load 17,90; Stress 5.292,79; Spike 51,81; Soak 5.886,43 request/giây. `Total.pct2ResTime`: 4, 2, 4, 2 ms. Lỗi nghiệp vụ của năm bước: `errorCount` = 0. Một lỗi `Total` ở cả bốn bài là `LOCK_04` (`errorCount` = 1).
  - Nút thắt: Load và Spike là `05_Checkout` (mean 3,74 ms và 3,07 ms). Stress và Soak là `04_ApplyCoupon` (Soak p99 = 211 ms, max = 1.145 ms). `03_AddToCart` có mean thấp nhất vì chỉ ghi RAM. `Total.pct3ResTime` của Soak là 3 ms trong khi p99 từng bước là 48–211 ms, vì đuôi của một bước chỉ chiếm khoảng một phần năm số sample.
  - Ngưỡng đề xuất, áp cho từng label `01`–`05`: p95 ≤ 50 ms, p99 ≤ 100 ms, error rate ≤ 0,1%, throughput tối thiểu ≥ 15 request/giây ở profile Load. Load, Stress, Spike đạt. Soak vượt p99 100 ms ở Login, ProductDetail, Checkout và ApplyCoupon.
  - Năng lực đọc từ bốn file: khoảng 5.300–5.900 request/giây trung bình với think-time 0–50 ms mà p95 vẫn vài millisecond. Giữ 150 thread khoảng 16 phút thì đuôi p99 của coupon và checkout khoảng 200 ms, max trên 1 giây. Mốc khoảng 11.400 request/giây khi tắt think-time không có trong bốn file này.
  - Số trong mục này lấy từ `statistics.json`, không tính lại từ `.jtl`. Mục #09 đã ghi percentile của Soak trong report khác giá trị tính từ `.jtl`.
  - File: không tạo/sửa file ở lượt này.

---

## #11 — Phân tích .jtl theo cửa sổ thời gian

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:14
- **Prompt:**

```
Statistics.json chỉ là số tổng. Giờ hãy phân tích file .jtl thô (stress và soak đang nén .gz,
soak.jtl khoảng 714 MB nên cần đọc theo luồng, không nạp hết vào RAM).
Bạn có thể viết script Python để tính.

1. Với Stress: throughput, p95, p99 theo từng cửa sổ 30 giây, kèm số thread (cột allThreads).
   Hệ thống bão hòa ở đâu?
2. Với Spike: so sánh trước, trong và sau spike (cửa sổ 10 giây). Hệ thống có phục hồi không?
3. Với Soak: throughput, p95, p99, max theo từng phút; ghép với RSS của node trong soak_node_rss.csv
   (epoch_ms cùng đơn vị với cột timeStamp). Có suy giảm theo thời gian không? Nguyên nhân?
4. Các số liệu này có khớp với statistics.json ở bước trước không? Nếu lệch, số nào đúng?
Chỉ dùng số đọc được từ file, ghi rõ cột nào của .jtl dùng cho mỗi chỉ số.
```

- **AI output:**
  - Đọc theo dòng `hw05/results/stress.jtl` (233 MB), `spike.jtl` (1,9 MB), `soak.jtl` (681 MB). Phân vị nearest-rank trên cột `elapsed` làm tròn millisecond. Throughput dùng `timeStamp`. Thread là max `allThreads` trong cửa sổ. Lỗi dùng `success`. Cửa sổ bỏ sample `LOCK_*`.
  - Stress, cửa sổ 30 giây: từ 20 thread / 813 request/giây lên 200 thread / 8.861 rồi 8.930 request/giây. p95 giữ 2–3 ms, p99 3–5 ms, lỗi 0%. Request/giây mỗi thread ở bậc 20 là 40,6 và ở bậc 200 là 44,6. Cửa sổ giây 330 dài 20 giây vì test dài 350,0 giây và thread đang hạ. Trong bài này chưa bão hòa. Mức cao nhất còn khỏe: 200 thread, khoảng 8.930 request/giây.
  - Spike, cửa sổ 10 giây: nền giây 20–70 là 20 thread, 24,2–25,3 request/giây, p95 4–5 ms. Đỉnh giây 90–120 là 150 thread, 184–187 request/giây, p95 4 ms, p99 5 ms. Giây 140, cửa sổ đầu sau khi còn 20 thread, về 24,6 request/giây, p95 4 ms, p99 5 ms, lỗi 0%. Có phục hồi ngay. Đỉnh 187 request/giây bằng khoảng 2% của 8.930 request/giây ở Stress.
  - Soak, 960,06 giây, 150 thread từ phút 1 đến phút 15. Phút 1–7: khoảng 6.820 request/giây, p95 2 ms, p99 3 ms. Từ phút 8: throughput khoảng 5.300 request/giây (giảm khoảng 22%), p99 khoảng 200 ms, p99 `04_ApplyCoupon` 188 ms và `05_Checkout` 144 ms ngay phút 8, sau đó vùng 200–325 ms. Max lên 1.145 ms. RSS từ 80.528 KB (78,6 MB) lên 327.376 KB (319,7 MB), khoảng +241 MB. Có nhịp RSS tụt ở phút 7 và phút 14. Không hồi đến hết bài.
  - Nguyên nhân: `POST /api/cart` chỉ `push` vào `userCarts` và không xóa. Khoảng 1.360 lần thêm giỏ mỗi giây. RSS tăng khoảng 15 MB/phút. Nhịp RSS tụt phút 7 rồi độ trễ gãy phút 8 khớp GC trên một thread Node. Hai bước đụng SQLite chậm nhất sau đó.
  - `sampleCount`, `errorCount`, `meanResTime`, `maxResTime`, `throughput` khớp `statistics.json` ở cả ba file. Percentile khớp ở Stress và Spike. Soak thì không: `Total.pct3ResTime` trong json là 3 ms, cột `elapsed` cho p99 = 86 ms. Login 110 so với 58, ApplyCoupon 211 so với 177, Checkout 189 so với 127. Phân vị đúng là cột `elapsed`. Mean và throughput của file tổng vẫn đúng.
  - File: không tạo/sửa file ở lượt này.

---

## #12 — Đề xuất tối ưu hiệu năng

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:18
- **Prompt:**

```
Dựa trên kết quả phân tích và code backend, hãy đề xuất các cách tối ưu hiệu năng
Với mỗi đề xuất: vấn đề nó giải quyết, chỗ cần sửa trong code, mức cải thiện dự kiến
(ước lượng bằng con số), rủi ro.
```

- **AI output:**
  - Năm đề xuất, chỉ đề xuất, chưa sửa code. Số cải thiện là ước lượng từ cửa sổ Soak/Stress đã đo.
  - Xóa `userCarts[userId]` sau `INSERT` orders thành công trong `POST /api/checkout` (`server.js`). Giữ soak 150 thread quanh 6.800 request/giây, p95 khoảng 2 ms, p99 khoảng 3 ms suốt 15 phút, thay vì rơi xuống khoảng 5.300 request/giây và p99 khoảng 200 ms từ phút 8. RSS dưới khoảng 150 MB thay vì 320 MB. Rủi ro: `GET /api/cart` sau checkout trả mảng rỗng.
  - `PRAGMA journal_mode=WAL`, `synchronous=NORMAL`, `busy_timeout=5000` ngay sau khi mở DB trong `database.js`. Mặt phẳng 6.820 request/giây bị think-time chặn nên gần như không đổi. Trần tắt think-time (khoảng 11.400 request/giây) ước lượng lên khoảng 12.500–13.500. Rủi ro: file `-wal`/`-shm`, có thể mất transaction cuối nếu mất điện.
  - Bỏ `SELECT COUNT(*)` trên `coupon_usage` trong nhánh `user_id` của `POST /api/apply-coupon`, hoặc cache 3 mã. Bớt khoảng một phần sáu lệnh SQLite mỗi vòng. Mean ApplyCoupon ở Stress 1,29 ms có thể về gần 1 ms. Không kéo p99 phút 8–15 về 3 ms nếu chưa xóa giỏ. Rủi ro: `max_uses_per_user` sai nếu không còn đếm; cache cũ khi admin sửa mã lúc process đang chạy.
  - Chỉ `UPDATE login_attempts` khi attempts khác 0 hoặc `locked_until` khác null. Sau vài giây, mỗi vòng còn một lần ghi thay vì hai. Cùng WAL, đây là phần chính của ước lượng trần 12.500–13.500 request/giây. Với timer 0–50 ms, throughput vẫn quanh 6.800. Rủi ro: hai login đúng song song cùng email vẫn có thể cùng ghi, không tệ hơn hiện tại vì `UPDATE` cũng không nằm trong transaction.
  - `CREATE INDEX idx_users_email ON users(email)`. Với khoảng 200 user: dưới 1% throughput, mean login khó giảm quá 0,1 ms. Không thêm `UNIQUE` vì register trùng email sẽ đổi từ thành công sang lỗi.
  - File: không tạo/sửa file ở lượt này.

---

## #13 — Phân loại commit nào cần chạy performance test

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:30
- **Prompt:**

```
Repo EShop gồm backend (Node.js + Express + SQLite, backend/server.js, backend/database.js),
3 frontend (frontend-web, frontend-admin, frontend-mobile) và thư mục hw05 chứa test plan JMeter.
Mình muốn một cơ chế tự quyết định commit nào cần chạy performance test.

1. Phân loại các đường dẫn/loại thay đổi thành: bắt buộc chạy, chạy nhẹ, bỏ qua. Giải thích vì sao
   mỗi loại ảnh hưởng (hoặc không) tới 5 API trong luồng test: login, product detail, cart,
   apply-coupon, checkout.
2. Ngoài đường dẫn file, còn tín hiệu nào nên dùng (nội dung diff, dependency đổi version,
   nhãn PR, commit message...)? Cái nào dễ bị lừa?
3. Đề xuất quy tắc cụ thể dạng bảng, kèm ví dụ commit minh họa cho từng loại.
```

- **AI output:**
  - Năm API dùng chung một process Node và một connection SQLite, nên sửa một handler có thể làm chậm cả luồng. Quyết định theo đường dẫn, rồi nâng hoặc hạ bằng nội dung diff. Nhãn PR và commit message không được hạ mức.
  - Bắt buộc: middleware `app.use` / `bodyParser`, `authenticateToken`, thân năm route, `userCarts`, `database.js` khi đổi connection, PRAGMA, schema hoặc index của `users` / `products` / `coupons` / `coupon_usage` / `orders`, seed làm bảng lớn hơn, và lockfile khi đổi version đã resolve của `express`, `body-parser`, `cors`, `jsonwebtoken`, `sqlite3`. File `backend/**/*.js` mới được `server.js` nạp cũng bắt buộc, không khóa cứng chỉ hai file hiện có.
  - Chạy nhẹ, không ghi baseline: handler mà luồng JMeter không gọi (forgot/reset password, users/me, CRUD product, category, admin, coupon-usage, hủy đơn) nếu hunk không đụng middleware hay `userCarts`; chỉ đổi số seed khi schema và số dòng giữ nguyên.
  - Bỏ qua: ba frontend (JMeter gọi `localhost:3000`), `backend/database.sqlite` vì `initDatabase()` DROP và seed lại mỗi lần khởi động, `backend/test_profile.js`, `hw05/**`, comment và khoảng trắng. Index bảng `categories` cũng bỏ qua vì không nằm trên năm API.
  - Tín hiệu dễ lừa: nhãn `skip-perf`, commit message, số dòng diff, `frontend-web/src/pages/Checkout.jsx` (cùng tên API nhưng không nằm trên đường đo), `package.json` đổi range mà lockfile không đổi.
  - Commit lấy mức cao nhất trong các file. Ví dụ thật ở nhóm bỏ qua: `2abb497` `hw05: test plan Load`.
  - File: không tạo/sửa file ở lượt này.

---

## #14 — Pipeline perf test nhiều tầng và ngưỡng p95

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:32
- **Prompt:**

```
Dựa trên kết quả thật của mình (Load p95 4 ms, Stress đỉnh ~8.900 req/s, Soak suy giảm từ phút 8,
lỗi LOCK_04 luôn fail vì bug #225), hãy thiết kế pipeline perf test nhiều tầng:
- tầng chạy mỗi commit/PR (thời gian tối đa bao lâu?),
- tầng chạy khi merge vào main,
- tầng chạy định kỳ (nightly/weekly).
Với mỗi tầng: kịch bản nào, bao nhiêu thread, chạy bao lâu, chạy ở đâu (máy nào), chi phí thời gian.

Sau đó thiết kế tiêu chí cảnh báo p95 regression:
- so với baseline nào (lần chạy trước? trung vị N lần gần nhất? nhánh main?),
- ngưỡng tương đối và tuyệt đối, cách xử lý độ nhiễu giữa các lần chạy,
- khi nào chỉ cảnh báo, khi nào chặn merge, khi nào tự chạy lại để xác nhận.
Mọi con số ngưỡng phải giải thích bằng số liệu của mình, không lấy số chung chung.
```

- **AI output:**
  - PR chạy nhẹ: 3 thread, 30 s, không chặn bằng p95. PR bắt buộc: 30 thread, think-time 0–50 ms, 90 s, trần job khoảng 3 phút, trên MacBook Air M5 self-hosted. Merge vào main: 80 thread, ramp 30 s + giữ 120 s. Nightly: đúng plan Soak 150 thread, 960 s, máy rảnh và cắm sạc. Weekly: đúng plan Stress ~350 s để xem đỉnh ~8.900 req/s. Số millisecond không so với runner GitHub.
  - Mỗi lần chạy khởi động lại backend, chạy lại `create_users.sh`, và dùng `-Jhttpclient.reset_state_on_thread_group_iteration=false`. p95 tính từ cột `elapsed`, từng label `01`–`05`, bỏ `LOCK_*`. `LOCK_04` fail vì bug #225 không làm pipeline đỏ.
  - Baseline là trung vị 5 lần đạt gần nhất trên `main`, cùng plan, cùng máy. Load p95 4 ms không dùng làm baseline cho profile 0–50 ms. Trong một lần chạy, p95 cùng profile đã nhảy 2 ms và 3 ms. Ngưỡng tương đối 10–20% nhỏ hơn 1 ms nên không dùng.
  - Đạt khi p95 ≤ trung vị + 1 ms. Cảnh báo và chạy lại một lần khi p95 ≥ trung vị + 3 ms. Chặn merge chỉ khi lần chạy lại của cùng label vẫn ≥ trung vị + 3 ms. Lần chậm không ghi vào baseline.
  - Nightly không thể chỉ nhìn p95: phút 8 p95 từ 2 lên 4 ms, trong khi p99 từ 3 lên 125 ms và throughput từ ~6.820 xuống 5.885 req/s. Cảnh báo thêm nếu từ phút 8 có p99 ≥ 20 ms, throughput < 6.120 req/s, hoặc p95 phút ≥ 9 ms. Weekly cảnh báo nếu đỉnh 200 thread < 8.000 req/s.
  - Tầng PR và merge cố ý không thấy rò rỉ giỏ hàng, vì sự cố đó chỉ hiện từ phút 8. Nightly không chặn merge.
  - File: không tạo/sửa file ở lượt này.

---

## #15 — Flow chart pipeline perf test

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:34
- **Prompt:**

```
Vẽ flow chart cho mô hình ở bước 1–2 bằng Mermaid (flowchart TD): từ lúc có commit/PR,
bước phân loại thay đổi, chọn tầng test, chuẩn bị môi trường (khởi động backend, tạo user,
reset lockout), chạy JMeter, tính p95 từ .jtl, so baseline, quyết định pass/cảnh báo/chặn/chạy lại,
cập nhật baseline, thông báo. Mỗi nút ngắn gọn, nhánh quyết định ghi rõ điều kiện.
```

- **AI output:**
  - Vẽ một `flowchart TD` với hai lối vào: commit/PR và lịch nightly/weekly. Phân loại diff ra bỏ qua, chạy nhẹ (3 thread, 30 giây), PR bắt buộc (30 thread, 90 giây) và merge vào main (80 thread, 150 giây).
  - Chuẩn bị môi trường là restart node, tạo user, xóa lockout, rồi chạy JMeter. p95 tính từ `elapsed`, bỏ `LOCK_*`. Lỗi ở 5 label chính thì restart và chạy lại một lần. Lần hai vẫn lỗi thì báo lỗi môi trường, không ghi baseline.
  - PR và merge: lệch tối đa 1 ms thì pass. p95 ≥ trung vị main + 3 ms thì chạy lại một lần. Cùng label vẫn ≥ +3 ms thì chặn merge. Chạy lại về mức khỏe thì chỉ cảnh báo, bỏ lần chậm.
  - Nightly xét p95 phút 1–7 và điều kiện từ phút 8 (p99 ≥ 20 ms, dưới 6.120 req/s, hoặc p95 ≥ 9 ms). Weekly xét đỉnh dưới 8.000 req/s. Cả hai chỉ cảnh báo, không chặn merge.
  - Baseline chỉ ghi khi pass trên `main`. p95 cả file Soak vẫn 2 ms dù phút 8 đã hỏng, nên nightly xét từng phút. Nhãn PR và commit message không nằm trên sơ đồ.
  - File: không tạo/sửa file ở lượt này.

---

## #16 — Lưu flow chart ra file

- **AI tool:** Cursor (Grok 4.7)
- **Date & time:** 2026-11-21 17:35
- **Prompt:**

```
tạo file đi
```

- **AI output:**
  - Ghi sơ đồ Mermaid ở mục #15 và đoạn giải thích baseline vào `hw05/PERF_PIPELINE_FLOW.md`. Không đổi nội dung sơ đồ.
  - File: `hw05/PERF_PIPELINE_FLOW.md`

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
