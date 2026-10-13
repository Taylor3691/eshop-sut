# Pool B — Trạng thái đơn hàng

**18 cases: 0 BVA + 18 EP.** ID cũ được giữ nguyên; người dùng tự thực hiện. [Test run](../../test-runs/pool-b-test-run.md) · [Phân tích](../../test-summary/order-state-analysis.md).

## Tài khoản

| Tài khoản | Email | Mật khẩu | Vai trò |
|---|---|---|---|
| A (có thể dùng tài khoản mẫu) | test@eshop.com | Test1234! | Khách hàng |
| M | admin@eshop.com | Admin123! | Quản trị viên |

Nếu đã có tài khoản thử đang dùng, tiếp tục dùng tài khoản đó và ghi email thực tế trong test run. Không thay thế hồ sơ của người khác. Tài khoản mẫu chỉ dùng được nếu chưa bị đổi/xóa. Các tên A/B/M trong tài liệu là ký hiệu để dễ theo dõi, không phải tên phải nhập vào form.

## Chuẩn bị đơn thử bằng trang web

1. Đăng nhập A ở `http://localhost:5173`. Chọn một sản phẩm thử, thêm vào giỏ và đi đến thanh toán. Giữ tổng tiền hiển thị, bấm Xác Nhận Thanh Toán.
2. Mở Hồ sơ của bạn → Lịch sử đơn hàng, ghi mã đơn mới và tổng tiền thực tế. Không cần số tiền cố định vì case chỉ thử trạng thái.
3. Đăng nhập M ở `http://localhost:5174`, mở Đơn hàng và tìm đúng mã. Dùng một cửa sổ riêng cho khách hàng, một cửa sổ cho quản trị viên.
4. Chuẩn bị trạng thái trước case theo bảng dưới. Tải lại hai trang để kiểm tra; nếu bước chuẩn bị thất bại, ghi Blocked cho case cần trạng thái đó.
5. Tạo thêm một đơn thử khác để đối chiếu. Không thao tác đơn thật của người khác. Dùng đơn mới khi cần thử lại từ đầu; không đưa đơn đã hủy/đã giao quay về trạng thái trước.

| Trạng thái cần có | Cách chuẩn bị |
|---|---|
| Chờ xác nhận | Đơn mới đặt |
| Đã xác nhận | M bấm Xác nhận trên đơn mới |
| Đang giao | Từ Đã xác nhận, M bấm Giao hàng |
| Đã giao | Từ Đang giao, M bấm Hoàn thành |
| Đã hủy | A bấm Hủy đơn hoặc M bấm Hủy khi đơn còn Chờ xác nhận/Đã xác nhận |

Với thao tác bị cấm, không có nút/nút bị khóa là một cách chặn hợp lệ. Nếu vẫn có nút và bấm được, phải kiểm tra thông báo và trạng thái sau tải lại. Hai case trang cũ 051/052 giữ nguyên một cửa sổ, thao tác ở cửa sổ kia rồi quay lại; không bấm đồng thời.

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
| [TC-ORDER-STATE-004](TC-ORDER-STATE-004.md) | Quản trị viên hủy đơn Chờ xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-005](TC-ORDER-STATE-005.md) | Quản trị viên hủy đơn Đã xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-006](TC-ORDER-STATE-006.md) | Không cho chuyển đơn Chờ xác nhận sang Đang giao | Equivalence Partitioning |
| [TC-ORDER-STATE-008](TC-ORDER-STATE-008.md) | Không cho chuyển đơn Đã xác nhận sang Chờ xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-009](TC-ORDER-STATE-009.md) | Không cho chuyển đơn Đã xác nhận sang Đã giao | Equivalence Partitioning |
| [TC-ORDER-STATE-011](TC-ORDER-STATE-011.md) | Không cho chuyển đơn Đang giao sang Đã xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-012](TC-ORDER-STATE-012.md) | Không cho chuyển đơn Đã giao sang Chờ xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-015](TC-ORDER-STATE-015.md) | Không cho chuyển đơn Đã giao sang Đã hủy | Equivalence Partitioning |
| [TC-ORDER-STATE-016](TC-ORDER-STATE-016.md) | Không cho chuyển đơn Đã hủy sang Chờ xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-019](TC-ORDER-STATE-019.md) | Không cho chuyển đơn Đã hủy sang Đã giao | Equivalence Partitioning |
| [TC-ORDER-STATE-021](TC-ORDER-STATE-021.md) | Khách hàng hủy đơn Đã xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-022](TC-ORDER-STATE-022.md) | Khách hàng không được hủy đơn Đang giao | Equivalence Partitioning |
| [TC-ORDER-STATE-023](TC-ORDER-STATE-023.md) | Khách hàng không được hủy đơn Đã giao | Equivalence Partitioning |
| [TC-ORDER-STATE-025](TC-ORDER-STATE-025.md) | Khách hàng không được quản lý trạng thái đơn hàng | Equivalence Partitioning |
| [TC-ORDER-STATE-041](TC-ORDER-STATE-041.md) | Xác nhận, giao hàng và hoàn thành một đơn | Equivalence Partitioning |
| [TC-ORDER-STATE-046](TC-ORDER-STATE-046.md) | Khách hàng hủy đơn Chờ xác nhận | Equivalence Partitioning |
| [TC-ORDER-STATE-051](TC-ORDER-STATE-051.md) | Không hủy được đơn đã giao đi từ trang chưa tải lại | Equivalence Partitioning |
| [TC-ORDER-STATE-052](TC-ORDER-STATE-052.md) | Không chuyển đơn đã hủy sang Đang giao từ trang chưa tải lại | Equivalence Partitioning |

## Giới hạn phạm vi

Không kiểm tra xác thực/request giả, mã đơn không tồn tại hoặc trường trạng thái bị bỏ/null/sai kiểu. Không có toàn bộ các cặp chuyển trạng thái; không kết luận kiểm thử đồng thời từ hai thao tác nối tiếp. Quyền quản trị hủy đơn Đang giao và việc gửi lại đúng trạng thái cũ vẫn cần làm rõ.

Các case yêu cầu gửi request trực tiếp đã loại theo [bảng thay đổi](../../test-summary/manual-testing-scope.md).
