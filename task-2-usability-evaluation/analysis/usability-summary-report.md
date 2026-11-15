# Báo cáo tổng kết usability (SIMULATED)

## Phạm vi và độ tin cậy

Playwright thực hiện 7 lượt độc lập trên Chromium headless. Đây là kiểm tra chức năng/UI có thể lặp lại, không phải nghiên cứu usability với người. Vì vậy SUS, phỏng vấn, cảm xúc, thời gian người dùng, completion rate của người và suy luận về persona đều **không có dữ liệu**.

## Kết quả quan sát được

| ID | Login | Cart | Coupon | Checkout | Verify order | Logout | SUS |
|---|---|---|---|---|---|---|---|
| P01 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P02 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P03 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P04 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P05 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P06 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |
| P07 | PASS | PASS | PASS | PASS | PASS | PASS | N/A |

7/7 automated runs completed all six checkpoints. This is not a human task-success rate.

## Pain points and findings (observed in UI/source behavior)

1. **High — malformed Vietnamese text/encoding across screens.** The browser displays mojibake in headings and labels, including checkout and navigation. This makes instructions difficult to read. Evidence: P01 screenshots `P01-01-login-home.png`, `P01-02-cart.png`, `P01-03-coupon-checkout.png`. Requirement: FR-21 Vietnamese UI.
2. **High — login form semantics/labels conflict with the task.** Login screen heading appears as registration, email is labeled Username, password input uses text, and submit text is English. This was directly visible in the page and component. Requirements: FR-02, FR-21, FR-22. Evidence: `P01-01-login-home.png`.
3. **Moderate — checkout total is editable.** The total field allows user editing, creating ambiguity about whether displayed amount is authoritative. This is visible in checkout screenshot; verify backend pricing independently before treating amounts as secure. Requirement: FR-08 automatic total.

## Recommendations

- Fix UTF-8 source/response handling and review rendered Vietnamese text end-to-end.
- Correct login heading, Vietnamese labels, `type=email`, `type=password`, and localized submit label.
- Derive payable total from server-side cart/prices and show read-only order totals.
- Conduct the required moderated sessions with seven real eligible participants; collect SUS and open-ended answers directly before making human-centered conclusions.

## SUS

No SUS responses were collected. Mean, range, grade, and benchmark comparison are N/A.

## Bug reports

See `../bug-reports/BUG-SIM-001.md` and `../bug-reports/BUG-SIM-002.md`. Findings are limited to inspected UI and automated evidence, not participant reports.
