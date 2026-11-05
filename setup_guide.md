# Hướng dẫn Cài đặt & Khởi chạy EShop (System Under Test)

Hệ thống EShop bao gồm 3 phân hệ chính: Backend API, Frontend Web và Frontend Mobile. Để kiểm thử toàn bộ hệ thống, bạn cần khởi chạy Backend và ít nhất một trong hai nền tảng Frontend.

## Yêu cầu Hệ thống (Prerequisites)
- Đã cài đặt **Node.js** (Phiên bản >= 18.x).
- Đã cài đặt trình quản lý gói `npm` (thường đi kèm với Node.js).
- (Tùy chọn) Ứng dụng **Expo Go** trên điện thoại (iOS/Android) nếu muốn chạy Frontend Mobile trên thiết bị thật.

---

## 1. Khởi chạy Backend API

Backend cung cấp dữ liệu và xử lý logic cho toàn bộ hệ thống.

1. Mở Terminal (Command Prompt / PowerShell / Terminal).
2. Di chuyển vào thư mục `backend`:
   ```bash
   cd EShop/backend
   ```
3. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
4. Khởi tạo cơ sở dữ liệu và dữ liệu mẫu (Seed Data). Chỉ cần chạy lệnh này một lần ở lần đầu tiên hoặc khi muốn reset dữ liệu:
   ```bash
   node database.js
   ```
5. Khởi chạy server:
   ```bash
   node server.js
   ```
   *Terminal sẽ thông báo: `Server is running on http://localhost:3000`.*
   *(Lưu ý: Bạn phải để Terminal này chạy liên tục trong suốt quá trình test).*

---

## 2. Khởi chạy Frontend Web

Frontend Web là giao diện chính để người dùng mua sắm qua trình duyệt.

1. Mở một cửa sổ Terminal MỚI.
2. Di chuyển vào thư mục `frontend-web`:
   ```bash
   cd EShop/frontend-web
   ```
3. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
4. Khởi chạy ứng dụng Web:
   ```bash
   npm run dev
   ```
   *Terminal sẽ cung cấp một đường link (ví dụ: `http://localhost:5173/`). Bạn hãy bấm vào hoặc copy dán vào trình duyệt để sử dụng.*

---

## 3. Khởi chạy Frontend Mobile (Expo)

Frontend Mobile cung cấp giao diện App trên điện thoại. (Lưu ý: Backend phải đang chạy ở bước 1).

1. Mở một cửa sổ Terminal MỚI.
2. Di chuyển vào thư mục `frontend-mobile`:
   ```bash
   cd EShop/frontend-mobile
   ```
3. Cài đặt các thư viện:
   ```bash
   npm install
   ```
4. Khởi chạy Metro Bundler của Expo:
   ```bash
   npx expo start
   ```
5. **Cách chạy App:**
   - Một mã QR Code sẽ hiện ra trên Terminal.
   - Sử dụng điện thoại tải app **Expo Go** (từ App Store hoặc Google Play).
   - Mở Expo Go và chọn quét mã QR (Scan QR Code) để mở ứng dụng.
   - *Lưu ý: Điện thoại và Máy tính phải dùng chung một mạng Wi-Fi.*
   
   *(Đối với máy ảo/Emulator, bạn có thể bấm phím `a` để mở trên Android Emulator hoặc `i` để mở trên iOS Simulator nếu đã cài đặt).*

---

## 4. Khởi chạy Web Admin (Dành cho Quản trị viên)

Đây là phân hệ Web mới được bổ sung trong Giai đoạn 2.

1. Mở một cửa sổ Terminal MỚI.
2. Di chuyển vào thư mục `frontend-admin`:
   ```bash
   cd EShop/frontend-admin
   ```
3. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
4. Khởi chạy ứng dụng Web Admin:
   ```bash
   npm run dev
   ```
   *Terminal sẽ cung cấp đường link `http://localhost:5174/`. Để đăng nhập, hãy sử dụng tài khoản Admin mặc định:*
   - **Email**: `admin@eshop.com`
   - **Mật khẩu**: `admin123`

---

## 5. Xử lý lỗi `Network request failed` trên Frontend Mobile

Frontend Mobile đang gọi API qua địa chỉ LAN được khai báo ở đầu file `frontend-mobile/App.js`:

```js
const API_URL = "http://192.168.10.13:3000/api";
```

Địa chỉ `192.168.10.13` chỉ hoạt động khi đó vẫn là IPv4 của máy đang chạy Backend. Làm lần lượt như sau:

1. Khởi chạy Backend và giữ cửa sổ Terminal này mở:
   ```bash
   cd backend
   node server.js
   ```
2. Trên máy tính, mở `http://localhost:3000/api/products` trong trình duyệt. Nếu Backend hoạt động, trình duyệt sẽ trả về một mảng JSON sản phẩm.
3. Chạy `ipconfig` và tìm dòng **IPv4 Address** của card Wi-Fi đang dùng, ví dụ `192.168.1.25`.
4. Nếu chạy bằng **điện thoại thật**, sửa `API_URL` thành IP vừa tìm được:
   ```js
   const API_URL = "http://192.168.1.25:3000/api";
   ```
   Không dùng `localhost` vì trên điện thoại, `localhost` chính là điện thoại chứ không phải máy tính.
5. Điện thoại và máy tính phải dùng cùng một mạng Wi-Fi. Không dùng mạng Guest có bật chế độ cô lập thiết bị.
6. Dùng trình duyệt trên điện thoại mở `http://<IP-máy-tính>:3000/api/products`. Nếu không mở được, cho phép Node.js hoặc cổng TCP `3000` qua Windows Defender Firewall đối với mạng **Private** rồi thử lại.
7. Nếu chạy bằng **Android Emulator**, dùng địa chỉ đặc biệt của máy chủ:
   ```js
   const API_URL = "http://10.0.2.2:3000/api";
   ```
8. Sau khi đổi địa chỉ API, khởi động lại Expo và xóa cache:
   ```bash
   cd frontend-mobile
   npx expo start -c
   ```

Nếu URL API mở được trong trình duyệt điện thoại nhưng ứng dụng vẫn báo lỗi, kiểm tra Terminal của Backend và log của Expo để xem request có tới server hay không. Với bản Android build độc lập dùng HTTP nội bộ, có thể cần thêm `"usesCleartextTraffic": true` trong mục `expo.android` của `frontend-mobile/app.json`; Expo Go thông thường không cần bước này.

---

## Hướng dẫn Kiểm thử

- Hãy bám sát vào tài liệu **Đặc tả Yêu cầu Hệ thống (System Requirements Specification)** để đối chiếu.
- Hệ thống này **CỐ Ý** được thiết kế chứa nhiều lỗi (bugs) liên quan đến:
  - Giao diện (UI/UX)
  - Xác thực dữ liệu (Form Validation)
  - Lỗ hổng bảo mật (SQL Injection, XSS, Phân quyền)
  - Lỗi Logic nghiệp vụ (Giỏ hàng, Thanh toán).
- Hãy cố gắng tìm ra càng nhiều lỗi càng tốt và ghi chép lại đầy đủ các bước tái hiện (Steps to Reproduce) nhé! Chúc bạn test vui vẻ!
