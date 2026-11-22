# Bẫy đã gặp khi làm performance test với AI (HW05 EShop)

Mỗi mục: **triệu chứng → nguyên nhân → cách xử lý → bằng chứng trong HW05**. Dùng làm checklist bắt buộc ở bước review (SKILL.md bước 5) và bước phân tích (bước 8).

## A. Thiết kế test plan

| # | Bẫy | Cách xử lý | Bằng chứng |
|---|---|---|---|
| A1 | **Assertion chỉ kiểm tra HTTP 200.** API trả 200 cả khi sai (`GET /api/products/:id` trả `{}` khi không tồn tại; coupon `SAVE10` trả `success: true` nhưng tổng tiền ×10) | Thêm JSON Assertion cho trường nghiệp vụ (`$.id` khớp input) và JSR223 kiểm tra tính đúng của số (giảm giá ≥ 0, tiền sau giảm ≤ tiền trước) | Issue #227, #20; `REVIEW_TESTPLANS.md` dòng 1 |
| A2 | **Lỗi dây chuyền:** login lỗi → token mặc định → mọi bước sau lỗi 403, 1 lỗi thành 3 lỗi và đổ sai cho bước sau | Ngay sau bước login và mỗi bước tạo dữ liệu cho bước sau: If Controller `${__jexl3("${JMeterThread.last_sample_ok}" == "false",)}` → Flow Control Action "Start Next Thread Loop" | `REVIEW_TESTPLANS.md` dòng 2, 3, 5 |
| A3 | **Giá trị mặc định của extractor làm hỏng body** (`FINAL_AMOUNT_NOT_FOUND` chèn vào JSON) → server trả 400 kèm stack trace | Bỏ bước sau khi bước trước lỗi (A2); log bug nếu server lộ stack trace | Issue #226 |
| A4 | **Có code xử lý lockout nhưng không bao giờ chạy** vì mọi user trong CSV đúng mật khẩu | setUp Thread Group riêng: đăng ký tài khoản mới, sai mật khẩu N lần, rồi đúng mật khẩu; assert theo đặc tả. Label bắt đầu bằng `LOCK_` | Issue #225 (khóa sau 2 lần thay vì 3) |
| A5 | **Đặc tả và code khác nhau** (đặc tả "3 lần sai", code `login_attempts + 2`) | Đọc code để biết hành vi thật, assert theo đặc tả để bắt bug | AILOG #01 |
| A6 | **Dữ liệu CSV dính bug chức năng** làm bẩn số liệu hiệu năng | Loại dữ liệu đó khỏi tải chính, giữ ở file negative riêng, log bug | `SAVE10` bị loại khỏi `coupons.csv` |
| A7 | **Think-time quá lớn cho Stress:** 200 thread × 200–500 ms chỉ đạt ~700 req/s, server không bão hòa | Ước lượng trước: req/s mỗi thread ≈ số request mỗi vòng ÷ (tổng think-time + tổng thời gian xử lý). So với năng lực server | `REVIEW_TESTPLANS.md` dòng 8 |
| A8 | **Spike quá nhẹ:** đỉnh chỉ ~186 req/s (< 3% năng lực) nên "chịu spike tốt" không chứng minh gì | Đặt đỉnh spike theo % năng lực đo được, không theo số thread | `REPORT_TASK1.md` mục 8.4 |
| A9 | **Thời lượng Stepping Thread Group bị tính sai:** mỗi bậc = ramp-up + period, không phải period | Tính: số bậc × (rampUp + period) + flighttime + thời gian dừng | AILOG #05 (445 s), đính chính ở #06 |

## B. Môi trường chạy

| # | Bẫy | Cách xử lý | Bằng chứng |
|---|---|---|---|
| B1 | **Hết cổng TCP tạm trên macOS** khi think-time nhỏ: `BindException: Can't assign requested address`, 28% lỗi giả ngay ở 25 thread | Chạy với `-Jhttpclient.reset_state_on_thread_group_iteration=false` | `REVIEW_TESTPLANS.md` dòng 9 |
| B2 | **Trạng thái SUT từ lần trước** (tài khoản bị khóa, giỏ hàng trong RAM, đơn hàng) làm sai lần sau: RSS 90 → 241 MB | `scripts/reset_sut.sh` trước **mỗi** lần chạy | Issue #229 |
| B3 | **JMeter ghi nối tiếp vào `.jtl` có sẵn** → trộn dữ liệu cũ/mới; thư mục `-o` đã tồn tại → lỗi | Xóa `.jtl` và thư mục report trước khi chạy | `SKILL.md` bước 7 |
| B4 | **JMeter và SUT chung máy:** JMeter (~35% CPU) cạnh tranh tài nguyên | Ghi nhận trong báo cáo; theo dõi cả process `java` và process SUT | `evidence/soak/` |
| B5 | **Laptop không quạt** có thể hạ xung khi chạy kín nhiều phút; **màn hình khóa** làm hỏng việc chụp ảnh | Cắm sạc, `caffeinate -d -i -u` khi chạy dài; ghi nhận là giả thuyết cần loại trừ | `SOAK_RESULT.md`, `T3_EXPERIMENT.md` |
| B6 | **File `.jtl` lớn hơn 100 MB** bị GitHub từ chối khi push | Repo lưu `.jtl.gz`, bản gốc nộp trong zip; thêm bản gốc vào `.gitignore` | `stress.jtl` 244 MB, `soak.jtl` 714 MB |

## C. Phân tích kết quả (AI hay đọc sai)

| # | Bẫy | Cách xử lý | Bằng chứng |
|---|---|---|---|
| C1 | **Percentile trong `statistics.json` sai với lần chạy lớn** (Soak: Total p99 3 ms so với 86 ms thật) | Luôn tính từ cột `elapsed` của `.jtl`: `scripts/jtl_analyze.py`, dùng `--compare` để chỉ ra chỗ lệch | `REPORT_TASK2.md` dòng 1 |
| C2 | **AI hợp lý hóa con số sai** ("đuôi chỉ chiếm 1/5 sample") thay vì nghi ngờ | Kiểm tra nhất quán toán học: nếu mọi label có ≥ 1% sample trên X ms thì p99 gộp ≥ X | `REPORT_TASK2.md` dòng 1 |
| C3 | **Throughput trung bình bị coi là năng lực** (5.293 so với đỉnh 8.930 req/s) | Đọc theo cửa sổ thời gian kèm số thread (`--window`) | `REPORT_TASK2.md` dòng 3 |
| C4 | **Đọc sai cột `IdleTime`** thành "không có think-time" | `IdleTime` không ghi thời gian timer. Suy think-time từ req/s mỗi thread | AILOG #07, #08 |
| C5 | **Đếm lỗi chức năng vào lỗi hiệu năng** (`LOCK_04` fail mọi lần) | Loại tiền tố `LOCK_` khỏi thống kê hiệu năng, báo riêng | `jtl_analyze.py --exclude` |
| C6 | **Tương quan bị trình bày như nhân quả** ("p99 gãy là do GC") | Ghi rõ "giả thuyết", nêu giả thuyết khác (nhiệt), cách kiểm chứng (`--trace-gc`, chạy lại sau khi sửa) | `REPORT_TASK2.md` dòng 6 |
| C7 | **p95 gộp cả bài che suy giảm theo thời gian** (Soak p95 gộp 2 ms dù từ phút 8 p99 > 100 ms) | Xét theo phút; bỏ phút ramp-up và phút cuối không trọn | `T3_EXPERIMENT.md`, `p95_regression.py --tier nightly` |
| C8 | **AI so sai cặp dữ liệu** (lấy lần có regression giả làm bằng chứng "máy bận") | Chỉ so các lần cùng điều kiện; ghi rõ mỗi con số lấy từ file nào | `REVIEW_TASK3.md` lỗi 1 |
| C9 | **Con số "cải thiện dự kiến" không có số đo** (WAL "nâng trần lên 12.500–13.500 req/s") | Yêu cầu AI chỉ ra căn cứ đo; không có thì phân loại là bịa | `REPORT_TASK2.md` mục 4 |

## D. Cổng regression

| # | Bẫy | Cách xử lý |
|---|---|---|
| D1 | Ngưỡng % vô nghĩa khi p95 chỉ vài ms (1 ms = 25–50%) | Ngưỡng tuyệt đối, đặt theo độ nhiễu đo được (≥ 5 lần chạy) |
| D2 | Chặn ngay lần đầu → báo động giả (label không bị sửa vẫn nhích +2 ms) | Bắt buộc chạy lại xác nhận trên process mới |
| D3 | Dùng p99 hoặc throughput làm cổng | p99 lệch +2 ms, throughput lệch −7% ngay khi code không đổi |
| D4 | Baseline đo trên máy khác | Gắn tên máy vào baseline; không so số ms giữa hai loại máy |
| D5 | Đặt workflow vào `.github/workflows/` của repo chung | Workflow chạy trên PR của cả nhóm và cần quyền `workflow`; để bản phác thảo ở thư mục riêng |
