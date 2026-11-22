# Báo cáo phần cứng và môi trường — 2026-11-22

Thông tin được đọc trực tiếp từ Windows CIM, `hostname`, `Get-PSDrive`, và các lệnh version tại máy thực thi. Thời điểm chụp thông số sau cùng: khoảng 16:30 (+07:00), sau khi các kịch bản hoàn tất.

| Hạng mục | Giá trị đo/đọc được |
|---|---|
| Hostname | `DESKTOP-4H89BLS` |
| OS | Microsoft Windows 11 Home Single Language, 64-bit, version 10.0.26200, build 26200 |
| CPU | 13th Gen Intel(R) Core(TM) i7-1355U; 10 cores, 12 logical processors |
| RAM vật lý | 15.68 GiB |
| RAM available ở snapshot cuối | 1.6 GiB (thay đổi theo thời điểm) |
| RAM available thấp nhất trong các monitor CSV | 395 MiB trong Spike; 816 MiB Stress Stage 1; 898 MiB Stress Stage 2; 1,074 MiB Stress Stage 3 |
| Storage | Micron MTFDKCD512TFK SSD, 477 GiB; ổ D: còn khoảng 55.07 GiB |
| Node.js / npm | v22.20.0 / 11.7.0 |
| Java | 21.0.11 LTS (build 21.0.11+9-LTS-211) |
| Apache JMeter | 5.6.3 tại `D:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat`; không có trên PATH |

Các file monitor theo thời gian thực (CPU tổng, RAM available và working set Node backend) nằm tại `HW05/results/monitoring/`. Tần suất quan sát thực tế khoảng 2 giây do truy vấn CIM; giá trị ghi nhận có thể bị ảnh hưởng bởi host load và chi phí polling. CPU cao nhất ghi nhận là 100% trong Stress Stage 2 và Spike. Spike cũng có minimum RAM 395 MiB; kết quả bị giới hạn bởi tài nguyên và không dùng để suy ra sức tải ổn định.

Không có ảnh `dxdiag` hoặc ảnh chụp desktop đồng thời JMeter + Task Manager trong thư mục evidence. Không tạo ảnh minh họa thay thế. Yêu cầu screenshot/hardware capture của rubric còn thiếu và cần được ghi nhận là incomplete.
