# Main Report — HW03 GUI & Usability

## 1. Giới thiệu & phạm vi
## 2. Task 1 — GUI Checklist
### 2.1 Thiết kế (AI + review)
### 2.2 Mục AI bỏ sót & lý do
### 2.3 Kết quả thực thi
### 2.4 Bug
## 3. Task 2 — Usability Evaluation
## 4. Task 3 — Cross-Browser

### 4.1 Nền tảng

| Mã | Trình duyệt | Hệ điều hành | Ảnh |
|---|---|---|---|
| CH | Google Chrome 157.0.8103.51 (arm64) | macOS 27.2 | `task3-crossplatform/chrome/` (25 ảnh) |
| FF | Firefox 153.0.4 (aarch64), giao diện tiếng Việt | macOS 27.2 | `task3-crossplatform/firefox/` (26 ảnh) |
| SF | Safari 27.2 | macOS 27.2 | `task3-crossplatform/safari/` (26 ảnh) |

Phiên bản từng trình duyệt có ảnh màn About (`ABOUT_CH`, `ABOUT_FF`, `ABOUT_SF`). Mọi ảnh chụp toàn màn hình, thấy cùng lúc tên trình duyệt, thanh địa chỉ `localhost:5174` và ghi chú Stickies có email, MSSV, họ tên sinh viên.

### 4.2 Lý do dùng trình duyệt thật thay cho BrowserStack

BrowserStack Live Free Trial chỉ cho mỗi thiết bị dùng tối đa **1 phút** ("Each device is available for up to 1 minute during Free Trial"); hết thời gian, phiên bị đóng ("Your session was closed as the available free trial minutes on this device are over"). Một phút không đủ chạy dù chỉ một màn hình của checklist. Ảnh bằng chứng: `task3-crossplatform/browserstack/BS_trial-limit.png`, `BS_session-closed.png`.

Đề cho phép thay thế: "…or use real physical devices, provided your screenshots clearly show the browser / OS / device name alongside the SUT's localhost URL". Vì vậy checklist được chạy trên Chrome, Firefox và Safari cài trên máy macOS thật.

### 4.3 Cách làm

1. **Chọn mục chạy lại** (`task3-crossplatform/run-plan.md`): 22 mục của Task 1 có thể khác nhau giữa trình duyệt (nhóm A) — font tiếng Việt, định dạng số tiền, thứ tự Tab và viền focus, bong bóng kiểm tra `required` / `min`, ô `date` và ô `number`, hộp chọn file, hộp thoại `alert()`, bố cục ở cửa sổ hẹp, zoom 200%, dark mode, tiêu đề tab.
2. **Dữ liệu giống nhau**: trước mỗi trình duyệt chạy `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3` (DB mẫu + 3 đơn chờ).
3. **Thiết lập riêng cho Safari**: bật *Settings → Advanced → Press Tab to highlight each item on a webpage* (mặc định Safari không cho Tab dừng ở nút/link) và *Show full website address* (để thanh địa chỉ hiện đủ cổng `:5174`).
4. **Thực thi và chụp ảnh**: đi theo cùng một kịch bản 26 bước trên cả 3 trình duyệt; tên ảnh `<ID>_<CH|FF|SF>.png`. Thao tác trên trình duyệt được thực hiện với trợ giúp của AI điều khiển máy tính (Codex qua Orca computer use, Claude Code), ảnh chụp bằng `screencapture` của macOS; mọi ảnh được mở lại kiểm tra, ảnh không thể hiện đúng nội dung bị xóa và chụp lại (chi tiết khai trong AI Audit Report).
5. **Ghi kết quả**: sheet **Cross-Platform** trong `task1-checklist/checklist.xlsx` (Passed / Failed / N/A cho từng trình duyệt, kèm ghi chú khác biệt và Bug ID). 48 mục còn lại ghi N/A kèm lý do: nhóm B là logic JavaScript/React dùng chung, không phụ thuộc engine trình duyệt; nhóm C cần điều kiện đặc biệt (DevTools giả lập mạng, VoiceOver, dừng backend…). Ba mục có thể khác giữa trình duyệt nhưng chưa chạy lại (GUI-01-12, GUI-03-04, GUI-03-06) được ghi rõ là chưa chạy.

### 4.4 Bảng tổng hợp (22 mục nhóm A)

| ID | Mục kiểm tra | Task 1 | CH | FF | SF |
|---|---|---|---|---|---|
| GUI-01-02 | Chữ ở màn Login là tiếng Việt | Failed | Failed | Failed | Failed |
| GUI-01-03 | Nhãn, nút, cột bảng là tiếng Việt | Failed | Failed | Failed | Failed |
| GUI-01-04 | Thông báo lỗi tiếng Việt, không có chuỗi kỹ thuật | Failed | Failed | Failed | Failed |
| GUI-01-09 | Cột Giá theo định dạng vi-VN | Failed | Failed | Failed | Failed |
| GUI-01-10 | Số tiền không đổi theo ngôn ngữ trình duyệt | Failed | Failed | Failed | Failed |
| GUI-01-11 | Thứ tự Tab ở Login | Passed | Passed | Passed | Passed |
| GUI-01-13 | Menu và Đăng xuất dùng được bằng bàn phím | Failed | Failed | Failed | Failed |
| GUI-01-14 | Viền focus nhìn thấy rõ | Passed | Passed | Passed | Passed |
| GUI-01-15 | Bố cục không vỡ ở màn hình hẹp | Failed | Failed | Failed | Failed |
| GUI-01-16 | Phóng to 200% vẫn dùng được | Failed | Passed | Passed | Passed |
| GUI-01-17 | Đọc được khi bật dark mode | Passed | Passed | Passed | Passed |
| GUI-01-21 | Tiêu đề tab mô tả màn đang mở | Failed | Failed | Failed | Failed |
| GUI-02-07 | Ô Mật khẩu che ký tự | Passed | Passed | Passed | Passed |
| GUI-02-08 | Để trống trường bắt buộc ở Login thì không gửi | Failed | Failed | Failed | Failed |
| GUI-02-11 | Tên sản phẩm bắt buộc | Failed | Passed | Passed | Passed |
| GUI-02-13 | Giá là số nguyên > 0 (thử 1000.5) | Failed | Failed | Failed | Failed |
| GUI-02-17 | Ô chọn file chỉ nhận .csv | Failed | Failed | Failed | Failed |
| GUI-02-21 | Đơn tối thiểu ≥ 0, số lần ≥ 1 | Failed | Failed | Failed | Failed |
| GUI-02-22 | Ngày hết hạn phải sau hôm nay | Failed | Failed | Failed | Failed |
| GUI-02-24 | Cuộn chuột trên ô số không đổi giá trị | Failed | **Failed** | **Passed** | **Passed** |
| GUI-04-06 | Hộp thoại xác nhận trước khi xóa | Failed | Failed | Failed | Failed |
| GUI-04-10 | Tài khoản không phải admin nhận thông báo rõ | Passed | Passed | Passed | Passed |
| | **Tổng** | 5 P / 17 F | 7 P / 15 F | 8 P / 14 F | 8 P / 14 F |

Ghi chú khi đọc bảng:
- **GUI-01-16 và GUI-02-11** khác Task 1 không phải do trình duyệt: Task 3 chỉ kiểm phần nhìn thấy được ở từng trình duyệt (zoom 200% ở màn Login / Mã giảm giá; để trống Tên thì có bong bóng `required`). Lỗi Task 1 tìm thấy ở màn hoặc trường hợp khác vẫn giữ nguyên: ở 200%, nút "Import…" của màn Sản phẩm bị cắt mép phải; để trống Giá vẫn lưu được sản phẩm.
- **GUI-02-21**: cả 3 trình duyệt đều chặn Số lần = 0 bằng bong bóng của trình duyệt, nhưng Đơn tối thiểu = -1 vẫn được lưu (mã QA3 hiện "-1 ₫" trên Firefox và Safari).
- Thông báo của trình duyệt khác nhau về ngôn ngữ: Chrome và Safari hiện tiếng Anh ("Please fill out this field.", "Value must be greater than or equal to 1."), Firefox hiện tiếng Việt ("Vui lòng điền vào trường này.", "Vui lòng chọn một giá trị không nhỏ hơn 1.") vì giao diện Firefox là tiếng Việt. Ứng dụng không tự đặt thông báo nên ngôn ngữ phụ thuộc trình duyệt.

### 4.5 Hai khác biệt giữa các trình duyệt

**1. Định dạng số tiền đổi theo ngôn ngữ trình duyệt (GUI-01-10) — bổ sung vào BUG-19 ([#136](https://github.com/Taylor3691/eshop-sut/issues/136))**

Cùng dữ liệu seed, bảng Mã giảm giá hiển thị:

| Trình duyệt | Đơn tối thiểu của SAVE10 |
|---|---|
| Chrome | 300,000 ₫ |
| Firefox (giao diện tiếng Việt) | 300.000 ₫ |
| Safari | 300,000 ₫ |

Nguyên nhân: giao diện gọi `toLocaleString()` không truyền locale, nên định dạng lấy theo ngôn ngữ của trình duyệt. Người dùng Chrome/Safari tiếng Anh thấy dấu phẩy, trái với yêu cầu định dạng vi-VN `1.234.567 ₫`. Cột Giá ở màn Sản phẩm thì in thô `30000000 ₫` trên cả 3 trình duyệt. Đề xuất: dùng `toLocaleString('vi-VN')` (hoặc `Intl.NumberFormat('vi-VN')`) ở mọi chỗ hiển thị tiền.

Ảnh: `chrome/GUI-01-10-2_CH.png`, `firefox/GUI-01-10-2_FF.png`, `safari/GUI-01-10-2_SF.png`.

**2. Cuộn chuột trên ô số làm đổi giá trị, chỉ xảy ra trên Chrome (GUI-02-24) — bổ sung vào BUG-31 ([#148](https://github.com/Taylor3691/eshop-sut/issues/148))**

Nhập 100000 vào ô Giá, giữ con trỏ trên ô và cuộn chuột lên 3 nấc:

| Trình duyệt | Kết quả |
|---|---|
| Chrome | 100000 → 100003 (giá trị bị đổi) |
| Firefox | giữ 100000 |
| Safari | giữ 100000 (cùng sự kiện cuộn đó vẫn cuộn được trang) |

Đây là hành vi mặc định của Chrome với `<input type="number">` đang được focus. Người quản trị có thể vô tình lưu sai giá khi cuộn trang lúc con trỏ nằm trên ô số. Đề xuất: chặn sự kiện `wheel` trên các ô số (hoặc bỏ focus ô khi cuộn) để hành vi thống nhất giữa các trình duyệt.

Ảnh: `chrome/GUI-02-24_CH.png`, `firefox/GUI-02-24_FF.png`, `safari/GUI-02-24_SF.png`.

Không có bug mới chỉ xuất hiện trên Firefox hoặc Safari; hai khác biệt trên được ghi bổ sung vào bug đã có từ Task 1 thay vì tạo bug trùng.
## 5. Agent Skills
## 6. Kết luận
## Phụ lục: AI Audit Report, AI Critique, Git log
