# TC-GAP-COUPON-005: Kiểm tra biên tại đúng ngưỡng tối thiểu BIGBUY (total == 500,000)

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
| Scenario input | code: "BIGBUY", total_amount: 500000, user_id: 1 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Kiểm tra biên tại đúng ngưỡng tối thiểu BIGBUY (total == 500,000).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Chấp nhận mã vì thỏa mãn C3: 500k >= 500k; giảm 50,000 ₫

## Recorded Actual Result

HTTP 400; Báo lỗi: *"Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này"*

## Evidence

Recorded evidence in the source table: Lỗi toán tử so sánh > loại bỏ giá trị tại đúng ngưỡng biên 500,000 ₫..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-02 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
