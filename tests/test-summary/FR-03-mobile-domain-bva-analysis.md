# FR-03 Mobile — Domain Testing and Boundary Value Analysis

## 1. Requirement analysis

- **Requirement:** FR-03, forgot password and password reset; password policy references FR-01.
- **Module:** Mobile account recovery.
- **Rules used as the oracle:** registered email requests a six-digit OTP; the demo displays it; reset requires the OTP, a password of at least eight characters with the specified character groups, and matching confirmation; the flow has two steps and a way back to login.
- **Precondition:** A registered account can request an OTP.
- **Observable results:** form controls and step navigation, OTP/reset responses, password change, and subsequent login.
- **Ambiguities:** no maximum password length, OTP expiry, or retry limit is specified. The six-digit requirement differs from the four-digit implementation observed during execution; the requirement remains the oracle.

## 2. Domain analysis and equivalence partitions

| Input / behavior | Valid partition | Invalid partition(s) | Existing case coverage |
|---|---|---|---|
| Email | Registered, syntactically valid email | Unknown, malformed, empty, whitespace-wrapped, or case-variant email | `TC-MOB-FORGOT-004`, `006`–`010`; `TC-MOB-BVA-FORGOT-021`–`024` |
| OTP | Six numeric digits associated with the requesting email | Empty, nonnumeric, wrong, wrong length, reused, or associated with another email | `TC-MOB-FORGOT-016`–`019`; `TC-MOB-BVA-FORGOT-001`–`006`, `024`–`025`; `TC-GAP-MOB-007`–`008` |
| New password | Length >= 8 with uppercase, lowercase, digit, and an allowed special character | Empty/short, missing a required character group, or using an unlisted special character | `TC-MOB-FORGOT-020`–`028`; `TC-MOB-BVA-FORGOT-007`–`018`; `TC-GAP-MOB-006` |
| Confirmation | Exact match to new password | Missing or nonmatching value | `TC-MOB-BVA-FORGOT-019`–`020`; `TC-MOB-FORGOT-013`; `TC-GAP-MOB-002` |
| Workflow/UI | Both steps, demo OTP, and navigation are available | Missing step indicator, OTP display, or step-one return control | `TC-MOB-FORGOT-002`–`005`, `011`–`014`; `TC-GAP-MOB-001`, `003`, `004`, `008` |

These classes follow the FR-03 rules and the existing suite's recorded scope. A case-variant email was retained as a distinct representative because the current test records an observed difference; the requirement does not explicitly define case normalization.

## 3. Boundary analysis and values

| Variable | Specified boundary | Values covered by existing cases | Notes |
|---|---|---|---|
| OTP length | Exactly 6 digits | 5, 6, and 7 digits in `TC-MOB-BVA-FORGOT-004`–`006`; implementation-specific 3/4 digit checks in `002`–`003` | The implementation boundary is evidence of behavior, not the specification boundary. |
| Password length | Minimum 8; no maximum specified | 7, 8, and 9 characters in `TC-MOB-BVA-FORGOT-008`–`010` | Upper-bound BVA cannot be derived from the requirement. |
| Required password character counts | At least one uppercase, lowercase, digit, and allowed special character | Count 0 and count 1 for each group in `TC-MOB-BVA-FORGOT-011`–`018` | These are ordered counts with explicit minimum 1. |
| Password match | Exact equality | Match and one-character mismatch in `TC-MOB-BVA-FORGOT-019`–`020` | The confirmation field is missing in the observed UI, so the intended input cannot be entered there. |

## 4. Design and coverage review

The existing cases move from requirement rules to valid/invalid classes, then exercise the explicit password and OTP boundaries. Cross-variable coverage includes OTP/email association, password confirmation, and a successful reset followed by login. The suite also checks mobile UI requirements separately from backend responses.

- **Core Domain/BVA cases:** 55 (30 Domain, 25 BVA).
- **Recorded AI-gap cases:** 10 additional `TC-GAP-MOB-*` IDs; their results are indexed in [FR-03 mobile AI-gap analysis](FR-03-mobile-ai-gap-analysis.md).
- **Coverage gaps:** maximum password length, OTP expiry/retry limits, and behavior on native devices are not established by the requirement or current Expo web-renderer execution.
- **Human review required:** verify the interpretation of email case normalization, confirm mobile-specific execution environment limits, and review every expected result against FR-03/FR-01.

## 5. AI-gap candidates

The recorded gap analysis identified OTP visibility, API-side password strength validation, accepted special-character set, loading/double-submit behavior, and error-message handling. These are linked to recorded cases in the AI-gap report; missing screenshot evidence is called out in the associated bug records rather than reconstructed here.
