# Firefox — Kết quả thực thi

- Ngày chạy: 2026-11-16
- Browser project: Firefox
- Tổng test: 14
- Passed: 0
- Failed: 0
- Blocked: 14
- Skipped: 0

Firefox không tạo được browser context; Playwright báo `browserContext.newPage:
Target crashed` ở mọi test, cả khi chạy song song và tuần tự với một worker.
Vì vậy không được coi các test này là Failed của ứng dụng và không có
Firefox screenshot evidence hợp lệ.
