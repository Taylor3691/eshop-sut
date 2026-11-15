# HW03 Task 2 — Main report (SIMULATED Playwright execution)

## Integrity statement

This report documents seven automated task-flow executions using synthetic accounts and a **separate fictional response exercise**. The seven names supplied for this task are labels only; none of the named people was recruited, contacted, or observed. This work does **not** satisfy HW03's seven-real-participant requirement. No human SUS responses, interviews, think-aloud data, consent, or usability timings were collected. The assignment's real-participant and cross-platform evidence requirements remain outstanding.

## System and scenario

- SUT: EShop web storefront, `http://localhost:5173` with backend `http://localhost:3000`.
- Scenario: sign in, add a product, inspect cart, apply `SAVE10`, confirm checkout, verify order history, log out.
- Automation: Playwright 1.65.1, Chromium, headless, 1280×800; each run used a separate browser context and synthetic account.
- Data isolation: one registered synthetic account per run; fresh context per run.

## Results

| Run | Login | Cart | Coupon | Checkout | Order verification | Logout | Illustrative SUS* |
|---|---|---|---|---|---|---|---:|
| P01 | PASS | PASS | PASS | PASS | PASS | PASS | 57.5 |
| P02 | PASS | PASS | PASS | PASS | PASS | PASS | 75 |
| P03 | PASS | PASS | PASS | PASS | PASS | PASS | 25 |
| P04 | PASS | PASS | PASS | PASS | PASS | PASS | 42.5 |
| P05 | PASS | PASS | PASS | PASS | PASS | PASS | 82.5 |
| P06 | PASS | PASS | PASS | PASS | PASS | PASS | 37.5 |
| P07 | PASS | PASS | PASS | PASS | PASS | PASS | 82.5 |

\* **SIMULATED DATA:** The individual response vectors and these correctly calculated scores are invented for the requested exercise. They are not participant measurements and cannot support an empirical mean or usability grade.

The six checkpoint results are direct automation observations, not human usability completion statistics. The fictional behaviors, hesitations, errors, interviews, and SUS vectors are clearly separated in each participant folder. See `usability-summary-report.md`, `qualitative-synthesis.md`, and `sus-scoring.md`.

## Findings

The automated UI evidence shows malformed Vietnamese text, misleading login form labels/types, and an editable checkout total. The first two findings are documented as `BUG-SIM-001` and `BUG-SIM-002`. The editable total is a design/requirements concern noted in synthesis; business impact was not independently security-tested here. No participant-derived pain points or severity observations are claimed.

## Evidence and reproducibility

- Screenshots: `../evidence/screenshots/P01-*` through `P07-*` (six checkpoints per completed run).
- Playwright recordings: `../evidence/session-recordings/P01-simulated.webm` through `P07-simulated.webm`.
- Machine results: `../evidence/simulated-runs/run-results.json`.
- Runner: `../evidence/simulated-runs/run-flow.cjs`.
- Report generator: `../evidence/simulated-runs/generate_sim_docs.py`.

The browser captures are direct Playwright output and were not edited. They document page states reached by automation and do not substantiate the fictional think-aloud narratives. Earlier failed harness attempts were excluded from final run results and their intermediate evidence is not used.

## Limitations / remaining required work

Recruit seven eligible real participants, conduct and document moderated sessions with consent, collect their own SUS forms and interview answers, then recalculate the analysis. Do not use the synthetic persona details or scores as participant findings. Cross-browser/cross-platform runs are outside this seven-run Chromium simulation.
