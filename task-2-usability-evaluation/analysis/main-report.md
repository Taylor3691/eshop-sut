# Báo cáo chính - Đánh giá usability HW03 (**SIMULATED DATA**)

## Tuyên bố về tính trung thực

Báo cáo này gồm bảy lượt chạy tự động bằng Playwright và một lớp dữ liệu persona/phản hồi được sáng tác theo yêu cầu. Bảy tên do người yêu cầu cung cấp chỉ là nhãn persona; không ai trong số họ được tuyển, liên hệ hoặc quan sát. Hồ sơ, lời nghĩ thành tiếng, lỗi/điểm ngập ngừng giả định, câu trả lời phỏng vấn và phiếu SUS đều là **SIMULATED DATA**. Kết quả này không thay thế yêu cầu HW03 về bảy người tham gia thật.

## Hệ thống và kịch bản

- **SUT:** EShop Web Storefront tại `http://localhost:5173`; backend `http://localhost:3000`.
- **Luồng:** Đăng nhập → Giỏ hàng → Áp dụng mã `SAVE10` → Thanh toán → Xác minh đơn hàng → Đăng xuất.
- **Automation:** Playwright 1.65.1, Chromium headless, viewport 1280×800; mỗi lượt dùng browser context và tài khoản tổng hợp riêng.
- **Cách chuẩn bị giỏ:** Sau đăng nhập, script thêm sản phẩm qua UI rồi chuyển trang bằng điều hướng SPA để giữ trạng thái giỏ.

## Kết quả theo lượt

| ID | Đăng nhập | Giỏ hàng | Mã giảm giá | Thanh toán | Xác minh đơn | Đăng xuất | SUS minh họa* |
|---|---|---|---|---|---|---|---:|
| P01 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 57,5 |
| P02 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 75 |
| P03 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 25 |
| P04 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 42,5 |
| P05 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 82,5 |
| P06 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 37,5 |
| P07 | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | ĐẠT | 82,5 |

**SIMULATED DATA:** Điểm SUS được tính chính xác từ các vector đáp án hư cấu. Trung bình 57,50; trung vị 57,5; khoảng 25–82,5. Đây không phải phép đo người dùng, không dùng để xếp loại sản phẩm hoặc so sánh benchmark.

Sáu checkpoint đều ĐẠT trong cả bảy lượt automation. Đây không phải tỷ lệ hoàn thành nhiệm vụ của người thật. Kịch bản giả định, lỗi và câu trả lời được ghi riêng với sự kiện browser.

## Phát hiện và mức độ ưu tiên

| Phát hiện | Mức độ | Căn cứ |
|---|---|---|
| Chữ tiếng Việt bị lỗi hiển thị trên nhiều màn hình | Cao | BUG-SIM-001; ảnh chụp; FR-21 |
| Tiêu đề/nhãn đăng nhập gây hiểu nhầm; mật khẩu hiện dạng văn bản | Cao | BUG-SIM-002; ảnh đăng nhập; FR-02, FR-22 |
| Tổng tiền thanh toán có thể chỉnh sửa | Trung bình | Ảnh checkout; FR-08 yêu cầu tính tổng tự động |

Các điểm khó ở hồ sơ persona (như tìm huy hiệu giỏ hoặc lo ngại tổng tiền) là kịch bản hư cấu, không phải phát hiện từ người tham gia. Xem [tổng hợp định tính](qualitative-synthesis.md), [báo cáo tổng kết](usability-summary-report.md), và [bảng điểm SUS](sus-scoring.md).

## Khuyến nghị

1. Sửa mã hóa UTF-8 và rà soát nội dung tiếng Việt trên các màn hình.
2. Sửa tiêu đề đăng nhập, nhãn trường, `type="email"`, `type="password"`, và nội dung nút bằng tiếng Việt.
3. Tính tổng tiền xác thực ở máy chủ; hiển thị chi tiết chỉ đọc gồm giá, khoản giảm và số tiền phải trả.
4. Làm rõ phản hồi lỗi coupon, số lượng giỏ, mã/trạng thái đơn và nhãn “Đăng xuất”.
5. Xác minh mức độ ưu tiên bằng nghiên cứu có người tham gia thật trước khi suy rộng.

## Bằng chứng và tái thực thi

- **Ảnh chụp:** 42 tệp, sáu checkpoint mỗi lượt, tại `../evidence/screenshots/P01-*` đến `P07-*`.
- **Video Playwright:** bảy tệp tại `../evidence/session-recordings/P01-simulated.webm` đến `P07-simulated.webm`.
- **Kết quả máy:** `../evidence/simulated-runs/run-results.json`.
- **Bản tóm tắt kết quả tiếng Việt:** `../evidence/simulated-runs/results-summary-vi.md`.
- **Script chạy:** `../evidence/simulated-runs/run-flow.cjs`.
- **Persona/phản hồi hư cấu:** `../evidence/simulated-runs/generate_vietnamese_research_data.py`.

Ảnh và video là đầu ra trực tiếp của Playwright, không chỉnh sửa. Chúng ghi trạng thái UI do script thao tác, không chứng minh persona đã nói hay hành xử như các kịch bản giả định. Các lần thử harness lỗi đã được ghi trong tài liệu preflight và không được tính là kết quả chạy cuối.

## Giới hạn và công việc còn lại

Cần tuyển bảy người phù hợp, thực hiện pilot có người, điều phối các phiên có đồng thuận, thu câu trả lời SUS/phỏng vấn thật và phân tích lại. Không dùng persona hay điểm giả lập thay cho phát hiện thực tế. Các lượt đa trình duyệt/nền tảng cũng chưa được thực hiện. Ghi chú preflight Playwright không phải pilot người dùng.
