# Hướng dẫn Task 1.7 – Determine the endurance threshold

## 1. Test Plan được chuẩn bị

File:

```text
performance-tests/task1/23120117_Endurance_20261121.jmx
```

Cấu hình mặc định:

| Tham số | Giá trị |
|---|---:|
| Virtual users | 120 VU |
| Ramp-up | 120 giây |
| Stable hold | 600 giây |
| Tổng duration | 720 giây (12 phút) |
| Think-time | Ngẫu nhiên 1–3 giây |
| Workflow | Login → Product list → Add to cart → Checkout → Order history |
| Listener | Summary Report, Disable trong lần chạy chính thức |

Plan hỗ trợ thay tham số bằng JMeter properties:

```text
-Jthreads=120
-JrampSeconds=120
-JdurationSeconds=720
```

120 VU là **mức ứng viên**, chưa phải kết luận cuối cùng. Stress Test trước đó đạt khoảng 88 RPS và 0% lỗi trong phút cuối ở 120 VU, nên mức này được chọn để kiểm tra khả năng duy trì trong thời gian dài hơn.

## 2. Tiêu chí xác định mức tải ổn định

Một lần chạy được coi là ổn định khi đồng thời thỏa các điều kiện sau trong 600 giây hold:

1. Backend không crash, restart hoặc mất kết nối.
2. Error rate nhỏ hơn 1% và không có chuỗi lỗi 5xx/timeout kéo dài.
3. p95 không tăng liên tục giữa đầu và cuối giai đoạn hold. Mức tăng trên 20% cần được giải thích hoặc xem là dấu hiệu suy giảm.
4. Throughput không giảm liên tục khi số VU vẫn giữ nguyên.
5. CPU backend không giữ ở mức trên 90% trong phần lớn thời gian hold.
6. Bộ nhớ không tăng không giới hạn; cuối giai đoạn hold phải có xu hướng ổn định thay vì tiếp tục tăng đều.
7. Không xuất hiện account lockout hoặc lỗi dữ liệu làm sai bản chất performance test.

Các tỷ lệ trên là tiêu chí vận hành được chọn cho bài thực hành, không phải SLA chính thức của SUT.

## 3. Chuẩn bị trước khi chạy

1. Khởi động backend trên cổng 3000.
2. Seed đủ tài khoản bằng `seed-test-users.ps1`.
3. Chạy smoke test 1–2 VU và xác nhận năm bước đều pass.
4. Xác định PID thực sự lắng nghe cổng 3000:

```powershell
$backendPid = Get-NetTCPConnection -LocalPort 3000 -State Listen |
    Select-Object -ExpandProperty OwningProcess -Unique

Get-CimInstance Win32_Process |
    Where-Object { $_.ProcessId -in $backendPid } |
    Select-Object ProcessId, Name, CommandLine
```

5. Đóng ứng dụng không cần thiết và ghi lại cấu hình phần cứng.
6. Không Enable Summary Report trong lần chạy chính thức.
7. Tạo thư mục output mới; không dùng lại folder đã có dữ liệu.

## 4. Lệnh chạy đề xuất

```powershell
$projectRoot = "D:\HK7\Tester\eshop-sut"
$jmeterExe = "D:\HK7\Tools\apache-jmeter-5.6.3\bin\jmeter.bat"
$dataFile = "$projectRoot\performance-tests\task1\flow-data.csv"
$planFile = "$projectRoot\performance-tests\task1\23120117_Endurance_20261121.jmx"
$runDir = "$projectRoot\performance-tests\task1\evidence\endurance\run01"
$jtlFile = "$runDir\23120117_Endurance_20261121.jtl"
$htmlDir = "$runDir\html"

New-Item -ItemType Directory -Force -Path $runDir | Out-Null

Test-Path -LiteralPath $jmeterExe
Test-Path -LiteralPath $dataFile
Test-Path -LiteralPath $planFile
Test-Path -LiteralPath $htmlDir
```

Ba kết quả đầu phải là `True`; `$htmlDir` nên là `False` trước khi chạy.

```powershell
Set-Location $projectRoot

& $jmeterExe -n `
  -t $planFile `
  "-JdataFile=$dataFile" `
  "-Jthreads=120" `
  "-JrampSeconds=120" `
  "-JdurationSeconds=720" `
  -l $jtlFile `
  -e `
  -o $htmlDir
```

Thời gian dự kiến khoảng 12 phút cộng thêm vài giây khởi tạo/kết thúc.

## 5. Thu thập tài nguyên backend

Mở một PowerShell khác trước khi chạy JMeter. Đo mỗi 5 giây:

```powershell
$projectRoot = "D:\HK7\Tester\eshop-sut"
$resourceCsv = "$projectRoot\performance-tests\task1\evidence\endurance\run01\backend-resource.csv"
$backendPid = Get-NetTCPConnection -LocalPort 3000 -State Listen |
    Select-Object -ExpandProperty OwningProcess -Unique
$logicalCpu = (Get-CimInstance Win32_ComputerSystem).NumberOfLogicalProcessors
$firstSample = $true

while ($true) {
    $process = Get-Process -Id $backendPid -ErrorAction Stop
    $perf = Get-CimInstance Win32_PerfFormattedData_PerfProc_Process |
        Where-Object { $_.IDProcess -eq $backendPid } |
        Select-Object -First 1

    $sample = [PSCustomObject]@{
        Timestamp            = (Get-Date).ToString("o")
        ProcessId            = $backendPid
        CpuPercentNormalized = [Math]::Round($perf.PercentProcessorTime / $logicalCpu, 2)
        WorkingSetMB         = [Math]::Round($process.WorkingSet64 / 1MB, 2)
        PrivateMemoryMB      = [Math]::Round($process.PrivateMemorySize64 / 1MB, 2)
        ThreadCount          = $process.Threads.Count
        HandleCount          = $process.HandleCount
    }

    if ($firstSample) {
        $sample | Export-Csv -LiteralPath $resourceCsv -NoTypeInformation
        $firstSample = $false
    }
    else {
        $sample | Export-Csv -LiteralPath $resourceCsv -NoTypeInformation -Append
    }

    $sample
    Start-Sleep -Seconds 5
}
```

Nhấn `Ctrl + C` sau khi JMeter kết thúc. Đồng thời mở Task Manager → Details và theo dõi đúng PID `node.exe` để quay video/chụp ảnh.

## 6. Các số liệu bắt buộc phải thu thập

### 6.1. Từ raw JTL hoặc HTML Dashboard

Thu thập cho toàn bài và cho từng request label:

| Nhóm số liệu | Giá trị cần ghi |
|---|---|
| Khối lượng | Tổng samples, số iteration hoàn chỉnh, thời gian chạy thực tế |
| Throughput | Overall RPS và RPS riêng trong 600 giây hold |
| Latency | Average, Median, p90, p95, p99, Min, Max |
| Độ tin cậy | Error count, Error %, response code, assertion failure, timeout |
| Tính ổn định | RPS và p95 theo từng phút của giai đoạn hold |

Khi kết luận threshold, phải dùng **stable-hold RPS**, không dùng riêng giá trị cao nhất trong vài giây.

### 6.2. Từ backend resource monitoring

| Nhóm số liệu | Giá trị cần ghi |
|---|---|
| CPU | Average CPU, maximum CPU và thời gian CPU giữ trên 90% |
| Working set | Ban đầu, cuối hold, trung bình và cao nhất |
| Private memory | Ban đầu, cuối hold và cao nhất |
| Memory growth | Chênh lệch MB và tốc độ tăng MB/phút trong hold |
| Process health | PID, số thread, số handle, có crash/restart hay không |
| System | Tổng CPU/RAM cao nhất của máy từ Task Manager |

**Memory ceiling** nên báo cáo bằng peak Working Set của backend trong giai đoạn hold, đồng thời ghi thêm peak RAM toàn hệ thống để cung cấp ngữ cảnh phần cứng.

## 7. Cách chia giai đoạn để phân tích

Với cấu hình mặc định:

```text
0–120 giây: ramp-up, không dùng để kết luận stable RPS
120–720 giây: stable hold 120 VU, dùng để xác định threshold
```

Chia 600 giây hold thành các cửa sổ một phút:

```text
120–180, 180–240, 240–300, ..., 660–720 giây
```

Trong mỗi cửa sổ, ghi RPS, p95, error rate, CPU và Working Set. Cách này cho thấy hệ thống có suy giảm dần theo thời gian hay không.

## 8. Cách kết luận endurance threshold

- Nếu 120 VU thỏa tất cả tiêu chí: báo cáo **maximum verified stable load = 120 VU** và **maximum verified stable RPS = RPS trung bình trong 600 giây hold**.
- Không gọi đây là giới hạn tuyệt đối của hệ thống; dùng cụm “maximum verified” vì chỉ các mức đã chạy mới có bằng chứng.
- Nếu 120 VU không ổn định: chạy lại cùng plan với `-Jthreads=100`; nếu vẫn không ổn định thì thử `-Jthreads=80`.
- Mức cao nhất thỏa toàn bộ tiêu chí là endurance threshold đã xác minh.
- Mỗi lần chạy lại phải dùng folder mới: `run02`, `run03`, không ghi đè `run01`.

## 9. Bằng chứng hình ảnh cần chụp

1. **Trước khi chạy:** plan/command hiển thị rõ 120 VU, ramp 120 giây, duration 720 giây và tên file JMX.
2. **Trong ramp-up:** terminal JMeter và Task Manager đúng PID trong cùng khung hình.
3. **Giữa stable hold:** chụp khi đã qua ít nhất 5 phút; thấy JMeter summary, elapsed time, CPU và Memory.
4. **Cuối stable hold:** chụp gần giây 700 để chứng minh tải được duy trì.
5. **Sau khi chạy:** ảnh `index.html` phần APDEX/Statistics và các graph Response Times/Throughput Over Time.
6. **Resource evidence:** ảnh Task Manager hoặc CSV cho thấy peak CPU và peak memory của backend.

Ảnh phải đọc được timestamp/elapsed time, PID, tên process và tên test plan; không chỉ chụp biểu đồ rời khỏi ngữ cảnh.

## 10. Mẫu bảng báo cáo kết quả

| Metric | 120–180s | 180–240s | 240–300s | 300–360s | 360–420s | 420–480s | 480–540s | 540–600s | 600–660s | 660–720s |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| RPS | | | | | | | | | | |
| p95 (ms) | | | | | | | | | | |
| Error % | | | | | | | | | | |
| CPU % | | | | | | | | | | |
| Working Set (MB) | | | | | | | | | | |

Kết luận cuối cùng cần ghi:

```text
Maximum verified stable load: ___ VU
Maximum verified stable RPS: ___ requests/second
Backend memory ceiling: ___ MB Working Set
Average / peak backend CPU: ___% / ___%
p95 during stable hold: ___ ms
Error rate during stable hold: ___%
Evidence run: performance-tests/task1/evidence/endurance/run__/
```

