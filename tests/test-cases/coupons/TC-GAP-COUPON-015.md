# TC-GAP-COUPON-015: Can thiệp giá trị thanh toán: Gửi total_amount tùy tiện đến /api/checkout

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
| Scenario input | Gửi payload { total_amount: 1, shipping_address: "HN" } |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Can thiệp giá trị thanh toán: Gửi total_amount tùy tiện đến /api/checkout.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Backend tự tính lại tiền đơn hàng và từ chối giá trị giả mạo

## Recorded Actual Result

HTTP 200; Tạo đơn hàng với tổng tiền chỉ 1 ₫

## Evidence

Recorded evidence in the source table: Vi phạm nguyên tắc bảo mật thanh toán FR-08 & FR-09..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-05 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
