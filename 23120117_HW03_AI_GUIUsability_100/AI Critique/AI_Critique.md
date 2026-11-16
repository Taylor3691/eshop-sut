# AI Critique

Trong bài này, AI giúp tôi đọc yêu cầu nhanh hơn, tạo khung checklist và sắp xếp tài liệu. Tuy nhiên, tôi nhận ra AI không thể tự biến một checklist thành kết quả kiểm thử. Nó có thể nhắc đến alt text, aria-label, thứ tự Tab hay live region, nhưng ảnh chụp giao diện không cho biết chắc các thuộc tính đó có thật trong DOM hay không. Vì vậy, checklist chỉ là tiêu chí cần kiểm tra; Pass/Fail phải dựa trên thao tác và bằng chứng thật.

Điểm tôi phải cẩn thận nhất là dữ liệu Task 2. Điểm SUS và câu trả lời mở không nói được người tham gia mất bao lâu, bấm bao nhiêu lần hoặc có do dự ở đâu. Nếu AI tự điền các chỗ trống này, báo cáo sẽ trông đầy đủ hơn nhưng không còn đúng. Tôi đã giữ phần không có timestamp là “Không ghi nhận”. Phản hồi của P03 về số lượng trong giỏ và của P04 về trạng thái đăng nhập chỉ được ghi là finding cần tái hiện, chưa gọi là bug. Khi rà lại hồ sơ, tôi cũng thấy một số mã người tham gia bị sao chép nhầm. Điều này cho thấy AI không tự phát hiện được lỗi dữ liệu nếu không so sánh tên tệp, roster và nội dung từng phiên.

Qua bài này, tôi xem AI là công cụ hỗ trợ, không phải người quyết định kết quả. Mỗi con số phải có nguồn, mỗi bug phải có cách tái hiện và ảnh thật. Những việc như xin đồng ý của người tham gia, tạo GitHub Issue hay kiểm tra nền tảng thứ ba vẫn cần tôi tự làm và tự chịu trách nhiệm.
