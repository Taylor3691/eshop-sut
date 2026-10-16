# HW02 Submission Readme

## Package contents

| Deliverable | Current artifact | Status |
|---|---|---|
| Main report (Markdown) | [HW02_MAIN_REPORT.md](../HW02_MAIN_REPORT.md) | Drafted from `test/phuc` results |
| Main report (PDF) | [HW02_MAIN_REPORT.pdf](../output/pdf/HW02_MAIN_REPORT.pdf) | Draft export; regenerate after student review |
| Domain and BVA reports | [Execution reports](../reports/test-results/) | Four feature selections, both techniques |
| Test cases and evidence | [Test cases](../tests/test-cases/) | Case IDs and existing screenshots retained |
| Test summary and analysis | [Analysis summaries](../tests/test-summary/) | Includes AI-gap analysis |
| Bug reports | [Bug report index](../tests/bug-reports/README.md) | 28 local records; some need oracle review |
| AI Audit Report | [AI_AUDIT.md](AI_AUDIT.md) | Scaffold only; historical prompts and outputs need an interaction-by-interaction audit |
| AI Critique (200–300 words) | [AI_CRITIQUE.md](AI_CRITIQUE.md) | Prompt only; requires the student's own critique |
| Git commit log (text) | [git-commit-log.txt](git-commit-log.txt) | Current `test/phuc` history exported; confirm it shows each required procedure step |
| GitHub Issues with screenshots | Not published by this change | Check for duplicate Issues and attach evidence |
| Agent Skill and demo video links | [Existing skill](../.agents/skills/domain-testing-bva/SKILL.md) | Skill exists; submission/demo link needs confirmation |
| AI Audit/Critique PDFs | Not prepared | Export after the human-owned material is complete |
| Submission ZIP | Not prepared | Assemble after the remaining required items are complete |

## Test summary

The eight core Domain/BVA execution reports cover 173 cases. The separate AI-gap tables add 42 unique IDs after deduplication. The aggregate below counts each recorded test ID once.

| Measure | Count |
|---|---:|
| Feature selections | 4 |
| Test cases designed/recorded | 215 |
| Executed | 215 |
| Passed | 121 |
| Failed | 90 |
| Blocked | 4 |
| Not yet executed | 0 |
| Local defect records | 28 |
| Demo videos | 0 links recorded |

Core-suite results are 112 PASS, 57 FAIL, and 4 BLOCKED. AI-gap additions are 9 PASS and 33 FAIL. See [HW02_MAIN_REPORT.md](../HW02_MAIN_REPORT.md) for the aggregation scope and links.

The aggregate follows the recorded labels. Review [TC-FORGOT-005](../tests/test-cases/password-reset-web/TC-FORGOT-005.md) to resolve the planned-vs-reported password input, and review `TC-GAP-COUPON-004` because its recorded boundary PASS row also describes a negative discount calculation.

## Self-assessment

The assignment rubric is reproduced below. Scores remain blank for the student to choose after reviewing the final package.

| No. | Criterion | Maximum | Self-assessed score | Evidence / remaining work |
|---:|---|---:|---:|---|
| 1 | Feature A — Domain + Boundary | 25 | — | FR-03 web reports; student review pending |
| 2 | Feature B — Domain + Boundary | 25 | — | FR-09 reports; student review pending |
| 3 | Feature C — Domain + Boundary | 25 | — | FR-14 reports; oracle review pending for some observations |
| 4 | Feature D — Mobile, Domain + Boundary | 15 | — | FR-03 mobile reports; student review pending |
| 5 | Agent Skills | 10 | — | Existing skill; submission and demo evidence need confirmation |
|  | **Total** | **100** | **—** | Complete after review |

## Before packaging

- Complete and attach the AI Audit Report for the actual interactions; do not treat the template as a completed audit.
- Write and word-count the 200–300 word AI critique.
- Review all requirement/oracle questions in the bug index; correct or retain the observed-failure classification as appropriate.
- Check the group's GitHub Issues for duplicates, publish confirmed reports, and attach the corresponding screenshots.
- Export the full required Git commit log and confirm evidence for each procedure step.
- Confirm Agent Skill materials and add end-to-end demonstration video links.
- Review the current main-report PDF, export final Markdown reports and the completed AI Audit/Critique to PDF, then package the required files under the Moodle filename convention.
