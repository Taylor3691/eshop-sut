# Task 1.5 – Human review and fixes

## Phạm vi rà soát

Các file được AI tạo đã được đối chiếu với flow, route thực tế trong `backend/server.js`, dữ liệu CSV và cấu hình JMeter. Phần này ghi nhận lỗi/thiếu sót của AI, nguyên nhân và cách sửa. Các mức tải vẫn cần hiệu chỉnh sau smoke test vì chưa có kết quả thực nghiệm trên phần cứng thật.

## Kết quả rà soát

| STT | Điểm AI làm sai hoặc bỏ sót | Ảnh hưởng | Nguyên nhân có thể | Cách sửa | Trạng thái |
|---:|---|---|---|---|---|
| 1 | Thread Group dùng `on_sample_error=continue` | Nếu login không lấy được JWT, các request cart/checkout/order tiếp tục chạy và tạo nhiều lỗi 401/403 dây chuyền; error rate không còn phản ánh lỗi gốc | AI tập trung tạo đủ sampler nhưng chưa xem xét quan hệ phụ thuộc giữa các bước | Đổi thành `startnextloop` trong mọi Thread Group. Khi một bước thất bại, VU bỏ phần còn lại của iteration và bắt đầu flow mới | Đã sửa |
| 2 | Generator ban đầu không sinh Listener | Chạy lại `generate-task1-plans.ps1` sẽ ghi đè ba Listener được thêm thủ công | Listener thuộc yêu cầu Task 1.3, trong khi skill ban đầu chỉ giới hạn ở Task 1.1 | Generator hiện sinh `Summary Report`, `Aggregate Report`, `View Results Tree` đúng từng plan | Đã sửa |
| 3 | `View Results Tree` được bật trong Spike 100 VU | Listener lưu chi tiết sample/response trong RAM của load generator, có thể làm tăng memory và làm sai số liệu Spike | AI ưu tiên đáp ứng “ba report view” nhưng chưa tách chế độ debug khỏi lần chạy chính thức | Giữ Listener trong plan nhưng đặt `enabled=false`. Chỉ bật khi smoke test 1–2 VU hoặc nạp `.jtl` sau khi chạy | Đã sửa |
| 4 | Các mức 20/120/100 VU được chọn khi chưa có baseline phần cứng | Mức tải có thể quá thấp hoặc quá cao trên máy thực tế | Không có CPU, RAM, baseline RPS hoặc SLA trong prompt | Giữ đây là workload khởi điểm, không gọi là ngưỡng chính thức. Sau smoke/baseline test phải hiệu chỉnh VU và ramp-up | Chờ kết quả chạy |
| 5 | CSV ban đầu chỉ có một account | Nhiều VU dùng chung giỏ hàng; dữ liệu giao thoa và kết quả transactional thiếu tin cậy | AI tạo schema mẫu trước khi biết peak concurrency | CSV đã mở rộng thành 240 account, product ID 1–5, quantity 1–3; thêm script seed account | Đã sửa |
| 6 | CSV dùng `recycle=true` | Sau khi dùng hết 240 dòng, account được tái sử dụng; iteration quá nhanh vẫn có khả năng trùng account | Test chạy theo duration cần dữ liệu liên tục, trong khi CSV hữu hạn | Dùng pool gấp đôi peak VU và ghi rõ rủi ro. Cần kiểm tra collision trong smoke test; tăng pool nếu cần | Giảm thiểu, cần quan sát |
| 7 | Flow lặp thêm item nhưng implementation không xóa cart sau checkout | Cart trong bộ nhớ tăng dần, làm workload thay đổi theo thời gian và có thể giống memory leak | README và implementation không khớp; AI ban đầu thiết kế theo flow mong đợi | Ghi nhận đây là sai lệch SUT, không tự sửa backend vì ngoài phạm vi test plan. Báo cáo như bug nếu tái hiện khi chạy | Không thể sửa trong plan |
| 8 | Implementation nhận `total_amount` từ client | Flow không kiểm tra yêu cầu “backend tự tính lại tổng tiền” trong README | Performance happy-path không phải test chức năng tampering | Giữ payload theo API thực tế để performance plan chạy được; tạo test chức năng/báo bug riêng nếu cần | Ngoài phạm vi performance plan |
| 9 | Account lockout chưa có guard riêng | Credential sai lặp lại có thể kích hoạt khóa tài khoản, đặc biệt implementation tăng attempts sai | Prompt không cung cấp trạng thái account và AI giả định dữ liệu đăng nhập hợp lệ | Dùng account test riêng, seed trước khi chạy, smoke test 1–2 VU và dừng nếu login lỗi. Ghi lại/reset lockout nếu bị kích hoạt | Quy trình vận hành |

## Đánh giá tham số sau rà soát

| Plan | Tham số hiện tại | Đánh giá của con người |
|---|---|---|
| Load | 20 VU, ramp 60 giây, tổng 360 giây | Hợp lý làm baseline đầu tiên; chưa được xem là tải sản xuất |
| Stress | 20 → 40 → 80 → 120 VU, tổng 300 giây | Có các bậc tải rõ và dùng component JMeter chuẩn; cần quan sát CPU/error rate để quyết định có tăng hoặc giảm stage |
| Spike | Baseline 10 VU, thêm 90 VU trong 5 giây, burst 60 giây, recovery 60 giây | Đúng hình dạng spike; View Results Tree phải tắt trong lần chạy chính thức |
| Think-time | Random 1–3 giây trước các bước sau login | Hợp lý cho hành vi duyệt/mua đơn giản và được giữ giống nhau giữa ba plan để so sánh |

## Assertions và correlation

Các kiểm tra sau được giữ lại vì đủ mạnh cho flow:

1. Login phải trả HTTP 200 và có JWT.
2. Danh sách sản phẩm phải là JSON array và chứa `product_id` từ CSV.
3. Add-to-cart phải trả HTTP 200 và thông báo xác nhận.
4. Checkout phải trả HTTP 200 và có `orderId`.
5. Order history phải chứa đúng `orderId` vừa tạo với trạng thái `pending`.

JWT, product information và `orderId` được extract trước khi sử dụng. Sau thay đổi `startnextloop`, một assertion thất bại không còn tạo chuỗi request phụ thuộc sai.

## Việc phải làm trước khi chạy chính thức

1. Seed 240 account bằng `seed-test-users.ps1`.
2. Chạy smoke test 1–2 VU và xác nhận toàn bộ assertion pass.
3. Kiểm tra không account nào bị lock.
4. Bật View Results Tree chỉ trong smoke test; tắt lại trước Spike chính thức.
5. Chạy non-GUI, xuất raw `.jtl` và HTML report.
6. Dựa trên CPU, RAM, p95 và error rate để hiệu chỉnh mức VU nếu workload hiện tại không phù hợp.

## Trách nhiệm của người thực hiện

AI hỗ trợ sinh cấu trúc và đề xuất tham số. Người thực hiện chịu trách nhiệm xác minh dữ liệu, quan sát lần chạy thật, điều chỉnh workload và quyết định kết quả cuối cùng có đủ tin cậy để báo cáo hay không.
