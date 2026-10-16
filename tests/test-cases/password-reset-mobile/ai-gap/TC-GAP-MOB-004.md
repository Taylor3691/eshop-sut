# TC-GAP-MOB-004: Thiếu nút "Quay lại đăng nhập" trong biểu mẫu Bước 1 trên Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên Mobile App.

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Màn hình | Quên mật khẩu (Bước 1) |
| Thành phần kiểm tra | Nút bấm "Quay lại đăng nhập" |

## Test Steps

1. Quan sát toàn bộ khung biểu mẫu (`styles.formContainer`) tại Bước 1.
2. Tìm nút hoặc liên kết có chức năng đưa người dùng quay lại màn hình Đăng nhập.

## Expected Result

- Theo đặc tả FR-03: *"Có nút Quay lại đăng nhập"*.
- Biểu mẫu Bước 1 phải có nút cho phép người dùng quay lại `view === "login"` thuận tiện.

## Actual Result

Bước 1 chỉ có nút "Lấy mã OTP", không có nút quay lại đăng nhập

## Missing Scenario

Kiểm tra sự hiện diện của nút điều hướng quay về màn hình Đăng nhập ngay trong biểu mẫu của Bước 1.

## Gap Rationale

Trong mã nguồn `frontend-mobile/App.js:843-858`, Bước 1 chỉ có duy nhất ô nhập email và nút "Lấy mã OTP". Nút "← Quay lại" chỉ tồn tại ở Bước 2 và chỉ quay lại Bước 1, khiến người dùng ở Bước 1 không có lối thoát trực tiếp trên form để trở về Đăng nhập.

## Status / Related Bugs

FAIL / DEF-FR03-03 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
