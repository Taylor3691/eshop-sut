# Phạm vi và Test Strategy

## Mục tiêu

Chuẩn bị GUI Checklist có traceability cho các màn hình Login, Register và Forgot Password của EShop web storefront. Giai đoạn Test Execution sau đó phải đánh giá bốn interface aspect đã được tài liệu hóa theo FR-01, FR-02 và FR-03 mà không thay đổi application code.

## Trong phạm vi

- Login screen và các interaction thành công, không hợp lệ, thất bại lặp lại liên quan FR-02.
- Register screen và validation/navigation liên quan FR-01.
- Forgot Password step 1 (request OTP) và step 2 (reset password) liên quan FR-03.
- IA-01 General UI standards, IA-02 Forms, IA-03 Navigation và IA-04 Feedback / state.

## Ngoài phạm vi

- Product, cart, checkout, profile, admin và mobile screens.
- Backend/API-only testing, trừ khi UI interaction cần một observable response.
- Security testing ngoài các observable UI requirement.
- GUI execution, screenshot, bug filing và test result trong giai đoạn chuẩn bị này.

## Screen và flow được chọn

| Screen | Route | Flow focus |
|---|---|---|
| Login | `/login` | Enter email/password, submit, recover via forgot password, navigate to registration |
| Register | `/register` | Enter name/email/password, submit, navigate to login |
| Forgot Password | `/forgot-password` | Request OTP (step 1), enter reset information (step 2), return to login |

Routes được định nghĩa trong `frontend-web/src/App.jsx`.

## Test environment

Repository ghi nhận Node.js backend tại `http://localhost:3000` và Vite web frontend thường chạy tại `http://localhost:5173`. Tuân thủ setup instruction của repository và ghi lại URL/configuration thực tế khi Test Execution; không giả định environment đang chạy trong tài liệu chuẩn bị này.

## Giả định Browser và viewport

Execution record phải nêu browser, version, operating system, viewport và device/cloud platform. Chưa giả định browser hoặc viewport result nào ở đây. Assignment yêu cầu coverage trên ít nhất ba platform ở task sau.

## Yêu cầu Test Data

- Chỉ dùng demo user đã được tài liệu hóa khi cần: `test@eshop.com` với password đã được ghi trong repository. Không sao chép password hoặc token vào Evidence/report.
- Dùng email mới, không nhạy cảm cho registration nếu environment cho phép.
- Dùng email đã đăng ký cho Forgot Password flow.
- Tạo input invalid, boundary, mismatched và repeated-failure trong khi Test Execution nhưng không lưu secret.

## Testing approach

1. Trace mỗi checklist item về một FR hoặc IA source.
2. Review AI-generated item theo source và thêm human item cho các omission.
3. Execute scenario normal, invalid, boundary, navigation và state/feedback.
4. Chỉ ghi nhận result đã quan sát. Item trước Test Execution dùng `Not Executed`; final status là `Passed` hoặc `Failed`.
5. Chỉ capture Evidence cho Failed item và chỉ report verified bug.
