Title: [BLOCKED][Coupon] Xóa mã giảm giá hiện có

## Found by Test Case
TC-COUPON-015

## Requirement liên quan
FR-17

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Trong đúng hàng có mã `EP_COUPON_DELETE`, bấm nút `Xóa`.
2. Thực hiện theo UI hiện có; chỉ xử lý xác nhận nếu UI thực sự hiển thị.
3. Kiểm tra `EP_COUPON_DELETE` không còn trong bảng coupon.

## Expected result
Mã đích được xóa; FR-17 không quy định dialog/message.

## Actual result
Cypress ghi nhận testcase pending do it.skip(); precondition hoặc fixture được định danh chưa đủ để thực thi an toàn.

## Evidence
Không có screenshot vì testcase chưa được thực thi.
