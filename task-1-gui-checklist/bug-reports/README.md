# Bug Reports and GitHub Issue Conventions

Use [BUG-REPORT-TEMPLATE.md](./BUG-REPORT-TEMPLATE.md) only for defects verified during checklist execution. A bug ID must be unique and must not reuse the related checklist item ID. Do not create a report from source inspection or an assumption.

## Required report quality

Reports must be written, numbered, simple, understandable, reproducible, legible, and non-judgmental. Include actionable reproduction steps, input data where needed, expected and actual results, a sufficiently specific environment, and supporting evidence. Do not store passwords, tokens, or other secrets.

## Classification convention

The two course references use different vocabularies. They are not silently merged:

### Markdown bug report classification

Use the **Test Report** course scale in the local bug report:

| Field | Allowed values | Meaning |
|---|---|---|
| Priority | Critical, High, Medium, Low | Fixing urgency: immediately/within 1 day; 2–4 days; 5–8 days; or later for minor impact. |
| Severity | Fatal (10), Serious (5), Medium (3), Cosmetic (1) | Impact on the application: great damage/data loss or crash; main-feature impact; minimal requirement deviation; or very minor operational impact. |

Priority is urgency. Severity is impact. They must be assessed separately.

### GitHub Issue classification

Use the **GitHub Bug Management** label vocabulary:

- Type: `type: bug`, `type: enhancement`, `type: test`
- Severity: `severity: blocker`, `severity: critical`, `severity: major`, `severity: minor`, `severity: trivial`
- Priority: `priority: P0`, `priority: P1`, `priority: P2`, `priority: P3`
- Status: `status: new`, `status: triaged`, `status: in progress`, `status: ready for retest`, `status: verified`
- Module: `module: login`, `module: register`, `module: forgot-password`

These are operational GitHub labels, not exact equivalents of the Test Report scale. Do not automatically translate `Fatal` to `blocker` or `Critical` to `P0`; record the selected values and the triage rationale. If both systems are recorded, preserve both fields independently.

## GitHub title and lifecycle

Use the title format:

```text
[BUG][Module] Short description
```

Example:

```text
[BUG][Login] Error message is not displayed after invalid credentials
```

Proposed lifecycle:

```text
New → Triaged → Assigned → In Progress → Ready for Retest → Verified / Closed
```

Exception states:

- **Duplicate:** close or resolve only after linking the original issue.
- **Cannot reproduce:** document the missing information or evidence and request it.
- **Won't fix:** record the business or technical rationale.
- **Reopened:** use when the defect remains after retest.

Do not close a bug merely because a developer says it is fixed. The tester must retest and record the result. A remaining defect must be reopened. A bug must not move to **In Progress** while essential reproduction information is missing.

## Evidence and links

Use repository-relative evidence paths such as `task-1-gui-checklist/evidence/failed-items/CHK-001-login.png`. Link the failed checklist item in the bug report and issue. A fix pull request should reference the issue using `Fixes #<number>`, `Closes #<number>`, or `Resolves #<number>`, followed by tester retest evidence before closure.

## Applying labels

The repository does not receive labels from this preparation task. When creating a verified issue manually, apply exactly one relevant label from each applicable category: type, severity, priority, status, and module. Use the dedicated [GitHub Bug Report issue form](../../.github/ISSUE_TEMPLATE/bug_report.yml). Do not assign an individual developer automatically unless the repository establishes an assignment rule.

## Reference documents

The conventions above were derived from `docs/Test report.pdf` and `docs/03 - github_bug_management.pptx (1).pdf`.
