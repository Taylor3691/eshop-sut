# TC-GAP-COUPON-012: Phân biệt hoa thường: Gửi mã chữ thường save10 trực tiếp đến API

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
| Scenario input | code: "save10", total_amount: 400000, user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Phân biệt hoa thường: Gửi mã chữ thường save10 trực tiếp đến API.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Chấp nhận nếu chuẩn hóa hoa thường, hoặc từ chối rõ ràng

## Recorded Actual Result

HTTP 404; "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"

## Evidence

Recorded evidence in the source table: SQLite truy vấn phân biệt chính xác ký tự hoa thường WHERE code = ?..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS (Hiện trạng) / DEF-FR09-07 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
