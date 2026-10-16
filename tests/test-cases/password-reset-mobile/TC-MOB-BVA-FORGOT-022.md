# TC-MOB-BVA-FORGOT-022: Độ dài email sau khi loại bỏ khoảng trắng dưới biên tối thiểu (trimmed_length = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Test Data

| Trường / Tham số | Giá trị                              |
| ---------------- | ------------------------------------ |
| `forgotEmail`    | `"   "` (chuỗi 3 ký tự khoảng trắng) |

## Test Steps

1. Nhập 3 ký tự khoảng trắng vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát cách xử lý của ứng dụng.

## Expected Result

- Hệ thống coi chuỗi toàn khoảng trắng là rỗng (`trimmed_length = 0`) và từ chối gửi mã OTP.
- Hiển thị thông báo lỗi; không chuyển sang Bước 2.

## Actual Result

Email chỉ có khoảng trắng bị từ chối, vẫn ở Bước 1.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-007.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới của chuỗi email sau khi loại bỏ khoảng trắng (`trimmed_length = 0`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
