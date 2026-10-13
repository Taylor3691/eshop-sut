# TC-ORDER-STATE-021: API User — hủy đơn confirmed

## Requirement ID

FR-10; SEC-02

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- Tester dùng API client tại `http://localhost:3000`; JSON gửi `Content-Type: application/json`. Kiểm tra header auth kế thừa khi thử thiếu/sai token.

## Test Data

| Field | Value |
|---|---|
| Method | `PUT` |
| Endpoint | `http://localhost:3000/api/orders/A_CONFIRMED_ID/cancel` |
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{}` |
| current_status | `confirmed` |
| Chủ đơn | `A` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Xác nhận trạng thái nguồn là `confirmed` và chủ đơn A.
3. Gửi PUT cancel đúng Test Data; đích của endpoint là canceled, không gửi status tùy ý.
4. Ghi nhận response/message thực tế.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- Đơn A_CONFIRMED_ID chuyển từ confirmed sang canceled; thao tác thành công.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.

## Status / Related Bugs

Not Run / None
