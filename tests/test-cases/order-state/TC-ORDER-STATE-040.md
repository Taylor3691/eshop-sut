# TC-ORDER-STATE-040: API User — không chuyển được đơn không tồn tại

## Requirement ID

FR-10; SEC-02

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- Tester dùng API client tại `http://localhost:3000`; JSON gửi `Content-Type: application/json`. Kiểm tra header auth kế thừa khi thử thiếu/sai token.
- MISSING_ORDER_ID được tester xác nhận không tồn tại trong database/list bằng công cụ đọc độc lập; đây không phải giá trị BVA max+1.

## Test Data

| Field | Value |
|---|---|
| Method | `PUT` |
| Endpoint | `http://localhost:3000/api/orders/MISSING_ORDER_ID/cancel` |
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{}` |

## Test Steps

1. Xác nhận MISSING_ORDER_ID không có tài nguyên và ghi snapshot các đơn test.
2. Gửi PUT đúng endpoint/body/token trong Test Data.
3. Ghi nhận response; không tự giả định mã 404.
4. Đọc GET `/api/admin/orders` với TOKEN_M, GET `/api/orders/my-orders` với TOKEN_A/TOKEN_B; xác minh toàn bộ fixture không đổi và không sinh đơn mới ở ID bị gửi.

## Expected Result

- Request báo lỗi phù hợp vì không có đơn để chuyển trạng thái; không tạo mới đơn và không đổi đơn khác.
- Không ấn định mã HTTP/wording lỗi cho tài nguyên không tồn tại (AM-OS-05).

## Status / Related Bugs

Not Run / None
