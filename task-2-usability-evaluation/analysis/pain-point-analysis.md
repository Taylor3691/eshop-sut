# Phân tích pain point

| Pain point | Participant / nguồn | Loại bằng chứng | Tác động dự kiến | Mức tin cậy |
|---|---|---|---|---|
| Chữ tiếng Việt lỗi mã hóa | P01–P07 screenshots; BUG-SIM-001 | Quan sát Playwright | Giảm khả năng đọc nhãn, thông báo và trạng thái | Cao về lỗi hiển thị; chưa đo tác động người dùng |
| Form login gây nhầm lẫn | P01/P03 persona; BUG-SIM-002 | Máy + phản hồi mô phỏng | Người dùng có thể không hiểu đang đăng nhập; giảm tin cậy | Cao về lỗi UI; trung bình về hành vi |
| Mật khẩu hiển thị dạng text | BUG-SIM-002 | Quan sát mã/UI | Rủi ro riêng tư và cảm nhận an toàn | Cao về tồn tại lỗi |
| Tổng checkout có thể chỉnh sửa | P04 và ảnh checkout; FR-08 | Quan sát máy + persona | Người dùng nghi ngờ số tiền phải trả và tính đúng nghiệp vụ | Cao về tính cần khắc phục |
| Tìm coupon/badge giỏ chưa trực quan | P02, P05 | Phản hồi persona | Tăng thời gian tìm kiếm và kiểm tra lại | Thấp–trung bình, cần người thật xác minh |
| Phục hồi coupon | P03, P06 | Phản hồi persona | Người dùng cần hiểu lý do lỗi và cách sửa | Thấp–trung bình, chưa có log hỗ trợ |
| Trạng thái đơn và logout chưa rõ | P02, P06, P07 | Phản hồi persona | Không chắc giao dịch đã hoàn tất hoặc phiên đã an toàn | Thấp–trung bình, cần quan sát thật |

## Mẫu nguyên nhân

1. **Khả năng đọc và ngữ nghĩa:** lỗi mã hóa, nhãn tiếng Anh và tiêu đề sai
   chức năng cùng làm tăng tải nhận thức.
2. **Minh bạch giao dịch:** tổng tiền và khoản giảm chưa tạo được điểm kiểm tra
   đáng tin cậy trước khi xác nhận.
3. **Phản hồi trạng thái:** coupon, đơn hàng và logout chưa cung cấp tín hiệu
   đủ rõ cho trạng thái thành công/lỗi.

## Ranh giới diễn giải

Không có completion time, assistance log hoặc quan sát người thật. Vì vậy
không tính được tỷ lệ pain point theo dân số và không dùng số participant được
gắn trong persona như tần suất nghiên cứu.
