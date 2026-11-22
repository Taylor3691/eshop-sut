**I use AI tools for the following tasks.**

| AI tool | Model | Dùng cho |
|---|---|---|
| Cursor | Grok 4.7 | Phân tích luồng và endpoint; thiết kế CSV và script tạo user; tham số kịch bản; sinh plan Load/Stress/Spike/Soak; phân tích log và đề xuất tối ưu (Task 2); phân loại commit, tầng test, flow chart, `p95_regression.py`, workflow phác thảo, thảo luận đánh đổi (Task 3) |
| Claude Code | Claude Opus 5.5 | Đọc đề và chọn luồng; kế hoạch prompt; review và sửa test plan; chạy thử, đo điểm bão hòa, chạy Soak; tạo bug report và GitHub Issues; thí nghiệm cổng p95; đối chiếu số liệu cho Task 2 và Task 3; viết nháp báo cáo; tạo Agent Skill `perf-test` |

Nhật ký đầy đủ (tên tool, ngày giờ, prompt nguyên văn, output) cho từng lần dùng AI: [`AILOG.md`](AILOG.md). Demo skill có nhật ký riêng: [`skill-demo/search/AILOG.md`](skill-demo/search/AILOG.md).

> **TODO:** AILOG hiện chưa ghi đủ các lần dùng Claude Code trong quá trình review, chạy thử, chạy Soak, tạo issue, thí nghiệm Task 3 và viết nháp báo cáo; cùng một số prompt Cursor (sinh plan Spike, sửa lỗi nightly, đánh giá ngưỡng sau thí nghiệm). Cần bổ sung trước khi nộp.
