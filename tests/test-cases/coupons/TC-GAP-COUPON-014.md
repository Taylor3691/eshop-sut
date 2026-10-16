# TC-GAP-COUPON-014: Tách rời thanh toán: Đặt hàng thành công nhưng không ghi nhận lượt dùng coupon

## Requirement ID

FR-08; FR-09

## Module / Test Type / Technique

COUPONS / Functional / AI Gap Analysis

## Preconditions

- Prepare the SUT and fixture state described in Test Data.
- If a required fixture or account state cannot be reproduced, record the case as blocked and resolve that gap before execution.

## Test Data

| Field | Recorded value / action |
|---|---|
| Scenario input | Gọi /api/checkout với total_amount: 1 nhưng không gọi /api/coupon-usage |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Tách rời thanh toán: Đặt hàng thành công nhưng không ghi nhận lượt dùng coupon.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Backend phải tự động trừ lượt dùng mã trong cùng transaction đặt hàng

## Recorded Actual Result

HTTP 200; Đặt hàng thành công; CSDL coupon_usage không tăng thêm bản ghi nào

## Evidence

Recorded evidence in the source table: /api/checkout hoàn toàn không quản lý coupon; việc lưu lượt dùng phó mặc cho frontend..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-05 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
