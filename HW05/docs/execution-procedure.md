# Quy trình thực thi Load, Stress, Spike — HW05

**Ngày preflight:** 2026-11-19 (Asia/Bangkok)  
**Trạng thái hiện tại:** BLOCKED — chưa chạy bất kỳ JMeter scenario nào. Xem [execution-manifest.md](../results/execution-manifest.md) để biết kết quả preflight thực tế.

## 1. Điều kiện cần trước khi chạy

Không chạy các command bên dưới cho đến khi toàn bộ điều kiện tương ứng được giải quyết:

1. Cài/xác nhận Apache JMeter tương thích (JMX hiện khai báo 5.6.3), kiểm tra `jmeter -v` trong terminal mới.
2. Khởi chạy EShop trong **database test cô lập**. `backend/database.js` drop/recreate các bảng khi import; không chạy `node server.js` trực tiếp trong repository nếu cần bảo toàn `backend/database.sqlite`. Có thể tạo bản sao backend riêng trong thư mục test, cài dependencies ở bản sao và để seed/reset chỉ tác động DB của bản sao.
3. Kiểm tra `GET http://localhost:3000/api/products` trên backend test và xác nhận response có dữ liệu product hiện hành.
4. Provision accounts/customer data trong môi trường test bằng quy trình được cho phép. Không dùng chung account giữa VU. CSV hiện chỉ có 1 dòng; Stress cần 7 account riêng nếu chạy cả 3 stages; Spike cần 6 account riêng. Credentials do người dùng/quản trị cấp, không nhân bản dòng để giả lập VU.
5. Điền `shipping_address` bằng fixture test được duyệt. CSV hiện để trống vì seed profile không có địa chỉ. Checkout body theo API specification có trường này.
6. Kiểm tra `product_id=1`, tên/giá có trong catalog hiện hành; nếu DB bị reseed, kiểm tra lại. Xác nhận `total_amount` khớp product price × quantity.
7. Sao lưu test DB, xác nhận số order ban đầu và chấp nhận mỗi VU chỉ checkout một lần. Backend cart ở RAM và không clear sau checkout; checkout ghi order vào SQLite.
8. Xác nhận output parent directories tồn tại; mỗi lần chạy dùng tên file/JTL/HTML duy nhất và không ghi đè.
9. Kiểm tra free memory/CPU ngay trước mỗi run; snapshot hiện có 1.71 GiB RAM khả dụng và không đại diện cho thời điểm chạy sau này.
10. Kiểm tra không còn JMeter execution trước đó; xác nhận backend port/process, account lockout và DB ở trạng thái đã biết.

Nếu điều kiện bất kỳ chưa đạt, ghi trạng thái BLOCKED và không chạy một phần rồi gắn nhãn thành Load/Stress/Spike hoàn chỉnh.

Ví dụ tạo backend copy cô lập trong một PowerShell terminal (chưa thực hiện):

```powershell
$runId = Get-Date -Format 'yyyyMMdd_HHmmss'
$testBackendRoot = Join-Path $env:TEMP "eshop-backend-test-$runId"
New-Item -ItemType Directory -Path $testBackendRoot | Out-Null
Copy-Item -Path 'backend\*' -Destination $testBackendRoot -Recurse -Force
Set-Location $testBackendRoot
npm ci
node server.js
```

Lệnh `node server.js` reset/reseed database **trong bản sao**; để terminal đó mở. Dùng terminal khác cho JMeter. Sau khi server chạy, tạo account riêng test bằng quy trình được phép, cập nhật CSV với credentials/address do người dùng quản lý, rồi smoke-check endpoint trước performance run.

## 2. Tạo tên output duy nhất

Chạy từ thư mục repository root sau khi preflight đạt:

```powershell
$runId = Get-Date -Format 'yyyyMMdd_HHmmss'
```

Không tái sử dụng `runId` giữa những ngày/giờ khác nhau; xác nhận output path chưa tồn tại trước khi chạy. Tạo một run directory JTL/HTML mới cho mỗi scenario. Lưu manifest theo ngày giờ thực tế và không chỉnh sửa raw JTL sau execution.

## 3. Load Test

Plan chạy 1 workflow/VU, mặc định 1 user; xác nhận address fixture và test DB trước. Ví dụ command sau khi JMeter và backend đã sẵn sàng (hiện chưa chạy):

```powershell
jmeter -n -t HW05/test-plans/23120157_Load_20261118.jmx `
  -Jusers=1 -Jramp_seconds=1 -Jthink_time_ms=3000 `
  -Jcsv_file=HW05/test-data/users.csv `
  -l "HW05/results/Load/23120157_Load_$runId.jtl" `
  -e -o "HW05/html-reports/Load/23120157_Load_$runId"
```

Plan hiện chỉ có một iteration và không phải sustained Load. Không tăng vòng lặp/concurrency cho đến khi đã có account pool, cleanup/state strategy và workload được duyệt.

## 4. Stress Test — tăng tải có kiểm soát

Stress JMX có Stage 1 (1 VU) bật mặc định; Stage 2 (2 VU) và Stage 3 (4 VU) tắt mặc định. CSV hiện không đủ dữ liệu cho các stage cao hơn. Review Stage 1 evidence/resource trước khi mở stage tiếp theo; không bật tất cả stages rồi mặc kệ để plan tự tăng bất kể lỗi/resource.

Khi được duyệt và có đủ data, giữ cùng workflow/CSV mapping, bật **chỉ stage đang đánh giá** (hoặc sử dụng kế hoạch stage đã được người đánh giá phê duyệt), lưu JTL riêng cho từng mức tải, kiểm tra latency/error/resource trước khi tiếp tục. Ghi rõ thay đổi `enabled`, users/ramp/delay và command trong manifest. Cấu hình hiện tại chỉ chạy một iteration mỗi VU nên không xác định sustainable plateau.

Command tham khảo cho cấu hình đã được duyệt (chưa chạy; stage 2/3 cần được bật trong JMX trước):

```powershell
jmeter -n -t HW05/test-plans/23120157_Stress_20261118.jmx `
  -Jstage1_users=1 -Jstage2_users=2 -Jstage3_users=4 `
  -Jstage1_ramp_seconds=1 -Jstage2_ramp_seconds=2 -Jstage3_ramp_seconds=4 `
  -Jthink_time_ms=3000 -Jcsv_file=HW05/test-data/users.csv `
  -l "HW05/results/Stress/23120157_Stress_$runId.jtl" `
  -e -o "HW05/html-reports/Stress/23120157_Stress_$runId"
```

Lưu ý: command chỉ là mẫu; riêng `-Jstage*_users` không bật Thread Group có `enabled=false`.

## 5. Spike Test

Spike plan đặt baseline 1 VU, peak 4 VU ramp 2 giây tại delay 25 giây, recovery 1 VU tại delay 60 giây. Cần sáu accounts độc lập, đủ CSV rows và valid address; nếu CSV hết, `stopThread=true` sẽ dừng VU thiếu dữ liệu. Peak hiện là một workflow khoảng 25 giây, không phải plateau kéo dài.

```powershell
jmeter -n -t HW05/test-plans/23120157_Spike_20261118.jmx `
  -Jphase1_users=1 -Jphase2_users=4 -Jphase3_users=1 `
  -Jphase1_ramp_seconds=1 -Jphase2_ramp_seconds=2 -Jphase3_ramp_seconds=1 `
  -Jphase1_think_time_ms=3000 -Jphase2_think_time_ms=5000 -Jphase3_think_time_ms=3000 `
  -Jcsv_file=HW05/test-data/users.csv `
  -l "HW05/results/Spike/23120157_Spike_$runId.jtl" `
  -e -o "HW05/html-reports/Spike/23120157_Spike_$runId"
```

## 6. Resource capture và run record

Task Manager và JMeter/backend phải hiển thị trong **cùng một ảnh chụp** cho từng scenario:

1. Trước run, mở Task Manager → **Details**, bật cột CPU và Memory; xác định PID `node.exe` là backend bằng port/process đã kiểm tra.
2. Mở PowerShell terminal có command JMeter. Dùng Windows Snap để xếp terminal JMeter và Task Manager cạnh nhau; để có thể thấy CPU tổng thể, có thể chọn tab Performance thay vì Details trong một lần chụp bổ sung.
3. Chạy non-GUI JMeter, quan sát status/error count; đồng thời quan sát Node CPU/memory và tổng CPU/RAM.
4. Nếu backend crash, memory tăng bất thường, error rate tăng mạnh, hoặc host gần cạn tài nguyên, dừng run và giữ nguyên JTL/log đã tạo; ghi chính xác điều kiện dừng.
5. Dùng `Win+Shift+S` chụp frame có cả JMeter terminal và monitor. Lưu ảnh thật vào `HW05/evidence/<Scenario>/` với timestamp; không tạo ảnh minh họa.
6. Sau run, mở HTML Dashboard, không sửa raw JTL; ghi start/end, command, VU/ramp/duration, sample/error counts và resource observation vào manifest.

## 7. Lockout và trạng thái giữa scenario

Không gửi password sai có chủ đích. Source hiện cộng login attempts thêm 2 cho mỗi lần sai nên một lần sai có thể khóa account 180 giây, khác mô tả ba lần trong guide/PDF. Trước mỗi run, xác nhận `login_attempts=0` và `locked_until` rỗng trên account test. Nếu một account test chuyên dụng bị khóa, chờ tối thiểu 180 giây hoặc reset đúng account trong DB test cô lập rồi xác minh lại; không reset shared/original DB. Backend startup tự reset/reseed database, nên không dùng restart làm cleanup cho DB gốc.

## 8. Hiện tại

Preflight 2026-11-19 15:23 +07:00 cho thấy JMeter không có command/`JMETER_HOME`, backend port 3000 không listen, free RAM khoảng 1.71 GiB, CSV chỉ có một dòng và shipping address trống. Vì vậy Load/Stress/Spike đều **BLOCKED**, không có screenshot/JTL/HTML report hay performance result nào được tạo. Xem manifest để kiểm tra từng mục.
