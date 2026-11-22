# Báo cáo Endurance / Soak Test — 2026-11-22

## Kết luận và trạng thái

**PARTIALLY EXECUTED.** Kịch bản đặt thời lượng 600 giây, nhưng đã bị dừng sau khoảng 8 phút 39 giây khi RAM khả dụng của host xuống dưới ngưỡng an toàn 512 MiB; monitor ghi nhận mức thấp nhất 253 MiB. Đây là ngưỡng dừng an toàn đã chọn, không phải lỗi hoặc giới hạn đã xác định của EShop. Không có HTTP/assertion error trong JMeter summary hay trong các bản ghi JTL đầy đủ. Không tiếp tục đo sau khi chạm ngưỡng.

Maximum stable RPS và memory ceiling **chưa xác định**. Đo được 0.662 request/s từ các sample đầy đủ trong JTL, nhưng đó là throughput quan sát ở workload 2 VU trước khi run bị dừng, không phải maximum stable throughput.

## Cấu hình và môi trường

| Thuộc tính | Giá trị |
|---|---|
| Test plan | [`23120157_Endurance_20261122.jmx`](../test-plans/23120157_Endurance_20261122.jmx) |
| JMeter | Apache JMeter 5.6.3, non-GUI; JVM heap `-Xms128m -Xmx256m` |
| Backend | `http://localhost:3000`, chạy từ bản sao backend và SQLite cô lập trong `%TEMP%` |
| VU | 2 thread groups × 1 VU, ramp-up 1 giây mỗi group |
| Duration cấu hình | 600 giây |
| Think time | 3,000 ms trước mỗi HTTP sampler |
| Workflow | Login → Search products → Product detail → Add to cart → Checkout |
| Dữ liệu | Hai tài khoản riêng, mỗi thread group dùng CSV riêng; mỗi workflow tạo một order và cart trong memory tăng thêm một item |
| JMeter stop policy | Dừng thread lỗi; operator dừng toàn run khi free RAM <512 MiB |

Product 1, tên và giá được xác nhận qua API thật trong backend cô lập. Hai tài khoản được đăng ký bằng `/api/register` và đăng nhập xác thực trước khi chạy. Password/CSV không được đưa vào repository. DB gốc không được start, reset hoặc sửa.

## Kết quả tính từ JTL

Raw file là [`results/Endurance.jtl`](../results/Endurance.jtl). File có 310 data lines; 309 dòng có đủ 17 cột và một dòng cuối cùng thiếu 5 cột. Chỉ 309 dòng đầy đủ được dùng cho metrics dưới đây; dòng dở dang được giữ nguyên trong raw file và không được sửa.

| Metric | Kết quả từ 309 dòng đầy đủ |
|---|---:|
| Successful / failed samples | 309 / 0 |
| Error rate | 0.00% |
| Mean response time | 21.04 ms |
| Median | 5 ms |
| Minimum / maximum | 2 / 314 ms |
| p90 / p95 / p99 | 41 / 98 / 281 ms |
| Throughput trong timestamp span quan sát | 0.6619 request/s |
| Timestamp span của sample đầy đủ | 466.8 giây (7 phút 46.8 giây) |

Một sample cuối cùng thuộc `Checkout` chỉ được ghi một phần. JMeter dashboard generator từ chối raw JTL vì dòng cuối chỉ có 12 cột thay vì 17; không có HTML Dashboard Endurance được tạo. JMeter periodic summarizer ghi nhận 341 samples đã xử lý tại mốc 8:39, trong khi raw file chỉ có 309 dòng đầy đủ và một dòng dở dang. Không tái tạo hoặc ước lượng các sample thiếu. Isolated SQLite có 70 orders sau khi dừng (ban đầu 0); chênh lệch với 61 dòng Checkout đầy đủ trong JTL là dấu hiệu rõ ràng rằng raw capture không đầy đủ.

## Thời gian đáp ứng theo phút

Các bucket dưới đây dùng timestamp và `elapsed` từ 309 dòng đầy đủ; phút cuối chưa hoàn chỉnh.

| Phút kể từ sample đầu | Samples | Mean (ms) | p95 (ms) | Max (ms) | Errors |
|---:|---:|---:|---:|---:|---:|
| 0 | 40 | 23.9 | 90 | 190 | 0 |
| 1 | 40 | 16.8 | 61 | 71 | 0 |
| 2 | 40 | 9.6 | 24 | 70 | 0 |
| 3 | 40 | 17.5 | 53 | 290 | 0 |
| 4 | 40 | 8.9 | 26 | 53 | 0 |
| 5 | 38 | 37.4 | 282 | 314 | 0 |
| 6 | 40 | 10.0 | 30 | 45 | 0 |
| 7, partial | 32 | 51.5 | 247 | 261 | 0 |

Latency tăng ở một số bucket muộn, nhưng không tăng đều qua từng phút. Bucket cuối không đủ dữ liệu và JTL không bao phủ toàn bộ thời gian JMeter hoạt động; vì vậy không thể kết luận degradation bền vững. Thời gian tối đa 314 ms vẫn là sample thực tế lớn nhất trong JTL đầy đủ.

## CPU và bộ nhớ

Monitor lấy mẫu counter Windows khoảng mỗi 6 giây. Trong khoảng JMeter chạy, CPU trung bình ghi nhận 83.7%, cao nhất 100%. Host đã có tải nền và các chỉ số CPU không thể quy riêng cho EShop.

RAM khả dụng theo monitor bắt đầu khoảng 2,039 MiB, xuống thấp nhất 253 MiB lúc 20:49:53 (+07), rồi là khoảng 929 MiB ở sample gần cuối run. Safety floor 512 MiB đã bị vượt qua; operator dừng JMeter ở mốc CLI 8:39. Working set backend cao nhất 53.0 MiB, private memory backend cao nhất 61.9 MiB; private memory JMeter cao nhất 263.6 MiB. Không có bằng chứng backend memory tăng đều; biến động RAM host lớn hơn working set của hai process được theo dõi, nên không gán mức giảm RAM cho riêng backend.

Đây là **điểm dừng vận hành** được đo, không phải point of failure của SUT. Backend vẫn có listener khi JMeter bị dừng; không có request error trong JMeter summary. Mức RAM này không được dùng để tuyên bố hardware memory ceiling.

## Bằng chứng và xác minh

- Raw JTL: [`results/Endurance.jtl`](../results/Endurance.jtl)
- JMeter log: `results/Endurance_20261122_203509.log`
- Resource CSV: [`evidence/Endurance/23120157_Endurance_20261122_203509_resources.csv`](../evidence/Endurance/23120157_Endurance_20261122_203509_resources.csv)
- Monitor script: [`evidence/Endurance/monitor-resources.ps1`](../evidence/Endurance/monitor-resources.ps1)
- Metrics và loại bỏ dòng lỗi định dạng: `results/Endurance-analysis.md`, `results/Endurance-summary.json`
- JMeter HTML Dashboard: **không tạo được**; report generator phát hiện line 311 có 12/17 cột.
- Screenshot desktop/Task Manager: **không chụp**; CSV là resource evidence thật, không thay thế screenshot bắt buộc nếu rubric yêu cầu.
- Sau run: 70 orders trong isolated SQLite; 0 tài khoản bị lockout. Backend cô lập đã dừng; DB gốc không bị thay đổi.

## Giới hạn và bước tiếp theo

Run chưa đạt mốc soak 10–15 phút và JTL bị cắt dở, vì vậy không thể xác định maximum stable RPS, memory ceiling, hay sustained error/latency threshold. Chỉ có thể báo cáo throughput 0.6619 request/s trong timestamp span của các dòng JTL đầy đủ tại 2 VU.

Để hoàn thành phép đo, cần lặp lại 10–15 phút sau khi host ổn định và còn đủ RAM, với monitor chạy trước; giữ guardrail RAM 512 MiB hoặc cao hơn; chỉ kết luận khi JMeter kết thúc bình thường, raw JTL có đủ 17 cột cho mọi dòng, và số checkout trong DB khớp JTL. Không khởi động backend trong repository vì startup sẽ reset DB gốc.
