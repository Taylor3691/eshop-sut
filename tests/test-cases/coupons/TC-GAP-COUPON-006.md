# TC-GAP-COUPON-006: Kiểm tra điều kiện C4: Gọi API khi chưa đăng nhập (Không token, không user_id)

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
| Scenario input | code: "BIGBUY", total_amount: 600000 (Không gửi token, không user_id) |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Kiểm tra điều kiện C4: Gọi API khi chưa đăng nhập (Không token, không user_id).
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối yêu cầu; yêu cầu đăng nhập (HTTP 401 Unauthorized)

## Recorded Actual Result

HTTP 200; Áp dụng mã thành công: giảm 50,000 ₫; thanh toán 550,000 ₫

## Evidence

Recorded evidence in the source table: API /api/apply-coupon không có middleware authenticateToken, cho phép khách vãng lai áp dụng mã..
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR09-03 ? see [source analysis](../../test-summary/FR-09-ai-gap-analysis.md).
