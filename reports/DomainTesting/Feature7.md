# Domain Testing Report — Feature7: FR-07 Giỏ hàng (Shopping Cart)

## Phạm vi và phân tích requirement

- **Nguồn:** `README.md`, mục `FR-07: Giỏ hàng (Shopping Cart)`.
- **Phạm vi:** Chỉ FR-07; không sử dụng rule của FR-06, FR-08 hoặc feature khác.
- **Rule được trích xuất:**
  1. Giỏ có sản phẩm phải hiển thị các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`.
  2. Cột Số lượng có nút `+` và `-` để điều chỉnh.
  3. Thêm cùng sản phẩm làm tăng số lượng, không tạo dòng mới.
  4. Xóa sản phẩm phải có dialog xác nhận trước khi thực hiện.
  5. Nút `Tiếp tục mua sắm` đưa người dùng về trang chủ.
  6. Nhãn tổng tiền phải chính xác là `Tổng cộng`, không phải `Tổng tạm tính`.
  7. Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.
- **Chưa được mô tả trong requirement:** công thức `Thành tiền` và tổng tiền; giới hạn số lượng; bước tăng/giảm; hành vi nút `-` tại số lượng 1; hành vi khi thêm sản phẩm chưa có trong giỏ; nội dung dialog; nội dung chính xác của empty-state message; URL trang chủ; thông báo sau điều chỉnh hoặc xóa.
- FR-07 chủ yếu mô tả trạng thái và output. Invalid EC của output được dùng làm oracle phát hiện hành vi không tuân thủ, không phải input để cố tình làm hệ thống sai.

## 1. Input / Output

**Input:**

- Trạng thái giỏ: trống hoặc có sản phẩm.
- Sản phẩm được thêm và quan hệ với sản phẩm đã có.
- Số lượng hiện tại; thao tác nhấn `+` hoặc `-`.
- Thao tác Xóa và lựa chọn xác nhận/không xác nhận.
- Thao tác nhấn `Tiếp tục mua sắm`.

**Output:**

- Danh sách có đủ năm cột và điều khiển `+`/`-`.
- Số lượng thay đổi theo thao tác; thêm cùng sản phẩm tăng số lượng mà không tạo dòng mới.
- Dialog xuất hiện trước khi xóa; kết quả xóa phụ thuộc xác nhận.
- Nút tiếp tục mua sắm đưa về trang chủ.
- Nhãn tổng tiền là `Tổng cộng`.
- Empty state có hình minh họa và thông báo rõ ràng.

---

## 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | Trạng thái giỏ | Giỏ trống hoặc có ít nhất một sản phẩm. |
| C2 | Output danh sách | Giỏ có sản phẩm phải có đủ năm cột bắt buộc. |
| C3 | Output điều khiển số lượng | Có cả nút `+` và `-`. |
| C4 | Nút `+` / Output số lượng | Nhấn `+` làm số lượng tăng; mức tăng chưa được quy định. |
| C5 | Nút `-` / Output số lượng | Tại số lượng có thể giảm, nhấn `-` làm số lượng giảm; mức giảm chưa được quy định. |
| C6 | Thêm cùng sản phẩm / Output | Số lượng dòng hiện có tăng và không tạo dòng mới. |
| C7 | Yêu cầu xóa / Output dialog | Dialog phải xuất hiện trước khi sản phẩm bị xóa. |
| C8 | Xác nhận xóa / Output | Xác nhận thì thao tác xóa được thực hiện. |
| C9 | Không xác nhận xóa / Output | Không xác nhận/hủy thì sản phẩm không bị xóa. |
| C10 | Tiếp tục mua sắm / Output | Nhấn nút đưa người dùng về trang chủ. |
| C11 | Output nhãn tổng tiền | Nhãn chính xác là `Tổng cộng`. |
| C12 | Output giỏ trống | Có hình minh họa. |
| C13 | Output giỏ trống | Có thông báo rõ ràng rằng giỏ đang trống. |

---

## 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC01 | Trạng thái giỏ | C1 — Giỏ không có sản phẩm. | Valid |
| EC02 | Trạng thái giỏ | C1 — Giỏ có ít nhất một sản phẩm. | Valid |
| EC03 | Output danh sách | C2 — Hiển thị đủ, đúng năm cột bắt buộc. | Valid |
| EC04 | Output danh sách | C2 — Thiếu hoặc sai ít nhất một cột bắt buộc. | Invalid |
| EC05 | Output điều khiển | C3 — Có cả nút `+` và `-`. | Valid |
| EC06 | Output điều khiển | C3 — Thiếu ít nhất một trong hai nút. | Invalid |
| EC07 | Output sau nút `+` | C4 — Số lượng sau lớn hơn trước. | Valid |
| EC08 | Output sau nút `+` | C4 — Số lượng không tăng. | Invalid |
| EC09 | Output sau nút `-` | C5 — Với số lượng hiện tại lớn hơn 1, số lượng sau nhỏ hơn trước. | Valid |
| EC10 | Output sau nút `-` | C5 — Với số lượng hiện tại lớn hơn 1, số lượng không giảm. | Invalid |
| EC11 | Output khi thêm cùng sản phẩm | C6 — Số lượng tăng và số dòng không đổi. | Valid |
| EC12 | Output khi thêm cùng sản phẩm | C6 — Tạo thêm dòng trùng sản phẩm. | Invalid |
| EC13 | Output khi thêm cùng sản phẩm | C6 — Không tạo dòng mới nhưng số lượng không tăng. | Invalid |
| EC14 | Output khi yêu cầu xóa | C7 — Dialog xuất hiện, sản phẩm còn nguyên khi chờ quyết định. | Valid |
| EC15 | Output khi yêu cầu xóa | C7 — Thiếu dialog hoặc xóa trước khi xác nhận. | Invalid |
| EC16 | Output sau xác nhận xóa | C8 — Sản phẩm được xóa. | Valid |
| EC17 | Output sau xác nhận xóa | C8 — Sản phẩm vẫn còn. | Invalid |
| EC18 | Output khi không xác nhận | C9 — Sản phẩm vẫn còn. | Valid |
| EC19 | Output khi không xác nhận | C9 — Sản phẩm bị xóa. | Invalid |
| EC20 | Output điều hướng | C10 — Đưa về trang chủ. | Valid |
| EC21 | Output điều hướng | C10 — Không điều hướng hoặc tới trang khác. | Invalid |
| EC22 | Output nhãn tổng tiền | C11 — Hiển thị chính xác `Tổng cộng`. | Valid |
| EC23 | Output nhãn tổng tiền | C11 — Thiếu nhãn hoặc nhãn khác `Tổng cộng`. | Invalid |
| EC24 | Output giỏ trống | C12 — Có hình minh họa. | Valid |
| EC25 | Output giỏ trống | C12 — Không có hình minh họa. | Invalid |
| EC26 | Output giỏ trống | C13 — Có thông báo rõ trạng thái trống. | Valid |
| EC27 | Output giỏ trống | C13 — Thiếu hoặc không rõ thông báo trạng thái trống. | Invalid |

**Kiểm tra phân hoạch:** C1–C13 đều có EC. C1 có hai trạng thái hợp lệ vì FR-07 quy định hành vi cho cả giỏ trống và giỏ có sản phẩm. EC12 và EC13 tách hai kiểu vi phạm không chồng lấn của rule thêm cùng sản phẩm. Các EC output còn lại phân biệt kết quả tuân thủ và không tuân thủ.

---

## 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC01 | Giỏ trống. | Valid | `0` dòng |
| EC02 | Giỏ có sản phẩm. | Valid | Một dòng Sản phẩm A, số lượng `2` |
| EC03 | Đủ năm cột. | Valid | `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác` |
| EC04 | Thiếu/sai cột. | Invalid | Thiếu `Thành tiền` |
| EC05 | Đủ nút điều chỉnh. | Valid | Có `+` và `-` |
| EC06 | Thiếu nút điều chỉnh. | Invalid | Có `+`, thiếu `-` |
| EC07 | Số lượng tăng. | Valid | Trước `2`, sau `> 2` |
| EC08 | Số lượng không tăng. | Invalid | Trước `2`, sau `2` |
| EC09 | Số lượng giảm. | Valid | Trước `2`, sau `< 2` |
| EC10 | Số lượng không giảm. | Invalid | Trước `2`, sau `2` |
| EC11 | Thêm cùng sản phẩm đúng. | Valid | Trước: 1 dòng A, qty 1; sau: 1 dòng A, qty `> 1` |
| EC12 | Tạo dòng trùng. | Invalid | Trước 1 dòng A; sau 2 dòng A |
| EC13 | Không tăng số lượng. | Invalid | Trước và sau: 1 dòng A, qty 1 |
| EC14 | Xác nhận trước xóa. | Valid | Dialog mở; dòng A vẫn còn khi chưa quyết định |
| EC15 | Thiếu xác nhận. | Invalid | Dòng A biến mất ngay, không có dialog |
| EC16 | Xác nhận thì xóa. | Valid | Xác nhận; dòng A không còn |
| EC17 | Xác nhận nhưng không xóa. | Invalid | Xác nhận; dòng A vẫn còn |
| EC18 | Không xác nhận thì giữ. | Valid | Hủy/đóng dialog; dòng A vẫn còn |
| EC19 | Không xác nhận vẫn xóa. | Invalid | Hủy/đóng dialog; dòng A biến mất |
| EC20 | Điều hướng đúng. | Valid | Trang đích là trang chủ |
| EC21 | Điều hướng sai. | Invalid | Vẫn ở giỏ hoặc tới trang khác |
| EC22 | Nhãn đúng. | Valid | `Tổng cộng` |
| EC23 | Nhãn sai. | Invalid | `Tổng tạm tính` |
| EC24 | Có hình empty state. | Valid | Một icon/hình minh họa hiển thị |
| EC25 | Thiếu hình empty state. | Invalid | Không có icon/hình minh họa |
| EC26 | Có message rõ ràng. | Valid | Message thể hiện rõ giỏ hàng đang trống, không yêu cầu câu chữ cụ thể |
| EC27 | Thiếu/không rõ message. | Invalid | Không có message mô tả trạng thái trống |

---

## 5. Test Cases

Giá và số lượng trong test data chỉ dựng trạng thái dễ tái tạo. Test không khẳng định công thức tiền vì FR-07 không cung cấp.

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-CART-001** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Giỏ có một dòng Sản phẩm A, số lượng 2. | **Trạng thái:** không trống<br>**Sản phẩm:** A<br>**Số lượng:** 2 | 1. Quan sát danh sách.<br>2. Kiểm tra cột, nút điều chỉnh và nhãn tổng tiền. | Có đủ năm cột bắt buộc, có cả `+`/`-`, nhãn tổng tiền chính xác `Tổng cộng`. | Not run / None |
| **TC-CART-002** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Giỏ không có sản phẩm. | **Số dòng:** 0 | 1. Mở/refresh giỏ trống.<br>2. Quan sát empty state. | Có cả hình minh họa và thông báo rõ rằng giỏ đang trống; không yêu cầu câu chữ cụ thể. | Not run / None |
| **TC-CART-003** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có đúng một dòng A, số lượng 1.<br>Đã ghi nhận số dòng và số lượng. | **Sản phẩm thêm:** A<br>**Quan hệ:** cùng sản phẩm đã có | 1. Thêm lại A.<br>2. Quan sát giỏ.<br>3. So sánh số lượng và số dòng. | Số lượng dòng A tăng, số dòng không đổi, không có dòng A trùng. Mức tăng chưa được quy định. | Not run / None |
| **TC-CART-004** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có A với số lượng 2.<br>Nút `+` hiển thị. | **Trước:** 2<br>**Hành động:** nhấn `+` | 1. Ghi số lượng.<br>2. Nhấn `+`.<br>3. Ghi số lượng sau. | Số lượng sau lớn hơn trước; không khẳng định mức tăng. | Not run / None |
| **TC-CART-005** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có A với số lượng 2.<br>Nút `-` hiển thị. | **Trước:** 2<br>**Hành động:** nhấn `-` | 1. Ghi số lượng.<br>2. Nhấn `-`.<br>3. Ghi số lượng sau. | Số lượng sau nhỏ hơn trước; không khẳng định mức giảm. | Not run / None |
| **TC-CART-006** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Hành động:** nhấn Xóa nhưng chưa quyết định | 1. Nhấn Xóa A.<br>2. Chưa xác nhận/hủy.<br>3. Quan sát dialog và dòng A. | Dialog xuất hiện trước khi xóa; A vẫn còn lúc chờ quyết định. Nội dung dialog chưa được quy định. | Not run / None |
| **TC-CART-007** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Quyết định:** xác nhận xóa | 1. Nhấn Xóa A.<br>2. Xác nhận.<br>3. Quan sát giỏ. | Sản phẩm A được xóa sau xác nhận. | Not run / None |
| **TC-CART-008** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Quyết định:** hủy/không xác nhận | 1. Nhấn Xóa A.<br>2. Hủy hoặc đóng dialog.<br>3. Quan sát giỏ. | Sản phẩm A vẫn còn vì người dùng không xác nhận. | Not run / None |
| **TC-CART-009** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Nút `Tiếp tục mua sắm` hiển thị. | **Hành động:** nhấn `Tiếp tục mua sắm` | 1. Nhấn nút.<br>2. Quan sát trang đích. | Người dùng được đưa về trang chủ; URL cụ thể chưa được quy định. | Not run / None |

---

## 6. Rút gọn Test Case

- `TC-CART-001` kết hợp cấu trúc bảng, điều khiển số lượng và nhãn tổng tiền vì cùng trạng thái giỏ không trống.
- `TC-CART-002` kết hợp hai output của cùng empty state: hình minh họa và message.
- Không gộp `TC-CART-003`–`005` vì các trigger thêm lại, `+`, `-` khác nhau.
- Không gộp `TC-CART-006`–`008` vì kiểm tra ba thời điểm/nhánh riêng của xác nhận xóa.
- Invalid EC đều là output không tuân thủ được phát hiện bằng oracle; FR-07 không định nghĩa invalid-input domain để kết hợp.
- Sau rút gọn còn 9 test case, vẫn cover đủ 27 EC.

---

## 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC01 | Valid | TC-CART-002 |
| EC02 | Valid | TC-CART-001 |
| EC03 | Valid | TC-CART-001 |
| EC04 | Invalid | TC-CART-001 |
| EC05 | Valid | TC-CART-001 |
| EC06 | Invalid | TC-CART-001 |
| EC07 | Valid | TC-CART-004 |
| EC08 | Invalid | TC-CART-004 |
| EC09 | Valid | TC-CART-005 |
| EC10 | Invalid | TC-CART-005 |
| EC11 | Valid | TC-CART-003 |
| EC12 | Invalid | TC-CART-003 |
| EC13 | Invalid | TC-CART-003 |
| EC14 | Valid | TC-CART-006 |
| EC15 | Invalid | TC-CART-006 |
| EC16 | Valid | TC-CART-007 |
| EC17 | Invalid | TC-CART-007 |
| EC18 | Valid | TC-CART-008 |
| EC19 | Invalid | TC-CART-008 |
| EC20 | Valid | TC-CART-009 |
| EC21 | Invalid | TC-CART-009 |
| EC22 | Valid | TC-CART-001 |
| EC23 | Invalid | TC-CART-001 |
| EC24 | Valid | TC-CART-002 |
| EC25 | Invalid | TC-CART-002 |
| EC26 | Valid | TC-CART-002 |
| EC27 | Invalid | TC-CART-002 |

**Kết quả:** 27/27 EC được ánh xạ tới ít nhất một test case; không có EC chưa được cover.

---
