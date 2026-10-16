# [BUG][D-FR03-MOB-001] Thiếu Step Indicator

## Found by Test Case

[TC-MOB-FORGOT-002](../test-cases/password-reset-mobile/TC-MOB-FORGOT-002.md), [TC-MOB-FORGOT-012](../test-cases/password-reset-mobile/TC-MOB-FORGOT-012.md).

## Related requirement

FR-03 - Password reset on mobile; password policy references FR-01.

## Status

Verified in the recorded execution report. Outcomes are transcribed below; this report did not rerun tests.

## Defect description (source catalog)

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-002, TC-MOB-FORGOT-012
- **Mô tả**: UI không hiển thị Bước 1 / 2 hoặc Bước 2 / 2 theo yêu cầu FR-03.

- **GitHub Issue:** [#25](https://github.com/Taylor3691/eshop-sut/issues/25).

## Recorded results

| Test case | Recorded observation | Evidence |
|---|---|---|
| `TC-MOB-FORGOT-002` | Không hiển thị chỉ báo bước tại Bước 1. | [TC-MOB-FORGOT-001.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-001.png) |
| `TC-MOB-FORGOT-012` | Không hiển thị chỉ báo bước tại Bước 2. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-03-mobile/domain_testing_report.md)

## External issue status

GitHub publication and screenshot attachment were not performed in this local-branch task. Check for duplicates before publishing.
