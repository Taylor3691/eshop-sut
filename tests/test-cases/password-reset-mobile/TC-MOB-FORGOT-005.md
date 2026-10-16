# TC-MOB-FORGOT-005: Kiểm tra hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo theo đặc tả FR-03

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng thực hiện yêu cầu OTP thành công cho email `test@eshop.com` trên ứng dụng mobile.
- Hệ thống hoạt động trong môi trường học tập / demo.

## Test Data

| Trường / Tham số | Giá trị            |
| ---------------- | ------------------ |
| `forgotEmail`    | `"test@eshop.com"` |
| Môi trường       | Demo / Testing     |

## Test Steps

1. Nhập `test@eshop.com` và nhấn "Lấy mã OTP".
2. Ứng dụng chuyển sang Bước 2.
3. Quan sát nội dung thông báo và các vùng hiển thị trên màn hình Bước 2.

## Expected Result

- Theo đặc tả FR-03: "trong môi trường demo: hiển thị trực tiếp trên màn hình" (nhằm phục vụ việc kiểm thử mà không cần máy chủ SMTP gửi mail thực tế).
- Mã OTP tạo ra phải được hiển thị trực tiếp trên giao diện để người dùng/tester có thể lấy và nhập vào ô OTP ở Bước 2.

## Actual Result

Không hiển thị giá trị OTP trên màn hình.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử sự tuân thủ đặc tả nghiệp vụ môi trường demo (Demo Environment Specification Oracle) giữa yêu cầu hiển thị OTP và thông báo thực tế của ứng dụng di động.

## Status / Related Bugs

FAIL / D-FR03-MOB-003 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
