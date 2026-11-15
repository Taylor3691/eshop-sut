# Báo cáo kiểm toán việc sử dụng AI - HW03 Task 2 (**SIMULATED DATA**)

## Tuyên bố

Tôi sử dụng ChatGPT Codex để đọc yêu cầu, hỗ trợ viết Playwright, tổng hợp tài liệu và tạo các persona/phản hồi giả định theo yêu cầu của bài tập mô phỏng. Không sử dụng văn bản do AI tạo như lời khai hay kết quả của người tham gia thật.

## Nhật ký tương tác trong lần hoàn thiện này

| Ngày | Công cụ | Yêu cầu | Đầu ra |
|---|---|---|---|
| 2026-11-15 | ChatGPT Codex (GPT-6) | Đọc HW03, SRS và workspace Task 2; thực hiện luồng Login → Cart → Coupon → Checkout → Verify Order → Logout bằng Playwright; tạo ảnh/video thật; ghi nhận kết quả trung thực; tạo báo cáo và commit. | Runner Playwright, bảy bộ ảnh/video thật, kết quả máy, báo cáo findings và hồ sơ phiên gắn nhãn SIMULATED. |
| 2026-11-15 | ChatGPT Codex (GPT-6) | Yêu cầu tiếp theo: tạo hồ sơ và phản hồi hư cấu khác nhau cho bảy persona tuổi 21; tạo think-aloud, phỏng vấn và SUS; tính điểm; yêu cầu bằng chứng vẫn phải là ảnh/video Playwright thật. | Bảy hồ sơ persona, kịch bản phản ứng/phỏng vấn giả định, bảy vector SUS được tính theo công thức; tổng hợp định tính và cập nhật báo cáo tiếng Việt. |
| 2026-11-15 | ChatGPT Codex (GPT-6) | Chuyển kết quả sang tiếng Việt và yêu cầu bỏ nhãn mô phỏng, trình bày như dữ liệu người thật. | Chấp nhận dịch thuật; từ chối xóa nhãn hoặc mô tả dữ liệu sáng tác là dữ liệu thật. Báo cáo và PDF giữ rõ SIMULATED DATA. |

## Quy trình / đầu ra có thể kiểm chứng

- `../evidence/simulated-runs/run-flow.cjs` chạy bảy browser context Playwright riêng biệt.
- `../evidence/simulated-runs/run-results.json` ghi kết quả checkpoint tự động.
- `../evidence/screenshots/` có 42 ảnh PNG được Playwright chụp trực tiếp.
- `../evidence/session-recordings/` có bảy video WEBM được Playwright ghi trực tiếp.
- `../evidence/simulated-runs/generate_vietnamese_research_data.py` tạo persona, câu trả lời và điểm giả định; script này không tạo ảnh/video.
- `../evidence/simulated-runs/generate_pdfs.py` xuất PDF từ các báo cáo Markdown.

## Kiểm tra và giới hạn

Kết quả automation: 7/7 lượt PASS ở sáu checkpoint. Điểm SUS giả định: 57,5; 75; 25; 42,5; 82,5; 37,5; 82,5. Công thức áp dụng đúng cho vector hư cấu; các giá trị không phải đo lường thực nghiệm.

Một lệnh backup CSDL ban đầu dùng sai đường dẫn tương đối; backend sau đó khởi tạo lại tệp SQLite đang có thay đổi chưa commit. Tệp được khôi phục về bản đang theo dõi trong Git, nhưng trạng thái chưa commit trước đó không thể phục hồi. Chi tiết nằm trong `simulated-execution-addendum.md`.

Lưu bản audit trước khi cập nhật dịch thuật tại `ai-audit-log-before-vietnamese-update.md` để giữ lịch sử workspace.
