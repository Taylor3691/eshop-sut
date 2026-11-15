# Automation preflight — **SIMULATED / machine-only**

This note records Playwright harness setup, not a pilot with a person. No participant, think-aloud, consent, interview, or questionnaire was involved.

## Attempts and correction

1. Initial harness navigated directly to `/cart`. The SPA reload cleared its in-memory cart, so the checkout locator timed out. This was a test-script defect, not a product-flow failure.
2. Harness then clicked checkout but initially could not find the expected label because the rendered Vietnamese text was malformed and selectors were brittle.
3. The script was corrected to use SPA navigation and stable control selectors. The final seven runs each passed login, cart, coupon, checkout, order verification, and logout checkpoints.

## Outcome

The rehearsal improved the automation script and established a repeatable Chromium flow. It is **not** the HW03 pilot usability session: the required real-person pilot remains outstanding. Do not cite this note as participant research.
