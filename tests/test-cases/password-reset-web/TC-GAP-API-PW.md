# TC-GAP-API-PW: Bước 2: Gửi mật khẩu yếu trực tiếp đến API

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-WEB / Functional / AI Gap Analysis

## Preconditions

- Prepare the SUT and fixture state described in Test Data.
- If a required fixture or account state cannot be reproduced, record the case as blocked and resolve that gap before execution.

## Test Data

| Field | Recorded value / action |
|---|---|
| Scenario input | newPassword: "weak", token hợp lệ |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Bước 2: Gửi mật khẩu yếu trực tiếp đến API.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Backend từ chối mật khẩu không đủ độ mạnh

## Recorded Actual Result

Backend trả về HTTP 200; đổi thành công mật khẩu thành "weak"!

## Evidence

Recorded evidence in the source table: Đăng nhập bằng "weak" thành công: HTTP 200 { message: "Login successful" }.
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR03-06 ? see [source analysis](../../test-summary/FR-03-ai-gap-analysis.md).
