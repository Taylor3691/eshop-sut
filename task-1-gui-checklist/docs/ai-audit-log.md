# AI Audit Log

Ghi một row cho mỗi AI interaction dùng để tạo hoặc review Checklist. Các entry này chỉ ghi nhận interaction ở giai đoạn design/review; chưa thực hiện GUI execution.

| Interaction ID | AI Tool | Date/Time | Prompt File | Purpose | Output File |
|---|---|---|---|---|---|
| AI-001 | Copilot SDK in VS Code | 2026-11-11 17:00:10 +07:00 | `prompts/01-generate-ai-checklist.md` | Analyze the documented requirements and actual scoped React screens, then generate a 48+ item initial GUI checklist covering IA-01–IA-04 across Login, Register, and Forgot Password. Exclude human-added items and execution results. | `checklist/ai-generated-checklist.md` |
| AI-002 | Copilot SDK in VS Code | 2026-11-11 17:02:49 +07:00 | `prompts/02-human-review-and-gap-analysis.md` | Independently review every initial item for traceability, applicability, duplication, and testability; add only justified human items and document each demonstrated gap. | `checklist/human-reviewed-checklist.md`; `docs/ai-gap-analysis.md`; `checklist/gui-checklist.xlsx` |
| AI-003 | Copilot SDK in VS Code | 2026-11-11 18:40:27 +07:00 | `prompts/03-execute-checklist-and-report-bugs.md` | Việt hóa tài liệu Task 1 theo quy ước Vietnamese-first, giữ nguyên checklist data, ID, paths, status values và GitHub conventions; chưa thực thi GUI. | `task-1-gui-checklist/` documentation files |

## Interaction record

**Prompt used:** Prompt đầy đủ được giữ trong `prompts/01-generate-ai-checklist.md`.

**Input sources read:** `README.md`, `docs/2026.HW03.md`, `task-1-gui-checklist/docs/scope-and-test-strategy.md`, `task-1-gui-checklist/docs/requirements-mapping.md`, `frontend-web/src/App.jsx`, `frontend-web/src/pages/Login.jsx`, `frontend-web/src/pages/Register.jsx` và `frontend-web/src/pages/ForgotPassword.jsx`.

**Execution boundary:** Không start application, không execute GUI test, không assign PASS/FAIL và không tạo bug report hoặc screenshot.

**AI-002 review boundary:** Immutable initial checklist đã được đọc nhưng không sửa. Không start application, không execute GUI test, không assign PASS/FAIL và không tạo bug report hoặc screenshot.
