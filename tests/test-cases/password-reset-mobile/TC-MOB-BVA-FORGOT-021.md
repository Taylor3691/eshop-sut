# TC-MOB-BVA-FORGOT-021: Độ dài chuỗi email dưới biên tối thiểu tại Bước 1 (length = 0, chuỗi rỗng)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1 (`forgotStep === 1`).

## Test Data

| Trường / Tham số | Giá trị                          |
| ---------------- | -------------------------------- |
| `forgotEmail`    | `""` (chuỗi rỗng, độ dài bằng 0) |

## Test Steps

1. Để trống ô nhập "Nhập Email của bạn".
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi của ứng dụng.

## Expected Result

- Hệ thống từ chối xử lý chuỗi rỗng (HTTP 404 User not found hoặc chặn tại client).
- Hiển thị Alert cảnh báo lỗi; giữ nguyên giao diện Bước 1, không chuyển sang Bước 2.

## Actual Result

Email rỗng bị từ chối, vẫn ở Bước 1.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-007.png)

## Boundary Rationale

Kiểm tra tại điểm biên cực tiểu của trường email (`length = 0`), thuộc miền dữ liệu không hợp lệ.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
