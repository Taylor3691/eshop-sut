# TC-PROFILE-WEB-021: API — token A không được chọn hồ sơ B qua body

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
| Authorization | `Bearer TOKEN_A` |
| Body JSON | `{"name":"Tên thử sở hữu","phone":"0987654321","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM","id":B_ID}` |

## Test Steps

1. Đọc snapshot A bằng token A và B bằng token B; xác nhận A_ID khác B_ID.
2. Thay B_ID trong body bằng ID thực của B dưới dạng số JSON; không chèn thêm selector nào khác.
3. Gửi PUT với token A, endpoint/body như bảng; ghi nhận phản hồi.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Hồ sơ B không thay đổi bất kỳ trường nào.
- API có thể từ chối trường lạ/request hoặc bỏ qua selector và cập nhật A; không được dùng selector để sửa B.
- Nếu cập nhật thành công thì chỉ các trường được phép của A đổi theo body, email/role A giữ nguyên.

## Status / Related Bugs

Not Run / None
