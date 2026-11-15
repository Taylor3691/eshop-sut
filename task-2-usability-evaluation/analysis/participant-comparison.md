# So sánh bảy participant mô phỏng

## Bảng so sánh

| ID | Persona | Flow Playwright | Thời gian | Sự kiện lỗi persona | Hỗ trợ | SUS | Chủ đề nổi bật |
|---|---|---|---|---:|---|---:|---|
| P01 | Phạm Bảo Huy | 6/6 PASS | NOT PROVIDED | 1 | NOT PROVIDED | 57,5 | Nhãn đăng nhập; kiểm tra tổng coupon |
| P02 | Trần Anh Khoa | 6/6 PASS | NOT PROVIDED | 0 | NOT PROVIDED | 75 | Tìm coupon; trạng thái thành công |
| P03 | Tô Thành Long | 6/6 PASS | NOT PROVIDED | 1 | NOT PROVIDED | 25 | Mã hóa chữ; phục hồi coupon |
| P04 | Nguyễn Minh Hiếu | 6/6 PASS | NOT PROVIDED | 0 | NOT PROVIDED | 42,5 | Tin cậy tổng thanh toán |
| P05 | Nguyễn Viết Toàn | 6/6 PASS | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Badge giỏ; tóm tắt giảm giá |
| P06 | Nguyễn Minh Tú | 6/6 PASS | NOT PROVIDED | 1 | NOT PROVIDED | 37,5 | Phản hồi coupon; xác nhận cuối |
| P07 | Cao Trọng Khang | 6/6 PASS | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Trạng thái đơn; đăng xuất |

## Nhận xét so sánh

- Flow máy đạt đồng nhất 7/7 lượt; không có khác biệt PASS/FAIL giữa các
  participant.
- SUS mô phỏng dao động 25–82,5, chênh lệch 57,5 điểm. P03 thấp nhất và P05,
  P07 cao nhất; đây là khác biệt trong vector trả lời persona, không phải bằng
  chứng phân bố người dùng.
- Ba hồ sơ P01, P03 và P06 mô tả một sự kiện lỗi/khôi phục trong kịch bản.
  Bốn hồ sơ còn lại không mô tả lỗi tác vụ.
- Không thể xếp hạng theo tốc độ hoặc khả năng tự lực vì không có thời gian
  người dùng và số lần hỗ trợ được ghi nhận.

## Diễn giải thận trọng

Các điểm chung về nhãn, coupon, tổng thanh toán, badge giỏ, trạng thái đơn và
đăng xuất được dùng làm đầu vào cho phân tích pain point. Chúng phải được
kiểm chứng lại bằng người dùng thật trước khi gọi là tần suất hoặc tỷ lệ lỗi.
