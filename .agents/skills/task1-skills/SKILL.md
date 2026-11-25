---
name: task1-skills
description: Thiết kế và sinh ba JMeter test plan Load, Stress và Spike từ một end-to-end flow cho Task 1 của bài EShop HW05. Dùng khi đầu vào là một flow nghiệp vụ cần ánh xạ sang API và ba mô hình tải; không dùng để chạy test, phân tích JTL hoặc tạo bằng chứng thực thi.
---

# Task1_skills

Nhận một end-to-end flow có thứ tự, kiểm chứng flow trên mã nguồn EShop, rồi tạo ba test plan riêng cho Load, Stress và Spike. Giữ nguyên cùng một workflow nghiệp vụ trong cả ba plan; chỉ thay đổi workload model.

## Phạm vi

- Thực hiện yêu cầu **Task 1.1 – Design and generate with AI**.
- Tạo thiết kế và file JMeter `.jmx`; không chạy performance test.
- Không tạo `.jtl`, HTML report, screenshot, video hoặc số liệu hiệu năng giả.
- Không tuyên bố đã hoàn thành các yêu cầu data-driven, report view, human review hay execution evidence nếu chúng chưa được người dùng yêu cầu và thực hiện riêng.

## Đầu vào

Đầu vào bắt buộc duy nhất là một flow, ví dụ:

```text
Đăng nhập → Lấy danh sách sản phẩm → Thêm sản phẩm vào giỏ → Thanh toán → Kiểm tra đơn hàng
```

Chấp nhận thêm các thông tin tùy chọn nếu người dùng cung cấp: `StudentID`, ngày đặt tên file, base URL, giới hạn phần cứng, tải mục tiêu hoặc thư mục đầu ra. Không chặn công việc nếu thiếu thông tin tùy chọn:

- Dùng base URL tìm thấy trong repository, nếu có.
- Dùng ngày hiện tại theo ngữ cảnh người dùng.
- Giữ `{StudentID}` trong tên file nếu chưa có MSSV.
- Dùng workload khởi điểm thận trọng trong [references/jmeter-plan-contract.md](references/jmeter-plan-contract.md) và ghi rõ đó là giả định cần hiệu chỉnh sau smoke/baseline test.

## Quy trình bắt buộc

### 1. Chuẩn hóa và kiểm chứng flow

Tách flow thành các bước có thứ tự. Không tự thêm, xóa hoặc đổi nghĩa bước nghiệp vụ mà không ghi rõ.

Đọc các nguồn cục bộ theo thứ tự sau:

1. Route và handler thực tế trong `backend/server.js` để biết request nào thực thi được.
2. `api_specification.md` để lấy request/response contract nếu khớp với implementation.
3. `README.md` để hiểu quy tắc nghiệp vụ mong đợi.
4. `HW5.md` để đối chiếu yêu cầu Task 1.

Với mỗi bước, xác định method, path, authentication, input, expected status, dữ liệu cần extract và bước sử dụng dữ liệu đó. Không phát minh endpoint. Nếu tài liệu và implementation lệch nhau, dùng implementation để tạo plan có thể chạy và ghi lại sai lệch để con người xem xét.

### 2. Kiểm tra coverage trước khi sinh plan

Lập bảng ánh xạ mỗi bước vào ít nhất một nhóm:

- **auth-heavy**: login hoặc request thực hiện xác thực/phân quyền có ý nghĩa;
- **read-heavy**: request đọc dữ liệu như danh sách sản phẩm hoặc lịch sử đơn;
- **transactional**: request thay đổi trạng thái nghiệp vụ như thêm giỏ hoặc tạo đơn.

Chỉ sinh plan khi flow bao phủ đủ cả ba nhóm. Nếu thiếu nhóm, dừng trước bước sinh file, chỉ ra phần thiếu và đề xuất thay đổi nhỏ nhất; không âm thầm sửa flow.

### 3. Thiết kế request chain chung

Tạo một request chain chuẩn dùng chung cho cả ba plan. Chain phải thể hiện:

- lấy JWT từ response đăng nhập và gắn `Authorization: Bearer ${token}` vào request cần bảo vệ;
- truyền dữ liệu giữa các bước bằng JSON Extractor hoặc cơ chế correlation tương đương;
- tham số hóa base URL, credential, product ID và payload thay đổi; có thể tạo CSV schema mẫu nhưng không bịa bộ dữ liệu lớn;
- assertion cho HTTP status và trường response quan trọng;
- think-time giữa các hành động nghiệp vụ, không đặt timer trước bước đăng nhập đầu tiên;
- tên sampler mô tả nghiệp vụ, không chỉ ghi URL.

Không tạo sampler logout nếu backend không có logout endpoint. Nếu flow có “Đăng xuất” phía client, mô hình hóa nó bằng thao tác xóa token cục bộ và ghi rõ thao tác đó không tạo backend metric.

### 4. Thiết kế ba workload riêng

Đọc [references/jmeter-plan-contract.md](references/jmeter-plan-contract.md) trước khi tạo file. Tạo ba plan độc lập:

- **Load**: tăng dần đến mức tải bình thường rồi giữ ổn định;
- **Stress**: tăng theo các bậc vượt tải bình thường để quan sát điểm suy giảm;
- **Spike**: có baseline, tăng tải đột ngột, sau đó trở về baseline để quan sát phục hồi.

Giữ nguyên endpoint, thứ tự sampler, correlation, assertion và phân bố think-time giữa ba plan. Chỉ thay workload profile. Giải thích ngắn gọn vì sao chọn thread/VU count, ramp-up, hold duration và think-time.

Không dùng JMeter plugin nếu repository không khai báo plugin đó hoặc môi trường chưa xác nhận có plugin. Ưu tiên Thread Group, scheduler, timer, controller và post-processor chuẩn của JMeter.

### 5. Sinh artifact

Tạo một thư mục đầu ra phù hợp với cấu trúc repository; nếu chưa có quy ước, dùng `performance-tests/task1/`. Tạo:

```text
{StudentID}_Load_{YYYYMMDD}.jmx
{StudentID}_Stress_{YYYYMMDD}.jmx
{StudentID}_Spike_{YYYYMMDD}.jmx
task1-design.md
flow-data-template.csv       # chỉ khi plan cần biến dữ liệu đầu vào
```

`task1-design.md` phải chứa:

1. Flow đầu vào nguyên văn.
2. Bảng endpoint và ba nhóm coverage.
3. Request chain và correlation.
4. Bảng so sánh tham số Load/Stress/Spike.
5. Giải thích ngắn cho lựa chọn tham số.
6. Giả định, giới hạn và các điểm con người phải rà soát.
7. Tóm tắt các pha AI đã thực hiện: kiểm chứng flow, ánh xạ API, thiết kế workload, sinh plan và tự kiểm tra. Nội dung này hỗ trợ audit nhưng không thay thế AI Audit Report đầy đủ.

### 6. Tự kiểm tra trước khi kết thúc

- Parse cả ba `.jmx` như XML hợp lệ.
- So sánh để xác nhận ba plan có cùng chuỗi sampler nghiệp vụ.
- Kiểm tra mọi biến được tham chiếu đều có nguồn tạo hoặc được đánh dấu là input.
- Kiểm tra token/order ID được extract trước khi sử dụng.
- Kiểm tra không có endpoint nào ngoài implementation thực tế.
- Kiểm tra Load, Stress và Spike thật sự có workload shape khác nhau.
- Không khởi động server hoặc chạy test chỉ để kiểm tra cú pháp, vì đó nằm ngoài phạm vi skill này.

## Cách trả kết quả

Báo cáo ngắn gọn:

- đường dẫn các artifact đã tạo;
- flow có bao phủ đủ ba nhóm hay không;
- bảng tham số của ba plan;
- giả định quan trọng nhất và việc người dùng cần rà soát tiếp.

Không mô tả plan là “đã pass”, “ổn định” hoặc “đạt ngưỡng” khi chưa có kết quả chạy thật.
