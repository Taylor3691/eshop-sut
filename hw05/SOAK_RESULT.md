# Kết quả Soak test – ngưỡng chịu tải

- Plan: `23120175_Soak_20261121.jmx` (150 thread, ramp-up 60 s, giữ đến 960 s, think-time 0–50 ms)
- Chạy: 2026-11-21 16:41:30 → 16:57:30, máy `CT-TOAN-HUYNH` (MacBook Air M5, 16 GB), backend khởi động lại sạch trước khi chạy
- Lệnh: `jmeter -n -t 23120175_Soak_20261121.jmx -l results/soak.jtl -e -o reports/soak -Jhttpclient.reset_state_on_thread_group_iteration=false`
- Dữ liệu: `results/soak.jtl` (714 MB, repo lưu `soak.jtl.gz` 36 MB), `results/soak_node_rss.csv` (RSS `node` mỗi 5 s, 196 dòng), `reports/soak/`
- Ảnh: `evidence/soak/soak_01…04.png` (JMeter + htop + RSS cùng khung hình)

## Số liệu theo phút (luồng chính, bỏ sample `LOCK_*`)

Tính trực tiếp từ `results/soak.jtl` (cột `timeStamp`, `elapsed`, `success`) và `results/soak_node_rss.csv`.

| Phút | Request/giây | Trung bình (ms) | p95 (ms) | p99 (ms) | Max (ms) | Lỗi | RSS `node` (MB) |
|---|---|---|---|---|---|---|---|
| 0 (ramp-up) | 3.452 | 0,7 | 2 | 2 | 59 | 0 | 87 → 192 |
| 1 | 6.839 | 0,7 | 2 | 3 | 39 | 0 | 193 → 212 |
| 2 | 6.822 | 0,7 | 2 | 3 | 48 | 0 | 214 → 223 |
| 3 | 6.826 | 0,7 | 2 | 3 | 68 | 0 | 224 → 232 |
| 4 | 6.812 | 0,7 | 2 | 3 | 51 | 0 | 232 → 240 |
| 5 | 6.818 | 0,7 | 2 | 3 | 67 | 0 | 241 → 255 |
| 6 | 6.831 | 0,7 | 2 | 3 | 61 | 0 | 256 → 275 |
| 7 | 6.801 | 0,8 | 2 | 3 | 132 | 0 | 184 – 276 |
| **8** | **5.885** | 4,2 | 4 | **125** | 446 | 0 | 276 → 289 |
| 9 | 5.385 | 6,4 | 9 | 192 | 1.121 | 0 | 204 – 295 |
| 10 | 5.276 | 7,0 | 20 | 218 | 478 | 0 | 238 – 294 |
| 11 | 5.006 | 8,7 | 27 | 236 | 594 | 0 | 296 → 298 |
| 12 | 5.307 | 6,9 | 14 | 213 | 1.145 | 0 | 300 → 314 |
| 13 | 5.196 | 7,5 | 19 | 216 | 627 | 0 | 314 → 324 |
| 14 | 5.443 | 6,2 | 13 | 188 | 704 | 0 | 232 – 271 |
| 15 | 5.486 | 6,0 | 15 | 188 | 519 | 0 | 322 → 329 |

Tổng: 5.651.325 request luồng chính, **0 lỗi**. Lỗi duy nhất trong file là `LOCK_04` (bug #225, kỳ vọng).

## Ngưỡng chịu tải

| Chỉ số | Giá trị |
|---|---|
| RPS ổn định tối đa (phút 1–7) | **≈ 6.800 request/giây**, p95 = 2 ms, p99 = 3 ms |
| RPS duy trì được suốt 15 phút | **≈ 5.000–5.500 request/giây**, p95 ≤ 27 ms, p99 ≈ 190–236 ms, 0 lỗi |
| Thời điểm bắt đầu suy giảm | **Phút thứ 8** (khoảng 7 phút giữ tải): RPS giảm ≈20%, p99 tăng từ 3 ms lên 125–236 ms (≈ 70 lần) |
| Memory ceiling quan sát được | **329 MB** RSS cao nhất (79 MB trước khi chạy, mẫu đầu tiên trong `soak_node_rss.csv`), xu hướng tăng ≈ 9–10 MB/phút, chưa chạm trần |

## Nhận định

- Hệ thống **không lỗi** nhưng **suy giảm theo thời gian** dù tải đầu vào không đổi: đúng loại vấn đề mà soak test nhằm phát hiện, Load/Stress (≤ 7,5 phút) không thấy được.
- RSS tăng đều và có các lần giảm đột ngột (phút 7, 9, 14) đúng lúc độ trễ bắt đầu xấu đi. **Giả thuyết:** `userCarts` (bug #229) làm heap V8 phình liên tục, bộ dọn rác (GC) phải quét heap ngày càng lớn nên các lần dừng GC dài hơn, kéo p99 và throughput xuống.
- **Giả thuyết khác chưa loại trừ:** MacBook Air không có quạt, chạy kín CPU nhiều phút có thể bị hạ xung. `pmset -g therm` sau bài báo "No thermal warning level has been recorded" (chưa ghi nhận cảnh báo nhiệt), nhưng không đo trong lúc chạy.
- **Cách kiểm chứng:** chạy lại sau khi sửa #229 (xóa giỏ sau checkout) và so sánh; hoặc chạy Node với `--trace-gc` để đối chiếu thời điểm GC với p99; hoặc theo dõi `sudo powermetrics --samplers thermal` trong lúc chạy.
