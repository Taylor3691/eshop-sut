# Test Run: BVA

- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- Build/commit: 755359b (dirty worktree)

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-BVA-FR01-001 | Đăng ký tài khoản | Danh | Pass | None | Cypress thực thi trong 1701 ms; tất cả assertion đạt. |
| TC-BVA-FR01-002 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-003 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-004 | Đăng ký tài khoản | Danh | Pass | None | Cypress thực thi trong 1167 ms; tất cả assertion đạt. |
| TC-BVA-FR01-005 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-006 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-007 | Đăng ký tài khoản | Danh | Pass | None | Cypress thực thi trong 1238 ms; tất cả assertion đạt. |
| TC-BVA-FR01-008 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-009 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-010 | Đăng ký tài khoản | Danh | Pass | None | Cypress thực thi trong 1163 ms; tất cả assertion đạt. |
| TC-BVA-FR01-011 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-012 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-013 | Đăng ký tài khoản | Danh | Pass | None | Cypress thực thi trong 1252 ms; tất cả assertion đạt. |
| TC-BVA-FR01-014 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR01-015 | Đăng ký tài khoản | Danh | Fail | [BUG-FR01-REG-VALID-PASSWORD-REJECTED](../Bug-reports/Issue/BUG-FR01-REG-VALID-PASSWORD-REJECTED.md) | Không phát sinh request mong đợi trước khi hết thời gian chờ. Retry: 0/0. |
| TC-BVA-FR07-001 | Giỏ hàng | Danh | Fail | [BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE](../Bug-reports/Issue/BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE.md) | Không tìm thấy hình minh họa trong trạng thái giỏ hàng trống. Retry: 0/0. |
| TC-BVA-FR07-002 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-BVA-FR07-003 | Giỏ hàng | Danh | Blocked | None | testcase không định danh mapping cho Sản phẩm A/B và trạng thái giỏ không thể được tái tạo an toàn từ source. |
| TC-BVA-FR17-001 | Quản lý Mã Giảm Giá | Danh | Blocked | None | Test data yêu cầu discount_value = 0 trong Boundary nhưng spec bỏ trường discount_value; helper gửi giá trị rỗng. |
| TC-BVA-FR17-002 | Quản lý Mã Giảm Giá | Danh | Blocked | None | Test data yêu cầu min_order_amount = 0 trong Boundary nhưng spec bỏ trường min_order_amount; helper gửi giá trị rỗng. |
| TC-BVA-FR17-003 | Quản lý Mã Giảm Giá | Danh | Blocked | None | Test data yêu cầu max_uses_per_user = 0 trong Boundary nhưng spec bỏ trường max_uses_per_user; helper gửi giá trị rỗng. |
| TC-BVA-FR17-004 | Quản lý Mã Giảm Giá | Danh | Blocked | None | Test data yêu cầu max_uses_per_user = 1 trong Boundary nhưng spec bỏ trường max_uses_per_user; helper gửi giá trị rỗng. |
| TC-BVA-FR17-005 | Quản lý Mã Giảm Giá | Danh | Blocked | None | Test data yêu cầu max_uses_per_user = 2 trong Boundary nhưng spec bỏ trường max_uses_per_user; helper gửi giá trị rỗng. |
