# Khuyến nghị cải thiện

| ID | Khuyến nghị | Đối tượng | Tiêu chí xác nhận |
|---|---|---|---|
| R01 | Chuẩn hóa UTF-8 từ source đến response/render và rà soát chuỗi tiếng Việt | BUG-SIM-001 | Không còn ký tự lỗi trên login, cart, coupon, checkout và order history |
| R02 | Đổi tiêu đề thành “Đăng nhập”, nhãn email đúng nghĩa, nút tiếng Việt; dùng `type="email"` và `type="password"` | BUG-SIM-002 | Người kiểm thử nhận diện đúng form; password không hiển thị plaintext |
| R03 | Tính tổng từ dữ liệu server, khóa trường tổng và hiển thị giá gốc, giảm giá, phải trả | FR-08; P04 | Giá hiển thị khớp công thức; client không thể sửa số tiền phải trả |
| R04 | Làm rõ ô coupon, điều kiện áp dụng, lỗi và số tiền giảm sau khi áp dụng | FR-09; P02/P03/P06 | Mã hợp lệ có feedback + khoản giảm; mã sai nêu lý do và cách sửa |
| R05 | Tăng khả năng nhận biết cart/badge và liên kết tới ô coupon | FR-07/FR-09; P05 | Người kiểm thử tìm được cart và coupon mà không cần đoán |
| R06 | Hiển thị trạng thái đơn bằng tiếng Việt, màu/nhãn nhất quán và thông báo đặt hàng thành công | FR-10/FR-11; P02/P07 | Có thể xác định mã đơn, trạng thái và tổng sau checkout |
| R07 | Đổi nhãn logout thành “Đăng xuất”, thêm feedback rõ và xác nhận token/session đã xóa | FR-02; P06/P07 | Sau logout, người dùng thấy trạng thái kết thúc và không truy cập phiên cũ |

## Kế hoạch xác minh

1. Chạy lại `run-flow.cjs` sau R01–R03; giữ cùng sáu checkpoint để so sánh.
2. Thêm kiểm thử biên cho coupon hợp lệ, sai, hết hạn và không đủ ngưỡng.
3. Kiểm tra tổng checkout ở cả UI và API, bao gồm payload bị sửa từ client.
4. Thực hiện tối thiểu một pilot người thật trước khi diễn giải lại SUS hoặc
   tần suất pain point.
5. Thu completion time, error count, assistance count và consent cho từng
   participant để thay thế các trường NOT PROVIDED.

Các khuyến nghị được suy ra từ dữ liệu mô phỏng và yêu cầu FR hiện có; việc
triển khai cần được xác nhận bằng test QA và nghiên cứu người dùng thật.
