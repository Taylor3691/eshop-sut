# [BUG][DEF-FR09-05] Tách rời Xử lý Giảm giá giữa Checkout và Ghi nhận Lượt dùng Coupon

## Found by Test Case

[TC-COUPON-020](../test-cases/coupons/TC-COUPON-020.md), [TC-GAP-COUPON-014](../test-cases/coupons/TC-GAP-COUPON-014.md), [TC-GAP-COUPON-015](../test-cases/coupons/TC-GAP-COUPON-015.md).

## Related requirement

FR-09 (discount coupons); checkout behavior references FR-08.

## Status

- Observed failure; requirement/oracle review required.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (High - Transaction Integrity & Security)
- **Vị trí**: `backend/server.js:297-309`, `frontend-web/src/pages/Checkout.jsx:53-59`
- **Mô tả**: API `/api/checkout` chấp nhận trực tiếp giá trị `total_amount` gửi từ client mà không tự tính toán lại dựa trên giỏ hàng và mã giảm giá, cho phép người mua có thể can thiệp số tiền thanh toán bất kỳ.

- **GitHub Issue:** [#34](https://github.com/Taylor3691/eshop-sut/issues/34).
- **Manual review:** AI-gap TC-GAP-COUPON-007, TC-GAP-COUPON-008, and TC-GAP-COUPON-014 need review; matching screenshot evidence was not found for these distinct user-id and usage-recording scenarios.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-COUPON-020` | Backend tự động tính toán lại số tiền dựa trên giá sản phẩm thực tế trong giỏ và mã giảm giá hợp lệ.; Backend không chấp nhận số tiền bị can thiệp trái phép từ client; giá trị lưu trong CSDL phải là 450,000 ₫. | Backend chấp nhận trực tiếp total_amount = 100000 ₫ bị can thiệp từ client mà không tự tính lại giá từ giỏ hàng và coupon. | [TC-COUPON-020.png](../test-cases/coupons/screenshots/TC-COUPON-020.png) |
| `TC-GAP-COUPON-014` | Backend phải tự động trừ lượt dùng mã trong cùng transaction đặt hàng | HTTP 200; Đặt hàng thành công; CSDL coupon_usage không tăng thêm bản ghi nào | Recorded: /api/checkout hoàn toàn không quản lý coupon; việc lưu lượt dùng phó mặc cho frontend. |
| `TC-GAP-COUPON-015` | Backend tự tính lại tiền đơn hàng và từ chối giá trị giả mạo | HTTP 200; Tạo đơn hàng với tổng tiền chỉ 1 ₫ | Recorded: Vi phạm nguyên tắc bảo mật thanh toán FR-08 & FR-09. |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-09/domain_testing_report.md)
- [FR-09-ai-gap-analysis.md](../test-summary/FR-09-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
