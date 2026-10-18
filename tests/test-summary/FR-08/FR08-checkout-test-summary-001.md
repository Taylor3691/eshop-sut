# FR-08 — Phân tích và tổng hợp kiểm thử Checkout

Phạm vi hiện hành: **9 test case (0 BVA + 8 EP/state checks và 1 exploratory)**. Tài liệu đặc tả ở [README hệ thống](../../../README.md), mục FR-08. FR-09 coupon không thuộc phạm vi. Result Pass/Fail bên dưới là kết quả đối chiếu mã nguồn với expected result; runtime chưa được thực hiện. [Test run](../../test-runs/FR-08/FR08-checkout-test-run-001.md).

## Requirement Analysis

### Requirement

- ID: FR-08.
- Feature: Thanh toán (Checkout).
- Module: Web checkout và backend checkout API.
- Nguồn chuẩn đúng/sai: yêu cầu nghiệp vụ FR-08 trong README hệ thống; hành vi hiện tại của ứng dụng không thay thế đặc tả.

### Functional Rules

1. Chỉ người dùng đã đăng nhập mới được tiến hành thanh toán.
2. Tổng tiền được tính tự động từ giỏ hàng và người dùng không thể chỉnh sửa trực tiếp.
3. Giao diện checkout hiển thị đầy đủ sản phẩm đặt mua.
4. Backend tự tính lại tổng tiền và không chấp nhận `total_amount` do client gửi.
5. Sau thanh toán thành công, giỏ hàng được xóa.

### Preconditions

- Case checkout thành công cần tài khoản người dùng và giỏ hàng có sản phẩm.
- Case không đăng nhập bắt đầu khi chưa có phiên đăng nhập.
- Case kiểm tra tổng tiền phía server cần giỏ hàng có tổng đã biết và request với giá trị client khác tổng đó.
- Hướng dẫn tài khoản, dữ liệu và phạm vi nằm trong [README test case FR-08](../../test-cases/FR-08/README.md).
- Backend startup có thể khởi tạo lại SQLite; runtime cần môi trường thử nghiệm cô lập trước khi chạy.

### Inputs / Expected Outputs

| Input | Expected output theo FR-08 |
|---|---|
| Trạng thái đăng nhập | Người chưa đăng nhập không tiến hành checkout; người đã đăng nhập có thể tiếp tục. |
| Nội dung giỏ hàng | Danh sách sản phẩm đặt mua hiển thị đầy đủ. |
| Giá và số lượng trong giỏ | Tổng tiền được tính từ giỏ, không chỉnh trực tiếp trên UI; backend tính lại từ dữ liệu giỏ. |
| `total_amount` do client gửi | Backend không dùng giá trị này làm tổng đơn. |
| Kết quả checkout thành công | Giỏ hàng được xóa. |

### Assumptions / Ambiguities

- FR-08 chưa nêu expected result cho checkout với giỏ rỗng; TC-008 cần chủ yêu cầu xác định trước khi kết luận Pass/Fail.
- Đặc tả không nêu chi tiết cách xử lý thất bại checkout hoặc cách lưu chi tiết mặt hàng trong đơn hàng.
- API contract hiện có thể nhận `total_amount`; nếu tài liệu API khác FR-08, cần ưu tiên yêu cầu nghiệp vụ và ghi nhận khác biệt.

## Domain Analysis

| Biến/điều kiện | Miền hợp lệ | Miền không hợp lệ / cần làm rõ | Ghi chú |
|---|---|---|---|
| Trạng thái đăng nhập | Người dùng đã đăng nhập | Chưa đăng nhập | FR-08 chỉ cho phép người đã đăng nhập checkout. |
| Giỏ hàng | Có một hoặc nhiều sản phẩm | Rỗng | Hành vi giỏ rỗng chưa được quy định. |
| Tổng tiền trên UI | Giá trị tự tính từ giỏ | Người dùng sửa trực tiếp | UI phải không cho chỉnh sửa trực tiếp. |
| Tổng tiền client gửi | Không được dùng làm nguồn tính tổng | Giá trị thấp/cao/không khớp với giỏ | Backend phải tự tính lại; không giả định thêm giới hạn numeric không có trong FR-08. |
| Danh sách sản phẩm checkout | Toàn bộ mặt hàng trong giỏ | Thiếu/không hiển thị mặt hàng | Kiểm tra nội dung hiển thị trên checkout. |
| Trạng thái giỏ sau thanh toán | Giỏ được xóa khi thành công | Giỏ còn dữ liệu sau thành công | Không áp dụng yêu cầu xóa cho checkout thất bại vì FR-08 không nói rõ. |

## Equivalence Partitions

Các lớp dưới đây được đại diện bởi suite hiện hành. Giá trị tiền cụ thể trong test data là dữ liệu thử, không phải giới hạn nghiệp vụ.

| Partition ID | Biến | Lớp | Điều kiện | Case đại diện | Requirement |
|---|---|---|---|---|---|
| EP-CO-01 | Đăng nhập | VALID | Người dùng đã xác thực tiến hành checkout | TC-001 | FR-08.1 |
| EP-CO-02 | Đăng nhập | INVALID | Người chưa đăng nhập thử checkout | TC-002 | FR-08.1 |
| EP-CO-03 | Tổng tiền client | INVALID | Client gửi tổng thấp hơn tổng giỏ | TC-003 | FR-08.4 |
| EP-CO-04 | Tổng tiền client | INVALID | Client gửi tổng cao hơn tổng giỏ | TC-004 |
| EP-CO-05 | Tổng tiền UI | INVALID | Người dùng có thể sửa trực tiếp tổng tiền | TC-005 | FR-08.2 |
| EP-CO-06 | Danh sách hàng | VALID | Checkout hiển thị đầy đủ các sản phẩm trong giỏ | TC-006 | FR-08.3 |
| EP-CO-07 | Trạng thái giỏ | VALID | Giỏ rỗng sau checkout thành công | TC-007 | FR-08.5 |
| EP-CO-08 | Giỏ hàng | Chưa phân loại | Checkout được gửi khi giỏ hàng rỗng | TC-008 | Cần làm rõ |
| EP-CO-09 | Tổng tiền và giỏ | INVALID | Giỏ thay đổi nhưng client gửi tổng cũ | TC-009 | FR-08.2, FR-08.4 |

## Boundary Analysis

FR-08 không đưa ra ngưỡng số học cho giá trị đơn hàng, số sản phẩm hoặc số lượng trong giỏ checkout. Do đó BVA không áp dụng; không tự đặt min/max. Các tình huống tổng thấp/cao và tổng cũ là phân vùng/ tương tác dữ liệu, không phải boundary theo một ngưỡng đặc tả.

## BVA Values

Không áp dụng. Chưa có biên nghiệp vụ số nào trong FR-08 để suy ra các giá trị min−1/min/min+1 hoặc max−1/max/max+1.

## Generated Test Cases

[TC-FR-08-CHECKOUT-001](../../test-cases/FR-08/TC-FR-08-CHECKOUT-001.md), [002](../../test-cases/FR-08/TC-FR-08-CHECKOUT-002.md), [003](../../test-cases/FR-08/TC-FR-08-CHECKOUT-003.md), [004](../../test-cases/FR-08/TC-FR-08-CHECKOUT-004.md), [005](../../test-cases/FR-08/TC-FR-08-CHECKOUT-005.md), [006](../../test-cases/FR-08/TC-FR-08-CHECKOUT-006.md), [007](../../test-cases/FR-08/TC-FR-08-CHECKOUT-007.md), [008](../../test-cases/FR-08/TC-FR-08-CHECKOUT-008.md), [009](../../test-cases/FR-08/TC-FR-08-CHECKOUT-009.md).

## Kết quả đối chiếu mã nguồn

Đối chiếu được ghi chi tiết tại [Test Run FR-08](../../test-runs/FR-08/FR08-checkout-test-run-001.md). Đây là đánh giá theo luồng thể hiện trong mã nguồn, chưa bao gồm browser/API execution.

| Test Case | Yêu cầu | Result | Ghi nhận |
|---|---|---|---|
| TC-FR-08-CHECKOUT-001 | FR-08.1, .2, .4, .5 | Fail | Tổng gửi từ client được lưu; luồng thành công không xóa giỏ. |
| TC-FR-08-CHECKOUT-002 | FR-08.1 | Pass | Có chuyển hướng login ở UI và middleware xác thực ở API. |
| TC-FR-08-CHECKOUT-003 | FR-08.4 | Fail | API lưu `total_amount` gửi lên thay vì tính lại từ giỏ. |
| TC-FR-08-CHECKOUT-004 | FR-08.4 | Fail | API lưu trực tiếp tổng client cung cấp. |
| TC-FR-08-CHECKOUT-005 | FR-08.2 | Fail | Tổng tiền được hiển thị bằng input có thể sửa. |
| TC-FR-08-CHECKOUT-006 | FR-08.3 | Pass | Thành phần checkout duyệt và hiển thị các dòng hàng trong giỏ. |
| TC-FR-08-CHECKOUT-007 | FR-08.5 | Fail | Handler thành công không gọi hàm xóa giỏ. |
| TC-FR-08-CHECKOUT-008 | Chưa rõ | Chưa kết luận | Đặc tả không nêu kết quả mong đợi với giỏ rỗng. |
| TC-FR-08-CHECKOUT-009 | FR-08.2, .4 | Fail | API không tính tổng từ nội dung giỏ hiện tại. |

## Coverage Summary

- 9 cases: 0 BVA + 8 EP/state checks + 1 exploratory case về điểm chưa rõ.
- Yêu cầu FR-08.1 đến FR-08.5 đều có ít nhất một case tham chiếu.
- Kết quả: Pass 2; Fail 6; chưa kết luận 1 do thiếu expected result.
- Runtime Pass/Fail: chưa đánh giá. Không có browser session, HTTP response, đơn hàng đã lưu, ảnh chụp hoặc quan sát trạng thái giỏ trong lần này.
- Chưa kết luận coverage đầy đủ cho toàn bộ biến thể checkout; đặc tả chưa định nghĩa các giới hạn numeric và một số luồng lỗi.

### Potential Coverage Gaps

- Hành vi checkout khi API lỗi hoặc mất kết nối.
- Giỏ hàng thay đổi đồng thời trong lúc checkout.
- Cách lưu/đối chiếu chi tiết sản phẩm trong đơn đã tạo.
- Quy tắc dữ liệu thiếu hoặc sai định dạng ngoài phạm vi FR-08 đã nêu.

### Assumptions / Ambiguities Requiring Clarification

- Chốt expected result đối với giỏ hàng rỗng.
- Xác nhận nguồn dữ liệu backend phải dùng để tính tổng và cấu trúc dữ liệu giỏ hàng phía server.
- Làm rõ yêu cầu về trạng thái giỏ sau khi checkout thất bại.

## Human Review Required

1. Xác nhận nội dung diễn giải FR-08 và expected result của từng case.
2. Chốt hành vi checkout với giỏ rỗng và khi checkout thất bại.
3. Chạy các case trên môi trường test cô lập, sau đó thay kết quả đối chiếu mã nguồn bằng actual result và bằng chứng runtime.

## AI Gap Candidates

- Giỏ hàng checkout phía web có thể không đồng nhất với dữ liệu backend; cần người rà soát xác nhận nguồn dữ liệu giỏ hàng mà FR-08 yêu cầu backend dùng.
- Case TC-008 không có oracle rõ ràng do requirement chưa định nghĩa giỏ rỗng; cần chủ yêu cầu bổ sung trước khi tính kết quả.
