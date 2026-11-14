# Phase 1 — Checklist chuẩn bị đã điền trước cho mỗi phiên

## Khởi động môi trường

| Thứ tự | Kiểm tra | Cách xác nhận | Kết quả thực tế |
|---:|---|---|---|
| 1 | Backend đang chạy | Mở `http://localhost:3000/` hoặc kiểm tra terminal hiện thông báo server chạy | `[ ]` |
| 2 | Frontend đang chạy | Mở `http://localhost:5173/` và nhìn thấy trang EShop | `[ ]` |
| 3 | Đúng phiên bản SUT | Chạy `git rev-parse --short HEAD` và ghi mã vào `P0x.md` | `[ ]` |
| 4 | Sản phẩm chuẩn bị tồn tại | Tìm `iPhone 15 Pro Max`, mở được trang chi tiết | `[ ]` |
| 5 | Tài khoản test sẵn sàng | Moderator tự đăng nhập thử ở cửa sổ riêng; không ghi/chiếu mật khẩu | `[ ]` |
| 6 | Giỏ và local storage sạch | Dùng một profile/Incognito mới hoặc xóa trạng thái test theo quy trình đã chọn | `[ ]` |
| 7 | Recording sẵn sàng | Thử recording 5 giây; kiểm tra nơi lưu, âm thanh và dung lượng | `[ ]` |
| 8 | Consent sẵn sàng | Mở `03_instruments.md`; chưa bật recording khi chưa có đồng ý | `[ ]` |

## Kiểm tra không dẫn dắt

- [ ] Scenario chỉ được đọc nguyên văn từ `02_task_scenario.md`.
- [ ] Không đưa cho người tham gia sơ đồ luồng, danh sách bug hoặc video của phiên trước.
- [ ] Moderator đã mở `Phase2/P0x.md` đúng mã người tham gia.
- [ ] Không có thông tin cá nhân/mật khẩu/tab riêng tư trong vùng recording.

## Sau phiên

- [ ] Dừng recording và kiểm tra file đã lưu được.
- [ ] Điền kết quả từ quan sát thật vào `P0x.md` trong ngày.
- [ ] Đặt tên evidence bằng mã ẩn danh, ví dụ `P03_screen_YYYYMMDD.mp4`.
- [ ] Reset giỏ/browser trước người tiếp theo mà không sửa dữ liệu của phiên vừa xong.
