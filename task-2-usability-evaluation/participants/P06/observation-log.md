# Nhật ký quan sát - P06 (**SIMULATED DATA**)

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `P06-01-login-home.png` |
| Giỏ hàng | ĐẠT | `P06-02-cart.png` |
| Áp dụng mã | ĐẠT | `P06-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `P06-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `P06-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `P06-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng giả định: Dừng ở phản hồi mã giảm giá và nút xác nhận thanh toán cuối.
- Lỗi / khôi phục giả định: Trong kịch bản, persona gõ sai mã một lần, thấy lỗi, nhập lại mã rồi tiếp tục.
- Think-aloud hư cấu: “Tôi cần tổng tiền cuối và chữ trên nút dễ hiểu.”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống giả định, không phải phân tích video ở phần A.
