# TC-ORDER-STATE-027: API — A không được hủy đơn pending của B (AS-OS-03)

## Requirement ID

FR-10; FR-11 (liên quan); SEC-02; AS-OS-03 cần review

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- Tester dùng API client tại `http://localhost:3000`; JSON gửi `Content-Type: application/json`. Kiểm tra header auth kế thừa khi thử thiếu/sai token.
- Oracle ownership của mutation theo AS-OS-03 cần được người dùng xác nhận; case này là thiết kế đề xuất, không phải rule được ghi trực tiếp trong FR-10.

## Test Data

| Field | Value |
|---|---|
| Method | `PUT` |
| Endpoint | `http://localhost:3000/api/orders/B_PENDING_ID/cancel` |
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{}` |
| current_status | `pending` |
| Chủ đơn | `B` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token B, tìm đúng `B_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Xác nhận B sở hữu B_PENDING_ID, A_ID khác B_ID; state pending cho phép chủ đơn hủy.
3. Gửi PUT cancel với TOKEN_A; không dùng TOKEN_B cho thao tác đang kiểm tra.
4. Ghi nhận response.
5. Đọc GET `/api/orders/my-orders` với token B, tìm đúng `B_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- Theo AS-OS-03, request bị từ chối; đơn B giữ trạng thái nguồn, các đơn đối chứng không đổi.
- Nếu reviewer không xác nhận AS-OS-03, cập nhật domain/case trước execution; không tự gọi kết quả khác là confirmed bug chỉ dựa vào giả định.

## Status / Related Bugs

Not Run / None
