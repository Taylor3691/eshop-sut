# Pool D — Hồ sơ trên thiết bị di động

**14 cases: 4 BVA + 10 EP.** ID cũ được giữ nguyên; người dùng tự thực hiện. [Test run](../../test-runs/pool-d-test-run.md) · [Phân tích](../../test-summary/profile-mobile-analysis.md).

## Tài khoản

| Tài khoản | Email | Mật khẩu | Vai trò |
|---|---|---|---|
| A (có thể dùng tài khoản mẫu) | test@eshop.com | Test1234! | Khách hàng |
| M | admin@eshop.com | Admin123! | Quản trị viên |

Nếu đã có tài khoản thử đang dùng, tiếp tục dùng tài khoản đó và ghi email thực tế trong test run. Không thay thế hồ sơ của người khác. Tài khoản mẫu chỉ dùng được nếu chưa bị đổi/xóa. Các tên A/B/M trong tài liệu là ký hiệu để dễ theo dõi, không phải tên phải nhập vào form.

## Chuẩn bị thiết bị và tài khoản

Pool D chạy trên **ứng dụng EShop trên thiết bị di động**, không dùng trang web để thay cho ứng dụng.

1. Nhờ người phụ trách môi trường mở sẵn ứng dụng EShop trên điện thoại/emulator và kết nối cùng hệ thống đang dùng. Nếu được cấp mã QR cho Expo Go, mở Expo Go và quét mã; nếu không kết nối được, ghi Blocked, không cần tự sửa cấu hình.
2. Ghi loại thiết bị, phiên bản hệ điều hành và phiên bản ứng dụng vào test run.
3. Chạm Đăng nhập ở đầu màn hình, nhập tài khoản A. Sau đăng nhập, chạm lời chào để mở Hồ sơ của bạn. Nút Thoát trong hồ sơ dùng để đăng xuất.
4. Ghi/chụp tên, số điện thoại, địa chỉ, email hiện tại. Đối chiếu dữ liệu đã lưu bằng cách Thoát rồi đăng nhập lại; chỉ quay ra/vào màn hình chưa đủ.
5. Case 018 cần thêm tài khoản khách hàng B khác A. Dùng tài khoản thử đã được cung cấp, hoặc đăng ký B qua màn hình Đăng ký với `mobile.b@example.com` / `MobileB123!` nếu chưa có. Nếu đăng ký/đăng nhập B không được, ghi Blocked cho case 018; không đổi mật khẩu sang dạng sai yêu cầu để vượt lỗi.
6. Case 030 cần cả máy tính và điện thoại: đăng nhập cùng A ở trang web, lưu hồ sơ qua form, rồi đăng nhập lại trên điện thoại để kiểm tra. Nếu chưa lưu được trên trang web, ghi Blocked cho bước tải hồ sơ trên điện thoại.

Để thử chữ cái trong số điện thoại, sao chép chuỗi từ Test Data, chạm giữ ô Số điện thoại và chọn Dán. Không đổi bàn phím hoặc sửa chương trình để vượt kiểm tra.

## Cách thực hiện và ghi kết quả

1. Mở case từ bảng bên dưới, chuẩn bị dữ liệu trong Preconditions rồi làm lần lượt Test Steps.
2. Ghi điều nhìn thấy: thông báo, dữ liệu trước/sau, ảnh màn hình nếu cần. Chỉ ghi Pass khi kiểm tra đủ Expected Result; ghi Fail khi hành vi sai yêu cầu.
3. Nếu chưa đăng nhập được, chưa có dữ liệu cần thử hoặc không tạo được trạng thái ban đầu, ghi Blocked và lý do. Không dùng dữ liệu sai để vượt qua lỗi chuẩn bị.
4. Kết thúc case, khôi phục dữ liệu thử bằng các màn hình của hệ thống. Nếu không khôi phục được, ghi rõ và dùng dữ liệu thử mới cho case tiếp theo.
5. Không khởi động lại hệ thống giữa lúc lưu và kiểm tra lại: lần khởi động có thể làm mất dữ liệu thử.

Các bước chỉ dùng thao tác trên màn hình; không cần công cụ lập trình. Việc thử bị chặn ở ô nhập/nút bấm chỉ chứng minh hành vi đã quan sát trên màn hình.

## Generated Test Cases

| ID | Mục tiêu | Technique |
|---|---|---|
| [TC-PROFILE-MOBILE-001](TC-PROFILE-MOBILE-001.md) | Từ chối số điện thoại 9 chữ số | BVA |
| [TC-PROFILE-MOBILE-002](TC-PROFILE-MOBILE-002.md) | Chấp nhận số điện thoại 10 chữ số | BVA |
| [TC-PROFILE-MOBILE-003](TC-PROFILE-MOBILE-003.md) | Chấp nhận số điện thoại 11 chữ số | BVA |
| [TC-PROFILE-MOBILE-004](TC-PROFILE-MOBILE-004.md) | Từ chối số điện thoại 12 chữ số | BVA |
| [TC-PROFILE-MOBILE-005](TC-PROFILE-MOBILE-005.md) | Từ chối số điện thoại không bắt đầu bằng 0 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-006](TC-PROFILE-MOBILE-006.md) | Từ chối số điện thoại chứa chữ cái khi dán | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-013](TC-PROFILE-MOBILE-013.md) | Lưu đồng thời Họ Tên, Số điện thoại và Địa chỉ | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-014](TC-PROFILE-MOBILE-014.md) | Email không sửa được bằng gõ hoặc dán | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-016](TC-PROFILE-MOBILE-016.md) | Chưa đăng nhập không thể sửa hồ sơ | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-017](TC-PROFILE-MOBILE-017.md) | Đăng xuất không giữ quyền sửa hồ sơ trước đó | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-018](TC-PROFILE-MOBILE-018.md) | Đổi tài khoản rồi lưu đúng hồ sơ của người vừa đăng nhập | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-028](TC-PROFILE-MOBILE-028.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-029](TC-PROFILE-MOBILE-029.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-030](TC-PROFILE-MOBILE-030.md) | Đăng nhập lại trên điện thoại tải hồ sơ vừa đổi trên trang web | Equivalence Partitioning |

## Giới hạn phạm vi

Không kiểm tra xác thực bị sửa hoặc quyền quản trị qua thông điệp tự tạo. Không thay kết quả ứng dụng bằng kết quả trang web. Chưa bao phủ mọi phiên bản Android/iOS, ngoại tuyến, đổi thiết bị, hết phiên hoặc mọi chuỗi có thể gây lỗi hiển thị.

Các case yêu cầu gửi request trực tiếp đã loại theo [bảng thay đổi](../../test-summary/manual-testing-scope.md).
