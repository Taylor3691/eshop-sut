# Prompt mẫu theo từng bước

Rút từ các prompt thật đã dùng trong HW05 (AILOG #01–#17), đã tổng quát hóa. Thay `<...>` bằng thông tin của nhóm endpoint đang test. Mỗi prompt yêu cầu AI **ghi rõ nguồn của từng con số** và **ghi "không chắc"/"chưa đo"** khi không có căn cứ.

---

## Bước 1 – Phân tích nhóm endpoint

**Đính kèm:** code backend của các route liên quan, file tạo/seed DB, đặc tả API.

```
Mình làm performance test bằng JMeter cho <SUT> (<công nghệ>, cổng <port>).
Nhóm endpoint cần test: <tên nhóm>. Luồng của một virtual user:
<bước 1> → <bước 2> → ... → <bước n>

Chưa sinh test plan. Hãy:
1. Với từng bước: method, URL, header cần có (đặc biệt Authorization), body mẫu, response thành công mẫu,
   giá trị cần trích xuất cho bước sau.
2. Phân loại từng bước vào nhóm auth-heavy / read-heavy / transactional, giải thích ngắn.
3. Chỉ ra hành vi trong code có thể ảnh hưởng tới kết quả test tải (khóa tài khoản, giới hạn dùng,
   dữ liệu lưu trong RAM, DB bị reset khi khởi động, response 200 kể cả khi lỗi...).
Chỉ dựa vào code đính kèm, nếu không chắc thì ghi rõ "không chắc".
```

## Bước 2 – Dữ liệu CSV

```
Dựa trên phân tích trên, thiết kế dữ liệu CSV cho test plan:
1. <file>.csv: <các cột>. Cần khoảng <N> dòng. Nếu cần tạo dữ liệu qua API, viết script bash dùng curl
   chạy lại được nhiều lần (DB có thể bị reset mỗi lần khởi động server).
2. Loại khỏi tải chính những dữ liệu làm request lỗi theo thiết kế (hết hạn, vượt giới hạn...),
   giữ ở file negative riêng có assertion riêng.
Với mỗi file: cấu hình CSV Data Set Config (Recycle on EOF, Stop thread on EOF, Sharing mode) và lý do.
```

## Bước 3 – Tham số kịch bản

```
Máy chạy test và SUT là cùng một máy: <CPU>, <RAM>, <OS>. Backend là <kiến trúc, số process/luồng>.
Đề xuất tham số cho Load / Stress / Spike (và Soak nếu cần) dùng chung luồng trên:
số thread, ramp-up, thời lượng, think-time (loại timer + giá trị), loại Thread Group,
ngưỡng chấp nhận (p95, error rate). Với mỗi kịch bản, ƯỚC LƯỢNG request/giây mỗi thread
từ think-time và số request mỗi vòng, rồi so với năng lực dự kiến của server.
Trình bày dạng bảng.
```

## Bước 4 – Sinh test plan từ khung mẫu

**Đính kèm:** `templates/plan_template.jmx`.

```
Dùng plan_template.jmx làm khung. Giữ nguyên cấu trúc: User Defined Variables host/port,
CSV Data Set, trích token sau login, If Controller bỏ phần còn lại của vòng khi bước trước lỗi,
setUp Thread Group kiểm tra lockout (label LOCK_*), tham số ${__P(...)}.
Thay các sampler 01–05 bằng luồng: <luồng ở bước 1>.
Mỗi sampler: Response Assertion mã HTTP + JSON Assertion trường nghiệp vụ (không chỉ kiểm tra 200).
Tên file: <MSSV>_<ScenarioType>_<YYYYMMDD>.jmx. Listener: <loại listener theo yêu cầu>.
Giải thích từng thành phần đã thay.
```

## Bước 5 – AI tự review (sau đó người review theo `references/pitfalls.md`)

```
Đóng vai reviewer khó tính. Soát test plan đính kèm theo: ramp-up/think-time thực tế, số thread
(ước lượng req/s mỗi thread), độ chặt của assertion (có trường hợp nào API trả 200 mà vẫn sai?),
lỗi dây chuyền khi một bước lỗi, xử lý và KIỂM THỬ lockout, tham số hóa CSV, correlation token,
listener, tên file. Liệt kê từng vấn đề kèm mức độ nghiêm trọng.
```

## Bước 8 – Phân tích kết quả

**Đính kèm:** output của `scripts/jtl_analyze.py` (bảng theo label, theo cửa sổ, phần đối chiếu `--compare`).

```
Đây là số liệu tính từ file .jtl thô (không phải statistics.json). Hãy:
1. Đánh giá từng kịch bản đạt hay không theo ngưỡng ở bước 3, bước nào là nút thắt.
2. Xác định năng lực tối đa theo cửa sổ thời gian và số thread (không dùng throughput trung bình cả bài).
3. Có suy giảm theo thời gian không? Nêu giả thuyết nguyên nhân và cách kiểm chứng; không trình bày
   giả thuyết như kết luận.
4. Đề xuất ngưỡng hiệu năng (SLA) kèm lý do bằng số liệu.
5. Đề xuất tối ưu: chỗ sửa trong code, mức cải thiện dự kiến CÓ CĂN CỨ (nếu chưa đo thì ghi "chưa đo"), rủi ro.
```

## Bước 9 – Cổng regression

```
Dùng scripts/p95_regression.py: tạo baseline từ <N ≥ 5> lần chạy, rồi kiểm tra lần chạy mới.
Đánh giá ngưỡng hiện tại (đạt ≤ +1 ms, chạy lại ≥ +2 ms, chặn ≥ +3 ms sau xác nhận) với độ nhiễu
đo được giữa các lần baseline. Nếu cần chỉnh, đề xuất số mới dựa trên độ nhiễu đó.
```
