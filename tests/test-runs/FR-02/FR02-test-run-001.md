# FR-02 — Test Run 001

## Run Information
- Run ID: TR-FR02-001
- Test cases: `../../test-cases/FR-02/FR02_test_cases.md`
- Summary/report: `../../test-summary/FR-02/FR02-test-report.md`
- Environment: Backend API + web login, SQLite. Exact build/browser versions were not recorded in source report.
- Test data: `test@eshop.com`; per-case inputs are in the case table.
- Status: Completed; results were recorded in the existing FR-02 report.

## Results

| Measure | Count | Source |
|---|---:|---|
| Unique cases after duplicate removal | 39 | FR02-test-report.md |
| PASS | 27 | FR02-test-report.md |
| FAILED | 12 | FR02-test-report.md |
| Not Run / Blocked | 0 | FR02-test-report.md |

## Failed Cases / Bug Links
- Counter/threshold: TC-FR02-007, 009, 011, 012, 013.
- Lock duration/recovery: TC-FR02-016, 017.
- HTML5 email validation: TC-FR02-029, 031.
- Missing/empty JWT accepted by client: TC-FR02-034, 035.
- Plaintext password returned: TC-FR02-036.
- Missing locked-account message: TC-FR02-038.
- Consolidated details: `../../bug-reports/FR-02/BUG-FR02-all.md`.

## Limitations
- Per-case actuals and statuses remain in FR02_test_cases.md; this run file consolidates without changing observations.
- The original report lacks exact execution date, build hash, browser version, and repeatable clean account state for each case.
- Backend startup resets/reseeds SQLite per project instructions. No additional run was started while documenting this set.
