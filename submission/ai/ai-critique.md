# AI Critique (200–300 từ)

**AI sai, thiên lệch hoặc thiếu ở đâu?** Bản nháp checklist AI sinh ra bỏ sót 12 mục. Sau này 7 trong số đó Failed: responsive, zoom 200%, độ tương phản, dữ liệu dài, tiêu đề tab, cuộn chuột trên ô số, autocomplete. Lần chạy Playwright đầu tiên đo sai 5 mục (audit log #11). Ở Task 2, AI có xu hướng "lấp chỗ trống": đề xuất sửa phiếu P5, đoán nguyên nhân lỗi ô ngày của P6, tự viết lý do giữ Y cho bước B2 của P7.

**Vì sao AI không phát hiện được?**
- **Đầu vào:** prompt chỉ đưa `App.jsx` và một phần đặc tả, nên AI không thấy `index.html` và mục Bảo mật.
- **Cách làm việc:** AI chỉ phân tích code tĩnh, không hiển thị giao diện, không thao tác thật, không dùng trình đọc màn hình.
- **Thiên lệch:** AI bám chữ trong đặc tả nên bỏ qua dark mode và RTL. Khi thiếu thông tin, AI đưa ra lời giải thích nghe hợp lý thay vì nói "không biết".

**Nguyên tắc rút ra:** AI làm tốt phần có cấu trúc: liệt kê, sinh bản nháp, viết script, tính SUS, kiểm tính nhất quán; script kiểm phiên còn bắt được lỗi vượt thời gian mà tôi bỏ qua. Nhưng oracle, kết luận Pass/Fail, dữ liệu phiên của người thật và quyết định ghi bug phải do người kiểm thử giữ. Mỗi kết quả của AI cần được kiểm lại trên SUT hoặc đọc lại từ file trước khi đưa vào báo cáo. Vì vậy các skill tôi xây dựng đều có điểm dừng để người kiểm thử quyết định.
