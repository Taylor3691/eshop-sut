# Kế hoạch chạy Cross-Browser (BrowserStack Live)

## Cấu hình

| Mã | Nền tảng | Thư mục ảnh |
|---|---|---|
| CH | Chrome (bản mới nhất) · Windows 11 | `chrome/` |
| FF | Firefox (bản mới nhất) · Windows 11 | `firefox/` |
| SF | Safari (bản mới nhất) · macOS | `safari/` |

## Chuẩn bị (trước khi bấm Start để không tốn phút trial)

1. `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3` (dữ liệu sạch, giống nhau cho cả 3 trình duyệt).
2. Bật **BrowserStack Local**, mở URL `http://localhost:5174`.
3. Mở app **Stickies** trên Mac, ghi **email sinh viên + họ tên**, chọn *Window → Float on Top*, đặt ở góc màn hình.
4. Chụp bằng **Cmd + Shift + 4 → Space → bấm vào cửa sổ trình duyệt** (hoặc vùng chọn) sao cho ảnh thấy cùng lúc:
   thanh công cụ BrowserStack (tên OS + trình duyệt) · thanh địa chỉ có `localhost:5174` · ghi chú Stickies có email.
5. Tên ảnh: `<ID>_<CH|FF|SF>.png` (ví dụ `GUI-01-10_FF.png`). Nhiều ảnh cho 1 mục: thêm `-2`, `-3`.
6. Chạy lại `start-sut.sh` + `seed-hw03.sh 3` giữa các trình duyệt (dữ liệu test của trình duyệt trước làm bẩn bảng).

## Nhóm A — Phụ thuộc trình duyệt: chạy kỹ + chụp ảnh trên CẢ 3 trình duyệt

| ID | Kiểm gì | Vì sao dễ khác nhau |
|---|---|---|
| GUI-01-02, 01-03 | Chữ tiếng Việt có dấu ở Login, Dashboard, Sản phẩm | Font hệ thống khác nhau giữa Windows/macOS |
| GUI-01-09, 01-10 | Định dạng tiền ở Sản phẩm, Dashboard, Mã giảm giá | `toLocaleString()` phụ thuộc ngôn ngữ trình duyệt/OS |
| GUI-01-11, 01-12, 01-13 | Thứ tự Tab ở Login, form Sản phẩm, sidebar | **Safari mặc định Tab không dừng ở nút/link** (cần Option + Tab) |
| GUI-01-14 | Viền focus khi Tab vào ô nhập | Mỗi trình duyệt có kiểu focus ring riêng |
| GUI-01-15 | Thu cửa sổ ~768px, xem bảng Mã giảm giá | Cách xuống dòng/cuộn bảng khác nhau |
| GUI-01-21 | Tiêu đề tab + favicon | Cách hiển thị tab khác nhau |
| GUI-02-07 | Ô mật khẩu che ký tự | Ký tự che (• / ●) và nút hiện mật khẩu khác nhau |
| GUI-02-08, 02-11 | Để trống trường bắt buộc rồi gửi | Bong bóng thông báo `required` khác nội dung/ngôn ngữ |
| GUI-02-13 | Giá `1000.5` | Kiểm tra `step` của ô số khác nhau |
| GUI-02-17 | Chọn file Import | Hộp chọn file của OS khác nhau |
| GUI-02-21, 02-22 | Số lần `0`, ngày hết hạn trống/đã qua | Ô `date` và bong bóng `min` khác nhau rõ rệt (Safari) |
| GUI-02-24 | Cuộn chuột trên ô Giá | Firefox/Safari xử lý cuộn trên ô số khác Chrome |
| GUI-04-06, 04-10, 01-04 | Bấm Xóa; đăng nhập test@eshop.com; tạo mã trùng `SAVE10` | Giao diện hộp thoại `alert()` khác nhau |

## Nhóm B — Logic JavaScript giống nhau: chạy nhanh, chụp 1 ảnh tổng/màn hình

Không phụ thuộc trình duyệt (cùng code React), chỉ cần xác nhận kết quả giống Chrome. Nếu khác Chrome → chụp ảnh riêng và ghi bug.

| Màn hình | ID |
|---|---|
| Login, Sidebar | GUI-01-01, 01-05, 01-06, 01-07, 02-01, 02-02, 02-06, 02-09, 03-01 → 03-06 |
| Danh mục | GUI-02-10, 04-04, 04-05, 04-07 |
| Sản phẩm | GUI-01-08, 02-12, 02-14 → 02-16, 04-03, 04-12 → 04-14 |
| Mã giảm giá | GUI-02-19, 02-20, 04-15 |

## Nhóm C — Không chạy trên cloud (ghi N/A trong sheet Cross-Platform, kèm lý do)

| ID | Lý do |
|---|---|
| GUI-01-16 (zoom 200%) | Đã chạy trên máy thật ở Task 1; zoom trên cloud phụ thuộc màn hình máy ảo |
| GUI-01-17 (dark mode) | Không đổi được giao diện tối của OS trong phiên Live |
| GUI-01-18 (RTL), 01-19 (tương phản) | Cần DevTools; kết quả do CSS nên giống nhau |
| GUI-01-20, 02-23 | Cần dữ liệu đặc biệt; logic hiển thị giống nhau |
| GUI-04-01, 04-02 (mạng chậm) | Cần giả lập mạng bằng DevTools |
| GUI-04-08, 04-09 (bảng rỗng, dừng backend) | Phá dữ liệu / cần dừng server trong phiên |
| GUI-04-11, 04-16, 03-07, 03-08 | Cần localStorage / VoiceOver / thao tác dài |

## Sau khi chạy

1. Điền sheet **Cross-Platform** trong `task1-checklist/checklist.xlsx` (Passed / Failed / N/A cho CH, FF, SF).
2. Ghi lỗi **chỉ xảy ra trên 1 trình duyệt** thành bug mới (`BUG-34`…), tạo issue với label `hw03`.
3. Ghi lại số phút trial đã dùng và thời gian chạy từng trình duyệt vào báo cáo.
