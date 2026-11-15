# Ghi chú phiên — P01 (**SIMULATED DATA**)

> Nội dung think-aloud và hành vi dưới đây là kịch bản hư cấu. Chúng **không** được nghe, quan sát hay trích xuất từ video Playwright. Video chỉ ghi lại thao tác tự động.

- **Persona:** Phạm Bảo Huy, 21 tuổi, sinh viên; đặc điểm giả định trong hồ sơ.
- **Run thực tế:** Playwright Chromium, 2026-11-15; kết quả kỹ thuật: login:PASS, cart:PASS, coupon:PASS, checkout:PASS, verify-order:PASS, logout:PASS.
- **Kịch bản hành vi hư cấu:** The login heading looks like registration, so he pauses and checks the fields before entering credentials. In the simulated narrative he completes login, then asks whether the cart total includes the coupon.
- **Điểm ngập ngừng giả định:** Login heading and Username label; compares the total before and after coupon.
- **Lỗi / phục hồi giả định:** Initially interprets the login screen as registration; recovers by noticing the existing-account sign-in action.
- **Lời nói mô phỏng:** “The screen looked like registration at first. The coupon saving was easier to understand once it appeared.” (câu hư cấu, không phải verbatim thật).
- **Consent / moderator / âm thanh:** N/A; không có participant.
- **Thời lượng usability:** Không đo người thật. Thời gian chạy tự động không được diễn giải là thời gian người dùng.
- **Evidence:** Playwright state capture tại `../../evidence/screenshots/P01-*.png`; video `../../evidence/session-recordings/P01-simulated.webm`. Không dùng chúng làm bằng chứng rằng persona đã nói/hành xử như trên.
