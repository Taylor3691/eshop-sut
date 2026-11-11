# Nhật ký Kiểm toán Sử dụng AI (AI Audit Log - HW03 Task 2)

> **Tuyên bố sử dụng AI:** Tôi sử dụng công cụ AI (Gemini 3.8 Flash trong vai trò Antigravity Senior QA & Usability Specialist) để hỗ trợ lập kế hoạch, cấu trúc tài liệu, soạn thảo bộ công cụ chuẩn (SUS, UEQ-S, Probe questions) và thiết kế biểu mẫu quan sát. Toàn bộ kịch bản, quy trình và biểu mẫu đều được rà soát bởi con người. Các phiên kiểm thử người dùng thực tế và bằng chứng kiểm thử hoàn toàn do con người thực hiện, tuân thủ nghiêm ngặt chính sách Anti-AI-Cheat.

---

## 1. Bảng Tổng hợp Tương tác AI (Interaction Summary Table)

| Interaction ID | AI Tool | Date/Time | Prompt File | Purpose | Output Deliverable |
|:---:|---|---|---|---|---|
| **AI-001** | Gemini 3.8 Flash (Antigravity Senior QA Specialist) | 2026-11-11 21:05 +07:00 | `prompts/00-prepare-workspace.md` | Chuẩn bị cấu trúc thư mục workspace cho Task 2 Usability Evaluation, thiết lập các phân hệ prompts, planning, instruments, participants, analysis, bug-reports, ai-audit và evidence. | Toàn bộ cấu trúc workspace `task-2-usability-evaluation/` và `README.md`. |
| **AI-002** | Gemini 3.8 Flash (Antigravity Senior QA Specialist) | 2026-11-11 21:06 +07:00 | `prompts/01-planning-and-instruments.md` | Thiết kế Kế hoạch kiểm thử Usability toàn diện (`test-plan.md`), Kịch bản nhiệm vụ hướng mục tiêu (`task-scenarios.md`), bộ thang đo chuẩn SUS, UEQ-S, câu hỏi phỏng vấn sâu và form cam kết đồng thuận. | `planning/test-plan.md`, `planning/task-scenarios.md`, các tập tin trong `instruments/`. |
| **AI-003** | Gemini 3.8 Flash (Antigravity Senior QA Specialist) | 2026-11-11 21:07 +07:00 | `prompts/02-participant-recruitment-and-pilot.md` & `prompts/03-session-observation-and-notes.md` | Soạn thảo biểu mẫu danh sách người tham gia (bảo mật ẩn 4 số giữa), biểu mẫu ghi chép quan sát phiên theo giao thức Think-Aloud, và biểu mẫu phiên thử nghiệm Pilot. | `participants/participant-roster-template.md`, `participants/session-notes-template.md`, `participants/pilot-session-notes-template.md`. |
| **AI-004** | Gemini 3.8 Flash (Antigravity Senior QA Specialist) | 2026-11-11 21:08 +07:00 | `prompts/04-quantitative-qualitative-analysis.md` & `prompts/05-bug-reporting-and-issues.md` | Xây dựng mô hình tính điểm SUS, biểu mẫu tổng hợp định tính theo chủ đề và quy ước báo cáo lỗi Usability kèm đồng bộ GitHub Issues. | `analysis/sus-scoring-template.md`, `analysis/qualitative-synthesis-template.md`, `bug-reports/BUG-REPORT-TEMPLATE.md`. |

---

## 2. Chi tiết Nhật ký Tương tác (Interaction Records)

### Tương tác AI-001: Chuẩn bị Workspace
- **Công cụ:** Antigravity Senior QA Engineer Agent (Gemini 3.8 Flash).
- **Thời gian:** 2026-11-11 21:05:07 +07:00.
- **Tập tin Prompt liên quan:** `task-2-usability-evaluation/prompts/00-prepare-workspace.md`.
- **Tài liệu nguồn đã đọc và phân tích:**
  - `README.md` (Đặc tả Yêu cầu Hệ thống EShop).
  - `docs/2026.HW03.md` (Đề cương và yêu cầu bài tập HW03).
  - `task-1-gui-checklist/` (Cấu trúc, phong cách đặt tên và quy ước Task 1).
- **Giới hạn thực thi (Execution Boundary):** Không tự tạo dữ liệu người tham gia giả mạo; không tạo bằng chứng hay video giả; giữ các prompt bằng tiếng Anh và tài liệu chính khóa luận bằng tiếng Việt.
- **Đầu ra tạo lập:** Thư mục `task-2-usability-evaluation/` và tập tin điều phối tổng thể `README.md`.

*(Các tương tác tiếp theo khi tiến hành phân tích kết quả thực tế sẽ tiếp tục được bổ sung vào nhật ký này).*

