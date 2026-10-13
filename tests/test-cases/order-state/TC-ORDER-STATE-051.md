# TC-ORDER-STATE-051: Không hủy được đơn đã giao đi từ trang chưa tải lại

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
| Trạng thái sau thao tác ở cửa sổ kia | `Đang giao` |

## Test Steps

1. A mở Hồ sơ của bạn, nhìn thấy đơn thử Đã xác nhận; giữ trang này và chưa tải lại.
2. Ở cửa sổ quản trị, M tìm đúng mã đơn và bấm Giao hàng. Tải lại trang quản trị, xác nhận Đang giao. Nếu chưa đạt trạng thái này, dừng và ghi Blocked, không làm bước tiếp.
3. Quay về trang A đang mở cũ; bấm Hủy đơn nếu nút còn hoạt động. Nếu trang tự cập nhật hoặc nút biến mất, ghi rõ.
4. Tải lại cả trang quản trị và trang khách hàng. Tìm đúng mã đơn đã ghi và đối chiếu trạng thái.
5. Kiểm tra người đặt, tổng tiền và thông tin đơn còn hiển thị như trước; đơn đối chiếu không đổi.

## Expected Result

- Khách hàng không hủy được; đơn vẫn Đang giao.
- Nếu nút cũ còn bấm được, thao tác bị từ chối; nếu tự cập nhật/chặn nút, ghi rõ cách chặn đã quan sát.
- Đơn đối chiếu không đổi. Đây là hai thao tác nối tiếp, không phải bấm đồng thời.

## Status / Related Bugs

Not Run / None
