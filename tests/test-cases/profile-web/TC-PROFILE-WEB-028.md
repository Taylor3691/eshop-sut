# TC-PROFILE-WEB-028: UI — cập nhật đồng thời ba trường hợp lệ

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
| name | `Nguyễn Thị An` |
| phone | `0912345678` |
| shipping_address | `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` |

## Test Steps

1. Mở `/profile`, đợi baseline của A hiển thị.
2. Thay đồng thời Họ Tên, Số điện thoại và Địa chỉ bằng ba giá trị trong Test Data.
3. Bấm `Cập nhật`; ghi nhận response. Không thay phone để vượt validation.
4. Gửi GET `/api/users/me` với token A, kiểm tra cả ba trường và đúng A_ID.
5. Tải lại `/profile`, đợi dữ liệu server và đối chiếu cả ba trường.
6. Đọc hồ sơ B bằng token B, so sánh snapshot.

## Expected Result

- Cả ba trường của A được lưu đúng giá trị mới; không bỏ sót trường hoặc ánh xạ sai `shipping_address`.
- Email/role của A không đổi; hồ sơ B không đổi.
- Sau tải lại, form hiển thị đúng cả ba giá trị mới.

## Status / Related Bugs

Not Run / None
