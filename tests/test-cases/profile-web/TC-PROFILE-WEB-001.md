# TC-PROFILE-WEB-001: UI — chấp nhận phone 10 chữ số

## Requirement ID

FR-04

## Module / Test Type / Technique

PROFILE-WEB / Functional / BVA

## Preconditions

- Tester đã chuẩn bị fixture A/B và snapshot theo [hướng dẫn fixture](README.md); mỗi case bắt đầu độc lập, không phụ thuộc case trước.
- A có email `profile.a@example.com`, role `user`; B có email `profile.b@example.com`, role `user`; `A_ID`, `B_ID`, `TOKEN_A`, `TOKEN_B` được ghi nhận từ môi trường.
- Hồ sơ baseline A: name `Nguyễn Văn An`, phone `0987654321`, shipping_address `12 Lê Lợi, Phường Bến Nghé, TP.HCM`.
- A đã đăng nhập storefront tại `http://localhost:5173`; có thể đọc GET `/api/users/me` bằng token đúng của từng tài khoản để xác minh dữ liệu.

## Test Data

| Field | Value |
|---|---|
| name | `Nguyễn Văn An` |
| phone | `0912345678` |
| shipping_address | `12 Lê Lợi, Phường Bến Nghé, TP.HCM` |
| Độ dài phone | `10` |

## Test Steps

1. Mở `http://localhost:5173/profile`, đợi dữ liệu A hiển thị đúng baseline.
2. Chỉ thay Số điện thoại bằng chuỗi `0912345678`; giữ Họ Tên và Địa chỉ baseline.
3. Bấm `Cập nhật`; ghi nhận phản hồi. Không sửa giá trị để vượt validation nếu bị chặn.
4. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_A` để đọc lại hồ sơ A.
5. Tải lại trang `/profile`, đợi dữ liệu từ server và đối chiếu phone.
6. Gửi GET `http://localhost:3000/api/users/me` với `Authorization: Bearer TOKEN_B`, so sánh hồ sơ B với snapshot.

## Expected Result

- Cập nhật thành công; GET trả đúng A_ID và phone là chuỗi `0912345678`, giữ nguyên số `0` đầu.
- Name/address/email/role của A và hồ sơ B không thay đổi.
- Sau tải lại, form hiển thị đúng phone vừa lưu.

## Status / Related Bugs

Not Run / None
