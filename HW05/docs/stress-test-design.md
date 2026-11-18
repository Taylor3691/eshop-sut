# Thiết kế Stress Test EShop — 23120157

**Plan:** `test-plans/23120157_Stress_20261118.jmx`  
**Test data:** tái sử dụng `test-data/users.csv` của Load.  
**Trạng thái:** Đã tạo cấu hình để review; **chưa thực thi**. Prompt 05 yêu cầu workload được người dùng duyệt trước khi chạy.

## Mục tiêu và workflow cố định

Ba stage gọi cùng các endpoint theo cùng thứ tự như Load:

```text
POST /api/login
→ GET /api/products?search=...
→ GET /api/products/{product_id}
→ POST /api/cart
→ POST /api/checkout
```

Sampler labels có tiền tố Stage để tách metric theo mức tải; endpoint, payload, token extraction và assertions giống Load. Nhóm endpoint phủ: auth-heavy (login/JWT), read-heavy (search/list/detail), transactional (cart/checkout). JWT lấy từ `$.token`, gửi dạng Bearer cho `POST /api/cart` và `POST /api/checkout`.

## Workload đề xuất để review

| Stage | VU mới | Ramp-up | Start delay | Workflow | CSV rows cần có tổng cộng |
|---|---:|---:|---:|---|---:|
| 1 — Baseline | 1 | 1 giây | 0 giây | 1 workflow/VU | 1 |
| 2 — Increase | 2 | 2 giây | 5 giây | 1 workflow/VU | 3 tích lũy |
| 3 — Peak candidate | 4 | 4 giây | 10 giây | 1 workflow/VU | 7 tích lũy |

Đây là **đề xuất bảo thủ cho máy local**, không phải mức tải đã đo hoặc mức tải đã biết là an toàn. Máy có i7-1355U (10 cores/12 logical processors), 15.7 GiB RAM, Windows 11 và Java 21; JMeter chưa có trên PATH. Không có kết quả baseline trước đó để biện minh bằng số liệu cho ramp hay peak. Tối đa 7 VU là mức candidate cần được duyệt, không phải kết luận về sức chứa. Trong JMX, chỉ Stage 1 đang bật; Stage 2 và Stage 3 tắt mặc định để buộc review evidence trước khi tăng tải.

CSV Data Set Config đặt ở TestPlan scope, chia sẻ con trỏ giữa các stage, `recycle=false`, `stopThread=true`; như vậy mỗi VU cần một dòng riêng và không được lặp lại account khi file hết. **CSV hiện chỉ có một dòng**, do đó stage 2/3 sẽ dừng các thread không có data. Cần bảy customer accounts độc lập và địa chỉ test hợp lệ trước khi chạy cấu hình kết hợp. Không thêm credential giả hoặc dùng chung account để lấp dòng.

## Pacing, stage và giới hạn đo

Think-time giữ nguyên **3 giây trước mỗi sampler** để workflow có nhịp tương tác giống cấu hình Load. Mỗi VU chạy đúng một journey và một checkout; không lặp order vô hạn. Stage 2 bắt đầu ở giây 5, Stage 3 ở giây 10, với ramp tương ứng 2 và 4 giây. Vì năm sampler có timer, một workflow mất khoảng 15 giây cộng thời gian phản hồi; các stage có thể chồng thời gian ngắn và tạo ramp tăng dần, tối đa 7 active VU nếu đủ accounts.

Thread Group scheduler có giới hạn 90 giây, nhưng controller chạy một iteration nên thread kết thúc ngay khi workflow hoàn thành. Vì vậy cấu hình hiện tại là một **staged burst/one-pass**, chưa phải các plateau kéo dài. Stage 2/3 đang disabled; review JTL/resource evidence của stage trước rồi mới enable stage tiếp theo. Nếu chạy riêng từng stage, dùng output JTL riêng và chuẩn bị data/state riêng để tránh nhầm lẫn. Cấu hình này giúp kiểm soát số VU và ghi sample theo nhãn stage, nhưng không đủ để kết luận maximum sustainable load. Để đáp ứng phần “sustainable” cần thiết kế lại sau khi có account pool và quy trình test DB: các stage phải được giữ đủ lâu, có data isolation/reset phù hợp, rồi mới đo threshold thực. Không kéo dài loop khi chưa hiểu side effects: cart trong RAM không clear sau checkout, mỗi checkout ghi thêm order trong SQLite.

## Đo degradation và maximum sustainable load

Plan bật Aggregate Report và lưu raw CSV JTL bằng `-l`. Đánh giá sau execution bằng stage-prefixed labels:

- Theo dõi response time/percentiles và số mẫu theo từng endpoint ở Stage 1, 2, 3.
- Theo dõi số lỗi, error rate, HTTP status và assertion failures ở từng stage.
- Degradation point là stage đầu có tăng rõ response time hoặc lỗi so với baseline theo SLO/threshold được nhóm duyệt. Chưa có SLO/threshold trong source nên không tự đặt pass/fail number.
- Maximum sustainable load chỉ kết luận nếu stage đó giữ đủ lâu với error/latency nằm trong tiêu chí đã duyệt, resource còn headroom, và load generator không bão hòa. Cấu hình one-pass hiện tại chưa xác định được đại lượng này.

Không có kết quả thực tế để ghi degradation point hoặc sustainable threshold trước khi chạy JMeter. Không suy luận các giá trị đó từ cấu hình dự kiến.

## Account lockout, stop condition và reset

Không có sampler gửi mật khẩu sai; CSV chỉ chứa credential test đã xác minh. PDF/guide mô tả ba lần sai, nhưng implementation cộng `login_attempts` thêm 2 mỗi lần sai nên một lần sai có thể khóa account trong 180 giây. `on_sample_error=stopthread` dừng VU đầu tiên có sampler/assertion fail, hạn chế chuỗi request lỗi và không tiếp tục gọi protected endpoints bằng token rỗng. Theo dõi failure counts trong JTL/Aggregate Report.

Nếu tài khoản test riêng bị khóa, chờ tối thiểu 180 giây hoặc reset `login_attempts=0`, `locked_until=NULL` đúng account đó trong database test cô lập. Không restart server để reset DB dùng chung: import `database.js` drop/reseed toàn bộ bảng. Sao lưu/khôi phục chỉ trong môi trường cô lập.

## Preconditions và quyết định trước khi execution

1. Cài/xác nhận JMeter tương thích với JMX; hiện `jmeter` không có trong PATH.
2. Chuẩn bị database test cô lập và backup; xác nhận có thể chấp nhận tối đa một order mỗi VU (7 orders ở cấu hình một pass).
3. Provision bảy customer accounts riêng và thêm bảy dòng CSV đã xác minh; không chia sẻ account giữa VU.
4. Cấp shipping-address fixture hợp lệ; CSV hiện để trống vì seed profile không có địa chỉ.
5. Review ramp/start delays, peak 7 VU, timeout, assertions, stop policy, stage duration và tài nguyên monitor; điều chỉnh dựa trên baseline quan sát được.
6. Bật Stage 2/3 theo từng bước sau khi đọc evidence của stage trước; không tự động tăng tải khi chưa đánh giá response time/error/resource.
7. **Chờ người dùng duyệt workload configuration trước khi chạy.** Không chạy plan ở task này.

## Lệnh tham khảo sau khi được duyệt (chưa chạy)

```powershell
jmeter -n -t HW05/test-plans/23120157_Stress_20261118.jmx -Jstage1_users=1 -Jstage2_users=2 -Jstage3_users=4 -Jcsv_file=HW05/test-data/users.csv -Jthink_time_ms=3000 -l HW05/results/Stress/23120157_Stress_20261118.jtl -e -o HW05/html-reports/Stress/23120157_Stress_20261118
```

Thư mục kết quả phải được chuẩn bị rỗng trước lệnh. Command chỉ là hướng dẫn, không phải bằng chứng JMeter đã chạy.
