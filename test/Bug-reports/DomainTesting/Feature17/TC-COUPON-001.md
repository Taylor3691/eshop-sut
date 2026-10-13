Title: [PASS][Coupon] Tạo mã giảm giá loại percent

## Found by Test Case
TC-COUPON-001

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
1. Nhập `EP_PERCENT_NEW` vào `Mã coupon (VD: SAVE10)`, chọn `Phần trăm (%)`, rồi nhập các giá trị Test data vào các field tương ứng.
2. Bấm `Tạo mã`.
3. Kiểm tra bảng hiển thị mã mới với Loại là `Phần trăm`.

## Expected result
Mã loại `percent` được tạo. Message cụ thể chưa được mô tả.

## Actual result
Cypress thực thi testcase trong 2918 ms; tất cả assertion đạt và hành vi quan sát khớp Expected result.

## Evidence
![Evidence TC-COUPON-001](../../Screenshot/TC-COUPON-001.png)
