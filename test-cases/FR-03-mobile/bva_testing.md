# TC-MOB-BVA-FORGOT-001: Độ dài mã OTP dưới biên tối thiểu (length = 0, chuỗi rỗng)

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`) trên ứng dụng mobile.

## Input Data

| Trường / Tham số | Giá trị                    |
| ---------------- | -------------------------- |
| `resetToken`     | `""` (độ dài chuỗi bằng 0) |
| `newPassword`    | `"Pass123@"`               |

## Test Steps

1. Yêu cầu mã OTP tại Bước 1 để chuyển sang Bước 2.
2. Để trống ô nhập "Mã OTP (4 số)".
3. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
4. Nhấn nút "Đặt lại mật khẩu".
5. Quan sát phản hồi của ứng dụng.

## Expected Result

- Hệ thống từ chối thực hiện yêu cầu do mã OTP chưa được nhập (độ dài bằng 0).
- Hiển thị thông báo lỗi: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Không cập nhật mật khẩu trong cơ sở dữ liệu.

## Boundary Rationale

Kiểm tra giá trị biên dưới mức tối thiểu của trường mã OTP (`length = 0`), thuộc miền giá trị không hợp lệ của chuỗi xác thực.

---

# TC-MOB-BVA-FORGOT-002: Độ dài mã OTP ngay dưới ngưỡng triển khai mobile (length = 3)

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).
- Mã OTP 4 chữ số hợp lệ đã được sinh trong CSDL (ví dụ: `"5984"`).

## Input Data

| Trường / Tham số | Giá trị                                                 |
| ---------------- | ------------------------------------------------------- |
| `resetToken`     | `"598"` (độ dài 3 chữ số, thiếu 1 ký tự so với mã 4 số) |
| `newPassword`    | `"Pass123@"`                                            |

## Test Steps

1. Nhập `"598"` vào ô nhập "Mã OTP (4 số)".
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn nút "Đặt lại mật khẩu".
4. Kiểm tra phản hồi từ ứng dụng và API.

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu vì mã OTP không khớp với bản ghi trong CSDL.
- Ứng dụng hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu cũ được giữ nguyên.

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên độ dài của mã OTP thực tế triển khai trên ứng dụng di động (`4 - 1 = 3 chữ số`).

---

# TC-MOB-BVA-FORGOT-003: Độ dài mã OTP tại đúng ngưỡng triển khai mobile (length = 4)

## Preconditions

- Đã yêu cầu OTP thành công cho `test@eshop.com`.
- Mã OTP 4 chữ số trong CSDL là `"5984"`.
- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số | Giá trị                                                  |
| ---------------- | -------------------------------------------------------- |
| `resetToken`     | `"5984"` (độ dài đúng 4 chữ số, khớp giá trị trong CSDL) |
| `newPassword`    | `"Pass123@"`                                             |

## Test Steps

1. Nhập `"5984"` vào ô "Mã OTP (4 số)".
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát kết quả xử lý.

## Expected Result

- Hệ thống chấp nhận mã OTP 4 chữ số khớp với CSDL.
- Phản hồi HTTP 200 OK từ `/api/reset-password`.
- Ứng dụng hiển thị thông báo `Alert.alert("Thành công", "Đổi mật khẩu thành công!")` và chuyển về màn hình `login`.

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên độ dài của mã OTP theo cài đặt thực tế của backend và nhãn UI mobile (`length = 4 chữ số`).

---

# TC-MOB-BVA-FORGOT-004: Độ dài mã OTP dưới ngưỡng đặc tả 6 chữ số (length = 5)

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số | Giá trị                     |
| ---------------- | --------------------------- |
| `resetToken`     | `"12345"` (độ dài 5 chữ số) |
| `newPassword`    | `"Pass123@"`                |

## Test Steps

1. Nhập `"12345"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối mã OTP 5 chữ số (không hợp lệ so với cả chuẩn 4 số của backend lẫn chuẩn 6 số của đặc tả FR-03).
- Hiển thị hộp thoại cảnh báo lỗi `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên độ dài OTP theo đặc tả yêu cầu FR-03 (`6 - 1 = 5 chữ số`).

---

# TC-MOB-BVA-FORGOT-005: Độ dài mã OTP tại đúng ngưỡng đặc tả 6 chữ số (length = 6)

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số | Giá trị                                             |
| ---------------- | --------------------------------------------------- |
| `resetToken`     | `"123456"` (độ dài đúng 6 chữ số theo đặc tả FR-03) |
| `newPassword`    | `"Pass123@"`                                        |

## Test Steps

1. Nhập mã OTP 6 chữ số `"123456"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".
4. Quan sát phản hồi giữa backend và ứng dụng.

## Expected Result

- Theo đặc tả FR-03: Mã OTP hợp lệ là mã 6 chữ số ngẫu nhiên.
- Hệ thống kiểm tra so khớp mã OTP trong CSDL (nếu backend sinh mã 4 chữ số, mã 6 số sẽ không khớp và trả về lỗi).

## Boundary Rationale

Kiểm tra tại đúng giá trị biên độ dài của mã OTP theo đặc tả nghiệp vụ FR-03 (`length = 6 chữ số`).

---

# TC-MOB-BVA-FORGOT-006: Độ dài mã OTP ngay trên ngưỡng đặc tả 6 chữ số (length = 7)

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số | Giá trị                       |
| ---------------- | ----------------------------- |
| `resetToken`     | `"1234567"` (độ dài 7 chữ số) |
| `newPassword`    | `"Pass123@"`                  |

## Test Steps

1. Nhập `"1234567"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu với mã OTP vượt quá độ dài chuẩn.
- Hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.

## Boundary Rationale

Kiểm tra giá trị biên ngay trên ngưỡng độ dài tối đa của mã OTP theo đặc tả (`6 + 1 = 7 chữ số`).

---

# TC-MOB-BVA-FORGOT-007: Độ dài mật khẩu mới bằng 0 (length = 0, chuỗi rỗng)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị              |
| ---------------- | -------------------- |
| `resetToken`     | Mã OTP hợp lệ        |
| `newPassword`    | `""` (độ dài bằng 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Để trống ô nhập "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy `strongPasswordRegex` kiểm tra phía client chặn ngay lập tức.
- Hiển thị hộp thoại: `Alert.alert("Lỗi", "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.")`.
- Không gửi yêu cầu lên server.

## Boundary Rationale

Kiểm tra tại điểm biên cực tiểu (chuỗi rỗng `length = 0`), thuộc miền không hợp lệ của trường mật khẩu mới.

---

# TC-MOB-BVA-FORGOT-008: Độ dài mật khẩu mới ngay dưới biên tối thiểu (length = 7, min - 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                              |
| `newPassword`    | `"Pas12@!"` (độ dài đúng 7 ký tự: 1 hoa, 2 thường, 2 số, 2 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 7 ký tự `"Pas12@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra độ dài `.{8,}` không thỏa mãn do chuỗi chỉ có 7 ký tự.
- Client validation chặn gửi dữ liệu và hiển thị Alert cảnh báo mật khẩu quá yếu.

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên tối thiểu (`min_length - 1 = 7 ký tự`), là ranh giới từ chối của quy tắc độ dài mật khẩu.

---

# TC-MOB-BVA-FORGOT-009: Độ dài mật khẩu mới tại đúng biên tối thiểu (length = 8, min)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                               |
| `newPassword`    | `"Pass123@"` (độ dài đúng 8 ký tự: 1 hoa, 3 thường, 3 số, 1 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 8 ký tự `"Pass123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy phía client chấp nhận mật khẩu đạt đúng 8 ký tự và chứa đủ 4 nhóm ký tự.
- Gửi yêu cầu đặt lại mật khẩu lên server thành công.
- Hiển thị Alert "Thành công: Đổi mật khẩu thành công!" và chuyển về màn hình `login`.

## Boundary Rationale

Kiểm tra giá trị tại đúng ngưỡng biên tối thiểu hợp lệ (`min_length = 8 ký tự`) theo quy định của FR-01 và FR-03.

---

# TC-MOB-BVA-FORGOT-010: Độ dài mật khẩu mới ngay trên biên tối thiểu (length = 9, min + 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                                |
| `newPassword`    | `"Passw123@"` (độ dài đúng 9 ký tự: 1 hoa, 4 thường, 3 số, 1 ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 9 ký tự `"Passw123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn đầy đủ các điều kiện và được client chấp nhận.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Boundary Rationale

Kiểm tra giá trị ngay trên biên tối thiểu (`min_length + 1 = 9 ký tự`), thuộc miền giá trị hợp lệ danh định.

---

# TC-MOB-BVA-FORGOT-011: Số lượng chữ in hoa dưới biên tối thiểu (count = 0)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                              |
| ---------------- | ---------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                        |
| `newPassword`    | `"pass1234@"` (độ dài 9 ký tự, số lượng chữ hoa = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"pass1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[A-Z])` phát hiện không có ký tự chữ in hoa nào (`count = 0`).
- Client validation chặn gửi form và hiển thị Alert thông báo mật khẩu quá yếu.

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ hoa (`min_upper - 1 = 0`).

---

# TC-MOB-BVA-FORGOT-012: Số lượng chữ in hoa tại đúng biên tối thiểu (count = 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                            |
| ---------------- | -------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                      |
| `newPassword`    | `"Pass1234@"` (độ dài 9 ký tự, đúng 1 chữ hoa `P`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Pass1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 chữ hoa.
- Hệ thống chấp nhận và thực hiện đặt lại mật khẩu thành công.

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự chữ hoa (`min_upper = 1`).

---

# TC-MOB-BVA-FORGOT-013: Số lượng chữ in thường dưới biên tối thiểu (count = 0)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                 |
| ---------------- | ------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                           |
| `newPassword`    | `"PASS1234@"` (độ dài 9 ký tự, số lượng chữ thường = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"PASS1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[a-z])` phát hiện không có ký tự chữ in thường nào (`count = 0`).
- Client validation chặn và hiển thị Alert mật khẩu quá yếu.

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ thường (`min_lower - 1 = 0`).

---

# TC-MOB-BVA-FORGOT-014: Số lượng chữ in thường tại đúng biên tối thiểu (count = 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                               |
| ---------------- | ----------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                         |
| `newPassword`    | `"pASS1234@"` (độ dài 9 ký tự, đúng 1 chữ thường `p`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"pASS1234@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 chữ thường.
- Hệ thống chấp nhận và thực hiện đặt lại mật khẩu thành công.

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự chữ thường (`min_lower = 1`).

---

# TC-MOB-BVA-FORGOT-015: Số lượng chữ số dưới biên tối thiểu (count = 0)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                               |
| ---------------- | ----------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                         |
| `newPassword`    | `"Password@!"` (độ dài 10 ký tự, số lượng chữ số = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*\d)` phát hiện không có chữ số nào (`count = 0`).
- Client validation chặn và hiển thị Alert thông báo mật khẩu quá yếu.

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự chữ số (`min_digit - 1 = 0`).

---

# TC-MOB-BVA-FORGOT-016: Số lượng chữ số tại đúng biên tối thiểu (count = 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                             |
| ---------------- | --------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                       |
| `newPassword`    | `"Password1@"` (độ dài 10 ký tự, đúng 1 chữ số `1`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password1@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 chữ số.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự chữ số (`min_digit = 1`).

---

# TC-MOB-BVA-FORGOT-017: Số lượng ký tự đặc biệt dưới biên tối thiểu (count = 0)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                       |
| ---------------- | ------------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                                 |
| `newPassword`    | `"Password12"` (độ dài 10 ký tự, số lượng ký tự đặc biệt = 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password12"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Regex kiểm tra `(?=.*[^A-Za-z\d])` phát hiện không có ký tự đặc biệt nào (`count = 0`).
- Client validation chặn và hiển thị Alert thông báo mật khẩu quá yếu.

## Boundary Rationale

Kiểm tra tại điểm biên dưới của ràng buộc nhóm ký tự đặc biệt (`min_spec - 1 = 0`).

---

# TC-MOB-BVA-FORGOT-018: Số lượng ký tự đặc biệt tại đúng biên tối thiểu (count = 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                     |
| ---------------- | ----------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ                                               |
| `newPassword`    | `"Password1@"` (độ dài 10 ký tự, đúng 1 ký tự đặc biệt `@`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"Password1@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Mật khẩu thỏa mãn điều kiện có ít nhất 1 ký tự đặc biệt.
- Đặt lại mật khẩu thành công, hiển thị Alert thành công.

## Boundary Rationale

Kiểm tra tại đúng ngưỡng biên tối thiểu của nhóm ký tự đặc biệt (`min_spec = 1`).

---

# TC-MOB-BVA-FORGOT-019: Độ lệch so khớp Xác nhận mật khẩu tại biên khớp hoàn toàn (distance = 0)

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số  | Giá trị                                                      |
| ----------------- | ------------------------------------------------------------ |
| `newPassword`     | `"Pass123@"`                                                 |
| `confirmPassword` | `"Pass123@"` (độ lệch chuỗi Levenshtein = 0, khớp hoàn toàn) |

## Test Steps

1. Quan sát giao diện Bước 2 xem có trường "Xác nhận mật khẩu mới" hay không.
2. Nếu có trường xác nhận, nhập cùng giá trị `"Pass123@"` vào cả hai trường.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Theo đặc tả FR-03/FR-01: Hệ thống chấp nhận khi hai trường mật khẩu khớp nhau hoàn toàn (`distance = 0`).
- Ghi nhận hiện trạng triển khai trên Mobile: Giao diện chỉ có trường `newPassword`, thiếu trường `confirmPassword`.

## Boundary Rationale

Kiểm tra tại điểm biên so khớp chính xác hoàn toàn (`match_distance = 0`), là trạng thái hợp lệ duy nhất của quy tắc xác nhận mật khẩu.

---

# TC-MOB-BVA-FORGOT-020: Độ lệch so khớp Xác nhận mật khẩu ngay trên biên khớp (distance = 1)

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Input Data

| Trường / Tham số  | Giá trị                                                                         |
| ----------------- | ------------------------------------------------------------------------------- |
| `newPassword`     | `"Pass123@"`                                                                    |
| `confirmPassword` | `"Pass123!"` (lệch đúng 1 ký tự tại vị trí cuối cùng, Levenshtein distance = 1) |

## Test Steps

1. Kiểm tra logic xác thực so khớp mật khẩu trên ứng dụng mobile.
2. Nhập hai mật khẩu lệch nhau đúng 1 ký tự.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Theo đặc tả FR-03/FR-01: Hệ thống phải từ chối khi hai trường mật khẩu không khớp (`distance >= 1`) và hiển thị thông báo lỗi phù hợp.
- Ghi nhận việc giao diện thiếu trường `confirmPassword` khiến ứng dụng bỏ qua bước kiểm tra độ lệch này.

## Boundary Rationale

Kiểm tra tại điểm biên ngay trên ngưỡng sai lệch tối thiểu (`distance = 1`), thuộc miền không hợp lệ của quy tắc xác nhận mật khẩu.

---

# TC-MOB-BVA-FORGOT-021: Độ dài chuỗi email dưới biên tối thiểu tại Bước 1 (length = 0, chuỗi rỗng)

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1 (`forgotStep === 1`).

## Input Data

| Trường / Tham số | Giá trị                          |
| ---------------- | -------------------------------- |
| `forgotEmail`    | `""` (chuỗi rỗng, độ dài bằng 0) |

## Test Steps

1. Để trống ô nhập "Nhập Email của bạn".
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi của ứng dụng.

## Expected Result

- Hệ thống từ chối xử lý chuỗi rỗng (HTTP 404 User not found hoặc chặn tại client).
- Hiển thị Alert cảnh báo lỗi; giữ nguyên giao diện Bước 1, không chuyển sang Bước 2.

## Boundary Rationale

Kiểm tra tại điểm biên cực tiểu của trường email (`length = 0`), thuộc miền dữ liệu không hợp lệ.

---

# TC-MOB-BVA-FORGOT-022: Độ dài email sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed_length = 0)

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Input Data

| Trường / Tham số | Giá trị                              |
| ---------------- | ------------------------------------ |
| `forgotEmail`    | `"   "` (chuỗi 3 ký tự khoảng trắng) |

## Test Steps

1. Nhập 3 ký tự khoảng trắng vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát cách xử lý của ứng dụng.

## Expected Result

- Hệ thống coi chuỗi toàn khoảng trắng là rỗng (`trimmed_length = 0`) và từ chối gửi mã OTP.
- Hiển thị thông báo lỗi; không chuyển sang Bước 2.

## Boundary Rationale

Kiểm tra giá trị biên dưới của chuỗi email sau khi loại bỏ khoảng trắng (`trimmed_length = 0`).

---

# TC-MOB-BVA-FORGOT-023: Email hợp lệ bọc bởi khoảng trắng ở hai đầu (Trim boundary)

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ trong CSDL.
- Người dùng đang ở màn hình Bước 1.

## Input Data

| Trường / Tham số | Giá trị                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| `forgotEmail`    | `" test@eshop.com "` (email hợp lệ có 1 dấu cách ở đầu và 1 dấu cách ở cuối) |

## Test Steps

1. Nhập `" test@eshop.com "` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát xem hệ thống có tự động cắt khoảng trắng để tìm thấy tài khoản hay không.

## Expected Result

- Nếu hệ thống tự động trim: Tìm thấy tài khoản `test@eshop.com` và chuyển sang Bước 2.
- Nếu hệ thống không trim: Server trả về 404 User not found, ứng dụng hiển thị Alert lỗi an toàn mà không bị crash.

## Boundary Rationale

Kiểm tra tại điểm biên khoảng trắng đầu/cuối của chuỗi email hợp lệ (Whitespace Padding Boundary).

---

# TC-MOB-BVA-FORGOT-024: Biên liên kết tài khoản OTP - Email trùng khớp (email_match = True)

## Preconditions

- Tài khoản `test@eshop.com` đã yêu cầu mã OTP thành công.
- Mã OTP hợp lệ trong CSDL là `"5984"`.
- Người dùng đang ở Bước 2 với context email là `test@eshop.com`.

## Input Data

| Trường / Tham số | Giá trị                                      |
| ---------------- | -------------------------------------------- |
| `email` gửi lên  | `"test@eshop.com"`                           |
| `resetToken`     | `"5984"` (khớp đúng mã của `test@eshop.com`) |
| `newPassword`    | `"Pass123@"`                                 |

## Test Steps

1. Nhập mã OTP `"5984"`.
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- API kiểm tra `WHERE email = 'test@eshop.com' AND reset_token = '5984'` tìm thấy đúng 1 bản ghi (`changes = 1`).
- Mật khẩu được cập nhật thành công, hiển thị Alert thành công và chuyển về màn hình `login`.

## Boundary Rationale

Kiểm tra tại điểm biên liên kết định danh tài khoản trùng khớp tuyệt đối (`email_match = True`), là điều kiện thành công duy nhất của quan hệ OTP-Email.

---

# TC-MOB-BVA-FORGOT-025: Biên liên kết tài khoản OTP - Email không trùng khớp (email_match = False)

## Preconditions

- Mã OTP `"5984"` được sinh cho tài khoản User A (`test@eshop.com`).
- Tài khoản User B (`admin@eshop.com`) tồn tại trong CSDL nhưng không có mã OTP này.

## Input Data

| Trường / Tham số | Giá trị                      |
| ---------------- | ---------------------------- |
| `email` gửi lên  | `"admin@eshop.com"` (User B) |
| `resetToken`     | `"5984"` (mã OTP của User A) |
| `newPassword`    | `"Pass123@"`                 |

## Test Steps

1. Gửi request đặt lại mật khẩu với email của User B và mã OTP của User A.
2. Kiểm tra mã trạng thái HTTP và thông báo từ ứng dụng.

## Expected Result

- Server đối chiếu điều kiện kép không tìm thấy bản ghi khớp (`changes = 0`), trả về HTTP 400 `{"error": "Invalid token or email"}`.
- Ứng dụng hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu của cả hai tài khoản không bị ảnh hưởng.

## Boundary Rationale

Kiểm tra tại điểm biên liên kết định danh tài khoản bị sai lệch (`email_match = False`), bảo đảm tính toàn vẹn và cô lập an toàn giữa các tài khoản.
