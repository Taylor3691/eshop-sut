# Final review — Task 2 Usability Evaluation

## 1. Overall completion status

**Status: INCOMPLETE / NOT READY FOR OFFICIAL HW03 SUBMISSION.**

Workspace đã hoàn thành phần thiết kế, automation reproduction, SUS arithmetic,
phân tích mô phỏng, bug documentation, GitHub references, Markdown report và
PDF. Tuy nhiên HW03 yêu cầu bảy người thật và một pilot người thật. Những điều
kiện này chưa được xác nhận; không được dùng bộ hồ sơ hiện tại để tuyên bố đã
hoàn thành nghiên cứu usability với người.

## 2. Đã xác minh

- Flow Playwright: 7/7 lượt, 42/42 checkpoint PASS.
- Evidence máy: 42 screenshots và 7 video tồn tại; video không có audio hoặc
  think-aloud.
- SUS: 7 vector đủ 10 câu; điểm 57,5; 75; 25; 42,5; 82,5; 37,5; 82,5;
  trung bình mô phỏng 57,50.
- Analysis: pain points, findings UF-01–UF-08 và severity đã được tách giữa
  quan sát máy và tín hiệu persona.
- Defects: BUG-001/BUG-002 có reproduce/evidence; GitHub #190 được tạo; #92,
  #109 và #69 được phát hiện trước và không tạo trùng.
- Commit stages: preparation, plan, instruments, automation, analysis, bug
  reports và final report có trong [git commit log](git-commit-log.md).

## 3. Evidence invalid hoặc incomplete cho HW03

| Mục | Vấn đề |
|---|---|
| Participant | `participant-list.md` ghi persona mô phỏng, không có contact masked hoặc xác minh TA |
| Consent | Không có chữ ký/consent theo từng participant |
| Pilot | Chỉ có automation preflight, không phải pilot người |
| Observation | Nhật ký chứa kịch bản persona, không phải quan sát trực tiếp |
| SUS/interview | Vector và câu trả lời được tạo; không phải phiếu người thật |
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

1. Tuyển và xác minh 7 người ngoài lớp; lưu contact che 4 chữ số và consent.
2. Chạy pilot người thật, điều chỉnh scenario nếu cần.
3. Thực hiện 7 moderated sessions có think-aloud; đo time, errors,
   assistance, hesitation và ghi observation/interview thật.
4. Thu SUS thật, tính lại điểm/trung bình và thay thế bảng mô phỏng.
5. Ghi audio/video theo consent và cập nhật evidence index.
6. Chạy yêu cầu cross-platform tối thiểu của HW03, nếu nộp toàn bộ assignment.
7. Chuẩn hóa AI audit: một tên tool/provenance, timestamp, prompt nguyên văn,
   output và human review cho từng interaction.
8. Cập nhật report, compliance checklist và commit log sau khi có dữ liệu thật.

## 6. Quyết định QA

Không ký duyệt “complete”. Có thể dùng artifacts hiện tại như bản **simulated
evaluation / rehearsal** và làm cơ sở chuẩn bị nghiên cứu thật. Việc giữ nhãn
SIMULATED DATA là điều kiện bắt buộc để tránh biến bằng chứng máy hoặc persona
giả định thành tuyên bố nghiên cứu người dùng.
