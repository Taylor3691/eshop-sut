# TC-ORDER-STATE-041: UI Admin — chuỗi xác nhận, giao và hoàn thành đơn của B

## Requirement ID

FR-10; FR-18; FR-12

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- Admin M đăng nhập `http://localhost:5174`, mở tab Đơn hàng. Có API client với token owner để readback độc lập.

## Test Data

| Field | Value |
|---|---|
| Order | `B_PENDING_ID` |
| Owner | `B` |
| Chuỗi status | `pending → confirmed → shipping → delivered` |
| Actor | `M (admin)` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token B, tìm đúng `B_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Trong tab Đơn hàng, tìm đúng ID B_PENDING_ID đang pending.
3. Bấm Xác nhận. Đọc lại bằng TOKEN_B và TOKEN_M, xác nhận confirmed trước khi thực hiện bước tiếp.
4. Trên đúng đơn đã đổi, bấm Giao hàng. Đọc lại và xác nhận shipping.
5. Trên đúng đơn đó, bấm Hoàn thành. Đọc lại và xác nhận delivered.
6. Tải lại trang Admin. Trong cửa sổ trình duyệt riêng, đăng nhập B bằng fixture và mở `/profile`; đối chiếu ID/status cuối. Đối chiếu các đơn control.

## Expected Result

- Cùng một đơn thuộc B đi đúng chuỗi confirmed, shipping, delivered; từng bước lưu đúng target và có thể tiếp tục từ trạng thái mới.
- Admin thao tác được đơn của B; không bị giới hạn thành đơn sở hữu bởi tài khoản admin.
- Sau reload trạng thái cuối vẫn delivered.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.

## Status / Related Bugs

Not Run / None
