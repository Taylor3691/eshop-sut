# AI Audit Log — skill-demo/search

Tool: Cursor (Grok 4.7). Giờ lấy bằng `date` trên máy lúc làm bước đó.

## #1 — Bước 1, phân tích nhóm endpoint

- **Date & time:** 2026-11-22 19:50:16 +0700
- **Prompt:**

```
Mình làm performance test bằng JMeter cho EShop (Node/Express + SQLite, cổng 3000).
Nhóm endpoint cần test: read-heavy, không đăng nhập.
Luồng của một virtual user:
GET /api/categories → GET /api/products?search=<từ khóa> → GET /api/products/:id

Chưa sinh test plan. Hãy:
1. Với từng bước: method, URL, header cần có (đặc biệt Authorization), body mẫu, response thành công mẫu,
   giá trị cần trích xuất cho bước sau.
2. Phân loại từng bước vào nhóm auth-heavy / read-heavy / transactional, giải thích ngắn.
3. Chỉ ra hành vi trong code có thể ảnh hưởng tới kết quả test tải (khóa tài khoản, giới hạn dùng,
   dữ liệu lưu trong RAM, DB bị reset khi khởi động, response 200 kể cả khi lỗi...).
Chỉ dựa vào code đính kèm, nếu không chắc thì ghi rõ "không chắc".
```

- **AI output:** Cả ba bước là GET, không header `Authorization`, không body. Categories trả mảng 3 phần tử seed. Search trả mảng sản phẩm có `name LIKE '%từ khóa%'`, không có kết quả thì `[]` và HTTP 200; `'` làm SQLite lỗi và trả HTML 500. Chi tiết sản phẩm trả object; id không có thì HTTP 200 và `{}`; id chẵn thì `price` là chuỗi. Không trích token. Id cho bước 3 lấy từ CSV, không lấy từ kết quả search. Cả ba là read-heavy (`SELECT`). `initDatabase()` DROP và seed lại mỗi lần process khởi động. Một connection SQLite, không thấy WAL trong `database.js`. Khóa tài khoản không nằm trên luồng này.

## #2 — Bước 2, CSV

- **Date & time:** 2026-11-22 19:53:10 +0700
- **Prompt:**

```
Dựa trên phân tích trên, thiết kế dữ liệu CSV cho test plan:
1. keywords.csv: keyword,expect_hit. Có từ có kết quả, không có kết quả, có dấu tiếng Việt.
   products.csv: product_id,price từ 5 sản phẩm seed.
2. Loại khỏi tải chính những dữ liệu làm request lỗi theo thiết kế hoặc dính bug chức năng,
   giữ ở file negative riêng.
Với mỗi file: cấu hình CSV Data Set Config (Recycle on EOF, Stop thread on EOF, Sharing mode) và lý do.
```

- **AI output:** `data/keywords.csv` 17 dòng (UTF-8): có hit (`iPhone`, `Bàn phím`, `cơ`, …), không hit (`Nokia`, `Điện thoại`, `Laptop`, `Phụ kiện`, …). `Điện thoại` là không hit vì search chỉ xét `name`. `data/products.csv` id 1–5. `data/keywords_negative.csv`: `'`, `%`, `_`. CSV: recycle true, stopThread false, shareMode.all, ignoreFirstLine true, encoding UTF-8. Recycle vì bài chạy theo thời gian, không dừng khi hết file. shareMode.all để các thread dùng chung con trỏ, không cùng đọc một dòng ở mỗi vòng.

## #3 — Bước 3, tham số

- **Date & time:** 2026-11-22 19:53:10 +0700
- **Prompt:**

```
Máy chạy test và SUT là cùng một máy: Apple M5, 10 nhân, 16 GB, macOS 27.2.
Backend là Node một process, một connection SQLite.
Đề đã chốt Load demo: 30 thread, ramp-up 10 s, 120 s, think-time 0–50 ms.
ƯỚC LƯỢNG request/giây mỗi thread từ think-time và số request mỗi vòng, rồi so với năng lực dự kiến của server.
```

- **AI output:** 3 request/vòng, 2 timer Uniform Random offset 0 ms range 50 ms, think trung bình 50 ms/vòng. Thời gian xử lý của nhóm này lúc đó chưa đo. Ước lượng khoảng 50 request/s mỗi thread, khoảng 1.500 request/s ở 30 thread. Ngưỡng chấp nhận: p95 &lt; 50 ms, lỗi &lt; 1%. Thread Group thường. Không có Stress/Spike/Soak trong bài này.

## #4 — Bước 4, sinh plan

- **Date & time:** 2026-11-22 19:54:34 +0700
- **Prompt:**

```
Dùng plan_template.jmx làm khung. Giữ User Defined Variables host/port, CSV, If Controller bỏ phần còn lại
của vòng khi bước trước lỗi, tham số ${__P(...)}. Bỏ login và setUp lockout.
Thay sampler bằng GET /api/categories → GET /api/products?search=${keyword} → GET /api/products/${product_id}.
Mỗi sampler: Response Assertion mã HTTP + assertion trường nghiệp vụ.
Tên file: 23120175_SearchLoad_20261122.jmx. Listener: Aggregate Report.
```

- **AI output:** File `23120175_SearchLoad_20261122.jmx`. Mặc định `-J`: threads 30, rampup 10, duration 120, think_min 0, think_range 50. Search là query param `search`, `always_encode` true, content encoding UTF-8. JSR223 so `expect_hit`. JSONPath so id danh mục và `$.id` sản phẩm.

## #5 — Bước 5, tự soát

- **Date & time:** 2026-11-22 19:56:30 +0700
- **Prompt:**

```
Đóng vai reviewer khó tính. Soát test plan theo toàn bộ mục A và B của references/pitfalls.md:
ramp-up/think-time, số thread, assertion, lỗi dây chuyền, lockout, CSV, correlation, listener, tên file.
Liệt kê từng vấn đề kèm mức độ nghiêm trọng và sửa.
```

- **AI output:** Ghi trong `REVIEW.md`. Sửa `reset_sut.sh`: `${SEED_CMD:-...}` thành `${SEED_CMD-...}` để `SEED_CMD=` không tạo user. Plan không phải sửa thêm. `TestAction` action 3 là `RESTART_NEXT_LOOP` trong JMeter 5.6.3.

## #6 — Bước 6, chạy thử

- **Date & time:** 2026-11-22 19:55:42 +0700 đến 19:56:12 +0700
- **Việc làm:** `shrink_plan.py` → 3 thread, 30 s, think 0–50 ms. JMeter với `-Jhttpclient.reset_state_on_thread_group_iteration=false`. `jtl_analyze.py` trên `/tmp/smoke_search.jtl`: 4384 sample, 0 lỗi, p95 3 ms.

## #7 — Bước 7, chạy thật

- **Date & time:** 2026-11-22 19:57:50 +0700 đến 19:59:50 +0700
- **Việc làm:** Process Node mới, 2 user seed. `caffeinate -d -i -u jmeter -n` 30 thread, 120 s, ghi `results/23120175_SearchLoad_20261122.jtl` (23 MB) và report HTML. RSS Node trong `results/node_rss.csv`. Summariser: 185571 sample, 0 lỗi. Lần gọi JMeter trước đó dừng ngay vì chưa có thư mục `reports/`, không tạo `.jtl`.

## #8 — Bước 8, phân tích

- **Date & time:** 2026-11-22 20:00:22 +0700
- **Prompt:**

```
Đây là số liệu tính từ file .jtl thô (không phải statistics.json). Hãy:
1. Đánh giá kịch bản đạt hay không theo ngưỡng ở bước 3, bước nào là nút thắt.
2. Xác định năng lực theo cửa sổ thời gian và số thread (không dùng throughput trung bình cả bài).
3. Có suy giảm theo thời gian không? Nêu giả thuyết nguyên nhân và cách kiểm chứng.
4. Đề xuất ngưỡng hiệu năng kèm lý do bằng số liệu.
5. Đề xuất tối ưu: chỗ sửa trong code, mức cải thiện dự kiến có căn cứ (chưa đo thì ghi chưa đo), rủi ro.
Sau đó soát lại theo mục C của pitfalls.md.
```

- **AI output:** Ghi trong `ANALYSIS.md`. Đạt (p95 2 ms, 0 lỗi). Đỉnh cửa sổ 1610,8 req/s ở 30 thread là tải của kịch bản, chưa phải trần. Không suy giảm p95. SLA đề xuất p95 ≤ 10 ms. Mọi mức cải thiện hiệu năng ghi chưa đo. Ba bug SUT kèm `curl`, chưa tạo issue.
