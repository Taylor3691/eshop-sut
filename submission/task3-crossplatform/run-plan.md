# Kế hoạch chạy Cross-Browser

## Lý do đổi từ BrowserStack sang trình duyệt thật

BrowserStack Free Trial chỉ cho **1 phút / thiết bị** ("Each device is available for up to 1 minute during Free Trial"), không đủ chạy checklist. Theo mục 6 của đề ("...or use real physical devices, provided your screenshots clearly show the browser / OS / device name alongside the SUT's localhost URL"), checklist được chạy đầy đủ trên trình duyệt thật cài trên máy Mac; BrowserStack chỉ dùng để chụp ảnh bằng chứng trong 1 phút.

## Cấu hình

| Mã | Nền tảng chạy checklist | Thư mục ảnh |
|---|---|---|
| CH | Google Chrome (bản đang cài) · macOS | `chrome/` |
| FF | Firefox (bản đang cài) · macOS | `firefox/` |
| SF | Safari (bản đang cài) · macOS | `safari/` |

Ảnh bằng chứng BrowserStack (1 phút / thiết bị) lưu ở `browserstack/`: Chrome 157 · Windows 11, Firefox 160 · Windows 11, Safari · macOS bản mới nhất — mỗi cấu hình 1–2 ảnh (màn Login, nếu kịp thì màn Sản phẩm sau khi đăng nhập).

## Chuẩn bị

1. `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3` (dữ liệu sạch, giống nhau cho cả 3 trình duyệt).
2. Mở app **Stickies**, ghi 3 dòng: **họ tên đầy đủ**, **MSSV**, **email sinh viên**; chọn *Window → Float on Top*, đặt ở góc màn hình (đề mục 6 yêu cầu email, mục 11 yêu cầu MSSV + họ tên).
3. Mỗi trình duyệt: chụp 1 ảnh màn **About** (Chrome: menu Chrome → About Google Chrome; Firefox: Firefox → About Firefox; Safari: Safari → About Safari) để ghi rõ phiên bản. Tên ảnh: `ABOUT_<CH|FF|SF>.png`.
4. Chụp bằng **Cmd + Shift + 4** (kéo vùng) sao cho ảnh thấy cùng lúc:
   tên trình duyệt (thanh menu macOS hoặc giao diện trình duyệt) · thanh địa chỉ có `localhost:5174` · ghi chú Stickies.
5. Tên ảnh: `<ID>_<CH|FF|SF>.png` (ví dụ `GUI-01-10_FF.png`). Nhiều ảnh cho 1 mục: thêm `-2`, `-3`.
6. Chạy lại `start-sut.sh` + `seed-hw03.sh 3` giữa các trình duyệt (dữ liệu test của trình duyệt trước làm bẩn bảng).
7. BrowserStack (làm 1 lần cho mỗi cấu hình): chuẩn bị Stickies trước, bấm chọn trình duyệt, gõ ngay `http://localhost:5174` (Safari không mở được thì dùng `http://bs-local.com:5174`), chụp ngay. Tên ảnh: `BS_<CH|FF|SF>.png`, `BS_<CH|FF|SF>-2.png`.

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

## Nhóm C — Cần thao tác đặc biệt (chạy được trên máy thật thì chạy, không thì ghi N/A kèm lý do)

| ID | Lý do |
|---|---|
| GUI-01-16 (zoom 200%) | Chạy được bằng Cmd + (+) trên cả 3 trình duyệt |
| GUI-01-17 (dark mode) | Chạy được: System Settings → Appearance → Dark |
| GUI-01-18 (RTL), 01-19 (tương phản) | Cần DevTools; kết quả do CSS nên giống nhau |
| GUI-01-20, 02-23 | Cần dữ liệu đặc biệt; logic hiển thị giống nhau |
| GUI-04-01, 04-02 (mạng chậm) | Cần giả lập mạng bằng DevTools |
| GUI-04-08, 04-09 (bảng rỗng, dừng backend) | Phá dữ liệu / cần dừng server trong phiên |
| GUI-04-11, 04-16, 03-07, 03-08 | Cần localStorage / VoiceOver / thao tác dài |

## Sau khi chạy

1. Điền sheet **Cross-Platform** trong `task1-checklist/checklist.xlsx` (Passed / Failed / N/A cho CH, FF, SF).
2. Ghi lỗi **chỉ xảy ra trên 1 trình duyệt** thành bug mới (`BUG-34`…), tạo issue với label `hw03`.
3. Ghi vào báo cáo: giới hạn 1 phút của BrowserStack (kèm ảnh `browserstack/`), phiên bản từng trình duyệt (ảnh ABOUT), thời gian chạy từng trình duyệt.
