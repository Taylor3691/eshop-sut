# HW03 Task 1 — GUI Checklist Workspace

## Overview

This workspace prepares the documentation and execution template for HW03 Task 1. It is intentionally limited to planning and artefact preparation. No GUI execution, screenshots, verified defects, or GitHub issues are recorded here.

## Testing scope

- **Primary screen:** Login
- **Secondary screens:** Register; Forgot Password
- **Functional requirements:** FR-01 Account registration; FR-02 Login and account lockout; FR-03 Forgot password and password reset (two steps)
- **Interface aspects:** IA-01 General UI standards; IA-02 Forms; IA-03 Navigation; IA-04 Feedback / state

The checklist is for the web storefront. The repository identifies it as a React + Vite + Tailwind CSS application in `frontend-web/`, with the entry point at `frontend-web/src/main.jsx` and routes in `frontend-web/src/App.jsx`.

## Directory structure

```text
task-1-gui-checklist/
├── README.md
├── docs/
│   ├── scope-and-test-strategy.md
│   ├── requirements-mapping.md
│   ├── ai-audit-log.md
│   ├── ai-gap-analysis.md
│   ├── test-execution-report.md
│   └── test-summary.md
├── checklist/
│   ├── ai-generated-checklist.md
│   ├── human-reviewed-checklist.md
│   ├── gui-checklist.md
│   └── gui-checklist.xlsx
├── bug-reports/
│   ├── README.md
│   └── BUG-REPORT-TEMPLATE.md
├── evidence/
│   ├── failed-items/
│   └── github-issues/
└── prompts/
    ├── 00-prepare-workspace.md
    ├── 01-generate-ai-checklist.md
    ├── 02-human-review-and-gap-analysis.md
    └── 03-execute-checklist-and-report-bugs.md
```

## Execution workflow

1. Confirm this workspace and source requirements.
2. Generate an initial checklist using `prompts/01-generate-ai-checklist.md`.
3. Record the AI interaction in `docs/ai-audit-log.md`.
4. Review the initial checklist, add human items, and document omissions using `prompts/02-human-review-and-gap-analysis.md`.
5. Use `checklist/gui-checklist.md` as the primary GitHub-readable checklist document. Keep `checklist/gui-checklist.xlsx` as the backup workbook and update both when execution begins.
6. Run the application only during the later execution phase, then record results in Markdown and evidence using `prompts/03-execute-checklist-and-report-bugs.md`.

## Evidence conventions

Store screenshots for failed checklist items only in `evidence/failed-items/`, using a stable name such as `CHK-001-login-invalid-email.png`. Store exported or copied GitHub issue evidence in `evidence/github-issues/`. Do not store credentials, tokens, or fabricated evidence.

## Checklist source of truth

`checklist/gui-checklist.md` is the primary document for GitHub review and execution reporting. `checklist/gui-checklist.xlsx` is retained as a backup and structured execution aid. The current workbook conversion found that its Checklist worksheet contains headers but no populated checklist rows; this limitation is recorded in `checklist/gui-checklist.md` rather than filled with values from another source.

## Source and limitation note

Primary sources are the repository [`README.md`](../README.md), [`setup_guide.md`](../setup_guide.md), the frontend source, and [`docs/2026.HW03.md`](../docs/2026.HW03.md). The referenced assignment PDF exists at `../docs/2026.HW03.GUI Usability_En.pdf`, but PDF text extraction was unavailable during preparation; it has not been represented as read.
