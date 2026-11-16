# HW03 — GUI & Usability Testing Submission (`23120146`)

- **Sinh viên thực hiện:** `Hoàng Ngọc`
- **MSSV:** `23120146`
- **Môn học:** Kiểm thử Phần mềm (`HW03-AI`)
- **Kho lưu trữ & Nhánh Git:** [`Taylor3691/eshop-sut`](https://github.com/Taylor3691/eshop-sut/tree/HW03/Ngoc) (Branch: `HW03/Ngoc`)
- **System Under Test (SUT):** EShop Web Customer (`http://localhost:5173`, Backend `http://localhost:3000`, Web Admin `http://localhost:5174`)

---

## 1. Bảng Tự Đánh giá (Self-Assessment Table)

> *(Sinh viên kiểm tra lại điểm tự chấm và điền link video YouTube + thông tin liên hệ xác minh che 4 số giữa của `P1`–`P7` trước khi nén nộp Moodle).*

| STT | Tiêu chí | Điểm tối đa | Tự đánh giá | Minh chứng chính |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Task 1 — GUI Checklist** (Thiết kế > 40 mục + Blind-spot review + Thực thi Excel + 31 GitHub Issues kèm ảnh) | 30 | `28 / 30` | [`task1-gui-checklist.md`](./task1-gui-checklist.md), [`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx), [`task1-bug-report.md`](./task1-bug-report.md) |
| **2** | **Task 2 — Usability Evaluation** (Kịch bản hướng mục tiêu + 7 người tham gia + SUS + Phân tích 4 trụ cột + Issues) | 40 | `36 / 40` | [`task2-usability-plan.md`](./task2-usability-plan.md), [`task2-participant-results.md`](./task2-participant-results.md), [`task2-usability-report.md`](./task2-usability-report.md) |
| **3** | **Task 3 — Cross-Browser / Cross-Platform** (Thực thi lại 52 mục trên Chrome 136, Firefox 160, Safari 26 + cập nhật 31 Issues) | 20 | `20 / 20` | [`task3-cross-platform.md`](./task3-cross-platform.md), [`screenshots/task3/`](./screenshots/task3) |
| **4** | **Agent Skills** (3 Agent Skills tái sử dụng + Video demo End-to-End trên YouTube) | 10 | `08 / 10` | [`../.agents/skills/`](../.agents/skills) + *(Chèn link YouTube sau khi upload)* |
| | **Tổng cộng** | **100** | **`92 / 100`** | |

---

## 2. Báo cáo Tóm tắt (Test Summary)

- **Phạm vi kiểm thử (Screens & Flow Tested):**
  - **Task 1 & Task 3 (GUI Checklist):** Màn hình chính Hồ sơ cá nhân (`/profile`); 2 màn hình phụ Đăng ký (`/register`), Quên mật khẩu (`/forgot-password`) và thành phần dùng chung (`Header`, `AuthContext`, `index.html`).
  - **Task 2 (Usability E2E Flow):** `Đăng ký tài khoản mới → Đăng nhập → Cập nhật hồ sơ cá nhân (Họ tên, SĐT, Địa chỉ giao hàng) → Kiểm chứng thông tin đã lưu → Đăng xuất`.
- **Số lượng GUI Checklist Items:** **52** mục thiết kế (`44` AI + `8` Human bổ sung), **52** mục đã thực thi (`12 Passed`, `40 Failed`, `0 Pending`, tỷ lệ Pass `23.1%`) trên cả **3 nền tảng** (**Google Chrome 136 / Windows 11**, **Mozilla Firefox 160 / macOS Tahoe 26**, **Apple Safari 26 / macOS Tahoe 26**).
- **Số lượng Bugs & GitHub Issues đã báo cáo:** **34 GitHub Issues** ([`#191`](https://github.com/Taylor3691/eshop-sut/issues/191) – [`#224`](https://github.com/Taylor3691/eshop-sut/issues/224)), gồm **31 Bugs** từ Task 1 (đã cập nhật bằng chứng đa nền tảng cho cả 31 Issues) và **3 Usability Issues** chuyên biệt từ Task 2 (`#222`–`#224`).
- **Kết quả Usability Evaluation (Task 2):** **7 người tham gia chính thức (`P1`–`P7`)**, điểm **SUS trung bình = `85.00 / 100`** (`Min = 80.0`, `Max = 92.5`, `Median = 82.5`), xác định **4 vấn đề hệ thống** lặp lại ở `7/7` người dùng.
- **Link Video Demo Agent Skill (YouTube Unlisted/Public):** `[CHÈN_LINK_YOUTUBE_SAU_KHI_QUAY_VIDEO]`

---

## 3. Danh mục Tài liệu Trong Thư mục Nộp (`23120146/`)

| Hạng mục | File Markdown / Dữ liệu | File PDF / Bổ sung |
| :--- | :--- | :--- |
| **Báo cáo Chính (Main Report)** | [`main-report.md`](./main-report.md) | [`main-report.pdf`](./main-report.pdf) |
| **Task 1 — GUI Checklist & Excel** | [`task1-gui-checklist.md`](./task1-gui-checklist.md) | [`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx) |
| **Task 1 & 3 — Bug Report (31 Bugs + Issue Screenshots)** | [`task1-bug-report.md`](./task1-bug-report.md) | [`task1-bug-report.pdf`](./task1-bug-report.pdf) |
| **Task 2 — Usability Plan & Participant Form** | [`task2-usability-plan.md`](./task2-usability-plan.md), [`task2-participant-form.md`](./task2-participant-form.md) | — |
| **Task 2 — Results & Usability Analysis Report** | [`task2-participant-results.md`](./task2-participant-results.md), [`task2-usability-report.md`](./task2-usability-report.md) | [`task2-usability-report.pdf`](./task2-usability-report.pdf) |
| **Task 3 — Cross-Platform Report** | [`task3-cross-platform.md`](./task3-cross-platform.md) | [`task3-cross-platform.pdf`](./task3-cross-platform.pdf) |
| **AI Audit Report (Phụ lục Bắt buộc)** | [`AI-audit-report.md`](./AI-audit-report.md) | [`AI-audit-report.pdf`](./AI-audit-report.pdf) |
| **AI Critique (200–300 từ — 265 từ)** | [`AI-critique.md`](./AI-critique.md) | [`AI-critique.pdf`](./AI-critique.pdf) |
| **Lịch sử Git Commit** | [`git-log.txt`](./git-log.txt) | — |
| **Thư mục Ảnh Minh chứng** | [`screenshots/`](./screenshots) (`40` ảnh Task 1), [`screenshots/task2/`](./screenshots/task2) (`4` ảnh Task 2), [`screenshots/task3/`](./screenshots/task3) (`9` ảnh Task 3), [`screenshots/github-issues/`](./screenshots/github-issues) (`34` ảnh `#191`–`#224`) | — |

> **Việc cần hoàn tất thủ công bởi sinh viên trước khi nén `.zip` (`23120146_HW03_AI_GUIUsability_092.zip`):**
> 1. Điền **Họ tên, Nghề nghiệp, SĐT che 4 số giữa (`09xx-xxxx-xx`)** của 7 người tham gia thật + Pilot vào Bảng 1.1 của [`task2-usability-report.md`](./task2-usability-report.md) (và xuất lại PDF nếu chỉnh sửa).
> 2. Quay video 3–5 phút demo chạy Agent Skill [`gui-checklist-eshop`](../.agents/skills/gui-checklist-eshop/SKILL.md) từ đầu đến cuối, đăng lên YouTube và dán link vào mục **Link Video Demo Agent Skill** ở trên.
