# Phân tích Search Load — 23120175_SearchLoad_20261122

**Video demo skill `perf-test`:** https://youtu.be/aPxXErQeGD0

Nguồn số: `python3 scripts/jtl_analyze.py results/23120175_SearchLoad_20261122.jtl --window 30 --compare reports/23120175_SearchLoad_20261122/statistics.json --rss results/node_rss.csv`. Percentile là nearest-rank trên cột `elapsed` của file `.jtl`. Lần chạy 19:57:50–19:59:50 ICT ngày 22/11/2026, sau khi process Node mới khởi động, `GET /api/products/1` trả 200, bảng `users` còn 2 dòng seed. Không gọi `create_users.sh`.

Ngưỡng chốt ở bước 3 cho kịch bản này: p95 &lt; 50 ms, lỗi &lt; 1%.

## Output của jtl_analyze.py

Thời lượng từ sample đầu đến sample cuối: 120,0 s. Không có label `LOCK_`.

| label | n | lỗi | lỗi % | mean | p50 | p90 | p95 | p99 | p99.9 | max | req/s TB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 01_Categories | 61871 | 0 | 0.00% | 0.49 | 0 | 1 | 1 | 2 | 4 | 10 | 515.7 |
| 02_Search | 61858 | 0 | 0.00% | 0.72 | 1 | 1 | 2 | 3 | 5 | 22 | 515.6 |
| 03_ProductDetail | 61842 | 0 | 0.00% | 0.72 | 1 | 2 | 2 | 3 | 5 | 23 | 515.4 |
| TOTAL | 185571 | 0 | 0.00% | 0.64 | 1 | 1 | 2 | 3 | 5 | 23 | 1546.6 |

req/s TB là trung bình cả bài, gồm cả lúc tăng thread. Không dùng làm năng lực.

| t (s) | threads | req/s | mean | p95 | p99 | max | lỗi | RSS MB | ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 30 | 1358.4 | 0.56 | 2 | 3 | 10 | 0 | 95–208 | gồm 10 s ramp-up |
| 30 | 30 | 1607.5 | 0.66 | 2 | 3 | 7 | 0 | 208–209 | |
| 60 | 30 | 1610.8 | 0.66 | 2 | 3 | 10 | 0 | 209–211 | |
| 90 | 30 | 1610.0 | 0.68 | 2 | 3 | 23 | 0 | 211–212 | |

Đỉnh throughput trên cửa sổ trọn: **1610,8 req/s** ở t = 60 s, 30 thread. RSS trong file `results/node_rss.csv`: đầu 68 MB, cao nhất 212 MB, cuối 103 MB (sau khi JMeter đã dừng).

Đối chiếu `statistics.json`: p95 và p99 của cả ba label và Total lệch **0,00 ms** so với `.jtl`. Lần này report HTML khớp. Số trong các mục dưới vẫn lấy từ `.jtl`.

File `.jtl` 23 MB, dưới 100 MB, giữ bản gốc.

## 1. Đạt ngưỡng, nút thắt

Đạt. p95 gộp = 2 ms, p99 gộp = 3 ms, 0 lỗi trên 185571 sample.

Ba cửa sổ sau ramp-up (t = 30, 60, 90) đều p95 = 2 ms, p99 = 3 ms, 0 lỗi. Cửa sổ t = 0 có p95 = 2 ms dù throughput thấp hơn vì 10 s đầu thread chưa đủ 30.

`02_Search` và `03_ProductDetail` chậm hơn `01_Categories` khoảng 0,2 ms ở mean và 1 ms ở p95. Mức đó nhỏ hơn think-time (trung bình 50 ms/vòng cho hai timer). Ở 30 thread không có bước nào là nút thắt.

Chênh số sample 61871 / 61858 / 61842 là vòng bị cắt khi hết 120 s (dưới 30 vòng, đúng số thread), không phải lỗi.

## 2. Năng lực theo cửa sổ

Ba cửa sổ đủ 30 thread: 1607,5 – 1610,8 – 1610,0 req/s. Đỉnh 1610,8 req/s.

1610,8 / 30 = 53,7 request/s mỗi thread. Ba request một vòng → khoảng 17,9 vòng/s → khoảng 56 ms/vòng. Ba response ở mean cửa sổ ~0,66 ms chiếm khoảng 2 ms. Phần còn lại khoảng 54 ms, sát think-time thiết kế 2 × 25 ms = 50 ms. Cột `IdleTime` của `.jtl` ghi 0 (đã xem 5000 dòng đầu, mọi giá trị là 0). Cột đó không lưu thời gian timer.

Throughput ba cửa sổ nằm trong 3,3 req/s trong khi thread không tăng. Đó là tải của kịch bản 30 thread, chưa phải trần của server. Trần nhóm read này chưa đo: muốn đo thì tăng thread đến khi req/s cửa sổ ngừng tăng và p95 tăng theo. Luồng 5 bước ngày 21/11 là bài khác; không lấy số req/s của bài đó làm năng lực lần này.

## 3. Suy giảm theo thời gian

p95 và p99 không đổi giữa ba cửa sổ sau ramp-up (2 ms và 3 ms). Mean 0,66 → 0,66 → 0,68 ms. Không thấy suy giảm độ trễ trong 120 s.

max 23 ms ở cửa sổ cuối. p99.9 cả bài = 5 ms, nên đó là vài sample, không phải đuôi dịch chuyển.

RSS Node: 68 MB lúc bắt đầu ghi, lên ~208 MB trong cửa sổ đầu, rồi 208 → 212 MB trong 90 s sau, 103 MB ở dòng cuối sau khi JMeter dừng.

Giả thuyết: bước nhảy đầu là heap và cache khi tải vừa lên; +4 MB / 90 s chưa đủ để gọi là rò bộ nhớ. RSS giảm sau khi tải dừng khớp với GC hoặc buffer kết nối được trả. Giả thuyết khác: đo chung máy với JMeter. Cách kiểm: chạy lại cùng plan với `--trace-gc`, hoặc giữ tải vài chục phút và xem RSS sau khi heap đã ổn định có tăng tuyến tính không. Đây là giả thuyết, chưa kiểm.

## 4. Ngưỡng đề xuất

Cho đúng kịch bản này (30 thread, ramp-up 10 s, think-time 0–50 ms): **p95 ≤ 10 ms và lỗi &lt; 1%**.

Căn cứ trong lần đo: p95 = 2 ms, p99 = 3 ms, 0 lỗi ở khoảng 1610 req/s. Mức 10 ms gấp 5 lần p95 đo được và vẫn dưới 50 ms đã chốt ở bước 3. Không đặt trần request/s vì chưa có cửa sổ nào mà throughput ngừng tăng khi thêm thread.

## 5. Đề xuất tối ưu

| Chỗ | Căn cứ trong lần đo | Mức cải thiện | Rủi ro |
|---|---|---|---|
| `GET /api/products` nối `search` vào `LIKE` (`server.js`) | p95 search = 2 ms, hơn categories 1 ms, bảng 5 dòng | chưa đo. Sửa để hết HTTP 500 và wildcard, không suy ra thêm req/s | Đổi cách so khớp có thể đổi tập kết quả |
| Index cho `LIKE '%từ%'` | Cùng số trên | chưa đo. Wildcard đầu chuỗi không đi theo index B-tree thông thường; với 5 dòng không kỳ vọng thấy khác ở p95 2 ms | |
| WAL hoặc thêm process Node | p95 không tăng trong 120 s | chưa đo. Chỉ là giả thuyết cho tải cao hơn 1610 req/s | Thêm process đổi cách dùng SQLite |

## Bug của SUT

Chưa tạo issue. Ba lệnh dưới chạy lại trên đúng process của lần đo (22/11/2026 20:01 ICT).

### Id không tồn tại vẫn HTTP 200 và body rỗng

`GET /api/products/:id` không thấy dòng thì `res.status(200).json({})`.

```bash
curl -sS -D - -o /tmp/p999.json http://localhost:3000/api/products/999
```

Dòng trạng thái: `HTTP/1.1 200 OK`. Body: `{}`.

Bài load không đụng id lạ (`data/products.csv` chỉ có 1–5). Assertion `$.id` sẽ bắt `{}` nếu id lạ lọt vào CSV. Cùng hiện tượng đã ghi ở issue #227.

### Id chẵn trả `price` kiểu chuỗi

```bash
curl -sS http://localhost:3000/api/products/1
curl -sS http://localhost:3000/api/products/2
```

Id 1: `"price":30000000` (số). Id 2: `"price":"28000000"` (chuỗi). Code: `if (row.id % 2 === 0) row.price = row.price.toString()`. Assertion của plan chỉ so `$.id`, nên bug này không thành lỗi hiệu năng.

### `search` được nối vào SQL

```bash
curl -sS -D - -G --data-urlencode "search='" -o /tmp/sq.html http://localhost:3000/api/products
curl -sS -G --data-urlencode "search=%" http://localhost:3000/api/products
```

Dấu nháy đơn: `HTTP/1.1 500 Internal Server Error`, `Content-Type: text/html`, body `<h1>Database Error</h1><p>SQLITE_ERROR: unrecognized token: "'"</p>`.

Ký tự `%`: HTTP 200, mảng đủ 5 sản phẩm, vì chuỗi được gắn vào `LIKE '%...%'`. `_` cùng kiểu wildcard. Ba từ này nằm ở `data/keywords_negative.csv`, không có trong `data/keywords.csv`.

`Điện thoại` và `Laptop` trả `[]` vì câu lệnh chỉ so `name`, đúng câu trong đặc tả (“tìm theo tên”). Không ghi là bug.

## Soát mục C

| # | Cách đọc lần này |
|---|---|
| C1 | p95/p99 trong `statistics.json` lệch 0,00 ms so với `.jtl`. Kết luận vẫn lấy từ `.jtl`. Lần chạy này không phải trường hợp report HTML lệch percentile. |
| C2 | p95 = 2 ms và p99 = 3 ms khớp nhau. max 23 ms đi với p99.9 = 5 ms: vài sample, không phải một phần lớn tập mẫu. |
| C3 | 1546,6 req/s là trung bình cả bài, gồm ramp-up (cửa sổ đầu 1358,4 req/s). Mức đều là 1607,5–1610,8 req/s ở 30 thread. Trần server chưa đo. |
| C4 | `IdleTime` = 0 không có nghĩa là hết think-time. 53,7 request/s mỗi thread suy ra khoảng 54 ms think mỗi vòng, sát 50 ms thiết kế. |
| C5 | Không có label `LOCK_`. 0 lỗi trên cả ba label của luồng chính. |
| C6 | Phần RSS và sample 23 ms ở trên là giả thuyết, kèm cách kiểm. Không gắn cho GC. |
| C7 | p95 gộp 2 ms trùng p95 từng cửa sổ sau ramp-up. Không có đoạn p99 tăng bị trung bình che mất. |
| C8 | Không ghép số req/s của Load/Stress ngày 21/11 vào bảng này. Khác luồng, khác ngày. |
| C9 | Không có con số “tăng thêm bao nhiêu req/s” cho WAL, index, hay sửa SQL. Những mục đó ghi chưa đo. |
