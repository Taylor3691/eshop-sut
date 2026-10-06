---
name: domain-testing-bva
description: Apply Domain Testing and Boundary Value Analysis (BVA) to software feature specifications. Use when analyzing requirements, identifying input domains and equivalence partitions, deriving boundary values, generating traceable test cases, reviewing coverage, and documenting AI gaps for software testing assignments or projects.
metadata:
  author: student
  version: "1.0"
  domain: software-testing
---

# Domain Testing and Boundary Value Analysis

Use this skill to analyze a software feature systematically before creating test cases.

The goal is to preserve traceability:

`Requirement -> Domain -> Partition -> Boundary -> Test Case -> Human Review`

Do not jump directly from a requirement to a final list of test cases unless the user explicitly asks for only the test-case phase.

## Core rules

1. Treat the provided specification as the source of truth.
2. Never invent limits, formats, thresholds, timeouts, validation rules, or business rules.
3. Separate explicit requirements from assumptions and ambiguities.
4. Apply Boundary Value Analysis only where an ordered domain or threshold exists.
5. Keep every generated test case traceable to a requirement and testing technique.
6. Require human review before treating the analysis as final.
7. Do not claim that coverage is complete unless it can be demonstrated from the supplied requirements.

## Expected input

Prefer these inputs when available:

- Feature ID
- Feature name
- Module
- Requirement specification
- Business rules
- Preconditions
- Input constraints
- Related requirement IDs

If information is missing, continue with the available material and record the gap under **Ambiguities**.

## Workflow

### Step 1 — Analyze the requirement

Extract:

- requirement ID;
- feature/module name;
- functional rules;
- preconditions;
- testable inputs;
- expected outputs or observable behavior;
- constraints;
- dependencies;
- assumptions;
- ambiguities or contradictions.

Use this structure:

```markdown
## Requirement Analysis

### Requirement
- ID:
- Feature:
- Module:

### Functional Rules
1.
2.

### Preconditions
-

### Inputs
| Variable | Type | Description | Constraint |
|---|---|---|---|

### Expected Outputs / Behaviors
-

### Assumptions
-

### Ambiguities
-
```

If two requirement statements conflict, report the conflict instead of resolving it silently.

---

### Step 2 — Identify domains

For each testable input variable, identify:

- data type;
- valid domain;
- invalid domain or domains;
- constraints;
- special values;
- dependencies on other variables.

Use:

```markdown
## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
```

Examples of domains include:

- numeric intervals;
- string-length ranges;
- enumerated values;
- date ranges;
- boolean conditions;
- state-dependent inputs.

Do not create a range that is not explicitly supported by the specification.

---

### Step 3 — Build equivalence partitions

Partition each meaningful input domain into equivalence classes.

For each partition:

- assign a stable ID;
- identify the variable;
- classify it as `VALID` or `INVALID`;
- state the defining condition;
- choose a representative value when possible;
- link it to the requirement.

Use:

```markdown
## Equivalence Partitions

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-01 |  | VALID |  |  |  |
| EP-02 |  | INVALID |  |  |  |
```

Rules:

- Every meaningful valid domain should have at least one valid partition.
- Every meaningful invalid domain should have at least one invalid partition.
- Avoid artificial partitions with no requirement-based distinction.
- Record cross-variable dependencies when one input changes another input's valid domain.

---

### Step 4 — Identify boundaries

Identify boundaries only for ordered domains or explicit thresholds, such as:

- numeric ranges;
- length limits;
- dates;
- quantities;
- counters;
- retry limits;
- thresholds.

For each boundary, identify:

- lower boundary;
- upper boundary;
- inclusive or exclusive behavior;
- requirement source.

Use:

```markdown
## Boundary Analysis

| Variable | Lower Boundary | Upper Boundary | Inclusiveness | Requirement | Notes |
|---|---:|---:|---|---|---|
```

If the specification does not provide an exact boundary, write:

```text
AMBIGUITY:
The specification does not define the exact boundary.
BVA cannot be completed reliably for this variable until the boundary is clarified.
```

---

### Step 5 — Derive BVA values

For each explicit boundary, choose values immediately around the boundary.

For integer-style ranges, prefer robust BVA where appropriate:

```text
min - 1
min
min + 1
nominal
max - 1
max
max + 1
```

For a single threshold:

```text
threshold - 1
threshold
threshold + 1
```

For non-integer domains, use the nearest meaningful values immediately below, at, and immediately above the boundary.

Use:

```markdown
## BVA Values

| Variable | Boundary | Test Value | Classification | Reason |
|---|---|---:|---|---|
```

Do not force BVA onto unordered categorical inputs.

---

### Step 6 — Generate formal test cases

Generate test cases only after the domain and boundary analysis.

Use IDs in this form:

```text
TC-[MODULE]-[NUMBER]
```

Examples:

```text
TC-LOGIN-001
TC-CART-003
TC-CHECKOUT-010
```

Each test case must contain:

```markdown
# TC-[MODULE]-[NUMBER]: <Short title>

## Requirement ID
<Requirement ID>

## Module / Test Type / Technique
<Module> / Functional / <Equivalence Partitioning | BVA>

## Preconditions
-

## Test Data
| Field | Value |
|---|---|

## Test Steps
1.
2.
3.

## Expected Result
-

## Status / Related Bugs
Not Run / None
```

Generation rules:

- Cover each meaningful equivalence partition unless a documented reason explains why not.
- Cover every identified boundary.
- Include valid and invalid cases.
- Keep one primary objective per test case where practical.
- Use explicit test data.
- Expected results must be observable and requirement-based.
- Avoid duplicates that test the same condition without adding coverage.

---

### Step 7 — Review coverage

Check:

- [ ] Every testable input variable was analyzed.
- [ ] Every valid equivalence class is covered.
- [ ] Every invalid equivalence class is covered.
- [ ] Every explicit lower boundary is covered.
- [ ] Every explicit upper boundary is covered.
- [ ] Values immediately below and above boundaries were considered.
- [ ] Important cross-variable interactions were considered.
- [ ] No undocumented behavior was silently assumed.
- [ ] Every test case links to a requirement.
- [ ] Every test case identifies its testing technique.

Use:

```markdown
## Coverage Summary

- Requirements analyzed:
- Variables identified:
- Equivalence partitions:
- Partitions covered:
- Boundaries identified:
- Boundaries covered:
- Test cases generated:

### Potential Coverage Gaps
-

### Assumptions
-

### Ambiguities Requiring Clarification
-
```

---

### Step 8 — Require human review

Do not present the generated analysis as automatically correct.

Ask the reviewer to verify:

1. Did the analysis misunderstand any requirement?
2. Did it infer any undocumented rule?
3. Are any equivalence classes missing?
4. Are any boundary values incorrect?
5. Are important variable interactions missing?
6. Are expected results correct?
7. Are any test cases redundant?
8. Are important business risks uncovered?

Use:

```markdown
## Human Review Required

1.
2.
3.
```

---

### Step 9 — Identify AI gap candidates

Identify places where the AI may have missed coverage or where the specification may have caused uncertainty.

Use:

```markdown
## AI Gap Candidates

### Candidate 1
- Possible missed case:
- Why it may have been missed:
- Human action required:
```

Do not fabricate an AI gap. A candidate should be based on an observed ambiguity, interaction, incomplete requirement, or uncovered condition.

If a human reviewer confirms a missed case, record it as an actual AI gap.

## Output order

Unless the user asks for a specific phase only, return results in this order:

1. Requirement Analysis
2. Domain Analysis
3. Equivalence Partitions
4. Boundary Analysis
5. BVA Values
6. Generated Test Cases
7. Coverage Summary
8. Human Review Required
9. AI Gap Candidates

## Edge cases

### Missing numeric limit

If the requirement says something vague such as "password must be sufficiently long" without a number:

- do not assume a minimum;
- record the ambiguity;
- skip numeric BVA for that rule until clarified.

### Categorical variable

For a variable such as payment method with values like `cash`, `card`, and `wallet`:

- equivalence partitioning may apply;
- BVA normally does not apply because the domain is unordered.

### Dependent inputs

If the valid domain of one variable depends on another variable:

- document the dependency;
- create partitions for the relevant combinations;
- do not analyze the variables as independent if that would produce invalid coverage claims.

### Conflicting requirements

If two sources define different boundaries or expected results:

- record both;
- flag the conflict;
- do not choose one without user confirmation or an authoritative source.

## Example input

```text
Feature ID: FR-EXAMPLE
Feature: Quantity validation
Requirement:
A customer may order from 1 to 10 units of a product.
```

## Example analysis

```markdown
## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| quantity | integer | 1..10 | <=0, >=11 | Inclusive range |

## Equivalence Partitions

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-01 | quantity | INVALID | quantity <= 0 | 0 | FR-EXAMPLE |
| EP-02 | quantity | VALID | 1 <= quantity <= 10 | 5 | FR-EXAMPLE |
| EP-03 | quantity | INVALID | quantity >= 11 | 11 | FR-EXAMPLE |

## BVA Values

| Variable | Boundary | Test Value | Classification | Reason |
|---|---|---:|---|---|
| quantity | lower | 0 | INVALID | immediately below minimum |
| quantity | lower | 1 | VALID | minimum |
| quantity | lower | 2 | VALID | immediately above minimum |
| quantity | upper | 9 | VALID | immediately below maximum |
| quantity | upper | 10 | VALID | maximum |
| quantity | upper | 11 | INVALID | immediately above maximum |
```

## Definition of done

The skill is complete for a feature when:

- the requirement has been analyzed;
- testable domains have been identified;
- equivalence partitions have been defined;
- meaningful boundaries have been identified;
- BVA values have been derived;
- traceable test cases have been generated;
- coverage has been reviewed;
- assumptions and ambiguities have been documented;
- human-review items have been listed;
- AI-gap candidates have been documented.

Keep the result transparent and auditable so a human tester can inspect how the test design was derived.
