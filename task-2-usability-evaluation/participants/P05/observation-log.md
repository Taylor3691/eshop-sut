# Observation log — P05 (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `P05-01-login-home.png` |
| Cart | PASS | `P05-02-cart.png` |
| Apply coupon | PASS | `P05-03-coupon-checkout.png` |
| Checkout | PASS | `P05-04-checkout-success.png` |
| Verify order | PASS | `P05-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `P05-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: Looks for a quantity badge in the header and scans the cart summary.
- Error / recovery: No hypothetical error; notes that absent/unclear cart-count feedback could prompt a second check.
- Think-aloud hư cấu: “I want an obvious cart count and a clear breakdown of savings.”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
