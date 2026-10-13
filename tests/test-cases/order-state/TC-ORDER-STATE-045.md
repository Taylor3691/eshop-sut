# TC-ORDER-STATE-045: UI Admin — không chuyển đơn final delivered sang trạng thái khác

## Requirement ID

FR-10; FR-18

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
| Order | `A_DELIVERED_ID` |
| current_status | `delivered` |
| Target thử nếu có điều khiển | `Bất kỳ trạng thái khác current_status; đặc biệt canceled → delivered` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_DELIVERED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Tìm hàng đúng ID ở tab Đơn hàng; kiểm tra các thao tác đổi state được hiển thị.
3. Nếu không có thao tác đổi sang state khác hoặc chúng bị disable, ghi nhận. Nếu có nút hoạt động, thử nút đó của đúng đơn và ghi request/response.
4. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_DELIVERED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
5. Tải lại trang Admin, đối chiếu ID và trạng thái.

## Expected Result

- Không thể chuyển đơn `delivered` sang trạng thái khác qua UI; sau reload vẫn `delivered`.
- UI có thể ẩn/disable thao tác; nếu gửi request chuyển sang state khác thì backend phải báo lỗi phù hợp. Không yêu cầu một cách hiển thị duy nhất.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.

## Status / Related Bugs

Not Run / None
