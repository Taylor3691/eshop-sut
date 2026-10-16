# [BUG][DEF-FR09-02] Lỗi Biên Lệch Một Đơn vị khi Kiểm tra Ngưỡng Đơn hàng Tối thiểu (Off-by-One Boundary Condition C3)

## Found by Test Case

[TC-BVA-COUPON-002](../test-cases/coupons/TC-BVA-COUPON-002.md), [TC-BVA-COUPON-005](../test-cases/coupons/TC-BVA-COUPON-005.md), [TC-BVA-COUPON-015](../test-cases/coupons/TC-BVA-COUPON-015.md), [TC-COUPON-004](../test-cases/coupons/TC-COUPON-004.md), [TC-COUPON-016](../test-cases/coupons/TC-COUPON-016.md), [TC-GAP-COUPON-003](../test-cases/coupons/TC-GAP-COUPON-003.md), [TC-GAP-COUPON-005](../test-cases/coupons/TC-GAP-COUPON-005.md).

## Related requirement

FR-09 (discount coupons); checkout behavior references FR-08.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (Major - Boundary Value Defect)
- **Vị trí**: `backend/server.js:379`
- **Mô tả**: Sử dụng toán tử lớn hơn nghiêm ngặt `if (total_amount > coupon.min_order_amount)` thay vì lớn hơn hoặc bằng (`>=`). Khi đơn hàng có giá trị chính xác bằng ngưỡng tối thiểu (ví dụ `300,000 ₫` cho SAVE10, `500,000 ₫` cho BIGBUY), hệ thống từ chối áp dụng mã và báo lỗi thiếu điều kiện.

- **GitHub Issue:** [#21](https://github.com/Taylor3691/eshop-sut/issues/21).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-COUPON-002` | Hệ thống chấp nhận mã vì theo đặc tả C3: Tổng đơn hàng >= min_order_amount (300,000 >= 300,000).; Áp dụng giảm giá 10%: 30,000 ₫.; Tổng tiền thanh toán: 270,000 ₫. | Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3 (toán tử > thay vì >=). | [TC-BVA-COUPON-002.png](../test-cases/coupons/screenshots/TC-BVA-COUPON-002.png) |
| `TC-BVA-COUPON-005` | Hệ thống chấp nhận mã theo đặc tả C3 (total_amount >= min_order_amount).; Số tiền giảm giá cố định: 50,000 ₫.; Tổng thanh toán: 450,000 ₫. | Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3. | [TC-BVA-COUPON-005.png](../test-cases/coupons/screenshots/TC-BVA-COUPON-005.png) |
| `TC-BVA-COUPON-015` | discount_amount = 100,000 ₫.; final_amount = 100,000 - 100,000 = 0 ₫.; Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không gây lỗi số học hoặc số âm. | Bị từ chối do lỗi biên ngưỡng tối thiểu: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Hệ thống không áp dụng được tại ngưỡng 100,000 ₫ để đạt 0 ₫. | [TC-BVA-COUPON-015.png](../test-cases/coupons/screenshots/TC-BVA-COUPON-015.png) |
| `TC-COUPON-004` | Hệ thống chấp nhận mã vì điều kiện C3 quy định: Tổng đơn hàng >= min_order_amount.; Giảm giá 10%: 30,000 ₫.; Tổng thanh toán còn lại: 270,000 ₫. | Bị từ chối với lỗi: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Backend dùng toán tử ">" thay vì ">=" đối với min_order_amount (300,000 ₫). | [TC-COUPON-004.png](../test-cases/coupons/screenshots/TC-COUPON-004.png) |
| `TC-COUPON-016` | discount_amount = 100,000 ₫.; final_amount = 100,000 - 100,000 = 0 ₫.; Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không bị lỗi tính toán số âm. | Bị từ chối do lỗi biên min_order_amount: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Backend không cho phép total_amount == min_order_amount. | [TC-COUPON-016.png](../test-cases/coupons/screenshots/TC-COUPON-016.png) |
| `TC-GAP-COUPON-003` | Chấp nhận mã vì thỏa mãn C3: total >= min_order_amount (300k >= 300k) | HTTP 400; Báo lỗi: *"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"* | Recorded: Backend kiểm tra total_amount > coupon.min_order_amount (server.js:379) thay vì >=. |
| `TC-GAP-COUPON-005` | Chấp nhận mã vì thỏa mãn C3: 500k >= 500k; giảm 50,000 ₫ | HTTP 400; Báo lỗi: *"Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này"* | Recorded: Lỗi toán tử so sánh > loại bỏ giá trị tại đúng ngưỡng biên 500,000 ₫. |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-09/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-09/domain_testing_report.md)
- [FR-09-ai-gap-analysis.md](../test-summary/FR-09-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
