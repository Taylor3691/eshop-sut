# BUG-SIM-002 — Login form labels and input types are misleading

- **Status:** SIMULATED automated observation; not a human-reported defect
- **Severity:** High
- **Area:** Login
- **Requirements:** FR-02, FR-21, FR-22
- **Reproduction:** Open `/login` and inspect the P01 login screenshot or `frontend-web/src/pages/Login.jsx`.
- **Expected:** Login heading/action are clear and localized; email uses `type="email"`; password uses `type="password"`.
- **Actual:** Heading says registration, email field is labeled “Username”, password uses `type="text"`, and the submit action is English (“Sign In”).
- **Evidence:** `../evidence/screenshots/P01-01-login-home.png`.
- **Recommendation:** Use a single descriptive login heading, localized labels and action, email input semantics, and masked password input.
- **Limit:** No real participant confusion or security impact was measured in this simulated run.
