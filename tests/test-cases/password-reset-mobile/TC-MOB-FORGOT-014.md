# TC-MOB-FORGOT-014: Kiểm tra nhãn và quy cách mã OTP tại Bước 2 giữa đặc tả (6 chữ số) và ứng dụng di động (4 chữ số)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / Domain Testing

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 trên Mobile App.

## Test Data

| Trường / Thao tác            | Giá trị             |
| ---------------------------- | ------------------- |
| Nhãn trường OTP trên UI      | "Mã OTP (4 số)"     |
| Độ dài OTP theo đặc tả FR-03 | 6 chữ số ngẫu nhiên |

## Test Steps

1. Quan sát nhãn của trường nhập mã OTP tại Bước 2 trên ứng dụng di động.
2. Kiểm tra thuộc tính bàn phím (`keyboardType="numeric"`).
3. So sánh quy cách số lượng ký tự OTP được yêu cầu giữa UI thực tế và tài liệu `README.md`.

## Expected Result

- Theo đặc tả FR-03: Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên.
- Quan sát và ghi nhận sự sai lệch nếu giao diện hiển thị nhãn "Mã OTP (4 số)" và backend chỉ sinh mã 4 chữ số.

## Actual Result

UI và backend dùng OTP 4 số thay vì 6 số.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Coverage Rationale

Kiểm thử đối chiếu đặc tả (Specification vs Implementation Oracle) về định dạng và độ dài của mã OTP xác thực.

## Status / Related Bugs

FAIL / D-FR03-MOB-003 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
