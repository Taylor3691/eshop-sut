# TC-PROFILE-WEB-014: UI — chỉ cập nhật Địa chỉ

## Requirement ID

FR-04

## Module / Test Type / Technique

PROFILE-WEB / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture A/B và snapshot theo [hướng dẫn fixture](README.md); mỗi case bắt đầu độc lập, không phụ thuộc case trước.
- A có email `profile.a@example.com`, role `user`; B có email `profile.b@example.com`, role `user`; `A_ID`, `B_ID`, `TOKEN_A`, `TOKEN_B` được ghi nhận từ môi trường.
- Hồ sơ baseline A: name `Nguyễn Văn An`, phone `0987654321`, shipping_address `12 Lê Lợi, Phường Bến Nghé, TP.HCM`.
- A đã đăng nhập storefront tại `http://localhost:5173`; có thể đọc GET `/api/users/me` bằng token đúng của từng tài khoản để xác minh dữ liệu.

## Test Data

| Field | Value |
|---|---|
| name | `Nguyễn Văn An` |
| phone | `0987654321` |
| shipping_address | `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Mở `/profile`, đợi baseline của A hiển thị.
2. Chỉ thay Địa chỉ bằng `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM`; giữ hai trường còn lại baseline.
3. Bấm `Cập nhật`; ghi nhận phản hồi, không thay phone để né lỗi validation.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Tải lại `/profile`, kiểm tra giá trị sau khi dữ liệu được nạp.
6. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Giá trị shipping_address của A được lưu đúng như Test Data, gồm dấu tiếng Việt.
- Hai trường còn lại, email và role A không thay đổi; hồ sơ B giữ nguyên.
- Form sau tải lại hiển thị giá trị vừa lưu. Không đặt yêu cầu header đổi tức thì trước reload.

## Status / Related Bugs

Not Run / None
