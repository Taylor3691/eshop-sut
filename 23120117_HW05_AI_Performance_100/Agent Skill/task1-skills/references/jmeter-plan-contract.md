# JMeter plan contract cho Task 1.1

Đọc tài liệu này khi sinh ba JMeter plan từ flow đã vượt qua coverage gate.

## Cấu trúc tối thiểu của mỗi plan

Mỗi `.jmx` cần có:

1. Test Plan và User Defined Variables cho `protocol`, `host`, `port` và các input chưa được cấp.
2. HTTP Request Defaults trỏ đến backend EShop.
3. HTTP Header Manager đặt `Content-Type: application/json`; thêm Authorization sau khi đã extract JWT.
4. HTTP Cookie Manager nếu implementation sử dụng cookie.
5. Thread Group hoặc các Thread Group chuẩn JMeter biểu diễn workload shape.
6. Flow samplers theo đúng thứ tự người dùng cung cấp.
7. JSON Extractor cho JWT và các ID động như `orderId` khi bước sau cần dùng.
8. Response Assertion cho status/response field quan trọng.
9. Uniform Random Timer hoặc timer tương đương để mô phỏng think-time.

Không thêm GUI listener nặng vào plan chỉ để làm đẹp. Listener/report view là yêu cầu riêng của Task 1.3 và phải được xử lý theo quyết định của người thực hiện.

## Workload mặc định khởi điểm

Đây là giá trị thiết kế ban đầu khi người dùng chưa cung cấp baseline hoặc giới hạn phần cứng. Không trình bày chúng như ngưỡng đúng đã được đo.

| Plan | Workload khởi điểm | Ramp/shape | Hold | Think-time |
|---|---:|---|---:|---:|
| Load | 20 VU | ramp-up đều trong 60 giây | 300 giây | ngẫu nhiên 1–3 giây |
| Stress | 20 → 40 → 80 → 120 VU | mỗi bậc tăng sau 60 giây | 60 giây mỗi bậc | ngẫu nhiên 1–3 giây |
| Spike | baseline 10 VU, spike lên 100 VU | baseline 60 giây, ramp spike tối đa 5 giây, trở về baseline | spike 60 giây, recovery 60 giây | ngẫu nhiên 1–3 giây |

Nếu chỉ dùng thành phần chuẩn JMeter:

- Load có thể dùng một Thread Group với scheduler.
- Stress có thể dùng nhiều Thread Group chứa cùng request chain, được delay để cộng dồn thành các bậc tải. Đặt tên rõ từng stage.
- Spike có thể dùng một baseline Thread Group và một spike Thread Group được delay; cả hai phải chứa cùng request chain.

Nếu nhân đôi request chain giữa các Thread Group, mọi thay đổi endpoint/correlation phải được áp dụng nhất quán. Không dùng plugin như Ultimate Thread Group nếu môi trường chưa xác nhận đã cài.

## Invariant giữa ba plan

Ba plan phải giữ nguyên:

- flow nghiệp vụ và thứ tự sampler;
- request method/path/body;
- cách lấy và truyền JWT;
- correlation và assertion;
- loại và khoảng think-time.

Ba plan chỉ khác nhau ở workload shape: số VU, thời điểm khởi động, ramp-up, thời gian giữ và cách tải giảm/phục hồi.

## Quy tắc dữ liệu và concurrency

- Không mặc định cho mọi VU dùng chung một tài khoản nếu flow thay đổi giỏ hàng, coupon hoặc đơn hàng.
- Nếu chưa có dữ liệu thật, tạo CSV schema với header và tối đa một dòng minh họa; đánh dấu rõ người dùng phải cung cấp account/product hợp lệ.
- Dùng `orderId` từ response checkout cho bước kiểm tra đơn nếu API hỗ trợ; nếu chỉ có API lịch sử, extract phần tử phù hợp và ghi lại giả định về thứ tự.
- Không hard-code token hoặc ID sinh động vào `.jmx`.
- Với flow tạo đơn, cảnh báo rằng mỗi iteration làm tăng dữ liệu trong SQLite và có thể ảnh hưởng kết quả stress/spike.

## Assertions tối thiểu

- Login: status thành công và JWT tồn tại.
- Read request: status thành công và response là object/array đúng dạng mong đợi.
- Add-to-cart/mutation: status thành công và có thông báo hoặc trường xác nhận.
- Checkout: status thành công và `orderId` tồn tại.
- Order verification: tìm thấy đơn vừa tạo hoặc trạng thái mong đợi.

Không dùng assertion chỉ kiểm tra `200` nếu endpoint có dữ liệu quan trọng cần truyền cho bước sau.

## Tiêu chí hoàn tất thiết kế

Thiết kế hoàn tất khi ba file XML hợp lệ, có cùng request chain, có ba workload shape phân biệt, không bịa endpoint, và tài liệu thiết kế nêu rõ mọi giả định chưa được xác minh bằng chạy thật.
