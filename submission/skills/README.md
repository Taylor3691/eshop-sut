# Agent Skills — HW03 GUI & Usability

Ba skill đóng gói lại cách làm Task 1 và Task 2 của HW03, để dùng lại cho **màn hình và flow khác** (đề mục 7). Mỗi skill là một thư mục theo định dạng Agent Skills của Claude Code: `SKILL.md` (frontmatter `name`, `description` + các bước), `references/` (phương pháp, prompt mẫu), `templates/` (file mẫu), `scripts/` (công cụ chạy được).

| Skill | Dùng cho | Đầu ra chính |
|---|---|---|
| [`gui-checklist/`](gui-checklist/SKILL.md) | Task 1: lập và chạy GUI checklist IA-01 → IA-04 cho một hoặc nhiều màn hình | `ui-inventory.md`, `checklist.xlsx`, `execution-observations.md`, ảnh Failed, `BUG-xx.md`, GitHub issue |
| [`usability-eval/`](usability-eval/SKILL.md) | Task 2: đánh giá khả dụng có điều phối cho một flow | `plan.md`, `sessions/Px/notes.md`, `sus-and-metrics.xlsx`, `analysis.md`, bug từ phiên usability |
| [`ai-audit-log/`](ai-audit-log/SKILL.md) | Ghi AI Audit Log sau mỗi yêu cầu | Mục mới trong `ai/ai-audit-log.md` |

## Cài đặt

```bash
# Dùng cho một dự án
mkdir -p <dự án>/.claude/skills && cp -R gui-checklist usability-eval ai-audit-log <dự án>/.claude/skills/
# hoặc dùng cho mọi dự án
cp -R gui-checklist usability-eval ai-audit-log ~/.claude/skills/
```

Yêu cầu: Python 3 + `openpyxl`; Node.js + `playwright-core` (cho `run-checklist.mjs`) và Chrome; `gh` CLI (cho GitHub issue).

Gọi trong Claude Code: `/gui-checklist`, `/usability-eval`, hoặc mô tả việc cần làm (ví dụ "lập GUI checklist cho màn Quản lý Đơn hàng") để Claude tự chọn skill theo `description`.

## Nguyên tắc chung của ba skill

- **Người kiểm thử giữ quyết định.** Skill có các điểm dừng ⛔: giải đáp đặc tả không rõ, lọc checklist, chấm Pass/Fail, duyệt issue thử, xác nhận dữ liệu phiên bất thường.
- **Không tạo dữ liệu thật.** AI không sinh người tham gia, lời nói, điểm SUS hay kết quả Pass/Fail.
- **Số liệu đọc lại từ file**, không nhớ lại. Script kiểm tính nhất quán trước khi phân tích.

## Kiểm chứng (chạy lại trên dữ liệu HW03, 15/11/2026)

| Script | Cách kiểm | Kết quả |
|---|---|---|
| `gui-checklist/scripts/run-checklist.mjs` + `checks.example.mjs` | Chạy 3 mục mẫu trên EShop Web Admin | Ghi đúng quan sát (Login 0 `<h1>`, 4 tab chung `<h1>` "EShop Admin"; 6/6 trường không có `<label>`; tiêu đề tab luôn "frontend-admin"), 4 ảnh, 67 mục còn lại "Chưa chạy" |
| `gui-checklist/scripts/fill_results.py` | Điền từ `task1-checklist/execution-observations.md` vào template trống, so với `checklist.xlsx` đã nộp | 26 Passed / 44 Failed, 77 ảnh Failed; cột Kết quả, Notes, Screenshot khớp 100% |
| `usability-eval/scripts/slip_to_notes.py` | Chép lại phiếu P2–P7 (giữ các dòng bị ngắt khi dán) vào thư mục trống, so với `task2-usability/sessions/` | 6/6 file notes giống hệt; sheet SUS và Task metrics khớp 100% |
| `usability-eval/scripts/check_sessions.py` | Chạy trên Pilot + P1–P7 | Báo đúng 1 điểm: B2 của P7 200 giây vượt tối đa 180 giây nhưng ghi Y |
| `usability-eval/scripts/analyze.py` | Chạy trên P1–P7 | SUS TB 56.07, SD 13.98, CI 43.1–69.0, bảng theo bước và theo người, 80 quan sát — khớp `task2-usability/analysis.md` |

## Video demo

Video dùng skill trên một màn hình / flow mới (đề yêu cầu link YouTube): **https://www.youtube.com/watch?v=G0unHBjML7w**

Nội dung video: dùng `gui-checklist` cho màn **Quản lý Đơn hàng** (chưa có trong phạm vi Task 1), chạy đủ 6 bước bằng một prompt (AI Audit Log mục #41):

- Bảng thành phần giao diện và 9 điểm đặc tả không rõ.
- Bản nháp 32 mục; sau khi lọc và bổ sung còn 28 mục.
- Chạy bằng Playwright, chụp 35 ảnh.
- Kết quả gợi ý: 10 Passed, 17 Failed (đánh dấu "chờ kiểm chứng").
- Gom thành 2 nguyên nhân mới và 15 mục trùng nguyên nhân với bug đã có.
- Dừng ở bản nháp issue, chưa tạo issue nào trên GitHub.

Kết quả demo nằm trong thư mục `demo/orders-checklist/` của lần chạy, không thuộc bài nộp Task 1.
