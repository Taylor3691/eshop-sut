# TC-PROFILE-WEB-025: API → UI — tên giống HTML được hiển thị an toàn

## Requirement ID

FR-04; SEC-04

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
| Body JSON | `{"name":"<b data-profile-probe=\"name\">Tên kiểm tra</b>","phone":"0987654321","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM"}` |

## Test Steps

1. Gửi PUT với dữ liệu như bảng; ghi nhận response.
2. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
3. Nếu dữ liệu bị từ chối hoặc không có chuỗi cần kiểm tra trong dữ liệu đọc lại, ghi rõ chưa exercise được điểm hiển thị; không tự đánh Pass cho toàn bộ case.
4. Với dữ liệu đã lưu, đăng nhập A trên storefront; tải lại `/profile` và đợi dữ liệu được nạp.
5. Quan sát trường Họ Tên và lời chào trên header; dùng DOM inspector kiểm tra có phần tử mang data-profile-probe="name" được tạo từ dữ liệu không.
6. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Nếu chuỗi được lưu và hiển thị, nó phải được xử lý như text; không sinh phần tử `<b>` từ dữ liệu người dùng.
- Áp dụng cho cả trường Họ Tên và lời chào header sau reload.
- Phone và các trường không kiểm tra của A giữ nguyên; hồ sơ B không đổi.
- Nếu validation từ chối chuỗi trước điểm hiển thị, ghi giới hạn coverage theo AM-07; không kết luận đã xác minh an toàn điểm hiển thị.

## Status / Related Bugs

Not Run / None
