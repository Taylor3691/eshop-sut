# Bug Reports và GitHub Issue Conventions

Chỉ dùng [BUG-REPORT-TEMPLATE.md](./BUG-REPORT-TEMPLATE.md) cho defect đã được verify trong Test Execution. Bug ID phải unique và không được dùng lại related checklist item ID. Không tạo report từ source inspection hoặc assumption.

## Chất lượng report bắt buộc

Report phải rõ ràng, có đánh số, đơn giản, dễ hiểu, reproducible, dễ đọc và không mang tính phán xét. Bao gồm reproduction steps có thể thực hiện, input data khi cần, Expected Result và Actual Result, environment đủ cụ thể và Evidence hỗ trợ. Không lưu password, token hoặc secret khác.

## Quy ước phân loại

Hai tài liệu khóa học dùng vocabulary khác nhau. Không được tự ý trộn hai hệ thống:

### Phân loại trong Markdown Bug Report

Dùng scale của **Test Report** trong bug report local:

| Field | Allowed values | Meaning |
|---|---|---|
| Priority | Critical, High, Medium, Low | Fixing urgency: immediately/within 1 day; 2–4 days; 5–8 days; or later for minor impact. |
| Severity | Fatal (10), Serious (5), Medium (3), Cosmetic (1) | Impact on the application: great damage/data loss or crash; main-feature impact; minimal requirement deviation; or very minor operational impact. |

Priority là urgency. Severity là impact. Hai trường phải được đánh giá độc lập.

### Phân loại GitHub Issue

Dùng label vocabulary của **GitHub Bug Management**:

- Type: `type: bug`, `type: enhancement`, `type: test`
- Severity: `severity: blocker`, `severity: critical`, `severity: major`, `severity: minor`, `severity: trivial`
- Priority: `priority: P0`, `priority: P1`, `priority: P2`, `priority: P3`
- Status: `status: new`, `status: triaged`, `status: in progress`, `status: ready for retest`, `status: verified`
- Module: `module: login`, `module: register`, `module: forgot-password`

Đây là GitHub label dùng cho vận hành, không phải equivalence chính xác của Test Report scale. Không tự động chuyển `Fatal` thành `blocker` hoặc `Critical` thành `P0`; ghi lại giá trị đã chọn và lý do triage. Nếu ghi cả hai hệ thống, giữ độc lập từng field.

## GitHub title và lifecycle

Dùng title format:

```text
[BUG][Module] Short description
```

Example:

```text
[BUG][Login] Error message is not displayed after invalid credentials
```

Lifecycle đề xuất:

```text
New → Triaged → Assigned → In Progress → Ready for Retest → Verified / Closed
```

Exception state:

- **Duplicate:** close or resolve only after linking the original issue.
- **Cannot reproduce:** document the missing information or evidence and request it.
- **Won't fix:** record the business or technical rationale.
- **Reopened:** use when the defect remains after retest.

Không đóng bug chỉ vì developer nói đã fix. Tester phải retest và ghi nhận result. Defect còn tồn tại phải được Reopened. Bug không được chuyển sang **In Progress** khi còn thiếu thông tin reproduction thiết yếu.

## Evidence và links

Dùng repository-relative Evidence path như `task-1-gui-checklist/evidence/failed-items/CHK-001-login.png`. Link failed checklist item trong bug report và issue. Fix pull request nên reference issue bằng `Fixes #<number>`, `Closes #<number>` hoặc `Resolves #<number>`, sau đó phải có tester retest evidence trước khi đóng.

## Cách áp dụng labels

Task chuẩn bị này không tạo label trên repository. Khi tạo verified issue thủ công, áp dụng đúng một label phù hợp từ mỗi category áp dụng được: type, severity, priority, status và module. Dùng [GitHub Bug Report issue form](../../.github/ISSUE_TEMPLATE/bug_report.yml). Không tự động assign developer nếu repository chưa có assignment rule.

## Tài liệu tham chiếu

Các quy ước trên được xây dựng từ `docs/Test report.pdf` và `docs/03 - github_bug_management.pptx (1).pdf`.
