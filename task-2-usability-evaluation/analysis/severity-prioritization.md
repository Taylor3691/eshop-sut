# Ưu tiên mức độ nghiêm trọng

## Tiêu chí

- **Cao:** cản trở hiểu chức năng cốt lõi, làm giảm tin cậy thanh toán hoặc có
  rủi ro riêng tư/bảo mật.
- **Trung bình:** làm tăng do dự hoặc công sức nhưng vẫn có đường hoàn tất.
- **Thấp:** cải thiện khả năng khám phá/độ rõ mà chưa thấy cản trở flow.

Mức dưới đây là ưu tiên QA/UX dựa trên bằng chứng hiện có, không phải severity
được đo từ người dùng thật.

| Ưu tiên | Vấn đề | Căn cứ | Phạm vi | Hành động |
|---|---|---|---|---|
| P0/Cao | Lỗi mã hóa tiếng Việt trên các màn hình | BUG-SIM-001, screenshots | Login/cart/checkout/navigation | Sửa UTF-8 và kiểm tra toàn bộ chuỗi |
| P0/Cao | Login sai ngữ nghĩa và password dùng text | BUG-SIM-002, screenshot/mã nguồn | Login | Sửa nhãn, tiêu đề, input type và nút |
| P1/Cao | Tổng checkout có thể chỉnh sửa | Screenshot, FR-08, P04 persona | Checkout | Tính/đối soát ở server; hiển thị chỉ đọc |
| P1/Trung bình | Feedback coupon và khoản giảm chưa rõ | P02, P03, P06 | Cart/checkout | Hiển thị lỗi, điều kiện và số tiền giảm |
| P2/Trung bình | Badge giỏ và đường tới coupon khó tìm | P02, P05 | Header/cart | Tăng affordance, nhãn và trạng thái |
| P2/Trung bình | Trạng thái đơn/logout chưa rõ | P02, P06, P07 | Order history/auth | Dùng nhãn tiếng Việt, màu/trạng thái và toast |

## Thứ tự xử lý đề xuất

1. Khắc phục encoding và form login vì ảnh hưởng nền tảng đến khả năng đọc và
   cảm nhận an toàn.
2. Khóa và xác thực tổng checkout ở máy chủ trước khi tin cậy số tiền.
3. Chuẩn hóa feedback coupon và hiển thị khoản giảm.
4. Cải thiện discoverability của badge/cart, trạng thái đơn và logout.
5. Chạy lại flow tự động và kiểm thử với người thật để xác nhận tác động.
