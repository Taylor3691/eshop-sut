# Nhật ký quan sát - P04 (**SIMULATED DATA**)

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `P04-01-login-home.png` |
| Giỏ hàng | ĐẠT | `P04-02-cart.png` |
| Áp dụng mã | ĐẠT | `P04-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `P04-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `P04-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `P04-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng giả định: Dừng ở trường tổng tiền có thể chỉnh sửa và kiểm tra lại khoản giảm.
- Lỗi / khôi phục giả định: Không có lỗi nhập giả định; persona ngập ngừng vì có thể sửa số tiền.
- Think-aloud hư cấu: “Danh sách sản phẩm hữu ích, nhưng tổng tiền sửa được khiến cách tính chưa rõ ràng.”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống giả định, không phải phân tích video ở phần A.
