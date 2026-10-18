# Test Run — FR-13 Dashboard

## Phạm vi và môi trường

- Run ID: TR-FR13-001.
- Phạm vi: 7 test case trong [danh mục FR-13](../../test-cases/FR-13/dashboard/README.md).
- Requirement oracle: README hệ thống, FR-13; quyền truy cập đối chiếu thêm FR-12.
- Hình thức đánh giá: chạy tay và kiểm tra mã nguồn.
- Ngày đánh giá mã nguồn: 2026-10-19.

## Kết quả

| Test Case ID | Module | Result | Ghi nhận |
|---|---|---|---|
| [TC-FR-13-DASHBOARD-001](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-001.md) | FR-13 DASHBOARD | Fail | `totalRevenue` cộng `o.total_amount * 2` cho đơn `delivered`, không cộng đúng một lần. |
| [TC-FR-13-DASHBOARD-002](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-002.md) | FR-13 DASHBOARD | Pass | Giao diện lấy tổng số đơn từ `orders.length`, bao gồm các trạng thái được trả về. |
| [TC-FR-13-DASHBOARD-003](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-003.md) | FR-13 DASHBOARD | Pass | Không có đơn `delivered` thì phép reduce khởi tạo từ 0 và không cộng thêm doanh thu. |
| [TC-FR-13-DASHBOARD-004](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-004.md) | FR-13 DASHBOARD | Pass | Giao diện từ chối đăng nhập khi `user.role` không phải `admin`. Case kiểm tra luồng UI; chưa xác nhận bảo vệ API theo role. |
| [TC-FR-13-DASHBOARD-005](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-005.md) | FR-13 DASHBOARD | Pass | Khi không có token, giao diện hiển thị form đăng nhập thay vì nội dung Dashboard. |
| [TC-FR-13-DASHBOARD-006](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-006.md) | FR-13 DASHBOARD | Fail | Các đơn không `delivered` bị loại khỏi doanh thu, nhưng đơn `delivered` bị nhân đôi khi cộng. |
| [TC-FR-13-DASHBOARD-007](../../test-cases/FR-13/dashboard/TC-FR-13-DASHBOARD-007.md) | FR-13 DASHBOARD | Pass | Với danh sách đơn rỗng, tổng doanh thu reduce về 0 và `orders.length` là 0. |

## Tổng hợp

- Tổng số test case: 7.
- Pass: 5; Fail: 2.
- Điểm không phù hợp chính: doanh thu đơn `delivered` bị nhân đôi trong phép tính tại Dashboard.
- TC-004 chỉ kiểm tra luồng đăng nhập trên giao diện. Backend Admin API hiện chỉ có middleware xác thực token ở một số endpoint và chưa kiểm tra role nhất quán; cần test API riêng theo FR-12.

## Giới hạn

- Không có số liệu doanh thu/số đơn quan sát từ phiên chạy thực tế, HTTP response, ảnh màn hình hoặc bộ dữ liệu được tạo.
- FR-13 không quy định thời điểm refresh dashboard hoặc cách trình bày khi danh sách đơn rỗng.
- Backend khởi động có thể reset/reseed SQLite; chỉ thực hiện runtime trong môi trường test cô lập.
