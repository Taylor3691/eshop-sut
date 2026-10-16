# FR-09 — Domain Testing and Boundary Value Analysis

## 1. Requirement analysis

- **Requirement:** FR-09, discount coupons; checkout integrity also references FR-08.
- **Module:** Coupon application and checkout.
- **Rules used as the oracle:** coupon exists and is active, has not expired, meets the specified minimum order, is used by an authenticated user, respects per-user usage limits, and computes the specified discount/final amount.
- **Preconditions:** A cart/order total, coupon fixture, and user state appropriate to the case.
- **Observable results:** acceptance/rejection, response message, discount amount, final amount, and recorded usage.
- **Ambiguities:** the requirement does not fully define coupon-code normalization, the exact equality behavior at every date/time boundary, or the transaction mechanism for recording use. Do not treat an assumed REST/API convention as an explicit business rule.

## 2. Domain analysis and equivalence partitions

| Input | Valid partitions | Invalid partitions | Existing cases |
|---|---|---|---|
| Coupon code/state | Existing and active | Unknown or inactive | `TC-COUPON-006`–`007`, `TC-BVA-COUPON-017`–`018` |
| Expiry | Current time is before expiry | Current time is after expiry | `TC-COUPON-008`, `TC-BVA-COUPON-013`–`014` |
| Order amount vs. minimum | Meets or exceeds coupon minimum | Below minimum | `TC-COUPON-004`–`005`; `TC-BVA-COUPON-001`–`006` |
| Discount type | Percent and fixed amount | Unsupported/invalid type (not specified in these cases) | `TC-COUPON-001`–`002`, `014`–`016` |
| User/usage | Authenticated user below limit | Unauthenticated or at/over the per-user limit | `TC-COUPON-009`–`011`; `TC-BVA-COUPON-007`–`012` |
| Checkout result | Correctly calculated and recorded total/usage | Tampered total or checkout/usage inconsistency | `TC-COUPON-017`–`020`; `TC-GAP-COUPON-014`–`015` |

Representatives were taken from the existing suite fixtures (`SAVE10`, `BIGBUY`, `VIP100`, and the recorded totals). Coupon-code lower/upper-case and surrounding-space behavior is reported as an observation in the gap analysis; normalization is not assumed to be mandatory unless the requirement confirms it.

## 3. Boundary analysis and values

| Variable | Explicit threshold | Existing BVA values | Coverage note |
|---|---|---|---|
| Order total for `SAVE10` | Minimum 300,000 | 299,999; 300,000; 300,001 | Below, exact, and above threshold. |
| Order total for `BIGBUY` | Minimum 500,000 | 499,999; 500,000; 500,001 | Below, exact, and above threshold. |
| Usage count | Maximum 1 or 2 for selected fixtures | One below, at, and one above each maximum | `TC-BVA-COUPON-007`–`012`. |
| Final payable amount | Zero is an explicitly tested arithmetic boundary | 0 and 1 | Does not establish that the business permits a zero-value checkout; confirm that rule. |
| Expiry date/time | Expired vs. unexpired | Before and after expiry | Exact equality and timezone behavior are not sufficiently established. |

## 4. Design and coverage review

Cases first partition coupon validity conditions and discount types, then combine conditions for normal, invalid, and multiple-condition scenarios. BVA cases use threshold-minus-one, threshold, and threshold-plus-one where a numeric minimum is specified; counts and final amounts receive their own boundary cases. Checkout integrity and coupon-use recording are examined as cross-feature interactions.

- **Core Domain/BVA cases:** 38 (20 Domain, 18 BVA).
- **Recorded AI-gap cases:** 15 additional `TC-GAP-COUPON-*` IDs, documented in [FR-09 AI-gap analysis](FR-09-ai-gap-analysis.md).
- **Coverage gaps:** exact expiry equality/timezone, concurrent use, and additional cart mutation sequences need an explicit oracle and execution plan before being called covered.
- **Human review required:** confirm the requirement's exact use-limit, zero-payable, input-normalization, authentication, and checkout-integrity rules against README/API specification.

## 5. AI-gap candidates

The gap analysis records percentage calculation, minimum threshold, missing authentication/user binding, use-limit bypass when `user_id` is omitted, checkout amount tampering, and decoupled usage recording. Results are included in the aggregate only once per test ID; the evidence form is described in each gap row and bug report.
