# WebKit — Kết quả thực thi

- Ngày chạy: 2026-11-16
- Browser project: WebKit
- SUT: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Tổng test: 14
- Passed: 12
- Failed: 2
- Blocked: 0
- Skipped: 0

## Failed

- `GUI-010/GUI-011`: Login dùng `type="text"` thay vì `email` và `password`.
- `GUI-030/GUI-031/GUI-032`: Register dùng `type="text"` cho email.

Đây là lỗi ứng dụng đã phù hợp với kết quả Task 1, không phải lỗi script.
WebKit là browser engine trên Windows, không chứng minh Safari native trên
macOS. Screenshot có overlay sinh viên được lưu trong `screenshots/webkit/`.
