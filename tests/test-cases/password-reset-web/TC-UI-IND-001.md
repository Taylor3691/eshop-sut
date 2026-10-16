# TC-UI-IND-001: Bước 1 & 2: Hiển thị Chỉ báo bước

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
| Scenario input | Xem giao diện Bước 1 và Bước 2 |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Bước 1 & 2: Hiển thị Chỉ báo bước.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Hiển thị "Bước 1 / 2" / "Step 1/2"

## Recorded Actual Result

Không có chỉ báo bước nào được render

## Evidence

Recorded evidence in the source table: Kiểm tra ForgotPassword.jsx; không có văn bản chỉ báo bước.
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR03-04 ? see [source analysis](../../test-summary/FR-03-ai-gap-analysis.md).
