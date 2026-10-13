# Pool A — Hồ sơ cá nhân

**11 cases: 4 BVA + 7 EP.** ID cũ được giữ nguyên; người dùng tự thực hiện. [Test run](../../test-runs/pool-a-test-run.md) · [Phân tích](../../test-summary/profile-web-analysis.md).

## Tài khoản

| Tài khoản | Email | Mật khẩu | Vai trò |
|---|---|---|---|
| A (có thể dùng tài khoản mẫu) | test@eshop.com | Test1234! | Khách hàng |
| M | admin@eshop.com | Admin123! | Quản trị viên |

Nếu đã có tài khoản thử đang dùng, tiếp tục dùng tài khoản đó và ghi email thực tế trong test run. Không thay thế hồ sơ của người khác. Tài khoản mẫu chỉ dùng được nếu chưa bị đổi/xóa. Các tên A/B/M trong tài liệu là ký hiệu để dễ theo dõi, không phải tên phải nhập vào form.

## Chuẩn bị

- Mở `http://localhost:5173/login`, đăng nhập A rồi mở `http://localhost:5173/profile`.
- Ghi/chụp Họ Tên, Số điện thoại, Địa chỉ và Email đang có. Dữ liệu cũ dùng để đối chiếu, không bắt buộc trùng một hồ sơ giả định.
- Với case chỉ thay số điện thoại, giữ nguyên các ô khác; Họ Tên phải có nội dung. Nếu cần chuẩn bị tên/địa chỉ, dùng form trước khi bắt đầu case và kiểm tra lại sau đăng nhập.
- Với case hiển thị chuỗi giống thẻ định dạng, chỉ kết luận khi đã lưu được và mở lại để nhìn thấy chuỗi. Nếu không lưu được, ghi Blocked cho kiểm tra hiển thị.
- Để đăng xuất, bấm nút Thoát trên thanh đầu trang; sau đó đăng nhập lại bằng cùng email/mật khẩu. Để mở hồ sơ, bấm lời chào ở đầu trang hoặc mở địa chỉ `/profile`.

Số điện thoại hợp lệ bắt đầu bằng `0`, có 10–11 chữ số. Không dùng hành vi hiện tại của hệ thống làm kết quả mong đợi.

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
| [TC-PROFILE-WEB-001](TC-PROFILE-WEB-001.md) | Chấp nhận số điện thoại 10 chữ số | BVA |
| [TC-PROFILE-WEB-002](TC-PROFILE-WEB-002.md) | Chấp nhận số điện thoại 11 chữ số | BVA |
| [TC-PROFILE-WEB-003](TC-PROFILE-WEB-003.md) | Từ chối số điện thoại 9 chữ số | BVA |
| [TC-PROFILE-WEB-004](TC-PROFILE-WEB-004.md) | Từ chối số điện thoại 12 chữ số | BVA |
| [TC-PROFILE-WEB-010](TC-PROFILE-WEB-010.md) | Từ chối số điện thoại không bắt đầu bằng 0 | Equivalence Partitioning |
| [TC-PROFILE-WEB-012](TC-PROFILE-WEB-012.md) | Từ chối số điện thoại chứa chữ cái | Equivalence Partitioning |
| [TC-PROFILE-WEB-015](TC-PROFILE-WEB-015.md) | Email không được phép thay đổi | Equivalence Partitioning |
| [TC-PROFILE-WEB-016](TC-PROFILE-WEB-016.md) | Chưa đăng nhập không thể sửa hồ sơ | Equivalence Partitioning |
| [TC-PROFILE-WEB-025](TC-PROFILE-WEB-025.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên | Equivalence Partitioning |
| [TC-PROFILE-WEB-026](TC-PROFILE-WEB-026.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng | Equivalence Partitioning |
| [TC-PROFILE-WEB-028](TC-PROFILE-WEB-028.md) | Cập nhật đồng thời Họ Tên, Số điện thoại và Địa chỉ | Equivalence Partitioning |

## Giới hạn phạm vi

Không kiểm tra xác thực bằng chuỗi truy cập bị sửa, giả danh người khác hoặc tự gửi thuộc tính quyền quản trị. Không kiểm tra kiểu kỹ thuật của ô Email. Name/address chưa có giới hạn độ dài được đặc tả. Các case hiển thị chỉ là quan sát bằng mắt khi chuỗi đã đến đúng màn hình.

Các case yêu cầu gửi request trực tiếp đã loại theo [bảng thay đổi](../../test-summary/manual-testing-scope.md).
