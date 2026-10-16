# TC-MOB-BVA-FORGOT-020: Độ lệch so khớp Xác nhận mật khẩu ngay trên biên khớp (distance = 1)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số  | Giá trị                                                                         |
| ----------------- | ------------------------------------------------------------------------------- |
| `newPassword`     | `"Pass123@"`                                                                    |
| `confirmPassword` | `"Pass123!"` (lệch đúng 1 ký tự tại vị trí cuối cùng, Levenshtein distance = 1) |

## Test Steps

1. Kiểm tra logic xác thực so khớp mật khẩu trên ứng dụng mobile.
2. Nhập hai mật khẩu lệch nhau đúng 1 ký tự.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Theo đặc tả FR-03/FR-01: Hệ thống phải từ chối khi hai trường mật khẩu không khớp (`distance >= 1`) và hiển thị thông báo lỗi phù hợp.
- Ghi nhận việc giao diện thiếu trường `confirmPassword` khiến ứng dụng bỏ qua bước kiểm tra độ lệch này.

## Actual Result

Không có trường confirm-password nên không kiểm tra được trường hợp lệch.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Boundary Rationale

Kiểm tra tại điểm biên ngay trên ngưỡng sai lệch tối thiểu (`distance = 1`), thuộc miền không hợp lệ của quy tắc xác nhận mật khẩu.

## Status / Related Bugs

FAIL / D-FR03-MOB-004 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
