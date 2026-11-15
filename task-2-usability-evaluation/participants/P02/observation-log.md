# Observation log — P02 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P02-01-login-home.png` |
| Cart | PASS | `P02-02-cart.png` |
| Apply coupon | PASS | `P02-03-coupon-checkout.png` |
| Checkout | PASS | `P02-04-checkout-success.png` |
| Verify order | PASS | `P02-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P02-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: Briefly looks for the coupon control, then scans the final amount.
- Error / recovery: No error in the hypothetical path; recognizes the success and order-history states.
- Think-aloud hư cấu: “The discount amount and final amount are the clearest feedback.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
