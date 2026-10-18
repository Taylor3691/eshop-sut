# FR-08 Checkout — Phân tích và Test Cases

## Requirement Analysis

### Requirement
- ID: FR-08
- Feature: Thanh toán (Checkout)
- Module: Giỏ hàng / Checkout
- Nguồn oracle: `README.md`, mục FR-08. FR-09 coupon nằm ngoài phạm vi.

### Functional Rules
1. Chỉ người dùng đã đăng nhập mới checkout được.
2. Tổng tiền được tính tự động từ giỏ hàng và người dùng không thể chỉnh sửa trực tiếp.
3. Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua.
4. Backend tự tính lại tổng tiền và không chấp nhận `total_amount` do client gửi.
5. Checkout thành công thì giỏ hàng được xóa.

### Preconditions
- Có sản phẩm và tài khoản người dùng thử nghiệm.
- Với ca thành công: đã đăng nhập, giỏ hàng có sản phẩm.
- Dùng môi trường test cô lập; không khởi động backend trên DB có dữ liệu cần giữ vì startup reset/reseed database.

### Inputs
| Variable | Type | Description | Constraint |
|---|---|---|---|
| Authentication | State/token | Trạng thái đăng nhập | Checkout chỉ cho người dùng đã đăng nhập |
| Cart contents | Collection | Các sản phẩm và số lượng đặt mua | Tổng tiền phải phát sinh từ giỏ hàng; FR-08 không nêu giới hạn số dòng/số lượng |
| Product price | Currency/number | Giá sản phẩm trong giỏ | Dùng dữ liệu giá phía hệ thống; FR-08 không nêu cách xử lý giá thay đổi |
| Client `total_amount` | Number | Giá trị client gửi thử lên API | Không được dùng làm tổng đơn hàng |

### Expected Outputs / Behaviors
- Người dùng chưa đăng nhập bị chặn; không tạo đơn.
- Checkout hợp lệ tạo đơn với tổng được tính từ giỏ hàng.
- Giao diện cho thấy mọi dòng sản phẩm đặt mua.
- Sau thành công, giỏ hàng rỗng.

### Assumptions
- Dùng API/UI hiện có để quan sát kết quả; không giả định mã HTTP cụ thể ngoài điều kiện được xác thực.
- Tổng kỳ vọng cho dữ liệu test được tính bằng tổng `đơn giá × số lượng`.

### Ambiguities
- FR-08 không quy định hành vi checkout với giỏ trống.
- Không quy định trường địa chỉ giao hàng, quy tắc validate địa chỉ, hoặc xử lý lỗi DB.
- Không mô tả rõ persistence của cart; kiểm tra giỏ hàng qua hành vi UI/API hiện hành.
- README yêu cầu xóa giỏ sau thành công; API specification minh họa `total_amount` và `shipping_address`, còn implementation hiện tại nhận trực tiếp client total và không xóa cart. Đây là điểm cần xác nhận khi ghi nhận defect; expected vẫn theo README.

## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| Authentication | State | Đã đăng nhập với token hợp lệ | Chưa đăng nhập, thiếu/sai token | Phân hoạch trạng thái, không có BVA |
| Cart contents | Collection/state | Cart chứa sản phẩm | Cart rỗng | Cart rỗng là trường hợp cần thăm dò; FR-08 chưa định nghĩa expected |
| Client total | Number | Giá trị gửi lên khớp tổng cart hoặc bị sửa khác tổng | Giá trị giả mạo/không khớp | Requirement nói backend không chấp nhận giá trị client; không có ngưỡng số |
| UI item list | Collection | Hiển thị đầy đủ các sản phẩm trong cart | Thiếu/sai sản phẩm hoặc số lượng | Kiểm tra đối chiếu với cart |

## Equivalence Partitions

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-01 | Authentication | VALID | Người dùng đã đăng nhập | Token user hợp lệ | FR-08.1 |
| EP-02 | Authentication | INVALID | Người dùng chưa đăng nhập/không gửi token | Không có Authorization header | FR-08.1 |
| EP-03 | Cart | VALID | Cart có các dòng sản phẩm hợp lệ | 2 sản phẩm, số lượng 1 và 2 | FR-08.2, 08.3, 08.4, 08.5 |
| EP-04 | Client total | INVALID | Client gửi tổng khác với tổng cart | Cart tổng 250000, gửi 1 | FR-08.4 |
| EP-05 | UI item list | VALID | Mọi cart item và quantity được hiển thị | Hai dòng như cart | FR-08.3 |
| EP-06 | Cart after checkout | VALID | Sau checkout thành công cart rỗng | GET cart/UI cart trống | FR-08.5 |
| EP-07 | Cart | AMBIGUOUS | Cart không có dòng sản phẩm | Cart rỗng | FR-08 (clarification needed) |

## Boundary Analysis / BVA Values

FR-08 không nêu giới hạn số lượng, khoảng giá, ngưỡng tổng tiền hoặc giới hạn kích thước cart. Không áp dụng BVA số học; các ca dưới đây dùng equivalence partitioning và kiểm tra tương tác/state. Cart rỗng là trạng thái cần làm rõ, không tự coi là hợp lệ hay không hợp lệ.

## Generated Test Cases

### TC-CHECKOUT-001: Checkout thành công với cart hợp lệ
- Requirement ID: FR-08.1, FR-08.2, FR-08.4, FR-08.5
- Module / Test Type / Technique: Checkout / Functional / Equivalence Partitioning
- Preconditions: User đăng nhập; cart có sản phẩm P1 giá 100000 số lượng 1 và P2 giá 50000 số lượng 3.
- Test Data: cart total = 250000; gửi API `total_amount=250000` nếu endpoint yêu cầu.
- Test Steps:
  1. Đăng nhập và thêm các sản phẩm nêu trên vào cart.
  2. Thực hiện checkout.
  3. Mở lịch sử/chi tiết đơn và kiểm tra tổng; tải lại cart.
- Expected Result: Đơn được tạo; tổng là 250000 tính từ cart; cart rỗng sau thành công.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-002: Chặn checkout khi chưa đăng nhập
- Requirement ID: FR-08.1
- Module / Test Type / Technique: Checkout / Functional / Equivalence Partitioning
- Preconditions: Có cart hoặc request checkout hợp lệ nhưng không có phiên đăng nhập.
- Test Data: Không có token; cart total tham chiếu 100000.
- Test Steps:
  1. Gọi `POST /api/checkout` không có token hoặc mở luồng checkout khi chưa đăng nhập.
  2. Quan sát phản hồi và danh sách đơn của user.
- Expected Result: Checkout bị từ chối; không tạo đơn.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-003: Backend bỏ qua tổng tiền client giả mạo thấp hơn
- Requirement ID: FR-08.4
- Module / Test Type / Technique: Checkout / Functional / Equivalence Partitioning
- Preconditions: Đăng nhập; cart có P1 giá 100000 × 2.
- Test Data: Cart total 200000; client gửi `total_amount=1`.
- Test Steps:
  1. Gửi checkout request với total giả mạo thấp hơn tổng cart.
  2. Kiểm tra đơn được tạo (nếu có) và tổng đã lưu.
- Expected Result: Giá trị client không được dùng; tổng đơn là 200000 theo cart.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-004: Backend bỏ qua tổng tiền client giả mạo cao hơn
- Requirement ID: FR-08.4
- Module / Test Type / Technique: Checkout / Functional / Equivalence Partitioning
- Preconditions: Đăng nhập; cart có P1 giá 100000 × 2.
- Test Data: Cart total 200000; client gửi `total_amount=9999999`.
- Test Steps:
  1. Gửi checkout request với total giả mạo cao hơn tổng cart.
  2. Kiểm tra đơn được tạo (nếu có) và tổng đã lưu.
- Expected Result: Giá trị client không được dùng; tổng đơn là 200000 theo cart.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-005: Không cho chỉnh trực tiếp tổng tiền trên giao diện
- Requirement ID: FR-08.2
- Module / Test Type / Technique: Checkout UI / Functional / Equivalence Partitioning
- Preconditions: Đăng nhập; cart có ít nhất một sản phẩm.
- Test Data: Giá/số lượng trong cart có tổng xác định.
- Test Steps:
  1. Mở trang checkout.
  2. Kiểm tra control hiển thị tổng tiền và thử tương tác/chỉnh sửa bằng UI.
- Expected Result: Tổng tiền được tính tự động và không có cách chỉnh sửa trực tiếp qua giao diện.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-006: Hiển thị đủ sản phẩm và số lượng trong checkout
- Requirement ID: FR-08.3
- Module / Test Type / Technique: Checkout UI / Functional / Equivalence Partitioning
- Preconditions: Đăng nhập; cart có P1 × 1 và P2 × 3.
- Test Data: Hai sản phẩm có tên/giá phân biệt.
- Test Steps:
  1. Mở trang checkout.
  2. Đối chiếu danh sách, tên và số lượng với cart.
- Expected Result: Tất cả sản phẩm đặt mua được hiển thị đủ và thông tin khớp cart.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-007: Cart rỗng sau checkout thành công
- Requirement ID: FR-08.5
- Module / Test Type / Technique: Checkout / Functional / State transition
- Preconditions: Đăng nhập; cart có sản phẩm; checkout có thể hoàn tất thành công.
- Test Data: Một dòng cart với tổng dương.
- Test Steps:
  1. Thực hiện checkout thành công.
  2. Tải lại trang cart hoặc gọi API lấy cart.
- Expected Result: Không còn sản phẩm trong cart.
- Status / Related Bugs: Not Run / None

### TC-CHECKOUT-008: Thăm dò checkout với cart rỗng
- Requirement ID: FR-08 (ambiguity)
- Module / Test Type / Technique: Checkout / Exploratory / State partition
- Preconditions: Đăng nhập; cart rỗng.
- Test Data: Cart rỗng; không áp đặt giá trị tổng kỳ vọng.
- Test Steps:
  1. Mở checkout hoặc gửi checkout request.
  2. Ghi nhận phản hồi, đơn phát sinh và cart state.
- Expected Result: Chưa xác định trong README; ghi nhận kết quả để chủ yêu cầu quyết định expected behavior.
- Status / Related Bugs: Not Run / None

## Coverage Summary
- Requirements analyzed: FR-08.1 đến FR-08.5.
- Variables identified: authentication, cart contents, client total, UI item list, post-checkout cart state.
- Equivalence partitions: 7 (bao gồm 1 ambiguity partition).
- Partitions covered: EP-01 đến EP-07.
- Boundaries identified/covered: Không có ngưỡng cụ thể trong FR-08; BVA không áp dụng.
- Test cases generated: 8.
- Potential coverage gaps: Đơn rỗng, trường địa chỉ và xử lý lỗi checkout cần đặc tả thêm.
- Assumptions: Expected total được tính từ tổng giá × số lượng; test dùng tài khoản và catalog có sẵn.
- Ambiguities requiring clarification: Checkout cart rỗng; dữ liệu order item persistence; contract địa chỉ; hành vi lỗi và tính nhất quán sau lỗi.

## Human Review Required
1. Xác nhận các phân hoạch và expected result khớp ý định FR-08.
2. Chốt hành vi checkout khi cart rỗng và các yêu cầu về địa chỉ.
3. Chọn cách truy vấn order/cart để xác nhận tổng và việc xóa cart.
4. Xác nhận có cần thêm yêu cầu về xử lý lỗi hoặc lưu chi tiết từng sản phẩm trong đơn.

## AI Gap Candidates
### Candidate 1
- Possible missed case: Cart rỗng có thể cần bị chặn trước khi tạo đơn.
- Why it may have been missed: FR-08 không nêu điều kiện cart phải có sản phẩm.
- Human action required: Xác nhận expected behavior rồi bổ sung test chính thức nếu cần.

### Candidate 2
- Possible missed case: Giá sản phẩm thay đổi giữa lúc thêm vào cart và lúc checkout.
- Why it may have been missed: FR-08 nói backend tự tính tổng từ cart nhưng không quy định nguồn/thời điểm giá.
- Human action required: Làm rõ cart lưu giá snapshot hay backend dùng giá catalog hiện tại.
