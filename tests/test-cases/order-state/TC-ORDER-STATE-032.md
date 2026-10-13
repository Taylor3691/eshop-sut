# TC-ORDER-STATE-032: API Admin — token sai định dạng bị từ chối

## Requirement ID

FR-10; FR-12; SEC-02

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
| Authorization | `Bearer not-a-jwt` |
| Body JSON | `{"status":"confirmed"}` |
| current_status | `pending` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Tắt auth tự động kế thừa và đặt header Bearer not-a-jwt.
3. Gửi đúng request trong Test Data; cặp trạng thái sử dụng sẽ hợp lệ nếu được xác thực đúng quyền.
4. Ghi nhận response.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- API từ chối truy cập; không thực hiện chuyển trạng thái.
- Đơn A vẫn pending; các đơn đối chứng không đổi; response không cung cấp dữ liệu riêng tư không cần thiết.
- Không ấn định mã HTTP/wording lỗi.

## Status / Related Bugs

Not Run / None
