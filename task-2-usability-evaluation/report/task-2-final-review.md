# Final review — Task 2 Usability Evaluation

## 1. Overall completion status

**Status: DATA STATUS UPDATED — P01–P07 được ghi nhận là người tham gia thật
theo xác nhận ngày 2026-11-16; hồ sơ vẫn INCOMPLETE cho đến khi bổ sung các
trường bắt buộc.**

Workspace đã hoàn thành phần thiết kế, automation reproduction, SUS arithmetic,
phân tích, bug documentation, GitHub references, Markdown report và PDF. Người
thực hiện đã xác nhận bảy khảo sát thật có kết quả trùng khớp dữ liệu hiện tại.
Contact masked, consent, thông tin pilot và các trường đo còn thiếu vẫn phải
được bổ sung trước khi ký duyệt chính thức.

## 2. Đã xác minh

- Flow Playwright: 7/7 lượt, 42/42 checkpoint PASS.
- Evidence máy: 42 screenshots và 7 video tồn tại; video không có audio hoặc
  think-aloud.
- SUS: 7 vector đủ 10 câu; điểm 57,5; 75; 25; 42,5; 82,5; 37,5; 82,5;
  trung bình 57,50 theo xác nhận khảo sát thật.
- Analysis: pain points, findings UF-01–UF-08 và severity đã được tách giữa
  quan sát máy và tín hiệu persona.
- Defects: BUG-001/BUG-002 có reproduce/evidence; GitHub #190 được tạo; #92,
  #109 và #69 được phát hiện trước và không tạo trùng.
- Commit stages: preparation, plan, instruments, automation, analysis, bug
  reports và final report có trong [git commit log](git-commit-log.md).

## 3. Evidence invalid hoặc incomplete cho HW03

| Mục | Vấn đề |
|---|---|
| Participant | Tên đã giữ nguyên; contact masked và xác minh TA chưa được điền |
| Consent | Không có chữ ký/consent theo từng participant |
| Pilot | Chỉ có automation preflight, không phải pilot người |
| Observation | Nhật ký chứa kịch bản persona, không phải quan sát trực tiếp |
| SUS/interview | Được ghi nhận là dữ liệu thật theo xác nhận; cần lưu/đối chiếu phiếu gốc |
| Session time/errors/assistance | Completion time, error count thực và assistance count NOT PROVIDED |
| Recording | Có video browser nhưng không có âm thanh/think-aloud |
| Cross-platform | Chỉ có Chromium Playwright; chưa có Chrome/Firefox/Safari hoặc thiết bị hợp lệ |
| AI audit | Tool name và provenance không nhất quán (Gemini, ChatGPT Codex, Copilot SDK); exact Prompt 08–09 chưa được lưu đầy đủ |

## 4. AI documentation review

[ai-audit-log.md](../ai-audit/ai-audit-log.md) có tên tool, một số thời điểm,
prompt file và output cho các giai đoạn chuẩn bị. Các addenda ghi nhận trung
thực nguồn gốc mô phỏng và giới hạn. [ai-critique.md](../ai-audit/ai-critique.md)
có 298 từ, đề cập đầu ra quá cụ thể, bias xác nhận, giới hạn video/SUS và bài
học human–AI.

Tuy vậy audit chưa cung cấp một provenance nhất quán cho toàn bộ tương tác:
tool name giữa các tệp khác nhau, chưa có exact prompt/output record đầy đủ cho
Prompt 08–09. Mục này phải được sửa trước khi tự đánh dấu COMPLETED.

## 5. Hành động bắt buộc trước submission

1. Bổ sung contact che 4 chữ số và consent cho 7 người tham gia.
2. Bổ sung hồ sơ pilot người thật, nếu đã thực hiện.
3. Đối chiếu 7 moderated sessions có think-aloud; đo time, errors,
   assistance, hesitation và ghi observation/interview thật.
4. Lưu phiếu SUS thật và giữ nguyên điểm/trung bình đã xác nhận.
5. Ghi audio/video theo consent và cập nhật evidence index.
6. Chạy yêu cầu cross-platform tối thiểu của HW03, nếu nộp toàn bộ assignment.
7. Chuẩn hóa AI audit: một tên tool/provenance, timestamp, prompt nguyên văn,
   output và human review cho từng interaction.
8. Cập nhật report, compliance checklist và commit log sau khi có dữ liệu thật.

## 6. Quyết định QA

Chưa ký duyệt “complete” do còn thiếu hồ sơ bắt buộc. Dữ liệu P01–P07 được ghi
nhận là khảo sát thật theo xác nhận của người thực hiện; không gán ảnh/video
Playwright tự động thành ghi hình phiên người thật.
