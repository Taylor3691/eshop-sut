# Task 3 — Bug traceability

Task 3 không tạo issue GitHub mới. Các failure đã xác minh trùng với bug của
Task 1:

| Checklist | Defect | Nguồn hiện có |
|---|---|---|
| GUI-010 | Login email dùng `type="text"` | `task-1-gui-checklist/bug-reports/BUG-20261111-010.md` |
| GUI-011 | Login password dùng `type="text"` | `task-1-gui-checklist/bug-reports/BUG-20261111-011.md` |
| GUI-030/031/032 | Register email dùng `type="text"` | Task 1 execution evidence |

Các failure tái hiện trên Chromium và WebKit. Firefox bị block ở browser
startup nên không dùng làm bằng chứng defect.
