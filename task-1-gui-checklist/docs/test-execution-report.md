# Test Execution Report - EShop GUI Checklist

## 1. Test Environment (Môi trường kiểm thử)

- **Application URL (Storefront):** `http://localhost:5173`
- **Backend API URL:** `http://localhost:3000`
- **Operating System:** Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)
- **Browser / Version:** Google Chrome 157.0.8103.39 (Headless / Puppeteer Core)
- **Viewport / Resolution:** Desktop `1280x800` (kèm kiểm thử bổ sung tại Mobile responsive `375x667` và Text Zoom `200%`)
- **Build / Git Commit:** `105493904093f1aa0983ca59fbefe2a652d4e48a`
- **Node.js / npm Version:** Node.js `v22.20.0`, npm `11.7.0`, Vite `v8.0.12`
- **Database:** SQLite 3 (`backend/database.sqlite`), khởi tạo và gieo mầm tự động theo `database.js`
- **Tài khoản kiểm thử demo:** `test@eshop.com` (mật khẩu đã ghi nhận trong repository, không đưa vào báo cáo công khai)

## 2. Execution Details (Chi tiết thực thi)

- **Execution Date:** 2026-11-11
- **Tester:** Senior QA Engineer (`Nhp125`)
- **Execution Procedure:**
  1. Khởi động backend Node.js (`node backend/server.js`) lắng nghe tại cổng `3000`.
  2. Khởi động frontend storefront Vite (`npm run dev -- --port 5173 --strictPort`) lắng nghe tại cổng `5173`.
  3. Sử dụng Google Chrome thật qua Puppeteer Core tương tác với giao diện live, duyệt qua tất cả các luồng màn hình Login (`/login`), Register (`/register`) và Forgot Password (`/forgot-password`).
  4. Thực hiện đầy đủ các kịch bản kiểm thử: normal flow (đăng nhập thành công, đăng ký thành công, lấy mã OTP), invalid flow (sai định dạng email, sai mật khẩu, thiếu trường bắt buộc), boundary flow (mật khẩu 8 ký tự, mật khẩu yếu), navigation flow (logo brand, chuyển đổi qua lại giữa các màn hình) và feedback/state (banner lỗi, alert, chỉ báo bước, lockout).
  5. Không giả định sự tồn tại của bất kỳ UI element nào; mọi thành phần đều được định vị, kiểm tra thuộc tính DOM thực tế trước khi xác nhận kết quả.
  6. Với 100% các item Failed, tiến hành chụp ảnh màn hình giao diện thực tế và lưu trữ tại `task-1-gui-checklist/evidence/failed-items/<ID>/<ID>.png`.

## 3. Results (Bảng kết quả thực thi toàn bộ 92 Checklist Items)

| Checklist Item ID | Screen | IA Aspect | Result | Notes | Evidence |
|---|---|---|---|---|---|
| GUI-001 | Login | IA-01 Tiêu chuẩn UI chung | **Failed** | Tiêu đề trang dùng thẻ h2 có text "Đăng Ký" gây hiểu nhầm sang chức năng đăng ký tài khoản, vi phạm FR-21. | [GUI-001.png](../evidence/failed-items/GUI-001/GUI-001.png) |
| GUI-002 | Login | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 về yêu cầu nhất quán ngôn ngữ tiếng Việt. | [GUI-002.png](../evidence/failed-items/GUI-002/GUI-002.png) |
| GUI-003 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Nút hành động tích cực dùng màu xanh dương đúng theo FR-21. |  |
| GUI-004 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Bố cục form được gom cụm trực quan rõ ràng. |  |
| GUI-005 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Đạt yêu cầu hiển thị và độ rõ ràng trên màn hình desktop. |  |
| GUI-006 | Login | IA-01 Tiêu chuẩn UI chung | **Failed** | Nút Sign In gán tabIndex={1} phá vỡ luồng focus tự nhiên từ trên xuống dưới theo FR-21. | [GUI-006.png](../evidence/failed-items/GUI-006/GUI-006.png) |
| GUI-007 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Có phản hồi trực quan khi focus bằng phím. |  |
| GUI-008 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Đáp ứng tốt khả năng zoom 200% của trình duyệt. |  |
| GUI-009 | Login | IA-02 Biểu mẫu | **Passed** | Cung cấp đủ 2 trường phục vụ đăng nhập theo FR-02. |  |
| GUI-010 | Login | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-02 và FR-22 quy định trường email phải dùng type="email". | [GUI-010.png](../evidence/failed-items/GUI-010/GUI-010.png) |
| GUI-011 | Login | IA-02 Biểu mẫu | **Failed** | Vi phạm nghiêm trọng FR-22 và SEC-01 về bảo mật giao diện. | [GUI-011.png](../evidence/failed-items/GUI-011/GUI-011.png) |
| GUI-012 | Login | IA-02 Biểu mẫu | **Passed** | Validation trường bắt buộc hoạt động đúng. |  |
| GUI-013 | Login | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-02 quy định thông tin định danh đăng nhập là Email. | [GUI-013.png](../evidence/failed-items/GUI-013/GUI-013.png) |
| GUI-014 | Login | IA-02 Biểu mẫu | **Passed** | Nhãn trường mật khẩu mô tả đúng mục đích. |  |
| GUI-015 | Login | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định thông báo lỗi phải xuất hiện phía trên nút submit. | [GUI-015.png](../evidence/failed-items/GUI-015/GUI-015.png) |
| GUI-016 | Login | IA-04 Phản hồi / trạng thái | **Passed** | Có thông báo phản hồi người dùng khi đăng nhập không thành công. |  |
| GUI-017 | Login | IA-04 Phản hồi / trạng thái | **Failed** | Frontend bỏ qua trạng thái khóa tài khoản và không hiển thị thông báo tạm khóa theo FR-02. | [GUI-017.png](../evidence/failed-items/GUI-017/GUI-017.png) |
| GUI-018 | Login | IA-03 Điều hướng | **Passed** | Liên kết điều hướng đúng trang khôi phục mật khẩu. |  |
| GUI-019 | Login | IA-03 Điều hướng | **Passed** | Liên kết điều hướng đúng trang đăng ký tài khoản. |  |
| GUI-020 | Login | IA-03 Điều hướng | **Passed** | Điều hướng logo thương hiệu an toàn, đúng chuẩn. |  |
| GUI-021 | Login | IA-03 Điều hướng | **Passed** | Không có trạng thái highlight sai lệch trên navbar. |  |
| GUI-022 | Login | IA-04 Phản hồi / trạng thái | **Passed** | Nhãn nút thể hiện đúng ý nghĩa đăng nhập. |  |
| GUI-023 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Tiêu đề trang mô tả đúng mục đích đăng ký tài khoản. |  |
| GUI-024 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Tuân thủ yêu cầu nhất quán ngôn ngữ tiếng Việt theo FR-21. |  |
| GUI-025 | Register | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 quy định nút hành động tích cực phải dùng màu xanh dương. | [GUI-025.png](../evidence/failed-items/GUI-025/GUI-025.png) |
| GUI-026 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Bố cục nhóm trực quan rõ ràng, chặt chẽ. |  |
| GUI-027 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Đạt yêu cầu hiển thị và độ rõ ràng trên màn hình desktop. |  |
| GUI-028 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Thứ tự Tab tuần tự và logic theo bố cục form. |  |
| GUI-029 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Có phản hồi trực quan khi focus bằng phím. |  |
| GUI-030 | Register | IA-02 Biểu mẫu | **Passed** | Cung cấp đầy đủ 3 trường thông tin cơ bản theo FR-01. |  |
| GUI-031 | Register | IA-02 Biểu mẫu | **Passed** | Validation trường bắt buộc hoạt động chính xác. |  |
| GUI-032 | Register | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-01 và FR-22 quy định trường email phải dùng type="email". | [GUI-032.png](../evidence/failed-items/GUI-032/GUI-032.png) |
| GUI-033 | Register | IA-02 Biểu mẫu | **Passed** | Ký tự mật khẩu được che giấu đúng chuẩn bảo mật giao diện. |  |
| GUI-034 | Register | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định tất cả trường bắt buộc phải có dấu * bên cạnh nhãn. | [GUI-034.png](../evidence/failed-items/GUI-034/GUI-034.png) |
| GUI-035 | Register | IA-02 Biểu mẫu | **Passed** | Hướng dẫn độ mạnh mật khẩu mô tả đầy đủ các yêu cầu theo FR-01. |  |
| GUI-036 | Register | IA-02 Biểu mẫu | **Failed** | Vi phạm nghiêm trọng FR-01 bắt buộc phải có trường Xác nhận mật khẩu và kiểm tra trùng khớp. | [GUI-036.png](../evidence/failed-items/GUI-036/GUI-036.png) |
| GUI-037 | Register | IA-02 Biểu mẫu | **Passed** | Vị trí thông báo lỗi nằm phía trên nút submit, tuân thủ đúng FR-22. |  |
| GUI-038 | Register | IA-04 Phản hồi / trạng thái | **Passed** | Có phản hồi hướng dẫn người dùng khi mật khẩu không đủ độ mạnh. |  |
| GUI-039 | Register | IA-04 Phản hồi / trạng thái | **Passed** | Người dùng nhận được phản hồi lỗi khi đăng ký bằng email đã có trong hệ thống. |  |
| GUI-040 | Register | IA-04 Phản hồi / trạng thái | **Passed** | Chuyển hướng chính xác về trang đăng nhập sau khi đăng ký thành công theo FR-01. |  |
| GUI-041 | Register | IA-03 Điều hướng | **Passed** | Liên kết điều hướng đúng trang đăng nhập. |  |
| GUI-042 | Register | IA-03 Điều hướng | **Passed** | Điều hướng logo thương hiệu an toàn, không kích hoạt submit. |  |
| GUI-043 | Register | IA-03 Điều hướng | **Passed** | Không xuất hiện trạng thái highlight sai lệch trên navbar. |  |
| GUI-044 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Tiêu đề mô tả đúng mục đích chức năng. |  |
| GUI-045 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Tuân thủ yêu cầu ngôn ngữ tiếng Việt theo FR-21. |  |
| GUI-046 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Bố cục nhóm trực quan rõ ràng theo từng bước. |  |
| GUI-047 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Đạt yêu cầu hiển thị và độ rõ ràng trên màn hình desktop. |  |
| GUI-048 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Thứ tự Tab logic theo trực quan của form bước 1. |  |
| GUI-049 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Thứ tự Tab tuần tự và logic ở bước 2. |  |
| GUI-050 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Hiển thị chỉ báo focus bàn phím rõ nét. |  |
| GUI-051 | Forgot Password | IA-02 Biểu mẫu | **Passed** | Có trường nhập email theo yêu cầu bước 1 của FR-03. |  |
| GUI-052 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định trường email phải dùng type="email". | [GUI-052.png](../evidence/failed-items/GUI-052/GUI-052.png) |
| GUI-053 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định tất cả trường bắt buộc phải có dấu * bên cạnh nhãn. | [GUI-053.png](../evidence/failed-items/GUI-053/GUI-053.png) |
| GUI-054 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm nghiêm trọng FR-03 quy định Bước 2 phải có đủ 3 trường: OTP, Mật khẩu mới và Xác nhận mật khẩu mới. | [GUI-054.png](../evidence/failed-items/GUI-054/GUI-054.png) |
| GUI-055 | Forgot Password | IA-02 Biểu mẫu | **Passed** | Ký tự mật khẩu được che giấu đúng chuẩn bảo mật giao diện. |  |
| GUI-056 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định tất cả trường bắt buộc phải có dấu * bên cạnh nhãn. | [GUI-056.png](../evidence/failed-items/GUI-056/GUI-056.png) |
| GUI-057 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-03 và FR-22 quy định các form có từ 2 bước trở lên phải có Step Indicator rõ ràng. | [GUI-057.png](../evidence/failed-items/GUI-057/GUI-057.png) |
| GUI-058 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-03 (mật khẩu mới phải tuân thủ điều kiện như FR-01 và cần hướng dẫn trên UI). | [GUI-058.png](../evidence/failed-items/GUI-058/GUI-058.png) |
| GUI-059 | Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-22 quy định thông báo lỗi phải xuất hiện phía trên nút submit, không dùng alert popup. | [GUI-059.png](../evidence/failed-items/GUI-059/GUI-059.png) |
| GUI-060 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Hiển thị OTP trực tiếp trên màn hình demo đúng theo đặc tả FR-03 môi trường thử nghiệm. |  |
| GUI-061 | Forgot Password | IA-04 Phản hồi / trạng thái | **Failed** | Vi phạm nghiêm trọng FR-03 và SEC-07 quy định OTP phải là mã 6 chữ số ngẫu nhiên. | [GUI-061.png](../evidence/failed-items/GUI-061/GUI-061.png) |
| GUI-062 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Trạng thái và ngữ cảnh email được bảo toàn khi chuyển bước. |  |
| GUI-063 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Có thông báo phản hồi lỗi khi reset mật khẩu không thành công. |  |
| GUI-064 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Có phản hồi mô tả quy tắc mật khẩu khi mật khẩu quá yếu. |  |
| GUI-065 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Có phản hồi thành công và điều hướng về trang đăng nhập. |  |
| GUI-066 | Forgot Password | IA-03 Điều hướng | **Failed** | Vi phạm FR-03 quy định bắt buộc phải có nút "Quay lại đăng nhập". | [GUI-066.png](../evidence/failed-items/GUI-066/GUI-066.png) |
| GUI-067 | Forgot Password | IA-03 Điều hướng | **Failed** | Không tồn tại control điều hướng về trang đăng nhập trong flow khôi phục mật khẩu. | [GUI-067.png](../evidence/failed-items/GUI-067/GUI-067.png) |
| GUI-068 | Forgot Password | IA-03 Điều hướng | **Passed** | Nút quay lại bước 1 hoạt động đúng và an toàn. |  |
| GUI-069 | Forgot Password | IA-03 Điều hướng | **Passed** | Điều hướng logo thương hiệu an toàn, không kích hoạt submit. |  |
| GUI-070 | Forgot Password | IA-03 Điều hướng | **Passed** | Không xuất hiện trạng thái highlight sai lệch trên navbar. |  |
| GUI-071 | Login; Register; Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Bố cục layout tổng thể không che khuất vùng nội dung form. |  |
| GUI-072 | Login; Register; Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Các form đáp ứng khả năng thao tác hoàn toàn bằng bàn phím. |  |
| GUI-073 | Login; Register; Forgot Password | IA-02 Biểu mẫu | **Failed** | Vi phạm khuyến nghị trợ năng (Accessibility) về việc liên kết tường minh giữa label và input. | [GUI-073.png](../evidence/failed-items/GUI-073/GUI-073.png) |
| GUI-074 | Login; Register; Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Đảm bảo khả năng tiếp cận thông tin phản hồi không phụ thuộc màu sắc. |  |
| GUI-075 | Login; Register; Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Trạng thái nhập liệu của người dùng được bảo toàn khi chỉnh sửa lỗi. |  |
| GUI-076 | Login; Register; Forgot Password | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 quy định về tính nhất quán trong thiết kế giao diện giữa các màn hình trong cùng một hệ thống. | [GUI-076.png](../evidence/failed-items/GUI-076/GUI-076.png) |
| HR-001 | Login | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 quy định mỗi trang phải có đúng một thẻ <h1> mô tả nội dung trang. | [HR-001.png](../evidence/failed-items/HR-001/HR-001.png) |
| HR-002 | Register | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 quy định mỗi trang phải có đúng một thẻ <h1> mô tả nội dung trang. | [HR-002.png](../evidence/failed-items/HR-002/HR-002.png) |
| HR-003 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Failed** | Vi phạm FR-21 quy định mỗi trang phải có đúng một thẻ <h1> mô tả nội dung trang. | [HR-003.png](../evidence/failed-items/HR-003/HR-003.png) |
| HR-004 | Login | IA-01 Tiêu chuẩn UI chung | **Passed** | Đáp ứng tốt khả năng hiển thị responsive trên màn hình hẹp. |  |
| HR-005 | Register | IA-01 Tiêu chuẩn UI chung | **Passed** | Đáp ứng tốt khả năng hiển thị responsive trên màn hình hẹp. |  |
| HR-006 | Forgot Password | IA-01 Tiêu chuẩn UI chung | **Passed** | Đáp ứng tốt khả năng hiển thị responsive ở cả hai bước trên màn hình hẹp. |  |
| HR-007 | Login | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-02 và FR-22 quy định bắt buộc phải validate định dạng email bằng HTML5 trước khi submit. | [HR-007.png](../evidence/failed-items/HR-007/HR-007.png) |
| HR-008 | Login | IA-04 Phản hồi / trạng thái | **Passed** | Đăng nhập thành công và điều hướng về trang chủ đúng theo FR-02. |  |
| HR-009 | Register | IA-02 Biểu mẫu | **Failed** | Vi phạm FR-01 và FR-22 quy định trường email phải có validate định dạng hợp lệ (user@domain.com). | [HR-009.png](../evidence/failed-items/HR-009/HR-009.png) |
| HR-010 | Register | IA-04 Phản hồi / trạng thái | **Failed** | Vi phạm FR-01 quy định bắt buộc phải có trường Xác nhận mật khẩu và kiểm tra trùng khớp. | [HR-010.png](../evidence/failed-items/HR-010/HR-010.png) |
| HR-011 | Register | IA-04 Phản hồi / trạng thái | **Failed** | Vi phạm nghiêm trọng FR-01; regex client-side từ chối các mật khẩu mạnh hợp lệ của người dùng. | [HR-011.png](../evidence/failed-items/HR-011/HR-011.png) |
| HR-012 | Register | IA-04 Phản hồi / trạng thái | **Passed** | Có thông báo phản hồi khi mật khẩu thiếu các thành phần bắt buộc. |  |
| HR-013 | Forgot Password | IA-04 Phản hồi / trạng thái | **Failed** | Vi phạm FR-03 quy định Bước 2 phải có trường Xác nhận mật khẩu mới và hai trường mật khẩu phải khớp nhau. | [HR-013.png](../evidence/failed-items/HR-013/HR-013.png) |
| HR-014 | Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Hiển thị thông báo lỗi và giữ người dùng ở lại Bước 1 để sửa email. |  |
| HR-015 | Forgot Password | IA-03 Điều hướng | **Failed** | Vi phạm FR-03 quy định Bước 1 phải có nút "Quay lại đăng nhập". | [HR-015.png](../evidence/failed-items/HR-015/HR-015.png) |
| HR-016 | Login; Register; Forgot Password | IA-04 Phản hồi / trạng thái | **Passed** | Độ tương phản văn bản và nút bấm đạt chuẩn dễ đọc trên giao diện. |  |

## 4. Failed Item Details (Chi tiết các mục kiểm thử không đạt)

Dưới đây là biên bản phân tích lỗi và các bước tái hiện (Reproduction Steps) chi tiết cho từng item bị đánh dấu **Failed**:

### GUI-001 - Kiểm tra trang có một heading hiển thị mô tả mục đích đăng nhập

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Lỗi mã nguồn giao diện đã được xác minh).
- **Preconditions:** Người dùng chưa đăng nhập, mở trình duyệt vào trang đăng nhập.
- **Steps to Reproduce:**
  1. Truy cập đường dẫn `http://localhost:5173/login`.
  2. Quan sát tiêu đề chính trên form đăng nhập và kiểm tra thẻ HTML trong DOM.
- **Expected Result:** Trang phải có đúng một thẻ heading (h1) mô tả mục đích đăng nhập (ví dụ: 'Đăng Nhập').
- **Actual Result:** Trang hiển thị thẻ `<h2>Đăng Ký</h2>` gây nhầm lẫn sang chức năng đăng ký, và hoàn toàn không có thẻ `<h1>`.
- **Evidence Screenshot:** `[GUI-001.png](../evidence/failed-items/GUI-001/GUI-001.png)`

### GUI-002 - Kiểm tra màn hình Login sử dụng nhãn và thông báo tiếng Việt nhất quán

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm yêu cầu nhất quán ngôn ngữ tiếng Việt FR-21).
- **Preconditions:** Mở trang đăng nhập tại `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Truy cập `http://localhost:5173/login`.
  2. Kiểm tra ngôn ngữ hiển thị trên tiêu đề, các nhãn trường và nút bấm.
- **Expected Result:** Toàn bộ nội dung giao diện hướng đến người dùng phải sử dụng tiếng Việt nhất quán theo FR-21.
- **Actual Result:** Giao diện dùng lẫn lộn tiếng Anh: nhãn trường email là 'Username', nút bấm là 'Sign In', tiêu đề hiển thị 'Đăng Ký'.
- **Evidence Screenshot:** `[GUI-002.png](../evidence/failed-items/GUI-002/GUI-002.png)`

### GUI-006 - Kiểm tra keyboard focus có thể di chuyển qua các control Login theo thứ tự logic từ trên xuống dưới

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Lỗi cấu hình tabIndex trên nút submit).
- **Preconditions:** Mở trang `http://localhost:5173/login`, con trỏ chuột không click vào bất kỳ input nào.
- **Steps to Reproduce:**
  1. Tải lại trang `http://localhost:5173/login`.
  2. Nhấn phím `Tab` lần đầu tiên từ đầu trang.
  3. Quan sát phần tử nhận focus đầu tiên trên màn hình.
- **Expected Result:** Focus bàn phím phải đi tuần tự từ trên xuống dưới: logo thương hiệu -> navbar -> trường email -> mật khẩu -> submit -> liên kết đăng ký theo FR-21.
- **Actual Result:** Nút submit 'Sign In' nhận focus ngay lần nhấn Tab đầu tiên do bị gán thuộc tính `tabIndex={1}`, phá vỡ thứ tự focus tự nhiên.
- **Evidence Screenshot:** `[GUI-006.png](../evidence/failed-items/GUI-006/GUI-006.png)`

### GUI-010 - Kiểm tra email field được triển khai bằng HTML type="email" và có browser validation

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm FR-02 và FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Kiểm tra thuộc tính thẻ input email trong mã nguồn DOM.
  2. Nhập chuỗi sai định dạng `notanemail` vào ô email và nhập mật khẩu.
  3. Nhấn nút submit 'Sign In'.
- **Expected Result:** Thẻ input email phải có thuộc tính `type="email"` và trình duyệt phải kích hoạt validation chặn gửi form nếu email không đúng định dạng.
- **Actual Result:** Trường email dùng `type="text"`, không có HTML5 email validation, form vẫn submit chuỗi sai định dạng lên server.
- **Evidence Screenshot:** `[GUI-010.png](../evidence/failed-items/GUI-010/GUI-010.png)`

### GUI-011 - Kiểm tra password field được triển khai bằng HTML type="password"

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Lỗ hổng bảo mật giao diện nghiêm trọng).
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Nhấp vào trường Mật khẩu trên form đăng nhập.
  2. Nhập một chuỗi mật khẩu bất kỳ (ví dụ: 'SecretPass123!').
  3. Quan sát các ký tự hiển thị trong ô nhập.
- **Expected Result:** Ký tự mật khẩu phải được che giấu bằng các dấu chấm tròn bảo mật qua `type="password"` theo FR-22.
- **Actual Result:** Trường mật khẩu sử dụng `type="text"`, toàn bộ ký tự mật khẩu hiển thị rõ ràng dạng plaintext trên màn hình.
- **Evidence Screenshot:** `[GUI-011.png](../evidence/failed-items/GUI-011/GUI-011.png)`

### GUI-013 - Kiểm tra email label xác định field là email thay vì username

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm yêu cầu đặc tả FR-02).
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Đọc nhãn hiển thị phía trên trường nhập thông tin tài khoản đăng nhập.
- **Expected Result:** Nhãn trường phải ghi rõ là 'Email' để người dùng biết nhập địa chỉ email theo FR-02.
- **Actual Result:** Nhãn trường ghi là 'Username', gây hiểu lầm cho người dùng về loại thông tin cần nhập.
- **Evidence Screenshot:** `[GUI-013.png](../evidence/failed-items/GUI-013/GUI-013.png)`

### GUI-015 - Kiểm tra login error được hiển thị phía trên nút submit sau khi đăng nhập thất bại

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm quy chuẩn bố cục form FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Nhập thông tin đăng nhập không hợp lệ (`test@eshop.com` / `WrongPass`).
  2. Bấm nút submit 'Sign In'.
  3. Quan sát vị trí hiển thị của thông báo lỗi màu đỏ.
- **Expected Result:** Thông báo lỗi phải hiển thị ở phía trên nút submit theo quy định của FR-22.
- **Actual Result:** Thông báo lỗi xuất hiện ở dưới cùng của form, nằm bên dưới nút submit và bên dưới liên kết 'Đăng ký ngay'.
- **Evidence Screenshot:** `[GUI-015.png](../evidence/failed-items/GUI-015/GUI-015.png)`

### GUI-017 - Kiểm tra repeated failed login attempts lead to feedback tạm khóa tài khoản

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-04 Phản hồi / trạng thái`
- **Bản chất lỗi:** Reproducible Defect (Frontend bỏ qua lỗi 403 từ backend và giấu thông báo khóa tài khoản).
- **Preconditions:** Tài khoản `test@eshop.com` đang hoạt động bình thường.
- **Steps to Reproduce:**
  1. Nhập email `test@eshop.com` và mật khẩu sai trên trang đăng nhập.
  2. Nhấn submit 'Sign In' liên tiếp 3 lần.
  3. Quan sát thông báo phản hồi hiển thị trên giao diện người dùng.
- **Expected Result:** Sau khi đăng nhập sai từ 3 lần trở lên, hệ thống phải phản hồi thông báo tài khoản bị tạm khóa (30 giây) theo FR-02.
- **Actual Result:** Giao diện frontend chỉ hiển thị cố định thông báo chung 'Đăng nhập thất bại. Vui lòng kiểm tra lại.', hoàn toàn không hiển thị trạng thái khóa tài khoản.
- **Evidence Screenshot:** `[GUI-017.png](../evidence/failed-items/GUI-017/GUI-017.png)`

### GUI-025 - Kiểm tra primary registration action sử dụng màu xanh dương theo quy ước positive action

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm quy ước màu sắc nút hành động FR-21).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Quan sát nút submit 'Đăng Ký' trên form đăng ký.
  2. Kiểm tra mã màu CSS trong class Tailwind của nút.
- **Expected Result:** Nút submit đăng ký phải sử dụng màu xanh dương cho positive action theo FR-21.
- **Actual Result:** Nút submit sử dụng class `bg-red-500` (màu đỏ - quy ước cho nút hủy/nguy hiểm).
- **Evidence Screenshot:** `[GUI-025.png](../evidence/failed-items/GUI-025/GUI-025.png)`

### GUI-032 - Kiểm tra email field trên form Đăng ký được triển khai bằng HTML type="email"

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm FR-01 và FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Kiểm tra thuộc tính của thẻ input Email trên form Đăng ký.
  2. Nhập chuỗi không phải email (ví dụ: 'invalid-email') và submit form.
- **Expected Result:** Trường email phải dùng `type="email"` và kích hoạt HTML5 format validation theo FR-01 và FR-22.
- **Actual Result:** Trường email sử dụng `type="text"`, cho phép nhập chuỗi không đúng định dạng email mà không bị trình duyệt chặn.
- **Evidence Screenshot:** `[GUI-032.png](../evidence/failed-items/GUI-032/GUI-032.png)`

### GUI-034 - Kiểm tra all displayed required registration fields are marked with asterisk (*)

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm tiêu chuẩn biểu mẫu FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Quan sát các nhãn trường bắt buộc trên form: 'Họ Tên', 'Email', 'Mật khẩu'.
- **Expected Result:** Tất cả các trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn theo FR-22.
- **Actual Result:** Cả ba nhãn trường đều không có ký hiệu dấu sao `*`.
- **Evidence Screenshot:** `[GUI-034.png](../evidence/failed-items/GUI-034/GUI-034.png)`

### GUI-036 - Kiểm tra registration form bao gồm field xác nhận password

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Thiếu tính năng cốt lõi theo đặc tả nghiệp vụ FR-01).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Kiểm tra danh sách các trường nhập liệu trên form Đăng ký tài khoản.
- **Expected Result:** Form bắt buộc phải có trường 'Xác nhận mật khẩu' và kiểm tra tính trùng khớp theo FR-01.
- **Actual Result:** Form Đăng ký hoàn toàn thiếu trường Xác nhận mật khẩu.
- **Evidence Screenshot:** `[GUI-036.png](../evidence/failed-items/GUI-036/GUI-036.png)`

### GUI-052 - Kiểm tra step 1 email field của Forgot Password được triển khai bằng HTML type="email"

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm quy chuẩn biểu mẫu FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/forgot-password`.
- **Steps to Reproduce:**
  1. Kiểm tra thuộc tính của thẻ input Email ở Bước 1.
- **Expected Result:** Trường email phải dùng `type="email"` và có browser email validation theo FR-22.
- **Actual Result:** Trường email sử dụng `type="text"`, không có HTML5 email validation.
- **Evidence Screenshot:** `[GUI-052.png](../evidence/failed-items/GUI-052/GUI-052.png)`

### GUI-053 - Kiểm tra step 1 email field được đánh dấu bắt buộc bằng dấu sao (*)

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm quy chuẩn biểu mẫu FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/forgot-password`.
- **Steps to Reproduce:**
  1. Quan sát nhãn của trường email ở Bước 1: 'Nhập Email của bạn'.
- **Expected Result:** Nhãn trường bắt buộc phải có ký hiệu `*` bên cạnh theo FR-22.
- **Actual Result:** Nhãn trường không có ký hiệu dấu sao `*`.
- **Evidence Screenshot:** `[GUI-053.png](../evidence/failed-items/GUI-053/GUI-053.png)`

### GUI-054 - Kiểm tra step 2 provides OTP input, new-password input, and password-confirmation input

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Thiếu trường bắt buộc theo đặc tả nghiệp vụ FR-03).
- **Preconditions:** Nhập email hợp lệ ở Bước 1 để chuyển sang Bước 2 của Forgot Password.
- **Steps to Reproduce:**
  1. Nhập `test@eshop.com` và nhấn 'Lấy mã OTP'.
  2. Chuyển sang Bước 2, kiểm tra danh sách các trường nhập liệu hiển thị.
- **Expected Result:** Bước 2 phải có đủ 3 trường: Mã OTP, Mật khẩu mới và Xác nhận mật khẩu mới theo FR-03.
- **Actual Result:** Bước 2 chỉ có trường OTP và Mật khẩu mới, hoàn toàn thiếu trường Xác nhận mật khẩu mới.
- **Evidence Screenshot:** `[GUI-054.png](../evidence/failed-items/GUI-054/GUI-054.png)`

### GUI-056 - Kiểm tra all required recovery inputs ở Step 2 are marked with asterisk (*)

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm quy chuẩn biểu mẫu FR-22).
- **Preconditions:** Đang ở Bước 2 của màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Quan sát các nhãn trường ở Bước 2: 'Mã OTP (4 số)', 'Mật khẩu mới'.
- **Expected Result:** Tất cả các nhãn trường bắt buộc phải có dấu sao `*` bên cạnh theo FR-22.
- **Actual Result:** Không có nhãn trường nào có ký hiệu dấu sao `*`.
- **Evidence Screenshot:** `[GUI-056.png](../evidence/failed-items/GUI-056/GUI-056.png)`

### GUI-057 - Kiểm tra multi-step recovery interface displays a clear step indicator (ví dụ: 'Bước 1 / 2')

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm yêu cầu chỉ báo bước FR-03 và FR-22).
- **Preconditions:** Mở trang `http://localhost:5173/forgot-password`.
- **Steps to Reproduce:**
  1. Quan sát giao diện ở Bước 1 và sau khi chuyển sang Bước 2.
- **Expected Result:** Giao diện form nhiều bước phải có chỉ báo bước (Step Indicator) rõ ràng như 'Bước 1 / 2' theo FR-03 và FR-22.
- **Actual Result:** Hoàn toàn không có bất kỳ chỉ báo bước nào hiển thị trên giao diện ở cả hai bước.
- **Evidence Screenshot:** `[GUI-057.png](../evidence/failed-items/GUI-057/GUI-057.png)`

### GUI-058 - Kiểm tra step 2 hiển thị hướng dẫn mật khẩu nhất quán với FR-01

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Thiếu hướng dẫn người dùng theo FR-03).
- **Preconditions:** Đang ở Bước 2 của màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Kiểm tra văn bản hướng dẫn bên dưới trường Mật khẩu mới.
- **Expected Result:** Phải có văn bản hướng dẫn độ mạnh mật khẩu tương tự như FR-01 theo yêu cầu FR-03.
- **Actual Result:** Bước 2 hoàn toàn không có văn bản hướng dẫn quy tắc độ mạnh mật khẩu.
- **Evidence Screenshot:** `[GUI-058.png](../evidence/failed-items/GUI-058/GUI-058.png)`

### GUI-059 - Kiểm tra validation or service errors xuất hiện phía trên submit action liên quan

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Sử dụng browser alert thay vì render UI banner).
- **Preconditions:** Đang ở Bước 1 hoặc Bước 2 của Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Ở Bước 1, nhập email chưa đăng ký và bấm 'Lấy mã OTP'.
  2. Quan sát hình thức thông báo lỗi.
- **Expected Result:** Thông báo lỗi phải hiển thị trực quan trên giao diện form, phía trên nút submit theo FR-22.
- **Actual Result:** Hệ thống gọi hàm popup `alert()` của trình duyệt, gây gián đoạn và vi phạm quy chuẩn hiển thị thông báo lỗi trên form.
- **Evidence Screenshot:** `[GUI-059.png](../evidence/failed-items/GUI-059/GUI-059.png)`

### GUI-061 - Kiểm tra displayed demo OTP được hiển thị dưới dạng giá trị gồm sáu chữ số

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-04 Phản hồi / trạng thái`
- **Bản chất lỗi:** Reproducible Defect (Sai lệch nghiêm trọng so với đặc tả nghiệp vụ FR-03).
- **Preconditions:** Đang ở màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Nhập email hợp lệ (`test@eshop.com`) và bấm 'Lấy mã OTP'.
  2. Quan sát mã OTP hiển thị trên banner thông báo và nhãn ô nhập OTP ở Bước 2.
- **Expected Result:** Mã OTP phải có độ dài đúng 6 chữ số ngẫu nhiên theo FR-03 và SEC-07.
- **Actual Result:** Mã OTP chỉ có 4 chữ số (ví dụ: '5720') và nhãn ở Bước 2 ghi rõ 'Mã OTP (4 số)'.
- **Evidence Screenshot:** `[GUI-061.png](../evidence/failed-items/GUI-061/GUI-061.png)`

### GUI-066 - Kiểm tra recovery flow cung cấp action "Quay lại đăng nhập" theo FR-03

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-03 Điều hướng`
- **Bản chất lỗi:** Reproducible Defect (Thiếu control điều hướng theo yêu cầu FR-03).
- **Preconditions:** Đang ở Bước 1 hoặc Bước 2 của màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Tìm kiếm nút hoặc liên kết 'Quay lại đăng nhập' trên giao diện.
- **Expected Result:** Giao diện khôi phục mật khẩu bắt buộc phải có nút 'Quay lại đăng nhập' theo FR-03.
- **Actual Result:** Không có nút hay liên kết 'Quay lại đăng nhập' nào trên giao diện (Bước 2 chỉ có '← Quay lại' để về Bước 1).
- **Evidence Screenshot:** `[GUI-066.png](../evidence/failed-items/GUI-066/GUI-066.png)`

### GUI-067 - Kiểm tra action return của recovery điều hướng đến /login mà không submit reset request

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-03 Điều hướng`
- **Bản chất lỗi:** Reproducible Defect (Hệ quả của việc thiếu nút quay lại đăng nhập).
- **Preconditions:** Đang ở màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Cố gắng tìm và kích hoạt hành động quay lại đăng nhập.
- **Expected Result:** Phải có control điều hướng người dùng về `/login` một cách an toàn mà không gửi yêu cầu reset.
- **Actual Result:** Do không có nút quay lại đăng nhập, hành động này bị blocked và không thể thực hiện.
- **Evidence Screenshot:** `[GUI-067.png](../evidence/failed-items/GUI-067/GUI-067.png)`

### GUI-073 - Kiểm tra labels are programmatically associated with their corresponding inputs

- **Màn hình:** `Login; Register; Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm tiêu chuẩn tiếp cận Accessibility WCAG/REC-A11Y-04).
- **Preconditions:** Mở lần lượt các trang `/login`, `/register`, `/forgot-password`.
- **Steps to Reproduce:**
  1. Kiểm tra mã nguồn DOM của các cặp thẻ `<label>` và `<input>` trên cả 3 màn hình.
- **Expected Result:** Mỗi thẻ `<label>` phải có thuộc tính `htmlFor` trỏ đến `id` tương ứng của thẻ `<input>` để hỗ trợ tiếp cận (Accessibility).
- **Actual Result:** Toàn bộ thẻ `<label>` không có thuộc tính `htmlFor` và các thẻ `<input>` không có thuộc tính `id`.
- **Evidence Screenshot:** `[GUI-073.png](../evidence/failed-items/GUI-073/GUI-073.png)`

### GUI-076 - Kiểm tra three scoped screens use consistent container, field, and primary-action visual treatment

- **Màn hình:** `Login; Register; Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm tiêu chuẩn nhất quán giao diện FR-21).
- **Preconditions:** Mở đồng thời hoặc so sánh 3 màn hình Login, Register, Forgot Password.
- **Steps to Reproduce:**
  1. So sánh màu sắc nút submit chính giữa các màn hình.
  2. So sánh kiểu trường mật khẩu giữa các màn hình.
- **Expected Result:** Các nút submit positive action và kiểu trường mật khẩu phải nhất quán trên toàn hệ thống theo FR-21.
- **Actual Result:** Nút submit không nhất quán màu: Login màu xanh dương, Register màu đỏ (`bg-red-500`), Forgot Password bước 2 màu xanh lá (`bg-green-600`). Kiểu trường mật khẩu cũng không nhất quán (Login dạng text, Register dạng password).
- **Evidence Screenshot:** `[GUI-076.png](../evidence/failed-items/GUI-076/GUI-076.png)`

### HR-001 - Kiểm tra Login page uses an HTML h1 element as its single page-level heading

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm FR-21 quy định mỗi trang chỉ có 1 thẻ h1 duy nhất).
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Kiểm tra cây DOM của trang đăng nhập bằng công cụ `document.querySelectorAll('h1')`.
- **Expected Result:** Trang phải có đúng một thẻ `<h1>` mô tả nội dung theo FR-21.
- **Actual Result:** Trang không có bất kỳ thẻ `<h1>` nào (chỉ có thẻ `<h2>`).
- **Evidence Screenshot:** `[HR-001.png](../evidence/failed-items/HR-001/HR-001.png)`

### HR-002 - Kiểm tra Register page uses an HTML h1 element as its single page-level heading

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm FR-21 quy định mỗi trang chỉ có 1 thẻ h1 duy nhất).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Kiểm tra cây DOM của trang đăng ký bằng công cụ `document.querySelectorAll('h1')`.
- **Expected Result:** Trang phải có đúng một thẻ `<h1>` mô tả nội dung theo FR-21.
- **Actual Result:** Trang không có bất kỳ thẻ `<h1>` nào (chỉ có thẻ `<h2>`).
- **Evidence Screenshot:** `[HR-002.png](../evidence/failed-items/HR-002/HR-002.png)`

### HR-003 - Kiểm tra Forgot Password page uses an HTML h1 element as its single page-level heading

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-01 Tiêu chuẩn UI chung`
- **Bản chất lỗi:** Reproducible Defect (Vi phạm FR-21 quy định mỗi trang chỉ có 1 thẻ h1 duy nhất).
- **Preconditions:** Mở trang `http://localhost:5173/forgot-password`.
- **Steps to Reproduce:**
  1. Kiểm tra cây DOM của trang Quên Mật Khẩu bằng công cụ `document.querySelectorAll('h1')`.
- **Expected Result:** Trang phải có đúng một thẻ `<h1>` mô tả nội dung theo FR-21.
- **Actual Result:** Trang không có bất kỳ thẻ `<h1>` nào (chỉ có thẻ `<h2>`).
- **Evidence Screenshot:** `[HR-003.png](../evidence/failed-items/HR-003/HR-003.png)`

### HR-007 - Kiểm tra invalidly formatted email produces visible form validation before login request is submitted

- **Màn hình:** `Login`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Hệ quả của việc dùng type="text" thay vì type="email").
- **Preconditions:** Mở trang `http://localhost:5173/login`.
- **Steps to Reproduce:**
  1. Nhập email sai định dạng `notanemail` vào ô tài khoản.
  2. Nhập mật khẩu bất kỳ và bấm submit 'Sign In'.
- **Expected Result:** Trình duyệt phải hiển thị cảnh báo định dạng email và ngăn chặn việc gửi request lên máy chủ theo FR-02 và FR-22.
- **Actual Result:** Chuỗi `notanemail` không bị chặn trên client và gửi thẳng request lên backend.
- **Evidence Screenshot:** `[HR-007.png](../evidence/failed-items/HR-007/HR-007.png)`

### HR-009 - Kiểm tra invalidly formatted registration email produces visible form validation before submission

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-02 Biểu mẫu`
- **Bản chất lỗi:** Reproducible Defect (Hệ quả của việc dùng type="text" trên form đăng ký).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Nhập họ tên và mật khẩu hợp lệ.
  2. Nhập chuỗi sai định dạng `invalid-email-format` vào ô Email.
  3. Bấm nút submit 'Đăng Ký'.
- **Expected Result:** Trình duyệt phải hiển thị thông báo validation định dạng email và ngăn chặn gửi form theo FR-01 và FR-22.
- **Actual Result:** Email sai định dạng không bị chặn trên client và gửi thẳng request lên backend.
- **Evidence Screenshot:** `[HR-009.png](../evidence/failed-items/HR-009/HR-009.png)`

### HR-010 - Kiểm tra submitting two different password values in password and confirmation fields produces mismatch feedback

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-04 Phản hồi / trạng thái`
- **Bản chất lỗi:** Reproducible Defect (Thiếu tính năng Xác nhận mật khẩu theo FR-01).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Kiểm tra sự tồn tại của trường Xác nhận mật khẩu để thử nghiệm kịch bản mật khẩu không khớp.
- **Expected Result:** Hệ thống phải cung cấp trường Xác nhận mật khẩu và hiển thị thông báo lỗi khi hai mật khẩu không trùng khớp theo FR-01.
- **Actual Result:** Form hoàn toàn không có trường Xác nhận mật khẩu; kịch bản kiểm thử bị chặn và không thể thực hiện.
- **Evidence Screenshot:** `[HR-010.png](../evidence/failed-items/HR-010/HR-010.png)`

### HR-011 - Kiểm tra password exactly at documented minimum length (8 chars) is accepted when all required classes are present

- **Màn hình:** `Register`
- **Khía cạnh giao diện (IA Aspect):** `IA-04 Phản hồi / trạng thái`
- **Bản chất lỗi:** Reproducible Defect (Lỗi logic regex kiểm tra mật khẩu mạnh ở client-side).
- **Preconditions:** Mở trang `http://localhost:5173/register`.
- **Steps to Reproduce:**
  1. Nhập Họ Tên: 'Nguyen Van A'.
  2. Nhập Email: 'valid.test@example.com'.
  3. Nhập Mật khẩu đúng 8 ký tự đạt chuẩn FR-01: 'Valid123@' (gồm chữ hoa, chữ thường, số và ký tự đặc biệt).
  4. Bấm nút submit 'Đăng Ký'.
- **Expected Result:** Mật khẩu 8 ký tự đầy đủ 4 nhóm ký tự theo FR-01 phải được chấp nhận và form gửi thành công.
- **Actual Result:** Hệ thống từ chối mật khẩu và hiển thị banner lỗi: 'Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.' do regex sai (`(?=.*\s)` bắt buộc có khoảng trắng và không cho phép `@`).
- **Evidence Screenshot:** `[HR-011.png](../evidence/failed-items/HR-011/HR-011.png)`

### HR-013 - Kiểm tra submitting different values in new-password and confirmation fields ở Forgot Password produces mismatch feedback

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-04 Phản hồi / trạng thái`
- **Bản chất lỗi:** Reproducible Defect (Thiếu trường Xác nhận mật khẩu mới theo FR-03).
- **Preconditions:** Chuyển sang Bước 2 của màn hình Quên Mật Khẩu.
- **Steps to Reproduce:**
  1. Kiểm tra sự tồn tại của trường Xác nhận mật khẩu mới ở Bước 2.
- **Expected Result:** Phải có trường Xác nhận mật khẩu mới và từ chối đặt lại mật khẩu nếu hai trường không khớp theo FR-03.
- **Actual Result:** Bước 2 hoàn toàn không có trường Xác nhận mật khẩu mới; kịch bản kiểm thử bị chặn.
- **Evidence Screenshot:** `[HR-013.png](../evidence/failed-items/HR-013/HR-013.png)`

### HR-015 - Kiểm tra required return-to-login action is available from initial Forgot Password step

- **Màn hình:** `Forgot Password`
- **Khía cạnh giao diện (IA Aspect):** `IA-03 Điều hướng`
- **Bản chất lỗi:** Reproducible Defect (Thiếu nút điều hướng bắt buộc theo FR-03).
- **Preconditions:** Mở trang `http://localhost:5173/forgot-password` ở Bước 1.
- **Steps to Reproduce:**
  1. Tìm kiếm nút hoặc liên kết quay lại đăng nhập ở Bước 1.
- **Expected Result:** Bước 1 phải cung cấp nút 'Quay lại đăng nhập' theo yêu cầu cụ thể của FR-03.
- **Actual Result:** Ở Bước 1 hoàn toàn không có bất kỳ nút hoặc liên kết nào để quay lại trang đăng nhập.
- **Evidence Screenshot:** `[HR-015.png](../evidence/failed-items/HR-015/HR-015.png)`

## 5. Evidence References (Đường dẫn bằng chứng kiểm thử)

Tất cả các ảnh chụp màn hình minh chứng lỗi được lưu trữ tại `task-1-gui-checklist/evidence/failed-items/` với cấu trúc thư mục chuẩn hóa theo ID:

- **GUI-001:** `task-1-gui-checklist/evidence/failed-items/GUI-001/GUI-001.png`
- **GUI-002:** `task-1-gui-checklist/evidence/failed-items/GUI-002/GUI-002.png`
- **GUI-006:** `task-1-gui-checklist/evidence/failed-items/GUI-006/GUI-006.png`
- **GUI-010:** `task-1-gui-checklist/evidence/failed-items/GUI-010/GUI-010.png`
- **GUI-011:** `task-1-gui-checklist/evidence/failed-items/GUI-011/GUI-011.png`
- **GUI-013:** `task-1-gui-checklist/evidence/failed-items/GUI-013/GUI-013.png`
- **GUI-015:** `task-1-gui-checklist/evidence/failed-items/GUI-015/GUI-015.png`
- **GUI-017:** `task-1-gui-checklist/evidence/failed-items/GUI-017/GUI-017.png`
- **GUI-025:** `task-1-gui-checklist/evidence/failed-items/GUI-025/GUI-025.png`
- **GUI-032:** `task-1-gui-checklist/evidence/failed-items/GUI-032/GUI-032.png`
- **GUI-034:** `task-1-gui-checklist/evidence/failed-items/GUI-034/GUI-034.png`
- **GUI-036:** `task-1-gui-checklist/evidence/failed-items/GUI-036/GUI-036.png`
- **GUI-052:** `task-1-gui-checklist/evidence/failed-items/GUI-052/GUI-052.png`
- **GUI-053:** `task-1-gui-checklist/evidence/failed-items/GUI-053/GUI-053.png`
- **GUI-054:** `task-1-gui-checklist/evidence/failed-items/GUI-054/GUI-054.png`
- **GUI-056:** `task-1-gui-checklist/evidence/failed-items/GUI-056/GUI-056.png`
- **GUI-057:** `task-1-gui-checklist/evidence/failed-items/GUI-057/GUI-057.png`
- **GUI-058:** `task-1-gui-checklist/evidence/failed-items/GUI-058/GUI-058.png`
- **GUI-059:** `task-1-gui-checklist/evidence/failed-items/GUI-059/GUI-059.png`
- **GUI-061:** `task-1-gui-checklist/evidence/failed-items/GUI-061/GUI-061.png`
- **GUI-066:** `task-1-gui-checklist/evidence/failed-items/GUI-066/GUI-066.png`
- **GUI-067:** `task-1-gui-checklist/evidence/failed-items/GUI-067/GUI-067.png`
- **GUI-073:** `task-1-gui-checklist/evidence/failed-items/GUI-073/GUI-073.png`
- **GUI-076:** `task-1-gui-checklist/evidence/failed-items/GUI-076/GUI-076.png`
- **HR-001:** `task-1-gui-checklist/evidence/failed-items/HR-001/HR-001.png`
- **HR-002:** `task-1-gui-checklist/evidence/failed-items/HR-002/HR-002.png`
- **HR-003:** `task-1-gui-checklist/evidence/failed-items/HR-003/HR-003.png`
- **HR-007:** `task-1-gui-checklist/evidence/failed-items/HR-007/HR-007.png`
- **HR-009:** `task-1-gui-checklist/evidence/failed-items/HR-009/HR-009.png`
- **HR-010:** `task-1-gui-checklist/evidence/failed-items/HR-010/HR-010.png`
- **HR-011:** `task-1-gui-checklist/evidence/failed-items/HR-011/HR-011.png`
- **HR-013:** `task-1-gui-checklist/evidence/failed-items/HR-013/HR-013.png`
- **HR-015:** `task-1-gui-checklist/evidence/failed-items/HR-015/HR-015.png`
