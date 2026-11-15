# Task 1 — Phân tích & Thiết kế GUI Checklist (EShop Web)

- **MSSV:** `23120146`
- **Màn hình chính:** Hồ sơ cá nhân (`/profile`)
- **Màn hình phụ:** Đăng ký tài khoản (`/register`), Quên mật khẩu (`/forgot-password`)
- **Tài liệu đối chiếu (Test Oracle):** [`README.md`](../README.md) (`FR-01`, `FR-03`, `FR-04`, `FR-05`, `FR-10`, `FR-11`, `FR-21`–`FR-24`, `SEC-04`, `SEC-06`, `SEC-07`)
- **Mã nguồn giao diện đã kiểm tra:** [`App.jsx`](../frontend-web/src/App.jsx), [`AuthContext.jsx`](../frontend-web/src/context/AuthContext.jsx), [`index.html`](../frontend-web/index.html), [`Profile.jsx`](../frontend-web/src/pages/Profile.jsx), [`Register.jsx`](../frontend-web/src/pages/Register.jsx), [`ForgotPassword.jsx`](../frontend-web/src/pages/ForgotPassword.jsx)
- **File Excel đính kèm:** [`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx)

> **Trạng thái thực thi (Browser Agent — Chrome DevTools):** Đã thực thi đủ **52/52 mục** trên `http://localhost:5173` (kết hợp Web Admin `http://localhost:5174` để tạo đủ 5 trạng thái đơn hàng): **12 Passed**, **40 Failed**, **0 Pending**. Cột `Notes` chỉ ghi nguyên nhân cho các mục `Failed` (theo quy tắc của skill `gui-checklist-eshop`); cột `Screenshot` đã gắn đường dẫn ảnh PNG tương ứng trong [`screenshots/`](./screenshots) cho riêng 40 mục `Failed`.

---

## 1. Phân tích Đặc tả & Mã nguồn Giao diện (Scope & Code Inspection)

### 1.1. Thành phần dùng chung (Shared Shell) — `index.html`, `App.jsx`, `AuthContext.jsx`
- **Khung HTML (`frontend-web/index.html`):** Hiện đặt `<html lang="en">` và `<title>frontend-web</title>` cố định cho mọi route.
- **Thanh điều hướng (`Header` trong `App.jsx`):**
  - Brand link `"EShop"` trỏ về `/`, link `"Giỏ hàng"` trỏ về `/cart` (lấy `cart` từ `useCart()` nhưng chưa hiển thị badge đếm số lượng theo `FR-23`).
  - Khi đã đăng nhập: link `/profile` luôn giữ lớp `text-yellow-300` trên nền `bg-blue-600` (không có logic highlight theo route đang chọn) và render tên user bằng `dangerouslySetInnerHTML={{ __html: \`Chào, ${user.name}\` }}` (`SEC-04`); nút đăng xuất mang nhãn `"Thoát"` thay vì `"Đăng xuất"` (`FR-23`).
  - Khi chưa đăng nhập: hiển thị link `"Đăng nhập"` (`/login`) và `"Đăng ký"` (`/register`), không highlight route hiện tại.
- **Trạng thái phiên (`AuthContext.jsx`):** Khi có `token` trong `localStorage`, gọi `GET /api/users/me` nhưng chưa có biến `loading`, dẫn đến nháy trạng thái chưa đăng nhập khi tải lại `/profile`.

### 1.2. Màn hình chính: Hồ sơ cá nhân (`/profile`) — `Profile.jsx`
- **URL & Mục đích:** `http://localhost:5173/profile` — cho phép người dùng đã đăng nhập xem/cập nhật thông tin cá nhân (`FR-04`) và xem/hủy lịch sử đơn hàng của mình (`FR-10`, `FR-11`).
- **Form & Trường nhập liệu:**
  - `Email (Không đổi)`: `<input type="text" disabled />` hiển thị `user.email`.
  - `Họ Tên`: `<input type="text" required />` (thiếu dấu `*`, `<label>` thiếu `htmlFor`).
  - `Số điện thoại`: `<input type="text" placeholder="VD: 0912345678" />` (hàm `handleUpdate` kiểm tra regex `/^[1-9][0-9]{8,9}$/`, không khớp đặc tả `FR-04` yêu cầu bắt đầu bằng `0` và dài 10–11 chữ số).
  - `Địa chỉ giao hàng`: `<textarea>` cho địa chỉ mặc định.
  - Không có input chỉnh sửa `role` trên giao diện (`FR-04`, `SEC-06`).
- **Nút bấm, Bảng & Điều hướng:**
  - Tiêu đề khối dùng `<h2>` (`"Hồ sơ của bạn"`, `"Lịch sử đơn hàng"`), không có thẻ `<h1>` (`FR-21`).
  - Nút `"Cập nhật"` dùng màu xanh dương (`bg-blue-600`).
  - Bảng `Lịch sử đơn hàng` có 5 cột (`Mã ĐH`, `Ngày đặt`, `Tổng tiền`, `Trạng thái`, `Thao tác`), chưa có lớp bọc `overflow-x-auto`. Ngày dùng `toLocaleDateString()`, tiền dùng `toLocaleString() ₫`, trạng thái ánh xạ 5 badge màu qua `statusStyle`/`statusLabel`.
  - Nút `"Hủy đơn"` (`bg-red-500`) hiển thị với mọi trạng thái trừ `delivered` và `canceled` (bao gồm cả `shipping`, trái với `FR-10`), bấm vào gọi thẳng `PUT /api/orders/:id/cancel` không qua hộp thoại xác nhận.
- **Trạng thái bất đồng bộ:**
  - Chưa đăng nhập (`!user`): chỉ hiển thị `<div className="text-center mt-10">Vui lòng đăng nhập</div>`, không tự chuyển hướng và không có link sang `/login`.
  - Chưa có loading indicator cho `fetchOrders` và submit cập nhật; Empty State chỉ có `<p>Bạn chưa có đơn hàng nào.</p>` (thiếu icon/minh họa theo `FR-24`); thông báo dùng `window.alert()`, không cập nhật lại `user.name` trên Header sau khi lưu.

### 1.3. Màn hình phụ 1: Đăng ký tài khoản (`/register`) — `Register.jsx`
- **URL & Mục đích:** `http://localhost:5173/register` — đăng ký tài khoản khách hàng mới (`FR-01`).
- **Form & Trường nhập liệu:**
  - `Họ Tên` (`type="text"`, `required`), `Email` (`type="text"` thay vì `type="email"`, `required`), `Mật khẩu` (`type="password"`, `required`, kèm gợi ý màu `text-gray-400`).
  - Thiếu ký hiệu `*` cho các trường bắt buộc, thiếu `htmlFor`, **không có trường `Xác nhận mật khẩu`** (`FR-01`), và regex mật khẩu mạnh dùng `(?=.*\s)[A-Za-z\d\s]{8,}` (bắt buộc khoảng trắng, từ chối ký tự đặc biệt).
- **Nút bấm & Điều hướng:**
  - Tiêu đề dùng `<h2>` (`"Đăng Ký Tài Khoản"`), không có `<h1>`.
  - Nút submit `"Đăng Ký"` dùng màu đỏ (`bg-red-500`) thay vì xanh dương (`FR-21`).
  - Có link `"Đăng nhập"` (`/login`).
- **Trạng thái bất đồng bộ:**
  - Hộp lỗi `{error}` đặt trên đầu form (không nằm ngay phía trên nút submit theo `FR-22`). Chưa có loading/disable nút khi gọi `POST /api/register`; thành công điều hướng thẳng tới `/login` qua `navigate('/login')`.

### 1.4. Màn hình phụ 2: Quên mật khẩu (`/forgot-password`) — `ForgotPassword.jsx`
- **URL & Mục đích:** `http://localhost:5173/forgot-password` — lấy mã OTP và đặt lại mật khẩu theo quy trình 2 bước (`FR-03`).
- **Form & Trường nhập liệu:**
  - **Bước 1 (`step === 1`):** `Nhập Email của bạn` (`type="text"`, `required`). Thiếu `type="email"`, thiếu `*`, thiếu Step Indicator (`"Bước 1 / 2"`).
  - **Bước 2 (`step === 2`):** Hiển thị `Mã OTP của bạn là: ...` (backend [`server.js`](../backend/server.js#L72) tạo OTP 4 chữ số `1000–9999` trong khi `FR-03` quy định 6 chữ số), trường `Mã OTP (4 số)` (`type="text"`, `required`) và `Mật khẩu mới` (`type="password"`, `required`, dùng regex mật khẩu lỗi như `/register`). Thiếu trường **`Xác nhận mật khẩu mới`**, thiếu `*`, thiếu Step Indicator (`"Bước 2 / 2"`).
- **Nút bấm & Điều hướng:**
  - Tiêu đề dùng `<h2>` (`"Quên Mật Khẩu"`), không có `<h1>`.
  - Bước 1 có nút `"Lấy mã OTP"` (`bg-blue-600`) nhưng **thiếu nút/link `"Quay lại đăng nhập"`** (`FR-03`, dù `Link` đã import).
  - Bước 2 dùng cùng màu `bg-green-600` cho cả hai nút `"Đặt lại mật khẩu"` (`submit`) và `"← Quay lại"` (quay về Bước 1).
- **Trạng thái bất đồng bộ:**
  - Mọi thông báo lỗi và thành công ở cả 2 bước đều dùng `window.alert()`, không hiển thị lỗi phía trên nút submit (`FR-22`) và chưa có loading state.

> **Ghi chú phạm vi `FR-24` (ảnh sản phẩm):** Ba màn hình `/profile`, `/register`, `/forgot-password` không hiển thị danh sách hay ảnh sản phẩm; yêu cầu `alt` chỉ áp dụng nếu dùng thẻ `<img>` minh họa cho Empty State trên `/profile`.

---

## 2. Bảng GUI Checklist Khởi tạo bởi AI (44 mục, `IA-01` → `IA-04`)

| ID | Aspect | Screen | Check Item | Expected Result (Oracle) | Requirement Ref | Origin | Status | Notes | Screenshot |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| GUI-01 | IA-01 | Profile | Kiểm tra số lượng thẻ `<h1>` trên `/profile` | Trang có đúng 1 thẻ `<h1>` mô tả nội dung trang (Hồ sơ cá nhân) | FR-21, FR-05 | AI | Failed | Trang /profile có 0 thẻ `<h1>`; hai tiêu đề khối "Hồ sơ của bạn" và "Lịch sử đơn hàng" đang dùng thẻ `<h2>` (24px). | screenshots/GUI-01.png |
| GUI-02 | IA-01 | Register | Kiểm tra số lượng thẻ `<h1>` trên `/register` | Trang có đúng 1 thẻ `<h1>` mô tả nội dung trang ("Đăng Ký Tài Khoản") | FR-21, FR-05 | AI | Failed | Trang /register có 0 thẻ `<h1>`; tiêu đề "Đăng Ký Tài Khoản" đang dùng thẻ `<h2>` (24px). | screenshots/GUI-02.png |
| GUI-03 | IA-01 | ForgotPassword | Kiểm tra số lượng thẻ `<h1>` trên `/forgot-password` | Trang có đúng 1 thẻ `<h1>` mô tả nội dung trang ("Quên Mật Khẩu") | FR-21, FR-05 | AI | Failed | Trang /forgot-password có 0 thẻ `<h1>` ở cả Bước 1 và Bước 2; tiêu đề "Quên Mật Khẩu" đang dùng thẻ `<h2>` (24px). | screenshots/GUI-03.png |
| GUI-04 | IA-01 | Profile | Kiểm tra tính nhất quán ngôn ngữ tiếng Việt trên `/profile` và Header | Toàn bộ tiêu đề, nhãn form, bảng đơn hàng, trạng thái, nút và thông báo dùng tiếng Việt nhất quán (trừ thuật ngữ chuẩn như Email) | FR-21, FR-11 | AI | Passed |  |  |
| GUI-05 | IA-01 | Profile | Kiểm tra màu sắc ngữ nghĩa của nút `"Cập nhật"` và nút `"Hủy đơn"` trên `/profile` | Nút hành động tích cực `"Cập nhật"` dùng màu xanh dương; nút hành động nguy hiểm `"Hủy đơn"` dùng màu đỏ | FR-21 | AI | Passed |  |  |
| GUI-06 | IA-01 | Register | Kiểm tra màu sắc nút submit `"Đăng Ký"` trên `/register` | Nút hành động tích cực `"Đăng Ký"` phải dùng màu xanh dương (không dùng màu đỏ) | FR-21 | AI | Failed | Nút submit "Đăng Ký" trên /register dùng màu đỏ bg-red-500 (rgb(239, 68, 68)) thay vì màu xanh dương cho hành động tích cực (FR-21). | screenshots/GUI-06.png |
| GUI-07 | IA-01 | ForgotPassword | Kiểm tra màu sắc nút submit (`"Lấy mã OTP"`, `"Đặt lại mật khẩu"`) và nút phụ (`"← Quay lại"`) | Nút submit chính dùng màu xanh dương; nút quay lại/phụ phân biệt trực quan rõ với nút hành động chính | FR-21 | AI | Failed | Ở Bước 2 /forgot-password, cả nút submit chính "Đặt lại mật khẩu" và nút phụ "← Quay lại" đều dùng cùng màu xanh lá bg-green-600 (rgb(22, 163, 74)), không phân biệt cấp độ và không dùng xanh dương. | screenshots/GUI-07.png |
| GUI-08 | IA-01 | Profile | Kiểm tra định dạng đơn vị tiền ở cột `Tổng tiền` trong Lịch sử đơn hàng | Số tiền phân cách hàng nghìn đúng chuẩn và luôn có ký hiệu `₫` (không dùng `VND` hoặc thiếu `₫`) | FR-21 | AI | Passed |  |  |
| GUI-09 | IA-01 | Profile | Kiểm tra nhãn tiếng Việt và màu sắc badge cho cả 5 trạng thái đơn hàng | Hiển thị đúng tiếng Việt ("Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao", "Đã hủy") và màu badge phân biệt rõ ràng | FR-11 | AI | Passed |  |  |
| GUI-10 | IA-01 | Profile | Kiểm tra thứ tự Tab (Tab Order) trên `/profile` | Focus di chuyển từ trên xuống dưới, trái sang phải: từ form Hồ sơ → nút `"Cập nhật"` → các nút `"Hủy đơn"` trong bảng | FR-21 | AI | Passed |  |  |
| GUI-11 | IA-01 | Register | Kiểm tra bố cục responsive ở desktop (`1280x800`) và mobile (`375x812`) trên cả 3 màn hình | Khung form căn giữa, không tràn khung; 2 khối trên `/profile` xếp dọc hợp lý trên mobile, chữ không bị cắt | FR-21 | AI | Failed | Trên /profile ở mobile 375x812 khi có đơn hàng, bảng Lịch sử đơn hàng gây tràn ngang toàn trang (docScrollWidth: 397 > docClientWidth: 375). (/register và /forgot-password không tràn). | screenshots/GUI-11.png |
| GUI-12 | IA-02 | Profile | Kiểm tra ký hiệu bắt buộc `*` cho trường `Họ Tên` trên `/profile` | Nhãn trường bắt buộc `Họ Tên` có ký hiệu `*` bên cạnh | FR-22, FR-04 | AI | Failed | Nhãn trường bắt buộc "Họ Tên" (và các nhãn khác) trên /profile không có ký hiệu * dù input có thuộc tính required. | screenshots/GUI-12.png |
| GUI-13 | IA-02 | Profile | Kiểm tra trạng thái chỉ đọc của trường `Email` trên `/profile` | Ô Email bị khóa (`disabled`/read-only), người dùng không thể sửa hoặc đổi email qua giao diện | FR-04 | AI | Passed |  |  |
| GUI-14 | IA-02 | Profile | Kiểm tra chấp nhận Số điện thoại hợp lệ theo chuẩn Việt Nam trên `/profile` (vd `0912345678`, 10–11 số bắt đầu bằng `0`) | Hệ thống chấp nhận SĐT bắt đầu bằng `0` dài 10–11 chữ số và cho phép lưu thành công | FR-04 | AI | Failed | Nhập SĐT Việt Nam hợp lệ "0912345678" (trùng ngay placeholder "VD: 0912345678") bị chặn ở client với alert "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số..", không gửi PUT /api/users/me. | screenshots/GUI-14.png |
| GUI-15 | IA-02 | Profile | Kiểm tra từ chối Số điện thoại sai định dạng (không bắt đầu bằng `0`, < 10 hoặc > 11 chữ số, chứa chữ) | Hệ thống chặn lưu và hiển thị lỗi rõ ràng **trên** nút `"Cập nhật"` | FR-04, FR-22 | AI | Failed | SĐT sai đặc tả FR-04 "912345678" (9 chữ số không bắt đầu bằng 0) lại được chấp nhận và lưu (PUT /api/users/me 200); SĐT ngắn "12345" báo lỗi qua window.alert() thay vì hiển thị phía trên nút "Cập nhật". | screenshots/GUI-15.png |
| GUI-16 | IA-02 | Profile | Kiểm tra không cho phép người dùng tự chỉnh sửa `role` trên giao diện `/profile` | Form hồ sơ chỉ cho sửa Họ Tên, SĐT, Địa chỉ giao hàng; không có trường hay payload cho phép đổi `role` | FR-04, SEC-06 | AI | Passed |  |  |
| GUI-17 | IA-02 | Register | Kiểm tra ký hiệu `*` bên cạnh nhãn tất cả trường bắt buộc trên `/register` | Các trường `Họ Tên`, `Email`, `Mật khẩu`, `Xác nhận mật khẩu` đều có dấu `*` bên cạnh nhãn | FR-22, FR-01 | AI | Failed | Tất cả nhãn trên /register ("Họ Tên", "Email", "Mật khẩu") đều thiếu ký hiệu *, và thiếu hoàn toàn trường "Xác nhận mật khẩu". | screenshots/GUI-17.png |
| GUI-18 | IA-02 | Register | Kiểm tra thuộc tính HTML5 `type` của ô `Email` và `Mật khẩu` trên `/register` | Ô Email dùng `type="email"` (validate định dạng); ô Mật khẩu dùng `type="password"` (che ký tự) | FR-22, FR-01 | AI | Failed | Ô Email trên /register dùng type="text" thay vì type="email", nên nhập "invalid-email" không bị HTML5 validation chặn. | screenshots/GUI-18.png |
| GUI-19 | IA-02 | Register | Kiểm tra trường `Xác nhận mật khẩu` trên `/register` | Form có ô `Xác nhận mật khẩu` (`type="password"`) và báo lỗi từ chối khi nhập khác `Mật khẩu` | FR-01 | AI | Failed | Form /register chỉ có 3 ô nhập liệu, thiếu trường "Xác nhận mật khẩu" theo yêu cầu FR-01. | screenshots/GUI-19.png |
| GUI-20 | IA-02 | Register | Kiểm tra validation mật khẩu mạnh theo `FR-01` trên `/register` (≥ 8 ký tự, hoa, thường, số, ký tự đặc biệt `@$!%*?&`) | Mật khẩu hợp lệ (vd `Test1234!`) không bị từ chối; mật khẩu yếu (thiếu hoa/thường/số/ký tự đặc biệt hoặc < 8 ký tự) bị báo lỗi | FR-01 | AI | Failed | Regex mật khẩu trên /register từ chối mật khẩu mạnh hợp lệ FR-01 "Test1234!" ("Mật khẩu quá yếu!..."), nhưng lại chấp nhận "Test 1234" (chứa khoảng trắng, không có ký tự đặc biệt). | screenshots/GUI-20.png |
| GUI-21 | IA-02 | Register | Kiểm tra vị trí hiển thị thông báo lỗi trên form `/register` | Thông báo lỗi xuất hiện **phía trên** nút submit `"Đăng Ký"`, không đặt sai vị trí hoặc dưới nút submit | FR-22 | AI | Failed | Khung báo lỗi trên /register (div.bg-red-100) hiển thị ở đầu card ngay dưới `<h2>` và phía trên các ô nhập, không nằm ngay phía trên nút submit "Đăng Ký" (FR-22). | screenshots/GUI-21.png |
| GUI-22 | IA-02 | ForgotPassword | Kiểm tra hiển thị chỉ báo bước (Step Indicator) trên `/forgot-password` | Hiển thị rõ ràng chỉ báo tiến trình 2 bước (vd `"Bước 1 / 2"` ở bước lấy OTP và `"Bước 2 / 2"` ở bước đặt lại mật khẩu) | FR-03, FR-22 | AI | Failed | Trang /forgot-password không hiển thị chỉ báo bước (Step Indicator như "Bước 1 / 2", "Bước 2 / 2") ở cả Bước 1 lẫn Bước 2. | screenshots/GUI-22.png |
| GUI-23 | IA-02 | ForgotPassword | Kiểm tra input Bước 1 & Bước 2 trên `/forgot-password` (`Email`, `Mã OTP`, `Mật khẩu mới`, `Xác nhận mật khẩu mới`) | Email dùng `type="email"`, Mật khẩu mới & Xác nhận dùng `type="password"`, có `*` cho trường bắt buộc, nhãn OTP khớp đặc tả 6 chữ số | FR-03, FR-22 | AI | Failed | Bước 1 dùng Email type="text"; tất cả nhãn ở Bước 1 & 2 thiếu *; nhãn OTP ghi "Mã OTP (4 số)" thay vì 6 chữ số; Bước 2 thiếu trường "Xác nhận mật khẩu mới". | screenshots/GUI-23.png |
| GUI-24 | IA-02 | ForgotPassword | Kiểm tra validation Bước 2 và vị trí thông báo lỗi trên `/forgot-password` | Kiểm tra đủ điều kiện mật khẩu mạnh `FR-01`, khớp `Xác nhận mật khẩu mới`, và lỗi xuất hiện **phía trên** nút submit (không dùng `alert()`) | FR-03, FR-22 | AI | Failed | Bước 2 /forgot-password thiếu "Xác nhận mật khẩu mới", từ chối mật khẩu hợp lệ "NewPass1!" bằng window.alert() (dấu chấm đôi ".."), và báo lỗi OTP sai qua alert() thay vì hiển thị phía trên nút submit. | screenshots/GUI-24.png |
| GUI-25 | IA-03 | Shared (Header) | Kiểm tra highlight trạng thái đang chọn (active state) trên Navbar khi mở `/profile` và `/register` | Link tương ứng với trang đang mở trên Navbar được highlight phân biệt với các link khác; khi ở trang khác thì không sáng sai | FR-23 | AI | Failed | Trên Navbar khi ở /register, link "Đăng ký" không có highlight hay aria-current khác biệt với "Đăng nhập"; khi đã đăng nhập, link "Chào, ..." giữ tĩnh màu text-yellow-300 ngay cả khi đã quay về trang chủ /. | screenshots/GUI-25.png |
| GUI-26 | IA-03 | Shared (Header) | Kiểm tra hiển thị badge số lượng sản phẩm trên link `"Giỏ hàng"` tại Navbar | Link `"Giỏ hàng"` hiển thị badge đếm chính xác tổng số lượng/mục đang có trong giỏ | FR-23 | AI | Failed | Link "Giỏ hàng" trên Header không hiển thị badge số lượng sản phẩm cả khi giỏ trống lẫn khi đã thêm 1 sản phẩm (iPhone 15 Pro Max) vào giỏ. | screenshots/GUI-26.png |
| GUI-27 | IA-03 | Shared (Header) | Kiểm tra nhãn nút đăng xuất trên Navbar | Nút đăng xuất hiển thị chính xác nhãn `"Đăng xuất"` (không dùng `"Thoát"`) | FR-23 | AI | Failed | Nút đăng xuất trên Navbar hiển thị nhãn "Thoát" thay vì "Đăng xuất" theo yêu cầu FR-23. | screenshots/GUI-27.png |
| GUI-28 | IA-03 | Shared (Header) | Kiểm tra hành vi sau khi bấm nút đăng xuất khi đang ở `/profile` | Xóa JWT token khỏi client, cập nhật Navbar về `"Đăng nhập"` / `"Đăng ký"`, không còn hiển thị dữ liệu hồ sơ/đơn hàng cũ | FR-02, FR-23 | AI | Passed |  |  |
| GUI-29 | IA-03 | Profile | Kiểm tra kiểm soát truy cập (Auth Guard) khi mở `/profile` ở trạng thái chưa đăng nhập | Không hiển thị form hồ sơ/đơn hàng; điều hướng về `/login` hoặc hiển thị thông báo rõ kèm link chuyển nhanh tới `/login` | FR-04, FR-11 | AI | Failed | Truy cập trực tiếp /profile khi chưa đăng nhập không chuyển hướng sang /login và chỉ hiện dòng chữ "Vui lòng đăng nhập" với 0 link/nút chuyển tới trang đăng nhập. | screenshots/GUI-29.png |
| GUI-30 | IA-03 | Profile | Kiểm tra điều hướng từ Header tên người dùng vào `/profile` và quay về `/` qua logo `EShop` | Bấm tên user ở Navbar vào đúng `/profile`; bấm logo `EShop` quay lại `/` mượt mà không mất phiên đăng nhập | FR-23 | AI | Passed |  |  |
| GUI-31 | IA-03 | Register | Kiểm tra link `"Đăng nhập"` trên `/register` và điều hướng sau khi đăng ký thành công | Link `"Đăng nhập"` mở đúng `/login`; sau khi đăng ký thành công hệ thống tự chuyển tới `/login` | FR-01 | AI | Passed |  |  |
| GUI-32 | IA-03 | ForgotPassword | Kiểm tra nút/link `"Quay lại đăng nhập"` ở Bước 1 của `/forgot-password` | Có nút/link `"Quay lại đăng nhập"` rõ ràng tại Bước 1 và bấm vào chuyển đúng về `/login` | FR-03 | AI | Failed | Bước 1 trên /forgot-password không có nút hoặc liên kết "Quay lại đăng nhập" (0 thẻ `<a>` trong main, chỉ có nút "Lấy mã OTP"). | screenshots/GUI-32.png |
| GUI-33 | IA-03 | ForgotPassword | Kiểm tra nút `"← Quay lại"` ở Bước 2 và điều hướng sau khi đặt lại mật khẩu thành công | Ở Bước 2, bấm quay lại trả về Bước 1 hợp lý; đặt lại mật khẩu thành công chuyển về `/login` | FR-03 | AI | Passed |  |  |
| GUI-34 | IA-03 | Profile | Kiểm tra ngữ cảnh trang con / Breadcrumb trên `/profile`, `/register`, `/forgot-password` | Có Breadcrumb hoặc chỉ dẫn quay lại trang trước/trang chủ rõ ràng (và đối chiếu phạm vi Breadcrumb của `FR-23`) | FR-23 | AI | Failed | Cả /profile, /register và /forgot-password đều có 0 breadcrumb (/profile cũng không có link quay lại trang chủ trong main; lưu ý FR-23 ghi bắt buộc ở Giỏ hàng, Thanh toán, Chi tiết sản phẩm). | screenshots/GUI-34.png |
| GUI-35 | IA-04 | Profile | Kiểm tra trạng thái Loading khi tải thông tin user (`/api/users/me`) và danh sách đơn (`/api/orders/my-orders`) lúc tải lại (F5) `/profile` | Hiển thị chỉ báo đang tải (loading/skeleton) trong lúc chờ API, không nháy màn hình `"Vui lòng đăng nhập"` hay báo trống giả | FR-24, FR-05 | AI | Failed | Khi F5 tải lại /profile lúc đã đăng nhập (quan sát dưới Slow 3G), không có spinner/skeleton loading và giao diện nháy tạm màn hình "Vui lòng đăng nhập" cùng Header chưa đăng nhập trước khi /api/users/me trả về. | screenshots/GUI-35.png |
| GUI-36 | IA-04 | Profile | Kiểm tra phản hồi trực quan khi cập nhật hồ sơ thành công/thất bại và đồng bộ tên lên Navbar | Hiển thị toast/banner trạng thái trực quan (tránh `alert()`), cập nhật ngay tên mới trên Header (`Chào, <Họ Tên>`) khi đổi Họ Tên | FR-24, FR-04 | AI | Failed | Cập nhật hồ sơ dùng window.alert("Cập nhật thành công!.") chặn trình duyệt thay vì toast/banner, và tên mới trên Header vẫn giữ giá trị cũ cho tới khi F5 tải lại trang. | screenshots/GUI-36.png |
| GUI-37 | IA-04 | Profile | Kiểm tra giao diện Empty State khi tài khoản chưa có đơn hàng nào trên `/profile` | Hiển thị icon/hình minh họa kèm thông báo thân thiện (kèm `alt` mô tả nếu dùng ảnh), không chỉ là văn bản thô đơn độc | FR-24 | AI | Failed | Empty State trong "Lịch sử đơn hàng" khi chưa có đơn chỉ hiển thị thẻ `<p>Bạn chưa có đơn hàng nào.</p>`, thiếu icon/hình minh họa và CTA điều hướng theo FR-24. | screenshots/GUI-37.png |
| GUI-38 | IA-04 | Profile | Kiểm tra điều kiện hiển thị nút `"Hủy đơn"` theo State Machine trên bảng Lịch sử đơn hàng | Nút `"Hủy đơn"` chỉ hiện với đơn `pending` ("Chờ xác nhận") và `confirmed` ("Đã xác nhận"); ẩn với `shipping` ("Đang giao"), `delivered`, `canceled` | FR-10 | AI | Failed | Trên bảng Lịch sử đơn hàng (/profile), đơn hàng ở trạng thái "Đang giao" (shipping, đơn #3) vẫn hiển thị nút "Hủy đơn" đang hoạt động (disabled=false), vi phạm FR-10 quy định user không được phép tự hủy khi đơn đã sang shipping. | screenshots/GUI-38.png |
| GUI-39 | IA-04 | Profile | Kiểm tra hộp thoại xác nhận trước khi hủy đơn hàng trên `/profile` | Bấm `"Hủy đơn"` mở dialog xác nhận trước khi gọi API; chọn hủy bỏ thao tác thì đơn hàng không đổi trạng thái | FR-24, FR-21 | AI | Failed | Bấm "Hủy đơn" gọi thẳng PUT /api/orders/1/cancel ngay lập tức mà không mở hộp thoại xác nhận trước khi hủy. | screenshots/GUI-39.png |
| GUI-40 | IA-04 | Profile | Kiểm tra cập nhật trạng thái UI ngay sau khi hủy đơn hàng thành công | Thông báo hủy thành công trực quan, dòng đơn chuyển sang badge đỏ `"Đã hủy"` và ẩn nút `"Hủy đơn"` ngay không cần F5 | FR-10, FR-24 | AI | Passed |  |  |
| GUI-41 | IA-04 | Register | Kiểm tra trạng thái đang gửi (loading/chống bấm đúp) và phản hồi lỗi trùng email/thành công trên `/register` | Nút `"Đăng Ký"` khóa/loading khi đang gọi API; email đã tồn tại báo lỗi rõ ràng trên form; thành công có phản hồi trực quan | FR-01, FR-24 | AI | Failed | Nút "Đăng Ký" không có trạng thái loading/disabled khi gửi API (0 DOM mutations); đăng ký trùng email "test@eshop.com" trả 200 OK (id: 3) thay vì báo lỗi trùng email; chuyển /login không có thông báo thành công. | screenshots/GUI-41.png |
| GUI-42 | IA-04 | ForgotPassword | Kiểm tra hiển thị OTP demo và phản hồi lỗi email chưa đăng ký ở Bước 1 của `/forgot-password` | Email hợp lệ chuyển Bước 2 và hiển thị OTP ngẫu nhiên **6 chữ số**; email không tồn tại báo lỗi rõ ràng trên UI | FR-03, FR-24 | AI | Failed | Bước 1 /forgot-password sinh và hiển thị OTP chỉ có 4 chữ số (vd 2567, 3217, 6183) thay vì 6 chữ số (FR-03, SEC-07); email không tồn tại báo lỗi qua window.alert("Lỗi: User not found."). | screenshots/GUI-42.png |
| GUI-43 | IA-04 | ForgotPassword | Kiểm tra trạng thái xử lý và báo lỗi khi nhập sai OTP, OTP đã dùng, hoặc OTP của email khác ở Bước 2 | Chống double-submit; báo lỗi rõ trên UI nếu sai OTP/đã hết hiệu lực/dùng chéo email; đổi thành công có phản hồi rõ ràng | FR-03, SEC-07, FR-24 | AI | Failed | Bước 2 /forgot-password không có trạng thái loading/disabled khi submit; nhập OTP sai "0000" báo lỗi qua window.alert("Mã OTP không đúng hoặc có lỗi xảy ra..") có dấu chấm đôi "..". | screenshots/GUI-43.png |
| GUI-44 | IA-04 | Shared (Header) | Kiểm tra hiển thị an toàn (escape HTML/XSS) cho `Họ Tên` trên Header và `Địa chỉ giao hàng` trên `/profile` | Chuỗi chứa thẻ HTML/script (vd `<b>Test</b>` hoặc `<img src=x onerror=alert(1)>`) hiển thị dạng text thuần, không render HTML hay chạy script | SEC-04, FR-04 | AI | Failed | Tên tài khoản chứa HTML "`<b>XSS23120146</b>`" được render trực tiếp thành thẻ `<b>` sống trong Header (`dangerouslySetInnerHTML`), vi phạm SEC-04; phần textarea địa chỉ trên /profile vẫn escape dạng text thuần. | screenshots/GUI-44.png |

---

## 3. Phân tích Điểm AI dễ bỏ sót & Các mục Gợi ý Bổ sung (`Human`)

### 3.1. Các nhóm điểm mù phổ biến của AI trên 3 màn hình
1. **Accessibility (A11y) ở mức DOM & WCAG:**
   - Thẻ `<label>` không gắn `htmlFor`/`id` tương ứng với `<input>`/`<textarea>`; thiếu kiểm tra tỷ lệ tương phản màu (vd `text-yellow-300` trên nền `bg-blue-600`, `text-gray-400` trên nền trắng).
2. **Edge cases hiển thị & tràn bố cục (Visual & Layout):**
   - Bảng 5 cột `Lịch sử đơn hàng` thiếu `overflow-x-auto` gây tràn ngang trên mobile (`320px–375px`) hoặc khi zoom 200%; tên user/email dài không có khoảng trắng đẩy vỡ Header; `window.alert()` chặn UI thread và mất focus bàn phím.
3. **Bản địa hóa tiếng Việt & đặc thù trình duyệt/OS (Localization & Domain):**
   - Khung `index.html` giữ `<html lang="en">` và `<title>frontend-web</title>`; `toLocaleDateString()` không chỉ định `'vi-VN'` dễ ra `MM/DD/YYYY` trên trình duyệt `en-US`; thiếu kiểm tra bộ gõ IME tiếng Việt và `autoComplete`/bàn phím ảo `@` khi Email bị đặt `type="text"`.
4. **Môi trường & Phiên làm việc (Environment / Session State):**
   - Chế độ High Contrast/Autofill của trình duyệt, và trạng thái hết hạn/thu hồi token (`401`/`403`) hoặc đăng xuất ở tab khác trong lúc người dùng đang chỉnh sửa form `/profile`.

### 3.2. Danh sách 8 mục bổ sung (`Origin = Human`) & Lý do AI bỏ sót

| ID | Aspect | Screen | Check Item | Expected Result (Oracle) | Requirement Ref | Origin | Status | Notes | Screenshot |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| GUI-45 | IA-02 | Profile, Register, ForgotPassword | Kiểm tra liên kết `htmlFor`/`id` giữa `<label>` và `<input>`/`<textarea>` trên cả 3 màn hình | Click vào chữ nhãn tự động focus đúng ô nhập tương ứng; screen reader đọc đúng tên trường và trạng thái `required` | WCAG 1.3.1 / 4.1.2 | Human | Failed | Toàn bộ `<label>` trên /register, /forgot-password và /profile đều thiếu thuộc tính for/htmlFor và input/textarea thiếu id; click vào chữ nhãn không focus ô nhập và DevTools báo lỗi "No label associated with a form field". | screenshots/GUI-45.png |
| GUI-46 | IA-01 | Shared (Header) & Register | Kiểm tra độ tương phản màu (WCAG AA ≥ 4.5:1) của link vàng `text-yellow-300` trên nền `bg-blue-600` và text gợi ý `text-gray-400` trên nền trắng | Tỷ lệ tương phản chữ thường đạt tối thiểu 4.5:1, đọc rõ ở màn hình độ sáng thấp và chế độ High Contrast | WCAG 1.4.3 | Human | Failed | Độ tương phản không đạt WCAG AA (>= 4.5:1): chữ gợi ý mật khẩu text-gray-400 trên nền trắng (/register) ~2.54:1; link Header text-yellow-300 trên nền bg-blue-600 ~3.92:1 (nút đỏ ~3.76:1, nút xanh lá ~3.30:1). | screenshots/GUI-46.png |
| GUI-47 | IA-01 | Profile | Kiểm tra tràn ngang của bảng 5 cột `Lịch sử đơn hàng` và Header khi tên/email dài trên mobile `320px–375px` hoặc Zoom 200% | Bảng có vùng cuộn ngang riêng (`overflow-x-auto`) hoặc xếp card hợp lý, không tạo thanh cuộn ngang cho toàn trang; tên dài không làm vỡ Navbar | WCAG 1.4.4 / 1.4.10 | Human | Failed | Ở mobile 375x812 khi có đơn hàng, card Lịch sử đơn hàng (343.2px, overflowX: visible) không bọc overflow-x-auto nên bảng 5 cột (355.7px) tràn ra ngoài card 37.3px và tràn viewport (docScrollWidth: 397). | screenshots/GUI-47.png |
| GUI-48 | IA-01 | Profile | Kiểm tra định dạng ngày đặt hàng (`DD/MM/YYYY`) và dấu phân cách tiền trên trình duyệt đặt ngôn ngữ mặc định `en-US` | Ngày đặt và số tiền giữ định dạng nhất quán theo chuẩn Việt Nam (`vi-VN`), không bị đảo `MM/DD/YYYY` phụ thuộc locale OS | FR-11, FR-21 | Human | Failed | Trên trình duyệt locale "en-US", cột "Ngày đặt" hiển thị "11/15/2026" theo định dạng Mỹ MM/DD/YYYY thay vì chuẩn Việt Nam DD/MM/YYYY. | screenshots/GUI-48.png |
| GUI-49 | IA-04 | Profile & ForgotPassword | Kiểm tra trải nghiệm bàn phím/screen reader khi thay thế hoặc kích hoạt thông báo lỗi/thành công (tránh `window.alert()`) | Thông báo không khóa luồng thao tác, giữ nguyên focus hợp lý hoặc đọc qua `role="alert"`/`aria-live`, hoạt động đồng nhất trên Chrome/Firefox/Safari/Mobile | WCAG 4.1.3, FR-22 | Human | Failed | Nhiều thao tác trên /profile và /forgot-password dùng window.alert() chặn luồng tương tác bàn phím/trình duyệt và chứa lỗi dấu câu kép (".. hoặc !.") trong nội dung thông báo. | screenshots/GUI-49.png |
| GUI-50 | IA-01 | Profile, Register, ForgotPassword | Kiểm tra thuộc tính `<html lang>` trong `index.html` và `<title>` tab trình duyệt theo từng route | `lang="vi"` khớp ngôn ngữ tiếng Việt và `<title>` phản ánh đúng màn hình đang mở | FR-21, WCAG 2.4.2 / 3.1.1 | Human | Failed | Cả 3 trang /register, /forgot-password, /profile đều giữ `<html lang="en">` và `<title>frontend-web</title>` cố định trong index.html, không khớp tiếng Việt và không phân biệt từng màn hình. | screenshots/GUI-50.png |
| GUI-51 | IA-02 | Register & ForgotPassword | Kiểm tra tương tác bộ gõ tiếng Việt (IME), Autofill trình duyệt và bàn phím ảo mobile khi nhập Họ Tên, Email, Mật khẩu | Ô Email kích hoạt gợi ý `@` trên bàn phím mobile (`type="email"` + `autoComplete`), gõ tiếng Việt có dấu ở Họ Tên/Địa chỉ không bị mất chữ hoặc lỗi giả | FR-22, UX Mobile | Human | Failed | Toàn bộ input trên cả 3 trang thiếu thuộc tính autocomplete, id, name (DevTools cảnh báo thiếu autocomplete/id/name), và Email trên /register và /forgot-password dùng type="text" gây bất lợi cho autofill/bàn phím mobile; gõ dấu tiếng Việt hiển thị đúng. | screenshots/GUI-51.png |
| GUI-52 | IA-04 | Profile | Kiểm tra xử lý khi mất mạng hoặc JWT hết hạn/đăng xuất từ tab khác lúc đang nhập liệu dở trên `/profile` | Khi bấm `"Cập nhật"` hoặc `"Hủy đơn"` với token hết hạn (`401`/`403`), hệ thống báo lỗi phiên đăng nhập rõ ràng và điều hướng an toàn thay vì báo lỗi chung chung | FR-02, FR-04 | Human | Failed | Sau khi bấm "Thoát" ở tab thứ 2 (xóa localStorage.token), tab /profile đang mở không đồng bộ hết phiên và bấm "Cập nhật" vẫn gửi JWT cũ trong bộ nhớ khiến PUT /api/users/me trả 200 OK và ghi đè DB. | screenshots/GUI-52.png |

#### Giải thích lý do AI bỏ sót từng mục (`GUI-45` → `GUI-52`)
- **`GUI-45` (`htmlFor`/`id`):** AI chỉ nhìn thấy thẻ `<label>` trong JSX nên mặc định coi là có nhãn, bỏ qua liên kết ngữ nghĩa DOM vốn chỉ bộc lộ khi click vào label hoặc chạy screen reader.
- **`GUI-46` (Tương phản WCAG):** AI chỉ kiểm màu theo ngữ nghĩa nghiệp vụ (`FR-21`: nút xanh/đỏ), không tự tính tỷ lệ tương phản hex của `text-yellow-300` trên `bg-blue-600` hay `text-gray-400` trên nền trắng nếu không yêu cầu kiểm WCAG.
- **`GUI-47` (Tràn bảng 5 cột & Zoom 200%):** AI thấy container ngoài có `md:flex-row` nên giả định trang đã responsive, bỏ qua việc `<table>` không có `overflow-x-auto` và chuỗi dài không khoảng trắng gây tràn ngang.
- **`GUI-48` (Locale `en-US` cho ngày/tiền):** AI mặc định tin vào `toLocaleDateString()` mà quên môi trường trình duyệt mặc định tiếng Anh sẽ hiển thị `MM/DD/YYYY`.
- **`GUI-49` (Hệ quả của `window.alert()`):** Khi đọc code happy-path, AI coi `alert()` là "có thông báo", bỏ qua việc hộp thoại native chặn UI thread, làm mất focus bàn phím và hiển thị khác biệt giữa các nền tảng.
- **`GUI-50` (`<html lang>` & `<title>`):** AI tập trung vào các file page trong `src/pages/` mà bỏ sót khung gốc `frontend-web/index.html`.
- **`GUI-51` (IME tiếng Việt & Autofill/bàn phím mobile):** AI kiểm tra `type="email"` theo quy tắc HTML5 validation tĩnh của `FR-22`, bỏ qua tác động thực tế tới bàn phím mobile, password manager và gõ dấu tiếng Việt.
- **`GUI-52` (Hết hạn phiên / đa tab giữa chừng):** AI thiết kế test cho 2 trạng thái tĩnh (đã đăng nhập hoặc chưa đăng nhập), bỏ sót trạng thái chuyển tiếp khi JWT hết hạn lúc đang nhập liệu.

---

## 4. Test Summary (Thực thi đủ 52/52 mục qua Browser Agent)

- **Screens Tested:** `/profile` (Chính), `/register` (Phụ), `/forgot-password` (Phụ)
- **Total Designed:** 52 (AI: 44, Human-added: 8)
- **Executed:** 52
- **Passed:** 12
- **Failed:** 40
- **Pending:** 0
- **Pass Rate:** 23.1% (`12 / 52`)

---

## 5. Nhắc nhở hoàn thiện trước khi nộp (Human Review & Task 3)
- **Human Review:** Tự kiểm tra lại toàn bộ 52 mục đã đánh dấu `Passed`/`Failed` trước khi chốt bản nộp.
- **Screenshot bằng chứng & GitHub Issues:** Đã lưu đủ 40 ảnh PNG cho 40 mục `Failed` trong [`screenshots/`](./screenshots) theo tên `<ID>.png` (12 mục `Passed` giữ trống theo quy tắc); bước tiếp theo là tạo **GitHub Issues** (đính kèm các ảnh này) và báo cáo lỗi Markdown.
- **Khôi phục DB mẫu (nếu cần):** Lượt chạy thử đã tạo user `test@eshop.com` trùng (`id: 3`), user `xss_empty_23120146@example.com`, cập nhật tên/SĐT của `test@eshop.com`, và tạo các đơn hàng `#1`–`#5` ở đủ 5 trạng thái — khởi động lại backend (`node server.js`) sẽ reset và seed lại DB theo [`AGENTS.md`](../AGENTS.md).
- **Task 3 Cross-Browser / Cross-Platform (≥ 3 nền tảng):** Khi chụp screenshot trên từng nền tảng (vd Chrome, Firefox, Safari/Android Chrome/Expo Go), đảm bảo ảnh chụp thấy rõ:
  1. Tên trình duyệt / OS / thiết bị và URL `localhost`
  2. Overlay username dạng **email sinh viên** (`§6 Task 3`)
  3. **MSSV và Họ tên đầy đủ** được nhập trong form của SUT (`§11 Anti-AI-Cheat`)
