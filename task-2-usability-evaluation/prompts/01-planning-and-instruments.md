# Prompt 01 — Usability Evaluation Planning and Instruments Design

Act as a Senior Usability Researcher and QA Specialist.

Your goal is to develop the comprehensive evaluation plan and standardized test instruments for the end-to-end shopping flow on EShop:
`Login → Cart → Apply Coupon → Checkout → Verify Order → Logout`

Requirements to cover:
- FR-02: Login and account lockout
- FR-07: Shopping cart management
- FR-08: Checkout flow
- FR-09: Discount coupon application
- FR-10: Order state machine
- FR-11: Order history view

Deliverables:
1. `planning/test-plan.md`: Formulate evaluation goals, test scope, moderator guidelines, think-aloud protocol, quantitative & qualitative metrics, and risk assessment.
2. `planning/task-scenarios.md`: Define realistic, goal-oriented task scenarios (never provide step-by-step click instructions). Set clear scenario background, success criteria, and expected flow milestones.
3. `instruments/sus-questionnaire-template.md`: Implement the standard 10-item System Usability Scale (SUS) with 5-point Likert scale (1: Strongly Disagree to 5: Strongly Agree) and the standard scoring algorithm.
4. `instruments/ueq-s-questionnaire-template.md`: Provide an optional 8-item short User Experience Questionnaire (UEQ-S) covering Pragmatic and Hedonic quality.
5. `instruments/post-test-probe-questions.md`: Formulate open-ended semi-structured interview questions focusing on:
   - Clarity (clarity of pricing, discount calculations, order confirmation)
   - Error Recovery (handling invalid coupons, adjusting quantities, network glitches)
   - Speed & Efficiency (perceived latency, checkout friction)
   - Trust & Credibility (transparency of order state, security of credentials)
6. `instruments/observer-briefing-and-consent.md`: Provide participant briefing script, ethical guidelines, and informed consent declaration for screen/audio recording.

