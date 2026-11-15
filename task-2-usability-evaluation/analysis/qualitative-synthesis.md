# Consolidated qualitative synthesis — **SIMULATED DATA**

> The behavioral narratives and interview text are invented, not observed. Separate factual browser results from hypothetical persona scenarios below.

## Automated outcomes (directly observed)

All seven Playwright runs passed Login, Cart, Apply Coupon, Checkout, Verify Order, and Logout. These results establish scripted UI-flow execution only.

## Hypothetical persona pain points (invented)

| Theme | Personas | Synthetic pattern | Priority |
|---|---|---|---|
| Label comprehension | P01, P03 | Registration-like heading, malformed words, uncertainty over form meaning | High |
| Price confidence | P01, P04, P07 | Rechecking coupon math and concern about editable checkout amount | High |
| Error recovery | P03, P06 | Hypothetical mistyped coupon and need for actionable feedback | Medium |
| Navigation state | P02, P05 | Looking for coupon and cart-count cues | Medium |
| Completion confidence | P06, P07 | Need clear confirmation and explicit logout label | Medium |

Frequencies in this table describe authored scenarios and are not prevalence estimates.

## Browser-visible defects (factual observations)

| Finding | Severity | Evidence / requirement |
|---|---|---|
| Malformed Vietnamese text across several screens | High | BUG-SIM-001; screenshots; FR-21 |
| Misleading login heading/labels and plain-text password field | High | BUG-SIM-002; login screenshot; FR-02, FR-22 |
| Checkout total is editable | Medium | checkout screenshot; FR-08 says total is calculated automatically |

## Recommendations

1. Correct UTF-8 rendering and review every visible label in Vietnamese.
2. Correct login title, field labels, email/password input types, and localized action text.
3. Calculate authoritative totals server-side and display a read-only breakdown including coupon savings.
4. Make coupon validation errors actionable; show cart count, order number/status, and an explicit “Đăng xuất” control.
5. Validate these priorities with real participants before treating persona frequency or SUS as evidence.

## SUS

Scores appear in `sus-scoring.md`; they are generated from fictional response vectors. No empirical mean, usability grade, or confidence interval is available.
