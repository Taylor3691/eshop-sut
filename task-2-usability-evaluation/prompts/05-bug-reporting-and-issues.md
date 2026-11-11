# Prompt 05 — Usability Bug Reporting and GitHub Issues Synchronization

Act as a Senior QA Engineer and Usability Defect Manager.

Guidance for Usability Bug Reporting:
1. Identify true usability bugs and functional violations discovered during participant sessions.
2. For each verified issue, create a dedicated bug report in `bug-reports/` using `BUG-YYYYMMDD-###.md`.
3. Follow standard classification:
   - Severity: `Fatal (10) | Serious (5) | Medium (3) | Cosmetic (1)`
   - Priority: `Critical | High | Medium | Low`
   - Nielsen Usability Severity: `0 - Not a problem | 1 - Cosmetic problem | 2 - Minor usability problem | 3 - Major usability problem | 4 - Usability catastrophe`
4. Ensure every reported bug contains:
   - Clear reproduction steps based on observed user behavior.
   - Expected behavior grounded in EShop requirements (FR-02, FR-07, FR-08, FR-09, FR-10, FR-11).
   - Actual observed friction or system defect.
   - Genuine screenshot evidence referencing `task-2-usability-evaluation/evidence/screenshots/`.
5. Sync verified bug reports with GitHub Issues on the repository and export copies to `task-2-usability-evaluation/evidence/github-issues/`.

