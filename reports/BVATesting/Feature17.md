# Báo cáo Boundary Value Analysis — Feature17

## Phạm vi

- **Requirement:** FR-17 — Quản lý Mã Giảm Giá (Coupon CRUD).
- **Nguồn requirement:** `README.md`, mục `FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)`.
- **Phạm vi kiểm thử:** Chỉ FR-17; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

## 1. Input / Output

### Input

- **Thao tác quản lý:** Thêm, Xem hoặc Xóa mã giảm giá.
- **`code`:** trường bắt buộc và duy nhất.
- **`type`:** trường bắt buộc, nhận `percent` hoặc `fixed`.
- **`discount_value`:** trường bắt buộc và phải dương (`discount_value > 0`).
- **`expired_at`:** trường bắt buộc.
- **`min_order_amount`:** trường bắt buộc và phải thỏa `min_order_amount >= 0`.
- **`max_uses_per_user`:** trường bắt buộc và phải thỏa `max_uses_per_user >= 1`.

### Output

- **Kết quả thao tác CRUD:** mã giảm giá được thêm, xem hoặc xóa theo thao tác Admin; tạo mã với dữ liệu không thỏa rule bị từ chối.
- **Dữ liệu mã giảm giá hiển thị:** thông tin mã giảm giá khi Admin thực hiện thao tác Xem.

### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho `discount_value`, `min_order_amount` và `max_uses_per_user` vì requirement có giới hạn dưới rõ ràng.
- `max_uses_per_user` là số lần sử dụng, nên là đại lượng đếm nguyên với đơn vị bước có căn cứ là **1 lần**.
- Kiểu số và precision của `discount_value`, `min_order_amount` chưa được mô tả. Vì vậy chỉ giá trị đúng tại mốc `0` có thể cụ thể hóa mà không suy đoán; không tự chọn `Δ = 1`, `0.01` hoặc giá trị khác cho vị trí ngay trước/sau mốc.
- Không áp dụng BVA cho `code`, `type`, `expired_at` và thao tác CRUD vì đó là rule bắt buộc, duy nhất hoặc tập giá trị phân loại; không có miền thứ tự và boundary đủ thông tin.
- Không xác định Output Boundary vì FR-17 không nêu output dạng số, khoảng giá trị, hoặc công thức Input → Output.

## 2. Boundary Value Analysis

### Boundary Value Analysis cho `discount_value`

Miền hợp lệ là **`discount_value > 0`**. Mốc chuyển tiếp là **0** và bị loại khỏi miền hợp lệ. FR-17 không mô tả Upper Boundary.

Về nguyên tắc, quanh mốc **0** cần xét:

**0 - Δ, 0, 0 + Δ**

Trong đó:

- **`0 - Δ`** nằm ngay dưới mốc và không hợp lệ.
- **`0`** nằm tại mốc nhưng không hợp lệ vì rule dùng toán tử `> 0`.
- **`0 + Δ`** là giá trị dương ngay trên mốc và hợp lệ.

Kiểu số và precision **chưa được mô tả trong requirement**, nên không đủ căn cứ để thay `Δ` bằng số cụ thể. Tập Boundary Test Value có thể thực thi là:

**0**

Hai vị trí `0 - Δ` và `0 + Δ` được ghi nhận là chưa thể cụ thể hóa, không thay bằng giá trị nằm xa boundary.

### Boundary Value Analysis cho `min_order_amount`

Miền hợp lệ là **`min_order_amount >= 0`**. Mốc quan trọng là **Lower Boundary = 0** và được bao gồm trong miền hợp lệ. FR-17 không mô tả Upper Boundary.

Về nguyên tắc, quanh mốc **0** cần xét:

**0 - Δ, 0, 0 + Δ**

Trong đó:

- **`0 - Δ`** nằm ngay dưới giới hạn và không hợp lệ.
- **`0`** nằm đúng tại giới hạn dưới và hợp lệ.
- **`0 + Δ`** nằm ngay trên giới hạn dưới và hợp lệ.

Kiểu số và precision **chưa được mô tả trong requirement**, nên không đủ căn cứ để chọn giá trị cụ thể cho `Δ`. Tập Boundary Test Value có thể thực thi là:

**0**

Hai vị trí `0 - Δ` và `0 + Δ` được ghi nhận là chưa thể cụ thể hóa.

### Boundary Value Analysis cho `max_uses_per_user`

Miền hợp lệ là **từ 1 lần sử dụng/người trở lên**. Mốc quan trọng là **Lower Boundary = 1**; requirement không mô tả Upper Boundary. Vì đây là số lần sử dụng, đơn vị bước là **1 lần**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn tối thiểu và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ.

### Tập BVA cuối cùng

- `discount_value`: **0**.
- `min_order_amount`: **0**.
- `max_uses_per_user`: **0, 1, 2**.

Tổng cộng có **5 Boundary Test Value cụ thể**. Các vị trí sát mốc chưa thể cụ thể hóa của hai trường số được ghi rõ tại phần giới hạn requirement.

## 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| `discount_value` | Giá trị giảm giá phải dương | Mốc 0 bị loại (`x > 0`) | 0 | Invalid — hệ thống từ chối tạo mã giảm giá vì giá trị không dương. |
| `min_order_amount` | Giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 0 | LB | 0 | Valid — giá trị nằm đúng tại giới hạn dưới. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB-1 | 0 | Invalid — hệ thống từ chối tạo mã giảm giá vì số lần nhỏ hơn 1. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB | 1 | Valid — giá trị nằm đúng tại giới hạn dưới. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB+1 | 2 | Valid — giá trị nằm ngay trên giới hạn dưới. |

## 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Thao tác quản lý | Thêm / Xem / Xóa | Thêm | Boundary của các trường được kiểm tra khi tạo mã giảm giá. |
| `code` | Bắt buộc và duy nhất | Mã cố định riêng cho từng TC, được liệt kê tại Test Cases | Không sinh mã động; precondition xác minh mã chưa tồn tại. |
| `type` | `percent` hoặc `fixed` | `fixed` — UI: `Số tiền cố định (₫)` | Giá trị kỹ thuật là `fixed`; nhãn UI tiếng Việt được đối chiếu từ source. |
| `discount_value` | `> 0` | `10` | Giá trị dương rõ ràng; dùng khi không kiểm thử boundary của trường này. |
| `expired_at` | Bắt buộc | `2099-12-31` | Giá trị cố định trong tương lai để tách khỏi rule ngày hiện tại vốn không được FR-17 mô tả. |
| `min_order_amount` | `>= 0` | `100000` | Giá trị hợp lệ, không dùng như giá trị sát biên. |
| `max_uses_per_user` | `>= 1` | `5` | Giá trị đếm hợp lệ, không sát Lower Boundary. |

**Tiền điều kiện chung:** Admin đang ở chức năng Thêm mã giảm giá. Mỗi test case dùng đúng `code` cố định được liệt kê bên dưới và mã đó chưa tồn tại trước khi chạy. Mỗi test case độc lập. Dữ liệu từ test case tạo thành công phải được hoàn tác; nếu không xác minh được trạng thái này, testcase bị Blocked thay vì đổi code.

### Ánh xạ UI đã xác minh cho automation

| Trường chuẩn | Control/UI tiếng Việt | Giá trị kỹ thuật |
|---|---|---|
| `code` | placeholder `Mã coupon (VD: SAVE10)` | chuỗi code |
| `type` | select `Phần trăm (%)` / `Số tiền cố định (₫)` | `percent` / `fixed` |
| `discount_value` | `Giá trị % (VD: 10)` hoặc `Số tiền (VD: 50000)` | số |
| `min_order_amount` | placeholder `Đơn tối thiểu (₫)` | số |
| `expired_at` | input ngày `Ngày hết hạn` | `YYYY-MM-DD` |
| `max_uses_per_user` | placeholder `Số lần dùng tối đa/người` | số |

Đây là mapping automation, không thay đổi tên trường requirement hoặc Test data. Khi source chưa có `data-testid`/`name`/label truy cập được, script chỉ được dùng placeholder đã xác minh trong form tạo coupon.

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR17-001** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17DV0` chưa tồn tại | **Boundary:** `discount_value = 0` (mốc 0 bị loại)<br>**code:** `BVA17DV0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000`<br>**max_uses_per_user:** `5` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Hệ thống từ chối tạo mã giảm giá vì `discount_value` không phải giá trị dương. | Not run / None |
| **TC-BVA-FR17-002** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MIN0` chưa tồn tại | **Boundary:** `min_order_amount = 0` (LB)<br>**code:** `BVA17MIN0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**max_uses_per_user:** `5` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `min_order_amount = 0` thỏa `>= 0` và các input khác hợp lệ. | Not run / None |
| **TC-BVA-FR17-003** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX0` chưa tồn tại | **Boundary:** `max_uses_per_user = 0` (LB-1)<br>**code:** `BVA17MAX0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Hệ thống từ chối tạo mã giảm giá vì `max_uses_per_user` nhỏ hơn 1. | Not run / None |
| **TC-BVA-FR17-004** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX1` chưa tồn tại | **Boundary:** `max_uses_per_user = 1` (LB)<br>**code:** `BVA17MAX1`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `max_uses_per_user = 1` nằm đúng tại giới hạn dưới và các input khác hợp lệ. | Not run / None |
| **TC-BVA-FR17-005** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX2` chưa tồn tại | **Boundary:** `max_uses_per_user = 2` (LB+1)<br>**code:** `BVA17MAX2`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `max_uses_per_user = 2` nằm ngay trên giới hạn dưới và các input khác hợp lệ. | Not run / None |

## 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| `discount_value` | Mốc 0 bị loại (`x > 0`) | 0 | TC-BVA-FR17-001 |
| `min_order_amount` | LB | 0 | TC-BVA-FR17-002 |
| `max_uses_per_user` | LB-1 | 0 | TC-BVA-FR17-003 |
| `max_uses_per_user` | LB | 1 | TC-BVA-FR17-004 |
| `max_uses_per_user` | LB+1 | 2 | TC-BVA-FR17-005 |

Tất cả Boundary Test Value cụ thể xác định được từ requirement đều có test case cover.

Các vị trí `0 - Δ` và `0 + Δ` của `discount_value` và `min_order_amount` không phải Boundary Value bị bỏ sót; chúng chưa thể chuyển thành giá trị cụ thể vì FR-17 không nêu kiểu số hoặc precision.

## 7. Output Boundary Analysis

Không xác định Output Boundary từ requirement. Kết quả Thêm/Xem/Xóa là trạng thái rời rạc; FR-17 không mô tả output có miền giá trị có thứ tự hoặc quan hệ tính toán Input → Output.

## 8. BVA Summary

```text
Total Inputs / Outputs reviewed: 9 (7 Inputs, 2 Outputs)
Total Inputs / Outputs applicable to BVA: 3 Inputs
Total boundary points identified: 3 lower boundary/threshold points
Total boundary test values: 5 concrete values
Total test cases generated: 5
Uncovered boundary values: 0 concrete values
Unresolved adjacent boundary positions: 4
```

### Giới hạn của requirement

- Kiểu số và precision của `discount_value`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để cụ thể hóa `0 - Δ` và `0 + Δ`.
- Kiểu số và precision của `min_order_amount`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để cụ thể hóa `0 - Δ` và `0 + Δ`.
- Upper Boundary của `discount_value`, `min_order_amount` và `max_uses_per_user`: **Chưa được mô tả trong requirement.** Không tự tạo giới hạn trên.
- Cấu trúc/độ dài của `code` và format/giới hạn ngày của `expired_at`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để xác định Boundary Value.
- Thông báo lỗi cụ thể cho dữ liệu không hợp lệ: **Chưa được mô tả trong requirement.** Expected Result chỉ khẳng định chấp nhận hoặc từ chối theo rule, không tự viết nội dung thông báo.
