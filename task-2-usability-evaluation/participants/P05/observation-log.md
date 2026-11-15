# Nhật ký quan sát - P05 (**SIMULATED DATA**)

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `P05-01-login-home.png` |
| Giỏ hàng | ĐẠT | `P05-02-cart.png` |
| Áp dụng mã | ĐẠT | `P05-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `P05-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `P05-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `P05-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng giả định: Tìm huy hiệu số lượng trên thanh đầu trang và xem lại tóm tắt giỏ.
- Lỗi / khôi phục giả định: Không có lỗi giả định; persona nhận xét tín hiệu số lượng giỏ không rõ có thể khiến phải kiểm tra lại.
- Think-aloud hư cấu: “Tôi muốn thấy số lượng trong giỏ thật rõ và khoản tiết kiệm được tách bạch.”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống giả định, không phải phân tích video ở phần A.
