# Ghi chú phiên — P05 (**SIMULATED DATA**)

> Nội dung think-aloud và hành vi dưới đây là kịch bản hư cấu. Chúng **không** được nghe, quan sát hay trích xuất từ video Playwright. Video chỉ ghi lại thao tác tự động.

- **Persona:** Nguyễn Viết Toàn, 21 tuổi, sinh viên; đặc điểm giả định trong hồ sơ.
- **Run thực tế:** Playwright Chromium, 2026-11-15; kết quả kỹ thuật: login:PASS, cart:PASS, coupon:PASS, checkout:PASS, verify-order:PASS, logout:PASS.
- **Kịch bản hành vi hư cấu:** He expects a cart badge, looks at the header, then uses the cart link. At checkout he checks that the discount is reflected before confirming.
- **Điểm ngập ngừng giả định:** Looks for a quantity badge in the header and scans the cart summary.
- **Lỗi / phục hồi giả định:** No hypothetical error; notes that absent/unclear cart-count feedback could prompt a second check.
- **Lời nói mô phỏng:** “I want an obvious cart count and a clear breakdown of savings.” (câu hư cấu, không phải verbatim thật).
- **Consent / moderator / âm thanh:** N/A; không có participant.
- **Thời lượng usability:** Không đo người thật. Thời gian chạy tự động không được diễn giải là thời gian người dùng.
- **Evidence:** Playwright state capture tại `../../evidence/screenshots/P05-*.png`; video `../../evidence/session-recordings/P05-simulated.webm`. Không dùng chúng làm bằng chứng rằng persona đã nói/hành xử như trên.
