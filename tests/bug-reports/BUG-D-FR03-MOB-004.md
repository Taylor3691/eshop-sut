# [BUG][D-FR03-MOB-004] Thiếu trường xác nhận mật khẩu

## Found by Test Case

[TC-MOB-BVA-FORGOT-019](../test-cases/password-reset-mobile/TC-MOB-BVA-FORGOT-019.md), [TC-MOB-BVA-FORGOT-020](../test-cases/password-reset-mobile/TC-MOB-BVA-FORGOT-020.md), [TC-MOB-FORGOT-013](../test-cases/password-reset-mobile/TC-MOB-FORGOT-013.md).

## Related requirement

FR-03 - Password reset on mobile; password policy references FR-01.

## Status

Verified in the recorded execution report. Outcomes are transcribed below; this report did not rerun tests.

## Defect description (source catalog)

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-013
- **Mô tả**: Bước 2 chỉ có trường mật khẩu mới, không có trường xác nhận và không kiểm tra hai giá trị khớp nhau.

- **GitHub Issue:** [#28](https://github.com/Taylor3691/eshop-sut/issues/28).

## Recorded results

| Test case | Recorded observation | Evidence |
|---|---|---|
| `TC-MOB-BVA-FORGOT-019` | Không có trường confirm-password nên không nhập được trường hợp khớp. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |
| `TC-MOB-BVA-FORGOT-020` | Không có trường confirm-password nên không kiểm tra được trường hợp lệch. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |
| `TC-MOB-FORGOT-013` | Thiếu trường Xác nhận mật khẩu mới. | [TC-MOB-FORGOT-011.png](../test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png) |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03-mobile/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03-mobile/domain_testing_report.md)

## External issue status

GitHub publication and screenshot attachment were not performed in this local-branch task. Check for duplicates before publishing.
