# HW03 Task 1 — Workspace Checklist GUI

## Tổng quan

Workspace này chuẩn bị tài liệu và biểu mẫu thực thi cho HW03 Task 1. Phạm vi hiện tại chỉ gồm lập kế hoạch và chuẩn bị artefact; chưa thực hiện GUI, chưa tạo screenshot, chưa xác minh defect và chưa tạo GitHub Issue.

## Phạm vi kiểm thử

- **Primary screen:** Login
- **Secondary screens:** Register; Forgot Password
- **Functional requirements:** FR-01 Account registration; FR-02 Login and account lockout; FR-03 Forgot password and password reset (two steps)
- **Interface aspects:** IA-01 General UI standards; IA-02 Forms; IA-03 Navigation; IA-04 Feedback / state

Checklist áp dụng cho web storefront. Repository xác định ứng dụng dùng React + Vite + Tailwind CSS trong `frontend-web/`, với entry point tại `frontend-web/src/main.jsx` và routes tại `frontend-web/src/App.jsx`.

## Cấu trúc thư mục

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

## Quy trình thực thi

1. Xác nhận workspace và các yêu cầu nguồn.
2. Tạo checklist ban đầu bằng `prompts/01-generate-ai-checklist.md`.
3. Ghi lại tương tác AI trong `docs/ai-audit-log.md`.
4. Review checklist ban đầu, thêm các mục của người và ghi nhận thiếu sót bằng `prompts/02-human-review-and-gap-analysis.md`.
5. Dùng `checklist/gui-checklist.md` làm tài liệu checklist chính để review trên GitHub. Giữ `checklist/gui-checklist.xlsx` làm workbook backup và cập nhật cả hai khi bắt đầu thực thi.
6. Chỉ chạy ứng dụng ở giai đoạn Test Execution; ghi kết quả và Evidence theo `prompts/03-execute-checklist-and-report-bugs.md`.

## Quy ước Evidence

Chỉ lưu screenshot của checklist item Failed trong `evidence/failed-items/`, dùng tên ổn định như `CHK-001-login-invalid-email.png`. Lưu Evidence xuất hoặc sao chép từ GitHub Issue trong `evidence/github-issues/`. Không lưu credentials, token hoặc Evidence giả.

## Nguồn dữ liệu chính của Checklist

`checklist/gui-checklist.md` là tài liệu chính để review trên GitHub và ghi nhận Test Execution. `checklist/gui-checklist.xlsx` được giữ làm backup và công cụ thực thi có cấu trúc. Khi chuyển đổi, worksheet Checklist trong workbook chỉ có header, chưa có checklist row; giới hạn này được ghi trong `checklist/gui-checklist.md`, không tự điền dữ liệu từ nguồn khác.

## Nguồn và giới hạn

Nguồn chính gồm [`README.md`](../README.md), [`setup_guide.md`](../setup_guide.md), frontend source và [`docs/2026.HW03.md`](../docs/2026.HW03.md). Assignment PDF tại `../docs/2026.HW03.GUI Usability_En.pdf` có tồn tại; nội dung PDF đã được giữ nguyên theo nguồn và không được dùng để thay đổi checklist data trong workspace.
