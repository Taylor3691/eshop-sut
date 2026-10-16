# FR-09 — Discount coupons

## Test Cases

| ID | Test case | Technique | Status |
|---|---|---|---|
| [TC-BVA-COUPON-001](TC-BVA-COUPON-001.md) | Đơn hàng dưới biên tối thiểu của mã SAVE10 (min_order_amount - 1) | BVA | PASS |
| [TC-BVA-COUPON-002](TC-BVA-COUPON-002.md) | Đơn hàng tại đúng biên tối thiểu của mã SAVE10 (min_order_amount) | BVA | FAIL |
| [TC-BVA-COUPON-003](TC-BVA-COUPON-003.md) | Đơn hàng trên biên tối thiểu của mã SAVE10 (min_order_amount + 1) | BVA | FAIL |
| [TC-BVA-COUPON-004](TC-BVA-COUPON-004.md) | Đơn hàng dưới biên tối thiểu của mã BIGBUY (min_order_amount - 1) | BVA | PASS |
| [TC-BVA-COUPON-005](TC-BVA-COUPON-005.md) | Đơn hàng tại đúng biên tối thiểu của mã BIGBUY (min_order_amount) | BVA | FAIL |
| [TC-BVA-COUPON-006](TC-BVA-COUPON-006.md) | Đơn hàng trên biên tối thiểu của mã BIGBUY (min_order_amount + 1) | BVA | PASS |
| [TC-BVA-COUPON-007](TC-BVA-COUPON-007.md) | Số lượt sử dụng dưới biên tối đa của mã 1 lượt (usage_count = 0 < max_uses_per_user = 1) | BVA | PASS |
| [TC-BVA-COUPON-008](TC-BVA-COUPON-008.md) | Số lượt sử dụng tại đúng biên tối đa của mã 1 lượt (usage_count = 1 == max_uses_per_user = 1) | BVA | PASS |
| [TC-BVA-COUPON-009](TC-BVA-COUPON-009.md) | Số lượt sử dụng trên biên tối đa của mã 1 lượt (usage_count = 2 > max_uses_per_user = 1) | BVA | PASS |
| [TC-BVA-COUPON-010](TC-BVA-COUPON-010.md) | Số lượt sử dụng dưới biên tối đa của mã 2 lượt (usage_count = 1 < max_uses_per_user = 2) | BVA | PASS |
| [TC-BVA-COUPON-011](TC-BVA-COUPON-011.md) | Số lượt sử dụng tại đúng biên tối đa của mã 2 lượt (usage_count = 2 == max_uses_per_user = 2) | BVA | PASS |
| [TC-BVA-COUPON-012](TC-BVA-COUPON-012.md) | Số lượt sử dụng trên biên tối đa của mã 2 lượt (usage_count = 3 > max_uses_per_user = 2) | BVA | PASS |
| [TC-BVA-COUPON-013](TC-BVA-COUPON-013.md) | Biên thời gian hết hạn - Mã còn hạn xa (current_date < expired_at) | BVA | PASS |
| [TC-BVA-COUPON-014](TC-BVA-COUPON-014.md) | Biên thời gian hết hạn - Mã đã qua hạn sử dụng (current_date > expired_at) | BVA | PASS |
| [TC-BVA-COUPON-015](TC-BVA-COUPON-015.md) | Biên giá trị thanh toán cuối cùng đạt chính xác 0 ₫ (total_amount == discount_value) | BVA | FAIL |
| [TC-BVA-COUPON-016](TC-BVA-COUPON-016.md) | Biên giá trị thanh toán cuối cùng ngay trên 0 ₫ (final_amount = 1 ₫) | BVA | PASS |
| [TC-BVA-COUPON-017](TC-BVA-COUPON-017.md) | Biên độ dài chuỗi mã giảm giá rỗng (code length = 0) | BVA | PASS |
| [TC-BVA-COUPON-018](TC-BVA-COUPON-018.md) | Biên trạng thái kích hoạt nhị phân của mã (is_active = 0 vs is_active = 1) | BVA | PASS |
| [TC-COUPON-001](TC-COUPON-001.md) | Áp dụng thành công mã giảm giá phần trăm khi thỏa mãn đủ 5 điều kiện (SAVE10) | Domain Testing | FAIL |
| [TC-COUPON-002](TC-COUPON-002.md) | Áp dụng thành công mã giảm giá số tiền cố định khi thỏa mãn đủ 5 điều kiện (BIGBUY) | Domain Testing | PASS |
| [TC-COUPON-003](TC-COUPON-003.md) | Áp dụng mã giảm giá nhiều lượt dùng ở lần đầu tiên (VIP100) | Domain Testing | PASS |
| [TC-COUPON-004](TC-COUPON-004.md) | Áp dụng mã giảm giá tại đúng ngưỡng giá trị tối thiểu (Boundary total == min_order_amount) | Domain Testing | FAIL |
| [TC-COUPON-005](TC-COUPON-005.md) | Từ chối mã giảm giá khi tổng đơn hàng thấp hơn ngưỡng tối thiểu 1 đơn vị (Boundary total < min_order_amount) | Domain Testing | PASS |
| [TC-COUPON-006](TC-COUPON-006.md) | Từ chối mã giảm giá không tồn tại trong hệ thống (Condition C1 Invalid) | Domain Testing | PASS |
| [TC-COUPON-007](TC-COUPON-007.md) | Từ chối mã giảm giá đã bị vô hiệu hóa is_active = 0 (Condition C1 Invalid) | Domain Testing | PASS |
| [TC-COUPON-008](TC-COUPON-008.md) | Từ chối mã giảm giá đã hết hạn sử dụng (Condition C2 Invalid - EXPIRED) | Domain Testing | PASS |
| [TC-COUPON-009](TC-COUPON-009.md) | Từ chối áp dụng mã giảm giá khi người dùng chưa đăng nhập (Condition C4 Invalid) | Domain Testing | FAIL |
| [TC-COUPON-010](TC-COUPON-010.md) | Từ chối khi người dùng đã sử dụng hết số lượt cho phép (Condition C5 Invalid) | Domain Testing | PASS |
| [TC-COUPON-011](TC-COUPON-011.md) | Kiểm thử chu kỳ dùng đủ 2 lượt của mã nhiều lượt (VIP100 - Boundary C5) | Domain Testing | PASS |
| [TC-COUPON-012](TC-COUPON-012.md) | Xử lý chuẩn hóa mã giảm giá chữ thường và khoảng trắng (Normalizing Input Domain) | Domain Testing | PASS |
| [TC-COUPON-013](TC-COUPON-013.md) | Từ chối khi gửi mã giảm giá rỗng hoặc chỉ toàn khoảng trắng | Domain Testing | PASS |
| [TC-COUPON-014](TC-COUPON-014.md) | Kiểm thử độ chính xác công thức tính giảm giá phần trăm (Percent Calculation) | Domain Testing | FAIL |
| [TC-COUPON-015](TC-COUPON-015.md) | Kiểm thử độ chính xác công thức tính giảm giá cố định (Fixed Calculation) | Domain Testing | PASS |
| [TC-COUPON-016](TC-COUPON-016.md) | Áp dụng mã giảm giá cố định bằng giá trị đơn hàng (Boundary final_amount = 0) | Domain Testing | FAIL |
| [TC-COUPON-017](TC-COUPON-017.md) | Ghi nhận lịch sử sử dụng mã giảm giá sau khi thanh toán thành công | Domain Testing | PASS |
| [TC-COUPON-018](TC-COUPON-018.md) | Thay đổi hoặc cập nhật lại giá trị đơn hàng sau khi đã áp dụng mã | Domain Testing | PASS |
| [TC-COUPON-019](TC-COUPON-019.md) | Từ chối mã khi đồng thời vi phạm nhiều điều kiện (C2 Invalid + C3 Invalid) | Domain Testing | PASS |
| [TC-COUPON-020](TC-COUPON-020.md) | Xác thực tính toàn vẹn số tiền thanh toán phía Backend khi gọi API Checkout | Domain Testing | FAIL |

## Supplemental AI-gap cases

| ID | Scenario | Technique | Recorded status |
|---|---|---|---|
| [TC-GAP-COUPON-001](TC-GAP-COUPON-001.md) | Tính toán giảm giá phần trăm với mã SAVE10 (đơn 500k) | AI gap | FAIL |
| [TC-GAP-COUPON-002](TC-GAP-COUPON-002.md) | Tính toán giảm giá phần trăm với mã SAVE10 (đơn 400k) | AI gap | FAIL |
| [TC-GAP-COUPON-003](TC-GAP-COUPON-003.md) | Kiểm tra biên tại đúng ngưỡng tối thiểu SAVE10 (total == 300,000) | AI gap | FAIL |
| [TC-GAP-COUPON-004](TC-GAP-COUPON-004.md) | Kiểm tra biên trên ngưỡng tối thiểu SAVE10 (total == 300,001) | AI gap | PASS (Biên) |
| [TC-GAP-COUPON-005](TC-GAP-COUPON-005.md) | Kiểm tra biên tại đúng ngưỡng tối thiểu BIGBUY (total == 500,000) | AI gap | FAIL |
| [TC-GAP-COUPON-006](TC-GAP-COUPON-006.md) | Kiểm tra điều kiện C4: Gọi API khi chưa đăng nhập (Không token, không user_id) | AI gap | FAIL |
| [TC-GAP-COUPON-007](TC-GAP-COUPON-007.md) | Giả mạo user_id trong body request (IDOR Vulnerability) | AI gap | FAIL |
| [TC-GAP-COUPON-008](TC-GAP-COUPON-008.md) | Lách luật giới hạn lượt dùng C5 bằng cách bỏ trống user_id | AI gap | FAIL |
| [TC-GAP-COUPON-009](TC-GAP-COUPON-009.md) | Từ chối mã đã dùng hết lượt khi có gửi user_id chính xác | AI gap | PASS |
| [TC-GAP-COUPON-010](TC-GAP-COUPON-010.md) | Áp dụng mã giảm giá cố định BIGBUY hợp lệ (đơn 600k) | AI gap | PASS |
| [TC-GAP-COUPON-011](TC-GAP-COUPON-011.md) | Kiểm tra điều kiện C2: Áp dụng mã hết hạn EXPIRED | AI gap | PASS |
| [TC-GAP-COUPON-012](TC-GAP-COUPON-012.md) | Phân biệt hoa thường: Gửi mã chữ thường save10 trực tiếp đến API | AI gap | PASS (Hiện trạng) |
| [TC-GAP-COUPON-013](TC-GAP-COUPON-013.md) | Xử lý khoảng trắng: Gửi mã có khoảng trắng  SAVE10  đến API | AI gap | PASS (Hiện trạng) |
| [TC-GAP-COUPON-014](TC-GAP-COUPON-014.md) | Tách rời thanh toán: Đặt hàng thành công nhưng không ghi nhận lượt dùng coupon | AI gap | FAIL |
| [TC-GAP-COUPON-015](TC-GAP-COUPON-015.md) | Can thiệp giá trị thanh toán: Gửi total_amount tùy tiện đến /api/checkout | AI gap | FAIL |

## Reports and analysis

- [Domain testing report](../../../reports/test-results/FR-09/domain_testing_report.md)
- [BVA testing report](../../../reports/test-results/FR-09/bva_testing_report.md)
- [Analysis: FR-09-ai-gap-analysis](../../test-summary/FR-09-ai-gap-analysis.md)
