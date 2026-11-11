# Prompt 01 — Tạo AI Checklist Ban đầu

Đóng vai Senior QA Engineer chuyên về GUI Testing và Test Documentation.

Đọc toàn bộ EShop repository `README.md`, assignment requirement trong `docs/2026.HW03.md`, `task-1-gui-checklist/docs/scope-and-test-strategy.md` và `task-1-gui-checklist/docs/requirements-mapping.md`. Phân tích implementation React/Vite thực tế trong `frontend-web/src/App.jsx`, `frontend-web/src/main.jsx`, `frontend-web/src/pages/Login.jsx`, `frontend-web/src/pages/Register.jsx` và `frontend-web/src/pages/ForgotPassword.jsx`, bao gồm UI flow và route liên quan.

Tạo GUI Checklist ban đầu cho HW03 Task 1 với ít nhất 48 item có ý nghĩa và có thể test độc lập. Scope được chọn:

- Primary screen: Login at `/login`.
- Secondary screen: Register at `/register`.
- Secondary screen: Forgot Password at `/forgot-password`, including its step 1 and step 2 states.
- Functional requirements: FR-01 Account registration, FR-02 Login and account lockout, and FR-03 Forgot password and password reset (two steps).
- Interface aspects: IA-01 General UI standards, IA-02 Forms, IA-03 Navigation, and IA-04 Feedback / state.

Với mỗi checklist item, cung cấp:

1. A unique ID.
2. The IA aspect.
3. The screen.
4. One observable, independently testable GUI criterion.
5. A requirement reference.
6. The expected result.
7. The source.
8. An `AI Gap Reason` value stating that human review is pending.
9. Blank `Actual Result`, `Status`, `Notes`, and `Evidence` fields for later execution.

Phân biệt explicit requirement với usability/accessibility recommendation. Dùng reference `FR-*` và `IA-*` cho documented requirement, và reference `REC-*` được đánh dấu rõ cho recommendation. Không gán FR ID cho interface aspect. Không invent UI element hoặc behavior: suy ra control, route, state, label và flow từ documentation/source được trích dẫn. Loại backend-only assertion nếu không có GUI criterion quan sát được. Kiểm tra duplicate ID, duplicate criterion, wording vague và non-GUI item. Phân bố coverage có ý nghĩa trên cả ba screen và bốn IA aspect.

Không start application, execute GUI test, assign PASS/FAIL, tạo screenshot, tạo bug report hoặc thêm human-generated checklist item. Lưu exact initial output vào `task-1-gui-checklist/checklist/ai-generated-checklist.md`. Ghi interaction này trong `task-1-gui-checklist/docs/ai-audit-log.md` cùng tool, date/time, prompt file, purpose và output file thực tế.
