# Observation log — P06 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P06-01-login-home.png` |
| Cart | PASS | `P06-02-cart.png` |
| Apply coupon | PASS | `P06-03-coupon-checkout.png` |
| Checkout | PASS | `P06-04-checkout-success.png` |
| Verify order | PASS | `P06-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P06-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: At coupon feedback and the final confirm-payment action.
- Error / recovery: Hypothetically mistypes the coupon once, sees an error, re-enters it, and continues.
- Think-aloud hư cấu: “I need the final amount and the words on the buttons to be easy to understand.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
