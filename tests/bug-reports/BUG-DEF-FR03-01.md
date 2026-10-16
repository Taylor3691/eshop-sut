# [BUG][DEF-FR03-01] Sinh mã OTP 4 chữ số thay vì 6 chữ số theo đặc tả

## Found by Test Case

[TC-BVA-OTP-002](../test-cases/password-reset-web/TC-BVA-OTP-002.md), [TC-BVA-TRANS-001](../test-cases/password-reset-web/TC-BVA-TRANS-001.md), [TC-FORGOT-001](../test-cases/password-reset-web/TC-FORGOT-001.md), [TC-GAP-MOB-008](../test-cases/password-reset-mobile/ai-gap/TC-GAP-MOB-008.md).

## Related requirement

FR-03 (password reset); password rules reference FR-01.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Defect description (source catalog)

- **Mức độ Nghiêm trọng**: Cao (Functional Defect)
- **Vị trí**: `backend/server.js:72`, `frontend-web/src/pages/ForgotPassword.jsx:69`
- **Mô tả**: Hàm `Math.floor(1000 + Math.random() * 9000)` chỉ sinh mã 4 chữ số. Nhãn UI hiển thị `Mã OTP (4 số)`.

- **GitHub Issue:** [#7](https://github.com/Taylor3691/eshop-sut/issues/7).

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-BVA-OTP-002` | Hệ thống chấp nhận mã 6 chữ số | Backend chỉ tạo và nhận mã 4 số; UI ghi nhãn Mã OTP (4 số) | Recorded: Nhãn: Mã OTP (4 số); server.js:72 chỉ tạo 4 số ngẫu nhiên |
| `TC-BVA-TRANS-001` | Chuyển sang Bước 2 kèm chỉ báo "Bước 2 / 2" | Chuyển sang Bước 2 thành công nhưng thiếu chỉ báo bước "Bước 2 / 2". | [TC-BVA-TRANS-001.png](../test-cases/password-reset-web/screenshots/TC-BVA-TRANS-001.png) |
| `TC-FORGOT-001` | Trả về 200; tạo mã OTP 6 chữ số hiển thị trên màn hình | HTTP 200; trả về mã OTP 4 chữ số (5386) | Recorded: Payload API: {"message":"Mã đặt lại mật khẩu đã được tạo","resetToken":"5386"} |
| `TC-GAP-MOB-008` | Mã OTP 6 chữ số; nhãn ghi "Mã OTP (6 số)" | Backend sinh mã 4 chữ số ("6027"); nhãn UI ghi Mã OTP (4 số) | Recorded: server.js:72 sinh số ngẫu nhiên 1000-9999; App.js:862 ghi 4 số |

## Source reports

- [bva_testing_report.md](../../reports/test-results/FR-03/bva_testing_report.md)
- [domain_testing_report.md](../../reports/test-results/FR-03/domain_testing_report.md)
- [FR-03-ai-gap-analysis.md](../test-summary/FR-03-ai-gap-analysis.md)
- [FR-03-mobile-ai-gap-analysis.md](../test-summary/FR-03-mobile-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
