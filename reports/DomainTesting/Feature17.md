# Domain Testing Report — Feature17: FR-17 Quản lý Mã Giảm Giá (Coupon CRUD)

## Phạm vi và phân tích requirement

- **Nguồn:** `README.md`, mục `FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)`.
- **Phạm vi:** Chỉ FR-17; không dùng rule từ FR-09, FR-12 hoặc feature khác.
- **Rule được trích xuất:** Admin có thể Thêm, Xem, Xóa mã giảm giá; `code` bắt buộc và duy nhất; `type` bắt buộc, thuộc `{percent, fixed}`; `discount_value` bắt buộc và `> 0`; `expired_at` bắt buộc; `min_order_amount` bắt buộc và `>= 0`; `max_uses_per_user` bắt buộc và `>= 1`.
- **Chưa được mô tả trong requirement:** format/độ dài/case sensitivity của `code`; kiểu số nguyên hoặc thập phân; đơn vị tiền; giới hạn trên; giới hạn phần trăm; format và quan hệ của `expired_at` với ngày hiện tại; nội dung message; cách hiển thị chức năng Xem; xác nhận trước khi Xóa; xử lý mã đang được dùng; chức năng Sửa.
- Admin là precondition của FR-17. Phân hoạch quyền non-admin thuộc FR-12 nên không được thêm vào.

## 1. Input / Output

**Input:**

- Thao tác: Thêm, Xem hoặc Xóa.
- Khi Thêm: `code`, trạng thái tồn tại của `code`, `type`, `discount_value`, `expired_at`, `min_order_amount`, `max_uses_per_user`.
- Khi Xóa: mã giảm giá đích đang tồn tại.

**Output:**

- Dữ liệu hợp lệ: mã giảm giá được tạo.
- Dữ liệu không hợp lệ: thao tác tạo bị từ chối.
- Xem: Admin xem được mã giảm giá.
- Xóa: mã đích được xóa.
- Message, status code, cách trình bày và bước xác nhận xóa chưa được mô tả.

### Quy ước dữ liệu và đường kiểm thử cho automation

Tên field chuẩn trong report/testcase là `code`, `type`, `discount_value`, `expired_at`, `min_order_amount`, `max_uses_per_user`. Khi kiểm UI, các field này được ánh xạ tới placeholder/select tiếng Việt đã xác minh từ source; `type` dùng value kỹ thuật `percent`/`fixed`, tương ứng UI `Phần trăm (%)`/`Số tiền cố định (₫)`.

| Field | UI đã xác minh | Giá trị/dạng dùng trong automation |
|---|---|---|
| `code` | `Mã coupon (VD: SAVE10)` | Chuỗi code cố định của từng TC |
| `type` | select `Phần trăm (%)` / `Số tiền cố định (₫)` | `percent` / `fixed` |
| `discount_value` | `Giá trị % (VD: 10)` hoặc `Số tiền (VD: 50000)` | số |
| `min_order_amount` | `Đơn tối thiểu (₫)` | số |
| `expired_at` | `Ngày hết hạn` | `YYYY-MM-DD` |
| `max_uses_per_user` | `Số lần dùng tối đa/người` | số |

Các TC kiểm `type` rỗng hoặc ngoài tập không thể nhập trung thực qua select UI. Chúng là API-level Domain Test: gửi `POST /api/admin/coupons` với token Admin, body đầy đủ dữ liệu nền cố định và chỉ thay `type` theo Test data. Các TC còn lại kiểm qua UI trừ khi testcase nêu rõ API.

Mọi `code` tạo mới là giá trị cố định theo TC-ID. Precondition phải xác minh code chưa tồn tại; testcase tạo thành công phải cleanup đúng code đó. Nếu không thỏa, ghi Blocked thay vì sinh code động hoặc thay Test data.

Các giá trị “dữ liệu nền hợp lệ” trong bảng phân hoạch được cụ thể hóa khi thực thi là `type: fixed`, `discount_value: 10`, `expired_at: 2099-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2`, trừ đúng field đang kiểm thử. Contract này là nguồn Test data thực thi và thay thế mọi cụm “Khác: dữ liệu nền hợp lệ” trong bảng testcase bên dưới. Contract cụ thể theo TC là:

| TC-ID | `code` | Field cố ý khác dữ liệu nền | Kênh |
|---|---|---|---|
| TC-COUPON-001 | `EP_PERCENT_NEW` | `type: percent`, `discount_value: 10`, `expired_at: 2027-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2` | UI |
| TC-COUPON-002 | `EP_FIXED_NEW` | `type: fixed`, `discount_value: 50000`, `expired_at: 2027-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2` | UI |
| TC-COUPON-003 | `""` | `code` rỗng | UI |
| TC-COUPON-004 | `EP_COUPON_EXISTING` | code đã tồn tại | UI |
| TC-COUPON-005 | `EP_TYPE_EMPTY` | `type: ""` | API |
| TC-COUPON-006 | `EP_TYPE_OTHER` | `type: other` | API |
| TC-COUPON-007 | `EP_DISCOUNT_EMPTY` | `discount_value` không cung cấp | UI |
| TC-COUPON-008 | `EP_DISCOUNT_NEG` | `discount_value: -10` | UI |
| TC-COUPON-009 | `EP_EXPIRED_EMPTY` | `expired_at` không cung cấp | UI |
| TC-COUPON-010 | `EP_MIN_EMPTY` | `min_order_amount` không cung cấp | UI |
| TC-COUPON-011 | `EP_MIN_NEG` | `min_order_amount: -1000` | UI |
| TC-COUPON-012 | `EP_MAX_EMPTY` | `max_uses_per_user` không cung cấp | UI |
| TC-COUPON-013 | `EP_MAX_ZERO` | `max_uses_per_user: 0` | UI |
| TC-COUPON-014 | `EP_COUPON_VIEW` | coupon tồn tại để xem | UI |
| TC-COUPON-015 | `EP_COUPON_DELETE` | coupon tồn tại để xóa | UI |

---

## 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | `code` | Phải được cung cấp. |
| C2 | `code` / Trạng thái hệ thống | Với `code` không rỗng, phải chưa tồn tại. |
| C3 | `type` | Phải được cung cấp. |
| C4 | `type` | Với `type` không rỗng, phải thuộc `{percent, fixed}`. |
| C5 | `discount_value` | Phải được cung cấp. |
| C6 | `discount_value` | Với giá trị số đã cung cấp, phải `> 0`. |
| C7 | `expired_at` | Phải được cung cấp; không có rule khác trong FR-17. |
| C8 | `min_order_amount` | Phải được cung cấp. |
| C9 | `min_order_amount` | Với giá trị số đã cung cấp, phải `>= 0`. |
| C10 | `max_uses_per_user` | Phải được cung cấp. |
| C11 | `max_uses_per_user` | Với giá trị số đã cung cấp, phải `>= 1`. |
| C12 | Thao tác | Admin có thể Thêm, Xem hoặc Xóa; không có Sửa trong FR-17. |
| C13 | Output Thêm — dữ liệu hợp lệ | Mã giảm giá được tạo. |
| C14 | Output Thêm — dữ liệu không hợp lệ | Thao tác tạo bị từ chối. |
| C15 | Output Xem | Admin xem được mã giảm giá. |
| C16 | Output Xóa | Mã giảm giá đích được xóa. |

---

## 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC01 | `code` | C1 — Không rỗng. | Valid |
| EC02 | `code` | C1 — Rỗng/không cung cấp. | Invalid |
| EC03 | `code` / Trạng thái | C2 — Không rỗng và chưa tồn tại. | Valid |
| EC04 | `code` / Trạng thái | C2 — Không rỗng nhưng đã tồn tại. | Invalid |
| EC05 | `type` | C3 — Không rỗng. | Valid |
| EC06 | `type` | C3 — Rỗng/không cung cấp. | Invalid |
| EC07 | `type` | C4 — `percent`. | Valid |
| EC08 | `type` | C4 — `fixed`. | Valid |
| EC09 | `type` | C4 — Không rỗng, ngoài `{percent, fixed}`. | Invalid |
| EC10 | `discount_value` | C5 — Được cung cấp. | Valid |
| EC11 | `discount_value` | C5 — Rỗng/không cung cấp. | Invalid |
| EC12 | `discount_value` | C6 — `> 0`. | Valid |
| EC13 | `discount_value` | C6 — `<= 0`. | Invalid |
| EC14 | `expired_at` | C7 — Được cung cấp. | Valid |
| EC15 | `expired_at` | C7 — Rỗng/không cung cấp. | Invalid |
| EC16 | `min_order_amount` | C8 — Được cung cấp. | Valid |
| EC17 | `min_order_amount` | C8 — Rỗng/không cung cấp. | Invalid |
| EC18 | `min_order_amount` | C9 — `>= 0`. | Valid |
| EC19 | `min_order_amount` | C9 — `< 0`. | Invalid |
| EC20 | `max_uses_per_user` | C10 — Được cung cấp. | Valid |
| EC21 | `max_uses_per_user` | C10 — Rỗng/không cung cấp. | Invalid |
| EC22 | `max_uses_per_user` | C11 — `>= 1`. | Valid |
| EC23 | `max_uses_per_user` | C11 — `< 1`. | Invalid |
| EC24 | Thao tác | C12 — Thêm. | Valid |
| EC25 | Thao tác | C12 — Xem. | Valid |
| EC26 | Thao tác | C12 — Xóa. | Valid |
| EC27 | Output Thêm hợp lệ | C13 — Mã được tạo. | Valid |
| EC28 | Output Thêm hợp lệ | C13 — Mã không được tạo dù dữ liệu hợp lệ. | Invalid |
| EC29 | Output Thêm không hợp lệ | C14 — Tạo bị từ chối. | Valid |
| EC30 | Output Thêm không hợp lệ | C14 — Mã vẫn được tạo. | Invalid |
| EC31 | Output Xem | C15 — Xem được mã. | Valid |
| EC32 | Output Xem | C15 — Không xem được mã đang tồn tại. | Invalid |
| EC33 | Output Xóa | C16 — Mã đích được xóa. | Valid |
| EC34 | Output Xóa | C16 — Mã đích vẫn tồn tại. | Invalid |

**Kiểm tra phân hoạch:** C1–C11 tách required khỏi uniqueness/tập/khoảng. Condition miền chỉ áp dụng sau condition bắt buộc để input rỗng không đồng thời thuộc nhiều Invalid EC. `percent` và `fixed` được giữ thành hai EC để kiểm thử đủ tập giá trị. Update không được tạo EC vì ngoài FR-17. C13–C16 bao phủ output đúng/sai.

---

## 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC01 | `code` không rỗng. | Valid | `EP_COUPON_NEW` |
| EC02 | `code` rỗng. | Invalid | `""` |
| EC03 | `code` chưa tồn tại. | Valid | `EP_COUPON_NEW` chưa có trong hệ thống |
| EC04 | `code` đã tồn tại. | Invalid | `EP_COUPON_EXISTING` đã có |
| EC05 | `type` không rỗng. | Valid | `percent` |
| EC06 | `type` rỗng. | Invalid | `""` |
| EC07 | `type = percent`. | Valid | `percent` |
| EC08 | `type = fixed`. | Valid | `fixed` |
| EC09 | `type` ngoài tập. | Invalid | `other` |
| EC10 | `discount_value` có giá trị. | Valid | `10` |
| EC11 | `discount_value` thiếu. | Invalid | Không cung cấp |
| EC12 | `discount_value > 0`. | Valid | `10` |
| EC13 | `discount_value <= 0`. | Invalid | `-10` |
| EC14 | `expired_at` có giá trị. | Valid | `2027-12-31` — chỉ đại diện cho giá trị không rỗng, không suy ra rule ngày tương lai |
| EC15 | `expired_at` thiếu. | Invalid | Không cung cấp |
| EC16 | `min_order_amount` có giá trị. | Valid | `100000` |
| EC17 | `min_order_amount` thiếu. | Invalid | Không cung cấp |
| EC18 | `min_order_amount >= 0`. | Valid | `100000` |
| EC19 | `min_order_amount < 0`. | Invalid | `-1000` |
| EC20 | `max_uses_per_user` có giá trị. | Valid | `2` |
| EC21 | `max_uses_per_user` thiếu. | Invalid | Không cung cấp |
| EC22 | `max_uses_per_user >= 1`. | Valid | `2` |
| EC23 | `max_uses_per_user < 1`. | Invalid | `0` |
| EC24 | Thêm. | Valid | Chọn Thêm |
| EC25 | Xem. | Valid | Mở chức năng Xem |
| EC26 | Xóa. | Valid | Xóa `EP_COUPON_DELETE` |
| EC27 | Tạo hợp lệ thành công. | Valid | Mã mới tồn tại |
| EC28 | Tạo hợp lệ thất bại. | Invalid | Mã mới không tồn tại |
| EC29 | Từ chối dữ liệu sai. | Valid | Mã mới không được tạo |
| EC30 | Chấp nhận dữ liệu sai. | Invalid | Mã mới vẫn được tạo |
| EC31 | Xem thành công. | Valid | `EP_COUPON_VIEW` xuất hiện |
| EC32 | Xem thất bại. | Invalid | Mã tồn tại nhưng không xem được |
| EC33 | Xóa thành công. | Valid | `EP_COUPON_DELETE` không còn |
| EC34 | Xóa thất bại. | Invalid | `EP_COUPON_DELETE` vẫn còn |

---

## 5. Test Cases

**Dữ liệu nền hợp lệ:** `code` chưa tồn tại; `type=percent`; `discount_value=10`; `expired_at=2027-12-31` (chỉ kiểm tra không rỗng); `min_order_amount=100000`; `max_uses_per_user=2`. Mỗi test dùng fixture độc lập hoặc khôi phục dữ liệu.

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-COUPON-001** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_PERCENT_NEW` chưa tồn tại. | **code:** EP_PERCENT_NEW<br>**type:** percent<br>**discount_value:** 10<br>**expired_at:** 2027-12-31<br>**min_order_amount:** 100000<br>**max_uses_per_user:** 2 | 1. Nhập dữ liệu.<br>2. Thêm.<br>3. Kiểm tra mã mới. | Mã loại `percent` được tạo. Message cụ thể chưa được mô tả. | Not run / None |
| **TC-COUPON-002** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_FIXED_NEW` chưa tồn tại. | **code:** EP_FIXED_NEW<br>**type:** fixed<br>**discount_value:** 50000<br>**expired_at:** 2027-12-31<br>**min_order_amount:** 100000<br>**max_uses_per_user:** 2 | 1. Nhập dữ liệu.<br>2. Thêm.<br>3. Kiểm tra mã mới. | Mã loại `fixed` được tạo. Message cụ thể chưa được mô tả. | Not run / None |
| **TC-COUPON-003** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm. | **code:** `""`<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `code`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `code`; không khẳng định message. | Not run / None |
| **TC-COUPON-004** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_COUPON_EXISTING` đã tồn tại. | **code:** EP_COUPON_EXISTING<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập code đã tồn tại.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `code` không duy nhất; không khẳng định message. | Not run / None |
| **TC-COUPON-005** | FR-17 | Coupon / Functional / Equivalence Partitioning | Có token Admin hợp lệ.<br>`EP_TYPE_EMPTY` chưa tồn tại. | Theo contract TC-COUPON-005; **type:** `""` | 1. Gửi `POST /api/admin/coupons` với body đúng contract và `type` rỗng. | Từ chối tạo vì thiếu `type`; không khẳng định message. | Not run / None |
| **TC-COUPON-006** | FR-17 | Coupon / Functional / Equivalence Partitioning | Có token Admin hợp lệ.<br>`EP_TYPE_OTHER` chưa tồn tại. | Theo contract TC-COUPON-006; **type:** `other` | 1. Gửi `POST /api/admin/coupons` với body đúng contract và `type: other`. | Từ chối tạo vì `type` không hợp lệ; không khẳng định message. | Not run / None |
| **TC-COUPON-007** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **discount_value:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `discount_value`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `discount_value`; không khẳng định message. | Not run / None |
| **TC-COUPON-008** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **discount_value:** -10<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<=0`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `discount_value` không dương. | Not run / None |
| **TC-COUPON-009** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **expired_at:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `expired_at`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `expired_at`; không khẳng định format/message. | Not run / None |
| **TC-COUPON-010** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **min_order_amount:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống trường.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `min_order_amount`. | Not run / None |
| **TC-COUPON-011** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **min_order_amount:** -1000<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<0`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `min_order_amount < 0`. | Not run / None |
| **TC-COUPON-012** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **max_uses_per_user:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống trường.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `max_uses_per_user`. | Not run / None |
| **TC-COUPON-013** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **max_uses_per_user:** 0<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<1`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `max_uses_per_user < 1`. | Not run / None |
| **TC-COUPON-014** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Xem.<br>`EP_COUPON_VIEW` tồn tại. | **Thao tác:** Xem<br>**Mã:** EP_COUPON_VIEW | 1. Mở chức năng Xem.<br>2. Tìm/quan sát mã hiện có. | Admin xem được mã; FR-17 không quy định danh sách/chi tiết hoặc cột hiển thị. | Not run / None |
| **TC-COUPON-015** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Xóa.<br>`EP_COUPON_DELETE` tồn tại. | **Thao tác:** Xóa<br>**Mã:** EP_COUPON_DELETE | 1. Chọn Xóa mã.<br>2. Thực hiện theo UI/API hiện có.<br>3. Kiểm tra sự tồn tại. | Mã đích được xóa; FR-17 không quy định dialog/message. | Not run / None |

---

## 6. Rút gọn Test Case

- `TC-COUPON-001` kết hợp các Valid EC với `type=percent`; `TC-COUPON-002` được giữ để cover `type=fixed`.
- `TC-COUPON-003`–`013` mỗi test chỉ chủ động dùng một Invalid EC; trường khác hợp lệ, condition phụ thuộc không áp dụng khi trường bắt buộc rỗng.
- Không gộp invalid test dù cùng kết quả từ chối vì mỗi test cover một condition độc lập.
- Xem và Xóa được giữ riêng do khác trigger/output.
- Sau rút gọn còn 15 test case, cover đủ 34 EC.

---

## 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC01 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC02 | Invalid | TC-COUPON-003 |
| EC03 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC04 | Invalid | TC-COUPON-004 |
| EC05 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC06 | Invalid | TC-COUPON-005 |
| EC07 | Valid | TC-COUPON-001 |
| EC08 | Valid | TC-COUPON-002 |
| EC09 | Invalid | TC-COUPON-006 |
| EC10 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC11 | Invalid | TC-COUPON-007 |
| EC12 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC13 | Invalid | TC-COUPON-008 |
| EC14 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC15 | Invalid | TC-COUPON-009 |
| EC16 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC17 | Invalid | TC-COUPON-010 |
| EC18 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC19 | Invalid | TC-COUPON-011 |
| EC20 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC21 | Invalid | TC-COUPON-012 |
| EC22 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC23 | Invalid | TC-COUPON-013 |
| EC24 | Valid | TC-COUPON-001, TC-COUPON-002, TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC25 | Valid | TC-COUPON-014 |
| EC26 | Valid | TC-COUPON-015 |
| EC27 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC28 | Invalid | TC-COUPON-001, TC-COUPON-002 |
| EC29 | Valid | TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC30 | Invalid | TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC31 | Valid | TC-COUPON-014 |
| EC32 | Invalid | TC-COUPON-014 |
| EC33 | Valid | TC-COUPON-015 |
| EC34 | Invalid | TC-COUPON-015 |

**Kết quả:** 34/34 EC được ánh xạ tới test case. EC28, EC30, EC32, EC34 là output không tuân thủ và được kiểm tra bằng oracle tương ứng.

---
