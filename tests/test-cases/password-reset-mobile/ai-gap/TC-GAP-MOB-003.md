# TC-GAP-MOB-003: Thiếu Chỉ báo bước ("Bước 1 / 2" và "Bước 2 / 2") trên giao diện Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng mở màn hình Quên mật khẩu trên Mobile App (`view === "forgotPassword"`).

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Màn hình Bước 1 | `forgotStep === 1` |
| Màn hình Bước 2 | `forgotStep === 2` |

## Test Steps

1. Mở màn hình Quên mật khẩu tại Bước 1 và quan sát vùng tiêu đề/nội dung.
2. Nhập email hợp lệ để chuyển sang Bước 2 và quan sát tiếp.
3. Kiểm tra xem có hiển thị văn bản hoặc thanh chỉ báo bước nào không (ví dụ: "Bước 1 / 2", "Bước 2 / 2").

## Expected Result

- Theo đặc tả FR-03 và FR-22: *"Giao diện phải hiển thị chỉ báo bước (Step Indicator) — ví dụ: 'Bước 1 / 2'"*.
- Giao diện phải cung cấp chỉ báo rõ ràng để người dùng biết quy trình gồm 2 bước và vị trí hiện tại.

## Actual Result

Không có bất kỳ chỉ báo bước nào xuất hiện trên cả 2 bước

## Missing Scenario

Kiểm tra sự hiện diện của thành phần Chỉ báo bước (Step Indicator) trực quan trên cả hai bước của giao diện Quên mật khẩu trên ứng dụng di động.

## Gap Rationale

AI tập trung chủ yếu vào các kịch bản kiểm thử dữ liệu nghiệp vụ (Data Validation) mà bỏ sót kiểm thử thành phần giao diện tĩnh (GUI Indicator) theo yêu cầu bắt buộc của tài liệu SRS.

## Status / Related Bugs

FAIL / DEF-FR03-04 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
