# Pool B — Trạng thái đơn hàng

Phạm vi hiện hành: **18 cases (0 BVA + 18 EP)** với thao tác trên trang web. Đây là thiết kế, không phải kết quả chạy. [Test run](../test-runs/pool-b-test-run.md).

## Requirement Analysis

### Requirement

Nguồn đúng/sai: [README hệ thống](../../README.md), không lấy lỗi hiện tại làm chuẩn. Giữ mục tiêu nghiệp vụ, chỉ đổi cách thực hiện và cách quan sát theo yêu cầu người dùng.

### Functional Rules

1. FR-10: Chờ xác nhận → Đã xác nhận → Đang giao → Đã giao; quản trị viên thực hiện các bước tiến.
2. Khách hàng/quản trị viên có thể hủy khi Chờ xác nhận hoặc Đã xác nhận. Khách hàng không được hủy khi Đang giao.
3. Đã giao và Đã hủy là trạng thái kết thúc; không chuyển sang trạng thái khác.
4. FR-12/FR-18/SEC-03: chức năng quản trị chỉ dành cho quản trị viên.

### Preconditions

Tài khoản, dữ liệu thử và thao tác chuẩn bị nằm trong [README của pool](../test-cases/order-state/README.md). Không cần tester gửi request hay sửa cơ sở dữ liệu. Nếu không chuẩn bị được, ghi Blocked; không coi thao tác chuẩn bị lỗi là bằng chứng đã chạy case.

### Inputs / Expected Outputs

Inputs là dữ liệu trong form, tài khoản đăng nhập, lựa chọn sản phẩm hoặc trạng thái đơn. Expected Result phải nhìn thấy bằng thông báo, màn hình sau lưu và sau tải lại/đăng nhập lại. Chỉ báo thành công chưa đủ để chứng minh dữ liệu được lưu.

### Assumptions / Ambiguities

Không kiểm tra xác thực/request giả, mã đơn không tồn tại hoặc trường trạng thái bị bỏ/null/sai kiểu. Không có toàn bộ các cặp chuyển trạng thái; không kết luận kiểm thử đồng thời từ hai thao tác nối tiếp. Quyền quản trị hủy đơn Đang giao và việc gửi lại đúng trạng thái cũ vẫn cần làm rõ.

## Domain Analysis

| Biến | Miền/điều kiện |
|---|---|
| Admin: state pair | pending → confirmed |
| Admin: state pair | confirmed → shipping |
| Admin: state pair | shipping → delivered |
| Admin: state pair | pending → canceled |
| Admin: state pair | confirmed → canceled |
| Admin: state pair | pending → shipping hoặc delivered |
| Admin: state pair | confirmed → pending hoặc delivered |
| Admin: state pair | shipping → pending hoặc confirmed |
| Admin: final state | delivered → một trong 4 trạng thái khác |
| Admin: final state | canceled → một trong 4 trạng thái khác |
| User cancel | Own pending → canceled |
| User cancel | Own confirmed → canceled |
| User cancel | Own shipping → canceled |
| User cancel | Own delivered → canceled |
| User ownership | User A thao tác đơn A |
| Quyền vào trang quản trị | Khách hàng thử vào quản lý đơn |

## Equivalence Partitions

16 partitions có đại diện trong suite hiện hành. ID cũ được giữ khi cùng nghĩa; không gán kiểm tra màn hình vào partition giả mạo dữ liệu. Mỗi partition không có case được liệt kê riêng bên dưới.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-OS-01 | Admin: state pair | VALID | pending → confirmed | pending / confirmed | FR-10 R-OS-02 |
| EP-OS-02 | Admin: state pair | VALID | confirmed → shipping | confirmed / shipping | FR-10 R-OS-02 |
| EP-OS-03 | Admin: state pair | VALID | shipping → delivered | shipping / delivered | FR-10 R-OS-02 |
| EP-OS-04 | Admin: state pair | VALID | pending → canceled | pending / canceled | FR-10 R-OS-03 |
| EP-OS-05 | Admin: state pair | VALID | confirmed → canceled | confirmed / canceled | FR-10 R-OS-03 |
| EP-OS-06 | Admin: state pair | INVALID | pending → shipping hoặc delivered | pending / shipping | FR-10 R-OS-06 |
| EP-OS-07 | Admin: state pair | INVALID | confirmed → pending hoặc delivered | confirmed / pending | FR-10 R-OS-06 |
| EP-OS-08 | Admin: state pair | INVALID | shipping → pending hoặc confirmed | shipping / confirmed | FR-10 R-OS-06 |
| EP-OS-09 | Admin: final state | INVALID | delivered → một trong 4 trạng thái khác | delivered / canceled | FR-10 R-OS-05 |
| EP-OS-10 | Admin: final state | INVALID | canceled → một trong 4 trạng thái khác | canceled / delivered | FR-10 R-OS-05 |
| EP-OS-11 | User cancel | VALID | Own pending → canceled | A hủy own pending | FR-10 R-OS-03 |
| EP-OS-12 | User cancel | VALID | Own confirmed → canceled | A hủy own confirmed | FR-10 R-OS-03 |
| EP-OS-13 | User cancel | INVALID | Own shipping → canceled | A hủy own shipping | FR-10 R-OS-04 |
| EP-OS-14 | User cancel | INVALID | Own delivered → canceled | A hủy own delivered | FR-10 R-OS-05 |
| EP-OS-22 | User ownership | VALID | User A thao tác đơn A | A / A_PENDING_ID | FR-10; AS-OS-03 |
| EP-OS-31 | Quyền vào trang quản trị | INVALID | Khách hàng thử vào quản lý đơn | Đăng nhập A ở trang quản trị | FR-12; SEC-03 |

### Partitions chưa kiểm tra trong phạm vi mới

Các định nghĩa sau giữ để thấy phần thiếu; **không phải các bước tester phải làm** và không được tính covered.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-OS-15 | Final-state preservation | VALID | Own canceled giữ canceled khi retry; response chưa phân loại | A gửi lại cancel own canceled | FR-10 R-OS-05; AM-OS-02 |
| EP-OS-16 | Role trên admin API | VALID | Admin thao tác status của user A/B | TOKEN_M với role admin | FR-12; FR-18; SEC-03 |
| EP-OS-17 | Role trên admin API | INVALID | User thường dùng endpoint admin | TOKEN_A, pending → confirmed | FR-12; SEC-03 |
| EP-OS-18 | Authorization | VALID | JWT hợp lệ | TOKEN_A / TOKEN_M | SEC-02 |
| EP-OS-19 | Authorization | INVALID | Không có token | Bỏ Authorization | SEC-02 |
| EP-OS-20 | Authorization | INVALID | Token sai định dạng | Bearer not-a-jwt | SEC-02 |
| EP-OS-21 | Authorization | INVALID | Payload sửa role thành admin, chữ ký không tương ứng | TOKEN_A_TAMPERED | SEC-02; SEC-03 |
| EP-OS-23 | User ownership | INVALID (theo AS-OS-03) | User A cố hủy đơn B đang pending/confirmed | TOKEN_A / B_PENDING_ID | FR-10; FR-11 liên quan; AM-OS-03 |
| EP-OS-24 | Resource existence | VALID | Đơn đã được xác minh tồn tại | A_PENDING_ID | FR-10; API mục 4/6 |
| EP-OS-25 | Resource existence | INVALID | ID đã xác nhận không có đơn | MISSING_ORDER_ID | FR-10; AM-OS-05 |
| EP-OS-26 | Target string | INVALID | Chuỗi trạng thái không thuộc 5 giá trị | returned | FR-10 R-OS-01/06 |
| EP-OS-27 | Target field | INVALID | Body không có trường status | {} | FR-10 R-OS-01/06; AM-OS-05 |
| EP-OS-28 | Target value | INVALID | status là null | {"status":null} | FR-10 R-OS-01/06; AM-OS-05 |
| EP-OS-29 | Target string | INVALID | status chuỗi rỗng | {"status":""} | FR-10 R-OS-01/06; AM-OS-05 |
| EP-OS-30 | Target type | INVALID | status không phải chuỗi trạng thái | {"status":3} | FR-10 R-OS-01/06; AM-OS-05 |

## Boundary Analysis

Không có miền có thứ tự/giới hạn số trong trạng thái đơn hàng; BVA không áp dụng cho tên trạng thái hoặc mã đơn.

## BVA Values

Không tự đặt thêm giới hạn name/address, thời gian hoặc độ dài khác ngoài requirement.

Cases BVA: Không áp dụng.

## Generated Test Cases

[004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md), [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [025](../test-cases/order-state/TC-ORDER-STATE-025.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md)

Danh sách có 18 file với ID gốc, một case một mục tiêu chính; bước thực hiện dùng nhãn trên màn hình. Xem [danh mục và dữ liệu chuẩn bị](../test-cases/order-state/README.md).

## Coverage Summary

- 18 cases: 0 BVA + 18 EP.
- 16/31 partitions có đại diện; 15 chưa kiểm tra trong phạm vi này.
- Cách kiểm tra lưu dữ liệu: tải lại trang hoặc đăng xuất/đăng nhập lại và quan sát dữ liệu hiển thị.
- Không suy kết quả bảo vệ server từ việc form/nút chặn thao tác. Không tuyên bố bao phủ toàn bộ yêu cầu bảo mật hay mọi trạng thái/thiết bị.
- [Ma trận hiện hành](traceability-matrix.md) và [lý do loại cases](manual-testing-scope.md).

### Potential Coverage Gaps

Không kiểm tra xác thực/request giả, mã đơn không tồn tại hoặc trường trạng thái bị bỏ/null/sai kiểu. Không có toàn bộ các cặp chuyển trạng thái; không kết luận kiểm thử đồng thời từ hai thao tác nối tiếp. Quyền quản trị hủy đơn Đang giao và việc gửi lại đúng trạng thái cũ vẫn cần làm rõ.

### Assumptions / Ambiguities Requiring Clarification

Tên/địa chỉ danh nghĩa và dữ liệu mẫu là dữ liệu thử, không phải giới hạn nghiệp vụ. Các khoảng chưa được requirement quy định vẫn mở; chỉ bổ sung Expected Result khi có nguồn rõ ràng.

## Human Review Required

1. Kiểm tra rule, dữ liệu thử và nhãn màn hình có đúng requirement không.
2. Đối chiếu các partitions chưa kiểm tra với phạm vi thao tác thủ công đã chọn.
3. Xác nhận dữ liệu chuẩn bị và cách ghi Blocked khi không đến được bước cần thử. Không tự ghi phê duyệt/Pass khi chưa có kết quả thật.

## AI Gap Candidates

- Khi form chặn sớm, các bước quan sát dữ liệu đã lưu/hiển thị có thể chưa thực hiện được; ghi điểm dừng, không suy Pass cho phần chưa đến.
- Các miền chưa có oracle và các partitions bị loại cần được xem lại nếu phạm vi đổi; đây là giới hạn thiết kế, không phải lỗi hệ thống đã được xác nhận.
