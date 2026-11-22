# HW05 – Task 2: AI phân tích kết quả và săn lỗi đọc sai

Mọi "giá trị đúng" bên dưới tính trực tiếp từ file `.jtl` gốc (cột `elapsed`, `timeStamp`, `label`, `success`, `allThreads`), luồng chính, bỏ sample `LOCK_*`, phân vị nearest-rank trên mảng `elapsed` đã sắp xếp.

---

## 1. Quy trình


| Bước | Prompt (tóm tắt)                                                                      | Đầu vào                              | Log |
| ---- | ------------------------------------------------------------------------------------- | ------------------------------------ | --- |
| 1    | Tóm tắt số liệu 4 lần chạy, đánh giá đạt/không, đề xuất SLA, kết luận năng lực tối đa | `reports/*/statistics.json`          | #10 |
| 2    | Phân tích `.jtl` thô theo cửa sổ thời gian, đối chiếu với bước 1                      | `results/*.jtl`, `soak_node_rss.csv` | #11 |
| 3    | Đề xuất tối ưu kèm vị trí sửa, mức cải thiện dự kiến, rủi ro                          | `backend/server.js`, `database.js`   | #12 |


**Hạn chế của quy trình:** ở bước 1, Cursor có đọc được ghi chú trong AILOG #09 (đã nêu percentile Soak trong report lệch với `.jtl`). Vì vậy việc Cursor nhận ra chênh lệch percentile ở bước 2 **không phải phát hiện độc lập**. Lần sau nên chạy phân tích trong một phiên AI không đọc được file log và báo cáo đã có.

---

## 2. Tóm tắt phân tích của AI

- **Bước 1:** throughput tổng Load 17,90; Stress 5.292,79; Spike 51,81; Soak 5.886,43 request/giây. Lỗi duy nhất là `LOCK_04`. Nút thắt: `05_Checkout` (Load, Spike), `04_ApplyCoupon` (Stress, Soak). SLA đề xuất cho từng bước: p95 ≤ 50 ms, p99 ≤ 100 ms, lỗi ≤ 0,1%, throughput ≥ 15 request/giây ở profile Load. Năng lực: "khoảng 5.300–5.900 request/giây trung bình".
- **Bước 2:** Stress chưa bão hòa, cao nhất 200 thread / 8.930 request/giây. Spike phục hồi ngay, đỉnh chỉ ≈2% năng lực. Soak: phút 1–7 ≈6.820 request/giây, từ phút 8 giảm ≈22% còn ≈5.300, p99 ≈200 ms; RSS 78,6 → 319,7 MB. Nguyên nhân: `userCarts` không xóa, "khớp GC". Percentile Soak trong `statistics.json` sai, đúng là từ cột `elapsed`.

---

## 3. Những chỗ AI đọc sai hoặc suy luận sai


| #   | AI nói (AILOG)                                                                                                                                     | Giá trị đúng từ `.jtl`                                                                                                                                         | Vì sao sai                                                                                                                                                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | #10: "`Total.pct3ResTime` của Soak là 3 ms trong khi p99 từng bước là 48–211 ms, **vì đuôi của một bước chỉ chiếm khoảng một phần năm số sample**" | `soak.jtl`: p99 toàn bộ = **86 ms** (p99,9 = 354 ms)                                                                                                           | Lời giải thích sai về toán: nếu **mỗi** bước đều có ≥ 1% sample trên 48 ms thì tập gộp cũng có ≥ 1% sample trên 48 ms, nên p99 gộp không thể là 3 ms. AI hợp lý hóa con số sai thay vì nghi ngờ nó |
| 2   | #10: "Soak vượt p99 100 ms ở **Login**, ProductDetail, Checkout và ApplyCoupon" (dựa trên p99 report: 110, 168, 189, 211 ms)                       | p99 từ `soak.jtl`: Login **58**, ProductDetail **108**, Checkout **127**, ApplyCoupon **177** ms                                                               | Dùng percentile của report (sai với lần chạy lớn). **Login thực ra đạt** ngưỡng p99 ≤ 100 ms; các bước khác vượt nhưng mức vượt nhỏ hơn AI nói                                                     |
| 3   | #10: "Năng lực đọc từ bốn file: **khoảng 5.300–5.900 request/giây trung bình**"                                                                    | Stress đạt **8.862–8.930 request/giây** ở 200 thread (giây 270–330) mà p95 = 3 ms; Soak giữ **\≈6.820 request/giây** ổn định phút 1–7                          | Lấy `throughput` trung bình cả bài (gồm cả lúc tăng/giảm thread) làm năng lực. Trung bình thấp hơn đỉnh 40%. Chính AI ở bước 2 đã đưa ra 8.930, mâu thuẫn với kết luận bước 1                      |
| 4   | #10: "Soak p99 `04_ApplyCoupon` = 211 ms"                                                                                                          | `.jtl`: **177 ms**                                                                                                                                             | Cùng nguyên nhân #2. Thứ hạng "ApplyCoupon chậm nhất" vẫn đúng                                                                                                                                     |
| 5   | #10: throughput tối thiểu SLA "≥ 15 request/giây ở profile Load" dựa trên 17,90                                                                    | Load ổn định **18,6–18,9 request/giây** mỗi phút sau ramp-up; phút đầu 9,6                                                                                     | 17,90 là trung bình gồm phút ramp-up. Ngưỡng 15 vẫn dùng được, nhưng lý do nên dựa trên mức ổn định                                                                                                |
| 6   | #11: "Nhịp RSS tụt phút 7 rồi độ trễ gãy phút 8 **khớp GC** trên một thread Node" (#12 viết thành "p99 … **là do** heap và GC")                    | Dữ liệu chỉ có RSS (`soak_node_rss.csv`) và độ trễ; **không có log GC**. `pmset -g therm` sau bài: chưa ghi nhận cảnh báo nhiệt, nhưng không đo trong lúc chạy | Tương quan thời gian bị trình bày như nguyên nhân. Giả thuyết máy không quạt bị hạ xung CPU chưa được loại trừ. Cần `node --trace-gc` hoặc chạy lại sau khi sửa `userCarts`                        |


**Nhận định của AI đã kiểm chứng là đúng** (không phải lỗi): Stress chưa bão hòa, 8.930 request/giây ở 200 thread, p95 2–3 ms, p99 3–5 ms (`.jtl`: p95 2, p99 4 cả bài); Spike đỉnh 184–187 request/giây, phục hồi ngay; Soak phút 1–7 ≈6.820 request/giây, giảm ≈22% từ phút 8; p99 `04_ApplyCoupon` 188 ms ở phút 8 lên 325 ms ở phút 11, `05_Checkout` 144 → 277 ms; RSS 78,6 → 319,7 MB; lỗi duy nhất là `LOCK_04`.

---

## 4. Phân loại đề xuất tối ưu (AILOG #12)


| #   | Đề xuất                                             | Phân loại                                                                | Lý do                                                                                                                                                                                                                                                                                                                               |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Xóa `userCarts[userId]` sau checkout                | **Khả thi** (đúng nguyên nhân); **mức cải thiện dự kiến chưa có căn cứ** | Sửa đúng bug #229/#70: `POST /api/cart` chỉ `push` (`server.js:293`), checkout không xóa. Nhưng dự đoán "giữ 6.800 request/giây, p99 \≈3 ms suốt 15 phút, RSS < 150 MB" dựa trên giả định suy giảm do GC (mục 3, dòng 6), chưa đo lại                                                                                               |
| 2   | WAL + `synchronous=NORMAL` + `busy_timeout`         | Cách làm **khả thi**; mức cải thiện **bịa**                              | Nhận định nền đúng (SQLite mặc định `synchronous = 2` FULL; hai lần ghi ở `server.js:48` và `:302`). Nhưng "trần lên 12.500–13.500 request/giây" không dựa trên lần đo nào. Thư viện `sqlite3` chạy truy vấn ngoài luồng chính của Node; nút thắt đo được là CPU luồng chính (\≈125–130% lúc bão hòa), nên giảm fsync khó nâng trần |
| 3   | Bỏ `SELECT COUNT(*)` trên `coupon_usage` / cache mã | **Không nên áp dụng**                                                    | Bỏ đếm làm mất quy tắc `max_uses_per_user` (FR-09): đổi tính đúng lấy tốc độ. "Không gọi COUNT khi chưa có bản ghi" luẩn quẩn vì phải truy vấn mới biết. Lợi ích nhỏ: COUNT trên bảng rỗng, chạy ngoài luồng chính. Bảng rỗng chỉ vì luồng test không gọi `/api/coupon-usage`, không phải hành vi thật                              |
| 4   | Chỉ `UPDATE login_attempts` khi cần reset           | **Khả thi**, rủi ro thấp                                                 | Logic đúng, bớt một lần ghi mỗi vòng. Mức cải thiện lại dựa vào con số 12.500–13.500 không có căn cứ của mục 2                                                                                                                                                                                                                      |
| 5   | `CREATE INDEX idx_users_email`                      | **Khả thi**, lợi ích nhỏ                                                 | Bảng `users` không có index cho `email` (`database.js`). AI tự đánh giá < 1% với 200 user là hợp lý. Lưu ý về `UNIQUE` đúng (đăng ký trùng email hiện vẫn thành công, issue #211)                                                                                                                                                   |


**AI bỏ sót:**

- **Nút thắt chính không được xử lý:** backend một process, một luồng chính, chỉ dùng 1/10 nhân. Đề xuất đúng hướng là chạy nhiều process (cluster/PM2), nhưng phải chuyển giỏ hàng ra khỏi RAM trước, vì mỗi process có `userCarts` riêng.
- Mọi con số "dự kiến" đều chưa đo. AI có ghi chú ở đầu, nhưng từng mục vẫn nêu số cụ thể như kết quả.

---

## 5. Bài học

- **Không tin percentile của report HTML với lần chạy lớn**: luôn tính lại từ `.jtl`.
- **Throughput trung bình ≠ năng lực**: đọc theo cửa sổ thời gian và số thread.
- **AI hợp lý hóa số liệu sai** (dòng 1) thay vì nghi ngờ: cần kiểm tra tính nhất quán toán học giữa các con số.
- **Tương quan ≠ nhân quả**: AI biến "RSS tụt rồi độ trễ gãy" thành "do GC".
- **Cô lập ngữ cảnh khi dùng AI phân tích**: AI đọc được log/báo cáo cũ sẽ "biết trước" bẫy.