# TC-BVA-OTP-004: Bước 2: Từ chối mã OTP không đúng

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / BVA

## Preconditions

- Prepare the SUT and fixture state described in Test Data.
- If a required fixture or account state cannot be reproduced, record the case as blocked and resolve that gap before execution.

## Test Data

| Field | Recorded value / action |
|---|---|
| Scenario input | otp: "999999", email: "admin@eshop.com" |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Bước 2: Từ chối mã OTP không đúng.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Báo lỗi; mật khẩu không thay đổi

## Recorded Actual Result

HTTP 400 { error: "Invalid token or email" }

## Evidence

Recorded evidence in the source table: API trả về HTTP 400.
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

PASS / None ? see [source analysis](../../test-summary/FR-03-ai-gap-analysis.md).
