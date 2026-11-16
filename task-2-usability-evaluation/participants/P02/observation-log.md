# Nhật ký quan sát - P02

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `P02-01-login-home.png` |
| Giỏ hàng | ĐẠT | `P02-02-cart.png` |
| Áp dụng mã | ĐẠT | `P02-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `P02-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `P02-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `P02-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng ghi nhận khảo sát: Tìm ô nhập mã trong chốc lát rồi kiểm tra tổng tiền cuối.
- Lỗi / khôi phục ghi nhận khảo sát: Không có lỗi trong kịch bản ghi nhận khảo sát; persona nhận ra trạng thái thành công và mục lịch sử đơn hàng.
- Think-aloud được xác nhận: “Số tiền được giảm và tổng tiền cuối là phản hồi rõ nhất.”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống ghi nhận khảo sát, không phải phân tích video ở phần A.
