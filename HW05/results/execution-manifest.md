# Execution Manifest — Load / Stress / Spike

## Trạng thái

**Không có scenario nào được thực thi.** Đây là bản ghi preflight thực tế ngày **2026-11-19 15:23 +07:00**; không phải kết quả performance test. Không tạo/giả lập JTL, HTML report, screenshot hoặc số đo.

## Preflight

| Kiểm tra | Kết quả thực tế | Trạng thái |
|---|---|---|
| Backend đang chạy / port 3000 | Không có TCP listener ở port 3000; không gửi test request và không start server. | BLOCKED |
| Database available | `backend/database.sqlite` mở đọc-only thành công; 2 seed users, 5 products, 0 orders tại thời điểm kiểm tra. | READ-ONLY OK; không phải DB server đang chạy |
| Lockout | Hai seed accounts có `login_attempts=0`, `locked_until=NULL`. | OK tại snapshot; chưa xác minh qua backend |
| Product data | IDs 1-5 có trong SQLite; `id=1`, iPhone 15 Pro Max, giá 30,000,000. | READ-ONLY OK; cần recheck qua test API trước run |
| CSV | Header đúng 9 biến; chỉ 1 data row; `shipping_address` rỗng. | BLOCKED cho fixture checkout / concurrency |
| JMeter installation | `Get-Command jmeter/jmeter.bat` không tìm thấy; `JMETER_HOME` rỗng. Java 21.0.11 có sẵn. | BLOCKED |
| Output directories | `results/Load|Stress|Spike`, `html-reports/Load|Stress|Spike`, `evidence/Load|Stress|Spike` tồn tại và rỗng. | READY; chưa có artifacts |
| Hardware snapshot | Intel Core i7-1355U, 10 cores/12 logical processors, RAM tổng 15.7 GiB, RAM khả dụng 1.71 GiB, D: còn 55.2 GiB. | Headroom thấp cho stress; đánh giá lại sát giờ run |
| Previous execution | Không có process `java`/`jmeter`; output folders không có JTL/report. Hai Node process tồn tại nhưng không có listener thuộc các PID đó ở port đang kiểm tra; backend port 3000 không listen. | Không thấy JMeter run trước đó |
| Backup/data safety | Backend chưa start; original DB không bị reset/ghi bởi task này. | PRESERVED |

## Scenario record

| Scenario | Plan | Start/end | Actual parameters | Errors/results | JTL | HTML dashboard | Screenshot | Kết quả |
|---|---|---|---|---|---|---|---|---|
| Load | `test-plans/23120157_Load_20261118.jmx` | Không chạy | Không có | Không có execution samples | Không tạo | Không tạo | Không chụp | BLOCKED: JMeter/backend unavailable; address fixture trống |
| Stress | `test-plans/23120157_Stress_20261118.jmx` | Không chạy | Không có | Không có execution samples; Stage 2/3 còn disabled | Không tạo | Không tạo | Không chụp | BLOCKED: JMeter/backend unavailable; cần 7 accounts riêng/address; hiện stage 1 only |
| Spike | `test-plans/23120157_Spike_20261118.jmx` | Không chạy | Không có | Không có execution samples; không quan sát recovery/lockout | Không tạo | Không tạo | Không chụp | BLOCKED: JMeter/backend unavailable; cần 6 accounts riêng/address |

## Tại sao không chạy

1. Không có Apache JMeter command/native runtime để chạy hoặc tạo HTML Dashboard.
2. Backend không chạy tại port 3000. Khởi động `backend/server.js` trực tiếp sẽ import `database.js`, vốn drop/recreate/reseed tables. Không thực hiện hành động reset lên DB gốc.
3. CSV chỉ có một account; Stress/Spike không đạt số VU đã thiết kế nếu không có account pool độc lập. Cấu hình `stopThread=true` ngăn tái sử dụng dòng hết dữ liệu.
4. Checkout data chưa có `shipping_address` hợp lệ. Không bịa địa chỉ/payload thay thế.
5. Free RAM snapshot 1.71 GiB; không đủ căn cứ để kết luận headroom cho workload peak/stress.

## Tiếp tục

Thực hiện các precondition và command được ghi trong [execution-procedure.md](../docs/execution-procedure.md). Dùng DB backend cô lập, provision data hợp lệ, kiểm tra lại lockout, tài nguyên và JMeter. Chỉ cập nhật manifest bằng giá trị đọc được từ lần chạy thực; mỗi run phải có timestamp/output mới. Evidence folders hiện rỗng.

## Workspace integrity note

Sau khi ghi manifest, `git status` cho thấy `backend/database.sqlite` đang modified và `backend/node_modules/` là untracked. Các thao tác của Prompt 08 chỉ đọc SQLite bằng `mode=ro`; không chạy npm, không khởi động Node/backend và không sửa/xóa các path này. Nguồn gốc thay đổi chưa xác định; giữ nguyên hiện trạng và kiểm tra/backup trước khi dùng DB cho lần chạy tiếp theo.
