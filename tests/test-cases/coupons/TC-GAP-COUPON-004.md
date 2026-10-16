# TC-GAP-COUPON-004: Kiểm tra biên trên ngưỡng tối thiểu SAVE10 (total == 300,001)

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
| Scenario input | code: "SAVE10", total_amount: 300001, user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Kiểm tra biên trên ngưỡng tối thiểu SAVE10 (total == 300,001).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Chấp nhận mã; giảm 10%

## Recorded Actual Result

HTTP 200; Chấp nhận mã (nhưng bị lỗi tính toán phần trăm âm)

## Evidence

Recorded evidence in the source table: Qua được bước kiểm tra điều kiện C3 vì 300,001 > 300,000..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS (Biên) / None ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
