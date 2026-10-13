Title: [BLOCKED][Coupon] Xóa mã giảm giá hiện có

## Found by Test Case
TC-COUPON-015

## Requirement liên quan
FR-17

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5174 (API: http://localhost:3000)
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Trong đúng hàng có mã `EP_COUPON_DELETE`, bấm nút `Xóa`.
2. Thực hiện theo UI hiện có; chỉ xử lý xác nhận nếu UI thực sự hiển thị.
3. Kiểm tra `EP_COUPON_DELETE` không còn trong bảng coupon.

## Expected result
Mã đích được xóa; FR-17 không quy định dialog/message.

## Actual result
Testcase chưa được thực thi. EP_COUPON_DELETE không có cấu hình fixture được định danh trong testcase hoặc tài liệu nguồn để tái tạo precondition.

## Evidence
Không có screenshot vì testcase chưa được thực thi hợp lệ.
