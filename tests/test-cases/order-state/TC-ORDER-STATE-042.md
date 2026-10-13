# TC-ORDER-STATE-042: UI Admin — hủy đơn pending

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
| Order | `A_PENDING_ID` |
| current_status | `pending` |
| target_status | `canceled` |
| Actor | `M (admin)` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Tìm đúng đơn mục tiêu trong tab Đơn hàng, đối chiếu ID/state với Test Data.
3. Bấm Hủy của đúng hàng; nếu có dialog, xác nhận thao tác.
4. Ghi nhận phản hồi và đọc lại.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
6. Tải lại trang Admin, tìm đúng ID.

## Expected Result

- Đơn mục tiêu chuyển canceled; reload vẫn canceled.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.

## Status / Related Bugs

Not Run / None
