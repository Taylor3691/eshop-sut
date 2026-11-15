# Chạy thử harness automation - **SIMULATED / chỉ dành cho máy**

Ghi chú này lưu lại quá trình thiết lập Playwright, không phải buổi pilot với người. Không có người tham gia, think-aloud, đồng thuận, phỏng vấn hoặc bảng hỏi.

## Lần thử và điều chỉnh

1. Harness đầu tiên điều hướng thẳng tới `/cart`. Tải lại SPA làm mất giỏ hàng trong bộ nhớ, khiến bộ chọn nút thanh toán chờ quá hạn. Đây là lỗi của script kiểm thử, không phải lỗi luồng mua hàng.
2. Lần tiếp theo, bộ chọn theo nội dung nút không khớp vì chữ tiếng Việt hiển thị lỗi và selector quá mong manh.
3. Script được sửa để dùng điều hướng SPA và selector ổn định. Cả bảy lượt cuối đều PASS ở đăng nhập, giỏ, coupon, thanh toán, xác minh đơn và đăng xuất.

## Kết quả

Chạy thử giúp cải thiện script và tạo luồng Chromium có thể lặp lại. Đây **không phải pilot usability có người** theo HW03; pilot thật vẫn chưa được thực hiện. Không trích dẫn ghi chú này như nghiên cứu người dùng.
