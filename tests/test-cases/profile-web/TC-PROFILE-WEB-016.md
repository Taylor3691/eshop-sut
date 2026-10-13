# TC-PROFILE-WEB-016: UI — truy cập hồ sơ khi chưa đăng nhập

## Requirement ID

FR-04

## Module / Test Type / Technique

PROFILE-WEB / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture A/B và snapshot theo [hướng dẫn fixture](README.md); mỗi case bắt đầu độc lập, không phụ thuộc case trước.
- A có email `profile.a@example.com`, role `user`; B có email `profile.b@example.com`, role `user`; `A_ID`, `B_ID`, `TOKEN_A`, `TOKEN_B` được ghi nhận từ môi trường.
- Hồ sơ baseline A: name `Nguyễn Văn An`, phone `0987654321`, shipping_address `12 Lê Lợi, Phường Bến Nghé, TP.HCM`.
- Mở cửa sổ trình duyệt riêng chưa có phiên đăng nhập/token của storefront.

## Test Data

| Field | Value |
|---|---|
| URL | `http://localhost:5173/profile` |
| Phiên người dùng | `Chưa đăng nhập` |

## Test Steps

1. Truy cập trực tiếp URL `/profile` trong cửa sổ riêng.
2. Quan sát nội dung và khả năng thao tác cập nhật hồ sơ.
3. Dùng API client với token A/B đã chuẩn bị để đọc lại và so sánh snapshot.

## Expected Result

- Không hiển thị hồ sơ riêng tư của A/B và không cho cập nhật khi chưa đăng nhập.
- Có thể yêu cầu đăng nhập hoặc điều hướng tới đăng nhập; không ấn định một cách điều hướng duy nhất.
- Hồ sơ A/B giữ nguyên.

## Status / Related Bugs

Not Run / None
