# TC-PROFILE-WEB-024: API — JWT sửa danh tính nhưng giữ chữ ký cũ bị từ chối

## Requirement ID

FR-04; SEC-02

## Module / Test Type / Technique

PROFILE-WEB / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture A/B và snapshot theo [hướng dẫn fixture](README.md); mỗi case bắt đầu độc lập, không phụ thuộc case trước.
- A có email `profile.a@example.com`, role `user`; B có email `profile.b@example.com`, role `user`; `A_ID`, `B_ID`, `TOKEN_A`, `TOKEN_B` được ghi nhận từ môi trường.
- Hồ sơ baseline A: name `Nguyễn Văn An`, phone `0987654321`, shipping_address `12 Lê Lợi, Phường Bến Nghé, TP.HCM`.
- Có API client do tester sử dụng; request gửi tới `http://localhost:3000`, JSON với `Content-Type: application/json`. Tắt kế thừa auth/cookie trong client khi case yêu cầu không có token.

## Test Data

| Field | Value |
|---|---|
| Method | `PUT` |
| Endpoint | `http://localhost:3000/api/users/me` |
| Authorization | `Bearer TOKEN_A_TAMPERED` |
| Body JSON | `{"name":"Tên không được lưu","phone":"0987654321","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM"}` |
| TOKEN_A_TAMPERED | `JWT của A, payload đổi duy nhất claim id thành B_ID; header và chữ ký giữ nguyên` |

## Test Steps

1. Từ TOKEN_A, giải mã payload Base64URL trong công cụ local; đổi claim `id` thành B_ID thực của B.
2. Mã hóa lại payload bằng Base64URL, ghép header.payload.signature với header/chữ ký cũ; không ký lại token.
3. Gửi PUT với token đã sửa và body trong Test Data.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Token sửa payload không vượt được xác thực; request bị từ chối.
- A và B không đổi; response không cung cấp dữ liệu hồ sơ riêng tư.

## Status / Related Bugs

Not Run / None
