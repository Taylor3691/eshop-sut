# TC-ORDER-STATE-036: API Admin — từ chối status null

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
| Authorization | `Bearer TOKEN_M` |
| Body JSON | `{"status":null}` |
| current_status | `pending` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Xác nhận order tồn tại và token Admin hợp lệ, giữ các điều kiện khác cố định.
3. Gửi request với body JSON chính xác trong Test Data.
4. Ghi nhận response/error/message; phân biệt lỗi request và việc lưu một state ngoài enum.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- Request không có chuyển đổi hợp lệ; phải báo lỗi phù hợp và không lưu target/state ngoài 5 trạng thái.
- Đơn mục tiêu giữ pending; các đơn đối chứng không đổi.
- Không ấn định mã HTTP hay schema validation chưa được mô tả; số 3 là đại diện kiểu number, không phải boundary.

## Status / Related Bugs

Not Run / None
