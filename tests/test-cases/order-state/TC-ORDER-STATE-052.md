# TC-ORDER-STATE-052: Không chuyển đơn đã hủy sang Đang giao từ trang chưa tải lại

## Requirement ID

FR-10; FR-18

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Mở trang khách hàng `http://localhost:5173/profile` và trang quản trị `http://localhost:5174` trong hai cửa sổ riêng. Dùng A ở trang khách hàng và M ở trang quản trị.
- Chuẩn bị một đơn thử ở trạng thái được ghi trong Test Data; ghi mã đơn, người đặt, tổng tiền và các thông tin đang hiển thị. Ghi thêm một đơn khác để đối chiếu.

## Test Data

| Field | Value |
|---|---|
| Trạng thái ban đầu | `Đã xác nhận` |
| Trạng thái sau thao tác ở cửa sổ kia | `Đã hủy` |

## Test Steps

1. M mở mục Đơn hàng, nhìn thấy đơn thử Đã xác nhận; giữ trang quản trị và chưa tải lại.
2. Ở cửa sổ khách hàng, A hủy đúng đơn đó. Tải lại trang khách hàng để xác nhận Đã hủy. Nếu chưa đạt trạng thái này, dừng và ghi Blocked, không làm bước tiếp.
3. Quay về trang quản trị đang mở cũ; bấm Giao hàng nếu nút còn hoạt động. Nếu trang tự cập nhật hoặc nút biến mất, ghi rõ.
4. Tải lại cả trang quản trị và trang khách hàng. Tìm đúng mã đơn đã ghi và đối chiếu trạng thái.
5. Kiểm tra người đặt, tổng tiền và thông tin đơn còn hiển thị như trước; đơn đối chiếu không đổi.

## Expected Result

- Quản trị viên không làm đơn đã hủy thành Đang giao; đơn vẫn Đã hủy.
- Nếu nút cũ còn bấm được, thao tác bị từ chối; nếu tự cập nhật/chặn nút, ghi rõ cách chặn đã quan sát.
- Đơn đối chiếu không đổi. Đây là hai thao tác nối tiếp, không phải bấm đồng thời.

## Status / Related Bugs

Not Run / None
