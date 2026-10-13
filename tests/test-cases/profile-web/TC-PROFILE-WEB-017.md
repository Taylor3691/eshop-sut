# TC-PROFILE-WEB-017: API — GET hồ sơ không có token

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
| Method | `GET` |
| Endpoint | `http://localhost:3000/api/users/me` |
| Authorization | `Không gửi header` |

## Test Steps

1. Trong API client, xóa header Authorization và tắt auth tự động kế thừa.
2. Gửi GET tới endpoint trong Test Data, không có body.
3. Ghi nhận response.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Request bị từ chối truy cập; response không trả dữ liệu hồ sơ của A/B.
- Hồ sơ A/B không thay đổi; không coi response thành công giả là đạt.
- Không ấn định mã HTTP chính xác vì requirement chưa quy định.

## Status / Related Bugs

Not Run / None
