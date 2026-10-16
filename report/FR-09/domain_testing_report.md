# Báo cáo Thực thi Kiểm thử Miền giá trị (Domain Testing Report) — FR-09: Quản Lý & Áp Dụng Mã Giảm Giá

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-09 (Mã Giảm Giá / Discount Coupons — 5 điều kiện hợp lệ C1-C5)
- **Hệ thống Kiểm thử (SUT)**: EShop E-commerce Web Application
- **Công cụ Tự động hóa**: Playwright Automation (Headless Chrome Channel)
- **Môi trường Thực thi**:
  - Frontend Web: `http://localhost:5173/checkout` (React 19 + Vite 8 + Tailwind CSS)
  - Backend API: `http://localhost:3000` (Node.js + Express 5 + SQLite3)
- **Ngày thực thi**: 11/10/2026
- **Tài khoản Kiểm thử**: `test@eshop.com` / `Test1234!` (User), `admin@eshop.com` / `Admin123!` (Admin)

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số (Metric) | Giá trị (Value) | Tỷ lệ (Percentage) |
|---|---|---|
| **Tổng số Test Case thiết kế (Total Test Cases)** | 20 | 100% |
| **Số Test Case đã thực thi (Executed)** | 20 | 100% |
| **Số Test Case ĐẠT (PASS)** | 14 | 70.00% |
| **Số Test Case KHÔNG ĐẠT (FAIL)** | 6 | 30.00% |
| **Số Test Case bị chặn (BLOCKED)** | 0 | 0.00% |
| **Tổng số lỗi phần mềm xác minh (Verified Defects)** | 4 | — |

---

## 3. Bảng Kết quả Thực thi Chi tiết (Detailed Execution Results Table)

| Test Case ID | Kịch bản Kiểm thử | Dữ liệu Đầu vào | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Actual Result) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-COUPON-001** | Áp dụng thành công mã giảm giá phần trăm khi thỏa mãn đủ 5 điều kiện (SAVE10) | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `user`: `test@eshop.com` | Hệ thống thông báo áp dụng mã thành công.; Số tiền giảm giá được tính theo công thức phần trăm: `500,000 × 10 / 100 = 50,000 ₫`.; Tổng tiền thanh toán cuối cùng hiển thị: `500,000 - 50,000 = 450,000 ₫`. | Hệ thống tính sai công thức giảm giá: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -4,500,000 ₫ Thành tiền: 5,000,000 ₫". Giảm giá bị âm (-4,500,000 ₫), đội tổng tiền thanh toán lên 5,000,000 ₫ thay vì giảm 10% (450,000 ₫). | **FAIL** | [TC-COUPON-001.png](test-cases/FR-09/screenshots/TC-COUPON-001.png) | DEF-FR09-01 |
| **TC-COUPON-002** | Áp dụng thành công mã giảm giá số tiền cố định khi thỏa mãn đủ 5 điều kiện (BIGBUY) | `coupon_code`: `BIGBUY`, `cart_total`: `600,000 ₫`, `user`: `test@eshop.com` | Hệ thống thông báo áp dụng thành công.; Số tiền giảm giá cố định: `50,000 ₫`.; Tổng tiền thanh toán cuối cùng: `600,000 - 50,000 = 550,000 ₫`. | Áp dụng thành công: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫". Giảm chính xác 50,000 ₫, thành tiền 550,000 ₫. | **PASS** | [TC-COUPON-002.png](test-cases/FR-09/screenshots/TC-COUPON-002.png) | Không có |
| **TC-COUPON-003** | Áp dụng mã giảm giá nhiều lượt dùng ở lần đầu tiên (VIP100) | `coupon_code`: `VIP100`, `cart_total`: `400,000 ₫`, `user`: `test@eshop.com` | Áp dụng thành công, giảm `100,000 ₫`.; Tổng thanh toán hiển thị: `300,000 ₫`. | Áp dụng thành công ở lượt đầu tiên: "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫". Giảm 100,000 ₫, thành tiền 300,000 ₫. | **PASS** | [TC-COUPON-003.png](test-cases/FR-09/screenshots/TC-COUPON-003.png) | Không có |
| **TC-COUPON-004** | Áp dụng mã giảm giá tại đúng ngưỡng giá trị tối thiểu (Boundary total == min_order_amount) | `coupon_code`: `SAVE10`, `cart_total`: `300,000 ₫` (chính xác bằng `min_order_amount`), `user`: `test@eshop.com` | Hệ thống chấp nhận mã vì điều kiện C3 quy định: Tổng đơn hàng `>= min_order_amount`.; Giảm giá 10%: `30,000 ₫`.; Tổng thanh toán còn lại: `270,000 ₫`. | Bị từ chối với lỗi: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Backend dùng toán tử ">" thay vì ">=" đối với min_order_amount (300,000 ₫). | **FAIL** | [TC-COUPON-004.png](test-cases/FR-09/screenshots/TC-COUPON-004.png) | DEF-FR09-02 |
| **TC-COUPON-005** | Từ chối mã giảm giá khi tổng đơn hàng thấp hơn ngưỡng tối thiểu 1 đơn vị (Boundary total < min_order_amount) | `coupon_code`: `SAVE10`, `cart_total`: `299,000 ₫`, `user`: `test@eshop.com` | Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3.; Hiển thị thông báo lỗi nêu rõ đơn hàng chưa đạt giá trị tối thiểu 300,000 ₫.; Số tiền giảm giá bằng 0 ₫; tổng tiền giữ nguyên `299,000 ₫`. | Từ chối chính xác: "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này". Không áp dụng giảm giá cho đơn hàng dưới 300,000 ₫. | **PASS** | [TC-COUPON-005.png](test-cases/FR-09/screenshots/TC-COUPON-005.png) | Không có |
| **TC-COUPON-006** | Từ chối mã giảm giá không tồn tại trong hệ thống (Condition C1 Invalid) | `coupon_code`: `KHONGTONTAI`, `cart_total`: `500,000 ₫`, `user`: `test@eshop.com` | Hệ thống từ chối do vi phạm điều kiện C1 (mã không tồn tại).; Hiển thị thông báo lỗi: Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.; Không áp dụng giảm giá. | Từ chối chính xác với thông báo: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa". | **PASS** | [TC-COUPON-006.png](test-cases/FR-09/screenshots/TC-COUPON-006.png) | Không có |
| **TC-COUPON-007** | Từ chối mã giảm giá đã bị vô hiệu hóa is_active = 0 (Condition C1 Invalid) | `coupon_code`: `INACTIVE50`, `cart_total`: `600,000 ₫`, `user`: `test@eshop.com` | Hệ thống từ chối áp dụng do mã đang ở trạng thái ngừng kích hoạt (`is_active = 0`).; Hiển thị thông báo mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.; Không giảm giá đơn hàng. | Từ chối chính xác mã có is_active = 0: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa". | **PASS** | [TC-COUPON-007.png](test-cases/FR-09/screenshots/TC-COUPON-007.png) | Không có |
| **TC-COUPON-008** | Từ chối mã giảm giá đã hết hạn sử dụng (Condition C2 Invalid - EXPIRED) | `coupon_code`: `EXPIRED`, `cart_total`: `200,000 ₫`, `user`: `test@eshop.com` | Hệ thống từ chối áp dụng do vi phạm điều kiện C2: Ngày hiện tại không trước `expired_at`.; Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.; Không tính giảm giá. | Từ chối chính xác mã quá hạn: "Mã giảm giá đã hết hạn". | **PASS** | [TC-COUPON-008.png](test-cases/FR-09/screenshots/TC-COUPON-008.png) | Không có |
| **TC-COUPON-009** | Từ chối áp dụng mã giảm giá khi người dùng chưa đăng nhập (Condition C4 Invalid) | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `user`: Không có (chưa đăng nhập / Token rỗng) | Hệ thống từ chối áp dụng mã giảm giá do vi phạm điều kiện C4: Người dùng phải có JWT Token hợp lệ.; Yêu cầu người dùng đăng nhập trước khi áp dụng mã giảm giá. | Người dùng chưa đăng nhập vẫn vào được /checkout và áp dụng thành công mã BIGBUY: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 450,001 ₫". Vi phạm điều kiện C4. | **FAIL** | [TC-COUPON-009.png](test-cases/FR-09/screenshots/TC-COUPON-009.png) | DEF-FR09-03 |
| **TC-COUPON-010** | Từ chối khi người dùng đã sử dụng hết số lượt cho phép (Condition C5 Invalid) | `coupon_code`: `SAVE10`, `cart_total`: `400,000 ₫`, `user`: `test@eshop.com` | Hệ thống từ chối do vi phạm điều kiện C5: `usage_count >= max_uses_per_user` (1 >= 1).; Hiển thị thông báo lỗi người dùng đã sử dụng hết lượt cho phép đối với mã này.; Không áp dụng giảm giá. | Từ chối chính xác khi hết lượt sử dụng: "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)". | **PASS** | [TC-COUPON-010.png](test-cases/FR-09/screenshots/TC-COUPON-010.png) | Không có |
| **TC-COUPON-011** | Kiểm thử chu kỳ dùng đủ 2 lượt của mã nhiều lượt (VIP100 - Boundary C5) | `coupon_code`: `VIP100`, `cart_total`: `350,000 ₫`, `user`: `test@eshop.com` | Ở Lần 2 (`usage_count = 1 < 2`): Áp dụng thành công, giảm `100,000 ₫`.; Ở Lần 3 (`usage_count = 2 == 2`): Hệ thống từ chối áp dụng và thông báo đã hết lượt sử dụng. | Chấp nhận thành công ở lượt thứ 2 (usage_count = 1 < 2): "✅ Áp dụng thành công! Giảm 100,000 ₫ Tiết kiệm: 100,000 ₫ Thành tiền: 300,000 ₫". Giảm 100,000 ₫. | **PASS** | [TC-COUPON-011.png](test-cases/FR-09/screenshots/TC-COUPON-011.png) | Không có |
| **TC-COUPON-012** | Xử lý chuẩn hóa mã giảm giá chữ thường và khoảng trắng (Normalizing Input Domain) | `coupon_code`: `  save10  ` (chữ thường kèm khoảng trắng đầu/cuối), `cart_total`: `500,000 ₫`, `user`: `test@eshop.com` | Hệ thống tự động cắt tỉa khoảng trắng (trim) và chuyển thành chữ in hoa (`SAVE10`).; Áp dụng thành công mã `SAVE10` và giảm giá `50,000 ₫`. | Frontend tự động trim và uppercase mã trước khi gửi API, áp dụng thành công: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 550,000 ₫". | **PASS** | [TC-COUPON-012.png](test-cases/FR-09/screenshots/TC-COUPON-012.png) | Không có |
| **TC-COUPON-013** | Từ chối khi gửi mã giảm giá rỗng hoặc chỉ toàn khoảng trắng | `coupon_code`: `""` (chuỗi rỗng) hoặc `"   "`, `cart_total`: `400,000 ₫` | Hệ thống chặn gửi hoặc trả về thông báo lỗi: Vui lòng nhập mã giảm giá.; Không thực hiện tính toán giảm giá. | Nút "Áp dụng" bị disabled hoàn toàn trên giao diện khi chuỗi mã rỗng hoặc chỉ có khoảng trắng (disabled=true). | **PASS** | [TC-COUPON-013.png](test-cases/FR-09/screenshots/TC-COUPON-013.png) | Không có |
| **TC-COUPON-014** | Kiểm thử độ chính xác công thức tính giảm giá phần trăm (Percent Calculation) | `coupon_code`: `SAVE10`, `cart_total`: `1,250,000 ₫` | `discount_amount` tính đúng theo công thức: `1,250,000 × 10 / 100 = 125,000 ₫`.; `final_amount` tính đúng theo công thức: `1,250,000 - 125,000 = 1,125,000 ₫`.; Giá trị giảm giá phải là số dương, không được âm. | Công thức phần trăm sai nghiêm trọng: "✅ Áp dụng thành công! Giảm 10% Tiết kiệm: -11,250,000 ₫ Thành tiền: 12,500,000 ₫". Giảm giá -11,250,000 ₫ thay vì 125,000 ₫; tổng tiền thành 12,500,000 ₫. | **FAIL** | [TC-COUPON-014.png](test-cases/FR-09/screenshots/TC-COUPON-014.png) | DEF-FR09-01 |
| **TC-COUPON-015** | Kiểm thử độ chính xác công thức tính giảm giá cố định (Fixed Calculation) | `coupon_code`: `BIGBUY`, `cart_total`: `750,000 ₫` | `discount_amount = 50,000 ₫`.; `final_amount = 750,000 - 50,000 = 700,000 ₫`. | Áp dụng giảm cố định chính xác: "✅ Áp dụng thành công! Giảm 50,000 ₫ Tiết kiệm: 50,000 ₫ Thành tiền: 700,000 ₫". Tiết kiệm đúng 50,000 ₫, thành tiền 700,000 ₫. | **PASS** | [TC-COUPON-015.png](test-cases/FR-09/screenshots/TC-COUPON-015.png) | Không có |
| **TC-COUPON-016** | Áp dụng mã giảm giá cố định bằng giá trị đơn hàng (Boundary final_amount = 0) | `coupon_code`: Mã giảm 100,000 ₫, `cart_total`: `100,000 ₫` | `discount_amount = 100,000 ₫`.; `final_amount = 100,000 - 100,000 = 0 ₫`.; Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không bị lỗi tính toán số âm. | Bị từ chối do lỗi biên min_order_amount: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Backend không cho phép total_amount == min_order_amount. | **FAIL** | [TC-COUPON-016.png](test-cases/FR-09/screenshots/TC-COUPON-016.png) | DEF-FR09-02 |
| **TC-COUPON-017** | Ghi nhận lịch sử sử dụng mã giảm giá sau khi thanh toán thành công | `coupon_code`: `SAVE10`, `cart_total`: `500,000 ₫`, `Thao tác`: Nhấn nút "Xác Nhận Thanh Toán" | Đơn hàng được tạo thành công với số tiền đã giảm.; Bảng `coupon_usage` được thêm 1 bản ghi mới với `coupon_id` tương ứng và `user_id` của `test@eshop.com`.; Số lần sử dụng mã của người dùng tăng lên 1. | Thanh toán thành công qua UI, bản ghi coupon_usage được chèn vào CSDL (1 lượt ghi nhận cho BIGBUY). | **PASS** | [TC-COUPON-017.png](test-cases/FR-09/screenshots/TC-COUPON-017.png) | Không có |
| **TC-COUPON-018** | Thay đổi hoặc cập nhật lại giá trị đơn hàng sau khi đã áp dụng mã | `initial_total`: `350,000 ₫`, `new_total`: `200,000 ₫` (thay đổi giá trị đơn xuống dưới ngưỡng tối thiểu) | Hệ thống tự động hủy áp dụng mã giảm giá hoặc tính toán lại.; Báo lỗi đơn hàng không còn đủ giá trị tối thiểu 300,000 ₫.; Thành tiền quay về giá trị gốc của đơn hàng mới (`200,000 ₫`). | Giao diện phản hồi chính xác: khi thay đổi tổng tiền, couponResult bị hủy, tổng tiền quay về giá trị gốc: "Tổng thanh toán: 200,000 ₫". | **PASS** | [TC-COUPON-018.png](test-cases/FR-09/screenshots/TC-COUPON-018.png) | Không có |
| **TC-COUPON-019** | Từ chối mã khi đồng thời vi phạm nhiều điều kiện (C2 Invalid + C3 Invalid) | `coupon_code`: `EXPIRED`, `cart_total`: `50,000 ₫` | Hệ thống từ chối áp dụng mã và hiển thị thông báo lỗi phù hợp (ưu tiên thông báo mã hết hạn hoặc không đủ điều kiện tối thiểu).; Không áp dụng giảm giá. | Từ chối chính xác: "Đơn hàng chưa đủ giá trị tối thiểu 100,000 ₫ để áp dụng mã này". Ưu tiên kiểm tra ngưỡng đơn hàng tối thiểu trước khi xét ngày hết hạn. | **PASS** | [TC-COUPON-019.png](test-cases/FR-09/screenshots/TC-COUPON-019.png) | Không có |
| **TC-COUPON-020** | Xác thực tính toàn vẹn số tiền thanh toán phía Backend khi gọi API Checkout | `coupon_id`: ID của `BIGBUY`, `tampered_total`: `100,000 ₫` (giá trị cố tình bị chỉnh sửa sai lệch từ client gửi lên API `/api/checkout`) | Backend tự động tính toán lại số tiền dựa trên giá sản phẩm thực tế trong giỏ và mã giảm giá hợp lệ.; Backend không chấp nhận số tiền bị can thiệp trái phép từ client; giá trị lưu trong CSDL phải là `450,000 ₫`. | Backend chấp nhận trực tiếp total_amount = 100000 ₫ bị can thiệp từ client mà không tự tính lại giá từ giỏ hàng và coupon. | **FAIL** | [TC-COUPON-020.png](test-cases/FR-09/screenshots/TC-COUPON-020.png) | DEF-FR09-05 |

---

## 4. Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR09-01: Sai lệch Công thức Tính Giảm giá Phần trăm (Tạo số tiền âm và đội giá thanh toán)
- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical / Blocker - Business Logic & Calculation Error)
- **Vị trí**: `backend/server.js:399-401`, `backend/server.js:419-421`
- **Mô tả**: Biểu thức `discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))` khiến mã giảm giá 10% tính ra số âm `-4,500,000 ₫`, dẫn đến tổng tiền thanh toán bị đội lên gấp 10 lần (`5,000,000 ₫`) thay vì giảm xuống `450,000 ₫`.

- **GitHub Issue:** [#20](https://github.com/Taylor3691/eshop-sut/issues/20).
### DEF-FR09-02: Lỗi Biên Lệch Một Đơn vị khi Kiểm tra Ngưỡng Đơn hàng Tối thiểu (Off-by-One Boundary Condition C3)
- **Mức độ Nghiêm trọng**: Cao (Major - Boundary Value Defect)
- **Vị trí**: `backend/server.js:379`
- **Mô tả**: Sử dụng toán tử lớn hơn nghiêm ngặt `if (total_amount > coupon.min_order_amount)` thay vì lớn hơn hoặc bằng (`>=`). Khi đơn hàng có giá trị chính xác bằng ngưỡng tối thiểu (ví dụ `300,000 ₫` cho SAVE10, `500,000 ₫` cho BIGBUY), hệ thống từ chối áp dụng mã và báo lỗi thiếu điều kiện.

- **GitHub Issue:** [#21](https://github.com/Taylor3691/eshop-sut/issues/21).
### DEF-FR09-03: Thiếu Middleware Xác thực JWT ở API Áp dụng Mã Giảm giá (Condition C4 Violation)
- **Mức độ Nghiêm trọng**: Cao (High - Security & Access Control)
- **Vị trí**: `backend/server.js:363`, `frontend-web/src/pages/Checkout.jsx`
- **Mô tả**: API `/api/apply-coupon` không yêu cầu token đăng nhập. Khách vãng lai chưa đăng nhập vẫn truy cập được `/checkout` và áp dụng mã giảm giá thành công, vi phạm trực tiếp Điều kiện C4 trong đặc tả.

- **GitHub Issue:** [#22](https://github.com/Taylor3691/eshop-sut/issues/22).
### DEF-FR09-05: Tách rời Xử lý Giảm giá giữa Checkout và Ghi nhận Lượt dùng Coupon
- **Mức độ Nghiêm trọng**: Cao (High - Transaction Integrity & Security)
- **Vị trí**: `backend/server.js:297-309`, `frontend-web/src/pages/Checkout.jsx:53-59`
- **Mô tả**: API `/api/checkout` chấp nhận trực tiếp giá trị `total_amount` gửi từ client mà không tự tính toán lại dựa trên giỏ hàng và mã giảm giá, cho phép người mua có thể can thiệp số tiền thanh toán bất kỳ.

- **GitHub Issue:** [#34](https://github.com/Taylor3691/eshop-sut/issues/34).
- **Manual review:** AI-gap TC-GAP-COUPON-007, TC-GAP-COUPON-008, and TC-GAP-COUPON-014 need review; matching screenshot evidence was not found for these distinct user-id and usage-recording scenarios.
