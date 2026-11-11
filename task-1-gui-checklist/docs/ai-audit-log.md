# AI Audit Log

Ghi một row cho mỗi AI interaction dùng để tạo hoặc review Checklist. Các entry này chỉ ghi nhận interaction ở giai đoạn design/review; chưa thực hiện GUI execution.

| Interaction ID | AI Tool | Date/Time | Prompt File | Purpose | Output File |
|---|---|---|---|---|---|
| AI-001 | Copilot SDK in VS Code | 2026-11-11 17:00:10 +07:00 | `prompts/01-generate-ai-checklist.md` | Analyze the documented requirements and actual scoped React screens, then generate a 48+ item initial GUI checklist covering IA-01–IA-04 across Login, Register, and Forgot Password. Exclude human-added items and execution results. | `checklist/ai-generated-checklist.md` |
| AI-002 | Copilot SDK in VS Code | 2026-11-11 17:02:49 +07:00 | `prompts/02-human-review-and-gap-analysis.md` | Independently review every initial item for traceability, applicability, duplication, and testability; add only justified human items and document each demonstrated gap. | `checklist/human-reviewed-checklist.md`; `docs/ai-gap-analysis.md`; `checklist/gui-checklist.xlsx` |
| AI-003 | Copilot SDK in VS Code | 2026-11-11 18:40:27 +07:00 | `prompts/03-execute-checklist-and-report-bugs.md` | Việt hóa tài liệu Task 1 theo quy ước Vietnamese-first, giữ nguyên checklist data, ID, paths, status values và GitHub conventions; chưa thực thi GUI. | `task-1-gui-checklist/` documentation files |
| AI-004 | Antigravity Senior QA Engineer Agent (Gemini 3.8 Flash) | 2026-11-11 19:43:00 +07:00 | `prompts/03-execute-checklist-and-report-bugs.md` | Khởi chạy môi trường ứng dụng thực tế theo setup_guide.md; thực thi toàn diện 92 approved checklist items trên các màn hình Login, Register và Forgot Password; chụp ảnh bằng chứng cho 33 Failed items; lập 19 bug reports và tạo 19 GitHub Issues (#107-#125); cập nhật đầy đủ báo cáo bằng tiếng Việt chuẩn mực. | `checklist/gui-checklist.xlsx`, `checklist/gui-checklist.md`, `checklist/human-reviewed-checklist.md`, `docs/test-execution-report.md`, `docs/test-summary.md`, `bug-reports/`, `evidence/` |

## Interaction record

**Prompt used:** Prompt đầy đủ được giữ trong `prompts/01-generate-ai-checklist.md` và `prompts/03-execute-checklist-and-report-bugs.md`.

**Input sources read:** `README.md`, `docs/2026.HW03.md`, `task-1-gui-checklist/docs/scope-and-test-strategy.md`, `task-1-gui-checklist/docs/requirements-mapping.md`, `task-1-gui-checklist/checklist/human-reviewed-checklist.md`, `task-1-gui-checklist/checklist/gui-checklist.xlsx`, `frontend-web/src/App.jsx`, `frontend-web/src/pages/Login.jsx`, `frontend-web/src/pages/Register.jsx` và `frontend-web/src/pages/ForgotPassword.jsx`.

**Execution boundary:** Khởi chạy Backend (`http://localhost:3000`) và Frontend (`http://localhost:5173`) theo tài liệu hướng dẫn `setup_guide.md` và `AGENTS.md`. Sử dụng Chrome headless qua Puppeteer Core để thực thi tương tác thực tế, ghi nhận kết quả thật, chụp ảnh screenshot minh chứng cho toàn bộ 33 item Failed. Không sửa đổi mã nguồn ứng dụng để ép test pass. Tạo 19 GitHub Issues thật kèm minh chứng và lưu biên bản tại `evidence/github-issues/`.

**AI-002 review boundary:** Immutable initial checklist đã được đọc nhưng không sửa. Không start application, không execute GUI test, không assign PASS/FAIL và không tạo bug report hoặc screenshot.

**AI-004 execution summary:**
- 92/92 items đã được thực thi và quan sát trực tiếp (59 Passed, 33 Failed, 0 Not Executed).
- 33/33 Failed items có đầy đủ ảnh chụp màn hình trong `evidence/failed-items/<ID>/<ID>.png`.
- 19 Bug Reports đạt chuẩn được tạo trong `bug-reports/BUG-20261111-*.md`.
- 19 GitHub Issues (#107 đến #125) được tạo thành công trên repository `Taylor3691/eshop-sut`.
