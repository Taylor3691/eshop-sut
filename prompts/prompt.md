# HW05 – COMPLETE PERFORMANCE TESTING IMPLEMENTATION PROMPT PACK

## GLOBAL INSTRUCTIONS

Act as a Senior Performance Testing Engineer, Apache JMeter Specialist, QA Automation Engineer, and AI Agent Skill Developer.

You are assisting with the individual HW05 – Performance Testing assignment.

### Student information

- Student ID: 23120157
- Student name: Nguyễn Hữu Phúc
- System Under Test: EShop
- Repository: https://github.com/ttbhanh/eshop-sut
- Main testing tool: Apache JMeter
- AI development environment: VS Code GitHub Copilot Agent
- Documentation language: Vietnamese (Vietnamese-first)
- Technical identifiers, API names, commands, and code: English

### Mandatory rules

1. Read the provided HW05 PDF and follow its requirements precisely.
2. Inspect the existing repository before creating or modifying files.
3. Reuse existing useful files and preserve their content.
4. Never invent API endpoints, request payloads, credentials, product IDs, or response structures.
5. Verify all API details from the actual source code, API documentation, or real responses.
6. Never fabricate performance metrics, JTL files, execution screenshots, hardware reports, video recordings, Git commits, or GitHub Issues.
7. Clearly distinguish measured results, assumptions, recommendations, and unverified information.
8. All test results must originate from actual JMeter executions.
9. All reports must be written in Vietnamese unless technical terminology requires English.
10. Use reusable and maintainable implementations rather than hardcoding EShop-specific assumptions into the Agent Skill.
11. Do not silently skip failed or incomplete requirements.
12. After every task, provide a summary containing:
    - Files created or modified.
    - Implementation details.
    - Validation performed.
    - Actual results.
    - Remaining manual actions.
    - Git commit recommendation.

Do not attempt to complete all tasks in one execution. Follow the phases below in order and wait for the user's approval before moving to the next major phase.

---

# PROMPT 01 – INITIALIZE WORKSPACE AND ANALYZE ASSIGNMENT

Read the HW05 PDF and inspect the current workspace.

Tasks:

1. Extract every requirement from the assignment.
2. Identify all deliverables, evaluation criteria, constraints, and mandatory evidence.
3. Inspect the current project structure and existing files.
4. Identify whether the EShop repository is already available locally.
5. Inspect the installed tools and available runtime environment.
6. Identify missing dependencies and prerequisites.
7. Create a Vietnamese implementation roadmap.
8. Create a requirement traceability matrix.

Create the following workspace structure, adapting it to existing files without overwriting useful content:

HW05/
README.md
docs/
assignment-analysis.md
requirement-traceability.md
implementation-roadmap.md
report/
test-plans/
test-data/
results/
html-reports/
evidence/
Load/
Stress/
Spike/
Endurance/
Hardware/
analysis/
continuous-testing/
agent-skill/
video/
git/
bugs/

The requirement traceability matrix must contain:

- Requirement ID.
- Assignment requirement.
- Implementation location.
- Required evidence.
- Verification method.
- Status: NOT STARTED / IN PROGRESS / COMPLETED / BLOCKED.

Do not generate fake execution evidence.

Deliverable: a complete workspace foundation and Vietnamese implementation roadmap.

---

# PROMPT 02 – CREATE THE AGENT SKILL FOUNDATION

Create a reusable Agent Skill named:

performance-testing-skill

Use the Agent Skills standard supported by the current development environment.

Inspect existing Agent Skill conventions before implementation.

Required structure:

performance-testing-skill/
SKILL.md
references/
api-analysis.md
performance-testing-fundamentals.md
jmeter-configuration.md
performance-metrics.md
jtl-analysis.md
optimization-review.md
continuous-performance-testing.md
templates/
load-test-template.jmx
stress-test-template.jmx
spike-test-template.jmx
test-data-template.csv
performance-report-template.md
scripts/
analyze-jtl.py
validate-jtl.py
assets/
report-template.md

SKILL.md requirements:

1. Define the Skill's name, description, activation conditions, and workflows.
2. Explain when the Skill should be activated.
3. Describe the complete performance testing lifecycle.
4. Support API endpoint discovery and workflow analysis.
5. Support Load, Stress, and Spike test design.
6. Support data-driven JMeter configuration.
7. Support authentication token extraction.
8. Support assertions and test validation.
9. Support JTL analysis and performance metric calculation.
10. Support AI misinterpretation detection.
11. Support optimization feasibility assessment.
12. Support performance report generation.
13. Support continuous performance testing proposals.
14. Support reuse with different applications and API endpoint groups.

Safety and reliability requirements:

- Never assume API endpoints.
- Never invent execution results.
- Never replace actual JTL data with sample data in final reports.
- Never claim that a test was executed unless execution evidence exists.
- Clearly label assumptions and unverified recommendations.
- Validate all generated JMeter plans before execution.
- Preserve project-specific configurations.

Create a reusable, modular Skill rather than a collection of unrelated instructions.

Deliverable: a valid and documented Agent Skill foundation.

---

# PROMPT 03 – ANALYZE ESHOP APIs AND DESIGN END-TO-END WORKFLOW

Analyze the EShop backend in detail.

Repository:
https://github.com/ttbhanh/eshop-sut

Tasks:

1. Inspect backend source code, routes, controllers, middleware, models, and database configuration.
2. Identify the actual backend port and API base URL.
3. Discover the actual API endpoints for:
   - Authentication.
   - Product listing and search.
   - Product detail.
   - Shopping cart.
   - Checkout / order creation.
4. For each endpoint, document:
   - HTTP method.
   - URL and path parameters.
   - Query parameters.
   - Required headers.
   - Authentication requirements.
   - Request body.
   - Expected response.
   - HTTP status codes.
   - Relevant database effects.
5. Verify the authentication and authorization mechanism.
6. Inspect login failure and account-lockout behavior.
7. Identify valid test accounts and available product data using authorized local test data.
8. Determine how cart and checkout data must be prepared.
9. Identify data dependencies between requests.
10. Identify cleanup or reset requirements between test executions.

Design one complete end-to-end workflow covering:

- Auth-heavy endpoint group.
- Read-heavy endpoint group.
- Transactional endpoint group.

The workflow must be identical across Load, Stress, and Spike testing.

Prefer a realistic sequence such as:

Login
-> Search Products
-> View Product Detail
-> Add to Cart
-> Checkout

Only use this sequence if supported by the actual application.

Important:

- Confirm that the selected workflow is not duplicated by another group member.
- Do not assume endpoint paths from examples.
- Do not invent product IDs or credentials.
- Avoid repeatedly creating duplicate orders without understanding the database effects.
- Determine whether each virtual user needs isolated account/cart data.

Create:

docs/api-inventory.md
docs/workflow-design.md
docs/test-data-design.md

Also update the Agent Skill with reusable API analysis instructions.

Deliverable: verified API inventory and a justified end-to-end workflow.

---

# PROMPT 04 – DESIGN AND GENERATE LOAD TEST PLAN

Use the verified API inventory and workflow.

Generate a complete Apache JMeter Load Test Plan.

Filename:

23120157_Load_YYYYMMDD.jmx

Requirements:

1. Use a realistic number of virtual users.
2. Configure an appropriate ramp-up period.
3. Configure a sustained test duration.
4. Configure realistic think-time between user actions.
5. Use CSV Data Set Config for test data.
6. Parameterize credentials, product IDs, quantities, and other required values.
7. Extract authentication tokens dynamically from login responses.
8. Pass authentication tokens to protected endpoints.
9. Handle cookies and session state when required.
10. Use assertions to validate business responses.
11. Validate the complete end-to-end workflow.
12. Add appropriate timers.
13. Avoid unnecessary debugging listeners during high-load execution.
14. Include the required distinct Listener/report type for Load Testing: Summary Report.

Select the workload based on the available hardware and expected application behavior.

Explain:

- Why the selected user count is appropriate.
- Why the ramp-up is appropriate.
- Why the think-time is realistic.
- What workload characteristics are being evaluated.
- How the workflow covers the three endpoint groups.

Generate:

test-plans/23120157_Load_YYYYMMDD.jmx
test-data/users.csv

Create a Vietnamese design document:

docs/load-test-design.md

Do not execute the final load test yet.

Validate the generated JMX XML and all configuration references.

---

# PROMPT 05 – DESIGN AND GENERATE STRESS TEST PLAN

Use exactly the same end-to-end workflow and API endpoint groups as the Load Test.

Generate:

23120157_Stress_YYYYMMDD.jmx

Requirements:

1. Design a gradually increasing workload.
2. Use multiple load stages or an equivalent stepped workload strategy.
3. Identify the point at which performance begins to degrade.
4. Identify the maximum sustainable load.
5. Monitor error rate and response-time growth.
6. Reuse the verified CSV data design.
7. Extract and propagate authentication tokens dynamically.
8. Include business assertions.
9. Account for the three-consecutive-failed-login lockout behavior.
10. Avoid intentionally submitting incorrect passwords during the main stress test.
11. Explain how account lockout will be reset if triggered.
12. Use Aggregate Report as the distinct Listener/report type for Stress Testing.

The test must not overload the machine without a controlled progression.

Start with a conservative workload and increase gradually based on measured behavior.

Generate:

test-plans/23120157_Stress_YYYYMMDD.jmx

docs/stress-test-design.md

Do not execute the test until the user approves the workload configuration.

---

# PROMPT 06 – DESIGN AND GENERATE SPIKE TEST PLAN

Use the same verified end-to-end workflow.

Generate:

23120157_Spike_YYYYMMDD.jmx

Requirements:

1. Establish a low baseline workload.
2. Increase virtual users sharply over a short interval.
3. Maintain the peak workload for an appropriate period.
4. Reduce workload to the baseline.
5. Observe recovery behavior.
6. Measure response time, throughput, error rate, and recovery.
7. Reuse the verified CSV and authentication configuration.
8. Include business assertions.
9. Account for login lockout behavior.
10. Use View Results Tree as the distinct Listener/report type for Spike Testing.

Explain:

- Baseline workload.
- Spike workload.
- Spike duration.
- Recovery period.
- Expected behavior during and after the spike.

Ensure that the test is suitable for the actual local hardware.

Generate:

test-plans/23120157_Spike_YYYYMMDD.jmx

docs/spike-test-design.md

Do not execute until the user approves the configuration.

---

# PROMPT 07 – REVIEW AND VALIDATE ALL TEST PLANS

Act as an independent Senior Performance Testing Reviewer.

Inspect all three JMeter Test Plans.

Check:

1. JMX XML validity.
2. Correct endpoint paths and HTTP methods.
3. Correct request payloads.
4. CSV file paths and variable mappings.
5. Authentication token extraction.
6. Authorization headers.
7. Cookie and session handling.
8. Assertions and expected business responses.
9. Think-time configuration.
10. Ramp-up and workload configuration.
11. Listener/report uniqueness.
12. Login lockout handling.
13. Data isolation between virtual users.
14. Cart and checkout state dependencies.
15. Duplicate order risks.
16. Cleanup and test data reset requirements.
17. Compatibility with the installed JMeter version.

Verify the required distinct report types:

- Load: Summary Report.
- Stress: Aggregate Report.
- Spike: View Results Tree.

Critically identify mistakes introduced by AI.

Create:

analysis/test-plan-review.md
analysis/ai-design-mistakes.md

For each identified issue, record:

- Original AI-generated configuration.
- Problem.
- Why it is incorrect.
- Corrected configuration.
- Reason for correction.
- Validation evidence.

Fix confirmed problems without silently changing the intended test scenario.

Do not claim that a test plan is correct merely because its XML is valid.

---

# PROMPT 08 – EXECUTE PERFORMANCE TESTS AND COLLECT EVIDENCE

Prepare a controlled execution procedure for all three test plans.

Before execution:

1. Verify the backend is running.
2. Verify the database is available.
3. Verify test accounts and product data.
4. Verify CSV files.
5. Verify JMeter installation.
6. Verify output directories.
7. Verify sufficient hardware resources.
8. Confirm that no previous execution is still running.
9. Check whether the account-lockout state needs resetting.

Execute each scenario using Apache JMeter.

Prefer non-GUI mode for actual performance runs.

Example:

jmeter -n -t test-plans/23120157_Load_YYYYMMDD.jmx -l results/Load.jtl -e -o html-reports/Load

Apply the equivalent command for Stress and Spike.

Execution requirements:

- Produce complete raw .jtl files.
- Generate HTML Dashboard folders.
- Preserve original raw logs.
- Do not overwrite previous evidence.
- Record the actual execution date and time.
- Record actual test parameters.
- Record actual errors and failures.
- Capture JMeter and backend resource usage in the same screenshot for each scenario.
- Capture CPU and memory utilization.
- Record any application crashes or functional regressions.

For Stress and Spike:

- Check whether login lockout was triggered.
- Reset the affected account if necessary.
- Document the actual reset procedure.
- Verify that the next scenario starts from a known state.

Create:

docs/execution-procedure.md
results/execution-manifest.md

evidence/Load/
evidence/Stress/
evidence/Spike/

Do not create screenshots or logs by simulation.

If GUI interaction, screenshot capture, or execution requires user action, provide precise instructions instead of claiming completion.

---

# PROMPT 09 – ENDURANCE / SOAK TESTING

Design and perform an additional endurance test.

Target duration: approximately 10–15 minutes.

Requirements:

1. Select a sustainable workload based on previous test results.
2. Maintain a relatively stable load.
3. Monitor response time and throughput.
4. Monitor error rate.
5. Monitor backend CPU and memory.
6. Observe memory growth and potential resource exhaustion.
7. Record resource behavior over time.
8. Identify whether performance degrades during sustained operation.
9. Determine the maximum stable RPS supported by the actual test environment.
10. Determine a practical memory ceiling or resource limit based on observed behavior.

Create:

evidence/Endurance/
results/Endurance.jtl
docs/endurance-test-report.md

The report must include:

- Test duration.
- Virtual users.
- Actual throughput.
- Average response time.
- p95 response time.
- Error rate.
- Maximum observed memory.
- CPU utilization.
- Maximum stable RPS.
- Observed limitations.
- Evidence references.

Clearly distinguish the sustainable threshold from the point of failure.

Never infer or fabricate hardware limits from a short test without supporting measurements.

---

# PROMPT 10 – TASK 2: AI ANALYSIS AND MISINTERPRETATION HUNT

Analyze the actual Load, Stress, Spike, and Endurance JTL files.

First inspect the JTL format and determine which columns and samples are available.

Calculate or verify:

- Total requests.
- Successful requests.
- Failed requests.
- Average response time.
- Median response time.
- Minimum and maximum response time.
- p90.
- p95.
- p99.
- Throughput (RPS).
- Error rate.
- Response time by endpoint.
- Response time by scenario.

Use the actual raw JTL data as the source of truth.

Compare the three primary scenarios.

Identify:

- Slow endpoints.
- Increasing response times.
- Throughput saturation.
- Error-rate growth.
- Potential bottlenecks.
- Recovery behavior after the spike.

### Misinterpretation Hunt

Critically inspect AI-generated conclusions.

Look for:

1. Incorrect percentile interpretation.
2. Confusion between average and p95.
3. Incorrect throughput calculations.
4. Incorrect error-rate calculations.
5. Confusing successful and failed samples.
6. Misinterpreting timestamps.
7. Ignoring endpoint-level differences.
8. Drawing conclusions from insufficient data.
9. Confusing client-side limitations with backend bottlenecks.

For every confirmed misinterpretation, document:

- AI's original statement.
- Correct value from the raw JTL.
- Relevant sample or calculation.
- Why the AI was wrong.
- Correct interpretation.

### Optimization Review

Ask AI to propose optimizations such as:

- Database indexes.
- Connection pooling.
- SQLite WAL mode.
- Query optimization.
- Caching.
- Reducing unnecessary database operations.

Classify every recommendation as:

- Feasible.
- Hallucinated.
- Needs verification.

Verify each recommendation against the actual EShop architecture and source code.

Do not classify a recommendation as feasible without technical evidence.

Create:

analysis/AI_Analysis.md
analysis/Misinterpretation_Hunt.md
analysis/Optimization_Review.md

Include tables and Vietnamese technical explanations.

---

# PROMPT 11 – TASK 3: CONTINUOUS PERFORMANCE TESTING PROPOSAL

Design a continuous performance-testing model for the EShop repository.

The proposed model must monitor Git commits and decide when performance tests should run.

Requirements:

1. Monitor Git push and pull request events.
2. Inspect changed files and affected API components.
3. Decide whether performance testing is necessary.
4. Select relevant test scenarios.
5. Execute performance tests in a controlled environment.
6. Collect performance metrics.
7. Compare current metrics against a baseline.
8. Detect p95 regression.
9. Detect abnormal error-rate growth.
10. Generate performance reports.
11. Notify developers when regressions are detected.

Include an example rule:

IF p95_current > p95_baseline \* 1.20

THEN flag performance regression.

Treat 20% as a configurable example, not a universal threshold.

Discuss:

- CI/CD execution cost.
- Test environment consistency.
- False positive alerts.
- False negative alerts.
- Baseline updates.
- Test execution frequency.
- Test duration.
- Resource contention.
- Flaky performance measurements.
- Selective versus full performance testing.

Create a flowchart using Mermaid.

Create:

continuous-testing/proposal.md
continuous-testing/flowchart.md

Include a Vietnamese discussion of the trade-offs.

The deliverable is a technical proposal. Do not claim that a real CI/CD pipeline was deployed unless it actually was.

---

# PROMPT 12 – COMPLETE AND TEST THE AGENT SKILL

Now integrate the completed HW05 workflow into the reusable Agent Skill.

Update SKILL.md and references.

The Skill must support:

1. Project and API discovery.
2. Endpoint group identification.
3. End-to-end workflow design.
4. Data-driven JMeter plan generation.
5. Load Test design.
6. Stress Test design.
7. Spike Test design.
8. JMX validation.
9. JTL parsing and metric calculations.
10. AI misinterpretation detection.
11. Optimization feasibility review.
12. Performance report generation.
13. Continuous testing proposal generation.

Create a reusable JTL analysis script.

Requirements for analyze-jtl.py:

- Read standard JMeter CSV JTL files.
- Validate required columns.
- Handle missing or malformed values.
- Calculate latency metrics.
- Calculate p90, p95, and p99.
- Calculate throughput using actual timestamps and a clearly documented time window.
- Calculate error rate.
- Provide endpoint-level summaries.
- Export a machine-readable JSON summary.
- Export a readable Markdown report.
- Clearly report insufficient data.
- Never silently replace missing metrics with invented values.

Add unit tests for the analysis script using clearly labeled synthetic test fixtures.

Do not mix synthetic fixtures with real HW05 execution results.

Test the Skill on the actual EShop workflow.

Record:

- Input.
- Skill invocation.
- Generated output.
- Validation.
- Problems found.
- Corrections.

Create:

agent-skill/skill-validation-report.md

Ensure the Skill is reusable for other applications.

---

# PROMPT 13 – AI AUDIT REPORT AND AI CRITIQUE

Create the mandatory AI Audit Report.

The report must follow the assignment's exact requirements.

Declaration:

"I use AI tools for the following tasks."

For each AI interaction, record:

1. AI tool name.
2. Actual date and time.
3. Exact user prompt.
4. Actual AI output.
5. Task or phase.
6. Files affected, if applicable.
7. Human review and corrections.

Record all relevant interactions involving:

- API analysis.
- Agent Skill creation.
- Load Test design.
- Stress Test design.
- Spike Test design.
- Test Plan review.
- JTL analysis.
- Misinterpretation Hunt.
- Optimization recommendations.
- Continuous Testing proposal.
- Report generation.

Use actual conversation history and available logs.

Do not invent prompts, timestamps, or AI outputs.

If an interaction cannot be recovered, explicitly identify the missing information rather than reconstructing it as an exact historical record.

Create:

report/AI_Audit_Report.md

Also generate:

report/AI_Audit_Report.pdf

### AI Critique

Write a paragraph of 200–300 English words, following the assignment's requirement.

Address:

1. Where AI produced incorrect, biased, or incomplete results.
2. Why AI failed to identify the issue.
3. How human review corrected the problem.
4. What was learned about collaborating with AI.

Use actual examples from this assignment.

Do not use generic or fabricated examples.

Create:

report/AI_Critique.md
report/AI_Critique.pdf

Verify the word count is between 200 and 300 words.

---

# PROMPT 14 – GENERATE MAIN REPORT AND README

Create a comprehensive Vietnamese HW05 report.

The main report must include:

1. Introduction.
2. Objectives.
3. SUT description.
4. Environment and hardware specifications.
5. API endpoint selection.
6. End-to-end workflow.
7. Test data design.
8. Load Testing methodology and results.
9. Stress Testing methodology and results.
10. Spike Testing methodology and results.
11. Endurance Testing methodology and results.
12. Performance metric analysis.
13. Resource utilization analysis.
14. AI-generated test plan review.
15. AI Misinterpretation Hunt.
16. Optimization feasibility assessment.
17. Continuous Performance Testing proposal.
18. Agent Skill design and implementation.
19. Limitations and threats to validity.
20. Conclusion.

For every execution result:

- Use actual JTL data.
- Reference actual HTML reports.
- Reference actual screenshots.
- Reference actual hardware evidence.
- Clearly distinguish measured data from assumptions.

Do not fill missing values with estimates.

Generate:

report/HW05_Report.md
report/HW05_Report.pdf

### README.md

Create a Vietnamese README containing:

- Project overview.
- SUT and environment.
- Tested endpoint groups.
- Workflow summary.
- Test scenarios executed.
- Test result summary.
- Endurance threshold with actual numbers.
- Number of genuine bugs and performance issues.
- GitHub repository link.
- Unlisted YouTube demo video link.
- Agent Skill description.
- Self-assessment table.

Self-assessment must follow the assignment's exact rubric:

| Criterion                                       | Maximum grade | Self-assessed grade |
| ----------------------------------------------- | ------------: | ------------------: |
| Load Testing                                    |            30 |                     |
| Stress Testing                                  |            20 |                     |
| Spike Testing                                   |            20 |                     |
| Task 2 – AI Analysis and Misinterpretation Hunt |            10 |                     |
| Task 3 – Continuous Performance Testing         |            10 |                     |
| Agent Skills                                    |            10 |                     |
| Total                                           |           100 |                     |

Do not automatically assign full marks.

Generate:

README.md

---

# PROMPT 15 – VIDEO, BUG REPORTS, AND GIT COMMIT LOG

### Video requirements

Prepare a Vietnamese video recording checklist.

Task 1 video:

- At least 6 minutes total.
- Show Apache JMeter and backend resource monitor in the same frame.
- Demonstrate Load Testing.
- Demonstrate Stress Testing.
- Demonstrate Spike Testing.
- Use the student's own Vietnamese voice narration.
- Upload as an unlisted YouTube video.

Agent Skill video:

- Demonstrate the Skill end-to-end.
- Use a complete endpoint group.
- Show how the Skill analyzes APIs, generates test plans, and analyzes results.
- Demonstrate actual Skill outputs.
- Provide the YouTube link.

Do not fabricate video links or claim that a recording exists.

Create:

video/recording-checklist.md
video/video-links.md

### Bug reports

Inspect actual execution results and genuine application defects.

For each verified issue, prepare:

- Title.
- Environment.
- Preconditions.
- Steps to reproduce.
- Expected result.
- Actual result.
- Evidence.
- Severity.
- Relevant JMeter sample or application response.

Do not report expected stress-related degradation as a functional bug without investigation.

If no genuine bugs are identified, report zero verified bugs.

Create:

bugs/bug-reports.md

### Git commit log

Ensure each major procedure has a separate meaningful Git commit.

Examples:

- Initialize HW05 workspace.
- Add Agent Skill foundation.
- Add API inventory and workflow.
- Add Load Test Plan.
- Add Stress Test Plan.
- Add Spike Test Plan.
- Add test data.
- Add performance execution evidence.
- Add JTL analysis.
- Add continuous testing proposal.
- Complete Agent Skill.
- Add final documentation.

Never fabricate commits.

Inspect the actual Git history and export:

git/commit-log.txt

---

# PROMPT 16 – FINAL REQUIREMENT AUDIT AND SUBMISSION PACKAGE

Act as an independent HW05 submission auditor.

Read the original HW05 PDF again.

Inspect every file in the workspace.

Verify all requirements against the original assignment.

### Task 1

- Three actual JMeter Test Plans.
- Same end-to-end workflow.
- All three endpoint groups.
- Data-driven CSV configuration.
- Three distinct Listener/report types.
- Correct filenames.
- Human review documentation.
- Three complete raw JTL files.
- Three HTML Dashboard folders.
- Resource-monitor evidence for each run.
- Hardware report and specification table.
- Account-lockout reset documentation when applicable.
- Endurance test of approximately 10–15 minutes.
- Actual endurance threshold.
- Task 1 demo video of at least 6 minutes.
- Genuine GitHub Issues and screenshots, if any.

### Task 2

- AI analysis of actual JTL files.
- Correct metric calculations.
- Misinterpretation Hunt.
- Correct raw values cited for every identified error.
- Optimization recommendations.
- Feasible / Hallucinated / Needs verification classification.

### Task 3

- Commit monitoring proposal.
- Conditional performance-test execution.
- p95 regression detection.
- Flowchart.
- Cost and false-alarm trade-off discussion.

### Agent Skill

- Valid SKILL.md.
- Reusable workflows.
- References and templates.
- JTL analysis implementation.
- Validation report.
- End-to-end Agent Skill demonstration video.

### Mandatory documentation

- Main report Markdown.
- Main report PDF.
- AI Critique Markdown and PDF.
- AI Audit Report Markdown and PDF.
- README.md.
- Self-assessment table.
- Test summary.
- Git commit log.
- GitHub and YouTube links.

### Packaging

Create:

23120157_HW05_AI_Performance_XXX.zip

Replace XXX with the student's actual self-assessed grade as a three-digit number between 000 and 100.

The ZIP must contain all required deliverables.

Before packaging:

1. Verify that all required files exist.
2. Verify that all JTL files contain actual execution data.
3. Verify that HTML report folders are complete.
4. Verify that the PDF reports are readable.
5. Verify that video links are valid and accessible.
6. Verify that GitHub repository links are correct.
7. Verify that no required file is accidentally omitted.
8. Verify that the final archive opens successfully.

Create:

docs/final-submission-audit.md

Provide a final table with:

- Requirement.
- Expected file or evidence.
- Actual file or evidence.
- Status.
- Remaining action.

If any mandatory requirement is missing, do not claim that HW05 is complete.

Do not fabricate or automatically generate missing real-world evidence.

Only create the final ZIP after the user approves the audit results.
