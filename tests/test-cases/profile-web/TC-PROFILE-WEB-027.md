# TC-PROFILE-WEB-027: API — cập nhật đồng thời ba trường hợp lệ

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
| name | `Nguyễn Thị An` |
| phone | `0912345678` |
| shipping_address | `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Đọc GET `/api/users/me` với token A và đối chiếu baseline.
2. Gửi PUT `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` và `Content-Type: application/json`; body: `{"name":"Nguyễn Thị An","phone":"0912345678","shipping_address":"45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM"}`.
3. Ghi nhận response; gửi GET `/api/users/me` với token A để đọc lại.
4. Đọc hồ sơ B bằng token B, so sánh snapshot.

## Expected Result

- Cả ba trường của A được lưu đúng giá trị mới; không bỏ sót trường hoặc ánh xạ sai `shipping_address`.
- Email/role của A không đổi; hồ sơ B không đổi.

## Status / Related Bugs

Not Run / None
