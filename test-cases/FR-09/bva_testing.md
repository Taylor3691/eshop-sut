# TC-BVA-COUPON-001: Đơn hàng dưới biên tối thiểu của mã SAVE10 (min_order_amount - 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ với JWT Token.
- Mã `SAVE10` đang hoạt động (`is_active = 1`), còn hạn đến `2099-12-31`, có `min_order_amount = 300,000 ₫`.
- Người dùng chưa từng sử dụng mã `SAVE10` (`usage_count = 0`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `299,999 ₫` (ngay dưới ngưỡng 300,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `299,999 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10` vào ô mã giảm giá.
4. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C3 (`total_amount < min_order_amount`).
- Hiển thị thông báo lỗi: Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này.
- Số tiền giảm giá là `0 ₫`, tổng tiền thanh toán giữ nguyên `299,999 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên ngay dưới ngưỡng tối thiểu (`300,000 - 1 = 299,999 ₫`), thuộc miền không hợp lệ của điều kiện C3.

---

# TC-BVA-COUPON-002: Đơn hàng tại đúng biên tối thiểu của mã SAVE10 (min_order_amount)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập với JWT Token hợp lệ.
- Mã `SAVE10` đang hoạt động (`is_active = 1`), còn hạn sử dụng, `min_order_amount = 300,000 ₫`.
- Người dùng chưa dùng mã `SAVE10` (`usage_count = 0`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,000 ₫` (chính xác bằng ngưỡng tối thiểu) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền chính xác `300,000 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10`.
4. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã vì theo đặc tả C3: Tổng đơn hàng `>= min_order_amount` (300,000 >= 300,000).
- Áp dụng giảm giá 10%: `30,000 ₫`.
- Tổng tiền thanh toán: `270,000 ₫`.

## Boundary Rationale
Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu (`min_order_amount = 300,000 ₫`), thuộc miền hợp lệ theo đặc tả C3.

---

# TC-BVA-COUPON-003: Đơn hàng trên biên tối thiểu của mã SAVE10 (min_order_amount + 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `SAVE10` đang hoạt động, còn hạn sử dụng, `min_order_amount = 300,000 ₫`.
- Người dùng chưa dùng mã `SAVE10` (`usage_count = 0`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `300,001 ₫` (ngay trên ngưỡng 300,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `300,001 ₫` và vào trang Checkout.
3. Nhập mã `SAVE10`.
4. Nhấn nút "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã do `total_amount > min_order_amount`.
- Giảm giá 10%: `Math.floor(300,001 × 10 / 100) = 30,000 ₫`.
- Tổng tiền thanh toán: `270,001 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên ngay trên ngưỡng tối thiểu (`300,000 + 1 = 300,001 ₫`), thuộc miền hợp lệ của điều kiện C3.

---

# TC-BVA-COUPON-004: Đơn hàng dưới biên tối thiểu của mã BIGBUY (min_order_amount - 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `BIGBUY` loại `fixed`, giảm 50,000 ₫, `min_order_amount = 500,000 ₫`, `is_active = 1`.
- Người dùng chưa dùng mã `BIGBUY`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `499,999 ₫` (ngay dưới ngưỡng 500,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền `499,999 ₫`.
3. Nhập mã `BIGBUY` tại trang Checkout và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do không thỏa điều kiện C3 (`499,999 < 500,000 ₫`).
- Hiển thị thông báo lỗi đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫.
- Giảm giá bằng `0 ₫`, tổng tiền giữ nguyên `499,999 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên dưới của mã cố định `BIGBUY` (`500,000 - 1 = 499,999 ₫`).

---

# TC-BVA-COUPON-005: Đơn hàng tại đúng biên tối thiểu của mã BIGBUY (min_order_amount)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `BIGBUY` loại `fixed`, giảm 50,000 ₫, `min_order_amount = 500,000 ₫`, `is_active = 1`.
- Người dùng chưa dùng mã `BIGBUY`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `500,000 ₫` (chính xác bằng ngưỡng tối thiểu) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Chuẩn bị đơn hàng có tổng tiền đúng `500,000 ₫`.
3. Nhập mã `BIGBUY` và nhấn "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã theo đặc tả C3 (`total_amount >= min_order_amount`).
- Số tiền giảm giá cố định: `50,000 ₫`.
- Tổng thanh toán: `450,000 ₫`.

## Boundary Rationale
Kiểm tra giá trị tại ngưỡng biên tối thiểu của mã `BIGBUY` (`500,000 ₫`), xác minh điều kiện bao gồm dấu bằng (`>=`).

---

# TC-BVA-COUPON-006: Đơn hàng trên biên tối thiểu của mã BIGBUY (min_order_amount + 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập hợp lệ.
- Mã `BIGBUY` loại `fixed`, giảm 50,000 ₫, `min_order_amount = 500,000 ₫`, `is_active = 1`.
- Người dùng chưa dùng mã `BIGBUY`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `BIGBUY` |
| `cart_total` | `500,001 ₫` (ngay trên ngưỡng 500,000 ₫) |
| `user` | `test@eshop.com` |

## Test Steps
1. Đăng nhập tài khoản `test@eshop.com`.
2. Tạo đơn hàng với tổng tiền `500,001 ₫`.
3. Nhập mã `BIGBUY` và nhấn "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã.
- Giảm giá `50,000 ₫`.
- Tổng thanh toán: `500,001 - 50,000 = 450,001 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên ngay trên ngưỡng tối thiểu của mã `BIGBUY` (`500,000 + 1 = 500,001 ₫`).

---

# TC-BVA-COUPON-007: Số lượt sử dụng dưới biên tối đa của mã 1 lượt (usage_count = 0 < max_uses_per_user = 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Số lần đã dùng của người dùng trong bảng `coupon_usage` là 0 (`usage_count = 0`).
- Đơn hàng đạt `500,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `0` (dưới biên tối đa 1 lượt) |

## Test Steps
1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Áp dụng thành công vì `usage_count < max_uses_per_user` (`0 < 1`).
- Giảm giá `50,000 ₫`, thành tiền `450,000 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên dưới của số lần sử dụng (`max - 1 = 0`), thuộc miền hợp lệ của C5.

---

# TC-BVA-COUPON-008: Số lượt sử dụng tại đúng biên tối đa của mã 1 lượt (usage_count = 1 == max_uses_per_user = 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Người dùng đã sử dụng mã `SAVE10` thành công đúng 1 lần (`usage_count = 1`).
- Đơn hàng đạt `500,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `1` (bằng đúng giới hạn tối đa) |

## Test Steps
1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do vi phạm điều kiện C5 (điều kiện yêu cầu `usage_count < max_uses_per_user`, nhưng hiện tại `1 >= 1`).
- Hiển thị thông báo lỗi: Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn).
- Giảm giá bằng `0 ₫`.

## Boundary Rationale
Kiểm tra giá trị tại đúng ngưỡng giới hạn số lượt sử dụng (`usage_count = max_uses_per_user = 1`), chuyển sang miền không hợp lệ.

---

# TC-BVA-COUPON-009: Số lượt sử dụng trên biên tối đa của mã 1 lượt (usage_count = 2 > max_uses_per_user = 1)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `max_uses_per_user = 1`.
- Giả định hoặc đã ghi nhận 2 lần sử dụng (`usage_count = 2`).
- Đơn hàng đạt `500,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `500,000 ₫` |
| `current_usage` | `2` (vượt trên giới hạn tối đa) |

## Test Steps
1. Đăng nhập và tạo đơn hàng `500,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`2 >= 1`).
- Báo lỗi đã vượt quá giới hạn lượt sử dụng.

## Boundary Rationale
Kiểm tra giá trị biên ngay trên ngưỡng giới hạn số lượt sử dụng (`max + 1 = 2`), thuộc miền không hợp lệ của C5.

---

# TC-BVA-COUPON-010: Số lượt sử dụng dưới biên tối đa của mã 2 lượt (usage_count = 1 < max_uses_per_user = 2)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`, `min_order_amount = 300,000 ₫`.
- Người dùng đã sử dụng mã `VIP100` 1 lần trước đó (`usage_count = 1`).
- Đơn hàng đạt `400,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `1` (dưới biên tối đa 2 lượt) |

## Test Steps
1. Đăng nhập và vào Checkout với đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã vì `usage_count < max_uses_per_user` (`1 < 2`).
- Giảm giá `100,000 ₫`, thành tiền `300,000 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên ngay dưới ngưỡng tối đa của mã nhiều lượt (`max - 1 = 2 - 1 = 1`), vẫn là lượt hợp lệ cuối cùng.

---

# TC-BVA-COUPON-011: Số lượt sử dụng tại đúng biên tối đa của mã 2 lượt (usage_count = 2 == max_uses_per_user = 2)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Người dùng đã hoàn tất 2 lần sử dụng mã `VIP100` (`usage_count = 2`).
- Đơn hàng đạt `400,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `2` (bằng đúng giới hạn tối đa) |

## Test Steps
1. Đăng nhập và tạo đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng vì đã dùng đủ 2 lượt (`usage_count >= 2`).
- Hiển thị thông báo: Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn).
- Giảm giá bằng `0 ₫`.

## Boundary Rationale
Kiểm tra giá trị tại ngưỡng biên giới hạn của mã 2 lượt (`usage_count = max_uses_per_user = 2`), thuộc miền không hợp lệ.

---

# TC-BVA-COUPON-012: Số lượt sử dụng trên biên tối đa của mã 2 lượt (usage_count = 3 > max_uses_per_user = 2)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `VIP100` có `max_uses_per_user = 2`.
- Đã ghi nhận 3 lần sử dụng (`usage_count = 3`).
- Đơn hàng đạt `400,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `VIP100` |
| `cart_total` | `400,000 ₫` |
| `current_usage` | `3` (vượt trên giới hạn tối đa) |

## Test Steps
1. Đăng nhập và tạo đơn hàng `400,000 ₫`.
2. Nhập mã `VIP100` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng do `usage_count >= max_uses_per_user` (`3 >= 2`).
- Giảm giá bằng `0 ₫`.

## Boundary Rationale
Kiểm tra giá trị biên trên của số lần sử dụng cho mã 2 lượt (`max + 1 = 2 + 1 = 3`).

---

# TC-BVA-COUPON-013: Biên thời gian hết hạn - Mã còn hạn xa (current_date < expired_at)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `SAVE10` có `expired_at = 2099-12-31`.
- Thời gian hiện tại trước ngày hết hạn (`now < expired_at`).
- Đơn hàng đạt `350,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `SAVE10` |
| `cart_total` | `350,000 ₫` |
| `current_date` | Thời gian thực thi hiện tại |

## Test Steps
1. Đăng nhập và tạo đơn hàng `350,000 ₫`.
2. Nhập mã `SAVE10` và nhấn "Áp dụng".

## Expected Result
- Hệ thống chấp nhận mã vì thỏa điều kiện C2 (`now < expired_at`).
- Giảm giá 10%: `35,000 ₫`.

## Boundary Rationale
Kiểm tra biên thời gian còn hạn (thuộc miền hợp lệ của điều kiện C2).

---

# TC-BVA-COUPON-014: Biên thời gian hết hạn - Mã đã qua hạn sử dụng (current_date > expired_at)

## Preconditions
- Người dùng `test@eshop.com` đã đăng nhập.
- Mã `EXPIRED` có `expired_at = 2020-01-01`.
- Thời gian hiện tại sau ngày hết hạn (`now > expired_at`).
- Đơn hàng đạt `200,000 ₫` (vượt ngưỡng `min_order_amount = 100,000 ₫`).

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `EXPIRED` |
| `cart_total` | `200,000 ₫` |
| `current_date` | Thời gian thực thi hiện tại |

## Test Steps
1. Đăng nhập và tạo đơn hàng `200,000 ₫`.
2. Nhập mã `EXPIRED` và nhấn "Áp dụng".

## Expected Result
- Hệ thống từ chối áp dụng mã do vi phạm điều kiện C2: Ngày hiện tại phải trước `expired_at`.
- Hiển thị thông báo lỗi: Mã giảm giá đã hết hạn.
- Giảm giá bằng `0 ₫`.

## Boundary Rationale
Kiểm tra biên thời gian đã hết hạn (thuộc miền không hợp lệ của điều kiện C2).

---

# TC-BVA-COUPON-015: Biên giá trị thanh toán cuối cùng đạt chính xác 0 ₫ (total_amount == discount_value)

## Preconditions
- Người dùng đã đăng nhập.
- Mã giảm giá loại `fixed` có giá trị giảm `100,000 ₫` và `min_order_amount = 100,000 ₫`.
- Đơn hàng có tổng tiền đúng bằng giá trị giảm: `100,000 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `cart_total` | `100,000 ₫` |
| `discount_value` | `100,000 ₫` (loại fixed) |

## Test Steps
1. Tạo đơn hàng trị giá `100,000 ₫`.
2. Nhập mã giảm giá và áp dụng.

## Expected Result
- `discount_amount = 100,000 ₫`.
- `final_amount = 100,000 - 100,000 = 0 ₫`.
- Hệ thống xử lý đơn hàng 0 ₫ hợp lệ, không gây lỗi số học hoặc số âm.

## Boundary Rationale
Kiểm tra giá trị biên cực tiểu của số tiền thanh toán cuối cùng (`final_amount = 0 ₫`).

---

# TC-BVA-COUPON-016: Biên giá trị thanh toán cuối cùng ngay trên 0 ₫ (final_amount = 1 ₫)

## Preconditions
- Người dùng đã đăng nhập.
- Mã giảm giá loại `fixed` có giá trị giảm `100,000 ₫` và `min_order_amount = 100,000 ₫`.
- Đơn hàng có tổng tiền `100,001 ₫`.

## Input Data
| Trường | Giá trị |
|---|---|
| `cart_total` | `100,001 ₫` |
| `discount_value` | `100,000 ₫` (loại fixed) |

## Test Steps
1. Tạo đơn hàng trị giá `100,001 ₫`.
2. Áp dụng mã giảm giá.

## Expected Result
- `discount_amount = 100,000 ₫`.
- `final_amount = 100,001 - 100,000 = 1 ₫`.
- Hệ thống ghi nhận số tiền thanh toán `1 ₫` chính xác.

## Boundary Rationale
Kiểm tra giá trị biên danh định ngay trên mức 0 ₫ (`final_amount = 1 ₫`).

---

# TC-BVA-COUPON-017: Biên độ dài chuỗi mã giảm giá rỗng (code length = 0)

## Preconditions
- Người dùng đã đăng nhập và đang ở màn hình Checkout.

## Input Data
| Trường | Giá trị |
|---|---|
| `coupon_code` | `""` (độ dài chuỗi bằng 0 ký tự) |
| `cart_total` | `500,000 ₫` |

## Test Steps
1. Để trống trường nhập mã giảm giá.
2. Nhấn nút "Áp dụng" (hoặc gửi request `{ code: "" }` đến API).

## Expected Result
- Hệ thống chặn gửi hoặc trả về lỗi: Vui lòng nhập mã giảm giá.
- Không thực hiện truy vấn và không giảm giá.

## Boundary Rationale
Kiểm tra biên độ dài tối thiểu của chuỗi mã giảm giá (`length = 0`), thuộc miền không hợp lệ.

---

# TC-BVA-COUPON-018: Biên trạng thái kích hoạt nhị phân của mã (is_active = 0 vs is_active = 1)

## Preconditions
- Người dùng đã đăng nhập.
- Có mã `ACTIVE_CODE` (`is_active = 1`) và mã `INACTIVE_CODE` (`is_active = 0`) trong CSDL.
- Cả hai mã đều có cùng hạn dùng và cùng ngưỡng đơn hàng `300,000 ₫`.
- Đơn hàng trị giá `400,000 ₫`.

## Input Data
| Trường | Thử nghiệm A | Thử nghiệm B |
|---|---|---|
| `coupon_code` | `ACTIVE_CODE` (`is_active = 1`) | `INACTIVE_CODE` (`is_active = 0`) |
| `cart_total` | `400,000 ₫` | `400,000 ₫` |

## Test Steps
1. Thử nghiệm A: Nhập mã `ACTIVE_CODE` và nhấn "Áp dụng".
2. Thử nghiệm B: Nhập mã `INACTIVE_CODE` và nhấn "Áp dụng".

## Expected Result
- Thử nghiệm A: Áp dụng thành công vì `is_active = 1` thỏa điều kiện C1.
- Thử nghiệm B: Bị từ chối vì `is_active = 0` vi phạm điều kiện C1; hiển thị mã không tồn tại hoặc đã bị vô hiệu hóa.

## Boundary Rationale
Kiểm tra giá trị biên nhị phân (boolean boundary: 0 vs 1) của trạng thái hoạt động theo điều kiện C1.
