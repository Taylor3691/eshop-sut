# Báo cáo Boundary Value Analysis — Feature7

## Phạm vi

- **Requirement:** FR-07 — Giỏ hàng (Shopping Cart).
- **Nguồn requirement:** `README.md`, mục `FR-07: Giỏ hàng (Shopping Cart)`.
- **Phạm vi kiểm thử:** Chỉ FR-07; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

## 1. Input / Output

### Input / trạng thái đầu vào

- **Nội dung giỏ hàng:** tập sản phẩm trong giỏ và số lượng của từng sản phẩm; số dòng sản phẩm phân biệt quyết định giỏ trống hay không trống.
- **Sản phẩm được thêm:** có thể trùng với sản phẩm đã có trong giỏ.
- **Thao tác điều chỉnh số lượng:** nút `+` hoặc `-`.
- **Thao tác xóa sản phẩm và xác nhận:** người dùng yêu cầu xóa và tương tác với dialog xác nhận.
- **Thao tác Tiếp tục mua sắm:** người dùng chọn quay về trang chủ.

### Output

- **Danh sách sản phẩm:** hiển thị các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền và Thao tác.
- **Kết quả thêm sản phẩm trùng:** tăng số lượng, không tạo dòng mới.
- **Dialog xác nhận:** xuất hiện trước khi xóa sản phẩm.
- **Điều hướng:** nút Tiếp tục mua sắm đưa người dùng về trang chủ.
- **Nhãn tổng tiền:** hiển thị chính xác là “Tổng cộng”.
- **Empty state:** khi giỏ hàng trống, hiển thị hình minh họa và thông báo rõ ràng.

### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho **số dòng sản phẩm phân biệt trong giỏ hàng**. FR-07 mô tả behavior khác nhau giữa giỏ trống và giỏ có sản phẩm, nên có transition boundary tại dòng sản phẩm đầu tiên.
- Không áp dụng BVA cho **số lượng của từng sản phẩm** hoặc nút `+/-`: FR-07 không quy định minimum, maximum hoặc behavior tại một ngưỡng số lượng cụ thể.
- Không áp dụng BVA cho quan hệ **sản phẩm trùng/không trùng**, xác nhận xóa, điều hướng và nội dung nhãn vì đây là các condition/hành vi phân loại, không có miền giá trị có thứ tự với boundary được mô tả.
- Không áp dụng BVA cho Đơn giá, Thành tiền hoặc Tổng tiền vì FR-07 không quy định miền giá trị, công thức hoặc precision để xác định boundary.

## 2. Boundary Value Analysis

### Boundary Value Analysis cho số dòng sản phẩm phân biệt trong giỏ hàng

Số dòng sản phẩm phân biệt là số đếm nguyên không âm. Từ FR-07, có hai miền behavior:

- **0 dòng:** giỏ hàng trống; phải hiển thị hình minh họa và thông báo rõ ràng.
- **Từ 1 dòng trở lên:** giỏ hàng có sản phẩm; hiển thị danh sách sản phẩm với các cột được yêu cầu.

Mốc quan trọng là **Lower Boundary = 1 dòng**, tức dòng đầu tiên làm trạng thái chuyển từ giỏ trống sang giỏ có sản phẩm. FR-07 không mô tả Upper Boundary. Đơn vị bước là **1 dòng sản phẩm phân biệt**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** là giá trị ngay trước boundary, kiểm tra trạng thái giỏ trống.
- **1** kiểm tra đúng tại boundary, tức giỏ vừa có dòng sản phẩm đầu tiên.
- **2** kiểm tra ngay trên boundary, xác nhận giỏ có nhiều hơn một dòng vẫn hiển thị danh sách sản phẩm.

Giá trị **0** là trạng thái hợp lệ, không phải dữ liệu invalid. Báo cáo không tạo `-1` vì số dòng âm không phải trạng thái giỏ hàng có thể thiết lập và không được FR-07 mô tả.

## 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB-1 | 0 | Valid empty state — hiển thị hình minh họa và thông báo rõ ràng. |
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB | 1 | Valid non-empty state — hiển thị danh sách 1 sản phẩm với các cột FR-07 yêu cầu. |
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB+1 | 2 | Valid non-empty state — hiển thị danh sách 2 sản phẩm với các cột FR-07 yêu cầu. |

## 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Sản phẩm trong từng dòng | Sản phẩm có thể xuất hiện trong giỏ | Sản phẩm A; thêm Sản phẩm B ở test có 2 dòng | Hai sản phẩm phân biệt thiết lập đúng số dòng mà không kích hoạt rule gộp sản phẩm trùng. |
| Số lượng từng sản phẩm | FR-07 chưa mô tả giới hạn | Giữ nguyên số lượng đã được fixture thiết lập | Không tự giả định min/max; số lượng không phải biến đang kiểm thử. |
| Thao tác `+/-` | Có nút để điều chỉnh số lượng | Không thao tác | Cô lập boundary số dòng sản phẩm. |
| Xóa sản phẩm | Có dialog xác nhận trước khi xóa | Không thao tác | Tránh thay đổi số dòng trong khi quan sát state biên. |
| Tiếp tục mua sắm | Quay về trang chủ | Không thao tác | Không rời trang Giỏ hàng trong khi quan sát kết quả. |

**Tiền điều kiện chung:** hệ thống có ít nhất hai sản phẩm phân biệt có thể dùng để thiết lập giỏ hàng; người dùng có thể mở trang Giỏ hàng. Mỗi test case độc lập và giỏ hàng phải được đưa về đúng số dòng nêu trong test data trước khi kiểm tra.

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR07-001** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng không có sản phẩm | **Boundary:** Số dòng sản phẩm phân biệt = 0 (LB-1) | 1. Thiết lập giỏ hàng có 0 dòng sản phẩm.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát nội dung hiển thị. | Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống. | Not run / None |
| **TC-BVA-FR07-002** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng có Sản phẩm A | **Boundary:** Số dòng sản phẩm phân biệt = 1 (LB)<br>**Dữ liệu:** 1 dòng Sản phẩm A | 1. Thiết lập giỏ hàng có đúng 1 dòng sản phẩm.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát danh sách và các cột. | Danh sách hiển thị 1 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác. | Not run / None |
| **TC-BVA-FR07-003** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng có Sản phẩm A và B phân biệt | **Boundary:** Số dòng sản phẩm phân biệt = 2 (LB+1)<br>**Dữ liệu:** 2 dòng sản phẩm phân biệt | 1. Thiết lập giỏ hàng có đúng 2 dòng sản phẩm phân biệt.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát danh sách và các cột. | Danh sách hiển thị 2 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác. | Not run / None |

## 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| Số dòng sản phẩm phân biệt | LB-1 | 0 | TC-BVA-FR07-001 |
| Số dòng sản phẩm phân biệt | LB | 1 | TC-BVA-FR07-002 |
| Số dòng sản phẩm phân biệt | LB+1 | 2 | TC-BVA-FR07-003 |

Tất cả Boundary Test Values quan trọng đều có test case cover.


