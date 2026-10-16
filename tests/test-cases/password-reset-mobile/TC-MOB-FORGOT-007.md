# TC-MOB-FORGOT-007: Yêu cầu mã OTP khi để trống ô nhập email (Chuỗi rỗng "")

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên ứng dụng di động.

## Test Data

| Trường / Tham số | Giá trị                                 |
| ---------------- | --------------------------------------- |
| `forgotEmail`    | `""` (chuỗi rỗng, không nhập ký tự nào) |

## Test Steps

1. Để trống ô nhập "Nhập Email của bạn" (hoặc xóa sạch nội dung).
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi của ứng dụng di động.

## Expected Result

- Ứng dụng hiển thị thông báo lỗi yêu cầu nhập email trước khi gửi hoặc server từ chối yêu cầu (HTTP 404 User not found).
- Ứng dụng không chuyển sang Bước 2 và không làm ứng dụng bị treo (crash).

## Actual Result

Email rỗng bị từ chối, vẫn ở Bước 1; native alert không quan sát được.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-007.png)

## Coverage Rationale

Kiểm thử giá trị rỗng / biên dưới (Empty Input Boundary / Missing Required Field) của trường email đầu vào.

## Status / Related Bugs

BLOCKED / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
