# Prompt 03 - Execute Checklist và Report Bugs

Đóng vai Senior QA Engineer. Execute approved Checklist trong tài liệu chính `checklist/gui-checklist.md` trên EShop web storefront đang chạy. Dùng `checklist/human-reviewed-checklist.md` làm review trace và giữ `checklist/gui-checklist.xlsx` làm backup có cấu trúc.

Trước Test Execution, làm theo `setup_guide.md` và ghi actual backend URL, frontend URL, browser/version, operating system, viewport, device/platform, execution date và tester trong `docs/test-execution-report.md`.

Exercise Login, Register và cả hai step của Forgot Password với scenario normal, invalid, boundary, navigation và feedback/state theo FR-01, FR-02, FR-03 và IA-01-IA-04. Chỉ đánh dấu `Passed` hoặc `Failed` sau khi quan sát; dùng tạm `Not Executed` cho item chưa chạy. Với mỗi Failed item, ghi reproduction steps, Expected Result, Actual Result và screenshot trong `evidence/failed-items/`.

Chỉ report verified defect bằng `bug-reports/BUG-REPORT-TEMPLATE.md`; chỉ tạo GitHub Issue khi defect đã verify và gắn Evidence. Dùng title format `[BUG][Module] Short description`, label taxonomy và bug lifecycle trong `bug-reports/README.md`. Không đóng Issue trước khi tester retest và ghi result.

Cập nhật `checklist/gui-checklist.md`, `docs/test-execution-report.md`, `docs/test-summary.md`, workbook backup và AI audit log. Output documentation phải Vietnamese-first nhưng giữ nguyên English technical terms, checklist IDs, requirement IDs, machine-readable status values (`Passed`, `Failed`, `Not Executed`) và GitHub labels. Không lưu credentials, token hoặc fabricated result.
