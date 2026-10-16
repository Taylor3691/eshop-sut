# [BUG][DEF-FR09-01] Sai lệch Công thức Tính Giảm giá Phần trăm (Tạo số tiền âm và đội giá thanh toán)

## Found by Test Case

[TC-BVA-COUPON-003](../test-cases/coupons/TC-BVA-COUPON-003.md), [TC-COUPON-001](../test-cases/coupons/TC-COUPON-001.md), [TC-COUPON-014](../test-cases/coupons/TC-COUPON-014.md), [TC-GAP-COUPON-001](../test-cases/coupons/TC-GAP-COUPON-001.md), [TC-GAP-COUPON-002](../test-cases/coupons/TC-GAP-COUPON-002.md).

## Related requirement

FR-09 (discount coupons); checkout behavior references FR-08.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical / Blocker - Business Logic & Calculation Error)
- **Vị trí**: `backend/server.js:399-401`, `backend/server.js:419-421`
- **Mô tả**: Biểu thức `discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))` khiến mã giảm giá 10% tính ra số âm `-4,500,000 ₫`, dẫn đến tổng tiền thanh toán bị đội lên gấp 10 lần (`5,000,000 ₫`) thay vì giảm xuống `450,000 ₫`.

- **GitHub Issue:** [#20](https://github.com/Taylor3691/eshop-sut/issues/20).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-COUPON-003` | Hệ thống chấp nhận mã do total_amount > min_order_amount.; Giảm giá 10%: Math.floor(300,001 × 10 / 100) = 30,000 ₫.; Tổng tiền thanh toán: 270,001 ₫. | Thỏa điều kiện biên (> 300,000 ₫) nhưng bị lỗi công thức tính phần trăm: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -2,700,009 ₫ Thành tiền: 3,000,010 ₫". Giảm giá bị âm (-2,700,009 ₫), tổng tiền thành 3,000,010 ₫. | [TC-BVA-COUPON-003.png](../test-cases/coupons/screenshots/TC-BVA-COUPON-003.png) |
| `TC-COUPON-001` | Hệ thống thông báo áp dụng mã thành công.; Số tiền giảm giá được tính theo công thức phần trăm: 500,000 × 10 / 100 = 50,000 ₫.; Tổng tiền thanh toán cuối cùng hiển thị: 500,000 - 50,000 = 450,000 ₫. | Hệ thống tính sai công thức giảm giá: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -4,500,000 ₫ Thành tiền: 5,000,000 ₫". Giảm giá bị âm (-4,500,000 ₫), đội tổng tiền thanh toán lên 5,000,000 ₫ thay vì giảm 10% (450,000 ₫). | [TC-COUPON-001.png](../test-cases/coupons/screenshots/TC-COUPON-001.png) |
| `TC-COUPON-014` | discount_amount tính đúng theo công thức: 1,250,000 × 10 / 100 = 125,000 ₫.; final_amount tính đúng theo công thức: 1,250,000 - 125,000 = 1,125,000 ₫.; Giá trị giảm giá phải là số dương, không được âm. | Công thức phần trăm sai nghiêm trọng: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -11,250,000 ₫ Thành tiền: 12,500,000 ₫". Giảm giá -11,250,000 ₫ thay vì 125,000 ₫; tổng tiền thành 12,500,000 ₫. | [TC-COUPON-014.png](../test-cases/coupons/screenshots/TC-COUPON-014.png) |
| `TC-GAP-COUPON-001` | Áp dụng thành công; giảm 10% = 50,000 ₫; thanh toán = 450,000 ₫ | HTTP 200; discount_amount: -4500000; final_amount: 5000000 | Recorded: Payload API: {"discount_amount":-4500000,"final_amount":5000000}. Khách hàng bị đội giá gấp 10 lần. |
| `TC-GAP-COUPON-002` | Áp dụng thành công; giảm 10% = 40,000 ₫; thanh toán = 360,000 ₫ | HTTP 200; discount_amount: -3600000; final_amount: 4000000 | Recorded: Formula Math.floor(total * (1 - 10)) tạo số âm -3,600,000 ₫. |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-09/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-09/domain_testing_report.md)
- [FR-09-ai-gap-analysis.md](../test-summary/FR-09-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
