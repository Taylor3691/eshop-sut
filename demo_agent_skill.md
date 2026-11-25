# Hướng dẫn quay video demo Agent Skill `task1-skills`

## 1. Mục tiêu video

Video chứng minh `task1-skills` có thể nhận một end-to-end flow, kiểm tra coverage và sinh ba JMeter test plan Load, Stress, Spike.

Phạm vi cần thể hiện:

1. Skill tồn tại trong `.agents/skills/task1-skills`.
2. Người dùng gọi đúng `$task1-skills` và truyền flow đầu vào.
3. Skill đối chiếu flow với API thực tế của EShop.
4. Skill xác nhận đủ `auth-heavy`, `read-heavy`, `transactional`.
5. Skill tạo ba file `.jmx` và tài liệu thiết kế.
6. Ba plan sử dụng cùng workflow nhưng có workload profile khác nhau.
7. Các file được mở và kiểm tra trong JMeter GUI.

`task1-skills` không chạy performance test, không sinh `.jtl`, HTML report hoặc bằng chứng tài nguyên. Vì vậy video này không thay thế video thực thi Load/Stress/Spike và Task Manager ở Task 1.8. Có thể ghép phần demo skill này thành một phân đoạn trong video tổng của bài.

## 2. Thời lượng đề xuất

Thời lượng phù hợp: **6–8 phút**.

| Thời gian | Nội dung |
|---|---|
| 00:00–00:30 | Giới thiệu sinh viên và mục tiêu demo |
| 00:30–01:20 | Giới thiệu cấu trúc skill và phạm vi |
| 01:20–02:10 | Gọi `$task1-skills` với flow đầu vào |
| 02:10–03:15 | Trình bày coverage và endpoint mapping |
| 03:15–04:20 | Trình bày các artifact được tạo |
| 04:20–06:30 | Mở ba plan trong JMeter và so sánh workload |
| 06:30–07:30 | Trình bày validation, giới hạn và kết luận |

Không nói quá nhanh để cố đạt đủ nội dung. Video phải có thuyết minh tiếng Việt bằng chính giọng nói của sinh viên.

## 3. Chuẩn bị trước khi quay

### 3.1. Chuẩn bị màn hình

- Độ phân giải nên dùng: `1920 × 1080`.
- Tỉ lệ hiển thị Windows: 100% hoặc 125%.
- Phóng to chữ trong VS Code/Codex đủ đọc được.
- Đóng email, tin nhắn, mật khẩu và các tab chứa thông tin cá nhân.
- Tắt thông báo Windows trong thời gian quay.
- Đặt VS Code/Codex ở bên trái và File Explorer hoặc JMeter ở bên phải khi cần.
- Kiểm tra con trỏ chuột được ghi lại rõ ràng.

### 3.2. Cấu hình phần mềm quay

Có thể dùng OBS Studio, Xbox Game Bar hoặc công cụ quay màn hình khác.

Thiết lập đề xuất:

- Video: 1080p, 30 FPS.
- Microphone: bật và kiểm tra âm lượng trước.
- System audio: có thể tắt để tránh tiếng thông báo.
- Không dùng nhạc nền lấn át lời thuyết minh.
- Quay thử 15–20 giây rồi nghe lại trước khi quay chính thức.

### 3.3. Không ghi đè artifact chính thức

Trong video, yêu cầu skill ghi kết quả vào thư mục riêng:

```text
performance-tests/demo-task1/
```

Không dùng lại `performance-tests/task1/` vì có thể ghi đè ba plan chính thức và các thay đổi Human Review.

### 3.4. Các cửa sổ cần mở sẵn

1. VS Code tại repository `eshop-sut`.
2. Codex Chat để gọi skill.
3. File Explorer hoặc VS Code Explorer.
4. JMeter GUI, chưa cần mở test plan.

## 4. Prompt sử dụng trong video

Sử dụng prompt sau trong Codex:

```text
Use $task1-skills với flow:

Đăng nhập
→ Lấy danh sách sản phẩm
→ Thêm sản phẩm vào giỏ
→ Thanh toán
→ Kiểm tra đơn hàng

StudentID: 23120117
Output directory: performance-tests/demo-task1
Date: 20261121

Chỉ thiết kế và sinh test plan. Không chạy performance test và không tạo kết quả giả.
```

Nếu quay vào ngày khác, thay `20261121` bằng ngày quay thật theo định dạng `YYYYMMDD`.

## 5. Kịch bản quay chi tiết

### Phần 1 – Giới thiệu, 00:00–00:30

Hiển thị repository trong VS Code.

Lời thuyết minh gợi ý:

> Xin chào, tôi là sinh viên có mã số 23120117. Trong video này tôi trình bày cách sử dụng Agent Skill `task1-skills` để thiết kế ba JMeter test plan Load, Stress và Spike từ một end-to-end flow của hệ thống EShop.

Không cần hiển thị giấy tờ cá nhân hoặc thông tin không liên quan.

### Phần 2 – Giới thiệu skill, 00:30–01:20

Trong VS Code Explorer, mở:

```text
.agents/
└── skills/
    └── task1-skills/
        ├── SKILL.md
        ├── agents/openai.yaml
        └── references/jmeter-plan-contract.md
```

Cuộn qua phần đầu của `SKILL.md` và chỉ rõ:

- đầu vào là một end-to-end flow;
- đầu ra là ba plan Load, Stress, Spike;
- ba plan giữ cùng workflow;
- skill chỉ thiết kế, không chạy test hoặc tạo bằng chứng giả.

Lời thuyết minh gợi ý:

> Skill kiểm chứng endpoint từ mã nguồn, kiểm tra flow có đủ ba nhóm endpoint, sau đó sinh ba plan riêng. Phạm vi của skill dừng ở thiết kế và sinh file, không bao gồm chạy JMeter hay tạo `.jtl`.

Không cần đọc toàn bộ `SKILL.md` trong video.

### Phần 3 – Gọi skill, 01:20–02:10

Chuyển sang Codex Chat, dán prompt ở mục 4 và gửi.

Giữ khung hình đủ lâu để thấy:

- `$task1-skills`;
- flow năm bước;
- Student ID;
- output directory riêng;
- yêu cầu không chạy test.

Trong lúc Codex xử lý, thuyết minh:

> Flow bao gồm đăng nhập, đọc danh sách sản phẩm, thêm sản phẩm vào giỏ, thanh toán và kiểm tra đơn hàng. Tôi dùng thư mục demo riêng để không ghi đè artifact chính thức.

Không cắt bỏ hoàn toàn giai đoạn AI đang thực hiện. Có thể rút ngắn đoạn chờ dài, nhưng phần prompt và phản hồi cuối phải xuất hiện rõ.

### Phần 4 – Kiểm tra coverage, 02:10–03:15

Khi Codex trả kết quả, trình bày bảng ánh xạ:

| Bước | Endpoint | Nhóm |
|---|---|---|
| Đăng nhập | `POST /api/login` | auth-heavy |
| Lấy danh sách sản phẩm | `GET /api/products` | read-heavy |
| Thêm sản phẩm vào giỏ | `POST /api/cart` | transactional |
| Thanh toán | `POST /api/checkout` | transactional |
| Kiểm tra đơn hàng | `GET /api/orders/my-orders` | read-heavy |

Mở nhanh `backend/server.js` và tìm một hoặc hai route để chứng minh skill không bịa endpoint. Ví dụ tìm:

```text
/api/login
/api/checkout
/api/orders/my-orders
```

Lời thuyết minh gợi ý:

> Skill chỉ sinh plan sau khi flow vượt qua coverage gate. Login thuộc auth-heavy; danh sách sản phẩm và lịch sử đơn thuộc read-heavy; giỏ hàng và checkout thuộc transactional.

### Phần 5 – Trình bày artifact, 03:15–04:20

Mở thư mục:

```text
performance-tests/demo-task1/
```

Chỉ rõ các file được tạo:

```text
23120117_Load_20261121.jmx
23120117_Stress_20261121.jmx
23120117_Spike_20261121.jmx
task1-design.md
flow-data-template.csv hoặc file CSV tương ứng
```

Mở `task1-design.md`, trình bày ngắn:

- flow đầu vào;
- endpoint mapping;
- JWT và `orderId` correlation;
- bảng workload;
- giả định và điểm cần con người rà soát.

Lời thuyết minh gợi ý:

> Skill tạo ba file theo đúng quy tắc Student ID, scenario type và ngày. Tài liệu thiết kế ghi lại quyết định của AI, nhưng không thay thế AI Audit Report và Human Review của sinh viên.

### Phần 6 – Kiểm tra Load plan, 04:20–05:00

Mở file Load trong JMeter GUI.

Trên cây Test Plan, mở lần lượt:

```text
Load Thread Group
E2E workflow
01 - Login
02 - Get product list
03 - Add product to cart
04 - Checkout
05 - Verify order in history
```

Hiển thị các thông số:

- 20 VU;
- ramp-up 60 giây;
- giữ tải 300 giây;
- think-time ngẫu nhiên 1–3 giây.

Chỉ vào JSON Extractor của Login và Checkout để cho thấy JWT và `orderId` được correlation.

### Phần 7 – So sánh Stress và Spike, 05:00–06:30

Mở Stress plan và chỉ rõ bốn stage:

```text
20 → 40 → 80 → 120 VU
```

Mở Spike plan và chỉ rõ:

```text
Baseline 10 VU
Spike thêm 90 VU
Tổng khoảng 100 VU
Recovery về baseline
```

Mở rộng workflow của mỗi plan để chứng minh thứ tự năm sampler không thay đổi.

Lời thuyết minh gợi ý:

> Ba plan dùng cùng endpoint, assertion, correlation và think-time. Điểm khác nhau là workload shape. Load giữ tải bình thường; Stress tăng theo các bậc; Spike tăng đột ngột rồi quan sát khả năng phục hồi.

Không bấm nút Run trong phần demo skill. Việc chạy test thuộc Task 1.6 và cần bằng chứng riêng.

### Phần 8 – Validation và kết luận, 06:30–07:30

Quay lại kết quả Codex hoặc `task1-design.md`, trình bày các kiểm tra:

- ba file là XML hợp lệ;
- sampler sequence giống nhau;
- JWT và order ID được extract trước khi dùng;
- endpoint đều tồn tại trong backend;
- Load, Stress và Spike có workload khác nhau.

Lời kết gợi ý:

> Kết quả demo cho thấy Agent Skill nhận một flow nghiệp vụ và sinh ba test plan có cấu trúc nhất quán. Các tham số tải là giá trị khởi điểm, chưa phải ngưỡng đã được chứng minh. Tôi vẫn phải tự rà soát, chạy thật, thu thập `.jtl`, HTML report và theo dõi tài nguyên trong các phần tiếp theo.

## 6. Những nội dung phải xuất hiện rõ trong video

- Tên `$task1-skills` trong prompt.
- Flow đầu vào đầy đủ.
- Student ID `23120117`.
- Thư mục skill trong `.agents/skills/task1-skills`.
- Ba nhóm endpoint và endpoint tương ứng.
- Ba file `.jmx` được tạo thật.
- Cấu hình Load, Stress và Spike trong JMeter.
- JWT hoặc `orderId` extractor/assertion.
- Tuyên bố rõ skill không tự chạy test và không tạo kết quả giả.

## 7. Những lỗi cần tránh

- Quay video chỉ trình chiếu file có sẵn mà không cho thấy prompt gọi skill.
- Gọi AI bằng prompt chung chung nhưng không dùng `$task1-skills`.
- Ghi đè các plan chính thức trong `performance-tests/task1/`.
- Nói rằng test đã pass dù video chưa chạy test.
- Trình bày Load, Stress và Spike như ba workflow khác nhau.
- Không giải thích ba nhóm endpoint.
- Không mở file trong JMeter để chứng minh `.jmx` dùng được.
- Để chữ quá nhỏ hoặc con trỏ che nội dung.
- Lộ email cá nhân, API key, mật khẩu thật hoặc thông báo riêng tư.
- Dùng giọng AI thay cho giọng nói của sinh viên.

## 8. Đặt tên và đăng YouTube

Tên video gợi ý:

```text
23120117 - HW05 - task1-skills Demo
```

Mô tả gợi ý:

```text
Demo Agent Skill task1-skills cho HW05 Performance Testing.
Flow: Login → Product List → Add to Cart → Checkout → Order Verification.
Student ID: 23120117.
```

Thiết lập YouTube:

```text
Visibility: Unlisted
```

Sau khi upload, mở liên kết bằng cửa sổ Incognito để kiểm tra video có xem được và âm thanh rõ ràng.

## 9. Checklist trước khi nộp

- [ ] Video dài ít nhất 6 phút nếu dùng làm video chính của bài.
- [ ] Video có giọng nói tiếng Việt của sinh viên.
- [ ] Prompt `$task1-skills` xuất hiện rõ.
- [ ] Có trình bày flow và ba nhóm endpoint.
- [ ] Có ba file Load, Stress, Spike được sinh thật.
- [ ] Có mở ít nhất một plan đầy đủ trong JMeter.
- [ ] Có so sánh workload của cả ba plan.
- [ ] Không tuyên bố kết quả performance khi chưa chạy.
- [ ] Không lộ thông tin nhạy cảm.
- [ ] YouTube đặt ở chế độ Unlisted.
- [ ] Liên kết đã được kiểm tra bằng cửa sổ Incognito.
- [ ] Liên kết video được thêm vào main report, README và AI Audit Report nếu biểu mẫu yêu cầu.

## 10. Nếu kết hợp với video Task 1.8

Có thể dùng cấu trúc video tổng:

```text
Phần A – Demo task1-skills: 6–8 phút
Phần B – Load execution + Task Manager
Phần C – Stress execution + Task Manager
Phần D – Spike execution + Task Manager
Phần E – Kết quả và Human Review
```

Trong các phần chạy test, công cụ kiểm thử và Task Manager phải xuất hiện trong cùng khung hình. Yêu cầu này không bắt buộc ở mọi giây của phần demo skill, nhưng bắt buộc đối với bằng chứng thực thi Load/Stress/Spike.
