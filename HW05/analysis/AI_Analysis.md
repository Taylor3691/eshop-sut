# Phân tích AI trên dữ liệu JMeter thực

## Phạm vi và nguồn

Phân tích này đọc trực tiếp các CSV JTL được tạo bởi JMeter 5.6.3 ngày 2026-11-22. Nguồn chính gồm [Load](../results/Load/23120157_Load_20261122_161045.jtl), ba stage [Stress](../results/Stress/), [Spike](../results/Spike/23120157_Spike_20261122_161045.jtl) và [Endurance](../results/Endurance.jtl). Smoke không được tính vào so sánh ba scenario. Các summary Markdown/JSON cũ chỉ dùng để đối chiếu, không thay thế raw JTL.

JTL là CSV có header; các cột được dùng là `timeStamp`, `elapsed`, `label`, `success`. `timeStamp` là thời điểm bắt đầu sample theo epoch milliseconds; `elapsed` là thời lượng sample milliseconds. Phân vị dùng nearest-rank, `rank = ceil(p*n)`, one-based. Median dùng median thống kê (trung bình hai giá trị giữa khi n chẵn). Lỗi là sample có `success=false`; error rate = failed / valid samples × 100.

Throughput theo scenario được báo là requests/s trong cửa sổ sample quan sát, tính từ thời điểm sample đầu bắt đầu đến khi sample cuối hoàn tất (`max(timeStamp + elapsed) - min(timeStamp) + 1 ms`). Cửa sổ này không bao gồm think-time sau sample cuối, nên là thông số quan sát theo JTL, không phải throughput ổn định của một tải duy trì. Không cộng throughput của các file Stress stage thành một RPS chung: đó là các lần chạy tách biệt, có khoảng dừng giữa chúng.

Endurance có 310 dòng dữ liệu: 309 dòng đủ schema và một dòng cuối bị cắt thiếu năm trường. Chỉ 309 dòng đủ được dùng trong bảng; dòng lỗi vẫn nằm nguyên trong raw JTL. JMeter log ghi 341 samples đã xử lý, do đó raw JTL không đại diện đầy đủ toàn bộ samples. Không thể phục dựng những sample không có trong file.

## Tổng hợp theo scenario

| Scenario / tập file | Tổng request hợp lệ | Thành công | Thất bại | Lỗi (%) | Mean (ms) | Median (ms) | Min–Max (ms) | p90 / p95 / p99 (ms) | Throughput quan sát (request/s) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Load, 1 VU, 1 workflow | 5 | 5 | 0 | 0.00 | 15.20 | 5 | 4–48 | 48 / 48 / 48 | 0.411 |
| Stress Stage 1, 1 VU | 5 | 5 | 0 | 0.00 | 33.80 | 4 | 3–141 | 141 / 141 / 141 | 0.405 |
| Stress Stage 2, 2 VU | 10 | 10 | 0 | 0.00 | 19.20 | 4.5 | 2–116 | 26 / 116 / 116 | 0.780 |
| Stress Stage 3, 4 VU | 20 | 20 | 0 | 0.00 | 10.15 | 5 | 3–51 | 20 / 26 / 51 | 1.340 |
| Stress, gộp phân phối ba stage* | 35 | 35 | 0 | 0.00 | 16.11 | 5 | 2–141 | 26 / 116 / 141 | Không gộp |
| Spike, toàn bộ baseline + peak + recovery | 30 | 30 | 0 | 0.00 | 53.50 | 6 | 3–595 | 120 / 354 / 595 | 0.420 |
| Endurance, các dòng JTL hợp lệ | 309 | 309 | 0 | 0.00 | 21.04 | 5 | 2–314 | 41 / 98 / 281 | 0.662** |

\* Thống kê gộp Stress chỉ mô tả phân phối latency của 35 sample ở ba lần chạy, không phải một test run liên tục. \*\* Endurance RPS được tính trong timestamp span 466.8 giây của các dòng đầy đủ; không đại diện đủ 8m39 thời gian process hoạt động.

Với n=5, p90/p95/p99 đều bằng sample lớn nhất theo nearest-rank; các giá trị này không phải ước lượng tail percentile đáng tin cậy. Stress Stage 2 n=10 cũng quá nhỏ để đánh giá tail ổn định. Spike n=30 đủ để mô tả những sample đã ghi, nhưng mỗi phase và mỗi endpoint vẫn có rất ít quan sát. Đây không phải các kiểm định SLO; chưa có ngưỡng SLO được cung cấp.

## Endpoint / nhãn JMeter

Các tên endpoint dưới đây là nhãn sampler trong JTL. Mapping theo API inventory: Login = `POST /api/login`; Search products = `GET /api/products?search=...`; Product detail = `GET /api/products/:id`; Add item to cart = `POST /api/cart`; Checkout = `POST /api/checkout`. Bảng tóm tắt scenario dài nhất (Endurance) và peak của Spike để chỉ ra khác biệt theo endpoint.

| Endpoint | Endurance n | Mean (ms) | Median (ms) | p95 (ms) | Max (ms) | Spike peak n | Spike peak mean / max (ms) |
|---|---:|---:|---:|---:|---:|---:|---:|
| Login | 62 | 18.90 | 5 | 120 | 190 | 4 | 9.50 / 13 |
| Search products | 62 | 15.52 | 5 | 98 | 157 | 4 | 7.50 / 14 |
| Product detail | 62 | 14.18 | 4 | 11 | 314 | 4 | 5.75 / 6 |
| Add item to cart | 62 | 13.21 | 4 | 13 | 261 | 4 | 5.25 / 7 |
| Checkout | 61 | 43.77 | 24 | 88 | 290 | 4 | 321.50 / 595 |

Các mean/p95 endpoint phản ánh riêng sample của endpoint đó, không phân bổ response time toàn workflow. Checkout có mean Endurance lớn nhất và mean/max cao nhất trong Spike peak; Product detail và Add item to cart cũng có max Endurance lớn dù p95 thấp. Những max đơn lẻ có thể là outlier hoặc contention. JTL không có tracing/DB timing để quy nguyên nhân cho query, SQLite hay backend.

## So sánh ba scenario chính

- **Load:** chỉ có đúng một workflow (5 request), nên xác nhận plan chạy và business assertions qua, nhưng không đo sustained load hay latency distribution.
- **Stress:** ba file stage lần lượt 5, 10 và 20 sample (VU cấu hình 1, 2, 4). Các throughput quan sát là 0.405, 0.780 và 1.340 request/s theo từng file. Latency không tăng đơn điệu; Stage 1 có login 141 ms nhưng Stage 3 mean 10.15 ms. Khác thời điểm, cỡ mẫu và host conditions khiến không thể kết luận năng lực tăng hoặc giảm, điểm bão hòa hay maximum sustainable load.
- **Spike:** baseline n=5 mean 30.40 ms/max120; peak n=20 mean69.90/p95 354/max595; recovery n=5 mean11/max27. Peak ghi nhận checkout mean321.5 ms/max595 trong 4 sample. Recovery samples trả thành công và latency thấp hơn baseline trong tập mẫu này; đây chỉ là tín hiệu hồi đáp sau spike, không đủ khẳng định recovery ổn định.
- **Endurance:** 2 VU, 309 sample hợp lệ trong timestamp span 466.8 giây, 0 failures trong các dòng hoàn chỉnh. Run bị dừng vì RAM khả dụng host chạm guardrail; raw capture bị thiếu. Vì vậy không có kết luận sustained degradation, soak pass, throughput ổn định đủ 10 phút, hay ngưỡng bão hòa.

## Saturation, lỗi và giới hạn nguyên nhân

Không có failed sample trong các dòng JTL hợp lệ của Load/Stress/Spike/Endurance. Điều này chỉ nói về các dòng được lưu; riêng Endurance có chênh lệch giữa 341 sample JMeter log báo đã xử lý và 309 dòng hoàn chỉnh được phân tích. Không thấy error-rate growth trong dữ liệu hiện có.

Không có đủ quan sát để nhận diện throughput saturation: Load không có tải duy trì, Stress stage chạy rất ngắn và không nối thành một lần chạy, Spike giữ peak cho một workflow ngắn, Endurance dừng trước mục tiêu và có capture hỏng. Không thể suy ra bottleneck server-side từ response time đơn lẻ. Resource CSV Endurance ghi CPU host trung bình 83.7%/cao nhất100%, RAM available thấp nhất253 MiB; process backend private memory cao nhất61.9 MiB. Đây là bằng chứng host có áp lực tài nguyên, không phải CPU riêng tiến trình backend. Spike có RAM available thấp nhất395 MiB theo kết quả monitor scenario đã ghi. Các yếu tố host có thể ảnh hưởng latency, đặc biệt peak checkout, nhưng chưa xác minh quan hệ nhân quả.

## Files và tái lập

- Raw: `results/Load/23120157_Load_20261122_161045.jtl`, `results/Stress/23120157_Stress_Stage{1,2,3}_20261122_161045.jtl`, `results/Spike/23120157_Spike_20261122_161045.jtl`, `results/Endurance.jtl`.
- Các kết quả analyzer đã có nằm cạnh từng JTL dưới dạng `analysis*.md` và `*summary.json`; Endurance ở `results/Endurance-analysis.md` và `results/Endurance-summary.json`.
- Tính lại cho báo cáo dùng raw `timeStamp`, `elapsed`, `success`, `label`, bỏ đúng dòng Endurance thiếu cột. Phân vị nearest-rank. RPS trong bảng dùng cửa sổ từ sample start đầu đến response end cuối; cách tính cửa sổ được nêu để tránh so sánh nhầm với throughput của test kéo dài.
- Hardware/monitor evidence: `evidence/Hardware/hardware-report-20261122.md` và `evidence/Endurance/23120157_Endurance_20261122_203509_resources.csv`.
