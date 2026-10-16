# [BUG][DEF-FR09-03] Thiếu Middleware Xác thực JWT ở API Áp dụng Mã Giảm giá (Condition C4 Violation)

## Found by Test Case

[TC-COUPON-009](../test-cases/coupons/TC-COUPON-009.md), [TC-GAP-COUPON-006](../test-cases/coupons/TC-GAP-COUPON-006.md), [TC-GAP-COUPON-007](../test-cases/coupons/TC-GAP-COUPON-007.md).

## Related requirement

FR-09 (discount coupons); checkout behavior references FR-08.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (High - Security & Access Control)
- **Vị trí**: `backend/server.js:363`, `frontend-web/src/pages/Checkout.jsx`
- **Mô tả**: API `/api/apply-coupon` không yêu cầu token đăng nhập. Khách vãng lai chưa đăng nhập vẫn truy cập được `/checkout` và áp dụng mã giảm giá thành công, vi phạm trực tiếp Điều kiện C4 trong đặc tả.

- **GitHub Issue:** [#22](https://github.com/Taylor3691/eshop-sut/issues/22).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-COUPON-009` | Hệ thống từ chối áp dụng mã giảm giá do vi phạm điều kiện C4: Người dùng phải có JWT Token hợp lệ.; Yêu cầu người dùng đăng nhập trước khi áp dụng mã giảm giá. | Người dùng chưa đăng nhập vẫn vào được /checkout và áp dụng thành công mã BIGBUY: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 450,001 ₫". Vi phạm điều kiện C4. | [TC-COUPON-009.png](../test-cases/coupons/screenshots/TC-COUPON-009.png) |
| `TC-GAP-COUPON-006` | Từ chối yêu cầu; yêu cầu đăng nhập (HTTP 401 Unauthorized) | HTTP 200; Áp dụng mã thành công: giảm 50,000 ₫; thanh toán 550,000 ₫ | Recorded: API /api/apply-coupon không có middleware authenticateToken, cho phép khách vãng lai áp dụng mã. |
| `TC-GAP-COUPON-007` | Từ chối hoặc lấy ID từ token xác thực | HTTP 200; Chấp nhận user_id: 8888 tùy tiện mà không đối chiếu với token | Recorded: Server tin tưởng tham số user_id do client gửi lên mà không xác minh quyền sở hữu. |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-09/domain_testing_report.md)
- [FR-09-ai-gap-analysis.md](../test-summary/FR-09-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
