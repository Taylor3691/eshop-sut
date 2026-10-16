# TC-GAP-COUPON-010: Áp dụng mã giảm giá cố định BIGBUY hợp lệ (đơn 600k)

## Requirement ID

FR-09

## Module / Test Type / Technique

COUPONS / Functional / AI Gap Analysis

## Preconditions

- Prepare the SUT and fixture state described in Test Data.
- If a required fixture or account state cannot be reproduced, record the case as blocked and resolve that gap before execution.

## Test Data

| Field | Recorded value / action |
|---|---|
| Scenario input | code: "BIGBUY", total_amount: 600000, user_id: 1 (lần đầu) |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Áp dụng mã giảm giá cố định BIGBUY hợp lệ (đơn 600k).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Áp dụng thành công; giảm 50,000 ₫; thanh toán 550,000 ₫

## Recorded Actual Result

HTTP 200; discount_amount: 50000; final_amount: 550000

## Evidence

Recorded evidence in the source table: Phép tính mã fixed hoạt động đúng khi đơn hàng lớn hơn ngưỡng..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS / None ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
