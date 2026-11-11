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


## Danh sách các Bug Report đã xác minh (Verified Bug Reports)

Toàn bộ 19 defect được phát hiện trong quá trình thực thi GUI Checklist ngày 2026-11-11:

| Bug ID | Module | Title | Severity | Priority | Related Checklist | Evidence |
|---|---|---|---|---|---|---|
| [BUG-20261111-001](./BUG-20261111-001.md) ([#107](https://github.com/Taylor3691/eshop-sut/issues/107)) | `Login` | [BUG][Login] Trang đăng nhập hiển thị sai tiêu đề thành Đăng Ký, thiếu thẻ h1 và lẫn lộn tiếng Anh | `Medium (3)` | `Medium` | `GUI-001, GUI-002, HR-001` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-001/GUI-001.png) |
| [BUG-20261111-002](./BUG-20261111-002.md) ([#108](https://github.com/Taylor3691/eshop-sut/issues/108)) | `Login` | [BUG][Login] Nút Sign In có tabIndex={1} làm sai lệch thứ tự focus phím Tab | `Medium (3)` | `Medium` | `GUI-006` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-006/GUI-006.png) |
| [BUG-20261111-003](./BUG-20261111-003.md) ([#109](https://github.com/Taylor3691/eshop-sut/issues/109)) | `Login` | [BUG][Login] Trường Mật khẩu sử dụng type="text" để lộ mật khẩu dạng văn bản rõ | `Fatal (10)` | `Critical` | `GUI-011` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-011/GUI-011.png) |
| [BUG-20261111-004](./BUG-20261111-004.md) ([#110](https://github.com/Taylor3691/eshop-sut/issues/110)) | `Login` | [BUG][Login] Trường Email dùng type="text" không kích hoạt HTML5 format validation | `Medium (3)` | `Medium` | `GUI-010, HR-007, GUI-013` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-010/GUI-010.png) |
| [BUG-20261111-005](./BUG-20261111-005.md) ([#111](https://github.com/Taylor3691/eshop-sut/issues/111)) | `Login` | [BUG][Login] Thông báo lỗi đăng nhập thất bại hiển thị bên dưới nút gửi và liên kết đăng ký | `Cosmetic (1)` | `Low` | `GUI-015` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-015/GUI-015.png) |
| [BUG-20261111-006](./BUG-20261111-006.md) ([#112](https://github.com/Taylor3691/eshop-sut/issues/112)) | `Login` | [BUG][Login] Không hiển thị phản hồi tạm khóa tài khoản sau khi đăng nhập sai từ 3 lần trở lên | `Serious (5)` | `High` | `GUI-017` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-017/GUI-017.png) |
| [BUG-20261111-007](./BUG-20261111-007.md) ([#113](https://github.com/Taylor3691/eshop-sut/issues/113)) | `Register` | [BUG][Register] Nút hành động chính Đăng Ký sử dụng màu đỏ thay vì màu xanh dương | `Cosmetic (1)` | `Low` | `GUI-025` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-025/GUI-025.png) |
| [BUG-20261111-008](./BUG-20261111-008.md) ([#114](https://github.com/Taylor3691/eshop-sut/issues/114)) | `Register` | [BUG][Register] Form đăng ký hoàn toàn thiếu trường Xác nhận mật khẩu | `Serious (5)` | `High` | `GUI-036, HR-010` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-036/GUI-036.png) |
| [BUG-20261111-009](./BUG-20261111-009.md) ([#115](https://github.com/Taylor3691/eshop-sut/issues/115)) | `Register` | [BUG][Register] Biểu thức chính quy kiểm tra mật khẩu từ chối mật khẩu mạnh hợp lệ và yêu cầu khoảng trắng | `Serious (5)` | `Critical` | `HR-011` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/HR-011/HR-011.png) |
| [BUG-20261111-010](./BUG-20261111-010.md) ([#116](https://github.com/Taylor3691/eshop-sut/issues/116)) | `Register` | [BUG][Register] Trường Email trên form đăng ký sử dụng type="text" thay vì type="email" | `Medium (3)` | `Medium` | `GUI-032, HR-009` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-032/GUI-032.png) |
| [BUG-20261111-011](./BUG-20261111-011.md) ([#117](https://github.com/Taylor3691/eshop-sut/issues/117)) | `Forgot Password` | [BUG][Forgot Password] Quy trình khôi phục mật khẩu 2 bước không có chỉ báo bước (Step Indicator) | `Cosmetic (1)` | `Medium` | `GUI-057` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-057/GUI-057.png) |
| [BUG-20261111-012](./BUG-20261111-012.md) ([#118](https://github.com/Taylor3691/eshop-sut/issues/118)) | `Forgot Password` | [BUG][Forgot Password] Không có nút Quay lại đăng nhập trên giao diện khôi phục mật khẩu | `Medium (3)` | `Medium` | `GUI-066, GUI-067, HR-015` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-066/GUI-066.png) |
| [BUG-20261111-013](./BUG-20261111-013.md) ([#119](https://github.com/Taylor3691/eshop-sut/issues/119)) | `Forgot Password` | [BUG][Forgot Password] Mã OTP tạo ra và nhãn hiển thị chỉ có 4 chữ số thay vì 6 chữ số | `Serious (5)` | `High` | `GUI-061` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-061/GUI-061.png) |
| [BUG-20261111-014](./BUG-20261111-014.md) ([#120](https://github.com/Taylor3691/eshop-sut/issues/120)) | `Forgot Password` | [BUG][Forgot Password] Bước 2 thiếu trường Xác nhận mật khẩu mới và thiếu hướng dẫn mật khẩu mạnh | `Serious (5)` | `High` | `GUI-054, GUI-058, HR-013` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-054/GUI-054.png) |
| [BUG-20261111-015](./BUG-20261111-015.md) ([#121](https://github.com/Taylor3691/eshop-sut/issues/121)) | `Forgot Password` | [BUG][Forgot Password] Thông báo lỗi sử dụng popup alert() của trình duyệt thay vì hiển thị trên form | `Medium (3)` | `Medium` | `GUI-059` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-059/GUI-059.png) |
| [BUG-20261111-016](./BUG-20261111-016.md) ([#122](https://github.com/Taylor3691/eshop-sut/issues/122)) | `UI` | [BUG][UI] Các màn hình Login, Register và Forgot Password sử dụng thẻ h2, thiếu thẻ h1 duy nhất | `Cosmetic (1)` | `Low` | `HR-001, HR-002, HR-003` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/HR-001/HR-001.png) |
| [BUG-20261111-017](./BUG-20261111-017.md) ([#123](https://github.com/Taylor3691/eshop-sut/issues/123)) | `UI` | [BUG][UI] Tất cả các trường bắt buộc trên Login, Register và Forgot Password thiếu ký hiệu dấu sao (*) | `Cosmetic (1)` | `Low` | `GUI-034, GUI-053, GUI-056` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-034/GUI-034.png) |
| [BUG-20261111-018](./BUG-20261111-018.md) ([#124](https://github.com/Taylor3691/eshop-sut/issues/124)) | `UI` | [BUG][Accessibility] Nhãn form thiếu thuộc tính htmlFor và input thiếu id liên kết | `Cosmetic (1)` | `Low` | `GUI-073` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-073/GUI-073.png) |
| [BUG-20261111-019](./BUG-20261111-019.md) ([#125](https://github.com/Taylor3691/eshop-sut/issues/125)) | `UI` | [BUG][UI] Không nhất quán màu sắc nút hành động chính và kiểu hiển thị trường mật khẩu giữa các màn hình | `Medium (3)` | `Medium` | `GUI-076` | [Evidence](../../task-1-gui-checklist/evidence/failed-items/GUI-076/GUI-076.png) |