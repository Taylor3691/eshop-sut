# TC-GAP-MOB-009: Thiếu trạng thái Loading và khóa nút bấm chống gửi trùng lặp (Double Submit) trên Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu trên Mobile App.

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Thao tác tương tác | Nhấn liên tiếp 2-3 lần vào nút "Lấy mã OTP" hoặc "Đặt lại mật khẩu" |

## Test Steps

1. Nhập email hợp lệ tại Bước 1.
2. Nhấn nút "Lấy mã OTP" nhanh 2-3 lần liên tiếp.
3. Kiểm tra số lượng request gửi đi trên mạng và trạng thái nút bấm.

## Expected Result

- Nút bấm phải có trạng thái loading, hiển thị biểu tượng quay vòng hoặc đổi nhãn (ví dụ: "Đang gửi...").
- Thuộc tính `disabled` phải được kích hoạt để chặn người dùng nhấn nhiều lần gây gửi trùng request hoặc sinh mã OTP liên tục.

## Actual Result

Không có cờ loading, không có disabled; nút nhận nhấn liên tục

## Missing Scenario

Kiểm tra hành vi của giao diện Mobile khi người dùng nhấn liên tiếp nhiều lần vào nút "Lấy mã OTP" hoặc "Đặt lại mật khẩu" trong khi request đang được xử lý.

## Gap Rationale

Trong khi màn hình Checkout và Coupon trên Mobile có cờ `checkoutLoading` và `applyingCoupon`, màn hình Quên mật khẩu trong `frontend-mobile/App.js:242-284` hoàn toàn thiếu cơ chế quản lý trạng thái loading và khóa nút bấm.

## Status / Related Bugs

FAIL / DEF-FR03-10 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
