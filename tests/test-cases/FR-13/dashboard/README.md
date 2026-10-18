# FR-13 — Dashboard Test Cases

**5 cases: 0 BVA + 5 Equivalence Partitioning.** Oracle: `README.md` FR-13; dashboard access is also covered by FR-12. Các case được thiết kế để thực hiện thủ công theo mẫu [TC-FR-08-CHECKOUT-001](../../FR-08/TC-FR-08-CHECKOUT-001.md).

## Requirement Scope

- FR-13: Dashboard hiển thị tổng doanh thu, chỉ cộng `total_amount` của đơn có trạng thái `delivered`, và hiển thị tổng số đơn hàng.
- FR-12: Phân hệ Admin chỉ dành cho admin; API Admin cần token hợp lệ và role admin.
- Không suy diễn dashboard phải cập nhật real-time, bộ lọc thời gian, biểu đồ, phân trang hoặc quy tắc định dạng tiền tệ ngoài nội dung yêu cầu.

## Chuẩn bị

- Dùng môi trường test cô lập và các đơn thử; không sửa/xóa đơn hàng thật của người khác.
- Backend startup reset/reseed SQLite theo hướng dẫn dự án. Không khởi động backend trên DB có dữ liệu cần giữ.
- Đăng nhập bằng tài khoản admin thử nghiệm. Với case access control, dùng tài khoản khách hàng thử nghiệm hoặc trạng thái chưa đăng nhập.
- Để kiểm tra số liệu chính xác, ghi lại mã đơn, `total_amount`, trạng thái và tổng số đơn trước khi thao tác. Tạo trạng thái đơn qua luồng khách hàng/admin hiện có.
- Nếu không thể tạo tập dữ liệu có trạng thái yêu cầu, ghi Blocked và lý do; không thay expected bằng số liệu thực tế quan sát được.

## Danh sách Test Cases

| ID | Mục tiêu | Technique | Requirement |
|---|---|---|---|
| [TC-FR-13-DASHBOARD-001](TC-FR-13-DASHBOARD-001.md) | Doanh thu chỉ cộng các đơn đã giao | Equivalence Partitioning | FR-13 |
| [TC-FR-13-DASHBOARD-002](TC-FR-13-DASHBOARD-002.md) | Tổng số đơn tính mọi trạng thái | Equivalence Partitioning | FR-13 |
| [TC-FR-13-DASHBOARD-003](TC-FR-13-DASHBOARD-003.md) | Doanh thu bằng 0 khi không có đơn đã giao | Equivalence Partitioning | FR-13 |
| [TC-FR-13-DASHBOARD-004](TC-FR-13-DASHBOARD-004.md) | Chỉ admin truy cập phân hệ Dashboard | Equivalence Partitioning | FR-12, FR-13 |
| [TC-FR-13-DASHBOARD-005](TC-FR-13-DASHBOARD-005.md) | Từ chối truy cập Dashboard khi chưa đăng nhập | Equivalence Partitioning | FR-12, FR-13 |

## Cách ghi kết quả

Ghi actual value của doanh thu và số đơn, các mã đơn dùng làm dữ liệu, trạng thái trước/sau, tài khoản/role và bằng chứng phù hợp. Chỉ Pass khi so khớp expected của case. Nếu dữ liệu nền không cô lập được hoặc trạng thái đơn không chuẩn bị được, ghi Blocked.

## Coverage và giới hạn

- Phân hoạch trạng thái đơn `delivered` và không `delivered`; có kiểm tra tập delivered rỗng.
- Phân hoạch role admin, khách hàng và chưa đăng nhập.
- FR-13 không nêu ngưỡng số học hoặc ngày lọc nên BVA không áp dụng.
- Thời điểm refresh số liệu, lỗi API, dữ liệu lỗi/thiếu trường và hiệu năng chưa được đặc tả; cần yêu cầu bổ sung trước khi tạo expected result cho các hành vi này.
