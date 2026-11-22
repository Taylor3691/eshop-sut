# Execution Manifest — Load / Stress / Spike

> **Bản ghi cũ:** Preflight ngày 2026-11-19 bên dưới được giữ lại để bảo toàn lịch sử. Nó đã bị thay thế bởi lần thực thi Prompt 08 ngày 2026-11-22; JMeter 5.6.3 hiện có tại `D:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat` và đã được chạy thành công.

## Prompt 08 — Kết quả thực thi thực tế (2026-11-22, Asia/Bangkok)

### Tổng quan và cô lập dữ liệu

- Backend được sao chép vào `C:\Users\PHUC\AppData\Local\Temp\eshop-hw05-prompt08-20261122_161045`; `database.js` dùng `__dirname`, do đó DB seed chỉ nằm trong bản sao. Listener `127.0.0.1:3000` được xác nhận thuộc backend tạm. Backend đã dừng sau khi hoàn tất; port 3000 không còn listener.
- DB gốc `backend/database.sqlite` không bị thay đổi; `backend/node_modules/` không bị tạo. `git status` xác nhận không có thay đổi ở hai đường dẫn đó.
- Catalog đọc qua API thật: 5 sản phẩm; product 1 là `iPhone 15 Pro Max`, giá `30000000`. Tạo 15 tài khoản riêng trong DB cô lập bằng `POST /api/register`, rồi kiểm tra từng tài khoản bằng `POST /api/login`. Dùng địa chỉ fixture không giao hàng: `HW05 Performance Test Fixture, non-deliverable test address`. Credentials/CSV ở thư mục `%TEMP%`, không đưa vào Git.
- Trước test: 0 orders, 0 tài khoản lockout. Sau smoke + Load + Stress 3 stage + Spike: 15 orders, 0 tài khoản lockout, 17 users gồm 2 seed và 15 test. Không gửi password sai.
- JVM JMeter được giới hạn heap `-Xms64m -Xmx256m` cho Stress Stage 2/3 và Spike; Smoke/Load/Stress Stage 1 dùng `-Xms128m -Xmx512m`. Tất cả chạy non-GUI, mỗi tài khoản checkout đúng một lần.
- CPU/RAM được ghi bằng PowerShell/CIM khoảng mỗi 2 giây; việc lấy mẫu có overhead và không tương đương ảnh Task Manager đồng thời. Không có screenshot desktop thực được chụp. Spike chạm mức RAM trống tối thiểu 395 MiB và CPU tối đa 100%; đây là cảnh báo giới hạn tài nguyên, không phải kết luận năng lực ổn định.

### Kết quả theo lần chạy

| Scenario | Start – end (+07) | VU / cấu hình | Samples | Success / fail | Mean / p95 (ms) | Throughput (samples/s) | CPU max / RAM free min | Status |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Smoke | 16:14:03 – 16:14:18 | 1; 1 workflow | 5 | 5 / 0 | 22.6 / 75 | 0.41 | 46% / 1,880 MiB | PASS — workflow và order đã xác minh |
| Load | 16:15:34 – 16:15:50 | 1; 1 workflow | 5 | 5 / 0 | 15.2 / 48 | 0.41 | 38% / 1,644 MiB | PASS — một workflow hữu hạn, không phải sustained load |
| Stress Stage 1 | 16:17:56 – 16:18:12 | 1 VU; ramp 1 s | 5 | 5 / 0 | 33.8 / 141 | 0.41 | 84% / 816 MiB | PASS ở mức workflow; stage hữu hạn |
| Stress Stage 2 | 16:19:35 – 16:19:51 | 2 VU; ramp 2 s | 10 | 10 / 0 | 19.2 / 116 | 0.78 | 100% / 898 MiB | PASS ở mức workflow; host CPU có nhiễu cao |
| Stress Stage 3 | 16:22:49 – 16:23:07 | 4 VU; ramp 4 s | 20 | 20 / 0 | 10.15 / 26 | 1.34 | 60% / 1,074 MiB | PASS ở mức workflow; không xác lập sustainable capacity |
| Spike — baseline | 16:24:15 – 16:25:31 | 1 VU tại t=0; ramp 1 s | 5 | 5 / 0 | 30.4 / 120 | 0.407 | Xem tổng run bên dưới | Đo được |
| Spike — peak | cùng run | 4 VU tại t=25 s; ramp 2 s | 20 | 20 / 0 | 69.9 / 595 | 0.926 | Xem tổng run bên dưới | Đo được; checkout max 595 ms |
| Spike — recovery | cùng run | 1 VU tại t=60 s; ramp 1 s | 5 | 5 / 0 | 11.0 / 27 | 0.414 | Xem tổng run bên dưới | Có mẫu sau peak; chưa đủ để khẳng định recovery ổn định |
| Spike — tổng | 16:24:15 – 16:25:31 | Baseline 1 → peak 4 → recovery 1; think time 3/5/3 s | 30 | 30 / 0 | 53.5 / 354 | 0.42 | 100% / **395 MiB** | PARTIALLY EXECUTED — hoàn tất nhưng chạm ngưỡng tài nguyên thấp |

Throughput lấy từ sample count chia khoảng timestamp quan sát trong JTL; ở Spike tổng, khoảng này bao gồm delay giữa các phase, vì vậy không diễn giải là năng lực sustained. Các percentile dựa trên số mẫu nhỏ; Load/Stage 1 chỉ có 5 mẫu và Stage 2 có 10 mẫu nên p95 không ổn định. Không có SLO ngưỡng pass/fail được cung cấp. Recovery có mean thấp hơn baseline trong mẫu quan sát, nhưng `n=5` và host bị áp lực RAM/CPU; không kết luận hệ thống đã phục hồi.

### JTL, Dashboard, log và monitor

| Run | JTL | HTML Dashboard | JMeter log | Resource CSV |
|---|---|---|---|---|
| Smoke | `results/Smoke/23120157_Smoke_20261122_161045.jtl` | Không tạo riêng | `results/Smoke/jmeter_20261122_161045.log` | `results/monitoring/Smoke_20261122_161045.csv` |
| Load | `results/Load/23120157_Load_20261122_161045.jtl` | `html-reports/Load/23120157_Load_20261122_161045/` | `results/Load/jmeter_20261122_161045.log` | `results/monitoring/Load_20261122_161045.csv` |
| Stress 1 | `results/Stress/23120157_Stress_Stage1_20261122_161045.jtl` | `html-reports/Stress/23120157_Stress_Stage1_20261122_161045/` | `results/Stress/jmeter_Stage1_20261122_161045.log` | `results/monitoring/Stress_Stage1_20261122_161045.csv` |
| Stress 2 | `results/Stress/23120157_Stress_Stage2_20261122_161045.jtl` | `html-reports/Stress/23120157_Stress_Stage2_20261122_161045/` | `results/Stress/jmeter_Stage2_20261122_161045.log` | `results/monitoring/Stress_Stage2_20261122_161045.csv` |
| Stress 3 | `results/Stress/23120157_Stress_Stage3_20261122_161045.jtl` | `html-reports/Stress/23120157_Stress_Stage3_20261122_161045/` | `results/Stress/jmeter_Stage3_20261122_161045.log` | `results/monitoring/Stress_Stage3_20261122_161045.csv` |
| Spike | `results/Spike/23120157_Spike_20261122_161045.jtl` | `html-reports/Spike/23120157_Spike_20261122_161045/` | `results/Spike/jmeter_20261122_161045.log` | `results/monitoring/Spike_20261122_161045.csv` |

Analysis: `results/Load/analysis_20261122_161045.md`, `results/Stress/stage1-analysis.md`, `stage2-analysis.md`, `stage3-analysis.md`, `results/Spike/analysis.md`. Each actual JTL passed `validate-jtl.py` (5, 5, 5, 10, 20, and 30 rows respectively). HTML Dashboard generation completed for Load, all three Stress stages, and Spike.

Stress execution copies (source plans preserved) are under `results/Stress/config/`. Each copy enabled one Thread Group, disabled the other two, reset its delay to zero, and used a private CSV slice with fresh accounts. Exact JMeter CLI arguments were `-n -t <JMX> -J<stage>_users=<1|2|4> -J<stage>_ramp_seconds=<1|2|4> -Jthink_time_ms=3000 -Jcsv_file=<private temp CSV> -l <JTL> -j <log> -e -o <unique Dashboard dir>`.

Các lần chạy dùng binary `D:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat`; lệnh thực thi dùng các đối số sau (giá trị CSV là file riêng tư trong `%TEMP%`):

```powershell
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/test-plans/23120157_Load_20261118.jmx' -Jusers=1 -Jramp_seconds=1 -Jthink_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/smoke.csv' -l 'HW05/results/Smoke/23120157_Smoke_20261122_161045.jtl' -j 'HW05/results/Smoke/jmeter_20261122_161045.log'
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/test-plans/23120157_Load_20261118.jmx' -Jusers=1 -Jramp_seconds=1 -Jthink_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/load.csv' -l 'HW05/results/Load/23120157_Load_20261122_161045.jtl' -j 'HW05/results/Load/jmeter_20261122_161045.log' -e -o 'HW05/html-reports/Load/23120157_Load_20261122_161045'
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/results/Stress/config/23120157_Stress_Stage1_20261122_161045.jmx' -Jstage1_users=1 -Jstage1_ramp_seconds=1 -Jthink_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/stress-stage1.csv' -l 'HW05/results/Stress/23120157_Stress_Stage1_20261122_161045.jtl' -j 'HW05/results/Stress/jmeter_Stage1_20261122_161045.log' -e -o 'HW05/html-reports/Stress/23120157_Stress_Stage1_20261122_161045'
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/results/Stress/config/23120157_Stress_Stage2_20261122_161045.jmx' -Jstage2_users=2 -Jstage2_ramp_seconds=2 -Jthink_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/stress-stage2.csv' -l 'HW05/results/Stress/23120157_Stress_Stage2_20261122_161045.jtl' -j 'HW05/results/Stress/jmeter_Stage2_20261122_161045.log' -e -o 'HW05/html-reports/Stress/23120157_Stress_Stage2_20261122_161045'
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/results/Stress/config/23120157_Stress_Stage3_20261122_161045.jmx' -Jstage3_users=4 -Jstage3_ramp_seconds=4 -Jthink_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/stress-stage3.csv' -l 'HW05/results/Stress/23120157_Stress_Stage3_20261122_161045.jtl' -j 'HW05/results/Stress/jmeter_Stage3_20261122_161045.log' -e -o 'HW05/html-reports/Stress/23120157_Stress_Stage3_20261122_161045'
& 'D:/apache-jmeter-5.6.3/apache-jmeter-5.6.3/bin/jmeter.bat' -n -t 'HW05/test-plans/23120157_Spike_20261118.jmx' -Jphase1_users=1 -Jphase2_users=4 -Jphase3_users=1 -Jphase1_ramp_seconds=1 -Jphase2_ramp_seconds=2 -Jphase3_ramp_seconds=1 -Jphase1_think_time_ms=3000 -Jphase2_think_time_ms=5000 -Jphase3_think_time_ms=3000 -Jcsv_file='C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt08-20261122_161045/data/spike.csv' -l 'HW05/results/Spike/23120157_Spike_20261122_161045.jtl' -j 'HW05/results/Spike/jmeter_20261122_161045.log' -e -o 'HW05/html-reports/Spike/23120157_Spike_20261122_161045'
```

`HEAP=-Xms128m -Xmx512m` được đặt cho Smoke/Load/Stress Stage 1; `HEAP=-Xms64m -Xmx256m` cho Stress Stage 2/3 và Spike. Dòng lệnh Stress ở trên dùng `N=1`, `N=2`, `N=3` cho stage index, với users/ramp lần lượt 1/1, 2/2, 4/4.

### Deviations, missing evidence, and remaining requirements

- Prompt 08 required genuine desktop screenshots when available. Runs were executed in non-GUI mode and no simultaneous JMeter + Task Manager screenshots were captured; no screenshot is claimed. Genuine timestamped resource CSVs are present instead. `evidence/Hardware/` has a hardware specification report; no `dxdiag` screenshot was created.
- The assignment’s Load JMX is a single workflow, not sustained load. Stress stages each execute one workflow per VU. These runs do not determine maximum sustainable load/RPS. Endurance (10–15 minutes), video demo, and screenshot evidence remain NOT EXECUTED / manual follow-up.
- Spike finished all samples, but reached only 395 MiB free RAM and 100% CPU. Do not repeat or increase this profile on the same host until unrelated host load is reduced and a lower-overhead monitor/dedicated environment is available.
- Original assignment asks hardware evidence and screenshots; report missing items as incomplete, not PASS.

### Final audit and Git

- JMeter 5.6.3 CLI, Java 21.0.11, Node 22.20.0, npm 11.7.0 verified.
- Backend health was verified before/after the run; isolated database persisted exactly 15 test orders. Original database remains clean.
- Six performance JTL files validated; all actual sample rows succeeded. Raw JTLs were not edited after generation.
- No credentials, temporary CSVs, tokens, isolated DB, `jmeter.log`, or unrelated `.gitignore` are included in the documented deliverables.
- Git commit: the Prompt 08 deliverables were committed as `HW05 Prompt 08: add performance execution evidence`; the final commit ID is recorded in the task completion summary. Pre-existing `M jmeter.log` and `?? .gitignore` were excluded from the commit.

## Trạng thái preflight cũ (2026-11-19)

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

## Prompt 09 — Endurance / Soak (2026-11-22, Asia/Bangkok)

### Trạng thái

**PARTIALLY EXECUTED.** Plan đặt 600 giây, 2 VU, nhưng dừng khi available RAM giảm xuống dưới guardrail 512 MiB. JMeter chạy từ khoảng 20:41:51 đến lệnh dừng 20:50:30 (+07), tổng thời gian process khoảng 8 phút 39 giây. JTL timestamp span của các mẫu thực tế chỉ 466.8 giây. Không tiếp tục test sau khi đã chạm guardrail.

### Setup và kiểm soát side effect

- Backend source được sao chép và `npm ci` trong `C:\Users\PHUC\AppData\Local\Temp\eshop-hw05-prompt09-20261122_203509`; không copy hoặc mở `backend/database.sqlite`. Database được seed trong thư mục temp. Process backend PID 39836 sở hữu port 3000; sau khi dừng backend, port 3000 không còn listener. DB gốc không thay đổi.
- Trước test, isolated DB có 4 users (2 seed + 2 test), 0 orders, 0 locked accounts. Sau khi dừng, DB cô lập có 70 orders và 0 locked accounts. Hai credentials riêng ở hai CSV temp và không được commit.
- Catalog `GET /api/products/1` xác nhận product 1 `iPhone 15 Pro Max`, giá `30000000`. JMX chạy hai group độc lập, một VU/account/cart mỗi group, loop vô hạn nhưng scheduler có giới hạn600s, `recycle=true`, think-time3s, status200 và body assertions. Mỗi checkout side effect nằm trong DB cô lập.
- Host trước run: 15.68 GiB RAM, counter Available Memory khoảng 2,665 MiB, CPU mẫu nền 10.3–32.2%. JMeter 5.6.3; heap `-Xms128m -Xmx256m`.

### Kết quả từ raw JTL và log

| Chỉ số | Kết quả |
|---|---:|
| VU / thời lượng đặt | 2 VU / 600 giây |
| Process active trước khi dừng | khoảng 8m39s |
| Raw JTL | 310 data lines: 309 dòng đầy đủ + 1 dòng cuối thiếu 5/17 cột |
| Samples đủ schema được phân tích | 309 |
| Success / fail / error rate trong 309 rows | 309 / 0 / 0.00% |
| Mean / median (ms) | 21.04 / 5 |
| Min / max (ms) | 2 / 314 |
| p90 / p95 / p99 (ms) | 41 / 98 / 281 |
| Throughput của complete-row timestamp span | 0.6619 request/s trong 466.8 giây |
| Maximum stable RPS | **Chưa xác định**; không gọi throughput quan sát được là maximum |

JMeter periodic summarizer ghi nhận 341 samples, error0 tại mốc 8m39s, nhưng raw JTL chỉ còn 309 records đủ schema cộng một dòng checkout bị ghi dở. Database có 70 orders, trong khi raw JTL có 61 checkout rows đủ schema. Không backfill, sửa hoặc ước tính các sample không có trong raw JTL. JMeter HTML report generator từ chối raw file: line311 có 12 columns thay vì17, nên không tạo Dashboard Endurance.

### CPU, bộ nhớ và điều kiện dừng

- Monitor script `evidence/Endurance/monitor-resources.ps1` ghi CPU, available RAM, backend working set/private memory và JMeter working set/private memory khoảng mỗi6 giây.
- Trong khoảng test, host CPU mean83.7%, max100%. Mức CPU cao không thể quy riêng cho EShop.
- Available RAM khoảng2,039 MiB đầu cửa sổ run, thấp nhất253 MiB lúc20:49:53 (+07), và khoảng929 MiB ở monitor sample gần cuối. Guardrail 512 MiB đã bị vượt qua; đây là **safety stop**, không phải SUT point-of-failure.
- Backend working set cao nhất53.0 MiB/private memory61.9 MiB; JMeter private memory cao nhất263.6 MiB. Không có bằng chứng backend memory tăng đều. Backend còn listen ngay sau khi JMeter dừng.
- Mean latency không tăng đều qua từng phút; các bucket muộn có vài p95 spike (phút5:282ms, phút7 partial:247ms), nhưng JTL thiếu phần cuối và run bị dừng nên chưa kết luận sustained degradation.

### Artifacts và kiểm tra

- JMX: `test-plans/23120157_Endurance_20261122.jmx`
- Raw JTL: `results/Endurance.jtl` (giữ nguyên, có một dòng cuối không đầy đủ)
- JMeter log: `results/Endurance_20261122_203509.log`
- Resource CSV và script: `evidence/Endurance/23120157_Endurance_20261122_203509_resources.csv`, `evidence/Endurance/monitor-resources.ps1`
- Metrics: `results/Endurance-analysis.md`, `results/Endurance-summary.json`; analyzer loại 1 malformed row và chỉ tính309 rows.
- CLI: `HEAP=-Xms128m -Xmx256m`; `jmeter.bat -n -t HW05/test-plans/23120157_Endurance_20261122.jmx -Jduration_seconds=600 -Jcsv_file_user1=C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt09-20261122_203509/data/user1.csv -Jcsv_file_user2=C:/Users/PHUC/AppData/Local/Temp/eshop-hw05-prompt09-20261122_203509/data/user2.csv -l HW05/results/Endurance.jtl -j HW05/results/Endurance_20261122_203509.log -e -o HW05/html-reports/Endurance/23120157_Endurance_20261122_203509`. Lệnh bị dừng nên JMeter không chạy tới bước tự tạo report `-e -o`. Lần tạo report sau bằng `jmeter.bat -g HW05/results/Endurance.jtl -o ...` cũng thất bại tại line311 (12 cột thay vì17).
- `validate-jtl.py` được tăng cường để kiểm tra trường bị thiếu giữa dòng. Trước sửa, raw file bị chấp nhận dù thiếu cột không bắt buộc; sau sửa, validator từ chối đúng line311. Analysis/validation trên bản sao chỉ gồm309 dòng đầy đủ thành công.
- Không có screenshot desktop. Không tạo giả HTML report.

### Kết luận

Đã đo được throughput 0.6619 request/s ở workload 2 VU trong timestamp span dữ liệu đầy đủ. Run không đủ 10 phút, có vấn đề ghi dở JTL và host memory chạm safety stop; vì vậy **maximum stable RPS, memory ceiling, và sustained threshold chưa xác định**. Lần đo tiếp theo cần host có RAM headroom ổn định, cùng guardrail, kết thúc JMeter bình thường và JTL đủ17 cột trên mọi dòng.
