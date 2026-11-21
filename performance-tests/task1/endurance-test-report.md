# Task 1.7 – Endurance Threshold Report

## 1. Mục tiêu

Bài kiểm thử đánh giá khả năng duy trì tải của backend EShop trong 10 phút ở trạng thái ổn định. Mục tiêu là xác định mức tải và thông lượng cao nhất đã được xác minh trong lần chạy, đồng thời ghi nhận memory ceiling của tiến trình backend.

## 2. Nguồn dữ liệu

Phân tích sử dụng hai nguồn dữ liệu thực thi:

1. `evidence/endurance/run01/23120117_Endurance_20261121.jtl`: raw HTTP samples và E2E Transaction Controller.
2. `evidence/endurance/run01/backend-resource.csv`: CPU, Working Set, Private Memory, thread và handle của backend PID 28452.

HTML Dashboard tại `evidence/endurance/run01/html/` được dùng để đối chiếu số sample và lỗi tổng thể.

## 3. Cấu hình và phương pháp phân tích

| Thuộc tính | Giá trị |
|---|---:|
| Virtual users tối đa | 120 VU |
| Ramp-up | 120 giây |
| Stable hold | 600 giây |
| Tổng thời gian thực tế | 719,96 giây |
| Bắt đầu test | 21/11/2026 19:52:04,869 (UTC+7) |
| Kết thúc test | 21/11/2026 20:04:04,829 (UTC+7) |
| Stable window | 19:54:04,869–20:04:04,829 (UTC+7) |

Phương pháp xử lý:

- Ramp-up 0–120 giây không được dùng để kết luận stable RPS.
- Kết quả ổn định được tính trong khoảng 120–720 giây.
- Các dòng `E2E - Login to order verification` được tách khỏi HTTP RPS để tránh đếm thêm Transaction Controller như một HTTP request.
- Percentile trong phần phân tích stable window được tính trực tiếp từ `elapsed` trong JTL bằng nearest-rank.
- Resource CSV có 250 mẫu từ 19:51:56 đến 20:16:33. Chỉ 121 mẫu nằm trong thời gian test và 101 mẫu nằm trong stable window được sử dụng.
- Dấu phẩy thập phân trong resource CSV được chuẩn hóa trước khi tính toán.

## 4. Kết quả tổng quan

### 4.1. Toàn bộ lần chạy, gồm ramp-up

| Metric | HTTP requests | E2E workflows |
|---|---:|---:|
| Samples hoàn thành | 49.146 | 9.798 |
| Error count | 0 | 0 |
| Error rate | 0,00% | 0,00% |
| Throughput | 68,26 request/s | 13,61 workflow/s |
| Average | 4,18 ms | 8.056,42 ms |
| Median | 3 ms | 8.050 ms |
| p95 | 11 ms | 10.006 ms |
| p99 | 18 ms | 10.663 ms |
| Maximum | 184 ms | 11.584 ms |

### 4.2. Stable hold 600 giây

| Metric | HTTP requests | E2E workflows |
|---|---:|---:|
| Samples hoàn thành | 44.623 | 8.832 |
| Error count | 0 | 0 |
| Error rate | 0,00% | 0,00% |
| Throughput | **74,38 request/s** | **14,72 workflow/s** |
| Average | 4,24 ms | 8.057,60 ms |
| Median | 3 ms | 8.051 ms |
| p90 | 8 ms | 9.564 ms |
| p95 | **11 ms** | 10.003 ms |
| p99 | 19 ms | 10.676 ms |
| Maximum | 184 ms | 11.584 ms |

E2E duration chứa think-time ngẫu nhiên 1–3 giây giữa các bước. Vì vậy p95 E2E khoảng 10 giây không phải p95 của một API riêng lẻ. HTTP latency phải được đọc từ HTTP requests hoặc từng endpoint.

## 5. Kết quả từng endpoint trong stable hold

| Endpoint label | Samples | RPS | Average | p95 | p99 | Maximum | Error % |
|---|---:|---:|---:|---:|---:|---:|---:|
| 01 - Login | 8.922 | 14,87 | 2,77 ms | 7 ms | 13 ms | 67 ms | 0,00% |
| 02 - Get product list | 8.928 | 14,88 | 3,42 ms | 9 ms | 16 ms | 122 ms | 0,00% |
| 03 - Add product to cart | 8.928 | 14,88 | 1,93 ms | 4 ms | 5 ms | 30 ms | 0,00% |
| 04 - Checkout | 8.923 | 14,87 | 8,10 ms | 16 ms | 28 ms | 184 ms | 0,00% |
| 05 - Verify order in history | 8.922 | 14,87 | 5,00 ms | 11 ms | 19 ms | 107 ms | 0,00% |

Checkout là endpoint chậm nhất trong workflow nhưng p95 chỉ 16 ms và không có lỗi. Tất cả 44.623 HTTP responses trong stable window trả mã 200.

## 6. Độ ổn định theo từng phút

| Stable window | HTTP RPS | p95 | Error % | CPU trung bình | CPU tối đa | Working Set tối đa |
|---|---:|---:|---:|---:|---:|---:|
| 120–180s | 74,42 | 10 ms | 0,00% | 0,98% | 3,00% | 84,48 MB |
| 180–240s | 74,37 | 11 ms | 0,00% | 0,96% | 2,31% | 85,46 MB |
| 240–300s | 74,45 | 9 ms | 0,00% | 1,06% | 2,69% | 85,73 MB |
| 300–360s | 74,05 | 10 ms | 0,00% | 0,75% | 2,62% | 85,82 MB |
| 360–420s | 73,77 | 9 ms | 0,00% | 0,40% | 1,44% | 86,94 MB |
| 420–480s | 75,28 | 9 ms | 0,00% | 1,44% | 3,94% | 87,97 MB |
| 480–540s | 74,50 | 9 ms | 0,00% | 0,59% | 1,94% | 86,27 MB |
| 540–600s | 74,55 | 9 ms | 0,00% | 0,51% | 3,38% | 86,77 MB |
| 600–660s | 74,33 | 16 ms | 0,00% | 0,93% | 2,25% | 87,32 MB |
| 660–720s | 74,05 | 14 ms | 0,00% | 1,14% | 2,94% | 86,60 MB |

Thông lượng dao động trong khoảng 73,77–75,28 RPS và không có xu hướng giảm liên tục. Nửa đầu stable hold đạt 74,21 RPS; nửa sau đạt 74,54 RPS, tăng 0,45%.

p95 tăng từ 10 ms ở nửa đầu lên 12 ms ở nửa sau, tương đương 20%. Hai phút cuối có p95 cao hơn, nhưng p95 giảm từ 16 ms xuống 14 ms ở phút cuối và throughput vẫn ổn định. Đây là điểm cần theo dõi trong lần chạy lặp lại, chưa phải bằng chứng suy giảm liên tục.

## 7. Tài nguyên backend

| Metric trong stable hold | Giá trị |
|---|---:|
| Backend PID | 28452 |
| Resource samples | 101 |
| CPU trung bình | 0,87% |
| CPU p95 | 2,69% |
| CPU tối đa | 3,94% |
| Tỷ lệ mẫu CPU trên 90% | 0,00% |
| Working Set đầu hold | 83,32 MB |
| Working Set cuối hold | 86,60 MB |
| Working Set trung bình | 81,52 MB |
| **Working Set cao nhất** | **87,97 MB** |
| Working Set thay đổi đầu–cuối | +3,28 MB (+3,94%) |
| Xu hướng Working Set | +0,824 MB/phút |
| Private Memory đầu hold | 103,58 MB |
| Private Memory cuối hold | 105,98 MB |
| Private Memory cao nhất | 107,09 MB |
| Thread tối đa | 12 |
| Handle tối đa | 331 |

Working Set dao động theo từng phút thay vì tăng đơn điệu. Peak 87,97 MB xuất hiện ở phút 420–480; cuối bài còn 86,60 MB. Mức tăng đầu–cuối 3,94% trong 10 phút chưa cho thấy memory growth mất kiểm soát, nhưng một soak test dài hơn vẫn cần thiết để loại trừ memory leak chậm.

## 8. Đánh giá theo tiêu chí ổn định

| Tiêu chí | Kết quả | Đánh giá |
|---|---:|---|
| Backend hoàn tất toàn bộ 720 giây | Có | Đạt |
| Error rate dưới 1% | 0,00% | Đạt |
| Không có chuỗi lỗi 5xx/timeout | 0 lỗi, tất cả HTTP 200 | Đạt |
| Throughput không giảm liên tục | Nửa sau +0,45% | Đạt |
| CPU không duy trì trên 90% | Peak 3,94% | Đạt |
| Memory không tăng không giới hạn | +3,94%, có dao động/giải phóng | Đạt trong phạm vi 10 phút |
| p95 không tăng trên 20% | Tăng đúng 20% giữa hai nửa | Đạt sát ngưỡng, cần theo dõi |

## 9. Endurance threshold

Lần chạy 120 VU thỏa các tiêu chí ổn định đã đặt ra. Kết quả xác minh:

```text
Maximum verified stable load: 120 VU
Maximum verified stable RPS: 74,38 HTTP requests/second
Verified workflow throughput: 14,72 completed workflows/second
Backend memory ceiling: 87,97 MB Working Set
Peak private memory: 107,09 MB
Average / peak backend CPU: 0,87% / 3,94%
HTTP p95 during stable hold: 11 ms
Error rate during stable hold: 0,00%
Evidence run: performance-tests/task1/evidence/endurance/run01/
```

**Kết luận:** trên phần cứng và dữ liệu của lần chạy này, backend duy trì ổn định 120 VU trong 10 phút hold với khoảng 74,38 HTTP RPS. Vì chưa thực hiện soak test ở mức cao hơn, 74,38 RPS phải được mô tả là **maximum verified stable RPS**, không phải giới hạn tuyệt đối của hệ thống.

## 10. Hạn chế và việc cần bổ sung

1. Thời gian hold 10 phút đáp ứng phạm vi bài tập nhưng chưa đủ dài để loại trừ memory leak chậm.
2. p95 của nửa sau cao hơn 20% so với nửa đầu. Throughput và error rate vẫn ổn định, nhưng nên chạy lặp lại để kiểm tra khả năng tái lập.
3. Resource collection dùng WMI/CIM nên chu kỳ thực tế gần 6 giây thay vì đúng 5 giây; vẫn bao phủ toàn bộ stable window.
4. Load generator và backend cùng chạy trên localhost. Kết quả phản ánh phần cứng hiện tại, không đại diện cho môi trường mạng/production.
5. Flow dùng CSV recycle và backend có hành vi tích lũy cart đã được ghi nhận trong human review; điều này có thể ảnh hưởng memory khi chạy lâu hơn.
6. Báo cáo số liệu cần đi kèm ảnh JMeter/terminal và Task Manager đúng PID trong cùng khung hình để hoàn thiện execution evidence.

