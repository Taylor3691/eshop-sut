# [BUG][D-FR03-MOB-003] OTP 4 số và không hiển thị trong demo

## Found by Test Case

[TC-MOB-FORGOT-005](../test-cases/password-reset-mobile/TC-MOB-FORGOT-005.md), [TC-MOB-FORGOT-014](../test-cases/password-reset-mobile/TC-MOB-FORGOT-014.md).

## Related requirement

FR-03 - Password reset on mobile; password policy references FR-01.

## Status

Verified in the recorded execution report. Outcomes are transcribed below; this report did not rerun tests.

## Defect description (source catalog)

- **Mức độ**: Critical
- **Phạm vi**: TC-MOB-FORGOT-005, TC-MOB-FORGOT-014
- **Mô tả**: Backend/UI dùng 4 số và UI không hiển thị OTP, trái yêu cầu OTP 6 số và hiển thị trực tiếp trong môi trường demo.

- **GitHub Issue:** [#7](https://github.com/Taylor3691/eshop-sut/issues/7), [#27](https://github.com/Taylor3691/eshop-sut/issues/27).

## Recorded results

| Test case | Recorded observation | Evidence |
|---|---|---|
| `TC-MOB-FORGOT-005` | Không hiển thị giá trị OTP trên màn hình. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |
| `TC-MOB-FORGOT-014` | UI và backend dùng OTP 4 số thay vì 6 số. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-03-mobile/domain_testing_report.md)

## External issue status

GitHub publication and screenshot attachment were not performed in this local-branch task. Check for duplicates before publishing.
