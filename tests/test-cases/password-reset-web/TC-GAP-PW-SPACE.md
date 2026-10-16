# TC-GAP-PW-SPACE: Bước 2: Nhập mật khẩu có khoảng trắng qua UI

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
| Scenario input | new_password: "Abc 1234" |

## Test Steps

1. Prepare only the state and values stated in Test Data; do not substitute values.
2. Perform the action described by the scenario: Bước 2: Nhập mật khẩu có khoảng trắng qua UI.
3. Observe the response, UI, or persisted state named in Expected Result.
4. Compare the observation with the requirement oracle and record evidence; restore fixture state before reusing it.

> The source AI-gap table preserves the scenario and input but not a separate click-by-click procedure. These steps make that recorded action reproducible without asserting an unrecorded execution sequence.

## Expected Result

Từ chối vì khoảng trắng không nằm trong {@,$,!,%,*,?,&}

## Recorded Actual Result

Regex của client chấp nhận Abc 1234 là mật khẩu mạnh!

## Evidence

Recorded evidence in the source table: regex.test("Abc 1234") === true.
No standalone screenshot was attached to this supplemental execution row.

## Status / Related Bugs

FAIL / DEF-FR03-05 ? see [source analysis](../../test-summary/FR-03-ai-gap-analysis.md).
