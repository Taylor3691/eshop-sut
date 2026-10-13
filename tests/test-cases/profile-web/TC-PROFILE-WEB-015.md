# TC-PROFILE-WEB-015: UI — email chỉ đọc và đúng loại trường

## Requirement ID

FR-04; FR-22

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
| Email | `profile.a@example.com` |
| Email thử nhập | `changed.a@example.com` |

## Test Steps

1. Mở `/profile`, kiểm tra email đang hiển thị.
2. Thử focus, nhập và dán email thay thế bằng thao tác UI thông thường; không dùng DevTools để bỏ disabled/readonly.
3. Chỉ đọc DOM để xem thuộc tính type của input Email.
4. Tải lại trang và đọc GET `/api/users/me` với token A.

## Expected Result

- Email hiển thị đúng `profile.a@example.com` và không thể đổi qua form.
- Input Email có `type="email"` theo FR-22.
- GET và trang sau tải lại giữ nguyên email của A.

## Status / Related Bugs

Not Run / None
