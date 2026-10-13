# TC-ORDER-STATE-033: API Admin — JWT user sửa role nhưng giữ chữ ký cũ bị từ chối

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
| Authorization | `Bearer TOKEN_A_TAMPERED` |
| Body JSON | `{"status":"confirmed"}` |
| TOKEN_A_TAMPERED | `JWT của A, đổi claim role thành admin, giữ nguyên header và signature` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. Trong công cụ local, giải mã payload Base64URL của TOKEN_A, đổi duy nhất role từ user thành admin; mã hóa lại payload.
3. Ghép header.payload.signature với header/signature cũ; không ký lại token.
4. Gửi PUT như Test Data với token bị sửa.
5. Ghi nhận response.
6. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_PENDING_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.

## Expected Result

- Token không có chữ ký hợp lệ bị từ chối; sửa claim role không cấp quyền Admin.
- Đơn A giữ pending, các đơn đối chứng không đổi.

## Status / Related Bugs

Not Run / None
