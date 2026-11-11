# AI Audit Log

Record one row for every AI interaction used to generate or review the checklist. These entries document design/review interactions only; no GUI execution was performed.

| Interaction ID | AI Tool | Date/Time | Prompt File | Purpose | Output File |
|---|---|---|---|---|---|
| AI-001 | Copilot SDK in VS Code | 2026-11-11 17:00:10 +07:00 | `prompts/01-generate-ai-checklist.md` | Analyze the documented requirements and actual scoped React screens, then generate a 48+ item initial GUI checklist covering IA-01–IA-04 across Login, Register, and Forgot Password. Exclude human-added items and execution results. | `checklist/ai-generated-checklist.md` |
| AI-002 | Copilot SDK in VS Code | 2026-11-11 17:02:49 +07:00 | `prompts/02-human-review-and-gap-analysis.md` | Independently review every initial item for traceability, applicability, duplication, and testability; add only justified human items and document each demonstrated gap. | `checklist/human-reviewed-checklist.md`; `docs/ai-gap-analysis.md`; `checklist/gui-checklist.xlsx` |

## Interaction record

**Prompt used:** The complete prompt is preserved in `prompts/01-generate-ai-checklist.md`.

**Input sources read:** `README.md`, `docs/2026.HW03.md`, `task-1-gui-checklist/docs/scope-and-test-strategy.md`, `task-1-gui-checklist/docs/requirements-mapping.md`, `frontend-web/src/App.jsx`, `frontend-web/src/pages/Login.jsx`, `frontend-web/src/pages/Register.jsx`, and `frontend-web/src/pages/ForgotPassword.jsx`.

**Execution boundary:** No application was started, no GUI test was executed, no PASS/FAIL value was assigned, and no bug report or screenshot was created.

**AI-002 review boundary:** The immutable initial checklist was read but not modified. No application was started, no GUI test was executed, no PASS/FAIL value was assigned, and no bug report or screenshot was created.
