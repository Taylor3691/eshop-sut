# Nhật ký quan sát - P07 (**SIMULATED DATA**)

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `P07-01-login-home.png` |
| Giỏ hàng | ĐẠT | `P07-02-cart.png` |
| Áp dụng mã | ĐẠT | `P07-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `P07-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `P07-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `P07-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng giả định: Kiểm tra trạng thái đơn và dừng trước nhãn đăng xuất chưa rõ nghĩa.
- Lỗi / khôi phục giả định: Không có lỗi tác vụ giả định; cách ghi nhãn đăng xuất làm kết thúc luồng kém rõ.
- Think-aloud hư cấu: “Tôi muốn trạng thái đơn hàng và thao tác đăng xuất được ghi rõ.”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống giả định, không phải phân tích video ở phần A.
