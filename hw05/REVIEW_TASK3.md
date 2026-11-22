# Task 3 – Review output của AI (bước 5–6)

## 1. Lần trả lời thứ nhất (đánh giá ngưỡng sau thí nghiệm)

Cursor trả lời đúng câu hỏi bước 5 (ngưỡng có bắt được regression không) nhưng **chưa làm bước 6** (đánh đổi chi phí, bỏ sót, runner, cấu hình), phải prompt thêm.


| #   | AI nói                                                                                                   | Giá trị thật                                                                                                     | Đánh giá                                                                                                                                                              |
| --- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Bảng p95 10 lần baseline, trung vị; nhiễu tối đa 1 ms                                                    | Khớp `baseline_pr.json` của 2 run                                                                                | ✅                                                                                                                                                                     |
| 2   | **"Run 1 lệch p95 đúng +1 ms ở cả năm label"**                                                           | `run1/check_unchanged.txt`: Login +1, ProductDetail +1, **AddToCart 0**, ApplyCoupon +1, Checkout +1 (4/5 label) | ❌ Đọc sai; lần trả lời thứ hai đã tự sửa khi được yêu cầu kiểm tra lại                                                                                                |
| 3   | p99 ApplyCoupon baseline run 1 = 5, 5, 5, 5, 7; lần không đổi code lệch p99 +2 ở ApplyCoupon và Checkout | 7 so với 5; 6 so với 4                                                                                           | ✅                                                                                                                                                                     |
| 4   | Bảng regression giả: p95 Checkout 9/9 (run 1), 9/8 (run 2); exit 2 rồi 1                                 | Khớp                                                                                                             | ✅                                                                                                                                                                     |
| 5   | Ngưỡng +2 ms "cao hơn nhiễu đã thấy" và nới đạt lên +2 ms "sẽ nuốt nhiễu chưa từng xuất hiện"            | `04_ApplyCoupon` (không bị sửa) lệch **+2 ms** ở `run1/check_slow_1.txt`                                         | ⚠️ Lập luận thiếu: +2 ms đã xuất hiện trên label không bị sửa (dù trong lần backend chậm ở chỗ khác). Lần trả lời thứ hai làm rõ: không xuất hiện ở các lần chạy khỏe |
| 6   | Kết luận "chưa cần đổi số"                                                                               | Dựa trên 12 lần chạy không đổi code, 1 mức regression (+5 ms), 1 API                                             | ⚠️ Quá tự tin, không nêu giới hạn mẫu                                                                                                                                 |
| 7   | (không nhắc)                                                                                             | Throughput dao động −7% giữa các lần không đổi code                                                              | ⚠️ Bỏ qua dữ liệu có sẵn                                                                                                                                              |


## 2. Lần trả lời thứ hai (đánh đổi)

### Kiểm chứng số liệu


| AI nói                                                                      | Giá trị thật                                                 | Đánh giá                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| JMeter run 1 lần khỏe 92–93 s; run 2 104–110 s; slow run 1 111 s và 104 s   | `exp.log`: run 1 92–93 s, slow 111/104 s; run 2 104–110 s    | ✅                                                        |
| Khởi động lại backend + tạo user 4–6 s                                      | Khoảng cách giữa "xong" và "chạy" kế tiếp trong `exp.log`    | ✅                                                        |
| Đường xác nhận (slow\_1 + slow\_2) 223 s                                    | run 2: 01:26:51 → 01:30:34 = 223 s; run 1 ≈ 222 s            | ✅                                                        |
| `base_1` run 1: 14,0 MB thô, 0,73 MB nén; `slow_1`: 0,67 MB nén             | 13.968.118 byte; 732.562 byte; 673.764 byte                  | ✅                                                        |
| Nightly 16 phút, `soak.jtl` 714 MB / 36 MB nén; `stress.jtl` 244 MB / 12 MB | Khớp `SOAK_RESULT.md`, `results/`                            | ✅                                                        |
| Merge 150 s: "không có mốc đo"                                              | Đúng, chưa chạy tầng merge                                   | ✅ Trung thực                                             |
| Ngưỡng p99 +2 ms sẽ báo động trên chính lần không đổi code (run 1)          | p99 ApplyCoupon +2, Checkout +2 ở `run1/check_unchanged.txt` | ✅ Nhận định tốt: giải thích vì sao chỉ dùng p95 làm cổng |


### Lỗi và điểm yếu


| #   | AI nói                                                                                  | Vấn đề                                                                                                                                                              | Giá trị đúng                                                                             |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | "Throughput đã trôi khi máy bận": 113.857 sample (`base_1`) so với 101.992 (`slow_1`)   | **Dẫn sai bằng chứng**: `slow_1` là lần có regression giả, nên phần lớn mức giảm là do độ trễ cấy vào, không phải do máy bận                                        | Trôi khi code không đổi: `base_1` 113.857 so với `unchanged` 106.159 sample (−7%, run 1) |
| 2   | "Dải đạt +1 ms hẹp hơn mức chênh giữa hai loại máy"                                     | **Chưa đo**: không có lần chạy nào trên runner Ubuntu, nhưng trình bày như sự thật                                                                                  | Ghi "chưa đo"; lập luận đúng hướng nhưng là suy luận                                     |
| 3   | Không giải thích vì sao run 2 dài hơn run 1 (\~104–110 s so với 92 s) dù cùng plan 90 s | Bỏ sót: run 2 chạy kèm Terminal hiển thị, htop và chụp màn hình, tức là chi phí đo cũng phụ thuộc môi trường                                                        | Ghi nhận như một nguồn biến động chi phí                                                 |
| 4   | Mục "Regression bị bỏ sót" chỉ nêu: suy giảm Soak sau phút 7, lệch đúng +2 ms, đuôi p99 | **Thiếu** các loại có trong dữ liệu: RAM tăng 79 → 329 MB (tầng PR không đo RAM); API ngoài luồng test (tìm kiếm, admin); bug chức năng trả 200 (như `SAVE10`, #20) | Prompt đã nêu RAM làm ví dụ nhưng AI không trả lời                                       |
| 5   | Cấu hình nhóm: dùng một máy M5 xếp hàng                                                 | Không nêu rủi ro máy là **laptop cá nhân** (có thể tắt, mang đi, khóa màn hình như đã gặp lúc 01:13) và **không có quạt** (giả thuyết hạ xung khi chạy Soak)        | Cần máy cố định hoặc self-hosted runner luôn bật                                         |


### Phần AI làm tốt

- Tự sửa lỗi "năm label" khi được yêu cầu kiểm tra lại, trích đúng từng giá trị.
- Ghi rõ phần chưa có số đo (tầng merge).
- Chỉ ra cổng PR ngắn và p95 gộp của cả bài Soak (2 ms) đều không thấy suy giảm sau phút 7, chỉ luật theo phút của nightly mới thấy.
- Cảnh báo không commit `.jtl` thô 714 MB (giới hạn 100 MB của GitHub).

## 3. Bảng review cho báo cáo 


| #   | AI đề xuất / nhận định                                                     | Đúng với hệ thống này?                                                                        | Chỉnh thế nào                                                                         |
| --- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | Ngưỡng p95: đạt ≤ +1 ms, chạy lại ≥ +2 ms, chặn ≥ +3 ms sau xác nhận       | Đúng với dữ liệu 12 lần chạy; bắt được +5 ms ở cả 2 lần lặp, không báo động giả               | Giữ; ghi rõ giới hạn mẫu và ngưỡng tối thiểu phát hiện được là +3 ms                  |
| 2   | Chỉ dùng p95, không chặn theo p99                                          | Đúng: p99 lệch +2 ms ngay ở lần không đổi code                                                | Giữ; p99 chỉ để tham khảo                                                             |
| 3   | Tầng nightly xét từng phút                                                 | Đúng: p95 gộp Soak 2 ms che suy giảm phút 8                                                   | Giữ; đã sửa lỗi phút cuối không đủ 60 s (bước 4)                                      |
| 4   | Nightly tính cả phút cuối không trọn                                       | Sai: luôn báo động giả                                                                        | Đã sửa trong `p95_regression.py` (commit `96d393f`)                                   |
| 5   | Đặt workflow trong `.github/workflows/`                                    | Không phù hợp: repo chung của nhóm, workflow chạy trên PR của mọi người; cần quyền `workflow` | Chuyển sang `hw05/ci/perf.yml`, ghi chú cách bật                                      |
| 6   | Dẫn throughput `base_1` so với `slow_1` làm bằng chứng máy bận             | Sai bằng chứng                                                                                | Dùng `base_1` so với `unchanged` (−7%)                                                |
| 7   | Baseline M5 không dùng cho runner khác                                     | Đúng hướng nhưng chưa đo                                                                      | Ghi "chưa đo"; workflow bỏ qua cổng khi chưa có baseline cùng loại máy                |
| 8   | Bỏ sót RAM, API ngoài luồng, bug chức năng trả 200                         | Thiếu                                                                                         | Bổ sung vào phần thảo luận; đề xuất thêm ghi RSS ở nightly (như `record_node_rss.sh`) |
| 9   | Một máy M5 dùng chung cho cả nhóm                                          | Khả thi nhưng thiếu rủi ro laptop cá nhân / không quạt                                        | Bổ sung rủi ro; đề xuất máy cố định luôn bật                                          |
| 10  | Flow chart (`PERF_PIPELINE_FLOW.md`, AILOG #15): chạy lại khi lệch ≥ +3 ms | Không khớp `p95_regression.py` (chạy lại từ +2 ms); theo flow chart, lệch +2 ms sẽ pass luôn  | Flow chart trong `REPORT_TASK3.md` vẽ theo hành vi script đã kiểm chứng               |
