# TC-GAP-COUPON-001: Tính toán giảm giá phần trăm với mã SAVE10 (đơn 500k)

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
| Scenario input | code: "SAVE10", total_amount: 500000, user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Tính toán giảm giá phần trăm với mã SAVE10 (đơn 500k).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Áp dụng thành công; giảm 10% = 50,000 ₫; thanh toán = 450,000 ₫

## Recorded Actual Result

HTTP 200; discount_amount: -4500000; final_amount: 5000000

## Evidence

Recorded evidence in the source table: Payload API: {"discount_amount":-4500000,"final_amount":5000000}. Khách hàng bị đội giá gấp 10 lần..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-01 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
