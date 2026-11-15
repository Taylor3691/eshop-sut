# Observation log — P07 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P07-01-login-home.png` |
| Cart | PASS | `P07-02-cart.png` |
| Apply coupon | PASS | `P07-03-coupon-checkout.png` |
| Checkout | PASS | `P07-04-checkout-success.png` |
| Verify order | PASS | `P07-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P07-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: Checks the order status and pauses before using the ambiguously labeled logout action.
- Error / recovery: No hypothetical task error; logout wording makes the end of the task less explicit.
- Think-aloud hư cấu: “I want the order status and sign-out action to be explicit.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
