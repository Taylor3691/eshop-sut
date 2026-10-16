# TC-GAP-COUPON-011: Kiểm tra điều kiện C2: Áp dụng mã hết hạn EXPIRED

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
| Scenario input | code: "EXPIRED", total_amount: 200000, user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Kiểm tra điều kiện C2: Áp dụng mã hết hạn EXPIRED.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối vì mã đã hết hạn sử dụng (expired_at: 2020-01-01)

## Recorded Actual Result

HTTP 400; "Mã giảm giá đã hết hạn"

## Evidence

Recorded evidence in the source table: Kiểm tra expiry < now từ chối mã hết hạn chính xác..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS / None ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
