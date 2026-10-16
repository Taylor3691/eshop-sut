# [BUG][D-FR03-MOB-005] Email phân biệt hoa thường

## Found by Test Case

[TC-MOB-FORGOT-010](../test-cases/password-reset-mobile/TC-MOB-FORGOT-010.md).

## Related requirement

FR-03 - Password reset on mobile; password policy references FR-01.

## Status

Verified in the recorded execution report. Outcomes are transcribed below; this report did not rerun tests.

## Defect description (source catalog)

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-010
- **Mô tả**: `TEST@ESHOP.COM` không được đối chiếu với tài khoản `test@eshop.com`.

- **Manual review:** Requirements do not specify case-insensitive email matching; review TC-MOB-FORGOT-010.

## Recorded results

| Test case | Recorded observation | Evidence |
|---|---|---|
| `TC-MOB-FORGOT-010` | Email chữ hoa trả HTTP 404, không matching không phân biệt hoa thường. | [TC-MOB-FORGOT-010.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-010.png) |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-03-mobile/domain_testing_report.md)

## External issue status

GitHub publication and screenshot attachment were not performed in this local-branch task. Check for duplicates before publishing.
