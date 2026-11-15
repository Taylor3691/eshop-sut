# Observation log — P01 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P01-01-login-home.png` |
| Cart | PASS | `P01-02-cart.png` |
| Apply coupon | PASS | `P01-03-coupon-checkout.png` |
| Checkout | PASS | `P01-04-checkout-success.png` |
| Verify order | PASS | `P01-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P01-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: Login heading and Username label; compares the total before and after coupon.
- Error / recovery: Initially interprets the login screen as registration; recovers by noticing the existing-account sign-in action.
- Think-aloud hư cấu: “The screen looked like registration at first. The coupon saving was easier to understand once it appeared.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
