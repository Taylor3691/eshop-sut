# TC-PROFILE-WEB-023: API — người dùng không thể tự nâng role thành admin

## Requirement ID

FR-04; SEC-06

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
| Body JSON | `{"name":"Nguyễn Văn An","phone":"0987654321","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM","role":"admin"}` |

## Test Steps

1. Đọc GET `/api/users/me` bằng token A và xác nhận role baseline là `user`.
2. Gửi PUT với body thêm `role: admin` như Test Data; các trường hợp lệ khác giữ baseline.
3. Ghi nhận response.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Đăng nhập lại tài khoản A bằng thông tin fixture để lấy token mới; đọc GET `/api/users/me` với token mới. Không dùng role trong JWT cũ để kết luận dữ liệu role không đổi.
6. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Role của A vẫn là `user` trong dữ liệu đọc lại và sau đăng nhập mới.
- API có thể reject request hoặc ignore role; không được lưu `admin`.
- Name/phone/address/email A và hồ sơ B giữ baseline.

## Status / Related Bugs

Not Run / None
