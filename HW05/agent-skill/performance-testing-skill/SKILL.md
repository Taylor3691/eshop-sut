---
name: performance-testing-skill
description: Plan, build, validate, execute, analyze, and report on API performance tests with Apache JMeter. Use when a user requests performance testing for an application, including Load, Stress, Spike, JTL analysis, optimization review, or continuous performance testing proposals.
---

# Performance Testing Skill

Use this skill to produce evidence based, reusable API performance testing work. Keep application specifics in project artifacts; do not bake one application's routes, credentials, or payloads into reusable templates.

## Activation

Activate when asked to discover API workflows, design or review JMeter plans, conduct Load/Stress/Spike testing, analyze JMeter JTL files, assess performance claims, or propose a continuous performance testing process. For a request limited to one small metric calculation, use the relevant reference and script without running the full lifecycle.

## Required safeguards

- Discover endpoints and schemas from source, authoritative API documentation, or observed responses. Never invent them.
- Separate requirements, measured facts, assumptions, and recommendations.
- Do not claim a test ran without execution evidence; do not fabricate or substitute JTL samples in a final report.
- Preserve project settings and intentional application behavior. Use explicit authorization and a controlled environment before generating significant load.
- Review each generated JMeter plan and its data references before execution. Begin conservatively and define stop conditions.
- Protect credentials and personal data. Use dedicated test accounts and avoid committing secrets.
- If evidence is missing, state exactly what is missing and what conclusion cannot be drawn.

## Lifecycle workflow

1. **Scope and oracle** — Read project instructions, assignment requirements, and functional expectations. Establish target environment, authorization, objective, duration, safety limits, and deliverables.
2. **Discover system** — Inspect source, API docs, configuration, and existing tests. Record confirmed base URL, endpoint methods/paths, auth, payloads, responses, side effects, rate limits, dependencies, and uncertainty. Follow `references/api-analysis.md`.
3. **Model workflows** — Group endpoints (for example authentication, read-heavy, transactional), map data dependencies, and define realistic user journeys. Use isolated test identities/data where state is mutated; document reset/cleanup behavior.
4. **Design workload** — Define a workload model, user arrival/ramp, duration, pacing, think time, and stop criteria. Keep the same business workflow when comparing scenarios unless the test objective requires otherwise. See `references/performance-testing-fundamentals.md` and `references/performance-metrics.md`.
5. **Build plan and data** — Parameterize inputs with CSV Data Set Config; extract dynamic tokens/session state; add response/business assertions, timers, and suitable listeners. Avoid debug listeners during high-load runs. See `references/jmeter-configuration.md` and `templates/`.
6. **Validate plan** — Check JMX XML, endpoint and method evidence, payload/variable mapping, CSV paths, token extraction, assertions, concurrency/data isolation, and safe workload bounds. Run a small authorized smoke check first. Do not treat plan generation as execution.
7. **Execute and preserve evidence** — Record plan version, command/tool version, environment, timestamps, configuration, raw JTL, logs, and resource observations. Generate a fresh report directory. Stop on predefined safety thresholds.
8. **Analyze results** — Validate JTL schema and data quality before calculating latency percentiles, throughput, and errors. Preserve timestamp/window semantics and endpoint granularity. Use `scripts/validate-jtl.py` and `scripts/analyze-jtl.py`; explain insufficient or censored data.
9. **Review interpretation** — Check AI or human claims against raw samples, units, percentile method, denominator, time window, labels, and missing data. Classify recommendations as feasible, unsupported/hallucinated, or needing verification. See `references/jtl-analysis.md` and `references/optimization-review.md`.
10. **Report and improve** — Create a traceable report with method, evidence, findings, limitations, recommendations, and next steps. Propose selective continuous testing only with stable baselines and environment controls. See `references/continuous-performance-testing.md` and `templates/performance-report-template.md`.

## Scenario design

- **Load:** expected or target workload sustained long enough to observe steady-state behavior.
- **Stress:** controlled, staged increases to characterize degradation and the sustainable boundary; define a safety ceiling and stop criteria.
- **Spike:** abrupt rise from a baseline, bounded peak interval, then recovery observation.

Use measured capacity and environment constraints to choose levels. Do not imply universal user counts or thresholds. For each scenario specify arrivals/concurrency, ramp, duration, pacing, success criteria, and abort conditions.

## Reuse across applications

Treat each application and endpoint group as configuration supplied by the project, not a built-in assumption. Replace all template placeholders only with verified values. Keep application-specific API inventory, data, plans, and results beside the project. Reuse the workflow structure, validation checks, and analysis code.

## Included resources

- `references/`: practical, vendor-neutral methods and review checklists.
- `templates/`: parameterized JMeter XML, CSV, and report starters; they are not executable until placeholders and assertions are completed.
- `scripts/validate-jtl.py`: schema/data quality check for CSV JTL.
- `scripts/analyze-jtl.py`: percentile, throughput, and error summaries in JSON and Markdown.
- `assets/report-template.md`: compact report outline for reuse.

See also `references/` for focused instructions. A generated test plan or template is not evidence that a test was run.
