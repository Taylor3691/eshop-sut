# HW02 — Domain Testing and Boundary Value Analysis on EShop

## 1. Scope and selected features

This report summarizes the four feature selections and the recorded work on branch `test/phuc`. The business requirements in the repository `README.md` are the test oracle; the `feat/TToan-HW2` branch was used as a reference for organization and reporting conventions only.

| Pool | Selected feature | Platform | Domain cases | BVA cases | Detailed reports |
|---|---|---|---:|---:|---|
| A | FR-03 — Forgot password and password reset | Web | 18 | 21 | [Domain](reports/test-results/FR-03/domain_testing_report.md) · [BVA](reports/test-results/FR-03/bva_testing_report.md) |
| B | FR-09 — Discount coupons | Web/API | 20 | 18 | [Domain](reports/test-results/FR-09/domain_testing_report.md) · [BVA](reports/test-results/FR-09/bva_testing_report.md) |
| C | FR-14 — Category management | Web Admin/API | 25 | 16 | [Domain](reports/test-results/FR-14/domain_testing_report.md) · [BVA](reports/test-results/FR-14/bva_testing_report.md) |
| D | FR-03 — Forgot password and password reset | Mobile | 30 | 25 | [Domain](reports/test-results/FR-03-mobile/domain_testing_report.md) · [BVA](reports/test-results/FR-03-mobile/bva_testing_report.md) |
| **Total core suites** | **4 selections** |  | **93** | **80** | **173** |

## 2. Test design method

The analyses and case files apply Domain Testing and BVA in the following sequence:

1. Read the applicable functional and security rules from `README.md`, identify prerequisite state, inputs, outputs, and any linked requirement (for example, FR-01 password rules used by FR-03).
2. Separate input variables and observable behavior. Record valid and invalid domains, including cross-field relationships, user roles, workflow states, and UI requirements.
3. Partition each domain into equivalence classes and choose representative values. Keep ambiguous or unspecified rules visible instead of inventing a boundary.
4. Identify ordered numeric or length constraints and derive values immediately below, at, and above each specified boundary. For exact-length fields, exercise the length below, at, and above the specified length.
5. Turn each partition or boundary into an individually identified test case with preconditions, data, steps, expected result, and evidence reference.
6. Execute the cases recorded in the detailed reports, retain PASS/FAIL/BLOCKED outcomes and evidence links, and review observed behavior against the requirement oracle.
7. Compare the initial AI-generated cases with later gap-analysis cases. Keep gap findings tied to their recorded test IDs and distinguish tested results from candidates or unclear oracles.

The feature-specific input partitions, boundary tables, case design, and execution notes are in the [test case suites](tests/test-cases/) and [analysis summaries](tests/test-summary/). The FR-03 web analysis documents email, OTP, password-strength, confirmation, and workflow/UI domains; the [mobile analysis](tests/test-summary/FR-03-mobile-domain-bva-analysis.md) records the corresponding mobile domains and implementation boundary. The [FR-09 analysis](tests/test-summary/FR-09-domain-bva-analysis.md) covers coupon eligibility, discount types, order minimum, usage, expiry, and checkout interactions. The [FR-14 analysis](tests/test-summary/FR-14-domain-bva-analysis.md) covers category names, identifiers, CRUD operations, permissions, and linked products.

## 3. Execution summary

The eight detailed Domain/BVA reports contain 173 core cases: 112 PASS, 57 FAIL, 4 BLOCKED, and 0 not run. The separate AI-gap execution tables contain additional IDs. After deduplicating IDs across all execution tables, the recorded aggregate is 215 unique cases: 121 PASS, 90 FAIL, 4 BLOCKED, and 0 not run. The two totals are shown separately so the supplemental gap results remain traceable.

| Scope | Designed/recorded cases | Executed | Passed | Failed | Blocked | Not run |
|---|---:|---:|---:|---:|---:|---:|
| Core Domain/BVA suites | 173 | 173 | 112 | 57 | 4 | 0 |
| Unique AI-gap additions after ID deduplication | 42 | 42 | 9 | 33 | 0 | 0 |
| **Deduplicated assignment total** | **215** | **215** | **121** | **90** | **4** | **0** |

The supplemental count comes from the execution tables in the [AI-gap analyses](tests/test-summary/). Their evidence quality varies: some rows cite screenshots, while others cite a response payload, source location, or a recorded probe. These differences are preserved in the per-defect records and must be considered before external Issue publication.

## 4. Defect reports

The current local index contains one Markdown report per existing defect ID. It includes observations from FAIL rows in the detailed reports and supplemental AI-gap execution tables. IDs and test outcomes are retained; closely related web/mobile findings remain traceable to their own test cases.

- [Bug report index](tests/bug-reports/README.md)
- Number of local defect records: **28**.
- Each report links back to its source report or AI-gap table and, where available, the case file and screenshot.
- A few observations are marked for requirement/oracle review. They are not presented as confirmed requirement violations until that review is complete.
- The assignment also asks for GitHub Issues with screenshots. Issue publication was not performed as part of this local-branch change; check existing Issues for duplicates and attach the corresponding evidence before reporting externally.

## 5. Test cases, reports, and evidence

- [Test case suites](tests/test-cases/)
- [Execution reports](reports/test-results/)
- [Domain, BVA, and AI-gap analysis](tests/test-summary/)
- [Test run index](tests/test-runs/README.md)
- Screenshots remain in each feature suite's `screenshots/` directory. The execution reports and bug records link to those original files.

## 6. AI gap analysis and human review

AI-gap analysis is available for FR-03 web, FR-03 mobile, FR-09, and FR-14. It records the scenario, expected and actual behavior, outcome, defect reference, and stated evidence. The FR-14 gap analysis's orphaned-category, duplicate-name, and empty-form references have been aligned with the detailed catalog (`DEF-FR14-05`, `DEF-FR14-06`, and `DEF-FR14-04` respectively); no test IDs or outcomes changed.

The available records do not establish a complete human-review sign-off. Requirement interpretation, especially where the local defect index flags an oracle question, still needs the student's review.

### Recorded-result discrepancies

- [TC-FORGOT-005](tests/test-cases/password-reset-web/TC-FORGOT-005.md) lists `Abc123@!` in its planned test data, while the Domain execution report lists `Pass123@`. The screenshot masks the password, so it cannot resolve which value was entered. The FAIL result is retained; confirm the exact input on retest.
- `TC-GAP-COUPON-004` is recorded as `PASS (Biên)` because it crossed the minimum-order threshold, while its actual-result text says the percentage calculation was negative. The aggregate retains the source status; treat that PASS as threshold-subcheck-only pending student review.
- Aggregate totals follow the outcome labels in the source execution tables. These notes preserve their source values and make their interpretation limits visible.

## 7. Submission items still requiring the student

The assignment PDF requires materials that cannot be reconstructed from test results alone. They are left open rather than fabricated:

- A complete AI Audit Report for every actual AI interaction, including tool/model, date and time, exact prompt, output, and human review. The existing report's audit table is a template, not a complete log.
- A 200–300 word first-person AI critique based on the student's own review experience.
- GitHub Issue publication and screenshot attachment, after duplicate checking.
- The exported current-branch [Git commit log](submission/git-commit-log.txt) needs review to confirm it demonstrates each required procedure step; this task did not create commits.
- Agent Skill submission and YouTube demonstration links if claiming those rubric points.
- The student's self-assessed grade, review/sign-off, final PDF exports, and submission ZIP.

These items are listed in the [submission README](submission/README.md). No PDF or ZIP is claimed to be ready until the required human-owned material is complete.

## 8. Structural reference and differences

The reference branch's organization informed the use of a root main report, `tests/test-cases/`, `tests/test-runs/`, `tests/test-summary/`, `tests/bug-reports/`, and `reports/test-results/`. The selected features and all results in this report come from `test/phuc`. The reference branch's Pool A–D cases and evidence are not included as current-branch results.
