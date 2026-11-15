# Phát hiện usability

## Phạm vi và độ tin cậy bằng chứng

Bộ dữ liệu gồm bảy lượt Playwright tự động, 42 ảnh, 7 video và phản hồi
persona/SUS được tạo mô phỏng. Phát hiện được chia thành:

- **Quan sát máy:** có thể kiểm tra trực tiếp trong ảnh, video hoặc kết quả
  `run-results.json`.
- **Tín hiệu persona:** xuất hiện trong nhật ký, phỏng vấn và SUS; hữu ích để
  hình thành giả thuyết nhưng không phải quan sát người dùng thật.

## Kết quả chính

### 1. Luồng tự động hoàn tất nhất quán

**Bằng chứng máy:** 7/7 lượt đạt cả sáu checkpoint, tương đương 42/42 bước.
Đăng xuất cũng được xác minh bằng việc token bị xóa khỏi localStorage.

**Diễn giải:** flow hiện có thể được script hóa từ đầu đến cuối. Kết quả này
không đo được tốc độ, khả năng tự học hoặc mức hài lòng.

### 2. Văn bản tiếng Việt và nhãn giao diện khó đọc

**Bằng chứng máy:** BUG-SIM-001 và ảnh đăng nhập, giỏ hàng, checkout cho thấy
nhiều chuỗi tiếng Việt bị lỗi hiển thị. BUG-SIM-002 ghi nhận tiêu đề/nút
đăng nhập chưa rõ, trường email ghi “Username” và nút dùng tiếng Anh.

**Tín hiệu persona:** P01 mô tả nhầm đăng nhập với đăng ký; P03 mô tả dừng ở
tiêu đề khó đọc. Đây là tín hiệu phù hợp với lỗi hiển thị nhưng vẫn là phản
hồi được tạo, không phải xác nhận người dùng.

### 3. Minh bạch và tin cậy tổng tiền checkout chưa đủ

**Bằng chứng máy:** ảnh checkout cho thấy trường tổng tiền có thể chỉnh sửa,
trong khi FR-08 yêu cầu tổng tự tính.

**Tín hiệu persona:** P01, P04 và P07 mô tả việc kiểm tra lại tổng, khoản giảm
hoặc trạng thái đơn trước khi tin rằng luồng đã hoàn tất.

### 4. Coupon và tín hiệu điều hướng cần rõ hơn

**Tín hiệu persona:** P02 và P05 mất thời gian tìm ô coupon/badge giỏ; P03 và
P06 mô tả nhập coupon sai rồi sửa. Phản hồi lỗi và cách thể hiện khoản giảm
được nêu như điểm cần làm rõ.

### 5. Kết thúc và trạng thái đơn chưa đủ dễ nhận biết

**Tín hiệu persona:** P06 cần phản hồi thành công rõ; P07 dừng trước nhãn
đăng xuất; P02 và P07 kiểm tra lịch sử/trạng thái đơn để chắc chắn giao dịch
đã xong.

## Kết luận

Hai lỗi UI có bằng chứng trực tiếp từ máy là mã hóa/nhãn hiển thị và form đăng
nhập. Các vấn đề coupon, tổng tiền, badge, trạng thái đơn và logout là các
pain point hoặc yêu cầu cần ưu tiên kiểm chứng/khắc phục; không được báo cáo
như tỷ lệ lỗi người dùng thật.
