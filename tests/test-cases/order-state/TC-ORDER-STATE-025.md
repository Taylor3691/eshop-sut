# TC-ORDER-STATE-025: API — user thường không có quyền xác nhận đơn A qua endpoint Admin

## Requirement ID

FR-10; FR-12; SEC-02; SEC-03

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
| Endpoint | `http://localhost:3000/api/admin/orders/A_PENDING_ID/status` |
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{"status":"confirmed"}` |
| current_status | `pending` |
| Chủ đơn | `A` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Xác nhận cặp pending → confirmed hợp lệ cho Admin; TOKEN_A hợp lệ và role user.
3. Gửi PUT status với TOKEN_A như Test Data.
4. Ghi nhận phản hồi; không đổi role hoặc mượn token Admin để hoàn thành request.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- Request bị từ chối quyền; token user không đủ quyền endpoint admin dù cặp trạng thái hợp lệ.
- Đơn mục tiêu giữ pending; các đơn đối chứng không đổi.

## Status / Related Bugs

Not Run / None
