# TC-MOB-BVA-FORGOT-001: Độ dài mã OTP dưới biên tối thiểu (length = 0, chuỗi rỗng)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`) trên ứng dụng mobile.

## Test Data

| Trường / Tham số | Giá trị                    |
| ---------------- | -------------------------- |
| `resetToken`     | `""` (độ dài chuỗi bằng 0) |
| `newPassword`    | `"Pass123@"`               |

## Test Steps

1. Yêu cầu mã OTP tại Bước 1 để chuyển sang Bước 2.
2. Để trống ô nhập "Mã OTP (4 số)".
3. Nhập mật khẩu mới hợp lệ `"Pass123@"`.
4. Nhấn nút "Đặt lại mật khẩu".
5. Quan sát phản hồi của ứng dụng.

## Expected Result

- Hệ thống từ chối thực hiện yêu cầu do mã OTP chưa được nhập (độ dài bằng 0).
- Hiển thị thông báo lỗi: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Không cập nhật mật khẩu trong cơ sở dữ liệu.

## Actual Result

OTP rỗng bị từ chối, vẫn ở Bước 2.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-BVA-FORGOT-001.png)

## Boundary Rationale

Kiểm tra giá trị biên dưới mức tối thiểu của trường mã OTP (`length = 0`), thuộc miền giá trị không hợp lệ của chuỗi xác thực.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
