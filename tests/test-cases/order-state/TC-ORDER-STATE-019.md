# TC-ORDER-STATE-019: API Admin — từ chối canceled → delivered

## Requirement ID

FR-10; FR-12; FR-18; SEC-02; SEC-03

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
| Endpoint | `http://localhost:3000/api/admin/orders/A_CANCELED_ID/status` |
| Authorization | `Bearer TOKEN_M` |
| Body JSON | `{"status":"delivered"}` |
| current_status | `canceled` |
| Chủ đơn | `A` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CANCELED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Xác nhận đúng đơn `A_CANCELED_ID` thuộc A và có current_status `canceled`; ghi snapshot.
3. Gửi PUT đúng endpoint/header/body trong Test Data, chỉ một request chuyển trạng thái.
4. Ghi nhận response/error/message thực tế.
5. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CANCELED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- API trả lỗi với thông báo phù hợp; đơn `A_CANCELED_ID` giữ `canceled`, không chuyển thành `delivered`.
- Owner, total_amount, shipping_address, created_at của đơn mục tiêu giữ snapshot; A_CONTROL_ID và B_CONTROL_ID không đổi.
- Không ấn định mã HTTP/wording lỗi; response và dữ liệu đọc lại phải nhất quán.

## Status / Related Bugs

Not Run / None
