# TC-FR-08-CHECKOUT-002: Chặn checkout khi chưa đăng nhập

## Requirement ID

FR-08.1

## Module / Test Type / Technique

CHECKOUT / Functional / Equivalence Partitioning

## Preconditions

- Có tài khoản thử nghiệm chưa đăng nhập.
- Có dữ liệu cart của tài khoản nếu UI cho phép chuẩn bị trước khi logout; nếu không, gửi request checkout không có token.
- Ghi nhận số lượng đơn trước khi thử.

## Test Data

| Field | Value |
|---|---|
| Authentication | Chưa đăng nhập / không gửi token |
| Checkout request | `POST /api/checkout` |

## Test Steps

1. Đảm bảo phiên đăng nhập đã kết thúc.
2. Mở luồng checkout trên UI hoặc gửi request checkout không có Authorization token.
3. Quan sát thông báo/response và kiểm tra không có đơn mới được tạo.

## Expected Result

- Hệ thống từ chối checkout khi chưa đăng nhập.
- Không tạo đơn mới.

## Status / Related Bugs

Not Run / None
