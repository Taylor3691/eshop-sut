# Báo cáo tổng kết đánh giá usability - **SIMULATED DATA**

> Hành vi và câu phỏng vấn được sáng tác, không phải quan sát thật. Tách riêng kết quả browser có thật với tình huống persona giả định.

## Kết quả automation quan sát trực tiếp

7/7 lượt Playwright vượt qua Đăng nhập, Giỏ hàng, Áp dụng mã, Thanh toán, Xác minh đơn và Đăng xuất. Kết quả chỉ thể hiện các thao tác được script hóa.

## Điểm khó giả định trong kịch bản persona

| Chủ đề | Persona | Mẫu tình huống hư cấu | Ưu tiên |
|---|---|---|---|
| Hiểu nhãn | P01, P03 | Tiêu đề giống trang đăng ký, chữ lỗi mã hóa, chưa rõ ý nghĩa biểu mẫu | Cao |
| Tin cậy giá | P01, P04, P07 | Kiểm tra lại phép tính giảm và lo ngại tổng thanh toán sửa được | Cao |
| Phục hồi lỗi | P03, P06 | Gõ sai mã giả định và cần hướng dẫn sửa cụ thể | Trung bình |
| Trạng thái điều hướng | P02, P05 | Tìm ô mã giảm giá và dấu hiệu số lượng trong giỏ | Trung bình |
| Tự tin hoàn tất | P06, P07 | Cần xác nhận rõ và nhãn đăng xuất dễ hiểu | Trung bình |

Số persona trong bảng là số kịch bản do tác giả tạo, không phải tần suất hoặc tỷ lệ người dùng.

## Lỗi giao diện quan sát được

| Phát hiện | Mức độ | Bằng chứng / yêu cầu |
|---|---|---|
| Chữ tiếng Việt bị lỗi hiển thị trên nhiều màn hình | Cao | BUG-SIM-001; ảnh chụp; FR-21 |
| Nhãn/tiêu đề đăng nhập gây hiểu nhầm, mật khẩu dạng văn bản | Cao | BUG-SIM-002; ảnh đăng nhập; FR-02, FR-22 |
| Tổng tiền checkout có thể chỉnh sửa | Trung bình | ảnh checkout; FR-08 yêu cầu tự tính |

## Khuyến nghị

1. Sửa mã hóa UTF-8 và rà soát toàn bộ nhãn tiếng Việt.
2. Sửa tiêu đề đăng nhập, nhãn trường, kiểu email/mật khẩu và nội dung nút.
3. Tính tổng tiền chuẩn ở phía máy chủ; hiển thị bảng chi tiết chỉ đọc, có khoản giảm.
4. Làm rõ lỗi mã giảm giá, số lượng giỏ, mã/trạng thái đơn và nút “Đăng xuất”.
5. Kiểm chứng mức ưu tiên bằng người tham gia thật trước khi suy rộng.

## Điểm SUS

Điểm trong `sus-scoring.md` được tính từ vector hư cấu. Không có trung bình thực nghiệm hoặc xếp loại usability hợp lệ.


Đây là bảy lượt Playwright tự động, không phải phiên có điều phối viên/người dùng. Hồ sơ, phản ứng, phỏng vấn và điểm SUS đều là dữ liệu giả lập. Báo cáo chính: `main-report.md`.
