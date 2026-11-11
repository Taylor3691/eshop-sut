# Prompt 01 — Generate Initial AI Checklist

Act as a Senior QA Engineer specializing in GUI testing and test documentation.

Read the complete EShop repository `README.md`, the assignment requirements in `docs/2026.HW03.md`, `task-1-gui-checklist/docs/scope-and-test-strategy.md`, and `task-1-gui-checklist/docs/requirements-mapping.md`. Analyze the actual React/Vite web storefront implementation in `frontend-web/src/App.jsx`, `frontend-web/src/main.jsx`, `frontend-web/src/pages/Login.jsx`, `frontend-web/src/pages/Register.jsx`, and `frontend-web/src/pages/ForgotPassword.jsx`, including their relevant UI flows and routes.

Generate the initial GUI checklist for HW03 Task 1 with at least 48 meaningful, independently testable items. The selected scope is:

- Primary screen: Login at `/login`.
- Secondary screen: Register at `/register`.
- Secondary screen: Forgot Password at `/forgot-password`, including its step 1 and step 2 states.
- Functional requirements: FR-01 Account registration, FR-02 Login and account lockout, and FR-03 Forgot password and password reset (two steps).
- Interface aspects: IA-01 General UI standards, IA-02 Forms, IA-03 Navigation, and IA-04 Feedback / state.

For every checklist item provide:

1. A unique ID.
2. The IA aspect.
3. The screen.
4. One observable, independently testable GUI criterion.
5. A requirement reference.
6. The expected result.
7. The source.
8. An `AI Gap Reason` value stating that human review is pending.
9. Blank `Actual Result`, `Status`, `Notes`, and `Evidence` fields for later execution.

Distinguish explicit requirements from usability/accessibility recommendations. Use `FR-*` and `IA-*` references for documented requirements, and a clearly marked `REC-*` reference for recommendations. Do not assign FR IDs to interface aspects. Do not invent UI elements or behavior: derive controls, routes, states, labels, and flows from the cited documentation and source. Exclude backend-only assertions unless they have an observable GUI criterion. Check for duplicate IDs, duplicate criteria, vague wording, and non-GUI items. Distribute meaningful coverage across all three screens and all four IA aspects.

Do not start the application, execute GUI tests, assign PASS/FAIL, create screenshots, create bug reports, or add human-generated checklist items. Save the exact initial output to `task-1-gui-checklist/checklist/ai-generated-checklist.md`. Record this interaction in `task-1-gui-checklist/docs/ai-audit-log.md` with the actual tool, date/time, prompt file, purpose, and output file.
