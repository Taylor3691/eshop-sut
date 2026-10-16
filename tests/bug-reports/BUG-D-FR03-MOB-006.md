# [BUG][D-FR03-MOB-006] Chấp nhận ký tự đặc biệt ngoài danh sách FR-01

## Found by Test Case

[TC-MOB-FORGOT-028](../test-cases/password-reset-mobile/TC-MOB-FORGOT-028.md).

## Related requirement

FR-03 - Password reset on mobile; password policy references FR-01.

## Status

Verified in the recorded execution report. Outcomes are transcribed below; this report did not rerun tests.

## Defect description (source catalog)

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-028
- **Mô tả**: Mật khẩu chứa `#` được reset dù FR-01 chỉ cho phép `@`, `$`, `!`, `%`, `*`, `?`, `&`.

- **GitHub Issue:** [#33](https://github.com/Taylor3691/eshop-sut/issues/33).

---

## Recorded results

| Test case | Recorded observation | Evidence |
|---|---|---|
| `TC-MOB-FORGOT-028` | Ký tự # được chấp nhận dù FR-01 loại trừ. | [TC-MOB-FORGOT-028.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-028.png) |

## Source reports

- [domain_testing_report.md](../../reports/test-results/FR-03-mobile/domain_testing_report.md)

## External issue status

GitHub publication and screenshot attachment were not performed in this local-branch task. Check for duplicates before publishing.
