# Khuyến nghị cải thiện

## Danh sách ưu tiên hành động

| ID | Ưu tiên | Liên quan | Khuyến nghị hành động | Tiêu chí nghiệm thu |
|---|---|---|---|---|
| R01 | 1 - High | UF-01 | Chuẩn hóa UTF-8 từ source/API đến browser; rà soát chuỗi tiếng Việt trong login, cart, coupon, checkout và order history | Không còn ký tự lỗi trong 6 checkpoint; ảnh regression hiển thị đúng |
| R02 | 1 - High | UF-02, UF-03 | Đổi tiêu đề thành “Đăng nhập”, nhãn email đúng nghĩa, nút tiếng Việt; dùng `type="email"` và `type="password"` | Người kiểm thử nhận diện đúng form; password không hiển thị plaintext |
| R03 | 1 - High | UF-04 | Tính/đối soát tổng từ dữ liệu server; hiển thị giá, giảm giá và phải trả dưới dạng chỉ đọc | Payload client bị sửa không thay đổi số tiền server; UI khớp công thức |
| R04 | 2 - Medium | UF-05 | Làm nổi bật ô coupon; hiển thị điều kiện, lý do từ chối, trạng thái thành công và số tiền giảm | Coupon hợp lệ/sai/hết hạn/không đủ ngưỡng đều có feedback cụ thể |
| R05 | 2 - Medium | UF-05 | Tăng affordance của badge/cart và đường dẫn tới coupon | Người kiểm thử tìm được cart và coupon mà không cần đoán |
| R06 | 2 - Medium | UF-06 | Hiển thị toast thành công, mã đơn, tổng tiền và trạng thái đơn bằng tiếng Việt/màu nhất quán | Sau checkout xác định được đơn, tổng và trạng thái trong một lần kiểm tra |
| R07 | 2 - Medium | UF-07 | Đổi nhãn thành “Đăng xuất”, hiển thị feedback và xác minh token/session đã xóa | Sau logout có trạng thái kết thúc rõ và không truy cập phiên cũ |
| R08 | 3 - QA | UF-08 | Giữ lại run-flow và 6 checkpoint làm regression test sau mỗi thay đổi | 42/42 checkpoint tiếp tục PASS; không thay đổi artifact gốc |

## Kế hoạch kiểm chứng

1. Chạy regression Playwright sau R01–R03; đối chiếu lại ảnh và
   `run-results.json`.
2. Kiểm tra coupon ở các điều kiện hợp lệ, sai, hết hạn và không đạt ngưỡng.
3. Kiểm thử API/UI với tổng checkout bị sửa từ client.
4. Chạy pilot với người thật để đo completion time, error count, assistance,
   hiểu nhãn và feedback; sau đó mới diễn giải lại pain-point frequency hoặc
   SUS như kết quả người dùng.

Các khuyến nghị dựa trên bằng chứng có trong workspace và yêu cầu FR hiện có.
Chúng không biến phản hồi persona mô phỏng thành bằng chứng người thật.
