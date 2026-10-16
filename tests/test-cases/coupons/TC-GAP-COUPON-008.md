# TC-GAP-COUPON-008: Lách luật giới hạn lượt dùng C5 bằng cách bỏ trống user_id

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
| Scenario input | User 1 đã dùng BIGBUY 1/1 lần; gửi lại request không có user_id |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Lách luật giới hạn lượt dùng C5 bằng cách bỏ trống user_id.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối vì đã hết lượt dùng quy định (C5)

## Recorded Actual Result

HTTP 200; Áp dụng thành công mã lần thứ 2 mà không bị chặn

## Evidence

Recorded evidence in the source table: Nhánh else dòng 416 trong server.js cho phép dùng mã vô hạn lần khi thiếu user_id..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-04 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
