# TC-GAP-COUPON-007: Giả mạo user_id trong body request (IDOR Vulnerability)

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
| Scenario input | code: "BIGBUY", total_amount: 600000, user_id: 8888 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Giả mạo user_id trong body request (IDOR Vulnerability).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối hoặc lấy ID từ token xác thực

## Recorded Actual Result

HTTP 200; Chấp nhận user_id: 8888 tùy tiện mà không đối chiếu với token

## Evidence

Recorded evidence in the source table: Server tin tưởng tham số user_id do client gửi lên mà không xác minh quyền sở hữu..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-03 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
