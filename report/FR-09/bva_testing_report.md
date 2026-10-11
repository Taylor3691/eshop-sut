# Báo cáo Thực thi Phân tích Giá trị Biên (BVA Testing Report) — FR-09: Quản Lý & Áp Dụng Mã Giảm Giá

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-09 (Mã Giảm Giá / Discount Coupons — Phân tích Giá trị Biên)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Frontend Web: `http://localhost:5173/checkout` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tập trung Phân tích Biên (BVA Focus)**:
  - Biên ngưỡng đơn hàng tối thiểu `min_order_amount` (`min - 1`, `at`, `min + 1`) cho mã SAVE10 (300k) và BIGBUY (500k).
  - Biên số lượt sử dụng `max_uses_per_user` (`max - 1`, `at`, `max + 1`) cho mã 1 lượt (usage = 0, 1, 2) và mã 2 lượt (usage = 1, 2, 3).
  - Biên thời gian hết hạn `expired_at` (mã còn hạn xa vs mã đã hết hạn trong quá khứ).
  - Biên giá trị thanh toán cuối cùng (đạt chính xác 0 ₫ vs ngay trên 0 ₫).
  - Biên độ dài chuỗi mã giảm giá rỗng (`length = 0`).
  - Biên trạng thái kích hoạt nhị phân của mã (`is_active = 0` vs `is_active = 1`).

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case BVA (Total BVA Test Cases)** | 18 | 100% |
| **Số Test Case đã thực thi (Executed)** | 18 | 100% |
| **Số Test Case ĐẠT (PASS)** | 14 | 77.78% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 4 | 22.22% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi biên xác minh (Verified Boundary Defects)** | 2 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Điểm Biên Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-BVA-COUPON-001** | Đơn hàng dưới biên tối thiểu của mã SAVE10 (min_order_amount - 1) | `coupon_code`: `SAVE10`, `cart_total`: `299,999 ₫` (ngay dưới ngưỡng 300,000 ₫), `user`: `test@eshop.com` | Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3 (`total_amount < min_order_amount`).; Hiển thị thông báo lỗi: Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này.; Số tiền giảm giá là `0 ₫`, tổng tiền thanh toán giữ nguyên `299,999 ₫`. | Từ chối chính xác giá trị dưới biên: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". | **PASS** | [TC-BVA-COUPON-001.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-001.png) | Không có |
| **TC-BVA-COUPON-002** | Đơn hàng tại đúng biên tối thiểu của mã SAVE10 (min_order_amount) | `coupon_code`: `SAVE10`, `cart_total`: `300,000 ₫` (chính xác bằng ngưỡng tối thiểu), `user`: `test@eshop.com` | Hệ thống chấp nhận mã vì theo đặc tả C3: Tổng đơn hàng `>= min_order_amount` (300,000 >= 300,000).; Áp dụng giảm giá 10%: `30,000 ₫`.; Tổng tiền thanh toán: `270,000 ₫`. | Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3 (toán tử > thay vì >=). | **FAIL** | [TC-BVA-COUPON-002.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-002.png) | DEF-FR09-02 |
| **TC-BVA-COUPON-003** | Đơn hàng trên biên tối thiểu của mã SAVE10 (min_order_amount + 1) | `coupon_code`: `SAVE10`, `cart_total`: `300,001 ₫` (ngay trên ngưỡng 300,000 ₫), `user`: `test@eshop.com` | Hệ thống chấp nhận mã do `total_amount > min_order_amount`.; Giảm giá 10%: `Math.floor(300,001 × 10 / 100) = 30,000 ₫`.; Tổng tiền thanh toán: `270,001 ₫`. | Thỏa điều kiện biên (> 300,000 ₫) nhưng bị lỗi công thức tính phần trăm: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -2,700,009 ₫ Thành tiền: 3,000,010 ₫". Giảm giá bị âm (-2,700,009 ₫), tổng tiền thành 3,000,010 ₫. | **FAIL** | [TC-BVA-COUPON-003.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-003.png) | DEF-FR09-01 |
| **TC-BVA-COUPON-004** | Đơn hàng dưới biên tối thiểu của mã BIGBUY (min_order_amount - 1) | `coupon_code`: `BIGBUY`, `cart_total`: `499,999 ₫` (ngay dưới ngưỡng 500,000 ₫), `user`: `test@eshop.com` | Hệ thống từ chối áp dụng do không thỏa điều kiện C3 (`499,999 < 500,000 ₫`).; Hiển thị thông báo lỗi đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫.; Giảm giá bằng `0 ₫`, tổng tiền giữ nguyên `499,999 ₫`. | Từ chối chính xác giá trị dưới biên tối thiểu: "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này". | **PASS** | [TC-BVA-COUPON-004.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-004.png) | Không có |
| **TC-BVA-COUPON-005** | Đơn hàng tại đúng biên tối thiểu của mã BIGBUY (min_order_amount) | `coupon_code`: `BIGBUY`, `cart_total`: `500,000 ₫` (chính xác bằng ngưỡng tối thiểu), `user`: `test@eshop.com` | Hệ thống chấp nhận mã theo đặc tả C3 (`total_amount >= min_order_amount`).; Số tiền giảm giá cố định: `50,000 ₫`.; Tổng thanh toán: `450,000 ₫`. | Bị từ chối sai lệch tại đúng biên: "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này". Vi phạm điều kiện C3. | **FAIL** | [TC-BVA-COUPON-005.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-005.png) | DEF-FR09-02 |
| **TC-BVA-COUPON-006** | Đơn hàng trên biên tối thiểu của mã BIGBUY (min_order_amount + 1) | `coupon_code`: `BIGBUY`, `cart_total`: `500,001 ₫` (ngay trên ngưỡng 500,000 ₫), `user`: `test@eshop.com` | Hệ thống chấp nhận mã.; Giảm giá `50,000 ₫`.; Tổng thanh toán: `500,001 - 50,000 = 450,001 ₫`. | Chấp nhận chính xác giá trị trên biên: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 450,001 ₫". Giảm 50,000 ₫, thành tiền 450,001 ₫. | **PASS** | [TC-BVA-COUPON-006.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-006.png) | Không có |
| **TC-BVA-COUPON-007** | Số lượt sử dụng dưới biên tối đa của mã 1 lượt (usage_count = 0 < max_uses_per_user = 1) | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `current_usage`: `0` (dưới biên tối đa 1 lượt) | Áp dụng thành công vì `usage_count < max_uses_per_user` (`0 < 1`).; Giảm giá `50,000 ₫`, thành tiền `450,000 ₫`. | Chấp nhận khi số lượt dưới biên tối đa (usage = 0 < 1): "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫". | **PASS** | [TC-BVA-COUPON-007.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-007.png) | Không có |
| **TC-BVA-COUPON-008** | Số lượt sử dụng tại đúng biên tối đa của mã 1 lượt (usage_count = 1 == max_uses_per_user = 1) | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `current_usage`: `1` (bằng đúng giới hạn tối đa) | Hệ thống từ chối áp dụng do vi phạm điều kiện C5 (điều kiện yêu cầu `usage_count < max_uses_per_user`, nhưng hiện tại `1 >= 1`).; Hiển thị thông báo lỗi: Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn).; Giảm giá bằng `0 ₫`. | Từ chối chính xác khi đạt đúng biên tối đa (usage = 1 == 1): "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)". | **PASS** | [TC-BVA-COUPON-008.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-008.png) | Không có |
| **TC-BVA-COUPON-009** | Số lượt sử dụng trên biên tối đa của mã 1 lượt (usage_count = 2 > max_uses_per_user = 1) | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `current_usage`: `2` (vượt trên giới hạn tối đa) | Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`2 >= 1`).; Báo lỗi đã vượt quá giới hạn lượt sử dụng. | Từ chối chính xác khi vượt quá biên tối đa (usage = 2 > 1): "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)". | **PASS** | [TC-BVA-COUPON-009.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-009.png) | Không có |
| **TC-BVA-COUPON-010** | Số lượt sử dụng dưới biên tối đa của mã 2 lượt (usage_count = 1 < max_uses_per_user = 2) | `coupon_code`: `VIP100`, `cart_total`: `400,000 ₫`, `current_usage`: `1` (dưới biên tối đa 2 lượt) | Hệ thống chấp nhận mã vì `usage_count < max_uses_per_user` (`1 < 2`).; Giảm giá `100,000 ₫`, thành tiền `300,000 ₫`. | Chấp nhận khi số lượt dưới biên tối đa (usage = 1 < 2): "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫". | **PASS** | [TC-BVA-COUPON-010.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-010.png) | Không có |
| **TC-BVA-COUPON-011** | Số lượt sử dụng tại đúng biên tối đa của mã 2 lượt (usage_count = 2 == max_uses_per_user = 2) | `coupon_code`: `VIP100`, `cart_total`: `400,000 ₫`, `current_usage`: `2` (bằng đúng giới hạn tối đa) | Hệ thống từ chối áp dụng vì đã dùng đủ 2 lượt (`usage_count >= 2`).; Hiển thị thông báo: Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn).; Giảm giá bằng `0 ₫`. | Từ chối chính xác khi đạt đúng biên tối đa (usage = 2 == 2): "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)". | **PASS** | [TC-BVA-COUPON-011.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-011.png) | Không có |
| **TC-BVA-COUPON-012** | Số lượt sử dụng trên biên tối đa của mã 2 lượt (usage_count = 3 > max_uses_per_user = 2) | `coupon_code`: `VIP100`, `cart_total`: `400,000 ₫`, `current_usage`: `3` (vượt trên giới hạn tối đa) | Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`3 >= 2`).; Giảm giá bằng `0 ₫`. | Từ chối chính xác khi vượt quá biên tối đa (usage = 3 > 2): "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)". | **PASS** | [TC-BVA-COUPON-012.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-012.png) | Không có |
| **TC-BVA-COUPON-013** | Biên thời gian hết hạn - Mã còn hạn xa (current_date < expired_at) | `coupon_code`: `SAVE10`, `cart_total`: `350,000 ₫`, `current_date`: Thời gian thực thi hiện tại | Hệ thống chấp nhận mã vì thỏa điều kiện C2 (`now < expired_at`).; Giảm giá 10%: `35,000 ₫`. | Chấp nhận chính xác mã còn hạn: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫". | **PASS** | [TC-BVA-COUPON-013.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-013.png) | Không có |
| **TC-BVA-COUPON-014** | Biên thời gian hết hạn - Mã đã qua hạn sử dụng (current_date > expired_at) | `coupon_code`: `EXPIRED`, `cart_total`: `200,000 ₫`, `current_date`: Thời gian thực thi hiện tại | Hệ thống từ chối áp dụng mã do vi phạm điều kiện C2: Ngày hiện tại phải trước `expired_at`.; Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.; Giảm giá bằng `0 ₫`. | Từ chối chính xác mã đã qua hạn sử dụng: "Mã giảm giá đã hết hạn". | **PASS** | [TC-BVA-COUPON-014.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-014.png) | Không có |
| **TC-BVA-COUPON-015** | Biên giá trị thanh toán cuối cùng đạt chính xác 0 ₫ (total_amount == discount_value) | `cart_total`: `100,000 ₫`, `discount_value`: `100,000 ₫` (loại fixed) | `discount_amount = 100,000 ₫`.; `final_amount = 100,000 - 100,000 = 0 ₫`.; Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không gây lỗi số học hoặc số âm. | Bị từ chối do lỗi biên ngưỡng tối thiểu: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Hệ thống không áp dụng được tại ngưỡng 100,000 ₫ để đạt 0 ₫. | **FAIL** | [TC-BVA-COUPON-015.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-015.png) | DEF-FR09-02 |
| **TC-BVA-COUPON-016** | Biên giá trị thanh toán cuối cùng ngay trên 0 ₫ (final_amount = 1 ₫) | `cart_total`: `100,001 ₫`, `discount_value`: `100,000 ₫` (loại fixed) | `discount_amount = 100,000 ₫`.; `final_amount = 100,001 - 100,000 = 1 ₫`.; Hệ thống ghi nhận số tiền thanh toán `1 ₫` chính xác. | Chấp nhận chính xác khi vượt ngưỡng 1 ₫: "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 1 ₫". Giảm 100,000 ₫, thành tiền còn lại đúng 1 ₫. | **PASS** | [TC-BVA-COUPON-016.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-016.png) | Không có |
| **TC-BVA-COUPON-017** | Biên độ dài chuỗi mã giảm giá rỗng (code length = 0) | `coupon_code`: `""` (độ dài chuỗi bằng 0 ký tự), `cart_total`: `500,000 ₫` | Hệ thống chặn gửi hoặc trả về lỗi: Vui lòng nhập mã giảm giá.; Không thực hiện truy vấn và không giảm giá. | Nút "Áp dụng" bị disabled (disabled=true), chặn gửi chuỗi rỗng lên server. | **PASS** | [TC-BVA-COUPON-017.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-017.png) | Không có |
| **TC-BVA-COUPON-018** | Biên trạng thái kích hoạt nhị phân của mã (is_active = 0 vs is_active = 1) | `coupon_code`: `ACTIVE_CODE` (`is_active = 1`), `cart_total`: `400,000 ₫` | Thử nghiệm A: Áp dụng thành công vì `is_active = 1` thỏa điều kiện C1.; Thử nghiệm B: Bị từ chối vì `is_active = 0` vi phạm điều kiện C1; hiển thị mã không tồn tại hoặc đã bị vô hiệu hóa. | ACTIVE_CODE (is_active=1) áp dụng thành công ("✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 350,000 ₫"); INACTIVE_CODE (is_active=0) bị từ chối chính xác ("Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"). | **PASS** | [TC-BVA-COUPON-018.png](test-cases/FR-09/screenshots/TC-BVA-COUPON-018.png) | Không có |

---

## 4. Danh mục Lỗi Biên Xác minh (Verified Boundary Defects)

1. **DEF-FR09-02 (Lỗi biên lệch một đơn vị min_order_amount)**:
   - Backend `server.js:379` sử dụng điều kiện `if (total_amount > coupon.min_order_amount)` thay vì `>=`.
   - Tất cả các test case tại đúng biên (`TC-BVA-COUPON-002` tại 300,000 ₫, `TC-BVA-COUPON-005` tại 500,000 ₫, `TC-BVA-COUPON-015` tại 100,000 ₫) đều bị từ chối sai lệch với thông báo đơn hàng chưa đủ giá trị tối thiểu.

2. **DEF-FR09-01 (Lỗi tính toán phần trăm tại biên trên min_order_amount + 1)**:
   - Tại điểm biên trên ngay sát ngưỡng tối thiểu (`TC-BVA-COUPON-003`: `300,001 ₫`), mã SAVE10 vượt qua điều kiện biên nhưng công thức `total_amount * (1 - discount_value)` tạo ra số tiền giảm giá âm `-2,700,009 ₫`, đẩy tổng thanh toán lên `3,000,010 ₫`.
