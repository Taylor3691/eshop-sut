# TC-GAP-COUPON-009: Từ chối mã đã dùng hết lượt khi có gửi user_id chính xác

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
| Scenario input | User 1 đã dùng BIGBUY 1/1 lần; gửi request có user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Từ chối mã đã dùng hết lượt khi có gửi user_id chính xác.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối với thông báo đã đạt giới hạn sử dụng

## Recorded Actual Result

HTTP 400; "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)"

## Evidence

Recorded evidence in the source table: Câu lệnh SELECT COUNT(*) FROM coupon_usage hoạt động chuẩn khi có user_id..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS / None ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
