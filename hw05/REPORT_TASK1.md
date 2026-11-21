# HW05 – Performance Testing · Task 1: Thiết kế và thực thi kiểm thử hiệu năng có AI hỗ trợ

- **Sinh viên:** 23120175
- **SUT:** EShop backend (`backend/server.js`, Node.js + Express + SQLite), `http://localhost:3000`
- **Công cụ:** Apache JMeter 5.6.3 (+ plugin `jpgc-casutg` 3.1.1), htop, curl
- **AI:** Cursor (Grok 4.7) sinh và chỉnh test plan; Claude Code (Claude Opus 5.5) review, đo kiểm chứng. Nhật ký đầy đủ: [`AILOG.md`](AILOG.md)
- **Nhánh:** `hw05/toanhuynh`

> Các mục đánh dấu **TODO** là phần bằng chứng cần bổ sung trước khi nộp.

---

## 1. Môi trường

JMeter và backend chạy **chung một máy**, nên kết quả phản ánh giới hạn của cả hai.

| Thành phần | Giá trị |
|---|---|
| Máy | MacBook Air 13-inch M5 (2026), Mac17,3, **không quạt** |
| CPU | Apple M5, 10 nhân (4 Super + 6 Efficiency) |
| RAM | 16 GB |
| OS | macOS 27.2 (26B123), arm64 |
| Hostname | `CT-TOAN-HUYNH` |
| Backend | Node.js, một process, một luồng xử lý chính |

Bằng chứng: [`evidence/hardware/`](evidence/hardware/) (`fastfetch`, `system_profiler`, bảng spec).

---

## 2. Luồng end-to-end và độ phủ nhóm endpoint

Mỗi virtual user lặp lại luồng 5 bước:

```
01_Login → 02_ProductDetail → 03_AddToCart → 04_ApplyCoupon → 05_Checkout
```

| Bước | API | Nhóm | Lý do |
|---|---|---|---|
| 01_Login | `POST /api/login` | **Auth-heavy** | Đọc user, so mật khẩu, ghi lại `login_attempts`, ký JWT; chịu cơ chế khóa tài khoản FR-02 |
| 02_ProductDetail | `GET /api/products/:id` | **Read-heavy** | `SELECT` theo id, không cần token |
| 03_AddToCart | `POST /api/cart` | **Transactional** | Ghi giỏ hàng (lưu trong RAM), cần JWT |
| 04_ApplyCoupon | `POST /api/apply-coupon` | Transactional (nghiệp vụ) / read (code) | Theo code chỉ `SELECT` và tính toán; xếp vào transactional vì là một bước của giao dịch mua hàng |
| 05_Checkout | `POST /api/checkout` | **Transactional** | `INSERT` vào bảng `orders`, cần JWT |

Luồng không trùng với các bạn trong nhóm: điểm phân biệt là bước **áp mã giảm giá (FR-09)**.

**Correlation:** token lấy từ `01_Login` bằng JSON Extractor `$.token`, gắn `Authorization: Bearer ${token}` cho bước 03 và 05; `final_amount` lấy từ bước 04 làm `total_amount` của bước 05.

---

## 3. Dữ liệu CSV (data-driven)

| File | Nội dung | Cấu hình CSV Data Set |
|---|---|---|
| [`data/users.csv`](data/users.csv) | 200 tài khoản `loaduser001…200@eshop.com` (email, password, user_id), tạo bằng [`scripts/create_users.sh`](scripts/create_users.sh) | Recycle on EOF = true, Stop thread = false, Sharing = All threads |
| [`data/products.csv`](data/products.csv) | 5 sản phẩm seed (id, price) | như trên |
| [`data/coupons.csv`](data/coupons.csv) | `BIGBUY`, `VIP100` (mã còn hiệu lực, không dính bug) | như trên |
| [`data/coupons_negative.csv`](data/coupons_negative.csv) | `EXPIRED`, dành cho test negative | không dùng trong tải chính |

`SAVE10` bị loại khỏi tải chính vì dính bug tính tiền (#20): giữ lại sẽ làm 1/3 vòng lặp lỗi assertion và che mất số liệu hiệu năng.

---

## 4. Quy trình dùng AI từng bước

AI được dẫn dắt theo đúng các bước của kỹ thuật, không dùng một prompt chung chung. Prompt nguyên văn và output ở [`AILOG.md`](AILOG.md).

| Bước | Việc | AI | Log |
|---|---|---|---|
| 1 | Phân tích SUT: endpoint, header, body, giá trị cần trích xuất; phân loại nhóm; hành vi ảnh hưởng test tải | Cursor | #01 |
| 2 | Thiết kế CSV và script tạo 200 user | Cursor | #02 |
| 3 | Chọn tham số Load/Stress/Spike theo cấu hình máy | Cursor | #03 |
| 4 | Sinh plan Load | Cursor | #04 |
| 5 | Sinh plan Stress | Cursor | #05 |
| 6 | Sinh plan Spike | Cursor | **TODO: chưa có mục log** |
| 7 | Review 3 plan theo 8 tiêu chí, sửa lỗi, chạy thử | Claude Code + tự kiểm tra | [`REVIEW_TESTPLANS.md`](REVIEW_TESTPLANS.md) |
| 8 | Tăng tải Stress sau khi đo không tìm được điểm bão hòa | Claude Code | #06 |
| 9 | Đề xuất và sinh plan Soak (AI đọc sai `IdleTime`, đã sửa) | Cursor | #07, #08 |

---

## 5. Thiết kế 3 kịch bản

| | Load | Stress | Spike |
|---|---|---|---|
| File | `23120175_Load_20261121.jmx` | `23120175_Stress_20261121.jmx` | `23120175_Spike_20261121.jmx` |
| Thread Group | Thread Group thường | Stepping Thread Group (plugin) | Ultimate Thread Group (plugin) |
| Số thread | 30 | 20 → 200, mỗi bậc +20 sau 25 s | nền 20, spike +130 (đỉnh 150) |
| Ramp-up | 60 s | 5 s mỗi bậc | nền 20 s, spike 10 s |
| Thời lượng | 600 s | ≈ 350 s (giữ đỉnh 60 s) | ≈ 280 s (spike giữ 40 s, phục hồi 120 s) |
| Think-time (Uniform Random) | 1–3 s | 0–50 ms | 0,5–1,5 s |
| Listener | **Aggregate Report** | **Summary Report** | **View Results Tree** (chỉ lỗi) |
| Ngưỡng chấp nhận | p95 < 300 ms, lỗi < 1% | tìm điểm p95 tăng / throughput ngừng tăng | p95 < 1 s lúc spike, phục hồi về mức nền |

**Lý do chọn tham số**
- **Load:** 30 người dùng đồng thời với think-time 1–3 s mô phỏng tải bình thường; ramp-up 60 s tránh biến Load thành spike.
- **Stress:** think-time gần 0 để mỗi thread tạo ~45 request/giây, đủ đẩy backend lên vùng cao. Bản đầu (200–500 ms) chỉ đạt ~700 request/giây ở 200 thread, không tìm được điểm gãy (review dòng 8).
- **Spike:** tăng 130 thread trong 10 giây để mô phỏng đột biến, sau đó giữ tải nền 120 s để quan sát phục hồi.

**Thành phần chung của cả 3 plan** (sau review):
- **Assertion:** mã HTTP 200 và JSON cho từng bước (`$.token`, `$.id` khớp `product_id`, `"Added to cart"`, `$.success`, `$.orderId`); JSR223 kiểm tra `discount_amount >= 0` và `final_amount <= total_amount`.
- **Xử lý lỗi:** login lỗi (bất kỳ mã nào) hoặc áp mã lỗi thì bỏ phần còn lại của vòng lặp (If Controller + Start Next Thread Loop), tránh lỗi dây chuyền đổ sai cho bước sau. Login 403 được gắn nhãn `01_Login_403_Locked`.
- **Kiểm tra lockout:** setUp Thread Group đăng ký tài khoản riêng, sai mật khẩu 2 lần (kỳ vọng 401), rồi đúng mật khẩu (kỳ vọng 200 theo FR-02).

---

## 6. Human review: AI sai gì, sửa thế nào, vì sao AI bỏ sót

Chi tiết và kiểm chứng: [`REVIEW_TESTPLANS.md`](REVIEW_TESTPLANS.md).

| # | AI sai/thiếu | Sửa | Vì sao AI bỏ sót |
|---|---|---|---|
| 1 | Assertion áp mã chỉ kiểm tra `success = true`, để lọt bug `SAVE10` (tổng tiền ×10) | JSR223 kiểm tra số tiền; bỏ `SAVE10` khỏi tải chính | Đặc thù endpoint: response "trông" thành công; prompt không yêu cầu kiểm tra ngữ nghĩa số tiền |
| 2 | Load không xử lý login thất bại: 1 lỗi login thành 3 lỗi | If Controller `last_sample_ok == false` → Start Next Thread Loop | Prompt chỉ yêu cầu xử lý lockout ở plan Stress; AI sinh từng plan độc lập |
| 3 | Stress/Spike chỉ bỏ qua khi login trả 403 | Bỏ qua mọi lỗi login, giữ nhãn riêng cho 403 | AI làm đúng nghĩa đen của prompt |
| 4 | Có code xử lý lockout nhưng không bao giờ chạy (mọi user đúng mật khẩu) | setUp Thread Group kiểm tra lockout thật | Prompt chỉ yêu cầu "xử lý", không yêu cầu "kiểm thử" lockout |
| 5 | Áp mã lỗi vẫn gửi checkout với JSON hỏng | Bỏ checkout khi bước 04 lỗi | AI không lần theo hậu quả của giá trị mặc định ở bước sau |
| 6 | Think-time Stress/Spike 200–500 ms, không thực tế | Stress 0–50 ms (có chủ đích), Spike 0,5–1,5 s | AI tối ưu cho đẩy tải, bỏ qua tính thực tế |
| 7 | Spike chỉ quan sát phục hồi 40 s | Tăng lên 120 s | AI rút ngắn thời lượng cho "gọn" |
| 8 | Stress không đủ tải để tìm điểm gãy (~700 req/s, p95 3 ms) | Giảm think-time; đo được Node bão hòa ~11.400 req/s ở ~50 thread khi không think-time | AI không ước lượng throughput mỗi thread so với năng lực server |
| 9 | Không lường trước macOS hết cổng TCP khi giảm think-time (`BindException`, 28% lỗi giả) | Chạy với `-Jhttpclient.reset_state_on_thread_group_iteration=false` | Lỗi nằm ở môi trường máy test, AI không chạy thử nên không thấy |
| 10 | Đề xuất Soak: đọc cột `IdleTime = 0` thành "không có think-time", đề xuất đặt timer về 0 ở 150 thread (vượt điểm bão hòa) | Giữ think-time 0–50 ms; `IdleTime` không ghi thời gian timer; 45 req/s/thread chứng minh có think-time | AI suy luận từ tên cột thay vì ngữ nghĩa của JMeter (AILOG #07, #08) |

---

## 7. Thực thi

### 7.1 Lệnh chạy (thư mục `hw05/`)

```bash
jmeter -n -t 23120175_Load_20261121.jmx   -l results/load.jtl   -e -o reports/load
jmeter -n -t 23120175_Stress_20261121.jmx -l results/stress.jtl -e -o reports/stress \
  -Jhttpclient.reset_state_on_thread_group_iteration=false
jmeter -n -t 23120175_Spike_20261121.jmx  -l results/spike.jtl  -e -o reports/spike
```

Chạy thử nhanh trước khi chạy thật: [`scripts/smoke_test.sh`](scripts/smoke_test.sh) (bản rút gọn trong thư mục tạm, không sửa plan gốc).

### 7.2 Reset lockout giữa các lần chạy

Mỗi plan cố ý khóa 1 tài khoản trong setUp; ngoài ra login lỗi dưới tải cao có thể làm tăng `login_attempts`. Trước **mỗi** lần chạy:

1. Dừng backend (Ctrl+C trong terminal chạy `node server.js`).
2. Khởi động lại: `cd backend && node server.js`. Hàm `initDatabase()` xóa và seed lại toàn bộ DB, nên `login_attempts`, `locked_until`, `orders`, `coupon_usage` về trạng thái ban đầu; giỏ hàng trong RAM (`userCarts`) cũng bị xóa.
3. Tạo lại user test: `bash hw05/scripts/create_users.sh` (200 user, ghi lại `data/users.csv`).
4. Kiểm tra: `curl -s -X POST localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"loaduser001@eshop.com","password":"LoadUser123!"}'` trả token.

**TODO:** ảnh chụp các bước reset (hoặc đoạn trong video).

### 7.3 Bằng chứng

| Lần chạy | `.jtl` thô | Báo cáo HTML | Ảnh JMeter + resource monitor | Ảnh listener |
|---|---|---|---|---|
| Load | [`results/load.jtl`](results/load.jtl) | [`reports/load/`](reports/load/) | **TODO** | **TODO** Aggregate Report |
| Stress | `results/stress.jtl` (244 MB, nộp trong zip; repo lưu [`stress.jtl.gz`](results/stress.jtl.gz)) | [`reports/stress/`](reports/stress/) | **TODO** | **TODO** Summary Report |
| Spike | [`results/spike.jtl`](results/spike.jtl) | [`reports/spike/`](reports/spike/) | **TODO** | **TODO** View Results Tree |
| Soak | `results/soak.jtl` (714 MB, nộp trong zip; repo lưu [`soak.jtl.gz`](results/soak.jtl.gz)) | [`reports/soak/`](reports/soak/) | [`evidence/soak/`](evidence/soak/) (4 ảnh) | không áp dụng |

**Video demo:** **TODO** link YouTube (Unlisted).

---

## 8. Kết quả

Số liệu tính trực tiếp từ file `.jtl` (luồng chính, bỏ sample `LOCK_*`). Lỗi duy nhất trong mỗi file là `LOCK_04` (bug #225, kỳ vọng).

### 8.1 Tổng hợp

| Kịch bản | Request | Lỗi luồng chính | Throughput | p95 | p99 | Max |
|---|---|---|---|---|---|---|
| Load | 10.739 | 0 | ~18,9 req/s (ổn định) | 4 ms | 5 ms | 41 ms |
| Stress | 1.852.603 | 0 | đỉnh ~8.900 req/s ở 200 thread | 2 ms | 4 ms | 87 ms |
| Spike | 14.473 | 0 | nền ~24 req/s, đỉnh ~186 req/s | 4 ms | 5 ms | 28 ms |

### 8.2 Load: đạt

Tải giữ đều 30 thread, ~18,9 request/giây trong 9 phút sau ramp-up; p95 = 4 ms, p99 = 5 ms ở mọi phút, 0 lỗi. Phút đầu chậm hơn một chút (trung bình 2,95 ms so với ~2,1 ms các phút sau) do khởi động. Bước chậm nhất là `05_Checkout` (trung bình 3,7 ms, p95 5 ms), hợp lý vì là bước duy nhất ghi SQLite. **Đạt** ngưỡng p95 < 300 ms và lỗi < 1% với khoảng cách rất xa.

### 8.3 Stress: chưa chạm điểm gãy trong plan, điểm bão hòa đo riêng

| Thời điểm | Thread | Request/giây | p95 |
|---|---|---|---|
| 0–30 s | 20 | 814 | 3 ms |
| 90–120 s | 80 | 3.556 | 2 ms |
| 180–210 s | 140 | 6.315 | 2 ms |
| 270–330 s | 200 | 8.862–8.930 | 3 ms |

Throughput tăng tuyến tính (~45 request/giây mỗi thread), p95 không đổi, 0 lỗi: ở 200 thread với think-time 0–50 ms backend **chưa bão hòa**. Lần đo riêng không think-time (ghi trong review dòng 8, chạy ngoài plan nộp) cho thấy Node bão hòa ở **~50 thread, ~11.400 request/giây**; tăng lên 200 thread throughput giảm còn ~8.600 request/giây và p95 tăng từ 4 lên 35 ms, CPU `node` ~125–130% (một nhân chạy kín). Nút thắt là **luồng xử lý chính duy nhất của Node.js**: máy có 10 nhân nhưng backend chỉ dùng được một.

### 8.4 Spike: không suy giảm, nhưng biên độ spike quá nhỏ

| Giai đoạn | Thread | Request/giây | p95 |
|---|---|---|---|
| Nền trước spike (10–70 s) | 20 | ~24 | 4–5 ms |
| Spike (80–130 s) | 150 | ~183–189 | 4–5 ms |
| Phục hồi (140–260 s) | 20 | ~24–26 | 4–5 ms |

Hệ thống không suy giảm lúc spike và trở về mức nền ngay lập tức. **Hạn chế:** với think-time 0,5–1,5 s, đỉnh spike chỉ ~186 request/giây, chưa tới 3% năng lực đo được (~6.800 request/giây ổn định), nên kịch bản chưa thử được phản ứng của hệ thống với đột biến gần ngưỡng. Muốn spike có ý nghĩa cần spike tới vùng 6.000–11.000 request/giây (ví dụ think-time 0–50 ms, 50 → 200 thread).

### 8.5 Lưu ý khi đọc báo cáo HTML của JMeter

Với lần chạy lớn, percentile trong `statistics.json` khác giá trị tính trực tiếp từ `.jtl`:

| Soak | `statistics.json` | Tính từ `soak.jtl` |
|---|---|---|
| Total p99 | 3 ms | **86 ms** |
| `01_Login` p99 | 110 ms | **58 ms** |
| `04_ApplyCoupon` p99 | 211 ms | **177 ms** |

Báo cáo này dùng giá trị tính từ `.jtl`. Nguyên nhân chênh lệch chưa xác minh (có thể do cách report generator ước lượng percentile với dữ liệu lớn).

---

## 9. Ngưỡng chịu tải (Soak)

Chi tiết theo từng phút: [`SOAK_RESULT.md`](SOAK_RESULT.md). Plan `23120175_Soak_20261121.jmx`: 150 thread, think-time 0–50 ms, 16 phút, 5.651.325 request, 0 lỗi luồng chính.

| Chỉ số | Giá trị |
|---|---|
| **RPS ổn định tối đa** | **≈ 6.800 request/giây** trong phút 1–7, p95 = 2 ms, p99 = 3 ms |
| **RPS duy trì được suốt 15 phút** | **≈ 5.000–5.500 request/giây**, p95 ≤ 27 ms, p99 ≈ 190–236 ms |
| **Bắt đầu suy giảm** | Phút thứ 8: throughput −20%, p99 tăng ~70 lần (3 → 125–236 ms), vẫn 0 lỗi |
| **Memory ceiling** | RSS `node` 79 MB (trước khi chạy) → **329 MB** (cao nhất) (≈ 9–10 MB/phút), chưa chạm trần |
| **Điểm bão hòa** (đo riêng) | ~11.400 request/giây ở ~50 thread không think-time |

**Nhận định:** hệ thống không lỗi nhưng **suy giảm theo thời gian** dù tải không đổi, điều Load/Stress (≤ 10 phút) không thấy được. Giả thuyết chính: `userCarts` không giải phóng (#229) làm heap V8 phình, GC dừng lâu hơn. Giả thuyết khác chưa loại trừ: máy không quạt bị hạ xung khi chạy kín nhiều phút.

---

## 10. Bug và vấn đề hiệu năng

Tổng hợp: [`BUG_REPORTS.md`](BUG_REPORTS.md). **5 issue mới** (#225–#229, nhãn `hw05`) và **4 bug xác nhận lại** đã có issue (#20, #34, #68, #70).

| Issue | Nội dung | Loại |
|---|---|---|
| [#225](https://github.com/Taylor3691/eshop-sut/issues/225) | Khóa tài khoản sau 2 lần sai thay vì 3 | Chức năng |
| [#226](https://github.com/Taylor3691/eshop-sut/issues/226) | Lộ stack trace HTML khi JSON không hợp lệ | Bảo mật |
| [#227](https://github.com/Taylor3691/eshop-sut/issues/227) | `GET /api/products/:id` trả 200 `{}` khi không tồn tại | Chức năng |
| [#228](https://github.com/Taylor3691/eshop-sut/issues/228) | `price` dạng chuỗi với sản phẩm id chẵn | Chức năng |
| [#229](https://github.com/Taylor3691/eshop-sut/issues/229) | RAM tăng liên tục do `userCarts` không giải phóng | **Hiệu năng** |

---

## 11. Hạn chế

- JMeter và backend chạy chung một máy: ở tải cao JMeter (~35% CPU) cạnh tranh tài nguyên với backend.
- Điểm bão hòa ~11.400 request/giây đo bằng plan rút gọn ngoài 3 plan nộp; plan Stress nộp chưa chạm tới mức đó.
- Spike có biên độ quá nhỏ so với năng lực hệ thống (mục 8.4).
- Nguyên nhân suy giảm sau 7 phút ở Soak mới là giả thuyết, chưa có dữ liệu GC hoặc nhiệt độ để khẳng định.
