# TC-ORDER-STATE-048: UI User — không đổi state khi thử hủy đơn shipping

## Requirement ID

FR-10

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- User A đăng nhập `http://localhost:5173`, mở `/profile`. Có API client với token A/M để readback độc lập.

## Test Data

| Field | Value |
|---|---|
| Order | `A_SHIPPING_ID` |
| current_status | `shipping` |
| Target endpoint cancel | `canceled` |
| Actor | `A (owner)` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_SHIPPING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Mở `/profile`, tìm đúng ID và trạng thái của đơn trong lịch sử.
3. Quan sát khả năng hủy; nếu nút ẩn/disable, ghi nhận; nếu nút hoạt động, bấm của đúng đơn và ghi nhận phản hồi/request.
4. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_SHIPPING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
5. Tải lại `/profile`, tìm đúng ID và đối chiếu state.

## Expected Result

- Đơn mục tiêu vẫn shipping; thao tác UI không được chuyển sang trạng thái khác trái quy tắc.
- UI có thể ẩn/disable nút; nếu gửi cancel thì API phải báo lỗi phù hợp.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.

## Status / Related Bugs

Not Run / None
