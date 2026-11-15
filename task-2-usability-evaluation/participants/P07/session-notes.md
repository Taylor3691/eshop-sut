# Ghi chú phiên — P07 (**SIMULATED DATA**)

> Nội dung think-aloud và hành vi dưới đây là kịch bản hư cấu. Chúng **không** được nghe, quan sát hay trích xuất từ video Playwright. Video chỉ ghi lại thao tác tự động.

- **Persona:** Cao Trọng Khang, 21 tuổi, sinh viên; đặc điểm giả định trong hồ sơ.
- **Run thực tế:** Playwright Chromium, 2026-11-15; kết quả kỹ thuật: login:PASS, cart:PASS, coupon:PASS, checkout:PASS, verify-order:PASS, logout:PASS.
- **Kịch bản hành vi hư cấu:** He treats order-history verification as essential, checks the order row after checkout, then looks for the logout control to finish.
- **Điểm ngập ngừng giả định:** Checks the order status and pauses before using the ambiguously labeled logout action.
- **Lỗi / phục hồi giả định:** No hypothetical task error; logout wording makes the end of the task less explicit.
- **Lời nói mô phỏng:** “I want the order status and sign-out action to be explicit.” (câu hư cấu, không phải verbatim thật).
- **Consent / moderator / âm thanh:** N/A; không có participant.
- **Thời lượng usability:** Không đo người thật. Thời gian chạy tự động không được diễn giải là thời gian người dùng.
- **Evidence:** Playwright state capture tại `../../evidence/screenshots/P07-*.png`; video `../../evidence/session-recordings/P07-simulated.webm`. Không dùng chúng làm bằng chứng rằng persona đã nói/hành xử như trên.
