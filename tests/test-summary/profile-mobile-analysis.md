# Pool D — Hồ sơ trên thiết bị di động

Phạm vi hiện hành: **14 cases (4 BVA + 10 EP)** với thao tác trên thiết bị di động; case 030 có thêm trang web. Đây là thiết kế, không phải kết quả chạy. [Test run](../test-runs/pool-d-test-run.md).

## Requirement Analysis

### Requirement

Nguồn đúng/sai: [README hệ thống](../../README.md), không lấy lỗi hiện tại làm chuẩn. Giữ mục tiêu nghiệp vụ, chỉ đổi cách thực hiện và cách quan sát theo yêu cầu người dùng.

### Functional Rules

1. FR-04/FR-20: hồ sơ trên ứng dụng cho phép sửa tên, số điện thoại, địa chỉ; Email không sửa được.
2. Số điện thoại bắt đầu bằng 0 và có 10–11 chữ số.
3. SEC-04: nội dung được lưu phải hiển thị an toàn; đăng xuất/đổi tài khoản không làm sửa nhầm hồ sơ.

### Preconditions

Tài khoản, dữ liệu thử và thao tác chuẩn bị nằm trong [README của pool](../test-cases/profile-mobile/README.md). Không cần tester gửi request hay sửa cơ sở dữ liệu. Nếu không chuẩn bị được, ghi Blocked; không coi thao tác chuẩn bị lỗi là bằng chứng đã chạy case.

### Inputs / Expected Outputs

Inputs là dữ liệu trong form, tài khoản đăng nhập, lựa chọn sản phẩm hoặc trạng thái đơn. Expected Result phải nhìn thấy bằng thông báo, màn hình sau lưu và sau tải lại/đăng nhập lại. Chỉ báo thành công chưa đủ để chứng minh dữ liệu được lưu.

### Assumptions / Ambiguities

Không kiểm tra xác thực bị sửa hoặc quyền quản trị qua thông điệp tự tạo. Không thay kết quả ứng dụng bằng kết quả trang web. Chưa bao phủ mọi phiên bản Android/iOS, ngoại tuyến, đổi thiết bị, hết phiên hoặc mọi chuỗi có thể gây lỗi hiển thị.

## Domain Analysis

| Biến | Miền/điều kiện |
|---|---|
| phone | Bắt đầu 0, 10–11 ASCII digits |
| phone.length | Rỗng hoặc <10; giá trị không rỗng vẫn giữ prefix 0/all-digits |
| phone.length | >11; giữ prefix 0/all-digits |
| phone.prefix | Dài 10–11/all-digits nhưng không bắt đầu 0 |
| phone.characters | Dài 10, bắt đầu 0, có non-digit |
| name | Tên thông thường theo AS-PM-02 |
| shipping_address | Địa chỉ thông thường theo AS-PM-02 |
| email UI | Thử thay email qua native UI |
| Chủ hồ sơ | Chỉ sửa hồ sơ của tài khoản đang đăng nhập |
| session | Chưa login mà yêu cầu profile update |
| session | Đã logout A nhưng còn quyền/dữ liệu sửa A trong app |
| session / owner | Login B sau logout A; form/save chỉ tác động B |
| name tại display | Markup-like string đã đến native renderer, phải an toàn |
| address tại display | Markup-like address đã đến native renderer, phải an toàn |

## Equivalence Partitions

14 partitions có đại diện trong suite hiện hành. ID cũ được giữ khi cùng nghĩa; không gán kiểm tra màn hình vào partition giả mạo dữ liệu. Mỗi partition không có case được liệt kê riêng bên dưới.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PM-01 | phone | VALID | Bắt đầu 0, 10–11 ASCII digits | 0912345678 / 09123456789 | FR-04; FR-20 |
| EP-PM-02 | phone.length | INVALID | Rỗng hoặc <10; giá trị không rỗng vẫn giữ prefix 0/all-digits | 091234567 (9); chuỗi rỗng | FR-04; FR-20 |
| EP-PM-03 | phone.length | INVALID | >11; giữ prefix 0/all-digits | 091234567890 (12) | FR-04; FR-20 |
| EP-PM-04 | phone.prefix | INVALID | Dài 10–11/all-digits nhưng không bắt đầu 0 | 1912345678 | FR-04; FR-20 |
| EP-PM-05 | phone.characters | INVALID | Dài 10, bắt đầu 0, có non-digit | 0A12345678; 09123 5678; 09123-5678 | FR-04; FR-20 |
| EP-PM-06 | name | VALID | Tên thông thường theo AS-PM-02 | Lê Thị Mai | FR-04; FR-20 |
| EP-PM-07 | shipping_address | VALID | Địa chỉ thông thường theo AS-PM-02 | 35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM | FR-04; FR-20 |
| EP-PM-08 | email UI | INVALID | Thử thay email qua native UI | mobile.changed@example.com | FR-04; FR-20 |
| EP-PM-15 | Chủ hồ sơ | VALID | Chỉ sửa hồ sơ của tài khoản đang đăng nhập | A lưu A hoặc B lưu B | FR-04; FR-20 |
| EP-PM-17 | session | INVALID | Chưa login mà yêu cầu profile update | Phiên app không user/token | FR-04; FR-20 |
| EP-PM-18 | session | INVALID | Đã logout A nhưng còn quyền/dữ liệu sửa A trong app | Logout → Hồ sơ | FR-04; FR-20; AS-PM-04 |
| EP-PM-19 | session / owner | VALID | Login B sau logout A; form/save chỉ tác động B | A → logout → B | FR-04; FR-20 |
| EP-PM-20 | name tại display | VALID | Markup-like string đã đến native renderer, phải an toàn | <b>Tên thử</b> | SEC-04; FR-20 |
| EP-PM-21 | address tại display | VALID | Markup-like address đã đến native renderer, phải an toàn | <b>Địa chỉ thử</b> | SEC-04; FR-20 |

### Partitions chưa kiểm tra trong phạm vi mới

Các định nghĩa sau giữ để thấy phần thiếu; **không phải các bước tester phải làm** và không được tính covered.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PM-09 | role UI | VALID | Chủ thể user không có thao tác tự đổi role | role=user | FR-04; FR-20; SEC-06 |
| EP-PM-10 | role client | INVALID | Gửi role khác từ client để nâng quyền | role=admin | FR-04; SEC-06 |
| EP-PM-11 | JWT | VALID | Token thật, hợp lệ của tài khoản hiện tại | TOKEN_A / TOKEN_B runtime | SEC-02 |
| EP-PM-12 | JWT | INVALID | Không có Authorization | Header vắng mặt | SEC-02 |
| EP-PM-13 | JWT | INVALID | Chuỗi không phải JWT hợp lệ | Bearer not-a-jwt | SEC-02 |
| EP-PM-14 | JWT | INVALID | Payload ID đổi nhưng chữ ký cũ | TOKEN_A_TAMPERED: id=B_ID | SEC-02; FR-04 |
| EP-PM-16 | owner selector | INVALID | Token A nhưng selector body/query trỏ B | id=B_ID / user_id=B_ID | FR-04 |

## Boundary Analysis

| Variable | Lower | Upper | Values |
|---|---|---|---|
| Số điện thoại | 10 | 11 | 9, 10, 11, 12 chữ số |

## BVA Values

Không tự đặt thêm giới hạn name/address, thời gian hoặc độ dài khác ngoài requirement.

Cases BVA: [001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md), [002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md), [003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md), [004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md).

## Generated Test Cases

[001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md), [002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md), [003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md), [004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md), [005](../test-cases/profile-mobile/TC-PROFILE-MOBILE-005.md), [006](../test-cases/profile-mobile/TC-PROFILE-MOBILE-006.md), [013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md), [014](../test-cases/profile-mobile/TC-PROFILE-MOBILE-014.md), [016](../test-cases/profile-mobile/TC-PROFILE-MOBILE-016.md), [017](../test-cases/profile-mobile/TC-PROFILE-MOBILE-017.md), [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md), [028](../test-cases/profile-mobile/TC-PROFILE-MOBILE-028.md), [029](../test-cases/profile-mobile/TC-PROFILE-MOBILE-029.md), [030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md)

Danh sách có 14 file với ID gốc, một case một mục tiêu chính; bước thực hiện dùng nhãn trên màn hình. Xem [danh mục và dữ liệu chuẩn bị](../test-cases/profile-mobile/README.md).

## Coverage Summary

- 14 cases: 4 BVA + 10 EP.
- 14/21 partitions có đại diện; 7 chưa kiểm tra trong phạm vi này.
- Cách kiểm tra lưu dữ liệu: tải lại trang hoặc đăng xuất/đăng nhập lại và quan sát dữ liệu hiển thị.
- Không suy kết quả bảo vệ server từ việc form/nút chặn thao tác. Không tuyên bố bao phủ toàn bộ yêu cầu bảo mật hay mọi trạng thái/thiết bị.
- [Ma trận hiện hành](traceability-matrix.md) và [lý do loại cases](manual-testing-scope.md).

### Potential Coverage Gaps

Không kiểm tra xác thực bị sửa hoặc quyền quản trị qua thông điệp tự tạo. Không thay kết quả ứng dụng bằng kết quả trang web. Chưa bao phủ mọi phiên bản Android/iOS, ngoại tuyến, đổi thiết bị, hết phiên hoặc mọi chuỗi có thể gây lỗi hiển thị.

### Assumptions / Ambiguities Requiring Clarification

Tên/địa chỉ danh nghĩa và dữ liệu mẫu là dữ liệu thử, không phải giới hạn nghiệp vụ. Các khoảng chưa được requirement quy định vẫn mở; chỉ bổ sung Expected Result khi có nguồn rõ ràng.

## Human Review Required

1. Kiểm tra rule, dữ liệu thử và nhãn màn hình có đúng requirement không.
2. Đối chiếu các partitions chưa kiểm tra với phạm vi thao tác thủ công đã chọn.
3. Xác nhận dữ liệu chuẩn bị và cách ghi Blocked khi không đến được bước cần thử. Không tự ghi phê duyệt/Pass khi chưa có kết quả thật.

## AI Gap Candidates

- Khi form chặn sớm, các bước quan sát dữ liệu đã lưu/hiển thị có thể chưa thực hiện được; ghi điểm dừng, không suy Pass cho phần chưa đến.
- Các miền chưa có oracle và các partitions bị loại cần được xem lại nếu phạm vi đổi; đây là giới hạn thiết kế, không phải lỗi hệ thống đã được xác nhận.
