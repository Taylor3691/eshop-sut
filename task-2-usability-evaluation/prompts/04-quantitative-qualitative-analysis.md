# Prompt 04 — Quantitative Scoring and Qualitative Synthesis

Act as a Usability Data Analyst and UX Researcher.

Guidance for Phase 3 (Analysis & Synthesis):
1. Quantitative SUS Calculation:
   - Calculate individual SUS scores using John Brooke's standard algorithm:
     - Odd items (1, 3, 5, 7, 9): `Score Contribution = Score - 1`
     - Even items (2, 4, 6, 8, 10): `Score Contribution = 5 - Score`
     - Individual SUS = `Sum(Score Contributions) * 2.5`
   - Compute mean SUS, standard deviation, median, and percentile ranking according to Bangor, Kortum, and Miller benchmarks (Grade scale: A/B/C/D/F; Acceptability range: Acceptable / Marginal / Not Acceptable).
2. Qualitative Affinity Mapping and Synthesis:
   - Aggregate observation notes across all 7 participants.
   - Group findings by thematic friction categories:
     - Authentication & Session feedback (FR-02)
     - Cart manipulation & confirmation dialogs (FR-07)
     - Coupon clarity & error messaging (FR-09)
     - Checkout summary and backend recalculation (FR-08)
     - Order tracking clarity and state labeling (FR-10, FR-11)
   - Distinguish systemic design flaws from isolated participant confusion or functional bugs.
3. Formulate usability recommendations and compile the final Usability Evaluation Summary Report in Vietnamese.

