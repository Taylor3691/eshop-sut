Title: [BLOCKED][Giỏ hàng] Giảm số lượng bằng nút trừ

## Found by Test Case
TC-CART-005

## Requirement liên quan
FR-07

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Ghi số lượng.
2. Nhấn `-`.
3. Ghi số lượng sau.

## Expected result
Số lượng sau nhỏ hơn trước; không khẳng định mức giảm.

## Actual result
Cypress ghi nhận testcase pending do it.skip(); precondition hoặc fixture được định danh chưa đủ để thực thi an toàn.

## Evidence
Không có screenshot vì testcase chưa được thực thi.
