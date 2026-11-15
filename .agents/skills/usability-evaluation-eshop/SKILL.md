---
name: usability-evaluation-eshop
description: Plan, prepare, structure, and analyze moderated small-sample usability evaluations on EShop end-to-end flows with 7 real participants. Use for Task 2 to define evaluation objectives, write goal-oriented task scenarios, build SUS/UEQ-S instruments and probe questions (clarity, error recovery, speed, trust), generate observation templates, and synthesize real participant notes into severity-ranked findings and bug reports.
---

# Moderated Usability Evaluation (EShop)

Use this skill to execute **Task 2 — Usability Evaluation** on any end-to-end user flow of EShop with **1 pilot session + 7 real participant sessions**.

Follow the two-stage workflow strictly:

`Phase 1 (Plan & Prepare) -> [Human conducts Pilot + 7 Real Sessions] -> Phase 2 (Analyse & Report) -> Human Review`

## Core Rules

1. **Strict Anti-Fabrication Rule:** NEVER invent, simulate, or fabricate participant identities, contact details, session timestamps, observation notes, quotes, or SUS/UEQ-S scores. Only analyze real evidence provided by the student.
2. **Goal-oriented scenarios only:** Task scenarios must describe a realistic **user goal**, NEVER step-by-step clicks or UI instructions (avoid saying "click button X, then go to menu Y").
3. **Mandatory probe coverage:** Post-session open-ended probe questions must cover at minimum:
   - **Clarity** (clarity of labels, requirements, layout)
   - **Error recovery** (understanding and fixing errors when something fails)
   - **Speed** (perceived effort and time to complete)
   - **Trust** (confidence in security, correctness, and outcome)
4. **Participant eligibility & privacy:** Remind the student that all **7 participants** must be people **outside this class** (non-IT / non-tester preferred) with verifiable contact details (**Zalo, email, or phone with the middle 4 digits masked**).
5. **Root-cause separation:** During analysis, explicitly separate **isolated bugs** (code/validation defects) from **systemic design issues** (recurring workflow, feedback, or IA flaws).
6. **Human review required:** Flag all plans, scenarios, synthesized findings, and bug drafts for student verification.

## Expected Input

- **For Phase 1 (Plan & Prepare):**
  - Selected end-to-end flow (e.g., `Đăng ký → Đăng nhập → Cập nhật hồ sơ cá nhân → Đăng xuất`)
  - Target user profile (e.g., everyday online shoppers, non-IT adults/students outside the course)
  - Chosen usability scale: `SUS` (recommended, 10 items) or `UEQ-S` (8 items)
- **For Phase 2 (Analyse & Report):**
  - Raw observation notes, completion status, duration, and real `SUS` / `UEQ-S` scores from the **7 official sessions** (plus pilot refinement notes).

## Workflow

### Phase 1 — Plan & Prepare

1. **Objectives:** Formulate 3–5 concrete questions the study aims to answer (e.g., where users hesitate, whether error messages help recovery, whether navigation labels make sense).
2. **Goal-Oriented Task Scenario:**
   - Write a realistic scenario in Vietnamese matching EShop's domain.
   - Verify it contains **zero step-by-step UI hints**.
   - Suggest 1 **Pilot Session** checklist so the student tests clarity and timing before running the 7 official sessions.
3. **Moderator Script & Neutral Observation Protocol:**
   - Opening brief (*"Chúng tôi đang kiểm thử hệ thống, không phải kiểm tra năng lực của bạn"* + **Think Aloud** instruction).
   - Rules for neutral observation (no leading hints; intervene only if completely blocked).
   - Consent check for screen/audio recording.
4. **Instruments:**
   - Provide the full **SUS (10 statements, Likert 1–5)** or **UEQ-S (8 bipolar items, -3 to +3)** questionnaire ready for participants.
   - Provide 4–6 **open-ended probe questions** explicitly tagged to **Clarity**, **Error recovery**, **Speed**, and **Trust**.
5. **Evidence Templates:**
   - **Participant Roster Table (7 slots + 1 Pilot):**

```markdown
| STT | Vai trò | Họ và tên (ẩn/viết tắt nếu cần) | Ngành nghề / Non-IT? | Liên hệ xác minh (che 4 số giữa) | Hình thức & Thời gian |
| :---: | :--- | :--- | :--- | :--- | :--- |
| Pilot | Pilot | | | | |
| P1 | Chính thức | | | `09xx-xxxx-xx` | |
```

   - **Per-Session Observation Note Template:** Task completion (`Success / Partial / Failed`), Duration, Friction points, Errors encountered, Hesitations, Verbalised frustration, Scale responses, Probe answers, Recording link/filename.

---

### Phase 2 — Analyse & Report *(Run ONLY after real session data is supplied)*

1. **Score SUS / UEQ-S:**
   - For **SUS** (per participant):
     $$\text{SUS} = \left(\sum_{i \in \{1,3,5,7,9\}} (Q_i - 1) + \sum_{j \in \{2,4,6,8,10\}} (5 - Q_j)\right) \times 2.5$$
   - Report individual scores (P1..P7), mean, min, max, and standard usability grade interpretation (e.g., `<51` Poor, `51–68` OK/Marginal, `68–80.3` Good, `>80.3` Excellent).
   - For **UEQ-S**: compute Pragmatic Quality, Hedonic Quality, and Overall score across the 7 participants.
2. **Synthesize Observations:**
   - Group recurring pain points across participants with frequency counts (e.g., `6/7 participants failed password registration due to hidden regex rule`).
   - Separate **Isolated Bugs** vs **Systemic Design Issues**.
3. **Prioritize by Severity:**

```markdown
| Finding ID | Category (Isolated Bug / Systemic Issue) | Severity | Frequency | Description & User Impact | Recommendation |
| :--- | :--- | :--- | :---: | :--- | :--- |
```

   Use clear severity levels: `Blocker`, `Critical`, `Major`, `Minor`.
4. **Draft Genuine Bug Reports:**
   - Output Markdown bug entries + **GitHub Issues** drafts for verified defects observed during sessions, with screenshot evidence placeholders.

## Definition of Done
- [ ] Goal-oriented task scenario verified free of step-by-step instructions
- [ ] Pilot session conducted and scenario refined before real sessions
- [ ] 7 real eligible participants (outside class, masked contact) recorded by the student
- [ ] SUS / UEQ-S scores accurately calculated from real participant inputs
- [ ] Pain points grouped, isolated bugs separated from systemic issues, and prioritized by severity
- [ ] Bugs documented in both Markdown report and GitHub Issues with screenshots
