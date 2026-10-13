# Pool A — Hồ sơ cá nhân

Phạm vi hiện hành: **11 cases (4 BVA + 7 EP)** với thao tác trên trang web. Đây là thiết kế, không phải kết quả chạy. [Test run](../test-runs/pool-a-test-run.md).

## Requirement Analysis

### Requirement

Nguồn đúng/sai: [README hệ thống](../../README.md), không lấy lỗi hiện tại làm chuẩn. Giữ mục tiêu nghiệp vụ, chỉ đổi cách thực hiện và cách quan sát theo yêu cầu người dùng.

### Functional Rules

1. FR-04: cho phép sửa Họ Tên, Số điện thoại và Địa chỉ của chính mình; Email không được thay đổi.
2. Số điện thoại bắt đầu bằng 0, chỉ có chữ số, dài 10–11.
3. SEC-04: nội dung người dùng khi hiển thị phải an toàn.

### Preconditions

Tài khoản, dữ liệu thử và thao tác chuẩn bị nằm trong [README của pool](../test-cases/profile-web/README.md). Không cần tester gửi request hay sửa cơ sở dữ liệu. Nếu không chuẩn bị được, ghi Blocked; không coi thao tác chuẩn bị lỗi là bằng chứng đã chạy case.

### Inputs / Expected Outputs

Inputs là dữ liệu trong form, tài khoản đăng nhập, lựa chọn sản phẩm hoặc trạng thái đơn. Expected Result phải nhìn thấy bằng thông báo, màn hình sau lưu và sau tải lại/đăng nhập lại. Chỉ báo thành công chưa đủ để chứng minh dữ liệu được lưu.

### Assumptions / Ambiguities

Không kiểm tra xác thực bằng chuỗi truy cập bị sửa, giả danh người khác hoặc tự gửi thuộc tính quyền quản trị. Không kiểm tra kiểu kỹ thuật của ô Email. Name/address chưa có giới hạn độ dài được đặc tả. Các case hiển thị chỉ là quan sát bằng mắt khi chuỗi đã đến đúng màn hình.

## Domain Analysis

| Biến | Miền/điều kiện |
|---|---|
| phone | Bắt đầu `0`, toàn chữ số, dài 10–11 |
| phone | Bắt đầu `0`, toàn chữ số, không rỗng, dài <10 |
| phone | Bắt đầu `0`, toàn chữ số, dài >11 |
| phone | Dài 10–11, toàn chữ số, ký tự đầu khác `0 |
| phone | Dài 10–11, bắt đầu `0`, chứa chữ cái |
| name | Tên người thông thường, không có restriction bổ sung |
| shipping_address | Địa chỉ thông thường |
| Email | Xem email hiện tại |
| Email | Thử gõ/dán để thay email |
| Chủ hồ sơ | Người dùng sửa hồ sơ của mình |
| name tại điểm hiển thị | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu |
| address tại điểm hiển thị | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu |
| Phiên người dùng | Chưa đăng nhập mà mở hồ sơ |

## Equivalence Partitions

13 partitions có đại diện trong suite hiện hành. ID cũ được giữ khi cùng nghĩa; không gán kiểm tra màn hình vào partition giả mạo dữ liệu. Mỗi partition không có case được liệt kê riêng bên dưới.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PW-01 | phone | VALID | Bắt đầu `0`, toàn chữ số, dài 10–11 | 0912345678`, `09123456789 | FR-04 R2 |
| EP-PW-02 | phone | INVALID | Bắt đầu `0`, toàn chữ số, không rỗng, dài <10 | 091234567 | FR-04 R2 |
| EP-PW-03 | phone | INVALID | Bắt đầu `0`, toàn chữ số, dài >11 | 091234567890 | FR-04 R2 |
| EP-PW-04 | phone | INVALID | Dài 10–11, toàn chữ số, ký tự đầu khác `0 | 1912345678 | FR-04 R2 |
| EP-PW-05 | phone | INVALID | Dài 10–11, bắt đầu `0`, chứa chữ cái | 09123A5678 | FR-04 R2 |
| EP-PW-06 | name | VALID | Tên người thông thường, không có restriction bổ sung | Nguyễn Thị An | FR-04 R1; AS-03 |
| EP-PW-07 | shipping_address | VALID | Địa chỉ thông thường | 45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM | FR-04 R1; AS-03 |
| EP-PW-08 | Email | VALID | Xem email hiện tại | Email của A | FR-04 R3 |
| EP-PW-09 | Email | INVALID | Thử gõ/dán để thay email | changed.a@example.com | FR-04 R3 |
| EP-PW-14 | Chủ hồ sơ | VALID | Người dùng sửa hồ sơ của mình | A mở và lưu hồ sơ A | FR-04 R4 |
| EP-PW-18 | name tại điểm hiển thị | VALID | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu | <b data-profile-probe="name">Tên kiểm tra</b> | SEC-04 R7; AM-07 |
| EP-PW-19 | address tại điểm hiển thị | VALID | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu | <b data-profile-probe="address">Địa chỉ kiểm tra</b> | SEC-04 R7; AM-07 |
| EP-PW-20 | Phiên người dùng | INVALID | Chưa đăng nhập mà mở hồ sơ | Cửa sổ riêng tư mới | FR-04 |

### Partitions chưa kiểm tra trong phạm vi mới

Các định nghĩa sau giữ để thấy phần thiếu; **không phải các bước tester phải làm** và không được tính covered.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PW-10 | Authorization | VALID | Token còn hợp lệ do môi trường cấp cho A | TOKEN_A` lấy sau đăng nhập | SEC-02 R6 |
| EP-PW-11 | Authorization | INVALID | Không có header Authorization | Bỏ hẳn header | SEC-02 R6 |
| EP-PW-12 | Authorization | INVALID | Chuỗi không phải JWT hợp lệ | Bearer not-a-jwt | SEC-02 R6 |
| EP-PW-13 | Authorization | INVALID | Payload JWT bị sửa, chữ ký không tương ứng | Token A đổi claim `id` thành B_ID, giữ chữ ký cũ | SEC-02 R6 |
| EP-PW-15 | ownership | INVALID | Người gọi A cố chọn B | Body `id=B_ID`; query selector giảm ưu tiên | FR-04 R4 |
| EP-PW-16 | role | VALID | Giữ role hiện tại khi cập nhật trường được phép | A vẫn là `user | FR-04 R5, SEC-06 |
| EP-PW-17 | role | INVALID | A tự nâng quyền | Body thêm `"role":"admin" | FR-04 R5, SEC-06 |

## Boundary Analysis

| Variable | Lower | Upper | Values |
|---|---|---|---|
| Số điện thoại | 10 | 11 | 9, 10, 11, 12 chữ số |

## BVA Values

Không tự đặt thêm giới hạn name/address, thời gian hoặc độ dài khác ngoài requirement.

Cases BVA: [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md).

## Generated Test Cases

[001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md), [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md), [016](../test-cases/profile-web/TC-PROFILE-WEB-016.md), [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md), [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md)

Danh sách có 11 file với ID gốc, một case một mục tiêu chính; bước thực hiện dùng nhãn trên màn hình. Xem [danh mục và dữ liệu chuẩn bị](../test-cases/profile-web/README.md).

## Coverage Summary

- 11 cases: 4 BVA + 7 EP.
- 13/20 partitions có đại diện; 7 chưa kiểm tra trong phạm vi này.
- Cách kiểm tra lưu dữ liệu: tải lại trang hoặc đăng xuất/đăng nhập lại và quan sát dữ liệu hiển thị.
- Không suy kết quả bảo vệ server từ việc form/nút chặn thao tác. Không tuyên bố bao phủ toàn bộ yêu cầu bảo mật hay mọi trạng thái/thiết bị.
- [Ma trận hiện hành](traceability-matrix.md) và [lý do loại cases](manual-testing-scope.md).

### Potential Coverage Gaps

Không kiểm tra xác thực bằng chuỗi truy cập bị sửa, giả danh người khác hoặc tự gửi thuộc tính quyền quản trị. Không kiểm tra kiểu kỹ thuật của ô Email. Name/address chưa có giới hạn độ dài được đặc tả. Các case hiển thị chỉ là quan sát bằng mắt khi chuỗi đã đến đúng màn hình.

### Assumptions / Ambiguities Requiring Clarification

Tên/địa chỉ danh nghĩa và dữ liệu mẫu là dữ liệu thử, không phải giới hạn nghiệp vụ. Các khoảng chưa được requirement quy định vẫn mở; chỉ bổ sung Expected Result khi có nguồn rõ ràng.

## Human Review Required

1. Kiểm tra rule, dữ liệu thử và nhãn màn hình có đúng requirement không.
2. Đối chiếu các partitions chưa kiểm tra với phạm vi thao tác thủ công đã chọn.
3. Xác nhận dữ liệu chuẩn bị và cách ghi Blocked khi không đến được bước cần thử. Không tự ghi phê duyệt/Pass khi chưa có kết quả thật.

## AI Gap Candidates

- Khi form chặn sớm, các bước quan sát dữ liệu đã lưu/hiển thị có thể chưa thực hiện được; ghi điểm dừng, không suy Pass cho phần chưa đến.
- Các miền chưa có oracle và các partitions bị loại cần được xem lại nếu phạm vi đổi; đây là giới hạn thiết kế, không phải lỗi hệ thống đã được xác nhận.
