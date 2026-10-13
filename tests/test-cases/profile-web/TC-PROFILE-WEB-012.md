# TC-PROFILE-WEB-012: API — từ chối phone chứa chữ cái

## Requirement ID

FR-04

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
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{"name":"Nguyễn Văn An","phone":"09123A5678","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM"}` |

## Test Steps

1. Gửi GET `/api/users/me` với token A, xác nhận baseline và đúng A_ID.
2. Gửi PUT `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A`, body đúng như Test Data; không đi qua UI.
3. Ghi nhận response và mã HTTP thực tế.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Không chấp nhận phone sai; GET của A vẫn trả phone baseline `0987654321`.
- Name/address/email/role của A và hồ sơ B không thay đổi.

## Status / Related Bugs

Not Run / None
