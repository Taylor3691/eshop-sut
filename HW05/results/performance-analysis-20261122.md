# Phân tích kết quả JMeter — 2026-11-22

## Phạm vi và cách đọc

Tất cả số liệu dưới đây được tính từ JTL do Apache JMeter 5.6.3 thực thi thật trên EShop backend cô lập. Tất cả business assertions thành công; không có ngưỡng SLO được cung cấp. Các plan chỉ lặp một workflow cho mỗi VU, vì vậy đây là kiểm tra workflow hữu hạn, không phải sustained Load/Stress/Endurance. Percentile ở mẫu 5–10 ít ổn định. Throughput là sample/s trong khoảng timestamp quan sát; Spike tổng bao gồm khoảng delay giữa phase.

## Kết quả tổng hợp

| Run | Samples | Failed | Error rate | Mean (ms) | p90 / p95 / p99 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|---:|
| Load, 1 VU | 5 | 0 | 0% | 15.20 | 48 / 48 / 48 | 0.41 |
| Stress Stage 1, 1 VU | 5 | 0 | 0% | 33.80 | 141 / 141 / 141 | 0.41 |
| Stress Stage 2, 2 VU | 10 | 0 | 0% | 19.20 | 26 / 116 / 116 | 0.78 |
| Stress Stage 3, 4 VU | 20 | 0 | 0% | 10.15 | 20 / 26 / 51 | 1.34 |
| Spike toàn run, 1→4→1 VU | 30 | 0 | 0% | 53.50 | 120 / 354 / 595 | 0.42 |

### Spike theo phase

| Phase | Samples | Mean (ms) | Max (ms) | Throughput trong timestamp span (samples/s) |
|---|---:|---:|---:|---:|
| Baseline — 1 VU | 5 | 30.4 | 120 | 0.407 |
| Peak — 4 VU | 20 | 69.9 | 595 | 0.926 |
| Recovery — 1 VU | 5 | 11.0 | 27 | 0.414 |

Peak checkout sample đạt 595 ms, là sample lớn nhất trong run Spike. Mean recovery thấp hơn baseline trong tập mẫu nhỏ; `n=5` mỗi phase, cùng cảnh báo RAM/CPU nên không đủ bằng chứng để khẳng định hệ thống recovery ổn định.

## Lỗi và tài nguyên

- Tổng Load/Stress/Spike: 70 samples, 70 thành công, 0 thất bại. Smoke bổ sung: 5/5 thành công. JTL không có failure message; không phát hiện HTTP/assertion failure để phân tích nguyên nhân.
- Smoke xác minh login, search, product detail, add-to-cart và checkout; isolated SQLite có 15 orders sau toàn bộ run. Không account nào bị lockout.
- Monitor ghi CPU/RAM thấp nhất-cao nhất theo từng scenario: Load 38%/1,644 MiB free; Stress 1 84%/816 MiB; Stress 2 100%/898 MiB; Stress 3 60%/1,074 MiB; Spike 100%/395 MiB.
- Spike có dấu hiệu host resource pressure, do đó không kết luận 4 VU là an toàn hoặc maximum capacity. Stress stages không giữ tải; không xác định maximum sustainable RPS. Không có endurance run.

## Kết luận có giới hạn

Các endpoint và business assertions hoàn thành thành công ở workload nhỏ đã cấu hình. Những mẫu thực tế này xác nhận luồng thử nghiệm chạy được và tạo side effects đúng dự kiến trong DB cô lập. Chúng không chứng minh hiệu năng production, maximum sustainable load, hay SLO compliance. Để kết luận các điểm đó, cần môi trường ít tải nền hơn, monitor overhead thấp, thời lượng sustained/soak theo rubric, và ngưỡng SLO được thống nhất.

JTL validator của Agent Skill xác nhận đủ trường `timeStamp`, `elapsed`, `label`, `success` cho cả sáu JTL (Smoke, Load, Stress 1–3, Spike). Báo cáo chi tiết từng JTL nằm cạnh file JTL tương ứng.
