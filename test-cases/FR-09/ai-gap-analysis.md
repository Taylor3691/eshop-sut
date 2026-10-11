# Phân tích Lỗ hổng AI cho FR-09: Rà soát Kiểm thử Miền giá trị & Phân tích Giá trị Biên (Mã Giảm Giá)

---

## 1. Tóm tắt Rà soát Bộ Kiểm thử Hiện có (Review of Existing Test Suites)

Hệ thống EShop hiện có hai bộ kiểm thử dành cho **FR-09 (Mã Giảm Giá / Discount Coupons)**:
- [domain_testing.md](test-cases/FR-09/domain_testing.md): Gồm 20 test case (`TC-COUPON-001` đến `TC-COUPON-020`) bao phủ 5 điều kiện hợp lệ C1–C5, các lớp tương đương hợp lệ/không hợp lệ, phân loại percent/fixed và các kịch bản tích hợp.
- [bva_testing.md](test-cases/FR-09/bva_testing.md): Gồm 18 test case (`TC-BVA-COUPON-001` đến `TC-BVA-COUPON-018`) tập trung vào các điểm biên `min_order_amount` (-1, at, +1), số lượt dùng `max_uses_per_user`, ngày hết hạn `expired_at`, và giới hạn số tiền thanh toán `final_amount = 0`.

Quá trình đối chiếu giữa **Đặc tả Yêu cầu Oracle (`README.md` FR-09 & FR-08)**, **Mã nguồn Cài đặt Thực tế (`backend/server.js`, `frontend-web/src/pages/Checkout.jsx`)**, và **Kết quả Thực thi Thực tế trên hệ thống đang chạy (`http://127.0.0.1:3000`)** cho thấy nhiều lỗ hổng thiết kế kiểm thử AI nghiêm trọng.

---

## 2. Ma trận So sánh Đặc tả Oracle vs. Cài đặt Thực tế

| Khía cạnh Tính năng | Đặc tả Yêu cầu Oracle (`README.md`) | Cài đặt Thực tế (`backend/server.js`, Frontend) | Đánh giá Tuân thủ |
|---|---|---|---|
| **Công thức Giảm giá Phần trăm (Percent)** | `discount_amount = total × discount_value / 100`<br>`final_amount = total - discount_amount` | `discount_amount = Math.floor(total_amount * (1 - coupon.discount_value))` (`server.js:400, 420`) | **Sai lệch nghiêm trọng (Lỗi)**: Với `discount_value = 10`, số tiền giảm bị âm gấp 9 lần tổng tiền, làm tổng thanh toán tăng gấp 10 lần. |
| **Công thức Giảm giá Cố định (Fixed)** | `discount_amount = discount_value`<br>`final_amount = total - discount_amount` | `discount_amount = coupon.discount_value`<br>`final_amount = total_amount - discount_amount` (`server.js:403, 406`) | **Tuân thủ** đối với các trường hợp đơn hàng lớn hơn mức giảm. |
| **Điều kiện C1: Mã tồn tại & Hoạt động** | Mã có trong CSDL và `is_active = 1` | `SELECT * FROM coupons WHERE code = ? AND is_active = 1` (`server.js:370`) | **Tuân thủ**. Mã không tồn tại hoặc `is_active = 0` đều trả về HTTP 404. |
| **Điều kiện C2: Còn hạn sử dụng** | Ngày hiện tại phải trước `expired_at` (`now < expired_at`) | `const expiry = new Date(coupon.expired_at); if (expiry < now)` trả về 400 (`server.js:380-384`) | **Tuân thủ** cơ bản. |
| **Điều kiện C3: Đủ ngưỡng đơn hàng** | Tổng đơn hàng **>= (lớn hơn hoặc bằng)** `min_order_amount` | `if (total_amount > coupon.min_order_amount)` (`server.js:379`) | **Sai lệch Biên (Lỗi)**: So sánh strictly greater (`>`) thay vì lớn hơn hoặc bằng (`>=`), dẫn đến từ chối đơn hàng tại đúng ngưỡng tối thiểu. |
| **Điều kiện C4: Đã đăng nhập** | Người dùng phải có **JWT Token hợp lệ** | Route `POST /api/apply-coupon` **không có middleware `authenticateToken`** (`server.js:363`). Nhận `user_id` tùy chọn trong request body. | **Không tuân thủ (Lỗi An ninh)**: Cho phép khách vãng lai áp dụng mã, hoặc giả mạo `user_id` của tài khoản khác. |
| **Điều kiện C5: Giới hạn lượt dùng** | Số lần đã dùng < `max_uses_per_user` | Kiểm tra `usage_count >= coupon.max_uses_per_user` nếu có `user_id`. Nếu `user_id` bị bỏ trống, hệ thống **bỏ qua hoàn toàn C5** (`server.js:386-433`). | **Lỗ hổng Lách luật (Lỗi)**: Bỏ trống `user_id` sẽ được áp dụng mã không giới hạn số lần. |
| **Ghi nhận Lịch sử Sử dụng Mã** | Hệ thống ghi nhận lượt dùng khi đơn hàng thành công | `/api/checkout` không ghi nhận lượt dùng; việc gọi `/api/coupon-usage` do Frontend client tự thực hiện sau khi thanh toán (`Checkout.jsx:55-58`). | **Lỗ hổng Kiến trúc (Lỗi)**: Client có thể bỏ qua bước gọi API ghi nhận để dùng mã vô hạn lần. |
| **Giới hạn Dưới của Tiền thanh toán** | Số tiền thanh toán không được âm (`final_amount >= 0`) | `final_amount = total_amount - discount_amount` không có hàm `Math.max(0, ...)` (`server.js:406, 425`). | **Thiếu Kiểm tra Phòng thủ**. |

---

## 3. Phân tích Chi tiết các Lỗ hổng AI (Lý do AI Bỏ sót Kịch bản)

### Lỗ hổng 1: Sai lệch Phép toán Giảm giá Phần trăm (Percent Discount Calculation Defect)
- **Kịch bản Bị Bỏ sót**:
  - Kiểm thử số tiền giảm giá và số tiền thanh toán thực tế trả về từ backend đối với mã phần trăm (`SAVE10`, 10%).
  - Kiểm tra xem `discount_amount` có mang giá trị dương hợp lệ hay bị âm; `final_amount` có bị đội giá lên gấp nhiều lần hay không.
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Chủ nghĩa Hoàn hảo theo Đặc tả (Specification Idealism)*: AI thiết kế test case dựa trên đặc tả toán học hiển nhiên (`discount = total * 10 / 100`). AI cho rằng phép nhân chia tỷ lệ phần trăm là kiến thức cơ bản của lập trình viên nên không nghi ngờ logic toán học nội bộ sẽ bị đảo lộn.
  2. *Thiếu Kiểm tra Độc lập Giá trị Đầu ra*: AI chỉ kiểm tra trạng thái HTTP 200 thành công thay vì khẳng định chặt chẽ quan hệ toán học `0 < discount_amount < total_amount`.

### Lỗ hổng 2: Lỗi Biên Lệch một Đơn vị tại Ngưỡng Đơn hàng Tối thiểu (`total_amount == min_order_amount`)
- **Kịch bản Bị Bỏ sót**:
  - Kiểm tra phản ứng thực tế của hệ thống tại điểm biên bằng chính xác `min_order_amount` (ví dụ `300,000 ₫` đối với `SAVE10`, `500,000 ₫` đối với `BIGBUY`).
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Đồng nhất Kết quả Mong đợi với Kết quả Thực tế*: Trong bộ BVA (`TC-BVA-COUPON-002`, `TC-BVA-COUPON-005`), AI đặt kết quả mong đợi theo Oracle là "Hệ thống chấp nhận mã". Khi không chạy kiểm thử thực tế, AI không phát hiện ra rằng lập trình viên đã dùng toán tử so sánh `>` thay vì `>=` trong `server.js:379`, khiến hệ thống thực tế từ chối với lỗi 400.

### Lỗ hổng 3: Thiếu Middleware Xác thực JWT ở Điều kiện C4 & Giả mạo `user_id` (C4 Authentication Bypass & ID Spoofing)
- **Kịch bản Bị Bỏ sót**:
  - Gửi request `POST /api/apply-coupon` không kèm JWT Token trong header.
  - Gửi request không có trường `user_id` trong body.
  - Gửi request kèm `user_id` giả mạo của người dùng khác (Insecure Direct Object Reference - IDOR).
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Giả định Tính Đối xứng Đa tầng (Tier Symmetry Assumption)*: Vì đặc tả C4 ghi rõ *"Người dùng phải có JWT Token hợp lệ"*, AI mặc định tin rằng API đã được gắn middleware xác thực JWT (như các API `/api/coupons` hay `/api/checkout`).
  2. *Bỏ qua Kiểm thử Giao diện Lập trình (API Contract Testing)*: AI chỉ viết test case theo luồng người dùng trên giao diện (Frontend) – nơi user đã đăng nhập, mà không kiểm thử bảo mật trực tiếp trên endpoint API khi thiếu token.

### Lỗ hổng 4: Vượt mặt Giới hạn Số lượt Dùng C5 bằng cách Bỏ trống `user_id` (Usage Limit Bypass)
- **Kịch bản Bị Bỏ sót**:
  - Áp dụng mã đã hết lượt dùng (`usage_count >= max_uses_per_user`) bằng cách loại bỏ thuộc tính `user_id` khỏi payload JSON gửi lên API.
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Tư duy Happy-Path trong Phân hoạch Tương đương*: AI phân hoạch C5 thành hai lớp: `usage < max` và `usage >= max` với giả định biến `user_id` luôn hiện diện. AI không xem xét lớp phân hoạch bất thường: `user_id = null` hoặc `user_id` không tồn tại trong payload.

### Lỗ hổng 5: Tách rời Xử lý Giảm giá giữa Checkout và Lưu Lịch sử (Decoupled Checkout & Usage Tampering)
- **Kịch bản Bị Bỏ sót**:
  - Đặt hàng qua `POST /api/checkout` với `total_amount` đã giảm nhưng cố tình không gọi `POST /api/coupon-usage`.
  - Đặt hàng trực tiếp với `total_amount` bị can thiệp mà không áp dụng mã giảm giá hợp lệ.
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Kiểm thử Cô lập Tính năng (Feature Isolation Bias)*: AI kiểm thử FR-09 độc lập với FR-08 (Checkout), giả định rằng khi áp dụng mã thành công thì quy trình thanh toán sẽ tự động xử lý bảo mật toàn vẹn giao dịch nguyên tử (atomic transaction) trên backend.

### Lỗ hổng 6: Phân biệt Hoa/Thường và Khoảng trắng giữa CSS Client và CSDL Backend
- **Kịch bản Bị Bỏ sót**:
  - Nhập mã dạng chữ thường (`save10`, `bigbuy`) hoặc chứa khoảng trắng thừa (` SAVE10 `) trực tiếp qua API hoặc dán vào form.
- **Lý do AI Bỏ sót trong Thiết kế Ban đầu**:
  1. *Nhầm lẫn giữa Hiển thị Giao diện (CSS) và Chuyển đổi Dữ liệu*: Trong file `Checkout.jsx`, ô input có class Tailwind `uppercase`. AI ngộ nhận rằng thuộc tính này tự động biến đổi chuỗi dữ liệu đầu vào thành chữ hoa, trong khi CSS chỉ tác động hiển thị hình ảnh, giá trị chuỗi thực tế gửi đi vẫn là chữ thường nếu người dùng gõ phím thường và backend SQLite truy vấn chính xác hoa thường.

---

## 4. Bảng Kết quả Thực thi Kiểm thử Thực tế (Live Execution Results Table)

Toàn bộ các ca kiểm thử dưới đây đã được **thực thi và xác minh trực tiếp** trên Backend EShop đang chạy tại `http://127.0.0.1:3000`.

| Mã Kiểm thử (Test ID) | Kịch bản Kiểm thử | Dữ liệu Đầu vào / Thao tác | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Ghi nhận) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-GAP-COUPON-001** | Tính toán giảm giá phần trăm với mã `SAVE10` (đơn 500k) | `code: "SAVE10"`, `total_amount: 500000`, `user_id: 1` | Áp dụng thành công; giảm 10% = 50,000 ₫; thanh toán = 450,000 ₫ | HTTP 200; `discount_amount: -4500000`; `final_amount: 5000000` | **FAIL** | Payload API: `{"discount_amount":-4500000,"final_amount":5000000}`. Khách hàng bị đội giá gấp 10 lần. | **DEF-FR09-01** |
| **TC-GAP-COUPON-002** | Tính toán giảm giá phần trăm với mã `SAVE10` (đơn 400k) | `code: "SAVE10"`, `total_amount: 400000`, `user_id: 1` | Áp dụng thành công; giảm 10% = 40,000 ₫; thanh toán = 360,000 ₫ | HTTP 200; `discount_amount: -3600000`; `final_amount: 4000000` | **FAIL** | Formula `Math.floor(total * (1 - 10))` tạo số âm `-3,600,000 ₫`. | **DEF-FR09-01** |
| **TC-GAP-COUPON-003** | Kiểm tra biên tại đúng ngưỡng tối thiểu `SAVE10` (`total == 300,000`) | `code: "SAVE10"`, `total_amount: 300000`, `user_id: 1` | Chấp nhận mã vì thỏa mãn C3: `total >= min_order_amount` (300k >= 300k) | HTTP 400; Báo lỗi: *"Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"* | **FAIL** | Backend kiểm tra `total_amount > coupon.min_order_amount` (`server.js:379`) thay vì `>=`. | **DEF-FR09-02** |
| **TC-GAP-COUPON-004** | Kiểm tra biên trên ngưỡng tối thiểu `SAVE10` (`total == 300,001`) | `code: "SAVE10"`, `total_amount: 300001`, `user_id: 1` | Chấp nhận mã; giảm 10% | HTTP 200; Chấp nhận mã (nhưng bị lỗi tính toán phần trăm âm) | **PASS** (Biên) | Qua được bước kiểm tra điều kiện C3 vì 300,001 > 300,000. | Không có |
| **TC-GAP-COUPON-005** | Kiểm tra biên tại đúng ngưỡng tối thiểu `BIGBUY` (`total == 500,000`) | `code: "BIGBUY"`, `total_amount: 500000`, `user_id: 1` | Chấp nhận mã vì thỏa mãn C3: 500k >= 500k; giảm 50,000 ₫ | HTTP 400; Báo lỗi: *"Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này"* | **FAIL** | Lỗi toán tử so sánh `>` loại bỏ giá trị tại đúng ngưỡng biên 500,000 ₫. | **DEF-FR09-02** |
| **TC-GAP-COUPON-006** | Kiểm tra điều kiện C4: Gọi API khi chưa đăng nhập (Không token, không `user_id`) | `code: "BIGBUY"`, `total_amount: 600000` (Không gửi token, không `user_id`) | Từ chối yêu cầu; yêu cầu đăng nhập (HTTP 401 Unauthorized) | HTTP 200; Áp dụng mã thành công: giảm 50,000 ₫; thanh toán 550,000 ₫ | **FAIL** | API `/api/apply-coupon` không có middleware `authenticateToken`, cho phép khách vãng lai áp dụng mã. | **DEF-FR09-03** |
| **TC-GAP-COUPON-007** | Giả mạo `user_id` trong body request (IDOR Vulnerability) | `code: "BIGBUY"`, `total_amount: 600000`, `user_id: 8888` | Từ chối hoặc lấy ID từ token xác thực | HTTP 200; Chấp nhận `user_id: 8888` tùy tiện mà không đối chiếu với token | **FAIL** | Server tin tưởng tham số `user_id` do client gửi lên mà không xác minh quyền sở hữu. | **DEF-FR09-03** |
| **TC-GAP-COUPON-008** | Lách luật giới hạn lượt dùng C5 bằng cách bỏ trống `user_id` | User 1 đã dùng `BIGBUY` 1/1 lần; gửi lại request không có `user_id` | Từ chối vì đã hết lượt dùng quy định (C5) | HTTP 200; Áp dụng thành công mã lần thứ 2 mà không bị chặn | **FAIL** | Nhánh `else` dòng 416 trong `server.js` cho phép dùng mã vô hạn lần khi thiếu `user_id`. | **DEF-FR09-04** |
| **TC-GAP-COUPON-009** | Từ chối mã đã dùng hết lượt khi có gửi `user_id` chính xác | User 1 đã dùng `BIGBUY` 1/1 lần; gửi request có `user_id: 1` | Từ chối với thông báo đã đạt giới hạn sử dụng | HTTP 400; `"Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)"` | **PASS** | Câu lệnh `SELECT COUNT(*) FROM coupon_usage` hoạt động chuẩn khi có `user_id`. | Không có |
| **TC-GAP-COUPON-010** | Áp dụng mã giảm giá cố định `BIGBUY` hợp lệ (đơn 600k) | `code: "BIGBUY"`, `total_amount: 600000`, `user_id: 1` (lần đầu) | Áp dụng thành công; giảm 50,000 ₫; thanh toán 550,000 ₫ | HTTP 200; `discount_amount: 50000`; `final_amount: 550000` | **PASS** | Phép tính mã fixed hoạt động đúng khi đơn hàng lớn hơn ngưỡng. | Không có |
| **TC-GAP-COUPON-011** | Kiểm tra điều kiện C2: Áp dụng mã hết hạn `EXPIRED` | `code: "EXPIRED"`, `total_amount: 200000`, `user_id: 1` | Từ chối vì mã đã hết hạn sử dụng (`expired_at: 2020-01-01`) | HTTP 400; `"Mã giảm giá đã hết hạn"` | **PASS** | Kiểm tra `expiry < now` từ chối mã hết hạn chính xác. | Không có |
| **TC-GAP-COUPON-012** | Phân biệt hoa thường: Gửi mã chữ thường `save10` trực tiếp đến API | `code: "save10"`, `total_amount: 400000`, `user_id: 1` | Chấp nhận nếu chuẩn hóa hoa thường, hoặc từ chối rõ ràng | HTTP 404; `"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"` | **PASS** (Hiện trạng) | SQLite truy vấn phân biệt chính xác ký tự hoa thường `WHERE code = ?`. | **DEF-FR09-07** |
| **TC-GAP-COUPON-013** | Xử lý khoảng trắng: Gửi mã có khoảng trắng ` SAVE10 ` đến API | `code: " SAVE10 "`, `total_amount: 400000`, `user_id: 1` | Chuẩn hóa cắt khoảng trắng (trim) và áp dụng mã | HTTP 404; Báo mã không tồn tại | **PASS** (Hiện trạng) | Backend không tự trim chuỗi trước khi truy vấn CSDL. | **DEF-FR09-07** |
| **TC-GAP-COUPON-014** | Tách rời thanh toán: Đặt hàng thành công nhưng không ghi nhận lượt dùng coupon | Gọi `/api/checkout` với `total_amount: 1` nhưng không gọi `/api/coupon-usage` | Backend phải tự động trừ lượt dùng mã trong cùng transaction đặt hàng | HTTP 200; Đặt hàng thành công; CSDL `coupon_usage` không tăng thêm bản ghi nào | **FAIL** | `/api/checkout` hoàn toàn không quản lý coupon; việc lưu lượt dùng phó mặc cho frontend. | **DEF-FR09-05** |
| **TC-GAP-COUPON-015** | Can thiệp giá trị thanh toán: Gửi `total_amount` tùy tiện đến `/api/checkout` | Gửi payload `{ total_amount: 1, shipping_address: "HN" }` | Backend tự tính lại tiền đơn hàng và từ chối giá trị giả mạo | HTTP 200; Tạo đơn hàng với tổng tiền chỉ `1 ₫` | **FAIL** | Vi phạm nguyên tắc bảo mật thanh toán FR-08 & FR-09. | **DEF-FR09-05** |

---

## 5. Danh mục Lỗi Phần mềm Xác minh (Verified Defect Catalog)

### DEF-FR09-01: Sai lệch Công thức Tính Giảm giá Phần trăm (Tạo số tiền âm và đội giá thanh toán)
- **Mức độ Nghiêm trọng**: Khẩn cấp (Critical / Blocker - Business Logic & Calculation Error)
- **Đặc tả Yêu cầu Oracle**:
  - `README.md` FR-09: *"Loại percent: `discount_amount = total × discount_value / 100`"*
  - `final_amount = total - discount_amount`
- **Hiện trạng Thực tế**:
  - File [backend/server.js:399-401](backend/server.js#L399-L401) và [L419-L421](backend/server.js#L419-L421):
    ```javascript
    if (coupon.type === "percent") {
      discount_amount = Math.floor(
        total_amount * (1 - coupon.discount_value),
      );
    }
    ```
- **Hệ quả Thực tế**:
  - Mã `SAVE10` có `discount_value = 10`. Biểu thức `1 - coupon.discount_value` trở thành `1 - 10 = -9`.
  - Với đơn hàng 500,000 ₫: `discount_amount = 500,000 * (-9) = -4,500,000 ₫`.
  - `final_amount = 500,000 - (-4,500,000) = 5,000,000 ₫` (khách hàng bị tính tiền gấp 10 lần thay vì được giảm giá 10%).

---

### DEF-FR09-02: Lỗi Biên Lệch Một Đơn vị khi Kiểm tra Ngưỡng Đơn hàng Tối thiểu (Off-by-One Boundary Condition C3)
- **Mức độ Nghiêm trọng**: Cao (Major - Boundary Value Defect)
- **Đặc tả Yêu cầu Oracle**:
  - `README.md` FR-09 Điều kiện C3: *"Tổng đơn hàng **>= (lớn hơn hoặc bằng)** `min_order_amount`"*.
- **Hiện trạng Thực tế**:
  - File [backend/server.js:379](backend/server.js#L379):
    ```javascript
    if (total_amount > coupon.min_order_amount) {
    ```
- **Hệ quả Thực tế**:
  - Sử dụng toán tử lớn hơn strictly (`>`) thay vì lớn hơn hoặc bằng (`>=`).
  - Khi đơn hàng có giá trị chính xác bằng ngưỡng tối thiểu (ví dụ `300,000 ₫` cho `SAVE10`, `500,000 ₫` cho `BIGBUY`), hệ thống từ chối áp dụng mã và báo lỗi thiếu điều kiện giá trị.

---

### DEF-FR09-03: Thiếu Middleware Xác thực JWT ở API Áp dụng Mã Giảm giá (Condition C4 Violation & IDOR)
- **Mức độ Nghiêm trọng**: Cao (High - Security & Access Control)
- **Đặc tả Yêu cầu Oracle**:
  - `README.md` FR-09 Điều kiện C4: *"Đã đăng nhập - Người dùng phải có JWT Token hợp lệ"*.
- **Hiện trạng Thực tế**:
  - File [backend/server.js:363](backend/server.js#L363):
    ```javascript
    app.post("/api/apply-coupon", (req, res) => {
      const { code, total_amount, user_id } = req.body;
    ```
- **Hệ quả Thực tế**:
  - API không sử dụng middleware `authenticateToken`.
  - Khách vãng lai chưa đăng nhập vẫn áp dụng được mã giảm giá thành công.
  - Người dùng có thể truyền `user_id` tùy ý trong request body để mạo danh tài khoản khác mà không bị kiểm tra quyền sở hữu.

---

### DEF-FR09-04: Lách luật Giới hạn Số lượt Dùng Mã Giảm giá khi Bỏ trống `user_id`
- **Mức độ Nghiêm trọng**: Cao (High - Business Logic Bypass)
- **Đặc tả Yêu cầu Oracle**:
  - `README.md` FR-09 Điều kiện C5: *"Số lần đã dùng mã này của user < `max_uses_per_user`"*.
- **Hiện trạng Thực tế**:
  - File [backend/server.js:386-433](backend/server.js#L386-L433):
    Nếu request không gửi `user_id`, mã chạy vào khối `else` (dòng 416) và áp dụng mã thành công mà hoàn toàn không kiểm tra bảng `coupon_usage`.
- **Hệ quả Thực tế**:
  - Người dùng đã dùng hết lượt cho phép chỉ cần gửi request không có `user_id` là có thể tiếp tục sử dụng mã không giới hạn số lần.

---

### DEF-FR09-05: Tách rời Xử lý Giảm giá giữa Checkout và Ghi nhận Lượt dùng Coupon
- **Mức độ Nghiêm trọng**: Cao (High - Transaction Integrity & Security)
- **Đặc tả Yêu cầu Oracle**:
  - `README.md` FR-08: *"Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên."*
  - `README.md` FR-09: Hệ thống áp dụng mã giảm giá và ghi nhận việc sử dụng mã cho đơn hàng.
- **Hiện trạng Thực tế**:
  - File [backend/server.js:297-309](backend/server.js#L297-L309): `/api/checkout` chấp nhận trực tiếp `total_amount` từ request body mà không xác thực mã giảm giá.
  - File [frontend-web/src/pages/Checkout.jsx:53-59](frontend-web/src/pages/Checkout.jsx#L53-L59): Frontend tự gọi riêng `POST /api/coupon-usage` sau khi checkout xong.
- **Hệ quả Thực tế**:
  - Người dùng có thể chặn (block) request gọi `/api/coupon-usage`, hưởng tiền giảm giá nhưng không bị ghi nhận đã dùng mã.
  - Người mua có thể sửa `total_amount` thành bất kỳ giá trị nào (ví dụ 1 ₫) khi gửi request checkout.

---

### DEF-FR09-07: Thiếu Chuẩn hóa Dữ liệu Đầu vào Phía Backend (Case-sensitive & Whitespace Trimming)
- **Mức độ Nghiêm trọng**: Trung bình (Medium - Input Validation & Usability)
- **Đặc tả Yêu cầu Oracle**:
  - Mã giảm giá trong thực tế người dùng thường nhập chữ thường hoặc có khoảng trắng vô tình copy/paste.
- **Hiện trạng Thực tế**:
  - Truy vấn CSDL [backend/server.js:370](backend/server.js#L370): `SELECT * FROM coupons WHERE code = ? AND is_active = 1` so khớp chính xác từng ký tự hoa/thường.
  - Frontend [frontend-web/src/pages/Checkout.jsx:114](frontend-web/src/pages/Checkout.jsx#L114) chỉ dùng class CSS `uppercase` mà không thực hiện `.toUpperCase()` dữ liệu trong state.
- **Hệ quả Thực tế**:
  - Nếu gửi trực tiếp qua API hoặc thao tác paste, mã chữ thường như `save10` hoặc có khoảng trắng thừa ` SAVE10 ` đều bị trả về lỗi không tìm thấy mã (HTTP 404).
