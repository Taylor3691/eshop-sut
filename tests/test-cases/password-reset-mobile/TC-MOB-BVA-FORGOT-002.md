# TC-MOB-BVA-FORGOT-002: Độ dài mã OTP ngay dưới ngưỡng triển khai mobile (length = 3)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).
- Mã OTP 4 chữ số hợp lệ đã được sinh trong CSDL (ví dụ: `"5984"`).

## Test Data

| Trường / Tham số | Giá trị                                                 |
| ---------------- | ------------------------------------------------------- |
| `resetToken`     | `"598"` (độ dài 3 chữ số, thiếu 1 ký tự so với mã 4 số) |
| `newPassword`    | `"Pass123@"`                                            |

## Test Steps

1. Nhập `"598"` vào ô nhập "Mã OTP (4 số)".
2. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
3. Nhấn nút "Đặt lại mật khẩu".
4. Kiểm tra phản hồi từ ứng dụng và API.

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu vì mã OTP không khớp với bản ghi trong CSDL.
- Ứng dụng hiển thị thông báo `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu cũ được giữ nguyên.

## Actual Result

OTP 3 số bị từ chối, vẫn ở Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Boundary Rationale

Kiểm tra giá trị ngay dưới biên độ dài của mã OTP thực tế triển khai trên ứng dụng di động (`4 - 1 = 3 chữ số`).

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
