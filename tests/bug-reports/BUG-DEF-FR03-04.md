# [BUG][DEF-FR03-04] Thiếu Chỉ báo bước (Step Indicator)

## Found by Test Case

[TC-BVA-TRANS-001](../test-cases/password-reset-web/TC-BVA-TRANS-001.md), [TC-FORGOT-001](../test-cases/password-reset-web/TC-FORGOT-001.md), [TC-GAP-MOB-003](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-003.md), [TC-UI-IND-001](../test-cases/password-reset-web/TC-UI-IND-001.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Thấp (GUI Specification Defect)
- **Vị trí**: `frontend-web/src/pages/ForgotPassword.jsx`
- **Mô tả**: Cả Bước 1 và Bước 2 không hiển thị chỉ báo bước ("Bước 1 / 2", "Bước 2 / 2").

- **GitHub Issue:** [#13](https://github.com/Taylor3691/eshop-sut/issues/13).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-TRANS-001` | Chuyển sang Bước 2 kèm chỉ báo "Bước 2 / 2" | Chuyển sang Bước 2 thành công nhưng thiếu chỉ báo bước "Bước 2 / 2". | [TC-BVA-TRANS-001.png](../test-cases/password-reset-web/screenshots/TC-BVA-TRANS-001.png) |
| `TC-FORGOT-001` | Sinh OTP 6 chữ số; hiển thị demo; chỉ báo bước "Bước 1 / 2"; nút "Quay lại đăng nhập" | OTP sinh ra có 4 chữ số (5984). Không có chỉ báo bước. Nhãn ghi "Mã OTP (4 số)". | [TC-FORGOT-001.png](../test-cases/password-reset-web/screenshots/TC-FORGOT-001.png) |
| `TC-GAP-MOB-003` | Hiển thị chỉ báo "Bước 1 / 2" và "Bước 2 / 2" | Không có bất kỳ chỉ báo bước nào xuất hiện trên cả 2 bước | Recorded: frontend-mobile/App.js:839-891 chỉ có header "Quên Mật Khẩu" |
| `TC-UI-IND-001` | Hiển thị "Bước 1 / 2" / "Step 1/2" | Không có chỉ báo bước nào được render | Recorded: Kiểm tra ForgotPassword.jsx; không có văn bản chỉ báo bước |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)
- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
