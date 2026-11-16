# Checklist tuân thủ Task 2 — HW03

**Ngày rà soát:** 2026-11-16  
**Phạm vi:** `task-2-usability-evaluation/`  
**Kết luận tổng quát:** **INCOMPLETE cho yêu cầu HW03 chính thức**. Theo xác
nhận ngày 2026-11-16, P01–P07 là bảy người tham gia thật và kết quả trùng khớp
workspace; contact masked, consent và một số hồ sơ gốc vẫn cần bổ sung.

| Nhóm yêu cầu | Trạng thái | Evidence path / lý do |
|---|---|---|
| Mục tiêu usability | COMPLETED | `planning/usability-evaluation-plan.md` |
| Kịch bản goal-oriented | COMPLETED | `planning/task-scenarios.md` |
| SUS, interview, consent và observation instruments | COMPLETED | `instruments/` |
| Pilot người thật | INCOMPLETE | `participants/pilot/automation-preflight-simulated.md` chỉ là preflight máy |
| Tuyển 7 participant thật, contact masked | INCOMPLETE | Tên đã xác nhận; contact masked cần bổ sung trong `participants/participant-list.md` |
| 7 session người thật | COMPLETED (theo xác nhận) | `participants/P01–P07/` và `analysis/session-results.md` |
| Session notes | INCOMPLETE | Có hồ sơ phiên; cần đối chiếu bản ghi gốc |
| Observation logs | INCOMPLETE | Có nhật ký; cần bổ sung nguồn/biên bản phiên nếu có |
| SUS responses người thật | COMPLETED (theo xác nhận) | 70 đáp án trong `participants/P01–P07/sus-responses.md` |
| Interview người thật | COMPLETED (theo xác nhận) | `participants/P01–P07/interview-responses.md` |
| Screenshot automation | COMPLETED | `evidence/screenshots/` có 42 ảnh |
| Recording automation | COMPLETED | `evidence/session-recordings/` có 7 video; không có audio/think-aloud |
| Kết quả flow automation | COMPLETED | `evidence/simulated-runs/run-results.json`: 7/7, 42/42 PASS |
| Tính SUS cá nhân | COMPLETED (theo xác nhận) | `analysis/sus-score-summary.md`: đủ 10 câu/P01–P07 |
| SUS trung bình | COMPLETED (theo xác nhận) | Trung bình 57,50/100 trong `analysis/sus-score-summary.md` |
| Task completion người dùng thật | INCOMPLETE | Completion time và assistance NOT PROVIDED |
| Pain-point grouping | COMPLETED (theo xác nhận) | `analysis/pain-point-analysis.md` |
| Severity prioritization | COMPLETED (theo xác nhận) | `analysis/severity-prioritization.md` |
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
- **INCOMPLETE:** Có trường bắt buộc hoặc hồ sơ nguồn chưa được bổ sung.
- **BLOCKED:** Không thể xác nhận vì bằng chứng nền tảng bị thiếu.
- **NOT APPLICABLE:** Không dùng cho các mục không có trong phạm vi; không có
  mục chính nào của HW03 được miễn do dữ liệu mô phỏng.
