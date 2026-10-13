# Test Run: DomainTesting

- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- Build/commit: 755359b (dirty worktree)

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-REG-001 | Đăng ký | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-REG-002 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 968 ms; tất cả assertion đạt. |
| TC-REG-003 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 946 ms; tất cả assertion đạt. |
| TC-REG-004 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1173 ms; tất cả assertion đạt. |
| TC-REG-005 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1363 ms; tất cả assertion đạt. |
| TC-REG-006 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1209 ms; tất cả assertion đạt. |
| TC-REG-007 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1417 ms; tất cả assertion đạt. |
| TC-REG-008 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1423 ms; tất cả assertion đạt. |
| TC-REG-009 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1317 ms; tất cả assertion đạt. |
| TC-REG-010 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1392 ms; tất cả assertion đạt. |
| TC-REG-011 | Đăng ký | Danh | Pass | None | Cypress thực thi trong 1458 ms; tất cả assertion đạt. |
| TC-CART-001 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-002 | Giỏ hàng | Danh | Fail | [BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE](../Bug-reports/Issue/BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE.md) | Không tìm thấy hình minh họa trong trạng thái giỏ hàng trống. Retry: 0/0. |
| TC-CART-003 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-004 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-005 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-006 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-007 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-008 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-CART-009 | Giỏ hàng | Danh | Pass | None | Cypress thực thi trong 549 ms; tất cả assertion đạt. |
| TC-COUPON-001 | Coupon | Danh | Pass | None | Cypress thực thi trong 2918 ms; tất cả assertion đạt. |
| TC-COUPON-002 | Coupon | Danh | Pass | None | Cypress thực thi trong 2947 ms; tất cả assertion đạt. |
| TC-COUPON-003 | Coupon | Danh | Pass | None | Cypress thực thi trong 2806 ms; tất cả assertion đạt. |
| TC-COUPON-004 | Coupon | Danh | Pass | None | Cypress thực thi trong 3161 ms; tất cả assertion đạt. |
| TC-COUPON-005 | Coupon | Danh | Fail | [BUG-FR17-COUPON-INVALID-TYPE-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-INVALID-TYPE-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-006 | Coupon | Danh | Fail | [BUG-FR17-COUPON-INVALID-TYPE-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-INVALID-TYPE-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-007 | Coupon | Danh | Pass | None | Cypress thực thi trong 2884 ms; tất cả assertion đạt. |
| TC-COUPON-008 | Coupon | Danh | Fail | [BUG-FR17-COUPON-NONPOSITIVE-DISCOUNT-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-NONPOSITIVE-DISCOUNT-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-009 | Coupon | Danh | Pass | None | Cypress thực thi trong 2645 ms; tất cả assertion đạt. |
| TC-COUPON-010 | Coupon | Danh | Fail | [BUG-FR17-COUPON-INVALID-MIN-ORDER-AMOUNT-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-INVALID-MIN-ORDER-AMOUNT-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-011 | Coupon | Danh | Fail | [BUG-FR17-COUPON-INVALID-MIN-ORDER-AMOUNT-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-INVALID-MIN-ORDER-AMOUNT-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-012 | Coupon | Danh | Fail | [BUG-FR17-COUPON-MISSING-MAX-USES-ACCEPTED](../Bug-reports/Issue/BUG-FR17-COUPON-MISSING-MAX-USES-ACCEPTED.md) | API trả HTTP 200 trong khi testcase yêu cầu response từ chối. Retry: 0/0. |
| TC-COUPON-013 | Coupon | Danh | Pass | None | Cypress thực thi trong 2597 ms; tất cả assertion đạt. |
| TC-COUPON-014 | Coupon | Danh | Blocked | None | EP_COUPON_VIEW không có cấu hình fixture được định danh trong testcase hoặc tài liệu nguồn để tái tạo precondition. |
| TC-COUPON-015 | Coupon | Danh | Blocked | None | EP_COUPON_DELETE không có cấu hình fixture được định danh trong testcase hoặc tài liệu nguồn để tái tạo precondition. |
