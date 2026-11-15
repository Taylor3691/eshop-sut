# Observation log — P04 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P04-01-login-home.png` |
| Cart | PASS | `P04-02-cart.png` |
| Apply coupon | PASS | `P04-03-coupon-checkout.png` |
| Checkout | PASS | `P04-04-checkout-success.png` |
| Verify order | PASS | `P04-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P04-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: Stops at the editable total and rechecks the applied discount.
- Error / recovery: No hypothetical input error; hesitates because the amount can be edited.
- Think-aloud hư cấu: “The item list is useful, but the editable total makes the calculation feel ambiguous.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
