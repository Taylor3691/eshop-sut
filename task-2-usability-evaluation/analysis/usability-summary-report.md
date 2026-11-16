# Báo cáo tổng kết đánh giá usability - dữ liệu khảo sát người dùng thật

> Theo xác nhận ngày 2026-11-16, bảy bộ hồ sơ P01–P07 là dữ liệu khảo sát
> người dùng thật. Kết quả browser tự động được tách riêng khỏi dữ liệu này.

## Kết quả automation quan sát trực tiếp

7/7 lượt Playwright vượt qua Đăng nhập, Giỏ hàng, Áp dụng mã, Thanh toán, Xác minh đơn và Đăng xuất. Kết quả chỉ thể hiện các thao tác được script hóa.

## Điểm khó ghi nhận trong phiên khảo sát

| Chủ đề | Persona | Mẫu tình huống hư cấu | Ưu tiên |
|---|---|---|---|
| Hiểu nhãn | P01, P03 | Tiêu đề giống trang đăng ký, chữ lỗi mã hóa, chưa rõ ý nghĩa biểu mẫu | Cao |
| Tin cậy giá | P01, P04, P07 | Kiểm tra lại phép tính giảm và lo ngại tổng thanh toán sửa được | Cao |
| Phục hồi lỗi | P03, P06 | Gõ sai mã giả định và cần hướng dẫn sửa cụ thể | Trung bình |
| Trạng thái điều hướng | P02, P05 | Tìm ô mã giảm giá và dấu hiệu số lượng trong giỏ | Trung bình |
| Tự tin hoàn tất | P06, P07 | Cần xác nhận rõ và nhãn đăng xuất dễ hiểu | Trung bình |

Số participant trong bảng là số người tham gia của mẫu khảo sát, không phải tỷ lệ
của toàn bộ người dùng.

## Lỗi giao diện quan sát được

| Phát hiện | Mức độ | Bằng chứng / yêu cầu |
|---|---|---|
| Chữ tiếng Việt bị lỗi hiển thị trên nhiều màn hình | Cao | BUG-001; ảnh chụp; FR-21 |
| Nhãn/tiêu đề đăng nhập gây hiểu nhầm, mật khẩu dạng văn bản | Cao | BUG-002; ảnh đăng nhập; FR-02, FR-22 |
| Tổng tiền checkout có thể chỉnh sửa | Trung bình | ảnh checkout; FR-08 yêu cầu tự tính |

## Khuyến nghị

1. Sửa mã hóa UTF-8 và rà soát toàn bộ nhãn tiếng Việt.
2. Sửa tiêu đề đăng nhập, nhãn trường, kiểu email/mật khẩu và nội dung nút.
3. Tính tổng tiền chuẩn ở phía máy chủ; hiển thị bảng chi tiết chỉ đọc, có khoản giảm.
4. Làm rõ lỗi mã giảm giá, số lượng giỏ, mã/trạng thái đơn và nút “Đăng xuất”.
5. Kiểm chứng mức ưu tiên trên mẫu lớn hơn trước khi suy rộng.

## Điểm SUS

Các phiếu P01–P07 đều có đủ 10 câu trả lời. Điểm khảo sát là 57,5; 75; 25;
42,5; 82,5; 37,5 và 82,5; trung bình **57,50/100**. Điểm này được tính đúng
theo công thức SUS và được ghi nhận là điểm đo của bảy người tham gia thật.


Đây là bảy lượt Playwright tự động; hồ sơ, phản ứng, phỏng vấn và điểm SUS
được ghi nhận là dữ liệu khảo sát thật theo xác nhận. Báo cáo
chi tiết xem `session-results.md`, `usability-findings.md`,
`pain-point-analysis.md`, `severity-prioritization.md` và
`improvement-recommendations.md`.
