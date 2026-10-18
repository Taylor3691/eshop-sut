# TC-FR-08-CHECKOUT-008: Thăm dò checkout với giỏ hàng rỗng

## Requirement ID

FR-08 — Ambiguity cần làm rõ

## Module / Test Type / Technique

CHECKOUT / Exploratory / State Partition

## Preconditions

- Đăng nhập bằng tài khoản thử nghiệm.
- Xác nhận giỏ hàng đang rỗng.
- Ghi nhận số lượng đơn trước khi thử.

## Test Data

| Field | Value |
|---|---|
| Cart | Rỗng |
| Expected outcome | Chưa được FR-08 quy định |

## Test Steps

1. Mở trang checkout khi giỏ rỗng hoặc gửi request checkout theo contract hiện hành.
2. Ghi nhận phản hồi, thông báo, đơn phát sinh và trạng thái giỏ hàng.
3. Không kết luận Pass/Fail cho đến khi chủ yêu cầu chốt expected behavior.

## Expected Result

- Chưa xác định trong README; ghi nhận actual để làm rõ yêu cầu.

## Status / Related Bugs

Not Run / None
