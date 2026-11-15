# BUG-SIM-001 — Vietnamese interface text renders as mojibake

- **Status:** SIMULATED automated observation; not a human-reported defect
- **Severity:** High
- **Area:** Login, cart, checkout, navigation
- **Requirements:** FR-21, FR-22, FR-23
- **Reproduction:** Run `evidence/simulated-runs/run-flow.cjs`; inspect the captured P01 screenshots.
- **Expected:** Vietnamese labels and messages render as readable Vietnamese.
- **Actual:** Multiple labels/headings render as mojibake, reducing readability and making interface meaning unclear.
- **Evidence:** `../evidence/screenshots/P01-01-login-home.png`, `P01-02-cart.png`, `P01-03-coupon-checkout.png`.
- **Recommendation:** Correct source encoding and ensure UTF-8 handling from source through browser rendering; review every touched page.
- **Limit:** Evidence is a machine-captured rendering; no participant impact was measured.
