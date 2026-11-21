# Phân tích raw JMeter JTL — Load, Stress và Spike

## 1. Phạm vi và phương pháp

Nguồn dữ liệu:

| Scenario | Raw log |
|---|---|
| Load | `performance-tests/task1/evidence/load/run01/23120117_Load_20261121.jtl` |
| Stress | `performance-tests/task1/evidence/stress/run01/23120117_Stress_20261121.jtl` |
| Spike | `performance-tests/task1/evidence/spike/run01/23120117_Spike_20261121.jtl` |

Quy ước tính:

- Response time dùng cột `elapsed`, đơn vị ms.
- Median, p90, p95 và p99 dùng **nearest-rank** trên các giá trị raw `elapsed`: phần tử thứ `ceil(p × N)` sau khi sắp tăng dần.
- Throughput của một tập sample = `sample count / (max(timeStamp + elapsed) - min(timeStamp))`, đơn vị sample/s. Vì vậy throughput của từng label có cửa sổ thời gian riêng.
- Error rate = số dòng có `success=false` / sample count. Cả ba file chỉ có `responseCode=200` và `success=true`.
- Dòng **Scenario total** gồm cả năm HTTP sampler và parent sample `E2E - Login to order verification`. Do parent E2E bao quanh các child sample, đây là số sample JMeter ghi nhận chứ không phải số HTTP request độc lập; percentile total vì thế không nên dùng thay percentile từng endpoint.
- Các mốc `+Xs` tính từ `timeStamp` nhỏ nhất trong từng file. Script tái lập phép tính: `performance-tests/task2/analyze_jtl.py`.

## 2. Thống kê theo scenario và label

### 2.1 Load

| Label | Samples | Avg (ms) | Median | p90 | p95 | p99 | Min / Max (ms) | Throughput (sample/s) | Errors | Error rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Scenario total** | **4,978** | **1,328.15** | **4** | **7,562** | **8,627** | **9,833** | **1 / 11,476** | **13.831** | **0** | **0.000%** |
| 01 - Login | 840 | 4.23 | 4 | 6 | 7 | 11 | 2 / 75 | 2.336 | 0 | 0.000% |
| 02 - Get product list | 836 | 3.47 | 3 | 5 | 6 | 9 | 1 / 19 | 2.346 | 0 | 0.000% |
| 03 - Add product to cart | 828 | 3.12 | 3 | 4 | 5 | 7 | 1 / 9 | 2.340 | 0 | 0.000% |
| 04 - Checkout | 827 | 11.92 | 11 | 15 | 17 | 24 | 6 / 56 | 2.346 | 0 | 0.000% |
| 05 - Verify order in history | 820 | 4.36 | 4 | 6 | 7 | 12 | 2 / 24 | 2.342 | 0 | 0.000% |
| E2E - Login to order verification | 827 | 7,967.41 | 7,930 | 9,427 | 9,938 | 10,682 | 4,904 / 11,476 | 2.298 | 0 | 0.000% |

### 2.2 Stress

| Label | Samples | Avg (ms) | Median | p90 | p95 | p99 | Min / Max (ms) | Throughput (sample/s) | Errors | Error rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Scenario total** | **16,214** | **1,325.06** | **4** | **7,677** | **8,652** | **9,799** | **0 / 11,720** | **54.048** | **0** | **0.000%** |
| 01 - Login | 2,766 | 3.52 | 3 | 6 | 9 | 15 | 0 / 42 | 9.220 | 0 | 0.000% |
| 02 - Get product list | 2,742 | 3.69 | 3 | 7 | 10 | 16 | 0 / 47 | 9.231 | 0 | 0.000% |
| 03 - Add product to cart | 2,708 | 2.32 | 2 | 4 | 4 | 6 | 0 / 21 | 9.208 | 0 | 0.000% |
| 04 - Checkout | 2,676 | 9.48 | 9 | 14 | 17 | 25 | 2 / 58 | 9.160 | 0 | 0.000% |
| 05 - Verify order in history | 2,646 | 4.98 | 4 | 8 | 11 | 17 | 1 / 55 | 9.118 | 0 | 0.000% |
| E2E - Login to order verification | 2,676 | 8,004.43 | 8,044 | 9,549 | 9,893 | 10,592 | 4,178 / 11,720 | 8.920 | 0 | 0.000% |

### 2.3 Spike

| Label | Samples | Avg (ms) | Median | p90 | p95 | p99 | Min / Max (ms) | Throughput (sample/s) | Errors | Error rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Scenario total** | **5,054** | **1,305.27** | **5** | **7,672** | **8,677** | **9,978** | **1 / 11,234** | **28.169** | **0** | **0.000%** |
| 01 - Login | 897 | 5.36 | 4 | 9 | 12 | 18 | 1 / 40 | 5.085 | 0 | 0.000% |
| 02 - Get product list | 873 | 4.05 | 3 | 7 | 9 | 15 | 1 / 34 | 4.959 | 0 | 0.000% |
| 03 - Add product to cart | 844 | 2.87 | 3 | 4 | 5 | 8 | 1 / 13 | 4.875 | 0 | 0.000% |
| 04 - Checkout | 821 | 12.04 | 11 | 16 | 19 | 27 | 5 / 44 | 4.791 | 0 | 0.000% |
| 05 - Verify order in history | 798 | 5.28 | 4 | 8 | 11 | 20 | 1 / 31 | 4.788 | 0 | 0.000% |
| E2E - Login to order verification | 821 | 8,004.84 | 8,024 | 9,754 | 10,034 | 10,668 | 3,853 / 11,234 | 4.576 | 0 | 0.000% |

## 3. So sánh và thời điểm suy giảm

### 3.1 So sánh toàn run

| Scenario | Max VU ghi nhận | Samples | Throughput total (sample/s) | E2E throughput (transaction/s) | E2E p95 / p99 (ms) | HTTP endpoint có p95 cao nhất | Errors |
|---|---:|---:|---:|---:|---:|---|---:|
| Load | 20 | 4,978 | 13.831 | 2.298 | 9,938 / 10,682 | 04 - Checkout: 17 ms | 0 / 4,978 |
| Stress | 120 | 16,214 | 54.048 | 8.920 | 9,893 / 10,592 | 04 - Checkout: 17 ms | 0 / 16,214 |
| Spike | 100 | 5,054 | 28.169 | 4.576 | 10,034 / 10,668 | 04 - Checkout: 19 ms | 0 / 5,054 |

Stress đạt throughput total `54.048 sample/s` và E2E `8.920 transaction/s`, cao hơn Load `13.831 sample/s` và `2.298 transaction/s`, trong khi E2E p95 Stress `9,893 ms` thấp hơn nhẹ Load `9,938 ms`; vì vậy raw log **không cho thấy throughput sụp giảm hoặc latency E2E tăng theo toàn run**. Spike có E2E p95 cao nhất `10,034 ms`, chỉ cao hơn Load `96 ms` và Stress `141 ms`; không có error ở cả ba scenario.

### 3.2 Diễn biến Stress theo các mốc tăng tải

`threadName` cho thấy các nhóm được thêm tại `+60.006s` (thêm 20 VU), `+120.010s` (thêm 40 VU) và `+180.024s` (thêm 40 VU). Bảng dưới dùng các cửa sổ 0–60s, 60–120s, 120–180s và 180–300s; các sample E2E bắt đầu trong cửa sổ có thể kết thúc sau biên cửa sổ.

| Stress phase | Max VU | Total throughput (sample/s) | Login p95 | Product list p95 | Add cart p95 | Checkout p95 | Verify history p95 | E2E p95 / p99 | Error rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Stage 1, 0–60s | 20 | 7.026 | 7 ms | 4 ms | 4 ms | 13 ms | 6 ms | 9,603 / 10,371 ms | 0.000% |
| Stage 2, 60–120s | 40 | 25.651 | 7 ms | 6 ms | 4 ms | 14 ms | 7 ms | 9,957 / 10,327 ms | 0.000% |
| Stage 3, 120–180s | 80 | 50.103 | 8 ms | 7 ms | 4 ms | 14 ms | 8 ms | 9,893 / 10,488 ms | 0.000% |
| Stage 4, 180–300s | 120 | 87.856 | 9 ms | 10 ms | 4 ms | 19 ms | 12 ms | 9,890 / 10,645 ms | 0.000% |

- Dấu hiệu tăng response time đầu tiên xuất hiện từ **Stage 2 tại +60.006s**: `02 - Get product list` p95 tăng `4 → 6 ms`, `04 - Checkout` `13 → 14 ms`, `05 - Verify order in history` `6 → 7 ms`; `01 - Login` giữ `7 ms` và `03 - Add product to cart` giữ `4 ms`.
- Mức tăng rõ nhất nằm ở **Stage 4 tại +180.024s**: so với Stage 3, `02 - Get product list` p95 `7 → 10 ms`, `04 - Checkout` `14 → 19 ms`, `05 - Verify order in history` `8 → 12 ms`, và `01 - Login` `8 → 9 ms`. Tuy vậy throughput total vẫn tăng `50.103 → 87.856 sample/s`, E2E p95 giảm nhẹ `9,893 → 9,890 ms`, và error rate vẫn `0.000%`.
- Vì throughput tiếp tục tăng đến `87.856 sample/s` ở Stage 4, không có error và không có bước nhảy lớn ở E2E p95, **không quan sát được saturation/breakpoint trong Stress log**. Ngưỡng tải gây sụp giảm: **không đủ dữ liệu**.

### 3.3 Diễn biến Spike

`threadName` cho thấy nhóm `Spike Burst - add 90 VU` bắt đầu tại `+60.002s` và sample cuối của nhóm này bắt đầu tại `+120.010s`.

| Spike phase | VU mục tiêu | Total throughput (sample/s) | Login p95 | Product list p95 | Add cart p95 | Checkout p95 | Verify history p95 | E2E p95 / p99 | Error rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline, 0–60s | 10 | 5.410 | 8 ms | 5 ms | 4 ms | 15 ms | 8 ms | 9,920 / 10,641 ms | 0.000% |
| Burst, 60–120s | 100 | 64.171 | 12 ms | 10 ms | 5 ms | 19 ms | 12 ms | 10,049 / 10,691 ms | 0.000% |
| Recovery, 120–180s | 10 | 7.591 | 6 ms | 5 ms | 4 ms | 16 ms | 6 ms | 9,885 / 10,564 ms | 0.000% |

- Suy giảm bắt đầu cùng burst tại **+60.002s**: `01 - Login` p95 `8 → 12 ms`, `02 - Get product list` `5 → 10 ms`, `03 - Add product to cart` `4 → 5 ms`, `04 - Checkout` `15 → 19 ms`, `05 - Verify order in history` `8 → 12 ms`, và E2E p95 `9,920 → 10,049 ms`.
- Sau khi burst ngừng ở khoảng `+120.010s`, p95 phục hồi: Login `12 → 6 ms`, Product list `10 → 5 ms`, Add cart `5 → 4 ms`, Checkout `19 → 16 ms`, Verify history `12 → 6 ms`, E2E `10,049 → 9,885 ms`. Đây là suy giảm nhỏ, tạm thời, gắn trực tiếp với giai đoạn burst; error rate vẫn `0.000%` trong cả ba phase.
- Throughput total tăng `5.410 → 64.171 sample/s` trong burst thay vì giảm. Vì không có error và throughput không sụp, raw Spike log chưa chứng minh hệ thống chạm giới hạn công suất.

### 3.4 Load

Load ramp lên 20 VU trong khoảng đầu run. So sánh ramp 0–60s với phần ổn định 60–350s: các p95 HTTP không tăng có hệ thống — Login `11 → 7 ms`, Product list `6 → 5 ms`, Add cart `5 → 5 ms`, Checkout `20 → 17 ms`, Verify history `7 → 7 ms`. E2E p95 tăng nhẹ `9,831 → 9,974 ms` (`+143 ms`, khoảng `1.45%`), throughput total tăng `7.183 → 14.636 sample/s`, error rate giữ `0.000%`. Do đó **không xác định được thời điểm suy giảm bền vững trong Load log**.

## 4. Lỗi nổi bật và nút thắt quan sát trực tiếp

| Quan sát | Bằng chứng raw log | Kết luận giới hạn trong dữ liệu |
|---|---|---|
| Không có lỗi ứng dụng/giao thức được JMeter ghi nhận | Load `0/4,978`, Stress `0/16,214`, Spike `0/5,054`; mọi dòng có `responseCode=200`, `success=true` | Không có loại lỗi nổi bật để phân tích. Lỗi có thể tồn tại ngoài điều JMeter/assertion kiểm tra: **không đủ dữ liệu**. |
| Checkout là HTTP endpoint chậm nhất theo p95 | `04 - Checkout`: Load `17 ms`, Stress `17 ms`, Spike `19 ms`; các endpoint HTTP còn lại có p95 tối đa lần lượt Login `12 ms`, Product list `10 ms`, Add cart `5 ms`, Verify history `11 ms` | Checkout là nút thắt **tương đối** trong năm HTTP endpoint. Mức tuyệt đối vẫn dưới `20 ms` ở p95 trong cả ba run. Nguyên nhân bên trong endpoint: **không đủ dữ liệu**. |
| E2E elapsed khoảng 8 giây nhưng tổng thời gian HTTP chỉ vài chục ms | Load E2E avg `7,967.41 ms`, trong khi tổng avg năm HTTP label là `27.10 ms`; Stress `8,004.43 ms` so với `23.99 ms`; Spike `8,004.84 ms` so với `29.60 ms` | Phần lớn E2E elapsed không nằm trong thời gian phản hồi của năm HTTP sampler. Raw JTL không chứa timer definition, script logic hay trace nên nguồn của phần thời gian còn lại: **không đủ dữ liệu**. |
| Connect time không phải dấu hiệu nghẽn quan sát được | Connect avg Scenario total: Load `0.13 ms`, Stress `0.08 ms`, Spike `0.11 ms`; endpoint Login cao nhất lần lượt `0.14`, `0.06`, `0.25 ms` | Không có bằng chứng nghẽn thiết lập kết nối từ ba log. |
| Chưa thấy capacity breakpoint | Stress Stage 4 đạt `87.856 sample/s`, E2E p95 `9,890 ms`, error `0.000%`; Spike burst đạt `64.171 sample/s`, E2E p95 `10,049 ms`, error `0.000%` | Không thể xác định tải cực đại hay nguyên nhân hạ tầng từ các JTL này: **không đủ dữ liệu**. |

## 5. Performance thresholds đề xuất

Các ngưỡng dưới đây là **regression thresholds theo baseline của đúng ba run này**, không phải production SLO. Không có business SLO, traffic forecast, server metrics hoặc nhiều lần chạy để chứng minh độ lặp lại, nên production capacity/SLA: **không đủ dữ liệu**.

### 5.1 Response time và error rate theo label

| Label | p95 đề xuất | p99 đề xuất | Error rate đề xuất | Cơ sở từ ba JTL |
|---|---:|---:|---:|---|
| 01 - Login | ≤ 15 ms | ≤ 25 ms | 0.000% | Max quan sát: p95 `12 ms` (Spike), p99 `18 ms` (Spike); cả ba run `0` lỗi. |
| 02 - Get product list | ≤ 12 ms | ≤ 20 ms | 0.000% | Max quan sát: p95 `10 ms` (Stress), p99 `16 ms` (Stress); cả ba run `0` lỗi. |
| 03 - Add product to cart | ≤ 7 ms | ≤ 10 ms | 0.000% | Max quan sát: p95 `5 ms` (Load/Spike), p99 `8 ms` (Spike); cả ba run `0` lỗi. |
| 04 - Checkout | ≤ 25 ms | ≤ 35 ms | 0.000% | Max quan sát: p95 `19 ms` (Spike), p99 `27 ms` (Spike); cả ba run `0` lỗi. |
| 05 - Verify order in history | ≤ 15 ms | ≤ 25 ms | 0.000% | Max quan sát: p95 `11 ms` (Stress/Spike), p99 `20 ms` (Spike); cả ba run `0` lỗi. |
| E2E - Login to order verification | ≤ 10,500 ms | ≤ 11,000 ms | 0.000% | Max quan sát: p95 `10,034 ms` (Spike), p99 `10,682 ms` (Load); cả ba run `0` lỗi. |

Các giá trị p95/p99 được làm tròn lên từ worst observed để tạo khoảng đệm nhỏ nhưng vẫn bắt được regression rõ ràng. Với error rate, dữ liệu hiện tại chỉ chứng minh mức `0.000%`; lựa chọn một mức khác 0% cần chính sách SLO ngoài JTL và hiện **không đủ dữ liệu**.

### 5.2 Throughput theo phase tải ổn định/cao nhất

| Scenario / phase dùng để gate | Total throughput tối thiểu | Throughput mỗi HTTP label tối thiểu | E2E throughput tối thiểu | Cơ sở raw log |
|---|---:|---:|---:|---|
| Load, steady 60–350s | ≥ 14.0 sample/s | ≥ 2.4 sample/s | ≥ 2.3 transaction/s | Quan sát `14.636`; năm HTTP label đạt `2.499–2.513`; E2E `2.434`. |
| Stress, Stage 4 180–300s | ≥ 85.0 sample/s | ≥ 14.0 sample/s | ≥ 14.0 transaction/s | Quan sát `87.856`; năm HTTP label đạt `14.563–14.896`; E2E `14.146`. |
| Spike, burst 60–120s | ≥ 60.0 sample/s | ≥ 11.0 sample/s | ≥ 10.0 transaction/s | Quan sát `64.171`; năm HTTP label đạt `11.391–12.692`; E2E `10.421`. |

Throughput threshold phải được áp dụng đúng phase/VU và cùng pacing; không nên lấy throughput toàn run để gate vì Load có ramp-up, Stress có bốn stage, còn Spike có baseline–burst–recovery.

## 6. Phân biệt elapsed time, latency và connect time

| Trường JMeter | Ý nghĩa chính xác trong HTTP sample | Quan hệ |
|---|---|---|
| `elapsed` | Thời gian từ lúc JMeter bắt đầu sample đến khi nhận xong response; đây là response time dùng trong các bảng percentile. Với parent Transaction Controller, `elapsed` bao trùm toàn transaction chứ không phải một HTTP response riêng. | Thường `elapsed ≥ latency ≥ Connect`. |
| `Latency` | Thời gian từ lúc bắt đầu sample đến khi nhận byte phản hồi đầu tiên (time to first byte theo góc nhìn JMeter). Phần nhận nốt response nằm trong `elapsed` nhưng không nằm trong `Latency`. | Bao gồm thời gian chờ trước byte đầu; có thể gồm `Connect` khi phải mở kết nối mới. |
| `Connect` | Thời gian JMeter dùng để thiết lập kết nối tới server; có thể bằng 0 khi kết nối được tái sử dụng hoặc độ phân giải đo ghi nhận 0 ms. | Là một phần của latency khi có kết nối mới; không phải toàn bộ latency. |

Ví dụ trực tiếp: Load, `01 - Login`, timestamp `1795258093500` có `elapsed=19 ms`, `Latency=18 ms`, `Connect=7 ms`, response `200`. Như vậy 7 ms thiết lập kết nối nằm trong 18 ms chờ byte đầu, và thêm 1 ms từ byte đầu đến khi hoàn tất sample. Stress, `03 - Add product to cart`, timestamp `1795261635316` có `elapsed=4 ms`, `Latency=3 ms`, `Connect=0 ms`; Spike cùng label tại timestamp `1795260269142` có `elapsed=5 ms`, `Latency=4 ms`, `Connect=0 ms`.

## 7. Kết luận ngắn

Ba raw JTL không ghi nhận lỗi (`0.000%` ở Load, Stress và Spike). Spike bắt đầu suy giảm nhỏ tại `+60.002s` khi tăng từ 10 lên 100 VU, rõ nhất ở `02 - Get product list` p95 `5 → 10 ms`, rồi trở lại `5 ms` trong recovery. Stress bắt đầu có tăng p95 từ `+60.006s`, nhưng ngay cả Stage 4/120 VU vẫn đạt `87.856 sample/s`, E2E p95 `9,890 ms` và `0.000%` lỗi; chưa có capacity breakpoint. Trong năm HTTP endpoint, `04 - Checkout` là chậm nhất theo p95 (`17/17/19 ms` cho Load/Stress/Spike). Khoảng chênh rất lớn giữa E2E avg khoảng `8,000 ms` và tổng HTTP avg `23.99–29.60 ms` là quan sát quan trọng nhất, nhưng raw JTL không đủ để quy nguyên nhân.

## 8. Review and correct — human review

Phần này giữ nguyên phân tích AI ở trên và đối chiếu lại trực tiếp ba raw JTL. Các thống kê toàn run về sample count, percentile theo `elapsed` và số lỗi đều khớp; những điểm dưới đây là các diễn giải hoặc cách gắn nhãn cần hiệu chỉnh.

### HR-01 — Throughput theo phase dùng mẫu số không khớp cửa sổ phase

- **Nhận định của AI:** các giá trị `7.183`, `25.651`, `64.171` sample/s... được trình bày như throughput trong các cửa sổ cố định 0–60s, 60–120s hoặc 60–350s.
- **Giá trị đúng từ raw JTL:** nếu sample được chọn theo `timeStamp` nằm trong một cửa sổ cố định, sample-start rate phải dùng chính độ dài cửa sổ đó làm mẫu số.

| Scenario / phase | Số dòng JTL trong phase | Độ dài phase | Rate đúng theo cửa sổ (sample/s) | Giá trị AI |
|---|---:|---:|---:|---:|
| Load 0–60s | 489 | 60s | `489 / 60 = 8.150` | 7.183 |
| Load 60–350s | 4,354 | 290s | `4,354 / 290 = 15.014` | 14.636 |
| Stress 0–60s | 483 | 60s | `483 / 60 = 8.050` | 7.026 |
| Stress 60–120s | 1,746 | 60s | `1,746 / 60 = 29.100` | 25.651 |
| Stress 120–180s | 3,443 | 60s | `3,443 / 60 = 57.383` | 50.103 |
| Stress 180–300s | 10,542 | 120s | `10,542 / 120 = 87.850` | 87.856 |
| Spike 0–60s | 354 | 60s | `354 / 60 = 5.900` | 5.410 |
| Spike 60–120s | 4,249 | 60s | `4,249 / 60 = 70.817` | 64.171 |
| Spike 120–180s | 451 | 60s | `451 / 60 = 7.517` | 7.591 |

- **Giải thích lỗi:** AI lọc sample theo `timeStamp` của phase nhưng lại chia cho khoảng từ sample bắt đầu sớm nhất đến `timeStamp + elapsed` lớn nhất. Parent E2E có thể kết thúc sau biên phase nên mẫu số bị kéo dài, chẳng hạn Stress 0–60s bị chia cho `68.748s` thay vì `60s`.
- **Hiệu chỉnh:** gọi các số đã sửa là **sample-start rate trong cửa sổ phase**. Nếu muốn dùng công thức từ sample đầu đến khi sample cuối hoàn tất thì phải đổi tên chỉ số và không coi đó là throughput của đúng cửa sổ 60 giây. Các số làm cơ sở cho threshold ở mục 5.2 cũng phải dùng nhất quán cùng một quy ước.

### HR-02 — Cột “Max VU” của Stress không phải giá trị lớn nhất đọc từ `allThreads`

- **Nhận định của AI:** bảng Stress ghi Max VU lần lượt là `20`, `40`, `80`, `120`.
- **Giá trị đúng từ raw JTL:** khi lọc bằng `timeStamp` theo bốn phase, max `allThreads` thực tế lần lượt là `38`, `73`, `115`, `120`. Ví dụ, raw Stress có parent E2E tại `timeStamp=1795261636347` (`+59.815s`), `elapsed=8933 ms`, nhưng `allThreads=38`.
- **Giải thích lỗi:** `timeStamp` của parent E2E là thời điểm transaction bắt đầu, trong khi transaction trên kết thúc sau mốc +60s, lúc các thread của stage kế tiếp đã chạy. Vì vậy không thể vừa phân phase theo thời điểm bắt đầu của parent sample vừa đọc `allThreads` như số VU tại cùng thời điểm đó. Các số `20/40/80/120` là tải mục tiêu theo thiết kế stage, không phải max `allThreads` của tập raw rows.
- **Hiệu chỉnh:** đổi tiêu đề cột thành **“VU mục tiêu theo stage”**. Không dùng cột này như một thống kê max VU tính trực tiếp từ raw JTL.

### HR-03 — Cửa sổ recovery của Spike còn chứa sample thuộc burst

- **Nhận định của AI:** cửa sổ 120–180s được gọi hoàn toàn là Recovery/10 VU.
- **Giá trị đúng từ raw JTL:** cửa sổ này có `451` dòng, gồm `450` dòng của `Spike Baseline - 10 VU` và một dòng của `Spike Burst - add 90 VU`: `timeStamp=1795260360275` (`+120.010s`), label `05 - Verify order in history`, `elapsed=4 ms`, `allThreads=11`.
- **Giải thích lỗi:** phân phase chỉ theo biên thời gian đã đưa sample burst cuối cùng vào tập recovery. Ảnh hưởng của một sample tới percentile ở đây rất nhỏ, nhưng gọi tập này là recovery thuần là không chính xác.
- **Hiệu chỉnh:** loại dòng có `threadName` thuộc burst khi phân tích recovery thuần, hoặc ghi rõ cửa sổ 120–180s chứa một sample đuôi của burst. Khi chỉ tính 450 dòng baseline, total sample-start rate là `450 / 60 = 7.500 sample/s`.

### HR-04 — Connect average của “Scenario total” trộn parent và HTTP child samples

- **Nhận định của AI:** Connect avg Scenario total là Load `0.13 ms`, Stress `0.08 ms`, Spike `0.11 ms` và được dùng để nhận xét thời gian thiết lập kết nối.
- **Giá trị đúng từ raw JTL:** khi chỉ tính năm HTTP sampler, weighted Connect average là Load `0.081 ms` trên `4,151` HTTP samples, Stress `0.046 ms` trên `13,538` samples và Spike `0.064 ms` trên `4,233` samples.
- **Giải thích lỗi:** Scenario total còn chứa parent `E2E - Login to order verification`. Trường `Connect` của parent lặp lại/bao gồm thông tin từ transaction con, nên trộn parent với child làm chỉ số kết nối bị tính hai lần và không còn là trung bình của các HTTP request độc lập.
- **Hiệu chỉnh:** dùng HTTP-only Connect average để đánh giá kết nối. Kết luận định tính vẫn không đổi: các giá trị đều rất nhỏ và raw JTL không cho thấy nghẽn thiết lập kết nối.

### HR-05 — “Chậm nhất” chưa đủ để kết luận là bottleneck

- **Nhận định của AI:** Checkout được gọi là “nút thắt tương đối”.
- **Giá trị đúng từ raw JTL:** Checkout đúng là HTTP label có p95 cao nhất: Load `17 ms`, Stress `17 ms`, Spike `19 ms`. Tuy nhiên Stress Stage 4 vẫn có `0/10,542` sample lỗi trong cửa sổ, còn throughput không sụp; toàn run Stress có `0/16,214` lỗi.
- **Giải thích lỗi:** thứ hạng response time chỉ chứng minh Checkout là endpoint chậm nhất trong năm label đã đo. “Bottleneck” hàm ý nó đang giới hạn throughput hoặc gây saturation, điều mà ba JTL không chứng minh.
- **Hiệu chỉnh:** mô tả Checkout là **HTTP endpoint có p95 cao nhất quan sát được**, không kết luận đây là bottleneck nếu chưa có resource metrics, trace hoặc capacity breakpoint.

### HR-06 — Error rate quan sát được không tự động trở thành error-rate threshold

- **Nhận định của AI:** mục 5.1 đề xuất error-rate threshold `0.000%` cho mọi label vì ba run không có lỗi.
- **Giá trị đúng từ raw JTL:** mức quan sát là Load `0/4,978`, Stress `0/16,214` và Spike `0/5,054`, tức `0.000%` trong đúng ba run này.
- **Giải thích lỗi:** số lỗi quan sát được là kết quả đo, không phải yêu cầu chấp nhận. Raw JTL không chứa business SLO để chứng minh threshold bắt buộc phải bằng 0%.
- **Hiệu chỉnh:** báo cáo **observed error rate = 0.000%**; để error-rate threshold là **chưa xác định** cho đến khi có SLO/risk policy. Nếu dự án chủ động chọn zero-tolerance thì phải ghi đó là quyết định kiểm thử, không phải kết luận suy ra từ JTL.

### Các kết quả đã đối chiếu và không cần sửa

- Sample count toàn run: Load `4,978`, Stress `16,214`, Spike `5,054`.
- E2E p95/p99 toàn run: Load `9,938/10,682 ms`, Stress `9,893/10,592 ms`, Spike `10,034/10,668 ms`.
- Cả ba raw JTL đều chỉ có `responseCode=200`, `success=true`; observed error rate thực tế là `0.000%`.
- Các percentile theo label trong mục 2 khớp phép tính nearest-rank từ cột `elapsed`.
- Nhận xét rằng raw JTL một mình không xác định được nguyên nhân nội bộ của E2E khoảng 8 giây hoặc capacity breakpoint là phù hợp; không nên tự suy diễn thêm nguyên nhân từ raw log.

## 9. Judge the AI's recommendations — đề xuất và đánh giá tối ưu SUT

### 9.1 Nguyên tắc đánh giá

Theo yêu cầu số 3 của Task 2 trong `HW5.md`, mỗi đề xuất dưới đây được xếp vào một trong hai nhóm:

- **Feasible:** phù hợp với công nghệ và truy vấn thực tế của SUT, có thể triển khai/thử nghiệm được. Nhãn này không có nghĩa JTL đã chứng minh chắc chắn biện pháp sẽ cải thiện hiệu năng.
- **Hallucinated / không có căn cứ:** không phù hợp kiến trúc hiện tại hoặc không có bằng chứng từ raw JTL và source code để xem đó là cách xử lý vấn đề đã quan sát.

Việc kiểm tra source/database hiện tại cho thấy backend dùng `sqlite3`, mở một `new sqlite3.Database(...)` trong `backend/database.js`; database đang ở `journal_mode=delete`. Snapshot hiện tại có `242` users, `5` products và `18,530` orders. Query plan hiện tại của Login là `SCAN users`, còn Verify order history là `SCAN orders`.

### 9.2 Bảng phân loại đề xuất

| ID | Đề xuất AI | Phân loại | Bằng chứng và lý do | Ưu tiên / điều kiện |
|---|---|---|---|---|
| OPT-01 | Thêm composite index `orders(user_id, id DESC)` | **Feasible** | `05 - Verify order in history` gọi `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC` (`backend/server.js:311-318`). Database có `18,530` orders và `EXPLAIN QUERY PLAN` hiện trả `SCAN orders`. Stress p95 của label này tăng từ `6 ms` ở Stage 1 lên `12 ms` ở Stage 4; Spike tăng `8 → 12 ms` trong burst. Trên bản sao in-memory, sau khi thêm index, plan đổi thành `SEARCH orders USING INDEX idx_orders_user_id_id (user_id=?)`. Đây là căn cứ trực tiếp, dù JTL chưa chứng minh full scan là nguyên nhân duy nhất. | **Cao nhất.** Benchmark trước/sau; theo dõi cả `05 - Verify order in history` và write path `04 - Checkout` vì index làm mỗi lần insert tốn thêm chi phí cập nhật index. |
| OPT-02 | Phân trang lịch sử đơn hàng và chỉ trả số cột cần thiết | **Feasible** | `/api/orders/my-orders` hiện trả toàn bộ orders của user, không có `LIMIT`; snapshot có tối đa `81` orders cho một user. Response của label `05 - Verify order in history` có p95 Load/Stress/Spike lần lượt `7/11/11 ms`, và Stress Stage 4 là `12 ms`. Phân trang bằng `LIMIT`/cursor kết hợp index OPT-01 giới hạn số row đọc và kích thước response khi bảng tiếp tục tăng. | **Cao**, nhưng là thay đổi API contract; phải cập nhật frontend và assertion JMeter để vẫn tìm được order vừa tạo. Không tuyên bố đây là bottleneck hiện tại vì p95 tuyệt đối vẫn thấp và không có error. |
| OPT-03 | Bật SQLite WAL và cấu hình `busy_timeout`, sau đó đo lại mixed read/write workload | **Feasible, cần thử nghiệm** | SUT thực sự dùng SQLite và file hiện có `journal_mode=delete`. Flow vừa ghi `orders` qua `04 - Checkout` vừa đọc `orders` qua `05 - Verify order in history`; Spike burst làm p95 hai label lần lượt `15 → 19 ms` và `8 → 12 ms`, nhưng vẫn có `0.000%` lỗi. WAL có thể giảm việc reader và writer cản nhau trong workload phù hợp, nhưng raw JTL không có `SQLITE_BUSY`/lock error để chứng minh WAL đang cần thiết. | **Trung bình.** Thử WAL như một A/B experiment, theo dõi checkpoint và kích thước `-wal`; SQLite vẫn chỉ có một writer. Không mặc định đổi `synchronous` nếu chưa chấp nhận trade-off durability. |
| OPT-04 | Thêm index cho `users(email)` | **Feasible nhưng ưu tiên thấp** | Login thực hiện `SELECT * FROM users WHERE email = ?` (`backend/server.js:32-35`); database có `242` users, chưa có index cho email và plan là `SCAN users`. Login p95 tăng từ `7 → 9 ms` qua Stress Stage 1→4 và `8 → 12 ms` trong Spike burst. Sau khi thêm index trên bản sao in-memory, plan đổi thành `SEARCH users USING INDEX idx_users_email (email=?)`. Tuy nhiên Login toàn run vẫn chỉ p95 `7/9/12 ms` ở Load/Stress/Spike. | **Thấp ở quy mô hiện tại**, hữu ích khi users tăng. Chỉ dùng `UNIQUE INDEX` nếu yêu cầu nghiệp vụ xác nhận email phải duy nhất; snapshot hiện không có email trùng nhưng đó chưa phải đặc tả nghiệp vụ. |
| OPT-05 | Thêm database connection pool để xử lý connect time | **Hallucinated / không phù hợp SUT hiện tại** | Backend dùng một SQLite file và một `sqlite3.Database`, không dùng PostgreSQL/MySQL client. `Connect` trong JTL là thời gian thiết lập kết nối HTTP, không phải DB connection time. Human review đã tính HTTP-only Connect avg chỉ `0.081 ms` Load, `0.046 ms` Stress và `0.064 ms` Spike. Pool nhiều SQLite connections còn có thể tăng cạnh tranh khóa mà không loại bỏ giới hạn single-writer. | **Không triển khai.** Chỉ đánh giá connection pool nếu sau này SUT chuyển sang client/server DB và có DB connection-wait metrics. |
| OPT-06 | Cache `/api/products` hoặc thêm index cho product list để sửa Spike degradation | **Hallucinated / chưa có căn cứ** | Measured request là `SELECT * FROM products`; database chỉ có `5` products. `02 - Get product list` p95 tuy tăng `5 → 10 ms` trong Spike burst nhưng phục hồi về `5 ms`, không lỗi và không có DB profile chứng minh table scan gây ra tăng này. Index thông thường cũng không giúp truy vấn trả toàn bộ bảng; với nhánh search, predicate hiện là leading wildcard `LIKE '%keyword%'`, nên B-tree index trên `name` không tự động giải quyết truy vấn đó. | **Không ưu tiên.** Chỉ xem xét cache/search index sau khi tạo dataset gần production và đo query/response-size; nếu cache phải có invalidation cho API tạo/sửa/xóa product. |
| OPT-07 | Tối ưu backend để giảm E2E từ khoảng 8 giây xuống vài chục ms | **Hallucinated nếu xem 8 giây là server latency** | JMX đặt `TransactionController.includeTimers=true` và có bốn `UniformRandomTimer` 1–3 giây trong flow. Vì vậy E2E avg Load/Stress/Spike `7,967.41/8,004.43/8,004.84 ms` chủ yếu bao gồm think time, trong khi tổng avg năm HTTP label chỉ `27.10/23.99/29.60 ms`. Đây không phải bằng chứng backend xử lý một request trong 8 giây. | **Không sửa SUT theo số E2E này.** Khi báo server latency, dùng từng HTTP label hoặc một parent metric loại timers; vẫn giữ timers trong workload để mô phỏng pacing người dùng. |
| OPT-08 | Tăng số Node workers/instances hoặc đặt load balancer ngay | **Hallucinated / chưa đủ căn cứ và chưa an toàn với thiết kế hiện tại** | Stress Stage 4 vẫn đạt sample-start rate đúng theo cửa sổ `87.850 sample/s`, có `0/10,542` lỗi trong phase; toàn Stress có `0/16,214` lỗi. Không có CPU, event-loop lag hay memory metrics trong JTL để chứng minh Node process bão hòa. Ngoài ra cart đang lưu trong biến process-local `userCarts` (`backend/server.js:14,284-294`), nên nhiều worker/instance sẽ làm trạng thái giỏ không đồng nhất; SQLite file cũng không trở thành multi-writer chỉ nhờ thêm worker. | **Không triển khai ở giai đoạn này.** Chỉ scale out sau khi chuyển cart sang shared store, xác minh chiến lược database và chứng minh CPU/event-loop là giới hạn bằng telemetry. |

### 9.3 Thay đổi đề xuất cụ thể

Ưu tiên triển khai nhỏ nhất có thể kiểm chứng:

```sql
CREATE INDEX IF NOT EXISTS idx_orders_user_id_id
ON orders(user_id, id DESC);

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);
```

Sau OPT-01, sửa API lịch sử đơn theo hướng cursor/limit, ví dụ lấy trang đầu theo `id DESC` và chỉ trả các trường frontend cần. Không nên thêm index cho mọi cột: mỗi index làm `04 - Checkout` phải cập nhật thêm cấu trúc dữ liệu khi insert order.

Với WAL, thay đổi phải được áp dụng trên connection thật của ứng dụng và kiểm tra kết quả khởi tạo, không chỉ chạy PRAGMA thủ công ngoài process:

```sql
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
```

`busy_timeout=5000` là cấu hình chờ khi database bận, không làm truy vấn nhanh hơn. WAL cũng không cho phép nhiều writer đồng thời; vì ba JTL hiện có observed error rate `0.000%`, lợi ích của WAL phải được chứng minh bằng A/B test thay vì trình bày như một fix đã chắc chắn hiệu quả.

### 9.4 Kế hoạch xác minh trước/sau

1. Giữ cố định JMX, CSV, phần cứng, database seed và thứ tự chạy. Chụp một database snapshot giống nhau trước mỗi biến thể để tránh số orders tích lũy làm sai so sánh.
2. Chạy baseline ít nhất ba lần, sau đó áp dụng **một** thay đổi mỗi lần: OPT-01 → OPT-02 → OPT-03 → OPT-04. Không gộp nhiều tối ưu trong một lần vì sẽ không biết thay đổi nào tạo hiệu quả.
3. Với OPT-01/OPT-02, so sánh `05 - Verify order in history` p95/p99 ở Stress Stage 4 với baseline p95 `12 ms`, đồng thời bảo đảm `04 - Checkout` không xấu hơn baseline Stage 4 p95 `19 ms` và không phát sinh error.
4. Với OPT-03, so sánh Spike burst với baseline: Checkout p95 `19 ms`, Verify history p95 `12 ms`, E2E p95 `10,049 ms`, và observed error rate `0.000%`. E2E chỉ dùng để kiểm tra flow tổng thể; không dùng nó để kết luận thời gian xử lý backend vì metric bao gồm timers.
5. Dùng rate đã hiệu chỉnh trong human review: Stress Stage 4 `10,542 / 120 = 87.850 sample-start/s`; Spike burst `4,249 / 60 = 70.817 sample-start/s`. Không so sánh với các throughput phase cũ có mẫu số bị kéo dài bởi parent E2E.
6. Thu thập thêm CPU, memory, event-loop lag, SQLite query duration, lock/busy count và WAL checkpoint metrics. Nếu index/WAL không tạo cải thiện lặp lại hoặc làm Checkout chậm hơn, rollback; khi đó nguyên nhân hiệu năng vẫn là **không đủ dữ liệu**.

### 9.5 Kết luận đánh giá optimization

Đề xuất mạnh nhất là index `orders(user_id, id DESC)` kết hợp phân trang lịch sử đơn vì khớp trực tiếp query measured, database đã có `18,530` orders và query plan hiện là full scan. WAL và index `users(email)` đều khả thi về kỹ thuật nhưng chỉ nên xem là thí nghiệm có kiểm soát: ba JTL không có lock error, không có throughput collapse và Login vẫn dưới `12 ms` ở p95. Connection pool, cache product list, tối ưu backend dựa trên E2E 8 giây và scale-out Node ngay đều là các đề xuất không có căn cứ cho SUT hiện tại. Chưa có dữ liệu để khẳng định bất kỳ thay đổi nào sẽ cải thiện production; kết luận cuối cùng phải dựa trên benchmark trước/sau.
