# Checklist tuân thủ Task 2 — HW03

**Ngày rà soát:** 2026-11-16  
**Phạm vi:** `task-2-usability-evaluation/`  
**Kết luận tổng quát:** **INCOMPLETE cho yêu cầu HW03 chính thức**. Workspace có
bộ dữ liệu mô phỏng, automation evidence và phân tích đầy đủ; chưa có bằng
chứng bảy participant thật.

| Nhóm yêu cầu | Trạng thái | Evidence path / lý do |
|---|---|---|
| Mục tiêu usability | COMPLETED | `planning/usability-evaluation-plan.md` |
| Kịch bản goal-oriented | COMPLETED | `planning/task-scenarios.md` |
| SUS, interview, consent và observation instruments | COMPLETED | `instruments/` |
| Pilot người thật | INCOMPLETE | `participants/pilot/automation-preflight-simulated.md` chỉ là preflight máy |
| Tuyển 7 participant thật, contact masked | INCOMPLETE | `participants/participant-list.md` ghi rõ persona mô phỏng, contact N/A |
| 7 session người thật | BLOCKED | Không có session nào được xác nhận là có người; `analysis/main-report.md` |
| Session notes | INCOMPLETE | `participants/P01–P07/session-notes.md` là kịch bản mô phỏng |
| Observation logs | INCOMPLETE | `participants/P01–P07/observation-log.md` tách automation khỏi persona giả định |
| SUS responses người thật | INCOMPLETE | Có 70 đáp án mô phỏng trong `participants/P01–P07/sus-responses.md` |
| Interview người thật | INCOMPLETE | `participants/P01–P07/interview-responses.md` ghi phản hồi sáng tác |
| Screenshot automation | COMPLETED | `evidence/screenshots/` có 42 ảnh |
| Recording automation | COMPLETED | `evidence/session-recordings/` có 7 video; không có audio/think-aloud |
| Kết quả flow automation | COMPLETED | `evidence/simulated-runs/run-results.json`: 7/7, 42/42 PASS |
| Tính SUS cá nhân | COMPLETED (mô phỏng) | `analysis/sus-score-summary.md`: đủ 10 câu/P01–P07 |
| SUS trung bình | COMPLETED (mô phỏng) | Trung bình 57,50/100 trong `analysis/sus-score-summary.md` |
| Task completion người dùng thật | INCOMPLETE | Chỉ có PASS của script; completion time và assistance NOT PROVIDED |
| Pain-point grouping | COMPLETED (mô phỏng) | `analysis/pain-point-analysis.md` |
| Severity prioritization | COMPLETED (mô phỏng) | `analysis/severity-prioritization.md` |
| Tách bug và usability issue | COMPLETED | `analysis/usability-findings.md` |
| Bug reports | COMPLETED | `bug-reports/BUG-001.md`, `BUG-002.md` |
| Reproduction steps và screenshots | COMPLETED | Hai báo cáo local; ảnh P01 và script reproduction |
| GitHub issue references | COMPLETED | #190 mới; #92, #109, #69 đã tồn tại và không tạo trùng |
| AI tool name | INCOMPLETE | Audit có Gemini/Codex không nhất quán; phiên hiện tại dùng Copilot SDK |
| AI date/time | INCOMPLETE | Có log một số interaction, chưa có nhật ký đầy đủ Prompt 08–09 |
| Exact prompts | INCOMPLETE | Có tham chiếu prompt files 00–05; chưa lưu bản đầy đủ cho các prompt 08–09 |
| Relevant AI outputs | INCOMPLETE | Có addenda và deliverables, nhưng audit chưa bao phủ toàn bộ phiên |
| AI critique 200–300 từ | COMPLETED | `ai-audit/ai-critique.md` (298 từ), có bias/giới hạn/bài học |
| Commit history | COMPLETED | `report/git-commit-log.md`; các stage commit tồn tại trong `git log` |
| PDF final report | COMPLETED | `report/task-2-usability-evaluation.pdf` |

## Diễn giải trạng thái

- **COMPLETED:** Có artifact và kiểm tra được trong workspace.
- **INCOMPLETE:** Có tài liệu một phần hoặc chỉ có dữ liệu mô phỏng, chưa đạt
  yêu cầu người thật.
- **BLOCKED:** Không thể xác nhận vì bằng chứng nền tảng bị thiếu.
- **NOT APPLICABLE:** Không dùng cho các mục không có trong phạm vi; không có
  mục chính nào của HW03 được miễn do dữ liệu mô phỏng.
