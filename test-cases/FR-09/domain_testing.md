# TC-COUPON-001: Áp dụng thành công mã giảm giá phần trăm khi thỏa mãn đủ 5 điều kiện (SAVE10)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ và có JWT Token (C4 = True).
- Mã `SAVE10` tồn tại trong cơ sở dữ liệu với `is_active = 1` (C1 = True).
- Ngày hiện tại trước `2099-12-31` (C2 = True).
- Người dùng chưa từng sử dụng mã `SAVE10` (`usage_count = 0 < max_uses_per_user = 1`) (C5 = True).
- Giỏ hàng có sản phẩm với tổng tiền lớn hơn ngưỡng tối thiểu 300,000 ₫ (C3 = True).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập vào hệ thống bằng tài khoản `test@eshop.com`.
2. Thêm sản phẩm vào giỏ hàng sao cho tổng tiền đạt `500,000 ₫`.
3. Điều hướng đến trang Checkout (`/checkout`).
4. Nhập mã `SAVE10` vào ô "Mã Giảm Giá".
5. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống thông báo áp dụng mã thành công.
- Số tiền giảm giá được tính theo công thức phần trăm: `500,000 × 10 / 100 = 50,000 ₫`.
- Tổng tiền thanh toán cuối cùng hiển thị: `500,000 - 50,000 = 450,000 ₫`.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cho loại mã giảm giá phần trăm (`percent`), bao phủ tổ hợp thỏa mãn cả 5 điều kiện hợp lệ C1-C5.

---

# TC-COUPON-002: Áp dụng thành công mã giảm giá số tiền cố định khi thỏa mãn đủ 5 điều kiện (BIGBUY)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập với JWT Token hợp lệ (C4 = True).
- Mã `BIGBUY` tồn tại trong CSDL, `is_active = 1`, loại `fixed`, giá trị giảm 50,000 ₫, ngưỡng tối thiểu 500,000 ₫ (C1 = True).
- Mã còn hạn sử dụng (`expired_at = 2099-12-31`) (C2 = True).
- Người dùng chưa dùng mã này (`usage_count = 0 < max_uses_per_user = 1`) (C5 = True).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `600,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập với tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền `600,000 ₫` và vào trang Checkout.
3. Nhập mã `BIGBUY` vào ô mã giảm giá.
4. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống thông báo áp dụng thành công.
- Số tiền giảm giá cố định: `50,000 ₫`.
- Tổng tiền thanh toán cuối cùng: `600,000 - 50,000 = 550,000 ₫`.

## Coverage Rationale
Kiểm thử phân hoạch hợp lệ cho loại mã giảm giá số tiền cố định (`fixed`), thỏa mãn trọn vẹn 5 điều kiện C1-C5.

---

# TC-COUPON-003: Áp dụng mã giảm giá nhiều lượt dùng ở lần đầu tiên (VIP100)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ (C4 = True).
- Mã `VIP100` tồn tại, `is_active = 1`, loại `fixed`, giảm 100,000 ₫, `min_order_amount = 300,000 ₫`, `max_uses_per_user = 2` (C1, C2 = True).
- Người dùng chưa sử dụng mã `VIP100` lần nào (`usage_count = 0 < 2`) (C5 = True).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng trị giá `400,000 ₫` và vào trang Checkout.
3. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result
- Áp dụng thành công, giảm `100,000 ₫`.
- Tổng thanh toán hiển thị: `300,000 ₫`.

## Coverage Rationale
Kiểm thử phân hoạch mã giảm giá cho phép dùng nhiều lần (`max_uses_per_user = 2`) ở trạng thái sử dụng lần 1 (`usage_count = 0`).

---

# TC-COUPON-004: Áp dụng mã giảm giá tại đúng ngưỡng giá trị tối thiểu (Boundary total == min_order_amount)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập (C4 = True).
- Mã `SAVE10` có `min_order_amount = 300,000 ₫`, `is_active = 1`, còn hạn (C1, C2, C5 = True).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,000 ₫` (chính xác bằng `min_order_amount`) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo giỏ hàng có tổng giá trị chính xác là `300,000 ₫`.
3. Điều hướng đến trang Checkout.
4. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã vì điều kiện C3 quy định: Tổng đơn hàng `>= min_order_amount`.
- Giảm giá 10%: `30,000 ₫`.
- Tổng thanh toán còn lại: `270,000 ₫`.

## Coverage Rationale
Kiểm thử giá trị biên chính xác tại ngưỡng tối thiểu của C3 (`total_amount == min_order_amount`).

---

# TC-COUPON-005: Từ chối mã giảm giá khi tổng đơn hàng thấp hơn ngưỡng tối thiểu 1 đơn vị (Boundary total < min_order_amount)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` yêu cầu `min_order_amount = 300,000 ₫`.
- Đơn hàng hiện tại có tổng tiền `299,000 ₫` (nhỏ hơn ngưỡng tối thiểu).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `299,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập và tạo đơn hàng có giá trị `299,000 ₫`.
2. Mở trang Checkout.
3. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3.
- Hiển thị thông báo lỗi nêu rõ đơn hàng chưa đạt giá trị tối thiểu 300,000 ₫.
- Số tiền giảm giá bằng 0 ₫; tổng tiền giữ nguyên `299,000 ₫`.

## Coverage Rationale
Kiểm thử giá trị biên ngay dưới ngưỡng tối thiểu (`min_order_amount - 1`), kiểm tra việc thực thi điều kiện C3.

---

# TC-COUPON-006: Từ chối mã giảm giá không tồn tại trong hệ thống (Condition C1 Invalid)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `KHONGTONTAI` không tồn tại trong bảng `coupons`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `KHONGTONTAI` |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Tại trang Checkout, nhập mã `KHONGTONTAI`.
2. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống từ chối do vi phạm điều kiện C1 (mã không tồn tại).
- Hiển thị thông báo lỗi: Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.
- Không áp dụng giảm giá.

## Coverage Rationale
Kiểm thử phân hoạch tương đương không hợp lệ của điều kiện C1 (mã không tồn tại trong cơ sở dữ liệu).

---

# TC-COUPON-007: Từ chối mã giảm giá đã bị vô hiệu hóa is_active = 0 (Condition C1 Invalid)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `INACTIVE50` tồn tại trong CSDL nhưng có `is_active = 0`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `INACTIVE50` |
| `cart_total` | `600,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Tại trang Checkout, nhập mã `INACTIVE50`.
2. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do mã đang ở trạng thái ngừng kích hoạt (`is_active = 0`).
- Hiển thị thông báo mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa.
- Không giảm giá đơn hàng.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ của điều kiện C1 với mã tồn tại nhưng trạng thái `is_active = 0`.

---

# TC-COUPON-008: Từ chối mã giảm giá đã hết hạn sử dụng (Condition C2 Invalid - EXPIRED)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` có trong CSDL nhưng ngày hết hạn là `2020-01-01` (đã qua so với ngày hiện tại).
- Giá trị đơn hàng thỏa ngưỡng `min_order_amount = 100,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `200,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Tại trang Checkout, nhập mã `EXPIRED`.
2. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do vi phạm điều kiện C2: Ngày hiện tại không trước `expired_at`.
- Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.
- Không tính giảm giá.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ của điều kiện C2 (mã hết hạn sử dụng).

---

# TC-COUPON-009: Từ chối áp dụng mã giảm giá khi người dùng chưa đăng nhập (Condition C4 Invalid)

## Preconditions
- Khách vãng lai (Guest) truy cập trang Checkout mà không có JWT Token hợp lệ (C4 = False).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `user` | Không có (chưa đăng nhập / Token rỗng) |

## Test Steps
1. Truy cập trực tiếp bước Checkout hoặc gọi API `/api/apply-coupon` mà không gửi kèm JWT Token / không có phiên đăng nhập.
2. Nhập mã `SAVE10` và yêu cầu áp dụng.

## Expected Result
- Hệ thống từ chối áp dụng mã giảm giá do vi phạm điều kiện C4: Người dùng phải có JWT Token hợp lệ.
- Yêu cầu người dùng đăng nhập trước khi áp dụng mã giảm giá.

## Coverage Rationale
Kiểm thử phân hoạch không hợp lệ của điều kiện C4 (bảo mật xác thực người dùng).

---

# TC-COUPON-010: Từ chối khi người dùng đã sử dụng hết số lượt cho phép (Condition C5 Invalid)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Người dùng `test@eshop.com` đã dùng mã `SAVE10` thành công 1 lần trong quá khứ (`usage_count = 1`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `400,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập bằng tài khoản `test@eshop.com`.
2. Tạo đơn hàng trị giá `400,000 ₫` và vào trang Checkout.
3. Nhập lại mã `SAVE10` lần thứ hai.
4. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống từ chối do vi phạm điều kiện C5: `usage_count >= max_uses_per_user` (1 >= 1).
- Hiển thị thông báo lỗi người dùng đã sử dụng hết lượt cho phép đối với mã này.
- Không áp dụng giảm giá.

## Coverage Rationale
Kiểm thử giá trị biên và phân hoạch không hợp lệ của điều kiện C5 (vượt quá giới hạn số lượt dùng của người dùng).

---

# TC-COUPON-011: Kiểm thử chu kỳ dùng đủ 2 lượt của mã nhiều lượt (VIP100 - Boundary C5)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Người dùng đã sử dụng thành công 1 lần trước đó (`usage_count = 1 < 2`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `350,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập và vào Checkout với đơn hàng `350,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng" (Lần 2).
3. Hoàn tất thanh toán đơn hàng để hệ thống ghi nhận `usage_count = 2`.
4. Tạo tiếp đơn hàng thứ ba trị giá `350,000 ₫`, nhập lại mã `VIP100` và nhấn "Áp dụng" (Lần 3).

## Expected Result
- Ở Lần 2 (`usage_count = 1 < 2`): Áp dụng thành công, giảm `100,000 ₫`.
- Ở Lần 3 (`usage_count = 2 == 2`): Hệ thống từ chối áp dụng và thông báo đã hết lượt sử dụng.

## Coverage Rationale
Kiểm thử biên giá trị tại ngưỡng chuyển tiếp từ hợp lệ sang không hợp lệ của điều kiện C5 (`usage_count = 1` hợp lệ; `usage_count = 2` không hợp lệ).

---

# TC-COUPON-012: Xử lý chuẩn hóa mã giảm giá chữ thường và khoảng trắng (Normalizing Input Domain)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` hợp lệ trong hệ thống.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `  save10  ` (chữ thường kèm khoảng trắng đầu/cuối) |
| `cart_total` | `500,000 ₫` |
| `user` | `test@eshop.com` |

## Test Steps
1. Tại trang Checkout, nhập chuỗi `  save10  ` vào ô mã giảm giá.
2. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống tự động cắt tỉa khoảng trắng (trim) và chuyển thành chữ in hoa (`SAVE10`).
- Áp dụng thành công mã `SAVE10` và giảm giá `50,000 ₫`.

## Coverage Rationale
Kiểm thử tính tương đương của miền nhập liệu chuỗi ký tự (chữ hoa, chữ thường và khoảng trắng thừa).

---

# TC-COUPON-013: Từ chối khi gửi mã giảm giá rỗng hoặc chỉ toàn khoảng trắng

## Preconditions
- Người dùng đã đăng nhập và đang ở trang Checkout.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `""` (chuỗi rỗng) hoặc `"   "` |
| `cart_total` | `400,000 ₫` |

## Test Steps
1. Để trống ô nhập mã giảm giá (hoặc nhập toàn khoảng trắng).
2. Nhấn nút "Áp dụng" (hoặc gửi request API với `{ code: "" }`).

## Expected Result
- Hệ thống chặn gửi hoặc trả về thông báo lỗi: Vui lòng nhập mã giảm giá.
- Không thực hiện tính toán giảm giá.

## Coverage Rationale
Kiểm thử giá trị biên rỗng (empty/whitespace boundary) của trường mã giảm giá.

---

# TC-COUPON-014: Kiểm thử độ chính xác công thức tính giảm giá phần trăm (Percent Calculation)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `type = 'percent'` và `discount_value = 10`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `1,250,000 ₫` |

## Test Steps
1. Tạo đơn hàng trị giá `1,250,000 ₫`.
2. Áp dụng mã `SAVE10`.

## Expected Result
- `discount_amount` tính đúng theo công thức: `1,250,000 × 10 / 100 = 125,000 ₫`.
- `final_amount` tính đúng theo công thức: `1,250,000 - 125,000 = 1,125,000 ₫`.
- Giá trị giảm giá phải là số dương, không được âm.

## Coverage Rationale
Kiểm thử tính đúng đắn của công thức tính toán giảm giá phần trăm theo đặc tả FR-09.

---

# TC-COUPON-015: Kiểm thử độ chính xác công thức tính giảm giá cố định (Fixed Calculation)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `BIGBUY` có `type = 'fixed'` và `discount_value = 50,000`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `750,000 ₫` |

## Test Steps
1. Tạo đơn hàng trị giá `750,000 ₫`.
2. Áp dụng mã `BIGBUY`.

## Expected Result
- `discount_amount = 50,000 ₫`.
- `final_amount = 750,000 - 50,000 = 700,000 ₫`.

## Coverage Rationale
Kiểm thử tính đúng đắn của công thức tính toán giảm giá cố định theo đặc tả FR-09.

---

# TC-COUPON-016: Áp dụng mã giảm giá cố định bằng giá trị đơn hàng (Boundary final_amount = 0)

## Preconditions
- Người dùng đã đăng nhập.
- Có mã giảm giá cố định `100,000 ₫` với ngưỡng tối thiểu `100,000 ₫`.
- Đơn hàng trị giá `100,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | Mã giảm 100,000 ₫ |
| `cart_total` | `100,000 ₫` |

## Test Steps
1. Tạo đơn hàng trị giá đúng `100,000 ₫`.
2. Nhập mã và áp dụng.

## Expected Result
- `discount_amount = 100,000 ₫`.
- `final_amount = 100,000 - 100,000 = 0 ₫`.
- Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không bị lỗi tính toán số âm.

## Coverage Rationale
Kiểm thử biên giá trị thành tiền sau giảm giá đạt ngưỡng tối thiểu (`final_amount = 0`).

---

# TC-COUPON-017: Ghi nhận lịch sử sử dụng mã giảm giá sau khi thanh toán thành công

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Áp dụng thành công mã `SAVE10` trên đơn hàng `500,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| Thao tác | Nhấn nút "Xác Nhận Thanh Toán" |

## Test Steps
1. Tại màn hình Checkout, áp dụng thành công mã `SAVE10`.
2. Điền thông tin giao hàng và nhấn "Xác Nhận Thanh Toán".
3. Kiểm tra cơ sở dữ liệu bảng `coupon_usage` sau khi nhận thông báo thanh toán thành công.

## Expected Result
- Đơn hàng được tạo thành công với số tiền đã giảm.
- Bảng `coupon_usage` được thêm 1 bản ghi mới với `coupon_id` tương ứng và `user_id` của `test@eshop.com`.
- Số lần sử dụng mã của người dùng tăng lên 1.

## Coverage Rationale
Kiểm thử chu trình nghiệp vụ hoàn tất: kích hoạt chuyển trạng thái và cập nhật biến đếm sử dụng cho điều kiện C5.

---

# TC-COUPON-018: Thay đổi hoặc cập nhật lại giá trị đơn hàng sau khi đã áp dụng mã

## Preconditions
- Người dùng đã đăng nhập.
- Đã áp dụng thành công mã `SAVE10` trên đơn hàng ban đầu `350,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `initial_total` | `350,000 ₫` |
| `new_total` | `200,000 ₫` (thay đổi giá trị đơn xuống dưới ngưỡng tối thiểu) |

## Test Steps
1. Áp dụng mã `SAVE10` thành công trên đơn hàng `350,000 ₫`.
2. Thay đổi số lượng sản phẩm trong giỏ (hoặc sửa đổi tổng tiền) khiến giá trị đơn giảm xuống `200,000 ₫`.

## Expected Result
- Hệ thống tự động hủy áp dụng mã giảm giá hoặc tính toán lại.
- Báo lỗi đơn hàng không còn đủ giá trị tối thiểu 300,000 ₫.
- Thành tiền quay về giá trị gốc của đơn hàng mới (`200,000 ₫`).

## Coverage Rationale
Kiểm thử tính toàn vẹn dữ liệu khi có sự thay đổi trạng thái của biến phụ thuộc `cart_total`.

---

# TC-COUPON-019: Từ chối mã khi đồng thời vi phạm nhiều điều kiện (C2 Invalid + C3 Invalid)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` vừa hết hạn (C2 = False), vừa có đơn hàng chỉ `50,000 ₫` dưới ngưỡng `100,000 ₫` (C3 = False).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `50,000 ₫` |

## Test Steps
1. Tại trang Checkout với giỏ hàng `50,000 ₫`, nhập mã `EXPIRED`.
2. Nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng mã và hiển thị thông báo lỗi phù hợp (ưu tiên thông báo mã hết hạn hoặc không đủ điều kiện tối thiểu).
- Không áp dụng giảm giá.

## Coverage Rationale
Kiểm thử tổ hợp vi phạm đồng thời nhiều điều kiện đầu vào (đa điều kiện thất bại).

---

# TC-COUPON-020: Xác thực tính toàn vẹn số tiền thanh toán phía Backend khi gọi API Checkout

## Preconditions
- Người dùng đã đăng nhập với JWT Token hợp lệ.
- Giỏ hàng có sản phẩm với tổng tiền thực tế là `500,000 ₫`.
- Áp dụng mã giảm giá `BIGBUY` (giảm 50,000 ₫), số tiền thanh toán đúng phải là `450,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_id` | ID của `BIGBUY` |
| `tampered_total` | `100,000 ₫` (giá trị cố tình bị chỉnh sửa sai lệch từ client gửi lên API `/api/checkout`) |

## Test Steps
1. Gửi request `POST /api/checkout` kèm `coupon_id` nhưng sửa đổi `total_amount = 100000` thay vì `450000`.
2. Kiểm tra phản hồi API và tổng tiền đơn hàng được lưu trong bảng `orders`.

## Expected Result
- Backend tự động tính toán lại số tiền dựa trên giá sản phẩm thực tế trong giỏ và mã giảm giá hợp lệ.
- Backend không chấp nhận số tiền bị can thiệp trái phép từ client; giá trị lưu trong CSDL phải là `450,000 ₫`.

## Coverage Rationale
Kiểm thử miền giá trị bảo mật và toàn vẹn nghiệp vụ theo ràng buộc FR-08/FR-09 (Backend tự tính lại tổng tiền thanh toán).
