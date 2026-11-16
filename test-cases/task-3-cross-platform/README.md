# Task 3 — Kiểm thử GUI đa trình duyệt

Thư mục này chứa mapping checklist Task 1, cấu hình Playwright cho Chromium,
Firefox và WebKit, test theo bốn nhóm IA và evidence có overlay sinh viên.

## Môi trường

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Browser projects: Chromium, Firefox, WebKit
- WebKit là engine tương thích Safari để kiểm thử trên Windows; không phải
  Safari native trên macOS.
- Overlay: `Nguyễn Hữu Phúc - 23120157`
- Email: `23120157@student.hcmus.edu.vn`

## Chạy

Từ thư mục này:

```powershell
npm install
npx playwright install chromium firefox webkit
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test
```

Khởi động backend và frontend bằng các lệnh trong `setup_guide.md` trước khi
chạy test. Không coi test chưa chạy hoặc bị block là Passed.
