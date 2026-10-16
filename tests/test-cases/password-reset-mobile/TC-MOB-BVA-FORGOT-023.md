# TC-MOB-BVA-FORGOT-023: Email hợp lệ bọc bởi khoảng trắng ở hai đầu (Trim boundary)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ trong CSDL.
- Người dùng đang ở màn hình Bước 1.

## Test Data

| Trường / Tham số | Giá trị                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| `forgotEmail`    | `" test@eshop.com "` (email hợp lệ có 1 dấu cách ở đầu và 1 dấu cách ở cuối) |

## Test Steps

1. Nhập `" test@eshop.com "` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát xem hệ thống có tự động cắt khoảng trắng để tìm thấy tài khoản hay không.

## Expected Result

- Nếu hệ thống tự động trim: Tìm thấy tài khoản `test@eshop.com` và chuyển sang Bước 2.
- Nếu hệ thống không trim: Server trả về 404 User not found, ứng dụng hiển thị Alert lỗi an toàn mà không bị crash.

## Actual Result

Email có khoảng trắng đầu/cuối không trim, vẫn ở Bước 1.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-009.png)

## Boundary Rationale

Kiểm tra tại điểm biên khoảng trắng đầu/cuối của chuỗi email hợp lệ (Whitespace Padding Boundary).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
